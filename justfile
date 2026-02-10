# Hyprfolio task runner

set quiet := true

# List all available commands
[private]
default:
    just --list --unsorted

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

# Clean build artifacts
clean:
    rm -rf dist .astro node_modules/.cache

# Run CI checks (format + typecheck + build)
ci: format-check typecheck build

# Create a new palette from template
new-palette name:
    cp src/palettes/_template.css src/palettes/{{name}}.css
    @echo "Created src/palettes/{{name}}.css — fill in the --hp-* values"
