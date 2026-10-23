import Link from "next/link";

import { Callout, ColorFeature, ColorOfYearTable, Palette, PaletteGrid, type ColorOfYearRow } from "@/components/blog/blog-blocks";

const ROWS: ColorOfYearRow[] = [
  { brand: "Sherwin-Williams", name: "Celery", code: "SW 6421", hex: "#E0DDBD", hexSource: "official", announced: "Sep 15, 2026", look: "Soft, muted green with yellow undertones. Light and airy (LRV about 71)." },
  { brand: "Benjamin Moore", name: "Webster Green", code: "HC-130", hex: "#64806C", hexSource: "database", announced: "Oct 14, 2026", look: "A classic, deep green somewhere between emerald and evergreen (LRV about 20)." },
  { brand: "Behr", name: "Grounded", code: "T27-01", hex: "#615E50", hexSource: "official", announced: "Aug 26, 2026", look: "Earthy olive-moss green with brown undertones (LRV 11)." },
  { brand: "Valspar", name: "Cottage Door", code: "8004-38E", hex: "#7A8F97", hexSource: "database", announced: "Aug 5, 2026", look: "Muted mid-tone blue that leans gray, with warm and cool undertones (LRV about 26)." },
  { brand: "Glidden", name: "Artifact", code: "PPG10-16", hex: "#69808B", hexSource: "database", announced: "Sep 14, 2026", look: "Warm, smoky mid-tone blue (LRV about 20)." },
  { brand: "Dutch Boy", name: "Deep Rooted", code: "311-7DB", hex: "#A6613C", hexSource: "database", announced: "Late Aug 2026", look: "Muted, earthy orange, close to a sun-warmed terracotta pot (LRV about 17)." },
  { brand: "Dulux", name: "Soulful Sage", code: "UK and Europe", announced: "Sep 8, 2026", look: "A soft, silvery sage green." },
  { brand: "Graham & Brown", name: "Rose Earth", code: "UK wallpaper and paint brand", announced: "2026", look: "Dusty, earthy pink with clay and muted brown undertones." },
  { brand: "WGSN × Coloro", name: "Luminous Blue", code: "Coloro 125-28-38", announced: "Apr 2025", look: "The trend forecasters' pick: a clear, glowing blue." },
];

export function ColorOfTheYear2027Post() {
  return (
    <>
      <p>
        Every fall the paint companies start naming their color for the coming year, and every fall the same question comes up: which one is <em>the</em> Color of the Year? The honest answer is that there isn&apos;t one. Each brand runs its own research and picks its own shade, so &quot;Color of the Year 2027&quot; is really a list.
      </p>
      <p>
        We pulled every 2027 pick announced so far into one place, checked the codes against the brands&apos; own pages where they publish them, and turned each color into something you can actually use: a HEX value for screens, a contrast check, and a palette to start from. We&apos;ll keep this page updated as the rest of the announcements land.
      </p>

      <h2 id="all-picks">All the 2027 picks at a glance</h2>
      <p>
        Nine brands and forecasters have named a 2027 color as of October 23, 2026. Tap any HEX code to copy it. A note on accuracy: Sherwin-Williams and Behr publish their own screen values, and the others come from paint-matching databases, so treat those as close matches rather than official specs.
      </p>
      <ColorOfYearTable rows={ROWS} />

      <h2 id="patterns">What the 2027 colors have in common</h2>
      <p>
        Put the picks side by side and three things jump out.
      </p>
      <ul>
        <li>
          <strong>Green is the color of 2027.</strong> Four of the nine picks are green: Sherwin-Williams&apos; Celery, Benjamin Moore&apos;s Webster Green, Behr&apos;s Grounded and Dulux&apos;s Soulful Sage. They range from almost-neutral (Celery) to deep and dramatic (Webster Green), which tells you green has moved from accent color to everyday color.
        </li>
        <li>
          <strong>Blue is a close second.</strong> Valspar&apos;s Cottage Door and Glidden&apos;s Artifact are both muted, mid-tone blues, and WGSN and Coloro chose Luminous Blue. Notice how close Cottage Door (#7A8F97) and Artifact (#69808B) are: two brands landed on nearly the same smoky blue within six weeks of each other.
        </li>
        <li>
          <strong>Everything is toned down.</strong> Of the six picks with a HEX value, four have a saturation of 14% or less in HSL, and none goes above 47% (Dutch Boy&apos;s Deep Rooted). These are colors with a lot of gray or brown mixed in. They read as calm and lived-in rather than bright.
        </li>
      </ul>
      <p>
        Our read: 2027 is about color that behaves like a neutral but still has a personality. If 2025 and 2026 were the years of greige and warm white (Pantone&apos;s 2026 pick was an off-white), 2027 nudges people toward green and blue walls without asking them to be brave.
      </p>

      <h2 id="each-color">Each color, and how to use it</h2>

      <h3 id="celery">Sherwin-Williams: Celery (SW 6421)</h3>
      <ColorFeature hex="#E0DDBD" name="Celery" code="SW 6421 · also HGTV Home by Sherwin-Williams" facts="Announced September 15, 2026. Sherwin-Williams lists HEX #E0DDBD, RGB 224, 221, 189 and an LRV of about 71." />
      <p>
        Celery is the lightest pick of the year and the easiest to live with. It sits between khaki, butter yellow and sage, so in a north-facing room it reads soft and creamy, and in strong daylight the green comes forward. Sherwin-Williams frames it around wellness and balance, which follows naturally from its 2026 pick, the beige Universal Khaki.
      </p>
      <p>
        Use it where you&apos;d normally use an off-white: whole rooms, kitchens, bedrooms. It looks good next to oak, terracotta and deep olive. On screens it works as a background, but always with dark text (more on that below).
      </p>

      <h3 id="webster-green">Benjamin Moore: Webster Green (HC-130)</h3>
      <ColorFeature hex="#64806C" name="Webster Green" code="HC-130 · Historical Colors collection" facts="Announced October 14, 2026. Paint databases list it at about #64806C (RGB 100, 128, 108), LRV about 20." />
      <p>
        Benjamin Moore went for a classic. The company said it looked at past, present and future color trends and kept finding that greens had real staying power. Webster Green is that idea in paint: a deep, slightly gray green that wouldn&apos;t look out of place in an old library or a brand-new kitchen.
      </p>
      <p>
        It&apos;s a commitment color. Try it on cabinets, a study, a front door or one wall behind a bed, and pair it with brass, walnut, cream and a dusty pink if you want contrast.
      </p>

      <h3 id="grounded">Behr: Grounded (T27-01)</h3>
      <ColorFeature hex="#615E50" name="Grounded" code="T27-01" facts="Announced August 26, 2026, the tenth year of Behr's Color of the Year program. Behr lists HEX #615E50 (RGB 97, 94, 80), LRV 11." />
      <p>
        Grounded is an earthy olive that drifts between olive and moss, with brown underneath. With an LRV of 11 it&apos;s the darkest pick on the list, so it absorbs a lot of light. That makes it cozy in a den or bedroom and dramatic on exteriors and trim. Behr&apos;s wider 2027 trend palette includes shades such as Coastal Beige and Mozart, which gives you a sense of how they expect it to be used: next to warm, quiet neutrals.
      </p>

      <h3 id="cottage-door">Valspar: Cottage Door (8004-38E)</h3>
      <ColorFeature hex="#7A8F97" name="Cottage Door" code="8004-38E" facts="Announced August 5, 2026, the first 2027 pick of the season. Screen match about #7A8F97 (RGB 122, 143, 151), LRV about 26." />
      <p>
        Valspar opened the season with a muted blue that leans gray. It changes a lot with the light: warm bulbs push it toward gray, cool daylight brings out a hint of teal. Valspar suggests pairing it with Moon Shot (8005-2B) and Apricot Blush (8003-8A), and that soft blue-plus-peach combination is a good one to steal for a bedroom or a nursery.
      </p>

      <h3 id="artifact">Glidden: Artifact (PPG10-16)</h3>
      <ColorFeature hex="#69808B" name="Artifact" code="PPG10-16 · also Pittsburgh Paints" facts="Announced September 14, 2026. Screen match about #69808B (RGB 105, 128, 139), LRV about 20." />
      <p>
        Artifact is a warm, smoky blue that Glidden positions as a &quot;reset&quot; color: a way to refresh a room without redesigning it. Compared with Cottage Door it&apos;s a little deeper and a little warmer. Glidden also describes the pick as a shift away from cool grays as the default neutral, and that&apos;s exactly where it shines: anywhere you were about to paint a gray.
      </p>

      <h3 id="deep-rooted">Dutch Boy: Deep Rooted (311-7DB)</h3>
      <ColorFeature hex="#A6613C" name="Deep Rooted" code="311-7DB · sold through Menards" facts="Announced in late August 2026. Screen match about #A6613C (RGB 166, 97, 60), LRV about 17." />
      <p>
        The one warm outlier. Deep Rooted is a muted terracotta orange, and it&apos;s a big swing from Dutch Boy&apos;s 2026 pick. Dutch Boy built three palettes around it, including Essence (with Antique White and Western Orange) and Bliss (with Champagne Fizzle and Ribbon Blue). It works on an accent wall, a front door or exterior trim, and it looks great next to the blues on this list, because orange and blue sit opposite each other on the <Link href="/color-wheel">color wheel</Link>.
      </p>

      <h3 id="others">Dulux, Graham &amp; Brown and WGSN</h3>
      <ColorFeature name="Soulful Sage" code="Dulux (AkzoNobel)" facts="Announced September 8, 2026. A soft, silvery sage green. Dulux is mainly sold in the UK, Ireland and Europe." />
      <ColorFeature name="Rose Earth" code="Graham & Brown" facts="A dusty, earthy pink inspired by natural clay pigments from Italy, chosen alongside the brand's 2027 wallpaper design." />
      <ColorFeature name="Luminous Blue" code="WGSN × Coloro · Coloro 125-28-38" facts="Revealed in April 2025 as the forecasters' Colour of the Year 2027, alongside Energy Orange, Pop Pink, Meadowland Green and Clay." />
      <p>
        We haven&apos;t listed HEX codes for these three because we couldn&apos;t find values we trust. Dulux and Graham &amp; Brown are mostly UK-facing, and WGSN&apos;s color is specified in Coloro&apos;s own system rather than as a screen color.
      </p>

      <h2 id="pantone">What about Pantone&apos;s 2027 color?</h2>
      <p>
        Pantone hasn&apos;t named its 2027 Color of the Year yet. It usually announces in early December, and it&apos;s the pick most people mean when they search for &quot;the&quot; Color of the Year. For reference, the 2026 Pantone Color of the Year was <strong>Cloud Dancer (PANTONE 11-4201)</strong>, a warm off-white with the screen value #F0EEE9. We&apos;ll add the 2027 pick here as soon as it&apos;s out.
      </p>

      <h2 id="screens">Using the 2027 colors on screens</h2>
      <p>
        Most of these colors are mid-tones, which is lovely on a wall and tricky on a website. Mid-tones sit in the zone where neither white nor black text is guaranteed to be readable. We ran each HEX value through the WCAG contrast formula (the bar for normal body text is 4.5:1):
      </p>
      <ul>
        <li><strong>Celery #E0DDBD:</strong> use dark text. A near-black like #1C1712 gives 12.9:1. White text fails at 1.4:1.</li>
        <li><strong>Grounded #615E50:</strong> white text passes at 6.5:1, so it works for buttons and dark sections.</li>
        <li><strong>Deep Rooted #A6613C:</strong> white text passes at 4.8:1. Good for buttons and badges.</li>
        <li><strong>Cottage Door #7A8F97:</strong> dark text passes at 5.3:1. White text only reaches 3.4:1, so keep white for large headings.</li>
        <li><strong>Webster Green #64806C and Artifact #69808B:</strong> both land just under 4.5:1 with either white or dark text (4.1 to 4.3:1). Use them for backgrounds behind large type, illustrations and accents, not for small body text.</li>
      </ul>
      <Callout title="Quick tip">
        If you need a 2027 green or blue for buttons, darken it by 5 to 10 points of HSL lightness. You keep the mood of the color and get past 4.5:1 with white text (Webster Green and Artifact need about 5, Cottage Door needs the full 10). You can check any pair in our <Link href="/tools/contrast" className="font-semibold text-[#c2410c] underline underline-offset-2">contrast checker</Link>.
      </Callout>
      <p>Here are three palettes we built around the 2027 picks. Hover a color to see its code, click to copy, or open a palette in the generator to adjust it.</p>
      <PaletteGrid>
        <Palette name="Herbal calm" note="Celery with Webster Green and Grounded" colors={["#F6F4EA", "#E0DDBD", "#64806C", "#615E50", "#2B2A24"]} />
        <Palette name="Soft blue room" note="Cottage Door and Artifact with warm sand" colors={["#F4F1EA", "#C9B8A3", "#7A8F97", "#69808B", "#2E3B42"]} />
        <Palette name="Warm earth" note="Deep Rooted against the 2027 blues" colors={["#F3E9DC", "#A6613C", "#615E50", "#7A8F97", "#2B2420"]} />
        <Palette name="2027 at a glance" note="One color from each family" colors={["#E0DDBD", "#64806C", "#7A8F97", "#A6613C", "#615E50"]} />
      </PaletteGrid>
      <p>
        Want to go further with one of them? Paste its HEX into the <Link href="/color-wheel">color wheel</Link> to find its complementary and analogous colors, or start from it in the <Link href="/generator">palette generator</Link>.
      </p>
    </>
  );
}
