from django.test import TestCase

from lib.utils import validate_email


class BaseTests(TestCase):
    def test_validate_email(self):
        self.assertEqual(validate_email('fail'), False)
        self.assertEqual(validate_email(''), False)
        self.assertEqual(validate_email('test@mailinator.com'), False)
        self.assertEqual(validate_email('good.email@example.com'), False)
