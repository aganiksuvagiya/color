import type { ContentSection, FaqItem, HexVariant, SourceLink } from "./content";

// Hand-written /colors pages for color names that mean more than one hex code. Each page
// shows every code in use side by side (the first is the one most people mean), explains
// where each comes from, and cites its sources. Contrast figures are WCAG ratios computed
// from the hex values.

export type ColorPageRewrite = {
  title: string;
  description: string;
  answer: string;
  keyTakeaways: string[];
  sections: ContentSection[];
  faq: FaqItem[];
  hexVariants: HexVariant[];
  sources: SourceLink[];
};

export const richColorPages: Record<string, ColorPageRewrite> = {
  azure: {
    title: "Azure Color Hex Code: #007FFF vs #F0FFFF",
    description:
      "Azure has two hex codes: azure blue #007FFF and CSS azure #F0FFFF. Compare them side by side, with RGB, CMYK, contrast, shades and history.",
    answer:
      "Azure has two hex codes in common use. Azure blue, the bright sky blue most people mean, is #007FFF (RGB 0, 127, 255), halfway between blue and cyan. The CSS color named azure is #F0FFFF (RGB 240, 255, 255), a near-white cyan tint. Use #007FFF for accents and #F0FFFF for soft backgrounds.",
    hexVariants: [
      {
        label: "Azure blue",
        hex: "#007FFF",
        note: "The sky blue of art, heraldry and color theory. Some sources round it to #0080FF.",
      },
      {
        label: "CSS azure",
        hex: "#F0FFFF",
        note: "What you get when you write azure in CSS: a near-white cyan from the old X11 color list.",
      },
    ],
    keyTakeaways: [
      "Azure blue is #007FFF (RGB 0, 127, 255), a bright sky blue halfway between blue and cyan.",
      "CSS azure is #F0FFFF (RGB 240, 255, 255), a near-white cyan tint, not a sky blue.",
      "The name comes from the Persian word for lapis lazuli, by way of Arabic, Latin and French.",
      "#007FFF has 3.83:1 contrast on white: fine for large text and icons, too light for body text.",
    ],
    sections: [
      {
        title: "Two colors called azure",
        body: "Ask a painter, a flag maker or a color-theory book for azure and you get a vivid sky blue: #007FFF, with the blue channel at full and green at half. Type azure into CSS and you get #F0FFFF, a tint so pale it is nearly white. Both are correct; they just come from different traditions. You'll also see azure blue written as #0080FF. Half of 255 is 127.5, so sources round the green channel to 127 or 128, and the two codes look identical on screen.",
      },
      {
        title: "Where the name comes from",
        body: "Azure is named after lapis lazuli, the deep blue stone. The Persian name for the stone, lāžaward, passed into Arabic as lāzaward and into medieval Latin, then into French as azur, which is where English took it from. The same root gives Italian azzurro and Spanish azul. The first recorded use of azure as a color name in English is from 1374, in Chaucer's Troilus and Criseyde.",
      },
      {
        title: "Azure in heraldry and sport",
        body: "In heraldry azure is the formal name for blue, one of the main tinctures on coats of arms. Black-and-white engravings, which couldn't show color, marked azure with horizontal lines. The word also lives on in sport: Italy's national teams are known as gli Azzurri, 'the blues', after the blue shirts they play in.",
      },
      {
        title: "Why CSS azure is almost white",
        body: "Early web colors were borrowed from the X11 color list, a set of named colors written for Unix displays in the 1980s. Many of its names don't match their traditional meaning, and X11 drew azure as a pale cyan-white rather than a sky blue. CSS kept the name and the value, so color: azure still gives #F0FFFF today. If you want azure blue in CSS, write the hex code #007FFF.",
      },
      {
        title: "How to use azure blue #007FFF",
        body: "Azure blue is bright, friendly and a little energetic, which suits technology, travel and consumer apps. On white it reaches 3.83:1 contrast. That passes WCAG AA for large text, icons and UI parts, but not for body text or small links. For readable text, darken it to #0066CC, which reaches 5.57:1. Its opposite on the color wheel is orange, so a small orange accent makes it stand out, and navy and white give it a calm, trustworthy frame.",
      },
      {
        title: "How to use CSS azure #F0FFFF",
        body: "CSS azure works as a whisper of color behind content: a card, a sidebar, a highlighted table row. Its contrast with white is only 1.03:1, so on a white page it nearly disappears; give it a border or set it on a slightly gray background if the edge matters. Text is no problem on top of it, since near-black text reaches more than 17:1. Never use it for text or icons on white.",
      },
    ],
    faq: [
      {
        question: "What is the hex code for azure?",
        answer: "Azure blue, the sky blue most people mean, is #007FFF (RGB 0, 127, 255; HSL 210°, 100%, 50%). The CSS named color azure is #F0FFFF (RGB 240, 255, 255), a near-white cyan. Some sources write azure blue as #0080FF, which looks the same.",
      },
      {
        question: "Is azure blue or cyan?",
        answer: "Azure blue sits exactly between blue (#0000FF) and cyan (#00FFFF) on the screen color wheel, at hue 210°. CSS azure is a very light tint of cyan, at hue 180°.",
      },
      {
        question: "What is the difference between blue and azure?",
        answer: "Pure screen blue, #0000FF, has no green at all. Azure blue, #007FFF, adds green at half strength, which moves it toward cyan and makes it read as lighter, brighter and more like a clear sky.",
      },
      {
        question: "Is azure the same as turquoise?",
        answer: "No. Turquoise (#40E0D0) is a blue-green that leans green, at hue 174°. Azure blue is a sky blue at hue 210°, much closer to blue. Only CSS azure is in the cyan family, and it is almost white.",
      },
      {
        question: "Why is CSS azure almost white?",
        answer: "CSS took its color names from the X11 color list, which defined azure as a pale cyan-white. Writing azure in CSS always gives #F0FFFF; for azure blue, use the hex code #007FFF.",
      },
      {
        question: "Is #007FFF accessible on white?",
        answer: "Only for large text and UI parts. #007FFF has a 3.83:1 contrast ratio on white, below the 4.5:1 that WCAG AA asks for body text. Use #0066CC (5.57:1) for links and small text.",
      },
    ],
    sources: [
      { title: "Azure (color), Wikipedia", href: "https://en.wikipedia.org/wiki/Azure_(color)" },
      { title: "CSS Color Module Level 4: named colors, W3C", href: "https://www.w3.org/TR/css-color-4/#named-colors" },
    ],
  },
  "light-yellow": {
    title: "Light Yellow Hex Code: #FFFFE0 vs #FFFFC5",
    description:
      "Light yellow has no single hex code: CSS uses #FFFFE0, Figma #FFFFC5, other sites #FFFFED. See all three side by side, with RGB, contrast and pairings.",
    answer:
      "Light yellow has no single hex code. The CSS color named lightyellow is #FFFFE0 (RGB 255, 255, 224), a barely-there cream yellow. Figma lists light yellow as #FFFFC5, which shows more color, and some sites use #FFFFED. All three are background colors; none works for text on white.",
    hexVariants: [
      {
        label: "CSS light yellow",
        hex: "#FFFFE0",
        note: "The web's named color: write lightyellow in CSS and you get this.",
      },
      {
        label: "Figma's light yellow",
        hex: "#FFFFC5",
        note: "Less blue, so it reads as clearly yellow, even on a white page.",
      },
      {
        label: "Paler variant",
        hex: "#FFFFED",
        note: "Listed by some color sites. On screen it is hard to tell apart from #FFFFE0.",
      },
    ],
    keyTakeaways: [
      "CSS light yellow is #FFFFE0 (RGB 255, 255, 224); Figma's light yellow is #FFFFC5.",
      "All three codes have red and green at full; only the blue channel changes how pale they look.",
      "Light yellow is a background color: its contrast with white is about 1.02:1.",
      "It feels soft and cheerful, and it brightens dim rooms and pale UI surfaces.",
    ],
    sections: [
      {
        title: "Three codes for one name",
        body: "On a screen, yellow is red light plus green light. All three light yellows keep red and green at full strength (255) and differ only in how much blue they add back, and more blue means paler. #FFFFC5 has the least blue (197), so it looks the most yellow. CSS #FFFFE0 has 224 and reads as a soft cream. #FFFFED has 237 and is almost white. That is why three sites can show three different light yellows and all be close enough.",
      },
      {
        title: "Which light yellow to use",
        body: "Use #FFFFE0 when you want the standard named color, or when you write lightyellow in CSS anyway. Use #FFFFC5 when the yellow needs to be seen, for example on a page that is already white, where #FFFFE0 can pass for off-white. Design systems usually have their own: Tailwind's yellow-100, for instance, is #FEF9C3 in Tailwind v3, close to Figma's value.",
      },
      {
        title: "What light yellow feels like",
        body: "Light yellow keeps yellow's optimism but drops its urgency. It suggests morning light, butter and fresh linen rather than warning signs, so it feels warm, gentle and welcoming. In large areas it can feel a little old-fashioned or sleepy; next to crisp white and one strong color it feels fresh.",
      },
      {
        title: "Light yellow in rooms",
        body: "Most people searching for light yellow are choosing paint. Pale yellows are popular for kitchens, breakfast nooks and north-facing rooms, where they make cool, dim light feel warmer. Strong direct sun can push them toward bright yellow, so test a sample on more than one wall and look at it morning and evening. White trim, soft gray, sage green and navy accents all keep a light yellow room from feeling too sweet.",
      },
      {
        title: "Light yellow on screens",
        body: "On screens, light yellow is for highlighted notes, callouts, table rows and 'sticky note' panels. Its contrast with white is only about 1.02:1, so the panel needs a border or a slightly darker edge to show where it ends. Dark text on it is very readable (near-black reaches more than 17:1). Never use light yellow for text, icons or warning colors on a white page: nobody would see them.",
      },
      {
        title: "Light yellow, ivory, lemon chiffon or cream?",
        body: "These pale yellows are easy to mix up. Ivory (#FFFFF0 in CSS) is paler and closer to white. Lemon chiffon (#FFFACD) is a touch warmer and deeper. Cream has no CSS name; most sites use #FFFDD0. Light yellow sits in the middle: clearly yellow next to ivory, cooler and lighter than lemon chiffon.",
      },
    ],
    faq: [
      {
        question: "What is the hex code for light yellow?",
        answer: "The CSS named color lightyellow is #FFFFE0 (RGB 255, 255, 224). Figma uses #FFFFC5 (RGB 255, 255, 197), and some sites list #FFFFED. All three are pale yellows that differ only in the blue channel.",
      },
      {
        question: "What is the light yellow color called?",
        answer: "Besides light yellow, pale yellows go by names like pale yellow, butter yellow, lemon chiffon, cream and ivory. In CSS the name is written as one word: lightyellow.",
      },
      {
        question: "What colors go with light yellow?",
        answer: "Soft gray, white, sage green, navy and dusty blue. Navy or charcoal give it contrast; sage and gray keep it calm.",
      },
      {
        question: "Can I use light yellow text on white?",
        answer: "No. Light yellow has about 1.02:1 contrast with white, far below the 4.5:1 WCAG asks for text. Use it as a background with dark text on top.",
      },
      {
        question: "Is light yellow a good room color?",
        answer: "It's a popular choice for kitchens and rooms with little natural light, because it makes cool light feel warmer. Test a sample first: in strong sun pale yellows can look much brighter than on the paint chip.",
      },
    ],
    sources: [
      { title: "CSS Color Module Level 4: named colors, W3C", href: "https://www.w3.org/TR/css-color-4/#named-colors" },
      { title: "Light yellow color, Figma", href: "https://www.figma.com/colors/light-yellow/" },
    ],
  },
  cyan: {
    title: "Cyan Hex #00FFFF: Cyan vs Aqua vs Process Cyan",
    description:
      "Cyan is #00FFFF on screens, the same color CSS calls aqua. Process cyan, the CMYK print ink, is deeper, about #00B7EB. See the codes, contrast and history.",
    answer:
      "Cyan is #00FFFF (RGB 0, 255, 255) on screens: full green and blue light with no red. In CSS, cyan and aqua are the same color. Process cyan, the blue ink in CMYK printing, is a different, deeper color, usually shown on screens as about #00B7EB.",
    hexVariants: [
      {
        label: "Screen cyan (CSS cyan and aqua)",
        hex: "#00FFFF",
        note: "Green and blue at full strength, no red. CSS treats cyan and aqua as the same color.",
      },
      {
        label: "Process cyan (print ink)",
        hex: "#00B7EB",
        note: "An on-screen approximation of the CMYK ink, which can't reach the brightness of #00FFFF.",
      },
    ],
    keyTakeaways: [
      "Screen cyan is #00FFFF (RGB 0, 255, 255), exactly halfway between green and blue.",
      "In CSS, cyan and aqua are two names for the same color.",
      "Process cyan, the C in CMYK, is a deeper ink color, shown on screens as about #00B7EB.",
      "#00FFFF has only 1.25:1 contrast on white but 16.75:1 on black.",
    ],
    sections: [
      {
        title: "Cyan vs aqua: the same color in CSS",
        body: "Both names come from the X11 color list, which called #00FFFF both cyan and aqua. HTML's original 16 named colors used aqua, a name tied to water, and CSS later accepted cyan as well. Today color: cyan and color: aqua give exactly the same #00FFFF. Outside code, people often use aqua for a softer, greener blue-green, but on screens there is no difference.",
      },
      {
        title: "Cyan vs process cyan",
        body: "Screens make color by adding light, so cyan is green plus blue at full strength. Printers make color by subtracting it: cyan ink absorbs red light and reflects the rest. Real cyan ink, called process cyan, can't match the glow of a screen, so it looks deeper and slightly duller; screens usually show it as about #00B7EB. That's why a design that uses #00FFFF on screen looks calmer in print, and why print work should specify the ink (C100 M0 Y0 K0) instead of a hex code.",
      },
      {
        title: "Where the name comes from",
        body: "Cyan comes from the ancient Greek kyanos, a word for a dark blue enamel and for lapis lazuli. Some trace it to the cornflower, Centaurea cyanus, instead. Either way the original meaning was a deep blue, very different from today's bright blue-green. Cyan was first recorded as a color name in English in 1879.",
      },
      {
        title: "How cyan feels",
        body: "Cyan feels electric, clean and cool. It suggests clear water and ice, and also screens, data and science fiction, because it is one of the purest colors a display can make. A little goes a long way: as an accent it feels fresh and technical, while large areas of full-strength cyan are tiring to look at.",
      },
      {
        title: "Using cyan on screens",
        body: "On white, #00FFFF has only 1.25:1 contrast, so it is useless for text, icons or thin lines there. On black it reaches 16.75:1, which is why cyan works so well as an accent in dark mode, charts and code editors. For a light theme, use a deeper cyan: Tailwind v3's cyan-700, #0E7490, reaches 5.36:1 on white. Cyan's opposite on the screen color wheel is red, and it sits naturally next to magenta and yellow, its partners in print.",
      },
      {
        title: "Cyan, teal or turquoise?",
        body: "Teal (#008080) is cyan at half brightness: darker, calmer and more grown-up. Turquoise (#40E0D0) is softer and leans slightly green, like the stone. Cyan is the brightest and purest of the three, an exact balance of green and blue.",
      },
    ],
    faq: [
      {
        question: "What is the hex code for cyan?",
        answer: "Cyan is #00FFFF on screens (RGB 0, 255, 255; HSL 180°, 100%, 50%). In CSS, the named colors cyan and aqua both give #00FFFF.",
      },
      {
        question: "Are cyan and aqua the same color?",
        answer: "In CSS and HTML, yes: both names mean #00FFFF. In everyday speech and fashion, aqua often describes a softer, greener blue-green.",
      },
      {
        question: "What is the difference between cyan and process cyan?",
        answer: "Cyan (#00FFFF) is the screen color made from green and blue light. Process cyan is the printing ink in CMYK. It is deeper and less bright, and screens show it as about #00B7EB.",
      },
      {
        question: "Is cyan blue or green?",
        answer: "Neither, exactly. Cyan sits halfway between green and blue on the screen color wheel, at hue 180°, with both at full strength.",
      },
      {
        question: "What is the opposite of cyan?",
        answer: "On screens, red (#FF0000). Cyan is made of green and blue light, so red is the one primary it leaves out.",
      },
      {
        question: "What is cyan in CMYK?",
        answer: "Pure process cyan is C100 M0 Y0 K0, and #00FFFF converts to the same values. Printed, it will look like process cyan, deeper than the screen color.",
      },
    ],
    sources: [
      { title: "Cyan, Wikipedia", href: "https://en.wikipedia.org/wiki/Cyan" },
      { title: "Aqua (color), Wikipedia", href: "https://en.wikipedia.org/wiki/Aqua_(color)" },
      { title: "CSS Color Module Level 4: named colors, W3C", href: "https://www.w3.org/TR/css-color-4/#named-colors" },
    ],
  },
  tan: {
    title: "Tan Hex Code #D2B48C: RGB, CMYK, Shades & Meaning",
    description:
      "Tan is #D2B48C in CSS (RGB 210, 180, 140). Get its RGB, HSL and CMYK codes, contrast, shades, where the name comes from and colors that go with it.",
    answer:
      "Tan is #D2B48C (RGB 210, 180, 140; CMYK 0, 14, 33, 18), the CSS named color tan: a light, warm brown like sand or undyed leather. It reads as natural, relaxed and dependable. Dark text works on it (9.0:1 with near-black), but tan itself is too light for text on white.",
    hexVariants: [
      {
        label: "CSS tan",
        hex: "#D2B48C",
        note: "The web's named color, written tan in CSS. It's also the value most color references give for tan.",
      },
    ],
    keyTakeaways: [
      "Tan is #D2B48C: RGB 210, 180, 140, HSL 34°, 44%, 69%, CMYK 0, 14, 33, 18.",
      "The name comes from tannum, the oak bark once used to tan leather.",
      "Tan is a background and accent color: on white it measures only 1.97:1, so never use it for text.",
      "It pairs well with navy, olive, cream, white and terracotta.",
    ],
    sections: [
      {
        title: "Tan color codes",
        body: "Tan is #D2B48C in HEX, rgb(210, 180, 140) in RGB, hsl(34, 44%, 69%) in HSL and roughly 0, 14, 33, 18 in CMYK. In CSS you can write tan or #D2B48C and get exactly the same color. When people search for a 'tan color number', the hex code #D2B48C or the RGB triple 210, 180, 140 is what they need.",
      },
      {
        title: "Where the name comes from",
        body: "Tan comes from tannum, the oak bark that was used to tan leather, and the color is the warm brown of leather treated that way. It was first recorded as a color name in English in 1590. The same root gives us tannin, the bitter compound in bark, tea and red wine.",
      },
      {
        title: "How tan feels",
        body: "Tan is warm, earthy and unfussy. It suggests sand, cardboard, chinos, saddles and leather bags, so it reads as practical and outdoorsy rather than formal. Used everywhere it can look plain or dated; used as one warm neutral next to a stronger color, it makes a palette feel relaxed and natural.",
      },
      {
        title: "Tan in rooms and outfits",
        body: "Tan works as a warmer alternative to gray. Navy gives it the strongest contrast, which is why a tan trench coat or chinos with a navy top is a classic. Olive, cream, white and terracotta keep it earthy, and black makes it look sharper and more modern. In rooms, tan walls or furniture look best with crisp white trim and one deeper accent.",
      },
      {
        title: "Using tan on screens",
        body: "On white, tan measures only 1.97:1, far too low for text, so keep it for backgrounds, cards and illustrations. Near-black text on tan reaches 9.0:1 and reads easily. If you want tan-colored text or links, use a deeper tan such as #6F5638, which reaches 6.85:1 on white. Tan buttons should take dark labels.",
      },
      {
        title: "Tan, beige, khaki or camel?",
        body: "Beige (#F5F5DC in CSS) is paler and cooler. CSS khaki (#F0E68C) is surprisingly yellow; darkkhaki (#BDB76B) is closer to the khaki of uniforms. Camel, often written #C19A6B, is a deeper, more golden brown. Tan sits between them: a sandy, warm light brown.",
      },
    ],
    faq: [
      { question: "What is the hex code for tan?", answer: "Tan is #D2B48C. In CSS you can also just write tan. Its RGB value is 210, 180, 140." },
      { question: "What is the RGB of tan?", answer: "rgb(210, 180, 140). In HSL it's 34°, 44%, 69%, a warm orange-yellow hue at fairly high lightness." },
      { question: "What is tan in CMYK?", answer: "About 0, 14, 33, 18. That's the standard screen-to-print conversion; printed results depend on the paper and printer profile." },
      { question: "Is tan the same as beige?", answer: "No. Beige (#F5F5DC) is paler and cooler. Tan (#D2B48C) is a deeper, warmer, sandier brown." },
      { question: "What colors go with tan?", answer: "Navy, olive, cream, white, terracotta and black. Navy gives the most contrast; olive and terracotta keep it earthy." },
      { question: "Is tan a warm or cool color?", answer: "Warm. Its hue is 34°, on the orange-yellow side of the color wheel." },
    ],
    sources: [
      { title: "Tan (color), Wikipedia", href: "https://en.wikipedia.org/wiki/Tan_(color)" },
      { title: "CSS Color Module Level 4: named colors, W3C", href: "https://www.w3.org/TR/css-color-4/#named-colors" },
    ],
  },
  "forest-green": {
    title: "Forest Green Hex Code #228B22: RGB, Shades & Meaning",
    description:
      "Forest green is #228B22 in CSS (RGB 34, 139, 34). See its codes, contrast on white, shades, history, meaning and the colors that go with it.",
    answer:
      "Forest green is #228B22 (RGB 34, 139, 34; CMYK 76, 0, 76, 45), the CSS color forestgreen: a strong, medium-dark green like summer leaves. It stands for nature, growth and stability. On white it measures 4.39:1, just under the 4.5:1 WCAG asks for body text, so darken it slightly for small text.",
    hexVariants: [
      {
        label: "CSS forest green",
        hex: "#228B22",
        note: "Written forestgreen in CSS, with no space. It comes from the X11 color list.",
      },
      {
        label: "Crayola Forest Green",
        hex: "#5FA777",
        note: "Crayola's crayon of the same name is lighter and more muted.",
      },
    ],
    keyTakeaways: [
      "Forest green is #228B22: RGB 34, 139, 34, HSL 120°, 61%, 34%.",
      "In CSS it's one word: forestgreen.",
      "On white it reaches 4.39:1: fine for large text and icons, just short of AA for body text. #1E7B1E reaches 5.37:1.",
      "It pairs with cream, tan, gold, navy and warm wood tones.",
    ],
    sections: [
      {
        title: "Forest green color codes",
        body: "Forest green is #228B22 in HEX, rgb(34, 139, 34) in RGB, hsl(120, 61%, 34%) in HSL and about 76, 0, 76, 45 in CMYK. In CSS it's written as one word, forestgreen, and gives exactly #228B22. Its red and blue channels are equal, so it's a pure green, neither yellowish nor bluish.",
      },
      {
        title: "A color name from 1810",
        body: "Forest green was first recorded as a color name in English in 1810. It describes the deep green of a temperate forest in leaf, darker than grass and lighter than pine needles in shade. The X11 color list included it, and from there it became one of the named colors in CSS.",
      },
      {
        title: "How forest green feels",
        body: "Forest green feels natural, steady and a little traditional. It's the color of outdoor gear, heritage brands, gardens, and with red, Christmas. Compared with bright greens it looks more grown-up and trustworthy; compared with very dark greens it still has life in it.",
      },
      {
        title: "Forest green in rooms and outfits",
        body: "Deep greens are popular for kitchen cabinets, libraries and accent walls, where they feel rich without being as heavy as black. Forest green pairs well with cream, tan, brass or gold hardware, warm wood and terracotta. In clothing it works with camel, cream and navy.",
      },
      {
        title: "Using forest green on screens",
        body: "On white, forest green measures 4.39:1, just below the 4.5:1 WCAG asks for normal text, though fine for large text and icons. White labels on a forest green button get the same 4.39:1. For buttons and small links, darken it a step to #1E7B1E, which reaches 5.37:1, and keep the original for larger elements.",
      },
      {
        title: "Forest green, green, dark green or sea green?",
        body: "CSS has several greens that are easy to confuse. green (#008000) is a little darker than forest green. darkgreen (#006400) is darker still. seagreen (#2E8B57) leans blue-green. Forest green (#228B22) is the pure, medium-dark green of the group.",
      },
    ],
    faq: [
      { question: "What is the hex code for forest green?", answer: "Forest green is #228B22, written forestgreen in CSS. Its RGB value is 34, 139, 34." },
      { question: "Is forest green a dark green?", answer: "It's medium-dark: HSL lightness 34%. CSS darkgreen (#006400) is noticeably darker." },
      { question: "Is forest green accessible on white?", answer: "Nearly. It measures 4.39:1 on white, enough for large text and icons but just under the 4.5:1 for body text. Use #1E7B1E (5.37:1) for small text." },
      { question: "What is the difference between forest green and green in CSS?", answer: "CSS green is #008000, slightly darker and purer. Forest green, #228B22, is a touch lighter." },
      { question: "What colors go with forest green?", answer: "Cream, tan, gold, navy, terracotta and warm wood tones. Cream and gold give it a classic look." },
    ],
    sources: [
      { title: "Forest green, Wikipedia", href: "https://en.wikipedia.org/wiki/Forest_green" },
      { title: "CSS Color Module Level 4: named colors, W3C", href: "https://www.w3.org/TR/css-color-4/#named-colors" },
    ],
  },
  crimson: {
    title: "Crimson Color Hex #DC143C: Meaning, RGB & Shades",
    description:
      "Crimson is #DC143C in CSS (RGB 220, 20, 60): a deep red with a touch of blue. See its codes, meaning, history, school crimsons and colors that pair with it.",
    answer:
      "Crimson is #DC143C (RGB 220, 20, 60; CMYK 0, 91, 73, 14), the CSS named color crimson: a strong red leaning slightly toward pink and blue. It stands for passion, courage and tradition. White text on it measures 4.99:1, so it works for buttons and headings. Universities use their own deeper crimsons.",
    hexVariants: [
      {
        label: "CSS crimson",
        hex: "#DC143C",
        note: "The web's named color crimson.",
      },
      {
        label: "Alabama Crimson Flame",
        hex: "#9E1B32",
        note: "The University of Alabama's official primary crimson: deeper, closer to maroon.",
      },
    ],
    keyTakeaways: [
      "Crimson is #DC143C: RGB 220, 20, 60, HSL 348°, 83%, 47%.",
      "The name goes back to the kermes insect, whose dried bodies made a costly red dye.",
      "White text on crimson measures 4.99:1, enough for WCAG AA.",
      "Schools use their own crimsons: Alabama's official one is #9E1B32.",
    ],
    sections: [
      {
        title: "Crimson color codes",
        body: "Crimson is #DC143C in HEX, rgb(220, 20, 60) in RGB, hsl(348, 83%, 47%) in HSL and about 0, 91, 73, 14 in CMYK. Its hue of 348° puts it just on the blue side of pure red, which is what gives crimson its deep, slightly cool look.",
      },
      {
        title: "A red made from insects",
        body: "The word crimson traces back to the kermes insect, whose dried bodies were crushed to make a rich and expensive red dye. It reached English through the Arabic qirmizi and the medieval Latin cremesinus; in Middle English, around 1400, it named both the insect and the dye. The Sanskrit kṛmija is a related word.",
      },
      {
        title: "What crimson means",
        body: "Crimson carries red's passion and energy but feels deeper and more serious. It's linked with love, courage and sacrifice, and also with ceremony and tradition, which is why it shows up on academic robes, banners and crests. In large amounts it can feel intense; as an accent it feels confident and rich.",
      },
      {
        title: "School and team crimson",
        body: "Crimson is a school color at several universities. Harvard's teams are known as the Crimson, and Alabama's as the Crimson Tide. Schools publish their own exact values: Alabama's primary 'Crimson Flame' is #9E1B32 (PMS 201), much deeper than CSS crimson. For brand work, always use the official value rather than the CSS one.",
      },
      {
        title: "Using crimson on screens",
        body: "White text on crimson reaches 4.99:1, so crimson works for buttons, banners and headings. As text on white it also reaches 4.99:1. For even stronger contrast, the deeper #B01030 reaches 7.09:1 with white. Crimson pairs well with navy, charcoal, cream, gold and white. Avoid using the same crimson for both brand and error messages.",
      },
      {
        title: "Crimson, red, scarlet or maroon?",
        body: "CSS red (#FF0000) is pure and bright. Crimson is deeper and leans slightly toward blue. Scarlet leans the other way, toward orange. Maroon (#800000) is much darker and browner, and burgundy is a darker, purplish wine red.",
      },
    ],
    faq: [
      { question: "What is the hex code for crimson?", answer: "Crimson is #DC143C in CSS, RGB 220, 20, 60. School crimsons differ: Alabama's official crimson is #9E1B32." },
      { question: "Is crimson red or pink?", answer: "Red, with a hint of blue. Its hue is 348°, just short of pure red at 360°." },
      { question: "What is the difference between crimson and maroon?", answer: "Crimson (#DC143C) is a bright, deep red. Maroon (#800000) is much darker and browner." },
      { question: "What is the Alabama crimson hex code?", answer: "The University of Alabama lists its primary 'Crimson Flame' as #9E1B32 (RGB 158, 27, 50; PMS 201)." },
      { question: "Is crimson accessible with white text?", answer: "Yes. White on #DC143C measures 4.99:1, which passes WCAG AA for normal text." },
      { question: "What colors go with crimson?", answer: "Navy, charcoal, cream, gold and white. Cream and gold give it a classic, collegiate look." },
    ],
    sources: [
      { title: "Crimson, Wikipedia", href: "https://en.wikipedia.org/wiki/Crimson" },
      { title: "University of Alabama brand colors", href: "https://brand.ua.edu/color/" },
      { title: "CSS Color Module Level 4: named colors, W3C", href: "https://www.w3.org/TR/css-color-4/#named-colors" },
    ],
  },
  "alice-blue": {
    title: "Alice Blue Color #F0F8FF: Hex, RGB & History",
    description:
      "Alice blue is #F0F8FF (RGB 240, 248, 255): a near-white blue named after Alice Roosevelt. See its codes, its story, how to use it and colors that pair with it.",
    answer:
      "Alice blue is #F0F8FF (RGB 240, 248, 255), the CSS named color aliceblue: an almost-white tint with a hint of blue. It's named after Alice Roosevelt Longworth, Theodore Roosevelt's daughter, whose favorite color it was. On screens it's a background color; its contrast with white is only 1.07:1.",
    hexVariants: [
      {
        label: "CSS alice blue",
        hex: "#F0F8FF",
        note: "Written aliceblue in CSS; one of the X11 color names from 1987.",
      },
    ],
    keyTakeaways: [
      "Alice blue is #F0F8FF: RGB 240, 248, 255, HSL 208°, 100%, 97%.",
      "It's named after Alice Roosevelt Longworth; 'Alice Blue Gown' was the hit song of the 1919 Broadway musical Irene.",
      "It's nearly white, 1.07:1 against white, so it only works as a background tint.",
      "Dark text on it reads very well: near-black reaches 16.6:1.",
    ],
    sections: [
      {
        title: "Alice blue color codes",
        body: "Alice blue is #F0F8FF in HEX, rgb(240, 248, 255) in RGB and hsl(208, 100%, 97%) in HSL. In CSS it's written as one word, aliceblue. It was one of the color names in the X11 list of 1987, which is where most CSS color names come from.",
      },
      {
        title: "Named after a president's daughter",
        body: "The color is named after Alice Roosevelt Longworth, the daughter of President Theodore Roosevelt, whose favorite color it was; the name dates from around 1905. The shade caught on, and 'Alice Blue Gown' was the hit song of Irene, the Broadway musical of 1919.",
      },
      {
        title: "How alice blue looks",
        body: "On screens, CSS alice blue is so light that most people see it as a cool, slightly blue white. That's what makes it useful: it feels cleaner and crisper than plain white or warm off-white, like good paper or a winter sky, without reading as a color.",
      },
      {
        title: "Using alice blue on screens",
        body: "Use alice blue for cards, sidebars, table stripes and info panels. Against white it measures only 1.07:1, so it almost disappears on a white page: give panels a border or set them on a slightly gray background. Text is easy on top of it: near-black reaches 16.6:1. Never use it as a text color.",
      },
      {
        title: "Colors that go with alice blue",
        body: "Navy, slate and steel blue (#4682B4) build a calm, trustworthy blue palette around it. Soft gray keeps it neutral, and a coral or warm orange accent stops a blue-and-white design from feeling cold.",
      },
      {
        title: "Alice blue, azure, ghost white or lavender?",
        body: "These pale CSS tints are easy to mix up. Azure (#F0FFFF) has a cyan tint, ghostwhite (#F8F8FF) a faint violet tint, and lavender (#E6E6FA) is more visibly purple. Alice blue sits between them as the bluest of the near-whites.",
      },
    ],
    faq: [
      { question: "What is the hex code for alice blue?", answer: "Alice blue is #F0F8FF (RGB 240, 248, 255). In CSS you can write aliceblue." },
      { question: "Is alice blue white or blue?", answer: "Technically a very light blue, but at 97% lightness it reads as a cool white on most screens." },
      { question: "Who is alice blue named after?", answer: "Alice Roosevelt Longworth, Theodore Roosevelt's daughter, whose favorite color it was. The name dates from around 1905." },
      { question: "What is the difference between alice blue and azure?", answer: "Both are near-whites. Alice blue (#F0F8FF) has a blue tint; CSS azure (#F0FFFF) has a cyan tint." },
      { question: "What colors go with alice blue?", answer: "Navy, slate, steel blue and soft gray, with coral or warm orange as an accent." },
    ],
    sources: [
      { title: "Alice blue, Wikipedia", href: "https://en.wikipedia.org/wiki/Alice_blue" },
      { title: "CSS Color Module Level 4: named colors, W3C", href: "https://www.w3.org/TR/css-color-4/#named-colors" },
    ],
  },
  lime: {
    title: "Lime Color Hex: #00FF00 vs Lime Green #32CD32",
    description:
      "In CSS, lime is #00FF00 and lime green is #32CD32, while the color of the fruit is closer to #BFFF00. See all three, their codes and how to use them.",
    answer:
      "Lime means three different greens. The CSS color lime is #00FF00, pure green light at full strength. CSS limegreen is #32CD32, softer and darker. The color named after the fruit is a yellow-green around #BFFF00. All three are far too light for text on white; use them as accents with dark text.",
    hexVariants: [
      {
        label: "CSS lime",
        hex: "#00FF00",
        note: "Pure screen green: green at 255, red and blue at 0.",
      },
      {
        label: "CSS lime green",
        hex: "#32CD32",
        note: "Written limegreen in CSS: softer, from the X11 list.",
      },
      {
        label: "Lime (the color)",
        hex: "#BFFF00",
        note: "The yellow-green of the fruit. Some sources round it to #C0FF00.",
      },
    ],
    keyTakeaways: [
      "CSS lime is #00FF00, CSS limegreen is #32CD32, and the fruit color lime is about #BFFF00.",
      "In CSS, green means the darker #008000, which is why full-strength green is called lime.",
      "None of the three works as text on white (1.20 to 2.12:1); dark text on them reads well.",
      "For readable green text, use something deeper such as #2E7D32 (5.13:1).",
    ],
    sections: [
      {
        title: "Three greens called lime",
        body: "Ask for lime and you can get three different colors. In CSS, lime is #00FF00: the green channel at full strength with no red or blue, the brightest green a screen can show. CSS limegreen (#32CD32) is a softer, slightly darker green. And lime as a color name for the fruit is a yellow-green, around #BFFF00.",
      },
      {
        title: "Why CSS green isn't the brightest green",
        body: "HTML's original 16 color names came from the old VGA palette, and in that set green is the darker #008000 while full-strength #00FF00 is called lime. The X11 color list called #00FF00 green, one of the few clashes between the two lists. CSS kept the HTML meaning, so writing color: green gives a mid-dark green, and you need lime for the bright one.",
      },
      {
        title: "Lime, the fruit color",
        body: "The fruit gives lime its everyday meaning: a zesty yellow-green that suggests citrus, freshness and summer drinks. Lime green was first recorded as a color name in English in 1890. Next to pure screen green, the fruit color looks warmer and more yellow.",
      },
      {
        title: "How lime feels",
        body: "Lime is electric, energetic and playful. It grabs attention instantly, which suits sports, youth brands, sale tags and highlights. In large areas it tires the eye quickly, so it works best as an accent against black, navy, charcoal or white.",
      },
      {
        title: "Using lime on screens",
        body: "On white, lime measures 1.37:1, limegreen 2.12:1 and the fruit color 1.20:1, all useless for text. Dark text on them reads well: black on #00FF00 reaches 15.3:1. On dark backgrounds lime makes a vivid accent, the classic terminal green. For green text or links on a light page, use a deeper green such as #2E7D32, which reaches 5.13:1.",
      },
      {
        title: "Lime, chartreuse or lawn green?",
        body: "CSS has several bright greens next to lime. chartreuse (#7FFF00) and lawngreen (#7CFC00) lean slightly yellow, and greenyellow (#ADFF2F) more so. Lime (#00FF00) is the pure green of the group, and limegreen (#32CD32) the toned-down one.",
      },
    ],
    faq: [
      { question: "What is the hex code for lime?", answer: "In CSS, lime is #00FF00. The fruit color lime is a yellow-green, about #BFFF00. CSS limegreen is #32CD32." },
      { question: "Is lime the same as lime green?", answer: "Not in CSS. lime is #00FF00, pure bright green; limegreen is #32CD32, softer and darker." },
      { question: "Why is CSS green darker than lime?", answer: "HTML's original 16 colors, taken from the VGA palette, called #008000 green and #00FF00 lime, and CSS kept those names." },
      { question: "Is lime accessible on white?", answer: "No. Lime measures 1.37:1 on white. Use it with dark text, or choose a deeper green like #2E7D32 for text." },
      { question: "What colors go with lime?", answer: "Black, navy, charcoal and white for contrast; purple or hot pink for a bold, playful look." },
    ],
    sources: [
      { title: "Lime (color), Wikipedia", href: "https://en.wikipedia.org/wiki/Lime_(color)" },
      { title: "CSS Color Module Level 4: named colors, W3C", href: "https://www.w3.org/TR/css-color-4/#named-colors" },
    ],
  },
  "light-gray": {
    title: "Light Gray Color #D3D3D3: Hex, RGB & CSS Grays",
    description:
      "Light gray is #D3D3D3 in CSS (RGB 211, 211, 211). See its codes, why CSS darkgray is lighter than gray, contrast tips and the light grays designers use.",
    answer:
      "Light gray is #D3D3D3 (RGB 211, 211, 211), the CSS named color lightgray, also spelled lightgrey. It's a neutral, even gray used for borders, dividers and disabled states. Watch the CSS names: darkgray (#A9A9A9) is lighter than gray (#808080). No light gray is readable as text on white.",
    hexVariants: [
      {
        label: "CSS light gray",
        hex: "#D3D3D3",
        note: "lightgray or lightgrey in CSS; both spellings work.",
      },
      {
        label: "CSS dark gray",
        hex: "#A9A9A9",
        note: "Despite the name, lighter than CSS gray.",
      },
      {
        label: "CSS gray",
        hex: "#808080",
        note: "From HTML's original 16 colors. Still too light for body text on white.",
      },
    ],
    keyTakeaways: [
      "Light gray is #D3D3D3: RGB 211, 211, 211, HSL 0°, 0%, 83%.",
      "CSS accepts both lightgray and lightgrey.",
      "CSS darkgray (#A9A9A9) is lighter than gray (#808080); the W3C spec itself calls the names inconsistent.",
      "For gray text on white, go at least as dark as #757575 (4.61:1).",
    ],
    sections: [
      {
        title: "Light gray color codes",
        body: "Light gray is #D3D3D3 in HEX, rgb(211, 211, 211) in RGB and hsl(0, 0%, 83%) in HSL; in CMYK it's simply 17% black. CSS accepts both spellings, lightgray and lightgrey, and the same goes for gray and grey in every gray name.",
      },
      {
        title: "Why dark gray is lighter than gray",
        body: "It's one of the best-known oddities in CSS: darkgray (#A9A9A9) is lighter than gray (#808080). The usual explanation is a clash between two color lists. HTML's original gray, from the old VGA palette, is #808080. The X11 list had its own, much lighter gray, close to silver, and its darkgray was named relative to that. CSS took gray from HTML and darkgray from X11. The W3C specification notes the names aren't consistent.",
      },
      {
        title: "What light gray is for",
        body: "Light gray is a workhorse in interface design: borders, dividers, disabled buttons, placeholder blocks while content loads, and alternating table rows. It separates things without adding a color, which keeps attention on the content and the brand color.",
      },
      {
        title: "The gray text trap",
        body: "Light gray text on white measures only 1.50:1, darkgray 2.35:1, and even CSS gray just 3.95:1, below the 4.5:1 WCAG asks for body text. For gray text on white, use #757575 (4.61:1) or darker. For borders that identify form fields, WCAG asks for 3:1 against the background, which light gray doesn't reach but CSS gray does.",
      },
      {
        title: "Light gray in rooms and palettes",
        body: "Light gray walls were the default neutral for years, and they still work in bright, modern spaces. Warm accents keep them from feeling cold: blush, mustard, wood and brass. Navy and charcoal add depth, and white trim makes light gray look intentional rather than dull.",
      },
      {
        title: "Light gray, silver, gainsboro or white smoke?",
        body: "CSS has a ladder of pale grays. silver (#C0C0C0) is slightly darker than light gray, gainsboro (#DCDCDC) slightly lighter, and whitesmoke (#F5F5F5) is nearly white. For page backgrounds, whitesmoke or an even subtler gray usually works better than light gray, which is better kept for lines and edges.",
      },
    ],
    faq: [
      { question: "What is the hex code for light gray?", answer: "Light gray is #D3D3D3 (RGB 211, 211, 211). In CSS you can write lightgray or lightgrey." },
      { question: "Is it gray or grey in CSS?", answer: "Both work. CSS accepts gray and grey in every gray color name." },
      { question: "Why is darkgray lighter than gray in CSS?", answer: "CSS gray (#808080) comes from HTML's original 16 colors, while darkgray (#A9A9A9) comes from the X11 list, where gray was much lighter. The two lists clashed." },
      { question: "Can I use light gray for text?", answer: "Not on white: it measures 1.50:1. For readable gray text, use #757575 (4.61:1) or darker." },
      { question: "What is a good light gray for backgrounds?", answer: "Very pale grays such as whitesmoke (#F5F5F5) work best for page and card backgrounds; keep #D3D3D3 for borders and dividers." },
    ],
    sources: [
      { title: "Grey, Wikipedia", href: "https://en.wikipedia.org/wiki/Grey" },
      { title: "CSS Color Module Level 4: named colors, W3C", href: "https://www.w3.org/TR/css-color-4/#named-colors" },
      { title: "WCAG 2.2: Non-text Contrast, W3C", href: "https://www.w3.org/TR/WCAG22/#non-text-contrast" },
    ],
  },
  gold: {
    title: "Gold Color Hex #FFD700 vs Metallic Gold #D4AF37",
    description:
      "Gold is #FFD700 in CSS, but metallic gold is closer to #D4AF37 and old gold to #CFB53B. Compare them side by side, with RGB, CMYK, contrast and pairings.",
    answer:
      "Gold has more than one hex code. The CSS color gold is #FFD700 (RGB 255, 215, 0), a bright golden yellow. Metallic gold, the color most people picture for jewelry and awards, is closer to #D4AF37, and old gold is a duller #CFB53B. None of them is readable as text on white.",
    hexVariants: [
      { label: "CSS gold", hex: "#FFD700", note: "The web's named color gold: bright and sunny, close to golden yellow." },
      { label: "Metallic gold", hex: "#D4AF37", note: "The flat on-screen stand-in for gold metal; deeper and less yellow." },
      { label: "Old gold", hex: "#CFB53B", note: "A muted, slightly greenish gold, first recorded in the early 19th century." },
    ],
    keyTakeaways: [
      "CSS gold is #FFD700; metallic gold is about #D4AF37; old gold is #CFB53B.",
      "Flat color can't shine, so screens fake metal with gradients and highlights.",
      "All three fail as text on white (1.40 to 2.10:1); for gold-toned text use something like #7A5C1E (6.22:1).",
      "Gold looks richest next to black, navy, deep green and cream.",
    ],
    sections: [
      {
        title: "Gold color codes",
        body: "CSS gold is #FFD700 in HEX, rgb(255, 215, 0) in RGB, hsl(51, 100%, 50%) in HSL and 0, 16, 100, 0 in CMYK. Metallic gold, #D4AF37, is rgb(212, 175, 55) and hsl(46, 65%, 52%). In CSS, writing gold always gives the bright #FFD700, so use the hex code when you want the deeper metallic tone.",
      },
      {
        title: "Which gold is the real gold?",
        body: "Gold is a metal, and metal isn't one flat color: it changes with light, angle and reflections. Color lists pick a single value to stand for it. The X11 and CSS gold (#FFD700) is a bright golden yellow, metallic gold (#D4AF37) is the deeper, browner tone of polished metal, and old gold (#CFB53B) is duller still. Golden yellow, #FFDF00, recorded as a color name in 1597, sits right next to CSS gold.",
      },
      {
        title: "Making gold look like metal on screens",
        body: "A flat #D4AF37 reads as mustard rather than metal. Designers get the metallic look by placing a lighter gold next to a darker one: a soft gradient from a pale highlight through #D4AF37 to a deep shade such as darkgoldenrod (#B8860B), or a thin light edge on a gold shape. Keep gold areas small, like rules, icons, badges and borders, since large flat gold areas look cheap.",
      },
      {
        title: "Gold and contrast",
        body: "Gold is light, so it fails as text on white: CSS gold measures 1.40:1, metallic gold 2.10:1 and darkgoldenrod 3.25:1, all below the 4.5:1 WCAG asks for. Put dark text on gold buttons instead: near-black on CSS gold reaches 12.7:1. For gold-toned text on a white page, use a deep golden brown such as #7A5C1E (6.22:1).",
      },
      {
        title: "Colors that go with gold",
        body: "Gold looks most expensive next to deep, quiet colors: black, navy, emerald or forest green, and burgundy. Cream and ivory keep it soft and classic. Bright yellow next to gold makes it look flat, and so do other saturated warm colors.",
      },
      {
        title: "What gold means",
        body: "Gold stands for wealth, success and reward, because it points to a precious metal: gold medals, gold standards, golden anniversaries. It's also tied to celebration and to the sacred in religious art. Read the full symbolism, culture and history on the gold color meaning page.",
      },
    ],
    faq: [
      { question: "What is the hex code for gold?", answer: "CSS gold is #FFD700 (RGB 255, 215, 0). For a metallic gold, use about #D4AF37; old gold is #CFB53B." },
      { question: "What is the difference between gold and metallic gold?", answer: "CSS gold (#FFD700) is a bright golden yellow. Metallic gold (#D4AF37) is deeper and browner, closer to polished gold metal." },
      { question: "How do you make gold look metallic in design?", answer: "Use a gradient or highlight: a lighter gold next to a deeper one, such as a pale highlight into #D4AF37 and #B8860B. One flat gold never looks like metal." },
      { question: "Is gold text readable on white?", answer: "No. CSS gold measures 1.40:1 and metallic gold 2.10:1 on white. Use dark text on gold, or a deep golden brown like #7A5C1E for text." },
      { question: "What colors go with gold?", answer: "Black, navy, emerald, burgundy, cream and ivory." },
    ],
    sources: [
      { title: "Gold (color), Wikipedia", href: "https://en.wikipedia.org/wiki/Gold_(color)" },
      { title: "CSS Color Module Level 4: named colors, W3C", href: "https://www.w3.org/TR/css-color-4/#named-colors" },
    ],
  },
  silver: {
    title: "Silver Color Hex #C0C0C0: RGB, Shades & Metallic Look",
    description:
      "Silver is #C0C0C0 in CSS (RGB 192, 192, 192): technically a light gray. See its codes, how to make it look metallic on screens, contrast and pairings.",
    answer:
      "Silver is #C0C0C0 (RGB 192, 192, 192; CMYK 0, 0, 0, 25), the CSS named color silver. On a screen it's simply a light gray: what makes silver look like metal is shine, so designers add gradients and highlights. Silver is far too light for text on white (1.82:1); dark text on it reads well.",
    hexVariants: [
      { label: "CSS silver", hex: "#C0C0C0", note: "One of HTML's original 16 colors. On its own, a neutral light gray." },
    ],
    keyTakeaways: [
      "Silver is #C0C0C0: RGB 192, 192, 192, HSL 0°, 0%, 75%.",
      "It's one of HTML's original 16 named colors.",
      "Flat silver reads as light gray; metal needs gradients, highlights or reflections.",
      "On white it measures 1.82:1, so use it for surfaces, borders and icons with dark text.",
    ],
    sections: [
      {
        title: "Silver color codes",
        body: "Silver is #C0C0C0 in HEX, rgb(192, 192, 192) in RGB, hsl(0, 0%, 75%) in HSL and 25% black in CMYK. It's one of the 16 original HTML color names, alongside gray, white and black. Silver was recorded as a color name in English as early as 1481.",
      },
      {
        title: "Why silver looks gray on screens",
        body: "Real silver is defined by reflection: bright highlights, dark reflections and everything in between. A single flat color can't do that, so #C0C0C0 looks like a light neutral gray. In CSS, silver sits between darkgray (#A9A9A9) and lightgray (#D3D3D3).",
      },
      {
        title: "Making silver look metallic",
        body: "To suggest metal, use a gradient from near-white through #C0C0C0 to a darker gray, add a thin bright edge, or let a photo of real metal do the work. Cool hints help too: a tiny touch of blue in the darker stops reads as steel or chrome. Keep it to buttons, badges, icons and frames rather than large backgrounds.",
      },
      {
        title: "Silver and contrast",
        body: "On white, silver measures only 1.82:1, so never use it for text or essential icons there. Near-black text on silver reaches 9.8:1 and reads easily. For a gray that's still readable as text on white, go down to about #757575 (4.61:1).",
      },
      {
        title: "Colors that go with silver",
        body: "Silver pairs well with navy, black and white, with deep blues and purples, and with emerald for a jewel-toned look. For warmth, add blush, cognac leather or wood. Silver and gold together work when one clearly leads and the other is a small accent.",
      },
      {
        title: "What silver means",
        body: "Silver suggests modern technology, polish and calm: steel, chrome and phones, as well as the moon and mirrors. It also marks milestones: a silver anniversary is 25 years, and a silver medal is second place. The silver color meaning page covers its symbolism in full.",
      },
    ],
    faq: [
      { question: "What is the hex code for silver?", answer: "Silver is #C0C0C0 (RGB 192, 192, 192). In CSS you can write silver." },
      { question: "Is silver the same as gray?", answer: "On screens, nearly. CSS silver is a neutral light gray; what makes silver look like metal is shine, which needs gradients or highlights." },
      { question: "How do you make silver look metallic?", answer: "Use a gradient from near-white through #C0C0C0 to a darker gray, add a bright edge, or use a photo of real metal." },
      { question: "Is silver text readable on white?", answer: "No. It measures 1.82:1. Use dark text on silver, or a darker gray such as #757575 for text." },
      { question: "What colors go with silver?", answer: "Navy, black, white, deep blue, purple and emerald; blush or wood for warmth." },
    ],
    sources: [
      { title: "Silver (color), Wikipedia", href: "https://en.wikipedia.org/wiki/Silver_(color)" },
      { title: "CSS Color Module Level 4: named colors, W3C", href: "https://www.w3.org/TR/css-color-4/#named-colors" },
    ],
  },
  lavender: {
    title: "Lavender Color Hex: #E6E6FA vs Floral #B57EDC",
    description:
      "CSS lavender is #E6E6FA, a near-white tint. The lavender of the flower is closer to #B57EDC. Compare both, with RGB, contrast, shades and pairings.",
    answer:
      "Lavender has two common hex codes. The CSS color lavender is #E6E6FA (RGB 230, 230, 250), so pale it reads as a lilac-tinted white. The color of the flower, called floral lavender, is #B57EDC (RGB 181, 126, 220), a clear soft purple. Neither works as text on white; both suit backgrounds and accents.",
    hexVariants: [
      { label: "CSS lavender", hex: "#E6E6FA", note: "The web's named color; sometimes called lavender mist. Almost white." },
      { label: "Lavender (floral)", hex: "#B57EDC", note: "The purple of the lavender flower, from Maerz and Paul's color dictionary." },
    ],
    keyTakeaways: [
      "CSS lavender is #E6E6FA; floral lavender is #B57EDC.",
      "Lavender was first recorded as a color name in English in 1705.",
      "Neither works as text on white (1.23:1 and 3.01:1); for text use a deep purple like #5B4B8A (7.45:1).",
      "Lavender pairs well with sage, cream, soft gray and navy.",
    ],
    sections: [
      {
        title: "Lavender color codes",
        body: "CSS lavender is #E6E6FA, rgb(230, 230, 250), hsl(240, 67%, 94%). Floral lavender is #B57EDC, rgb(181, 126, 220), hsl(275, 57%, 68%). The two share a name but look very different: the CSS value is a background tint, the floral one a visible purple.",
      },
      {
        title: "Which lavender do you mean?",
        body: "When the X11 color list named #E6E6FA lavender, it chose a whisper of a tint; some references call it lavender mist to tell it apart. The color of the plant is much deeper, and that's floral lavender, #B57EDC. If you want lavender to read as purple, use the floral value or something close to it.",
      },
      {
        title: "Lavender's purple neighbors",
        body: "Several named colors sit close by. Lavender blue, also called periwinkle (#CCCCFF), is cooler and bluer. CSS mediumpurple (#9370DB), sometimes called deep lavender, is a stronger purple. Lilac leans pinker than lavender, and violet is more saturated.",
      },
      {
        title: "Lavender and contrast",
        body: "CSS lavender measures 1.23:1 on white, so it only works as a background, and dark text on it reads easily (14.5:1 with near-black). Floral lavender reaches 3.01:1 on white: fine for large shapes, not for text. For lavender-family text or buttons with white labels, deepen it to a muted purple such as #5B4B8A (7.45:1).",
      },
      {
        title: "Colors that go with lavender",
        body: "Lavender is calm next to sage green, cream, soft gray and muted gold, and crisp next to navy or charcoal. Pale lavender backgrounds work well behind deep purple headings and a single warm accent.",
      },
      {
        title: "What lavender means",
        body: "Lavender borrows its meaning from the plant: calm, rest and gentleness, with a touch of nostalgia. It's also a historic color of LGBTQ+ identity. The lavender color meaning page covers its symbolism and history.",
      },
    ],
    faq: [
      { question: "What is the hex code for lavender?", answer: "CSS lavender is #E6E6FA. The flower color, floral lavender, is #B57EDC." },
      { question: "Why is CSS lavender almost white?", answer: "The X11 color list, which CSS adopted, defined lavender as a very pale tint (#E6E6FA). The flower's color is the deeper #B57EDC." },
      { question: "What is the difference between lavender and lilac?", answer: "Both are pale purples; lavender leans slightly blue and gray, lilac leans pinker." },
      { question: "Is lavender readable as text on white?", answer: "No. CSS lavender is 1.23:1 and floral lavender 3.01:1. Use a deep purple such as #5B4B8A for text." },
      { question: "What colors go with lavender?", answer: "Sage green, cream, soft gray, muted gold, navy and charcoal." },
    ],
    sources: [
      { title: "Lavender (color), Wikipedia", href: "https://en.wikipedia.org/wiki/Lavender_(color)" },
      { title: "CSS Color Module Level 4: named colors, W3C", href: "https://www.w3.org/TR/css-color-4/#named-colors" },
    ],
  },
  turquoise: {
    title: "Turquoise Hex #40E0D0: RGB, Shades & Turquoise Blue",
    description:
      "Turquoise is #40E0D0 in CSS (RGB 64, 224, 208). See its codes, turquoise blue #00FFEF, dark turquoise, contrast tips and the colors that go with it.",
    answer:
      "Turquoise is #40E0D0 (RGB 64, 224, 208; CMYK 71, 0, 7, 12), the CSS named color turquoise: a bright blue-green that leans slightly green. Turquoise blue (#00FFEF) is a more vivid variant. All turquoises are light, so they need dark text: near-black on #40E0D0 reaches 10.8:1, while white text fails.",
    hexVariants: [
      { label: "CSS turquoise", hex: "#40E0D0", note: "The web's named color turquoise." },
      { label: "Turquoise blue", hex: "#00FFEF", note: "A more vivid, bluer turquoise, first recorded as a color name in 1900." },
      { label: "CSS dark turquoise", hex: "#00CED1", note: "Written darkturquoise in CSS; a little deeper and bluer." },
    ],
    keyTakeaways: [
      "CSS turquoise is #40E0D0: RGB 64, 224, 208, HSL 174°, 72%, 56%.",
      "Turquoise was first recorded as a color name in English in 1573.",
      "It's light: white text on it measures only 1.64:1, so use dark text.",
      "Coral is its classic partner; white, sand and navy work too.",
    ],
    sections: [
      {
        title: "Turquoise color codes",
        body: "Turquoise is #40E0D0 in HEX, rgb(64, 224, 208) in RGB, hsl(174, 72%, 56%) in HSL and about 71, 0, 7, 12 in CMYK. Its hue of 174° puts it just on the green side of cyan (180°). In CSS you can write turquoise and get exactly #40E0D0.",
      },
      {
        title: "The turquoise family in CSS",
        body: "CSS has a small ladder of turquoises. paleturquoise (#AFEEEE) is soft and light, mediumturquoise (#48D1CC) a touch deeper, turquoise (#40E0D0) the reference, and darkturquoise (#00CED1) bluer and stronger. Turquoise blue, #00FFEF, is a vivid variant that isn't a CSS name.",
      },
      {
        title: "Named after a stone",
        body: "The color takes its name from the turquoise stone, and was first recorded as a color name in English in 1573. That's why it carries the stone's associations: protection, good fortune and the jewelry of Persia, Tibet and the American Southwest.",
      },
      {
        title: "Turquoise and contrast",
        body: "Turquoise is a light color: white text on it measures only 1.64:1 and darkturquoise 1.95:1. Use near-black text on turquoise buttons and badges (10.8:1). For turquoise-family text on white, go much deeper, to a teal such as #0E7490 (5.36:1).",
      },
      {
        title: "Colors that go with turquoise",
        body: "Coral is turquoise's classic partner, since the two sit roughly across the color wheel and together feel tropical. White and sand keep it beachy, navy makes it crisp, and gold or brass give it a Southwest-jewelry feel.",
      },
      {
        title: "What turquoise means",
        body: "Turquoise suggests calm, clarity and holidays by the sea, plus the protective meaning of the stone. The turquoise color meaning page covers its cultural and spiritual meanings.",
      },
    ],
    faq: [
      { question: "What is the hex code for turquoise?", answer: "Turquoise is #40E0D0 (RGB 64, 224, 208). Turquoise blue is #00FFEF; CSS darkturquoise is #00CED1." },
      { question: "Is turquoise blue or green?", answer: "Both: a blue-green at hue 174°, just on the green side of cyan." },
      { question: "What is the difference between turquoise and teal?", answer: "Teal (#008080) is much darker and calmer; turquoise (#40E0D0) is bright and light." },
      { question: "Can I use white text on turquoise?", answer: "No: it measures 1.64:1. Use near-black text, which reaches 10.8:1." },
      { question: "What colors go with turquoise?", answer: "Coral, white, sand, navy and gold." },
    ],
    sources: [
      { title: "Turquoise (color), Wikipedia", href: "https://en.wikipedia.org/wiki/Turquoise_(color)" },
      { title: "CSS Color Module Level 4: named colors, W3C", href: "https://www.w3.org/TR/css-color-4/#named-colors" },
    ],
  },
  navy: {
    title: "Navy Color Hex #000080: RGB, CMYK & Navy Shades",
    description:
      "Navy is #000080 in CSS (RGB 0, 0, 128). See its codes, real navies like U.S. Navy blue #022A3A and peacoat #2B2E43, contrast and colors that go with it.",
    answer:
      "Navy is #000080 (RGB 0, 0, 128; CMYK 100, 100, 0, 50), the CSS named color navy: pure blue at half brightness. Real-world navies are usually darker and grayer: the official U.S. Navy blue is #022A3A, and Pantone's Peacoat is #2B2E43. White text on any of them reads very well, at 13:1 or more.",
    hexVariants: [
      { label: "CSS navy", hex: "#000080", note: "Pure blue at half strength: saturated and quite purple-blue." },
      { label: "U.S. Navy blue", hex: "#022A3A", note: "The U.S. Navy's official color: dark, with a hint of green-blue." },
      { label: "Peacoat (Pantone)", hex: "#2B2E43", note: "Pantone 19-3920 TCX: the soft, grayish navy of clothing." },
    ],
    keyTakeaways: [
      "CSS navy is #000080: RGB 0, 0, 128, HSL 240°, 100%, 25%.",
      "The name comes from British naval uniforms: officers' uniform rules of 1748 made dark blue standard.",
      "Real navies are darker and grayer, like U.S. Navy blue #022A3A and Pantone Peacoat #2B2E43.",
      "White text on navy reaches 16:1, so it's one of the safest dark brand colors.",
    ],
    sections: [
      {
        title: "Navy color codes",
        body: "CSS navy is #000080 in HEX, rgb(0, 0, 128) in RGB, hsl(240, 100%, 25%) in HSL and 100, 100, 0, 50 in CMYK. It's one of HTML's original 16 colors, and close to CSS midnightblue (#191970).",
      },
      {
        title: "Why most navies don't look like #000080",
        body: "CSS navy is fully saturated blue, which on screen looks bright and slightly purple next to the navy of a suit or a uniform. Real navies are darker and grayer. The U.S. Navy's official blue is #022A3A, and Pantone's Peacoat (19-3920 TCX) is #2B2E43. Some navies' uniforms are so dark they're described as a tone of black. For a brand or website, a softer navy usually looks more refined than #000080.",
      },
      {
        title: "Where the name comes from",
        body: "The first uniform regulations for British Royal Navy officers, in 1748, made dark blue the main color. It was first called marine blue, and 'navy blue' appears in the British press by about 1780.",
      },
      {
        title: "Navy and contrast",
        body: "Navy is one of the most readable brand colors. White text on CSS navy reaches 16.0:1, on U.S. Navy blue 15.1:1 and on Peacoat 13.3:1, all far above AAA. As a text color on white it works just as well, which makes navy a natural choice for headings, links and footers.",
      },
      {
        title: "Colors that go with navy",
        body: "Navy acts like a dark neutral, so almost everything works with it. White, cream and light gray are the safe partners; mustard, coral and orange are bold warm accents; sky blue, sage and blush keep it calm. The colors that go with navy blue guide covers 18 pairings.",
      },
      {
        title: "What navy means",
        body: "Navy stands for trust, authority and calm confidence, from naval uniforms to business suits and banks. The navy color meaning page covers its symbolism in full.",
      },
    ],
    faq: [
      { question: "What is the hex code for navy?", answer: "CSS navy is #000080 (RGB 0, 0, 128). Real-world navies are darker, such as U.S. Navy blue #022A3A or Pantone Peacoat #2B2E43." },
      { question: "Is navy the same as navy blue?", answer: "Yes. In CSS the name is navy, #000080; 'navy blue' is the everyday name for the same family of dark blues." },
      { question: "What navy hex code should I use for a website?", answer: "#000080 can look bright and purple-blue. Many brands use a softer, grayer navy instead; check that white text stays above 4.5:1, which any dark navy easily does." },
      { question: "Is white text readable on navy?", answer: "Yes: 16.0:1 on CSS navy, 15.1:1 on U.S. Navy blue and 13.3:1 on Peacoat." },
      { question: "What colors go with navy?", answer: "White, cream, light gray, camel, mustard, coral, sky blue, sage and blush." },
    ],
    sources: [
      { title: "Navy blue, Wikipedia", href: "https://en.wikipedia.org/wiki/Navy_blue" },
      { title: "CSS Color Module Level 4: named colors, W3C", href: "https://www.w3.org/TR/css-color-4/#named-colors" },
    ],
  },
  maroon: {
    title: "Maroon Hex #800000 vs X11 Maroon #B03060",
    description:
      "Maroon is #800000 in CSS, but the X11 color list defines a much rosier maroon, #B03060. Compare both, with RGB, CMYK, contrast, shades and pairings.",
    answer:
      "Maroon is #800000 (RGB 128, 0, 0; CMYK 0, 100, 100, 50) in CSS: pure red at half brightness, a deep brownish red. The older X11 color list defined maroon differently, as #B03060, a brighter, rosier shade. White text works on both: 10.95:1 on CSS maroon and 6.11:1 on X11 maroon.",
    hexVariants: [
      { label: "CSS maroon", hex: "#800000", note: "One of HTML's original 16 colors: red at half strength." },
      { label: "X11 maroon", hex: "#B03060", note: "The X11 list's 'maroon': brighter and rosier. CSS kept the HTML value instead." },
    ],
    keyTakeaways: [
      "CSS maroon is #800000; the X11 color list's maroon is #B03060.",
      "Maroon was first recorded as a color name in English in 1789.",
      "White text on CSS maroon reaches 10.95:1, so it works for buttons and headers.",
      "Maroon is browner than burgundy and darker than crimson.",
    ],
    sections: [
      {
        title: "Maroon color codes",
        body: "CSS maroon is #800000 in HEX, rgb(128, 0, 0) in RGB, hsl(0, 100%, 25%) in HSL and 0, 100, 100, 50 in CMYK. Its hue is pure red; it looks brownish only because it's so dark.",
      },
      {
        title: "Two maroons: HTML vs X11",
        body: "HTML's original 16 colors defined maroon as #800000. The X11 color list, used on Unix displays, called a different color maroon: #B03060, much brighter and more toned toward rose. When CSS adopted the X11 names, it kept HTML's maroon, so color: maroon gives #800000. Different dictionaries define maroon differently too, which is why you'll see both.",
      },
      {
        title: "Where the name comes from",
        body: "Maroon comes from the French marron, meaning chestnut, and was first recorded as a color name in English in 1789. The chestnut connection explains the brown in it.",
      },
      {
        title: "Maroon and contrast",
        body: "White text on CSS maroon reaches 10.95:1, and on X11 maroon 6.11:1, so both work for buttons, banners and headings. As a text color on white, CSS maroon reads just as well. Dark text on maroon doesn't work; keep labels white or cream.",
      },
      {
        title: "Colors that go with maroon",
        body: "Maroon looks classic with cream and gold, which is the collegiate look, and serious with navy and charcoal. Blush and sage soften it. Avoid pairing it with crimson or bright red, which makes both look muddy.",
      },
      {
        title: "Maroon, burgundy or crimson?",
        body: "Maroon (#800000) leans brown, like chestnut. Burgundy leans purple, like red wine. Crimson (#DC143C) is much brighter and slightly blue. The maroon color meaning page covers what maroon stands for.",
      },
    ],
    faq: [
      { question: "What is the hex code for maroon?", answer: "CSS maroon is #800000 (RGB 128, 0, 0). The X11 color list defines maroon as #B03060." },
      { question: "Why are there two maroon hex codes?", answer: "HTML's color names used #800000; the X11 list used #B03060. CSS kept the HTML value." },
      { question: "What is the difference between maroon and burgundy?", answer: "Maroon leans brown (chestnut); burgundy leans purple (red wine)." },
      { question: "Is white text readable on maroon?", answer: "Yes: 10.95:1 on #800000 and 6.11:1 on #B03060." },
      { question: "What colors go with maroon?", answer: "Cream, gold, navy, charcoal, blush and sage." },
    ],
    sources: [
      { title: "Maroon, Wikipedia", href: "https://en.wikipedia.org/wiki/Maroon" },
      { title: "CSS Color Module Level 4: named colors, W3C", href: "https://www.w3.org/TR/css-color-4/#named-colors" },
    ],
  },
  indigo: {
    title: "Indigo Color Hex #4B0082: RGB, CMYK & Shades",
    description:
      "Indigo is #4B0082 in CSS (RGB 75, 0, 130), a deep purple-blue. See its codes, the bluer spectral indigo #4000FF, contrast, shades and pairings.",
    answer:
      "Indigo is #4B0082 (RGB 75, 0, 130; CMYK 42, 100, 0, 49) in CSS: a deep color that leans clearly toward purple. The indigo of the rainbow and of reference charts is bluer, around #4000FF, a vivid purplish blue. White text works on both: 12.95:1 on CSS indigo and 7.89:1 on #4000FF.",
    hexVariants: [
      { label: "CSS indigo", hex: "#4B0082", note: "The web's named color: dark and purple-leaning." },
      { label: "Indigo (spectral)", hex: "#4000FF", note: "A vivid purplish blue, closer to the indigo between blue and violet." },
    ],
    keyTakeaways: [
      "CSS indigo is #4B0082; the bluer reference indigo is about #4000FF.",
      "Indigo was first recorded as a color name in English in 1289.",
      "White text on CSS indigo reaches 12.95:1, so it's safe for buttons and dark sections.",
      "Indigo and gold is a classic, rich pairing.",
    ],
    sections: [
      {
        title: "Indigo color codes",
        body: "CSS indigo is #4B0082 in HEX, rgb(75, 0, 130) in RGB, hsl(275, 100%, 25%) in HSL and about 42, 100, 0, 49 in CMYK. At hue 275° it sits on the purple side of blue, which is why it can look more like a dark violet than a blue on screen.",
      },
      {
        title: "Purple indigo vs blue indigo",
        body: "The word covers a range. The CSS value, #4B0082, is purple-leaning and dark. Color references that place indigo between blue and violet in the spectrum use a bluer value, such as #4000FF, a vivid purplish blue. Denim's indigo is bluer and grayer still. Pick the one that matches what you mean: purple-dark, vivid spectral, or denim.",
      },
      {
        title: "A very old color name",
        body: "Indigo was recorded as a color name in English as early as 1289, named after the indigo dye. Isaac Newton later listed it as one of the seven colors of the spectrum, between blue and violet.",
      },
      {
        title: "Indigo and contrast",
        body: "Indigo is dark, so it's easy to use for text and buttons. White text on CSS indigo reaches 12.95:1, and on #4000FF 7.89:1, both AAA for normal text. As a text color on white it reads just as well. Dark text on indigo doesn't work.",
      },
      {
        title: "Colors that go with indigo",
        body: "Indigo looks rich with gold and cream, fresh with coral or peach, and calm with silver, soft gray and lavender. In dark interfaces, a deep indigo makes a softer alternative to pure black or navy.",
      },
      {
        title: "Indigo, navy or violet?",
        body: "Navy (#000080) is a dark blue with no purple in it. Violet is lighter and clearly purple. Indigo sits between them. The indigo color meaning page covers what indigo stands for.",
      },
    ],
    faq: [
      { question: "What is the hex code for indigo?", answer: "CSS indigo is #4B0082 (RGB 75, 0, 130). A bluer, spectral indigo is about #4000FF." },
      { question: "Is indigo blue or purple?", answer: "In between. CSS indigo leans purple (hue 275°); the spectral indigo leans blue." },
      { question: "Is white text readable on indigo?", answer: "Yes: 12.95:1 on #4B0082 and 7.89:1 on #4000FF." },
      { question: "What is the difference between indigo and navy?", answer: "Navy is a pure dark blue; indigo has violet in it." },
      { question: "What colors go with indigo?", answer: "Gold, cream, coral, peach, silver, soft gray and lavender." },
    ],
    sources: [
      { title: "Indigo (color), Wikipedia", href: "https://en.wikipedia.org/wiki/Indigo_(color)" },
      { title: "CSS Color Module Level 4: named colors, W3C", href: "https://www.w3.org/TR/css-color-4/#named-colors" },
    ],
  },
  violet: {
    title: "Violet Color Hex: CSS #EE82EE vs Spectral #8000FF",
    description:
      "CSS violet is #EE82EE, a light pinkish purple. The violet of the spectrum is a deep #8000FF. Compare both plus dark violet, with codes, contrast and pairings.",
    answer:
      "Violet has two very different hex codes. The CSS color violet is #EE82EE (RGB 238, 130, 238), a light pinkish purple. The violet of the rainbow and the color wheel is a deep, vivid #8000FF. CSS darkviolet (#9400D3) sits close to that. Use dark text on CSS violet, and white text on the deep violets.",
    hexVariants: [
      { label: "CSS violet", hex: "#EE82EE", note: "The web's named color: light, pinkish, closer to orchid than to rainbow violet." },
      { label: "Violet (spectral)", hex: "#8000FF", note: "The vivid violet of the color wheel and spectrum." },
      { label: "CSS dark violet", hex: "#9400D3", note: "Written darkviolet in CSS; close to spectral violet." },
    ],
    keyTakeaways: [
      "CSS violet is #EE82EE; spectral violet is #8000FF; CSS darkviolet is #9400D3.",
      "Violet is a spectral color; purple is a mix of red and blue light.",
      "Violet was first recorded as a color name in English around 1370.",
      "CSS violet needs dark text (7.68:1); the deep violets take white text (6.25 to 6.56:1).",
    ],
    sections: [
      {
        title: "Violet color codes",
        body: "CSS violet is #EE82EE, rgb(238, 130, 238), hsl(300, 76%, 72%), CMYK 0, 45, 0, 7. Spectral violet is #8000FF, rgb(128, 0, 255), hsl(270, 100%, 50%). CSS darkviolet is #9400D3, hsl(282, 100%, 41%).",
      },
      {
        title: "Why CSS violet doesn't match the rainbow",
        body: "Like several CSS names that came from the X11 color list, violet was given a value that doesn't match its traditional meaning. #EE82EE is a light, pinkish purple, much closer to orchid. The violet at the end of the rainbow is the deep #8000FF. In CSS, darkviolet (#9400D3) is the closest named match to that.",
      },
      {
        title: "Violet vs purple",
        body: "Violet is a spectral color: it's a real wavelength of light, at the short end of what we can see. Purple isn't in the spectrum; it's what we see from a mix of red and blue (and violet) light. In everyday speech the words overlap, but violet usually means the bluer, cooler purples.",
      },
      {
        title: "Violet and contrast",
        body: "CSS violet is light: white text on it measures 2.32:1, so use dark text (7.68:1 with near-black). The deep violets are the opposite: white text on #8000FF reaches 6.25:1 and on #9400D3 6.56:1, both fine for buttons. As text on white, the deep violets work; CSS violet doesn't.",
      },
      {
        title: "Colors that go with violet",
        body: "Soft yellow sits opposite violet on the color wheel and makes it pop. Sage, cream, silver and deep green are calmer partners. For a light CSS-violet palette, add charcoal text and a single deep violet accent.",
      },
      {
        title: "What violet means",
        body: "Violet is linked with imagination, spirituality and dignity, and through the flower with modesty. The violet color meaning page covers its history and symbolism.",
      },
    ],
    faq: [
      { question: "What is the hex code for violet?", answer: "CSS violet is #EE82EE. Spectral violet is #8000FF, and CSS darkviolet is #9400D3." },
      { question: "Why is CSS violet so light?", answer: "CSS took the name and value from the X11 color list, which defined violet as a light pinkish purple. The rainbow's violet is the deep #8000FF." },
      { question: "What is the difference between violet and purple?", answer: "Violet is a spectral color, a real wavelength of light; purple is a mix of red and blue light." },
      { question: "What text color works on violet?", answer: "Dark text on CSS violet (7.68:1); white text on spectral violet (6.25:1) or darkviolet (6.56:1)." },
      { question: "What colors go with violet?", answer: "Soft yellow, sage, cream, silver and deep green." },
    ],
    sources: [
      { title: "Violet (color), Wikipedia", href: "https://en.wikipedia.org/wiki/Violet_(color)" },
      { title: "CSS Color Module Level 4: named colors, W3C", href: "https://www.w3.org/TR/css-color-4/#named-colors" },
    ],
  },
  magenta: {
    title: "Magenta Hex #FF00FF vs Process Magenta",
    description:
      "Magenta is #FF00FF on screens, the same as CSS fuchsia. Process magenta, the CMYK print ink, is shown as about #FF0090. Compare both, with codes and contrast.",
    answer:
      "Magenta is #FF00FF (RGB 255, 0, 255) on screens: red and blue light at full strength with no green. In CSS, magenta and fuchsia are identical. Process magenta, the M in CMYK printing, is an ink rather than an RGB color; screens approximate it as about #FF0090. Dark text reads better on magenta than white.",
    hexVariants: [
      { label: "Screen magenta (CSS magenta and fuchsia)", hex: "#FF00FF", note: "Red and blue at full strength, no green. Identical to CSS fuchsia." },
      { label: "Process magenta (print ink)", hex: "#FF0090", note: "An approximation: process magenta is an ink, not an RGB color." },
    ],
    keyTakeaways: [
      "Screen magenta is #FF00FF, and CSS fuchsia is exactly the same color.",
      "Process magenta, the M in CMYK, is an ink; on screens it's approximated as about #FF0090.",
      "The name comes from a dye patented in 1859 as fuchsine and renamed after that year's Battle of Magenta.",
      "Near-black text on magenta (5.67:1) beats white text (3.14:1).",
    ],
    sections: [
      {
        title: "Magenta color codes",
        body: "Magenta is #FF00FF in HEX, rgb(255, 0, 255) in RGB, hsl(300, 100%, 50%) in HSL and 0, 100, 0, 0 in CMYK. In CSS, magenta and fuchsia are two names for exactly the same color.",
      },
      {
        title: "Screen magenta vs process magenta",
        body: "On a screen, magenta is made by adding red and blue light. In print, magenta is one of the four process inks (CMYK), and it absorbs green light. The ink can't glow like a screen, so it looks deeper and slightly more crimson; screens show it as about #FF0090. If a design must match in print, specify the ink (C0 M100 Y0 K0) rather than trusting #FF00FF.",
      },
      {
        title: "Where the name comes from",
        body: "The color is named after an aniline dye patented in 1859 by François-Emmanuel Verguin, who first called it fuchsine. It was soon renamed magenta, after the Battle of Magenta in northern Italy that same year. That's why fuchsia and magenta still sit side by side as names.",
      },
      {
        title: "Magenta and contrast",
        body: "White text on magenta measures 3.14:1, enough only for large text. Near-black text reaches 5.67:1 and reads better. As a text color on white, magenta (3.14:1) fails for body copy; use it for large headings and accents, or deepen it for links.",
      },
      {
        title: "Colors that go with magenta",
        body: "Magenta is bold next to black, navy and white, and electric next to teal or lime. To calm it down, pair it with soft gray, cream or blush, and keep magenta to one accent.",
      },
      {
        title: "What magenta means",
        body: "Magenta suggests creativity, confidence and nonconformity. It also isn't in the rainbow: the brain makes it from red and blue light. The magenta color meaning page covers more.",
      },
    ],
    faq: [
      { question: "What is the hex code for magenta?", answer: "Magenta is #FF00FF (RGB 255, 0, 255). CSS fuchsia is the same color. Process magenta is approximated as about #FF0090." },
      { question: "Is magenta the same as fuchsia?", answer: "In CSS, yes: both mean #FF00FF. In paint and fashion, fuchsia is often a slightly pinker shade." },
      { question: "What is process magenta?", answer: "The magenta ink used in CMYK printing. It's an ink rather than an RGB color, and screens show it as roughly #FF0090." },
      { question: "Should I use white or black text on magenta?", answer: "Near-black: 5.67:1 against 3.14:1 for white." },
      { question: "What colors go with magenta?", answer: "Black, navy, white, teal and lime; soft gray or cream to calm it down." },
    ],
    sources: [
      { title: "Magenta, Wikipedia", href: "https://en.wikipedia.org/wiki/Magenta" },
      { title: "CSS Color Module Level 4: named colors, W3C", href: "https://www.w3.org/TR/css-color-4/#named-colors" },
    ],
  },
  coral: {
    title: "Coral Color Hex #FF7F50: RGB, Shades & Light Coral",
    description:
      "Coral is #FF7F50 in CSS (RGB 255, 127, 80), a pink-orange. Compare light coral #F08080 and coral pink #F88379, with codes, contrast and pairings.",
    answer:
      "Coral is #FF7F50 (RGB 255, 127, 80; CMYK 0, 50, 69, 0), the CSS named color coral: a warm pink-orange that leans orange on screens. Light coral (#F08080) and coral pink (#F88379) are pinker. All three need dark text: near-black on coral reaches 7.12:1, while white text measures only 2.50:1.",
    hexVariants: [
      { label: "CSS coral", hex: "#FF7F50", note: "The web's named color; on screen it reads as a shade of orange." },
      { label: "CSS light coral", hex: "#F08080", note: "Written lightcoral in CSS: softer and pinker." },
      { label: "Coral pink", hex: "#F88379", note: "A pinker coral, first recorded as a color name in 1892." },
    ],
    keyTakeaways: [
      "CSS coral is #FF7F50; light coral is #F08080; coral pink is #F88379.",
      "Coral was first recorded as a color name in English in 1513.",
      "All corals need dark text: white measures only 2.47 to 2.59:1.",
      "Pantone named Living Coral (16-1546) its Color of the Year for 2019.",
    ],
    sections: [
      {
        title: "Coral color codes",
        body: "CSS coral is #FF7F50 in HEX, rgb(255, 127, 80) in RGB, hsl(16, 100%, 66%) in HSL and 0, 50, 69, 0 in CMYK. Its hue of 16° puts it on the orange side of red, which is why web coral looks more orange than many people expect.",
      },
      {
        title: "Which coral do you mean?",
        body: "Coral covers a range from orange to pink. The CSS value, #FF7F50, is the most orange. CSS lightcoral (#F08080) is pinker and softer, and coral pink (#F88379) sits between them. Pantone's Living Coral, its 2019 Color of the Year (16-1546), is another pink-orange. If you want coral to read as pink, choose one of the pinker values.",
      },
      {
        title: "Named after the reef",
        body: "Coral was first recorded as a color name in English in 1513, after the pinkish-red coral used in jewelry and charms. That's why it still feels warm, summery and connected to the sea.",
      },
      {
        title: "Coral and contrast",
        body: "Coral is light enough that white text fails: 2.50:1 on CSS coral, 2.59:1 on light coral and 2.47:1 on coral pink. Use near-black text instead (7.12:1 on #FF7F50). For a coral button with white text, deepen it considerably and check that the label reaches 4.5:1.",
      },
      {
        title: "Colors that go with coral",
        body: "Navy and coral is a classic nautical pairing, and turquoise and coral feel tropical. Mint, white, sand and gold also work. Keep coral to accents and buttons in interfaces; large coral areas get loud quickly.",
      },
      {
        title: "Coral, salmon or peach?",
        body: "Coral is the most saturated of the three. Salmon is lighter and pinker, and peach is paler and more beige. The coral color meaning page covers what coral stands for.",
      },
    ],
    faq: [
      { question: "What is the hex code for coral?", answer: "CSS coral is #FF7F50 (RGB 255, 127, 80). Light coral is #F08080 and coral pink is #F88379." },
      { question: "Is coral pink or orange?", answer: "A pink-orange. Web coral leans orange (hue 16°); light coral and coral pink lean pinker." },
      { question: "Can I use white text on coral?", answer: "Not at normal sizes: 2.50:1. Near-black text reaches 7.12:1." },
      { question: "Was coral a Pantone Color of the Year?", answer: "Yes. Pantone named Living Coral (16-1546) its Color of the Year for 2019." },
      { question: "What colors go with coral?", answer: "Navy, turquoise, mint, white, sand and gold." },
    ],
    sources: [
      { title: "Coral (color), Wikipedia", href: "https://en.wikipedia.org/wiki/Coral_(color)" },
      { title: "CSS Color Module Level 4: named colors, W3C", href: "https://www.w3.org/TR/css-color-4/#named-colors" },
    ],
  },
  beige: {
    title: "Beige Color Hex #F5F5DC: RGB, CMYK & Warmer Beiges",
    description:
      "Beige is #F5F5DC in CSS (RGB 245, 245, 220), a pale, slightly yellow neutral. Compare desert sand and French beige, with codes, contrast and pairings.",
    answer:
      "Beige is #F5F5DC (RGB 245, 245, 220; CMYK 0, 0, 10, 4), the CSS named color beige: a very pale, slightly yellow neutral. Many beiges used in fashion and interiors are warmer and deeper, like desert sand (#EDC9AF) or French beige (#A67B5B). CSS beige is a background color; dark text on it reads very well (16.1:1).",
    hexVariants: [
      { label: "CSS beige", hex: "#F5F5DC", note: "The web's named color: pale, slightly yellow, close to cream." },
      { label: "Desert sand", hex: "#EDC9AF", note: "A warmer, pinkish beige, closer to what many people picture." },
      { label: "French beige", hex: "#A67B5B", note: "A deep, warm beige-brown." },
    ],
    keyTakeaways: [
      "CSS beige is #F5F5DC; warmer beiges include desert sand #EDC9AF and French beige #A67B5B.",
      "Beige comes from the French word for natural wool, neither bleached nor dyed.",
      "It was first recorded as a color name in English in 1887.",
      "CSS beige is almost white on screen (1.11:1 against white); use it for backgrounds with dark text.",
    ],
    sections: [
      {
        title: "Beige color codes",
        body: "CSS beige is #F5F5DC in HEX, rgb(245, 245, 220) in RGB, hsl(60, 56%, 91%) in HSL and 0, 0, 10, 4 in CMYK. Its red and green channels are equal, so its slight tint is yellow, not orange or pink.",
      },
      {
        title: "Why CSS beige looks so pale",
        body: "The X11 and CSS beige is a very light, slightly yellow tint, close to cream. The beige of trench coats, linen and living rooms is usually warmer and deeper: desert sand (#EDC9AF) has a pinkish warmth, and French beige (#A67B5B) is a deep beige-brown. For a beige that reads as beige rather than off-white, use a warmer value.",
      },
      {
        title: "Where the name comes from",
        body: "Beige originally meant natural wool that had been neither bleached nor dyed. It came into use as a color name in France around 1855–1860 and in English by 1887.",
      },
      {
        title: "Beige and contrast",
        body: "CSS beige is almost white: 1.11:1 against white, so a beige panel on a white page needs a border or a slightly darker edge. Near-black text on it reaches 16.1:1. French beige (#A67B5B) is deeper but still only 3.75:1 against white, so it's an accent, not a text color.",
      },
      {
        title: "Colors that go with beige",
        body: "Beige works with white, navy, olive, sage, terracotta and black. One deep accent keeps a beige room or brand from looking flat; navy or olive are the safest choices.",
      },
      {
        title: "Beige, tan, cream or ivory?",
        body: "Tan (#D2B48C) is darker and browner. Cream is paler and more yellow. Ivory (#FFFFF0) is whiter than all of them. The beige color meaning page covers what beige stands for.",
      },
    ],
    faq: [
      { question: "What is the hex code for beige?", answer: "CSS beige is #F5F5DC (RGB 245, 245, 220). Warmer beiges include desert sand #EDC9AF and French beige #A67B5B." },
      { question: "Why does CSS beige look almost white?", answer: "The X11 and CSS value is a very pale, slightly yellow tint. Beiges in fashion and interiors are usually warmer and deeper." },
      { question: "Is beige warm or cool?", answer: "Usually warm. CSS beige has a slight yellow tint; desert sand and French beige are warmer still." },
      { question: "Where does the word beige come from?", answer: "From French, for natural wool that was neither bleached nor dyed. It's been an English color name since 1887." },
      { question: "What colors go with beige?", answer: "White, navy, olive, sage, terracotta and black." },
    ],
    sources: [
      { title: "Beige, Wikipedia", href: "https://en.wikipedia.org/wiki/Beige" },
      { title: "CSS Color Module Level 4: named colors, W3C", href: "https://www.w3.org/TR/css-color-4/#named-colors" },
    ],
  },
  olive: {
    title: "Olive Color Hex #808000 vs Olive Drab #6B8E23",
    description:
      "Olive is #808000 in CSS, olive drab is #6B8E23 and dark olive green is #556B2F. Compare all three, with RGB, CMYK, contrast and pairings.",
    answer:
      "Olive is #808000 (RGB 128, 128, 0; CMYK 0, 0, 100, 50) in CSS: yellow at half brightness, a muted yellow-green. CSS olivedrab (#6B8E23) is greener, and darkolivegreen (#556B2F) deeper. Olive sits awkwardly for text: 4.20:1 on white and 5.01:1 with black text, so check contrast or go darker.",
    hexVariants: [
      { label: "CSS olive", hex: "#808000", note: "One of HTML's original 16 colors: yellow at half strength." },
      { label: "CSS olive drab", hex: "#6B8E23", note: "Written olivedrab in CSS; named after the military color, first recorded in 1892." },
      { label: "CSS dark olive green", hex: "#556B2F", note: "Written darkolivegreen in CSS; deeper and more muted." },
    ],
    keyTakeaways: [
      "CSS olive is #808000; olivedrab is #6B8E23; darkolivegreen is #556B2F.",
      "Olive measures 4.20:1 on white, just under AA for body text; darkolivegreen reaches 5.95:1.",
      "The U.S. Army used several numbered olive drab shades, so there's no single 'army green'.",
      "Olive pairs well with cream, terracotta, mustard and rust.",
    ],
    sections: [
      {
        title: "Olive color codes",
        body: "CSS olive is #808000 in HEX, rgb(128, 128, 0) in RGB, hsl(60, 100%, 25%) in HSL and 0, 0, 100, 50 in CMYK. With red and green equal and no blue, it's technically a dark yellow, which our eyes read as a yellow-green.",
      },
      {
        title: "Olive, olive drab and dark olive green",
        body: "CSS has three olives. olive (#808000) is the yellowest. olivedrab (#6B8E23) is greener and was first recorded as a color name in 1892. darkolivegreen (#556B2F) is the deepest and most muted. Real military olive drab varied: the U.S. Army used several numbered shades, such as OD #3, OD #7 and OG-107, so there's no single official 'army green' hex.",
      },
      {
        title: "Named after the fruit",
        body: "Olive takes its name from the green of unripe olives and olive leaves, and carries the old symbolism of the olive branch: peace and reconciliation. The olive color meaning page covers that history.",
      },
      {
        title: "Olive and contrast",
        body: "Olive is a mid-tone, which makes it tricky: white text on it measures 4.20:1 and black text 5.01:1, so neither is comfortable at small sizes. olivedrab is similar (3.81:1 with white). For olive buttons with white labels or olive text on white, use darkolivegreen (#556B2F, 5.95:1) or darker.",
      },
      {
        title: "Colors that go with olive",
        body: "Olive and terracotta is a classic earthy pairing. Cream, mustard, rust and camel keep it warm; navy and blush make it more modern. Olive works well in outdoor, food and sustainable brands.",
      },
      {
        title: "Olive, sage or khaki?",
        body: "Sage is grayer, lighter and cooler. Khaki is lighter still, close to sand. Olive is the darkest and most yellow of the three.",
      },
    ],
    faq: [
      { question: "What is the hex code for olive?", answer: "CSS olive is #808000 (RGB 128, 128, 0). Olive drab is #6B8E23 and dark olive green is #556B2F." },
      { question: "What is the difference between olive and olive drab?", answer: "Olive (#808000) is a yellowish green; olive drab (#6B8E23) is greener and named after the military color." },
      { question: "What is the army green hex code?", answer: "There isn't a single one: the U.S. Army used several olive drab shades. CSS olivedrab (#6B8E23) is the common web stand-in." },
      { question: "Can I use white text on olive?", answer: "Only for large text: 4.20:1. Use darkolivegreen (#556B2F, 5.95:1) or darker for buttons." },
      { question: "What colors go with olive?", answer: "Cream, terracotta, mustard, rust, camel, navy and blush." },
    ],
    sources: [
      { title: "Olive (color), Wikipedia", href: "https://en.wikipedia.org/wiki/Olive_(color)" },
      { title: "CSS Color Module Level 4: named colors, W3C", href: "https://www.w3.org/TR/css-color-4/#named-colors" },
    ],
  },
};
