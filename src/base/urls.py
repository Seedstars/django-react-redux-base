from django.conf.urls import url

from base import views as base_views

urlpatterns = [
    url(r'get_data', base_views.ProtectedDataView.as_view(), name='protected_data'),
    url(r'async_task', base_views.AsyncTaskView.as_view(), name='async_task'),
]
