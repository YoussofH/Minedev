from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import PlanViewSet

from .views import CustomTokenObtainPairView, UserProfileListCreateView
from .views import get_profile

router = DefaultRouter()
router.register('plans', PlanViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('user/register/', UserProfileListCreateView.as_view(), name='register'),
    path('user/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('user/profile/', get_profile, name='profile')
]