import json

from channels.generic.websocket import AsyncWebsocketConsumer

import asyncio
from ollama import AsyncClient


class ChatConsumer(AsyncWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.client =  AsyncClient(host='http://3.16.245.247:11434')
    
    async def connect(self):
        self.accept()
        await self.send(text_data=json.dumps({"message": "welcome here"}))

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        '''text_data_json = json.loads(text_data)
        message = text_data_json["message"]

        self.send(text_data=json.dumps({"message": message}))'''

        text_data_json = json.loads(text_data)
        message = text_data_json["message"]

        # Use your chatbot library (Ollama in this case) to process the message and get responses
        async def get_response():
            response = await self.client.chat(model='llama3:8b', messages=[{"role": "user", "content": message}], stream=True)
            return response

        async def send_chunks(response):
            async for part in response:
                await self.send(text_data=json.dumps({"message": part['message']['content']}))

        loop = asyncio.new_event_loop()
        loop.run_until_complete(send_chunks(loop.run_until_complete(get_response())))