from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import RiskProfile, AIAsset, DiscoverySource, AssetRelationship, UsageIndicator
from .serializers import (RiskProfileSerializer, AIAssetSerializer, DiscoverySourceSerializer,
                          AssetRelationshipSerializer, UsageIndicatorSerializer)


class RiskProfileViewSet(viewsets.ModelViewSet):
    queryset = RiskProfile.objects.all()
    serializer_class = RiskProfileSerializer
    permission_classes = [IsAuthenticated]


class AIAssetViewSet(viewsets.ModelViewSet):
    queryset = AIAsset.objects.select_related('tenant', 'risk_profile').all()
    serializer_class = AIAssetSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['tenant', 'status', 'category', 'vendor']
    search_fields = ['name', 'vendor', 'domain']


class DiscoverySourceViewSet(viewsets.ModelViewSet):
    queryset = DiscoverySource.objects.select_related('tenant').all()
    serializer_class = DiscoverySourceSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['tenant', 'source_type']


class AssetRelationshipViewSet(viewsets.ModelViewSet):
    queryset = AssetRelationship.objects.select_related('user', 'ai_asset', 'discovery_source').all()
    serializer_class = AssetRelationshipSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['user', 'ai_asset', 'relationship_type']


class UsageIndicatorViewSet(viewsets.ModelViewSet):
    queryset = UsageIndicator.objects.select_related('ai_asset').all()
    serializer_class = UsageIndicatorSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['ai_asset']
