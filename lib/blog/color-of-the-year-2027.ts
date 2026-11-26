// Data for the 2027 Color of the Year roundup (/blog/color-of-the-year-2027) and, once Pantone
// names its color, the Pantone guide (/blog/pantone-color-of-the-year-2027). Both pages and their
// metadata in lib/blog/posts.ts read from here, so the Pantone update is one edit: fill in
// PANTONE_2027 below, set COTY_AS_OF, then build and deploy. Every count, saturation figure and
// contrast ratio on the pages is computed from this data.

export type CotyFamily = "green" | "blue" | "pink" | "brown" | "terracotta" | "black";

export type CotyPick = {
  brand: string;
  name: string;
  code: string;
  hex?: string;
  /** "official": the brand publishes this screen value; "database": a paint-matching database. */
  hexSource?: "official" | "database";
  announced: string;
  look: string;
  /** Our grouping for the "what they have in common" section. */
  family: CotyFamily;
};

export type PantonePick = {
  /** e.g. "Cloud Dancer" */
  name: string;
  /** e.g. "PANTONE 11-4201" */
  code: string;
  /** Screen value Pantone publishes for it. Leave out if there's no source, and the guide page stays off. */
  hex?: string;
  /** Where the HEX comes from, shown next to it on the guide page. */
  hexSource?: string;
  /** Sentence shown under the HEX on the guide page in place of the paint-sample note. */
  hexNote?: string;
  /** e.g. "Dec 3, 2026" */
  announced: string;
  /** YYYY-MM-DD, becomes the posts' `updated` date. */
  announcedIso: string;
  /** One sentence for the roundup table and the FAQ, in our own words. */
  look: string;
  family: CotyFamily;
  source: { title: string; url: string };
  /** Guide page content, written on the day like the paint picks in components/blog/posts/paint-picks-2027.tsx: 2 look paragraphs, 4 where-to-use lines, 4 palettes of 5 colors, 6 pairings. */
  guide?: {
    lookParagraphs: string[];
    where: string[];
    palettes: { name: string; note: string; colors: string[] }[];
    pairings: { name: string; hex: string; why: string; bestFor: string }[];
    cover: string[];
  };
};

/** The day the list below was last checked against the brands' announcements. */
export const COTY_AS_OF = "2026-11-26";

/**
 * Pantone's 2027 Color of the Year. null until Pantone announces it (Pantone's Color of the Year
 * page lists a 2027 event in Miami on December 3, 2026). Copy the shape of PantonePick above.
 */
export const PANTONE_2027: PantonePick | null = null;

export const PANTONE_GUIDE_SLUG = "pantone-color-of-the-year-2027";

/** True once PANTONE_2027 has a HEX and guide content, which is when the guide page goes live. */
export const hasPantoneGuide = (p: PantonePick | null): p is PantonePick & { hex: string; guide: NonNullable<PantonePick["guide"]> } =>
  Boolean(p?.hex && p.guide);

export const COTY_2027_PICKS: CotyPick[] = [
  { brand: "Sherwin-Williams", name: "Celery", code: "SW 6421", hex: "#E0DDBD", hexSource: "official", announced: "Sep 15, 2026", look: "Soft, muted green with yellow undertones. Light and airy (LRV about 71).", family: "green" },
  { brand: "Benjamin Moore", name: "Webster Green", code: "HC-130", hex: "#64806C", hexSource: "database", announced: "Oct 14, 2026", look: "A classic, deep green somewhere between emerald and evergreen (LRV about 20).", family: "green" },
  { brand: "Behr", name: "Grounded", code: "T27-01", hex: "#615E50", hexSource: "official", announced: "Aug 26, 2026", look: "Earthy olive-moss green with brown undertones (LRV 11).", family: "green" },
  { brand: "Valspar", name: "Cottage Door", code: "8004-38E", hex: "#7A8F97", hexSource: "database", announced: "Aug 5, 2026", look: "Muted mid-tone blue that leans gray, with warm and cool undertones (LRV about 26).", family: "blue" },
  { brand: "Glidden", name: "Artifact", code: "PPG10-16", hex: "#69808B", hexSource: "database", announced: "Sep 14, 2026", look: "Warm, smoky mid-tone blue (LRV about 20).", family: "blue" },
  { brand: "Dutch Boy", name: "Deep Rooted", code: "311-7DB", hex: "#A6613C", hexSource: "database", announced: "Late Aug 2026", look: "Muted, earthy orange, close to a sun-warmed terracotta pot (LRV about 17).", family: "terracotta" },
  { brand: "Dulux Canada", name: "Birthday Cake", code: "DLX1059-2", hex: "#E9D2CC", hexSource: "official", announced: "2026", look: "A soft, pale pink. Dulux Canada calls it optimistic and lists it at RGB 233, 210, 204.", family: "pink" },
  { brand: "Dulux", name: "Soulful Sage", code: "UK and Europe", announced: "Sep 8, 2026", look: "A soft, silvery sage green.", family: "green" },
  { brand: "Graham & Brown", name: "Rose Earth", code: "UK wallpaper and paint brand", announced: "2026", look: "Dusty, earthy pink with clay and muted brown undertones.", family: "pink" },
  { brand: "WGSN × Coloro", name: "Luminous Blue", code: "Coloro 125-28-38", announced: "Apr 2025", look: "The trend forecasters' pick: a clear, glowing blue.", family: "blue" },
  { brand: "Dunn-Edwards", name: "French Press Coffee", code: "US paint brand", announced: "Fall 2026", look: "A deep brown with purple undertones, pitched as an elevated neutral.", family: "brown" },
  { brand: "C2 Paint", name: "Pueblo", code: "US paint brand", announced: "Oct 2026", look: "A rosy plum that shifts with the light from day to night.", family: "pink" },
  { brand: "Minwax", name: "Pickled Oak", code: "MW260 · wood stain", announced: "Oct 6, 2026", look: "A light, soft neutral stain with warm undertones that lets the grain show.", family: "brown" },
  { brand: "Little Greene", name: "Marle", code: "UK paint brand", announced: "Early Oct 2026", look: "A soft, clay-inspired mid-tone brown.", family: "brown" },
  { brand: "PPG", name: "Country Soil", code: "PPG industrial coatings · also called Roasted Chestnut", announced: "Late Sep 2026", look: "A medium-depth neutral between beige, taupe and soft brown.", family: "brown" },
  { brand: "Clark+Kensington", name: "Vantage Point", code: "Ace Hardware's paint brand", announced: "Fall 2026", look: "A bright, clear blue.", family: "blue" },
  { brand: "California Paints", name: "Quiet Peace", code: "US paint brand", announced: "Fall 2026", look: "A deep, moody blue meant to feel calm.", family: "blue" },
  { brand: "Rust-Oleum", name: "Mauve Classic", code: "RO1130 · wall paint", announced: "Oct 29, 2026", look: "A smoky mauve with a gray cast, Rust-Oleum's update of a familiar shade.", family: "pink" },
  { brand: "James Hardie", name: "Midnight Black", code: "ColorPlus siding finish", announced: "Nov 12, 2026", look: "A deep black for whole house exteriors, not just trim.", family: "black" },
];

/** Every 2027 pick, Pantone first once it's out. */
export function allCoty2027Picks(pantone: PantonePick | null = PANTONE_2027): CotyPick[] {
  if (!pantone) return COTY_2027_PICKS;
  const row: CotyPick = {
    brand: "Pantone",
    name: pantone.name,
    code: pantone.code,
    hex: pantone.hex,
    hexSource: pantone.hex ? "official" : undefined,
    announced: pantone.announced,
    look: pantone.look,
    family: pantone.family,
  };
  return [row, ...COTY_2027_PICKS];
}

/** Pantone's past Colors of the Year, as listed on pantone.com/color-of-the-year (2016 and 2021 had two). */
export const PANTONE_HISTORY: { year: number; colors: { name: string; code: string }[] }[] = [
  { year: 2026, colors: [{ name: "Cloud Dancer", code: "11-4201 TCX" }] },
  { year: 2025, colors: [{ name: "Mocha Mousse", code: "17-1230 TCX" }] },
  { year: 2024, colors: [{ name: "Peach Fuzz", code: "13-1023 TCX" }] },
  { year: 2023, colors: [{ name: "Viva Magenta", code: "18-1750 TCX" }] },
  { year: 2022, colors: [{ name: "Very Peri", code: "17-3938 TCX" }] },
  { year: 2021, colors: [{ name: "Ultimate Gray", code: "17-5104 TCX" }, { name: "Illuminating", code: "13-0647 TCX" }] },
  { year: 2020, colors: [{ name: "Classic Blue", code: "19-4052 TCX" }] },
  { year: 2019, colors: [{ name: "Living Coral", code: "16-1546 TCX" }] },
  { year: 2018, colors: [{ name: "Ultra Violet", code: "18-3838 TCX" }] },
  { year: 2017, colors: [{ name: "Greenery", code: "15-0343 TCX" }] },
  { year: 2016, colors: [{ name: "Rose Quartz", code: "13-1520 TCX" }, { name: "Serenity", code: "15-3919 TCX" }] },
  { year: 2015, colors: [{ name: "Marsala", code: "18-1438 TCX" }] },
  { year: 2014, colors: [{ name: "Radiant Orchid", code: "18-3224 TCX" }] },
  { year: 2013, colors: [{ name: "Emerald", code: "17-5641 TCX" }] },
  { year: 2012, colors: [{ name: "Tangerine Tango", code: "17-1463 TCX" }] },
  { year: 2011, colors: [{ name: "Honeysuckle", code: "18-2120 TCX" }] },
  { year: 2010, colors: [{ name: "Turquoise", code: "15-5519 TCX" }] },
  { year: 2009, colors: [{ name: "Mimosa", code: "14-0848 TCX" }] },
  { year: 2008, colors: [{ name: "Blue Iris", code: "18-3943 TCX" }] },
  { year: 2007, colors: [{ name: "Chili Pepper", code: "19-1557 TCX" }] },
  { year: 2006, colors: [{ name: "Sand Dollar", code: "13-1106 TCX" }] },
  { year: 2005, colors: [{ name: "Blue Turquoise", code: "15-5217 TCX" }] },
  { year: 2004, colors: [{ name: "Tigerlily", code: "17-1456 TCX" }] },
  { year: 2003, colors: [{ name: "Aqua Sky", code: "14-4811 TCX" }] },
  { year: 2002, colors: [{ name: "True Red", code: "19-1664 TCX" }] },
  { year: 2001, colors: [{ name: "Fuchsia Rose", code: "17-2031 TCX" }] },
  { year: 2000, colors: [{ name: "Cerulean", code: "15-4020 TCX" }] },
];
