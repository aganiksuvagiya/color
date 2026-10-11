# HueFlow growth plan: capture the biggest color searches

This is the working plan for the next big HueFlow feature work. It's here so any new chat or session can pick up where the last one stopped. **Update the status checklist at the bottom whenever a step is finished.**

## Branch and deploy rules (read first)

- All of this work happens on the **`feature/new-feature`** branch, which was made from `develop`.
- When a phase is done and checked, merge it into **`develop`**. Production deploys come **only from `develop`**, and only when the owner asks.
- **Never merge `feature/video`** into anything. It holds video projects only.
- Never commit or deploy without the owner asking.

## Why

Research (October 2026, Ahrefs and Semrush data, US monthly searches) shows HueFlow's tools already match the leader, coolors.co:
- The generator has space-to-generate, color locking, undo, image upload, accessibility and colorblind panels, UI preview, an AI prompt bar and 13 export formats.
- There are 20+ tools under `app/tools/`.

The gap is **pages for the searches people make most**:

| Search | Volume/month | Who wins today | HueFlow before this plan |
|---|---|---|---|
| shades of pink / purple / blue | ~240K / ~140K / 81K+ | cssgradient.io (a small site) | No page |
| color palette / palettes / schemes | 192K / 23K / 31K | coolors, colorhunt | 8 palette pages |
| pastel colors | 79K | colorhunt (#3) | No page |
| red (single color names) | 570K | htmlcolorcodes | `/colors/red` is thin |
| hex color / color codes | 60K / 32K | htmlcolorcodes | No chart page |

What we take from each competitor:
- **cssgradient.io:** "shades of" pages
- **colorhunt:** a tagged palette library
- **htmlcolorcodes:** a color chart
- **coolors:** one click from any palette into the generator

All of it is built on the systems already in this repo.

## Phase 1: "Shades of [color]" pages

**URLs:** `/shades-of-blue`, `/shades-of-pink` and so on.
- The pages live at `app/shades/[color]/page.tsx`.
- `next.config.ts` rewrites `/shades-of-:color` to `/shades/:color`.
- `/shades/:color` redirects (301) to `/shades-of-:color`.
- `/shades-of-grey` redirects (301) to `/shades-of-gray`.
- The hub is at `/shades`.
- `dynamicParams = false`, so unknown colors return 404 and the middleware rate limiter isn't needed.

**Colors (12):** blue, pink, purple, green, red, yellow, orange, brown, gray, black, white, teal.

**Data:** `lib/shades-data.ts` holds, for each color:
- the named shades as `[name, hex]` pairs, using standard CSS, X11, Crayola and pigment names
- an intro and usage text
- 4 ready palettes
- 4 FAQs

Helpers in the same file: `getShadeFamily`, `getResolvedShades` (sorted light to dark, with RGB and HSL), `resolveShade` and `shadesPath`.

**What each page shows:**
- A spectrum strip using the palettes-page hover pattern: `group/swatch relative flex-1 transition-[flex] duration-300 hover:flex-[3]`, with a dark pill `bg-black/55` that shows the HEX, then "✓ Copied" after a click.
- A shade grid grouped light / medium / dark, with click-to-copy.
- A names table (Name, HEX, RGB, HSL).
- A tint scale from `generateShades()` in `lib/shades.ts`.
- Ready palettes, each with an "Open in generator" link: `/generator?label=…&c=HEX-HEX`.
- An FAQ.
- Related links: `/colors/[c]`, `/color-meanings/[c]`, `/tailwind/[c]` where it exists, and `/palettes`.

**Structured data:** FAQ, breadcrumb, CollectionPage and WebPage, from `lib/seo/schema.ts`. **Metadata:** `buildPageMetadata` in `lib/seo/page-utils.tsx`.

**Style:** the light theme, with a `bg-[#f0ede8]` page, white `rounded-2xl` cards, `#1c1712` text and the `#e8531f` accent, matching `components/seo/content-page.tsx`.

## Phase 2: Palette library with tag pages

- `lib/palette-library.ts` holds about 200 hand-picked palettes of 4–5 colors each, tagged by color, style (pastel, neon, earthy, vintage, dark, minimal) and season.
- Tag pages at `app/color-palettes/[tag]/page.tsx`, for URLs like `/color-palettes/pastel` and `/color-palettes/blue`. Each has palette cards with copy and "Open in generator", related tags, an intro and an FAQ.
- A hub at `/color-palettes`.
- They sit at a new path on purpose. `/palettes/[slug]` holds single named palettes, and those URLs must not change.
- Link the library from the `/palettes` hub (`components/seo/palettes-hub-page.tsx`).

## Phase 3: Color chart and stronger color pages

- `/color-codes`: a chart of every named color in `lib/color-names.ts`, grouped by hue family using the `hueRules` in `lib/seo/programmatic.ts`. It shows HEX, RGB and HSL, with copy.
- The 13 hand-written colors in `lib/seo/content.ts` get `relatedLinks` to their shades page and palette-library tag page.

## Phase 4: Linking, sitemaps and navigation

- Add `app/sitemap-shades.xml/route.ts` plus palette-library sitemap entries, following `app/sitemap-colors.xml/route.ts` and `lib/seo/sitemaps.ts`, and list them in the `app/sitemap.xml/route.ts` index.
- Add `/shades`, `/color-palettes` and `/color-codes` to `staticPages` in `lib/seo/sitemaps.ts`.
- Add "Shades", "Palettes library" and "Color codes" links to the header (`components/header.tsx`) and footer (`components/footer.tsx`).
- Add a "Popular: Shades of Blue · Pink · Purple" row to the homepage (`components/hueflow-homepage.tsx`).

## Verification (each phase)

1. Run `npm run build` (it type-checks) and `npm run lint`.
2. Run `npm run dev` and check the new pages in the browser:
   - copy, hover and "Open in generator" all work
   - the layout holds on mobile
3. SEO checks:
   - each page has a title, description, canonical and JSON-LD
   - the 301 redirects work
   - unknown slugs return 404
   - the sitemap lists every new page
4. `npm run preview` (the OpenNext Cloudflare build) before any deploy.

## Design updates (2026-10-08, owner-driven)

- **Shades pages:** coolors-style layout.
  - Full width.
  - Family chips at the top.
  - Wide swatches with the code on hover.
  - Light / Medium / Dark group labels.
  - A sticky toolbar with a white backdrop.
  - A colored accent word in the heading (`getFamilyAccent` in `lib/shades-data.ts`).
- **`/shades` hub:** cards show every shade, the accent name, counts and sample names. There's a new "Shade vs tint vs tone" explainer and a visible FAQ with schema.
- **`/colors` hub:**
  - Replaced the generic hub with `components/seo/colors-hub-page.tsx`.
  - All 140 colors coolors-style, with in-page family filters, a HEX/RGB/HSL switch, Grid/List views and a visible FAQ.
  - Open idea: `/colors` and `/color-codes` now overlap, so consider making `/color-codes` canonical to `/colors` or slimming it down.
- **`/palettes`:** new `components/seo/palettes-landing.tsx`, replacing the deleted `palettes-hub-page.tsx`.
  - Header with style chips linking into the library.
  - The 8 curated brand palettes with an in-page industry filter.
  - 9 popular library palettes.
  - Style / color / season tiles, each with a unique preview.
  - Tips and a visible FAQ.
- **Shared swatch strip:** dense strips (more than 12 colors) widen 8× on hover, and the hovered stripe is raised so the hex pill isn't clipped.
- **Homepage:**
  - White theme, with `#F5F5F5` full-width bands on Workspace, Moods and Why.
  - Hero renders visible without JS (`initial={false}`), which fixed a blank hero and the LCP.
  - Orange (`#c2410c`) eyebrows.
  - Dark active states on the mood tabs, and a ring + check on the color swatches.
- **Footer (site-wide):** white, 6 balanced columns, a left block with a description, a brand strip and a "Generate a palette" button. Privacy and Terms appear once.

## Redesign task: move every page to the new design (started 2026-10-08, updated 2026-10-11)

**The task:** the owner is moving the whole site, page by page, to the new coolors-style design. Pages are done one at a time when the owner names a URL. **Reference page: `/palettes`** (`components/seo/palettes-landing.tsx`). Copy its structure for any new page.

### Done (new design, none committed yet)

| Page | URL(s) | Component |
|---|---|---|
| Homepage | `/` | `components/hueflow-homepage.tsx` |
| Footer | site-wide | `components/footer.tsx` |
| Colors hub | `/colors` | `components/seo/colors-hub-page.tsx` |
| Shades hub | `/shades` | `components/seo/shades-page.tsx` (`ShadesHubView`) |
| Shades pages (12) | `/shades-of-[color]` | `components/seo/shades-page.tsx` (`ShadesPageView`) |
| Palettes landing | `/palettes` | `components/seo/palettes-landing.tsx` |
| Trends (2026-10-11) | `/trends` | `components/trends-page.tsx` + `app/trends/page.tsx` |
| Community (2026-10-11) | `/community` | `components/community-gallery.tsx` |
| Color picker tool (2026-10-11) | `/tools/picker` | `components/color-picker.tsx` |
| Contrast checker tool (2026-10-11) | `/tools/contrast` | `components/contrast-checker.tsx` |
| Image colors tool (2026-10-11) | `/tools/image-colors` | `components/image-color-extractor.tsx` |
| Palette visualizer tool (2026-10-11) | `/tools/palette-visualizer` | `components/palette-visualizer.tsx` |
| Color mixer tool (2026-10-11) | `/tools/color-mixer` | `components/color-mixer-tool.tsx` |
| Tailwind scale tool (2026-10-11) | `/tools/tailwind-scale` | `components/tailwind-scale-tool.tsx` |
| Collage creator tool (2026-10-11) | `/tools/collage` | `components/collage-creator.tsx` + `app/tools/collage/page.tsx` (SEO config `collage` added to `lib/seo/tool-pages.ts`, with FAQ/HowTo/WebPage/Breadcrumb schema) |
| Gradient generator tool (2026-10-11) | `/tools/gradient` | `components/gradient-generator.tsx` |

`/tools/picker` also got new features (2026-10-11): "Surprise me" random color, EyeDropper "Pick from screen" (Chrome/Edge only), recent colors (localStorage key `hueflow-picker-recent`, max 10), WCAG contrast for white and black text, 6 color-harmony palettes with "Open in generator", and a shareable `?c=<hex>` link (read on mount, written with `history.replaceState`).

Totals: 15 page types, 26 URLs.

**Shared tool sections:** `components/seo/tool-page-sections.tsx` now has `variant="new"` (white, hairline sections, numbered steps, visible FAQ accordion, related links). Only `/tools/picker`, `/tools/contrast`, `/tools/image-colors`, `/tools/palette-visualizer`, `/tools/color-mixer`, `/tools/tailwind-scale`, `/tools/collage` and `/tools/gradient` use it so far. The other 8 tools still use the old cards. To convert a tool, rebuild its UI in the new design, then pass `variant="new"`.

### `/trends` redesign (2026-10-11)
- Rebuilt on the `/palettes` structure: header (breadcrumb, h1, dots, bold count line, category tabs and Shuffle), then ONE continuous 4-column palette grid (no per-category sections or titles; the owner asked for this), "Explore more palettes" tiles linking into `/color-palettes/<tag>`, tips and a visible FAQ.
- `app/trends/page.tsx` now owns the FAQ and emits FAQ + breadcrumb + WebPage JSON-LD. `TrendsPage` takes `faq` and `explore` props.
- Removed framer-motion and the cream `#faf7f2` background, so the page no longer renders blank before hydration.
- Checked: `tsc` and `eslint` clean; one grid of 11 cards, 4 FAQ items, 12 tiles and the JSON-LD present on the page. Not yet checked: mobile width, shuffle and copy by hand.

### Still on the old design (not started)
- **Growth-plan pages (do these first):** `/color-palettes`, `/color-palettes/[tag]` (`components/seo/palette-library-page.tsx`), `/color-codes` (`components/seo/color-codes-page.tsx`)
- **Single pages:** `/colors/[slug]`, `/palettes/[slug]`, `/css-colors(+slug)`, `/tailwind-colors`, `/tailwind/[slug]`
- **Color topics:** `/color-meanings(+slug)`, `/color-psychology(+slug)`, `/color-combinations(+slug)`, `/brand-colors(+slug)`, `/marketing-colors`, `/gradients(+slug)`
- **Content:** `/best-colors-for(+slug)`, `/guides(+slug)`, `/blog`, `/explainers(+slug)`, `/resources(+slug)`, `/faqs(+slug)`, `/comparisons(+slug)`, `/web-design`, `/accessibility(+slug)`, `/developer(+slug)`, `/explore`
- **Info:** `/about`, `/contact`, `/privacy`, `/terms`
- **Tools:** `/generator`, `/color-wheel`, `/color-picker`, `/color-converter`, `/color-palette-generator`, `/color-palette-from-image`, `/tools/*` (20+, all except `/tools/picker`, `/tools/contrast`, `/tools/image-colors`, `/tools/palette-visualizer`, `/tools/color-mixer`, `/tools/tailwind-scale`, `/tools/collage` and `/tools/gradient`)
- **Header:** site-wide, unchanged. On mobile it fades in after load. Ask the owner before changing it.
- I haven't opened each of these to confirm it's old. They're listed as old because they don't use the new components.

### Recipe for converting a page (copy `/palettes`)
1. Wrapper: `<main className="min-h-screen bg-white text-[#1c1712]"><Header />`.
2. Header section: `px-6 pb-10 pt-28 sm:px-8 lg:px-12`, breadcrumb, `h1` (`text-[2.6rem] sm:text-[3.5rem] font-bold tracking-[-0.035em]`), stacked dots + bold count line (`hub-description`), then chips or tabs.
3. Body: one `<section className="border-t border-black/[0.06]">` per block with `SectionTitle` (from `shades-page.tsx`).
4. Palette cards: `SwatchStrip` + orange `#c2410c` eyebrow + name + hex codes + dark "Open in generator →" and outline "Copy all". Cards are `rounded-2xl ring-1 ring-black/[0.07]`.
5. End with Tips (numbered cards) and a visible FAQ (`<details>`), and emit the same FAQ as JSON-LD from the server `page.tsx`.
6. No framer-motion fade-ins and no cream backgrounds. Keep content server-visible.
7. Keep `tsc` and `eslint` clean, then check the page in the browser.

## Next session: start here (updated 2026-10-08)

**State:**
- Phases 1–4 and all the design updates above are built and checked on `feature/new-feature`.
- **None of it is committed yet. Ask the owner before committing.**
- Nothing is live. hueflow.site still runs `develop` at 5f9311a.

**To do, in order:**
1. **Commit** the work to `feature/new-feature` and push. Ask first. Leave out `tsconfig.tsbuildinfo` (build cache).
2. **Remaining redesigns** in the same coolors-style system, if the owner wants them:
   - `/color-palettes/[tag]` pages and `/color-palettes` hub (still the older card style)
   - `/color-codes`
3. **Overlap:** `/colors` and `/color-codes` now show the same 140 colors. Decide whether to canonicalize `/color-codes` to `/colors` or slim it down.
4. **Header (site-wide):** on mobile it fades in after load, like the old hero did. Ask before changing it, since it affects every page.
5. **Verify:**
   - `npx tsc --noEmit`
   - `npx eslint` on the changed files
   - `npx next build`
   - `opennextjs-cloudflare build` then `opennextjs-cloudflare preview`. Plain `wrangler dev` 404s SSG pages because it skips the cache populate.
6. **Merge** `feature/new-feature` into `develop`. Ask first.
7. **Deploy** from a clean `develop` with `npm run deploy`, only on request. Then submit the sitemap in Google Search Console.

**Design system used (keep it consistent):**
- White pages.
- Full-width sections (`w-full px-6 sm:px-8 lg:px-12`).
- Bold `h1` (`font-bold tracking-[-0.035em]`) with stacked preview dots and a bold count line.
- Eyebrows in `#c2410c` (AA-safe orange).
- Dark `#1c1712` active pills and buttons.
- Coolors-style swatch cards: `aspect-[3/1]`, code on hover, name + copy/eye icons.
- Shared pieces:
  - `SwatchStrip`, `useCopy` in `components/seo/swatch-strip.tsx`
  - `Segmented`, `SectionTitle`, `isLight`, `CopyIcon`, `EyeIcon` exported from `components/seo/shades-page.tsx`
- Sticky toolbar at `lg:top-[86px]`, with a white backdrop while stuck.
- Homepage gray bands are `#F5F5F5`.

## Status

- [x] **Phase 1, shades pages** (built 2026-10-06, not committed yet)
  - [x] Data: `lib/shades-data.ts` (12 colors, 25–38 shades each, 4 palettes, 4 FAQs)
  - [x] View: `components/seo/shades-page.tsx` (`ShadesPageView`, `ShadesHubView`)
  - [x] Routes: `app/shades/[color]/page.tsx`, `app/shades/page.tsx`; rewrites and redirects in `next.config.ts`
  - [x] Verified:
    - `tsc` and `eslint` are clean, and `next build` passes (pages are static SSG)
    - In the browser: copy, hover strip, "Open in generator" and the mobile layout all work
    - `/shades/blue` and `/shades-of-grey` return 308 (permanent), and unknown colors return 404
    - The canonical is correct, with FAQ, breadcrumb and collection JSON-LD
  - [x] The redirects and rewrite are verified under the OpenNext/Cloudflare preview (see Phase 4)
  - Note: sitemap and navigation links for these pages come in Phase 4
  - **Redesign (2026-10-07, owner asked for a cleaner page):**
    - The hero has the title, intro, stats (shades, palettes, formats) and one slim spectrum strip. The orange answer box is gone.
    - One "shade explorer" replaces the grouped grids plus the separate table:
      - All / Light / Medium / Dark filter (empty groups are hidden)
      - HEX / RGB / HSL format switch (it changes the shown and copied code)
      - Grid / List view (both views stay in the DOM for SEO)
    - Simpler cards: swatch, name and code. The tint scale section was removed.
    - Palettes sit in a 2-column grid. Guide and FAQ sit side by side. Other families appear as chips.
    - The `/shades` hub got the same cleaner style.
- [x] **Phase 2, palette library and tag pages** (built 2026-10-07, not committed yet)
  - [x] Data: `lib/palette-library.ts`
    - 220 palettes and 24 tags: 8 styles, 4 seasons, 12 colors
    - Color tags are computed by `colorFamily()`
    - Color tag pages lead with the palettes where that color dominates
    - Every tag has 11–40 palettes
  - [x] Shared swatch strip and copy logic: `components/seo/swatch-strip.tsx` (the shades page now uses it too)
  - [x] View: `components/seo/palette-library-page.tsx` (`PaletteTagView`, `PaletteLibraryHubView`)
  - [x] Routes: `app/color-palettes/page.tsx` (hub) and `app/color-palettes/[tag]/page.tsx` (`dynamicParams = false`)
  - [x] The `/palettes` hub links into the library (`LIBRARY_LINKS` in `palettes-hub-page.tsx`)
  - [x] Verified:
    - `tsc` and `eslint` are clean, and `next build` passes (static)
    - All tag pages return 200, and unknown tags return 404
    - "Copy all", per-color copy and "Open in generator" work, with no console errors
- [x] **Phase 3, color chart and color-page links** (built 2026-10-07, not committed yet)
  - [x] `/color-codes`: `app/color-codes/page.tsx` and `components/seo/color-codes-page.tsx`
    - all 140 named colors, grouped into 12 families with `colorFamily()`, sorted light to dark
    - tiles link to `/colors/[slug]`
    - copy buttons for HEX, RGB and HSL
    - a full table and an FAQ
  - [x] Every `/colors/*` page now links to its family's `/shades-of-*` and `/color-palettes/*` pages
    - done once, in `buildColorRelatedLinks` in `lib/seo/programmatic.ts`
    - `content-page.tsx` gets new "Shades" and "Palette library" related-link groups
  - [x] Verified:
    - `tsc` and `eslint` are clean, and `next build` passes
    - `/color-codes` lists 140 rows
    - navy → blue, tomato → red and camel → brown links are correct
    - no console errors
- [x] **Phase 4, sitemaps, navigation and homepage links** (built 2026-10-07, not committed yet)
  - [x] Sitemaps
    - New `app/sitemap-shades.xml/route.ts` (12 URLs), added to the index (`sitemapFiles`) and to `app/robots.ts`
    - `palettesSitemap` now includes the 24 `/color-palettes/<tag>` pages
    - `/shades`, `/color-palettes` and `/color-codes` are in `staticPages`
  - [x] Header: "Shades" link (`components/header.tsx`)
    - It shows only from `lg` up (`desktopClass`), because at md widths it pushed "Sign in" off-screen
    - It's always in the mobile menu
  - [x] Footer Explore column: Palette Library, Color Shades, Color Codes (`components/footer.tsx`)
  - [x] Homepage: a "Popular:" row under the Discover section (`POPULAR_LINKS` in `components/hueflow-homepage.tsx`)
  - [x] Verified:
    - `tsc` and `eslint` are clean
    - All the sitemaps list the new URLs
    - The header has no overlap at 820px or 1024px
  - [x] **Cloudflare check** (`opennextjs-cloudflare build` then `opennextjs-cloudflare preview`):
    - every new page returns 200
    - `/shades/blue` and `/shades-of-grey` return 308
    - unknown slugs return 404
    - Note: plain `wrangler dev` without the cache-populate step shows the SSG pages as 404. That's a test-setup artifact; `npm run deploy` populates the cache.
- [ ] Merge into `develop` (owner approval)
- [ ] Deploy from `develop` (owner approval)
