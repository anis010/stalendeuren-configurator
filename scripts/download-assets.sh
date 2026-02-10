#!/bin/bash

# Download Aluwdoors configurator assets
# Base URL for assets
BASE_URL="https://configurator.aluwdoors.com/Uploads"
OUTPUT_DIR="public/textures/aluwdoors"

# Color codes for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "Downloading Aluwdoors assets to ${OUTPUT_DIR}..."
echo ""

# Function to download a file
download_file() {
    local filename=$1
    local url="${BASE_URL}/${filename}"
    local output="${OUTPUT_DIR}/${filename}"

    echo -n "Downloading ${filename}... "

    # Try with version query parameter first
    if curl -f -s -o "${output}" "${url}?v=mlaxicsg" 2>/dev/null; then
        echo -e "${GREEN}✓${NC}"
        return 0
    fi

    # Try without version parameter
    if curl -f -s -o "${output}" "${url}" 2>/dev/null; then
        echo -e "${GREEN}✓${NC}"
        return 0
    fi

    # Try with wget as fallback
    if wget -q -O "${output}" "${url}" 2>/dev/null; then
        echo -e "${GREEN}✓${NC}"
        return 0
    fi

    echo -e "${RED}✗ Failed${NC}"
    rm -f "${output}"
    return 1
}

# Glass textures
echo -e "${YELLOW}Glass Textures:${NC}"
download_file "aluwdoors-configurator-glaskleur-blank.jpg"
download_file "aluwdoors-configurator-glaskleur-brons.jpg"
download_file "aluwdoors-configurator-glaskleur-grijs.jpg"
download_file "aluwdoors-configurator-glaskleur-mat-blank.jpg"
download_file "aluwdoors-configurator-glaskleur-mat-brons.jpg"
download_file "aluwdoors-configurator-glaskleur-mat-zwart.jpg"
echo ""

# Metal textures
echo -e "${YELLOW}Metal Textures:${NC}"
download_file "aluwdoors-configurator-metaalkleur-antraciet.jpg"
download_file "aluwdoors-configurator-metaalkleur-beige.jpg"
download_file "aluwdoors-configurator-metaalkleur-brons.jpg"
download_file "aluwdoors-configurator-metaalkleur-goud.jpg"
download_file "aluwdoors-configurator-metaalkleur-zwart.jpg"
download_file "aluwdoors-configurator-metaalkleur-ral-keuze.jpg"
echo ""

# Handles (SVG)
echo -e "${YELLOW}Handle Types (SVG):${NC}"
download_file "aluwdoors-configurator-fineer-handgreep-beugelgreep.svg"
download_file "aluwdoors-configurator-fineer-handgreep-geen.svg"
download_file "aluwdoors-configurator-fineer-handgreep-hoekgreep.svg"
download_file "aluwdoors-configurator-fineer-handgreep-maangreep.svg"
download_file "aluwdoors-configurator-fineer-handgreep-ovaalgreep.svg"
echo ""

# Dividers (Roedes - SVG)
echo -e "${YELLOW}Divider Types (SVG):${NC}"
download_file "aluwdoors-configurator-roedetype-platte-roede.svg"
download_file "aluwdoors-configurator-roedetype-t-roede.svg"
echo ""

# Door swing direction (SVG)
echo -e "${YELLOW}Door Direction (SVG):${NC}"
download_file "aluwdoors-configurator-draairichting-DIN-links.svg"
download_file "aluwdoors-configurator-draairichting-DIN-rechts.svg"
echo ""

# Count downloaded files
DOWNLOADED=$(find "${OUTPUT_DIR}" -type f | wc -l)
echo -e "${GREEN}Download complete!${NC}"
echo "Total files downloaded: ${DOWNLOADED}"
