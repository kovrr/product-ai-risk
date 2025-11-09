# 🔒 AIKovrr Access via IAP Tunnel

## ⚠️ **Current Situation**

Your GCloud VM is configured with **strict security**:
- ✅ Firewall only allows IAP (Identity-Aware Proxy) traffic
- ❌ Direct public internet access is **blocked**
- ❌ You don't have permissions to modify firewall rules

This is actually **good security practice** for production systems!

---

## 🎯 **Solution: Use IAP Tunnel**

### **One-Time Setup (Run Once)**

Open a terminal and run:

```bash
gcloud compute start-iap-tunnel platform 8000 \
  --local-host-port=localhost:8000 \
  --zone=us-central1-f
```

**Keep this terminal open** while you use the app.

---

### **Access Your Application**

Once the tunnel is running, open in your browser:

**Frontend**: http://localhost:8000

**Django Admin**: http://localhost:8000/admin/
- Username: `admin`
- Password: `admin123`

**API**: http://localhost:8000/api/

---

## 🔄 **Alternative: Request Firewall Access**

Ask your GCloud admin to create a public firewall rule:

```bash
gcloud compute firewall-rules create allow-public-http \
  --allow tcp:8000 \
  --source-ranges 0.0.0.0/0 \
  --target-tags http-server \
  --description "Allow public HTTP access to AIKovrr"

# Then add the tag to your VM
gcloud compute instances add-tags platform \
  --tags http-server \
  --zone us-central1-f
```

After this, you can access directly at: **http://35.202.143.181:8000**

---

## 📋 **Current Firewall Rules**

```
iap-http-platform:
  - Ports: 8000, 5137
  - Source: 35.235.240.0/20 (Google IAP only)
  - Destination: 10.128.0.2/32 (VM internal IP)
  - Purpose: IAP tunnel access only
```

---

## ✅ **What's Working**

- ✅ Nginx running on port 8000
- ✅ Django backend running on port 8001
- ✅ PostgreSQL database running
- ✅ Frontend built and deployed
- ✅ All services healthy

**Only access method is blocked** - everything else is ready!

---

## 🚀 **Quick Start**

**Run this command** and keep the terminal open:

```bash
gcloud compute start-iap-tunnel platform 8000 --local-host-port=localhost:8000 --zone=us-central1-f
```

**Then open**: http://localhost:8000

That's it! 🎯
