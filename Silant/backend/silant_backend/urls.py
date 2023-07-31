from django.urls import path
from .views import *

urlpatterns = [
    path('machine/', MachineAPIView.as_view({'get': 'list', 'post': 'create'})),
    path('maintenance/', MaintenanceAPIView.as_view({'get': 'list', 'post': 'create'})),
    path('reclamation/', ReclamationAPIView.as_view({'get': 'list', 'post': 'create'})),
]