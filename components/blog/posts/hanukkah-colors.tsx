import Link from "next/link";

import { Callout, PairingCard, PairingGrid, Palette, PaletteGrid, type Pairing } from "@/components/blog/blog-blocks";

// Every contrast figure in the text is computed from these hex values (WCAG 2, rounded down).
const WHITE = "#FFFFFF";

const COLORS: Pairing[] = [
  { name: "Flag blue", hex: "#0038B8", why: "The blue of Israel's flag as Wikipedia lists it (RGB 0, 56, 184, close to PANTONE 286 C). Strong enough for text and buttons, and the most recognizable Hanukkah blue.", bestFor: "cards, banners, headings" },
  { name: "Royal blue", hex: "#4169E1", why: "The CSS named color royalblue. A little lighter and friendlier than flag blue, and white text on it still passes at 4.8:1.", bestFor: "kids' crafts, social posts, buttons" },
  { name: "Navy", hex: "#1F2A44", why: "A deep, slightly gray navy. It makes gold and silver glow, which is why navy-and-gold is the classic grown-up Hanukkah look.", bestFor: "invitations, table linen, text" },
  { name: "Sky blue", hex: "#7FA7E0", why: "A soft, light blue for backgrounds and balloons. White text on it fails, so pair it with navy text instead.", bestFor: "backgrounds, kids' parties" },
  { name: "Silver", hex: "#C0C0C0", why: "The CSS named color silver. Think silver menorahs and tinsel. It looks lovely on blue, but on white it nearly disappears (1.8:1).", bestFor: "accents on blue, ribbon, foil" },
  { name: "Gold", hex: "#D4AF37", why: "Metallic gold, the color of brass menorahs and foil-wrapped chocolate gelt. Use it on navy or flag blue, never as text on white.", bestFor: "gelt, foil lettering, candles" },
  { name: "Candle flame", hex: "#F4B942", why: "A warm yellow-gold for candlelight. On a dark navy it reads as a glowing flame; on white it's too light for any text.", bestFor: "illustrations, night-sky designs" },
  { name: "Ice blue", hex: "#E8EEF8", why: "A pale blue-white that softens a design without losing the blue-and-white theme. Use it as a background behind flag blue text (7.9:1).", bestFor: "backgrounds, tablecloths, menus" },
];

export function HanukkahColorsPost() {
  return (
    <>
      <p>
        In 2026, Hanukkah begins at sundown on <strong>Friday, December 4</strong>, and lasts until sundown on <strong>Saturday, December 12</strong>. If you&apos;re making a card, a table, a classroom display or a social post for it, you&apos;ll probably reach for blue and white, often with silver or gold. Here&apos;s where those colors come from, the HEX codes to use, and palettes that work on paper and on screens.
      </p>

      <h2 id="colors">What are the Hanukkah colors?</h2>
      <p>
        The colors most associated with Hanukkah are <strong>blue and white</strong>. <strong>Silver and gold</strong> are the usual accents: silver for menorahs and decorations, gold for brass menorahs, candlelight and the gold-foil chocolate coins known as gelt.
      </p>
      <p>
        None of these are religious requirements. Jewish law doesn&apos;t assign colors to Hanukkah, and the blue-and-white look is a cultural tradition that grew over the last 150 years or so, as the next section explains.
      </p>

      <h2 id="why-blue">Why are Hanukkah colors blue and white?</h2>
      <p>Several threads come together:</p>
      <ul>
        <li><strong>The tallit.</strong> The Jewish prayer shawl is traditionally white and often woven with blue or black stripes. Its fringes recall <em>tekhelet</em>, the blue dye the Torah commands for a thread in each fringe. Blue and white were Jewish colors long before anyone decorated for Hanukkah with them.</li>
        <li><strong>A poem.</strong> In 1864 the Austrian Jewish poet Ludwig August Frankl wrote &quot;Juda&apos;s Farben&quot; (Judah&apos;s Colors), which calls white and blue the colors of Judah.</li>
        <li><strong>A flag.</strong> Flags based on the tallit, white with blue stripes and a Star of David, appeared in the 1880s and 1890s; one was displayed in Boston in 1891. The design became the flag of the Zionist movement, and Israel officially adopted it on October 28, 1948.</li>
        <li><strong>American holiday culture.</strong> After World War II, Hanukkah became a much bigger celebration in the United States, partly because it falls near Christmas. Greeting card companies such as Hallmark made Hanukkah cards, and blue and white became the standard look for cards, wrapping paper and decorations. Blue-and-white Hanukkah decorating is still mainly an American habit.</li>
      </ul>
      <p>
        So the short answer is: blue and white are long-standing Jewish colors, they became the colors of Israel&apos;s flag, and American holiday products made them the colors of Hanukkah.
      </p>

      <h2 id="codes">Hanukkah color codes</h2>
      <p>
        Each card shows the color next to white, the other half of the classic pair, with the WCAG contrast between them. Above 4.5:1 you can set small text in that color on white. Below 3:1, use the pair for decoration, not for words.
      </p>
      <PairingGrid>
        {COLORS.map((item) => (
          <PairingCard key={item.name} base={WHITE} pairing={item} />
        ))}
      </PairingGrid>
      <p>
        A note on the flag blue: the official description is simply &quot;dark sky-blue&quot;, so real flags range from almost navy to quite light blue. #0038B8 is the value Wikipedia uses, and it&apos;s a good default for screens. For print, Israeli product labels are told to use CMYK 100/70/0/28.
      </p>

      <h2 id="palettes">6 Hanukkah color palettes</h2>
      <p>
        Hover a color to see its code, click to copy it, or open a palette in the <Link prefetch={false} href="/generator">generator</Link> to change a shade.
      </p>
      <PaletteGrid>
        <Palette name="Classic blue and white" note="Flag blue with soft blues and a navy for text" colors={["#FFFFFF", "#E8EEF8", "#7FA7E0", "#0038B8", "#14213D"]} />
        <Palette name="Blue and silver" note="Cool and wintry, good for cards and foil" colors={["#F7F9FC", "#C0C0C0", "#8A9BB0", "#0038B8", "#1B263B"]} />
        <Palette name="Navy and gold" note="The elegant version, for invitations and tables" colors={["#FBF7EE", "#E6C766", "#D4AF37", "#1F2A44", "#0F1524"]} />
        <Palette name="Candlelight" note="A night sky with eight small flames" colors={["#0F1B3D", "#1F3A93", "#F4B942", "#FFE8B0", "#FFFDF7"]} />
        <Palette name="Soft modern" note="Pale blue, sand and slate, quiet and calm" colors={["#FFFFFF", "#DCE7F3", "#A7BBD6", "#C9B28A", "#3C4A5C"]} />
        <Palette name="Bright and playful" note="For kids' parties and classroom crafts" colors={["#FFFFFF", "#0038B8", "#3FA9F5", "#FFC93C", "#F2F6FC"]} />
      </PaletteGrid>

      <h2 id="text">Readable text on Hanukkah colors</h2>
      <p>
        Blue-and-white designs are easy to read: white on flag blue measures 9.3:1, and navy #14213D on white almost 16:1. The metallics are where designs go wrong. These pairs pass WCAG AA (4.5:1) for normal text:
      </p>
      <ul>
        <li><strong>White on flag blue #0038B8:</strong> 9.3:1.</li>
        <li><strong>Gold #D4AF37 on navy #1F2A44:</strong> 6.7:1, and a lighter gold #E6C766 on navy reaches 8.6:1.</li>
        <li><strong>Silver #C0C0C0 on flag blue:</strong> 5.1:1.</li>
        <li><strong>Candle yellow #F4B942 on night blue #0F1B3D:</strong> 9.5:1.</li>
        <li><strong>Navy #14213D on sky blue #7FA7E0:</strong> 6.4:1.</li>
      </ul>
      <p>
        And these fail: <strong>silver on white</strong> (1.8:1), <strong>gold on white</strong> (2.1:1), <strong>white on sky blue</strong> (2.4:1) and <strong>gold on flag blue</strong> (4.4:1, fine for a big headline but not for small text). Metallic foil on a printed card can work at lower contrast because it catches the light, but on a screen there&apos;s no shine, only a flat yellow-gray.
      </p>
      <Callout title="Rule of thumb">
        Put the metallics on the dark colors, never on white. Gold or silver on navy looks festive and stays readable; gold or silver on white looks washed out. Check any pair in the <Link prefetch={false} href="/tools/contrast" className="font-semibold text-[#c2410c] underline underline-offset-2">contrast checker</Link>.
      </Callout>

      <h2 id="ideas">Ideas for cards, tables and posts</h2>
      <ul>
        <li><strong>Cards and invitations:</strong> navy card stock with gold lettering, or white with flag-blue type and a silver foil border.</li>
        <li><strong>The table:</strong> a white or ice-blue cloth, blue napkins and the menorah as the centerpiece. Brass or gold candlesticks warm up all that blue.</li>
        <li><strong>Eight nights of posts:</strong> keep one palette for all eight so the series looks connected, and change only the number of candles.</li>
        <li><strong>Websites and emails:</strong> white background, navy text, flag-blue buttons with white labels, and gold only for small decorative details.</li>
      </ul>
      <p>
        For more blues to choose from, browse <Link prefetch={false} href="/shades-of-blue">shades of blue</Link>, or look up the codes for <Link prefetch={false} href="/colors/silver">silver</Link>, <Link prefetch={false} href="/colors/gold">gold</Link> and <Link prefetch={false} href="/colors/navy">navy</Link>. Planning for the whole season? Our <Link prefetch={false} href="/color-palettes/christmas">Christmas palettes</Link> and <Link prefetch={false} href="/blog/winter-color-palette">winter color palettes</Link> cover the rest of December.
      </p>
    </>
  );
}
