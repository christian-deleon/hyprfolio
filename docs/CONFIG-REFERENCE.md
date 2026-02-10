# Configuration Reference

Complete field-by-field reference for `hyprfolio.config.yaml`. The Zod schema in `src/lib/schema.ts` is the single source of truth for all types and defaults.

## Table of Contents

- [Overview](#overview)
- [Core (Required)](#core-required)
  - [site](#site)
  - [profile](#profile)
  - [tiles](#tiles)
- [Identity](#identity)
  - [contact](#contact)
  - [social](#social)
  - [about](#about)
- [Visual Settings](#visual-settings)
  - [palette](#palette)
  - [wallpaper](#wallpaper)
  - [waybar](#waybar)
  - [layout](#layout)
  - [animations](#animations)
- [SEO and Analytics](#seo-and-analytics)
  - [seo](#seo)
  - [analytics](#analytics)
- [Core CV](#core-cv)
  - [experience](#experience)
  - [education](#education)
  - [skills](#skills)
  - [projects](#projects)
  - [certifications](#certifications)
- [Extended CV](#extended-cv)
  - [awards](#awards)
  - [publications](#publications)
  - [speaking](#speaking)
  - [volunteer](#volunteer)
  - [languages](#languages)
  - [interests](#interests)
  - [references](#references)
- [Portfolio / Freelance](#portfolio--freelance)
  - [testimonials](#testimonials)
  - [services](#services)
  - [clients](#clients)
  - [blog](#blog)
- [Specialized](#specialized)
  - [academic](#academic)
  - [executive](#executive)
  - [military](#military)
- [Additional](#additional)
  - [organizations](#organizations)
  - [patents](#patents)
  - [courses](#courses)
  - [testScores](#testscores)
  - [personal](#personal)
  - [custom](#custom)
- [Full Annotated Example](#full-annotated-example)

---

## Overview

All content and settings live in a single `hyprfolio.config.yaml` file at the project root. At build time, the file is parsed with `js-yaml`, validated against the Zod schema, and made available to every Astro component via `loadConfig()`.

**Required sections**: `site`, `profile`, `tiles`. Everything else is optional and defaults to empty arrays or objects.

**Date format**: All dates use ISO format -- `YYYY`, `YYYY-MM`, or `YYYY-MM-DD`.

**URL fields**: All URL fields must be fully qualified (e.g., `https://example.com`).

---

## Core (Required)

### site

Site-level metadata used in `<head>`, SEO tags, and the sitemap.

| Field         | Type           | Required | Default | Description                                      |
| ------------- | -------------- | -------- | ------- | ------------------------------------------------ |
| `title`       | `string`       | **Yes**  | --      | Page `<title>` and OG title. Must be non-empty.  |
| `description` | `string`       | No       | `""`    | Meta description for search engines.             |
| `url`         | `string` (URL) | No       | --      | Canonical site URL. Used in sitemap and OG tags. |
| `language`    | `string`       | No       | `"en"`  | HTML `lang` attribute value.                     |

```yaml
site:
  title: 'Christian De Leon — DevOps Engineer'
  description: 'Senior DevOps Engineer specializing in AWS and Kubernetes.'
  url: 'https://example.com'
  language: en
```

---

### profile

Primary identity information. Name is required; everything else is optional.

| Field      | Type           | Required | Default | Description                                          |
| ---------- | -------------- | -------- | ------- | ---------------------------------------------------- |
| `name`     | `string`       | **Yes**  | --      | Full name. Must be non-empty.                        |
| `headline` | `string`       | No       | `""`    | Professional title or tagline.                       |
| `summary`  | `string`       | No       | `""`    | Brief professional summary.                          |
| `photo`    | `string`       | No       | --      | Path to profile photo (e.g., `/images/profile.jpg`). |
| `location` | `string`       | No       | --      | City, state, or region.                              |
| `phone`    | `string`       | No       | --      | Phone number.                                        |
| `email`    | `string`       | No       | --      | Email address.                                       |
| `website`  | `string` (URL) | No       | --      | Personal website URL.                                |

```yaml
profile:
  name: 'Christian De Leon'
  headline: 'Senior DevOps Engineer'
  summary: 'I design and build cloud infrastructure that scales.'
  photo: '/images/profile.jpg'
  location: 'San Francisco, CA'
  email: 'hello@example.com'
  website: 'https://example.com'
```

---

### tiles

Array of tile definitions that control the desktop layout. **At least one tile is required.** Tiles render in array order (first tile appears first in the grid).

| Field            | Type              | Required | Default      | Description                                                                                                                                 |
| ---------------- | ----------------- | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `content`        | `TileContentEnum` | **Yes**  | --           | Content type: `about`, `experience`, `education`, `skills`, `projects`, `certifications`, `contact`, `custom`.                              |
| `windowType`     | `WindowTypeEnum`  | No       | `"terminal"` | Window chrome: `terminal`, `browser`, `editor`, `file-manager`, `system-monitor`, `pdf-viewer`, `image-viewer`, `markdown-viewer`, `blank`. |
| `colSpan`        | `integer` (1-12)  | No       | `6`          | Number of grid columns this tile spans.                                                                                                     |
| `rowSpan`        | `integer` (1-6)   | No       | `1`          | Number of grid rows this tile spans.                                                                                                        |
| `order`          | `integer`         | No       | --           | CSS `order` override. If omitted, array order is used.                                                                                      |
| `terminalTitle`  | `string`          | No       | --           | Title shown in terminal window chrome title bar.                                                                                            |
| `browserUrl`     | `string`          | No       | --           | URL shown in browser window chrome address bar.                                                                                             |
| `editorFilename` | `string`          | No       | --           | Filename shown in editor window chrome tab.                                                                                                 |
| `title`          | `string`          | No       | --           | Generic title for non-terminal window types.                                                                                                |
| `customContent`  | `string`          | No       | --           | Plain text content for `custom` tile type.                                                                                                  |
| `customHtml`     | `string`          | No       | --           | Raw HTML content for `custom` tile type.                                                                                                    |

```yaml
tiles:
  - content: about
    windowType: terminal
    colSpan: 7
    rowSpan: 2
    terminalTitle: 'neofetch — kitty'

  - content: skills
    windowType: system-monitor
    colSpan: 5
    rowSpan: 2
    title: 'System Monitor'

  - content: experience
    windowType: terminal
    colSpan: 6
    rowSpan: 2
    terminalTitle: 'git log — kitty'

  - content: projects
    windowType: file-manager
    colSpan: 6
    rowSpan: 2
    title: 'Projects — Thunar'

  - content: contact
    windowType: terminal
    colSpan: 4
    rowSpan: 1
    terminalTitle: 'aerc — kitty'
```

The 12-column grid is responsive:

| Breakpoint | Columns     |
| ---------- | ----------- |
| > 1200px   | 12          |
| 900-1200px | 8           |
| 640-900px  | 6           |
| < 640px    | 1 (stacked) |

Column spans clamp to the available columns at smaller breakpoints.

---

## Identity

### contact

Contact details shown in the contact tile (aerc-style email compose).

| Field              | Type     | Required | Default | Description                                                  |
| ------------------ | -------- | -------- | ------- | ------------------------------------------------------------ |
| `email`            | `string` | No       | --      | Contact email address.                                       |
| `phone`            | `string` | No       | --      | Contact phone number.                                        |
| `location`         | `string` | No       | --      | City, state, or region.                                      |
| `availability`     | `string` | No       | --      | Current availability status (e.g., "Open to opportunities"). |
| `preferredContact` | `string` | No       | --      | Preferred contact method (e.g., "email").                    |
| `message`          | `string` | No       | --      | Short message or call to action.                             |

```yaml
contact:
  email: 'hello@example.com'
  location: 'San Francisco, CA'
  availability: 'Open to opportunities'
  preferredContact: 'email'
  message: "Let's build something reliable together."
```

---

### social

Array of social media links. Shown in the about tile and used in JSON-LD.

| Field      | Type           | Required | Default | Description                                |
| ---------- | -------------- | -------- | ------- | ------------------------------------------ |
| `network`  | `string`       | **Yes**  | --      | Network name (e.g., "GitHub", "LinkedIn"). |
| `url`      | `string` (URL) | **Yes**  | --      | Profile URL. Must be a valid URL.          |
| `username` | `string`       | No       | --      | Username or handle on the network.         |

```yaml
social:
  - network: GitHub
    url: 'https://github.com/christian-deleon'
    username: christian-deleon
  - network: LinkedIn
    url: 'https://linkedin.com/in/christian-deleon'
  - network: Twitter
    url: 'https://twitter.com/example'
    username: example
```

---

### about

Content for the neofetch-style about tile.

| Field        | Type                     | Required | Default | Description                                          |
| ------------ | ------------------------ | -------- | ------- | ---------------------------------------------------- |
| `ascii`      | `string`                 | No       | --      | Custom ASCII art to display beside system info.      |
| `bio`        | `string`                 | No       | `""`    | Short bio paragraph.                                 |
| `funFacts`   | `string[]`               | No       | `[]`    | Array of fun facts, displayed as bullet points.      |
| `systemInfo` | `Record<string, string>` | No       | `{}`    | Key-value pairs displayed like neofetch system info. |

```yaml
about:
  bio: 'Cloud architect by day, homelab enthusiast by night.'
  funFacts:
    - 'I run NixOS on my daily driver (btw)'
    - 'My homelab has more uptime than most startups'
  systemInfo:
    OS: 'NixOS 24.05'
    WM: 'Hyprland'
    Shell: 'zsh + starship'
    Terminal: 'kitty'
    Editor: 'Neovim (LazyVim)'
    Uptime: '8y in cloud infra'
```

---

## Visual Settings

### palette

Color palette configuration. See [PALETTES.md](./PALETTES.md) for full palette documentation.

| Field           | Type          | Required | Default              | Description                                                                        |
| --------------- | ------------- | -------- | -------------------- | ---------------------------------------------------------------------------------- |
| `default`       | `PaletteId`   | No       | `"catppuccin-mocha"` | Default dark palette.                                                              |
| `defaultLight`  | `PaletteId`   | No       | `"catppuccin-latte"` | Default light palette (used when `respectSystem` is true and OS is in light mode). |
| `available`     | `PaletteId[]` | No       | All 11 palettes      | Which palettes appear in the palette switcher.                                     |
| `respectSystem` | `boolean`     | No       | `true`               | Auto-switch between dark/light based on `prefers-color-scheme`.                    |

Valid palette IDs: `catppuccin-mocha`, `catppuccin-latte`, `tokyo-night`, `tokyo-night-light`, `gruvbox-dark`, `gruvbox-light`, `nord`, `nord-light`, `dracula`, `rose-pine`, `rose-pine-dawn`.

```yaml
palette:
  default: catppuccin-mocha
  defaultLight: catppuccin-latte
  available:
    - catppuccin-mocha
    - catppuccin-latte
    - tokyo-night
    - dracula
  respectSystem: true
```

---

### wallpaper

Desktop wallpaper settings.

| Field      | Type                                 | Required | Default    | Description                                                 |
| ---------- | ------------------------------------ | -------- | ---------- | ----------------------------------------------------------- |
| `image`    | `string`                             | No       | --         | Path to wallpaper image (e.g., `/wallpapers/default.jpg`).  |
| `opacity`  | `number` (0-1)                       | No       | `1`        | Wallpaper opacity. Lower values create a subtle background. |
| `blur`     | `number` (>= 0)                      | No       | `0`        | Blur radius in pixels applied to the wallpaper.             |
| `size`     | `"cover"` \| `"contain"` \| `"auto"` | No       | `"cover"`  | CSS `background-size` value.                                |
| `position` | `string`                             | No       | `"center"` | CSS `background-position` value.                            |

```yaml
wallpaper:
  image: '/wallpapers/default.jpg'
  opacity: 0.15
  blur: 10
  size: cover
  position: center
```

---

### waybar

Top status bar configuration. Mimics the Waybar panel from Hyprland.

| Field                 | Type             | Required | Default | Description                              |
| --------------------- | ---------------- | -------- | ------- | ---------------------------------------- |
| `show`                | `boolean`        | No       | `true`  | Show or hide the waybar entirely.        |
| `title`               | `string`         | No       | --      | Text displayed in the center of the bar. |
| `workspaces`          | `integer` (1-10) | No       | `5`     | Number of workspace dots to show.        |
| `activeWorkspace`     | `integer` (>= 1) | No       | `1`     | Which workspace dot is highlighted.      |
| `showClock`           | `boolean`        | No       | `true`  | Show the live clock widget.              |
| `showPaletteSwitcher` | `boolean`        | No       | `true`  | Show the palette switcher dropdown.      |
| `trayIcons`           | `string[]`       | No       | `[]`    | Icon names for the system tray area.     |

```yaml
waybar:
  show: true
  title: 'christian@hyprfolio ~'
  workspaces: 5
  activeWorkspace: 1
  showClock: true
  showPaletteSwitcher: true
```

---

### layout

Grid layout dimensions.

| Field      | Type     | Required | Default | Description                                       |
| ---------- | -------- | -------- | ------- | ------------------------------------------------- |
| `maxWidth` | `number` | No       | `1400`  | Maximum width of the tile grid in pixels.         |
| `innerGap` | `number` | No       | `5`     | Gap between tiles in pixels.                      |
| `outerGap` | `number` | No       | `20`    | Gap between tile grid and screen edges in pixels. |

```yaml
layout:
  maxWidth: 1400
  innerGap: 5
  outerGap: 20
```

---

### animations

Tile entrance and interaction animations. CSS-only, no JS libraries.

| Field        | Type                                                                | Required | Default   | Description                                                   |
| ------------ | ------------------------------------------------------------------- | -------- | --------- | ------------------------------------------------------------- |
| `enabled`    | `boolean`                                                           | No       | `true`    | Enable or disable all animations.                             |
| `entrance`   | `"popin"` \| `"slide-up"` \| `"slide-left"` \| `"fade"` \| `"none"` | No       | `"popin"` | Entrance animation style.                                     |
| `duration`   | `number`                                                            | No       | `410`     | Animation duration in milliseconds.                           |
| `stagger`    | `number`                                                            | No       | `80`      | Delay between each tile's entrance animation in milliseconds. |
| `hoverScale` | `number`                                                            | No       | `1.01`    | Scale factor on tile hover.                                   |

```yaml
animations:
  enabled: true
  entrance: popin
  duration: 410
  stagger: 80
  hoverScale: 1.01
```

All animations respect `prefers-reduced-motion: reduce`. When the OS requests reduced motion, animations are disabled automatically.

---

## SEO and Analytics

### seo

Search engine optimization settings.

| Field           | Type           | Required | Default | Description                                               |
| --------------- | -------------- | -------- | ------- | --------------------------------------------------------- |
| `ogImage`       | `string` (URL) | No       | --      | Open Graph image URL for social sharing.                  |
| `twitterHandle` | `string`       | No       | --      | Twitter handle for Twitter Card tags (e.g., `@username`). |
| `canonicalUrl`  | `string` (URL) | No       | --      | Canonical URL override (defaults to `site.url`).          |
| `noIndex`       | `boolean`      | No       | `false` | Set to `true` to add `noindex` meta tag.                  |

```yaml
seo:
  ogImage: 'https://example.com/og.png'
  twitterHandle: '@example'
  noIndex: false
```

---

### analytics

Analytics integrations. Only IDs are needed; tracking scripts are injected automatically.

| Field             | Type     | Required | Default | Description                                             |
| ----------------- | -------- | -------- | ------- | ------------------------------------------------------- |
| `googleId`        | `string` | No       | --      | Google Analytics measurement ID (e.g., `G-XXXXXXXXXX`). |
| `plausibleDomain` | `string` | No       | --      | Plausible Analytics domain (e.g., `example.com`).      |

```yaml
analytics:
  googleId: 'G-XXXXXXXXXX'
  plausibleDomain: 'example.com'
```

---

## Core CV

### experience

Array of work experience items. Rendered as git-log style commit history in a terminal window.

| Field          | Type                | Required | Default | Description                                      |
| -------------- | ------------------- | -------- | ------- | ------------------------------------------------ |
| `company`      | `string`            | **Yes**  | --      | Company or organization name.                    |
| `position`     | `string`            | **Yes**  | --      | Job title or role.                               |
| `url`          | `string` (URL)      | No       | --      | Company website.                                 |
| `startDate`    | `string` (ISO date) | **Yes**  | --      | Start date (`YYYY`, `YYYY-MM`, or `YYYY-MM-DD`). |
| `endDate`      | `string` (ISO date) | No       | --      | End date. Omit for current positions.            |
| `current`      | `boolean`           | No       | `false` | Mark as current position.                        |
| `summary`      | `string`            | No       | `""`    | Brief role description.                          |
| `highlights`   | `string[]`          | No       | `[]`    | Key achievements or responsibilities.            |
| `technologies` | `string[]`          | No       | `[]`    | Technologies used in the role.                   |
| `location`     | `string`            | No       | --      | Work location.                                   |

```yaml
experience:
  - company: 'Stratos Systems'
    position: 'Senior DevOps Engineer'
    url: 'https://example.com'
    startDate: '2022-03'
    current: true
    summary: 'Leading cloud infrastructure strategy.'
    highlights:
      - 'Migrated monolith to microservices on EKS'
      - 'Designed multi-region active-active architecture'
    technologies:
      - AWS
      - Kubernetes
      - Terraform
    location: 'San Francisco, CA'
```

---

### education

Array of education items. Rendered as man-page style in a terminal window.

| Field         | Type                | Required | Default | Description                                  |
| ------------- | ------------------- | -------- | ------- | -------------------------------------------- |
| `institution` | `string`            | **Yes**  | --      | School or university name.                   |
| `area`        | `string`            | **Yes**  | --      | Field of study.                              |
| `studyType`   | `string`            | No       | --      | Degree type (e.g., "B.S.", "M.S.", "Ph.D."). |
| `startDate`   | `string` (ISO date) | **Yes**  | --      | Start date.                                  |
| `endDate`     | `string` (ISO date) | No       | --      | End date (graduation).                       |
| `gpa`         | `string`            | No       | --      | GPA or grade.                                |
| `courses`     | `string[]`          | No       | `[]`    | Notable courses taken.                       |
| `honors`      | `string[]`          | No       | `[]`    | Honors or awards received.                   |
| `url`         | `string` (URL)      | No       | --      | Institution website.                         |

```yaml
education:
  - institution: 'University of Washington'
    area: 'Computer Science'
    studyType: 'B.S.'
    startDate: '2013'
    endDate: '2017'
    courses:
      - 'Distributed Systems'
      - 'Cloud Computing'
    honors:
      - "Dean's List 2015-2017"
    url: 'https://www.washington.edu'
```

---

### skills

Array of skill categories, each containing an array of individual skills. Rendered as btop-style progress bars in a system-monitor window.

#### Skill Category

| Field      | Type          | Required | Default | Description                              |
| ---------- | ------------- | -------- | ------- | ---------------------------------------- |
| `category` | `string`      | **Yes**  | --      | Category name (e.g., "Cloud Platforms"). |
| `skills`   | `SkillItem[]` | **Yes**  | --      | Array of skills in this category.        |

#### Skill Item

| Field   | Type              | Required | Default | Description                                         |
| ------- | ----------------- | -------- | ------- | --------------------------------------------------- |
| `name`  | `string`          | **Yes**  | --      | Skill name (e.g., "Kubernetes").                    |
| `level` | `integer` (0-100) | No       | `80`    | Proficiency level as a percentage.                  |
| `color` | `string`          | No       | --      | Custom color override (CSS variable name or value). |

```yaml
skills:
  - category: 'Cloud Platforms'
    skills:
      - name: 'AWS'
        level: 95
      - name: 'GCP'
        level: 80
      - name: 'Azure'
        level: 65

  - category: 'Infrastructure'
    skills:
      - name: 'Kubernetes'
        level: 95
      - name: 'Terraform'
        level: 90
```

---

### projects

Array of projects. Rendered as Thunar-style file manager with folder grid and sidebar.

| Field          | Type                | Required | Default | Description                      |
| -------------- | ------------------- | -------- | ------- | -------------------------------- |
| `name`         | `string`            | **Yes**  | --      | Project name.                    |
| `description`  | `string`            | No       | `""`    | Short project description.       |
| `url`          | `string` (URL)      | No       | --      | Live project URL.                |
| `repo`         | `string` (URL)      | No       | --      | Source code repository URL.      |
| `image`        | `string`            | No       | --      | Project screenshot or logo path. |
| `technologies` | `string[]`          | No       | `[]`    | Technologies used.               |
| `highlights`   | `string[]`          | No       | `[]`    | Key features or achievements.    |
| `startDate`    | `string` (ISO date) | No       | --      | Project start date.              |
| `endDate`      | `string` (ISO date) | No       | --      | Project end date.                |
| `featured`     | `boolean`           | No       | `false` | Mark as a featured project.      |

```yaml
projects:
  - name: 'cluster-cleanup'
    description: 'Automatic cleanup of stale Kubernetes resources.'
    url: 'https://github.com/christian-deleon/cluster-cleanup'
    repo: 'https://github.com/christian-deleon/cluster-cleanup'
    technologies:
      - Go
      - Kubernetes
      - Helm
    highlights:
      - '2.1k stars on GitHub'
    featured: true
```

---

### certifications

Array of professional certifications. Rendered as pass-style tree hierarchy in a terminal window.

| Field        | Type                | Required | Default | Description                 |
| ------------ | ------------------- | -------- | ------- | --------------------------- |
| `name`       | `string`            | **Yes**  | --      | Certification name.         |
| `issuer`     | `string`            | **Yes**  | --      | Issuing organization.       |
| `date`       | `string` (ISO date) | No       | --      | Date earned.                |
| `expiryDate` | `string` (ISO date) | No       | --      | Expiration date.            |
| `url`        | `string` (URL)      | No       | --      | Verification URL.           |
| `id`         | `string`            | No       | --      | Certification ID or number. |

```yaml
certifications:
  - name: 'AWS Solutions Architect — Professional'
    issuer: 'Amazon Web Services'
    date: '2023-06'
    id: 'AWS-SAP-2023'

  - name: 'Certified Kubernetes Administrator (CKA)'
    issuer: 'Cloud Native Computing Foundation'
    date: '2022-09'
    id: 'CKA-2022'
```

---

## Extended CV

### awards

Array of awards and honors.

| Field     | Type                | Required | Default | Description               |
| --------- | ------------------- | -------- | ------- | ------------------------- |
| `title`   | `string`            | **Yes**  | --      | Award title.              |
| `awarder` | `string`            | **Yes**  | --      | Awarding organization.    |
| `date`    | `string` (ISO date) | No       | --      | Date received.            |
| `summary` | `string`            | No       | `""`    | Description of the award. |

```yaml
awards:
  - title: 'Best Open Source Project'
    awarder: 'KubeCon 2023'
    date: '2023-11'
    summary: 'Awarded for cluster-cleanup.'
```

---

### publications

Array of publications (articles, papers, books).

| Field         | Type                | Required | Default | Description                |
| ------------- | ------------------- | -------- | ------- | -------------------------- |
| `name`        | `string`            | **Yes**  | --      | Publication title.         |
| `publisher`   | `string`            | **Yes**  | --      | Publisher or journal name. |
| `releaseDate` | `string` (ISO date) | No       | --      | Publication date.          |
| `url`         | `string` (URL)      | No       | --      | Link to the publication.   |
| `summary`     | `string`            | No       | `""`    | Brief summary.             |

```yaml
publications:
  - name: 'Scaling Kubernetes to 10,000 Nodes'
    publisher: 'InfoQ'
    releaseDate: '2023-08'
    url: 'https://infoq.com/articles/scaling-k8s'
    summary: 'Lessons learned scaling cluster infrastructure.'
```

---

### speaking

Array of talks, presentations, or conferences.

| Field     | Type                | Required | Default | Description                           |
| --------- | ------------------- | -------- | ------- | ------------------------------------- |
| `title`   | `string`            | **Yes**  | --      | Talk title.                           |
| `event`   | `string`            | **Yes**  | --      | Event or conference name.             |
| `date`    | `string` (ISO date) | No       | --      | Date of the talk.                     |
| `url`     | `string` (URL)      | No       | --      | Link to slides, video, or event page. |
| `summary` | `string`            | No       | `""`    | Brief description.                    |

```yaml
speaking:
  - title: 'GitOps at Scale'
    event: 'KubeCon NA 2023'
    date: '2023-11'
    url: 'https://youtube.com/watch?v=example'
    summary: 'How we manage 200+ daily deployments with ArgoCD.'
```

---

### volunteer

Array of volunteer experience.

| Field          | Type                | Required | Default | Description                    |
| -------------- | ------------------- | -------- | ------- | ------------------------------ |
| `organization` | `string`            | **Yes**  | --      | Organization name.             |
| `position`     | `string`            | **Yes**  | --      | Volunteer role or title.       |
| `url`          | `string` (URL)      | No       | --      | Organization website.          |
| `startDate`    | `string` (ISO date) | No       | --      | Start date.                    |
| `endDate`      | `string` (ISO date) | No       | --      | End date.                      |
| `summary`      | `string`            | No       | `""`    | Description of volunteer work. |
| `highlights`   | `string[]`          | No       | `[]`    | Key contributions.             |

```yaml
volunteer:
  - organization: 'Code for America'
    position: 'Infrastructure Lead'
    url: 'https://codeforamerica.org'
    startDate: '2020-01'
    summary: 'Maintained cloud infrastructure for civic tech projects.'
    highlights:
      - 'Migrated 5 projects to containerized deployments'
```

---

### languages

Array of spoken languages.

| Field      | Type     | Required | Default | Description                                                 |
| ---------- | -------- | -------- | ------- | ----------------------------------------------------------- |
| `language` | `string` | **Yes**  | --      | Language name.                                              |
| `fluency`  | `string` | **Yes**  | --      | Fluency level (e.g., "Native", "Fluent", "Conversational"). |

```yaml
languages:
  - language: 'English'
    fluency: 'Native'
  - language: 'Mandarin'
    fluency: 'Conversational'
```

---

### interests

Array of personal or professional interests.

| Field      | Type       | Required | Default | Description                        |
| ---------- | ---------- | -------- | ------- | ---------------------------------- |
| `name`     | `string`   | **Yes**  | --      | Interest name.                     |
| `keywords` | `string[]` | No       | `[]`    | Related keywords or sub-interests. |

```yaml
interests:
  - name: 'Homelab'
    keywords:
      - 'Proxmox'
      - 'TrueNAS'
      - 'Home Assistant'
  - name: 'Open Source'
    keywords:
      - 'CNCF'
      - 'Kubernetes'
```

---

### references

Array of professional references.

| Field       | Type     | Required | Default | Description                   |
| ----------- | -------- | -------- | ------- | ----------------------------- |
| `name`      | `string` | **Yes**  | --      | Reference person's name.      |
| `reference` | `string` | **Yes**  | --      | Quote or recommendation text. |
| `position`  | `string` | No       | --      | Reference person's title.     |
| `company`   | `string` | No       | --      | Reference person's company.   |

```yaml
references:
  - name: 'Jane Smith'
    reference: "Christian is one of the best infrastructure engineers I've worked with."
    position: 'VP Engineering'
    company: 'Stratos Systems'
```

---

## Portfolio / Freelance

### testimonials

Array of client or colleague testimonials.

| Field     | Type     | Required | Default | Description             |
| --------- | -------- | -------- | ------- | ----------------------- |
| `name`    | `string` | **Yes**  | --      | Person's name.          |
| `role`    | `string` | No       | --      | Person's role or title. |
| `company` | `string` | No       | --      | Person's company.       |
| `quote`   | `string` | **Yes**  | --      | Testimonial text.       |
| `photo`   | `string` | No       | --      | Path to person's photo. |

```yaml
testimonials:
  - name: 'Sarah Johnson'
    role: 'CTO'
    company: 'TechStartup Inc'
    quote: 'Christian transformed our entire infrastructure in 3 months.'
    photo: '/images/sarah.jpg'
```

---

### services

Array of services offered (for freelancers or consultants).

| Field         | Type     | Required | Default | Description          |
| ------------- | -------- | -------- | ------- | -------------------- |
| `name`        | `string` | **Yes**  | --      | Service name.        |
| `description` | `string` | No       | `""`    | Service description. |
| `icon`        | `string` | No       | --      | Icon name or path.   |

```yaml
services:
  - name: 'Cloud Architecture'
    description: 'Design and implement scalable cloud infrastructure.'
    icon: 'cloud'
  - name: 'DevOps Consulting'
    description: 'CI/CD pipelines, monitoring, and automation.'
    icon: 'terminal'
```

---

### clients

Array of client logos or names (for freelancers or consultants).

| Field  | Type           | Required | Default | Description                |
| ------ | -------------- | -------- | ------- | -------------------------- |
| `name` | `string`       | **Yes**  | --      | Client name.               |
| `logo` | `string`       | No       | --      | Path to client logo image. |
| `url`  | `string` (URL) | No       | --      | Client website.            |

```yaml
clients:
  - name: 'Acme Corp'
    logo: '/images/clients/acme.svg'
    url: 'https://acme.com'
```

---

### blog

Array of blog posts. Rendered as Neovim-style editor with markdown and syntax highlighting.

| Field     | Type                | Required | Default | Description                       |
| --------- | ------------------- | -------- | ------- | --------------------------------- |
| `title`   | `string`            | **Yes**  | --      | Post title.                       |
| `slug`    | `string`            | **Yes**  | --      | URL slug for the post.            |
| `date`    | `string` (ISO date) | **Yes**  | --      | Publication date.                 |
| `summary` | `string`            | No       | `""`    | Brief summary.                    |
| `content` | `string`            | No       | `""`    | Full post content (markdown).     |
| `tags`    | `string[]`          | No       | `[]`    | Tags or categories.               |
| `url`     | `string` (URL)      | No       | --      | External URL if hosted elsewhere. |

```yaml
blog:
  - title: 'Why I Switched to NixOS'
    slug: 'nixos-switch'
    date: '2024-01-15'
    summary: 'My journey from Arch to NixOS and back again.'
    tags:
      - Linux
      - NixOS
      - DevOps
```

---

## Specialized

### academic

Array of academic publications or research (for academics and researchers).

| Field      | Type           | Required | Default | Description                         |
| ---------- | -------------- | -------- | ------- | ----------------------------------- |
| `title`    | `string`       | **Yes**  | --      | Paper or research title.            |
| `authors`  | `string[]`     | No       | `[]`    | List of authors.                    |
| `venue`    | `string`       | No       | --      | Journal, conference, or venue name. |
| `year`     | `integer`      | No       | --      | Publication year.                   |
| `url`      | `string` (URL) | No       | --      | Link to paper.                      |
| `doi`      | `string`       | No       | --      | DOI identifier.                     |
| `abstract` | `string`       | No       | `""`    | Paper abstract.                     |

```yaml
academic:
  - title: 'Efficient Container Scheduling in Heterogeneous Clusters'
    authors:
      - 'C. De Leon'
      - 'B. Kumar'
    venue: 'IEEE Cloud Computing'
    year: 2023
    doi: '10.1109/cloud.2023.00001'
    abstract: 'We propose a novel scheduling algorithm...'
```

---

### executive

Array of executive or board positions (for senior leaders).

| Field          | Type                | Required | Default | Description        |
| -------------- | ------------------- | -------- | ------- | ------------------ |
| `title`        | `string`            | **Yes**  | --      | Position title.    |
| `organization` | `string`            | **Yes**  | --      | Organization name. |
| `startDate`    | `string` (ISO date) | No       | --      | Start date.        |
| `endDate`      | `string` (ISO date) | No       | --      | End date.          |
| `highlights`   | `string[]`          | No       | `[]`    | Key achievements.  |

```yaml
executive:
  - title: 'Board Member'
    organization: 'CNCF End User Committee'
    startDate: '2023-01'
    highlights:
      - 'Chaired the infrastructure working group'
```

---

### military

Array of military service records.

| Field         | Type                | Required | Default | Description            |
| ------------- | ------------------- | -------- | ------- | ---------------------- |
| `branch`      | `string`            | **Yes**  | --      | Branch of service.     |
| `rank`        | `string`            | **Yes**  | --      | Rank achieved.         |
| `startDate`   | `string` (ISO date) | No       | --      | Service start date.    |
| `endDate`     | `string` (ISO date) | No       | --      | Service end date.      |
| `decorations` | `string[]`          | No       | `[]`    | Awards or decorations. |
| `summary`     | `string`            | No       | `""`    | Service summary.       |

```yaml
military:
  - branch: 'United States Air Force'
    rank: 'Captain'
    startDate: '2010-06'
    endDate: '2016-06'
    decorations:
      - 'Meritorious Service Medal'
    summary: 'Communications and cyber operations officer.'
```

---

## Additional

### organizations

Array of professional organization memberships.

| Field       | Type                | Required | Default | Description               |
| ----------- | ------------------- | -------- | ------- | ------------------------- |
| `name`      | `string`            | **Yes**  | --      | Organization name.        |
| `role`      | `string`            | No       | --      | Role or membership level. |
| `startDate` | `string` (ISO date) | No       | --      | Membership start date.    |
| `endDate`   | `string` (ISO date) | No       | --      | Membership end date.      |
| `url`       | `string` (URL)      | No       | --      | Organization website.     |

```yaml
organizations:
  - name: 'Cloud Native Computing Foundation'
    role: 'Member'
    startDate: '2020-01'
    url: 'https://cncf.io'
```

---

### patents

Array of patents.

| Field     | Type                | Required | Default | Description            |
| --------- | ------------------- | -------- | ------- | ---------------------- |
| `title`   | `string`            | **Yes**  | --      | Patent title.          |
| `number`  | `string`            | No       | --      | Patent number.         |
| `date`    | `string` (ISO date) | No       | --      | Filing or grant date.  |
| `url`     | `string` (URL)      | No       | --      | Link to patent filing. |
| `summary` | `string`            | No       | `""`    | Patent description.    |

```yaml
patents:
  - title: 'Method for Automated Cloud Resource Optimization'
    number: 'US-2023-0012345'
    date: '2023-04'
    summary: 'A system for dynamically right-sizing cloud instances.'
```

---

### courses

Array of completed courses or training.

| Field         | Type                | Required | Default | Description              |
| ------------- | ------------------- | -------- | ------- | ------------------------ |
| `name`        | `string`            | **Yes**  | --      | Course name.             |
| `institution` | `string`            | No       | --      | Institution or provider. |
| `date`        | `string` (ISO date) | No       | --      | Completion date.         |
| `url`         | `string` (URL)      | No       | --      | Course URL.              |

```yaml
courses:
  - name: 'Advanced Kubernetes Patterns'
    institution: 'Linux Foundation'
    date: '2023-03'
  - name: 'Site Reliability Engineering'
    institution: 'Google Cloud Training'
    date: '2022-07'
```

---

### testScores

Array of standardized test scores.

| Field         | Type                | Required | Default | Description                       |
| ------------- | ------------------- | -------- | ------- | --------------------------------- |
| `name`        | `string`            | **Yes**  | --      | Test name.                        |
| `score`       | `string`            | **Yes**  | --      | Score achieved.                   |
| `date`        | `string` (ISO date) | No       | --      | Test date.                        |
| `description` | `string`            | No       | `""`    | Additional context or percentile. |

```yaml
testScores:
  - name: 'GRE'
    score: '330/340'
    date: '2018-10'
    description: 'Verbal: 165, Quantitative: 165'
```

---

### personal

Personal information (optional, single object not array).

| Field           | Type                | Required | Default | Description     |
| --------------- | ------------------- | -------- | ------- | --------------- |
| `dateOfBirth`   | `string` (ISO date) | No       | --      | Date of birth.  |
| `nationality`   | `string`            | No       | --      | Nationality.    |
| `maritalStatus` | `string`            | No       | --      | Marital status. |

```yaml
personal:
  nationality: 'United States'
```

---

### custom

Array of custom sections for content that does not fit any predefined section.

#### Custom Section

| Field   | Type           | Required | Default | Description                     |
| ------- | -------------- | -------- | ------- | ------------------------------- |
| `title` | `string`       | **Yes**  | --      | Section title.                  |
| `icon`  | `string`       | No       | --      | Icon name or path.              |
| `items` | `CustomItem[]` | **Yes**  | --      | Array of items in this section. |

#### Custom Item

| Field   | Type           | Required | Default | Description    |
| ------- | -------------- | -------- | ------- | -------------- |
| `label` | `string`       | **Yes**  | --      | Item label.    |
| `value` | `string`       | **Yes**  | --      | Item value.    |
| `url`   | `string` (URL) | No       | --      | Optional link. |

```yaml
custom:
  - title: 'Open Source Contributions'
    items:
      - label: 'Kubernetes'
        value: 'Core contributor since v1.20'
        url: 'https://github.com/kubernetes/kubernetes'
      - label: 'Terraform AWS Provider'
        value: '15 merged PRs'
        url: 'https://github.com/hashicorp/terraform-provider-aws'
```

---

## Full Annotated Example

Below is a complete config showing every core section with representative values.

```yaml
# ─── Core (Required) ──────────────────────────────────────────────────────────

site:
  title: 'Christian De Leon — DevOps Engineer'
  description: 'Senior DevOps Engineer specializing in AWS and Kubernetes.'
  url: 'https://example.com'
  language: en

profile:
  name: 'Christian De Leon'
  headline: 'Senior DevOps Engineer'
  summary: '8+ years building scalable cloud infrastructure.'
  photo: '/images/profile.jpg'
  location: 'San Francisco, CA'
  email: 'hello@example.com'
  website: 'https://example.com'

tiles:
  - content: about
    windowType: terminal
    colSpan: 7
    rowSpan: 2
    terminalTitle: 'neofetch — kitty'

  - content: skills
    windowType: system-monitor
    colSpan: 5
    rowSpan: 2
    title: 'System Monitor'

  - content: experience
    windowType: terminal
    colSpan: 6
    rowSpan: 2
    terminalTitle: 'git log — kitty'

  - content: projects
    windowType: file-manager
    colSpan: 6
    rowSpan: 2
    title: 'Projects — Thunar'

  - content: education
    windowType: terminal
    colSpan: 4
    rowSpan: 1
    terminalTitle: 'man education — kitty'

  - content: certifications
    windowType: terminal
    colSpan: 4
    rowSpan: 1
    terminalTitle: 'pass — kitty'

  - content: contact
    windowType: terminal
    colSpan: 4
    rowSpan: 1
    terminalTitle: 'aerc — kitty'

# ─── Identity ─────────────────────────────────────────────────────────────────

contact:
  email: 'hello@example.com'
  location: 'San Francisco, CA'
  availability: 'Open to opportunities'
  preferredContact: 'email'
  message: "Let's build something reliable together."

social:
  - network: GitHub
    url: 'https://github.com/christian-deleon'
    username: christian-deleon
  - network: LinkedIn
    url: 'https://linkedin.com/in/christian-deleon'

about:
  bio: 'Cloud architect by day, homelab enthusiast by night.'
  funFacts:
    - 'I run NixOS on my daily driver (btw)'
    - 'My homelab has more uptime than most startups'
  systemInfo:
    OS: 'NixOS 24.05'
    WM: 'Hyprland'
    Shell: 'zsh + starship'
    Terminal: 'kitty'
    Editor: 'Neovim (LazyVim)'

# ─── Visual Settings ─────────────────────────────────────────────────────────

palette:
  default: catppuccin-mocha
  defaultLight: catppuccin-latte
  available:
    - catppuccin-mocha
    - catppuccin-latte
    - tokyo-night
    - dracula
  respectSystem: true

wallpaper:
  image: '/wallpapers/default.jpg'
  opacity: 0.15
  blur: 10
  size: cover
  position: center

waybar:
  show: true
  title: 'christian@hyprfolio ~'
  workspaces: 5
  activeWorkspace: 1
  showClock: true
  showPaletteSwitcher: true

layout:
  maxWidth: 1400
  innerGap: 5
  outerGap: 20

animations:
  enabled: true
  entrance: popin
  duration: 410
  stagger: 80
  hoverScale: 1.01

# ─── SEO & Analytics ─────────────────────────────────────────────────────────

seo:
  twitterHandle: '@example'
  noIndex: false

analytics:
  plausibleDomain: 'example.com'

# ─── Core CV ──────────────────────────────────────────────────────────────────

experience:
  - company: 'Stratos Systems'
    position: 'Senior DevOps Engineer'
    url: 'https://example.com'
    startDate: '2022-03'
    current: true
    summary: 'Leading cloud infrastructure strategy.'
    highlights:
      - 'Migrated monolith to microservices on EKS'
      - 'Designed multi-region active-active architecture'
    technologies: [AWS, Kubernetes, Terraform, ArgoCD]
    location: 'San Francisco, CA'

education:
  - institution: 'University of Washington'
    area: 'Computer Science'
    studyType: 'B.S.'
    startDate: '2013'
    endDate: '2017'
    courses: ['Distributed Systems', 'Cloud Computing']
    honors: ["Dean's List 2015-2017"]

skills:
  - category: 'Cloud Platforms'
    skills:
      - { name: 'AWS', level: 95 }
      - { name: 'GCP', level: 80 }
  - category: 'Infrastructure'
    skills:
      - { name: 'Kubernetes', level: 95 }
      - { name: 'Terraform', level: 90 }

projects:
  - name: 'cluster-cleanup'
    description: 'Automatic cleanup of stale Kubernetes resources.'
    repo: 'https://github.com/christian-deleon/cluster-cleanup'
    technologies: [Go, Kubernetes, Helm]
    featured: true

certifications:
  - name: 'AWS Solutions Architect — Professional'
    issuer: 'Amazon Web Services'
    date: '2023-06'
    id: 'AWS-SAP-2023'

# ─── Extended CV (all optional arrays, shown empty) ──────────────────────────

awards: []
publications: []
speaking: []
volunteer: []
languages: []
interests: []
references: []

# ─── Portfolio / Freelance (all optional) ─────────────────────────────────────

testimonials: []
services: []
clients: []
blog: []

# ─── Specialized (all optional) ──────────────────────────────────────────────

academic: []
executive: []
military: []

# ─── Additional (all optional) ───────────────────────────────────────────────

organizations: []
patents: []
courses: []
testScores: []
# personal: (omit entirely if not needed)
custom: []
```
