from django.shortcuts import render
from .models import Plan
from .serializers import PlanSerializer
from rest_framework.viewsets import ModelViewSet

class PlanViewSet(ModelViewSet):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer
