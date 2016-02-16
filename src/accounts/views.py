from django.shortcuts import get_object_or_404
from django_rest_logger import log
from rest_framework import status, parsers, renderers
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import CreateModelMixin
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from rest_framework_jwt.serializers import JSONWebTokenSerializer
from rest_framework_jwt.utils import jwt_response_payload_handler

from accounts.models import User
from accounts.serializers import UserRegistrationSerializer
from lib.utils import AtomicMixin


class UserRegisterView(AtomicMixin, CreateModelMixin, GenericAPIView):
    serializer_class = UserRegistrationSerializer
    authentication_classes = ()

    def post(self, request):
        """User registration view."""
        return self.create(request)


class UserLoginView(APIView):
    throttle_classes = ()
    permission_classes = ()
    authentication_classes = ()
    parser_classes = (parsers.FormParser, parsers.JSONParser,)
    renderer_classes = (renderers.JSONRenderer,)
    serializer_class = JSONWebTokenSerializer

    def post(self, request):
        """
        User login view.

        Based on JSONWebTokenAPIView from rest_framework_jwt.
        """
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            user = serializer.object.get('user') or request.user
            token = serializer.object.get('token')
            response_data = jwt_response_payload_handler(token, user, request)

            return Response(response_data)

        log.warning(message='Authentication failed.', details={'http_status_code': status.HTTP_401_UNAUTHORIZED})
        return Response(serializer.errors, status=status.HTTP_401_UNAUTHORIZED)


class UserConfirmEmailView(AtomicMixin, GenericAPIView):
    serializer_class = ()
    authentication_classes = ()

    def get(self, request, activation_key):
        """
        View for confirm email.

        Receive an activation key as parameter and confirm email.
        """
        user = get_object_or_404(User, activation_key=str(activation_key))
        if user.confirm_email():
            return Response(status=status.HTTP_200_OK)

        log.warning(message='Email confirmation key not found.',
                    details={'http_status_code': status.HTTP_404_NOT_FOUND})
        return Response(status=status.HTTP_404_NOT_FOUND)


class UserEmailConfirmationStatusView(GenericAPIView):
    serializer_class = ()
    authentication_classes = (JSONWebTokenAuthentication,)

    def get(self, request):
        """Retrieve user current confirmed_email status."""
        user = self.request.user
        return Response({'status': user.confirmed_email}, status=status.HTTP_200_OK)
