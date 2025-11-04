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

### ✅ Implemented
- **Authentication** - Login/logout with session management
- **Dashboard** - Metrics overview with real-time data
- **Assets Visibility** - AI asset inventory with search
- **Risk Register** - Risk scenarios management
- **Kovrr Design System** - Complete UI component library

### 🚧 Placeholder Screens
- Quantification Board
- Third-Party AI Supply Chain
- Controls Maturity
- Self-Assessment

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
├── database/           # PostgreSQL schema & data
│   ├── aikovrr_schema.sql
│   ├── aikovrr_data.sql
│   └── README.md
├── backend/            # Django REST API
│   ├── core/          # Auth & organization
│   ├── visibility/    # AI assets
│   ├── risk/          # Risk scenarios
│   ├── governance/    # Compliance
│   └── reports/       # Export functionality
└── frontend/          # React application
    ├── src/
    │   ├── components/  # Reusable UI
    │   ├── pages/       # Page components
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
- `POST /api/risk/scenarios/` - Create scenario
- `PUT /api/risk/scenarios/{id}/` - Update scenario
- `DELETE /api/risk/scenarios/{id}/` - Delete scenario

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

1. Implement CRUD operations for Risk Register
2. Add CSV import for AI assets
3. Build Quantification Board with charts
4. Implement Controls Maturity assessment
5. Add Self-Assessment workflow
6. Create reporting/export functionality

## 📄 License

Internal Kovrr project - 2025
# aikovrr_mock
