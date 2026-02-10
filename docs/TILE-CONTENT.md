# Tile Content Types

Tile content components render config-driven data inside window types. Each tile reads from a specific section of `hyprfolio.config.yaml` and outputs formatted content that mimics a real Linux application.

## Table of Contents

- [Overview](#overview)
- [Tile Content Types](#tile-content-types)
  - [about](#about)
  - [experience](#experience)
  - [education](#education)
  - [skills](#skills)
  - [projects](#projects)
  - [certifications](#certifications)
  - [contact](#contact)
  - [custom](#custom)
- [Content-to-Application Mapping](#content-to-application-mapping)
- [Creating a New Tile Content Type](#creating-a-new-tile-content-type)

---

## Overview

The tile content resolver (`src/lib/tiles.ts`) maps the `content` field from each tile definition to a component:

```yaml
tiles:
  - content: about # <-- resolved to AboutTile.astro
    windowType: terminal
```

Tile components live in `src/tiles/` and follow the naming convention `{Name}Tile.astro`. Each component:

1. Imports `loadConfig()` from `src/lib/config.ts`
2. Reads the relevant config section in frontmatter
3. Renders formatted HTML that matches the window type's aesthetic

---

## Tile Content Types

### about

**Component**: `src/tiles/AboutTile.astro`
**Config section**: `profile`, `about`, `social`
**Mimics**: neofetch (system information tool)
**Recommended window type**: `terminal`

Renders a neofetch-style display with ASCII art (optional), system info key-value pairs, bio text, fun facts, and social links.

#### Fields used

From `profile`:

| Field      | Type     | Description                                                       |
| ---------- | -------- | ----------------------------------------------------------------- |
| `name`     | `string` | Displayed as the "user@hostname" header.                          |
| `headline` | `string` | Shown below the name.                                             |
| `photo`    | `string` | Profile image path (displayed as ASCII art placeholder or image). |

From `about`:

| Field        | Type                     | Description                                                           |
| ------------ | ------------------------ | --------------------------------------------------------------------- |
| `ascii`      | `string`                 | Custom ASCII art displayed beside system info.                        |
| `bio`        | `string`                 | Bio paragraph below the system info block.                            |
| `funFacts`   | `string[]`               | Displayed as bullet points.                                           |
| `systemInfo` | `Record<string, string>` | Key-value pairs displayed like neofetch output (e.g., OS, WM, Shell). |

From `social`:

| Field      | Type     | Description                                    |
| ---------- | -------- | ---------------------------------------------- |
| `network`  | `string` | Network name used as label.                    |
| `url`      | `string` | Link URL.                                      |
| `username` | `string` | Displayed if provided, otherwise URL is shown. |

#### Example config

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

tiles:
  - content: about
    windowType: terminal
    colSpan: 7
    rowSpan: 2
    terminalTitle: 'neofetch — kitty'
```

#### Visual output

```
christian@hyprfolio
─────────────
OS:       NixOS 24.05
WM:       Hyprland
Shell:    zsh + starship
Terminal: kitty
Editor:   Neovim (LazyVim)
Uptime:   8y in cloud infra

Cloud architect by day, homelab enthusiast by night.

  * I run NixOS on my daily driver (btw)
  * My homelab has more uptime than most startups
```

---

### experience

**Component**: `src/tiles/ExperienceTile.astro`
**Config section**: `experience`
**Mimics**: git log (version control history)
**Recommended window type**: `terminal`

Renders work experience as git commit history. Each position is a "commit" with company as author, date as timestamp, and highlights as the commit message.

#### Fields used

| Field          | Type       | Description                                    |
| -------------- | ---------- | ---------------------------------------------- |
| `company`      | `string`   | Shown as the commit author.                    |
| `position`     | `string`   | Shown as the commit subject line.              |
| `url`          | `string`   | Links the company name.                        |
| `startDate`    | `string`   | Start date formatted as commit timestamp.      |
| `endDate`      | `string`   | End date (or "Present" if `current` is true).  |
| `current`      | `boolean`  | Marks the position as ongoing. Shown as HEAD.  |
| `summary`      | `string`   | Commit message body.                           |
| `highlights`   | `string[]` | Displayed as bullet points in the commit body. |
| `technologies` | `string[]` | Shown as tags or labels after the highlights.  |
| `location`     | `string`   | Displayed alongside the date.                  |

#### Example config

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
    technologies: [AWS, Kubernetes, Terraform]
    location: 'San Francisco, CA'

tiles:
  - content: experience
    windowType: terminal
    colSpan: 6
    rowSpan: 2
    terminalTitle: 'git log — kitty'
```

#### Visual output

```
commit a1b2c3d (HEAD -> main)
Author: Stratos Systems
Date:   Mar 2022 — Present

    Senior DevOps Engineer

    * Migrated monolith to microservices on EKS
    * Designed multi-region active-active architecture

    [AWS] [Kubernetes] [Terraform]
```

---

### education

**Component**: `src/tiles/EducationTile.astro`
**Config section**: `education`
**Mimics**: man page (manual pages)
**Recommended window type**: `terminal`

Renders education as a Unix man page with sections for institution, degree, dates, courses, and honors.

#### Fields used

| Field         | Type       | Description                                    |
| ------------- | ---------- | ---------------------------------------------- |
| `institution` | `string`   | Shown as the man page title/name.              |
| `area`        | `string`   | Field of study, shown in the NAME section.     |
| `studyType`   | `string`   | Degree type (e.g., "B.S."), shown before area. |
| `startDate`   | `string`   | Start date.                                    |
| `endDate`     | `string`   | End/graduation date.                           |
| `gpa`         | `string`   | GPA if provided.                               |
| `courses`     | `string[]` | Listed under a COURSES section.                |
| `honors`      | `string[]` | Listed under an HONORS section.                |
| `url`         | `string`   | Links the institution name.                    |

#### Example config

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

tiles:
  - content: education
    windowType: terminal
    colSpan: 4
    rowSpan: 1
    terminalTitle: 'man education — kitty'
```

#### Visual output

```
EDUCATION(7)                  Manual Page                  EDUCATION(7)

NAME
       B.S. Computer Science — University of Washington

DATES
       2013 — 2017

COURSES
       Distributed Systems, Cloud Computing

HONORS
       Dean's List 2015-2017
```

---

### skills

**Component**: `src/tiles/SkillsTile.astro`
**Config section**: `skills`
**Mimics**: btop (system resource monitor)
**Recommended window type**: `system-monitor`

Renders skills as colored progress bars grouped by category, resembling CPU/memory usage bars in btop.

#### Fields used

From `SkillCategory`:

| Field      | Type          | Description                                 |
| ---------- | ------------- | ------------------------------------------- |
| `category` | `string`      | Category heading (e.g., "Cloud Platforms"). |
| `skills`   | `SkillItem[]` | Array of skills in this category.           |

From `SkillItem`:

| Field   | Type              | Description                          |
| ------- | ----------------- | ------------------------------------ |
| `name`  | `string`          | Skill label shown beside the bar.    |
| `level` | `integer` (0-100) | Bar fill percentage. Default: 80.    |
| `color` | `string`          | Optional color override for the bar. |

#### Example config

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

tiles:
  - content: skills
    windowType: system-monitor
    colSpan: 5
    rowSpan: 2
    title: 'System Monitor'
```

#### Visual output

```
Cloud Platforms
  AWS         [████████████████████░░] 95%
  GCP         [████████████████░░░░░░] 80%
  Azure       [█████████████░░░░░░░░░] 65%

Infrastructure
  Kubernetes  [████████████████████░░] 95%
  Terraform   [██████████████████░░░░] 90%
```

---

### projects

**Component**: `src/tiles/ProjectsTile.astro`
**Config section**: `projects`
**Mimics**: Thunar (XFCE file manager)
**Recommended window type**: `file-manager`

Renders projects as a file manager with folder icons, project names, and metadata in a grid or list layout. Featured projects may be highlighted.

#### Fields used

| Field          | Type       | Description                                         |
| -------------- | ---------- | --------------------------------------------------- |
| `name`         | `string`   | Project name, shown as folder/file name.            |
| `description`  | `string`   | Short description shown on hover or in detail view. |
| `url`          | `string`   | Links to the live project.                          |
| `repo`         | `string`   | Links to the source repository.                     |
| `image`        | `string`   | Project thumbnail or icon.                          |
| `technologies` | `string[]` | Shown as tags or file type indicators.              |
| `highlights`   | `string[]` | Key features shown in detail view.                  |
| `startDate`    | `string`   | Displayed as creation date.                         |
| `endDate`      | `string`   | Displayed as modification date.                     |
| `featured`     | `boolean`  | Featured projects may be displayed larger or first. |

#### Example config

```yaml
projects:
  - name: 'cluster-cleanup'
    description: 'Automatic cleanup of stale Kubernetes resources.'
    url: 'https://github.com/christian-deleon/cluster-cleanup'
    repo: 'https://github.com/christian-deleon/cluster-cleanup'
    technologies: [Go, Kubernetes, Helm]
    highlights:
      - '2.1k stars on GitHub'
      - 'Used by 50+ companies in production'
    featured: true

  - name: 'dotfiles'
    description: 'My NixOS + Hyprland rice.'
    repo: 'https://github.com/christian-deleon/dotfiles'
    technologies: [Nix, Lua, Shell]
    featured: true

tiles:
  - content: projects
    windowType: file-manager
    colSpan: 6
    rowSpan: 2
    title: 'Projects — Thunar'
```

#### Visual output

```
 Bookmarks        | Name            Size     Type
 ─────────        | ──────────────  ───────  ──────
  Home            |  cluster-cleanup Go     ★ Featured
  Projects        |  tf-modules    Terraform ★ Featured
  Downloads       |  dotfiles      Nix
                  |  deploy-bot    Go
```

---

### certifications

**Component**: `src/tiles/CertificationsTile.astro`
**Config section**: `certifications`
**Mimics**: pass (Unix password manager tree)
**Recommended window type**: `terminal`

Renders certifications as a tree hierarchy, similar to the `pass` password store tree output.

#### Fields used

| Field        | Type     | Description                                          |
| ------------ | -------- | ---------------------------------------------------- |
| `name`       | `string` | Certification name, shown as tree node.              |
| `issuer`     | `string` | Issuing organization, shown as tree parent or label. |
| `date`       | `string` | Date earned, shown alongside name.                   |
| `expiryDate` | `string` | Expiration date if applicable.                       |
| `url`        | `string` | Links the certification for verification.            |
| `id`         | `string` | Certification ID shown as metadata.                  |

#### Example config

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

  - name: 'HashiCorp Certified: Terraform Associate'
    issuer: 'HashiCorp'
    date: '2021-11'
    id: 'HC-TA-2021'

tiles:
  - content: certifications
    windowType: terminal
    colSpan: 4
    rowSpan: 1
    terminalTitle: 'pass — kitty'
```

#### Visual output

```
Certifications
├── Amazon Web Services
│   ├── AWS Solutions Architect — Professional (2023)
│   └── AWS Solutions Architect — Associate (2020)
├── Cloud Native Computing Foundation
│   └── Certified Kubernetes Administrator (2022)
└── HashiCorp
    └── Terraform Associate (2021)
```

---

### contact

**Component**: `src/tiles/ContactTile.astro`
**Config section**: `contact`, `social`
**Mimics**: aerc (terminal email client)
**Recommended window type**: `terminal`

Renders contact information as an email compose view, with fields for To, From, Subject, and a message body. Social links appear as additional contact methods.

#### Fields used

From `contact`:

| Field              | Type     | Description                                          |
| ------------------ | -------- | ---------------------------------------------------- |
| `email`            | `string` | Shown in the "To:" field.                            |
| `phone`            | `string` | Listed as a contact method.                          |
| `location`         | `string` | Shown as location info.                              |
| `availability`     | `string` | Displayed as status (e.g., "Open to opportunities"). |
| `preferredContact` | `string` | Highlighted contact method.                          |
| `message`          | `string` | Pre-filled email body text.                          |

From `social`:

| Field      | Type     | Description                       |
| ---------- | -------- | --------------------------------- |
| `network`  | `string` | Network name as label.            |
| `url`      | `string` | Social profile link.              |
| `username` | `string` | Displayed alongside network name. |

#### Example config

```yaml
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

tiles:
  - content: contact
    windowType: terminal
    colSpan: 4
    rowSpan: 1
    terminalTitle: 'aerc — kitty'
```

#### Visual output

```
To:      hello@example.com
Subject: Let's connect

Let's build something reliable together.

── Contact ──────────────────
  Location:   San Francisco, CA
  Status:     Open to opportunities

── Social ───────────────────
  GitHub:     christian-deleon
  LinkedIn:   linkedin.com/in/christian-deleon
```

---

### custom

**Component**: `src/tiles/CustomTile.astro`
**Config section**: `custom` (array), or inline via tile props
**Mimics**: Varies (depends on window type)
**Recommended window type**: Any

A flexible tile for content that does not fit predefined types. Content can come from the `custom` config section, or inline via `customContent` (plain text) or `customHtml` (raw HTML) tile props.

#### Fields used

From tile definition:

| Field           | Type     | Description                                  |
| --------------- | -------- | -------------------------------------------- |
| `customContent` | `string` | Plain text content rendered inside the tile. |
| `customHtml`    | `string` | Raw HTML content rendered inside the tile.   |

From `custom` config section (if using structured data):

| Field           | Type     | Description    |
| --------------- | -------- | -------------- |
| `title`         | `string` | Section title. |
| `icon`          | `string` | Optional icon. |
| `items[].label` | `string` | Item label.    |
| `items[].value` | `string` | Item value.    |
| `items[].url`   | `string` | Optional link. |

#### Example config (inline content)

```yaml
tiles:
  - content: custom
    windowType: blank
    colSpan: 12
    rowSpan: 1
    customHtml: |
      <div style="text-align: center; padding: 2rem;">
        <h2>Welcome to my portfolio</h2>
        <p>Scroll down to explore</p>
      </div>
```

#### Example config (structured custom section)

```yaml
custom:
  - title: 'Open Source Contributions'
    items:
      - label: 'Kubernetes'
        value: 'Core contributor since v1.20'
        url: 'https://github.com/kubernetes/kubernetes'
      - label: 'Terraform AWS Provider'
        value: '15 merged PRs'

tiles:
  - content: custom
    windowType: terminal
    colSpan: 6
    rowSpan: 1
    terminalTitle: 'contributions'
```

---

## Content-to-Application Mapping

Reference table showing the recommended pairing of content types with window types and the Linux application they mimic:

| Content          | Linux App | Window Type      | Visual Style            |
| ---------------- | --------- | ---------------- | ----------------------- |
| `about`          | neofetch  | `terminal`       | ASCII art + system info |
| `experience`     | git log   | `terminal`       | Commit history          |
| `education`      | man page  | `terminal`       | Manual page             |
| `skills`         | btop      | `system-monitor` | Progress bars           |
| `projects`       | Thunar    | `file-manager`   | Folder grid + sidebar   |
| `certifications` | pass      | `terminal`       | Tree hierarchy          |
| `contact`        | aerc      | `terminal`       | Email compose           |
| `custom`         | (varies)  | Any              | User-defined            |

These are recommendations, not requirements. Any content type can be paired with any window type.

---

## Creating a New Tile Content Type

### Step 1: Create the component

Create a new `.astro` file in `src/tiles/`:

```astro
---
// src/tiles/MyTile.astro
import { loadConfig } from '@/lib/config';

const config = loadConfig();
const myData = config.mySection; // Read from your config section
---

<div class="my-tile terminal-text">
  {
    myData.map((item) => (
      <div class="my-tile-item">
        <span style={`color: var(--hp-green);`}>{item.name}</span>
        <span style={`color: var(--hp-subtext-0);`}>{item.description}</span>
      </div>
    ))
  }
</div>

<style>
  .my-tile {
    padding: 12px;
  }
  .my-tile-item {
    margin-bottom: 8px;
  }
</style>
```

### Step 2: Register in the resolver

Add an entry to `src/lib/tiles.ts`:

```typescript
export const tileComponents: Record<TileContent, ComponentLoader> = {
  about: () => import('@/tiles/AboutTile.astro'),
  // ... existing entries
  'my-tile': () => import('@/tiles/MyTile.astro'),
};
```

Also add the new type to `TileContentEnum` in `src/lib/schema.ts`:

```typescript
export const TileContentEnum = z.enum([
  'about',
  'experience',
  // ... existing types
  'my-tile',
]);
```

### Step 3: Use in config

If your tile reads from a new config section, add the Zod schema first (see [CONFIG-REFERENCE.md](./CONFIG-REFERENCE.md#custom)):

```yaml
tiles:
  - content: my-tile
    windowType: terminal
    colSpan: 6
    rowSpan: 1
    terminalTitle: 'my-app'
```
