# News Extraction Scheduling Guide

## ⏰ Execution Schedule

### **Primary Schedule: Once Per Day at 6:00 AM**

```
┌─────────── minute (0)
│ ┌───────── hour (6)
│ │ ┌─────── day of month (*)
│ │ │ ┌───── month (*)
│ │ │ │ ┌─── day of week (*)
│ │ │ │ │
0 6 * * *  Run news extraction
```

### **Secondary Trigger: 5 Minutes After Server Restart**

Ensures fresh news is available after server maintenance/restart.

---

## 🔧 Implementation Options

### **Option 1: Cron (Simple) ✅ Recommended**

```bash
# Edit crontab
crontab -e

# Add these lines:
# Daily at 6 AM
0 6 * * * cd /opt/aikovrr/backend && source venv/bin/activate && python manage.py fetch_all_news --max-articles 20 >> /var/log/aikovrr-news.log 2>&1

# On server restart (5 min delay)
@reboot sleep 300 && cd /opt/aikovrr/backend && source venv/bin/activate && python manage.py fetch_all_news --max-articles 20 >> /var/log/aikovrr-news.log 2>&1
```

**Pros:**
- ✅ Simple to setup
- ✅ Easy to modify
- ✅ Works on all systems

**Cons:**
- ⚠️ Less robust error handling
- ⚠️ No automatic restart on failure

---

### **Option 2: Systemd Timer (Robust)**

```bash
# Run the setup script
cd /opt/aikovrr/deployment
chmod +x news-extraction-systemd.sh
sudo ./news-extraction-systemd.sh
```

**Pros:**
- ✅ More robust
- ✅ Better logging
- ✅ Automatic dependency management
- ✅ Can restart on failure

**Cons:**
- ⚠️ More complex setup
- ⚠️ Requires systemd (most modern Linux)

---

## 📅 Execution Timeline

### **Daily Schedule:**

```
00:00 - Midnight
  ↓
06:00 - News extraction runs (3-5 min duration)
  ↓
06:05 - New articles available in database
  ↓
06:05+ - Frontend automatically shows new articles
  ↓
24:00 - End of day
```

### **On Server Restart:**

```
00:00 - Server starts
  ↓
00:01 - PostgreSQL starts
  ↓
00:02 - Django backend starts
  ↓
00:05 - News extraction runs (5 min delay)
  ↓
00:10 - New articles available
```

---

## 🔍 Monitoring & Verification

### **Check if Cron Job is Scheduled:**
```bash
crontab -l | grep fetch_all_news
```

### **Check Systemd Timer Status:**
```bash
sudo systemctl status aikovrr-news.timer
sudo systemctl list-timers aikovrr-news.timer
```

### **View Execution Logs:**
```bash
# Cron logs
tail -f /var/log/aikovrr-news.log

# Systemd logs
sudo journalctl -u aikovrr-news.service -f
```

### **Check Last Run:**
```bash
# Check log file timestamp
ls -lh /var/log/aikovrr-news.log

# Check database
python manage.py shell -c "from news.models import NewsArticle; latest = NewsArticle.objects.latest('fetched_at'); print(f'Last article fetched: {latest.fetched_at}')"
```

### **Manually Trigger:**
```bash
# Cron (run command directly)
cd /opt/aikovrr/backend && source venv/bin/activate && python manage.py fetch_all_news --max-articles 20

# Systemd
sudo systemctl start aikovrr-news.service
```

---

## 🎯 Recommended Configuration

### **For Production: Use Cron with @reboot**

```bash
# Edit crontab
crontab -e

# Add:
0 6 * * * cd /opt/aikovrr/backend && source venv/bin/activate && python manage.py fetch_all_news --max-articles 20 >> /var/log/aikovrr-news.log 2>&1
@reboot sleep 300 && cd /opt/aikovrr/backend && source venv/bin/activate && python manage.py fetch_all_news --max-articles 20 >> /var/log/aikovrr-news.log 2>&1
```

**Why?**
- ✅ Simple and reliable
- ✅ Runs daily at 6 AM
- ✅ Runs after server restart
- ✅ Easy to troubleshoot
- ✅ Standard across all systems

---

## 🔄 Execution Frequency

### **Current: Once Per Day**
- Articles per day: 3-5
- Database growth: ~100-150 articles/month
- API load: Minimal
- Risk of blocking: Very low

### **Alternative: Twice Per Day** (Not Recommended)
```bash
# 6 AM and 6 PM
0 6,18 * * * ...
```
- More articles but higher risk of rate limiting
- Not necessary for daily news feed

### **Alternative: Every 12 Hours** (Not Recommended)
```bash
# Every 12 hours
0 */12 * * * ...
```
- Overkill for news feed
- Increases risk of blocking

---

## 🚨 Error Handling

### **Built-in Retry Logic:**
- Max 2 retries per source (3 attempts total)
- 30-second delay between retries
- Logs all failures

### **What Happens on Failure:**
1. First attempt fails → Wait 30s → Retry
2. Second attempt fails → Wait 30s → Retry
3. Third attempt fails → Log error → Continue to next source

### **Notification on Failure** (Optional):
```bash
# Add email notification to cron
0 6 * * * cd /opt/aikovrr/backend && source venv/bin/activate && python manage.py fetch_all_news --max-articles 20 >> /var/log/aikovrr-news.log 2>&1 || echo "News extraction failed" | mail -s "AIKovrr News Alert" admin@example.com
```

---

## 📊 Expected Behavior

### **Daily Execution (6 AM):**
```
06:00:00 - Cron triggers
06:00:01 - IAPP extraction starts
06:00:45 - IAPP completes (1 article added)
06:00:55 - Compliance Week extraction starts
06:01:30 - Compliance Week completes (2 articles added)
06:01:30 - Total: 3 new articles
06:01:31 - Frontend automatically shows new articles
```

### **Server Restart:**
```
00:00:00 - Server boots
00:05:00 - Cron @reboot triggers (5 min delay)
00:05:01 - News extraction starts
00:06:30 - Extraction completes
00:06:31 - Articles available
```

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Cron job is scheduled: `crontab -l`
- [ ] Log file exists: `ls -lh /var/log/aikovrr-news.log`
- [ ] Manual run works: `python manage.py fetch_all_news --max-articles 5`
- [ ] Articles appear in database
- [ ] Frontend displays articles
- [ ] Wait 24 hours and verify automatic run
- [ ] Test server restart (optional)

---

## 🎯 Summary

**Execution Schedule:**
- ✅ **Daily at 6:00 AM** (primary)
- ✅ **5 minutes after server restart** (secondary)
- ✅ **2 retries on failure** (automatic)
- ✅ **10-second delay between sources** (rate limiting protection)

**Implementation:**
- Use cron with `@reboot` for simplicity
- Or use systemd timer for robustness

**Result:**
- Fresh AI governance news every morning
- Automatic recovery after server restarts
- Zero manual intervention required
