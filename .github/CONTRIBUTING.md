# Contributing to Hyprfolio

Thanks for your interest in contributing!

---

## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [just](https://github.com/casey/just) command runner (recommended) or use `npm run` directly

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

### Commands

| Command                   | Description                                 |
| ------------------------- | ------------------------------------------- |
| `just install`            | Install npm dependencies                    |
| `just dev`                | Start Astro dev server (`localhost:4321`)    |
| `just build`              | Production build to `dist/`                 |
| `just preview`            | Preview production build locally            |
| `just validate`           | Run config validation standalone            |
| `just format`             | Format all files with Prettier              |
| `just format-check`       | Check formatting (CI-friendly)              |
| `just typecheck`          | TypeScript type checking via `astro check`  |
| `just clean`              | Remove `dist/`, `.astro/`, and module cache |
| `just ci`                 | Run format-check + typecheck + build        |
| `just new-palette <name>` | Scaffold a new palette from the template    |

---

## Commit Messages

Use [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<optional scope>): <short description>
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
docs: update deployment guide
refactor: extract window border logic into shared mixin
chore: update astro to 5.3.0
```

---

## Pull Request Process

1. **Create a branch** from `main`:

   ```bash
   git checkout -b feat/my-new-feature
   ```

2. **Make your changes** following the rules in [CLAUDE.md](../CLAUDE.md) (colors, types, no frameworks, config-driven).

3. **Run the full CI check** before pushing:

   ```bash
   just ci    # runs format-check + typecheck + build
   ```

4. **Push** to your fork and **open a pull request** against `main`.

### PR Guidelines

- Keep PRs focused -- one feature or fix per PR
- Include before/after screenshots for visual changes
- Update documentation if your change affects user-facing behavior
- Ensure all CI checks pass before requesting review

---

## Testing Checklist

### Automated

```bash
just ci    # format-check + typecheck + build
```

### Manual

- [ ] Dev server starts without warnings (`just dev`)
- [ ] Visual check at `localhost:4321`
- [ ] Palette switching works correctly
- [ ] Responsive layout at mobile/tablet breakpoints
- [ ] Print layout is clean (`Ctrl+P`)
- [ ] Keyboard navigation and focus indicators work

---

## File Size Budget

| Asset                           | Budget       | Current |
| ------------------------------- | ------------ | ------- |
| HTML                            | < 55 KB      | ~53 KB  |
| CSS (all palettes)              | < 45 KB      | ~40 KB  |
| JavaScript                      | < 5 KB       | ~0 KB   |
| Fonts (WOFF2)                   | < 100 KB     | ~90 KB  |
| **Total (excluding wallpaper)** | **< 185 KB** | ~183 KB |

Note size changes in your PR description. For adding palettes, window types, and tile content types, see [docs/CUSTOMIZATION.md](../docs/CUSTOMIZATION.md).

---

## Questions?

Open a [GitHub Issue](https://github.com/christian-deleon/hyprfolio/issues) with the `question` label.
