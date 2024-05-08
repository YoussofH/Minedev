from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Plan
from .serializers import PlanSerializer

class PlanListAPIView(APIView):
    def get(self, request, format=None):
        plans = Plan.objects.all()
        serializer = PlanSerializer(plans, many=True)
        return Response(serializer.data)
