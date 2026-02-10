#!/bin/bash

# Download Aluwdoors configurator JS and CSS files
BASE_URL="https://configurator.aluwdoors.com"
OUTPUT_DIR="public/aluwdoors-ref"

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo "Downloading Aluwdoors configurator scripts and styles..."
echo ""

# Create output directory
mkdir -p "${OUTPUT_DIR}"

# Function to download a file
download_file() {
    local filename=$1
    local url="${BASE_URL}/${filename}"
    local output="${OUTPUT_DIR}/${filename}"

    echo -n "Downloading ${filename}... "

    # Try direct download
    if curl -f -s -o "${output}" "${url}" 2>/dev/null; then
        echo -e "${GREEN}✓${NC} ($(du -h "${output}" | cut -f1))"
        return 0
    fi

    # Try with wget as fallback
    if wget -q -O "${output}" "${url}" 2>/dev/null; then
        echo -e "${GREEN}✓${NC} ($(du -h "${output}" | cut -f1))"
        return 0
    fi

    echo -e "${RED}✗ Failed${NC}"
    rm -f "${output}"
    return 1
}

# Download files
echo -e "${YELLOW}JavaScript Files:${NC}"
download_file "configurator.iife.js?v=mlaxicsg"
download_file "opentype.js"
echo ""

echo -e "${YELLOW}CSS Files:${NC}"
download_file "configurator.css?v=mlaxicsg"
echo ""

# Count downloaded files
DOWNLOADED=$(find "${OUTPUT_DIR}" -type f | wc -l)
echo -e "${GREEN}Download complete!${NC}"
echo "Total files downloaded: ${DOWNLOADED}"
echo "Location: ${OUTPUT_DIR}"
