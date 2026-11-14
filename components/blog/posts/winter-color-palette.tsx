import Link from "next/link";

import { Callout, PairingCard, PairingGrid, Palette, PaletteGrid, type Pairing } from "@/components/blog/blog-blocks";

// Every contrast figure in the text is computed from these hex values (WCAG 2, rounded down).
const WHITE = "#FFFFFF";

const CORE: Pairing[] = [
  { name: "True red", hex: "#C8102E", why: "A clear red with a hint of blue, not orange. The classic Winter red: lipstick, a coat, a party dress.", bestFor: "statement pieces, lips, accents" },
  { name: "Royal blue", hex: "#4169E1", why: "The CSS named color royalblue. Bright, cool and easy to wear near the face, and one of the most-cited Winter blues.", bestFor: "shirts, knitwear, dresses" },
  { name: "Sapphire", hex: "#0F52BA", why: "Deeper than royal blue, like the gemstone. Winters can wear it as a near-neutral instead of navy.", bestFor: "suits, coats, evening wear" },
  { name: "Emerald", hex: "#009B77", why: "A cool, blue-leaning green. Jewel tones like this are the heart of the Winter palette.", bestFor: "dresses, scarves, accessories" },
  { name: "Hot pink", hex: "#FF69B4", why: "The CSS named color hotpink. Bright, cool pinks suit Bright Winters especially well, where a dusty pink would look flat.", bestFor: "tops, lips, accessories" },
  { name: "Burgundy", hex: "#800020", why: "A deep wine red. It gives Deep Winters a rich, dark color that isn't black.", bestFor: "knitwear, boots, nails" },
  { name: "Icy blue", hex: "#D6ECF5", why: "An icy pastel: mostly white with a breath of blue. Winters wear pastels this pale rather than soft, powdery ones.", bestFor: "shirts, blouses, light layers" },
  { name: "Charcoal", hex: "#36454F", why: "A cool, dark gray. It does the job camel or brown does in a warm wardrobe: the neutral everything else sits on.", bestFor: "coats, trousers, suits" },
];

export function WinterColorPalettePost() {
  return (
    <>
      <p>
        &quot;Winter color palette&quot; means two different things depending on who&apos;s asking. In personal color analysis, Winter is a type of coloring, and a Winter palette is the set of clothing and makeup colors said to suit it. In design, a winter palette is just a set of colors that feel like the season: snow, evergreens, berries and long nights. This guide covers both, with HEX codes for everything.
      </p>

      <h2 id="what">What is a Winter in color analysis?</h2>
      <p>
        Seasonal color analysis sorts people&apos;s natural coloring into four groups named after the seasons. The idea goes back to books such as Bernice Kentner&apos;s <em>Color Me a Season</em> (1978) and Carole Jackson&apos;s <em>Color Me Beautiful</em> (1980), and it had a big revival on TikTok in the 2020s. Jackson herself called the season names a poetic label: she could as well have called them Type A, Type B and so on.
      </p>
      <p>A Winter is usually described as:</p>
      <ul>
        <li><strong>Cool:</strong> skin with a pink, blue or neutral-cool undertone rather than a golden one.</li>
        <li><strong>High contrast:</strong> a clear difference between hair, skin and eyes, such as dark hair with light skin, or very dark skin with bright eye whites.</li>
        <li><strong>Clear:</strong> pure, saturated colors look better than muted, grayed or dusty ones.</li>
      </ul>
      <p>
        Winters come in every skin tone. The classic books say skin, not hair, decides your season, so dyeing your hair doesn&apos;t change it.
      </p>
      <Callout title="A fair warning">
        Color analysis is a styling system, not a science. Different schools disagree about how to sort people, and a 2007 study comparing three systems found inconsistencies in how their palettes used hue, saturation and value. A 2026 study also found that warm and cool categories matched measured colors better than the four seasons did. Use it as a starting point and trust the mirror.
      </Callout>

      <h2 id="colors">The core Winter colors</h2>
      <p>
        In most systems Winter is the only season that wears pure white and true black well, so every card shows its color next to white, with the WCAG contrast between the two. High contrast is what makes these combinations look sharp.
      </p>
      <PairingGrid>
        {CORE.map((item) => (
          <PairingCard key={item.name} base={WHITE} pairing={item} />
        ))}
      </PairingGrid>
      <p>
        Add <strong>pure white #FFFFFF</strong>, <strong>black #000000</strong>, <Link href="/colors/navy">navy</Link> and <Link href="/colors/silver">silver</Link> and you have the basics of a Winter wardrobe.
      </p>

      <h2 id="types">Deep, True and Bright Winter palettes</h2>
      <p>
        Most 12-season systems split Winter into three. Each one sits next to another season and borrows a little from it.
      </p>
      <h3 id="deep-winter">Deep Winter (Dark Winter)</h3>
      <p>
        The darkest Winter, and the closest to Autumn. Deep colors look best: black, burgundy, pine green, deep navy, plum. Very light pastels can look washed out.
      </p>
      <PaletteGrid>
        <Palette name="Deep Winter" note="Black, plum-burgundy, pine green, navy and a crisp light gray" colors={["#0B0B0B", "#5B1A33", "#01796F", "#1F2A44", "#F4F4F6"]} />
        <Palette name="Deep Winter evening" note="Burgundy and emerald with charcoal" colors={["#800020", "#009B77", "#36454F", "#1A1A1A", "#EDEDED"]} />
      </PaletteGrid>
      <h3 id="true-winter">True Winter (Cool Winter)</h3>
      <p>
        The coolest Winter and the textbook version of the season: icy, blue-based colors with no warmth at all. True red, royal blue, sapphire, emerald and amethyst on white or black.
      </p>
      <PaletteGrid>
        <Palette name="True Winter" note="White, sapphire, true red, amethyst and black" colors={["#FFFFFF", "#0F52BA", "#C8102E", "#9966CC", "#1A1A1A"]} />
        <Palette name="True Winter icy" note="Icy pastels with charcoal" colors={["#FFFFFF", "#D6ECF5", "#F6D8E6", "#C0C0C0", "#36454F"]} />
      </PaletteGrid>
      <h3 id="bright-winter">Bright Winter (Clear Winter)</h3>
      <p>
        The most vivid Winter, and the closest to Spring. The brightest colors in the whole system suit it: hot pink, electric blue, jade green, lemon. Muted colors look tired next to it.
      </p>
      <PaletteGrid>
        <Palette name="Bright Winter" note="Deep pink, bright cyan and jade on white" colors={["#FFFFFF", "#FF1493", "#00B4D8", "#00A86B", "#111111"]} />
        <Palette name="Bright Winter party" note="Hot pink, royal blue and true red" colors={["#FF69B4", "#4169E1", "#C8102E", "#FFFFFF", "#000000"]} />
      </PaletteGrid>

      <h2 id="avoid">Colors Winters usually avoid</h2>
      <p>
        The colors that work against Winter coloring are the ones that define Autumn: warm, muted and earthy. Most systems steer Winters away from these, with a cooler swap for each:
      </p>
      <ul>
        <li><strong>Camel and tan:</strong> try charcoal, navy or cool taupe for the same neutral role.</li>
        <li><strong>Mustard and golden yellow:</strong> try a clear, icy lemon instead.</li>
        <li><strong>Orange, rust and terracotta:</strong> try true red or a blue-based pink.</li>
        <li><strong>Peach and salmon:</strong> try icy pink.</li>
        <li><strong>Olive and khaki:</strong> try emerald or pine green.</li>
        <li><strong>Gold jewelry:</strong> silver, platinum and white gold are the classic Winter metals.</li>
      </ul>

      <h2 id="design">Winter color palettes for design</h2>
      <p>
        If you came here for a seasonal palette for a website, a holiday card or a room, these four capture winter without leaning on Christmas red and green. Hover to see codes, click to copy, or open one in the <Link href="/generator">generator</Link>.
      </p>
      <PaletteGrid>
        <Palette name="Fresh snowfall" note="White and frosted blues to a deep slate" colors={["#FFFFFF", "#E3EDF5", "#A9C2D6", "#5B7A94", "#1E2B38"]} />
        <Palette name="Evergreen cabin" note="Pine, brick and brass on warm white" colors={["#F4F1EA", "#2F4B3A", "#8C3B2E", "#C9A15B", "#2B2420"]} />
        <Palette name="Frosted berry" note="Winter berries on a cool pale base" colors={["#F7F3F5", "#D9C3D0", "#8E3B5A", "#3E2A4A", "#1B1B24"]} />
        <Palette name="Northern lights" note="Night sky with aurora teal" colors={["#0B132B", "#1C2541", "#3A506B", "#5BC0BE", "#B8F2E6"]} />
      </PaletteGrid>
      <p>
        For text, the dark ends of these palettes do the work: slate #1E2B38 on frosted blue #E3EDF5 measures 12.1:1, white on pine #2F4B3A 9.5:1, and aurora mint #B8F2E6 on night blue #0B132B 14.7:1. White on the mid blue #5B7A94 only just reaches 4.5:1, so keep body text off it.
      </p>

      <h2 id="text">Readable text on Winter colors</h2>
      <p>
        Because Winter colors are clear and strong, most of them carry white text well, which makes them easy to use in branding and on screens too:
      </p>
      <ul>
        <li><strong>White on burgundy #800020:</strong> 10.8:1. <strong>White on sapphire #0F52BA:</strong> 7.1:1. <strong>White on true red #C8102E:</strong> 5.8:1.</li>
        <li><strong>White on royal blue #4169E1:</strong> 4.8:1, just past the 4.5:1 that WCAG asks for in body text.</li>
        <li><strong>Emerald #009B77</strong> only reaches 3.5:1 with white, so use it for large headings or darken it.</li>
        <li><strong>Hot pink #FF69B4</strong> needs black text: 7.9:1, against only 2.6:1 for white.</li>
        <li><strong>Charcoal #36454F on icy blue #D6ECF5:</strong> 8.0:1, a calm pair for a winter-themed page.</li>
      </ul>
      <p>
        Check your own pairs in the <Link href="/tools/contrast">contrast checker</Link>, or browse more cool shades in <Link href="/shades-of-blue">shades of blue</Link> and <Link href="/shades-of-pink">shades of pink</Link>. Celebrating Hanukkah this December? See our <Link href="/blog/hanukkah-colors">Hanukkah colors</Link> guide.
      </p>
    </>
  );
}
