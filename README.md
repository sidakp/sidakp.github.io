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
- End commit messages with the Co-Authored-By trailer for whichever Claude model
  is doing the work, e.g. `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`

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
  DCLogic script's `accentColor` prop. **Gold text is reserved for links that leave the
  site** (Sidak's rule); internal links use the neutral `.text-link.internal` variant
  (`#a5a39d`), and `.back-link` hover brightens to `#c8c6c0` instead of gold.
- **Text selection:** `rgba(167,139,250,0.22)` (soft purple).
- **Cards/panels:** bg `#050505`, border `1px solid #181816`, radius 8–12px; hover raises
  border toward `#24211e`/`#2c2620` and lifts slightly.
- **Shared tokens** (`:root` in both `pages.css` and inline in `index.html`):
  `--pad: 52px`, `--page-w: 1180px`, `--h1: 74px`, plus body/label/meta sizes. Responsive
  overrides at `max-height:780px`, `max-width:980px`, `max-width:560px`.

### Header / nav convention (identical on every page)
- **Centred nav**, order: `home · experience · books · thoughts`. Centred via
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
| `experience.html` | Experience list (composites, tutoring, J2 research). Composites entry links to `composites.html`. |
| `books.html` | Book list — the main books hub (see §4). |
| `thoughts.html` | Thoughts page (renamed from "writing"; `writing.html` is now just a meta-refresh redirect to it). Still mostly a placeholder. |
| `composites.html` | Formula Student composites landing page: per-project sections with dashed `figure.photo-slot` placeholders. Prose is "Write-up coming." — Sidak writes the real content. |
| `404.html` | Styled not-found page. |
| `book-*.html` (×5) | Individual review pages: `piranesi`, `the-sword-of-kaigen`, `the-burning-god`, `the-dragon-republic`, `the-poppy-war`. |
| `reviews.js` | Cover **lightbox** on review pages: click/Enter the cover to blow it up centred; click/Esc to close. Loaded only on `book-*.html`. |
| `views.js` | Translucent **visitor-counter** widget (see §5). Loaded **only on `index.html`**. |
| `api/views.js` | Vercel serverless function backing the counter (Upstash Redis, unique visitors). |
| `notes.js` | Renders the **"Reading log"** on `book-*.html` from `notes/<slug>.json` (see §6). |
| `notes/` | Published reading-log JSON, generated by `tools/publish-notes.ps1`. |
| `tools/publish-notes.ps1` | Converts Obsidian reading notes → `notes/*.json` (see §6). |
| `reveal.js` | IntersectionObserver scroll-reveal for cards/entries on subpages; no-ops under reduced motion. |
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
3. Copy an existing `book-*.html` as a template; swap cover/title/author/year/tags, the
   meta/OG tags in `<head>`, and set `.review-body` to "Review coming soon." (or the real
   review). Keep the `reviews.js`, `notes.js`, `reveal.js` and `background.js` script tags
   before `</body>` (no `views.js` — that's homepage-only now).
4. `aria-current="page"` stays on the `books` nav link for review pages.
5. If it'll have reading notes, create `<slug>.md` in the vault's
   `reading list\reading notes\` folder (see §6).

---

## 5. Visitor counter

**Unique visitors**, homepage only, shown faintly bottom-centre.

- **Front end (`views.js`):** loaded only by `index.html`. `POST`s `/api/views` and shows
  `"N visitors"`. Desktop: fixed bottom-centre. **Mobile (≤560px): static, in normal flow
  after the footer** — only visible when scrolled to the very bottom. Colour
  `rgba(234,232,227,0.16)`, brightening to `0.5` on hover. If the count is unavailable
  (local dev, no KV) the widget **stays hidden** — no errors.
- **Back end (`api/views.js`):** hashes `first x-forwarded-for IP + user-agent + salt`
  (SHA-256; salt from optional env `VISITOR_SALT`, no raw IPs stored), pipelines
  `SADD visitors <hash>` + `SCARD visitors` via the Upstash REST API, and returns
  `{ views: scard }`. Same-device refreshes/revisits never increment. Reads env vars
  `KV_REST_API_URL` and `KV_REST_API_TOKEN` (already connected by Sidak).
- The old inflated `pageviews` key is simply unused now — the `visitors` set started from
  zero. Reset if ever needed: `DEL visitors` in the Upstash console.

---

## 6. Reading-notes pipeline (Obsidian → book pages)

Sidak's routine: read some pages → jot a dated note in Obsidian → publish to the site.

- **Source:** vault folder `D:\Users\Sidak's PC\Documents\Sidak\reading list\reading notes\`.
  One `<slug>.md` per book, slug matching the site's `book-<slug>.html`. Entries look like
  `## 2026-07-02 21:40 pp. 120-158` followed by free-form paragraphs (`*em*`/`**strong**`
  supported). Time and pages are both optional; no `|` separators (Sidak's 60% keyboard),
  though a stray `|` is tolerated. Dates render as "July 2nd". Files starting `_` are ignored
  (`_template.md` documents the format). Currently only `piranesi.md` exists (empty).
- **Publish:** run `tools\publish-notes.ps1` (or Sidak tells Claude "publish my notes").
  It writes `notes/<slug>.json`, newest entry first. Review, commit, Sidak pushes.
- **Render:** `notes.js` on each `book-*.html` fetches its JSON and appends a
  **"Reading log"** section after `.review-body` (styles in `pages.css`: `.reading-log`,
  `.log-entry`). Empty or missing JSON → the section never appears.

---

## 7. Background — SETTLED: plain #000

A canvas background layer (starfield/contours/grain variants) was built, tried, and
**removed at Sidak's request** — the site stays plain black. If it's ever revisited, the
implementation lives in git history (`background.js`, removed 2026-07-05); the gotcha to
remember: body's opaque `#000` paints over negative-z-index fixed elements, so the body
background must be made transparent for any canvas layer to show.

---

## 8. Open threads / TODO

- Write the five real book reviews (replace "Review coming soon.").
- Write the composites project prose and drop photos into `composites.html`'s slots.
- Decide what goes in the empty **top-left** header slot (ASCII white circle idea).
- `thoughts.html` entry copy is still placeholder-ish until real thoughts exist.
- If ever regenerating the homepage from `Portfolio.dc.html`, re-apply homepage edits
  (nav rename, view counter, panel links, meta tags, reduced-motion guard).

---

## 9. About Sidak (context, not required reading)

Final-year MEng Aerospace student at QMUL (composites, orbital mechanics). Leads the
Formula Student composites team; tutors 11+ through IB. The site's research/experience
content reflects this. Reviews and taste skew toward fantasy (R.F. Kuang, M.L. Wang,
Susanna Clarke so far).
