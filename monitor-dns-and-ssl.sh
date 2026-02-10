#!/bin/bash

# Auto-monitor DNS propagation and apply SSL
# Checks every 60 seconds until DNS is correct, then applies SSL

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

DOMAIN="proinn.youztech.nl"
TARGET_IP="141.95.17.59"
MAX_ATTEMPTS=30  # 30 minutes max

echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo -e "${BLUE}  DNS Propagatie Monitor + Auto SSL${NC}"
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo ""
echo "Monitoring: $DOMAIN"
echo "Target IP: $TARGET_IP"
echo "Checking every 60 seconds..."
echo ""

attempt=1

while [ $attempt -le $MAX_ATTEMPTS ]; do
    echo -e "${YELLOW}[Attempt $attempt/$MAX_ATTEMPTS]${NC} Checking DNS..."

    CURRENT_IP=$(host $DOMAIN 2>/dev/null | grep "has address" | awk '{print $4}')

    if [ "$CURRENT_IP" == "$TARGET_IP" ]; then
        echo -e "${GREEN}✓ DNS is correct!${NC}"
        echo ""
        echo -e "${GREEN}Starting SSL setup...${NC}"

        # Run SSL setup
        cd /home/anisy/projects/stalendeuren
        ./setup-ssl.sh

        exit 0
    else
        echo "Current IP: $CURRENT_IP (waiting for $TARGET_IP)"
        echo "Waiting 60 seconds..."
        sleep 60
    fi

    attempt=$((attempt + 1))
done

echo -e "${YELLOW}DNS propagation took longer than expected.${NC}"
echo "Please check your DNS settings and run ./setup-ssl.sh manually."
exit 1
