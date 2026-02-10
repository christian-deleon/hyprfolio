# Palettes

Hyprfolio ships with 11 built-in color palettes, all inspired by popular terminal and editor themes. The palette system uses CSS custom properties scoped by `data-palette` on the `<html>` element, making components palette-agnostic.

## Table of Contents

- [Built-in Palettes](#built-in-palettes)
  - [Dark Palettes](#dark-palettes)
  - [Light Palettes](#light-palettes)
- [CSS Variable Reference](#css-variable-reference)
- [How Palette Switching Works](#how-palette-switching-works)
- [Creating a Custom Palette](#creating-a-custom-palette)
- [Contrast Guidelines](#contrast-guidelines)
- [System Preference Integration](#system-preference-integration)

---

## Built-in Palettes

### Dark Palettes

#### catppuccin-mocha (default dark)

Catppuccin's warmest dark variant. Pastel colors on deep blue-gray.

| Variable         | Value     | Role                        |
| ---------------- | --------- | --------------------------- |
| `--hp-crust`     | `#11111b` | Darkest background          |
| `--hp-mantle`    | `#181825` | Slightly lighter background |
| `--hp-base`      | `#1e1e2e` | Main background             |
| `--hp-surface-0` | `#313244` | Raised surfaces             |
| `--hp-surface-1` | `#45475a` | Hover surfaces              |
| `--hp-surface-2` | `#585b70` | Active surfaces             |
| `--hp-text`      | `#cdd6f4` | Primary text                |
| `--hp-accent`    | `#b4befe` | Accent (Lavender)           |

#### tokyo-night

Inspired by the Tokyo Night VS Code theme. Cool blue tones.

| Variable      | Value     | Role               |
| ------------- | --------- | ------------------ |
| `--hp-crust`  | `#16161e` | Darkest background |
| `--hp-base`   | `#1a1b26` | Main background    |
| `--hp-text`   | `#a9b1d6` | Primary text       |
| `--hp-accent` | `#7aa2f7` | Accent (Blue)      |

#### gruvbox-dark

Retro groove color scheme. Warm browns and vivid colors.

| Variable      | Value     | Role               |
| ------------- | --------- | ------------------ |
| `--hp-crust`  | `#1d2021` | Darkest background |
| `--hp-base`   | `#282828` | Main background    |
| `--hp-text`   | `#ebdbb2` | Primary text       |
| `--hp-accent` | `#458588` | Accent (Aqua)      |

#### nord

Arctic, north-bluish palette. Clean and minimal.

| Variable      | Value     | Role               |
| ------------- | --------- | ------------------ |
| `--hp-crust`  | `#242933` | Darkest background |
| `--hp-base`   | `#2e3440` | Main background    |
| `--hp-text`   | `#eceff4` | Primary text       |
| `--hp-accent` | `#88c0d0` | Accent (Frost)     |

#### dracula

Classic dark theme. Purple accent with vivid foregrounds.

| Variable      | Value     | Role               |
| ------------- | --------- | ------------------ |
| `--hp-crust`  | `#1e1f29` | Darkest background |
| `--hp-base`   | `#282a36` | Main background    |
| `--hp-text`   | `#f8f8f2` | Primary text       |
| `--hp-accent` | `#bd93f9` | Accent (Purple)    |

#### rose-pine

Soho vibes. Muted pinks and purples on dark warm base.

| Variable      | Value     | Role               |
| ------------- | --------- | ------------------ |
| `--hp-crust`  | `#150f1e` | Darkest background |
| `--hp-base`   | `#191724` | Main background    |
| `--hp-text`   | `#e0def4` | Primary text       |
| `--hp-accent` | `#c4a7e7` | Accent (Iris)      |

### Light Palettes

#### catppuccin-latte (default light)

Catppuccin's light variant. Soft cream with vivid accents.

| Variable      | Value     | Role                |
| ------------- | --------- | ------------------- |
| `--hp-crust`  | `#dce0e8` | Lightest background |
| `--hp-base`   | `#eff1f5` | Main background     |
| `--hp-text`   | `#4c4f69` | Primary text        |
| `--hp-accent` | `#7287fd` | Accent (Lavender)   |

#### tokyo-night-light

Light counterpart to Tokyo Night. Warm gray base.

| Variable      | Value     | Role                |
| ------------- | --------- | ------------------- |
| `--hp-crust`  | `#d5d6db` | Lightest background |
| `--hp-base`   | `#d5d6db` | Main background     |
| `--hp-text`   | `#343b58` | Primary text        |
| `--hp-accent` | `#34548a` | Accent (Blue)       |

#### gruvbox-light

Warm light variant of Gruvbox. Cream and earth tones.

| Variable      | Value     | Role                |
| ------------- | --------- | ------------------- |
| `--hp-crust`  | `#f9f5d7` | Lightest background |
| `--hp-base`   | `#fbf1c7` | Main background     |
| `--hp-text`   | `#3c3836` | Primary text        |
| `--hp-accent` | `#076678` | Accent (Aqua)       |

#### nord-light

Light variant of Nord. Snow white base.

| Variable      | Value     | Role                |
| ------------- | --------- | ------------------- |
| `--hp-crust`  | `#d8dee9` | Lightest background |
| `--hp-base`   | `#eceff4` | Main background     |
| `--hp-text`   | `#2e3440` | Primary text        |
| `--hp-accent` | `#5e81ac` | Accent (Frost)      |

#### rose-pine-dawn

Light variant of Rose Pine. Warm dawn tones.

| Variable      | Value     | Role                |
| ------------- | --------- | ------------------- |
| `--hp-crust`  | `#f2e9de` | Lightest background |
| `--hp-base`   | `#faf4ed` | Main background     |
| `--hp-text`   | `#575279` | Primary text        |
| `--hp-accent` | `#907aa9` | Accent (Iris)       |

---

## CSS Variable Reference

Every palette defines exactly 23 CSS custom properties with the `--hp-` prefix. All components use only these variables, making them palette-agnostic.

### Background Variables

| Variable         | Description                                       | Typical Use                           |
| ---------------- | ------------------------------------------------- | ------------------------------------- |
| `--hp-crust`     | Darkest background (or lightest for light themes) | `<body>` background, deepest layers   |
| `--hp-mantle`    | Slightly lighter than crust                       | Sidebar backgrounds, secondary panels |
| `--hp-base`      | Main background color                             | Primary content area background       |
| `--hp-surface-0` | Raised surface                                    | Cards, panels, window backgrounds     |
| `--hp-surface-1` | Higher surface                                    | Hover states, secondary panels        |
| `--hp-surface-2` | Highest surface                                   | Active states, selected items         |

### Overlay Variables

| Variable         | Description    | Typical Use                       |
| ---------------- | -------------- | --------------------------------- |
| `--hp-overlay-0` | Subtle overlay | Inactive borders, dividers        |
| `--hp-overlay-1` | Medium overlay | Scrollbar thumbs, muted elements  |
| `--hp-overlay-2` | Strong overlay | Placeholder text, disabled states |

### Text Variables

| Variable         | Description  | Typical Use                  |
| ---------------- | ------------ | ---------------------------- |
| `--hp-subtext-0` | Dimmest text | Labels, captions, timestamps |
| `--hp-subtext-1` | Dimmed text  | Secondary info, descriptions |
| `--hp-text`      | Primary text | Body text, headings          |

### Semantic Color Variables

| Variable      | Description         | Typical Use                                  |
| ------------- | ------------------- | -------------------------------------------- |
| `--hp-red`    | Error, danger       | Error messages, deletions, exit codes        |
| `--hp-green`  | Success, positive   | Success states, additions, active indicators |
| `--hp-yellow` | Warning, attention  | Warnings, highlighted text                   |
| `--hp-blue`   | Information, links  | Links, info messages                         |
| `--hp-purple` | Special, decorative | Keywords, special labels                     |
| `--hp-pink`   | Accent alternative  | Secondary accents, tags                      |
| `--hp-orange` | Secondary accent    | Notifications, secondary highlights          |
| `--hp-teal`   | Tertiary accent     | Data visualization, decorative               |
| `--hp-sky`    | Light info          | Decorative elements, light accents           |

### Special Variables

| Variable      | Description          | Typical Use                                  |
| ------------- | -------------------- | -------------------------------------------- |
| `--hp-accent` | Primary accent color | Active borders, focus rings, buttons, links  |
| `--hp-shadow` | Box shadow color     | Drop shadows (typically dark with low alpha) |

### Usage in CSS

```css
/* Always use --hp-* variables, never raw hex values */
.my-component {
  background: var(--hp-surface-0);
  color: var(--hp-text);
  border: 2px solid var(--hp-accent);
  box-shadow: 0 4px 12px var(--hp-shadow);
}

.my-component:hover {
  background: var(--hp-surface-1);
}

.error-text {
  color: var(--hp-red);
}
```

---

## How Palette Switching Works

The palette system has four layers:

### 1. CSS scoping via `data-palette`

Each palette file defines variables under `[data-palette="name"]`:

```css
/* src/palettes/catppuccin-mocha.css */
[data-palette='catppuccin-mocha'] {
  --hp-crust: #11111b;
  --hp-text: #cdd6f4;
  /* ... all 23 variables */
}
```

The active palette is the one whose `data-palette` value matches the attribute on `<html>`:

```html
<html data-palette="catppuccin-mocha"></html>
```

### 2. Flash-free initialization

An inline script in `<head>` reads localStorage before the first paint, preventing a flash of wrong colors:

```html
<script is:inline>
  // Runs synchronously before any rendering
  const saved = localStorage.getItem('hyprfolio-palette');
  if (saved) {
    document.documentElement.setAttribute('data-palette', saved);
  }
</script>
```

### 3. PaletteSwitcher component

The PaletteSwitcher island (vanilla JS, no framework) provides a dropdown in the Waybar. When the user selects a palette:

1. Sets `data-palette` on `<html>`
2. Saves the choice to `localStorage`
3. All components instantly update because CSS variables cascade

### 4. System preference listener

When `palette.respectSystem` is `true`, a `matchMedia` listener watches `prefers-color-scheme`:

- If the OS switches to dark mode, the site loads `palette.default`
- If the OS switches to light mode, the site loads `palette.defaultLight`
- Manual selection via the PaletteSwitcher overrides system preference

---

## Creating a Custom Palette

### Step 1: Generate the file

```bash
just new-palette my-theme
```

This copies `src/palettes/_template.css` to `src/palettes/my-theme.css`.

### Step 2: Fill in all 23 variables

Open `src/palettes/my-theme.css` and replace `PALETTE_NAME` with your palette ID, then fill in every `--hp-*` value:

```css
[data-palette='my-theme'] {
  /* Backgrounds (darkest to lightest for dark themes) */
  --hp-crust: #0a0a12;
  --hp-mantle: #101018;
  --hp-base: #16161e;
  --hp-surface-0: #1e1e28;
  --hp-surface-1: #282832;
  --hp-surface-2: #32323c;

  /* Overlays */
  --hp-overlay-0: #3c3c4a;
  --hp-overlay-1: #505060;
  --hp-overlay-2: #646478;

  /* Text */
  --hp-subtext-0: #8888a0;
  --hp-subtext-1: #aaaac0;
  --hp-text: #d0d0e0;

  /* Semantic Colors */
  --hp-red: #ff6b6b;
  --hp-green: #69db7c;
  --hp-yellow: #ffd43b;
  --hp-blue: #74c0fc;
  --hp-purple: #b197fc;
  --hp-pink: #f783ac;
  --hp-orange: #ffa94d;
  --hp-teal: #63e6be;
  --hp-sky: #66d9ef;

  /* Special */
  --hp-accent: #74c0fc;
  --hp-shadow: rgba(0, 0, 0, 0.5);
}
```

### Step 3: Import in global.css

Add the import to `src/styles/global.css` alongside the other palette imports:

```css
@import '../palettes/my-theme.css';
```

### Step 4: Register in config

Add your palette ID to the `available` list in `hyprfolio.config.yaml`:

```yaml
palette:
  default: my-theme # Optionally set as default
  available:
    - my-theme
    - catppuccin-mocha
    - catppuccin-latte
    # ... other palettes
```

### Step 5: Add to the Zod schema (optional)

To get full type safety, add your palette to `PaletteIdEnum` in `src/lib/schema.ts`:

```typescript
export const PaletteIdEnum = z.enum([
  'catppuccin-mocha',
  'catppuccin-latte',
  // ... existing palettes
  'my-theme',
]);
```

---

## Contrast Guidelines

All palettes should meet WCAG AA contrast requirements to ensure accessibility.

### Minimum contrast ratios

| Combination                     | WCAG AA Requirement | Purpose                                     |
| ------------------------------- | ------------------- | ------------------------------------------- |
| `--hp-text` on `--hp-base`      | 4.5:1               | Body text readability                       |
| `--hp-text` on `--hp-surface-0` | 4.5:1               | Card/panel text                             |
| `--hp-subtext-1` on `--hp-base` | 4.5:1               | Secondary text                              |
| `--hp-subtext-0` on `--hp-base` | 3:1                 | Labels and captions (large text exception)  |
| `--hp-accent` on `--hp-base`    | 3:1                 | Non-text UI elements (borders, focus rings) |

### Testing contrast

Use browser DevTools or online tools to check contrast ratios:

1. Open your site with the palette active
2. In DevTools, inspect an element using the variable
3. The color picker shows WCAG contrast ratios
4. Alternatively, use [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) with the hex values

### Palette design tips

- **Dark themes**: Background colors should be truly dark (lightness < 20%). Text should be high lightness (> 75%).
- **Light themes**: Background colors should be light (lightness > 85%). Text should be low lightness (< 30%).
- **Semantic colors**: `--hp-red`, `--hp-green`, `--hp-yellow` should be distinguishable from each other and from the accent color.
- **Shadow**: Use `rgba(0, 0, 0, 0.5)` for dark themes and `rgba(0, 0, 0, 0.1)` for light themes.
- **Accent**: Choose a color that stands out from `--hp-base` without being harsh. This is the most visible UI color (borders, focus rings, links).

---

## System Preference Integration

When `palette.respectSystem` is `true` (the default), Hyprfolio listens to the operating system's color scheme preference.

### How it works

```
User opens site
  ├── Has localStorage saved palette? → Use saved palette
  └── No saved palette?
        ├── OS in dark mode? → Use palette.default
        └── OS in light mode? → Use palette.defaultLight
```

### Configuration

```yaml
palette:
  default: catppuccin-mocha # Used when OS is in dark mode
  defaultLight: catppuccin-latte # Used when OS is in light mode
  respectSystem: true # Enable OS preference detection
```

### User override

When a user manually selects a palette from the PaletteSwitcher:

- Their choice is saved to `localStorage`
- The saved palette is used on subsequent visits regardless of OS preference
- Clearing localStorage (or selecting "Auto" if implemented) restores system preference behavior

### Disabling system preference

Set `respectSystem: false` to always use `palette.default`, ignoring the OS setting:

```yaml
palette:
  default: dracula
  respectSystem: false
```
