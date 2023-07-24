from django_filters import rest_framework as filters


from .models import Machine, Maintenance, Reclamation


class MachineFilter(filters.FilterSet):
    class Meta:
        model = Machine
        fields = ['equipmentModel', 'engineMake', 'transmissionModel', 'drivingBridgeModel', 'controlledBridgeModel']


class MaintenanceFilter(filters.FilterSet):
    class Meta:
        model = Maintenance
        fields = ['type', 'machine', 'serviceCompany']


class ReclamationFilter(filters.FilterSet):
    class Meta:
        model = Reclamation
        fields = ['failureJuncture', 'recoveryMethod', 'serviceCompany']
