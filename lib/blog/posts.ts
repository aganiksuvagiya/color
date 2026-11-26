// Blog posts: metadata, FAQs and sources. The body of each post is a component in
// components/blog/posts/<slug>.tsx; everything that also feeds metadata, structured data,
// the blog index, the sitemap and /llms.txt lives here so it stays in one place.

import {
  COTY_AS_OF,
  PANTONE_2027,
  PANTONE_GUIDE_SLUG,
  PANTONE_HISTORY,
  allCoty2027Picks,
  hasPantoneGuide,
  type PantonePick,
} from "@/lib/blog/color-of-the-year-2027";
import { parseHex } from "@/lib/color-convert";
import { contrastRatio } from "@/lib/pastel-colors";

export type BlogFaq = { question: string; answer: string };
export type BlogSource = { title: string; url: string };

export type BlogPost = {
  slug: string;
  /** <title> text (the layout adds " | HueFlow"). */
  title: string;
  /** On-page H1. */
  h1: string;
  /** Short name for the breadcrumb. */
  crumb: string;
  description: string;
  /** One-paragraph direct answer shown at the top (and quoted by answer engines). */
  answer: string;
  dek: string;
  category: string;
  published: string; // YYYY-MM-DD
  updated: string; // YYYY-MM-DD
  readMinutes: number;
  cover: string[];
  keywords: string[];
  toc: { id: string; title: string }[];
  faq: BlogFaq[];
  sources: BlogSource[];
  related: { title: string; href: string }[];
};

const listOf = (items: string[]) =>
  items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
const ratioText = (a: string, b: string) => {
  const r = contrastRatio(parseHex(a)!, parseHex(b)!);
  let shown = Math.round(r * 10) / 10;
  for (const t of [3, 4.5, 7]) if (r < t && shown >= t) shown = t - 0.1;
  return { r, text: `${shown.toFixed(1)}:1` };
};

const COTY_SOURCES: BlogSource[] = [
  { title: "Pantone: Color of the Year (2027 events and past colors)", url: "https://www.pantone.com/color-of-the-year" },
  { title: "Sherwin-Williams: Color of the Year 2027 (Celery)", url: "https://www.sherwin-williams.com/en-us/color/color-of-the-year/2027" },
  { title: "Sherwin-Williams: SW 6421 Celery color page", url: "https://www.sherwin-williams.com/sherwinwilliams/SW6421-celery" },
  { title: "Benjamin Moore press release: Webster Green HC-130", url: "https://www.benjaminmoore.com/en-ca/press/benjamin-moore-announces-colour-of-the-year-2027" },
  { title: "Behr: 2027 Color of the Year announcement (Grounded)", url: "https://www.behr.com/colorfullybehr/behr-announces-2027-color-of-the-year-grounded/" },
  { title: "Behr Canada: Grounded T27-01 color page", url: "https://www.behr.ca/consumer/colors/2027-color-of-the-year" },
  { title: "Valspar: Color of the Year 2027 (Cottage Door)", url: "https://www.valspar.com/en/colors/color-of-the-year-2027" },
  { title: "Apartment Therapy: Glidden's 2027 Color of the Year (Artifact)", url: "https://www.apartmenttherapy.com/glidden-color-of-the-year-2027-37690420" },
  { title: "HGTV: Dutch Boy's 2027 Color of the Year (Deep Rooted)", url: "https://www.hgtv.com/decorating/color/dutch-boy-paints-color-of-the-year" },
  { title: "Dulux Canada: 2027 Color of the Year (Birthday Cake DLX1059-2)", url: "https://www.dulux.ca/colour/2027-colour-of-the-year" },
  { title: "Rust-Oleum: Mauve Classic is its 2027 Wall Paint Color of the Year (Oct 29, 2026)", url: "https://www.rustoleum.com/newsroom/2026/rust-oleum-names-mauve-classic-its-2027-wall-paint-color-of-the-year" },
  { title: "PPG: Color of the Year, Country Soil", url: "https://www.ppg.com/en-US/industrialcoatings/color/COTY" },
  { title: "Design Milk: 2027 Colors of the Year (Clark+Kensington, California Paints)", url: "https://design-milk.com/2027-colors-of-the-year/" },
  { title: "Dezeen: Sage green is the Dulux Colour of the Year 2027", url: "https://dezeen.com/2026/09/08/sage-green-colour-year-2027-dulux" },
  { title: "Graham & Brown: Design and Colour of the Year 2027", url: "https://www.grahambrown.com/uk/inspiration/introducing-design-and-colour-of-the-year-2027/" },
  { title: "WGSN: Colour of the Year 2027, Luminous Blue", url: "https://www.wgsn.com/en/wgsn/press/press-releases/wgsn-and-coloro-reveal-colour-year-2027-luminous-blue-and-s-s-27-key" },
  { title: "James Hardie: 2027 Color of the Year, Midnight Black", url: "https://www.jameshardie.com/color-of-the-year-midnight-black" },
  { title: "Business Wire via Morningstar: James Hardie names Midnight Black (Nov 12, 2026)", url: "https://www.morningstar.com/news/business-wire/20261112762343/james-hardie-names-midnight-black-its-2027-color-of-the-year" },
  { title: "Hardware Retailing: Minwax names Pickled Oak (MW260)", url: "https://hardwareretailing.com/mixwax-names-2027-color-of-the-year" },
  { title: "Homes & Gardens: Little Greene's Marle", url: "https://www.homesandgardens.com/decor/paint/little-greene-color-of-the-year-2027" },
  { title: "Young House Love: every 2027 Color of the Year (Dunn-Edwards, C2)", url: "https://www.younghouselove.com/2027-color-of-the-year/" },
  { title: "HEX reference: Webster Green HC-130 (Match My Paint Color)", url: "https://www.matchmypaintcolor.com/benjamin-moore/webster-green-hc-130" },
  { title: "HEX reference: Deep Rooted 311-7DB (Match My Paint Color)", url: "https://www.matchmypaintcolor.com/dutch-boy/deep-rooted-311-7db" },
  { title: "HEX reference: Artifact PPG10-16 (Match My Paint Color)", url: "https://www.matchmypaintcolor.com/ppg/artifact-ppg10-16" },
  { title: "HEX reference: Valspar Cottage Door (Composite Paint)", url: "https://compositepaint.com/colors/valspar-cottage-door/" },
];

/** The 2027 roundup. Title, answer, FAQ and dates follow PANTONE_2027, so the Pantone update is a data edit. */
function colorOfTheYear2027Post(pantone: PantonePick | null): BlogPost {
  const picks = allCoty2027Picks(pantone);
  const asOf = formatDate(COTY_AS_OF);
  const pastPantone = PANTONE_HISTORY.slice(0, 5)
    .map((y) => `${y.year}: ${y.colors.map((c) => c.name).join(" and ")}`)
    .join("; ");
  const otherPicks =
    "Celery (Sherwin-Williams), Webster Green (Benjamin Moore), Grounded (Behr), Cottage Door (Valspar), Artifact (Glidden), Deep Rooted (Dutch Boy), Birthday Cake (Dulux Canada), Mauve Classic (Rust-Oleum), Vantage Point (Clark+Kensington), Quiet Peace (California Paints) and Country Soil (PPG). WGSN and Coloro picked Luminous Blue, Dulux Soulful Sage, Graham & Brown Rose Earth, Dunn-Edwards French Press Coffee, C2 Pueblo, Little Greene Marle, Minwax Pickled Oak and James Hardie Midnight Black.";
  const pantoneHex = pantone?.hex ? `, with the screen value ${pantone.hex}` : "";

  return {
    slug: "color-of-the-year-2027",
    title: pantone ? `Color of the Year 2027: Pantone's ${pantone.name} and Every Other Pick` : "Color of the Year 2027: Every Pick So Far, With Hex Codes",
    h1: pantone ? `Color of the Year 2027: Pantone's ${pantone.name} and every other pick, side by side` : "Color of the Year 2027: every pick so far, side by side",
    crumb: "Color of the Year 2027",
    description: pantone
      ? `Pantone's 2027 Color of the Year is ${pantone.name} (${pantone.code}). See it next to all ${picks.length - 1} other 2027 picks with HEX codes: Celery, Webster Green, Grounded and more.`
      : `All ${picks.length} Colors of the Year 2027 so far, with HEX codes: Sherwin-Williams Celery, Benjamin Moore Webster Green, Behr Grounded and more. Pantone is next.`,
    answer: pantone
      ? `There is no single Color of the Year for 2027, because every brand picks its own. Pantone, the one most people mean, chose ${pantone.name} (${pantone.code})${pantoneHex}, announced ${pantone.announced}. Among paint brands, Sherwin-Williams chose Celery (SW 6421), Benjamin Moore chose Webster Green (HC-130), Behr chose Grounded (T27-01) and Valspar chose Cottage Door (8004-38E).`
      : "There is no single Color of the Year for 2027, because every paint brand and forecaster picks its own. So far Sherwin-Williams chose Celery (SW 6421), Benjamin Moore chose Webster Green (HC-130), Behr chose Grounded (T27-01), Valspar chose Cottage Door (8004-38E), Glidden chose Artifact (PPG10-16) and Dutch Boy chose Deep Rooted (311-7DB). Pantone usually names its pick in early December.",
    dek: "Paint brands and trend forecasters have named their 2027 colors. Here is every pick announced so far, what they have in common, and the codes you need to use them on a screen.",
    category: "Trends",
    published: "2026-10-23",
    updated: pantone ? pantone.announcedIso : COTY_AS_OF,
    readMinutes: 11,
    cover: pantone?.hex ? [pantone.hex, "#E0DDBD", "#64806C", "#7A8F97", "#A6613C"] : ["#E0DDBD", "#64806C", "#615E50", "#7A8F97", "#A6613C"],
    keywords: [
      "color of the year 2027",
      "2027 color of the year",
      "pantone color of the year 2027",
      ...(pantone ? [`pantone ${pantone.name.toLowerCase()}`, `${pantone.name.toLowerCase()} hex code`] : []),
      "sherwin williams color of the year 2027",
      "benjamin moore color of the year 2027",
      "behr color of the year 2027",
      "valspar color of the year 2027",
      "2027 color trends",
      "pantone color of the year history",
      "celery sw 6421 hex",
      "webster green hc-130",
      "rust-oleum mauve classic",
      "dulux birthday cake",
    ],
    toc: [
      { id: "all-picks", title: "All the 2027 picks at a glance" },
      { id: "patterns", title: "What the 2027 colors have in common" },
      { id: "each-color", title: "Each color, and how to use it" },
      { id: "pinks", title: "Dulux Canada and Rust-Oleum: two pinks" },
      { id: "pantone", title: pantone ? `Pantone's 2027 color: ${pantone.name}` : "What about Pantone's 2027 color?" },
      { id: "pantone-history", title: "Every Pantone Color of the Year since 2000" },
      { id: "screens", title: "Using the 2027 colors on screens" },
      { id: "faq", title: "FAQ" },
    ],
    faq: [
      {
        question: "What is the Color of the Year 2027?",
        answer: pantone
          ? `There isn't just one. Pantone chose ${pantone.name} (${pantone.code}). The other picks are ${otherPicks}`
          : `There isn't just one. Each brand names its own. Pantone hasn't announced yet. The picks so far are ${otherPicks}`,
      },
      pantone
        ? {
            question: "What is Pantone's Color of the Year 2027?",
            answer: `${pantone.name} (${pantone.code}), announced ${pantone.announced}. ${pantone.look}${pantone.hex ? ` Its screen value is ${pantone.hex}.` : ""} It follows 2026's Cloud Dancer (PANTONE 11-4201).`,
          }
        : {
            question: "Has Pantone announced its 2027 Color of the Year?",
            answer: `Not as of ${asOf}. Pantone usually reveals its Color of the Year in early December, and its Color of the Year page lists a 2027 event in Miami on December 3, 2026. Its 2026 pick was Cloud Dancer (PANTONE 11-4201), a soft off-white with the screen value #F0EEE9.`,
          },
      {
        question: "What were Pantone's last five Colors of the Year?",
        answer: `${pastPantone}. Pantone has named a color every year since 2000, and named two in 2016 and 2021.`,
      },
      {
        question: "What is Sherwin-Williams' Color of the Year 2027?",
        answer:
          "Celery, SW 6421, announced on September 15, 2026 together with HGTV Home by Sherwin-Williams. It is a soft, muted green with yellow undertones. Sherwin-Williams lists its HEX value as #E0DDBD and its LRV as about 71.",
      },
      {
        question: "What is Benjamin Moore's Color of the Year 2027?",
        answer:
          "Webster Green, HC-130, announced on October 14, 2026. It is a deep, classic green. Paint-matching databases list it at about #64806C with an LRV of 20.",
      },
      {
        question: "Is pink a 2027 color trend?",
        answer:
          "Yes, a muted one. Four 2027 picks are pinks or mauves: Graham & Brown's Rose Earth, C2's Pueblo, Rust-Oleum's Mauve Classic and Dulux Canada's Birthday Cake (#E9D2CC). None is a bright pink; they're dusty, smoky or pale.",
      },
      {
        question: "Are the HEX codes for paint colors exact?",
        answer:
          "No. A HEX code is a screen approximation of a physical paint, and screens, lighting and sheen all change how paint looks. Use the HEX codes for mood boards and digital design, and always test a real sample on your wall before you buy.",
      },
      {
        question: "Which 2027 color is easiest to live with?",
        answer:
          "Celery and Cottage Door are the gentlest: Celery is light and reads almost like a warm neutral, and Cottage Door is a soft gray-blue. Webster Green, Grounded and Deep Rooted are deeper and work best on a single wall, cabinets, a front door or a small room.",
      },
    ],
    sources: pantone ? [pantone.source, ...COTY_SOURCES] : COTY_SOURCES,
    related: [
      ...(hasPantoneGuide(pantone) ? [{ title: `Pantone ${pantone.name}`, href: `/blog/${PANTONE_GUIDE_SLUG}` }] : []),
      { title: "Color wheel", href: "/color-wheel" },
      { title: "Color palette generator", href: "/generator" },
      { title: "Trending color palettes", href: "/trends" },
      { title: "Contrast checker", href: "/tools/contrast" },
      { title: "Shades of green", href: "/shades-of-green" },
      { title: "Shades of blue", href: "/shades-of-blue" },
    ],
  };
}

/** Pantone's 2027 guide, built from PANTONE_2027. Only listed (and routed) once it has a HEX and guide content. */
function pantoneGuidePost(p: PantonePick & { hex: string; guide: NonNullable<PantonePick["guide"]> }): BlogPost {
  const rgb = parseHex(p.hex)!;
  const dark = ratioText(p.hex, "#1C1712");
  const white = ratioText(p.hex, "#FFFFFF");
  const best = dark.r >= white.r ? { label: "dark text", ...dark } : { label: "white text", ...white };
  const textAdvice =
    best.r >= 4.5
      ? `Use ${best.label}: it measures ${best.text}, which passes WCAG AA for body text.`
      : `Neither dark text (${dark.text}) nor white text (${white.text}) reaches the 4.5:1 WCAG bar for body text, so use it for large type, backgrounds and accents, or darken it for buttons.`;
  return {
    slug: PANTONE_GUIDE_SLUG,
    title: `Pantone Color of the Year 2027: ${p.name} Hex Code & Palettes`,
    h1: `Pantone Color of the Year 2027: ${p.name} (${p.code}), hex code and palettes`,
    crumb: `Pantone ${p.name}`,
    description: `Pantone ${p.name} (${p.code}), the Color of the Year 2027: hex ${p.hex}, RGB, HSL and CMYK, four palettes, six colors that go with it, and how to use it on screens.`,
    answer: `${p.name} (${p.code}) is Pantone's Color of the Year 2027, announced ${p.announced}. ${p.look} Its screen value is ${p.hex} (RGB ${rgb.r}, ${rgb.g}, ${rgb.b}). On a website, ${textAdvice.charAt(0).toLowerCase()}${textAdvice.slice(1)}`,
    dek: `Pantone's pick for 2027. Here are its codes, palettes built around it, and the colors that go with it.`,
    category: "Trends",
    published: p.announcedIso,
    updated: p.announcedIso,
    readMinutes: 5,
    cover: p.guide.cover,
    keywords: [
      "pantone color of the year 2027",
      `pantone ${p.name.toLowerCase()}`,
      `${p.name.toLowerCase()} hex code`,
      `${p.code.toLowerCase()} hex`,
      `${p.name.toLowerCase()} color palette`,
      `colors that go with ${p.name.toLowerCase()}`,
    ],
    toc: [
      { id: "codes", title: `${p.name} color codes` },
      { id: "look", title: `What ${p.name} looks like` },
      { id: "palettes", title: `${p.name} color palettes` },
      { id: "pairings", title: `Colors that go with ${p.name}` },
      { id: "where", title: `Where to use ${p.name}` },
      { id: "screens", title: `${p.name} on screens` },
      { id: "faq", title: "FAQ" },
    ],
    faq: [
      { question: "What is Pantone's Color of the Year 2027?", answer: `${p.name} (${p.code}), announced ${p.announced}. ${p.look}` },
      {
        question: `What is the hex code for Pantone ${p.name}?`,
        answer: `${p.hex} (RGB ${rgb.r}, ${rgb.g}, ${rgb.b}), from ${p.hexSource ?? "Pantone"}. A HEX code is a screen value, so check a physical Pantone swatch for print or fabric.`,
      },
      { question: `What colors go with ${p.name}?`, answer: `${listOf(p.guide.pairings.map((x) => `${x.name} (${x.hex})`))}. The pairings above show the contrast between each pair.` },
      { question: `Can I use ${p.name} for text or buttons on a website?`, answer: textAdvice },
      { question: "What was Pantone's 2026 Color of the Year?", answer: "Cloud Dancer (PANTONE 11-4201), a soft off-white with the screen value #F0EEE9." },
    ],
    sources: [p.source, { title: "Pantone: Color of the Year", url: "https://www.pantone.com/color-of-the-year" }],
    related: [
      { title: "Every 2027 Color of the Year", href: "/blog/color-of-the-year-2027" },
      { title: "Sherwin-Williams Celery", href: "/blog/sherwin-williams-celery" },
      { title: "Benjamin Moore Webster Green", href: "/blog/benjamin-moore-webster-green" },
      { title: "Color wheel", href: "/color-wheel" },
      { title: "Contrast checker", href: "/tools/contrast" },
      { title: "Color palette generator", href: "/generator" },
    ],
  };
}

export const blogPosts: BlogPost[] = [
  {
    slug: "thanksgiving-color-palette",
    title: "Thanksgiving Color Palette: 8 Palettes, Hex Codes",
    h1: "Thanksgiving color palette: 8 harvest palettes with hex codes",
    crumb: "Thanksgiving color palette",
    description:
      "Thanksgiving colors with HEX codes: pumpkin, cranberry, harvest gold, sage and more, 8 ready palettes, and contrast checks for menus, invitations and posts.",
    answer:
      "The classic Thanksgiving colors are the harvest colors: pumpkin orange (#E07B39), cranberry red (#9B1B30), harvest gold (#DA9100), chestnut brown (#6F4E37) and cream (#F5EBDC), often with sage green (#9CAF88) for a more modern table. Let one color lead, keep the base light, and use cranberry or brown for text: both pass WCAG AA on cream.",
    dek: "The harvest colors with exact codes, eight palettes for tables, invitations and social posts, and the contrast numbers for putting text on them.",
    category: "Seasonal",
    published: "2026-11-14",
    updated: "2026-11-14",
    readMinutes: 6,
    cover: ["#9B1B30", "#E07B39", "#DA9100", "#6F4E37", "#F5EBDC"],
    keywords: [
      "thanksgiving color palette",
      "thanksgiving colors",
      "thanksgiving color palette hex codes",
      "thanksgiving color palette 2026",
      "thanksgiving color scheme",
      "friendsgiving color palette",
      "harvest color palette",
    ],
    toc: [
      { id: "colors", title: "The core Thanksgiving colors" },
      { id: "palettes", title: "8 Thanksgiving color palettes" },
      { id: "table", title: "Thanksgiving colors on the table" },
      { id: "print", title: "Invitations, menus and place cards" },
      { id: "digital", title: "Websites, emails and social posts" },
      { id: "friendsgiving", title: "Friendsgiving and modern palettes" },
      { id: "avoid", title: "Colors to be careful with" },
      { id: "faq", title: "FAQ" },
    ],
    faq: [
      {
        question: "What are the traditional Thanksgiving colors?",
        answer:
          "The harvest colors: pumpkin orange, cranberry red, golden yellow, warm brown and cream. Sage green is a popular modern addition because it cools down all the orange.",
      },
      {
        question: "What are the hex codes for Thanksgiving colors?",
        answer:
          "Pumpkin #E07B39, cranberry #9B1B30, harvest gold #DA9100, chestnut brown #6F4E37, burnt orange #CC5500, sage #9CAF88, wheat #F5DEB3 and cream #F5EBDC.",
      },
      {
        question: "When is Thanksgiving 2026?",
        answer:
          "Thursday, November 26, 2026. Thanksgiving in the United States is the fourth Thursday of November, fixed by a resolution President Roosevelt signed on December 26, 1941.",
      },
      {
        question: "What colors go with orange for Thanksgiving?",
        answer:
          "Cream and wheat as the base, brown for wood and text, cranberry for depth, gold for candles and flatware, and sage green to balance the warmth.",
      },
      {
        question: "What text color should I use on a Thanksgiving invitation?",
        answer:
          "Cranberry #9B1B30 on cream measures 6.8:1 and chestnut brown #6F4E37 on cream 6.3:1, so both pass WCAG AA. Avoid white text on pumpkin orange: it only reaches 2.9:1.",
      },
    ],
    sources: [
      { title: "National Archives: Congress Establishes Thanksgiving", url: "https://www.archives.gov/legislative/features/thanksgiving" },
      { title: "WCAG 2.2: Contrast (Minimum), W3C", url: "https://www.w3.org/TR/WCAG22/#contrast-minimum" },
    ],
    related: [
      { title: "Christmas color palettes", href: "/color-palettes/christmas" },
      { title: "Winter color palette", href: "/blog/winter-color-palette" },
      { title: "Color of the Year 2027", href: "/blog/color-of-the-year-2027" },
      { title: "Wheat color codes", href: "/colors/wheat" },
      { title: "Color wheel", href: "/color-wheel" },
      { title: "Contrast checker", href: "/tools/contrast" },
    ],
  },
  {
    slug: "hanukkah-colors",
    title: "Hanukkah Colors: Meaning, Hex Codes and Palettes",
    h1: "Hanukkah colors: why blue and white, with hex codes and palettes",
    crumb: "Hanukkah colors",
    description:
      "Why Hanukkah colors are blue and white, plus silver and gold: the history, HEX codes such as flag blue #0038B8, six palettes and readable text pairs.",
    answer:
      "The Hanukkah colors are blue and white, often with silver and gold. Blue and white come from the tallit, the Jewish prayer shawl; an 1864 poem called them the colors of Judah; they became the colors of Israel's flag; and American cards and decorations made them the standard Hanukkah look after World War II. A good screen blue is #0038B8. In 2026, Hanukkah runs from sundown on December 4 to sundown on December 12.",
    dek: "Blue and white, silver and gold: where the Hanukkah colors come from, the codes to use, and palettes that stay readable on cards and screens.",
    category: "Seasonal",
    published: "2026-11-14",
    updated: "2026-11-14",
    readMinutes: 6,
    cover: ["#FFFFFF", "#7FA7E0", "#0038B8", "#D4AF37", "#1F2A44"],
    keywords: [
      "hanukkah colors",
      "hanukkah colors meaning",
      "why are hanukkah colors blue and white",
      "hanukkah colors hex",
      "hanukkah colors rgb",
      "hanukkah color palette",
      "chanukah colors",
      "blue and gold hanukkah",
    ],
    toc: [
      { id: "colors", title: "What are the Hanukkah colors?" },
      { id: "why-blue", title: "Why blue and white?" },
      { id: "codes", title: "Hanukkah color codes" },
      { id: "palettes", title: "6 Hanukkah color palettes" },
      { id: "text", title: "Readable text on Hanukkah colors" },
      { id: "ideas", title: "Ideas for cards, tables and posts" },
      { id: "faq", title: "FAQ" },
    ],
    faq: [
      {
        question: "What are the colors of Hanukkah?",
        answer: "Blue and white, with silver and gold as the usual accents. Silver and gold echo menorahs, candlelight and the gold-foil chocolate coins called gelt.",
      },
      {
        question: "Why are Hanukkah colors blue and white?",
        answer:
          "Blue and white are long-standing Jewish colors from the tallit, the white prayer shawl that is often striped in blue and whose fringes recall a blue thread called tekhelet. An 1864 poem by Ludwig August Frankl called them the colors of Judah, they became the colors of Israel's flag, and after World War II American greeting cards and decorations made them the standard colors of Hanukkah.",
      },
      {
        question: "What is the hex code for Hanukkah blue?",
        answer:
          "A good default is #0038B8 (RGB 0, 56, 184), the Israeli flag blue as Wikipedia lists it. For a lighter, friendlier blue use royal blue #4169E1, which still carries white text at 4.8:1.",
      },
      {
        question: "When is Hanukkah in 2026?",
        answer: "Hanukkah 2026 begins at sundown on Friday, December 4, and lasts until sundown on Saturday, December 12.",
      },
      {
        question: "Are there religious rules about Hanukkah colors?",
        answer: "No. Jewish law doesn't assign colors to Hanukkah. Blue, white, silver and gold are cultural traditions, so any palette you like is fine.",
      },
      {
        question: "Can I use gold text on a white Hanukkah card?",
        answer:
          "On screen, no: metallic gold #D4AF37 on white measures only 2.1:1. Put gold on navy instead, where it reaches 6.7:1. Printed gold foil can work at lower contrast because it catches the light.",
      },
    ],
    sources: [
      { title: "My Jewish Learning: Hanukkah 2026 dates", url: "https://www.myjewishlearning.com/article/hanukkah/" },
      { title: "TIME: how blue and white became the colors of Hanukkah", url: "https://time.com/5458247/hanukkah-colors-blue-white/" },
      { title: "Wikipedia: Flag of Israel (history and color values)", url: "https://en.wikipedia.org/wiki/Flag_of_Israel" },
      { title: "WCAG 2.2: Contrast (Minimum), W3C", url: "https://www.w3.org/TR/WCAG22/#contrast-minimum" },
    ],
    related: [
      { title: "Shades of blue", href: "/shades-of-blue" },
      { title: "Navy color codes", href: "/colors/navy" },
      { title: "Gold color codes", href: "/colors/gold" },
      { title: "Silver color codes", href: "/colors/silver" },
      { title: "Winter color palette", href: "/blog/winter-color-palette" },
      { title: "Contrast checker", href: "/tools/contrast" },
    ],
  },
  {
    slug: "winter-color-palette",
    title: "Winter Color Palette: Hex Codes for All 3 Winters",
    h1: "Winter color palette: hex codes for Deep, True and Bright Winter",
    crumb: "Winter color palette",
    description:
      "The Winter palette from seasonal color analysis with HEX codes: Deep, True and Bright Winter palettes, colors Winters avoid, and four winter palettes for design.",
    answer:
      "In seasonal color analysis, a Winter has cool, high-contrast coloring and looks best in clear, saturated colors: pure white, black, true red (#C8102E), royal blue (#4169E1), sapphire (#0F52BA), emerald (#009B77), hot pink (#FF69B4), burgundy (#800020) and icy pastels such as #D6ECF5. Deep Winters suit the darkest of these, True Winters the coolest and Bright Winters the most vivid. Warm, muted earth tones such as camel, mustard and orange usually suit them least.",
    dek: "What a Winter is in color analysis, the colors and codes for Deep, True and Bright Winter, and four winter palettes for design.",
    category: "Seasonal",
    published: "2026-11-14",
    updated: "2026-11-14",
    readMinutes: 7,
    cover: ["#FFFFFF", "#C8102E", "#0F52BA", "#009B77", "#1A1A1A"],
    keywords: [
      "winter color palette",
      "winter color palette hex codes",
      "deep winter color palette",
      "true winter color palette",
      "bright winter color palette",
      "cool winter colors",
      "winter color analysis",
      "winter color palette for design",
    ],
    toc: [
      { id: "what", title: "What is a Winter in color analysis?" },
      { id: "colors", title: "The core Winter colors" },
      { id: "types", title: "Deep, True and Bright Winter palettes" },
      { id: "avoid", title: "Colors Winters usually avoid" },
      { id: "design", title: "Winter color palettes for design" },
      { id: "text", title: "Readable text on Winter colors" },
      { id: "faq", title: "FAQ" },
    ],
    faq: [
      {
        question: "What is a winter color palette?",
        answer:
          "In color analysis, it is the set of clothing and makeup colors said to suit people with cool, high-contrast coloring: clear, saturated jewel tones, pure white, black and icy pastels. In design, it simply means colors that feel like winter, such as snowy blues, evergreen and berry.",
      },
      {
        question: "What colors are in the Winter palette?",
        answer:
          "Pure white, black, true red #C8102E, royal blue #4169E1, sapphire #0F52BA, emerald #009B77, hot pink #FF69B4, burgundy #800020, charcoal #36454F and icy pastels such as icy blue #D6ECF5.",
      },
      {
        question: "What is the difference between Deep, True and Bright Winter?",
        answer:
          "Deep (Dark) Winter is the darkest and closest to Autumn, True (Cool) Winter is the coolest, and Bright (Clear) Winter is the most vivid and closest to Spring. They share the same cool, high-contrast base.",
      },
      {
        question: "What colors should a Winter avoid?",
        answer:
          "Warm, muted, earthy colors: camel, mustard, orange, rust, peach and olive. Cooler swaps are charcoal or navy for camel, icy lemon for mustard, true red for orange and emerald for olive.",
      },
      {
        question: "Is seasonal color analysis scientific?",
        answer:
          "Not really. It is a styling system, and different schools sort people differently. A 2007 study found inconsistencies between three systems, and a 2026 study found warm and cool categories matched measured colors better than the four seasons. Treat it as a starting point.",
      },
    ],
    sources: [
      { title: "Wikipedia: Color analysis (history, Kentner, Jackson, studies)", url: "https://en.wikipedia.org/wiki/Color_analysis" },
      { title: "WCAG 2.2: Contrast (Minimum), W3C", url: "https://www.w3.org/TR/WCAG22/#contrast-minimum" },
    ],
    related: [
      { title: "Shades of blue", href: "/shades-of-blue" },
      { title: "Shades of pink", href: "/shades-of-pink" },
      { title: "Royal blue color codes", href: "/colors/royal-blue" },
      { title: "Hot pink color codes", href: "/colors/hot-pink" },
      { title: "Hanukkah colors", href: "/blog/hanukkah-colors" },
      { title: "Christmas color palettes", href: "/color-palettes/christmas" },
    ],
  },
  {
    slug: "palettes-on-a-real-website",
    title: "Why We Show Every Palette on a Website First",
    h1: "Why HueFlow shows every palette on a website before you use it",
    crumb: "Palettes on a real website",
    description:
      "Five swatches can't tell you if a palette works. HueFlow previews every palette as a small interface and computes WCAG contrast for text, buttons and links. Here's why, and how.",
    answer:
      "A palette can look perfect as five swatches and still fail on a page: white text on a #FACC15 yellow button measures 1.53:1, far below the 4.5:1 WCAG asks for. HueFlow previews each palette as a small interface, picks the most readable label for every surface, and shows the WCAG contrast of body text, buttons and links.",
    dek: "Colors only work or fail once they have a job. Here's what the preview checks, how the contrast numbers are worked out, and how HueFlow is built.",
    category: "Guides",
    published: "2026-10-29",
    updated: "2026-11-14",
    readMinutes: 6,
    cover: ["#0F172A", "#3B82F6", "#22C55E", "#FACC15", "#A855F7"],
    keywords: [
      "preview color palette on website",
      "accessible color palette generator",
      "wcag color palette checker",
      "color palette contrast checker",
      "button text color contrast",
      "white text on yellow button contrast",
      "hueflow",
    ],
    toc: [
      { id: "swatches", title: "Five swatches hide the problem" },
      { id: "preview", title: "What the preview shows" },
      { id: "contrast", title: "How the numbers are worked out" },
      { id: "built", title: "How it's built" },
      { id: "next", title: "What's next" },
      { id: "faq", title: "FAQ" },
    ],
    faq: [
      { question: "Is HueFlow free?", answer: "Yes. The generator, the preview, the converters and the contrast checker all work without an account." },
      { question: "What contrast ratio does text need?", answer: "WCAG level AA asks for 4.5:1 for normal text and 3:1 for large text and UI parts such as icons. Level AAA asks for 7:1." },
      { question: "How does HueFlow choose the text color on a button?", answer: "It measures white, near-black and the palette's own dark color against the button and uses whichever has the highest contrast. If none reaches 4.5:1, the check under the preview shows it." },
      { question: "Does HueFlow simulate color blindness?", answer: "Yes, for protanopia, deuteranopia and tritanopia, using the Machado et al. (2009) model in linear RGB. It's a simulation for spotting colors that look alike, not a diagnosis." },
    ],
    sources: [
      { title: "WCAG 2.2: Contrast (Minimum), W3C", url: "https://www.w3.org/TR/WCAG22/#contrast-minimum" },
      { title: "WCAG 2.2: relative luminance definition, W3C", url: "https://www.w3.org/TR/WCAG22/#dfn-relative-luminance" },
      { title: "OpenNext for Cloudflare", url: "https://opennext.js.org/cloudflare" },
      { title: "Cloudflare Workers limits", url: "https://developers.cloudflare.com/workers/platform/limits/" },
    ],
    related: [
      { title: "Color palette generator", href: "/generator" },
      { title: "Contrast checker", href: "/tools/contrast" },
      { title: "Healthcare website colors", href: "/best-colors-for/healthcare-websites" },
      { title: "Color contrast guide", href: "/accessibility/color-contrast" },
      { title: "HEX to RGB converter", href: "/hex-to-rgb" },
    ],
  },
  colorOfTheYear2027Post(PANTONE_2027),
  {
    slug: "colors-that-go-with-navy-blue",
    title: "What Colors Go With Navy Blue? 18 Pairings With Hex Codes",
    h1: "What colors go with navy blue? 18 pairings that work",
    crumb: "Colors that go with navy blue",
    description:
      "18 colors that go with navy blue, from crisp white and camel to mustard, coral and blush, with HEX codes, contrast checks and ready-made palettes for outfits, rooms and websites.",
    answer:
      "Navy blue goes with almost everything because it acts like a dark neutral. The safest partners are white, cream, light gray and camel. For contrast, pair it with its warm opposites: mustard, gold, coral and orange. For a calmer look, stay close to it with sky blue, sage or blush pink. Red and burgundy give navy a classic, preppy feel.",
    dek: "Navy is the closest thing color has to a universal partner. Here are 18 pairings that work, why they work, and the exact codes to copy for an outfit, a room or a website.",
    category: "Color Pairings",
    published: "2026-10-23",
    updated: "2026-10-23",
    readMinutes: 8,
    cover: ["#1F2A44", "#F5EFE0", "#C19A6B", "#E1AD01", "#FF7F50"],
    keywords: [
      "what colors go with navy blue",
      "colors that go with navy blue",
      "navy blue color combinations",
      "what color goes with navy",
      "navy blue and mustard",
      "navy blue and gray",
      "navy blue color palette",
      "navy blue hex code",
      "colors that go with navy blue clothes",
      "colors that go with navy blue walls",
    ],
    toc: [
      { id: "which-navy", title: "Which navy are we talking about?" },
      { id: "why", title: "Why navy is so easy to pair" },
      { id: "pairings", title: "18 colors that go with navy blue" },
      { id: "palettes", title: "6 ready-made navy palettes" },
      { id: "use", title: "Navy in outfits, rooms and websites" },
      { id: "careful", title: "Colors to be careful with" },
      { id: "faq", title: "FAQ" },
    ],
    faq: [
      {
        question: "What color goes best with navy blue?",
        answer:
          "White is the most reliable partner: it gives the highest contrast (about 14:1 against a typical navy like #1F2A44) and always looks crisp. For something warmer, camel and cream are just as safe, and mustard or coral give navy a lively accent.",
      },
      {
        question: "Does navy blue go with black?",
        answer:
          "It can, but carefully. Navy and black are both very dark, so together they have little contrast (about 1.5:1) and can look like a mismatch rather than a choice. If you pair them, make the difference obvious with texture, or add a light third color such as white or gray.",
      },
      {
        question: "Does gray go with navy blue?",
        answer:
          "Yes. Light gray is one of the best partners for navy, with a contrast of about 10:1. Dark charcoal is trickier, because it sits close to navy in lightness and the two can blur together.",
      },
      {
        question: "What color shoes go with a navy suit or dress?",
        answer:
          "Brown and tan leather (cognac, camel, chocolate) are the classic choice with navy. Burgundy and oxblood also work well. Black shoes are fine for formal evening wear, and white sneakers suit a casual navy outfit.",
      },
      {
        question: "What wall color goes with a navy sofa?",
        answer:
          "Warm whites, cream and soft greige keep a room with a navy sofa bright and calm. For more character, try a muted sage or a dusty blush. Bring in camel, cognac or brass in cushions, wood and metal to warm the navy up.",
      },
      {
        question: "What accent color goes with navy blue?",
        answer:
          "Orange-family colors make the strongest accents, because orange sits opposite blue on the color wheel. Mustard, coral, burnt orange and metallic gold all pop against navy. Use them sparingly, around 10% of a palette.",
      },
    ],
    sources: [],
    related: [
      { title: "Shades of blue", href: "/shades-of-blue" },
      { title: "Color wheel", href: "/color-wheel" },
      { title: "Contrast checker", href: "/tools/contrast" },
      { title: "Color palette generator", href: "/generator" },
      { title: "Color combinations", href: "/color-combinations" },
      { title: "Color mixing chart", href: "/color-mixing-chart" },
    ],
  },
  {
    slug: "sherwin-williams-celery",
    title: "Sherwin-Williams Celery SW 6421: Hex Code & Palettes",
    h1: "Sherwin-Williams Celery (SW 6421): hex code, palettes and colors that go with it",
    crumb: "Sherwin-Williams Celery",
    description:
      "Sherwin-Williams Celery (SW 6421), the 2027 Color of the Year: hex #E0DDBD, RGB, HSL and CMYK, four palettes, six colors that go with it, and how to use it on screens.",
    answer:
      "Celery (SW 6421) is Sherwin-Williams' 2027 Color of the Year: a soft, muted green with yellow undertones. Sherwin-Williams lists its HEX as #E0DDBD (RGB 224, 221, 189) and its LRV as about 71, so it is light enough to use like an off-white. It pairs well with warm white, sage, terracotta and navy.",
    dek: "The lightest 2027 Color of the Year, somewhere between khaki, butter yellow and sage. Here are its codes, palettes built around it, and the colors that go with it.",
    category: "Trends",
    published: "2026-10-24",
    updated: "2026-10-24",
    readMinutes: 5,
    cover: ["#F5F1E6", "#E0DDBD", "#B8B08A", "#7A7F5A", "#3E3A2F"],
    keywords: ["sherwin williams celery", "celery sw 6421", "sw 6421 hex code", "celery color palette", "colors that go with celery", "sherwin williams color of the year 2027"],
    toc: [
      { id: "codes", title: "Celery color codes" },
      { id: "look", title: "What Celery looks like" },
      { id: "palettes", title: "Celery color palettes" },
      { id: "pairings", title: "Colors that go with Celery" },
      { id: "where", title: "Where to use Celery" },
      { id: "screens", title: "Celery on screens" },
      { id: "faq", title: "FAQ" },
    ],
    faq: [
      { question: "What color is Sherwin-Williams Celery?", answer: "A soft, muted green with yellow undertones. It sits between khaki, butter yellow and sage, and it is light (LRV about 71), so it often reads as a warm neutral." },
      { question: "What is the hex code for SW 6421 Celery?", answer: "Sherwin-Williams lists #E0DDBD (RGB 224, 221, 189). A HEX code is a screen approximation, so test a real paint sample before you buy." },
      { question: "Is Celery green or yellow?", answer: "Both, depending on the light. In north-facing or warm-lit rooms it looks creamy and slightly yellow; in bright daylight the green comes forward." },
      { question: "What colors go with Sherwin-Williams Celery?", answer: "Warm white, sage, terracotta, navy, charcoal and blush all work. Wood tones such as oak and walnut suit it too." },
      { question: "What was Sherwin-Williams' 2026 Color of the Year?", answer: "Universal Khaki, a beige. Celery continues from it, moving from a warm neutral toward a soft green." },
    ],
    sources: [
      { title: "Sherwin-Williams: Color of the Year 2027 (Celery)", url: "https://www.sherwin-williams.com/en-us/color/color-of-the-year/2027" },
      { title: "Sherwin-Williams: SW 6421 Celery color page", url: "https://www.sherwin-williams.com/sherwinwilliams/SW6421-celery" },
    ],
    related: [
      { title: "Every 2027 Color of the Year", href: "/blog/color-of-the-year-2027" },
      { title: "Benjamin Moore Webster Green", href: "/blog/benjamin-moore-webster-green" },
      { title: "Behr Grounded", href: "/blog/behr-grounded" },
      { title: "Valspar Cottage Door", href: "/blog/valspar-cottage-door" },
      { title: "Color wheel", href: "/color-wheel" },
      { title: "Color palette generator", href: "/generator" },
    ],
  },
  {
    slug: "benjamin-moore-webster-green",
    title: "Benjamin Moore Webster Green HC-130: Hex & Palettes",
    h1: "Benjamin Moore Webster Green (HC-130): hex code, palettes and colors that go with it",
    crumb: "Benjamin Moore Webster Green",
    description:
      "Benjamin Moore Webster Green (HC-130), the 2027 Color of the Year: hex about #64806C, RGB, HSL and CMYK, four palettes, six colors that go with it, and how to use it on screens.",
    answer:
      "Webster Green (HC-130) is Benjamin Moore's 2027 Color of the Year: a deep, slightly gray green between emerald and evergreen, from the Historical Colors collection. Paint-matching databases list it at about #64806C (RGB 100, 128, 108), with an LRV of about 20. It pairs well with cream, brass, dusty pink and navy.",
    dek: "A classic, deep green from Benjamin Moore's Historical Colors. Here are its codes, palettes built around it, and the colors that go with it.",
    category: "Trends",
    published: "2026-10-24",
    updated: "2026-10-24",
    readMinutes: 5,
    cover: ["#F3EEE3", "#B89B72", "#64806C", "#2E3B33", "#8C5A3C"],
    keywords: ["benjamin moore webster green", "webster green hc-130", "webster green hex code", "webster green color palette", "colors that go with webster green", "benjamin moore color of the year 2027"],
    toc: [
      { id: "codes", title: "Webster Green color codes" },
      { id: "look", title: "What Webster Green looks like" },
      { id: "palettes", title: "Webster Green color palettes" },
      { id: "pairings", title: "Colors that go with Webster Green" },
      { id: "where", title: "Where to use Webster Green" },
      { id: "screens", title: "Webster Green on screens" },
      { id: "faq", title: "FAQ" },
    ],
    faq: [
      { question: "What color is Benjamin Moore Webster Green?", answer: "A deep, slightly gray green between emerald and evergreen, from Benjamin Moore's Historical Colors collection." },
      { question: "What is the hex code for Webster Green HC-130?", answer: "Paint-matching databases list it at about #64806C (RGB 100, 128, 108). Benjamin Moore doesn't publish an official HEX, so treat it as a close screen match and test a sample." },
      { question: "Is Webster Green a dark color?", answer: "It is a mid-to-dark green with an LRV of about 20, so it absorbs most of the light that hits it. It works best on cabinets, one wall, a study or a door, or in rooms with good daylight." },
      { question: "What colors go with Webster Green?", answer: "Cream, warm white, brass, dusty pink, navy and terracotta. Walnut and brass hardware are classic partners." },
    ],
    sources: [
      { title: "Benjamin Moore press release: Webster Green HC-130", url: "https://www.benjaminmoore.com/en-ca/press/benjamin-moore-announces-colour-of-the-year-2027" },
      { title: "HEX reference: Webster Green HC-130 (Match My Paint Color)", url: "https://www.matchmypaintcolor.com/benjamin-moore/webster-green-hc-130" },
    ],
    related: [
      { title: "Every 2027 Color of the Year", href: "/blog/color-of-the-year-2027" },
      { title: "Sherwin-Williams Celery", href: "/blog/sherwin-williams-celery" },
      { title: "Behr Grounded", href: "/blog/behr-grounded" },
      { title: "Valspar Cottage Door", href: "/blog/valspar-cottage-door" },
      { title: "Color wheel", href: "/color-wheel" },
      { title: "Color palette generator", href: "/generator" },
    ],
  },
  {
    slug: "behr-grounded",
    title: "Behr Grounded T27-01: Hex Code, Palettes & Pairings",
    h1: "Behr Grounded (T27-01): hex code, palettes and colors that go with it",
    crumb: "Behr Grounded",
    description:
      "Behr Grounded (T27-01), the 2027 Color of the Year: hex #615E50, RGB, HSL and CMYK, four palettes, six colors that go with it, and how to use it on screens.",
    answer:
      "Grounded (T27-01) is Behr's 2027 Color of the Year: an earthy olive between olive and moss, with brown undertones. Behr lists its HEX as #615E50 (RGB 97, 94, 80) and its LRV as 11, which makes it the darkest of the 2027 picks. It pairs well with bone white, camel, rust and sage.",
    dek: "The darkest 2027 Color of the Year: an earthy olive with brown underneath. Here are its codes, palettes built around it, and the colors that go with it.",
    category: "Trends",
    published: "2026-10-24",
    updated: "2026-10-24",
    readMinutes: 5,
    cover: ["#E6DFD1", "#A89C80", "#615E50", "#9C5B3B", "#2F2D27"],
    keywords: ["behr grounded", "grounded t27-01", "behr grounded hex code", "behr grounded color palette", "colors that go with behr grounded", "behr color of the year 2027"],
    toc: [
      { id: "codes", title: "Grounded color codes" },
      { id: "look", title: "What Grounded looks like" },
      { id: "palettes", title: "Grounded color palettes" },
      { id: "pairings", title: "Colors that go with Grounded" },
      { id: "where", title: "Where to use Grounded" },
      { id: "screens", title: "Grounded on screens" },
      { id: "faq", title: "FAQ" },
    ],
    faq: [
      { question: "What color is Behr Grounded?", answer: "An earthy olive between olive and moss, with brown undertones. Behr announced it as its 2027 Color of the Year on August 26, 2026." },
      { question: "What is the hex code for Behr Grounded T27-01?", answer: "Behr lists #615E50 (RGB 97, 94, 80). A HEX code is a screen approximation, so test a real sample on your wall." },
      { question: "Is Behr Grounded too dark for a small room?", answer: "It can work in a small room if you lean into the mood: with an LRV of 11 it absorbs most light, so pair it with a light ceiling and trim and good lamps. To keep a small room bright, use it on doors, trim or lower cabinets instead." },
      { question: "What colors go with Grounded?", answer: "Bone white, cream, camel, rust, sage and dusty blue. Natural wood, stone and brick suit it too." },
    ],
    sources: [
      { title: "Behr: 2027 Color of the Year announcement (Grounded)", url: "https://www.behr.com/colorfullybehr/behr-announces-2027-color-of-the-year-grounded/" },
      { title: "Behr Canada: Grounded T27-01 color page", url: "https://www.behr.ca/consumer/colors/2027-color-of-the-year" },
    ],
    related: [
      { title: "Every 2027 Color of the Year", href: "/blog/color-of-the-year-2027" },
      { title: "Sherwin-Williams Celery", href: "/blog/sherwin-williams-celery" },
      { title: "Benjamin Moore Webster Green", href: "/blog/benjamin-moore-webster-green" },
      { title: "Valspar Cottage Door", href: "/blog/valspar-cottage-door" },
      { title: "Color wheel", href: "/color-wheel" },
      { title: "Color palette generator", href: "/generator" },
    ],
  },
  {
    slug: "valspar-cottage-door",
    title: "Valspar Cottage Door 8004-38E: Hex Code & Palettes",
    h1: "Valspar Cottage Door (8004-38E): hex code, palettes and colors that go with it",
    crumb: "Valspar Cottage Door",
    description:
      "Valspar Cottage Door (8004-38E), the 2027 Color of the Year: hex about #7A8F97, RGB, HSL and CMYK, four palettes, six colors that go with it, and how to use it on screens.",
    answer:
      "Cottage Door (8004-38E) is Valspar's 2027 Color of the Year: a muted, mid-tone blue that leans gray, with both warm and cool undertones. A close screen match is about #7A8F97 (RGB 122, 143, 151), with an LRV of about 26. It pairs well with warm white, peach, terracotta and navy.",
    dek: "A soft gray-blue, and the first 2027 Color of the Year announced. Here are its codes, palettes built around it, and the colors that go with it.",
    category: "Trends",
    published: "2026-10-24",
    updated: "2026-10-24",
    readMinutes: 5,
    cover: ["#F4F1EA", "#B9A88F", "#7A8F97", "#C08A5B", "#3E4A50"],
    keywords: ["valspar cottage door", "cottage door 8004-38e", "valspar cottage door hex code", "cottage door color palette", "colors that go with cottage door", "valspar color of the year 2027"],
    toc: [
      { id: "codes", title: "Cottage Door color codes" },
      { id: "look", title: "What Cottage Door looks like" },
      { id: "palettes", title: "Cottage Door color palettes" },
      { id: "pairings", title: "Colors that go with Cottage Door" },
      { id: "where", title: "Where to use Cottage Door" },
      { id: "screens", title: "Cottage Door on screens" },
      { id: "faq", title: "FAQ" },
    ],
    faq: [
      { question: "What color is Valspar Cottage Door?", answer: "A muted, mid-tone blue that leans gray, with both warm and cool undertones." },
      { question: "What is the hex code for Valspar Cottage Door 8004-38E?", answer: "A close screen match is about #7A8F97 (RGB 122, 143, 151). It comes from paint-matching databases rather than Valspar, so test a real sample." },
      { question: "Is Cottage Door blue or gray?", answer: "It is a gray-blue. Under warm bulbs it looks more gray; in cool daylight a hint of teal shows." },
      { question: "What colors go with Cottage Door?", answer: "Warm white, peach, terracotta, ochre, navy and charcoal. Valspar itself suggests Moon Shot (8005-2B) and Apricot Blush (8003-8A)." },
    ],
    sources: [
      { title: "Valspar: Color of the Year 2027 (Cottage Door)", url: "https://www.valspar.com/en/colors/color-of-the-year-2027" },
      { title: "HEX reference: Valspar Cottage Door (Composite Paint)", url: "https://compositepaint.com/colors/valspar-cottage-door/" },
    ],
    related: [
      { title: "Every 2027 Color of the Year", href: "/blog/color-of-the-year-2027" },
      { title: "Sherwin-Williams Celery", href: "/blog/sherwin-williams-celery" },
      { title: "Benjamin Moore Webster Green", href: "/blog/benjamin-moore-webster-green" },
      { title: "Behr Grounded", href: "/blog/behr-grounded" },
      { title: "Color wheel", href: "/color-wheel" },
      { title: "Color palette generator", href: "/generator" },
    ],
  },
  ...(hasPantoneGuide(PANTONE_2027) ? [pantoneGuidePost(PANTONE_2027)] : []),
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export const blogPath = (slug: string) => `/blog/${slug}`;

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}
