#!/bin/bash

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

DOMAIN="proinn.youztech.nl"
TARGET_IP="141.95.17.59"

echo -e "${YELLOW}Checking DNS for $DOMAIN...${NC}"

# Check current DNS
CURRENT_IP=$(host $DOMAIN | grep "has address" | awk '{print $4}')

if [ "$CURRENT_IP" != "$TARGET_IP" ]; then
    echo -e "${RED}DNS not updated yet!${NC}"
    echo "Current IP: $CURRENT_IP"
    echo "Target IP: $TARGET_IP"
    echo ""
    echo "Please update DNS first, then run this script again."
    exit 1
fi

echo -e "${GREEN}✓ DNS is correct!${NC}"
echo ""
echo -e "${YELLOW}Requesting SSL certificate...${NC}"

# Request SSL certificate
sudo certbot certonly --webroot -w /var/www/html -d $DOMAIN \
    --non-interactive --agree-tos --email admin@youztech.nl

if [ $? -ne 0 ]; then
    echo -e "${RED}SSL certificate request failed!${NC}"
    exit 1
fi

echo -e "${GREEN}✓ SSL certificate obtained!${NC}"
echo ""
echo -e "${YELLOW}Updating nginx configuration for HTTPS...${NC}"

# Update nginx config with SSL
sudo tee /etc/nginx/sites-available/$DOMAIN > /dev/null <<'EOF'
server {
    listen 80;
    listen [::]:80;
    server_name proinn.youztech.nl;

    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }

    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name proinn.youztech.nl;

    ssl_certificate /etc/letsencrypt/live/proinn.youztech.nl/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/proinn.youztech.nl/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    location / {
        proxy_pass http://127.0.0.1:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 300s;
        proxy_connect_timeout 75s;
    }

    # Optimize for Next.js static assets
    location /_next/static {
        proxy_pass http://127.0.0.1:3002;
        proxy_cache_valid 60m;
        add_header Cache-Control "public, immutable, max-age=31536000";
    }

    # Optimize for images
    location ~* \.(jpg|jpeg|png|gif|ico|svg|webp)$ {
        proxy_pass http://127.0.0.1:3002;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Test nginx config
sudo nginx -t

if [ $? -ne 0 ]; then
    echo -e "${RED}Nginx configuration test failed!${NC}"
    exit 1
fi

# Reload nginx
sudo systemctl reload nginx

echo -e "${GREEN}✓ Nginx reloaded with HTTPS!${NC}"
echo ""
echo -e "${GREEN}═══════════════════════════════════════════${NC}"
echo -e "${GREEN}  🎉 DEPLOYMENT COMPLETE! 🎉${NC}"
echo -e "${GREEN}═══════════════════════════════════════════${NC}"
echo ""
echo -e "Your site is now live at:"
echo -e "${GREEN}https://proinn.youztech.nl/offerte${NC}"
echo ""
echo "SSL certificate will auto-renew via certbot."
