from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SelfAssessmentTaskViewSet, CustomFieldViewSet

router = DefaultRouter()
router.register(r'tasks', SelfAssessmentTaskViewSet, basename='task')
router.register(r'custom-fields', CustomFieldViewSet, basename='custom-field')

urlpatterns = [
    path('', include(router.urls)),
]
