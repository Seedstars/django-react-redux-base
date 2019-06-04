from django.urls import path
from django.utils.translation import ugettext_lazy as _

import accounts.views

urlpatterns = [
    path(_('register/'),
         accounts.views.UserRegisterView.as_view(),
         name='register'),
    path(_('login/'),
         accounts.views.UserLoginView.as_view(),
         name='login'),
    path(_('confirm/email/<str:activation_key>/'),
         accounts.views.UserConfirmEmailView.as_view(),
         name='confirm_email'),
    path(_('status/email/'),
         accounts.views.UserEmailConfirmationStatusView.as_view(),
         name='status'),

]
