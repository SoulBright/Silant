from django.db import models
from django.contrib.auth.models import User


class Client(models.Model):    # Клиент
    clientUser = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.clientUser}"


class ServiceCompany(models.Model):    # Сервисная компания
    serviceCompanyUser = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.serviceCompanyUser}"


class Machine(models.Model):    # Машина
    machineSerialNumber = models.CharField(max_length=32)   # Зав. № машины
    equipmentModel = models.ForeignKey('EquipmentModel', on_delete=models.CASCADE)  # Модель техники
    engineMake = models.ForeignKey('EngineMake', on_delete=models.CASCADE)    # Модель двигателя
    engineSerialNumber = models.CharField(max_length=32)    # Зав. № двигателя
    transmissionModel = models.ForeignKey('TransmissionModel', on_delete=models.CASCADE)  # Модель трансмиссии
    transmissionSerialNumber = models.CharField(max_length=32)    # Зав. № трансмиссии
    drivingBridgeModel = models.ForeignKey('DrivingBridgeModel', on_delete=models.CASCADE)    # Модель ведущего моста
    drivingBridgeSerialNumber = models.CharField(max_length=32)    # Зав. № ведущего моста
    controlledBridgeModel = models.ForeignKey('ControlledBridgeModel', on_delete=models.CASCADE)    # Модель управляемого моста
    controlledBridgeSerialNumber = models.CharField(max_length=32)    # Зав. № управляемого моста
    contract = models.CharField(max_length=64)    # Договор поставки №, дата
    shipDate = models.DateField()    # Дата отгрузки с завода
    consignee = models.CharField(max_length=64)    # Грузополучатель (конечный потребитель)
    deliveryAddress = models.CharField(max_length=128)   # Адрес поставки (эксплуатации)
    picking = models.CharField(max_length=1024)    # Комплектация (доп. опции)
    client = models.ForeignKey('Client', on_delete=models.CASCADE)    # Клиент
    serviceCompany = models.ForeignKey('ServiceCompany', on_delete=models.CASCADE)    # Сервисная компания

    def __str__(self):
        return f' Серийный номер: {self.machineSerialNumber}, модель: {self.equipmentModel}, Клиент: {self.client}'


class Maintenance(models.Model):    # техническое обслуживание
    type = models.ForeignKey('MaintenanceType', on_delete=models.CASCADE)    # Вид ТО
    date = models.DateField()    # Дата проведения ТО
    operatingTime = models.IntegerField()    # Наработка, м/час
    workOrder = models.CharField(max_length=32)    # № заказ-наряда
    workOrderDate = models.DateField()    # Дата заказ-наряда
    maintenanceOrganization = models.ForeignKey('MaintenanceOrganization', on_delete=models.CASCADE)   # Организация, проводившая ТО
    machine = models.ForeignKey('Machine', on_delete=models.CASCADE)    # Машина
    serviceCompany = models.ForeignKey('ServiceCompany', on_delete=models.CASCADE)    # Сервисная компания

    def __str__(self):
        return f'{self.machine, self.type, self.serviceCompany}'


class Reclamation(models.Model):    # Рекламации
    failureDate = models.DateField()    # Дата отказа
    operatingTime = models.IntegerField()  # Наработка, м/час
    failureJuncture = models.ForeignKey('FailureJuncture', on_delete=models.CASCADE)    # Узел отказа
    failureDescription = models.CharField(max_length=1024)    # Описание отказа
    recoveryMethod = models.ForeignKey('RecoveryMethod', on_delete=models.CASCADE)    # Способ восстановления
    spareParts = models.CharField(max_length=1024)    # Используемые запасные части
    recoveryDate = models.DateField()    # Дата восстановления
    equipmentDowntime = models.IntegerField(blank=True, null=True, editable=False)   # Время простоя техники
    machine = models.ForeignKey('Machine', on_delete=models.CASCADE)  # Машина
    serviceCompany = models.ForeignKey('ServiceCompany', on_delete=models.CASCADE)  # Сервисная компания

    def save(self, *args, **kwargs):
        self.equipmentDowntime = (self.recoveryDate - self.failureDate).days
        super(Reclamation, self).save(*args, **kwargs)

    def __str__(self):
        return f' Машина: {self.machine}, дата поломки: {self.failureDate}, время простоя: {self.equipmentDowntime}'


class EquipmentModel(models.Model):    # Модель техники
    title = models.CharField(max_length=64)
    description = models.CharField(max_length=1024)

    def __str__(self):
        return f'{self.title}'


class EngineMake(models.Model):    # Модель двигателя
    title = models.CharField(max_length=64)
    description = models.CharField(max_length=1024)

    def __str__(self):
        return f'{self.title}'


class TransmissionModel(models.Model):    # Модель трансмиссии
    title = models.CharField(max_length=64)
    description = models.CharField(max_length=1024)

    def __str__(self):
        return f'{self.title}'


class DrivingBridgeModel(models.Model):    # Модель ведущего моста
    title = models.CharField(max_length=64)
    description = models.CharField(max_length=1024)

    def __str__(self):
        return f'{self.title}'


class ControlledBridgeModel(models.Model):    # Модель управляемого моста
    title = models.CharField(max_length=64)
    description = models.CharField(max_length=1024)

    def __str__(self):
        return f'{self.title}'


class MaintenanceType(models.Model):    # Вид ТО
    title = models.CharField(max_length=64)
    description = models.CharField(max_length=1024)

    def __str__(self):
        return f'{self.title}'


class MaintenanceOrganization(models.Model):    # Организация, проводившая ТО
    title = models.CharField(max_length=64)
    description = models.CharField(max_length=1024)

    def __str__(self):
        return f'{self.title}'


class FailureJuncture(models.Model):    # Узел отказа
    title = models.CharField(max_length=64)
    description = models.CharField(max_length=1024)

    def __str__(self):
        return f'{self.title}'


class RecoveryMethod(models.Model):    # Способ восстановления
    title = models.CharField(max_length=64)
    description = models.CharField(max_length=1024)

    def __str__(self):
        return f'{self.title}'
