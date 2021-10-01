from rest_framework import generics, permissions, serializers

from .models import Blog, Tag
from .serializers import BlogSerializer, TagSerializer
from .permissions import IsOwnerOrReadOnly, ReadOnly


class BlogList(generics.ListCreateAPIView):
    """
    GET - Returns a list of all available blogs.
    POST - Adds in a new blog if authenticated
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

    def perform_create(self, serializer):
        """
        Override the default create behaviour to add in the tags
        """
        data = self.request.data
        tags = data['tag_names']

        # Create the object
        blog = serializer.save(
            author=self.request.user,
            title=data['title'],
            subtitle=data['subtitle'],
            slug=data['slug'],
            body=data['body'],
            publish_date=data['publish_date']
        )
        # Add the tags
        for tag in tags:
            try:
                blog.tags.add(Tag.objects.get(name=tag))
            except Exception:
                pass
        blog.save()

class BlogDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    GET - Returns detailed view of the given blog
    PUT - Updates the blog if authenticated. Required fileds ('title', 'slug')
    """
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

class TagList(generics.ListCreateAPIView):
    """
    GET - Returns a list of all available tags
    POST - Adds a new tag
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Tag.objects.all()
    serializer_class = TagSerializer


class TagDetail(generics.RetrieveAPIView):
    """
    GET - Returns the tag given the id
    """
    permission_classes = [ReadOnly]
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    