from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import AppUser, Tenant, Department, User


@admin.register(AppUser)
class AppUserAdmin(BaseUserAdmin):
    list_display = ['username', 'email', 'first_name', 'last_name', 'role', 'is_active', 'is_superuser']
    list_filter = ['role', 'is_active', 'is_superuser']
    search_fields = ['username', 'email', 'first_name', 'last_name']
    ordering = ['username']
    
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email')}),
        ('Permissions', {'fields': ('role', 'is_active', 'is_superuser')}),
        ('Important dates', {'fields': ('last_login', 'created_at', 'updated_at')}),
    )
    
    readonly_fields = ['created_at', 'updated_at', 'last_login']
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'role'),
        }),
    )


@admin.register(Tenant)
class TenantAdmin(admin.ModelAdmin):
    list_display = ['org_name', 'admin_contacts', 'created_at']
    search_fields = ['org_name']


@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    list_display = ['name', 'tenant', 'risk_exposure_agg', 'created_at']
    list_filter = ['tenant']
    search_fields = ['name', 'tenant__org_name']


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'tenant', 'department', 'role', 'shadow_sanction_ratio', 'is_active']
    list_filter = ['tenant', 'department', 'is_active']
    search_fields = ['name', 'email']

