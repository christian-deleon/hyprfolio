# Print Resume

Hyprfolio includes a complete print stylesheet that transforms the desktop into a professional resume when printed.

## Table of Contents

- [How It Works](#how-it-works)
- [What Changes in Print Mode](#what-changes-in-print-mode)
- [Generating a PDF](#generating-a-pdf)
- [Customizing Print Output](#customizing-print-output)
- [Tips for Clean PDFs](#tips-for-clean-pdfs)

---

## How It Works

The file `src/styles/print.css` contains a `@media print` block that overrides the desktop layout with a clean, single-column resume format. When you print the page (or save as PDF), the browser applies these styles automatically. No JavaScript is involved.

The `PrintHeader` component (`src/components/PrintHeader.astro`) is hidden on screen (`display: none`) but becomes visible in print mode. It renders your name, headline, and contact info as a resume header.

---

## What Changes in Print Mode

| Element                             | Screen                     | Print                                       |
| ----------------------------------- | -------------------------- | ------------------------------------------- |
| Waybar (status bar)                 | Visible                    | Hidden                                      |
| Wallpaper background                | Visible                    | Hidden (white background)                   |
| Window chrome (borders, title bars) | Visible                    | Hidden                                      |
| Palette switcher                    | Visible                    | Hidden                                      |
| Clock widget                        | Visible                    | Hidden                                      |
| Tile grid                           | CSS Grid, multi-column     | Single column, block layout                 |
| Tile animations                     | Active                     | Disabled                                    |
| Tile hover effects                  | Active                     | Disabled                                    |
| PrintHeader (name, title, contact)  | Hidden                     | Visible                                     |
| Colors                              | Palette colors             | Black text on white                         |
| Font                                | JetBrains Mono NF / Inter  | Inter / system-ui / Courier New (monospace) |
| Font size                           | 13-14px                    | 11pt                                        |
| Links                               | Styled with palette colors | Black, underlined, URL appended             |

### Specific CSS overrides

- `html, body`: White background, black text, Inter/system-ui font, 11pt size
- `.tile-grid`: `display: block` (single column), no padding or gaps
- `.tile-item`: `break-inside: avoid`, no border/radius/shadow/background
- `.terminal-text`: Courier New monospace, 10pt, black
- Links: URL is appended after the link text (e.g., "GitHub (https://github.com/user)")
- Internal and JavaScript links: URL is not appended
- Page margins: 0.75 inches, US Letter size

---

## Generating a PDF

### Method 1: Browser Print Dialog

1. Open your Hyprfolio site in a browser (Chrome or Firefox recommended)
2. Press `Ctrl+P` (Windows/Linux) or `Cmd+P` (macOS)
3. Set **Destination** to "Save as PDF"
4. Verify the preview looks correct
5. Click **Save**

### Method 2: Chrome CLI (headless)

For automated PDF generation:

```bash
# Build the site first
just build

# Serve locally
npx serve dist &

# Generate PDF
google-chrome --headless --disable-gpu --print-to-pdf=resume.pdf http://localhost:3000

# Or with Chromium
chromium --headless --disable-gpu --print-to-pdf=resume.pdf http://localhost:3000
```

---

## Customizing Print Output

### Hiding specific tiles from print

Add a CSS class to tiles you want to hide in print, then add a rule to `src/styles/print.css`:

```css
@media print {
  .no-print {
    display: none !important;
  }
}
```

### Adjusting page layout

The default page setup is US Letter with 0.75-inch margins. To change it, edit the `@page` rule in `src/styles/print.css`:

```css
@page {
  margin: 1in; /* Wider margins */
  size: A4; /* A4 paper instead of Letter */
}
```

### Changing print font size

Edit the `html, body` rule in the print stylesheet:

```css
@media print {
  html,
  body {
    font-size: 10pt !important; /* Smaller for more content */
  }
}
```

---

## Tips for Clean PDFs

1. **Use Chrome or Chromium** for the most consistent print rendering. Firefox works but may handle some CSS properties differently.

2. **Disable headers and footers** in the print dialog. Browser-added page URLs and dates clutter the resume.

3. **Check page breaks**. The `break-inside: avoid` rule on `.tile-item` prevents tiles from being split across pages. If a tile is too tall, it will push to the next page.

4. **Keep tile content concise**. Print works best when content fits on 1-2 pages. Long experience histories or many projects may overflow.

5. **Test with `Ctrl+P` preview** before generating the final PDF. The browser print preview shows exactly what the output will look like.

6. **Background graphics setting**. If colors or backgrounds appear missing, enable "Background graphics" in the print dialog. However, the print stylesheet intentionally removes most backgrounds for a clean black-and-white output.

7. **Link URLs**. The print stylesheet appends link URLs after anchor text (e.g., "GitHub (https://github.com/user)"). Internal anchors (`#section`) and JavaScript links are excluded.
