from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone


class AppUserManager(BaseUserManager):
    """Custom manager for AppUser."""
    
    def create_user(self, username, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        if not username:
            raise ValueError('The Username field must be set')
        
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('role', 'admin')
        return self.create_user(username, email, password, **extra_fields)


class AppUser(AbstractBaseUser, PermissionsMixin):
    """Application user model for authentication."""
    
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('analyst', 'Analyst'),
        ('viewer', 'Viewer'),
    ]
    
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255, db_column='password_hash')  # Map to password_hash column
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default='analyst')
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    last_login = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    objects = AppUserManager()
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']
    
    class Meta:
        db_table = 'auth_app_user'
        managed = False
    
    @property
    def is_staff(self):
        return self.role == 'admin' or self.is_superuser
    
    def __str__(self):
        return self.username


class Tenant(models.Model):
    """Organization tenant."""
    
    org_name = models.CharField(max_length=255)
    config = models.JSONField(default=dict, blank=True)
    admin_contacts = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'core_tenant'
        managed = False
    
    def __str__(self):
        return self.org_name


class Department(models.Model):
    """Department within a tenant organization."""
    
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='departments')
    name = models.CharField(max_length=255)
    risk_exposure_agg = models.DecimalField(max_digits=15, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'core_department'
        managed = False
    
    def __str__(self):
        return f"{self.tenant.org_name} - {self.name}"


class User(models.Model):
    """Organization user (employee being monitored)."""
    
    tenant = models.ForeignKey(Tenant, on_delete=models.CASCADE, related_name='users')
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True, related_name='users')
    name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    role = models.CharField(max_length=100, blank=True)
    shadow_sanction_ratio = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'core_user'
        managed = False
    
    def __str__(self):
        return self.name
