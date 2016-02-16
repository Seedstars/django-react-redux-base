from rest_framework import serializers

from accounts.models import User
from lib.utils import validate_email as email_is_valid


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'first_name', 'last_name', 'password')

    def create(self, validated_data):
        """Register an user in the test app."""
        user = User.objects.create_user(**validated_data)

        return user

    def validate_email(self, value):
        """Validate if email is valid or there is an user using the email."""

        if not email_is_valid(value):
            raise serializers.ValidationError('Please use a different email address provider.')

        return value
