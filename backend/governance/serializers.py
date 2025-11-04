from rest_framework import serializers
from .models import SelfAssessmentTask, CustomField, ComplianceReadiness, MaturityAssessment


class SelfAssessmentTaskSerializer(serializers.ModelSerializer):
    tenant_name = serializers.CharField(source='tenant.org_name', read_only=True)
    framework_name = serializers.CharField(source='framework.name', read_only=True)
    assigned_to_name = serializers.CharField(source='assigned_to.name', read_only=True)
    
    class Meta:
        model = SelfAssessmentTask
        fields = '__all__'


class MaturityAssessmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaturityAssessment
        fields = '__all__'


class ComplianceReadinessSerializer(serializers.ModelSerializer):
    tenant_name = serializers.CharField(source='tenant.org_name', read_only=True)
    framework_name = serializers.CharField(source='framework.name', read_only=True)
    assessed_by_name = serializers.CharField(source='assessed_by.name', read_only=True)
    maturity_assessments = MaturityAssessmentSerializer(many=True, read_only=True, source='maturityassessment_set')
    
    class Meta:
        model = ComplianceReadiness
        fields = '__all__'


class CustomFieldSerializer(serializers.ModelSerializer):
    tenant_name = serializers.CharField(source='tenant.org_name', read_only=True)
    
    class Meta:
        model = CustomField
        fields = '__all__'
