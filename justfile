# Hyprfolio task runner

set quiet := true

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

[private]
dc *args:
    docker compose {{args}}

[private]
dc-dev *args:
    docker compose -f compose.dev.yaml {{args}}

# Build local dev image
docker-build:
    just dc-dev build

# Start container (pulls official image)
docker-up:
    just dc up --detach

# Build and start container (local dev image)
docker-up-dev:
    just dc-dev up --build --detach

# Stop and remove container
docker-down:
    just dc down

# Stop and remove dev container
docker-down-dev:
    just dc-dev down

# Show container logs
docker-logs:
    just dc logs -f

# Show dev container logs
docker-logs-dev:
    just dc-dev logs -f

# ─── Maintenance ─────────────────────────────────────────────────────────────

# Clean build artifacts
clean:
    rm -rf dist .astro node_modules/.cache

# Create a new palette from template
new-palette name:
    cp src/palettes/_template.css src/palettes/{{name}}.css
    @echo "Created src/palettes/{{name}}.css — fill in the --hp-* values"
