# Hyprfolio Architecture

## Overview

Hyprfolio is a config-driven Astro static site that recreates a Linux desktop running the Hyprland compositor. Portfolio/resume content renders inside tiled windows that mimic real Linux applications.

**One config file. Zero JavaScript by default. Looks like a real Hyprland rice.**

## Tech Stack

| Tool             | Version | Purpose                                                              |
| ---------------- | ------- | -------------------------------------------------------------------- |
| Astro            | ^5.2.0  | Static site framework (islands architecture)                         |
| Tailwind CSS     | v4      | Utility CSS via `@tailwindcss/vite` plugin (NOT `@astrojs/tailwind`) |
| TypeScript       | ^5.7.0  | Type safety                                                          |
| Zod              | ^3.23.0 | Config validation, single source of truth for types                  |
| js-yaml          | ^4.1.0  | YAML parsing                                                         |
| @astrojs/sitemap | ^3.7.0  | Auto-generated sitemap                                               |

No framework runtime ships to the browser. No React, Preact, or Svelte. Interactive islands (PaletteSwitcher, Clock) use vanilla JS via Astro `<script>` tags.

## Data Flow

```
hyprfolio.config.yaml
  → js-yaml parse
  → Zod validation + defaults
  → Typed HyprfolioConfig object
  → Astro build
  → Static HTML + CSS + ~5KB JS → dist/
```

## Project Structure

```
hyprfolio/
├── hyprfolio.config.yaml          # All user content + settings
├── astro.config.mjs               # Astro + Tailwind v4
├── justfile                       # Task runner
├── public/
│   ├── fonts/                     # WOFF2 (JetBrains Mono NF, Inter)
│   ├── wallpapers/                # User wallpaper images
│   ├── images/                    # Profile photo, project screenshots
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── pages/
│   │   ├── index.astro            # The desktop (single page)
│   │   └── 404.astro
│   ├── layouts/
│   │   └── Layout.astro           # <html>, <head>, <body>, SEO, palette init
│   ├── components/
│   │   ├── Desktop.astro          # Wallpaper + tile grid + waybar container
│   │   ├── Waybar.astro           # Top status bar
│   │   ├── TileGrid.astro         # CSS Grid container
│   │   ├── Tile.astro             # Grid item wrapper
│   │   ├── WindowChrome.astro     # Universal window border + title bar
│   │   ├── PaletteSwitcher.astro  # Island: palette dropdown + JS
│   │   ├── Clock.astro            # Island: live clock
│   │   └── PrintHeader.astro      # Hidden on screen, visible in print
│   ├── windows/                   # Window type components (app chrome)
│   │   ├── Terminal.astro
│   │   ├── Browser.astro
│   │   ├── Editor.astro
│   │   ├── FileManager.astro
│   │   ├── SystemMonitor.astro
│   │   ├── PDFViewer.astro
│   │   ├── ImageViewer.astro
│   │   ├── MarkdownViewer.astro
│   │   └── Blank.astro
│   ├── tiles/                     # Tile content components
│   │   ├── AboutTile.astro        # neofetch-style
│   │   ├── ExperienceTile.astro   # git log-style
│   │   ├── EducationTile.astro    # man page-style
│   │   ├── SkillsTile.astro       # btop-style
│   │   ├── ProjectsTile.astro     # File manager-style
│   │   ├── CertificationsTile.astro
│   │   ├── ContactTile.astro      # aerc-style
│   │   └── CustomTile.astro
│   ├── palettes/                  # Color palette CSS files
│   │   ├── catppuccin-mocha.css   # Default dark
│   │   ├── catppuccin-latte.css   # Default light
│   │   ├── tokyo-night.css
│   │   ├── tokyo-night-light.css
│   │   ├── gruvbox-dark.css
│   │   ├── gruvbox-light.css
│   │   ├── nord.css
│   │   ├── nord-light.css
│   │   ├── dracula.css
│   │   ├── rose-pine.css
│   │   ├── rose-pine-dawn.css
│   │   └── _template.css
│   ├── styles/
│   │   ├── global.css             # Tailwind + palette imports + base
│   │   ├── animations.css         # Entrance, hover, bezier curves
│   │   ├── typography.css         # Font faces, terminal, prose
│   │   └── print.css              # Print stylesheet
│   ├── lib/
│   │   ├── config.ts              # YAML loader + Zod validation + cache
│   │   ├── schema.ts              # Zod schemas (source of truth)
│   │   ├── tiles.ts               # Tile content resolver
│   │   ├── windows.ts             # Window type resolver
│   │   ├── seo.ts                 # JSON-LD + meta generation
│   │   └── validate.ts            # Standalone validation script
│   └── types/
│       └── config.ts              # Re-exports z.infer<> types
└── .github/workflows/deploy.yml   # GitHub Pages deployment
```

## Component Hierarchy

```
Layout.astro
  ├── <head> — meta, SEO, JSON-LD, inline palette-init script
  └── Desktop.astro
        ├── Waybar.astro
        │     ├── Workspace indicators (dots)
        │     ├── Window title (center)
        │     ├── PaletteSwitcher.astro (island)
        │     └── Clock.astro (island)
        ├── TileGrid.astro
        │     └── Tile.astro × N
        │           └── WindowChrome.astro
        │                 └── [WindowType].astro
        │                       └── [TileContent].astro
        └── PrintHeader.astro (display:none on screen)
```

## Content-to-Application Mapping

Each CV section is rendered to mimic a specific Linux application:

| Content        | Linux App      | Window Type    | Visual                  |
| -------------- | -------------- | -------------- | ----------------------- |
| About/Bio      | neofetch       | terminal       | ASCII art + system info |
| Experience     | git log        | terminal       | Commit history          |
| Education      | man page       | terminal       | Manual page             |
| Skills         | btop           | system-monitor | Progress bars           |
| Projects       | Thunar         | file-manager   | Folder grid + sidebar   |
| Certifications | pass           | terminal       | Tree hierarchy          |
| Publications   | newsboat       | terminal       | RSS feed list           |
| Awards         | dunst          | (floating)     | Notification cards      |
| Languages      | GNOME Settings | browser        | Settings panel          |
| Volunteer      | taskwarrior    | terminal       | Task table              |
| References     | weechat        | terminal       | Chat messages           |
| Contact        | aerc           | terminal       | Email compose           |
| Resume/CV      | zathura        | pdf-viewer     | PDF preview             |
| Blog           | Neovim         | editor         | Markdown + syntax HL    |
| Open Source    | lazygit        | terminal       | Multi-panel git TUI     |
| Talks          | sent           | blank          | Large text slides       |
| Hobbies        | cbonsai        | terminal       | ASCII art               |

## Palette System

### 11 Built-in Palettes

| ID                  | Theme       | Variant               |
| ------------------- | ----------- | --------------------- |
| `catppuccin-mocha`  | Catppuccin  | Dark (default)        |
| `catppuccin-latte`  | Catppuccin  | Light (default light) |
| `tokyo-night`       | Tokyo Night | Dark                  |
| `tokyo-night-light` | Tokyo Night | Light                 |
| `gruvbox-dark`      | Gruvbox     | Dark                  |
| `gruvbox-light`     | Gruvbox     | Light                 |
| `nord`              | Nord        | Dark                  |
| `nord-light`        | Nord        | Light                 |
| `dracula`           | Dracula     | Dark                  |
| `rose-pine`         | Rose Pine   | Dark                  |
| `rose-pine-dawn`    | Rose Pine   | Light                 |

### CSS Variable Names (`--hp-*` prefix)

**Backgrounds**: `crust`, `mantle`, `base`, `surface-0`, `surface-1`, `surface-2`
**Overlays**: `overlay-0`, `overlay-1`, `overlay-2`
**Text**: `subtext-0`, `subtext-1`, `text`
**Semantic**: `red`, `green`, `yellow`, `blue`, `purple`, `pink`, `orange`, `teal`, `sky`
**Special**: `accent`, `shadow`

### Switching Mechanism

1. `<html data-palette="catppuccin-mocha">` controls active palette
2. All palette CSS scoped by `[data-palette="..."]`
3. Inline `<script is:inline>` in `<head>` reads localStorage before first paint
4. PaletteSwitcher toggles attribute + saves to localStorage
5. Optional `prefers-color-scheme` listener for auto-switching

## Tile Grid System

12-column CSS Grid with responsive breakpoints:

| Breakpoint | Columns     |
| ---------- | ----------- |
| > 1200px   | 12          |
| 900-1200px | 8           |
| 640-900px  | 6           |
| < 640px    | 1 (stacked) |

Tiles define `colSpan` (1-12) and `rowSpan`. Spans clamp to available columns at smaller breakpoints.

## Hyprland Visual Constants

| Property        | Value                           |
| --------------- | ------------------------------- |
| Window border   | 2px solid                       |
| Corner radius   | 10px                            |
| Inner gap       | 5px                             |
| Outer gap       | 20px                            |
| Active border   | Gradient or accent color        |
| Inactive border | `--hp-surface-1` at 50% opacity |
| Blur (backdrop) | `backdrop-filter: blur(10px)`   |
| Noise overlay   | 2-3% opacity                    |
| Inactive dim    | 0.85 opacity                    |

## Animation System

CSS-only, no JS animation libraries. Hyprland bezier curves:

```css
--bezier-default: cubic-bezier(0.05, 0.9, 0.1, 1.05);
--bezier-ease-out: cubic-bezier(0.16, 1, 0.3, 1);
--bezier-snappy: cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

- **Entrance**: `popin` (scale 85%→100% + fade), 410ms, staggered 80ms per tile
- **Close**: 149ms linear
- **Hover**: scale 1.01 + lift shadow, 200ms
- **Focus transition**: border color, 500ms
- Only `transform` and `opacity` (GPU-composited)
- Respects `prefers-reduced-motion: reduce`

## Islands Architecture

Only two components ship JavaScript:

| Component       | Approach                         | Purpose                              |
| --------------- | -------------------------------- | ------------------------------------ |
| PaletteSwitcher | `<script>` in .astro             | Toggle palette, persist localStorage |
| Clock           | `<script>` in .astro             | Update time every 60s                |
| Palette init    | `<script is:inline>` in `<head>` | Prevent flash on load                |

No framework runtime. Zero client-side dependencies.

## Config Schema

The `hyprfolio.config.yaml` supports 32+ sections. Key sections:

- `site`, `seo`, `analytics` — metadata
- `profile`, `contact`, `social`, `about` — identity
- `palette`, `wallpaper`, `waybar`, `layout`, `animations` — visual
- `tiles` — tile arrangement (order = render order)
- `experience`, `education`, `skills`, `projects`, `certifications` — core CV
- `awards`, `publications`, `speaking`, `volunteer`, `languages`, `interests`, `references` — extended CV
- `testimonials`, `services`, `clients`, `blog` — portfolio/freelance
- `academic`, `executive`, `military` — specialized personas
- `organizations`, `patents`, `courses`, `testScores`, `personal`, `custom` — additional

Config is a superset of JSON Resume v1.0.0. Schema.org Person JSON-LD auto-generated.

## SEO

- `<title>`, `<meta description>`, canonical URL from config
- Open Graph + Twitter Card tags
- JSON-LD Person schema
- Sitemap via `@astrojs/sitemap`
- `robots.txt`

## Print Styles

`@media print` outputs professional resume:

- Hides Waybar, wallpaper, window chrome, palette switcher
- PrintHeader becomes visible (name, title, contact)
- Single column, system font, 11pt, black on white
- `break-inside: avoid` on tiles

## Typography

| Context                | Font                     | Size |
| ---------------------- | ------------------------ | ---- |
| Terminal, Waybar, code | JetBrains Mono Nerd Font | 13px |
| UI text (GTK windows)  | Inter                    | 14px |

Linux-like rendering: `-webkit-font-smoothing: antialiased; font-synthesis: none;`

## File Size Budget

| Asset                    | Target       |
| ------------------------ | ------------ |
| HTML                     | < 50 KB      |
| CSS (all palettes)       | < 30 KB      |
| JavaScript               | < 5 KB       |
| Fonts (WOFF2)            | < 100 KB     |
| **Total (no wallpaper)** | **< 185 KB** |

## Deployment

GitHub Pages (recommended), Vercel, Netlify, Cloudflare Pages, or self-hosted (Nginx/Caddy). GitHub Actions workflow included.

## Accessibility

- Skip-to-content link, ARIA labels, keyboard navigation
- WCAG AA contrast for all palettes
- Focus indicators, semantic HTML, alt text
- `prefers-reduced-motion` respected
