from django.urls import path
from .views import VisibilityExportView, RiskExportView

urlpatterns = [
    path('visibility-export/', VisibilityExportView.as_view(), name='visibility-export'),
    path('risk-export/', RiskExportView.as_view(), name='risk-export'),
]
