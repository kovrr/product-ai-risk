from rest_framework import serializers
from .models import SelfAssessmentTask, CustomField


class SelfAssessmentTaskSerializer(serializers.ModelSerializer):
    tenant_name = serializers.CharField(source='tenant.org_name', read_only=True)
    framework_name = serializers.CharField(source='framework.name', read_only=True)
    assigned_to_name = serializers.CharField(source='assigned_to.name', read_only=True)
    
    class Meta:
        model = SelfAssessmentTask
        fields = '__all__'


class CustomFieldSerializer(serializers.ModelSerializer):
    tenant_name = serializers.CharField(source='tenant.org_name', read_only=True)
    
    class Meta:
        model = CustomField
        fields = '__all__'
