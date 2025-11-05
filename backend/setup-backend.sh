#!/bin/bash
# Backend Setup Script for AIKovrr
# Sets up Python virtual environment, installs dependencies, and configures Django

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}AIKovrr Backend Setup${NC}"
echo -e "${GREEN}=====================================${NC}"
echo ""

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Check for Python 3.9
echo -e "${YELLOW}[1/6]${NC} Checking Python version..."
if ! command -v python3.9 &> /dev/null; then
    echo -e "${RED}Error: Python 3.9 is not installed.${NC}"
    echo "Please install Python 3.9:"
    echo "  - macOS: brew install python@3.9"
    echo "  - Linux: sudo apt install python3.9"
    exit 1
fi
PYTHON_VERSION=$(python3.9 --version)
echo -e "${GREEN}✓${NC} Found $PYTHON_VERSION"

# Create virtual environment
echo ""
echo -e "${YELLOW}[2/6]${NC} Setting up virtual environment..."
if [ -d "venv" ]; then
    echo -e "${YELLOW}⚠${NC}  Virtual environment already exists"
    read -p "Do you want to recreate it? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Removing existing virtual environment..."
        rm -rf venv
        python3.9 -m venv venv
        echo -e "${GREEN}✓${NC} Virtual environment recreated"
    else
        echo -e "${YELLOW}⚠${NC}  Using existing virtual environment"
    fi
else
    python3.9 -m venv venv
    echo -e "${GREEN}✓${NC} Virtual environment created"
fi

# Activate virtual environment
source venv/bin/activate

# Upgrade pip
echo ""
echo -e "${YELLOW}[3/6]${NC} Installing dependencies..."
echo "Upgrading pip..."
pip install --upgrade pip -q

# Install requirements
echo "Installing requirements from requirements.txt..."
pip install -r requirements.txt -q
echo -e "${GREEN}✓${NC} Dependencies installed"

# Check for .env file
echo ""
echo -e "${YELLOW}[4/6]${NC} Checking environment configuration..."
if [ ! -f "../.env" ]; then
    echo -e "${YELLOW}⚠${NC}  .env file not found, copying from .env.example..."
    if [ -f "../.env.example" ]; then
        cp ../.env.example ../.env
        echo -e "${GREEN}✓${NC} Created .env file (please review and update if needed)"
    else
        echo -e "${RED}Error: .env.example not found${NC}"
        exit 1
    fi
else
    echo -e "${GREEN}✓${NC} .env file exists"
fi

# Run Django migrations
echo ""
echo -e "${YELLOW}[5/6]${NC} Running Django setup..."
echo "Running database migrations..."
python manage.py migrate --no-input 2>&1 | grep -E "(Applying|Operations|OK)" || echo "Migrations completed"

# Verify migrations
if ! python manage.py showmigrations --plan | grep -q "\[X\]"; then
    echo -e "${RED}Error: Migrations failed to apply${NC}"
    exit 1
fi
echo -e "${GREEN}✓${NC} Migrations applied successfully"

# Set demo user passwords
echo ""
echo -e "${YELLOW}[6/6]${NC} Setting demo user passwords..."
python << 'PYTHON_EOF'
import os
import sys
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'aikovrr.settings')
django.setup()

from django.contrib.auth.hashers import make_password
from core.models import AppUser

# Demo user passwords
users_passwords = {
    'admin': 'Khri2025',
    'or': 'password123',
    'shai': 'password123',
    'liran': 'password123',
    'yakir': 'password123'
}

updated = 0
errors = []
for username, password in users_passwords.items():
    try:
        user = AppUser.objects.get(username=username)
        user.password = make_password(password)
        user.save()
        updated += 1
        print(f"  ✓ {username}")
    except AppUser.DoesNotExist:
        errors.append(username)
        print(f"  ✗ {username} (not found)", file=sys.stderr)
    except Exception as e:
        errors.append(username)
        print(f"  ✗ {username} (error: {e})", file=sys.stderr)

if updated == 5:
    print(f"\nSuccess: Updated passwords for all {updated} users")
    sys.exit(0)
elif updated > 0:
    print(f"\nWarning: Updated passwords for {updated}/5 users")
    sys.exit(0)
else:
    print(f"\nError: Failed to update any user passwords")
    sys.exit(1)
PYTHON_EOF

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓${NC} Demo user passwords configured"
else
    echo -e "${RED}Error: Failed to set demo user passwords${NC}"
    exit 1
fi

# Run Django check
echo ""
echo "Running Django system check..."
python manage.py check --database default

echo ""
echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}Backend setup completed!${NC}"
echo -e "${GREEN}=====================================${NC}"
echo ""
echo "Demo user credentials:"
echo "  - admin / Khri2025 (Admin)"
echo "  - or / password123 (Analyst)"
echo "  - shai / password123 (Analyst)"
echo "  - liran / password123 (Analyst)"
echo "  - yakir / password123 (Analyst)"
echo ""
echo "To start the development server:"
echo "  source venv/bin/activate"
echo "  python manage.py runserver"
echo ""
