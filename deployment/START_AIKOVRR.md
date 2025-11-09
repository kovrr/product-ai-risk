# 🚀 Start KovrrAI - Quick Guide

## Prerequisites

Before you start, make sure you have:
1. **Google Cloud SDK** installed ([Install here](https://cloud.google.com/sdk/docs/install))
2. **Access to the aikovrr-platform project** in Google Cloud

---

## Step 1: Authenticate with Google Cloud

Open your terminal and run:

```bash
gcloud auth login
gcloud config set project aikovrr-platform
```

---

## Step 2: Start IAP Tunnel

Copy and paste this command:

```bash
gcloud compute start-iap-tunnel platform 8000 --local-host-port=localhost:8000 --zone=us-central1-f --project=aikovrr-platform
```

**Keep this terminal window open** while using the app.

---

## Step 3: Open KovrrAI

Open your browser and go to:

**http://localhost:8000**

---

## Step 4: Login

- **Username**: `admin`
- **Password**: `admin123`

---

## ✅ Done!

You're now using KovrrAI!

---

## 🛑 To Stop

Press `Ctrl+C` in the terminal to close the tunnel.

---

**That's it!** 🎯
