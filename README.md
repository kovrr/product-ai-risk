# AIKovrr - AI Governance Platform

Complete full-stack application for AI governance and compliance management.

## 🏗️ Architecture

- **Frontend**: React 19 + Vite + TailwindCSS (Kovrr Design System)
- **Backend**: Django 4.2 + Django REST Framework
- **Database**: PostgreSQL with demo data

## 🚀 Quick Start

### 1. Start PostgreSQL Database

Make sure PostgreSQL is running and import the database:

```bash
cd database
psql -U liransorani -d postgres -f aikovrr_schema.sql
psql -U liransorani -d aikovrr -f aikovrr_data.sql
```

### 2. Start Django Backend

```bash
cd backend
python3.9 manage.py runserver
```

Backend will run at: `http://localhost:8000`

### 3. Start React Frontend

```bash
cd frontend
npm run dev
```

Frontend will run at: `http://localhost:5173`

## 🔐 Login Credentials

| Username | Password | Role |
|----------|----------|------|
| admin | Khri2025 | Admin |
| or | password123 | Analyst |
| shai | password123 | Analyst |
| liran | password123 | Analyst |
| yakir | password123 | Analyst |

## 📱 Features

### ✅ Fully Implemented
1. **Hero Dashboard** - Comprehensive metrics overview with real-time data
2. **Assets Visibility (Third Party Inside)** - Discover and inventory all AI tools, models, and services (sanctioned + shadow AI)
3. **Risk Register** - Capture, quantify, and manage AI-related risk scenarios with likelihood & impact
4. **Compliance Readiness** - High-level governance & maturity self-evaluation aligned to frameworks (NIST, ISO 42001, EU AI Act)
5. **AI Assurance Plan** - Control-by-control evaluation with gap identification and prioritized action plan generation
6. **Governance & Monitoring** - Continuous oversight, evidence tracking, alerts, policy enforcement, and audit trail
7. **Integration Hub** - Data connectors for Entra ID, CASB, DLP, and API feeds with real-time data streams
8. **Financial Quantification** - Financial quantification of risks per gaps identified with ROI analysis

### 🎨 Design System
- **Kovrr Design System** - Complete UI component library with consistent styling

## 🎨 Kovrr Design System

### Colors
- **Primary**: #5E5694 (Purple)
- **Secondary**: #00A3E0 (Blue)
- **Success**: #28A745
- **Warning**: #FFC107
- **Error**: #DC3545

### Typography
- **Font**: Source Sans Pro
- **Sizes**: 12px - 36px

### Components
- Buttons (primary, secondary, outline, ghost)
- Cards with headers
- Tables with hover states
- Badges (success, warning, error, info)
- Form inputs with focus states

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

## 📝 Notes

- CSRF protection disabled for API development
- CORS enabled for localhost:5173
- All models use `managed = False` (existing database)
- Session-based authentication
- Tailwind CSS warnings in IDE are normal

## 🎯 Next Steps

1. ✅ ~~Implement all 8 core views~~ - **COMPLETED**
2. Connect frontend to backend APIs for data persistence
3. Add CSV import/export for AI assets
4. Implement chart visualizations for Financial Quantification
5. Build integration connectors (Entra ID, CASB, DLP)
6. Add real-time alerting and notifications
7. Implement evidence upload and verification
8. Create comprehensive reporting/export functionality
9. Add user management and role-based access control
10. Implement database migrations for new models

## 📄 License

Internal Kovrr project - 2025
# aikovrr_mock
# aikovrr_mock
