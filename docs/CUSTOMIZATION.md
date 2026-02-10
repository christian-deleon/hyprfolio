# Customization

How to create custom palettes, window types, and tile content types.

---

## Creating a Custom Palette

### 1. Scaffold the file

```bash
just new-palette my-theme
# Creates src/palettes/my-theme.css from the template
```

### 2. Fill in all `--hp-*` values

Open `src/palettes/my-theme.css` and define all 22 variables inside the `[data-palette="my-theme"]` selector. See any existing palette in `src/palettes/` for reference.

All variables must be defined: `crust`, `mantle`, `base`, `surface-0` through `surface-2`, `overlay-0` through `overlay-2`, `subtext-0`, `subtext-1`, `text`, `red`, `green`, `yellow`, `blue`, `purple`, `pink`, `orange`, `teal`, `sky`, `accent`, `shadow`.

### 3. Import in global.css

Add an `@import` for your palette in `src/styles/global.css`:

```css
@import '../palettes/my-theme.css';
```

### 4. Add to config

Add `"my-theme"` to the `palette.available` array in `hyprfolio.config.yaml`:

```yaml
palette:
  available:
    - catppuccin-mocha
    - my-theme
```

### 5. Verify

Start the dev server (`just dev`), switch to your palette via the Waybar switcher, and verify all UI elements have proper colors. Ensure WCAG AA contrast between text and background colors.

---

## Creating a New Window Type

Window types provide application-specific chrome (toolbars, status bars) around tile content. See existing components in `src/windows/` for reference.

### 1. Create the component

Create `src/windows/MyWindow.astro` with:

- An `interface Props` with any props you need (e.g., `title`)
- A `<slot />` where tile content will render
- Scoped `<style>` using only `--hp-*` variables for colors

### 2. Register in the resolver

Add your window to the map in `src/lib/windows.ts`:

```typescript
'my-window': MyWindow,
```

Also add `'my-window'` to `WindowTypeEnum` in `src/lib/schema.ts`.

### 3. Use in config

```yaml
tiles:
  - content: about
    windowType: my-window
    title: 'My Custom Window'
```

---

## Creating a New Tile Content Type

Tile content components read config data and render formatted content inside a window type. See existing tiles in `src/tiles/` for reference.

### 1. Create the component

Create `src/tiles/MyTile.astro` that:

- Imports and calls `loadConfig()` to read data from config
- Renders formatted HTML
- Uses scoped `<style>` with only `--hp-*` variables for colors

### 2. Register in the resolver

Add your tile to the map in `src/lib/tiles.ts`:

```typescript
'my-tile': MyTile,
```

Also add `'my-tile'` to `TileContentEnum` in `src/lib/schema.ts`.

### 3. Use in config

```yaml
tiles:
  - content: my-tile
    windowType: terminal
    colSpan: 6
    rowSpan: 1
```

---

## Adding a New Config Section

### 1. Define the Zod schema

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

### 2. Add to the root config schema

In the same file, add your section to the main config schema:

```typescript
const hyprfolioConfigSchema = z.object({
  // ... existing sections
  myNewSection: myNewSectionSchema.optional(),
});
```

### 3. Use the type

The TypeScript type is automatically derived via `z.infer<>`. No manual type definitions needed.
