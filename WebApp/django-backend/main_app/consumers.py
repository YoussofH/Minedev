import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

import asyncio
from ollama import AsyncClient
from time import sleep

from .models import BotResponse, Conversation

from elevenlabs import play, save, Voice, VoiceSettings
from elevenlabs.client import ElevenLabs

from dotenv import load_dotenv
import os

load_dotenv()

eleven_labs_client = ElevenLabs(api_key=os.environ['ELEVENLABS_API_KEY'])
ollama_client = AsyncClient(host='http://3.16.245.247:11434')

#os.environ['hierarchy_context'] = ""
#os.environ['project_context'] = ""
os.environ['workspace_rules_prompt'] =   """RULES: YOU ARE AN AI PAIR PROGRAMMER THAT ASSISTS DEVELOPER BY STRUCTURING IDEAS AND GIVING THEM CONCISE ANSWERS WITHOUT UN-NEEDED INTROS.
                                YOU ARE GOING TO BE GIVEN HIERARCHY OF THE USER'S WORKSPACE. YOU ARE GOIING TO ANALYZE IT THOROUGHLY.
                                IN SOME OF YOUR RESPONSES YOU MIGHT HAVE TO TELL THE USER TO NAVIGATE TO A SPECIFIC FILE ACCORDING THE HIERARCHY, SO THAT YOU WILL HAVE TO RESPOND AN HTML TAG <a href="SOURCE HERE">FILE NAME HERE</a>.
                                YOU ARE NOT ALLOWED TO GIVE USER FINISHED CODE. NOW YOU SHOULD GENERATE A FULL CONTEXT OF THE PROJECT. ABIDE BY THE RULES. RULES DONE."""


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.send(text_data=json.dumps({"welcome": "Welcome here!"}))

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["user_prompt"]

        message = f"{os.environ['workspace_rules_prompt']} . Here is the user's request: {message}"

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
        prompt = f"RULES:YOU ARE AN AI PAIR PROGRAMMER. YOU GIVE SUGGESTIONS AND HELP ME THINK IN INNOVATIVE WAY TO COMPLETE MY PROGRAMMING PROJECT. I WANT YOU TO RESPOND AS IF YOU ARE SPEAKING IN A FRIENDLY WAY AS A PAIR PROGRAMMER BE CONCISE AND HELPFUL DO NOT ANSWER WITH LONG TEXT. HERE IS THE HIERARCHY {hierarchy_context}. The following is me speaking to you. RESPOND ACCORDING TO THE RULES : {speech_text}"
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
        message = text_data_json["workspaceTree"]
        #os.environ['hierarchy_context'] = message
        
        end_result = ""
        prompt = f"Here is my workspace tree please generate a suitable title for my project YOU ARE STRICTLY PROMPTED TO JUST GIVE ANSWER WITH THE TITLE ONLY, NO INTROS NOTHING ELSE JUST RETURN PROJECT TITLE, DO NOT USE SAME TITLE AS THE MAIN FOLDER, YOUR ANSWER SHOULD CONTAIN ONLY ENGLISH CHARACTERS NO QUOTES OR OTHER SYMBOLS, YOU ARE ALLOWED TO ADD SPACES BETWEEN WORDS: {message}"
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