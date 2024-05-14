import json
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

import asyncio
from ollama import AsyncClient
from time import sleep

from .models import BotResponse, Conversation

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.send(text_data=json.dumps({"welcome": "Welcome here!"}))
        self.client = AsyncClient(host='http://3.16.245.247:11434')

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["user_prompt"]

        
        end_result = ""

        async def get_response():
            msg = {'role': 'user', 'content': message}
            response = await self.client.chat(model='llama3:8b', messages=[msg], stream=True)
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





class TalkConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        await self.send(text_data=json.dumps({"welcome": "Welcome to the AI talk!"}))

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["user_prompt"]
        
        end_result = ""

        async def get_response():
            msg = {'role': 'user', 'content': message}
            response = await AsyncClient(host='http://3.16.245.247:11434').chat(model='llama3:8b', messages=[msg], stream=True)
            return response

        async def send_chunks(response, end_result=""):
            async for part in response:
                res = part['message']['content']
                end_result += res
                await self.send(text_data=json.dumps({"message": res}))
            return end_result

        response = await get_response()
        end_result = await send_chunks(response)

        await self.send(text_data=json.dumps({"isStreamDone": True}))
