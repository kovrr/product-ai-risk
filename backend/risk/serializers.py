from rest_framework import serializers
from .models import Category, Framework, Control, RiskScenario, ScenarioControl, Note


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class FrameworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Framework
        fields = '__all__'


class ControlSerializer(serializers.ModelSerializer):
    framework_name = serializers.CharField(source='framework.name', read_only=True)
    
    class Meta:
        model = Control
        fields = '__all__'


class RiskScenarioSerializer(serializers.ModelSerializer):
    tenant_name = serializers.CharField(source='tenant.org_name', read_only=True)
    owner_name = serializers.CharField(source='owner.name', read_only=True)
    
    class Meta:
        model = RiskScenario
        fields = '__all__'


class ScenarioControlSerializer(serializers.ModelSerializer):
    scenario_name = serializers.CharField(source='scenario.name', read_only=True)
    control_id = serializers.CharField(source='control.control_id', read_only=True)
    
    class Meta:
        model = ScenarioControl
        fields = '__all__'


class NoteSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.name', read_only=True)
    scenario_name = serializers.CharField(source='scenario.name', read_only=True)
    
    class Meta:
        model = Note
        fields = '__all__'
