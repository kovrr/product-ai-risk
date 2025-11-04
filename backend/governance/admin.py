from django.contrib import admin
from .models import SelfAssessmentTask, CustomField


@admin.register(SelfAssessmentTask)
class SelfAssessmentTaskAdmin(admin.ModelAdmin):
    list_display = ['title', 'tenant', 'framework', 'assigned_to', 'status', 'due_date']
    list_filter = ['tenant', 'status', 'framework']
    search_fields = ['title', 'description']


@admin.register(CustomField)
class CustomFieldAdmin(admin.ModelAdmin):
    list_display = ['entity_type', 'entity_id', 'field_name', 'tenant']
    list_filter = ['entity_type', 'tenant']
    search_fields = ['field_name', 'field_value']
