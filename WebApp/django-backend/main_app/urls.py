from django.urls import path
from .views import PlanListAPIView

urlpatterns = [
    path('plans/', PlanListAPIView.as_view()),
]