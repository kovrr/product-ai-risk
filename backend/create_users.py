#!/usr/bin/env python
"""
Create all users from USER_CREDENTIALS.md in the local database
Run: python manage.py shell < create_users.py
"""

from core.models import AppUser
from django.contrib.auth.hashers import make_password

# All users from USER_CREDENTIALS.md
users_data = [
    {'username': 'admin', 'email': 'admin@aikovrr.com', 'password': 'admin123', 'first_name': 'Admin', 'last_name': 'User', 'role': 'admin', 'is_superuser': True},
    {'username': 'or', 'email': 'or@kovrr.com', 'password': 'bTerAOX4xB', 'first_name': 'Or', 'last_name': 'Amir', 'role': 'analyst', 'is_superuser': False},
    {'username': 'shai', 'email': 'shai@kovrr.com', 'password': 'ZxItIMACEI', 'first_name': 'Shai', 'last_name': 'Yanovski', 'role': 'analyst', 'is_superuser': False},
    {'username': 'yakir', 'email': 'yakir@kovrr.com', 'password': 'qANLqq5fGZ', 'first_name': 'Yakir', 'last_name': 'Golan', 'role': 'analyst', 'is_superuser': False},
    {'username': 'naomi', 'email': 'naomi@kovrr.com', 'password': 'AYAhgbGart', 'first_name': 'Naomi', 'last_name': 'Cohen', 'role': 'analyst', 'is_superuser': False},
    {'username': 'huw', 'email': 'huw@kovrr.com', 'password': 'Sw4JTYmdZS', 'first_name': 'Huw', 'last_name': 'Davies', 'role': 'analyst', 'is_superuser': False},
    {'username': 'alona', 'email': 'alona@kovrr.com', 'password': 'CSLVroXeJZ', 'first_name': 'Alona', 'last_name': 'Levi', 'role': 'analyst', 'is_superuser': False},
    {'username': 'hannah', 'email': 'hannah@kovrr.com', 'password': 'S2OeiSR0eX', 'first_name': 'Hannah', 'last_name': 'Miller', 'role': 'analyst', 'is_superuser': False},
    {'username': 'shalom', 'email': 'shalom@kovrr.com', 'password': 'KCigje4XUE', 'first_name': 'Shalom', 'last_name': 'Ben-David', 'role': 'analyst', 'is_superuser': False},
]

print("Creating/Updating users...")
for user_data in users_data:
    username = user_data.pop('username')
    password = user_data.pop('password')
    
    user, created = AppUser.objects.update_or_create(
        username=username,
        defaults={
            **user_data,
            'password': make_password(password)
        }
    )
    
    if created:
        print(f'✅ Created user: {username}')
    else:
        print(f'✅ Updated user: {username}')

print(f"\nTotal users in database: {AppUser.objects.count()}")
