import Link from "next/link";

import { Callout, ColorFeature, ColorOfYearTable, Palette, PaletteGrid } from "@/components/blog/blog-blocks";
import { formatDate } from "@/lib/blog/posts";
import {
  COTY_AS_OF,
  PANTONE_2027,
  PANTONE_GUIDE_SLUG,
  PANTONE_HISTORY,
  allCoty2027Picks,
  hasPantoneGuide,
  type CotyFamily,
  type CotyPick,
} from "@/lib/blog/color-of-the-year-2027";
import { parseHex, rgbToHsl } from "@/lib/color-convert";
import { contrastRatio } from "@/lib/pastel-colors";

const INK = "#1C1712";
const WHITE = "#FFFFFF";
/** HSL saturation at or below this counts as "toned down" in the patterns section. */
const MUTED_SATURATION = 14;

const ratio = (a: string, b: string) => contrastRatio(parseHex(a)!, parseHex(b)!);
// Normal rounding, except it never rounds up across a WCAG threshold (4.47:1 prints 4.4, not 4.5).
const fmt = (r: number) => {
  let shown = Math.round(r * 10) / 10;
  for (const t of [3, 4.5, 7]) if (r < t && shown >= t) shown = t - 0.1;
  return `${shown.toFixed(1)}:1`;
};

const list = (items: string[]) =>
  items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;

export function ColorOfTheYear2027Post() {
  const pantone = PANTONE_2027;
  const picks = allCoty2027Picks(pantone);
  const asOf = formatDate(COTY_AS_OF);
  const inFamily = (f: CotyFamily) => picks.filter((p) => p.family === f);
  const names = (rows: CotyPick[]) => list(rows.map((p) => `${p.name} (${p.brand})`));
  const officialHex = picks.filter((p) => p.hexSource === "official").map((p) => p.brand);
  const coded = picks.filter((p): p is CotyPick & { hex: string } => Boolean(p.hex)).map((p) => ({ ...p, s: rgbToHsl(parseHex(p.hex)!).s }));
  const muted = coded.filter((p) => p.s <= MUTED_SATURATION).length;
  const boldest = coded.reduce((a, b) => (b.s > a.s ? b : a));
  const greens = inFamily("green");
  const blues = inFamily("blue");
  const pinks = inFamily("pink");
  const earthy = [...inFamily("brown"), ...inFamily("terracotta")];

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
        As of {asOf}, {picks.length} brands and forecasters have named a 2027 color. Tap any HEX code to copy it. A note on accuracy: {list(officialHex)} publish their own screen values, and the other HEX codes come from paint-matching databases, so treat those as close matches rather than official specs.
      </p>
      <ColorOfYearTable rows={picks} />

      <h2 id="patterns">What the 2027 colors have in common</h2>
      <p>
        We sorted the {picks.length} picks into color families. No single color wins, but four things jump out.
      </p>
      <ul>
        <li>
          <strong>Blue and green lead, with {blues.length + greens.length} of the {picks.length} picks.</strong> The blues are {names(blues)}. The greens are {names(greens)}, and they range from almost-neutral (Celery) to deep and dramatic (Webster Green). Notice how close Cottage Door (#7A8F97) and Artifact (#69808B) are: two brands landed on nearly the same smoky blue within six weeks of each other.
        </li>
        <li>
          <strong>Pink and mauve are the surprise.</strong> That&apos;s {pinks.length} picks: {names(pinks)}. None of them is a bright pink. They&apos;re dusty, rosy, smoky or pale, the kind of pink that behaves like a neutral on a wall.
        </li>
        <li>
          <strong>Brown and wood are back.</strong> {names(earthy)} are all earthy: browns, a taupe, a pale wood stain and a terracotta. That&apos;s {earthy.length} of the {picks.length} picks.
        </li>
        <li>
          <strong>Everything is toned down.</strong> Of the {coded.length} picks with a HEX value, {muted} have a saturation of {MUTED_SATURATION}% or less in HSL, and the most saturated is {boldest.name} at {boldest.s}%. These are colors with a lot of gray or brown mixed in. They read as calm and lived-in rather than bright. The one bold exception is James Hardie&apos;s Midnight Black, and it&apos;s meant for the outside of a house.
        </li>
      </ul>
      <p>
        Our read: 2027 is about color that behaves like a neutral but still has a personality. After a run of greige and warm white (Pantone&apos;s 2026 pick was an off-white), the 2027 lists nudge people toward muted blues, greens and dusty pinks without asking them to be brave.
      </p>

      <h2 id="each-color">Each color, and how to use it</h2>

      <h3 id="celery">Sherwin-Williams: Celery (SW 6421)</h3>
      <ColorFeature hex="#E0DDBD" name="Celery" code="SW 6421 · also HGTV Home by Sherwin-Williams" facts="Announced September 15, 2026. Sherwin-Williams lists HEX #E0DDBD, RGB 224, 221, 189 and an LRV of about 71." />
      <p>
        Celery is one of the lightest picks of the year and the easiest to live with. It sits between khaki, butter yellow and sage, so in a north-facing room it reads soft and creamy, and in strong daylight the green comes forward. Sherwin-Williams frames it around wellness and balance, which follows naturally from its 2026 pick, the beige Universal Khaki.
      </p>
      <p>
        Use it where you&apos;d normally use an off-white: whole rooms, kitchens, bedrooms. It looks good next to oak, terracotta and deep olive. On screens it works as a background, but always with dark text (more on that below).
      </p>
      <p>
        <Link prefetch={false} href="/blog/sherwin-williams-celery">Celery: full guide with codes, palettes and colors that go with it →</Link>
      </p>

      <h3 id="webster-green">Benjamin Moore: Webster Green (HC-130)</h3>
      <ColorFeature hex="#64806C" name="Webster Green" code="HC-130 · Historical Colors collection" facts="Announced October 14, 2026. Paint databases list it at about #64806C (RGB 100, 128, 108), LRV about 20." />
      <p>
        Benjamin Moore went for a classic. The company said it looked at past, present and future color trends and kept finding that greens had real staying power. Webster Green is that idea in paint: a deep, slightly gray green that wouldn&apos;t look out of place in an old library or a brand-new kitchen.
      </p>
      <p>
        It&apos;s a commitment color. Try it on cabinets, a study, a front door or one wall behind a bed, and pair it with brass, walnut, cream and a dusty pink if you want contrast.
      </p>
      <p>
        <Link prefetch={false} href="/blog/benjamin-moore-webster-green">Webster Green: full guide with codes, palettes and colors that go with it →</Link>
      </p>

      <h3 id="grounded">Behr: Grounded (T27-01)</h3>
      <ColorFeature hex="#615E50" name="Grounded" code="T27-01" facts="Announced August 26, 2026, the tenth year of Behr's Color of the Year program. Behr lists HEX #615E50 (RGB 97, 94, 80), LRV 11." />
      <p>
        Grounded is an earthy olive that drifts between olive and moss, with brown underneath. With an LRV of 11 it&apos;s the darkest paint pick with a published LRV, so it absorbs a lot of light. That makes it cozy in a den or bedroom and dramatic on exteriors and trim. Behr&apos;s wider 2027 trend palette includes shades such as Coastal Beige and Mozart, which gives you a sense of how they expect it to be used: next to warm, quiet neutrals.
      </p>
      <p>
        <Link prefetch={false} href="/blog/behr-grounded">Grounded: full guide with codes, palettes and colors that go with it →</Link>
      </p>

      <h3 id="cottage-door">Valspar: Cottage Door (8004-38E)</h3>
      <ColorFeature hex="#7A8F97" name="Cottage Door" code="8004-38E" facts="Announced August 5, 2026, the first 2027 pick of the season. Screen match about #7A8F97 (RGB 122, 143, 151), LRV about 26." />
      <p>
        Valspar opened the season with a muted blue that leans gray. It changes a lot with the light: warm bulbs push it toward gray, cool daylight brings out a hint of teal. Valspar suggests pairing it with Moon Shot (8005-2B) and Apricot Blush (8003-8A), and that soft blue-plus-peach combination is a good one to steal for a bedroom or a nursery.
      </p>
      <p>
        <Link prefetch={false} href="/blog/valspar-cottage-door">Cottage Door: full guide with codes, palettes and colors that go with it →</Link>
      </p>

      <h3 id="artifact">Glidden: Artifact (PPG10-16)</h3>
      <ColorFeature hex="#69808B" name="Artifact" code="PPG10-16 · also Pittsburgh Paints" facts="Announced September 14, 2026. Screen match about #69808B (RGB 105, 128, 139), LRV about 20." />
      <p>
        Artifact is a warm, smoky blue that Glidden positions as a &quot;reset&quot; color: a way to refresh a room without redesigning it. Compared with Cottage Door it&apos;s a little deeper and a little warmer. Glidden also describes the pick as a shift away from cool grays as the default neutral, and that&apos;s exactly where it shines: anywhere you were about to paint a gray.
      </p>

      <h3 id="deep-rooted">Dutch Boy: Deep Rooted (311-7DB)</h3>
      <ColorFeature hex="#A6613C" name="Deep Rooted" code="311-7DB · sold through Menards" facts="Announced in late August 2026. Screen match about #A6613C (RGB 166, 97, 60), LRV about 17." />
      <p>
        The only orange on the list. Deep Rooted is a muted terracotta, and it&apos;s a big swing from Dutch Boy&apos;s 2026 pick. Dutch Boy built three palettes around it, including Essence (with Antique White and Western Orange) and Bliss (with Champagne Fizzle and Ribbon Blue). It works on an accent wall, a front door or exterior trim, and it looks great next to the blues on this list, because orange and blue sit opposite each other on the <Link prefetch={false} href="/color-wheel">color wheel</Link>.
      </p>

      <h3 id="pinks">Dulux Canada and Rust-Oleum: two pinks</h3>
      <ColorFeature hex="#E9D2CC" name="Birthday Cake" code="Dulux Canada · DLX1059-2" facts="Dulux Canada's 2027 Color of the Year. Its color page lists RGB 233, 210, 204, which is #E9D2CC." />
      <ColorFeature name="Mauve Classic" code="Rust-Oleum · RO1130 wall paint" facts="Announced October 29, 2026. A smoky mauve with a gray cast, sold in Rust-Oleum's wall paint line." />
      <p>
        Birthday Cake is a very light pink, close to a warm white with a blush. Mauve Classic goes the other way: grayer and smokier. Rust-Oleum lists trend partners around it, from creamy neutrals like At the Altar (RO5150) to Soothing Sage (RO1720) and Japanese Maple (RO1065). Both pinks look good next to the softer greens on this list, like Celery or Soulful Sage.
      </p>

      <h3 id="new-blues">Clark+Kensington and California Paints: two more blues</h3>
      <ColorFeature name="Vantage Point" code="Clark+Kensington · Ace Hardware's paint brand" facts="A bright, clear blue, sold at Ace Hardware." />
      <ColorFeature name="Quiet Peace" code="California Paints" facts="A deep, moody blue that the brand pitches as calm but still expressive." />
      <p>
        These two sit at opposite ends of the 2027 blues: Vantage Point is bright and clear, Quiet Peace is deep and moody, and Cottage Door and Artifact sit in the smoky middle. Neither brand publishes a screen value we could verify, so there&apos;s no HEX here.
      </p>

      <h3 id="others">Dulux, Graham &amp; Brown and WGSN</h3>
      <ColorFeature name="Soulful Sage" code="Dulux (AkzoNobel)" facts="Announced September 8, 2026. A soft, silvery sage green. Dulux is mainly sold in the UK, Ireland and Europe." />
      <ColorFeature name="Rose Earth" code="Graham & Brown" facts="A dusty, earthy pink inspired by natural clay pigments from Italy, chosen alongside the brand's 2027 wallpaper design." />
      <ColorFeature name="Luminous Blue" code="WGSN × Coloro · Coloro 125-28-38" facts="Revealed in April 2025 as the forecasters' Colour of the Year 2027, alongside Energy Orange, Pop Pink, Meadowland Green and Clay." />
      <p>
        We haven&apos;t listed HEX codes for these three because we couldn&apos;t find values we trust. Dulux and Graham &amp; Brown are mostly UK-facing, and WGSN&apos;s color is specified in Coloro&apos;s own system rather than as a screen color.
      </p>

      <h3 id="browns">Dunn-Edwards, C2, Little Greene, Minwax and PPG</h3>
      <ColorFeature name="French Press Coffee" code="Dunn-Edwards" facts="A deep brown with purple undertones that Dunn-Edwards calls an elevated neutral, the anchor of its Color Trends 2027 collection." />
      <ColorFeature name="Pueblo" code="C2 Paint" facts="A rosy plum chosen for how it changes with the light, leading a trend C2 calls Rural Renaissance." />
      <ColorFeature name="Marle" code="Little Greene" facts="A soft, clay-inspired mid-tone brown: yellow ochre softened with black, plus a touch of red oxide." />
      <ColorFeature name="Pickled Oak" code="Minwax · MW260" facts="Announced October 6, 2026. A light wood stain with warm undertones that leaves the grain visible, in line with the trend toward white oak and pale pine." />
      <ColorFeature name="Country Soil" code="PPG · industrial coatings" facts="Announced in late September 2026. PPG says it's also known as Roasted Chestnut: a medium-depth neutral between beige, taupe and soft brown." />
      <p>
        Five warm, earthy picks, and a clear sign that warm neutrals are taking over from gray. Country Soil is a little different from the rest: PPG&apos;s industrial coatings team picks it as a forecast for manufacturers of things like consumer electronics, office furniture, kitchenware and cabinetry. None of these brands publishes a screen value we could verify, so we&apos;ve left the HEX codes out rather than guess.
      </p>

      <h3 id="midnight-black">James Hardie: Midnight Black</h3>
      <ColorFeature name="Midnight Black" code="James Hardie · ColorPlus siding finish" facts="Announced November 12, 2026, for Hardie fiber cement siding in the Statement Collection." />
      <p>
        The only exterior-only pick. James Hardie makes fiber cement siding, and its point is that black has moved from trim and window frames to the whole house. The brand suggests pairing it with crisp whites, warm neutrals, natural stone and rich wood tones, and suggests TimberTech decking in English Walnut as a partner. There&apos;s no official HEX for it, and siding finishes look very different in sun and shade, so order a physical sample before you decide.
      </p>

      <h2 id="pantone">{pantone ? `Pantone's 2027 color: ${pantone.name}` : "What about Pantone's 2027 color?"}</h2>
      {pantone ? (
        <>
          <ColorFeature hex={pantone.hex} name={pantone.name} code={pantone.code} facts={`Pantone's Color of the Year 2027, announced ${pantone.announced}.`} />
          <p>
            Pantone named {pantone.name} ({pantone.code}) its 2027 Color of the Year on {pantone.announced}. {pantone.look} It&apos;s the pick most people mean when they search for &quot;the&quot; Color of the Year, and it follows 2026&apos;s Cloud Dancer (PANTONE 11-4201), a warm off-white with the screen value #F0EEE9.
          </p>
          {pantone.hex ? (
            <p>
              On screens: dark text ({INK}) on {pantone.hex} gives {fmt(ratio(pantone.hex, INK))}, and white text gives {fmt(ratio(pantone.hex, WHITE))}. The bar for normal body text is 4.5:1.
              {hasPantoneGuide(pantone) ? (
                <>
                  {" "}
                  <Link prefetch={false} href={`/blog/${PANTONE_GUIDE_SLUG}`}>{pantone.name}: full guide with codes, palettes and colors that go with it →</Link>
                </>
              ) : null}
            </p>
          ) : null}
        </>
      ) : (
        <p>
          As of {asOf}, Pantone hasn&apos;t named its 2027 Color of the Year. It usually announces in early December, and its Color of the Year page lists a 2027 event in Miami on December 3, 2026, during Art Basel and Miami Art Week, with more in Shanghai, Seoul and Mumbai later in the month. It&apos;s the pick most people mean when they search for &quot;the&quot; Color of the Year. For reference, the 2026 Pantone Color of the Year was <strong>Cloud Dancer (PANTONE 11-4201)</strong>, a warm off-white with the screen value #F0EEE9. We&apos;ll add the 2027 pick here as soon as it&apos;s out.
        </p>
      )}

      <h3 id="pantone-history">Every Pantone Color of the Year since 2000</h3>
      <p>
        Pantone has named a color every year since 2000, and twice it named two. Its free pages don&apos;t show screen values for the past picks, so this list sticks to the official names and codes.
      </p>
      <div className="my-6 overflow-x-auto rounded-2xl ring-1 ring-black/[0.07]">
        <table className="w-full text-left text-[14px]">
          <thead>
            <tr className="border-b border-black/[0.07] bg-[#fafafa] text-[12px] uppercase tracking-[0.1em] text-[#1c1712]/60">
              <th scope="col" className="px-4 py-2.5 font-semibold">Year</th>
              <th scope="col" className="px-4 py-2.5 font-semibold">Color</th>
              <th scope="col" className="px-4 py-2.5 font-semibold">Pantone code</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/[0.05]">
            {pantone ? (
              <tr>
                <th scope="row" className="px-4 py-2 font-semibold">2027</th>
                <td className="px-4 py-2">{pantone.name}</td>
                <td className="px-4 py-2 font-mono text-[13px] text-[#1c1712]/75">{pantone.code.replace(/^PANTONE\s+/i, "")}</td>
              </tr>
            ) : null}
            {PANTONE_HISTORY.map((entry) => (
              <tr key={entry.year}>
                <th scope="row" className="px-4 py-2 font-semibold">{entry.year}</th>
                <td className="px-4 py-2">{entry.colors.map((c) => c.name).join(" and ")}</td>
                <td className="px-4 py-2 font-mono text-[13px] text-[#1c1712]/75">{entry.colors.map((c) => c.code).join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 id="screens">Using the 2027 colors on screens</h2>
      <p>
        Most of these colors are mid-tones, which is lovely on a wall and tricky on a website. Mid-tones sit in the zone where neither white nor black text is guaranteed to be readable. We ran each HEX value through the WCAG contrast formula (the bar for normal body text is 4.5:1):
      </p>
      <ul>
        <li><strong>Celery #E0DDBD and Birthday Cake #E9D2CC:</strong> use dark text. A near-black like #1C1712 gives 12.9:1 on Celery and 12.3:1 on Birthday Cake. White text fails on both at 1.4:1.</li>
        <li><strong>Grounded #615E50:</strong> white text passes at 6.5:1, so it works for buttons and dark sections.</li>
        <li><strong>Deep Rooted #A6613C:</strong> white text passes at 4.8:1. Good for buttons and badges.</li>
        <li><strong>Cottage Door #7A8F97:</strong> dark text passes at 5.3:1. White text only reaches 3.4:1, so keep white for large headings.</li>
        <li><strong>Webster Green #64806C and Artifact #69808B:</strong> both land just under 4.5:1 with either white or dark text (4.1 to 4.3:1). Use them for backgrounds behind large type, illustrations and accents, not for small body text.</li>
      </ul>
      <Callout title="Quick tip">
        If you need a 2027 green or blue for buttons, darken it a few points of HSL lightness. You keep the mood of the color and get past 4.5:1 with white text (Webster Green needs about 2 points, Artifact about 3, Cottage Door about 9). You can check any pair in our <Link prefetch={false} href="/tools/contrast" className="font-semibold text-[#c2410c] underline underline-offset-2">contrast checker</Link>.
      </Callout>
      <p>Here are four palettes we built around the 2027 picks. Hover a color to see its code, click to copy, or open a palette in the generator to adjust it.</p>
      <PaletteGrid>
        <Palette name="Herbal calm" note="Celery with Webster Green and Grounded" colors={["#F6F4EA", "#E0DDBD", "#64806C", "#615E50", "#2B2A24"]} />
        <Palette name="Soft blue room" note="Cottage Door and Artifact with warm sand" colors={["#F4F1EA", "#C9B8A3", "#7A8F97", "#69808B", "#2E3B42"]} />
        <Palette name="Warm earth" note="Deep Rooted against the 2027 blues" colors={["#F3E9DC", "#A6613C", "#615E50", "#7A8F97", "#2B2420"]} />
        <Palette name="2027 at a glance" note="One color from each family" colors={["#E0DDBD", "#64806C", "#7A8F97", "#A6613C", "#615E50"]} />
      </PaletteGrid>
      <p>
        Want to go further with one of them? Paste its HEX into the <Link prefetch={false} href="/color-wheel">color wheel</Link> to find its complementary and analogous colors, or start from it in the <Link prefetch={false} href="/generator">palette generator</Link>.
      </p>
    </>
  );
}
