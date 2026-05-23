# Gray Sunderland — Portfolio

A handbuilt product & UX design portfolio. No frameworks, no dependencies — just HTML, CSS, and a small JS file.

## File structure

```
/
├── index.html              ← Homepage
├── css/
│   ├── main.css           ← Design system + homepage styles
│   └── case-study.css     ← Case study page styles
├── js/
│   └── main.js            ← Live clock, scroll reveals, marquee
├── projects/
│   ├── project-01.html    ← Case studies (template + 5 duplicates)
│   ├── project-02.html
│   ├── project-03.html
│   ├── project-04.html
│   ├── project-05.html
│   └── project-06.html
└── images/                 ← Drop project images here
```

## Running it locally

Because the site uses relative paths and JavaScript, you'll want a local server. Two easy options:

### Option 1 — Python (preinstalled on Mac)
```bash
cd gray-sunderland-portfolio
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

### Option 2 — VS Code Live Server extension
Install the "Live Server" extension, open the folder, right-click `index.html` → "Open with Live Server".

### Option 3 — Just open the file
You can also double-click `index.html` to open it in a browser. Most things will work, but the live clock requires the page to be served (not opened as a file:// URL on some browsers). The site will still look right.

## Replacing placeholders with real content

### Hero (index.html, line ~32)
The 3-line hero title is split into spans for the staggered rise-in animation. Edit each `<span>` inside `.line`:
```html
<h1 class="hero-title">
  <span class="line"><span>Designing</span></span>
  <span class="line"><span>products that</span></span>
  <span class="line"><span>earn their place.</span></span>
</h1>
```

### Marquee images (index.html, line ~52)
Replace each placeholder tile with a real image:
```html
<!-- BEFORE -->
<div class="marquee-tile placeholder"><span>01 / Preview Image</span></div>

<!-- AFTER -->
<div class="marquee-tile"><img src="images/marquee-01.jpg" alt="Project preview"></div>
```

### Work items (index.html, line ~92)
Replace each `<a class="work-item-media placeholder">` block:
```html
<!-- BEFORE -->
<a href="projects/project-01.html" class="work-item-media placeholder">
  <span>Project 01 — Hero</span>
</a>

<!-- AFTER -->
<a href="projects/project-01.html" class="work-item-media">
  <img src="images/project-01-hero.jpg" alt="Project One hero">
</a>
```

Then update the metadata, title, and description in the `.work-item-info` block.

### Case study pages (projects/project-01.html, etc.)
Same pattern. Each `.cs-cover.placeholder`, `.cs-media-full.placeholder`, and `.cs-media-tile.placeholder` becomes an image:
```html
<!-- BEFORE -->
<div class="cs-cover placeholder">
  <span>Cover Image / Hero Asset</span>
</div>

<!-- AFTER -->
<div class="cs-cover">
  <img src="../images/project-01-cover.jpg" alt="Project One">
</div>
```

Note the `../images/` path — case study pages live in `/projects/` so they reach up one level.

## Customizing the design

All design tokens are in `css/main.css` at the top under `:root`. Change a color or font there and it updates everywhere:

```css
:root {
  --bg: #F1EDE8;          /* Background warm off-white */
  --ink: #1A1A1A;         /* Primary text */
  --ink-soft: #4A4744;    /* Secondary text */
  --ink-mute: #8A8580;    /* Labels, metadata */
  --line: rgba(26, 26, 26, 0.12);
  /* ... */
}
```

## Live clock

The footer clock pulls the user's local time by default. If you'd rather show *your* local time (e.g. "MELBOURNE" or "LONDON"), edit the `data-tz` and `data-tz-label` attributes on the clock element:

```html
<span class="clock" data-clock data-tz="Australia/Melbourne" data-tz-label="MELBOURNE">—</span>
```

## What's included

- ✅ Sticky nav with scroll state
- ✅ Hero with staggered line-rise animation
- ✅ Infinite horizontal marquee (pauses on hover)
- ✅ Alternating work grid (image-left / image-right)
- ✅ Scroll-triggered reveals (with reduced-motion fallback)
- ✅ Testimonials block
- ✅ Studio news grid (4 cards)
- ✅ Live clock in footer
- ✅ Animated wordmark in footer
- ✅ Case study template with sticky section labels
- ✅ Metrics tiles for outcomes
- ✅ "Next project" link at bottom of each case study (chained 1→2→3→4→5→6→1)
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Honors `prefers-reduced-motion`
- ✅ Semantic HTML, accessible

## Notes for deployment

When you're ready to ship: this is plain static HTML. Drop it on Netlify, Vercel, Cloudflare Pages, or GitHub Pages — no build step needed. Just upload the folder.

For best performance, also:
1. Compress your project images (use Squoosh or ImageOptim, target ~200KB per image)
2. Consider `loading="lazy"` on images below the fold
3. Convert to WebP for ~30% smaller files
