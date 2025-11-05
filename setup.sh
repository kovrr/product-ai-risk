#!/bin/bash
# AIKovrr Master Setup Script
# Complete setup for database and backend

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

clear
echo -e "${BLUE}"
cat << "EOF"
    ___    ____  __ ____
   /   |  /  _/ / //_/ /___ _   ___________
  / /| |  / /  / ,<  / / __ \ | / / ___/ _ \
 / ___ |_/ /  / /| |/ / /_/ / |/ / /  /  __/
/_/  |_/___/ /_/ |_/_/\____/|___/_/   \___/

EOF
echo -e "${NC}"
echo -e "${GREEN}Welcome to AIKovrr Setup${NC}"
echo -e "${GREEN}=====================================${NC}"
echo ""
echo "This script will set up:"
echo "  1. PostgreSQL database with demo data"
echo "  2. Django backend with dependencies"
echo "  3. React frontend with dependencies"
echo "  4. Demo user accounts"
echo ""
echo -e "${YELLOW}Note: This will take a few minutes.${NC}"
echo ""
read -p "Press Enter to continue or Ctrl+C to cancel..."
echo ""

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Step 1: Database Setup
echo -e "${BLUE}=====================================${NC}"
echo -e "${BLUE}Step 1: Database Setup${NC}"
echo -e "${BLUE}=====================================${NC}"
echo ""
cd database
chmod +x setup-db.sh
./setup-db.sh

if [ $? -ne 0 ]; then
    echo -e "${RED}Database setup failed. Please check the errors above.${NC}"
    exit 1
fi

# Step 2: Backend Setup
echo ""
echo -e "${BLUE}=====================================${NC}"
echo -e "${BLUE}Step 2: Backend Setup${NC}"
echo -e "${BLUE}=====================================${NC}"
echo ""
cd "$SCRIPT_DIR/backend"
chmod +x setup-backend.sh
./setup-backend.sh

if [ $? -ne 0 ]; then
    echo -e "${RED}Backend setup failed. Please check the errors above.${NC}"
    exit 1
fi

# Step 3: Frontend Setup
echo ""
echo -e "${BLUE}=====================================${NC}"
echo -e "${BLUE}Step 3: Frontend Setup${NC}"
echo -e "${BLUE}=====================================${NC}"
echo ""
cd "$SCRIPT_DIR/frontend"

# Check if Node.js is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm is not installed.${NC}"
    echo "Please install Node.js and npm:"
    echo "  - macOS: brew install node"
    echo "  - Linux: sudo apt install nodejs npm"
    exit 1
fi

echo -e "${YELLOW}[1/2]${NC} Checking Node.js version..."
NODE_VERSION=$(node --version)
echo -e "${GREEN}✓${NC} Found Node.js $NODE_VERSION"

echo ""
echo -e "${YELLOW}[2/2]${NC} Installing frontend dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo -e "${RED}Frontend setup failed. Please check the errors above.${NC}"
    exit 1
fi

echo -e "${GREEN}✓${NC} Frontend dependencies installed"

# Final success message
cd "$SCRIPT_DIR"
clear
echo -e "${GREEN}"
cat << "EOF"
  ____       _                   ____                      _      _       _
 / ___|  ___| |_ _   _ _ __     / ___|___  _ __ ___  _ __ | | ___| |_ ___| |
 \___ \ / _ \ __| | | | '_ \   | |   / _ \| '_ ` _ \| '_ \| |/ _ \ __/ _ \ |
  ___) |  __/ |_| |_| | |_) |  | |__| (_) | | | | | | |_) | |  __/ ||  __/_|
 |____/ \___|\__|\__,_| .__/    \____\___/|_| |_| |_| .__/|_|\___|\__\___(_)
                      |_|                            |_|
EOF
echo -e "${NC}"
echo ""
echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}✓ AIKovrr setup completed successfully!${NC}"
echo -e "${GREEN}=====================================${NC}"
echo ""
echo -e "${YELLOW}📊 Database:${NC}"
echo "  - Database: aikovrr"
echo "  - User: postgres"
echo "  - Schema imported with demo data"
echo ""
echo -e "${YELLOW}⚙️  Backend:${NC}"
echo "  - Python 3.9 virtual environment"
echo "  - Django 4.2 + REST Framework"
echo "  - All dependencies installed"
echo ""
echo -e "${YELLOW}⚛️  Frontend:${NC}"
echo "  - React 19 + Vite"
echo "  - 346 packages installed"
echo "  - Ready to run"
echo ""
echo -e "${YELLOW}🔐 Demo Accounts:${NC}"
echo "  - admin / Khri2025 (Admin)"
echo "  - or / password123 (Analyst)"
echo "  - shai / password123 (Analyst)"
echo "  - liran / password123 (Analyst)"
echo "  - yakir / password123 (Analyst)"
echo ""
echo -e "${YELLOW}🚀 Quick Start:${NC}"
echo ""
echo "  1. Start the backend:"
echo "     ${BLUE}cd backend${NC}"
echo "     ${BLUE}source venv/bin/activate${NC}"
echo "     ${BLUE}python manage.py runserver${NC}"
echo ""
echo "  2. Start the frontend (in a new terminal):"
echo "     ${BLUE}cd frontend${NC}"
echo "     ${BLUE}npm install${NC}"
echo "     ${BLUE}npm run dev${NC}"
echo ""
echo "  3. Access the application:"
echo "     Frontend: ${BLUE}http://localhost:5173${NC}"
echo "     Backend:  ${BLUE}http://localhost:8000${NC}"
echo ""
echo -e "${GREEN}Happy coding! 🎉${NC}"
echo ""
