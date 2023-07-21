from rest_framework import serializers
from .models import *


class MachineCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Machine
        fields = '__all__'


class MachineSerializer(serializers.ModelSerializer):
    equipmentModel = serializers.StringRelatedField(source='equipmentModel.title')
    engineMake = serializers.StringRelatedField(source='engineMake.title')
    transmissionModel = serializers.StringRelatedField(source='transmissionModel.title')
    drivingBridgeModel = serializers.StringRelatedField(source='drivingBridgeModel.title')
    controlledBridgeModel = serializers.StringRelatedField(source='controlledBridgeModel.title')
    client = serializers.StringRelatedField(source='client.clientUser')
    serviceCompany = serializers.StringRelatedField(source='serviceCompany.serviceCompanyUser')

    class Meta:
        model = Machine
        fields = '__all__'


class UnauthenticatedMachineSerializer(MachineCreateSerializer):
    class Meta:
        model = Machine
        fields = ('machineSerialNumber',
                  'equipmentModel',
                  'engineMake',
                  'engineSerialNumber',
                  'transmissionModel',
                  'transmissionSerialNumber',
                  'drivingBridgeModel',
                  'drivingBridgeSerialNumber',
                  'controlledBridgeModel',
                  'controlledBridgeSerialNumber')


class MaintenanceCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Maintenance
        fields = ('type',
                  'date',
                  'operatingTime',
                  'workOrder',
                  'workOrderDate',
                  'maintenanceOrganization',
                  'machine',
                  'serviceCompany')


class MaintenanceSerializer(MaintenanceCreateSerializer):
    type = serializers.StringRelatedField(source='type.title')
    maintenanceOrganization = serializers.StringRelatedField(source='maintenanceOrganization.title')
    machine = serializers.StringRelatedField(source='machine.machineSerialNumber')
    serviceCompany = serializers.StringRelatedField(source='serviceCompany.serviceCompanyUser')


class ReclamationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reclamation
        fields = ('failureDate',
                  'operatingTime',
                  'failureJuncture',
                  'failureDescription',
                  'recoveryMethod',
                  'spareParts',
                  'recoveryDate',
                  'equipmentDowntime',
                  'machine',
                  'serviceCompany')


class ReclamationSerializer(ReclamationCreateSerializer):
    failureJuncture = serializers.StringRelatedField(source='failureJuncture.title')
    recoveryMethod = serializers.StringRelatedField(source='recoveryMethod.title')
    machine = serializers.StringRelatedField(source='machine.machineSerialNumber')
    serviceCompany = serializers.StringRelatedField(source='serviceCompany.serviceCompanyUser')
