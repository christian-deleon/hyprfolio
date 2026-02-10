# Contributing to Hyprfolio

Thanks for your interest in contributing to Hyprfolio! Whether you're fixing a bug, adding a new palette, building a new window type, or improving documentation, your help is appreciated.

---

## Table of Contents

- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Code Style](#code-style)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [How to Add a New Palette](#how-to-add-a-new-palette)
- [How to Add a New Window Type](#how-to-add-a-new-window-type)
- [How to Add a New Tile Content Type](#how-to-add-a-new-tile-content-type)
- [How to Add a New Config Section](#how-to-add-a-new-config-section)
- [Testing Checklist](#testing-checklist)
- [File Size Budget](#file-size-budget)

---

## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- [just](https://github.com/casey/just) command runner (recommended, but `npm run` scripts work too)

### Getting Started

1. **Fork** the repository on GitHub.

2. **Clone** your fork:

   ```bash
   git clone https://github.com/YOUR_USERNAME/hyprfolio.git
   cd hyprfolio
   ```

3. **Install** dependencies:

   ```bash
   just install    # or: npm install
   ```

4. **Start** the dev server:

   ```bash
   just dev        # or: npx astro dev
   ```

   The site will be available at `http://localhost:4321`.

5. **Validate** the config (optional, also runs during build):

   ```bash
   just validate
   ```

---

## Project Structure

For a detailed architecture overview, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

Here is a brief summary of the key directories:

```
src/
├── components/    # Core layout components (Desktop, Waybar, TileGrid, Tile, etc.)
├── windows/       # Window type components providing app-specific chrome
├── tiles/         # Tile content components reading from config sections
├── palettes/      # Color palette CSS files (one per theme)
├── styles/        # Global CSS: base styles, animations, typography, print
├── lib/           # Config loader, Zod schemas, tile/window resolvers, SEO
├── types/         # Re-exported z.infer<> types
├── layouts/       # Layout.astro (html shell, head, SEO)
└── pages/         # index.astro (the desktop), 404.astro
```

### Key Files

| File                    | Purpose                                             |
| ----------------------- | --------------------------------------------------- |
| `hyprfolio.config.yaml` | All user content and visual settings                |
| `src/lib/schema.ts`     | Zod schemas -- single source of truth for all types |
| `src/lib/config.ts`     | YAML loader, Zod validation, config caching         |
| `src/lib/tiles.ts`      | Maps content type strings to tile components        |
| `src/lib/windows.ts`    | Maps window type strings to window components       |

---

## Code Style

### File Naming

- **Components**: PascalCase -- `WindowChrome.astro`, `AboutTile.astro`
- **Palettes**: kebab-case -- `catppuccin-mocha.css`, `tokyo-night.css`
- **Lib files**: camelCase -- `config.ts`, `schema.ts`

### Colors

Every color must use a `--hp-*` CSS custom property. Never use raw hex values, `rgb()`, or Tailwind color utilities like `text-blue-500`.

```css
/* Correct */
color: var(--hp-text);
background: var(--hp-base);
border-color: var(--hp-accent);

/* Wrong -- these will break palette switching */
color: #cdd6f4;
background: rgb(30, 30, 46);
```

The full variable inventory: `--hp-crust`, `--hp-mantle`, `--hp-base`, `--hp-surface-0` through `--hp-surface-2`, `--hp-overlay-0` through `--hp-overlay-2`, `--hp-subtext-0`, `--hp-subtext-1`, `--hp-text`, `--hp-red`, `--hp-green`, `--hp-yellow`, `--hp-blue`, `--hp-purple`, `--hp-pink`, `--hp-orange`, `--hp-teal`, `--hp-sky`, `--hp-accent`, `--hp-shadow`.

### Types

All TypeScript types must be derived from Zod schemas via `z.infer<>`. Never duplicate type definitions manually. The Zod schema in `src/lib/schema.ts` is the single source of truth.

```typescript
// Correct
import type { HyprfolioConfig } from "../types/config";
// which re-exports z.infer<typeof hyprfolioConfigSchema>

// Wrong -- manual type definition
interface HyprfolioConfig {
  site: { title: string; ... };
}
```

### No Framework Runtime

Do not add React, Preact, Svelte, or any other UI framework. The only client-side JavaScript comes from vanilla `<script>` tags in `.astro` components (PaletteSwitcher and Clock islands).

### Animations

Only animate `transform` and `opacity` (GPU-composited properties). Always wrap animations in a `prefers-reduced-motion` check. Use the project bezier curves:

```css
/* Primary motion */
transition: transform 410ms cubic-bezier(0.05, 0.9, 0.1, 1.05);

/* Smooth deceleration */
transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1);

/* Snappy hover states */
transition: transform 200ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
```

### CSS

- Use Tailwind utilities for layout and spacing
- Use `--hp-*` custom properties for all colors
- Use scoped `<style>` blocks in `.astro` components (Astro scopes them automatically)
- Global styles go only in `src/styles/*.css`
- No `!important` except in `print.css`

### Component Props

Define an explicit `interface Props` at the top of the component frontmatter and destructure with `Astro.props`:

```astro
---
interface Props {
  title: string;
  active?: boolean;
}

const { title, active = false } = Astro.props;
---
```

---

## Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>: <short description>

[optional body]
```

### Types

| Type       | Use For                                          |
| ---------- | ------------------------------------------------ |
| `feat`     | New feature or capability                        |
| `fix`      | Bug fix                                          |
| `docs`     | Documentation changes                            |
| `style`    | Formatting, missing semicolons (not CSS changes) |
| `refactor` | Code restructuring without behavior change       |
| `perf`     | Performance improvement                          |
| `test`     | Adding or updating tests                         |
| `chore`    | Build process, dependency updates, tooling       |

### Examples

```
feat: add rose-pine-moon palette
fix: correct tile overlap at 900px breakpoint
docs: add deployment guide for Cloudflare Pages
style: format palette files with prettier
refactor: extract window border logic into shared mixin
chore: update astro to 5.3.0
```

---

## Pull Request Process

1. **Fork** the repository and create a branch from `main`:

   ```bash
   git checkout -b feat/my-new-feature
   ```

2. **Make your changes** following the code style guidelines above.

3. **Run the full CI check** before pushing:

   ```bash
   just ci    # runs format-check + typecheck + build
   ```

4. **Commit** your changes using conventional commit format.

5. **Push** to your fork:

   ```bash
   git push origin feat/my-new-feature
   ```

6. **Open a pull request** against `main` with a clear description of what you changed and why.

### PR Guidelines

- Keep PRs focused -- one feature or fix per PR
- Include before/after screenshots for visual changes
- Update documentation if your change affects user-facing behavior
- Ensure all CI checks pass before requesting review

---

## How to Add a New Palette

### Step 1: Scaffold the palette file

```bash
just new-palette my-theme
# Creates src/palettes/my-theme.css from the template
```

### Step 2: Fill in the color values

Open `src/palettes/my-theme.css` and define all `--hp-*` variables inside the `[data-palette="my-theme"]` selector:

```css
[data-palette='my-theme'] {
  --hp-crust: #1a1a2e;
  --hp-mantle: #1e1e32;
  --hp-base: #24243e;
  --hp-surface-0: #2a2a4a;
  --hp-surface-1: #323256;
  --hp-surface-2: #3a3a62;
  --hp-overlay-0: #44447a;
  --hp-overlay-1: #505090;
  --hp-overlay-2: #6060a0;
  --hp-subtext-0: #a0a0c0;
  --hp-subtext-1: #b0b0d0;
  --hp-text: #e0e0f0;
  --hp-red: #ff6b6b;
  --hp-green: #51cf66;
  --hp-yellow: #ffd43b;
  --hp-blue: #339af0;
  --hp-purple: #cc5de8;
  --hp-pink: #f06595;
  --hp-orange: #ff922b;
  --hp-teal: #20c997;
  --hp-sky: #22b8cf;
  --hp-accent: #339af0;
  --hp-shadow: rgba(0, 0, 0, 0.3);
}
```

All 22 variables must be defined. Missing variables will cause visual breakage.

### Step 3: Import in global.css

Add an `@import` for your palette in `src/styles/global.css`:

```css
@import '../palettes/my-theme.css';
```

### Step 4: Add to config

Add `"my-theme"` to the `palette.available` array in `hyprfolio.config.yaml`:

```yaml
palette:
  available:
    - catppuccin-mocha
    - my-theme
```

### Step 5: Verify

1. Start the dev server: `just dev`
2. Switch to your palette using the palette switcher in the Waybar
3. Check that all UI elements have proper colors
4. Verify WCAG AA contrast between text and background colors

---

## How to Add a New Window Type

### Step 1: Create the component

Create a new file at `src/windows/MyWindow.astro`:

```astro
---
interface Props {
  title?: string;
}

const { title = 'My Window' } = Astro.props;
---

<div class="my-window">
  <!-- Your window-specific toolbar/chrome here -->
  <div class="my-window-toolbar">
    <span style="color: var(--hp-subtext-0);">{title}</span>
  </div>

  <!-- Content slot -- tile content renders here -->
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
    padding: 0.5rem;
    background: var(--hp-mantle);
    border-bottom: 1px solid var(--hp-surface-0);
  }

  .my-window-content {
    flex: 1;
    overflow: auto;
    padding: 1rem;
    background: var(--hp-base);
  }
</style>
```

Key requirements:

- Must include a `<slot />` where tile content will render
- All colors must use `--hp-*` variables
- Use scoped `<style>` for component styles

### Step 2: Register the window type

Add your window to the resolver in `src/lib/windows.ts`:

```typescript
import MyWindow from "../windows/MyWindow.astro";

// Add to the window map
"my-window": MyWindow,
```

### Step 3: Use in config

Reference your window type in `hyprfolio.config.yaml`:

```yaml
tiles:
  - content: about
    windowType: my-window
    colSpan: 6
    title: 'My Custom Window'
```

---

## How to Add a New Tile Content Type

### Step 1: Create the component

Create a new file at `src/tiles/MyTile.astro`:

```astro
---
import { loadConfig } from '../lib/config';

const config = await loadConfig();

// Read from the relevant config section
const data = config.mySection;
---

<div class="my-tile">
  <!-- Render your content here -->
  {
    data && (
      <div>
        <h3 style="color: var(--hp-accent);">{data.title}</h3>
        <p style="color: var(--hp-text);">{data.description}</p>
      </div>
    )
  }
</div>

<style>
  .my-tile {
    padding: 1rem;
    font-family: 'JetBrains Mono', monospace;
    color: var(--hp-text);
  }
</style>
```

Key requirements:

- Read data from config via `loadConfig()`, never hardcode content
- All colors must use `--hp-*` variables
- Use scoped `<style>` for component styles

### Step 2: Register the tile content type

Add your tile to the resolver in `src/lib/tiles.ts`:

```typescript
import MyTile from "../tiles/MyTile.astro";

// Add to the tile map
"my-tile": MyTile,
```

### Step 3: Use in config

Reference your tile content in `hyprfolio.config.yaml`:

```yaml
tiles:
  - content: my-tile
    windowType: terminal
    colSpan: 6
    rowSpan: 1
```

---

## How to Add a New Config Section

### Step 1: Define the Zod schema

Add your schema to `src/lib/schema.ts`:

```typescript
const myNewSectionSchema = z.object({
  title: z.string(),
  items: z.array(
    z.object({
      name: z.string(),
      description: z.string().optional(),
    }),
  ),
});
```

### Step 2: Add to the root config schema

In the same file, add your section to the main config schema:

```typescript
const hyprfolioConfigSchema = z.object({
  // ... existing sections
  myNewSection: myNewSectionSchema.optional(),
});
```

### Step 3: Use the type

The TypeScript type is automatically derived via `z.infer<>`. You can use it in components:

```typescript
import type { HyprfolioConfig } from '../types/config';

// config.myNewSection is fully typed
```

No manual type definitions needed -- the Zod schema is the single source of truth.

---

## Testing Checklist

Before submitting a pull request, run through this checklist:

### Automated checks

```bash
# Run all three at once
just ci
```

This runs:

| Check  | Command             | What it verifies                           |
| ------ | ------------------- | ------------------------------------------ |
| Format | `just format-check` | Code formatting matches Prettier config    |
| Types  | `just typecheck`    | No TypeScript errors                       |
| Build  | `just build`        | Site builds successfully, config validates |

### Manual checks

- [ ] **Config validation**: `just validate` passes with no errors
- [ ] **Dev server**: `just dev` starts without warnings
- [ ] **Visual check**: Open `localhost:4321` and verify your changes look correct
- [ ] **Palette switching**: Switch between palettes and verify colors are correct
- [ ] **Responsive**: Resize the browser to check mobile/tablet breakpoints
- [ ] **Print**: Press `Ctrl+P` and verify the print layout is clean
- [ ] **Accessibility**: Tab through the page and verify focus indicators work
- [ ] **Reduced motion**: Enable "reduce motion" in OS settings and verify animations are disabled

---

## File Size Budget

Hyprfolio has a strict file size budget to keep the site fast. All contributions must stay within these limits:

| Asset                           | Budget       |
| ------------------------------- | ------------ |
| HTML                            | < 50 KB      |
| CSS (all palettes)              | < 30 KB      |
| JavaScript                      | < 5 KB       |
| Fonts (WOFF2)                   | < 100 KB     |
| **Total (excluding wallpaper)** | **< 185 KB** |

If your change increases bundle size, note it in the PR description with a justification. Adding a new palette CSS file adds minimal weight (~1 KB), but be mindful of new JavaScript or font additions.

You can check the built output size after running `just build` by inspecting the `dist/` directory.

---

## Questions?

If you have questions about contributing, open a [GitHub Issue](https://github.com/christian-deleon/hyprfolio/issues) and tag it with the `question` label.
