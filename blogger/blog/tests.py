from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from account.models import Account
from .models import Blog, Tag

class TagTests(APITestCase):
    def test_create_tag(self):
        """
        Ensure we can create a new tag
        """

class BlogTests(APITestCase):
    def test_create_blog(self):
        """
        Ensure we can create a new blog
        """