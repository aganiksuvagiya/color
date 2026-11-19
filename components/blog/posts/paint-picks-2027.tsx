import Link from "next/link";

import { Callout, ColorFeature, PairingCard, PairingGrid, Palette, PaletteGrid, type Pairing } from "@/components/blog/blog-blocks";
import { formatCmyk, formatHex, formatHsl, formatRgb, hslToRgb, parseHex, rgbToHsl } from "@/lib/color-convert";
import { contrastRatio } from "@/lib/pastel-colors";

// One page per 2027 paint Color of the Year pick (Sherwin-Williams, Benjamin Moore, Behr,
// Valspar), built from the same template. The brand facts (codes, LRV, dates, the brand's own
// suggested pairings) are the ones checked for the main 2027 post; palettes and pairings are
// HueFlow suggestions, and every color value and contrast ratio is computed from the HEX.

type PaintPick = {
  name: string;
  brand: string;
  code: string;
  hex: string;
  /** Where the HEX comes from, shown next to it. */
  hexSource: string;
  lrv: string;
  featureFacts: string;
  look: string[];
  where: string[];
  palettes: { name: string; note: string; colors: string[] }[];
  pairings: Pairing[];
};

const INK = "#1C1712";
const WHITE = "#FFFFFF";

const PICKS: Record<string, PaintPick> = {
  celery: {
    name: "Celery",
    brand: "Sherwin-Williams",
    code: "SW 6421",
    hex: "#E0DDBD",
    hexSource: "Official screen value published by Sherwin-Williams",
    lrv: "about 71",
    featureFacts: "Sherwin-Williams' 2027 Color of the Year, announced September 15, 2026 together with HGTV Home by Sherwin-Williams. LRV about 71.",
    look: [
      "Celery is a soft, muted green with yellow undertones, and it is the lightest of the 2027 picks. It sits somewhere between khaki, butter yellow and sage. In a north-facing room it reads creamy and almost neutral; in strong daylight the green comes forward.",
      "Sherwin-Williams frames it around wellness and balance. It follows the brand's 2026 pick, the beige Universal Khaki, so it feels like a step from warm neutrals toward green rather than a jump.",
    ],
    where: [
      "Whole rooms where you would normally use an off-white: living rooms, bedrooms and hallways.",
      "Kitchen walls and cabinets next to oak, butcher block or terracotta tile.",
      "North-facing rooms that need warmth without turning yellow.",
      "On screens, as a calm page or section background with dark text.",
    ],
    palettes: [
      { name: "Celery kitchen", note: "Warm white, olive and espresso around Celery", colors: ["#F5F1E6", "#E0DDBD", "#B8B08A", "#7A7F5A", "#3E3A2F"] },
      { name: "Garden cottage", note: "Sage, terracotta blush and deep green", colors: ["#F7F4EC", "#E0DDBD", "#9CAF88", "#D9A88C", "#4B5A43"] },
      { name: "Calm studio", note: "For a website: Celery background, olive text, one warm accent", colors: ["#FBFAF5", "#E0DDBD", "#6F7D5C", "#2F3A2E", "#C8763D"] },
      { name: "Butter and linen", note: "Soft, tonal and almost neutral", colors: ["#F2E3B3", "#E0DDBD", "#E8E2D6", "#A6A08A", "#5C5A4E"] },
    ],
    pairings: [
      { name: "Warm white", hex: "#F7F4EC", why: "A barely-there contrast that keeps Celery the star.", bestFor: "Trim, ceilings, a soft tonal room" },
      { name: "Sage", hex: "#9CAF88", why: "A deeper green from the same family that adds depth without changing the mood.", bestFor: "Cabinets, accent walls, textiles" },
      { name: "Terracotta", hex: "#C46E4E", why: "Its warm opposite on the color wheel. It makes Celery look fresher and greener.", bestFor: "Tile, pots, cushions, a front door" },
      { name: "Navy", hex: "#1F2A44", why: "Deep and cool, it gives the soft green a crisp, tailored frame.", bestFor: "Kitchen islands, furniture, text on screens" },
      { name: "Charcoal", hex: "#36393B", why: "A soft black for contrast when navy feels too blue.", bestFor: "Hardware, window frames, headings" },
      { name: "Blush", hex: "#E8C4B8", why: "A gentle warm partner that keeps the room soft.", bestFor: "Bedrooms, nurseries, soft furnishings" },
    ],
  },
  "webster-green": {
    name: "Webster Green",
    brand: "Benjamin Moore",
    code: "HC-130",
    hex: "#64806C",
    hexSource: "Screen match from paint-matching databases (Benjamin Moore doesn't publish an official HEX)",
    lrv: "about 20",
    featureFacts: "Benjamin Moore's 2027 Color of the Year, announced October 14, 2026. From the Historical Colors collection. LRV about 20.",
    look: [
      "Webster Green is a deep, slightly gray green somewhere between emerald and evergreen. It comes from Benjamin Moore's Historical Colors collection and looks the part: the kind of green you would expect in an old library, but just as comfortable in a new kitchen.",
      "Benjamin Moore said it looked at past, present and future color trends and kept finding that greens had real staying power. With an LRV of about 20 it absorbs most of the light that hits it, so it reads rich and moody rather than bright.",
    ],
    where: [
      "Kitchen cabinets and islands, especially with brass or unlacquered hardware.",
      "A study, a library wall or the wall behind a bed.",
      "Front doors and shutters against white or cream siding.",
      "On screens, as a brand or section color behind large type.",
    ],
    palettes: [
      { name: "Library green", note: "Cream, tan and leather brown", colors: ["#F3EEE3", "#B89B72", "#64806C", "#2E3B33", "#8C5A3C"] },
      { name: "Modern kitchen", note: "Green cabinets with warm white walls and brass", colors: ["#FAFAF7", "#D8D4CB", "#64806C", "#C9A86A", "#1F2422"] },
      { name: "Garden room", note: "Soft green, sand and a coral clay accent", colors: ["#E9DCC6", "#A9BFA8", "#64806C", "#D7836A", "#3D4A40"] },
      { name: "Heritage brand", note: "For a website, with a rust accent", colors: ["#F6F3EC", "#DCE5DD", "#64806C", "#C2643B", "#2B3530"] },
    ],
    pairings: [
      { name: "Cream", hex: "#F3EEE3", why: "The classic partner. It keeps the green rich and the room bright.", bestFor: "Walls next to green cabinets, trim" },
      { name: "Brass tan", hex: "#B89B72", why: "Warm metallic tones bring out the yellow in the green.", bestFor: "Hardware, lighting, frames" },
      { name: "Dusty pink", hex: "#E8C4C0", why: "The soft opposite of green. It makes Webster Green look deeper and warmer.", bestFor: "Bedrooms, textiles, artwork" },
      { name: "Navy", hex: "#1F2A44", why: "Two deep, quiet colors for a moody, layered room.", bestFor: "Studies, dining rooms, furniture" },
      { name: "Terracotta", hex: "#C46E4E", why: "Earthy warmth that keeps the green from feeling cold.", bestFor: "Tile, planters, accents" },
      { name: "Warm white", hex: "#FAFAF7", why: "Clean contrast for trim and ceilings.", bestFor: "Trim, ceilings, kitchens" },
    ],
  },
  grounded: {
    name: "Grounded",
    brand: "Behr",
    code: "T27-01",
    hex: "#615E50",
    hexSource: "Official screen value published by Behr",
    lrv: "11",
    featureFacts: "Behr's 2027 Color of the Year, announced August 26, 2026, the tenth year of Behr's Color of the Year program. LRV 11.",
    look: [
      "Grounded is an earthy olive that drifts between olive and moss, with brown underneath. Depending on the light it can read greenish, brownish or almost charcoal.",
      "With an LRV of 11 it is the darkest of the 2027 picks, so it absorbs a lot of light. That makes it cozy in a den or bedroom and dramatic on exteriors and trim. Behr's wider 2027 trend palette puts it next to warm, quiet neutrals such as Coastal Beige and Mozart.",
    ],
    where: [
      "A den, home office or bedroom you want to feel enclosed and cozy.",
      "Exteriors and trim, especially with stone, wood or brick.",
      "Built-ins, lower cabinets and doors, with lighter walls above.",
      "On screens, as a dark section or button color with white text.",
    ],
    palettes: [
      { name: "Moody den", note: "Bone, taupe and a rust accent", colors: ["#E6DFD1", "#A89C80", "#615E50", "#9C5B3B", "#2F2D27"] },
      { name: "Earthy exterior", note: "Off-white trim, lighter olive and wood", colors: ["#EDE8DC", "#C9B79C", "#8A8572", "#615E50", "#4A3B2E"] },
      { name: "Warm neutral study", note: "Beige and taupe around Grounded", colors: ["#F4EFE6", "#D8CCB6", "#8E7F69", "#615E50", "#3A3833"] },
      { name: "Olive brand", note: "For a website, with a copper accent", colors: ["#F7F5EF", "#D9D4C5", "#615E50", "#B5653F", "#2A2924"] },
    ],
    pairings: [
      { name: "Bone white", hex: "#EDE8DC", why: "Strong, soft contrast that keeps a dark room from feeling heavy.", bestFor: "Trim, ceilings, upper walls" },
      { name: "Camel", hex: "#C19A6B", why: "A warm mid-tone that brings out the brown in Grounded.", bestFor: "Leather, wood, textiles" },
      { name: "Rust", hex: "#9C5B3B", why: "Earthy and warm; together they feel like autumn.", bestFor: "Cushions, rugs, a front door" },
      { name: "Sage", hex: "#9CAF88", why: "A lighter green that lifts the olive.", bestFor: "Adjacent rooms, plants, linens" },
      { name: "Cream", hex: "#F5EFE0", why: "The easiest wall color next to Grounded trim or cabinets.", bestFor: "Walls, kitchens, exteriors" },
      { name: "Dusty blue", hex: "#8FA3AD", why: "A cool contrast for a more modern, less rustic look.", bestFor: "Bedrooms, bathrooms, accents" },
    ],
  },
  "cottage-door": {
    name: "Cottage Door",
    brand: "Valspar",
    code: "8004-38E",
    hex: "#7A8F97",
    hexSource: "Screen match from paint-matching databases, close rather than official",
    lrv: "about 26",
    featureFacts: "Valspar's 2027 Color of the Year, announced August 5, 2026, the first 2027 pick of the season. LRV about 26.",
    look: [
      "Cottage Door is a muted, mid-tone blue that leans gray, with both warm and cool undertones. It changes a lot with the light: warm bulbs push it toward gray, and cool daylight brings out a hint of teal.",
      "Valspar suggests pairing it with Moon Shot (8005-2B) and Apricot Blush (8003-8A). That soft blue-plus-peach combination is a good one for bedrooms and nurseries.",
    ],
    where: [
      "Front doors and shutters, as the name suggests, against white or stone.",
      "Bedrooms and nurseries, with peach or blush.",
      "Kitchen cabinets, as a softer alternative to navy.",
      "On screens, as a background with dark text, or behind large white headings.",
    ],
    palettes: [
      { name: "Cottage front door", note: "White trim, stone and warm wood", colors: ["#F4F1EA", "#B9A88F", "#7A8F97", "#C08A5B", "#3E4A50"] },
      { name: "Coastal calm", note: "Mist, sand and a deep slate", colors: ["#F6F4EF", "#DCE4E6", "#7A8F97", "#C9B9A0", "#2F3B42"] },
      { name: "Blue and terracotta", note: "Cottage Door with its warm opposite", colors: ["#EFE6DA", "#D9B38C", "#7A8F97", "#C46E4E", "#4A5A62"] },
      { name: "Quiet website", note: "For a website, with a copper accent", colors: ["#F7F8F8", "#E8EEF0", "#7A8F97", "#B8653F", "#1F2A30"] },
    ],
    pairings: [
      { name: "Warm white", hex: "#F4F1EA", why: "Clean, soft contrast for trim, doors and ceilings.", bestFor: "Trim, ceilings, exteriors" },
      { name: "Peach", hex: "#F2C4A8", why: "In the spirit of Valspar's own blue-and-peach pairing.", bestFor: "Bedrooms, nurseries, textiles" },
      { name: "Terracotta", hex: "#C46E4E", why: "The warm opposite of blue; each makes the other look richer.", bestFor: "Tile, pots, accents" },
      { name: "Ochre", hex: "#C9973B", why: "Golden warmth for a more vintage look.", bestFor: "Cushions, art, accents" },
      { name: "Navy", hex: "#1F2A44", why: "A deeper blue for a tonal, layered room.", bestFor: "Furniture, islands, text" },
      { name: "Charcoal", hex: "#36393B", why: "A soft black that sharpens the gray side of Cottage Door.", bestFor: "Hardware, frames, headings" },
    ],
  },
};

const ratio = (a: string, b: string) => contrastRatio(parseHex(a)!, parseHex(b)!);
// Normal rounding, except it never rounds up across a WCAG threshold (4.47:1 prints 4.4, not 4.5).
const fmt = (r: number) => {
  let shown = Math.round(r * 10) / 10;
  for (const t of [3, 4.5, 7]) if (r < t && shown >= t) shown = t - 0.1;
  return `${shown.toFixed(1)}:1`;
};
const verdict = (r: number) => (r >= 7 ? "passes AAA" : r >= 4.5 ? "passes AA" : r >= 3 ? "large text only" : "fails");

/** The lightest darker shade of `hex` (same hue and saturation) that carries white body text. */
function darkenForWhiteText(hex: string) {
  const hsl = rgbToHsl(parseHex(hex)!);
  for (let l = hsl.l; l >= 0; l--) {
    const candidate = formatHex(hslToRgb({ ...hsl, l }));
    if (ratio(candidate, WHITE) >= 4.5) return { hex: candidate, steps: hsl.l - l };
  }
  return undefined;
}

function PaintPickPost({ pick }: { pick: PaintPick }) {
  const rgb = parseHex(pick.hex)!;
  const onInk = ratio(pick.hex, INK);
  const onWhite = ratio(pick.hex, WHITE);
  const darker = onInk < 4.5 && onWhite < 4.5 ? darkenForWhiteText(pick.hex) : undefined;
  const codes: [string, string][] = [
    [`${pick.brand} code`, pick.code],
    ["HEX", pick.hex],
    ["RGB", formatRgb(rgb)],
    ["HSL", formatHsl(rgb)],
    ["CMYK", formatCmyk(rgb)],
    ["LRV", pick.lrv],
  ];

  return (
    <>
      <h2 id="codes">{pick.name} color codes</h2>
      <ColorFeature hex={pick.hex} name={`${pick.brand} ${pick.name}`} code={pick.code} facts={pick.featureFacts} />
      <div className="my-6 overflow-x-auto rounded-2xl ring-1 ring-black/[0.07]">
        <table className="w-full text-left text-[14px]">
          <tbody>
            {codes.map(([label, value]) => (
              <tr key={label} className="border-b border-black/[0.05] last:border-0">
                <th scope="row" className="w-40 bg-[#fafafa] px-5 py-2.5 font-semibold">{label}</th>
                <td className="px-5 py-2.5 font-mono text-[13px] text-[#1c1712]/75">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        HEX source: {pick.hexSource}. A HEX code is a screen approximation of a physical paint, and sheen, lighting and screens all change how it looks, so test a real sample before you buy. RGB, HSL and CMYK are converted from the HEX.
      </p>

      <h2 id="look">What {pick.name} looks like</h2>
      {pick.look.map((paragraph) => (
        <p key={paragraph.slice(0, 32)}>{paragraph}</p>
      ))}

      <h2 id="palettes">{pick.name} color palettes</h2>
      <p>Four palettes we built around {pick.name}. Hover a color to see its code, click to copy, or open a palette in the generator to adjust it.</p>
      <PaletteGrid>
        {pick.palettes.map((palette) => (
          <Palette key={palette.name} name={palette.name} note={palette.note} colors={palette.colors} />
        ))}
      </PaletteGrid>

      <h2 id="pairings">Colors that go with {pick.name}</h2>
      <p>Six colors that work next to {pick.name}, with the contrast between each pair so you know which ones can carry text.</p>
      <PairingGrid>
        {pick.pairings.map((pairing) => (
          <PairingCard key={pairing.hex} base={pick.hex} pairing={pairing} />
        ))}
      </PairingGrid>

      <h2 id="where">Where to use {pick.name}</h2>
      <ul>
        {pick.where.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2 id="screens">{pick.name} on screens</h2>
      <p>
        We ran {pick.hex} through the WCAG contrast formula. The bar for normal body text is 4.5:1.
      </p>
      <ul>
        <li><strong>Dark text ({INK}) on {pick.name}:</strong> {fmt(onInk)}, {verdict(onInk)}.</li>
        <li><strong>White text on {pick.name}:</strong> {fmt(onWhite)}, {verdict(onWhite)}.</li>
      </ul>
      {darker ? (
        <Callout title="For buttons and body text">
          Neither dark nor white text reaches 4.5:1 on {pick.name}. Darken it by {darker.steps} points of HSL lightness to <strong>{darker.hex}</strong> and white text passes. You keep the mood of the color, and the original still works for backgrounds behind large type. Check any pair in the <Link href="/tools/contrast" className="font-semibold text-[#c2410c] underline underline-offset-2">contrast checker</Link>.
        </Callout>
      ) : (
        <p>
          Use {onInk >= onWhite ? "dark" : "white"} text on {pick.name}. You can check any other pair in the <Link href="/tools/contrast">contrast checker</Link>, or start a palette from {pick.hex} in the <Link href="/generator">palette generator</Link>.
        </p>
      )}
      <p>
        Want the rest of the 2027 picks side by side? See <Link href="/blog/color-of-the-year-2027">every 2027 Color of the Year with hex codes</Link>.
      </p>
    </>
  );
}

export const CeleryPost = () => <PaintPickPost pick={PICKS.celery} />;
export const WebsterGreenPost = () => <PaintPickPost pick={PICKS["webster-green"]} />;
export const GroundedPost = () => <PaintPickPost pick={PICKS.grounded} />;
export const CottageDoorPost = () => <PaintPickPost pick={PICKS["cottage-door"]} />;
