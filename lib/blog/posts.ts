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
    updated: "2026-10-23",
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
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export const blogPath = (slug: string) => `/blog/${slug}`;

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}
