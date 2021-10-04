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
            'publish_date', 'published', 'author_url', 'comments_url',
            'tags'
        )

class CommentSerializer(serializers.HyperlinkedModelSerializer):
    author_url = serializers.HyperlinkedRelatedField(
        view_name='account-detail',
        source='author',
        read_only=True
    )
    blog_url = serializers.HyperlinkedRelatedField(
        view_name='blog-detail',
        source='blog',
        read_only=True
    )
    class Meta:
        model = Comment
        fields = (
            'id', 'author_url', 'blog_url', 'body'
        )