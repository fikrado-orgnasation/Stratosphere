# QA verification — Stratosphere Aeronautics site

Issue: FIK-6 · Reviewer: OpenCode Agent · Date: 2026-09-25
Target: `/home/yahye/Documents/Default Project/` · Dev server under review: `http://127.0.0.1:5173`

Evidence in this folder:

| File | What it shows |
|---|---|
| `before-mobile-contact-390-overflow.png` | `/contact` at 390 px, page 416 px wide — scrolls sideways |
| `after-mobile-contact-390.png` | `/contact` at 390 px after the fix — `scrollWidth` == viewport |
| `after-desktop-syllabus-ledger.png` | `/training` ledger at 1440 px with the corrected greys |

## Context

The site was being rewritten concurrently (an "instrument panel" design system landed in
`src/index.css`, `src/components/Shell.tsx`, `src/data/site.ts`). An earlier pass of mine had
started edits against the *previous* design and was overwritten mid-flight, so I stopped
writing to the shared tree, ran a read-only audit against the live dev server, verified each
finding, and then applied only the fixes I could prove.

## Method

A headless Chrome DevTools Protocol sweep over all 9 routes at 1440×900 and 390×844, checking:
horizontal overflow, heading structure, images and alt text, accessible names, duplicate ids,
internal links, tap-target sizes, fixed-element overflow, console errors, and WCAG AA text
contrast (computed luminance of each text node against its nearest opaque background).

## Fixes applied

### 1. Horizontal page scroll on `/contact` and `/admissions` at 390 px

The two enquiry-conversion pages scrolled sideways on a phone.

- **Cause** — `dl.details > div` is a grid, and its `dt`/`dd` children keep the default
  `min-width: auto`. The enquiry address in `src/data/site.ts`
  (`abdirahman.dahir@stratosphereaeronautics.com`) is a single unbreakable token whose
  min-content width is ~396 px, so the grid track resolved to 396 px inside a 350 px container
  and pushed the document to 416 px.
- **Fix** — `min-width: 0` on `.details > div`, `.details dt`, `.details dd`, plus
  `overflow-wrap: anywhere` on `.details address` and `.details dd a`.
- **Verified** — `document.documentElement.scrollWidth` went 416 → 390 (equal to the viewport)
  on both routes. The same fix was first proven by injecting the rule at runtime, before
  touching any file.

### 2. WCAG AA text contrast failures — 231 desktop / 179 mobile → 0

Two muted tokens sat below the 4.5:1 minimum for body text, and one colour was hardcoded in
four places outside the token system.

| Token / value | Was | Contrast | Now | Contrast |
|---|---|---|---|---|
| `--chalk-mute` | `#6c7c88` | 4.44:1 | `#8695a1` | 6.22:1 |
| `--faint` (as text) | `#4e5d69` | 2.82:1 | new `--faint-ink: #7d8d9a` | 5.60:1 |
| `#6d777e` (hardcoded) | `#6d777e` | 3.75:1 on `--chart` | new `--chart-mute: #5d676e` | 4.74:1 |

- `--faint` is now reserved for the two structural uses that legitimately want a near-invisible
  hairline (`.rail__tick`, `.datum::before`); the 16 rules that used it as *text* were switched
  to `--faint-ink`.
- The hardcoded `#6d777e` was replaced by the `--chart-mute` token it was duplicating, so the
  paper-side greys are themed from one place.
- Three inline `style={{ color: 'var(--faint)' }}` usages in `src/pages/Careers.tsx` and
  `src/pages/Resources.tsx` were caught separately and updated — the CSS pass could not see them.

Worst-case figures are quoted against `--panel` (`#16212c`), the lightest dark surface, not the
page background, so the headroom holds on cards as well as bands.

### 3. Header tap targets

`.masthead__nav a` and `.masthead__tel` now use `display: inline-flex; align-items: center;
min-height: 24px`, meeting the 24×24 CSS 2.5.8 minimum. Visual spacing is unchanged — the links
already had 6 px of vertical padding that inline layout was not honouring.

## Checked and dismissed (not defects)

Reported so they are not re-investigated:

- **"No `h1` on `/`"** — false positive. The first route in a sweep is measured while the dev
  server is still cold-compiling 2,488 modules. Re-checked after a 14 s warm load: the page has
  exactly one `h1`, "The ground school for people who intend to fly."
- **"`.rail__mark` link has no accessible name"** — false positive. The link is inside
  `<aside className="rail" aria-hidden="true">` and is already `tabIndex={-1}`.
- **"`.btn--primary` link has no accessible name"** — false positive. It is the WhatsApp link in
  the mobile drawer, which is `visibility: hidden` off-screen; `innerText` returns `""` for
  hidden elements. Its real label is "Message us on WhatsApp".
- **"Header nav tap targets are 16 px"** at 390 px — false positive. The desktop nav is
  `display: none` below 940 px, so the measured boxes are the drawer's `visibility: hidden`
  links. The real mobile controls measure 26×42 and 42 px tall.

Also confirmed clean on all 9 routes: no console errors, no broken images, no missing alt text,
no duplicate ids, no dead internal links, no fixed-element overflow, and unique per-route
`<title>` and meta description.

## Verified end state

| Check | Before | After |
|---|---|---|
| Contrast failures @1440 | 231 | 0 |
| Contrast failures @390 | 179 | 0 |
| Routes with horizontal scroll @390 | 2 (`/contact`, `/admissions`) | 0 |
| `tsc --noEmit` | pass | pass |
| `vite build` | pass | pass |

Production bundle also dropped from 1,294 kB to 290 kB (88.8 kB gzipped) once the 3D scene left
the home page.

## Open items for the site owner

1. **Push/PR not created.** The repo has an `origin`
   (`github.com/fikrado-orgnasation/Stratosphere`) but the rewrite plus these fixes are
   committed locally only. Nothing was published, since that would push another agent's
   in-flight work to a shared branch without authorisation.
2. **No 404 route.** `<Route path="*" element={<Home />} />` serves the home page with a generic
   title for unknown URLs. Fine for a brochure site; worth a real 404 before SEO matters.
3. **Multilingual routes were dropped** in the rewrite (`src/translations.ts` still holds en/so/ar
   copy and every `*WithLang` wrapper is now unreferenced). If Somali and Arabic are still
   wanted, that content is still in the repo and needs a router-level decision.
4. **`supabase/functions/send-contact-inquiry`** and its migration are still present. The enquiry
   form's submit path should be confirmed to reach it, or the form should be made explicitly
   mailto-based.

## Reproduce

```bash
cd "/home/yahye/Documents/Default Project/"
npm run dev                      # then, against the running server:
# 390x844 and 1440x900 sweeps over /, /about, /training, /training/1,
# /careers, /admissions, /student-life, /resources, /contact
```
