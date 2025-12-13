#!/usr/bin/env python
"""
Script to add new users to the local database
Run with: python add_new_users.py
"""

import os
import sys
import django

# Setup Django
sys.path.insert(0, os.path.dirname(__file__))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'aikovrr.settings')
django.setup()

from core.models import AppUser
from django.contrib.auth.hashers import make_password

def add_users():
    """Add tomers and ohad users to the database"""
    
    users_data = [
        ('tomers', 'tomers@kovrr.com', '0ThElsqISU', 'Tomer', 'S', 'analyst'),
        ('ohad', 'ohadh@kovrr.com', 'MbpeoVGoFg', 'Ohad', 'H', 'analyst'),
    ]
    
    print("Adding new users to local database...\n")
    
    for username, email, password, first_name, last_name, role in users_data:
        user, created = AppUser.objects.get_or_create(
            username=username,
            defaults={
                'email': email,
                'first_name': first_name,
                'last_name': last_name,
                'role': role,
                'is_active': True,
            }
        )
        
        # Always update password to ensure it matches
        user.password = make_password(password)
        user.email = email
        user.first_name = first_name
        user.last_name = last_name
        user.role = role
        user.is_active = True
        user.save()
        
        if created:
            print(f'✅ Created user: {username} ({email})')
        else:
            print(f'✅ Updated user: {username} ({email})')
    
    print(f'\n📊 Total users in system: {AppUser.objects.count()}')
    print('\n👥 All users:')
    for user in AppUser.objects.all().order_by('username'):
        print(f'  - {user.username} ({user.email}) - Role: {user.role}')
    
    print("\n✅ Done! You can now login with:")
    print("   Username: tomers | Password: 0ThElsqISU")
    print("   Username: ohad   | Password: MbpeoVGoFg")

if __name__ == '__main__':
    add_users()
