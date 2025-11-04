from rest_framework import serializers
from .models import AppUser, Tenant, Department, User


class AppUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'role', 'is_active', 'last_login']
        read_only_fields = ['id', 'last_login']


class TenantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tenant
        fields = '__all__'


class DepartmentSerializer(serializers.ModelSerializer):
    tenant_name = serializers.CharField(source='tenant.org_name', read_only=True)
    
    class Meta:
        model = Department
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    tenant_name = serializers.CharField(source='tenant.org_name', read_only=True)
    department_name = serializers.CharField(source='department.name', read_only=True)
    
    class Meta:
        model = User
        fields = '__all__'
