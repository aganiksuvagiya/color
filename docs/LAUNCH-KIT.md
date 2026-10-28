# HueFlow launch kit (drafted 2026-10-24)

Ready-to-paste text for the launch and directory listings in the research plan (week 2 submissions, launch on **Tue–Wed Nov 17–18, 2026**). The owner posts everything from their own accounts. Nothing here has been submitted.

## The hook (lead with this everywhere)

Generic "free color tools" launches get 1–5 points on Hacker News. Launches that do something specific get hundreds. HueFlow's specific thing:

> **See a palette on a real website before you use it.** Every palette can be previewed on a sample UI, with WCAG contrast computed for text, buttons and links, plus a color-blindness check, then exported to Tailwind, CSS or code.

Where it shows:
- `/generator`: the **Preview** button (**UI** on phones) opens the UI preview. Every label there picks the most readable text color, and three WCAG checks sit underneath: body text, button label, links. The **A11y** panel has the contrast table and the color-blind view. Before 2026-10-29 the generator had no button for the preview, and its labels were always white.
- `/best-colors-for/healthcare-websites` (and 7 more industries): each palette on a sample website with contrast scores.
- **Launch article:** `/blog/palettes-on-a-real-website` ("Why We Show Every Palette on a Website First"). It explains the hook with real numbers (white on a #FACC15 button is 1.53:1) and embeds the live preview, then covers how contrast is computed and how the site is built. Link to it from the Show HN first comment and the r/SideProject post. Update its `published`/`updated` dates in `lib/blog/posts.ts` to the day it goes live.

## Listing basics

- **Name:** HueFlow
- **URL:** https://hueflow.site
- **Tagline (≤60 chars):** Color palettes you can see on a real website first
- **Short description (~160 chars):** Free color palette generator that previews every palette on a sample website with WCAG contrast, then exports to Tailwind, CSS, SCSS, JSON or Swift.
- **Long description:**
  > HueFlow is a free color workspace for designers and developers. Generate a palette with the space bar, lock the colors you like, and see it on a sample website with contrast scores for text, buttons and links before you commit to it. Every palette gets a color-blindness check and exports to Tailwind, CSS, SCSS, JSON, Figma tokens, Swift, Android, SVG, PNG, ASE or PDF.
  >
  > Around the generator there are 140 named color pages, shades of every color, converters (HEX, RGB, HSL, CMYK, OKLCH), a contrast checker, and industry palettes (healthcare, dental, restaurant, law firm...) shown on sample websites. No account needed.
- **Pricing:** Free
- **Categories / tags:** Design tools, Color, Developer tools, Accessibility, Tailwind CSS
- **Screenshots to prepare (1270×760 or 1600×1000):**
  1. The generator with the UI preview open.
  2. The accessibility panel showing contrast results.
  3. `/best-colors-for/healthcare-websites`: a palette card with its sample website and contrast badges.
  4. The export panel with Tailwind selected.
  5. `/color-codes`: the HEX/RGB/HSL/CMYK table.

## Per platform

### Uneed (uneed.best)
- Free launch queue, or pay to skip. Its help center says every launch gets a lifetime dofollow link. Submit early in week 2 (the queue can take weeks).
- Use the tagline, the short description, the long description and screenshots 1–4.

### TOOOLS.design and AlternativeTo
- **TOOOLS.design:** use the short description and the Color category.
- **AlternativeTo:** list HueFlow as an alternative to **Coolors, Adobe Color, Color Hunt and Paletton**. Say plainly what differs, with no claims about competitors: "Free, no account needed, previews palettes on a sample website with WCAG contrast, exports to Tailwind/CSS/Swift."

### Product Hunt (launch Tue Nov 17, 12:01 am PT)
- **Name:** HueFlow
- **Tagline:** Color palettes you can see on a real website first
- **Description:** use the short description.
- **First comment (from the maker):**
  > Hi Product Hunt! I built HueFlow because I kept picking palettes that looked great as five swatches and fell apart on an actual page: unreadable buttons, links that disappeared, text that failed contrast. So every palette in HueFlow can be previewed on a sample website, with the WCAG contrast of text, buttons and links computed for you, plus a color-blindness check. When it works, export it to Tailwind, CSS, SCSS, JSON or Swift. It's free and there's no account needed. I'd love to hear what you'd want in the preview next.
- **Rules:** don't ask for upvotes or trade votes (that breaks Product Hunt's rules and Google's link-spam policy). Answer every comment on launch day.

### Show HN (Wed Nov 18, around 8–10 am ET)
- Show HN needs something people can try without signing up. HueFlow qualifies.
- **Title:** Show HN: HueFlow – preview color palettes on a sample website with WCAG contrast
- **Text:**
  > I kept choosing palettes that looked good as swatches and failed on a real page. HueFlow shows each palette on a sample UI and computes WCAG contrast for text, buttons and links (plus a color-blindness simulation) before you export to Tailwind/CSS/Swift. Industry pages (healthcare, law firm, restaurant...) show ready palettes the same way. Built with Next.js on Cloudflare Workers. Free, no account. Feedback welcome, especially on how the contrast and preview should work.
- Stay in the thread for the first 2–3 hours and answer technical questions plainly.

### Reddit
- **r/web_design and r/webdev:** projects only in the **Showoff Saturday** thread (Sat Nov 21). Post a screenshot of the sample-website preview, one paragraph, and the link.
- **r/SideProject:** a short "what I built and why" post on Nov 18 or 19.
- Check each subreddit's rules on the day. Say you're the maker, and don't post the same text everywhere.

### GitHub list: bradtraversy/design-resources-for-developers
- Still merging PRs. Its links are nofollow, so this is for discovery, not ranking.
- Add one line under the Colors section, matching the list's format: `[HueFlow](https://hueflow.site) - Generate color palettes and preview them on a sample website with WCAG contrast; export to Tailwind/CSS.`
- Read the README's contributing rules first.

## After launch
- Run `npm run indexnow -- --sitemap` after the deploy that's live for the launch.
- Note referral visits and new referring domains for the Dec 18 review.
- **Pantone 2027 (expected first week of December):** publish the prepared page within hours of the announcement and pitch it to writers (Qwoted, Featured.com, Source of Sources).
