# AIKovrr Setup Guide

This guide explains the automated setup process and troubleshooting common issues.

## Prerequisites

Before running the setup scripts, ensure you have:

- **PostgreSQL** installed and running
  - macOS: `brew install postgresql && brew services start postgresql`
  - Linux: `sudo apt install postgresql postgresql-contrib`

- **Python 3.9** installed
  - macOS: `brew install python@3.9`
  - Linux: `sudo apt install python3.9`

- **Node.js 18+** and npm (for frontend)
  - macOS: `brew install node`
  - Linux: `sudo apt install nodejs npm`

## Quick Start

### One-Command Setup

```bash
./setup.sh
```

This master script runs both database and backend setup automatically.

### Individual Setup Scripts

If you prefer to run setup in stages:

#### 1. Database Setup
```bash
cd database
./setup-db.sh
```

**What it does:**
- Creates `postgres` role if missing (common on macOS Homebrew installations)
- Creates `aikovrr` database
- Imports database schema (`aikovrr_schema.sql`)
- Imports demo data (`aikovrr_data.sql`)
- Verifies data import

#### 2. Backend Setup
```bash
cd backend
./setup-backend.sh
```

**What it does:**
- Creates Python 3.9 virtual environment
- Installs dependencies from `requirements.txt`
- Creates `.env` file from `.env.example`
- Runs Django migrations (creates system tables like `django_session`, `auth_permission`, etc.)
- Verifies migrations applied successfully
- Sets proper password hashes for all 5 demo users
- Verifies all passwords were set correctly
- Runs Django system check to ensure everything is configured properly

## Environment Configuration

The setup creates a `.env` file with these defaults:

```bash
# Database
DB_NAME=aikovrr
DB_USER=postgres
DB_PASSWORD=
DB_HOST=localhost
DB_PORT=5432

# Django
SECRET_KEY=django-insecure-rk$n-h@t(s#ib)14bkex1@o+^an-bddl9)nwjv21lf9f$2qury
DEBUG=True
ALLOWED_HOSTS=*

# Frontend
VITE_API_URL=http://localhost:8000/api
```

**For production**, you MUST:
1. Generate a new `SECRET_KEY`
2. Set `DEBUG=False`
3. Specify exact `ALLOWED_HOSTS`
4. Set strong database password

## Demo User Accounts

The setup configures these demo accounts:

| Username | Password    | Role    |
|----------|-------------|---------|
| admin    | Khri2025    | Admin   |
| or       | password123 | Analyst |
| shai     | password123 | Analyst |
| liran    | password123 | Analyst |
| yakir    | password123 | Analyst |

## Common Issues

### Issue: "Cannot connect to PostgreSQL"

**Solution:**
```bash
# Check if PostgreSQL is running
brew services list  # macOS
sudo systemctl status postgresql  # Linux

# Start PostgreSQL if needed
brew services start postgresql  # macOS
sudo systemctl start postgresql  # Linux
```

### Issue: "role 'postgres' does not exist"

**Solution:**
The setup script automatically creates this role. If it fails:
```bash
psql -d postgres -c "CREATE ROLE postgres WITH SUPERUSER LOGIN;"
```

### Issue: "python3.9: command not found"

**Solution:**
```bash
# Install Python 3.9
brew install python@3.9  # macOS
sudo apt install python3.9  # Linux

# Verify installation
python3.9 --version
```

### Issue: "Database already exists"

The setup script will ask if you want to drop and recreate it. Choose:
- **Yes** - if you want fresh demo data
- **No** - if you want to keep existing data

### Issue: "permission denied: ./setup.sh"

**Solution:**
```bash
chmod +x setup.sh
chmod +x database/setup-db.sh
chmod +x backend/setup-backend.sh
```

### Issue: Django migrations fail

**Solution:**
```bash
cd backend
source venv/bin/activate
python manage.py migrate --run-syncdb
```

## Manual Database Reset

If you need to completely reset the database:

```bash
# Drop existing database
psql -U postgres -d postgres -c "DROP DATABASE IF EXISTS aikovrr;"

# Run setup again
cd database
./setup-db.sh
cd ../backend
./setup-backend.sh
```

## Verification

After setup completes, verify everything works:

### 1. Check Database
```bash
psql -U postgres -d aikovrr -c "SELECT COUNT(*) FROM aikovrr.core_tenant;"
# Should return: 1

psql -U postgres -d aikovrr -c "SELECT COUNT(*) FROM aikovrr.visibility_ai_asset;"
# Should return: 5

psql -U postgres -d aikovrr -c "SELECT username FROM aikovrr.auth_app_user;"
# Should list: admin, or, shai, liran, yakir
```

### 2. Test Backend
```bash
cd backend
source venv/bin/activate
python manage.py check
# Should show: System check identified no issues (0 silenced).
```

### 3. Start Services
```bash
# Terminal 1: Backend
cd backend
source venv/bin/activate
python manage.py runserver

# Terminal 2: Frontend
cd frontend
npm install
npm run dev
```

### 4. Test Login
Open `http://localhost:5173` and login with:
- Username: `admin`
- Password: `Khri2025`

## What Gets Created

After running setup, your project structure includes:

```
.
├── .env                          # Environment configuration (GENERATED)
├── setup.sh                      # Master setup script
├── database/
│   ├── setup-db.sh              # Database setup script
│   ├── aikovrr_schema.sql       # Database schema
│   └── aikovrr_data.sql         # Demo data
├── backend/
│   ├── setup-backend.sh         # Backend setup script
│   ├── venv/                    # Virtual environment (GENERATED)
│   ├── requirements.txt
│   └── manage.py
└── frontend/
    ├── package.json
    └── src/
```

## Next Steps

After successful setup:

1. **Development**
   - Start backend: `cd backend && source venv/bin/activate && python manage.py runserver`
   - Start frontend: `cd frontend && npm run dev`
   - Access app: http://localhost:5173

2. **Explore the API**
   - API docs: http://localhost:8000/api/
   - Admin panel: http://localhost:8000/admin/

3. **Containerization**
   - See Docker setup guide (coming soon)

## Getting Help

If you encounter issues not covered here:

1. Check the logs in the terminal output
2. Review `.env` file settings
3. Ensure all prerequisites are installed
4. Try manual setup steps individually
5. Check PostgreSQL logs: `tail -f /usr/local/var/log/postgres.log` (macOS)

## Clean Uninstall

To completely remove the setup:

```bash
# Drop database
psql -U postgres -d postgres -c "DROP DATABASE aikovrr;"

# Remove virtual environment
rm -rf backend/venv

# Remove environment file
rm .env

# Remove node modules (optional)
rm -rf frontend/node_modules
```
