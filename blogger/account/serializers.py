from rest_framework import serializers
from .models import Account

class AccountCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'email', 'name', 'last_name', 'password')

class AccountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Account
        fields = (
            'url', 'id', 'email', 'name', 'last_name',
            'date_joined', 'last_login', 'blog_count'
        )