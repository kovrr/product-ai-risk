from django.contrib import admin
from .models import Category, Framework, Control, RiskScenario, ScenarioControl, Note


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'parent', 'created_at']
    search_fields = ['name']


@admin.register(Framework)
class FrameworkAdmin(admin.ModelAdmin):
    list_display = ['name', 'version', 'created_at']
    search_fields = ['name']


@admin.register(Control)
class ControlAdmin(admin.ModelAdmin):
    list_display = ['control_id', 'framework', 'maturity_level']
    list_filter = ['framework']
    search_fields = ['control_id', 'description']


@admin.register(RiskScenario)
class RiskScenarioAdmin(admin.ModelAdmin):
    list_display = ['name', 'tenant', 'owner', 'status', 'priority', 'likelihood', 'impact']
    list_filter = ['tenant', 'status', 'priority', 'likelihood', 'impact']
    search_fields = ['name', 'description']


@admin.register(ScenarioControl)
class ScenarioControlAdmin(admin.ModelAdmin):
    list_display = ['scenario', 'control', 'compliance_status']
    list_filter = ['compliance_status']


@admin.register(Note)
class NoteAdmin(admin.ModelAdmin):
    list_display = ['scenario', 'author', 'created_at']
    list_filter = ['author']
    search_fields = ['text']
