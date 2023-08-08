from django.urls import path
from .views import *

urlpatterns = [
    path('machine/', MachineAPIView.as_view({'get': 'list', 'post': 'create'})),
    path('maintenance/', MaintenanceAPIView.as_view({'get': 'list', 'post': 'create'})),
    path('reclamation/', ReclamationAPIView.as_view({'get': 'list', 'post': 'create'})),
    path('equipment-model/', EquipmentModelAPIView.as_view({'get': 'list', 'post': 'create'})),
    path('equipment-model/<str:title>', EquipmentModelAPIView.as_view({'get': 'retrieve', 'post': 'create'})),
    path('engine-make/', EngineMakeAPIView.as_view({'get': 'list', 'post': 'create'})),
    path('engine-make/<str:title>', EngineMakeAPIView.as_view({'get': 'retrieve', 'post': 'create'})),
    path('transmission-model/', TransmissionModelAPIView.as_view({'get': 'list', 'post': 'create'})),
    path('transmission-model/<str:title>', TransmissionModelAPIView.as_view({'get': 'retrieve', 'post': 'create'})),
    path('driving-bridge-model/', DrivingBridgeModelAPIView.as_view({'get': 'list', 'post': 'create'})),
    path('driving-bridge-model/<str:title>', DrivingBridgeModelAPIView.as_view({'get': 'retrieve', 'post': 'create'})),
    path('controlled-bridge-model/', ControlledBridgeModelAPIView.as_view({'get': 'list', 'post': 'create'})),
    path('controlled-bridge-model/<str:title>',
         ControlledBridgeModelAPIView.as_view({'get': 'retrieve', 'post': 'create'})),
    path('maintenance-type/', MaintenanceTypeAPIView.as_view({'get': 'list', 'post': 'create'})),
    path('maintenance-type/<str:title>', MaintenanceTypeAPIView.as_view({'get': 'retrieve', 'post': 'create'})),
    path('maintenance-organization/', MaintenanceOrganizationAPIView.as_view({'get': 'list', 'post': 'create'})),
    path('maintenance-organization/<str:title>', MaintenanceOrganizationAPIView.as_view({
        'get': 'retrieve',
        'post': 'create'
    })),
    path('failure-juncture/', FailureJunctureAPIView.as_view({'get': 'list', 'post': 'create'})),
    path('failure-juncture/<str:title>', FailureJunctureAPIView.as_view({'get': 'retrieve', 'post': 'create'})),
    path('recovery-method/', RecoveryMethodAPIView.as_view({'get': 'list', 'post': 'create'})),
    path('recovery-method/<str:title>', RecoveryMethodAPIView.as_view({'get': 'retrieve', 'post': 'create'})),
    path('service-company/', ServiceCompanyAPIView.as_view({'get': 'list', 'post': 'create'})),
]
