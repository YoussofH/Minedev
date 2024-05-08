from django.shortcuts import render
from .models import Plan, Developer
from .serializers import PlanSerializer
from rest_framework.viewsets import ModelViewSet

class PlanViewSet(ModelViewSet):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer

from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated

from .serializers import UserModelSerializer

class UserProfileListCreateView(ListCreateAPIView):
    """Generic View for Listing and Creating User Profiles"""

    queryset = Developer.objects.all()
    serializer_class = UserModelSerializer
    permission_classes = [AllowAny]

    def create(self, validated_data):
        user = Developer.objects.create_user(**validated_data)
        return user