#!/bin/bash
# Setup systemd service and timer for news extraction

# Create service file
sudo tee /etc/systemd/system/aikovrr-news.service > /dev/null <<'EOF'
[Unit]
Description=AIKovrr News Extraction Service
After=network.target postgresql.service aikovrr-backend.service
Requires=postgresql.service

[Service]
Type=oneshot
User=liransorani
WorkingDirectory=/opt/aikovrr/backend
Environment="PATH=/opt/aikovrr/backend/venv/bin"
ExecStart=/opt/aikovrr/backend/venv/bin/python manage.py fetch_all_news --max-articles 20
StandardOutput=append:/var/log/aikovrr-news.log
StandardError=append:/var/log/aikovrr-news.log

[Install]
WantedBy=multi-user.target
EOF

# Create timer file (runs daily at 6 AM)
sudo tee /etc/systemd/system/aikovrr-news.timer > /dev/null <<'EOF'
[Unit]
Description=AIKovrr News Extraction Timer
Requires=aikovrr-news.service

[Timer]
# Run daily at 6 AM
OnCalendar=daily
OnCalendar=*-*-* 06:00:00
# Also run 5 minutes after boot
OnBootSec=5min
Persistent=true

[Install]
WantedBy=timers.target
EOF

# Reload systemd
sudo systemctl daemon-reload

# Enable and start timer
sudo systemctl enable aikovrr-news.timer
sudo systemctl start aikovrr-news.timer

# Check status
echo "✅ Systemd timer configured!"
echo ""
echo "Status:"
sudo systemctl status aikovrr-news.timer --no-pager
echo ""
echo "Next run times:"
sudo systemctl list-timers aikovrr-news.timer --no-pager
echo ""
echo "To manually trigger:"
echo "  sudo systemctl start aikovrr-news.service"
echo ""
echo "To view logs:"
echo "  sudo journalctl -u aikovrr-news.service -f"
