from rest_framework import serializers
from .models import Account, Follow

class AccountCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'email', 'name', 'last_name', 'password')

class AccountSerializer(serializers.HyperlinkedModelSerializer):
    follows_url = serializers.HyperlinkedIdentityField(view_name='account-follows-list')
    followers_url = serializers.HyperlinkedIdentityField(view_name='account-follower-list')
    class Meta:
        model = Account
        fields = (
            'url', 'id', 'email', 'name', 'last_name',
            'date_joined', 'last_login', 'blog_count', 'follower_count',
            'follows_url', 'followers_url'
        )

class AccountFollowerSerializer(serializers.HyperlinkedModelSerializer):
    follower_id = serializers.IntegerField(source='follower.id', required=False)
    follower_name = serializers.CharField(source='follower.name', required=False)
    follower_last_name = serializers.CharField(source='follower.last_name', required=False)
    follower_email = serializers.CharField(source='follower.email', required=False)
    class Meta:
        model = Follow
        fields = (
            'follower', 'follower_name', 'follower_last_name', 'follower_email', 'follower_id'
        )

class AccountFollowingSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Follow
        fields = (
            'follows',
        )