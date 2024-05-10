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

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer