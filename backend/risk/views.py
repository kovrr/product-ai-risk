from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Category, Framework, Control, RiskScenario, ScenarioControl, Note
from .serializers import (CategorySerializer, FrameworkSerializer, ControlSerializer,
                          RiskScenarioSerializer, ScenarioControlSerializer, NoteSerializer)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]


class FrameworkViewSet(viewsets.ModelViewSet):
    queryset = Framework.objects.all()
    serializer_class = FrameworkSerializer
    permission_classes = [IsAuthenticated]


class ControlViewSet(viewsets.ModelViewSet):
    queryset = Control.objects.select_related('framework').all()
    serializer_class = ControlSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['framework']


class RiskScenarioViewSet(viewsets.ModelViewSet):
    queryset = RiskScenario.objects.select_related('tenant', 'owner').all()
    serializer_class = RiskScenarioSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['tenant', 'status', 'priority', 'likelihood', 'impact']
    search_fields = ['name', 'description']


class ScenarioControlViewSet(viewsets.ModelViewSet):
    queryset = ScenarioControl.objects.select_related('scenario', 'control').all()
    serializer_class = ScenarioControlSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['scenario', 'control', 'compliance_status']


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.select_related('scenario', 'author').all()
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['scenario', 'author']
