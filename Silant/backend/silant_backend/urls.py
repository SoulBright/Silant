from django.urls import path
from .views import *

urlpatterns = [
    path('machine/', MachineAPIView.as_view({'get': 'list', 'post': 'create'})),
    path('maintenance/', MaintenanceAPIView.as_view({'get': 'list', 'post': 'create'})),
    path('reclamation/', ReclamationAPIView.as_view({'get': 'list', 'post': 'create'})),
    path('equipment-model/', EquipmentModelAPIView.as_view({'get': 'list', 'post': 'create'})),
    path('engine-make/', EngineMakeAPIView.as_view({'get': 'list', 'post': 'create'})),
    path('transmission-model/', TransmissionModelAPIView.as_view({'get': 'list', 'post': 'create'})),
    path('driving-bridge-model/', DrivingBridgeModelAPIView.as_view({'get': 'list', 'post': 'create'})),
    path('controlled-bridge-model/', ControlledBridgeModelAPIView.as_view({'get': 'list', 'post': 'create'})),
    path('maintenance-type/', MaintenanceTypeAPIView.as_view({'get': 'list', 'post': 'create'})),
    path('maintenance-organization/', MaintenanceOrganizationAPIView.as_view({'get': 'list', 'post': 'create'})),
    path('failure-juncture/', FailureJunctureAPIView.as_view({'get': 'list', 'post': 'create'})),
    path('recovery-method/', RecoveryMethodAPIView.as_view({'get': 'list', 'post': 'create'})),
    path('service-company/', ServiceCompanyAPIView.as_view({'get': 'list', 'post': 'create'})),
]