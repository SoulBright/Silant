from rest_framework import viewsets, permissions
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend

from .permissions import MachineAPIPermissions, ReclamationAPIPermissions
from .serializers import *
from .filters import *


class MachineAPIView(viewsets.ModelViewSet):
    queryset = Machine.objects.all().order_by('-shipDate')
    serializer_class = MachineSerializer
    permission_classes = [MachineAPIPermissions]
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filterset_class = MachineFilter
    search_fields = ['machineSerialNumber']

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            if self.action == 'create':
                return MachineCreateSerializer
            return super().get_serializer_class()
        else:
            return UnauthenticatedMachineSerializer


class MaintenanceAPIView(viewsets.ModelViewSet):
    queryset = Maintenance.objects.all().order_by('-date')
    serializer_class = MaintenanceSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = (DjangoFilterBackend,)
    filterset_class = MaintenanceFilter

    def get_queryset(self):
        if Client.objects.filter(clientUser=self.request.user).exists():
            user = self.request.user
            queryset = super().get_queryset().filter(machine__client__clientUser=user)
            return queryset     # Клиетны видят только ТО своих машин
        elif ServiceCompany.objects.filter(serviceCompanyUser=self.request.user).exists():
            user = self.request.user    # Сервисные компании видят только ТО выполненые ими
            queryset = super().get_queryset().filter(serviceCompany__serviceCompanyUser=user)
            return queryset
        elif Manager.objects.filter(managerUser=self.request.user).exists():
            queryset = Maintenance.objects.all()
            return queryset

    def get_serializer_class(self):
        if self.action == 'create':
            return MaintenanceCreateSerializer
        return super().get_serializer_class()


class ReclamationAPIView(viewsets.ModelViewSet):
    queryset = Reclamation.objects.all().order_by('-failureDate')
    serializer_class = ReclamationSerializer
    permission_classes = [ReclamationAPIPermissions]
    filter_backends = (DjangoFilterBackend,)
    filterset_class = ReclamationFilter

    def get_queryset(self):
        if Client.objects.filter(clientUser=self.request.user).exists():
            user = self.request.user
            queryset = super().get_queryset().filter(machine__client__clientUser=user)
            return queryset     # Клиетны видят только рекламации связанные с их машинами
        elif ServiceCompany.objects.filter(serviceCompanyUser=self.request.user).exists():
            user = self.request.user
            queryset = super().get_queryset().filter(serviceCompany__serviceCompanyUser=user)
            return queryset     # Сервисные компании видят только свои рекламации
        elif Manager.objects.filter(managerUser=self.request.user).exists():
            queryset = Reclamation.objects.all()
            return queryset

    def get_serializer_class(self):
        if self.action == 'create':
            return ReclamationCreateSerializer
        return super().get_serializer_class()
