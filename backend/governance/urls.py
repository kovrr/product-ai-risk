from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (SelfAssessmentTaskViewSet, CustomFieldViewSet, 
                    ComplianceReadinessViewSet, MaturityAssessmentViewSet)

router = DefaultRouter()
router.register(r'tasks', SelfAssessmentTaskViewSet, basename='task')
router.register(r'compliance-readiness', ComplianceReadinessViewSet, basename='compliance-readiness')
router.register(r'maturity-assessments', MaturityAssessmentViewSet, basename='maturity-assessment')
router.register(r'custom-fields', CustomFieldViewSet, basename='custom-field')

urlpatterns = [
    path('', include(router.urls)),
]
