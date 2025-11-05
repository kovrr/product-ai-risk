#!/bin/bash
# AIKovrr Backend Entrypoint Script
# Handles database readiness, migrations, and demo data setup

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting AIKovrr Backend...${NC}"

# Wait for PostgreSQL to be ready
echo -e "${YELLOW}Waiting for PostgreSQL at ${DB_HOST}:${DB_PORT}...${NC}"
max_attempts=30
attempt=0

while ! pg_isready -h "$DB_HOST" -p "${DB_PORT:-5432}" -U "$DB_USER" > /dev/null 2>&1; do
  attempt=$((attempt + 1))
  if [ $attempt -eq $max_attempts ]; then
    echo -e "${RED}Error: PostgreSQL did not become ready in time${NC}"
    exit 1
  fi
  echo "  Attempt $attempt/$max_attempts..."
  sleep 1
done

echo -e "${GREEN}✓ PostgreSQL is ready${NC}"

# Run database migrations
echo -e "${YELLOW}Running database migrations...${NC}"
python manage.py migrate --no-input

if [ $? -eq 0 ]; then
  echo -e "${GREEN}✓ Migrations completed${NC}"
else
  echo -e "${RED}Error: Migrations failed${NC}"
  exit 1
fi

# Set demo user passwords in development mode
if [ "$DEBUG" = "True" ] || [ "$DEBUG" = "true" ]; then
  echo -e "${YELLOW}Setting demo user passwords...${NC}"

  python << 'EOF'
import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'aikovrr.settings')
django.setup()

from django.contrib.auth.hashers import make_password
from core.models import AppUser

users_passwords = {
    'admin': 'Khri2025',
    'or': 'password123',
    'shai': 'password123',
    'liran': 'password123',
    'yakir': 'password123'
}

updated = 0
for username, password in users_passwords.items():
    try:
        user = AppUser.objects.get(username=username)
        user.password = make_password(password)
        user.save()
        print(f"  ✓ {username}")
        updated += 1
    except AppUser.DoesNotExist:
        print(f"  ✗ {username} (not found)", file=sys.stderr)

if updated == 5:
    print(f"\n✓ Updated passwords for all {updated} users")
    sys.exit(0)
else:
    print(f"\n⚠ Updated passwords for {updated}/5 users", file=sys.stderr)
    sys.exit(0)
EOF

  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Demo passwords configured${NC}"
  else
    echo -e "${YELLOW}⚠ Some demo passwords could not be set${NC}"
  fi
fi

echo -e "${GREEN}Backend initialization complete${NC}"
echo ""

# Execute the main command
exec "$@"
