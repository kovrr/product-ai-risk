from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import SelfAssessmentTask, CustomField, ComplianceReadiness, MaturityAssessment
from .serializers import (SelfAssessmentTaskSerializer, CustomFieldSerializer, 
                          ComplianceReadinessSerializer, MaturityAssessmentSerializer)


class SelfAssessmentTaskViewSet(viewsets.ModelViewSet):
    queryset = SelfAssessmentTask.objects.select_related('tenant', 'framework', 'control', 'assigned_to').all()
    serializer_class = SelfAssessmentTaskSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['tenant', 'status', 'framework', 'assigned_to']
    search_fields = ['title', 'description']


class ComplianceReadinessViewSet(viewsets.ModelViewSet):
    queryset = ComplianceReadiness.objects.select_related('tenant', 'framework', 'assessed_by').prefetch_related('maturityassessment_set').all()
    serializer_class = ComplianceReadinessSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['tenant', 'framework', 'maturity_level']
    search_fields = ['notes']


class MaturityAssessmentViewSet(viewsets.ModelViewSet):
    queryset = MaturityAssessment.objects.select_related('compliance_readiness').all()
    serializer_class = MaturityAssessmentSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['compliance_readiness', 'domain']


class CustomFieldViewSet(viewsets.ModelViewSet):
    queryset = CustomField.objects.select_related('tenant').all()
    serializer_class = CustomFieldSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['tenant', 'entity_type']
