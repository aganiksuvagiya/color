import Link from "next/link";

import { Callout, PairingCard, PairingGrid, Palette, PaletteGrid, type Pairing } from "@/components/blog/blog-blocks";

// A cream tablecloth / paper tone. Every contrast figure in the text is computed against
// the hex values on this page (WCAG 2 formula, rounded down).
const CREAM = "#F5EBDC";

const CORE: Pairing[] = [
  { name: "Pumpkin", hex: "#E07B39", why: "The color most people picture first. It reads warm and friendly, and it carries a table on its own: a few real pumpkins or orange napkins are enough.", bestFor: "centerpieces, napkins, accents" },
  { name: "Cranberry", hex: "#9B1B30", why: "The deep red of cranberry sauce. Dark enough to use for text, so it's the easiest way to make a menu or invitation look festive and still readable.", bestFor: "invitations, table runners, headings" },
  { name: "Harvest gold", hex: "#DA9100", why: "Dried corn, candlelight and brass. A little gold makes the other harvest colors look richer; too much and the table turns yellow.", bestFor: "candles, flatware, highlights" },
  { name: "Chestnut brown", hex: "#6F4E37", why: "Roasted, wooden and warm. Brown is the glue of a Thanksgiving palette: it ties orange, red and gold together without competing with them.", bestFor: "body text, chargers, wood tones" },
  { name: "Burnt orange", hex: "#CC5500", why: "Pumpkin's darker, stronger sibling. It looks great on cream, but white text on it falls just short of the 4.5:1 that small text needs.", bestFor: "banners, ribbons, accent walls" },
  { name: "Sage", hex: "#9CAF88", why: "The herb in the stuffing, and the color that makes a Thanksgiving table look current instead of retro. It cools down all that orange.", bestFor: "greenery, modern tables, place cards" },
  { name: "Wheat", hex: "#F5DEB3", why: "Dried wheat bundles and bread crust. It's nearly as light as cream, so it works as a background rather than an accent.", bestFor: "backgrounds, menus, linen" },
  { name: "Fig", hex: "#5E2B4A", why: "A deep purple-plum from figs and red onions. Less expected than cranberry, and lovely for a moody evening table or a Friendsgiving invite.", bestFor: "dinner parties, Friendsgiving, candles" },
];

export function ThanksgivingPalettePost() {
  return (
    <>
      <p>
        Thanksgiving falls on <strong>Thursday, November 26, 2026</strong>, the fourth Thursday of November. Its colors are the colors of the harvest: pumpkins and squash, cranberries, dried corn and wheat, fallen leaves and the herbs in the stuffing. Put a few of them together and almost anyone will read the table, card or post as Thanksgiving before they read a word.
      </p>
      <p>
        Below are the eight core Thanksgiving colors with their HEX codes, eight ready-made palettes, and the contrast numbers you need if you&apos;re putting text on any of them, whether that&apos;s a menu card, a Canva invitation or a website banner.
      </p>

      <h2 id="colors">The core Thanksgiving colors</h2>
      <p>
        Each card shows the color next to a cream base (#F5EBDC), the shade of a linen tablecloth or a sheet of card stock. The ratio is the WCAG contrast between the two: above 4.5:1 you can set small text in that color on cream; below 3:1 the pair is soft and tonal, which is fine for decoration but not for words.
      </p>
      <PairingGrid>
        {CORE.map((item) => (
          <PairingCard key={item.name} base={CREAM} pairing={item} />
        ))}
      </PairingGrid>

      <h2 id="palettes">8 Thanksgiving color palettes with hex codes</h2>
      <p>
        Each palette has five colors: a light base, a dark for text and two or three harvest accents in between. Hover a color to see its code, click to copy it, or open the palette in the <Link href="/generator">generator</Link> to swap a shade.
      </p>
      <PaletteGrid>
        <Palette name="Classic harvest" note="Cranberry, pumpkin, gold and brown on cream" colors={["#9B1B30", "#E07B39", "#DA9100", "#6F4E37", "#F5EBDC"]} />
        <Palette name="Sage and pumpkin" note="A modern table: soft green with one orange accent" colors={["#F4EFE6", "#9CAF88", "#5F6F52", "#E07B39", "#3D2B1F"]} />
        <Palette name="Rustic farmhouse" note="Oat, moss and dark wood" colors={["#F5EBDC", "#C8A97E", "#8A9A5B", "#7B3F00", "#2F2A24"]} />
        <Palette name="Moody dinner party" note="Fig, rust and mustard on near-black" colors={["#2E1A1F", "#5E2B4A", "#A4453C", "#D9A441", "#E9DCC9"]} />
        <Palette name="Pumpkin spice" note="Five steps from cream to cinnamon" colors={["#F3E5D0", "#E8A87C", "#C96F3B", "#8C4A2F", "#4A2C21"]} />
        <Palette name="Terracotta table" note="Clay and sage, the warm-and-cool pairing" colors={["#F4EFE6", "#C66B3D", "#8A4B2A", "#A9B49A", "#6E7D5B"]} />
        <Palette name="Golden hour" note="Bright and cheerful, good for invitations" colors={["#FFF4E0", "#F2C14E", "#E57A44", "#A63A2B", "#3D2B1F"]} />
        <Palette name="Cranberry and evergreen" note="Bridges Thanksgiving into the Christmas season" colors={["#F6F1E9", "#9B1B30", "#2F4B3A", "#C9A15B", "#1E1E1E"]} />
      </PaletteGrid>
      <p>
        A note on the last one: cranberry, deep green and gold are close to Christmas colors, so this palette is handy if you want one set of napkins, cards or social templates to carry you from late November into December. For the Christmas side, see our <Link href="/color-palettes/christmas">Christmas color palettes</Link>.
      </p>

      <h2 id="table">Thanksgiving colors on the table</h2>
      <p>
        Interior designers often split a room 60-30-10: about 60% in a main color, 30% in a second color and 10% in an accent. It works just as well on a table. With the Classic harvest palette, that could be a cream tablecloth (60%), brown chargers and wooden boards (30%), and pumpkin napkins with a few gold candles (10%). The food adds the rest of the color for you.
      </p>
      <ul>
        <li><strong>Pick one star.</strong> Pumpkin, cranberry or sage. If all three are loud, the table looks busy; if one leads and the others support it, it looks planned.</li>
        <li><strong>Keep the base light.</strong> Cream, wheat or white linen makes the food and the accents stand out. A dark tablecloth looks dramatic, but it swallows brown dishes.</li>
        <li><strong>Mix in something green.</strong> A runner of sage, eucalyptus or olive branches keeps all that orange from feeling flat. Green sits opposite red on the painter&apos;s <Link href="/color-wheel">color wheel</Link>, so a little of it also makes cranberry look deeper.</li>
      </ul>

      <h2 id="print">Invitations, menus and place cards</h2>
      <p>
        Text is where harvest colors get tricky, because many of them are mid-tones. These pairs pass WCAG AA (4.5:1) for normal-size text:
      </p>
      <ul>
        <li><strong>Cranberry #9B1B30 on cream #F5EBDC:</strong> 6.8:1. The best festive text color.</li>
        <li><strong>Chestnut #6F4E37 on cream:</strong> 6.3:1. Calm and readable for longer text like a menu.</li>
        <li><strong>Cream on fig #5E2B4A:</strong> 9.2:1, and <strong>mustard #D9A441 on near-black #2E1A1F:</strong> 7.2:1, for a dark invitation.</li>
        <li><strong>Dark brown #2B1D14 on pumpkin #E07B39:</strong> 5.4:1.</li>
      </ul>
      <p>
        And these fall short: <strong>white on pumpkin</strong> is only 2.9:1, <strong>white on sage</strong> 2.3:1, and <strong>white on burnt orange</strong> 4.3:1. Use dark text on those three, or keep white for large headings only. If you love burnt orange buttons, darkening it slightly to #B84C00 takes white text to 5.1:1 and it still looks like burnt orange.
      </p>
      <Callout title="Using these in Canva">
        Canva, Google Slides and most design apps accept HEX codes. Click a color swatch, choose the option for a new or custom color, and paste the code, for example #9B1B30. Save the five codes of your palette as a brand kit or color set so every card, menu and story uses exactly the same shades.
      </Callout>

      <h2 id="digital">Websites, emails and social posts</h2>
      <p>
        For a Thanksgiving sale banner, an email header or a holiday landing page, the same rule applies: one strong harvest color, a light background and a dark text color. A safe web combination is cream #F5EBDC for the background, chestnut #6F4E37 for body text and cranberry #9B1B30 for buttons with white labels (8.0:1). Pumpkin works well for illustrations and badges, but put dark text on it, not white.
      </p>
      <p>
        You can check any pair in the <Link href="/tools/contrast">contrast checker</Link>, or paste a palette into the <Link href="/generator">generator</Link> and press Preview to see it as a small website with each pair measured.
      </p>

      <h2 id="friendsgiving">Friendsgiving and modern palettes</h2>
      <p>
        Friendsgiving tables tend to be more relaxed and less traditional, so the palette can be too. Three directions that work:
      </p>
      <ul>
        <li><strong>Moody:</strong> fig, rust and mustard on a dark base (the Moody dinner party palette). Lots of candles.</li>
        <li><strong>Fresh:</strong> sage and cream with a single pumpkin accent (Sage and pumpkin). It looks good in daylight photos.</li>
        <li><strong>Earthy minimal:</strong> terracotta, clay and olive (Terracotta table), with plain stoneware and no patterns.</li>
      </ul>
      <p>
        Some of 2027&apos;s paint colors fit right in, too. Behr&apos;s Grounded is a deep olive and Dutch Boy&apos;s Deep Rooted is a muted terracotta; see every pick in our <Link href="/blog/color-of-the-year-2027">Color of the Year 2027</Link> roundup.
      </p>

      <h2 id="avoid">Colors to be careful with</h2>
      <ul>
        <li><strong>Pure black.</strong> It can look harsh next to warm harvest tones. A very dark brown such as #2B1D14 or #3D2B1F does the same job and looks softer.</li>
        <li><strong>Too many browns.</strong> Brown dishes on a brown table on a brown floor look muddy. Separate them with cream, wheat or white.</li>
        <li><strong>Neon or cool brights.</strong> Electric blue, hot pink and lime fight with the warm palette. If you want a cool color, choose a dusty one: sage, slate or muted teal.</li>
        <li><strong>Halloween orange and black.</strong> Bright orange with black still says Halloween. Swap the black for brown and the orange for pumpkin or burnt orange.</li>
      </ul>
      <p>
        Want a palette of your own? Start from one HEX code, such as pumpkin #E07B39, in the <Link href="/color-wheel">color wheel</Link> to find the colors around it, or press the space bar in the <Link href="/generator">generator</Link> with that color locked.
      </p>
    </>
  );
}
