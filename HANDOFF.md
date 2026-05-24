# Gray Sunderland Portfolio — Build Handoff

**Read this entire document before making changes. Every decision below was made deliberately across multiple rounds of feedback. Do not undo locked-in choices unless I explicitly request it.**

---

## 0. WHO THIS IS FOR

**Gray Sunderland** is the user. He's a senior product / UI / UX / brand designer based in Australia, doing this since **2011**. Embedded deep in web3 since the early days. Co-founder of Motherbird AI. He's built brands and products for Solana, Solana Foundation, Superteam, Samsung, Hype DC, Acclaim, Baby Bunting, Tommee Tippee, Cobram Estate — and hundreds more.

X handle: `@gray_chromatic`
Email: `hello@graysunderland.com`
Old site (for reference, not to copy): `https://graysunderland.com`

**Communication style:** Direct. Short messages. Wants brutal honesty over false confidence. He's on mobile most of the time and can't run code — he relies on screenshots and visual verification. **Always show your work via screenshots before claiming completion.**

---

## 1. CURRENT BUILD LOCATION & STATE

**Files live at:** `/mnt/user-data/outputs/gray-sunderland-portfolio/`
**Zipped output:** `/mnt/user-data/outputs/gray-sunderland-portfolio.zip`

**Current file structure:**
```
gray-sunderland-portfolio/
├── HANDOFF.md          ← this file
├── README.md            ← user-facing notes
├── index.html           ← homepage (16K, ~260 lines)
├── css/
│   ├── main.css         ← (~24K, ~900 lines)
│   └── case-study.css   ← case study styles (orphaned, see §6)
├── js/
│   └── main.js          ← (~8K, ~200 lines)
├── images/
│   ├── marquee-01.png   ← Solana iPhone-in-hand mockup (user-uploaded)
│   └── logos/           ← 11 SVG client logos
└── projects/
    └── project-01.html ... project-06.html  ← case study templates (orphaned, see §6)
```

**Status:** V1 ready to ship. Homepage complete. Case study pages exist but are not linked from anywhere — all 6 work tiles link to external URLs (real client sites) and open in new tabs.

---

## 2. DESIGN TOKENS (LOCKED — DO NOT CHANGE WITHOUT ASKING)

- **Background:** warm off-white `#F1EDE8` (`--bg`)
- **Ink:** near-black `#1A1A1A` (`--ink`)
- **Ink soft:** muted gray for secondary text (`--ink-soft`)
- **Ink mute:** even more muted for tertiary (`--ink-mute`)
- **Lines:** `--line` (border), `--line-soft` (divider)
- **Fonts:**
  - `Inter` — body and most UI (weights 300, 400, 500, 600, 700)
  - `JetBrains Mono` — accents, mono labels (weights 400, 500)
  - `Space Grotesk` — brand wordmark only (weights 500, 600, 700)
- **Hero font scale:** `clamp(2.5rem, 5.5vw, 5.5rem)` desktop, `clamp(1.75rem, 7.5vw, 2.5rem)` mobile
- **Border radius:** `--radius` for tiles
- **Gutter:** `clamp(20px, 4vw, 48px)` page padding
- **Easing:** `--ease`, `--ease-out` — see CSS file
- **Durations:** `--dur` (0.4s default), `--dur-fast` (0.2s)

---

## 3. HERO (LOCKED IN ROUND 9)

**The hero is the most-iterated piece. Do not change it without explicit user instruction.**

### Copy
```html
<h1 class="hero-title">
  <span class="hero-line">Product, UI, UX</span>
  <span class="hero-line">&amp; brand. Shipped</span>
  <span class="hero-line hero-line--typed">
    <span class="hero-typed-text" data-typed></span><span class="hero-typed-caret" aria-hidden="true"></span>
  </span>
</h1>
```

### Rotation phrases (in `js/main.js`)
Each completes "Product, UI, UX & brand. Shipped ___":
```js
const words = [
  'since\u00A02011.',
  'through every\u00A0cycle.',
  "for the world's\u00A0best.",
  'before the\u00A0playbook.',
  'since the early\u00A0days.'
];
```
Note the `\u00A0` (non-breaking spaces) — these prevent widow words on narrow viewports. **Do not remove them.**

### Hero behaviors (DO NOT BREAK)
- **No italics** on typed text. Just `color: var(--ink-soft)` weight 500.
- **Locked in place** — `min-width: 23ch` + `white-space: nowrap` so layout never reflows mid-animation. **This is critical** — earlier versions had clunky line-jumps which the user explicitly hated.
- **Vertically centered** between nav bottom and marquee top — uses explicit `padding-top: clamp(220px, 32vh, 340px)` + `padding-bottom: 40px` rather than flex-center because nav is fixed-positioned and overlays content.
- **Marquee peeks** at the bottom of the viewport (~140px visible).
- **Mobile:** smaller font via `@media (max-width: 560px)` so all rotation phrases fit one line.

---

## 4. NAV (BLACK, LOCKED IN ROUND 8)

- Background: `rgba(20, 20, 20, 0.92)` with backdrop-blur
- Brand wordmark: `Space Grotesk 700` uppercase, white, **NO dot before name**
- Nav links: white
- Contact CTA: **inverted pill** — white background, ink text (because nav is black)
- Hidden on mobile: Work / Clients / About links (only Contact pill shows)

---

## 5. SECTION-BY-SECTION SPEC

### Marquee
- 12 portrait 4:5 tiles
- Uses 4 distinct real images rotated through the 12 slots (no two same images adjacent)
- Pattern (slots 1–12): 01, 02, 03, 04, 02, 01, 04, 03, 01, 04, 02, 03
- JS duplicates them at runtime for seamless loop
- `padding-top: 0` so the hero's `padding-bottom` IS the visual gap

### About statement (3 paragraphs)
First paragraph is large display type. Paragraphs 2 and 3 are smaller body text. **All copy is real, pulled from old site:**
1. *"Designing the layer between idea and reality since 2011 — half designer, half experimental lab. Embedded in web3 since the early days, when the category didn't have a name."*
2. Client list paragraph (Solana, Solana Foundation, Superteam, Samsung, Hype DC, Acclaim, Baby Bunting, Tommee Tippee, Cobram Estate)
3. *"The work spans product, UI, UX, brand, and the messy middle where strategy meets pixel. The thread: shipping ideas before they become trends."*

All have `&nbsp;` between last two words of each paragraph to prevent widows.

### Work grid (3×2, 6 tiles)
**Current state (v1.1):**
- 6 tiles, real project names + real URLs, all `target="_blank"`
- **Row 1 (real images, real brands):**
  1. Solana (`marquee-04.png`) → solana.com — "Solana — 2026"
  2. Superteam (`marquee-01.png`) → superteam.fun — "Superteam — 2025"
  3. Acclaim (`marquee-02.png`) → acclaimmag.com — "Acclaim — 2024"
- **Row 2:**
  4. Sorted (`marquee-03.png`) → paymentsorted.com — "Sorted — 2026"
     ⚠️ Brand is **"Sorted"** (P2P payments app for Australia), NOT "Payment Sorted". Domain happens to be `paymentsorted.com` but the product is just Sorted. Don't relabel.
  5. Cypherpunks (`marquee-04.png` placeholder) → cypherpunks.app — "Cypherpunks — 2024"
  6. Mong (`marquee-04.png` placeholder) → mong.life — "Mong — 2023"
- Tiles 5 & 6 reuse the Solana image as placeholder until real assets arrive
- Hover: image scales `1.3` (30% zoom), dark gradient overlay appears with project name

### Marquee image filename → content mapping (LOCKED — don't reassign)
- `marquee-01.png` = Superteam laptop image (1122×1402)
- `marquee-02.png` = Acclaim magazine cover (1200×1500)
- `marquee-03.png` = Sorted phone-on-beach lifestyle shot (1200×1500)
- `marquee-04.png` = Solana iMac product shot (1122×1402)

**Lesson learned:** the file order on disk does NOT match the visual order in chat upload messages. Always verify image contents by viewing the file before assigning to tiles.

### Clients (3×3 grid, 9 logos)
- Title: **"Some brands I have worked with…"** (with non-breaking space before "with")
- 9 logos in exactly this order:
  1. Solana → solana.com
  2. Solana Foundation → solana.org
  3. Superteam → superteam.fun
  4. Samsung → samsung.com
  5. Acclaim → **acclaimmag.com** (user confirmed in round 8)
  6. Hype DC → hypedc.com
  7. Baby Bunting → babybunting.com.au
  8. Tommee Tippee → tommeetippee.com (uses `client-logo--mark-lg`, 60% larger)
  9. Cobram Estate → cobramestate.com.au (uses `client-logo--mark-md`, 20% larger)
- Removed in round 8: Nike, RMIT, "+ more" sentinel — **do not bring these back**
- All logos forced monotone via `filter: brightness(0)` + `opacity: 0.55`, hover lifts to opacity 1
- Each wrapped in `<a target="_blank" rel="noopener">`
- Generous inset padding via `padding-inline: clamp(0px, 6vw, 96px)` on the grid
- Mobile stays at 3 columns (not 2) for grid integrity

### Testimonials
Three placeholder blockquotes. User will send real ones later. Each has `&nbsp;` before the last word for widow protection.

### Footer
- Tagline (1st column): *"Designing the layer between idea and reality since 2011. Half designer, half experimental lab. Based in Australia."*
- "Start a project" CTA pill below tagline
- Three columns of links:
  - **Index** — Work, Clients, About, Contact
  - **Elsewhere** — X (@gray_chromatic), Motherbird AI, PayToll
  - **Studio** — Live clock (Australia/Sydney, label "AEST"), Australia, By appointment
- Giant `GRAY SUNDERLAND` SVG wordmark — uses `textLength="1000"` + `lengthAdjust="spacingAndGlyphs"` so it scales to fit container without clipping. **Do not change this technique** — earlier text-based approaches had clipping issues across viewports.
- Bottom row: `© 2026` + `Designed and built with care.`

---

## 6. CASE STUDY PAGES (CURRENTLY ORPHANED)

`/projects/project-01.html` through `project-06.html` exist as polished templates but are **not linked from the homepage**. All work tiles link to external URLs instead.

**To flip case studies back on later** (when user has real content):
1. In `index.html`, find each `<a href="https://[external-url]" target="_blank" rel="noopener" class="work-tile">`
2. Replace href with `projects/project-01.html` etc.
3. Remove `target="_blank" rel="noopener"`

The case study templates use `css/case-study.css` which is also currently orphaned but ready to go.

---

## 7. CRITICAL THINGS THE USER CARED ABOUT (DO NOT BREAK)

### 7.1 No widows or orphans, ever
- Body has `text-wrap: pretty`
- Headings + blockquotes + key elements have `text-wrap: balance`
- All paragraphs use `&nbsp;` between last two words
- Multi-word typed rotation phrases bound with `\u00A0`
- **When adding any new text content, follow this pattern**

### 7.2 Custom cursor
- White circle with `mix-blend-mode: difference` (appears black on cream bg, white on dark imagery — adaptive)
- 12px idle, 44px on links with a "+" symbol inside
- **Only active on `(hover: hover) and (pointer: fine)`** — touch devices use native cursor
- Native cursor hidden via `cursor: none` on `html`, `body`, links
- Implemented in `js/main.js` with rAF lerp at 0.22 for smooth follow
- **Do not change the difference blend mode** — earlier "pure black" versions disappeared against dark imagery

### 7.3 Work tile hover zoom is 30%
- `transform: scale(1.3)` on hover, 1s transition
- Not 1.04, not 1.5 — **30%**

### 7.4 Typed text is NOT italic
- Earlier rounds had `font-style: italic` — user removed it explicitly
- Current state: same weight as static text, slightly softer color (`--ink-soft`)

### 7.5 Mobile must be optimized
- Hero font drops to `clamp(1.75rem, 7.5vw, 2.5rem)` on `<560px`
- Clients grid stays 3 columns on mobile (do not drop to 2 — breaks the 3×3 grid)
- Work grid drops to 1 column on `<560px`
- All hover states have static fallback on mobile (e.g. work tile overlay always visible)

---

## 8. PENDING / FLAGGED ITEMS

### ✅ RESOLVED: hypeDC.svg renders as "LIMIT'D"
Confirmed correct by user — LIMIT'D is a Hype DC sub-brand Gray worked on. **Do not replace this file.**
Note: HTML comment in the clients section may still reference this as a flag — safe to remove on next pass.

### 🚩 Awaiting from user (per their last messages)
- **Distinct images for Cypherpunks and Mong tiles** — currently using Solana iMac as placeholder
- **Real case study content** (text + images) — user said ~1 week to prep
- **Real testimonials** with real client names/companies
- **LinkedIn URL confirmation** — currently guessed at `linkedin.com/in/graysunderland`
- More marquee imagery is welcome — current 4 cycle fine but more variety = better

### Image spec already sent to user (for when they're ready):
- Hero/cover images: portrait 4:5, minimum 1200×1500px, ideal 1600×2000px
- Case study body images: mix of 16:10 landscape (min 2000×1250px) and 4:5 portrait
- Marquee tiles: 12–18 portrait 4:5, min 800×1000px
- Naming: `project-01-hero.jpg`, `project-01-body-01.jpg`, `marquee-01.jpg`
- File size target: 150–400KB each (JPG q80–85 or WebP)

### Text template per project (already sent):
Name, Client, Year, Role, Scope, Team, Live link, Hero description (one line shown on grid hover), Tagline, Problem (2–4 sentences + 3 bullets), Approach (3–6 sentences), Outcome (1–3 sentences + 3 metrics).

---

## 9. TECHNICAL SETUP — HOW TO TEST

**Spin up a server:**
```bash
cd /mnt/user-data/outputs/gray-sunderland-portfolio
python3 -m http.server 8765
```

**Visual audit script template** (Playwright):
```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    for vp_name, w, h in [("desktop", 1440, 900), ("tablet", 834, 1112), ("mobile", 390, 844)]:
        ctx = browser.new_context(viewport={"width": w, "height": h}, device_scale_factor=2)
        page = ctx.new_page()
        page.goto("http://localhost:8765/index.html", wait_until="networkidle")
        page.wait_for_timeout(2500)
        page.evaluate("document.documentElement.style.scrollBehavior = 'auto'")
        # Pre-scroll to fire IntersectionObserver reveals
        page.evaluate("""async () => {
          const step = window.innerHeight * 0.6;
          const total = document.body.scrollHeight;
          for (let y = 0; y < total; y += step) {
            window.scrollTo(0, y);
            await new Promise(r => setTimeout(r, 200));
          }
          window.scrollTo(0, 0);
          await new Promise(r => setTimeout(r, 300));
        }""")
        page.screenshot(path=f"/home/claude/audit-{vp_name}-top.png", full_page=False)
        page.screenshot(path=f"/home/claude/audit-{vp_name}-full.png", full_page=True)
        ctx.close()
    browser.close()
```

**Resize tall screenshots before viewing** (Playwright `full_page=True` can be huge):
```python
from PIL import Image
img = Image.open("file.png")
if img.height > 7800:
    ratio = 7800 / img.height
    img.resize((int(img.width * ratio), 7800), Image.LANCZOS).save("file-resized.png")
```

**Re-zip after changes:**
```bash
cd /mnt/user-data/outputs && rm -f gray-sunderland-portfolio.zip && \
  zip -r gray-sunderland-portfolio.zip gray-sunderland-portfolio/ > /dev/null
```

**Then call `present_files`** with the zip path so the user gets it.

---

## 10. ITERATION HISTORY — WHAT WAS TRIED AND REJECTED

Reading these will save you from re-suggesting things he's already rejected:

- **Italic typed text** — rejected round 7
- **Multi-line wrapping typed phrase that jumps the layout** — rejected round 6 ("looks clunky")
- **Generic agency copy** (e.g. "Trusted by ambitious teams worldwide") — replaced round 8
- **"+ more" sentinel** in clients — removed round 8
- **Nike and RMIT logos** — removed round 8 (user explicit)
- **Section eyebrows** (small uppercase "Selected Work" / "About" labels) — removed round 4
- **4-column clients grid** — replaced with 3×3 round 8
- **Two "Gray Sunderland" wordmarks in footer** — simplified to one round 7 (copyright now just "© 2026")
- **The "dot" before brand name in nav** — removed round 7
- **Pure black cursor that disappeared on dark imagery** — replaced with `mix-blend-mode: difference` round 7
- **Reserved width for typed word in middle of phrase (caused huge gap)** — restructured so typed word lives at END of phrase round 6
- **CSS-driven footer wordmark (clipped at certain viewports)** — replaced with SVG `textLength` technique round 7

---

## 11. WHAT TO DO IN THE NEXT CHAT

1. **First message:** Read this HANDOFF.md before doing anything else.
2. **Confirm the user can upload images** — that's why they're starting a new chat (they hit upload limits).
3. **Ask what they want to work on next.** Likely candidates:
   - Replacing `marquee-01.png` with their new uploads
   - Adding distinct images per work tile
   - Real testimonials
   - Real case study content (text + images)
   - Replacing the broken `hypeDC.svg`
   - Any new visual / copy direction
4. **Always run a visual audit (screenshots) before claiming work is done.**
5. **Use `present_files` to deliver the zip** at the end of meaningful work.

---

## 12. ONE-LINE CHEAT SHEET

**Edgy senior product/UI/UX/brand designer, 14+ years experience, embedded in web3, based in Australia, building Motherbird AI. Honest tone, hates fluff, mobile-first reviewer, demands visual proof of every change.**
