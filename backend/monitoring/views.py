from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Alert, Evidence, PolicyViolation, AuditLog
from .serializers import AlertSerializer, EvidenceSerializer, PolicyViolationSerializer, AuditLogSerializer


class AlertViewSet(viewsets.ModelViewSet):
    queryset = Alert.objects.select_related('tenant', 'related_scenario', 'assigned_to').all()
    serializer_class = AlertSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['tenant', 'severity', 'status', 'alert_type', 'assigned_to']
    search_fields = ['title', 'description']


class EvidenceViewSet(viewsets.ModelViewSet):
    queryset = Evidence.objects.select_related('tenant', 'control', 'uploaded_by', 'verified_by').all()
    serializer_class = EvidenceSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['tenant', 'control', 'evidence_type', 'verified', 'uploaded_by']
    search_fields = ['title', 'description']


class PolicyViolationViewSet(viewsets.ModelViewSet):
    queryset = PolicyViolation.objects.select_related('tenant', 'user', 'reviewed_by').all()
    serializer_class = PolicyViolationSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['tenant', 'status', 'user', 'reviewed_by']
    search_fields = ['policy_name', 'violation_description']


class AuditLogViewSet(viewsets.ModelViewSet):
    queryset = AuditLog.objects.select_related('tenant', 'user').all()
    serializer_class = AuditLogSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['tenant', 'user', 'action', 'entity_type']
    search_fields = ['description', 'action', 'entity_type']
