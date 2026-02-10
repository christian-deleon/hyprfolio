# CLAUDE.md

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
just docker-build   # Build Docker image
just docker-run     # Run container (config=. by default)
just docker-up      # Run container in background
just docker-down    # Stop and remove container
just docker-logs    # Follow container logs
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

Variable inventory: `--hp-crust`, `--hp-mantle`, `--hp-base`, `--hp-surface-0` through `--hp-surface-2`, `--hp-overlay-0` through `--hp-overlay-2`, `--hp-subtext-0`, `--hp-subtext-1`, `--hp-text`, `--hp-red`, `--hp-green`, `--hp-yellow`, `--hp-blue`, `--hp-purple`, `--hp-pink`, `--hp-orange`, `--hp-teal`, `--hp-sky`, `--hp-accent`, `--hp-shadow`.

### Types

YOU MUST derive all TypeScript types from Zod schemas via `z.infer<>`. Never duplicate type definitions manually. The Zod schema in `src/lib/schema.ts` is the single source of truth.

### No Framework Runtime

No React, Preact, or Svelte. Only two islands use client-side JS (PaletteSwitcher, Clock) via vanilla `<script>` tags in `.astro` components. Do not add framework dependencies.

### Tailwind CSS v4

Uses `@tailwindcss/vite` plugin in `astro.config.mjs`, NOT the deprecated `@astrojs/tailwind` integration.

### Config-Driven Content

All content comes from `hyprfolio.config.yaml`. Components read config via `loadConfig()` in frontmatter (result is cached). Never hardcode content in components.

## Hyprland Visual Rules

These values are non-negotiable for visual authenticity:

- Window borders: 1px solid, gradient for active, muted for inactive
- Window rounding: 10px (`border-radius: 10px`)
- Inner gaps: 5px between tiles (configurable via layout.innerGap)
- Outer gaps: 20px from screen edges
- Backdrop blur: `backdrop-filter: blur(10px)` on transparent elements
- Inactive windows: dim to 0.85 opacity
- No window title bars in tiled mode (Hyprland uses no server-side decorations)
- Noise overlay: 2-3% opacity on blurred surfaces
- Fonts: JetBrains Mono Nerd Font (bundled WOFF2) for terminal/code, Inter/system-ui for UI

## File Size Budget

Total without wallpaper must stay under 185KB. Current: HTML ~53KB, CSS ~40KB, JS ~0KB (inline), Fonts ~90KB (~183KB total).
