from rest_framework import serializers

from accounts.models import User
from lib.utils import validate_email as email_is_valid


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'password')

    def validate_email(self, value):
        """
        Validate if email is valid or there is an user using the email.

        :param value: string
        :return: string
        """

        if not email_is_valid(value):
            raise serializers.ValidationError('Please use a different email address provider.')

        return value
