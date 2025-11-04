from django.contrib import admin
from .models import Alert, Evidence, PolicyViolation, AuditLog


@admin.register(Alert)
class AlertAdmin(admin.ModelAdmin):
    list_display = ['title', 'severity', 'status', 'alert_type', 'tenant', 'created_at']
    list_filter = ['severity', 'status', 'alert_type', 'tenant']
    search_fields = ['title', 'description']


@admin.register(Evidence)
class EvidenceAdmin(admin.ModelAdmin):
    list_display = ['title', 'control', 'evidence_type', 'verified', 'uploaded_at']
    list_filter = ['evidence_type', 'verified', 'tenant']
    search_fields = ['title', 'description']


@admin.register(PolicyViolation)
class PolicyViolationAdmin(admin.ModelAdmin):
    list_display = ['policy_name', 'status', 'user', 'detected_at']
    list_filter = ['status', 'tenant']
    search_fields = ['policy_name', 'violation_description']


@admin.register(AuditLog)
class AuditLogAdmin(admin.ModelAdmin):
    list_display = ['action', 'entity_type', 'user', 'timestamp']
    list_filter = ['action', 'entity_type', 'tenant']
    search_fields = ['description', 'action', 'entity_type']
