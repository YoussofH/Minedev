from .models import Plan
from rest_framework.serializers import ModelSerializer, Serializer
from .models import Developer

from django.contrib.auth import authenticate
from rest_framework import exceptions
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class PlanSerializer(ModelSerializer):
    class Meta:
        model = Plan
        fields = '__all__'

class DeveloperModelSerializer(ModelSerializer):
    def create(self, validated_data):
        user = Developer.objects.create_user(**validated_data)
        return user
    
    def to_representation(self, instance):
        """Overriding to remove Password Field when returning Data"""
        ret = super().to_representation(instance)
        ret.pop('password', None)
        return ret
    
    class Meta:
        model = Developer
        fields = ['fullname', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True, 'min_length': 5}}



class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'

    def validate(self, attrs):
        credentials = {
            'email': attrs.get('email'),
            'password': attrs.get('password')
        }

        user = authenticate(**credentials)

        if user:
            if not user.is_active:
                raise exceptions.AuthenticationFailed('User is deactivated')

            data = {}
            refresh = self.get_token(user)

            data['refresh'] = str(refresh)
            data['access'] = str(refresh.access_token)

            return data
        else:
            raise exceptions.AuthenticationFailed('No active account found with the given credentials')


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer