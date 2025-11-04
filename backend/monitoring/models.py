from django.db import models
from core.models import Tenant, User
from risk.models import RiskScenario, Control


class Alert(models.Model):
    """System alerts for governance monitoring."""
    SEVERITY_CHOICES = [
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High'),
        ('Critical', 'Critical'),
    ]
    
    STATUS_CHOICES = [
        ('Open', 'Open'),
        ('Acknowledged', 'Acknowledged'),
        ('Resolved', 'Resolved'),
        ('Dismissed', 'Dismissed'),
    ]
    
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, db_column='tenant_id')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    severity = models.CharField(max_length=50, choices=SEVERITY_CHOICES)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Open')
    alert_type = models.CharField(max_length=100)  # e.g., 'Policy Violation', 'Control Gap', 'Risk Threshold'
    related_scenario = models.ForeignKey(RiskScenario, on_delete=models.SET_NULL, null=True, blank=True, db_column='related_scenario_id')
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, db_column='assigned_to_id')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    resolved_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        managed = False
        db_table = 'monitoring_alert'
        ordering = ['-created_at']


class Evidence(models.Model):
    """Evidence tracking for compliance and audit purposes."""
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, db_column='tenant_id')
    control = models.ForeignKey(Control, on_delete=models.CASCADE, db_column='control_id')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    evidence_type = models.CharField(max_length=100)  # e.g., 'Document', 'Screenshot', 'Log', 'Report'
    file_path = models.CharField(max_length=500, blank=True, null=True)
    uploaded_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, db_column='uploaded_by_id')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    verified = models.BooleanField(default=False)
    verified_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='verified_evidence', db_column='verified_by_id')
    verified_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        managed = False
        db_table = 'monitoring_evidence'
        ordering = ['-uploaded_at']


class PolicyViolation(models.Model):
    """Track policy violations and enforcement actions."""
    VIOLATION_STATUS_CHOICES = [
        ('Detected', 'Detected'),
        ('Under Review', 'Under Review'),
        ('Confirmed', 'Confirmed'),
        ('False Positive', 'False Positive'),
        ('Remediated', 'Remediated'),
    ]
    
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, db_column='tenant_id')
    policy_name = models.CharField(max_length=255)
    violation_description = models.TextField()
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, db_column='user_id')
    status = models.CharField(max_length=50, choices=VIOLATION_STATUS_CHOICES, default='Detected')
    detected_at = models.DateTimeField(auto_now_add=True)
    reviewed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='reviewed_violations', db_column='reviewed_by_id')
    reviewed_at = models.DateTimeField(null=True, blank=True)
    remediation_action = models.TextField(blank=True, null=True)
    remediated_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        managed = False
        db_table = 'monitoring_policy_violation'
        ordering = ['-detected_at']


class AuditLog(models.Model):
    """Comprehensive audit trail for all system activities."""
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, db_column='tenant_id')
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, db_column='user_id')
    action = models.CharField(max_length=100)  # e.g., 'Create', 'Update', 'Delete', 'View'
    entity_type = models.CharField(max_length=100)  # e.g., 'RiskScenario', 'Control', 'Asset'
    entity_id = models.IntegerField(null=True, blank=True)
    description = models.TextField(blank=True, null=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.CharField(max_length=500, blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        managed = False
        db_table = 'monitoring_audit_log'
        ordering = ['-timestamp']
