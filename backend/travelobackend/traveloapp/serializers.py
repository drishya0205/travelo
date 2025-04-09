from django.contrib.auth.models import User
from rest_framework import serializers
from .models import CustomUser
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only = True)
    class Meta:
        model = CustomUser
        fields = ('email', 'name', 'password')
        
    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data.get('email'),
            name=validated_data['name'],
            
            password=validated_data['password']
        )
        return user
    


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'  # 🔑 tell JWT to look for 'email'

    def validate(self, attrs):
        data = super().validate(attrs)
        data.update({'user': self.user.email})
        return data


