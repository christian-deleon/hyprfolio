# Deployment Guide

How to deploy your Hyprfolio site to various hosting platforms.

## Table of Contents

- [Prerequisites](#prerequisites)
- [GitHub Pages](#github-pages)
- [Vercel](#vercel)
- [Netlify](#netlify)
- [Cloudflare Pages](#cloudflare-pages)
- [Self-Hosted: Nginx](#self-hosted-nginx)
- [Self-Hosted: Caddy](#self-hosted-caddy)
- [Environment Variables](#environment-variables)
- [Custom Domain Setup](#custom-domain-setup)

---

## Prerequisites

Before deploying, verify your site builds correctly:

```bash
# Install dependencies
just install

# Validate your config
just validate

# Run full CI checks (format, typecheck, build)
just ci
```

The build output goes to `dist/`. This is a fully static site -- no server-side runtime required.

**Important**: Update `site.url` in `hyprfolio.config.yaml` and the `site` property in `astro.config.mjs` to match your production URL. This is needed for the sitemap and canonical URLs.

```javascript
// astro.config.mjs
export default defineConfig({
  output: 'static',
  site: 'https://yourdomain.com', // <-- update this
  // ...
});
```

---

## GitHub Pages

GitHub Pages is the recommended deployment target. Use the official Astro GitHub Action for automatic builds.

### Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Navigate to **Settings > Pages**
3. Under **Source**, select **GitHub Actions**

### Step 2: Create the workflow file

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build site
        run: npx astro build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Step 3: Configure for GitHub Pages subdirectory (if needed)

If your site is at `https://username.github.io/repo-name/` (not a custom domain), add a `base` to `astro.config.mjs`:

```javascript
export default defineConfig({
  output: 'static',
  site: 'https://username.github.io',
  base: '/repo-name',
  // ...
});
```

If using a custom domain (e.g., `https://example.com`), no `base` is needed.

### Step 4: Push and deploy

```bash
git add .
git commit -m "Add deployment workflow"
git push origin main
```

The workflow runs automatically on push to `main`. Check the **Actions** tab for build status.

---

## Vercel

Vercel auto-detects Astro projects.

### Step 1: Import your repository

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New Project**
3. Import your GitHub repository
4. Vercel detects the Astro framework automatically

### Step 2: Configure build settings

Vercel should auto-detect these, but verify:

| Setting          | Value           |
| ---------------- | --------------- |
| Framework Preset | Astro           |
| Build Command    | `npm run build` |
| Output Directory | `dist`          |
| Install Command  | `npm install`   |

### Step 3: Set site URL

Update `astro.config.mjs` with your Vercel domain:

```javascript
export default defineConfig({
  output: 'static',
  site: 'https://your-project.vercel.app',
  // ...
});
```

### Step 4: Deploy

Click **Deploy**. Vercel automatically redeploys on every push to `main`.

---

## Netlify

### Step 1: Import your repository

1. Go to [app.netlify.com](https://app.netlify.com) and sign in
2. Click **Add new site > Import an existing project**
3. Connect your GitHub repository

### Step 2: Configure build settings

| Setting           | Value           |
| ----------------- | --------------- |
| Build Command     | `npm run build` |
| Publish Directory | `dist`          |

### Step 3: Create redirects file (optional)

For SPA-like behavior on the 404 page, create `public/_redirects`:

```
/*    /404.html   404
```

### Step 4: Set site URL

Update `astro.config.mjs`:

```javascript
export default defineConfig({
  output: 'static',
  site: 'https://your-site.netlify.app',
  // ...
});
```

### Step 5: Deploy

Click **Deploy site**. Netlify automatically redeploys on push.

---

## Cloudflare Pages

### Step 1: Create a new project

1. Go to the [Cloudflare dashboard](https://dash.cloudflare.com)
2. Navigate to **Workers & Pages > Pages**
3. Click **Create application > Connect to Git**
4. Select your repository

### Step 2: Configure build settings

| Setting                | Value           |
| ---------------------- | --------------- |
| Framework preset       | Astro           |
| Build command          | `npm run build` |
| Build output directory | `dist`          |

### Step 3: Set Node.js version

Under **Environment variables**, add:

| Variable       | Value |
| -------------- | ----- |
| `NODE_VERSION` | `20`  |

### Step 4: Set site URL

Update `astro.config.mjs`:

```javascript
export default defineConfig({
  output: 'static',
  site: 'https://your-project.pages.dev',
  // ...
});
```

### Step 5: Deploy

Click **Save and Deploy**. Cloudflare Pages redeploys on push.

---

## Self-Hosted: Nginx

Build locally and serve the static files with Nginx.

### Step 1: Build the site

```bash
just install
just build
```

### Step 2: Copy dist/ to your server

```bash
rsync -avz dist/ user@server:/var/www/hyprfolio/
```

### Step 3: Nginx configuration

Create `/etc/nginx/sites-available/hyprfolio`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name yourdomain.com;

    root /var/www/hyprfolio;
    index index.html;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Cache static assets
    location ~* \.(css|js|woff2|jpg|jpeg|png|gif|svg|ico|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Serve HTML without .html extension
    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    # Custom 404
    error_page 404 /404.html;
    location = /404.html {
        internal;
    }

    # Gzip compression
    gzip on;
    gzip_types text/html text/css application/javascript application/json image/svg+xml font/woff2;
    gzip_min_length 256;
}
```

### Step 4: Enable the site

```bash
sudo ln -s /etc/nginx/sites-available/hyprfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 5: Add TLS with Certbot

```bash
sudo certbot --nginx -d yourdomain.com
```

---

## Self-Hosted: Caddy

Caddy provides automatic HTTPS with minimal configuration.

### Step 1: Build the site

```bash
just install
just build
```

### Step 2: Copy dist/ to your server

```bash
rsync -avz dist/ user@server:/var/www/hyprfolio/
```

### Step 3: Caddyfile

Create or edit `/etc/caddy/Caddyfile`:

```
yourdomain.com {
    root * /var/www/hyprfolio
    file_server

    # Serve .html files without extension
    try_files {path} {path}.html {path}/index.html

    # Custom 404
    handle_errors {
        rewrite * /404.html
        file_server
    }

    # Cache static assets
    @static {
        path *.css *.js *.woff2 *.jpg *.jpeg *.png *.gif *.svg *.ico *.webp
    }
    header @static Cache-Control "public, max-age=31536000, immutable"

    # Compression
    encode gzip zstd
}
```

### Step 4: Start Caddy

```bash
sudo systemctl enable caddy
sudo systemctl start caddy
```

Caddy automatically provisions and renews TLS certificates from Let's Encrypt.

---

## Environment Variables

Hyprfolio is fully config-driven. All settings live in `hyprfolio.config.yaml`, not in environment variables. However, some hosting platforms use environment variables for build configuration.

### Platform build variables

| Variable       | Platform         | Purpose             | Example              |
| -------------- | ---------------- | ------------------- | -------------------- |
| `NODE_VERSION` | Cloudflare Pages | Set Node.js version | `20`                 |
| `NPM_FLAGS`    | Netlify          | Override npm flags  | `--legacy-peer-deps` |

### Optional: Site URL from environment

If you want to set the site URL dynamically per environment, you can modify `astro.config.mjs`:

```javascript
export default defineConfig({
  output: 'static',
  site: process.env.SITE_URL || 'https://yourdomain.com',
  // ...
});
```

Then set `SITE_URL` in your hosting platform's environment variables.

---

## Custom Domain Setup

### GitHub Pages

1. Go to **Settings > Pages** in your repository
2. Under **Custom domain**, enter your domain (e.g., `example.com`)
3. Click **Save**
4. Add DNS records at your domain registrar:

| Type    | Name  | Value                |
| ------- | ----- | -------------------- |
| `A`     | `@`   | `185.199.108.153`    |
| `A`     | `@`   | `185.199.109.153`    |
| `A`     | `@`   | `185.199.110.153`    |
| `A`     | `@`   | `185.199.111.153`    |
| `CNAME` | `www` | `username.github.io` |

5. Wait for DNS propagation (up to 24 hours)
6. Check **Enforce HTTPS** once the certificate is provisioned

### Vercel

1. Go to your project **Settings > Domains**
2. Add your custom domain
3. Add DNS records as shown by Vercel:

| Type    | Name  | Value                  |
| ------- | ----- | ---------------------- |
| `A`     | `@`   | `76.76.21.21`          |
| `CNAME` | `www` | `cname.vercel-dns.com` |

### Netlify

1. Go to **Domain management > Add custom domain**
2. Enter your domain
3. Add DNS records:

| Type    | Name  | Value                   |
| ------- | ----- | ----------------------- |
| `A`     | `@`   | Provided by Netlify     |
| `CNAME` | `www` | `your-site.netlify.app` |

Or use Netlify DNS for automatic configuration.

### Cloudflare Pages

1. Go to your Pages project **Custom domains**
2. Add your domain
3. If using Cloudflare DNS, records are added automatically
4. If using external DNS:

| Type    | Name  | Value                    |
| ------- | ----- | ------------------------ |
| `CNAME` | `@`   | `your-project.pages.dev` |
| `CNAME` | `www` | `your-project.pages.dev` |

### After setting up a custom domain

Update the site URL in both places:

```yaml
# hyprfolio.config.yaml
site:
  url: 'https://yourdomain.com'
```

```javascript
// astro.config.mjs
export default defineConfig({
  site: 'https://yourdomain.com',
  // ...
});
```

Rebuild and redeploy for the changes to take effect.
