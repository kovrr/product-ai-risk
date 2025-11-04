from django.contrib import admin
from .models import RiskProfile, AIAsset, DiscoverySource, AssetRelationship, UsageIndicator


@admin.register(RiskProfile)
class RiskProfileAdmin(admin.ModelAdmin):
    list_display = ['id', 'kovrr_vendor_id', 'risk_score', 'financial_exposure_min', 'financial_exposure_max']
    search_fields = ['kovrr_vendor_id']


@admin.register(AIAsset)
class AIAssetAdmin(admin.ModelAdmin):
    list_display = ['name', 'tenant', 'vendor', 'category', 'status', 'first_seen', 'last_seen']
    list_filter = ['tenant', 'status', 'category']
    search_fields = ['name', 'vendor', 'domain']


@admin.register(DiscoverySource)
class DiscoverySourceAdmin(admin.ModelAdmin):
    list_display = ['source_type', 'tenant', 'collection_date', 'confidence_level']
    list_filter = ['source_type', 'tenant']


@admin.register(AssetRelationship)
class AssetRelationshipAdmin(admin.ModelAdmin):
    list_display = ['user', 'ai_asset', 'relationship_type', 'confidence_score']
    list_filter = ['relationship_type']
    search_fields = ['user__name', 'ai_asset__name']


@admin.register(UsageIndicator)
class UsageIndicatorAdmin(admin.ModelAdmin):
    list_display = ['ai_asset', 'active_users_count', 'trend_status', 'first_seen', 'last_seen']
    list_filter = ['trend_status']
    search_fields = ['ai_asset__name']
