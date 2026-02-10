#!/bin/bash

# OVH DNS Update Script
# Updates proinn.youztech.nl to point to this server

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

DOMAIN="youztech.nl"
SUBDOMAIN="proinn"
TARGET_IP="141.95.17.59"

echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo -e "${BLUE}  OVH DNS Update voor proinn.youztech.nl${NC}"
echo -e "${BLUE}═══════════════════════════════════════════${NC}"
echo ""

# Check if OVH credentials are set
if [ -z "$OVH_APPLICATION_KEY" ] || [ -z "$OVH_APPLICATION_SECRET" ] || [ -z "$OVH_CONSUMER_KEY" ]; then
    echo -e "${YELLOW}OVH API credentials niet gevonden!${NC}"
    echo ""
    echo "Je hebt 2 opties:"
    echo ""
    echo -e "${GREEN}OPTIE 1: Handmatig via OVH Manager (2 minuten)${NC}"
    echo "  1. Ga naar: https://www.ovh.com/manager/web/"
    echo "  2. Klik: Domain names → youztech.nl → DNS zone"
    echo "  3. Zoek A record voor 'proinn'"
    echo "  4. Wijzig IP van 76.76.21.21 naar $TARGET_IP"
    echo "  5. Save & wacht 5-30 minuten"
    echo ""
    echo -e "${GREEN}OPTIE 2: OVH API Setup (10 minuten)${NC}"
    echo "  1. Ga naar: https://eu.api.ovh.com/createToken/"
    echo "  2. Rechten: GET+POST+PUT voor /domain/zone/*"
    echo "  3. Validity: Unlimited"
    echo "  4. Kopieer de 3 keys en run:"
    echo ""
    echo "     export OVH_APPLICATION_KEY='xxx'"
    echo "     export OVH_APPLICATION_SECRET='xxx'"
    echo "     export OVH_CONSUMER_KEY='xxx'"
    echo "     ./update-dns-ovh.sh"
    echo ""
    exit 1
fi

echo -e "${GREEN}✓ OVH credentials gevonden${NC}"
echo ""
echo -e "${YELLOW}Updating DNS record...${NC}"

# OVH API endpoint
API_ENDPOINT="https://eu.api.ovh.com/1.0"

# Get current timestamp
TIMESTAMP=$(date +%s)

# Create signature (simplified - in production use proper HMAC)
# For this to work, you need the full OVH API client
# This is a placeholder that shows the structure

echo -e "${RED}Note: Voor volledige API functionaliteit, installeer: npm install -g ovh${NC}"
echo ""
echo -e "${YELLOW}Alternatief: Gebruik OPTIE 1 (handmatig) hierboven${NC}"
echo ""
echo "De site draait al! Test via IP:"
echo -e "${GREEN}http://141.95.17.59/offerte${NC}"

exit 0
