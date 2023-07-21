from rest_framework import permissions


class MachineAPIPermissions(permissions.BasePermission):
    """Права доступа к MachineAPIView"""
    def has_permission(self, request, view):
        if not request.user.is_authenticated:
            return request.method == 'GET'
        user = request.user
        if user.is_authenticated:
            if hasattr(user, 'client'):
                return request.method == 'GET'
            elif hasattr(user, 'servicecompany'):
                return request.method == 'GET'
            elif hasattr(user, 'manager'):
                return request.method in ['GET', 'POST']
            return False


class ReclamationAPIPermissions(permissions.BasePermission):
    """Права доступа к ReclamationAPIView"""
    def has_permission(self, request, view):
        user = request.user
        if user.is_authenticated:
            if hasattr(user, 'client'):
                return request.method == 'GET'
            elif hasattr(user, 'servicecompany'):
                return request.method in ['GET', 'POST']
            elif hasattr(user, 'manager'):
                return request.method in ['GET', 'POST']
            return False
