from django.db import models
from core.models import Tenant, User


class RiskProfile(models.Model):
    """Risk profile for AI vendors (Kovrr data)."""
    
    kovrr_vendor_id = models.CharField(max_length=255, blank=True)
    risk_score = models.IntegerField(null=True, blank=True)
    financial_exposure_min = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    financial_exposure_max = models.DecimalField(max_digits=15, decimal_places=2, null=True, blank=True)
    incident_history_ref = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'visibility_risk_profile'
        managed = False
    
    def __str__(self):
        return f"Risk Profile {self.kovrr_vendor_id or self.id}"


class AIAsset(models.Model):
    """AI tool/asset discovered in the organization."""
    
    STATUS_CHOICES = [
        ('Sanctioned', 'Sanctioned'),
        ('Shadow', 'Shadow'),
        ('Unknown', 'Unknown'),
    ]
    
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='ai_assets')
    risk_profile = models.ForeignKey(RiskProfile, on_delete=models.SET_NULL, null=True, blank=True, related_name='assets')
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=100, blank=True)
    vendor = models.CharField(max_length=255, blank=True)
    domain = models.CharField(max_length=255, blank=True)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='Unknown')
    first_seen = models.DateTimeField(null=True, blank=True)
    last_seen = models.DateTimeField(null=True, blank=True)
    entra_service_principal_id = models.CharField(max_length=255, blank=True)
    entra_app_id = models.CharField(max_length=255, blank=True)
    entra_publisher_name = models.CharField(max_length=255, blank=True)
    entra_sign_in_audience = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'visibility_ai_asset'
        managed = False
    
    def __str__(self):
        return self.name


class DiscoverySource(models.Model):
    """Source of AI asset discovery."""
    
    SOURCE_TYPE_CHOICES = [
        ('AzureAD', 'Azure AD'),
        ('Survey', 'Survey'),
        ('CSV', 'CSV Import'),
    ]
    
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='discovery_sources')
    source_type = models.CharField(max_length=50, choices=SOURCE_TYPE_CHOICES)
    collection_date = models.DateTimeField(auto_now_add=True)
    confidence_level = models.CharField(max_length=50, blank=True)
    metadata = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'visibility_discovery_source'
        managed = False
    
    def __str__(self):
        return f"{self.source_type} - {self.collection_date}"


class AssetRelationship(models.Model):
    """Relationship between users and AI assets."""
    
    RELATIONSHIP_TYPE_CHOICES = [
        ('Direct', 'Direct'),
        ('Integration', 'Integration'),
        ('Indirect', 'Indirect'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='asset_relationships')
    ai_asset = models.ForeignKey(AIAsset, on_delete=models.CASCADE, related_name='user_relationships')
    discovery_source = models.ForeignKey(DiscoverySource, on_delete=models.SET_NULL, null=True, blank=True)
    relationship_type = models.CharField(max_length=50, choices=RELATIONSHIP_TYPE_CHOICES, blank=True)
    confidence_score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'visibility_asset_relationship'
        managed = False
    
    def __str__(self):
        return f"{self.user.name} - {self.ai_asset.name}"


class UsageIndicator(models.Model):
    """Usage metrics for AI assets."""
    
    ai_asset = models.ForeignKey(AIAsset, on_delete=models.CASCADE, related_name='usage_indicators')
    first_seen = models.DateTimeField(null=True, blank=True)
    last_seen = models.DateTimeField(null=True, blank=True)
    active_users_count = models.IntegerField(default=0)
    trend_status = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'visibility_usage_indicator'
        managed = False
    
    def __str__(self):
        return f"{self.ai_asset.name} - {self.active_users_count} users"
