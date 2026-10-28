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
};
