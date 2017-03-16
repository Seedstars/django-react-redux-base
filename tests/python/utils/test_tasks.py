from django.test import TestCase

from lib.tasks import some_async_task


class BaseTests(TestCase):
    def test_some_async_task(self):
        self.assertEqual(some_async_task(), True)
