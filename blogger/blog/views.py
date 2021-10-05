from django.conf import settings
from rest_framework import generics, permissions

from .models import Blog, Comment, Tag
from .serializers import BlogSerializer, TagSerializer, CommentSerializer
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
                # Add the tag if it exists
                blog.tags.add(Tag.objects.get(name=tag))
            except Exception:
                try:
                    # Add the tag if it does not exist
                    blog.tags.add(Tag.objects.create(name=tag))
                except Exception:
                    pass
        blog.save()

class BlogDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    GET - Returns detailed view of the given blog
    PUT - Updates the blog if authenticated and owner. Required fileds ('title', 'slug')
    DELETE - Deletes the blog if authenticated and owner
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

class BlogComments(generics.ListCreateAPIView):
    """
    GET - Lists comments of the given blog
    POST - Creates a new comment if logged in
    """
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = CommentSerializer
    def get_queryset(self):
        try:
            return Comment.objects.filter(blog__pk=self.kwargs['pk'])
        except Exception:
            return []
    
    def perform_create(self, serializer):
        """
        Override the default create behaviour
        """
        data = self.request.data
        author = self.request.user
        body = data['body']
        blog_id = self.kwargs['pk']

        try:
            blog = Blog.objects.get(pk=blog_id)
        except Exception:
            raise Exception("Blog with the given id does not exist")

        Comment.objects.create(
            author=author,
            blog=blog,
            body=body
        )

class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    GET - Returns detailed view of the given blog
    PUT - Updates the blog if authenticated. Required fileds ('body')
    DELETE - Deletes the comment if authenticated and owner
    """
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

class AccountBlogList(generics.ListAPIView):
    """
    GET - Returns the list of blogs posted by the account, provided by the id
    """
    serializer_class = BlogSerializer
    def get_queryset(self):
        return Blog.objects.filter(author__pk=self.kwargs['pk'])

class AccountCommentList(generics.ListAPIView):
    """
    GET - Returns the list of comments posted by the account, provided by the id
    """
    serializer_class = CommentSerializer
    def get_queryset(self):
        return Comment.objects.filter(author__pk=self.kwargs['pk'])