from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.utils.decorators import method_decorator
from django.http import JsonResponse
from .models import AppUser, Tenant, Department, User
from .serializers import AppUserSerializer, TenantSerializer, DepartmentSerializer, UserSerializer


class AuthViewSet(viewsets.ViewSet):
    """Authentication endpoints."""
    authentication_classes = []  # Disable all authentication for this viewset
    permission_classes = [AllowAny]  # Allow any access by default
    
    @action(detail=False, methods=['post'])
    def login(self, request):
        # Skip CSRF verification for this view
        request._dont_enforce_csrf_checks = True
        
        username = request.data.get('username')
        password = request.data.get('password')
        
        if not username or not password:
            return Response(
                {'error': 'Please provide both username and password'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            serializer = AppUserSerializer(user)
            return Response({
                'user': serializer.data,
                'message': 'Login successful'
            })
        else:
            return Response(
                {'error': 'Invalid credentials'},
                status=status.HTTP_401_UNAUTHORIZED
            )
    
    @action(detail=False, methods=['post'])
    def logout(self, request):
        # Skip CSRF verification for this view
        request._dont_enforce_csrf_checks = True
        logout(request)
        return Response({'message': 'Logout successful'})
    
    @action(detail=False, methods=['get'])
    def me(self, request):
        if request.user.is_authenticated:
            serializer = AppUserSerializer(request.user)
            return Response(serializer.data)
        return Response(
            {'error': 'Not authenticated'},
            status=status.HTTP_401_UNAUTHORIZED
        )


class TenantViewSet(viewsets.ModelViewSet):
    queryset = Tenant.objects.all()
    serializer_class = TenantSerializer
    permission_classes = [IsAuthenticated]


class DepartmentViewSet(viewsets.ModelViewSet):
    queryset = Department.objects.select_related('tenant').all()
    serializer_class = DepartmentSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['tenant']


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.select_related('tenant', 'department').all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    filterset_fields = ['tenant', 'department', 'is_active']
    search_fields = ['name', 'email']
