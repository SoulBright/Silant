from django.db import models
from django.contrib.auth.models import User


class Client(models.Model):
    """Клиент"""
    clientUser = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.clientUser}"

    class Meta:
        verbose_name = 'Клиент'
        verbose_name_plural = 'Клиенты'


class ServiceCompany(models.Model):
    """Сервисная компания"""
    serviceCompanyUser = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.serviceCompanyUser}"

    class Meta:
        verbose_name = 'Сервисная компания'
        verbose_name_plural = 'Сервисные компании'


class Manager(models.Model):
    """Менеджер"""
    managerUser = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.managerUser}"

    class Meta:
        verbose_name = 'Менеджер'
        verbose_name_plural = 'Менеджеры'


class Machine(models.Model):
    """Машина"""
    machineSerialNumber = models.CharField(
        'Зав. № машины',
        max_length=32,
        unique=True)   # Зав. № машины
    equipmentModel = models.ForeignKey(
        'EquipmentModel',
        verbose_name='Модель техники',
        on_delete=models.CASCADE)  # Модель техники
    engineMake = models.ForeignKey(
        'EngineMake',
        verbose_name='Модель двигателя',
        on_delete=models.CASCADE)    # Модель двигателя
    engineSerialNumber = models.CharField(
        'Зав. № двигателя',
        max_length=32,
        unique=True)    # Зав. № двигателя
    transmissionModel = models.ForeignKey(
        'TransmissionModel',
        verbose_name='Модель трансмиссии',
        on_delete=models.CASCADE)  # Модель трансмиссии
    transmissionSerialNumber = models.CharField(
        'Зав. № трансмиссии',
        max_length=32,
        unique=True)    # Зав. № трансмиссии
    drivingBridgeModel = models.ForeignKey(
        'DrivingBridgeModel',
        verbose_name='Модель ведущего моста',
        on_delete=models.CASCADE)    # Модель ведущего моста
    drivingBridgeSerialNumber = models.CharField(
        'Зав. № ведущего моста',
        max_length=32,
        unique=True)    # Зав. № ведущего моста
    controlledBridgeModel = models.ForeignKey(
        'ControlledBridgeModel',
        verbose_name='Модель управляемого моста',
        on_delete=models.CASCADE)    # Модель управляемого моста
    controlledBridgeSerialNumber = models.CharField(
        'Зав. № управляемого моста',
        max_length=32,
        unique=True)    # Зав. № управляемого моста
    contract = models.CharField(
        'Договор поставки №, дата',
        max_length=64)    # Договор поставки №, дата
    shipDate = models.DateField('Дата отгрузки с завода')    # Дата отгрузки с завода
    consignee = models.CharField(
        'Грузополучатель (конечный потребитель)',
        max_length=64)    # Грузополучатель (конечный потребитель)
    deliveryAddress = models.CharField(
        'Адрес поставки (эксплуатации)',
        max_length=128)   # Адрес поставки (эксплуатации)
    picking = models.CharField(
        'Комплектация (доп. опции)',
        max_length=1024)    # Комплектация (доп. опции)
    client = models.ForeignKey(
        'Client',
        verbose_name='Клиент',
        on_delete=models.CASCADE)    # Клиент
    serviceCompany = models.ForeignKey(
        'ServiceCompany',
        verbose_name='Сервисная компания',
        on_delete=models.CASCADE)    # Сервисная компания

    def __str__(self):
        return f' Серийный номер: {self.machineSerialNumber}, модель: {self.equipmentModel}, Клиент: {self.client}'

    class Meta:
        verbose_name = 'Машина'
        verbose_name_plural = 'Машиниы'


class Maintenance(models.Model):
    """техническое обслуживание"""
    type = models.ForeignKey(
        'MaintenanceType',
        verbose_name='Вид ТО',
        on_delete=models.CASCADE)    # Вид ТО
    date = models.DateField('Дата проведения ТО')    # Дата проведения ТО
    operatingTime = models.IntegerField('Наработка, м/час')    # Наработка, м/час
    workOrder = models.CharField(
        '№ заказ-наряда',
        max_length=32)    # № заказ-наряда
    workOrderDate = models.DateField('Дата заказ-наряда')    # Дата заказ-наряда
    maintenanceOrganization = models.ForeignKey(
        'MaintenanceOrganization',
        verbose_name='Организация, проводившая ТО',
        on_delete=models.CASCADE)   # Организация, проводившая ТО
    machine = models.ForeignKey(
        'Machine',
        verbose_name='Машина',
        on_delete=models.CASCADE)    # Машина
    serviceCompany = models.ForeignKey(
        'ServiceCompany',
        verbose_name='Сервисная компания',
        on_delete=models.CASCADE)    # Сервисная компания

    def __str__(self):
        return f'Машина:{self.machine}, Вид {self.type} Сервисная компания: {self.serviceCompany}'

    class Meta:
        verbose_name = 'Тех. Обслуживание'
        verbose_name_plural = 'Тех. Обслуживания'


class Reclamation(models.Model):
    """Рекламации"""
    failureDate = models.DateField('Дата отказа')    # Дата отказа
    operatingTime = models.IntegerField('Наработка, м/час')  # Наработка, м/час
    failureJuncture = models.ForeignKey(
        'FailureJuncture',
        verbose_name='Узел отказа',
        on_delete=models.CASCADE)    # Узел отказа
    failureDescription = models.CharField(
        'Описание отказа',
        max_length=1024)    # Описание отказа
    recoveryMethod = models.ForeignKey(
        'RecoveryMethod',
        verbose_name='Способ восстановления',
        on_delete=models.CASCADE)    # Способ восстановления
    spareParts = models.CharField(
        'Используемые запасные части',
        max_length=1024)    # Используемые запасные части
    recoveryDate = models.DateField('Дата восстановления')    # Дата восстановления
    equipmentDowntime = models.IntegerField(
        'Время простоя техники',
        blank=True,
        null=True,
        editable=False)   # Время простоя техники
    machine = models.ForeignKey(
        'Machine',
        verbose_name='Машина',
        on_delete=models.CASCADE)  # Машина
    serviceCompany = models.ForeignKey(
        'ServiceCompany',
        verbose_name='Сервисная компания',
        on_delete=models.CASCADE)  # Сервисная компания

    def save(self, *args, **kwargs):
        self.equipmentDowntime = (self.recoveryDate - self.failureDate).days
        super(Reclamation, self).save(*args, **kwargs)

    def __str__(self):
        return f' Машина: {self.machine}, дата поломки: {self.failureDate}, время простоя: {self.equipmentDowntime}'

    class Meta:
        verbose_name = 'Рекламация'
        verbose_name_plural = 'Рекламации'


class EquipmentModel(models.Model):
    """Модель техники"""
    title = models.CharField('Название', max_length=64, unique=True)
    description = models.CharField('Описание', max_length=1024)

    def __str__(self):
        return f'{self.title}'

    class Meta:
        verbose_name = 'Модель техники'
        verbose_name_plural = 'Модели техники'


class EngineMake(models.Model):
    """Модель двигателя"""
    title = models.CharField('Название', max_length=64, unique=True)
    description = models.CharField('Описание', max_length=1024)

    def __str__(self):
        return f'{self.title}'

    class Meta:
        verbose_name = 'Модель двигателя'
        verbose_name_plural = 'Модели двигателя'


class TransmissionModel(models.Model):
    """Модель трансмиссии"""
    title = models.CharField('Название', max_length=64, unique=True)
    description = models.CharField('Описание', max_length=1024)

    def __str__(self):
        return f'{self.title}'

    class Meta:
        verbose_name = 'Модель трансмиссии'
        verbose_name_plural = 'Модели трансмиссии'


class DrivingBridgeModel(models.Model):
    """Модель ведущего моста"""
    title = models.CharField('Название', max_length=64, unique=True)
    description = models.CharField('Описание', max_length=1024)

    def __str__(self):
        return f'{self.title}'

    class Meta:
        verbose_name = 'Модель ведущего моста'
        verbose_name_plural = 'Модели ведущего моста'


class ControlledBridgeModel(models.Model):
    """Модель управляемого моста"""
    title = models.CharField('Название', max_length=64, unique=True)
    description = models.CharField('Описание', max_length=1024)

    def __str__(self):
        return f'{self.title}'

    class Meta:
        verbose_name = 'Модель управляемого моста'
        verbose_name_plural = 'Модели управляемого моста'


class MaintenanceType(models.Model):
    """Вид ТО"""
    title = models.CharField('Название', max_length=64, unique=True)
    description = models.CharField('Описание', max_length=1024)

    def __str__(self):
        return f'{self.title}'

    class Meta:
        verbose_name = 'Вид ТО'
        verbose_name_plural = 'Виды ТО'


class MaintenanceOrganization(models.Model):
    """Организация, проводившая ТО"""
    title = models.CharField('Название', max_length=64, unique=True)
    description = models.CharField('Описание', max_length=1024)

    def __str__(self):
        return f'{self.title}'

    class Meta:
        verbose_name = 'Организация, проводившая ТО'
        verbose_name_plural = 'Организации, проводившие ТО'


class FailureJuncture(models.Model):
    """Узел отказа"""
    title = models.CharField('Название', max_length=64, unique=True)
    description = models.CharField('Описание', max_length=1024)

    def __str__(self):
        return f'{self.title}'

    class Meta:
        verbose_name = 'Узел отказа'
        verbose_name_plural = 'Узлы отказа'


class RecoveryMethod(models.Model):
    """Способ восстановления"""
    title = models.CharField('Название', max_length=64, unique=True)
    description = models.CharField('Описание', max_length=1024)

    def __str__(self):
        return f'{self.title}'

    class Meta:
        verbose_name = 'Способ восстановления'
        verbose_name_plural = 'Способы восстановления'
