"""
WSGI config for django-react-redux-base project.

"""
import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "djangoreactredux.settings")

application = get_wsgi_application()
