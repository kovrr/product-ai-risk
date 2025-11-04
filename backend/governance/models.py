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
