# Why HueFlow gets few users, and what competitors do differently (2026-11-27)

The owner asked: why users aren't coming, where HueFlow is weak, and what gaps show up against 10–15 competitor sites. This note collects HueFlow's own data from Search Console, GA4, whois and robots.txt, plus four research passes over 18 competitor sites, 20 search queries and about 40 listing pages.

**Limits of the research:**
- The web search tool is not Google. Its rankings are only a rough guide.
- Reddit, Canva, color-hex.com, coolors.co (Cloudflare challenge), Piktochart, Adobe Express and Product Hunt blocked automated access, so they were skipped and not worked around.
- Product Hunt counts come from hunted.space.

## 1. HueFlow's own numbers

| What | Number | Source |
|---|---|---|
| Domain age | Registered 2026-06-24, so 5 months old | whois |
| External links | **1 in total** (domainarrivals.com, a new-domains list). 10,984 internal links. | Search Console, Links |
| Clicks, Oct 28–Nov 24 | 13, all to the homepage. 11 of them from the query "hueflow". 404 impressions, average position 45.6. | Search Console |
| Non-brand pages | Best is /best-colors-for/portfolio-websites at 38.0. /shades 71, /pastel-colors 73, green-and-purple 55, blue-and-orange 52. | Search Console |
| Brand query "hueflow" | Average position **3.0**, not 1 | Search Console |
| Indexing | 256 indexed, 303 not. Crawled - currently not indexed 171. Discovered - currently not indexed 72. noindex 28. Alternate canonical 23. Redirect 6. 404 2. | Search Console, data to Nov 23 |
| Crawled, not indexed: by type | /colors 55 (+12 hex URLs), /color-meanings 53 (+24 hex URLs), gradients 4, tools 3, and 1 each for an industry page (insurance) and a blog post (behr-grounded). /colors/blue was crawled Nov 24 with the rewrite and is still not indexed. | Search Console |
| Server health | 2.31K Googlebot requests in 90 days (about 25 a day), 337 ms average. 5% 5XX, but every example is www or favicon, and the last one was Oct 11. | Crawl stats |
| Manual actions | None | Search Console |
| Sessions, Oct 30–Nov 26 | **157.** Direct 105, google 26, chatgpt.com 11 (1 min 30 s average, the best engagement), accounts.google.com 7 (sign-ins), bing 2, duckduckgo 2, yahoo 1, m.facebook 1, yandex 1. **No Reddit, HN or Product Hunt.** | GA4 |
| Another engine | The search tool knows only 6 hueflow.site pages. A search for "hueflow" shows an older **Hueflow palette generator on itch.io (2018)** and the "Flow for Hue" app, but not hueflow.site. | WebSearch |

**What is not the cause:**
- Server errors: none since Oct 11.
- Manual actions: none.
- robots.txt: Googlebot is allowed.
- Speed: 337 ms average response.
- Factual errors on the industry pages. The SERP pass flagged three; all three were checked and are correct:
  - Automotive 3.76 vs 5.26: white on #EF4444 is 3.76:1, and #EF4444 links on #0A0A0A are 5.26:1.
  - "Contrast ratios multiply": 5.84 × 3.39 = 19.80, which is the ratio of white to #0A0A0A.
  - Pet #3E8E9E: an intentional example of a failing color.

## 2. Why users aren't coming, ranked

1. **No distribution yet.**
   - The launch posts haven't gone out, and GA4 has zero Reddit, HN or Product Hunt sessions.
   - Every competitor's largest jump came from one launch:
     - Coolors: #1 on Product Hunt, about 1.4K upvotes (2014).
     - Color Hunt: #2 (2015).
     - UI Colors: 301 upvotes (2022).
     - Huemint: Show HN with 335 points (2022).
   - Most direct traffic is probably the owner and bots.
2. **No links, on a new domain.**
   - One external link, on a 5-month-old domain.
   - Google crawls the rewritten pages but declines to index many of them (171 crawled-not-indexed, including /colors/blue), and ranks the rest at 45–80.
   - More pages won't fix this. Links and mentions will.
3. **The Oct 19 site-wide drop.**
   - Impressions went from about 240 a day to about 8, and were about 28 a day after the Nov 14 rewrites.
   - docs/GROWTH-PLAN.md has the details: hundreds of template pages, then a redesign that changed every page at once.
   - It is recovering slowly, if at all.
4. **The head terms are locked.**
   - These queries go to Figma, Adobe, Canva, HubSpot, Shopify, Wikipedia and WebAIM:
     - "color palette generator";
     - "contrast checker";
     - "teal color meaning";
     - "camel hex";
     - "colors that go with navy";
     - "color of the year 2027".
   - The winnable queries are the industry website-palette ones (travel, pet, SaaS, automotive). There the top results are weak pages from small sites:
     - colorswall user palettes from 2022;
     - 300-word ColorArchive pages;
     - an auto-generated simplified.com page.
   - HueFlow used to rank 3–8 on exactly these.
5. **The brand name is shared.**
   - The 2018 itch.io "Hueflow" palette generator and "Flow for Hue" compete for the name, and HueFlow sits at position 3 for its own name.
   - Use "HueFlow (hueflow.site)" in every listing and profile.
6. **Few trust signals on the pages.**
   - The author is the Organization "HueFlow", with no person.
   - Industry pages show no visible updated date.
   - There is no About page (waiting on the owner's name, bio and socials).
   - There are no images apart from the logo.
   - Competitors that rank for industry palettes show an author and date (inspoai, Duda, Weblium) and use images (screenshots, swatch PNGs).
7. **Nothing brings people back without search.**
   - There is no browser extension, Figma plugin or community. For comparison:
     - Color Hunt's new-tab extension has 200K users.
     - Realtime Colors' Figma plugin shows 10,493 uses.
     - Color Hunt's users submit the palettes.

## 3. Competitors studied

**Tools (product and growth):**

| Site | What it has that HueFlow doesn't | How it got users |
|---|---|---|
| Coolors | User-published palettes, trending, saves; a page for every hex; iOS app; Chrome extension; Figma and Adobe plugins. Freemium, about $3 a month. | Product Hunt #1 in 2014 (about 1.4K upvotes); in the big awesome-design lists |
| Adobe Color | Trends from Behance and Stock; Creative Cloud Libraries | Built into Creative Cloud since the Kuler days |
| Color Hunt | User submissions, likes without login, a daily pick, weekly email (3,000+) | Product Hunt #2 in 2015; Color Tab extension (200K users); users became the content within a week, per the founder |
| Realtime Colors | Font pairing, dashboard and blog templates, light/dark toggle, QR preview on phone, shadcn/DaisyUI/MUI/Flutter presets | Figma plugin (10.5K uses), open source (935 stars), CSS Weekly and Muzli. Product Hunt only 59 upvotes. |
| Huemint | Machine-learning palettes assigned to roles, brand mockups | Show HN with 335 points (2022), Product Hunt #9 |
| UI Colors | Tailwind 50–950 scales, shadcn themes, Figma plugin, paid API, affiliate program | Product Hunt 301 upvotes; awesome-tailwindcss |
| ColorMagic | Palettes from a text prompt, 5 languages | 9,028 palette pages per language; says about 200K monthly users |
| mycolor.space | 25 palette types from one color | Product Hunt #7 (2020), awesome lists |

**Content sites:**

| Site | Pages | What its pages have |
|---|---|---|
| colorhexa | About 16.8M hex pages | Conversions, harmonies, shades, a color-blindness simulation with 9 types |
| encycolorpedia | Unknown | Paint matches from 20 brands, ASE/ACO/GPL/tokens downloads, WCAG table with the nearest passing shade |
| schemecolor | 34,163 | Palette pages with PNG/PDF/SVG downloads, Pantone and RAL codes, Pinterest sharing |
| htmlcolorcodes | 262 color pages | Downloadable 1920×1080 swatch image (also the og:image) |
| media.io | 876 palette pages, 202 color pages | 21–22 palettes per page with an image each; codes and meaning on one URL |
| Picsart | 106 | Meaning and codes on one URL, 15 templates |

**Search competitors on HueFlow's queries:**
- colorswall: 6+ queries.
- adobe and figma: 5 each.
- piktochart and simplified: 4 each.
- shopify, media.io, inspoai and hubspot: 3 each.

The closest copies of HueFlow's industry format:
- inspoai.io: 4 palettes per page, contrast table, CSS and Tailwind export, dark version, FAQ, named author, about 1,400 words.
- ColorArchive.
- colorslabs, ilovehue.co and gecdesigns.

## 4. What HueFlow already does better

HueFlow has more tools than most competitors: generator, picker, contrast, contrast-fixer, colorblind simulator, image colors, SVG recolor, Tailwind scale, OKLCH, design tokens, palette visualizer and mixer. So **missing features are not the main gap.**

**Unique among the sites checked:**
- Color-blindness simulation on a full website preview. Realtime Colors has none; Adobe and Coolors only simulate swatches.
- WCAG checks for each UI role: body text, button label, link and badge.
- Swift and JSON export.
- Industry palette pages rendered as live sample sites with contrast checks, which none of the competitors' sitemaps have.
- Sourced, dated writing and HueFlow's own computed data. Competitors use templated, marketing or AI-looking text.
- Article, FAQ and Breadcrumb structured data. colorhexa, encycolorpedia, schemecolor and htmlcolorcodes have none, and htmlcolorcodes loads its color text client-side.

The sharpest launch hook is: "See your palette on a real website through color-blind eyes, with every button and link contrast checked." On HN, plain palette tools got 1–2 points (Paletra, Colorcura, a Tailwind mock-UI preview). Tools with a clear angle did far better: Uchū 681, Poline 291, Huemint 335.

## 5. Gaps, ranked

**Distribution (biggest):**
1. Launch posts with the hook above. The owner writes them; HN and some lists ban AI-written text.
2. Listings: HueFlow is on none of the 22 listicles or 12 directories checked. See section 6.
3. A Figma plugin or a browser extension. Realtime Colors and UI Colors grew through Figma; Color Hunt through a new-tab extension. This is a bigger project; decide after the launch.
4. User-submitted palettes with likes and no login (Color Hunt's model). This is also a bigger project.

**On-page trust (fits the current pause, because these are fixes to existing pages):**

5. A person as author, plus an About page, once the owner sends name, bio and socials. Then a visible "Updated <date>" on industry, color and combination pages.
6. Images:
   - a swatch PNG or og:image per palette and per color, which competitors use for links, image search and Pinterest;
   - optional ASE/GPL/tokens downloads.
7. Internal links:
   - Swatches on /colors pages are not links. The camel page links to only 5 other color pages.
   - Meaning, color and combination pages hardly link to each other.
   - Colorhexa and encycolorpedia link every swatch.
8. A color-blindness preview on combination pages, using the existing simulator. "Do these two stay distinct?" is the real question there.

**Content (after about Dec 3, and only after links start, since Google is holding back current pages):**

9. Missing color names that all return 404 today, while htmlcolorcodes, media.io or Picsart have them:
   - sage
   - burgundy
   - mauve
   - taupe
   - terracotta
   - champagne
   - emerald
   - navy-blue
   - cream
   - mint
10. Industry pages: competitors show more palettes per page (inspoai 20, media.io 22, gecdesigns 50) and a dark version. HueFlow's 6 previewed palettes are deeper, so adding a few, plus a dark variant, is optional.
11. Meaning and codes sit on separate URLs (/colors/<name> and /color-meanings/<name>), while the ranking pages combine them. Changing this is risky; consider it only for colors where both pages are weak.

**Small items:**

12. robots.txt conflicts:
    - Cloudflare's managed block disallows GPTBot, ClaudeBot, Google-Extended and others.
    - The site's own block allows them.
    - ChatGPT search bots (OAI-SearchBot, ChatGPT-User) aren't in Cloudflare's block, and chatgpt.com is HueFlow's best-engaged source.
    - Decide one policy in the Cloudflare dashboard. That is the owner's setting.

## 6. Where to get listed

All of these need the owner, and their own words where the rules ask for it.

**Directories:**
1. **toools.design**, "Colors in Context" (lists Realtime Colors, UI Colors, Huemint, Happy Hues). Submit at /submission with a 120-character description. They accept fewer than 4% of tools.
2. **AlternativeTo**, as an alternative to Realtime Colors and Coolors. Needs an account; the queue is long, so start early. It declines "simple single-purpose online tools", so describe the whole suite.
3. **awesome-tailwindcss** (15.2K stars), 🎨 color group. A pull request written entirely by the owner; AI-written submissions are banned. See [[no-ai-text-platforms]] in memory.
4. **SaaSHub**: free, register and verify.
5. **awesome-a11y**, "Colors and contrast": a pull request in alphabetical order.
6. **Uneed** (free queue) and **Sidebar.io** (login, 5 links a day), during Product Hunt week.

**Listicles that invite suggestions:**
- **The dev.to "4 Free Tools to Visualize Your Color Palette on Real UI Components" post** (darwinphi). It asks readers to name tools in the comments, and it is HueFlow's exact category.
- **Stéphanie Walter's color accessibility tools list.** Comments are open and there is a contact form.
- **htmlcolorcodes' "best palette generators" post.** It has a "drop us a line" link.
- **Inspo AI's Coolors alternatives page.** It has a "Get your app listed" link, but Inspo AI is a competitor.
- **The Atomic Object contrast post.** It has a comment form.

**Not usable:**
- free-for.dev: excludes browser tools and bans LLM-written PRs.
- design-resources-for-developers: submissions paused since Oct 18.
- Awesome-Design-Tools and gztchan/awesome-design: dead.
- Toolify: AI tools only.

**Reddit** couldn't be checked. The owner can search r/web_design, r/webdev, r/tailwindcss, r/UI_Design, r/accessibility and r/Frontend.
