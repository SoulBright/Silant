from django.contrib import admin
from .models import *

admin.site.register(Client)
admin.site.register(ServiceCompany)
admin.site.register(Machine)
admin.site.register(Maintenance)
admin.site.register(Reclamation)
admin.site.register(EquipmentModel)
admin.site.register(EngineMake)
admin.site.register(TransmissionModel)
admin.site.register(DrivingBridgeModel)
admin.site.register(ControlledBridgeModel)
admin.site.register(MaintenanceType)
admin.site.register(MaintenanceOrganization)
admin.site.register(FailureJuncture)
admin.site.register(RecoveryMethod)
