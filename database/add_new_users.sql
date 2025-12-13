-- Add new users: tomers and ohad
-- Run with: psql -U postgres -d aikovrr -f add_new_users.sql

-- Insert tomers
INSERT INTO aikovrr.auth_app_user (username, email, password_hash, first_name, last_name, role, is_active, last_login, created_at, updated_at)
VALUES (
    'tomers',
    'tomers@kovrr.com',
    'pbkdf2_sha256$870000$EHVX9hhswMHEJvb8$Z5OvVKWzVcRAdYzANwyaF24+x8Pi5oqpG4HQBHM5/s0=', -- Password: 0ThElsqISU
    'Tomer',
    'S',
    'analyst',
    true,
    NULL,
    NOW(),
    NOW()
)
ON CONFLICT (username) DO UPDATE SET
    email = EXCLUDED.email,
    password_hash = EXCLUDED.password_hash,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    role = EXCLUDED.role,
    is_active = EXCLUDED.is_active,
    updated_at = NOW();

-- Insert ohad
INSERT INTO aikovrr.auth_app_user (username, email, password_hash, first_name, last_name, role, is_active, last_login, created_at, updated_at)
VALUES (
    'ohad',
    'ohadh@kovrr.com',
    'pbkdf2_sha256$870000$QTtZfp9OElWVyVq0$wZyjk1fWuvpBrJSuGIIeLPmHOQAd6H/53FaK/BLTUFc=', -- Password: MbpeoVGoFg
    'Ohad',
    'H',
    'analyst',
    true,
    NULL,
    NOW(),
    NOW()
)
ON CONFLICT (username) DO UPDATE SET
    email = EXCLUDED.email,
    password_hash = EXCLUDED.password_hash,
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    role = EXCLUDED.role,
    is_active = EXCLUDED.is_active,
    updated_at = NOW();

-- Verify
SELECT username, email, first_name, last_name, role, is_active 
FROM aikovrr.auth_app_user 
WHERE username IN ('tomers', 'ohad');
