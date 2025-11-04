from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.views.decorators.csrf import csrf_exempt
from .views import AuthViewSet, TenantViewSet, DepartmentViewSet, UserViewSet

router = DefaultRouter()
router.register(r'tenants', TenantViewSet, basename='tenant')
router.register(r'departments', DepartmentViewSet, basename='department')
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('login/', AuthViewSet.as_view({'post': 'login'}), name='login'),
    path('logout/', AuthViewSet.as_view({'post': 'logout'}), name='logout'),
    path('me/', AuthViewSet.as_view({'get': 'me'}), name='me'),
    path('', include(router.urls)),
]
