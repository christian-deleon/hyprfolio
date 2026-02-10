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
the description. If no arguments are provided, analyze ALL uncommitted changes.

## Autonomy

Use best judgment to bucket and commit changes without prompting for approval.
Only ask the user if the description provided is too vague to determine scope.

## Step-by-Step Workflow

```
1. GATHER all uncommitted changes
   git status / git diff / git diff --staged

2. ANALYZE each changed file
   - What type of change? (fix, feat, refactor, docs, style, chore, etc.)
   - What scope? (config, layout, tiles, windows, palette, waybar, styles, lib, etc.)
   - What is the logical purpose?

3. BUCKET into logical groups
   Each bucket = one commit. Never mix unrelated changes.

4. COMMIT each bucket
   Stage ONLY the files in that bucket (never git add -A or git add .)
   Use conventional commit format: <type>(<scope>): <description>

5. SHOW the results
   Run git log --oneline to show the new commits.
```

## Commit Message Format

Use conventional commits: `<type>(<scope>): <description>`

**Subject line only** for straightforward changes:

- `fix(palette): prevent stale localStorage from blocking system detection`
- `chore: update .gitignore for local claude config`

**Subject + body** when conversation context explains _why_ the change was made:

```
fix(palette): prevent stale localStorage from blocking system detection

The respectSystem config option was bypassed whenever a palette had been
previously selected via the dropdown. Track manual selections with a
separate localStorage flag so system preference detection still works.
```

Keep the body concise (2-4 sentences). Focus on _why_, not a line-by-line _what_.
