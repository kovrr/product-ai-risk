from rest_framework import serializers
from .models import RiskProfile, AIAsset, DiscoverySource, AssetRelationship, UsageIndicator


class RiskProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = RiskProfile
        fields = '__all__'


class AIAssetSerializer(serializers.ModelSerializer):
    tenant_name = serializers.CharField(source='tenant.org_name', read_only=True)
    risk_profile_data = RiskProfileSerializer(source='risk_profile', read_only=True)
    
    class Meta:
        model = AIAsset
        fields = '__all__'


class DiscoverySourceSerializer(serializers.ModelSerializer):
    tenant_name = serializers.CharField(source='tenant.org_name', read_only=True)
    
    class Meta:
        model = DiscoverySource
        fields = '__all__'


class AssetRelationshipSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField(source='user.name', read_only=True)
    asset_name = serializers.CharField(source='ai_asset.name', read_only=True)
    
    class Meta:
        model = AssetRelationship
        fields = '__all__'


class UsageIndicatorSerializer(serializers.ModelSerializer):
    asset_name = serializers.CharField(source='ai_asset.name', read_only=True)
    
    class Meta:
        model = UsageIndicator
        fields = '__all__'
