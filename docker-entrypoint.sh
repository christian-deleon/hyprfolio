#!/bin/sh
set -e

# --- 1. Copy user config ---
CONFIG_FILE="/config/hyprfolio.config.yaml"

if [ ! -f "$CONFIG_FILE" ]; then
    echo "ERROR: Config file not found at $CONFIG_FILE"
    echo ""
    echo "Mount a directory containing hyprfolio.config.yaml to /config:"
    echo ""
    echo "  docker run -d -p 8080:8080 \\"
    echo "    -v \$(pwd)/my-site:/config \\"
    echo "    ghcr.io/christian-deleon/hyprfolio:latest"
    echo ""
    echo "Expected directory structure:"
    echo "  my-site/"
    echo "    hyprfolio.config.yaml"
    echo "    public/"
    echo "      images/profile.jpg"
    echo "      wallpapers/wallpaper.jpg"
    exit 1
fi

cp "$CONFIG_FILE" /app/hyprfolio.config.yaml

# --- 2. Copy optional user assets ---
if [ -d "/config/public" ]; then
    cp -r /config/public/* /app/public/ 2>/dev/null || true
fi

if [ -d "/config/images" ]; then
    mkdir -p /app/public/images
    cp -r /config/images/* /app/public/images/ 2>/dev/null || true
fi

if [ -d "/config/wallpapers" ]; then
    mkdir -p /app/public/wallpapers
    cp -r /config/wallpapers/* /app/public/wallpapers/ 2>/dev/null || true
fi

# --- 3. Set site URL if provided ---
if [ -n "$SITE_URL" ]; then
    export ASTRO_SITE="$SITE_URL"
    echo "Site URL set to: $SITE_URL"
fi

# --- 4. Validate config ---
echo "Validating config..."
npx tsx src/lib/validate.ts
echo "Config valid."

# --- 5. Build site ---
echo "Building site..."
npx astro build
echo "Build complete."

# --- 6. Start nginx ---
echo "Starting nginx on port 8080..."
exec nginx -g 'daemon off;'
