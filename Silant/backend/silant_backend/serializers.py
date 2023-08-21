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

    def create(self, validated_data):
        user = self.context['request'].user
        try:
            service_company = ServiceCompany.objects.get(serviceCompanyUser=user)
        except ServiceCompany.DoesNotExist:
            return Maintenance.objects.create(**validated_data)
        validated_data['serviceCompany'] = service_company
        return Maintenance.objects.create(**validated_data)


class MaintenanceSerializer(MaintenanceCreateSerializer):
    type = serializers.StringRelatedField(source='type.title')
    maintenanceOrganization = serializers.StringRelatedField(source='maintenanceOrganization.title')
    machine = serializers.StringRelatedField(source='machine.machineSerialNumber')
    serviceCompany = serializers.StringRelatedField(source='serviceCompany.serviceCompanyUser')


class ReclamationCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reclamation
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['request'].user
        try:
            service_company = ServiceCompany.objects.get(serviceCompanyUser=user)
        except ServiceCompany.DoesNotExist:
            return Reclamation.objects.create(**validated_data)
        validated_data['serviceCompany'] = service_company
        return Reclamation.objects.create(**validated_data)


class ReclamationSerializer(ReclamationCreateSerializer):
    failureJuncture = serializers.StringRelatedField(source='failureJuncture.title')
    recoveryMethod = serializers.StringRelatedField(source='recoveryMethod.title')
    machine = serializers.StringRelatedField(source='machine.machineSerialNumber')
    serviceCompany = serializers.StringRelatedField(source='serviceCompany.serviceCompanyUser')


class ClientSerializer(serializers.ModelSerializer):
    clientUser = serializers.StringRelatedField(source='clientUser.username')

    class Meta:
        model = Client
        fields = '__all__'


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


class UserSerializer(serializers.ModelSerializer):
    client = serializers.SerializerMethodField()
    company = serializers.SerializerMethodField()
    manager = serializers.SerializerMethodField()

    def get_client(self, obj):
        return Client.objects.filter(clientUser=obj).exists()

    def get_company(self, obj):
        return ServiceCompany.objects.filter(serviceCompanyUser=obj).exists()

    def get_manager(self, obj):
        return Manager.objects.filter(managerUser=obj).exists()

    class Meta:
        model = User
        fields = ['username', 'client', 'company', 'manager']
