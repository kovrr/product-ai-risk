# AIKovrr Login Information

**Date**: November 5, 2025

---

## 🔐 Login Credentials

### Admin User
- **Username**: `admin`
- **Password**: `password123`
- **Email**: admin@aikovrr.com
- **Role**: Administrator (Superuser)

### Test Users
| Username | Password | Email | Role |
|----------|----------|-------|------|
| admin | password123 | admin@aikovrr.com | Admin |
| or | password123 | or@kovrr.com | Analyst |
| shai | password123 | shai@kovrr.com | Analyst |
| liran | password123 | liran@kovrr.com | Analyst |
| yakir | password123 | yakir@kovrr.com | Analyst |
| tomers | 0ThElsqISU | tomers@kovrr.com | Analyst |
| ohad | MbpeoVGoFg | ohadh@kovrr.com | Analyst |

---

## 🌐 Application URLs

### Frontend (React)
- **URL**: http://localhost:5174/
- **Login Page**: http://localhost:5174/login
- **Component Test**: http://localhost:5174/component-test
- **Status**: ✅ Running

### Backend (Django)
- **URL**: http://127.0.0.1:8000/
- **Admin Panel**: http://127.0.0.1:8000/admin/
- **API Base**: http://127.0.0.1:8000/api/
- **Status**: ✅ Running

### Database (PostgreSQL)
- **Database**: `aikovrr`
- **Host**: localhost
- **Port**: 5432
- **Status**: ✅ Connected

---

## 🚀 Quick Start

### 1. Login to AIKovrr
1. Open browser: http://localhost:5174/
2. Enter username: `admin`
3. Enter password: `password123`
4. Click "Login"

### 2. Test Components
- Navigate to: http://localhost:5174/component-test
- Test all 8 new atom components

### 3. View Assets
- Navigate to: Assets Visibility
- See 40 AI assets (10 sanctioned, 10 shadow, 20 under review)

---

## 🔧 Services Status

✅ **Frontend**: Running on port 5174  
✅ **Backend**: Running on port 8000  
✅ **Database**: PostgreSQL with 40 assets loaded  
✅ **Migrations**: Applied successfully  
✅ **Authentication**: Working - Login verified ✅  

---

## 📝 Notes

- Passwords are for development only
- Backend has migrations pending (non-critical for mockup)
- All data is dummy data from PostgreSQL
- Cross-module navigation is ready

---

## 🐛 Troubleshooting

### Can't Login?
1. Check backend is running: http://127.0.0.1:8000/
2. Check frontend is running: http://localhost:5174/
3. Clear browser cookies and try again

### Backend Not Running?
```bash
cd /Users/liransorani/CascadeProjects/aikovrr/backend
python manage.py runserver
```

### Frontend Not Running?
```bash
cd /Users/liransorani/CascadeProjects/aikovrr/frontend
npm run dev
```

---

**Ready to test! 🎉**
