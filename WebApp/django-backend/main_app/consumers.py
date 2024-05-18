import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

import asyncio
from ollama import AsyncClient
from time import sleep

from .models import BotResponse, Conversation, DeveloperPrompt

from elevenlabs import play, save, Voice, VoiceSettings
from elevenlabs.client import ElevenLabs

from dotenv import load_dotenv
import os

load_dotenv()

eleven_labs_client = ElevenLabs(api_key=os.environ['ELEVENLABS_API_KEY'])
ollama_client = AsyncClient(host='http://3.16.245.247:11434')

#os.environ['hierarchy_context'] = ""
#os.environ['project_context'] = ""
os.environ['workspace_rules_prompt'] =   """RULES: YOU ARE AN AI PAIR PROGRAMMER THAT ASSISTS ME THE DEVELOPER BY STRUCTURING IDEAS AND GIVING THEM CONCISE ANSWERS WITHOUT UNNEEDED INTRODUCTIONS. YOU ARE GOING TO BE GIVEN HIERARCHY OF THE USER'S WORKSPACE, YOU ARE GOING TO ANALYZE IT THOROUGHLY. IN SOME OF YOUR RESPONSES YOU MIGHT HAVE TO TELL THE USER TO NAVIGATE TO A SPECIFIC FILE ACCORDING TO THE HIERARCHY, SO THAT YOU WILL HAVE TO RESPOND USING STRICTLY THE FOLLOWING FORMAT HTML TAG <a href="FILE PATH HERE">FILE NAME HERE</a>. NOTE: THE FILE PATH SHOULD ONLY BE RELATED TO THE HIERARCHY AND NOTHING ELSE. YOU ARE NOT ALLOWED TO GIVE USER COMPLETE CODE. ABIDE BY THE RULES."""


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.send(text_data=json.dumps({"welcome": "Welcome here!"}))

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["user_prompt"]

        @database_sync_to_async
        def get_conversation_content(conversation_id):
            prompts = DeveloperPrompt.objects.filter(conversation_id=conversation_id).order_by('sent_at')
            responses = BotResponse.objects.filter(conversation_id=conversation_id).order_by('sent_at')
            hierarchy = Conversation.objects.get(pk=conversation_id).hierarchy
            #can i just extract content field for all prompts and all responses then join them together using normal python

            messages = [message.content for message in DeveloperPrompt.objects.filter(conversation_id=conversation_id).order_by('sent_at')]
            messages.extend([message.content for message in BotResponse.objects.filter(conversation_id=conversation_id).order_by('sent_at')])

            # Join content with newline for readability
            content = "\n".join(messages)

            return (content.strip(), hierarchy)


        conversation_id = int(self.scope['url_route']['kwargs']['room_name'])
        chat_context, hierarchy = await get_conversation_content(conversation_id)
        await self.send(text_data=json.dumps({"chat_context": chat_context}))
        message = f"{os.environ['workspace_rules_prompt']}. HERE IS CHAT HISTORY BETWEEN YOU AND THE USER:{chat_context}. HERE IS THE WORKSPACE HIERARCHY: {hierarchy}. RESPOND ACCORDING TO THE RULES. HERE IS THE USER'S REQUEST: {message}"

        end_result = ""

        async def get_response():
            msg = {'role': 'user', 'content': message}
            response = await ollama_client.chat(model='llama3:8b', messages=[msg], stream=True)
            return response

        async def send_chunks(response, end_result=""):
            async for part in response:
                res = part['message']['content']
                end_result += res
                await asyncio.sleep(0.18)
                await self.send(text_data=json.dumps({"message": res}))
            return end_result

        response = await get_response()
        end_result = await send_chunks(response)

        @database_sync_to_async
        def create_bot_response(conversation_id, end_result):
            conversation = Conversation.objects.get(pk=conversation_id)
            return BotResponse.objects.create(conversation=conversation, history_context="", content=end_result)
        
        conversation_id = int(self.scope['url_route']['kwargs']['room_name'])
        await create_bot_response(conversation_id, end_result)

        await self.send(text_data=json.dumps({"isStreamDone": True}))


class TalkAIConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.send(text_data=json.dumps({"welcome": "I am going to speak in a second"}))

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        speech_text = text_data_json["speech_text"]

        
        end_result = ""
        prompt = f"RULES:YOU ARE AN AI PAIR PROGRAMMER. YOU GIVE SUGGESTIONS AND HELP ME THINK IN AN INNOVATIVE WAY TO COMPLETE MY PROGRAMMING PROJECT. I WANT YOU TO RESPOND AS IF YOU ARE SPEAKING IN A FRIENDLY WAY BE CONCISE AND HELPFUL. STICK WITH TWO SENTENCES AS A MAXIMUM RESPONSE. THE FOLLOWING IS ME SPEAKING TO YOU. RESPOND ACCORDING TO THE RULES: {speech_text}"
        async def get_response():
            msg = {'role': 'user', 'content': prompt}
            response = await ollama_client.chat(model='llama3:8b', messages=[msg], stream=True)
            return response

        async def collect_chunks(response, end_result=""):
            async for part in response:
                res = part['message']['content']
                end_result += res
            return end_result

        response = await get_response()
        end_result = await collect_chunks(response)

        def generate_audio(audio_text):
            audio = eleven_labs_client.generate(
                text=audio_text,
                voice=Voice(
                    voice_id='amJPoXAqr4cfw0EZwEK8',
                    settings=VoiceSettings(stability=0.40, similarity_boost=0.66, style=0.44, use_speaker_boost=True)
                ),
                model="eleven_multilingual_v2"
            )
            save(audio, "/home/ubuntu/Minedev/WebApp/django-backend/media/generated_ai_audio.mp3")
        generate_audio(end_result)
        await self.send(text_data=json.dumps({"message": "voice generated", "status": "complete"}))


class ProjectTitleConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.send(text_data=json.dumps({"welcome": "Send hierarchy to generate project title!"}))

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        workspaceTree = text_data_json["workspaceTree"]
        conversation_id = text_data_json["conversationID"]

        @database_sync_to_async
        def add_hierarchy(conversation_id, workspaceTree):
            conversation = Conversation.objects.get(pk=conversation_id)
            conversation.hierarchy = workspaceTree
            return conversation.save()
        await add_hierarchy(conversation_id, workspaceTree)
        
        end_result = ""
        prompt = f"HERE IS MY WORKSPACE TREE PLEASE GENERATE A SUITABLE TITLE FOR MY PROJECT. YOU ARE STRICTLY PROMPTED TO JUST GIVE AN ANSWER WITH THE TITLE ONLY, NO INTRODUCTIONS NOTHING ELSE IS ALLOWED. JUST RETURN PROJECT TITLE, DO NOT USE SAME TITLE AS THE MAIN FOLDER, YOUR ANSWER SHOULD CONTAIN ONLY ENGLISH CHARACTERS NO QUOTES OR OTHER SYMBOLS, YOU ARE ALLOWED TO ADD SPACES BETWEEN WORDS. IMPORTANT NOTE: TITLE SHOULD BE STRICTLY NO LONGER THAN 3 WORDS: {workspaceTree}"
        async def get_response():
            msg = {'role': 'user', 'content': prompt}
            response = await ollama_client.chat(model='llama3:8b', messages=[msg], stream=True)
            return response

        async def generate_title(response, end_result=""):
            async for part in response:
                res = part['message']['content']
                end_result += res
            return end_result

        response = await get_response()
        end_result = await generate_title(response)

        await self.send(text_data=json.dumps({"project_title": end_result}))