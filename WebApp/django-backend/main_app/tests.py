from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from .models import Developer, Conversation, BotResponse, Project
from rest_framework.test import APIClient

class GetProfileTest(TestCase):
    def setUp(self):
        self.user = Developer.objects.create_user(
            email='test_user@example.com', password='test_password'
        )
        self.client = APIClient()

    def test_get_profile_authenticated(self):
        token_url = reverse('token_obtain_pair')
        response = self.client.post(token_url, {'email': 'test_user@example.com', 'password': 'test_password'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        token = response.data['access']

        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')

        url = reverse('profile')
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_profile_unauthenticated(self):
        url = reverse('profile')
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


class BotResponseListViewSetTest(TestCase):
    def setUp(self):
        # Create test user, conversation, and bot responses
        self.user = Developer.objects.create_user(
            email='test_user@example.com', password='test_password'
        )
        self.project = Project.objects.create(user=self.user, name="test_project", path="test_path")
        self.conversation = Conversation.objects.create(user=self.user, project=self.project)
        BotResponse.objects.create(conversation=self.conversation, content="Test response 1")
        BotResponse.objects.create(conversation=self.conversation, content="Test response 2")

        self.client = APIClient()

    def test_list_authenticated_with_conversation(self):
        token_url = reverse('token_obtain_pair')
        response = self.client.post(token_url, {'email': 'test_user@example.com', 'password': 'test_password'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        token = response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')

        url = reverse('bot-responses-list') + f'?conversation={self.conversation.pk}'
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

    def test_list_unauthenticated(self):
        url = reverse('bot-responses-list')
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_list_for_different_user(self):
        # Create another user and conversation
        another_user = Developer.objects.create_user(
            email='test_another_user@example.com', password='test_another_password'
        )
        project = Project.objects.create(user=self.user, name="test_another_project", path="test_another_path")
        another_conversation = Conversation.objects.create(user=self.user, project=project)

        token_url = reverse('token_obtain_pair')
        response = self.client.post(token_url, {'email': 'test_user@example.com', 'password': 'test_password'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        token = response.data['access']
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')

        url = reverse('bot-responses-list') + '?conversation={}'.format(another_conversation.pk)
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)
