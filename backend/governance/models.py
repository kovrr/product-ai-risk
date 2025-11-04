from django.db import models
from core.models import Tenant, User
from risk.models import Framework, Control


class SelfAssessmentTask(models.Model):
    """Self-assessment task for compliance."""
    
    STATUS_CHOICES = [
        ('Not Started', 'Not Started'),
        ('In Progress', 'In Progress'),
        ('Ready for Review', 'Ready for Review'),
        ('Approved', 'Approved'),
    ]
    
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='sa_tasks')
    framework = models.ForeignKey(Framework, on_delete=models.SET_NULL, null=True, blank=True)
    control = models.ForeignKey(Control, on_delete=models.SET_NULL, null=True, blank=True)
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_tasks')
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Not Started')
    due_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'governance_self_assessment_task'
        managed = False
    
    def __str__(self):
        return self.title


class ComplianceReadiness(models.Model):
    """Compliance readiness assessment for frameworks."""
    
    MATURITY_LEVELS = [
        ('Initial', 'Initial'),
        ('Developing', 'Developing'),
        ('Defined', 'Defined'),
        ('Managed', 'Managed'),
        ('Optimizing', 'Optimizing'),
    ]
    
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, db_column='tenant_id')
    framework = models.ForeignKey(Framework, on_delete=models.CASCADE, db_column='framework_id')
    readiness_score = models.DecimalField(max_digits=5, decimal_places=2, default=0)  # 0-100
    maturity_level = models.CharField(max_length=50, choices=MATURITY_LEVELS, default='Initial')
    assessment_date = models.DateField(auto_now_add=True)
    assessed_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, db_column='assessed_by_id')
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        managed = False
        db_table = 'governance_compliance_readiness'
        ordering = ['-assessment_date']


class MaturityAssessment(models.Model):
    """Detailed maturity assessment per control domain."""
    
    compliance_readiness = models.ForeignKey(ComplianceReadiness, on_delete=models.CASCADE, db_column='compliance_readiness_id')
    domain = models.CharField(max_length=255)  # e.g., 'Risk Management', 'Data Governance'
    score = models.DecimalField(max_digits=5, decimal_places=2, default=0)  # 0-100
    strengths = models.TextField(blank=True, null=True)
    weaknesses = models.TextField(blank=True, null=True)
    recommendations = models.TextField(blank=True, null=True)
    
    class Meta:
        managed = False
        db_table = 'governance_maturity_assessment'


class CustomField(models.Model):
    """Custom fields for extensibility."""
    
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='custom_fields')
    entity_type = models.CharField(max_length=100)
    entity_id = models.IntegerField()
    field_name = models.CharField(max_length=255)
    field_type = models.CharField(max_length=50, blank=True)
    field_value = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'governance_custom_field'
        managed = False
    
    def __str__(self):
        return f"{self.entity_type} - {self.field_name}"
