from .models import Blog, Tag
from .serializers import BlogSerializer, TagSerializer

from rest_framework import generics, permissions, serializers

class BlogList(generics.ListAPIView):
    """
    Returns a list of all available blogs.
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

class BlogDetail(generics.RetrieveAPIView):
    """
    Returns detailed view of the given blog
    """
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

class TagList(generics.ListAPIView):
    """
    Returns a list of all available tags
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class TagDetail(generics.RetrieveAPIView):
    """
    Returns the tag given the id
    """
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    