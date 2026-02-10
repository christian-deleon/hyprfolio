# CLAUDE.md

@docs/ARCHITECTURE.md

## Commands

```bash
just install        # npm install
just dev            # npx astro dev
just build          # npx astro build
just preview        # npx astro preview
just validate       # Run config validation standalone
just format         # npx prettier --write
just format-check   # npx prettier --check
just typecheck      # npx astro check
just clean          # rm -rf dist .astro node_modules/.cache
just ci             # format-check + typecheck + build
just new-palette X  # Copy _template.css to new palette
```

## Critical Rules

### Colors

IMPORTANT: Every color MUST use a `--hp-*` CSS custom property. Never use raw hex values, Tailwind color utilities (like `text-blue-500`), or hardcoded colors anywhere in components.

```css
/* CORRECT */
color: var(--hp-text);
background: var(--hp-base);
border-color: var(--hp-accent);

/* WRONG */
color: #cdd6f4;
background: rgb(30, 30, 46);
```

Palette variables are scoped via `[data-palette="name"]` on `<html>`. All 11 palettes define the same variable names so components are palette-agnostic.

Variable inventory: `--hp-crust`, `--hp-mantle`, `--hp-base`, `--hp-surface-0` through `--hp-surface-2`, `--hp-overlay-0` through `--hp-overlay-2`, `--hp-subtext-0`, `--hp-subtext-1`, `--hp-text`, `--hp-red`, `--hp-green`, `--hp-yellow`, `--hp-blue`, `--hp-purple`, `--hp-pink`, `--hp-orange`, `--hp-teal`, `--hp-sky`, `--hp-accent`, `--hp-shadow`.

### Types

YOU MUST derive all TypeScript types from Zod schemas via `z.infer<>`. Never duplicate type definitions manually. The Zod schema in `src/lib/schema.ts` is the single source of truth.

### No Framework Runtime

No React, Preact, or Svelte. Only two islands use client-side JS (PaletteSwitcher, Clock) via vanilla `<script>` tags in `.astro` components. Do not add framework dependencies.

### Tailwind CSS v4

Uses `@tailwindcss/vite` plugin in `astro.config.mjs`, NOT the deprecated `@astrojs/tailwind` integration.

### Config-Driven Content

All content comes from `hyprfolio.config.yaml`. Components read config via `loadConfig()` in frontmatter (result is cached). Never hardcode content in components.

### Animations

Only animate `transform` and `opacity` (GPU-composited). Always wrap in `prefers-reduced-motion` check. Use the project bezier curves:

- `--bezier-default: cubic-bezier(0.05, 0.9, 0.1, 1.05)` — primary motion
- `--bezier-ease-out: cubic-bezier(0.16, 1, 0.3, 1)` — smooth decel
- `--bezier-snappy: cubic-bezier(0.25, 0.46, 0.45, 0.94)` — hover states

## Architecture Quick Reference

### Component Nesting

```
Layout → Desktop → Waybar + TileGrid
TileGrid → Tile × N → WindowChrome → [WindowType] → [TileContent]
```

### Window Types (in `src/windows/`)

`terminal`, `browser`, `editor`, `file-manager`, `system-monitor`, `pdf-viewer`, `image-viewer`, `markdown-viewer`, `blank`

Each wraps content via `<slot />`. Provides app-specific chrome (toolbar, status bar, styling).

### Tile Content (in `src/tiles/`)

`about`, `experience`, `education`, `skills`, `projects`, `certifications`, `contact`, `custom`

Each reads from a specific config section and outputs formatted content.

### Resolvers (in `src/lib/`)

- `tiles.ts` — maps content type string → tile component
- `windows.ts` — maps window type string → window component
- `config.ts` — loads + validates YAML config, caches result
- `schema.ts` — Zod schemas (source of truth for all types)

## Hyprland Visual Rules

These values are non-negotiable for visual authenticity:

- Window borders: 2px solid, gradient for active, muted for inactive
- Window rounding: 10px (`border-radius: 10px`)
- Inner gaps: 5px between tiles
- Outer gaps: 20px from screen edges
- Backdrop blur: `backdrop-filter: blur(10px)` on transparent elements
- Inactive windows: dim to 0.85 opacity
- No window title bars in tiled mode (Hyprland uses no server-side decorations)
- Noise overlay: 2-3% opacity on blurred surfaces
- Fonts: JetBrains Mono Nerd Font for terminal/code, Inter for UI

## Code Style

- Component files: PascalCase (`WindowChrome.astro`)
- Palette files: kebab-case (`catppuccin-mocha.css`)
- Props: explicit `interface Props` at top of frontmatter, destructure with `Astro.props`
- CSS: use Tailwind utilities for layout/spacing, `--hp-*` vars for colors
- Scoped styles: use `<style>` in components (Astro scopes automatically)
- Global styles: only in `src/styles/*.css`
- No `!important` except in `print.css`

## Adding Things

### New palette

1. `just new-palette my-theme` (copies `_template.css`)
2. Fill in all `--hp-*` values in `src/palettes/my-theme.css`
3. Add `@import` in `global.css`
4. Add `"my-theme"` to `palette.available` in config

### New window type

1. Create `src/windows/MyWindow.astro` with `<slot />`
2. Register in `src/lib/windows.ts`
3. Use in config: `windowType: "my-window"`

### New tile content

1. Create `src/tiles/MyTile.astro`
2. Register in `src/lib/tiles.ts`
3. Use in config: `content: "my-tile"`

### New config section

1. Add Zod schema in `src/lib/schema.ts`
2. Add to root config schema
3. Type auto-derives via `z.infer<>`

## File Size Budget

Total without wallpaper must stay under 185KB: HTML <50KB, CSS <30KB, JS <5KB, Fonts <100KB.
