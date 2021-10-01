from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from datetime import datetime as dt

from .models import Blog, Tag
from .test_helpers import get_client, get_client_authenticated

class TagTests(APITestCase):
    """
    Tests for tag models views
    """
    def setUp(self):
        # Get account tokens and set up the authorization on APIClient
        self.client_authenticated, self.account = get_client_authenticated()

        # Add in 2 tags for testing purpose
        self.tag1 = Tag.objects.create(name="tag1")
        self.tag2 = Tag.objects.create(name="tag2")

    def test_create_tag(self):
        """
        Ensure that a tag can be created
        """
        self.client_authenticated.post(reverse('tag-list'), {'name': 'tag3'})
        self.assertEqual(len(Tag.objects.all()), 3)
    
    def test_get_tags(self):
        """
        Ensure that tags can be retrieved
        """
        response = self.client_authenticated.get(reverse('tag-list'))
        data = response.data
        self.assertEqual(data['count'], 2)
        self.assertEqual(len(data['results']), 2)
    
    def test_get_tag(self):
        """
        Ensure that a single tag can be retrieved
        """
        response = self.client.get(reverse('tag-detail', kwargs={'pk': 1}))
        self.assertEqual(response.data['id'], self.tag1.pk)


class BlogTests(APITestCase):
    """
    Tests for blog models views
    """
    def setUp(self):
        # Get account tokens and set up the authorization on APIClient
        self.client_authenticated, self.account1 = get_client_authenticated()
        self.client, self.account2 = get_client()

        # Add in 2 tags for testing purpose
        self.tag1 = Tag.objects.create(name="tag1")
        self.tag2 = Tag.objects.create(name="tag2")

        # Add in 2 blogs with different users for testing purpose
        self.blog1 = Blog.objects.create(
            title="title1",
            subtitle="subtitle1",
            slug="slug1",
            body="body1",
            publish_date=dt.now(),
            author=self.account1
        )
        self.blog1.tags.add(self.tag1)
        self.blog1.tags.add(self.tag2)
        self.blog1.save()

        self.blog2 = Blog.objects.create(
            title="title2",
            subtitle="subtitle2",
            slug="slug2",
            body="body2",
            publish_date=dt.now(),
            author=self.account2,
        )
        self.blog2.tags.add(self.tag2)
        self.blog2.save()

    def test_create_blog(self):
        """
        Ensure we can create a new blog whlie logged in
        and not otherwise
        """
        # Check that a blog cannot be created while not authenticated
        response = self.client.post(reverse('blog-list'), 
            {
                "title": "MY AWSOME TITLE",
                "subtitle": "MY AWSOME SUBTITLE",
                "slug": "slug",
                "body": "I HAVE NOTHING IMPORTANT TO SAY",
                "publish_date": "2021-10-01 01:47:58.022580",
                "tag_names": ["Python", "TAG"]
            }
        )
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(len(Blog.objects.all()), 2)

        # Check that a blog can be created while authenticated
        response = self.client_authenticated.post(reverse('blog-list'), 
            {
                "title": "MY AWSOME TITLE",
                "subtitle": "MY AWSOME SUBTITLE",
                "slug": "slug",
                "body": "I HAVE NOTHING IMPORTANT TO SAY",
                "publish_date": "2021-10-01 01:47:58.022580",
                "tag_names": ["Python", "TAG"]
            }
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(len(Blog.objects.all()), 3)

    def test_get_blogs(self):
        """
        Ensure that blogs can be retrieved
        """
        response = self.client.get(reverse('blog-list'))
        data = response.data
        self.assertEqual(data['count'], 2)
        self.assertEqual(len(data['results']), 2)
    
    def test_get_blog(self):
        """
        Ensure that a blog can be tetrieved
        """
        response = self.client.get(reverse('blog-detail', kwargs={'pk': 1}))
        self.assertEqual(response.data['id'], self.blog1.id)
        
    def test_edit_blog(self):
        """
        Ensure that the blog can be edited by it's author
        and not by another or anonymus user
        """
        # Check if non-author can edit
        response = self.client.put(reverse('blog-detail', kwargs={'pk': 1}), 
            {
                "title": "MY AWSOME TITLE",
                "slug": "a-b-c",
                "body": "MAMALIGA CU CARNATI"
            }
        )
        blog = Blog.objects.get(pk=1)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertNotEqual(blog.title, "MY AWSOEM TITLE")
        self.assertNotEqual(blog.slug, "a-b-c")
        self.assertNotEqual(blog.body, "MAMALIGA CU CARNATI")

        # Check if owner can change stuff
        response = self.client_authenticated.put(reverse('blog-detail', kwargs={'pk': 1}), 
            {
                "title": "MY AWSOME TITLE",
                "slug": "a-b-c",
                "body": "MAMALIGA CU CARNATI"
            }
        )
        blog = Blog.objects.get(pk=1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(blog.title, "MY AWSOME TITLE")
        self.assertEqual(blog.slug, "a-b-c")
        self.assertEqual(blog.body, "MAMALIGA CU CARNATI")