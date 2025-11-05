# AIKovrr Backend - Django REST API

Django + PostgreSQL backend for the AIKovrr AI governance platform.

## Setup

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Database

Configuration is managed via environment variables. Copy `.env.example` to `.env` in the project root:

```bash
cp ../.env.example ../.env
```

The defaults work for local PostgreSQL with the `postgres` user and no password.

### 3. Run Migrations (Optional - tables already exist)

Since we're using `managed = False` in models, Django won't create tables.
The tables are already created via SQL dump.

```bash
python3.9 manage.py migrate
```

### 4. Create Superuser Passwords

Set passwords for the application users:

```bash
python3.9 manage.py changepassword admin
python3.9 manage.py changepassword or
python3.9 manage.py changepassword shai
python3.9 manage.py changepassword liran
python3.9 manage.py changepassword yakir
```

### 5. Run Development Server

```bash
python3.9 manage.py runserver
```

API will be available at `http://localhost:8000`

## API Endpoints

### Authentication
- `POST /api/auth/login/` - Login
- `POST /api/auth/logout/` - Logout
- `GET /api/auth/me/` - Get current user

### Core
- `/api/auth/tenants/` - Tenants CRUD
- `/api/auth/departments/` - Departments CRUD
- `/api/auth/users/` - Organization users CRUD

### Visibility
- `/api/visibility/assets/` - AI Assets CRUD
- `/api/visibility/risk-profiles/` - Risk Profiles CRUD
- `/api/visibility/discovery-sources/` - Discovery Sources CRUD
- `/api/visibility/asset-relationships/` - User-Asset Relationships CRUD
- `/api/visibility/usage-indicators/` - Usage Indicators CRUD

### Risk
- `/api/risk/scenarios/` - Risk Scenarios CRUD
- `/api/risk/categories/` - Risk Categories CRUD
- `/api/risk/frameworks/` - Frameworks CRUD
- `/api/risk/controls/` - Controls CRUD
- `/api/risk/scenario-controls/` - Scenario-Control Mappings CRUD
- `/api/risk/notes/` - Risk Notes CRUD

### Governance
- `/api/governance/tasks/` - Self-Assessment Tasks CRUD
- `/api/governance/custom-fields/` - Custom Fields CRUD

### Reports
- `/api/reports/visibility-export/` - Export visibility data
- `/api/reports/risk-export/` - Export risk register

## Admin Interface

Access Django admin at `http://localhost:8000/admin/`

## Project Structure

```
backend/
├── aikovrr/          # Main project settings
├── core/             # Authentication & org structure
├── visibility/       # AI assets & discovery
├── risk/             # Risk scenarios & frameworks
├── governance/       # Self-assessment & compliance
├── reports/          # Export functionality
├── manage.py
└── requirements.txt
```
