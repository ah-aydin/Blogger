from rest_framework import serializers
from .models import Blog, Tag

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ('url', 'id', 'name')

class BlogSerializer(serializers.HyperlinkedModelSerializer):
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
            'publish_date', 'published', 'author_url',
            'tags'
        )