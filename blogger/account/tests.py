from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .test_helpers import get_client, get_client_authenticated
from .models import Follow

class AccountTests(APITestCase):
    def setUp(self):
        self.client_authenticated, self.account1 = get_client_authenticated()
        self.client, self.account2 = get_client()

    def test_account_list(self):
        """
        Ensure retrieval of all the accounts
        """
        response = self.client.get(reverse('account-list'))
        data = response.data
        self.assertEqual(data['count'], 2)
        self.assertEqual(len(data['results']), 2)
    
    def test_account_detail(self):
        """
        Ensure retrieval of the account details
        """
        response = self.client.get(reverse('account-detail', kwargs={'pk': 1}))
        self.assertEqual(response.data['id'], self.account1.pk)

class FollowTests(APITestCase):
    def setUp(self):
        self.client_authenticated, self.account1 = get_client_authenticated()
        self.client, self.account2 = get_client()

        # Create 2 follow object
        self.follow1 = Follow.objects.create(follower=self.account1, follows=self.account2)
        self.follow2 = Follow.objects.create(follower=self.account1, follows=self.account1)

    def test_get_followers(self):
        """
        Ensure retrieval of accounts followers
        """
        # Test for account1
        response = self.client.get(reverse('account-follower-list', kwargs={'pk': 1}))
        data = response.data
        self.assertEqual(data['count'], 1)
        self.assertEqual(len(data['results']), 1)
        
        # Test for account2
        response = self.client.get(reverse('account-follower-list', kwargs={'pk': 2}))
        data = response.data
        self.assertEqual(data['count'], 1)
        self.assertEqual(len(data['results']), 1)
    
    def test_get_follows(self):
        """
        Ensure retireval of accounts follows
        """
        # Test for account1
        response = self.client.get(reverse('account-follows-list', kwargs={'pk': 1}))
        data = response.data
        self.assertEqual(data['count'], 2)
        self.assertEqual(len(data['results']), 2)

        # Test for account2
        response = self.client.get(reverse('account-follows-list', kwargs={'pk': 2}))
        data = response.data
        self.assertEqual(data['count'], 0)
        self.assertEqual(len(data['results']), 0)
    
    def test_create_destroy_follow(self):
        """
        Ensure creation and destruction of follows while
        logged in and blocking the action while logged out
        """
        # Test for unauthenticated user
        response = self.client.post(reverse('account-create-destroy-follow'), {'follow_id': 1})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
        # Test for authenticated user
        # First unfollow
        response = self.client_authenticated.post(reverse('account-create-destroy-follow'), {'follow_id': 1})
        self.assertEqual(response.data, 'Unfollowed')
        self.assertEqual(len(Follow.objects.all()), 1)

        # Then follow
        response = self.client_authenticated.post(reverse('account-create-destroy-follow'), {'follow_id': 1})
        self.assertEqual(response.data, 'Followed')
        self.assertEqual(len(Follow.objects.all()), 2)
