from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r"ws/chat/(?P<room_name>\w+)/$", consumers.ChatConsumer.as_asgi()),
    re_path(r"ws/title/$", consumers.ProjectTitleConsumer.as_asgi()),
    #re_path(r"ws/talk/(?P<room_name>\w+)/$", consumers.TalkConsumer.as_asgi()),
]