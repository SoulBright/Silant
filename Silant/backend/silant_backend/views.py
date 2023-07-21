from rest_framework import viewsets, permissions
from .permissions import MachineAPIPermissions, ReclamationAPIPermissions

from .serializers import *


class MachineAPIView(viewsets.ModelViewSet):
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer
    permission_classes = [MachineAPIPermissions]

    def get_serializer_class(self):
        if self.request.user.is_authenticated:
            if self.action == 'create':
                return MachineCreateSerializer
            return super().get_serializer_class()
        else:
            return UnauthenticatedMachineSerializer


class MaintenanceAPIView(viewsets.ModelViewSet):
    queryset = Maintenance.objects.all()
    serializer_class = MaintenanceSerializer
    permission_classes = [permissions.IsAuthenticated]

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
    queryset = Reclamation.objects.all()
    serializer_class = ReclamationSerializer
    permission_classes = [ReclamationAPIPermissions]

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
