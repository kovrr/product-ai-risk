# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AIKovrr is a full-stack AI governance and compliance platform for managing AI asset visibility, risk scenarios, and regulatory compliance. The application uses a multi-tenant architecture where organizations (tenants) can track their AI assets, assess risks, and maintain compliance with frameworks like NIST AI RMF and ISO 42001.

## Architecture

### Tech Stack
- **Frontend**: React 19 + Vite + TailwindCSS
- **Backend**: Django 4.2 + Django REST Framework
- **Database**: PostgreSQL (existing schema, `managed = False`)
- **Authentication**: Session-based with Django's custom user model

### Domain Model

The application is organized into four main Django apps:

1. **core** - Authentication and multi-tenancy
   - `AppUser`: Custom authentication user (maps to `auth_app_user` table)
   - `Tenant`: Organization/tenant entity
   - `Department`: Organizational units within tenants
   - `User`: Organization users being monitored (NOT auth users)

2. **visibility** - AI asset discovery and tracking
   - `AIAsset`: Discovered AI tools (ChatGPT, Copilot, etc.)
   - `RiskProfile`: Kovrr-provided risk data for vendors
   - `DiscoverySource`: How assets were discovered (Azure AD, Survey, CSV)
   - `AssetRelationship`: Links between org users and AI assets
   - `UsageIndicator`: Usage metrics for AI assets

3. **risk** - Risk management
   - `RiskScenario`: AI risk scenarios with likelihood/impact/priority
   - `Category`: Risk categories and subcategories (hierarchical)
   - `Framework`: Compliance frameworks (NIST AI RMF, ISO 42001)
   - `Control`: Framework controls
   - `ScenarioControl`: Maps controls to scenarios
   - `Note`: Comments on risk scenarios

4. **governance** - Compliance and assessment
   - `SelfAssessmentTask`: Compliance assessment tasks
   - `CustomField`: Extensible custom fields for any entity

### Key Architectural Patterns

- **Unmanaged Models**: All models use `managed = False` - the database schema is maintained externally via SQL files
- **Multi-tenancy**: Most models have a `tenant` foreign key for data isolation
- **User Duality**:
  - `AppUser` (core.models) = authenticated application users
  - `User` (core.models) = organization employees being monitored
- **Session Authentication**: Uses Django sessions + CSRF (disabled in dev), credentials sent via cookies
- **CORS**: Configured for localhost:5173 in development

## Development Commands

### Quick Setup (Automated)

Run the automated setup script for first-time setup:
```bash
./setup.sh
```

This script:
- Creates PostgreSQL database and imports schema/data
- Sets up Python virtual environment
- Installs dependencies
- Runs Django migrations
- Configures demo user passwords

### Individual Setup Scripts

**Database Setup:**
```bash
cd database
./setup-db.sh
```

**Backend Setup:**
```bash
cd backend
./setup-backend.sh
```

### Manual Development

**Backend (Django):**
```bash
cd backend
source venv/bin/activate              # Activate virtual environment
python manage.py runserver             # Start dev server
python manage.py makemigrations        # Create migrations (rarely needed)
python manage.py migrate               # Apply migrations
python manage.py createsuperuser       # Create admin user
```

**Frontend (React):**
```bash
cd frontend
npm install                            # Install dependencies
npm run dev                            # Start dev server (Vite)
npm run build                          # Production build
npm run lint                           # Run ESLint
npm run preview                        # Preview production build
```

## API Structure

Base URL: `http://localhost:8000/api`

### Authentication
- `POST /auth/login/` - Login (returns session cookie)
- `POST /auth/logout/` - Logout
- `GET /auth/me/` - Current user info

### Visibility (AI Assets)
- `GET /visibility/assets/` - List assets
- `GET /visibility/assets/{id}/` - Asset detail

### Risk Management
- `GET /risk/scenarios/` - List scenarios
- `POST /risk/scenarios/` - Create scenario
- `PUT /risk/scenarios/{id}/` - Update scenario
- `DELETE /risk/scenarios/{id}/` - Delete scenario

## Configuration Notes

### Database Connection
Configuration is managed via environment variables (see `.env.example`):
- `DB_NAME` (default: aikovrr)
- `DB_USER` (default: postgres)
- `DB_PASSWORD` (default: empty)
- `DB_HOST` (default: localhost, use 'db' for Docker)
- `DB_PORT` (default: 5432)

Database uses schema `aikovrr` with search path: `aikovrr,public`

Copy `.env.example` to `.env` and modify as needed for your environment.

### Django Settings (Development)
- `DEBUG = True`
- `ALLOWED_HOSTS = ['*']`
- `CORS_ALLOW_ALL_ORIGINS = True`
- `CSRF_COOKIE_NAME` verification disabled for API
- REST Framework: `AllowAny` permissions for development
- Custom user model: `AUTH_USER_MODEL = 'core.AppUser'`

### Frontend Configuration
- Vite dev server: http://localhost:5173
- API base URL: http://localhost:8000/api
- Axios configured with `withCredentials: true` for session cookies
- TailwindCSS with custom Kovrr Design System theme

## Kovrr Design System

Custom design system implemented in `frontend/tailwind.config.js`:

**Colors:**
- Primary: `#5E5694` (purple)
- Secondary: `#00A3E0` (blue)
- Success: `#28A745`
- Warning: `#FFC107`
- Error: `#DC3545`

**Typography:**
- Font: Source Sans Pro
- Scale: text-xs (12px) to text-4xl (36px)

**Components:** Reusable UI components in `frontend/src/components/` follow this design system

## Login Credentials (Demo Data)

| Username | Password | Role |
|----------|----------|------|
| admin | Khri2025 | Admin |
| or | password123 | Analyst |
| shai | password123 | Analyst |
| liran | password123 | Analyst |
| yakir | password123 | Analyst |

## Common Development Workflows

### Adding New API Endpoints
1. Define model in appropriate app (core/visibility/risk/governance)
2. Create serializer in `serializers.py`
3. Create viewset in `views.py`
4. Register route in `urls.py`
5. Frontend: Add API call in `src/services/` directory

### Database Schema Changes
Since models use `managed = False`, schema changes must be made directly in SQL files:
1. Edit `database/aikovrr_schema.sql`
2. Reimport database or run ALTER statements manually
3. Update Django model definitions to match new schema

### Adding New Features
1. Create/update models in appropriate Django app
2. Add API endpoints (serializer + view + URL)
3. Create/update React components in `frontend/src/pages/` or `frontend/src/components/`
4. Use Kovrr design system colors/components for consistency
5. Ensure proper tenant filtering for multi-tenant data

## Testing

### Manual API Testing
```bash
# Login
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "Khri2025"}' \
  -c cookies.txt

# Test authenticated endpoint
curl -X GET http://localhost:8000/api/visibility/assets/ \
  -b cookies.txt
```

### Frontend Testing
1. Start dev server: `npm run dev`
2. Navigate to http://localhost:5173
3. Login with credentials above
4. Test navigation through Dashboard → Assets → Risk Register

## Important Notes

- **User Confusion**: `AppUser` vs `User` - auth users vs org employees
- **Tenant Context**: Most queries need tenant filtering
- **Unmanaged Models**: Don't rely on Django migrations for schema changes
- **Session Auth**: Requires `withCredentials: true` in frontend API calls
- **Database Search Path**: PostgreSQL connection includes `aikovrr` schema in search path
- **Development Security**: CSRF disabled, CORS open, AllowAny permissions - NOT for production
