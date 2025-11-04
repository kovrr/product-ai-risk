"""
URL configuration for aikovrr project.
"""
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('core.urls')),
    path('api/visibility/', include('visibility.urls')),
    path('api/risk/', include('risk.urls')),
    path('api/governance/', include('governance.urls')),
    path('api/monitoring/', include('monitoring.urls')),
    path('api/reports/', include('reports.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
