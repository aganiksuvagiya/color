import Link from "next/link";

import { Callout, PairingCard, PairingGrid, Palette, PaletteGrid, type Pairing } from "@/components/blog/blog-blocks";

const NAVY = "#1F2A44";

const GROUPS: { id: string; title: string; intro: string; items: Pairing[] }[] = [
  {
    id: "neutrals",
    title: "Neutrals that never fail",
    intro: "If you only remember one section, make it this one. These five work with navy in any setting.",
    items: [
      { name: "White", hex: "#FFFFFF", why: "The classic. Crisp white keeps navy looking sharp instead of heavy. Think navy blazer with a white shirt, or navy cabinets with white counters.", bestFor: "outfits, kitchens, websites" },
      { name: "Cream", hex: "#F5EFE0", why: "Softer and warmer than pure white, so it takes the chill off navy. Pick it if navy and white feels too nautical for you.", bestFor: "bedrooms, living rooms, wedding stationery" },
      { name: "Light gray", hex: "#D9DDE3", why: "A quiet, modern pairing. Keep the gray light: a dark charcoal sits too close to navy and the two blur together.", bestFor: "offices, suits, dashboards" },
      { name: "Camel", hex: "#C19A6B", why: "Navy's oldest friend in menswear. Camel coats, tan leather and natural wood make navy feel warmer and more expensive.", bestFor: "outfits, living rooms" },
      { name: "Cognac brown", hex: "#9A4A2B", why: "A rich red-brown leather tone. It's nearly as dark as navy, so the look is moody and luxurious rather than punchy.", bestFor: "shoes, belts, leather sofas" },
    ],
  },
  {
    id: "warm",
    title: "Warm accents that pop",
    intro: "Blue's opposite on the color wheel is orange. Anything from that warm side makes navy come alive. Use these as accents, not as equal partners.",
    items: [
      { name: "Mustard yellow", hex: "#E1AD01", why: "Mustard sits right next to orange on the wheel, which is why it glows against navy. A throw, a scarf or one armchair is plenty.", bestFor: "accents, branding, fall outfits" },
      { name: "Metallic gold", hex: "#D4AF37", why: "Gold hardware, picture frames and lettering on navy look instantly formal. It's why navy and gold wedding invitations never go out of style.", bestFor: "weddings, hardware, logos" },
      { name: "Coral", hex: "#FF7F50", why: "A brighter, more playful version of the same complementary idea. Coral turns navy into a summer color.", bestFor: "summer outfits, kids' rooms, buttons" },
      { name: "Burnt orange", hex: "#CC5500", why: "Coral's autumn sibling. Strong and a little sporty, and a favorite for fall weddings and team colors.", bestFor: "fall decor, sports branding" },
      { name: "Red", hex: "#C8102E", why: "Navy, red and white is the most recognizable American color scheme there is. Keep red as the smallest share and it reads classic, not loud.", bestFor: "nautical and preppy looks, July 4th" },
      { name: "Burgundy", hex: "#800020", why: "A grown-up, low-contrast pairing. It works best with a lighter color between the two, such as cream or gold.", bestFor: "fall and winter outfits, dining rooms" },
    ],
  },
  {
    id: "soft",
    title: "Soft and unexpected",
    intro: "Pastels look fresher next to navy than next to almost any other dark color, because navy gives them something solid to sit on.",
    items: [
      { name: "Blush pink", hex: "#F4C2C2", why: "Pink softens navy without making it sweet. It's a favorite in bedrooms and wedding palettes for good reason.", bestFor: "bedrooms, weddings, stationery" },
      { name: "Lilac", hex: "#C8A2C8", why: "Lilac and navy share a cool undertone, so they sit together calmly, and the lilac reads fresh rather than girly next to something this dark.", bestFor: "spring outfits, branding" },
    ],
  },
  {
    id: "greens",
    title: "Natural greens",
    intro: "Blue and green are neighbors on the color wheel, so they always look related. Pick the green by how much contrast you want.",
    items: [
      { name: "Olive", hex: "#6B8E23", why: "Earthy and relaxed. Navy and olive is a staple of workwear and outdoor gear, and it's showing up more in interiors too.", bestFor: "casual outfits, studies" },
      { name: "Sage", hex: "#BCB88A", why: "A soft gray-green that lightens navy without the starkness of white. One of the most popular kitchen and living room pairings right now.", bestFor: "kitchens, living rooms" },
      { name: "Forest green", hex: "#228B22", why: "Two deep colors for a rich, traditional look. Add cream or brass so the room doesn't get too dark.", bestFor: "libraries, fall and winter" },
    ],
  },
  {
    id: "blues",
    title: "Other blues",
    intro: "Tone-on-tone looks easy because there's nothing to clash.",
    items: [
      { name: "Sky blue", hex: "#87CEEB", why: "Light and dark blue together always feel calm and coordinated. Add white and you have a coastal room.", bestFor: "nurseries, coastal rooms, shirts" },
      { name: "Teal", hex: "#008080", why: "Teal sits beside blue on the wheel, so this analogous pairing is harmonious with a little twist of green.", bestFor: "bathrooms, branding" },
    ],
  },
];

export function NavyBluePost() {
  return (
    <>
      <p>
        Navy is one of those colors that seems to go with everything, and that&apos;s mostly true. It behaves like a dark neutral: softer than black, warmer than gray, and with just enough blue to have a personality. That&apos;s also why &quot;what goes with navy?&quot; comes up so often, whether you&apos;re picking an outfit, a sofa or a brand palette.
      </p>
      <p>
        Below are 18 colors that work with navy, grouped by the effect they create. Every card shows the two colors together, the exact HEX code, and the contrast between them, so you can tell at a glance whether a pairing is bold or subtle.
      </p>

      <h2 id="which-navy">Which navy are we talking about?</h2>
      <p>
        There&apos;s no single official navy. The navy built into HTML and CSS is <strong>#000080</strong>, a pure, very saturated dark blue. The navy you see in clothes, paint and logos is usually a bit grayer and softer. For this guide we use <strong>#1F2A44</strong>, a typical designer navy. Every contrast number below is measured against it.
      </p>
      <p>
        If your navy is brighter or darker, the pairings still work. The only things that shift are the exact contrast numbers. You can find more navy variations on our <Link href="/shades-of-blue">shades of blue</Link> page.
      </p>

      <h2 id="why">Why navy is so easy to pair</h2>
      <ul>
        <li><strong>It&apos;s very dark.</strong> Navy sits near the dark end of the lightness scale, so almost any lighter color stands out clearly against it. White on our navy measures 14.3:1, more than three times the 4.5:1 that WCAG asks for in body text.</li>
        <li><strong>It acts as a neutral.</strong> Like black, gray and beige, navy can fill a big area without demanding attention. That leaves room for one or two accents.</li>
        <li><strong>Its opposite is orange.</strong> On the <Link href="/color-wheel">color wheel</Link>, blue faces orange. That&apos;s why warm colors like mustard, coral, rust and camel look so good next to navy: they complete each other.</li>
      </ul>

      <h2 id="pairings">18 colors that go with navy blue</h2>
      <p>
        The ratio on each card is the WCAG contrast between navy and that color. Above 7:1 is a crisp, high-contrast look; under 3:1 is subtle and tonal, which can be beautiful but needs a lighter third color to stop it looking muddy.
      </p>
      {GROUPS.map((g) => (
        <section key={g.id}>
          <h3 id={g.id}>{g.title}</h3>
          <p>{g.intro}</p>
          <PairingGrid>
            {g.items.map((item) => (
              <PairingCard key={item.name} base={NAVY} pairing={item} />
            ))}
          </PairingGrid>
        </section>
      ))}

      <h2 id="palettes">6 ready-made navy palettes</h2>
      <p>
        A pairing is a starting point; a palette is something you can use. Each of these has five colors: navy, one or two partners and the neutrals that hold them together. Hover to see codes, click to copy, or open one in the generator to tweak it.
      </p>
      <PaletteGrid>
        <Palette name="Nautical" note="Navy, white and a little red" colors={[NAVY, "#FFFFFF", "#C8102E", "#D9DDE3", "#F5EFE0"]} />
        <Palette name="Coastal" note="Navy with sky blue and sand" colors={[NAVY, "#87CEEB", "#F5EFE0", "#C19A6B", "#FFFFFF"]} />
        <Palette name="Library" note="Navy, cognac leather and cream" colors={[NAVY, "#9A4A2B", "#C19A6B", "#F5EFE0", "#2B2420"]} />
        <Palette name="Modern" note="Navy, mustard and light gray" colors={[NAVY, "#E1AD01", "#D9DDE3", "#FFFFFF", "#36454F"]} />
        <Palette name="Garden" note="Navy, sage and blush" colors={[NAVY, "#BCB88A", "#F4C2C2", "#F5EFE0", "#6B8E23"]} />
        <Palette name="Evening" note="Navy, gold and burgundy" colors={[NAVY, "#D4AF37", "#800020", "#F5EFE0", "#0F1524"]} />
      </PaletteGrid>

      <h2 id="use">Navy in outfits, rooms and websites</h2>
      <h3 id="outfits">Outfits</h3>
      <p>
        The simplest formula is navy plus one neutral plus one accent: a navy sweater, cream trousers and a mustard scarf. Brown and tan leather shoes and belts are the classic match for a navy suit or dress, and white sneakers make navy casual. Navy is also a good stand-in for black when you want something formal that feels a little softer.
      </p>
      <h3 id="rooms">Rooms</h3>
      <p>
        Interior designers often use a 60-30-10 split: about 60% of a room in the main color, 30% in a secondary color and 10% in an accent. With navy, that might be cream walls (60%), a navy sofa and rug (30%) and brass or mustard accents (10%). Navy also works beautifully low down, on kitchen islands, lower cabinets and wainscoting, where it grounds the room.
      </p>
      <p>
        One warning: under warm evening light, a dark navy wall can look almost black. Paint a large sample and look at it at night before you commit.
      </p>
      <h3 id="websites">Websites and brands</h3>
      <p>
        Navy is one of the safest brand colors because it&apos;s so readable. Navy text on white measures 14.3:1, and white text on a navy header or footer reads just as well. For call-to-action buttons, the warm accents are your friends: navy text on a mustard button measures 6.9:1 and on coral 5.7:1, both comfortably above the 4.5:1 minimum. Check your own combination in the <Link href="/tools/contrast">contrast checker</Link> before you ship it.
      </p>
      <Callout title="Rule of thumb">
        Pair navy with one light color for readability and one warm color for energy. Navy, cream and mustard, or navy, white and coral, will look good almost anywhere.
      </Callout>

      <h2 id="careful">Colors to be careful with</h2>
      <ul>
        <li><strong>Black.</strong> Navy and black measure only about 1.5:1 against each other, so together they can look like a mistake: as if you meant to match and missed. If you do pair them, make the difference obvious with texture (a black leather jacket over a navy knit) or add a light third color.</li>
        <li><strong>Charcoal and dark brown.</strong> Same problem: they&apos;re too close to navy in lightness, at around 1.4:1 for charcoal. Lighten one side, or separate them with white or camel.</li>
        <li><strong>A slightly different navy.</strong> Two navies that are almost but not quite the same, like a navy jacket with navy trousers from a different set, often look worse than navy with any other color. Either match exactly or contrast clearly.</li>
      </ul>
      <p>
        Want to explore beyond these 18? Put #1F2A44, or your own navy, into the <Link href="/color-wheel">color wheel calculator</Link> to see its complementary and analogous colors, or start a palette from it in the <Link href="/generator">generator</Link>.
      </p>
    </>
  );
}
