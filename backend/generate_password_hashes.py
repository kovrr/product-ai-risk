#!/usr/bin/env python3
"""
Generate Django password hashes for new users
This script doesn't require Django to be installed
"""

import hashlib
import base64
import secrets

def make_password_hash(password, salt=None, iterations=870000):
    """
    Generate a Django-compatible PBKDF2 SHA256 password hash
    Format: pbkdf2_sha256$iterations$salt$hash
    """
    if salt is None:
        salt = base64.b64encode(secrets.token_bytes(12)).decode('ascii')
    
    # Generate the hash
    hash_obj = hashlib.pbkdf2_hmac(
        'sha256',
        password.encode('utf-8'),
        salt.encode('ascii'),
        iterations,
        dklen=32
    )
    
    # Encode as base64
    hash_b64 = base64.b64encode(hash_obj).decode('ascii').strip()
    
    # Return in Django format
    return f'pbkdf2_sha256${iterations}${salt}${hash_b64}'

# Generate hashes for the two new users
tomers_hash = make_password_hash('0ThElsqISU')
ohad_hash = make_password_hash('MbpeoVGoFg')

print("Password hashes generated:\n")
print(f"tomers (0ThElsqISU):")
print(f"  {tomers_hash}\n")
print(f"ohad (MbpeoVGoFg):")
print(f"  {ohad_hash}\n")

# Generate SQL
sql = f"""-- Add new users: tomers and ohad
-- Run with: psql -U postgres -d aikovrr -f add_new_users.sql

-- Insert tomers
INSERT INTO aikovrr.core_user (username, email, password, first_name, last_name, role, is_active, date_joined, last_login)
VALUES (
    'tomers',
    'tomers@kovrr.com',
    '{tomers_hash}',
    'Tomer',
    'S',
    'analyst',
    true,
    NOW(),
    NULL
)
ON CONFLICT (username) DO UPDATE SET
    email = EXCLUDED.email,
    password = EXCLUDED.password,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    role = EXCLUDED.role,
    is_active = EXCLUDED.is_active;

-- Insert ohad
INSERT INTO aikovrr.core_user (username, email, password, first_name, last_name, role, is_active, date_joined, last_login)
VALUES (
    'ohad',
    'ohadh@kovrr.com',
    '{ohad_hash}',
    'Ohad',
    'H',
    'analyst',
    true,
    NOW(),
    NULL
)
ON CONFLICT (username) DO UPDATE SET
    email = EXCLUDED.email,
    password = EXCLUDED.password,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    role = EXCLUDED.role,
    is_active = EXCLUDED.is_active;

-- Verify
SELECT username, email, first_name, last_name, role, is_active 
FROM aikovrr.core_user 
WHERE username IN ('tomers', 'ohad');
"""

# Save to file
with open('../database/add_new_users.sql', 'w') as f:
    f.write(sql)

print("✅ SQL file generated: database/add_new_users.sql")
print("\nTo add users to your local database, run:")
print("  cd database")
print("  psql -U postgres -d aikovrr -f add_new_users.sql")
