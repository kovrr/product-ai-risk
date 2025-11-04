from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import SelfAssessmentTask, CustomField
from .serializers import SelfAssessmentTaskSerializer, CustomFieldSerializer


class SelfAssessmentTaskViewSet(viewsets.ModelViewSet):
    queryset = SelfAssessmentTask.objects.select_related('tenant', 'framework', 'control', 'assigned_to').all()
    serializer_class = SelfAssessmentTaskSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['tenant', 'status', 'framework', 'assigned_to']
    search_fields = ['title', 'description']


class CustomFieldViewSet(viewsets.ModelViewSet):
    queryset = CustomField.objects.select_related('tenant').all()
    serializer_class = CustomFieldSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['tenant', 'entity_type']
