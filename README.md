# Hyprfolio

<table>
<tr>
<td valign="top" width="50%">

**Your portfolio, riced to perfection.**

A config-driven Astro static site that recreates a Linux desktop running the [Hyprland](https://hyprland.org/) compositor. Your resume and portfolio content renders inside tiled windows that mimic real Linux applications -- neofetch for your bio, git log for experience, btop for skills, and more.

One config file. Zero JavaScript frameworks. Looks like a real Hyprland rice.

[![Astro](https://img.shields.io/badge/Astro-5.2-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</td>
<td width="50%">

<img src="docs/screenshot.gif" alt="Hyprfolio Screenshot" width="100%">

</td>
</tr>
</table>

---

## Features

- **Config-driven** -- All content lives in a single `hyprfolio.config.yaml` file. No code editing required.
- **11 color palettes** -- Catppuccin, Tokyo Night, Gruvbox, Nord, Dracula, Rose Pine, each with dark and light variants. Switch live in the browser.
- **9 window types** -- Terminal, Browser, Editor, File Manager, System Monitor, PDF Viewer, Image Viewer, Markdown Viewer, and Blank.
- **8 tile content types** -- About, Experience, Education, Skills, Projects, Certifications, Contact, and Custom.
- **Responsive** -- 12-column CSS Grid that adapts from desktop to mobile with automatic column clamping.
- **Print resume** -- `Ctrl+P` outputs a clean, professional single-column resume with no wallpaper or window chrome.
- **Under 185 KB** -- Total page weight (without wallpaper): HTML ~53 KB, CSS ~40 KB, JS ~0 KB, Fonts ~90 KB.
- **Zero framework JS** -- No React, Preact, or Svelte. Only two vanilla `<script>` islands (palette switcher and clock).
- **SEO ready** -- Open Graph, Twitter Cards, JSON-LD Person schema, sitemap, and robots.txt.
- **Accessible** -- WCAG AA contrast, keyboard navigation, ARIA labels, skip-to-content link, `prefers-reduced-motion` support.
- **JSON Resume superset** -- Config schema extends [JSON Resume v1.0.0](https://jsonresume.org/) with 32+ sections.

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
  title: 'Elliot Alderson — Cybersecurity Engineer'
  description: 'Cybersecurity engineer specializing in penetration testing and network security.'
  url: 'https://example.com'

profile:
  name: 'Elliot Alderson'
  headline: 'Cybersecurity Engineer'
  summary: 'I find the vulnerabilities before someone else does.'
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

---

## Configuration

All content and settings live in `hyprfolio.config.yaml`. The config is validated at build time with Zod schemas, so you get clear error messages if something is misconfigured.

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

For the full field-by-field reference, see [docs/CONFIG-REFERENCE.md](docs/CONFIG-REFERENCE.md).

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

## Palettes

11 built-in color palettes. Users can switch live via the Waybar palette switcher, and the choice persists in localStorage.

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

To create a custom palette, see [docs/CUSTOMIZATION.md](docs/CUSTOMIZATION.md).

---

## Deployment

Hyprfolio builds to static HTML in `dist/` and works on any static hosting provider.

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

**Important**: Update `site.url` in `hyprfolio.config.yaml` and the `site` property in `astro.config.mjs` to match your production URL for correct sitemap and canonical URLs.

---

## Print / PDF Resume

Press `Ctrl+P` (or `Cmd+P` on macOS) to print or save as PDF. The print stylesheet hides the Waybar, wallpaper, and window chrome, and renders a clean single-column resume with a professional header, system fonts at 11pt, and `break-inside: avoid` on sections. No configuration needed.

---

## Contributing

Contributions are welcome! See [.github/CONTRIBUTING.md](.github/CONTRIBUTING.md) for development setup, commit format, and PR guidelines. For creating custom palettes, window types, or tile content types, see [docs/CUSTOMIZATION.md](docs/CUSTOMIZATION.md).

---

## License

[MIT](LICENSE)

---

## Credits

Hyprfolio draws inspiration from these projects:

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
