from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import PlanViewSet

from .views import UserProfileListCreateView
from .views import CustomTokenObtainPairView

router = DefaultRouter()
router.register('plans', PlanViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('user/register/', UserProfileListCreateView.as_view(), name='register'),
    path('user/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair')
]