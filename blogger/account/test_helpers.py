from django.urls import reverse
from rest_framework.test import APIClient

from account.models import Account

TEST_USER = {
    'email': 'email@gmail.com',
    'name': 'Jon',
    'last_name': 'Doe', 
    'password': '1_sffVVdasdSO*FAx'
}

TEST_USER_2 = {
    'email': 'email2@gmail.com',
    'name': 'Jon2',
    'last_name': 'Doe2', 
    'password': '1_sffVVdasdSO*FAx'
}

LOGIN_DATA = {'email': TEST_USER['email'], 'password': TEST_USER['password']}

def get_client_authenticated():
    """
    Create an active account, return it's tokens and authenticate
    """
    client = APIClient()

    # Create account
    account = Account.objects.create_user(**TEST_USER)
    account.is_active = True
    account.save()

    # Log in to get user tokens
    response = client.post(reverse('jwt-create'), TEST_USER, format='json')
    access = response.data['access']

    client.credentials(HTTP_AUTHORIZATION=f"Bearer {access}")

    return client, account

def get_client():
    """
    Create an active account and return it's tokens
    """
    client = APIClient()

    # Create account
    account = Account.objects.create_user(**TEST_USER_2)
    account.is_active = True
    account.save()

    return client, account
