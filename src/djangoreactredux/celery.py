from __future__ import absolute_import, unicode_literals
import os
from celery import Celery

from datetime import timedelta

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'djangoreactredux.settings.dev')

app = Celery('djangoreactredux', namespace='CELERY')

# Using a string here means the worker don't have to serialize
# the configuration object to child processes.
app.config_from_object('django.conf:settings')
app.autodiscover_tasks()

from django.conf import settings  # noqa
app.conf.timezone = settings.TIME_ZONE

app.conf.update(
    CELERYBEAT_SCHEDULE={
        'periodic_task': {
            'task': 'some_async_task',
            'schedule': timedelta(minutes=1)
        }
    }
)
