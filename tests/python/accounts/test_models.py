import factory
from django.test import TestCase

from accounts.models import User


class UserFactory(factory.DjangoModelFactory):
    first_name = 'John'
    last_name = 'Doe'
    is_active = True

    class Meta:
        model = User
        django_get_or_create = ('email',)


class AccountsModelsTests(TestCase):
    def setUp(self):
        self.user = UserFactory.create(email='test@test.com')

    def test_unicode(self):
        self.assertEqual(str(self.user), 'test@test.com')

    def test_super_user(self):
        super_user = User.objects.create_superuser(email='email@test.com')
        self.assertEqual(super_user.is_superuser, True)

    def test_user(self):
        user = User.objects.create_user(email='email@test.com', first_name='user', last_name='test', password='test')
        self.assertEqual(user.is_superuser, False)

    def test_get_full_name(self):
        self.assertEqual(self.user.get_full_name(), 'John Doe')

    def test_get_short_name(self):
        self.assertEqual(self.user.get_short_name(), 'John')
