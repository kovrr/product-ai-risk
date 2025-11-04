from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (CategoryViewSet, FrameworkViewSet, ControlViewSet,
                    RiskScenarioViewSet, ScenarioControlViewSet, NoteViewSet)

router = DefaultRouter()
router.register(r'categories', CategoryViewSet, basename='category')
router.register(r'frameworks', FrameworkViewSet, basename='framework')
router.register(r'controls', ControlViewSet, basename='control')
router.register(r'scenarios', RiskScenarioViewSet, basename='scenario')
router.register(r'scenario-controls', ScenarioControlViewSet, basename='scenario-control')
router.register(r'notes', NoteViewSet, basename='note')

urlpatterns = [
    path('', include(router.urls)),
]
