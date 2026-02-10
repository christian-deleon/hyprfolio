---
name: commit
description: Categorize all uncommitted changes into logical buckets and commit each one separately using conventional commits.
argument-hint: "[description of changes to commit]"
disable-model-invocation: true
---

# Smart Commit

## Usage

```
/commit                    — analyze all changes, bucket them, and commit each bucket
/commit the palette fix    — only commit changes matching the description
/commit just the tile work — only commit tile-related changes
```

When `$ARGUMENTS` is provided, scope the analysis to only changes matching
the description. If the description is vague or matches multiple unrelated
changes, ask the user to clarify.

If no arguments are provided, analyze ALL uncommitted changes.

## Autonomy

Use best judgment to bucket and commit changes without prompting for approval.
Only ask the user if the description provided is too vague to determine scope.

## Step-by-Step Workflow

```
1. GATHER all uncommitted changes
   git status
   git diff
   git diff --staged

2. ANALYZE each changed file
   - What type of change is it? (fix, feat, refactor, docs, style, chore, etc.)
   - What scope does it belong to? (config, layout, tiles, windows, palette, waybar, styles, lib, etc.)
   - What is the logical purpose of the change?

3. BUCKET changes into logical groups
   Group files that:
   - Solve the same bug
   - Implement the same feature
   - Belong to the same refactor
   - Are part of the same config/chore update
   Each bucket = one commit. Never mix unrelated changes in a bucket.

4. COMMIT each bucket
   For each bucket:
   a. Stage ONLY the files in that bucket (git add <specific files>)
   b. Commit with a conventional commit message
   c. Never use git add -A or git add .

5. SHOW the results
   Run git log --oneline to show the new commits with their hashes.
```

## Bucketing Rules

### Group Together
- A tile component + its config section if changed for the same reason
- A window component + its resolver registration for the same feature
- Multiple files touched by the same bug fix
- Related style changes across global CSS and component styles
- Layout + component changes for the same visual adjustment

### Keep Separate
- Bug fixes vs. feature additions — always separate commits
- Config content changes vs. component logic changes — separate unless tightly coupled
- Code changes vs. documentation — separate commits
- Style/formatting fixes — separate from logic changes
- Palette CSS changes vs. palette switching logic

### Commit Message Format

Use conventional commits: `<type>(<scope>): <description>`

**Subject line only** (no conversation context about the change):
- `fix(palette): prevent stale localStorage from blocking system detection`
- `chore: update .gitignore for local claude config`

**Subject + body** (conversation context exists about the issue, feature, or motivation):
When the conversation leading up to `/commit` discusses an issue, feature,
bug, or any context explaining *why* the change was made, include a commit
body separated by a blank line. Pull the context from the conversation —
do not ask the user to re-explain.

```
fix(palette): prevent stale localStorage from blocking system detection

The respectSystem config option was bypassed whenever a palette had been
previously selected via the dropdown. Track manual selections with a
separate localStorage flag so system preference detection still works.
```

```
refactor(education): replace man page format with compact layout

The man page sections (NAME, SYNOPSIS, DESCRIPTION, COURSES) were
overwhelming when repeated for multiple entries. Simplified to a clean
format with institution, dates, and courses on fewer lines.
```

Keep the body concise (2-4 sentences). Focus on *why* the change was made
and any non-obvious decisions, not a line-by-line summary of *what* changed.

### Scope Guidelines

| Scope | When to use |
|-------|-------------|
| `config` | Changes to `hyprfolio.config.yaml` |
| `layout` | Changes in `src/layouts/` |
| `tiles` | Changes in `src/tiles/` |
| `windows` | Changes in `src/windows/` |
| `palette` | Palette switching, CSS, or palette config |
| `waybar` | Waybar component changes |
| `styles` | Global CSS in `src/styles/` |
| `lib` | Resolver, schema, config loader, SEO changes in `src/lib/` |
| `about` | About tile specifically |
| `education` | Education tile specifically |
| `deps` | Dependency updates |
| _(omit)_ | Cross-cutting or root-level changes |
