from django.urls import path

from base import views as base_views

urlpatterns = [
    path('',
         base_views.ProtectedDataView.as_view(),
         name='protected_data'),
]
