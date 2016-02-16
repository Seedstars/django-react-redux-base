import uuid

from django.core.urlresolvers import reverse
from django.test import override_settings
from rest_framework import status
from rest_framework.test import APITestCase

from lib.testutils import CustomTestCase
from tests.python.accounts.test_serializers import UserRegistrationSerializerTest, UserLoginSerializerTest
from .test_models import UserFactory


@override_settings(CELERY_EAGER_PROPAGATES_EXCEPTIONS=True, CELERY_ALWAYS_EAGER=True, BROKER_BACKEND='memory')
class AccountTests(CustomTestCase, APITestCase):
    def setUp(self):
        self.user = UserFactory.create(email='emailwilllogin@mydomain.com',
                                       first_name='Test',
                                       last_name='User')
        self.user.set_password('test')
        self.user.save()
        self.user_2 = UserFactory.create(email='emailwilllogininserializer@mydomain.com')

    def test_account_register_unsuccessful(self):
        self.assert_invalid_data_response(invalid_data_dicts=UserRegistrationSerializerTest.INVALID_DATA_DICT,
                                          url=reverse('accounts:register'))

    def test_account_login_unsucessfull(self):
        self.assert_invalid_data_response(invalid_data_dicts=UserLoginSerializerTest.INVALID_DATA_DICT,
                                          url=reverse('accounts:login'))

    def test_account_login_sucessfull_and_perform_actions(self):
        # Ensure we can login with given credentials.
        url = reverse('accounts:login')
        data = {'email': 'emailwilllogin@mydomain.com', 'password': 'test'}
        response = self.client.post(url, data, format='json')
        self.assertTrue('token' in response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.client.credentials(HTTP_AUTHORIZATION='JWT ' + response.data['token'])

        # user confirmed account unsuccessfully
        url = reverse('accounts:status')
        response = self.client.get(url)
        self.assertEqual(response.data['status'], False)

    def test_account_confirm_email_unsucessfull(self):
        # wrong activation key
        url = reverse('accounts:confirm_email', args=[str(uuid.uuid4())])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_account_confirm_email_sucessfull(self):
        user = UserFactory.create(email='emailtoconfirm@mydomain.com',
                                  first_name='Test',
                                  last_name='User',
                                  confirmed_email=False)

        # confirm email successful
        url = reverse('accounts:confirm_email', args=[str(user.activation_key)])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        # email already confirmed
        url = reverse('accounts:confirm_email', args=[str(user.activation_key)])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
