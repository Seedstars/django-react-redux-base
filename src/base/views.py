import os

from django.conf import settings
from django.http import HttpResponse
from django.views.generic import View
from knox.auth import TokenAuthentication
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

import lib.tasks


class IndexView(View):
    """Render main page."""

    def get(self, request):
        """Return html for main application page."""

        abspath = open(os.path.join(settings.BASE_DIR, 'static_dist/index.html'), 'r')
        return HttpResponse(content=abspath.read())


class ProtectedDataView(GenericAPIView):
    """Return protected data main page."""

    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        """Process GET request and return protected data."""

        data = {
            'data': 'THIS IS THE PROTECTED STRING FROM SERVER',
        }

        return Response(data, status=status.HTTP_200_OK)


class AsyncTaskView(GenericAPIView):
    """Execute an asynchronous task."""

    authentication_classes = ()
    permission_classes = ()

    def post(self, request):
        """Process POST request and execute an asynchronous task."""

        lib.tasks.some_async_task.delay('See? This works!')
        return Response({}, status=status.HTTP_200_OK)
