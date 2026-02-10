# Hyprfolio

**Your portfolio, riced to perfection.**

A config-driven Astro static site that recreates a Linux desktop running the [Hyprland](https://hyprland.org/) compositor. Your resume and portfolio content renders inside tiled windows that mimic real Linux applications -- neofetch for your bio, git log for experience, btop for skills, and more.

One config file. Zero JavaScript frameworks. Looks like a real Hyprland rice.

![Hyprfolio Screenshot](docs/screenshot.png)

[![Astro](https://img.shields.io/badge/Astro-5.2-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## Features

- **Config-driven** -- All content lives in a single `hyprfolio.config.yaml` file. No code editing required.
- **11 color palettes** -- Catppuccin, Tokyo Night, Gruvbox, Nord, Dracula, Rose Pine, each with dark and light variants. Switch live in the browser.
- **9 window types** -- Terminal, Browser, Editor, File Manager, System Monitor, PDF Viewer, Image Viewer, Markdown Viewer, and Blank.
- **8 tile content types** -- About, Experience, Education, Skills, Projects, Certifications, Contact, and Custom.
- **Responsive** -- 12-column CSS Grid that adapts from desktop to mobile with automatic column clamping.
- **Print resume** -- `Ctrl+P` outputs a clean, professional single-column resume. No wallpaper, no window chrome, just content.
- **Under 185 KB** -- Total page weight (without wallpaper) stays under 185 KB: HTML <50 KB, CSS <30 KB, JS <5 KB, Fonts <100 KB.
- **Zero framework JS** -- No React, Preact, or Svelte. Only two vanilla `<script>` islands (palette switcher and clock).
- **SEO ready** -- Open Graph, Twitter Cards, JSON-LD Person schema, sitemap, and robots.txt out of the box.
- **Accessible** -- WCAG AA contrast on all palettes, keyboard navigation, ARIA labels, skip-to-content link, and `prefers-reduced-motion` support.
- **JSON Resume superset** -- Config schema is a superset of [JSON Resume v1.0.0](https://jsonresume.org/), extended with 32+ sections for portfolio, freelance, academic, and military personas.

---

## Quick Start

### 1. Clone and install

```bash
git clone https://github.com/christian-deleon/hyprfolio.git
cd hyprfolio
just install    # or: npm install
```

### 2. Configure

Edit `hyprfolio.config.yaml` with your content. The file is heavily commented and the sample config shows every available section.

```yaml
site:
  title: 'Jane Doe -- Software Engineer'
  description: 'Full-stack engineer building great things.'
  url: 'https://janedoe.dev'

profile:
  name: 'Jane Doe'
  headline: 'Software Engineer'
  summary: 'I build things for the web.'
  photo: '/images/profile.jpg'

tiles:
  - content: about
    windowType: terminal
    colSpan: 7
    rowSpan: 2

  - content: skills
    windowType: system-monitor
    colSpan: 5
    rowSpan: 2
```

### 3. Develop and deploy

```bash
just dev        # Start dev server at localhost:4321
just build      # Production build to dist/
just preview    # Preview the production build locally
```

Deploy the `dist/` directory to any static hosting provider. See [Deployment](#deployment) for platform-specific instructions.

---

## Configuration

All content and settings live in `hyprfolio.config.yaml` at the project root. The config is validated at build time using Zod schemas, so you get clear error messages if something is misconfigured.

### Config Sections

| Section                                                                                   | Purpose                                 |
| ----------------------------------------------------------------------------------------- | --------------------------------------- |
| `site`, `seo`, `analytics`                                                                | Metadata, SEO tags, analytics           |
| `profile`, `contact`, `social`, `about`                                                   | Identity and bio                        |
| `palette`, `wallpaper`, `waybar`, `layout`, `animations`                                  | Visual settings                         |
| `tiles`                                                                                   | Tile arrangement (order = render order) |
| `experience`, `education`, `skills`, `projects`, `certifications`                         | Core CV sections                        |
| `awards`, `publications`, `speaking`, `volunteer`, `languages`, `interests`, `references` | Extended CV                             |
| `testimonials`, `services`, `clients`, `blog`                                             | Portfolio and freelance                 |
| `academic`, `executive`, `military`                                                       | Specialized personas                    |
| `organizations`, `patents`, `courses`, `testScores`, `personal`, `custom`                 | Additional sections                     |

For the full config reference, see [docs/CONFIG-REFERENCE.md](docs/CONFIG-REFERENCE.md).

### Tile Configuration

Each tile in the `tiles` array controls what content is shown and which window type wraps it:

```yaml
tiles:
  - content: about # Which tile content to render
    windowType: terminal # Which window chrome to use
    colSpan: 7 # Grid columns (1-12)
    rowSpan: 2 # Grid rows
    terminalTitle: 'neofetch -- kitty'
```

---

## Palettes

Hyprfolio ships with 11 color palettes. Users can switch between them live using the palette switcher in the Waybar, and the choice persists in localStorage.

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

Control which palettes are available and which is the default in your config:

```yaml
palette:
  default: catppuccin-mocha
  defaultLight: catppuccin-latte
  available:
    - catppuccin-mocha
    - catppuccin-latte
    - tokyo-night
    - dracula
  respectSystem: true # Auto-switch dark/light based on OS preference
```

---

## Tile Content Types

Each content type mimics a specific Linux application for visual authenticity:

| Content Type     | Linux App             | Visual Description                                 |
| ---------------- | --------------------- | -------------------------------------------------- |
| `about`          | neofetch              | ASCII art logo + system info key-value pairs       |
| `experience`     | git log               | Commit history with dates, companies as branches   |
| `education`      | man page              | Manual page with sections, headers, and formatting |
| `skills`         | btop                  | Category groups with progress bars and percentages |
| `projects`       | Thunar (file manager) | Folder grid with sidebar navigation                |
| `certifications` | pass                  | Tree hierarchy of credentials                      |
| `contact`        | aerc                  | Email compose view with contact fields             |
| `custom`         | (varies)              | User-defined content in any window type            |

---

## Window Types

Window types provide application-specific chrome (toolbars, status bars, styling) around tile content:

| Window Type       | Description                                                      |
| ----------------- | ---------------------------------------------------------------- |
| `terminal`        | Terminal emulator with title bar, prompt styling, monospace font |
| `browser`         | Web browser with address bar, navigation buttons, tab bar        |
| `editor`          | Code editor with line numbers, syntax highlighting, status bar   |
| `file-manager`    | File manager with sidebar, toolbar, icon grid                    |
| `system-monitor`  | System monitor with category panels and progress bars            |
| `pdf-viewer`      | PDF viewer with toolbar and page navigation                      |
| `image-viewer`    | Image viewer with centered display and controls                  |
| `markdown-viewer` | Markdown renderer with prose typography                          |
| `blank`           | Minimal window with no application chrome                        |

---

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [just](https://github.com/casey/just) command runner (recommended) or use `npm run` directly

### Commands

| Command                   | Description                                 |
| ------------------------- | ------------------------------------------- |
| `just install`            | Install npm dependencies                    |
| `just dev`                | Start Astro dev server (`localhost:4321`)   |
| `just build`              | Production build to `dist/`                 |
| `just preview`            | Preview production build locally            |
| `just validate`           | Run config validation standalone            |
| `just format`             | Format all files with Prettier              |
| `just format-check`       | Check formatting (CI-friendly)              |
| `just typecheck`          | TypeScript type checking via `astro check`  |
| `just clean`              | Remove `dist/`, `.astro/`, and module cache |
| `just ci`                 | Run format-check + typecheck + build        |
| `just new-palette <name>` | Scaffold a new palette from the template    |

### Tech Stack

| Tool             | Version | Purpose                                      |
| ---------------- | ------- | -------------------------------------------- |
| Astro            | ^5.2.0  | Static site framework (islands architecture) |
| Tailwind CSS     | v4      | Utility CSS via `@tailwindcss/vite` plugin   |
| TypeScript       | ^5.7.0  | Type safety                                  |
| Zod              | ^3.23.0 | Config validation and type derivation        |
| js-yaml          | ^4.1.0  | YAML parsing                                 |
| @astrojs/sitemap | ^3.7.0  | Auto-generated sitemap                       |

---

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
│   ├── pages/                     # index.astro (the desktop), 404.astro
│   ├── layouts/                   # Layout.astro (html, head, body, SEO)
│   ├── components/                # Desktop, Waybar, TileGrid, Tile, etc.
│   ├── windows/                   # Window type components (app chrome)
│   ├── tiles/                     # Tile content components
│   ├── palettes/                  # Color palette CSS files
│   ├── styles/                    # Global CSS, animations, typography, print
│   ├── lib/                       # Config loader, schema, resolvers, SEO
│   └── types/                     # Re-exported z.infer<> types
└── docs/                          # Architecture, config reference, deployment
```

For a deep dive into the architecture, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

---

## Deployment

Hyprfolio builds to static HTML in the `dist/` directory and works on any static hosting provider.

### GitHub Pages (recommended)

A GitHub Actions workflow is included at `.github/workflows/deploy.yml`. Push to `main` and your site deploys automatically.

1. Go to your repo **Settings > Pages**
2. Set source to **GitHub Actions**
3. Push to `main`

### Vercel

```bash
npm i -g vercel
vercel
```

Vercel auto-detects Astro projects. No additional configuration needed.

### Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod --dir=dist
```

Or connect your repo in the Netlify dashboard with build command `npm run build` and publish directory `dist`.

### Cloudflare Pages

Connect your repo in the Cloudflare Pages dashboard. Set build command to `npm run build` and output directory to `dist`.

### Self-hosted (Nginx / Caddy)

Build locally and serve the `dist/` directory:

```bash
just build
# Copy dist/ to your server
```

For detailed deployment instructions, see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

---

## Print / PDF Resume

Hyprfolio includes a complete print stylesheet. Press `Ctrl+P` (or `Cmd+P` on macOS) to print or save as PDF.

The print view:

- Hides the Waybar, wallpaper, window chrome, and palette switcher
- Shows a professional header with your name, title, and contact info
- Renders as a single-column layout with system fonts at 11pt
- Uses black text on a white background
- Applies `break-inside: avoid` to keep sections together across pages

No configuration needed -- it works automatically.

---

## Accessibility

Hyprfolio is built with accessibility as a priority:

- **Keyboard navigation** -- All interactive elements are focusable and operable via keyboard
- **Skip-to-content link** -- Hidden link at the top of the page for screen reader users
- **ARIA labels** -- Meaningful labels on interactive controls and landmark regions
- **WCAG AA contrast** -- All 11 palettes meet WCAG AA contrast requirements
- **Semantic HTML** -- Proper heading hierarchy, landmark elements, and list structures
- **Focus indicators** -- Visible focus rings on all interactive elements
- **Reduced motion** -- All animations respect `prefers-reduced-motion: reduce`
- **Alt text** -- Image elements include descriptive alt text

---

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on:

- Development setup
- Code style rules
- How to add new palettes, window types, and tile content
- Commit message format
- Pull request process

---

## License

[MIT](LICENSE)

---

## Credits

Hyprfolio draws inspiration from and builds on the work of these projects:

- **[Hyprland](https://hyprland.org/)** -- The tiling compositor that inspired the visual design
- **[Astro](https://astro.build/)** -- Static site framework powering the build
- **[Catppuccin](https://github.com/catppuccin/catppuccin)** -- Soothing pastel color palette (default theme)
- **[Tokyo Night](https://github.com/enkia/tokyo-night-vscode-theme)** -- Clean dark theme for code
- **[Gruvbox](https://github.com/morhetz/gruvbox)** -- Retro groove color scheme
- **[Nord](https://www.nordtheme.com/)** -- Arctic, north-bluish color palette
- **[Dracula](https://draculatheme.com/)** -- Dark theme for everything
- **[Rose Pine](https://rosepinetheme.com/)** -- All natural pine, faux fur, and a bit of soho vibes
- **[JetBrains Mono](https://www.jetbrains.com/lp/mono/)** -- Typeface for developers (with Nerd Font patching)
- **[Inter](https://rsms.me/inter/)** -- Typeface for UI text
- **[Waybar](https://github.com/Alexays/Waybar)** -- The status bar that inspired the top panel design
- **[JSON Resume](https://jsonresume.org/)** -- Open standard for resume data (config is a superset)
