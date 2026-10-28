// Blog posts: metadata, FAQs and sources. The body of each post is a component in
// components/blog/posts/<slug>.tsx; everything that also feeds metadata, structured data,
// the blog index, the sitemap and /llms.txt lives here so it stays in one place.

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

export const blogPosts: BlogPost[] = [
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
    updated: "2026-10-29",
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
      { question: "Does HueFlow simulate color blindness?", answer: "Yes, for protanopia, deuteranopia and tritanopia. It's a simple matrix approximation, useful for spotting colors that look alike, not a clinical model." },
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
  {
    slug: "color-of-the-year-2027",
    title: "Color of the Year 2027: Every Pick So Far, With Hex Codes",
    h1: "Color of the Year 2027: every pick so far, side by side",
    crumb: "Color of the Year 2027",
    description:
      "Every 2027 Color of the Year announced so far, side by side: Sherwin-Williams Celery, Benjamin Moore Webster Green, Behr Grounded, Valspar Cottage Door, Glidden Artifact and more, with HEX codes and pairing ideas.",
    answer:
      "There is no single Color of the Year for 2027, because every paint brand and forecaster picks its own. So far Sherwin-Williams chose Celery (SW 6421), Benjamin Moore chose Webster Green (HC-130), Behr chose Grounded (T27-01), Valspar chose Cottage Door (8004-38E), Glidden chose Artifact (PPG10-16) and Dutch Boy chose Deep Rooted (311-7DB). Pantone usually names its pick in early December.",
    dek: "Paint brands and trend forecasters have started naming their 2027 colors. Here is every pick announced so far, what they have in common, and the codes you need to use them on a screen.",
    category: "Trends",
    published: "2026-10-23",
    updated: "2026-10-24",
    readMinutes: 9,
    cover: ["#E0DDBD", "#64806C", "#615E50", "#7A8F97", "#A6613C"],
    keywords: [
      "color of the year 2027",
      "2027 color of the year",
      "sherwin williams color of the year 2027",
      "benjamin moore color of the year 2027",
      "behr color of the year 2027",
      "valspar color of the year 2027",
      "pantone color of the year 2027",
      "2027 color trends",
      "celery sw 6421 hex",
      "webster green hc-130",
    ],
    toc: [
      { id: "all-picks", title: "All the 2027 picks at a glance" },
      { id: "patterns", title: "What the 2027 colors have in common" },
      { id: "each-color", title: "Each color, and how to use it" },
      { id: "pantone", title: "What about Pantone's 2027 color?" },
      { id: "screens", title: "Using the 2027 colors on screens" },
      { id: "faq", title: "FAQ" },
    ],
    faq: [
      {
        question: "What is the Color of the Year 2027?",
        answer:
          "There isn't just one. Each brand names its own. The main US paint picks are Celery (Sherwin-Williams), Webster Green (Benjamin Moore), Grounded (Behr), Cottage Door (Valspar), Artifact (Glidden) and Deep Rooted (Dutch Boy). WGSN and Coloro picked Luminous Blue, Dulux picked Soulful Sage and Graham & Brown picked Rose Earth.",
      },
      {
        question: "Has Pantone announced its 2027 Color of the Year?",
        answer:
          "Not as of October 23, 2026. Pantone usually reveals its Color of the Year in early December. Its 2026 pick was Cloud Dancer (PANTONE 11-4201), a soft off-white with the screen value #F0EEE9.",
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
    sources: [
      { title: "Sherwin-Williams: Color of the Year 2027 (Celery)", url: "https://www.sherwin-williams.com/en-us/color/color-of-the-year/2027" },
      { title: "Sherwin-Williams: SW 6421 Celery color page", url: "https://www.sherwin-williams.com/sherwinwilliams/SW6421-celery" },
      { title: "Benjamin Moore press release: Webster Green HC-130", url: "https://www.benjaminmoore.com/en-ca/press/benjamin-moore-announces-colour-of-the-year-2027" },
      { title: "Behr: 2027 Color of the Year announcement (Grounded)", url: "https://www.behr.com/colorfullybehr/behr-announces-2027-color-of-the-year-grounded/" },
      { title: "Behr Canada: Grounded T27-01 color page", url: "https://www.behr.ca/consumer/colors/2027-color-of-the-year" },
      { title: "Valspar: Color of the Year 2027 (Cottage Door)", url: "https://www.valspar.com/en/colors/color-of-the-year-2027" },
      { title: "Apartment Therapy: Glidden's 2027 Color of the Year (Artifact)", url: "https://www.apartmenttherapy.com/glidden-color-of-the-year-2027-37690420" },
      { title: "HGTV: Dutch Boy's 2027 Color of the Year (Deep Rooted)", url: "https://www.hgtv.com/decorating/color/dutch-boy-paints-color-of-the-year" },
      { title: "Dezeen: Sage green is the Dulux Colour of the Year 2027", url: "https://dezeen.com/2026/09/08/sage-green-colour-year-2027-dulux" },
      { title: "Graham & Brown: Design and Colour of the Year 2027", url: "https://www.grahambrown.com/uk/inspiration/introducing-design-and-colour-of-the-year-2027/" },
      { title: "WGSN: Colour of the Year 2027, Luminous Blue", url: "https://www.wgsn.com/en/wgsn/press/press-releases/wgsn-and-coloro-reveal-colour-year-2027-luminous-blue-and-s-s-27-key" },
      { title: "HEX reference: Webster Green HC-130 (Match My Paint Color)", url: "https://www.matchmypaintcolor.com/benjamin-moore/webster-green-hc-130" },
      { title: "HEX reference: Deep Rooted 311-7DB (Match My Paint Color)", url: "https://www.matchmypaintcolor.com/dutch-boy/deep-rooted-311-7db" },
      { title: "HEX reference: Artifact PPG10-16 (Match My Paint Color)", url: "https://www.matchmypaintcolor.com/ppg/artifact-ppg10-16" },
      { title: "HEX reference: Valspar Cottage Door (Composite Paint)", url: "https://compositepaint.com/colors/valspar-cottage-door/" },
    ],
    related: [
      { title: "Color wheel", href: "/color-wheel" },
      { title: "Color palette generator", href: "/generator" },
      { title: "Trending color palettes", href: "/trends" },
      { title: "Contrast checker", href: "/tools/contrast" },
      { title: "Shades of green", href: "/shades-of-green" },
      { title: "Shades of blue", href: "/shades-of-blue" },
    ],
  },
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
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export const blogPath = (slug: string) => `/blog/${slug}`;

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}
