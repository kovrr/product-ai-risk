from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AlertViewSet, EvidenceViewSet, PolicyViolationViewSet, AuditLogViewSet

router = DefaultRouter()
router.register(r'alerts', AlertViewSet, basename='alert')
router.register(r'evidence', EvidenceViewSet, basename='evidence')
router.register(r'violations', PolicyViolationViewSet, basename='violation')
router.register(r'audit-logs', AuditLogViewSet, basename='audit-log')

urlpatterns = [
    path('', include(router.urls)),
]
