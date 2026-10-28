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

### Done (new design, live since 2026-10-17)

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

`/tools/contrast` was redesigned again on 2026-10-17 (`components/contrast-checker.tsx`): the live preview is now the main stage (a color field with swatch, hex and nearest name under it for both colors, plus a swap button), and the result card holds the ratio, gauge and a 5-row WCAG matrix (normal AA/AAA, large AA/AAA, UI components) with Auto-fix. The separate "Live preview" and "WCAG thresholds" sections are gone. A new "Try a pair" section has 8 clickable presets (6 pass, 2 fail on purpose).

`/tools/brand-analyzer` was moved to the new design on 2026-10-17 (`components/brand-color-analyzer.tsx`). The screenshot, k-means color extraction and points-lock logic are unchanged; framer-motion and the cream background are gone. The URL bar is a full-width white pill with a dark Analyze button and a row of example chips (they only fill the field, so no points are spent). Before an analysis there is no placeholder panel: the page goes straight from the bar to the shared tool sections (the big empty dashed boxes were tried and removed). Results are the page screenshot with a weighted color strip plus a "Brand palette" card (swatch strip, 8 rows with name, HEX and page coverage, Copy all HEX, Open in generator). There are skeleton, error and locked states. Tested with a mocked `/api/brand-colors`, not the real API.

`/tools/contrast-fixer` was moved to the new design on 2026-10-17 (`components/contrast-fixer.tsx`). The Before / After stages are the main view on the left (a single "Your colors" stage when the pair already passes, so there is never an empty panel), with the target level, color fields and a "Try a failing pair" row under them. The right card has the ratio and gauge, the suggested fix with Apply, and copy buttons. The logic (`suggestAccessibleColor`, AA 4.5 / AAA 7) is unchanged; framer-motion and the cream split layout are gone.

`/tools/palette-visualizer` was redesigned again on 2026-10-17 (`components/palette-visualizer.tsx`): a palette-roles card on the left (sticky on laptop; swatch, role, name, hex, Randomize / Copy CSS / Copy JSON) and the preview on the right in a browser-style frame with four tabs (Website, Dashboard, App UI, Components). The Website, Dashboard and App UI previews already existed in the file but were unused; they are used now. The old separate "Palette roles" and "Preview" sections are gone.

`/tools/color-mixer` was redesigned again on 2026-10-17 (`components/color-mixer-tool.tsx`): the gradient (with A and B labelled at its ends and a drag handle) and the two color fields sit in one card on the left, with a "Try a blend" row (Sunset, Ocean, Forest, Berry). The right card is a color chip: the mixed color with its name on top, then HEX / RGB / HSL copy rows and R/G/B bars. The separate "Color breakdown" section was removed because the chip covers it, and the 9-step scale and the export tabs now share one section.

`/tools/tailwind` (not `/tools/tailwind-scale`) was moved to the new design on 2026-10-17 (`components/tailwind-colors.tsx`): the 22-family palette data is unchanged. There is now a sticky toolbar (search, group chips Grays / Warm / Greens / Blues / Purples, and a Copy-as switch for HEX / RGB / HSL / Class), a two-column grid of family cards with the shade number on every swatch, and a per-family "Copy CSS" button that copies a Tailwind v4 `@theme` block. framer-motion and the cream background are gone.

`/tools/design-tokens` was moved to the new design on 2026-10-17 (`components/design-token-generator.tsx`). The generator logic (8 export formats, shade generation, type and spacing scales) is unchanged. The inputs (colors, typography, spacing) are on the left and the generated code is on the right (sticky on laptop) so every change shows up in the code at once; the preview (UI sample, type scale, spacing, shadows, radius) is one "Your tokens at a glance" section below. framer-motion and the cream stack are gone.

`/tools/animation` was moved to the new design on 2026-10-17 (`components/color-animation-generator.tsx`). The CSS generation, presets, color management and the API-driven "More animations" library (`/api/animation-presets`, infinite scroll) are unchanged. The layout is the live stage plus the generated CSS on the left and one controls card on the right (presets, colors, type, duration, direction, easing). The preset preview is now a plain dialog (Escape or click outside closes it). framer-motion and the cream layout are gone. Note for new pages: a grid item holding a long `<pre>` needs `min-w-0`, otherwise it widens the whole page on phones.

`/tools/image-recolor` (component `components/svg-image-recolor.tsx`) was moved to the new design on 2026-10-17. The SVG handling is unchanged (sanitize, find #RGB / #RRGGBB values, swap them). Layout: the preview on a checkerboard with Upload / Try demo / Copy SVG / Download under it (drag and drop works on the whole preview card), and a colors card on the right with one row per color (original, new, name, a Changed badge), a HEX field that keeps half-typed values, a native picker and 12 quick colors for the selected row. When a file has no HEX colors the card says so instead of staying empty.

`/tools/color-harmony` was moved to the new design on 2026-10-17 (`components/color-harmony-tool.tsx`). The `generateHarmony` logic and the 6 rules are unchanged. Layout: base color field and the rule list on the left (sticky on laptop, compact pills on phones), and on the right the palette strips with name, HEX and nearest color name, Copy all HEX / Open in generator, and a new hue wheel that plots every color on the ring (joined by lines) next to a table of their hue angles, so the rule can be seen, not just read.

`/tools/colorblind-simulator` was moved to the new design on 2026-10-17 (`components/colorblind-simulator-tool.tsx`). Layout: the editable palette (swatch picker plus a HEX field per color, Randomize) on the left, and a 2x2 grid of simulation cards on the right (normal, protanopia, deuteranopia, tritanopia) using the shared hover swatch strip. New: each card says whether any two colors that look different in normal vision run together under that deficiency (CIE76 delta-E below 20) and names the pair. Known issue, not fixed here: `lib/colorblind.ts` applies simple matrices straight to sRGB, which gives off results (for example #22c55e becomes a purple-grey under deuteranopia). The same function feeds `components/generator/colorblind-panel.tsx`. Proper Viénot / Machado matrices in linear RGB would fix both.

`/tools/color-psychology-explorer` was moved to the new design on 2026-10-17 (`components/color-psychology-explorer.tsx`). The descriptor still comes from `getProgrammaticColorDescriptor`, so the text is unchanged. Layout: a color chip (name, HEX, hue family) with the picker, a HEX field and 8 quick picks on the left (sticky on laptop), and the "What it signals" card on the right: the signal sentence with keyword chips, Best for, Use cases, a new "Pairs well with" strip (complementary harmony, click to copy), and links to the full color guide (named colors only, as before), `/shades-of-<family>` and `/color-palettes/<family>`.

`/blog` (component `components/blog-page.tsx`) was moved to the new design on 2026-10-17. Content still comes from `blogPageContent` in `lib/seo/tool-pages.ts`; framer-motion fade-ins and the cream layout are gone, so nothing is hidden before hydration. Layout: header with the quick answer, a sticky category filter (All / Guides / Explainers / Comparisons / Best Colors, with counts), a 3-column card grid whose cover is five swatches built from the category hue (deterministic, so server and client match) and a "Start here" tag on the first article, then "What you will find here", a visible FAQ and "Explore next" in the same style as the tool pages.

2026-10-17, SEO pages: `/color-palettes` and its tag pages (`palette-library-page.tsx`), `/color-codes` (search plus a HEX / RGB / HSL switch for the code shown on every color), the shared content template (`content-page.tsx`: color chip header, sections as hairline blocks instead of cards, pros and cons with check marks, a styled comparison table, FAQ accordion, sticky related-links sidebar, all the same text as before) and the shared hub template (`hub-page.tsx`: cards get a palette cover, or a deterministic five-swatch cover from the title when they have none). Note: while testing, the dev server returned 500 for every page that had not been compiled yet. The cause was a corrupted `.next` (two dev servers had shared it), not these changes; deleting `.next` and restarting fixed it.

2026-10-17, remaining tool-like pages: `/tools` index (`app/tools/page.tsx`, tools array unchanged, new card grid), `/tools/playground` (`components/color-playground.tsx`: gradient-track sliders, live UI preview, theme-color token list with copy), `/color-converter` (`components/color-converter.tsx`: format tabs, result row, color chip showing every format, FAQ via `Faq`) and `/explore` (`components/explore-colors.tsx`: new header plus a sticky toolbar with search, sort, "New set", category chips and a hue bar; masonry columns; framer-motion removed from cards, menus and fullscreen; `PaletteCard` no longer takes `index`).

2026-10-17, landing pages: `/color-picker`, `/color-wheel`, `/color-palette-generator` and `/color-palette-from-image` now share `components/seo/tool-landing.tsx` (`ToolLanding`: header with two buttons, optional sample strips, feature grid, FAQ, closing call to action). Metadata, structured data and the data arrays in each `app/<route>/page.tsx` are unchanged.

2026-10-17, info pages: `components/static-page.tsx` (white page, breadcrumb, prose styling through `[&_h2]` selectors; used by `/about`, `/contact`, `/privacy`, `/terms`) and `app/not-found.tsx` (server component, no framer-motion, six suggestion links).

2026-10-17, `/profile` (`components/profile-page.tsx`): white page with breadcrumb, h1 "Your library", an identity card (avatar, name, email, plan pill, Generate palette / Daily challenge / Sign out buttons), a stats grid (palettes, gradients and, when signed in, score with level bar and day streak), an invite-friends row (copy link, WhatsApp, Twitter) and a sticky toolbar (tabs with counts, search, sort) above the palette, gradient and collection grids. All logic (storage hooks, collections, points and streak fetches, sharing, sign-out) is unchanged; framer-motion, the animated gradient and the sidebar are gone. Fixes on the way: the collection menu is no longer clipped by the card, the delete button on collection cards is visible on touch screens, and the latest-palette color lookup no longer sorts the state array in place. Checked: `tsc` and `eslint` clean; guest view at 1440 and 375 wide with seeded local data (search, sort, tabs, collection drill-down, add-to-collection menu). Not checked: the signed-in view (needs a login: score, streak, invite row, sign-out dialog).

Totals: 15 page types, 26 URLs.

**Shared tool sections:** `components/seo/tool-page-sections.tsx` now has `variant="new"` (white, hairline sections, numbered steps, visible FAQ accordion, related links). Only `/tools/picker`, `/tools/contrast`, `/tools/image-colors`, `/tools/palette-visualizer`, `/tools/color-mixer`, `/tools/tailwind-scale`, `/tools/collage`, `/tools/gradient`, `/tools/brand-analyzer`, `/tools/contrast-fixer`, `/tools/tailwind`, `/tools/design-tokens`, `/tools/animation` and `/tools/image-recolor`, `/tools/color-harmony`, `/tools/colorblind-simulator` and `/tools/color-psychology-explorer` (the last nine on 2026-10-17) use it so far. The playground and the `/tools` index have their own layout (see the notes below). To convert a tool, rebuild its UI in the new design, then pass `variant="new"`.

### `/trends` redesign (2026-10-11)
- Rebuilt on the `/palettes` structure: header (breadcrumb, h1, dots, bold count line, category tabs and Shuffle), then ONE continuous 4-column palette grid (no per-category sections or titles; the owner asked for this), "Explore more palettes" tiles linking into `/color-palettes/<tag>`, tips and a visible FAQ.
- `app/trends/page.tsx` now owns the FAQ and emits FAQ + breadcrumb + WebPage JSON-LD. `TrendsPage` takes `faq` and `explore` props.
- Removed framer-motion and the cream `#faf7f2` background, so the page no longer renders blank before hydration.
- Checked: `tsc` and `eslint` clean; one grid of 11 cards, 4 FAQ items, 12 tiles and the JSON-LD present on the page. Not yet checked: mobile width, shuffle and copy by hand.

### Still on the old design (updated 2026-10-17)
Done so far: homepage, footer, every page under `/colors`, `/shades`, `/palettes`, `/trends`, `/community`, `/blog`, `/tailwind-colors`, `/color-palettes` (+ tag pages), `/color-codes`, `/color-converter`, `/explore`, `/profile`, every page under `/tools/*`, the four SEO landing pages, the static pages (`/about`, `/contact`, `/privacy`, `/terms`), the 404 page and every shared SEO template (`content-page.tsx` for all single content pages, `hub-page.tsx` for all hubs). What is left:
1. **`/generator`** (`components/generator/*`, framer-motion): the core app screen. Needs an owner decision on how far to take it before starting.
2. **Header:** site-wide, unchanged. On mobile it fades in after load. Ask the owner before changing it.

Shared building blocks for the new SEO pages live in `components/seo/page-ui.tsx` (`Breadcrumbs`, `SmallTitle`, `Dots`, `Faq`, `RelatedLinks`, `eyebrow`). `palette-color-strip.tsx` and `copy-hex-button.tsx` were restyled for the white page (`CopyHexButton` takes `tone="light" | "dark"`).

### Recipe for converting a page (copy `/palettes`)
1. Wrapper: `<main className="min-h-screen bg-white text-[#1c1712]"><Header />`.
2. Header section: `px-6 pb-10 pt-28 sm:px-8 lg:px-12`, breadcrumb, `h1` (`text-[2.6rem] sm:text-[3.5rem] font-bold tracking-[-0.035em]`), stacked dots + bold count line (`hub-description`), then chips or tabs.
3. Body: one `<section className="border-t border-black/[0.06]">` per block with `SectionTitle` (from `shades-page.tsx`).
4. Palette cards: `SwatchStrip` + orange `#c2410c` eyebrow + name + hex codes + dark "Open in generator →" and outline "Copy all". Cards are `rounded-2xl ring-1 ring-black/[0.07]`.
5. End with Tips (numbered cards) and a visible FAQ (`<details>`), and emit the same FAQ as JSON-LD from the server `page.tsx`.
6. No framer-motion fade-ins and no cream backgrounds. Keep content server-visible.
7. Keep `tsc` and `eslint` clean, then check the page in the browser.

## SEO, AEO, GEO and LLM push (2026-10-17, live)

**Ask from the owner:** research what the US top 10 use for the main keywords, add those keywords, make "hueflow" the strong brand keyword, and complete SEO, AEO (answer engines), GEO (generative engines) and LLMO (llms.txt etc.), adding features where needed.

**Research (what could and could not be seen):** the web search tool here returns summaries, not real rankings, so no rank or search-volume numbers were measured. What it showed:
- Competitors for the head terms: Coolors, Adobe Color, Canva, Figma, Paletton, Colormind, Color Hunt, Khroma, Huemint, ColorKit (palettes); htmlcolorcodes, w3schools, quackit (codes and charts); WebAIM, Level Access, TPGi (contrast); cssportal, web.dev, Josh Comeau (gradients).
- Page pattern of the leaders: title = exact keyword + brand (`Color Palette Generator | Figma`), H1 = the keyword, a tool above the fold, FAQPage/BreadcrumbList schema (Figma), and the keyword list in the meta description (`htmlcolorcodes`: "HTML color codes, Hex color codes, RGB, HSL and OKLCH values").
- **Brand collision:** searching "hueflow" returns an unrelated 2018 itch.io tool also called Hueflow (graph-based palette tool, by wisedawn) and Philips Hue / Webflow noise; hueflow.site did not show up at all in the search tool. The brand keyword has to be won with entity signals (below) and off-site links.

**Done**
- **Brand entity:** `lib/seo/schema.ts` now gives Organization / WebSite / SoftwareApplication stable `@id`s (`organizationId`, `websiteId`, `appId`), `alternateName` ("Hue Flow", "HueFlow Color Tool", "hueflow.site"), a PNG logo (`/apple-icon`), `knowsAbout`, `contactPoint`, a longer `featureList`, `isAccessibleForFree`. Removed the `SearchAction` because `/explore?q=` never read the query (an invalid sitelinks search box). `sameAs` is wired to `socialProfiles` in `lib/seo/site-config.ts` and stays empty until real profile URLs exist.
- **Titles and descriptions** (brand first on the homepage: "HueFlow – Free Color Palette Generator & Color Tools"): homepage/layout, all hubs (`hubSeo` map in `lib/seo/page-utils.tsx`, the on-page H1 stays short), 12 tool pages (`lib/seo/tool-pages.ts`), `/explore`, `/tools`, `/trends`, `/community`, `/about`, `/contact`, `/generator`, `/color-palette-generator`, `/color-converter`.
- **Cannibalization:** `/generator` (the app) is now "Color Scheme Generator" and `/color-palette-generator` (the guide) keeps "Color Palette Generator"; `/tools/picker` is "Color Picker Tool: Eyedropper, HSL Sliders..." next to the `/color-picker` landing page.
- **Bug fixed:** `/community` had its canonical pointing at the homepage (no `alternates`); every page without its own canonical inherits the root one, so check new pages.
- **Robots meta:** all indexable pages now send `max-snippet:-1, max-image-preview:large` (`indexableRobots` in `site-config.ts`).
- **Homepage:** hero eyebrow and description carry "HueFlow" + the keywords; FAQ rewritten as quotable answers (what is HueFlow, how to generate a palette, WCAG thresholds, HEX to RGB...), emitted as FAQPage schema.
- **About page:** entity definition, "HueFlow at a glance" list, `AboutPage` + breadcrumb schema.
- **New features / pages** (all in the sitemap, header Tools menu, footer "Popular tools" row, `/tools` index and `llms.txt`):
  - 14 converter pages at the search URL: `/hex-to-rgb`, `/rgb-to-hex`, `/hex-to-hsl`, `/hsl-to-hex`, `/rgb-to-hsl`, `/hsl-to-rgb`, `/hex-to-cmyk`, `/cmyk-to-hex`, `/rgb-to-cmyk`, `/cmyk-to-rgb`, `/hex-to-oklch`, `/oklch-to-hex`, `/rgb-to-oklch`, `/oklch-to-rgb`. Served from `app/convert/[pair]` through a rewrite in `next.config.ts` (`/convert/<pair>` 308s to `/<pair>`), same pattern as shades. Each has a live tool (`components/seo/converter-tool.tsx`), a computed worked example, a 12-color table, 6 FAQs, HowTo + FAQPage + WebApplication + Speakable + Breadcrumb schema. **To add a pair, add one row to `lib/seo/converter-specs.ts`** (it feeds the rewrite, sitemap, pages and llms files). Math lives in `lib/color-convert.ts` (checked against CSS spec values for red, green, blue, white and Tailwind blue-500; CMYK is the plain formula, not an ICC print profile, and the FAQ says so).
  - `/random-color-generator` (space bar, single color or palette of 5 with locks, pastel/vivid/muted/dark/light styles, history).
  - `/color-name-finder` (HEX, RGB or HSL in, closest of the 140 named colors out, similar colors with links to `/colors/<slug>`).
  - `/color-converter` links to all 14 pairs; `/colors/<color>` pages link to the HEX converters, the contrast checker and the name finder.
- **LLM / answer-engine files:** `/llms.txt` rewritten to the llmstxt.org format (H1, summary, linked sections with descriptions); new `/llms-full.txt` (color facts, every tool's answer, steps and FAQs, converter answers); robots now also allows `OAI-SearchBot`, `Claude-User`, `Perplexity-User`, `DuckAssistBot`, `Applebot-Extended` and `facebookexternalhit` (it was blocked, which stops Facebook and WhatsApp link previews; revert in `app/robots.ts` if that was intentional). `CCBot` stays blocked.
- **Schema:** the four landing pages got `WebApplication` + `SpeakableSpecification`; WebPage `isPartOf` now points at the WebSite `@id`.

**Needs the owner (not code)**
1. Create real profiles (GitHub, X, LinkedIn, Product Hunt, YouTube...) and put the URLs in `socialProfiles`. This is the main lever for the "hueflow" brand search.
2. Verify hueflow.site in Google Search Console and Bing Webmaster Tools, submit `sitemap.xml`, and request indexing for the new pages. Without that nothing here shows up.
3. Backlinks: list the site on Product Hunt, AlternativeTo, design-tool directories and relevant subreddits/Dev.to posts. On-page work alone will not reach the top 10 for "color palette generator" (Coolors, Adobe, Canva, Figma own it).
4. Decide: merge `/color-picker` into `/tools/picker` (or keep and differentiate); `/colors` vs `/color-codes`; `/tailwind` vs `/tailwind-colors` vs `/tools/tailwind`. They still overlap in intent.

**Not done on purpose**
- No "HueFlow vs Coolors" or "Coolors alternative" pages: they need verified facts about the competitor. Worth doing if the owner supplies or approves the comparison points.
- `/generator` is a full-screen app, so it has no text content; the guide page `/color-palette-generator` carries the content.
- `buildArticleSchema` still uses the build date as `dateModified` for every article; set real dates before relying on freshness.

**Checks run:** `tsc` and `eslint` clean on all changed files; JSON-LD parses on the home, converter, tool, about and generator pages; `/hex-to-rgb`, `/oklch-to-rgb` etc. return 200, `/convert/hex-to-rgb` 308, unknown pair 404; sitemap lists the 16 new URLs; mobile width (375) has no horizontal overflow on the converter page. Not run: `npm run build` / `npm run preview` (the dev server shares `.next`), so check the rewrite regex in the OpenNext build before deploying.

## Top 3 keyword pages (2026-10-21, live: worker version `537dfb53`)

**Ask from the owner:** study the US search results for color topics, find what people search, and build the top 3 pages that should reach at least 300 impressions a day.

**What the research showed** (web search tool, summaries only: no real rank or volume numbers, so the sizes below are estimates to check in Search Console):
- Who ranks for the "what colors make X" cluster: small art blogs (artstudiolife, thegraphicsfairy, hunker). No interactive tool, just text recipes.
- "color wheel / primary secondary tertiary colors": Adobe's blog and many scraped "printable chart" pages. No interactive wheel with schemes and codes.
- "pastel colors / pastel hex codes": picsart, htmlcolorcodes single-color pages, colorswall; the same name maps to different hex codes on different sites.
- "complementary color calculator": planetcalc, jumk.de, bushe.co: bare calculators with no explanation.
- Earlier research (this file, top section) put "pastel colors" at about 79K searches a month in the US. The color wheel and "what colors make" clusters are estimated at tens of thousands a month each (not measured).

**The 3 pages (all new design, answer-first, FAQ + HowTo/FAQPage/WebApplication/Speakable/Breadcrumb schema, mobile checked at 375px):**
1. `/color-mixing-chart` (`components/color-mixing-chart.tsx`, math in `lib/color-mixing.ts`): mixer in three models (paint RYB with the Gosset-Chen trilinear model, light RGB, ink CMYK), 20 "What colors make X?" recipe cards (each an H3 question with a direct answer, "Try it" loads it into the mixer), primary/secondary/tertiary, light and ink tables, tips, 8 FAQs. Swatches are on-screen estimates and the page says so.
2. `/color-wheel` (rebuilt; was a thin landing page): interactive 12-color artist (RYB) and screen (RGB) wheels, scheme picker (complementary, split, analogous, triadic, two tetradics) with the wheel positions marked, a calculator that gives every scheme for any HEX, primary/secondary/tertiary tables with codes, warm vs cool, why the complement of red differs by wheel, 9 FAQs. Data in `lib/color-wheel.ts` (the 12 hex values are HueFlow's own curated picks, not an official standard).
3. `/pastel-colors` (`components/pastel-colors-page.tsx`, data in `lib/pastel-colors.ts`): 47 pastel colors in 8 groups with HEX/RGB/HSL switch, a pastel maker (mix any color with white, plus the CSS `color-mix()` and HSL equivalents), pastel palettes from the palette library, 6 combinations, a real WCAG contrast table (dark text passes, white text fails), 8 FAQs, ItemList schema.
- Text for the three pages lives in `lib/seo/guide-pages.ts` (FAQ, steps, answers), so the pages, schema and `/llms-full.txt` stay in sync. Page files must not export extra names, so keep text there.
- Wired in: sitemap (`staticPages`), `/llms.txt`, `/llms-full.txt`, header Tools menu, footer "Popular tools", homepage "Popular" row, `/tools` index, color-mixer related links.
- Fixed on the way: grid items holding wide tables need `min-w-0`, or the whole mobile page widens (seen on `/color-wheel`).

**Honest expectation:** nothing here can guarantee 300 impressions a day. A new page is usually indexed within days to a few weeks, and impressions follow the ranking, so reaching 300 a day depends on ranking on page 1 or 2 for the cluster. Check in Search Console (Performance, filter by page) 2 to 4 weeks after the pages are indexed. If a page is indexed but under 100 impressions a day, the next levers are backlinks, a few long-tail sub-pages (for example `/what-colors-make-brown`, `/pastel-pink`) and more internal links from high-traffic pages.

**Status:** merged into `develop` (3d9af70), pushed and deployed on 2026-10-21; the 3 URLs return 200 on hueflow.site and are in the sitemap and `/llms.txt`. **Next step is the owner's:** in Search Console, "Request indexing" for `/color-mixing-chart`, `/color-wheel` and `/pastel-colors`. Then check Performance by page after 2 to 4 weeks.

## Blog posts (2026-10-23, branch `feature/blog-posts`, not committed)

**Ask from the owner:** two unique, human-sounding blog posts on the most-searched US color topics, aiming for the top 5.

**Picked (from web research, no keyword-tool numbers):**
1. `/blog/color-of-the-year-2027`: the "color of the year 2027" cluster peaks September to December, and brand-by-brand queries (Sherwin-Williams, Benjamin Moore, Behr, Valspar, Pantone) all feed it. Competitors are trackers on Homes & Gardens, colorcombinations.org and kooihaus; our edge is the side-by-side table with HEX values labeled by source, the computed patterns (4 of 9 picks green; 4 of 6 coded picks at 14% saturation or less), real WCAG contrast numbers for using each color on screens, and palettes. **Facts checked on 2026-10-23** (sources listed on the page). Pantone 2027 is not out yet (usually early December): update the post and `updated` date when it lands, and add any new brand picks.
2. `/blog/colors-that-go-with-navy-blue`: evergreen "what colors go with navy blue" queries; the results are full of templated spam pages on .edu/.gov subdomains plus Livingetc and Homes & Gardens. Ours: 18 pairings in 5 groups, each a two-tone card with the measured contrast against #1F2A44, 6 five-color palettes with generator links, outfit/room/website advice, colors to be careful with.

**How it's built:** `/blog/[slug]` (static, `dynamicParams = false`), metadata and FAQ/sources in `lib/blog/posts.ts`, bodies in `components/blog/posts/<slug>.tsx`, layout in `components/blog/blog-article.tsx` (short answer box, sticky table of contents, FAQ, sources, related), blocks in `components/blog/blog-blocks.tsx`. Schema: BlogPosting (with dates and image), FAQPage, Speakable, BreadcrumbList. Added to the `/blog` index (with real cover colors), `sitemap-blog.xml`, `/llms.txt` and `/llms-full.txt`.
- Byline is "By the HueFlow team". If the owner wants a named author (better for E-E-A-T), add a real name and an author page; don't invent one.

## Build blocker: Next.js 15 is out of support (2026-10-21, fixed by the Next 16 upgrade below)

- `opennextjs-cloudflare build` now refuses Next 15.5.x: "Next.js version 15.5.23 is not supported by the Next.js team" (Next 15 was released 2024-10-21 and OpenNext enforces a 2-year support window). The 2026-10-17 deploy worked, the 2026-10-21 one did not.
- **Workaround used (owner approved):** `npx opennextjs-cloudflare build --dangerouslyUseUnsupportedNextVersion`, then plain `npx opennextjs-cloudflare deploy` (the deploy command rejects that flag, because it passes unknown flags on to wrangler).
- This only skips the version check. The site already runs Next 15.5.23, and unsupported releases get no security patches, so **upgrading Next (to 16) is a to-do on its own branch**: check middleware, `next lint`, `next.config.ts`, `@opennextjs/cloudflare` and React compatibility, then run the full build and a preview before deploying.

### Next 16 upgrade (2026-10-23, branch `upgrade/next-16`, cut from `develop` at `b18ef48`, merged into `develop`, live)

**Live since 2026-10-23:** worker version `d4ea240b`, deployed from `develop` at `93c48e4` with a plain `npx opennextjs-cloudflare build` (no flag) and `npx opennextjs-cloudflare deploy`. The previous worker, `ac5a3a02` (Next 15, blog posts), is the rollback target. On the live site after the deploy:
- Every route in the list below returns the same status and size as in the preview.
- `/colors/1372f6` returns the middleware 404 (`noindex`, 1-day cache).
- With the real secrets, `/api/auth/session` returns `null` and the sign-in page shows "Sign in with Google".
- Home and `/generator` have no console errors.

**Versions:** `next` 16.4.2, `eslint-config-next` and `@next/eslint-plugin-next` 16.4.2, `@opennextjs/cloudflare` 1.20.13 (it needs `next` >=16.4.1 and `wrangler` ^4.148), `wrangler` 4.152.0. React stays 19.2.7, and `next-auth` 5.0.0-beta.32 already allows Next 16.

**What changed:**
- `package.json`: `build` is `next build --webpack`, and `dev` / `dev:clean` use `next dev --webpack`. Next 16 builds with Turbopack by default, but Turbopack's file tracing leaves out puppeteer's `bidi` files (dynamic `webpackIgnore` imports, pulled in by `app/api/brand-colors/route.ts`), and the OpenNext bundle step then fails with `Could not resolve "../bidi/bidi.js"`. Webpack traces them exactly as the Next 15 build did.
- `lint` is `eslint .` (`next lint` was removed in Next 16; official codemod). `eslint.config.js` also ignores `.open-next` and `.wrangler`.
- `middleware.ts` is **kept, not renamed to `proxy.ts`**. Next 16 still runs `middleware.ts` on the edge runtime and only logs a deprecation warning. `proxy.ts` always runs on Node.js, and OpenNext's own build log calls Node.js middleware on Cloudflare "experimental, not officially maintained". The rate limiter and the arbitrary-hex 404 are unchanged.
- `app/layout.tsx`: `<html data-scroll-behavior="smooth">`. Without it, Next 16 would smooth-scroll to the top on every route change (Next 15 turned smooth scrolling off during navigation).
- `components/header.tsx`: logo `priority` became `preload` (`priority` is deprecated in 16 and does the same thing).
- `tsconfig.json` (`jsx: "react-jsx"`, `.next/dev/types` include) and `next-env.d.ts` were rewritten by `next build`. That is expected.
- No change was needed in `next.config.ts` (rewrites, redirects, headers and images all work as before). The async request API codemod found nothing: every `params` is already a `Promise`.

**Verified on the branch:**
- `npx tsc --noEmit` passes, and `npx eslint .` shows 0 errors (2 old warnings).
- `npx opennextjs-cloudflare build` passes **without** `--dangerouslyUseUnsupportedNextVersion`.
- In `npx opennextjs-cloudflare preview`, these return 200: `/`, `/generator`, `/hex-to-rgb`, `/rgb-to-hex`, `/shades-of-blue`, `/blog`, both blog posts, `/llms.txt`, `/llms-full.txt`, `/sitemap.xml`, `/sitemap-pages.xml`, `/robots.txt`, `/colors/red`, `/colors/ff0000`, `/palettes`, `/profile`, `/community`, `/opengraph-image`.
- Redirects: `/convert/hex-to-rgb`, `/shades/blue` and `/shades-of-grey` return 308 to the right place.
- 404s: unknown paths, `/blog/no-such-post` and `/shades-of-notacolor` return 404. `/colors/1372f6` returns the middleware's 404 with `noindex` and a 1-day cache.
- The rate limiter answers 429 with `Retry-After: 60` after 30 slug requests a minute, and other routes keep working.
- With a dummy `AUTH_SECRET`, the sign-in page shows "Sign in with Google", `/api/auth/session` returns `null`, and signing in redirects to Google. Without `.dev.vars`, the auth routes return 500 (missing secret), as on Next 15.
- In the browser, home, `/generator`, `/hex-to-rgb` (typing a HEX code works) and the blog post have no console errors, and client-side navigation works.
- `npm audit`: 17 issues (0 critical), down from 21 (2 critical). `next`, `wrangler`, `miniflare`, `undici` and `sharp` are no longer flagged. The rest are tooling dependencies.

**Still open:**
- Later: move to `proxy.ts` once OpenNext supports Node.js middleware properly.
- Later: switch to Turbopack builds. The brand-colors puppeteer route blocks this, and it can't launch Chrome on Workers anyway.
- Seen on Next 15 too, so not caused by the upgrade: on-demand 404s from dynamic slug routes (for example `/colors/not-a-real-color`) send an empty HTML body, and the "page doesn't exist" content is only in the RSC payload.
- Next 16 `next dev` writes to `.next/dev`, so a dev server and a build no longer overwrite each other. Two dev servers still do.

## Industry palette pages (2026-10-23, branch `feature/industry-palettes`, merged into `develop` at `5ef6dbd`, live)

**Live since 2026-10-23:** worker version `e2aafe79`, deployed from `develop` at `5ef6dbd`. The rollback target is `d4ea240b`. On the live site:
- All 8 pages return 200 with the new titles and all their previews (8 for healthcare, 6 for the others), and no palette shows a "Fail" badge.
- The old guide URL returns 308 to `/best-colors-for/healthcare-websites` and is no longer in `sitemap-guides.xml`.
- No console errors, and no horizontal scroll at 375px.
- To measure: compare the 28 days after 2026-10-23 with the 28 days before, page by page (Search Console Pages filter). Use the 16 untouched `/best-colors-for` pages as the comparison group.

**Share images (2026-10-23, live as worker `cc9ce468`, develop `de8c03a`):**
- **Site-wide image.** The old dark `/opengraph-image` used for every page is redrawn in the light design: white background, "Find colors that feel right.", and a palette strip. The shared frame is `components/seo/og-frame.tsx`.
- **Industry pages.** Every `/best-colors-for/<slug>` page now has its own image (`app/best-colors-for/[slug]/opengraph-image.tsx`) with the page title, the "N ... Color Palettes" line in orange, and its first 3 palettes. Pages without palettes show their color strip instead.
  - All 24 images are prerendered at build time.
  - An unknown slug returns 404 (`dynamicParams = false`).
- **Font.** Inter regular and bold, fetched from Google Fonts at build time. If that fetch fails, the images fall back to the default font.
- **Metadata.** `buildPageMetadata` sets the share image explicitly, and an explicit image wins over a segment's own `opengraph-image` file. That is why the old `/colors/[slug]/opengraph-image` (old dark design, rendered per request) was never used. Pages with their own image must pass `imagePath`.
- **robots.txt.** It blocked `/opengraph-image` for every bot, so link-preview bots that obey robots.txt (X, LinkedIn, Pinterest) could not show the image. A new group lets the link-preview bots fetch everything except `/admin` and `/api/`. Search and AI bots still skip `/opengraph-image`.
- **After deploy.** Old previews stay cached in WhatsApp, Facebook and LinkedIn. To refresh one, re-scrape it in the Facebook Sharing Debugger or the LinkedIn Post Inspector; new shares pick up the new image.

**Why (Search Console, 3 months to 2026-10-21):**
- 450 clicks, 24.3K impressions, average position 43.4.
- About 311 clicks (69%) came from "hueflow" / "hue flow" searches. Google sends almost no new visitors yet.
- Indexing is not the problem: 411 pages indexed, 119 not (data from 2026-10-16). The 12 noindex pages are on purpose (`/profile`, unauthored color-meaning and hex pages).
- The non-brand searches closest to page 1 were the healthcare and medical website palettes:

| Query | Impressions | Position |
|---|---|---|
| healthcare color palette | 112 | 25.9 |
| best colors for healthcare website | 105 | 26.0 |
| color palette for healthcare website | 82 | 30.0 |
| color palette for medical website | ~81 | ~38 |
| color palette for education website | 9 | 14.2 |
| best color for coffee shop | 3 | 13.3 |

- Two of our pages competed for the healthcare searches: `/best-colors-for/healthcare-websites` and `/guides/best-colors-for-healthcare-websites-usa`.
- The contrast checker searches have lots of impressions but sit at positions 80–98 against WebAIM and others, so they are not worth chasing yet.

**What changed:**
- **Healthcare merge.** The guide's palettes, sections, FAQ, definitions, pros/cons and comparison table moved into `/best-colors-for/healthcare-websites`, which now has 8 palettes. The guide entry is gone, and its URL 308s to the industry page (`next.config.ts`). Every internal link to the guide now points at the industry page.
- **8 industry pages** (healthcare, dental, education, fitness, coffee shop, restaurant, real estate, law firm):
  - new titles ("Best Colors for X Websites: N ... Color Palettes") and descriptions;
  - 50 ready palettes in total, stored in `lib/seo/industry-palettes.ts`.
- **Palette roles.** Each palette names the job of every color: primary, secondary, accent, background, text. `components/seo/industry-palette-card.tsx` uses them to:
  - draw a small sample website with industry copy;
  - list the roles;
  - compute and show WCAG contrast for body text, button label and links;
  - link to `/generator` with the palette loaded.
- **Contrast.** Every palette has AAA body text and at least AA for buttons, links, badges and cards. A script checked this against the data file. Check new palettes the same way before adding them.
- **Dental and law firm.** Their text-only palette "examples" were replaced by the previewed palettes.
- **Sidebar.** Related links to `/best-colors-for/...` now appear under "Colors by industry". Before, the sidebar silently dropped them.

**Verified (OpenNext build and preview):**
- `tsc` and `eslint` are clean.
- All 8 pages return 200 with the new title, description, self canonical and FAQ schema.
- The old guide URL returns 308, and it is no longer in the sitemap.
- No palette shows a "Fail" badge.
- "Open in generator" loads the palette and its label.
- Dark palettes (Dark Mode Gym, Fine Dining, Espresso Bar) pick the right label colors.
- At mobile width (375px) there is no horizontal scroll, and the preview stacks under the swatches.
- Watch out: each page links to several other `/best-colors-for/` pages, and Next prefetches them, so clicking around the local preview quickly hits the exact 30-a-minute slug rate limiter ("Too many requests"). Live, the limiter is approximate and much looser.

**Next:**
- After deploy, request indexing for the 8 pages in Search Console.
- Watch the queries above for 2–4 weeks.
- If positions improve, give the other 16 `/best-colors-for` pages the same treatment.

## Research report and weekly plan (2026-10-23)

The full research (6 parts: keywords, palette tools, color reference sites, converter/contrast tools, links and channels, HueFlow audit) is in the session notes folder, not in the repo: `reports/HueFlow US top 10 research.md`. Main points:
- **Not realistic in 1–2 months:** US top 10 for head terms ("color palette generator", "color palette", "shades of blue", "contrast checker", "hex to rgb", "color picker", "tailwind colors"). These belong to DR 75–90 sites with thousands of linking domains.
- **Realistic by December:**
  - industry palettes (healthcare already sits at positions 26–30);
  - Christmas palettes, live by Nov 1;
  - the 2027 Color of the Year long tail (Pantone reveal expected in the first week of December);
  - niche converters (hex↔hsl, hex→cmyk, OKLCH; Pantone matching only if a ΔE matcher is built);
  - "<color> hex / code" variants.
- **First, stop the self-inflicted signals:** crawl errors, dates that change on every request, invisible schema, duplicate pages (Tailwind x3, picker x2, generator x2, `/colors` vs `/color-codes`) and templated color pages (light yellow and cyan share 71% of their wording).
- **Links:** aim for 20–50 real referring domains by December, from one launch with a real hook (palettes on a sample website with WCAG contrast) and Pantone-timed PR.
- **Industry experiment:** don't touch the content of the 24 `/best-colors-for` pages until the Nov 20 read. The 8 upgraded pages are compared with the 16 untouched ones, and Dec 18 is the real answer.

**Workflow (owner, 2026-10-23):** one branch per week (`week-1`, `week-2`, ...) cut from `develop`. Work stays uncommitted during the week, and the owner says when to commit and push. Production still deploys only from a clean, pushed `develop`.

### Weeks 1 and 2 (branch `week-1` from `develop` `de8c03a`, committed and merged into `develop` on 2026-10-24)

**Done (checked with an OpenNext build and preview before the merge):**
- **Real dates only.** `buildArticleSchema` no longer defaults to today, so content pages have no `datePublished`/`dateModified`. Blog posts keep their real dates.
- **Schema cleanup:**
  - `/generator` no longer has the invisible FAQ and HowTo markup; the full-screen app shows neither.
  - Content pages no longer emit HowTo built from their sections.
  - The site-wide SoftwareApplication markup is gone from the layout (it stays on `/generator`).
  - Tool pages keep HowTo, because their steps are visible.
- **Real `lastmod` in the sitemaps,** only where the date is known: the `contentUpdatedOn` map in `lib/seo/sitemaps.ts` (the 8 industry pages and the Christmas page) and blog posts (`updated`). Add a page there whenever its content changes substantially.
- **Christmas page.** `/color-palettes/christmas` ("21 Christmas Color Palettes with Hex Codes") is a new season tag with 20 new palettes plus Holiday Classic, an intro, a color-blind tip and 4 FAQs. Refresh it each autumn.
- **Crawl load:**
  - The slug rate limiter goes from 30 to 120 requests a minute per IP (`wrangler.jsonc`). Free plans can't verify bots, and a user-agent exemption would be spoofable.
  - Footer links use `prefetch={false}`. One scroll down live `/shades-of-blue` fired 110+ `_rsc` prefetches, about 45 of them from the footer. After the change, scrolling to the footer adds none.
- **Copy.** The contrast tool page no longer talks about "US searchers" or "crawl-friendly page quality". Other "for US ..." audience lines were trimmed too.
- **HSTS header** (`max-age=31536000`, this host only).

- **Duplicate pages (owner decisions, 2026-10-24):**
  - **Picker:** `/color-picker` now shows the picker tool itself (it was a text page linking away), and `/tools/picker` 308s there.
  - **Tailwind:** `/tools/tailwind` 308s to `/tailwind-colors`; both rendered the same component.
  - **Links:** all internal links, `toolPageContent` paths and the sitemap point at the kept URLs. The FAQ markup on both kept pages now matches the FAQ they show; `/tailwind-colors` had invisible FAQ markup before.
  - **`/color-codes` vs `/colors`:** `/color-codes` is now a code table (HEX, RGB, HSL and CMYK side by side, family filter, copy on click, a family header row with shades and palettes links). The swatch-card grid that duplicated `/colors` is gone. Its title is "Color Codes: HEX, RGB, HSL & CMYK for 140 Named Colors". `/colors` keeps the cards, and its title is now "Color Names: Browse 140+ Named Colors by Family".
  - **`/color-meanings/<name>`:** only the 13 hand-written base hues stay indexable (blue, green, red, purple, black, orange, yellow, pink, teal, gray, white, brown, azure). The other meaning pages are `noindex, follow` and out of the sitemap (`isColorMeaningIndexable` in `lib/seo/content.ts`). They still work for visitors, and the meanings hub still lists them.
  - **`/color-palette-generator` vs `/generator`:** left as is until the generator redesign decision.

- **Week 2, started on the same `week-1` branch (owner, 2026-10-24):**
  - **2027 paint picks:** one page per pick for the four biggest US brands: `/blog/sherwin-williams-celery`, `/blog/benjamin-moore-webster-green`, `/blog/behr-grounded`, `/blog/valspar-cottage-door`. Each has codes (HEX, RGB, HSL, CMYK, LRV), 4 palettes, 6 pairings with computed contrast, where to use it, an on-screen contrast check (with a darker button shade where neither dark nor white text passes), FAQ and sources. One template: `components/blog/posts/paint-picks-2027.tsx`. Brand facts reuse the fact-checked 2027 post, which now links to each page.
  - **IndexNow:** the key file is `public/ae005b44b3f7999141df5b8a7137d684.txt`, and `npm run indexnow -- <paths>` or `-- --sitemap` submits URLs. Run it only after a deploy.
  - **Launch kit:** `docs/LAUNCH-KIT.md` has listing text for Uneed, TOOOLS.design, AlternativeTo, Product Hunt, Show HN, Reddit and the bradtraversy list, plus the launch schedule. The owner posts everything.

**Not done in code, and why:**
- **HTTP to HTTPS.** A redirect in `next.config.ts` looped: Next/OpenNext rewrote the same-host https destination back to http. Turn on Cloudflare **SSL/TLS → Edge Certificates → Always Use HTTPS** instead.
- **The 5xx errors (found 2026-10-24).**
  - **Where they show up:** Cloudflare Observability logged 204 errors in 7 days, all "Worker exceeded CPU time limit", on `_rsc` prefetches of static pages (`/about`, `/blog`, `/shades`, `/community`). Search Console Crawl stats show 5XX on 6% of Googlebot requests (3 months to Oct 21).
  - **Cause:** the Workers **free plan gives 10 ms CPU per request**. Those pages were cache HITs, but every request first loaded the ~10 MB Next server bundle, and on a cold isolate (traffic bursts) that alone can pass 10 ms.
  - **Decision:** the owner stays on the free plan (2026-10-24). Workers Paid ($5/mo, 30 s CPU) would have fixed it outright.
  - **Fix, tested then parked (owner, 2026-10-24: analyze it later):** `enableCacheInterception: true` in `open-next.config.ts`. It is not on `week-1`; the patch is saved in the session notes folder as `parked-5xx-cache-interception.patch`. Prerendered pages (HTML, RSC and segment prefetches, sitemaps, robots, OG images) are answered from the cache by the small routing layer (`x-opennext-cache: HIT`) without loading the server. In preview, everything else is unchanged: redirects, middleware 404 and limiter, dynamic pages, security headers, client navigation. Must be turned off if Partial Prerendering is ever enabled.
  - **After deploy:** check Observability → Errors (filter "exceeded CPU") and Crawl stats → Server error (5XX) after a week.

**Needs the owner:**
- ~~Search Console Crawl stats baseline~~ (2026-10-24): 2.65K requests in 3 months, average response 271 ms, 89% 200, **6% 5XX**, 2% 404. `www.hueflow.site` returns 301 to the apex.
- ~~Turn on Cloudflare "Always Use HTTPS".~~ Done 2026-10-24: `http://` now returns 301 to `https://`.
- Set up Bing Webmaster Tools (import from Search Console).
- "Request indexing" for the 8 industry pages, and for `/color-palettes/christmas` once it is live.

**Still in week 1 or week 2 per the report:** 301-merge the duplicate pages, noindex or merge the thin `/color-meanings` twins, add a named founder, a domain email and social profiles (`sameAs`), and launch prep.

### Branch `week-2` (from `develop` `3f98e15`, committed as `e0a43bf`, merged into `develop` and live since 2026-10-29)

**Live (2026-10-29):**
- **Deploy:** `week-2` was fast-forwarded into `develop` (`e0a43bf`), built from a clean `develop` and deployed as worker version `4d73aee1`.
- **Live checks:**
  - All 25 changed pages return 200 with `index, follow`; `/color-meanings/floral-white` stays `noindex`.
  - The generator's Preview button and contrast checks work.
  - The new share images and sitemap entries are there.
- **IndexNow:** 200 OK for 27 URLs: the 3 industry pages and the hub, the 5 HEX converters, the blog post and `/blog`, the 3 color pages, the 12 meaning pages, and `/generator`.
- **Search Console:** the owner requested indexing for 20 URLs (the 5 new pages, the 3 color pages, the 12 meaning pages), and all 20 were indexed the same day.
- **Still to do:**
  - Re-run PageSpeed on `/hex-to-rgb` (CLS).
  - In 1–2 weeks, check impressions and position for these pages.
  - Next week's work goes on a fresh `week-3` from `develop`.


- **12 meaning pages rewritten and back in the index (owner, 2026-10-29).**
  - **Colors:** gold, silver, lavender, turquoise, navy, maroon, indigo, violet, magenta, coral, beige, olive.
  - **Content:** each is hand-written for its own color in `lib/seo/color-meanings-rich.ts`: an answer, 4 key takeaways, 6 sections and 5–6 FAQs. The sections cover what the color means and why, how it feels, culture and history, spiritual meaning, design use and a "<color> vs <near color>" section. There are no codes; each page links to `/colors/<name>` for those. Spiritual meanings are written as what traditions say, not as fact.
  - **Templated blocks hidden:** a meaning set with `authoredOnly: true` hides the generated "The bottom line", "Core Definitions", "Pros & Cons", "Comparison" and "Examples" blocks, which repeated the same template wording on every page. The generated related links no longer link the page to itself.
  - **Index and sitemap:** `isColorMeaningIndexable` now covers the 13 base hues plus these 12, so 25 meaning pages are `index, follow` and in `sitemap-colors.xml`. The other meaning pages stay `noindex, follow`.
  - **More colors:** to bring another meaning page back, add a full entry to `richColorMeanings`. Don't just flip it to indexable; the old short overrides are too thin.
  - **After deploy:** run IndexNow for the 12 URLs and "Request indexing" in Search Console.
  - Authored answers (`authoredOnly`) now skip `normalizeAnswer`, which padded answers under 40 words with a generic "It connects closely to..." sentence and cut answers over 60.
- **Week 3 items from the report, started early on the same branch (owner, 2026-10-29).**
  - **`/colors/azure`, `/colors/light-yellow`, `/colors/cyan` rewritten** in `lib/seo/color-pages-rich.ts`. These names are used for more than one hex code, and each page shows every code side by side:
    - azure: #007FFF first, then CSS #F0FFFF (#0080FF is explained as the same color rounded);
    - light yellow: CSS #FFFFE0, Figma's #FFFFC5 and #FFFFED;
    - cyan: #00FFFF (CSS cyan = aqua) and process cyan, about #00B7EB.
  - **What each page has:**
    - a split hero swatch and code cards (RGB, HSL, CMYK, contrast on white and black);
    - a shades/tints/tones grid (10% steps, click to copy);
    - 6 hand-written sections and 5–6 FAQs;
    - a "Sources" list with external links (Wikipedia, W3C, Figma). These are the site's first outbound citations.
  - **Templated blocks hidden:** `authoredOnly` hides them, and the quick-facts box is replaced by the code cards. The old azure `colorPageOverride` was removed; the rich page replaces it.
  - **Converters:**
    - HEX input now takes 3, 4, 6 or 8 digits, like CSS. With alpha, the HEX, RGB, HSL and OKLCH outputs carry it (`rgba()`, `hsla()`, `oklch(... / a)`); CMYK has none.
    - RGB input takes an optional fourth alpha value (0–1 or %).
    - New page `/hex-to-rgba` (example #3B82F680) with a HEX alpha to RGBA opacity chart. The preview shows transparency over a checkerboard.
  - **CLS 0.54 on `/hex-to-rgb` (PSI, Oct 23):**
    - PSI blames a shift of `<body>`, and names the lazily loaded footer logo as an "unsized image".
    - It does not reproduce: CLS is 0 at 375px on both the live page and the new build.
    - Both logos now have an explicit CSS size (`h-[22px] w-[104px]`). Tailwind's `height: auto` made Lighthouse count them as unsized.
    - Re-run PSI on `/hex-to-rgb` after deploy. If the body shift is still there, test with AdSense auto ads off, since its anchor slot is on the page.
  - **Sitemap `lastmod`:** set to 2026-10-29 for the 12 meaning pages and the 3 color pages.
  - **Owner's side:** sign up as a source on Qwoted, Source of Sources and Featured; decide yes or no on a Pantone matcher.
- **Generator preview and launch article (owner, 2026-10-29: "Pela preview sudharo").**
  - **The problem:** the launch hook ("see a palette on a website with WCAG contrast") was only true on the industry pages.
    - In `/generator` no toolbar button opened the UI preview (not since at least Aug 10), nor the color-blind panel.
    - The preview hard-coded white text on every color, and showed no contrast numbers.
  - **Now:**
    - `components/generator/ui-preview.tsx`: every label picks the most readable of white, near-black or the palette's neutral. It adds a link sample and three WCAG checks under the preview (body text on background, button label on primary, links on background), on the same scale as the industry cards.
    - The toolbar has **Preview** (desktop) and **UI** (mobile).
    - The **A11y** panel now also shows the color-blind view.
  - **Launch article:** `/blog/palettes-on-a-real-website` (category Guides, linked from the blog index). It embeds the live preview with an example palette. Its contrast figures are computed: white on #FACC15 is 1.53:1, on #22C55E 2.28:1, on #3B82F6 3.68:1 (near-black on that blue is 5.13:1); a #3B82F6 link is 4.85:1 on #0F172A and 3.52:1 on #F8FAFC.
  - Blog prose rules now skip anything inside `.not-prose`, so embedded components keep their own spacing. Other posts are unchanged.
  - **Before Show HN:** the color-blind view is a simple matrix in gamma-encoded sRGB, and the article says it is an approximation. A linear-RGB model (Machado et al., 2009) would hold up better to technical readers.
- **3 new industry pages (owner, 2026-10-29: "aava pacha kik top searching ma hoy aeva 3 topic").**
  - **Pages:** `/best-colors-for/luxury-brand-websites`, `/best-colors-for/corporate-websites`, `/best-colors-for/portfolio-websites`.
  - **Why these three:**
    - Google autocomplete adds "website" to each of them: "luxury color palette for website", "corporate color palette for website", "website color palette for portfolio".
    - None overlaps the 24 existing pages or the healthcare experiment. Spa, therapy, fashion and interiors were left out for overlap or non-website intent.
    - The SERPs are weak: agency blogs and a forum for luxury and corporate, and auto-generated spam on hacked subdomains for portfolio.
    - No volume data: industry palette queries are long tail (under 1K a month each, per the research).
  - **What each page has:**
    - The same previewed-palette format as the 8 upgraded pages: 6 palettes drawn as sample sites, palette sets in `lib/seo/industry-palettes.ts`.
    - `authoredOnly`: hand-written takeaways, 7 sections and 6–7 FAQs, with no template blocks.
    - Contrast: all 18 palettes pass AAA body text and AA buttons, links, badges and cards (checked by script before writing). Every contrast figure in the copy is computed.
  - **Experiment:** these pages are in neither group of the Nov 20 / Dec 18 read. Track them separately; they aren't part of the 8-vs-16 comparison.

## Next session: start here (updated 2026-10-19)

**State:**
- Phases 1–4, the redesign of every page except `/generator` and the header, and the SEO/AEO/GEO/LLM push are **live on hueflow.site** (deployed 2026-10-17, worker version `6790adae`).
- Git: `feature/new-feature` was merged into `develop` (fast-forward) and both are pushed; `develop` and `origin/develop` were at `82a78d8` at deploy time. A merge with the remote copy of `feature/new-feature` had conflicts in 7 files; the local (newer) versions were kept, the remote commit was an older snapshot of the same redesign.
- Deploy used `npx opennextjs-cloudflare build` then `npx opennextjs-cloudflare deploy` from a clean `develop`, with the dev server stopped first. The build logs "Failed to copy node_modules/ansi-regex / strip-ansi" errors; they did not stop the build or the live site.
- Checked live after the deploy: home, 14 converter pages, `/random-color-generator`, `/color-name-finder`, `/llms.txt`, `/llms-full.txt`, `/robots.txt` and the sitemaps return 200; `/convert/hex-to-rgb` returns 308 to `/hex-to-rgb`; an unknown pair returns 404; `sitemap-pages.xml` lists the 16 new URLs (71 URLs in total); `/community` canonical is correct.
- This docs update is uncommitted on `develop`. **`develop` must be clean before the next deploy**, so commit or discard it first (ask the owner).

**To do, in order:**
1. **Owner decisions still open:**
   - `/generator` (`components/generator/*`, full-screen app, framer-motion): redesign fully, only the chrome around the palette, or leave.
   - Header (site-wide, fades in after load on mobile): change or leave.
   - Overlapping pages: `/color-picker` vs `/tools/picker`, `/colors` vs `/color-codes`, `/tailwind` vs `/tailwind-colors` vs `/tools/tailwind`.
   - Optional: "HueFlow vs Coolors" / "Coolors alternative" pages (need verified comparison points from the owner).
2. **Top 3 pages (above)** are live. Owner: request indexing in Search Console.
   - **Upgrade Next.js**: done and merged into `develop` (see "Next 16 upgrade" above).
3. **Owner actions outside the code** (see "Needs the owner" in the SEO section): real social profile URLs into `socialProfiles`, Google Search Console and Bing Webmaster verification plus sitemap submit and "Request indexing" for the new pages, backlinks and directory listings. Not confirmed as done.
4. **Ads** (see the "Ads" section below): waiting for the Adsterra ad code.
5. **Not yet checked:** the signed-in view of `/profile` (score, streak, invite row, sign-out dialog; needs a login), and the `/colorblind` matrices in `lib/colorblind.ts` (inaccurate, separate task).
6. **Before any deploy** (only on request, from a clean `develop`):
   - `npx tsc --noEmit`
   - `npx eslint` on the changed files (quote paths with `[` in them, and use `xargs` in zsh)
   - Run `npm install` if `package-lock.json` changed, then `npx opennextjs-cloudflare build` and `npx opennextjs-cloudflare deploy` (or `npm run deploy`). Since Next 16 no `--dangerouslyUseUnsupportedNextVersion` flag is needed.

## Ads (status 2026-10-19, nothing built yet)

- **Google AdSense** is already on the site: the script in `app/layout.tsx` (`ca-pub-1726872213486410`, commit 308418b) and `public/ads.txt`. There is no `<ins class="adsbygoogle">` unit anywhere, so ads depend on AdSense Auto ads (check that setting in AdSense so it does not clash with other networks). Whether the AdSense account is approved is not known from the code.
- **Adsterra:** nothing in the code or the git history (all branches). In the Adsterra dashboard the site `hueflow.site` is **Approved** with 3 ad units, all **Inactive** (they need the code on the site, then RESUBMIT): Banner 160x300 (id 30897084), Banner 300x250 (id 30912817), Native Banner (id 30766784).
- **Plan agreed with the owner's questions so far:** use only the **300x250** banner; skip 160x300 and Native Banner for now (poor fit, clickbait risk).
- **Placement plan** (one reusable `AdSlot` client component, lazy-loaded when near the viewport, 250px of space reserved to avoid layout shift, labeled "Advertisement", rendered in only one place per breakpoint because hidden slots still run their scripts), dropped into the shared templates so every page gets one:
  - content pages (`components/seo/content-page.tsx`): desktop sidebar; mobile between Key Takeaways and the next block
  - hubs (`components/seo/hub-page.tsx`, `colors-hub-page.tsx`, `palettes-landing.tsx`): after the featured grid
  - tool pages (`ToolPageSections` in `components/seo/tool-page-sections.tsx`): between "How to use" and the FAQ
  - converter pages (`components/seo/converter-page.tsx`): after "How to convert"
  - landing pages (`components/seo/tool-landing.tsx`): between features and FAQ
  - shades, color-palettes, color-codes, trends: after the first grid, never between palette cards
  - homepage: one slot in the lower half
  - **never:** `/generator`, `/profile`, `/about`, `/contact`, `/privacy`, `/terms`, 404, above the fold, inside a tool UI. Max 1 per page (2 on long content pages).
- **Needed from the owner:** the Adsterra ad code for the 300x250 unit (dashboard, row menu, "Get code"); it carries a unique key, so it can't be generated. Also update `/privacy` to mention Google AdSense and Adsterra cookies.
- Risks to remember: third-party ad scripts can hurt Core Web Vitals (hence the lazy load and reserved space), and Adsterra can serve low-quality ads; test on one page type first.

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

- [x] **Phase 1, shades pages** (built 2026-10-06, live since 2026-10-17)
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
- [x] **Phase 2, palette library and tag pages** (built 2026-10-07, live since 2026-10-17)
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
- [x] **Phase 3, color chart and color-page links** (built 2026-10-07, live since 2026-10-17)
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
- [x] **Phase 4, sitemaps, navigation and homepage links** (built 2026-10-07, live since 2026-10-17)
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
- [x] **Redesign of every page to the new design** (2026-10-08 to 2026-10-17, committed in the commit "Redesign all pages in the new design and add SEO, AEO, GEO and LLM work"): all pages except `/generator` and the header (see "Done" and the notes above)
- [x] **SEO, AEO, GEO and LLM push** (2026-10-17, live): brand entity schema, keyword titles, 14 converter pages, random color generator, color name finder, `llms.txt` + `llms-full.txt`, robots, sitemap, internal links (see the section above)
- [ ] Owner actions: social profile URLs, Search Console and Bing verification, backlinks
- [ ] `/generator` and header redesign (owner decision)
- [ ] Adsterra 300x250 ads (waiting for the ad code, see the Ads section)
- [x] Merged into `develop` and deployed live on 2026-10-17 (worker version `6790adae`)
