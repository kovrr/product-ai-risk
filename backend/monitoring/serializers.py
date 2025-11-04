from rest_framework import serializers
from .models import Alert, Evidence, PolicyViolation, AuditLog


class AlertSerializer(serializers.ModelSerializer):
    assigned_to_name = serializers.CharField(source='assigned_to.name', read_only=True)
    scenario_name = serializers.CharField(source='related_scenario.name', read_only=True)
    
    class Meta:
        model = Alert
        fields = '__all__'


class EvidenceSerializer(serializers.ModelSerializer):
    uploaded_by_name = serializers.CharField(source='uploaded_by.name', read_only=True)
    verified_by_name = serializers.CharField(source='verified_by.name', read_only=True)
    control_name = serializers.CharField(source='control.name', read_only=True)
    
    class Meta:
        model = Evidence
        fields = '__all__'


class PolicyViolationSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.name', read_only=True)
    reviewed_by_name = serializers.CharField(source='reviewed_by.name', read_only=True)
    
    class Meta:
        model = PolicyViolation
        fields = '__all__'


class AuditLogSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.name', read_only=True)
    
    class Meta:
        model = AuditLog
        fields = '__all__'
