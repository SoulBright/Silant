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
    equipmentModel = serializers.StringRelatedField(source='equipmentModel.title')
    engineMake = serializers.StringRelatedField(source='engineMake.title')
    transmissionModel = serializers.StringRelatedField(source='transmissionModel.title')
    drivingBridgeModel = serializers.StringRelatedField(source='drivingBridgeModel.title')
    controlledBridgeModel = serializers.StringRelatedField(source='controlledBridgeModel.title')

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
        fields = '__all__'


class MaintenanceSerializer(MaintenanceCreateSerializer):
    type = serializers.StringRelatedField(source='type.title')
    maintenanceOrganization = serializers.StringRelatedField(source='maintenanceOrganization.title')
    machine = serializers.StringRelatedField(source='machine.machineSerialNumber')
    serviceCompany = serializers.StringRelatedField(source='serviceCompany.serviceCompanyUser')


class ReclamationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reclamation
        fields = '__all__'


class ReclamationSerializer(ReclamationCreateSerializer):
    failureJuncture = serializers.StringRelatedField(source='failureJuncture.title')
    recoveryMethod = serializers.StringRelatedField(source='recoveryMethod.title')
    machine = serializers.StringRelatedField(source='machine.machineSerialNumber')
    serviceCompany = serializers.StringRelatedField(source='serviceCompany.serviceCompanyUser')


class ServiceCompanySerializer(serializers.ModelSerializer):
    serviceCompanyUser = serializers.StringRelatedField(source='serviceCompanyUser.username')

    class Meta:
        model = ServiceCompany
        fields = '__all__'


class EquipmentModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = EquipmentModel
        fields = '__all__'


class EngineMakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EngineMake
        fields = '__all__'


class TransmissionModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransmissionModel
        fields = '__all__'


class DrivingBridgeModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrivingBridgeModel
        fields = '__all__'


class ControlledBridgeModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ControlledBridgeModel
        fields = '__all__'


class MaintenanceTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaintenanceType
        fields = '__all__'


class MaintenanceOrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaintenanceOrganization
        fields = '__all__'


class FailureJunctureSerializer(serializers.ModelSerializer):
    class Meta:
        model = FailureJuncture
        fields = '__all__'


class RecoveryMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecoveryMethod
        fields = '__all__'

