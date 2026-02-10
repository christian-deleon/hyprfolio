# Hyprfolio task runner

set quiet := true

# List all available commands
[private]
default:
    just --list --unsorted

# ─── Development ──────────────────────────────────────────────────────────────

# Install dependencies
install:
    npm install

# Start dev server
dev:
    npx astro dev

# Start dev server with host binding
dev-host:
    npx astro dev --host

# Production build
build:
    npx astro build

# Preview production build
preview:
    npx astro preview

# ─── Quality ─────────────────────────────────────────────────────────────────

# Run config validation standalone
validate:
    npx tsx src/lib/validate.ts

# Format all files
format:
    npx prettier --write .

# Check formatting
format-check:
    npx prettier --check .

# TypeScript type checking
typecheck:
    npx astro check

# Run CI checks (format + typecheck + build)
ci: format-check typecheck build

# ─── Docker ─────────────────────────────────────────────────────────────────

image := "ghcr.io/christian-deleon/hyprfolio"
tag := "latest"

# Build Docker image
docker-build:
    docker build -t {{image}}:{{tag}} .

# Run container with config directory (default: current dir)
docker-run config=".":
    docker run --rm -p 8080:8080 -v "$(cd {{config}} && pwd):/config" {{image}}:{{tag}}

# Run container in background
docker-up config=".":
    docker run -d -p 8080:8080 --name hyprfolio -v "$(cd {{config}} && pwd):/config" {{image}}:{{tag}}

# Stop and remove container
docker-down:
    docker stop hyprfolio && docker rm hyprfolio

# Show container logs
docker-logs:
    docker logs -f hyprfolio

# ─── Maintenance ─────────────────────────────────────────────────────────────

# Clean build artifacts
clean:
    rm -rf dist .astro node_modules/.cache

# Create a new palette from template
new-palette name:
    cp src/palettes/_template.css src/palettes/{{name}}.css
    @echo "Created src/palettes/{{name}}.css — fill in the --hp-* values"
