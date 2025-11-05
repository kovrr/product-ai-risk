#!/bin/bash
# Database Setup Script for AIKovrr
# Creates database, imports schema and data, and sets up demo users

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}AIKovrr Database Setup${NC}"
echo -e "${GREEN}=====================================${NC}"
echo ""

# Configuration
DB_NAME="${DB_NAME:-aikovrr}"
DB_USER="${DB_USER:-postgres}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Check if PostgreSQL is running
echo -e "${YELLOW}[1/6]${NC} Checking PostgreSQL connection..."
if ! psql -U "$DB_USER" -d postgres -c '\q' 2>/dev/null; then
    echo -e "${RED}Error: Cannot connect to PostgreSQL.${NC}"
    echo "Please ensure PostgreSQL is running and you have access."
    echo ""
    echo "Try one of these:"
    echo "  - brew services start postgresql"
    echo "  - pg_ctl -D /usr/local/var/postgres start"
    exit 1
fi
echo -e "${GREEN}✓${NC} PostgreSQL is running"

# Create postgres role if it doesn't exist (for macOS Homebrew users)
echo ""
echo -e "${YELLOW}[2/6]${NC} Ensuring postgres role exists..."
if ! psql -U "$DB_USER" -d postgres -tAc "SELECT 1 FROM pg_roles WHERE rolname='postgres'" | grep -q 1; then
    echo "Creating postgres role..."
    psql -U "$DB_USER" -d postgres -c "CREATE ROLE postgres WITH SUPERUSER LOGIN;" 2>/dev/null || true
    echo -e "${GREEN}✓${NC} Created postgres role"
else
    echo -e "${GREEN}✓${NC} postgres role already exists"
fi

# Drop database if it exists (optional - comment out if you want to keep existing data)
echo ""
echo -e "${YELLOW}[3/6]${NC} Setting up database..."
if psql -U "$DB_USER" -d postgres -lqt | cut -d \| -f 1 | grep -qw "$DB_NAME"; then
    echo -e "${YELLOW}Warning: Database '$DB_NAME' already exists.${NC}"
    read -p "Do you want to drop and recreate it? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Dropping existing database..."
        psql -U "$DB_USER" -d postgres -c "DROP DATABASE IF EXISTS $DB_NAME;"
        psql -U "$DB_USER" -d postgres -c "CREATE DATABASE $DB_NAME;"
        echo -e "${GREEN}✓${NC} Database recreated"
    else
        echo -e "${YELLOW}⚠${NC}  Skipping database creation"
    fi
else
    echo "Creating database '$DB_NAME'..."
    psql -U "$DB_USER" -d postgres -c "CREATE DATABASE $DB_NAME;"
    echo -e "${GREEN}✓${NC} Database created"
fi

# Import schema
echo ""
echo -e "${YELLOW}[4/6]${NC} Importing database schema..."
if [ -f "$SCRIPT_DIR/aikovrr_schema.sql" ]; then
    psql -U "$DB_USER" -d "$DB_NAME" -f "$SCRIPT_DIR/aikovrr_schema.sql" > /dev/null
    echo -e "${GREEN}✓${NC} Schema imported successfully"
else
    echo -e "${RED}Error: Schema file not found: $SCRIPT_DIR/aikovrr_schema.sql${NC}"
    exit 1
fi

# Import demo data
echo ""
echo -e "${YELLOW}[5/6]${NC} Importing demo data..."
if [ -f "$SCRIPT_DIR/aikovrr_data.sql" ]; then
    psql -U "$DB_USER" -d "$DB_NAME" -f "$SCRIPT_DIR/aikovrr_data.sql" > /dev/null
    echo -e "${GREEN}✓${NC} Demo data imported successfully"
else
    echo -e "${RED}Error: Data file not found: $SCRIPT_DIR/aikovrr_data.sql${NC}"
    exit 1
fi

# Verify import
echo ""
echo -e "${YELLOW}[6/6]${NC} Verifying database setup..."
TENANT_COUNT=$(psql -U "$DB_USER" -d "$DB_NAME" -tAc "SELECT COUNT(*) FROM aikovrr.core_tenant;")
ASSET_COUNT=$(psql -U "$DB_USER" -d "$DB_NAME" -tAc "SELECT COUNT(*) FROM aikovrr.visibility_ai_asset;")
USER_COUNT=$(psql -U "$DB_USER" -d "$DB_NAME" -tAc "SELECT COUNT(*) FROM aikovrr.auth_app_user;")

echo -e "${GREEN}✓${NC} Database verification:"
echo "  - Tenants: $TENANT_COUNT"
echo "  - AI Assets: $ASSET_COUNT"
echo "  - Auth Users: $USER_COUNT"

echo ""
echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}Database setup completed!${NC}"
echo -e "${GREEN}=====================================${NC}"
echo ""
echo "Next steps:"
echo "  1. Run: cd ../backend && ./setup-backend.sh"
echo "  2. Start the server: python manage.py runserver"
echo ""
