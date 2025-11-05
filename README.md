# AIKovrr - AI Governance Platform

Complete full-stack application for AI governance and compliance management.

## 🏗️ Architecture

- **Frontend**: React 18 + Vite + TypeScript + TailwindCSS (Foqus Design System)
- **Backend**: Django 4.2 + Django REST Framework
- **Database**: PostgreSQL 14+ with demo data
- **Deployment**: Docker + Docker Compose

---

## 🚀 Quick Start Guide

### Option 1: Docker (Recommended) 🐳

The easiest way to run AIKovrr with consistent environment:

```bash
# 1. Create environment file
cp .env.example .env

# 2. Update .env for Docker
# Set: DB_HOST=db
# Set: DB_PASSWORD=postgres

# 3. Start all services
docker-compose up
```

**Access the application:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000/api

**📖 See [DOCKER.md](DOCKER.md) for complete Docker documentation**

### Option 2: Local Setup (Automated)

Run the automated setup script that handles everything:

```bash
./setup.sh
```

This will:
- ✅ Create PostgreSQL database with demo data
- ✅ Set up Python virtual environment
- ✅ Install all dependencies (backend + frontend)
- ✅ Run Django migrations
- ✅ Configure demo user accounts

### ⚡ TL;DR - Run the Application

If you've already completed the installation, use these commands to start the application:

```bash
# Terminal 1: Database
brew services start postgresql@14

# Terminal 2: Backend
cd backend
source venv/bin/activate
python manage.py runserver

# Terminal 3: Frontend
cd frontend
npm run dev
```

Then open `http://localhost:5173` and login with `or@kovrr.com` / `password123`

### Manual Setup

<details>
<summary>Click to expand manual setup instructions</summary>

#### 1. Environment Setup

```bash
cp .env.example .env
# Edit .env if needed (defaults work for local development)
```

#### 2. Database Setup

```bash
cd database
./setup-db.sh
```

#### 3. Backend Setup

```bash
cd backend
./setup-backend.sh
```

#### 4. Frontend Setup

```bash
cd frontend
npm install
```

</details>

---

### Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.9+** - [Download](https://www.python.org/downloads/)
- **Node.js 18+** - [Download](https://nodejs.org/)
- **PostgreSQL 14+** - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/downloads)

---

## 📦 Installation Steps

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd aikovrr
```

### Step 2: Set Up PostgreSQL Database

#### 2.1 Start PostgreSQL Service

**macOS (Homebrew)**:
```bash
brew services start postgresql@14
```

**Linux (Ubuntu/Debian)**:
```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**Windows**:
- Start PostgreSQL from Services or pgAdmin

#### 2.2 Create Database and User

```bash
# Connect to PostgreSQL
psql -U postgres

# Inside PostgreSQL prompt:
CREATE DATABASE aikovrr_db;
CREATE USER aikovrr_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE aikovrr_db TO aikovrr_user;
\q
```

#### 2.3 Import Database Schema and Data

```bash
cd database

# Import schema (creates tables)
psql -U aikovrr_user -d aikovrr_db -f aikovrr_data_v2_minimal.sql

# Verify import
psql -U aikovrr_user -d aikovrr_db -c "\dt"
```

**Expected Output**: You should see tables like `core_tenant`, `core_organizationuser`, `visibility_aiasset`, etc.

---

### Step 3: Set Up Django Backend

#### 3.1 Create Python Virtual Environment

```bash
cd backend

# Create virtual environment
python3.9 -m venv venv

# Activate virtual environment
# macOS/Linux:
source venv/bin/activate

# Windows:
venv\Scripts\activate
```

#### 3.2 Install Python Dependencies

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

#### 3.3 Configure Database Connection

Create a `.env` file in the `backend/` directory:

```bash
# backend/.env
DATABASE_NAME=aikovrr_db
DATABASE_USER=aikovrr_user
DATABASE_PASSWORD=your_secure_password
DATABASE_HOST=localhost
DATABASE_PORT=5432
SECRET_KEY=your-secret-key-here
DEBUG=True
```

#### 3.4 Start Django Development Server

```bash
# Make sure you're in backend/ directory with venv activated
python manage.py runserver
```

✅ **Backend is running at**: `http://localhost:8000`

**Test it**: Open `http://localhost:8000/api/` in your browser

---

### Step 4: Set Up React Frontend

#### 4.1 Install Node Dependencies

```bash
cd frontend
npm install
```

#### 4.2 Configure API Connection

Create a `.env` file in the `frontend/` directory:

```bash
# frontend/.env
VITE_API_URL=http://localhost:8000
```

#### 4.3 Start Vite Development Server

```bash
npm run dev
```

✅ **Frontend is running at**: `http://localhost:5173`

---

## 🎯 Access the Application

1. **Open your browser** and go to: `http://localhost:5173`
2. **Login** with one of the demo accounts (see below)
3. **Explore** the platform!

---

## 🔐 Demo Login Credentials

| Email | Password | Role | Name |
|-------|----------|------|------|
| **or@kovrr.com** | **password123** | **Admin** | **Or Authora** |
| sarah@kovrr.com | password123 | Analyst | Sarah Connor |
| mike@kovrr.com | password123 | Analyst | Mike Ross |
| alex@kovrr.com | password123 | Analyst | Alex Turner |
| jen@kovrr.com | password123 | Analyst | Jennifer Lopez |

**Recommended**: Start with `or@kovrr.com` for full admin access.

---

## ✅ Verify Installation

### Check Backend
```bash
# Test API endpoint
curl http://localhost:8000/api/

# Expected: JSON response with API info
```

### Check Frontend
```bash
# Open in browser
open http://localhost:5173

# Expected: Login page loads
```

### Check Database
```bash
# Connect to database
psql -U aikovrr_user -d aikovrr_db

# Count assets
SELECT COUNT(*) FROM visibility_aiasset;

# Expected: 12 assets
```

---

## 🛑 Troubleshooting

### Database Connection Error

**Error**: `FATAL: password authentication failed`

**Solution**:
1. Check your `.env` file has correct credentials
2. Verify PostgreSQL is running: `pg_isready`
3. Reset password:
   ```bash
   psql -U postgres
   ALTER USER aikovrr_user WITH PASSWORD 'new_password';
   ```

### Backend Won't Start

**Error**: `ModuleNotFoundError: No module named 'django'`

**Solution**:
1. Activate virtual environment: `source venv/bin/activate`
2. Install dependencies: `pip install -r requirements.txt`

### Frontend Won't Start

**Error**: `Cannot find module 'vite'`

**Solution**:
1. Delete `node_modules/` and `package-lock.json`
2. Run `npm install` again
3. Clear npm cache: `npm cache clean --force`

### Port Already in Use

**Error**: `Address already in use: 8000` or `5173`

**Solution**:
```bash
# Find and kill process on port 8000
lsof -ti:8000 | xargs kill -9

# Find and kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

---

## 🔄 Daily Development Workflow

### Starting Your Day

```bash
# Terminal 1: Start Database (if not running)
brew services start postgresql@14  # macOS
# OR
sudo systemctl start postgresql     # Linux

# Terminal 2: Start Backend
cd backend
source venv/bin/activate
python manage.py runserver

# Terminal 3: Start Frontend
cd frontend
npm run dev
```

### Stopping Services

```bash
# Stop backend: Ctrl+C in Terminal 2
# Stop frontend: Ctrl+C in Terminal 3
# Stop database (optional):
brew services stop postgresql@14   # macOS
sudo systemctl stop postgresql     # Linux
```

---

## 📱 Platform Features

### ✅ Fully Implemented Modules

1. **🏠 Hero Dashboard**
   - Real-time metrics overview
   - Risk score trending
   - Asset discovery status
   - Compliance readiness summary

2. **🔍 Assets Visibility**
   - AI asset inventory (12 pre-loaded assets)
   - Advanced search and filtering
   - Risk scoring per asset
   - CSV import/export
   - Detailed asset profiles

3. **⚠️ Risk Register** *(NEW - 88% Complete)*
   - 10 pre-loaded risk scenarios
   - Complete data model (30+ fields)
   - Search, filter, and sort functionality
   - Risk detail pages with tabs
   - Create/Edit risk modal with validation
   - MITRE ATLAS mapping
   - Financial quantification (EAL, VaR, MPL)
   - Data exposure tracking
   - Mitigation planning

4. **📋 Compliance Readiness**
   - Framework alignment (NIST, ISO 42001, EU AI Act)
   - Maturity self-assessment
   - Gap identification

5. **✓ AI Assurance Plan**
   - Control-by-control evaluation
   - Gap analysis
   - Prioritized action plans
   - ROSI calculation

6. **👁️ Governance & Monitoring**
   - Continuous oversight
   - Evidence tracking
   - Alert management
   - Audit trail

7. **🔌 Integration Hub**
   - Data connectors (Entra ID, CASB, DLP)
   - API feeds
   - Real-time data streams

8. **💰 Financial Quantification**
   - Risk quantification
   - ROI analysis
   - Cost-benefit modeling

### 🎨 Foqus Design System
- Complete UI component library
- Consistent styling across all modules
- Accessible and responsive design
- shadcn/ui + Tailwind CSS

## 🎨 Design System Details

### Color Palette
- **Brand Primary**: #5E5694 (Purple)
- **Brand Secondary**: #00A3E0 (Blue)
- **Success**: #28A745 (Green)
- **Warning**: #FFC107 (Yellow)
- **Error**: #DC3545 (Red)
- **Info**: #17A2B8 (Cyan)

### Typography
- **Font Family**: Inter, Source Sans Pro
- **Font Sizes**: 12px - 36px
- **Font Weights**: 400 (Regular), 600 (Semibold), 700 (Bold)

### Component Library
- **Atoms**: Button, Badge, Input, Label, Card, Table
- **Molecules**: DataTable, UserAvatar, StatusBadge, CategoryBadge, FilterPanel
- **Organisms**: RiskFormModal, AssetDetailView, RiskDetailView
- **Design Tokens**: Consistent spacing, colors, and border radius

## 📁 Project Structure

```
aikovrr/
├── product/            # Product documentation
│   ├── PRD.md         # Product Requirements Document
│   └── screenshots/   # Design references & mockups
├── database/           # PostgreSQL schema & data
│   ├── aikovrr_schema.sql
│   ├── aikovrr_data.sql
│   └── README.md
├── backend/            # Django REST API
│   ├── core/          # Auth & organization
│   ├── visibility/    # AI assets discovery
│   ├── risk/          # Risk scenarios & controls
│   ├── governance/    # Compliance readiness
│   ├── monitoring/    # Governance & monitoring
│   └── reports/       # Export functionality
└── frontend/          # React application
    ├── src/
    │   ├── components/  # Reusable UI
    │   ├── pages/       # 9 page components
    │   ├── services/    # API layer
    │   └── contexts/    # Global state
    └── tailwind.config.js
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login/` - Login
- `POST /api/auth/logout/` - Logout
- `GET /api/auth/me/` - Current user

### Visibility
- `GET /api/visibility/assets/` - List AI assets
- `GET /api/visibility/assets/{id}/` - Asset details

### Risk
- `GET /api/risk/scenarios/` - List risk scenarios
- `GET /api/risk/controls/` - List controls
- `GET /api/risk/control-assessments/` - Control assessments
- `GET /api/risk/action-plans/` - Action plans

### Governance
- `GET /api/governance/compliance-readiness/` - Compliance readiness assessments
- `GET /api/governance/maturity-assessments/` - Maturity assessments
- `GET /api/governance/tasks/` - Self-assessment tasks

### Monitoring
- `GET /api/monitoring/alerts/` - System alerts
- `GET /api/monitoring/evidence/` - Evidence tracking
- `GET /api/monitoring/violations/` - Policy violations
- `GET /api/monitoring/audit-logs/` - Audit trail

## 🧪 Testing

### Test Backend API
```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "Khri2025"}' \
  -c cookies.txt

curl -X GET http://localhost:8000/api/visibility/assets/ \
  -b cookies.txt
```

### Test Frontend
1. Open `http://localhost:5173`
2. Login with admin/Khri2025
3. Navigate through Dashboard, Assets, Risk Register

## 📊 Demo Data

- **1 Tenant**: Swift Tech
- **3 Departments**: Engineering, Product, Operations
- **8 Organization Users**: Various roles
- **12 AI Assets**: ChatGPT, GitHub Copilot, Midjourney, etc.
- **5 Risk Scenarios**: Data leakage, model bias, etc.
- **2 Frameworks**: NIST AI RMF, ISO 42001

## 🛠️ Development

### Backend
```bash
cd backend
python3.9 manage.py makemigrations
python3.9 manage.py migrate
python3.9 manage.py createsuperuser
```

### Frontend
```bash
cd frontend
npm install
npm run dev
npm run build
```

## 📝 Important Notes

### Development Configuration
- **CSRF Protection**: Disabled for local development
- **CORS**: Enabled for `localhost:5173`
- **Database Models**: Use `managed = False` (existing database schema)
- **Authentication**: Session-based with Django
- **Hot Reload**: Both frontend and backend support hot reload

### Known Issues
- Tailwind CSS IntelliSense warnings in IDE are normal
- Some API endpoints return mock data (not yet connected to database)
- File uploads not yet implemented

### Performance
- Frontend: Optimized with Vite's HMR
- Backend: Django Debug Toolbar available at `/api/__debug__/`
- Database: Indexed for common queries

## 🎯 Development Roadmap

### ✅ Completed (Phase 1)
- [x] All 8 core module views
- [x] Risk Register data model (30+ fields)
- [x] Risk Register table with search/filter/sort
- [x] Risk detail pages with tabs
- [x] Create/Edit risk modal with validation
- [x] Assets Visibility with CRUD operations
- [x] Dashboard with metrics
- [x] Foqus Design System migration

### 🔄 In Progress (Phase 2)
- [ ] Risk Matrix visualization (5x5 heat map)
- [ ] Metrics sidebar for Risk Register
- [ ] MITRE ATLAS taxonomy integration
- [ ] Interactive filtering on risk matrix

### 📋 Planned (Phase 3+)
- [ ] AI Insights & Chat Interface
- [ ] Financial Quantification charts
- [ ] Loss distribution visualization
- [ ] Activity logging and audit trail
- [ ] Export functionality (CSV, PDF)
- [ ] Integration connectors (Entra ID, CASB, DLP)
- [ ] Real-time alerting and notifications
- [ ] Evidence upload and verification
- [ ] User management and RBAC
- [ ] Database migrations for new models

### 📊 Progress Tracking
- **Overall**: 80/229 tasks (35%)
- **Phase 1**: 80/91 tasks (88%) ✅
- **Phase 2**: 0/33 tasks (0%)
- **Phase 3**: 0/38 tasks (0%)
- **Phase 4**: 0/31 tasks (0%)
- **Phase 5**: 0/36 tasks (0%)

See `RISK_REGISTER_IMPLEMENTATION_MATRIX.md` for detailed task tracking.

## 📚 Additional Documentation

- **[DEPLOYMENT_REQUIREMENTS.md](DEPLOYMENT_REQUIREMENTS.md)** - Linux server requirements for production
- **[RISK_REGISTER_IMPLEMENTATION_MATRIX.md](RISK_REGISTER_IMPLEMENTATION_MATRIX.md)** - Detailed task tracking
- **[CAPABILITIES_STATUS.md](CAPABILITIES_STATUS.md)** - Feature status and roadmap
- **[LOGIN_INFO.md](LOGIN_INFO.md)** - User credentials and access levels
- **[database/README.md](database/README.md)** - Database schema documentation

---

## 🤝 Contributing

This is an internal Kovrr project. For questions or issues:

1. Check the troubleshooting section above
2. Review the documentation files
3. Contact the development team

---

## 📄 License

Internal Kovrr Project - 2025  
All Rights Reserved
