# sidakp.com — website design handoff

Personal portfolio + book-review site for **Sidak Plaha**. This file is a handoff so a
new chat can continue the design work without being re-briefed. Read it fully before
making changes.

---

## 0. How to work on this project (read first)

- **Environment:** Windows, PowerShell. Repo lives at
  `D:\Users\Sidak's PC\Documents\Uni\Portfolio\sidakp.github.io`.
- **Review locally before publishing.** Sidak wants to see changes locally first.
  Default to *not* pushing. Open a page to review with:
  `Start-Process "D:\Users\Sidak's PC\Documents\Uni\Portfolio\sidakp.github.io\<file>.html"`
- **Publishing = pushing `main`.** The site auto-deploys from GitHub `main` via Vercel.
  Only push when Sidak explicitly says so.
- **The agent cannot push `main` itself** (a safety classifier blocks it). When Sidak
  approves a deploy, have *him* run it in-session with the `!` prefix:
  `! git -C "D:\Users\Sidak's PC\Documents\Uni\Portfolio\sidakp.github.io" push origin main`
  (Committing locally is fine and not blocked.)
- **Response style:** concise, no tool-call narration. Markdown tables use minimum
  separators (`|-|-|`); never box-drawing/ASCII-art tables.
- End commit messages with:
  `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`

---

## 1. Hosting & deployment

- **Host:** Vercel, auto-deploying from GitHub repo `github.com/sidakp/sidakp.github.io`,
  branch `main`. (Repo name is a leftover from GitHub Pages days; Vercel is the live host.)
- **Domain:** `sidakp.com` **308-redirects to `www.sidakp.com`** — the canonical URL is the
  `www` one. Browsers and `curl -L` follow it fine; keep it in mind when testing APIs.
- Vercel auto-detects serverless functions in the `/api` folder — no `vercel.json` needed.

---

## 2. Design system

Dark, minimal, refined. Subtle motion only. Sidak likes elements that are quiet in the
periphery and resolve on hover / direct attention (sliding underlines, translucent bits).

- **Background:** `#000`.  **Primary text:** `#eae8e3`.
- **Fonts (self-hosted woff2 in `/fonts`):**
  - `Satoshi` (sans) — headings, nav, labels, UI chrome.
  - `Erode` (serif) — body / review prose.
  - No external font CDNs currently. (An earlier bookshelf concept used Google Fonts
    "Patrick Hand"/"Caveat"; that concept was scrapped and the file deleted.)
- **Accent:** `--accent: #c3955b` (warm gold). On the homepage it's also settable via the
  DCLogic script's `accentColor` prop.
- **Text selection:** `rgba(167,139,250,0.22)` (soft purple).
- **Cards/panels:** bg `#050505`, border `1px solid #181816`, radius 8–12px; hover raises
  border toward `#24211e`/`#2c2620` and lifts slightly.
- **Shared tokens** (`:root` in both `pages.css` and inline in `index.html`):
  `--pad: 52px`, `--page-w: 1180px`, `--h1: 74px`, plus body/label/meta sizes. Responsive
  overrides at `max-height:780px`, `max-width:980px`, `max-width:560px`.

### Header / nav convention (identical on every page)
- **Centred nav**, order: `home · experience · books · writing`. Centred via
  `position:absolute; left:50%; translateX(-50%)`.
- **No logo mark.** The top-left is intentionally empty — Sidak plans to put something
  there later (idea floated: an ASCII white circle). Don't re-add a logo unasked.
- Each nav link has a **thin white underline that wipes in left→right** on hover/focus
  (`::after`, `transform: scaleX(0→1)`, `transform-origin:left`). The **current page**
  shows the underline persistently and uses colour `#a5a39d`; mark it with
  `aria-current="page"`.
- **Content sits low** so the top-centre isn't cramped under the nav: `.page-shell`
  `padding-top: 148px` (responsive: 118/150/128); homepage `.landing` `padding-top: 140px`
  (responsive: 112/146/124).

---

## 3. File map

| File | Purpose |
|-|-|
| `index.html` | Homepage. **Self-contained** (inline `<style>`), wrapped in `<x-dc>` with a `DCLogic` script that sets `--accent` and the title. Landing = intro copy + side column (experience & research panels). Research panel links to the j2-adr repo. |
| `Portfolio.dc.html` | Design-export **source** of the homepage. **Not served.** If you regenerate the homepage from this, re-apply the homepage edits (nav, spacing, view counter, github link) — otherwise they're lost. Prefer editing `index.html` directly. |
| `pages.css` | Shared stylesheet for **all** subpages (everything except `index.html`). |
| `experience.html` | Experience list (composites, tutoring, J2 research). |
| `books.html` | Book list — the main books hub (see §4). |
| `writing.html` | Writing page — still a **stub** ("Notes" placeholder). Not yet designed. |
| `book-*.html` (×5) | Individual review pages: `piranesi`, `the-sword-of-kaigen`, `the-burning-god`, `the-dragon-republic`, `the-poppy-war`. |
| `reviews.js` | Cover **lightbox** on review pages: click/Enter the cover to blow it up centred; click/Esc to close. Loaded only on `book-*.html`. |
| `views.js` | Translucent **view-counter** widget, injected bottom-centre (see §5). Loaded on all pages. |
| `api/views.js` | Vercel serverless function backing the counter (Upstash Redis). |
| `uploads/covers/*.jpg` | Book cover images. |
| `fonts/` | Satoshi + Erode woff2. |
| `favicon.svg`, `CNAME`, `.nojekyll`, `support.js` | Favicon, custom domain, and the DC runtime for `index.html`. |

---

## 4. Books feature (the main recent work)

**Concept:** informal, unserious book reviews. Cover-led list → click through to a full
review page.

- **`books.html` list:** vertical stack, **newest read at the top**. Each row is one big
  `<a class="book-card">` (cover left ~116×174, then title / author · year / status).
  Hover lifts the card + brightens; gold focus ring for keyboard.
- **Reading order** (oldest→newest; display reverses this so newest is on top):
  The Poppy War → The Dragon Republic → The Burning God → The Sword of Kaigen → Piranesi.
- **No numeric ratings.** Sidak finds star ratings hard to assign. Instead:
  - Finished books show a **"Did I enjoy this? ✓ Yes"** pill (`.enjoy`).
  - In-progress books show a **"Currently reading"** gold pill (`.reading-now`, no dot).
    Piranesi is currently the only one "currently reading".
- **Review pages (`book-*.html`):** "← all books" back link, hero (cover ~184px +
  title/author/year + status pill + genre tags), then `.review-body` prose. Use
  `<p class="pull">…</p>` for a pull-quote (gold left border). Cover is click-to-zoom.
- **Reviews are placeholders.** All five `.review-body` blocks currently say
  "Review coming soon." — Sidak will write the real ones himself. Earlier AI-drafted
  reviews and one-line teasers were deliberately removed so nothing fabricated is published
  under his name. Don't invent opinions/ratings for him.

### Adding a new book
1. Drop the cover in `uploads/covers/<slug>.jpg`.
2. Add a `book-card` to `books.html` at the correct spot for read-order (newest on top),
   with either the enjoy pill or the currently-reading pill.
3. Copy an existing `book-*.html` as a template; swap cover/title/author/year/tags and set
   `.review-body` to "Review coming soon." (or the real review). Keep both
   `<script src="./reviews.js">` and `<script src="./views.js">` before `</body>`.
4. `aria-current="page"` stays on the `books` nav link for review pages.

---

## 5. View counter

Site-wide total page views, shown faintly bottom-centre.

- **Front end (`views.js`):** injects a fixed, bottom-centre element; `POST`s `/api/views`
  and shows `"N views"`. Colour `rgba(234,232,227,0.16)` (barely visible in the periphery),
  brightening to `0.5` on hover. If the count is unavailable (local dev, no KV) the widget
  **stays hidden** — no errors. So it never shows locally; only on the deployed site.
- **Back end (`api/views.js`):** Vercel serverless function. Increments Upstash key
  `pageviews` via the Upstash REST API and returns `{ views: N }`. Reads env vars
  `KV_REST_API_URL` and `KV_REST_API_TOKEN` (auto-injected when the Upstash/Vercel KV
  integration is connected — **already set up** by Sidak).
- **Scope:** one shared `pageviews` key = a single site-wide total across all pages. To do
  **per-page** counts instead, key by pathname (e.g. `views:${path}`).
- **Reset the count** (testing inflated it to ~19): in the Upstash console run
  `SET pageviews 0`, or via REST:
  `curl -X POST "$KV_REST_API_URL/set/pageviews/0" -H "Authorization: Bearer $KV_REST_API_TOKEN"`.

---

## 6. Open threads / TODO

- Write the five real book reviews (replace "Review coming soon.").
- Decide what goes in the empty **top-left** header slot (ASCII white circle idea).
- **`writing.html`** is still an undesigned stub.
- Optional: reset the inflated view count; consider per-page counts.
- If ever regenerating the homepage from `Portfolio.dc.html`, re-apply homepage edits.

---

## 7. About Sidak (context, not required reading)

Final-year MEng Aerospace student at QMUL (composites, orbital mechanics). Leads the
Formula Student composites team; tutors 11+ through IB. The site's research/experience
content reflects this. Reviews and taste skew toward fantasy (R.F. Kuang, M.L. Wang,
Susanna Clarke so far).
