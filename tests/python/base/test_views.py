import mock
from django.core.urlresolvers import reverse
from django.test import override_settings
from rest_framework import status
from rest_framework.test import APITestCase

from tests.python.accounts.test_models import UserFactory
from tests.python.accounts.test_views import get_basic_auth_header

from lib.testutils import mock_some_async_task


@override_settings(CELERY_EAGER_PROPAGATES_EXCEPTIONS=True, CELERY_ALWAYS_EAGER=True, BROKER_BACKEND='memory')
class BaseTests(APITestCase):
    def setUp(self):
        self.user = UserFactory.create(email='emailwilllogin@mydomain.com',
                                       first_name='Test',
                                       last_name='User')
        self.user.set_password('test')
        self.user.save()

    def test_get_protected_page(self):
        # Ensure we can login with given credentials.
        url = reverse('accounts:login')
        self.client.credentials(HTTP_AUTHORIZATION=get_basic_auth_header('emailwilllogin@mydomain.com', 'test'))
        response = self.client.post(url, format='json')
        self.assertTrue('token' in response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.credentials(HTTP_AUTHORIZATION='Token {}'.format(response.data['token']))

        # user confirmed account unsuccessfully
        url = reverse('base:protected_data')
        response = self.client.get(url)
        self.assertEqual(response.data['data'], 'THIS IS THE PROTECTED STRING FROM SERVER')

    def test_get_main_page(self):
        response = self.client.get(reverse('index'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    @override_settings(CELERY_ALWAYS_EAGER=True)
    @mock.patch('lib.tasks.some_async_task.delay', mock_some_async_task)
    def test_execute_async_task(self):
        response = self.client.post(reverse('base:async_task'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
