# Window Types

Window types provide the application chrome that wraps tile content. Each type mimics the appearance of a real Linux application, giving tiles their visual identity.

## Table of Contents

- [Overview](#overview)
- [Window Types](#window-types)
  - [terminal](#terminal)
  - [browser](#browser)
  - [editor](#editor)
  - [file-manager](#file-manager)
  - [system-monitor](#system-monitor)
  - [pdf-viewer](#pdf-viewer)
  - [image-viewer](#image-viewer)
  - [markdown-viewer](#markdown-viewer)
  - [blank](#blank)
- [Window Chrome Properties](#window-chrome-properties)
- [Creating a New Window Type](#creating-a-new-window-type)

---

## Overview

Every tile is wrapped in `WindowChrome.astro`, which provides the universal border and rounding. Inside the chrome, a window type component provides app-specific elements (toolbars, status bars, styling). Inside the window type, the tile content component renders the actual data.

```
WindowChrome (border, rounding, shadow)
  └── WindowType (toolbar, status bar, app-specific styling)
        └── TileContent (config-driven data)
```

Window types are selected per-tile in `hyprfolio.config.yaml`:

```yaml
tiles:
  - content: about
    windowType: terminal # <-- window type
    terminalTitle: 'neofetch — kitty'
```

The resolver in `src/lib/windows.ts` maps the string to the component.

---

## Window Types

### terminal

**Component**: `src/windows/Terminal.astro`

Mimics a Linux terminal emulator (kitty, Alacritty, foot). The most commonly used window type. Uses JetBrains Mono Nerd Font at 13px.

**Visual elements**:

- Dark background (`--hp-mantle`)
- Monospace font for all content
- Optional title bar text

**Typically used with**:

- `about` (neofetch)
- `experience` (git log)
- `education` (man page)
- `certifications` (pass)
- `contact` (aerc)

**Tile props used**:

| Prop            | Description                                                        |
| --------------- | ------------------------------------------------------------------ |
| `terminalTitle` | Text shown in the terminal title area (e.g., "neofetch -- kitty"). |

```yaml
- content: about
  windowType: terminal
  terminalTitle: 'neofetch — kitty'
```

---

### browser

**Component**: `src/windows/Browser.astro`

Mimics a web browser window (Firefox, Chromium). Includes an address bar and navigation buttons.

**Visual elements**:

- Address bar with URL display
- Navigation button dots (back, forward, refresh)
- UI font (Inter) for chrome, content varies

**Typically used with**:

- `custom` content with web-style layouts
- Languages (GNOME Settings style)

**Tile props used**:

| Prop         | Description                                                        |
| ------------ | ------------------------------------------------------------------ |
| `browserUrl` | URL shown in the address bar (e.g., "https://settings.gnome.org"). |
| `title`      | Browser window title.                                              |

```yaml
- content: custom
  windowType: browser
  browserUrl: 'https://settings.gnome.org'
  title: 'Settings'
```

---

### editor

**Component**: `src/windows/Editor.astro`

Mimics a code editor (Neovim, VS Code). Includes a tab bar with filename and syntax-highlighted content area.

**Visual elements**:

- Tab bar with filename
- Line numbers gutter (optional)
- Monospace font for content
- Syntax highlighting colors

**Typically used with**:

- `blog` (Neovim-style markdown editing)
- `custom` content with code

**Tile props used**:

| Prop             | Description                                           |
| ---------------- | ----------------------------------------------------- |
| `editorFilename` | Filename shown in the editor tab (e.g., "README.md"). |
| `title`          | Fallback title if no filename is set.                 |

```yaml
- content: custom
  windowType: editor
  editorFilename: 'README.md'
```

---

### file-manager

**Component**: `src/windows/FileManager.astro`

Mimics a graphical file manager (Thunar, Nautilus). Includes a sidebar and content area with icon/grid view.

**Visual elements**:

- Sidebar with navigation (folder tree or bookmarks)
- Toolbar with path breadcrumbs
- Content area with folder/file grid
- UI font (Inter) for all text

**Typically used with**:

- `projects` (project folders with icons)

**Tile props used**:

| Prop    | Description                                                       |
| ------- | ----------------------------------------------------------------- |
| `title` | Window title shown in the title bar (e.g., "Projects -- Thunar"). |

```yaml
- content: projects
  windowType: file-manager
  title: 'Projects — Thunar'
```

---

### system-monitor

**Component**: `src/windows/SystemMonitor.astro`

Mimics a system monitoring tool (btop, htop). Displays data as progress bars, charts, and status indicators.

**Visual elements**:

- Colored progress bars
- Category headers
- Percentage labels
- Compact data-dense layout

**Typically used with**:

- `skills` (skill levels as progress bars)

**Tile props used**:

| Prop    | Description                            |
| ------- | -------------------------------------- |
| `title` | Window title (e.g., "System Monitor"). |

```yaml
- content: skills
  windowType: system-monitor
  title: 'System Monitor'
```

---

### pdf-viewer

**Component**: `src/windows/PDFViewer.astro`

Mimics a PDF viewer (Zathura, Evince). Minimal chrome with a document-style content area.

**Visual elements**:

- Toolbar with page controls
- Document-style content area with light background
- Clean typography for reading

**Typically used with**:

- Resume or CV display
- `custom` content with formatted documents

**Tile props used**:

| Prop    | Description                          |
| ------- | ------------------------------------ |
| `title` | Document title shown in the toolbar. |

```yaml
- content: custom
  windowType: pdf-viewer
  title: 'resume.pdf — Zathura'
```

---

### image-viewer

**Component**: `src/windows/ImageViewer.astro`

Mimics an image viewer application (feh, imv, Eye of GNOME). Simple chrome around visual content.

**Visual elements**:

- Minimal toolbar
- Dark or transparent background for images
- Image-focused layout with no distracting elements

**Typically used with**:

- `custom` content with images or visual portfolios

**Tile props used**:

| Prop    | Description                              |
| ------- | ---------------------------------------- |
| `title` | Image filename or title shown in chrome. |

```yaml
- content: custom
  windowType: image-viewer
  title: 'screenshot.png'
```

---

### markdown-viewer

**Component**: `src/windows/MarkdownViewer.astro`

Mimics a rendered markdown viewer (Glow, MDCat). Provides formatted prose styling for rich text.

**Visual elements**:

- Prose-formatted content area
- Heading styles, lists, code blocks
- UI font for body, monospace for code blocks

**Typically used with**:

- `custom` content with markdown text
- Blog-style content that should look rendered (not as code)

**Tile props used**:

| Prop    | Description     |
| ------- | --------------- |
| `title` | Document title. |

```yaml
- content: custom
  windowType: markdown-viewer
  title: 'notes.md'
```

---

### blank

**Component**: `src/windows/Blank.astro`

No application chrome. Just the content with the standard window border and rounding from `WindowChrome`. Use this for custom layouts where no app metaphor is needed.

**Visual elements**:

- No toolbar or status bar
- Content fills the entire window area
- Standard window border and rounding still applied

**Typically used with**:

- `custom` content with fully custom HTML
- Talks/presentations (large text slides)

**Tile props used**:

| Prop    | Description                                         |
| ------- | --------------------------------------------------- |
| `title` | Optional title (may not be visible without chrome). |

```yaml
- content: custom
  windowType: blank
  customHtml: "<div style='font-size: 3rem;'>Hello World</div>"
```

---

## Window Chrome Properties

All window types are wrapped in `WindowChrome.astro`, which provides consistent visual properties defined by Hyprland's visual rules:

| Property         | Value                           | Description                                 |
| ---------------- | ------------------------------- | ------------------------------------------- |
| Border width     | 2px                             | Solid border around the window              |
| Border radius    | 10px                            | Rounded corners                             |
| Active border    | Gradient or `--hp-accent`       | Border color for the focused/hovered window |
| Inactive border  | `--hp-surface-1` at 50% opacity | Muted border for unfocused windows          |
| Inactive opacity | 0.85                            | Slight dim on unfocused windows             |
| Backdrop blur    | `blur(10px)`                    | Applied to transparent or overlay elements  |

These values are non-negotiable for visual authenticity with the Hyprland desktop aesthetic.

---

## Creating a New Window Type

### Step 1: Create the component

Create a new `.astro` file in `src/windows/`:

```astro
---
// src/windows/MyWindow.astro
interface Props {
  title?: string;
}

const { title } = Astro.props;
---

<div class="my-window">
  {
    title && (
      <div
        class="my-window-toolbar"
        style={`background: var(--hp-surface-0); color: var(--hp-text);`}
      >
        {title}
      </div>
    )
  }
  <div class="my-window-content">
    <slot />
  </div>
</div>

<style>
  .my-window {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  .my-window-toolbar {
    padding: 4px 12px;
    font-size: 12px;
    border-bottom: 1px solid var(--hp-surface-1);
  }
  .my-window-content {
    flex: 1;
    overflow: auto;
    padding: 12px;
  }
</style>
```

The `<slot />` element is required. This is where tile content is injected.

### Step 2: Register in the resolver

Add an entry to `src/lib/windows.ts`:

```typescript
export const windowComponents: Record<WindowType, ComponentLoader> = {
  terminal: () => import('@/windows/Terminal.astro'),
  browser: () => import('@/windows/Browser.astro'),
  // ... existing entries
  'my-window': () => import('@/windows/MyWindow.astro'),
};
```

Also add the new type to `WindowTypeEnum` in `src/lib/schema.ts`:

```typescript
export const WindowTypeEnum = z.enum([
  'terminal',
  'browser',
  // ... existing types
  'my-window',
]);
```

### Step 3: Use in config

```yaml
tiles:
  - content: custom
    windowType: my-window
    title: 'My Custom App'
```
