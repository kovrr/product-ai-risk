from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (RiskProfileViewSet, AIAssetViewSet, DiscoverySourceViewSet,
                    AssetRelationshipViewSet, UsageIndicatorViewSet)

router = DefaultRouter()
router.register(r'risk-profiles', RiskProfileViewSet, basename='risk-profile')
router.register(r'assets', AIAssetViewSet, basename='ai-asset')
router.register(r'discovery-sources', DiscoverySourceViewSet, basename='discovery-source')
router.register(r'asset-relationships', AssetRelationshipViewSet, basename='asset-relationship')
router.register(r'usage-indicators', UsageIndicatorViewSet, basename='usage-indicator')

urlpatterns = [
    path('', include(router.urls)),
]
