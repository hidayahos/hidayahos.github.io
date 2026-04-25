# Hidayah OS - GitHub Pages Deployment

## Quick Start (3 Steps)

### 1. Build Locally
```bash
pnpm install
pnpm run build
```

The site builds to `/out` as pure static HTML/CSS/JS.

### 2. Push to GitHub
```bash
git add .
git commit -m "Build: prepare for GitHub Pages"
git push origin main
```

### 3. Enable GitHub Pages
1. Go to Settings → Pages
2. Select "Deploy from a branch"
3. Branch: `main` | Folder: `/ (root)` or `./out`
4. Save

**Your site lives at:** `https://<username>.github.io/hidayah-os/`

## Technical Details

### Configuration
- **Static Export**: `next.config.mjs` → `output: 'export'`
- **No Telemetry**: Removed all analytics packages
- **Zero Server Code**: Pure HTML/CSS/JS output
- **Privacy First**: No external trackers or telemetry

### Build Output
- Outputs to: `/out`
- Time: ~30 seconds
- Size: ~2.5MB
- Pages: 1 (index.html + assets)

### GitHub Actions (Optional)
Already configured in `.github/workflows/deploy.yml` for automatic deployment on every push.

## Troubleshooting

**Build fails?** 
- Run: `pnpm install`
- Check: Node 18+

**Site not showing?**
- Pages Settings → Build source = `/ (root)`
- Wait 2-3 minutes for deployment
- Check: Actions tab for build logs

**404 errors?**
- GitHub Pages fallback: `/404.html`
- Already configured

## SEO & Meta
- ✅ robots.txt configured
- ✅ sitemap.xml generated
- ✅ OpenGraph meta tags
- ✅ Favicon: `/hidayah-os-icon.png`

## Customization

**Change site domain** in future deployment:
- Update `CNAME` file with custom domain (if using)
- Or use GitHub's default: `username.github.io`

**Development**:
```bash
pnpm run dev  # localhost:3000
pnpm run build  # production build
```

---

**Status**: ✅ Ready for production deployment
