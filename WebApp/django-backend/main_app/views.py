from django.shortcuts import render
from .models import Plan, Developer
from .serializers import PlanSerializer
from rest_framework.viewsets import ModelViewSet

from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import AllowAny

from .serializers import DeveloperModelSerializer, CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class PlanViewSet(ModelViewSet):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer



class UserProfileListCreateView(ListCreateAPIView):
    """Generic View for Listing and Creating User Profiles"""

    queryset = Developer.objects.all()
    serializer_class = DeveloperModelSerializer
    permission_classes = [AllowAny]

    def create(self, validated_data):
        user = Developer.objects.create_user(**validated_data)
        return user
    
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer