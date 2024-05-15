import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

import asyncio
from ollama import AsyncClient
from time import sleep

from .models import BotResponse, Conversation

client = AsyncClient(host='http://3.16.245.247:11434')

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.send(text_data=json.dumps({"welcome": "Welcome here!"}))

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["user_prompt"]

        
        end_result = ""

        async def get_response():
            msg = {'role': 'user', 'content': message}
            response = await client.chat(model='llama3:8b', messages=[msg], stream=True)
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



class ProjectTitleConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.send(text_data=json.dumps({"welcome": "Send hierarchy to generate project title!"}))

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["workspaceTree"]

        
        end_result = ""
        prompt = f"Here is my workspace tree please generate a suitable title for my project YOU ARE STRICTLY PROMPTED TO JUST GIVE ANSWER WITH THE TITLE ONLY, NO INTROS NOTHING ELSE JUST RETURN PROJECT TITLE, DO NOT USE SAME TITLE AS THE MAIN FOLDER, YOUR ANSWER SHOULD CONTAIN ONLY ENGLISH CHARACTERS NO QUOTES OR OTHER SYMBOLS: {message}"
        async def get_response():
            msg = {'role': 'user', 'content': prompt}
            response = await client.chat(model='llama3:8b', messages=[msg], stream=True)
            return response

        async def generate_title(response, end_result=""):
            async for part in response:
                res = part['message']['content']
                end_result += res
            return end_result

        response = await get_response()
        end_result = await generate_title(response)
        await self.send(text_data=json.dumps({"project_title": end_result}))