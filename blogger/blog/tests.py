from logging import StringTemplateStyle
from django.http import request, response
from django.urls import reverse
from django.utils import timezone
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Blog, Tag, Comment
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
        self.client_authenticated.post(reverse('tag-list'), {'name': 'tag3'}, format="json")
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
            publish_date=timezone.now(),
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
            publish_date=timezone.now(),
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
                "publish_date": timezone.now(),
                "tag_names": ["Python", "TAG"]
            },
            format="json"
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
                "publish_date": timezone.now(),
                "tag_names": ["tag1", "tag2"]
            },
            format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(len(Blog.objects.all()), 3)
    
    def test_create_blog_new_tags(self):
        """
        Ensure we can create a new blog with new tags
        """
        response = self.client_authenticated.post(reverse('blog-list'),
            {
                "title": "MY AWSOME TITLE",
                "subtitle": "MY AWSOME SUBTITLE",
                "slug": "slug",
                "body": "I HAVE NOTHING IMPORTANT TO SAY",
                "publish_date": timezone.now(),
                "tag_names": ["Python", "TAG", "Mamaliga cu carnati este foarte tare"]
            },
            format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(len(Blog.objects.all()), 3)
        # See if we have got the new tags in the database
        self.assertEqual(len(Tag.objects.all()), 5)

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

    def test_delete_blog(self):
        """
        Ensure that the logged in user can delete a blog
        """
        # See that the unauthenticated user is unable to delete the blog
        response = self.client.delete(reverse('blog-detail', kwargs={'pk': 1}))
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
        # See that the authenticated use is able to delete the blog
        response = self.client_authenticated.delete(reverse('blog-detail', kwargs={'pk': 1}))
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(len(Blog.objects.all()), 1)

class CommentTests(APITestCase):
    """
    Tests for comment models views
    """
    def setUp(self):
        self.client_authenticated, self.account1 = get_client_authenticated()
        self.client, self.account2 = get_client()

        # Create 2 blogs from 2 different accounts
        self.blog1 = Blog.objects.create(
            title="title1",
            subtitle="subtitle1",
            slug="slug1",
            body="body1",
            publish_date=timezone.now(),
            author=self.account1
        )
        self.blog2 = Blog.objects.create(
            title="title2",
            subtitle="subtitle2",
            slug="slug2",
            body="body2",
            publish_date=timezone.now(),
            author=self.account2,
        )

        self.comment1 = Comment.objects.create(
            author=self.account1,
            blog=self.blog1,
            body="comment1 - blog1"
        )
        self.comment2 = Comment.objects.create(
            author=self.account1,
            blog=self.blog1,
            body="comment2 - blog1"
        )
        
    # TODO Create tests for the POST and GET requests
    def test_get_comments(self):
        """
        Ensure that comments of a blog can be retrieved
        """
        response = self.client.get(reverse('blog-comment-list', kwargs={'pk': 1}))
        self.assertEqual(len(response.data['results']), 2)
    
    def test_post_comments(self):
        """
        Ensure that a logged in user can post comments
        """
        # See that unauthenticated user cannot post a comment
        request = self.client.post(reverse('blog-comment-list', kwargs={'pk': 1}),
            {
                "body": "comment3 - blog1"
            },
            format="json"
        )
        self.assertEqual(request.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(len(Comment.objects.all()), 2)

        # See that the authenticated use can post a comment
        request = self.client_authenticated.post(reverse('blog-comment-list', kwargs={'pk' :1}),
            {
                "body": "comment3 - blog1"
            },
            format="json"
        )
        self.assertEqual(request.status_code, status.HTTP_201_CREATED)
        self.assertEqual(len(Comment.objects.all()), 3)

    def test_delete_comment(self):
        """
        Ensure that a logged in user can delete their comment
        """
        # Test if an unauthenticated user can delete the comment
        request = self.client.delete(reverse('comment-detail', kwargs={'pk': 1}))
        self.assertEqual(request.status_code, status.HTTP_401_UNAUTHORIZED)
        
        # Test if an authenticated user can delete the comment
        request = self.client_authenticated.delete(reverse('comment-detail', kwargs={'pk': 1}))
        self.assertEqual(len(Comment.objects.all()), 1)

    def test_edit_comment(self):
        """
        Ensure that a logged in user can edit their comment
        """
        # Test if an unauthenitcated user can edit the comment
        request = self.client.put(reverse('comment-detail', kwargs={'pk': 1}),
            {
                "body": "CHANGE DIS"
            },
            format="json"
        )
        self.assertEqual(request.status_code, status.HTTP_401_UNAUTHORIZED)
        comment = Comment.objects.get(pk=1)
        self.assertEqual(comment.body, self.comment1.body)

        # Test if an authenticated user can edit the comment
        request = self.client_authenticated.put(reverse('comment-detail', kwargs={'pk': 1}),
            {
                "body": "CHANGE DIS"
            },
            format="json"
        )
        self.assertEqual(request.status_code, status.HTTP_200_OK)
        comment = Comment.objects.get(pk=1)
        self.assertEqual(comment.body, "CHANGE DIS")