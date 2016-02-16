from django.conf.urls import url
from django.utils.translation import ugettext_lazy as _

from accounts import views as account_views

urlpatterns = [
    url(_(r'^register/$'), account_views.UserRegisterView.as_view(), name='register'),
    url(_(r'^login/$'), account_views.UserLoginView.as_view(), name='login'),
    url(_(r'^confirm/email/(?P<activation_key>.*)/$'), account_views.UserConfirmEmailView.as_view(),
        name='confirm_email'),
    url(_(r'^status/email/$'), account_views.UserEmailConfirmationStatusView.as_view(), name='status'),

]
