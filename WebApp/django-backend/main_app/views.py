from django.shortcuts import render
from .models import Plan, Developer, DeveloperPrompt, BotResponse, Conversation
from .serializers import PlanSerializer, DeveloperModelSerializer, CustomTokenObtainPairSerializer, DeveloperPromptSerializer, BotResponseSerializer

from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.decorators import api_view, permission_classes
from rest_framework import viewsets

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_profile(request):
    user = request.user
    serializer = DeveloperModelSerializer(user, many=False)
    return Response(status=status.HTTP_201_CREATED)


class BotResponseListViewSet(ModelViewSet):
    """ViewSet for Listing Bot Responses"""
    permission_classes = [IsAuthenticated]

    queryset = BotResponse.objects.all()

    def get_queryset(self):
        user = self.request.user
        conversation = self.request.query_params.get('conversation', None)

        if conversation is not None:
            # Check ownership using filter and exists
            is_owner = Conversation.objects.filter(pk=conversation, user=user).exists()

            if is_owner:
                return self.queryset.filter(conversation=conversation)
            else:
                return BotResponse.objects.none()
        else:
            raise serializers.ValidationError("Conversation parameter is required")


    def get_serializer_class(self):
        """Returns the serializer class based on the request method."""
        if self.request.method == 'GET':
            return BotResponseSerializer

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class DeveloperPromptListCreateView(ListCreateAPIView):
    """Generic View for Listing and Creating Developer Prompts"""

    serializer_class = DeveloperPromptSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        conversation = self.request.query_params.get('conversation', None)
        return DeveloperPrompt.objects.filter(user=user, conversation__project=conversation)

    def create(self, request, *args, **kwargs):
        user = self.request.user

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class PlanViewSet(ModelViewSet):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer


class UserProfileListCreateView(ListCreateAPIView):
    """Generic View for Listing and Creating User Profiles"""

    queryset = Developer.objects.all()
    serializer_class = DeveloperModelSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer