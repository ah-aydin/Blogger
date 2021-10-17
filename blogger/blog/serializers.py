from django.utils.formats import date_format
from rest_framework import serializers, fields

from .models import Blog, Tag, Comment

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('url', 'id', 'name')

class BlogSerializer(serializers.HyperlinkedModelSerializer):
    comments_url = serializers.HyperlinkedIdentityField(view_name='blog-comment-list')
    author_url = serializers.HyperlinkedRelatedField(
        view_name='account-detail',
        source='author',
        read_only=True
    )
    class Meta:
        model = Blog
        fields = (
            'url', 'id', 'title', 'subtitle', 'slug',
            'body', 'date_created', 'date_modified',
            'publish_date', 'published', 
            'author_url',
            'comments_url',
            'tags'
        )

class CommentSerializer(serializers.HyperlinkedModelSerializer):
    author_url = serializers.HyperlinkedRelatedField(
        view_name='account-detail',
        source='author',
        read_only=True
    )
    author_name = serializers.CharField(source='author.name', required=False)
    author_last_name = serializers.CharField(source='author.last_name', required=False)
    author_id = serializers.IntegerField(source='author.id', required=False)
    blog_url = serializers.HyperlinkedRelatedField(
        view_name='blog-detail',
        source='blog',
        read_only=True
    )
    class Meta:
        model = Comment
        fields = (
            'id', 
            'author_url',
            'blog_url', 
            'body',
            'author_id',
            'author_name',
            'author_last_name'
        )