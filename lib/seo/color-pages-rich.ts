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
};
