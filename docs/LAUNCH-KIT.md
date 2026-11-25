# HueFlow launch kit (drafted 2026-10-24)

Ready-to-paste text for the launch and directory listings in the research plan (week 2 submissions, launch first planned for **Tue–Wed Nov 17–18, 2026**, moved on Nov 19 to Show HN **Tue Nov 24** and Product Hunt **Tue Dec 1**). The owner posts everything from their own accounts. Nothing here has been submitted.

## Status and schedule (updated 2026-11-14; pause note 2026-11-19)

**2026-11-19:** the owner paused new pages until about Dec 3 so the launch and listings come first. GA4 for Nov 12–19 lists 34 sessions, only from Direct, Organic Search, AI Assistant and Unassigned. There are no Referral or Social sessions, so nothing came from Product Hunt, Hacker News or Reddit. The Nov 17–18 posts may not have gone out yet. See "More listings" at the end for more places, checked on Nov 19.

**Ready on the site (live from 2026-11-14):**
- Generator Preview with contrast checks.
- Color-blind view using the Machado et al. (2009) model.
- The launch article, `/blog/palettes-on-a-real-website`.
- 21 rewritten color pages and 3 new industry pages.

**Screenshots:** the 5 below were captured on 2026-11-14 at 1600×1000 and sent in chat. They are kept outside the repo.

**New schedule (owner confirmed 2026-11-19: "Ha, chalse").** The owner hadn't posted the Nov 17–18 launch yet. The order starts small: Reddit feedback arrives before Hacker News, and Thanksgiving week is skipped. IST times are for the owner.

| When | Owner (from your own accounts) |
|---|---|
| Fri Nov 20 | r/SideProject post, a short "what I built and why". |
| Sat Nov 21 | Showoff Saturday threads in r/webdev and r/web_design. Fix anything readers report before Tuesday. |
| Mon–Wed Nov 23–25 | Submit to SaaSHub, Uneed, AlternativeTo, TOOOLS.design and Microlaunch. These have no fixed date. |
| **Tue Nov 24, 8–10 am ET (6:30–8:30 pm IST)** | Show HN. Stay in the thread for the first 2–3 hours. |
| Thu–Fri Nov 26–27 | Nothing. It's Thanksgiving and Black Friday in the US, so these sites are quiet. |
| Sat–Sun Nov 28–29 | Schedule Product Hunt. |
| **Tue Dec 1, 12:01 am PT (1:31 pm IST)** | Product Hunt launch day. Post the maker comment and answer every comment that day. |
| First week of Dec | Pantone 2027 page goes out as soon as the color is announced (see "After launch"). |
| Any time | PRs to awesome-a11y and awesome-tailwindcss, written by hand. |
| After launch | Send the founder name, short bio and social profile links, so the About page and the `sameAs` schema can be filled in. |

Original plan (not carried out): Product Hunt Nov 17, Show HN Nov 18, r/SideProject Nov 18–19, Showoff Saturday Nov 21.

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

### Show HN (moved to Tue Nov 24, around 8–10 am ET)
- **The owner writes the title, text and every comment by hand.** The HN guidelines (checked 2026-11-20) say "Please don't put generated text in HN posts. Write your text yourself" and, for comments, "Don't post generated text or AI-edited text." So the text below is a list of facts to write from, not something to paste, and no session should draft or polish HN text.
- Show HN needs something people can try without signing up. HueFlow qualifies. Its guidelines also ask makers to "Explain how and why", so post a first comment right after submitting.
- Link `/generator` rather than the homepage, so readers land on the thing they can try.
- Readers will notice that the site loads AdSense and GA4. Say so plainly if asked.
- **Title idea:** Show HN: HueFlow – preview color palettes on a sample website with WCAG contrast. The preview is a small dashboard (nav, stat cards, badges, a link, three buttons), so "sample UI" is more accurate than "website".
- **Facts the old draft used (notes only):**
  > I kept choosing palettes that looked good as swatches and failed on a real page. HueFlow shows each palette on a sample UI and computes WCAG contrast for text, buttons and links (plus a color-blindness simulation using the Machado 2009 model) before you export to Tailwind/CSS/Swift. Industry pages (healthcare, law firm, restaurant...) show ready palettes the same way. Built with Next.js on Cloudflare Workers. Free, no account. Feedback welcome, especially on how the contrast and preview should work.
- Stay in the thread for the first 2–3 hours and answer technical questions plainly.

### Reddit
- **r/web_design and r/webdev:** projects only in the **Showoff Saturday** thread (Sat Nov 21). Post a screenshot of the sample-website preview, one paragraph, and the link.
- **r/SideProject:** a short "what I built and why" post on Nov 18 or 19.
- Check each subreddit's rules on the day. Say you're the maker, and don't post the same text everywhere.

### GitHub list: bradtraversy/design-resources-for-developers
- **Paused:** commit "chore: pause new resource submissions" on 2026-10-18 (checked 2026-11-19). Skip it until the README says submissions are open again.
- If it reopens: its links are nofollow, so it's for discovery, not ranking. One line under Colors in the list's format, after reading the contributing rules.

## More listings (checked 2026-11-19, during the pause on new pages)

These were researched on 2026-11-19 from the public pages and GitHub. Nothing was submitted. Fazier and Microlaunch terms come from third-party reviews, so confirm them on their own sites first. The owner submits everything.

**Write these in your own words.** Some lists now reject anything that reads as AI-written, and Hacker News and Reddit readers spot it fast. Use the drafts in this file as notes, not as the final text.

| Order | Where | How | Cost | Notes |
|---|---|---|---|---|
| 1 | **SaaSHub** (saashub.com/services/submit) | Form | Free | Add categories (Design Tools, Color Tools, Accessibility) and competitors (Coolors, Adobe Color, Color Hunt, Paletton). Without competitors the listing sits at the bottom of the queue, and verifying with an @hueflow.site email moves it up. They ask the owner to submit in person. |
| 2 | **awesome-a11y** (github.com/brunopulis/awesome-a11y) | Pull request | Free | Section "Colors and Contrast". Alphabetical order, a short description, no duplicates. The last tool was merged Aug 3, 2026, so expect a slow review. |
| 3 | **awesome-tailwindcss** (github.com/aniftyco/awesome-tailwindcss) | Pull request | Free | "Tools" section. Format `[HueFlow](https://hueflow.site) - Description.` (capital first letter, ends with a period, doesn't start with "A" or "The"), using the list's emoji tags (🎨 color, 🌍 online, 🔧 generator). **Its CONTRIBUTING.md bans PRs written or drafted by AI**, and the PR template asks you to confirm a human wrote it after using the tool. So write the line and the PR yourself, by hand. Tool PRs were merged on Oct 25 and 27, 2026. |
| 4 | **A11y Project resources** (a11yproject.com/contribute) | PR to `src/_data/resources.json`, or contact them | Free | They review case by case: the content, how accessible the site itself is, and who made it. No UTM links. Run an accessibility check of hueflow.site before you submit. |
| 5 | **Microlaunch** (microlaunch.net) | Form, free queue | Free (Pro about $39) | Link type not confirmed. |
| 6 | **Fazier** (fazier.com/submit) | Form | The free plan needs a Fazier badge or link on hueflow.site; paid about $19–49 | Adding a badge is a site change, so decide that first. |
| 7 | **Sidebar.io** (sidebar.io/submit) | Form after login | Free | Very selective (five links a day). Submit the launch article, not the homepage. |
| — | DevHunt | — | Free listing is nofollow | Weak fit: developer tools only. |
| — | Awesome-Design-Tools (goabstract) | — | — | Skip it: last push 2024-07-28, 222 open PRs. |

No well-kept general "awesome color" list exists: the ones found are tiny or were last pushed in 2019. Peerlist, Indie Hackers and Codrops weren't checked (the pages blocked the research tool).

## After launch
- Run `npm run indexnow -- --sitemap` after the deploy that's live for the launch.
- Note referral visits and new referring domains for the Dec 18 review.
- **Pantone 2027 (expected first week of December):** publish the prepared page within hours of the announcement and pitch it to writers (Qwoted, Featured.com, Source of Sources).
