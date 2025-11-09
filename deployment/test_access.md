# ✅ AIKovrr GCloud Deployment - Access Information

## 🌐 **Your Application URL**

**Frontend & Backend**: http://35.202.143.181:8000

**Django Admin**: http://35.202.143.181:8000/admin/
- Username: `admin`
- Password: `admin123`

**API Endpoints**:
- http://35.202.143.181:8000/api/visibility/assets/
- http://35.202.143.181:8000/api/risk/scenarios/

---

## 📋 **Configuration Details**

### **Open Ports (Firewall)**
- ✅ Port 8000 - HTTP (Nginx serving frontend + proxying backend)
- ✅ Port 5137 - Available (not used)
- ✅ Port 22 - SSH (IAP tunnel only)

### **Service Architecture**
```
Internet (Port 8000)
    ↓
Nginx (0.0.0.0:8000)
    ├─→ Frontend: /opt/aikovrr/frontend/dist/
    ├─→ /api/* → Django Backend (127.0.0.1:8001)
    ├─→ /admin/* → Django Admin (127.0.0.1:8001)
    ├─→ /static/* → Static files
    └─→ /media/* → Media files

Django Backend (127.0.0.1:8001)
    ↓
PostgreSQL (localhost:5432)
```

### **Services Running**
- ✅ Nginx: Listening on 0.0.0.0:8000
- ✅ Gunicorn: 4 workers on 127.0.0.1:8001
- ✅ PostgreSQL: Database 'aikovrr'

---

## 🧪 **Test Commands**

### Test from anywhere:
```bash
# Test frontend
curl -I http://35.202.143.181:8000

# Test API
curl http://35.202.143.181:8000/api/risk/scenarios/

# Test admin
curl -I http://35.202.143.181:8000/admin/
```

### Test from VM:
```bash
gcloud compute ssh platform --zone us-central1-f --tunnel-through-iap --command "curl -I http://localhost:8000"
```

---

## 🔧 **Service Management**

### Check Status
```bash
gcloud compute ssh platform --zone us-central1-f --tunnel-through-iap --command "
  sudo systemctl status nginx --no-pager
  sudo systemctl status aikovrr-backend --no-pager
"
```

### View Logs
```bash
# Nginx logs
gcloud compute ssh platform --zone us-central1-f --tunnel-through-iap --command "sudo tail -f /var/log/nginx/error.log"

# Backend logs
gcloud compute ssh platform --zone us-central1-f --tunnel-through-iap --command "sudo journalctl -u aikovrr-backend -f"
```

### Restart Services
```bash
gcloud compute ssh platform --zone us-central1-f --tunnel-through-iap --command "
  sudo systemctl restart aikovrr-backend
  sudo systemctl restart nginx
"
```

---

## 📝 **Files Modified**

1. `/etc/nginx/sites-available/aikovrr` - Nginx config (port 8000)
2. `/etc/systemd/system/aikovrr-backend.service` - Backend service (port 8001)

---

## ✅ **Deployment Complete!**

**Access your application at**: http://35.202.143.181:8000

No tunnel needed - works from any browser! 🚀
