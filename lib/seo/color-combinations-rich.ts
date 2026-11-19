import type { ContentSection, FaqItem, ReadyPalette, SourceLink } from "./content";

// Hand-written /color-combinations pages, built around the questions people actually typed
// into Google (Search Console, Jun-Nov 2026): "do green and purple go together", "are blue
// and orange complementary", "what color goes with red and purple". Each page answers the
// question first. Hue angles are HSL; contrast figures are WCAG 2 ratios computed from the
// hex values and rounded down.

export type CombinationRewrite = {
  title: string;
  description: string;
  answer: string;
  keyTakeaways: string[];
  sections: ContentSection[];
  faq: FaqItem[];
  /** Shades of both colors, shown as a strip at the top. CSS named colors link to their pages. */
  paletteColors: string[];
  palettes: ReadyPalette[];
  sources: SourceLink[];
};

const cssNamedColors: SourceLink = { title: "CSS Color Module Level 4: named colors, W3C", href: "https://www.w3.org/TR/css-color-4/#named-colors" };
const wcagContrast: SourceLink = { title: "WCAG 2.2: Contrast (Minimum), W3C", href: "https://www.w3.org/TR/WCAG22/#contrast-minimum" };

export const richColorCombinations: Record<string, CombinationRewrite> = {
  "green-and-purple": {
    title: "Do Green and Purple Go Together? 4 Palettes",
    description:
      "Yes, green and purple go together. Whether they're complementary, the best third colors, the Mardi Gras and suffragette history, and 4 palettes with hex codes.",
    answer:
      "Yes, green and purple go together, and the pair can look soft or dramatic. On the painter's color wheel they aren't complementary: purple's opposite is yellow and green's is red. On a screen they nearly are, since CSS purple #800080 (hue 300°) and green #008000 (hue 120°) sit exactly opposite each other. Make one clearly lighter or softer than the other, and add a neutral such as cream, gray or gold.",
    keyTakeaways: [
      "Green and purple look best when they differ in lightness: sage with deep plum, or mint with violet.",
      "On the painter's wheel they aren't complementary; on the screen wheel CSS purple #800080 and green #008000 are exact opposites.",
      "Purple, green and gold are the Mardi Gras colors; purple, white and green were the suffragette colors.",
      "Purple text on green is unreadable (#800080 on #008000 is 1.8:1), so set text in white or a near-black.",
    ],
    sections: [
      {
        title: "Do green and purple go together?",
        body: "Yes. Nature pairs them all the time: lavender and lilac flowers on green stems, irises, thistles, purple basil. The two hues sit far apart on the color wheel, so they never look like a near-miss, and yet both feel natural. The one combination to avoid is two equally bright versions, such as neon green next to neon purple. At the same lightness and saturation the edge between them seems to vibrate, and the eye has nowhere to rest. Let one color lead and the other support: a sage room with a plum velvet chair, or a deep purple brand with a mint accent.",
      },
      {
        title: "Are purple and green complementary colors?",
        body: "It depends on the color wheel. On the traditional painter's wheel, with red, yellow and blue as primaries, purple's complement is yellow and green's is red. Green and purple are two of the three secondary colors, so together with orange they form a triad, not a complementary pair. On the screen (RGB) wheel the answer is closer to yes: CSS purple #800080 has a hue of 300° and CSS green #008000 a hue of 120°, exactly 180° apart. That's why a saturated green and purple look so vivid together on a monitor. Bluer purples, such as rebeccapurple #663399 at 270°, sit a little off the exact opposite, which softens the clash.",
      },
      {
        title: "What color goes with green and purple?",
        body: "A third color gives the pair something to rest on. Cream or warm white is the easiest choice and makes both colors look cleaner. Gold or mustard turns the pair festive; with purple and green it becomes the Mardi Gras palette. Soft gray or charcoal makes it modern and calm. Blush pink suits lavender and sage for a garden look, and black with deep plum and emerald gives a jewel-toned evening palette. Avoid a third strong hue such as red or orange unless you want something deliberately loud.",
      },
      {
        title: "Green and purple in Mardi Gras and the suffragette movement",
        body: "Two famous color schemes use the pair. New Orleans Mardi Gras uses purple, green and gold: the Rex organization first named the colors before its first parade in 1872, and after a color-themed parade in 1892 said they stood for justice, faith and power. In Britain, the Women's Social and Political Union adopted purple, white and green in 1908. Emmeline Pethick-Lawrence chose them: purple for the royal blood of every suffragette, white for purity and green for hope.",
      },
      {
        title: "Green and purple on a website",
        body: "Both colors carry white text if the shades are dark enough: white on plum #5B2A86 measures 9.9:1 and on emerald #0F7B5F 5.2:1. A mid green like #1F8A4C only reaches 4.3:1 with white, just under the 4.5:1 WCAG asks for body text, so keep it for large headings, tags and illustrations. Never put purple text on green: #800080 on #008000 measures 1.8:1. A practical setup is a light neutral background, deep purple for headings and the main button, and green for success messages and accents.",
      },
      {
        title: "Green and purple in rooms and outfits",
        body: "In a room, keep one color on the large surfaces: sage or olive walls with plum, aubergine or lavender textiles, or a deep purple wall with green plants and brass. In clothes, an olive jacket over a lilac knit or a purple dress with an emerald bag is easier to wear than two bright shades head to toe. If both colors are dark, such as forest green and aubergine, add something light nearby so the pair doesn't sink into one dark mass.",
      },
    ],
    faq: [
      { question: "Do green and purple go together?", answer: "Yes. They look best when one is lighter or softer than the other, for example sage with plum or mint with violet, plus a neutral such as cream or gray." },
      { question: "Is green and purple a good combination?", answer: "Yes, for brands, rooms and outfits that want something natural but less expected than blue and green. Keep one color dominant and use the other as the accent." },
      { question: "Are purple and green complementary colors?", answer: "Not on the painter's wheel, where purple's complement is yellow and green's is red. On the screen wheel, CSS purple #800080 (hue 300°) and green #008000 (hue 120°) are exact opposites." },
      { question: "What color goes with green and purple?", answer: "Cream or white, gold, soft gray, charcoal, blush pink or black. Gold makes it the Mardi Gras palette; cream and gray make it calm and modern." },
      { question: "What do purple and green represent?", answer: "With gold, they are the Mardi Gras colors, which Rex said stood for justice, faith and power. With white, they were the British suffragette colors, with green standing for hope." },
      { question: "Do purple and green match in clothes?", answer: "Yes. Pair a muted green with a light purple (olive with lilac) or a dark purple with a fresh green (plum with mint). Avoid two bright shades at once." },
    ],
    paletteColors: ["#663399", "#800080", "#9370DB", "#228B22", "#2E8B57", "#8FBC8F"],
    palettes: [
      { name: "Sage and lavender", useCase: "Soft and calm: bedrooms, wellness brands, wedding stationery", colors: ["#F7F5EF", "#C9B8E8", "#7D6B9E", "#A8B89A", "#3F4A3A"], note: "Moss #3F4A3A on cream measures 8.5:1 for text. Dusty purple #7D6B9E reaches only 4.3:1 on cream, so use it for large headings and accents." },
      { name: "Plum and emerald", useCase: "Bold jewel tones: evening events, beauty, premium packaging", colors: ["#2A1B3D", "#5B2A86", "#0F7B5F", "#7FD1AE", "#F4F1EA"], note: "White text works on plum (9.9:1) and on emerald (5.2:1). Deep plum #2A1B3D on mint #7FD1AE measures 8.7:1." },
      { name: "Mardi Gras", useCase: "Festive: carnival, parties, New Orleans themes", colors: ["#5B2C83", "#1F8A4C", "#F2C14E", "#FFFFFF", "#1E1A22"], note: "Purple, green and gold. Near-black text on the gold measures 10.2:1. White on this green is 4.3:1, fine for large type only." },
      { name: "Lilac garden", useCase: "Fresh and natural: florists, spring campaigns, kids' rooms", colors: ["#FBF8F1", "#B79AD6", "#6B4C9A", "#6B7A3A", "#2F3324"], note: "Violet #6B4C9A reads on cream at 6.3:1 and carries white text at 6.7:1; the dark olive #2F3324 gives 12.2:1 for body text." },
    ],
    sources: [
      { title: "Mardi Gras in New Orleans: traditional colors, Wikipedia", href: "https://en.wikipedia.org/wiki/Mardi_Gras_in_New_Orleans" },
      { title: "Women's Social and Political Union: colours, Wikipedia", href: "https://en.wikipedia.org/wiki/Women%27s_Social_and_Political_Union" },
      cssNamedColors,
      wcagContrast,
    ],
  },

  "blue-and-orange": {
    title: "Do Blue and Orange Go Together? 4 Palettes",
    description:
      "Blue and orange are complementary on the painter's color wheel, which is why they pop. The best third colors, readable text and 4 palettes with hex codes.",
    answer:
      "Yes. Blue and orange are one of the strongest pairs there is, because on the painter's color wheel they are complementary: exact opposites that make each other look brighter. On a screen, orange #FFA500 sits opposite a sky blue of about #005AFF. Use one as the main color and the other as the accent, such as navy with tangerine or sky blue with apricot, and add white, cream or gray.",
    keyTakeaways: [
      "Blue and orange are complementary on the painter's wheel, so they give the strongest hue contrast of any pair.",
      "Let one lead: navy with an orange accent looks calm and confident; equal amounts look like a sports jersey.",
      "Orange buttons need dark text: white on #F28C28 is 2.4:1, while navy #0B1F3A on it is 6.7:1.",
      "Mixed as paint, blue and orange cancel out into a brown or gray, as complementary colors do.",
    ],
    sections: [
      {
        title: "Do blue and orange go together?",
        body: "Yes, and it's one of the most dependable pairings in design. Blue is cool and calm, orange is warm and energetic, so each balances the other: a navy suit with a rust tie, a blue front door on a terracotta house, a sunset over the sea. The pair only goes wrong when both colors are bright and used in equal amounts; then they compete and look loud. Pick a lead color and give the other about a tenth of the space.",
      },
      {
        title: "Are blue and orange complementary colors?",
        body: "Yes, on the traditional painter's wheel with red, yellow and blue as primaries: blue's complement is orange, the mix of the other two primaries. Complementary colors placed side by side make each other look more intense, an effect the chemist Michel Eugène Chevreul described in 1839. On the screen (RGB) wheel the exact opposites shift a little. Pure blue #0000FF (hue 240°) faces yellow, and orange #FFA500 (hue 39°) faces a sky blue around #005AFF (hue 219°). In practice any blue from sky to navy and any orange from peach to rust still read as complementary.",
      },
      {
        title: "What colors go with blue and orange?",
        body: "Neutrals are the safest third color: white and cream keep the pair fresh, light gray makes it modern, and charcoal or black makes it sporty. Sand, beige and warm wood suit it in rooms. If you want a third hue, teal or turquoise keeps things cool and sits naturally next to the blues, while mustard or gold pushes the palette warmer. Avoid adding bright red or purple, which tips it into chaos.",
      },
      {
        title: "Blue and orange in film and sport",
        body: "Hollywood color graders lean on this pair. From around 2010 many films, Iron Man 2 among them, pushed their images toward orange and teal, a complementary contrast that makes skin tones stand out against cool backgrounds. In sport, the New York Knicks have used blue and orange since their first logo in 1946, and the pair is a favorite in team colors.",
      },
      {
        title: "Blue and orange on a website",
        body: "Use blue for the structure and orange for the one action you want people to take. White text on a mid navy like #1F4E8C measures 8.3:1. Orange is the tricky one: white on #F28C28 is only 2.4:1, and orange text on white is the same 2.4:1, so give orange buttons dark labels (navy #0B1F3A on #F28C28 measures 6.7:1). Don't set the two at full strength on each other either: pure blue #0000FF on orange #FFA500 is 4.3:1, and it vibrates.",
      },
      {
        title: "Blue and orange in rooms and outfits",
        body: "When the area is large, keep the orange muted: rust, terracotta, apricot or cognac leather. A navy sofa with burnt orange cushions, terracotta pots on blue tiles, or a pale blue bedroom with peach linen all work. In clothes, navy trousers with an orange sweater or a light blue shirt with a rust jacket are easy wins. Bright orange with bright royal blue is best kept to sportswear.",
      },
    ],
    faq: [
      { question: "Do blue and orange go together?", answer: "Yes. They are complementary on the painter's color wheel, so they make each other look brighter. Let one color lead and use the other as an accent." },
      { question: "Are blue and orange complementary colors?", answer: "Yes, on the traditional red-yellow-blue wheel. On the screen wheel, orange #FFA500 is exactly opposite a sky blue of about #005AFF, and pure blue is opposite yellow." },
      { question: "What colors go with blue and orange?", answer: "White, cream, light gray, charcoal, sand and warm wood. For a third hue, teal or turquoise keeps it cool and mustard or gold makes it warmer." },
      { question: "Do blue and orange match in clothes?", answer: "Yes. Navy with rust, burnt orange or camel is a classic. Keep the brighter color to one piece, such as a sweater, scarf or tie." },
      { question: "What color do blue and orange make when mixed?", answer: "Mixed as paint, they make a brown or gray, because complementary colors cancel each other out. See the color mixing chart for other pairs." },
      { question: "What do blue and orange represent together?", answer: "Blue is usually read as calm and trustworthy, orange as warm and energetic, so together they suggest a reliable brand with energy. They are also popular team colors." },
    ],
    paletteColors: ["#000080", "#4169E1", "#1E90FF", "#FF7F50", "#FF8C00", "#FFA500"],
    palettes: [
      { name: "Navy and tangerine", useCase: "Confident and clear: SaaS, finance, corporate sites", colors: ["#0B1F3A", "#1F4E8C", "#F28C28", "#FFD8B0", "#F7F7F5"], note: "White on #1F4E8C measures 8.3:1. Put navy labels on the tangerine button (6.7:1), not white (2.4:1)." },
      { name: "Sky and apricot", useCase: "Soft and friendly: nurseries, travel, lifestyle brands", colors: ["#FDF3EA", "#F6B183", "#8EC5E8", "#3B7FB6", "#1C3A57"], note: "Deep blue #1C3A57 is the text color: 10.7:1 on the cream and 6.4:1 on apricot. White on #3B7FB6 is only 4.2:1." },
      { name: "Teal and orange", useCase: "Cinematic: film, photography, creative studios", colors: ["#0E3B43", "#1F7A8C", "#F4A259", "#F8E1C4", "#2B2B2B"], note: "The colorist's pairing. Dark teal #0E3B43 on the orange measures 5.8:1; white on #1F7A8C is 4.9:1." },
      { name: "Game day", useCase: "Bold and sporty: teams, events, fitness", colors: ["#12355B", "#FF7F11", "#FFFFFF", "#D9D9D9", "#0A0A0A"], note: "White on the navy measures 12.4:1. The orange needs black text (7.8:1); white on it is 2.5:1." },
    ],
    sources: [
      { title: "Color grading: orange and teal, Wikipedia", href: "https://en.wikipedia.org/wiki/Color_grading" },
      { title: "New York Knicks: logos and uniforms, Wikipedia", href: "https://en.wikipedia.org/wiki/New_York_Knicks" },
      { title: "Color analysis: Chevreul and simultaneous contrast, Wikipedia", href: "https://en.wikipedia.org/wiki/Color_analysis" },
      cssNamedColors,
      wcagContrast,
    ],
  },

  "red-and-purple": {
    title: "Do Red and Purple Go Together? 4 Palettes",
    description:
      "Red and purple go together when their lightness differs. Whether they clash or are complementary, the best third colors, and 4 palettes with hex codes.",
    answer:
      "Yes, red and purple go together, though they need a little care. They are neighbors on the color wheel, both containing red, so they look related rather than contrasting, and two dark versions can blur into one. Choose shades that differ in lightness, such as crimson with lavender or plum with coral pink, and add a neutral like white, blush or gray. The old rule that red and purple clash is mostly a matter of taste.",
    keyTakeaways: [
      "Red and purple are analogous: neighbors on the color wheel, about 60° apart on a screen.",
      "They aren't complementary. Red's complement is green; purple's is yellow on the painter's wheel.",
      "Vary the lightness: crimson #DC143C on purple #800080 is only 1.8:1, so the two blur at a distance.",
      "The Red Hat Society, founded in 1998, made purple clothes with a red hat its trademark look.",
    ],
    sections: [
      {
        title: "Do red and purple go together?",
        body: "Yes. Because both colors contain red, they share a warm, rich undertone and look like family. That's what makes the pairing work in berry and wine shades, in sunsets and in autumn flowers. The risk is the opposite of a clash: two dark, saturated versions are so close in lightness that they merge into one heavy mass. The fix is contrast in lightness, not hue. Pair a deep wine with a pale lilac, or a bright red with a dark aubergine, and the combination looks deliberate.",
      },
      {
        title: "Do red and purple clash?",
        body: "They were long treated as a clash in fashion, and the idea still comes up. Jenny Joseph's poem \"Warning\", written in 1961, imagines an old woman wearing purple with a red hat that \"doesn't go\", as a happy act of rebellion. In 1998 the Red Hat Society, a social club for women, made exactly that combination its uniform. In design terms the two colors don't clash at all; they are analogous. What looks wrong is usually two shades that are almost, but not quite, the same lightness.",
      },
      {
        title: "Are red and purple complementary colors?",
        body: "No. Complementary colors sit opposite each other on the wheel, and red and purple sit side by side. On the painter's wheel, red's complement is green and purple's is yellow. On the screen (RGB) wheel, red #FF0000 has a hue of 0° and CSS purple #800080 a hue of 300°, only 60° apart. That makes them an analogous pair, which reads as harmonious and rich rather than high-contrast. Mixed as paint, red and purple give a red-violet, close to magenta or raspberry.",
      },
      {
        title: "What colors go with red and purple?",
        body: "White and blush pink lighten the pair and make it feel fresh. Soft gray or charcoal makes it modern. Gold turns it opulent, in the spirit of velvet and theater curtains. Black makes it dramatic but needs a light accent so the dark shades don't merge. For a small cool contrast, a touch of green (red's complement) or navy works. Avoid orange as a third color unless you want a very warm, loud palette.",
      },
      {
        title: "Red and purple on a website",
        body: "Both colors carry white text well in their deeper shades: white on raspberry #B3123A measures 6.8:1, on #7A1F5C 9.6:1, and on violet #6B3FA0 7.3:1. Brighter reds are borderline: white on #E63946 is 4.1:1, under the 4.5:1 that WCAG asks for body text. Never put one on the other for text: red #D7263D on purple #6A2C91 is 1.7:1. Separate them with white space or a light background, and use one for buttons and the other for accents.",
      },
      {
        title: "Red and purple in rooms and outfits",
        body: "Berry tones work well in dining rooms and bedrooms: a plum wall with a deep red rug, or wine-colored velvet against lilac walls, warmed with brass. In clothes, a burgundy coat over a lavender knit or a purple dress with red lipstick and a neutral shoe is the easy version. Keep the brightest red to one piece, and let a neutral do the rest.",
      },
    ],
    faq: [
      { question: "Do red and purple go together?", answer: "Yes. They are neighbors on the color wheel, so they look related. Choose shades with different lightness, such as crimson with lavender, and add white or gray." },
      { question: "Do red and purple clash?", answer: "Not in color theory: they are analogous. They can look off when the two shades are almost the same lightness. The famous red hat with purple outfit is now a deliberate look." },
      { question: "Are red and purple complementary colors?", answer: "No. Red's complement is green and purple's is yellow. Red and purple sit about 60° apart on the screen color wheel, which makes them analogous." },
      { question: "What colors go with red and purple?", answer: "White, blush pink, soft gray, charcoal, gold and black. A small touch of green or navy adds a cool contrast." },
      { question: "Does purple and red match in clothes?", answer: "Yes. Pair a dark one with a light one, for example burgundy with lavender or purple with a bright red accent, and keep the rest neutral." },
      { question: "What color do red and purple make when mixed?", answer: "Mixed as paint they make a red-violet, close to magenta or raspberry. On a screen, the color halfway between red and purple is a deep pink-magenta." },
    ],
    paletteColors: ["#8B0000", "#B22222", "#DC143C", "#8B008B", "#800080", "#663399"],
    palettes: [
      { name: "Berry", useCase: "Rich and warm: food, cosmetics, autumn campaigns", colors: ["#3B0A2A", "#7A1F5C", "#B3123A", "#E8577A", "#FBEFF2"], note: "White on #7A1F5C measures 9.6:1 and on raspberry #B3123A 6.8:1. Dark #3B0A2A on the blush is 14.8:1." },
      { name: "Wine and plum", useCase: "Moody and elegant: restaurants, evening events, packaging", colors: ["#2B0F1E", "#5E1A3A", "#6B3FA0", "#C9B6E4", "#F5F0F4"], note: "White on wine #5E1A3A measures 12.4:1 and on violet #6B3FA0 7.3:1; near-black on lilac is 9.4:1." },
      { name: "Red hat", useCase: "Playful and bold: celebrations, community groups, invitations", colors: ["#6A2C91", "#D7263D", "#F5D0DC", "#FFFFFF", "#1E1E24"], note: "Purple and red sit close in lightness (1.7:1), so keep pink or white between them. White on the purple is 8.8:1." },
      { name: "Sunset", useCase: "Gradients, posters and music events", colors: ["#FDE7E7", "#F25F5C", "#C0392B", "#8E44AD", "#3D1E6D"], note: "Runs from coral to deep violet. White on #C0392B measures 5.4:1 and on #8E44AD 5.8:1; #3D1E6D on the pale pink is 11.0:1." },
    ],
    sources: [
      { title: "Jenny Joseph and her poem \"Warning\" (1961), Wikipedia", href: "https://en.wikipedia.org/wiki/Jenny_Joseph" },
      { title: "Red Hat Society, Wikipedia", href: "https://en.wikipedia.org/wiki/Red_Hat_Society" },
      cssNamedColors,
      wcagContrast,
    ],
  },

  "red-and-orange": {
    title: "Do Red and Orange Go Together? 4 Palettes",
    description:
      "Red and orange go together as a warm, analogous pair. What sits between them (orangered #FF4500), the best third colors, and 4 palettes with hex codes.",
    answer:
      "Yes. Red and orange are next to each other on the color wheel, so they always look related: think fire, autumn leaves and sunsets. It's an analogous pair, not a complementary one, so it feels warm and energetic rather than contrasting. Keep one color dominant, vary the lightness (a deep brick red with a pale apricot, or burnt orange with dark red), and calm it with cream, brown or a touch of teal.",
    keyTakeaways: [
      "Red and orange are analogous: neighbors on the wheel, about 39° apart on a screen (#FF0000 vs #FFA500).",
      "The color between them is red-orange; in CSS it's orangered, #FF4500.",
      "They don't clash, but red text on orange is unreadable: #FF0000 on #FFA500 measures 2.0:1.",
      "A cool third color, such as teal or navy, keeps the pair from feeling overheated.",
    ],
    sections: [
      {
        title: "Do red and orange go together?",
        body: "Yes. They share a warm undertone and sit side by side on the color wheel, so the eye reads them as one family. Nature uses them together constantly: autumn leaves, flames, sunsets, chili peppers. The pair only looks off when both are bright and equally strong, because then nothing leads. Choose one as the main color, and make the other clearly lighter or darker: brick red with a soft apricot, or a tomato red accent on a burnt orange background.",
      },
      {
        title: "Are red and orange complementary colors?",
        body: "No. Complementary colors face each other across the wheel; red and orange are neighbors. Red's complement is green and orange's is blue on the painter's wheel. On a screen, red #FF0000 has a hue of 0° and orange #FFA500 a hue of 39°, so they are analogous: harmonious and warm rather than contrasting. That's also why they don't clash, even though they can be overwhelming in large, bright areas.",
      },
      {
        title: "What color is between red and orange?",
        body: "Red-orange, a tertiary color on the painter's wheel. Vermilion and scarlet are close relatives. In CSS the named color orangered, #FF4500 (hue 16°), sits right between red and orange, and tomato #FF6347 is a slightly softer version. On a website, white text on orangered measures only 3.4:1, so use it for large headings, badges and illustrations rather than small text.",
      },
      {
        title: "What colors go with red and orange?",
        body: "Warm neutrals are the natural partners: cream, warm white, sand, and chocolate or chestnut brown. Gold and mustard keep the palette in the same warm family. For contrast, add a cool color in a small amount: teal, navy or olive green sit opposite the reds and oranges and keep the palette from feeling overheated. Avoid pink and purple as third colors unless you want a deliberately loud, festival look.",
      },
      {
        title: "Red and orange on a website",
        body: "These colors grab attention, so they work best for a single campaign banner, a sale badge or one main button. Darker shades carry white text: white on brick red #B23A2A measures 5.9:1 and on #9C2A1B 7.6:1. Brighter ones don't: white on #D9480F is 4.2:1 and on orangered #FF4500 3.4:1, so give those dark text. Don't set one on the other: red #FF0000 on orange #FFA500 is 2.0:1, and brick red on a mid orange is even lower.",
      },
      {
        title: "Red and orange in rooms, food and fashion",
        body: "Red and orange are the colors of autumn decor and of many food brands and restaurants, partly because they look warm and lively. In a room, use them in textiles, ceramics and art against cream or wood rather than on every wall. In clothes, a rust sweater with a deep red scarf, or a tomato red dress with tan accessories, looks rich. Keep the brightest of the two to a single piece.",
      },
    ],
    faq: [
      { question: "Do red and orange go together?", answer: "Yes. They are neighbors on the color wheel, so they look related and warm. Let one lead and make the other lighter or darker." },
      { question: "Is red and orange a good combination?", answer: "Yes, for warm, energetic designs such as autumn themes, food and sales. Calm it with a neutral like cream or brown, and add a small cool accent if it feels too hot." },
      { question: "Do red and orange clash?", answer: "No, they are analogous colors. They only look harsh when both are bright and used in equal amounts." },
      { question: "What color is between red and orange?", answer: "Red-orange. In CSS that's orangered, #FF4500. Vermilion and scarlet are similar shades." },
      { question: "What color goes with red and orange?", answer: "Cream, warm white, sand, chocolate brown, gold or mustard. For contrast, a little teal, navy or olive green." },
      { question: "Are red and orange complementary?", answer: "No. Red's complement is green and orange's is blue. Red and orange are analogous: next to each other on the wheel." },
    ],
    paletteColors: ["#8B0000", "#DC143C", "#FF0000", "#FF4500", "#FF8C00", "#FFA500"],
    palettes: [
      { name: "Autumn leaves", useCase: "Seasonal: fall campaigns, Thanksgiving, home decor", colors: ["#3A1F14", "#9C2A1B", "#D9480F", "#F59F00", "#FFF4E0"], note: "Dark brown #3A1F14 on the cream measures 13.9:1 and on the amber 7.1:1. White on #9C2A1B is 7.6:1." },
      { name: "Spice market", useCase: "Food brands, restaurants, menus", colors: ["#5C1A1B", "#B23A2A", "#E86A33", "#F6C28B", "#FBF3EA"], note: "White on brick #B23A2A measures 5.9:1. The darkest red #5C1A1B reads on the peach at 8.0:1 and on cream at 11.8:1." },
      { name: "Sunset", useCase: "Gradients, posters, music and summer events", colors: ["#FFE3C2", "#FFB347", "#FF6F3C", "#E63946", "#6D1A36"], note: "Use the dark wine #6D1A36 for text: 9.1:1 on the pale peach and 6.3:1 on the orange. White on #E63946 is only 4.1:1." },
      { name: "Warm with a cool partner", useCase: "Brands that want warmth without feeling overheated", colors: ["#F5F1EA", "#D7263D", "#F46036", "#2E8B8B", "#1B2A33"], note: "Teal #2E8B8B cools the reds. The dark #1B2A33 gives 13.0:1 on the cream; white on the red #D7263D is 4.9:1." },
    ],
    sources: [cssNamedColors, wcagContrast],
  },

  "purple-and-gold": {
    title: "Is Purple and Gold a Good Combination? 4 Palettes",
    description:
      "Purple and gold is a classic rich pairing. Why it looks royal, the colors that go with it, readable text pairs, and 4 purple and gold palettes with hex codes.",
    answer:
      "Yes. Purple and gold is one of the classic rich-looking pairs. On the painter's color wheel purple's opposite is yellow, and gold is a deep yellow, so the two contrast strongly in hue, and a deep purple beside a light gold contrasts in lightness too. Both have long links with royalty and wealth. Use a deep, slightly muted purple with gold as the accent, and add cream or ivory so it looks elegant rather than costume-like.",
    keyTakeaways: [
      "Purple and gold nearly complement each other on the painter's wheel, where purple's opposite is yellow.",
      "Purple's royal image goes back to Tyrian purple: by the 4th century AD only the Roman emperor could wear it.",
      "Gold is never readable as text on white (#D4AF37 is 2.1:1), but on deep purple #2D1B4E it reaches 7.2:1.",
      "Purple and gold are the colors of the Los Angeles Lakers and of LSU, and two of the three Mardi Gras colors.",
    ],
    sections: [
      {
        title: "Is purple and gold a good combination?",
        body: "Yes, and it's one of the easiest ways to make a design look rich. The pair works on two levels at once: the hues sit nearly opposite on the color wheel, and a dark purple next to a light gold gives strong contrast in lightness. The style depends on the shades. A deep, slightly gray purple with a soft metallic gold looks elegant and modern; bright violet with yellow-gold looks festive and sporty; lilac with champagne looks romantic.",
      },
      {
        title: "Why purple and gold look royal",
        body: "Purple's royal reputation comes from Tyrian purple, a dye made from sea snails that was slow and expensive to produce. In Rome it became a sign of rank, and by the 4th century AD only the emperor was allowed to wear it, which is why \"donning the purple\" came to mean becoming emperor. Gold has signaled wealth for even longer. Put the two together and the association is instant, which is why the pair turns up on awards, invitations and luxury packaging.",
      },
      {
        title: "Purple and gold in sport and celebrations",
        body: "The Los Angeles Lakers play in purple, gold and white. LSU's official colors are Royal Purple and Old Gold, said to date back to an 1893 baseball game. And in New Orleans, purple and gold are two of the three Mardi Gras colors, with green, which the Rex organization first named in 1872. If your design is close to one of these, a small shift in shade or a different third color keeps it from looking like team merchandise.",
      },
      {
        title: "What colors go with purple and gold?",
        body: "Cream, ivory and warm white are the best partners: they let the gold glow and keep the purple from feeling heavy. Black or charcoal makes the pair dramatic and evening-like. Emerald or deep green adds a third jewel tone, in the Mardi Gras direction. Blush pink or lilac softens it for weddings and spring. Avoid bright orange or red alongside, which makes the palette loud and loses the elegance.",
      },
      {
        title: "Are purple and gold complementary colors?",
        body: "Nearly, on the painter's wheel: purple's complement is yellow, and gold is a darker, warmer yellow. On the screen (RGB) wheel they are farther from exact opposites. CSS gold #FFD700 has a hue of 51°, and its exact opposite is a blue-violet around 231°, while CSS purple #800080 sits at 300°. The strong difference in lightness does much of the work, which is why the pair still reads as high-contrast on a screen.",
      },
      {
        title: "Purple and gold on a website",
        body: "Gold is a background and accent color on screens, never a text color on white: metallic gold #D4AF37 on white measures 2.1:1. Flip it around and it works: gold on deep purple #2D1B4E reaches 7.2:1, and CSS gold #FFD700 on purple #800080 6.7:1. White text on a royal purple like #5B2C83 measures 9.8:1. A good setup is a cream page, deep purple for headings and buttons, and gold for borders, icons and one highlight.",
      },
    ],
    faq: [
      { question: "Is purple and gold a good combination?", answer: "Yes. The two nearly complement each other on the painter's color wheel and differ strongly in lightness, so they look rich and clear. Keep the purple deep and the gold as an accent." },
      { question: "Do purple and gold go together?", answer: "Yes. They are one of the classic royal pairings. Add cream or ivory so the result looks elegant rather than costume-like." },
      { question: "What do the colors purple and gold represent?", answer: "Royalty, wealth and achievement. Purple was once the costly dye of Roman emperors, and gold has signaled wealth for even longer." },
      { question: "What colors go with purple and gold?", answer: "Cream, ivory, white, black, charcoal, emerald green or blush pink. Green makes it the Mardi Gras palette; black makes it dramatic." },
      { question: "What color do purple and gold make when mixed?", answer: "Mixed as paint they move toward a muddy brown or olive, because purple and yellow-gold nearly cancel each other out." },
      { question: "What are good hex codes for purple and gold?", answer: "A deep purple such as #2D1B4E or #5B2C83 with metallic gold #D4AF37, or CSS purple #800080 with CSS gold #FFD700. Darker gold: goldenrod #DAA520 or dark goldenrod #B8860B." },
    ],
    paletteColors: ["#4B0082", "#663399", "#800080", "#B8860B", "#DAA520", "#FFD700"],
    palettes: [
      { name: "Royal", useCase: "Classic and formal: invitations, awards, ceremonies", colors: ["#2D1B4E", "#5B2C83", "#D4AF37", "#F6E7B4", "#FFFDF7"], note: "Gold on the deep purple measures 7.2:1, white on #5B2C83 9.8:1, and #2D1B4E text on the ivory 14.9:1." },
      { name: "Modern luxury", useCase: "Muted and premium: beauty, hotels, jewelry", colors: ["#1E1726", "#4A3B5C", "#B8975A", "#E9E2D0", "#F8F6F1"], note: "Soft gold #B8975A on the near-black measures 6.3:1. Use #4A3B5C for text on the light background (9.3:1)." },
      { name: "Team spirit", useCase: "Bold: sport, schools, game-day graphics", colors: ["#4C2A85", "#F2B705", "#FFFFFF", "#2B2B2B", "#E5E5E5"], note: "White on the purple measures 10.6:1. Purple and gold carry each other at 5.8:1, and #2B2B2B on the gold is 7.7:1." },
      { name: "Lilac and champagne", useCase: "Soft and romantic: weddings, spring events, stationery", colors: ["#FBF8F3", "#D8C8E8", "#9C7FC0", "#E3C988", "#4A3B5C"], note: "Text in #4A3B5C reads on the champagne at 6.2:1. White on the lilac #9C7FC0 is only 3.3:1, so keep it for large type." },
    ],
    sources: [
      { title: "Tyrian purple, Wikipedia", href: "https://en.wikipedia.org/wiki/Tyrian_purple" },
      { title: "Los Angeles Lakers: name, logo and uniforms, Wikipedia", href: "https://en.wikipedia.org/wiki/Los_Angeles_Lakers" },
      { title: "LSU Tigers: school colors, Wikipedia", href: "https://en.wikipedia.org/wiki/LSU_Tigers_and_Lady_Tigers" },
      cssNamedColors,
      wcagContrast,
    ],
  },

  "purple-and-black": {
    title: "Do Purple and Black Go Together? 4 Palettes",
    description:
      "Yes, purple and black go together, if the purple is light enough. What purple and black make, the best third colors, dark-mode contrast and 4 palettes.",
    answer:
      "Yes. Purple and black go together well, especially in dark designs: black makes purple look richer, and purple keeps black from feeling flat. The catch is lightness. A dark purple such as CSS purple #800080 measures only 2.2:1 against black, so the two blur together. Use a lighter purple (lavender, lilac or a bright violet) against black, or a deep purple with plenty of white or light gray.",
    keyTakeaways: [
      "Purple and black work best when the purple is clearly lighter: mediumpurple #9370DB reaches 5.5:1 on black, CSS purple #800080 only 2.2:1.",
      "Mixing black into purple makes a shade: darker purples such as eggplant and aubergine.",
      "White, silver, lavender and gold are the easiest third colors; a neon pink or teal accent suits dark mode.",
      "The Baltimore Ravens have worn purple and black since 1996.",
    ],
    sections: [
      {
        title: "Do purple and black go together?",
        body: "Yes. Black is a neutral, so it never fights with a hue; it simply makes the color next to it look deeper and more saturated. Purple on black looks rich, a little mysterious and very modern, which is why the pair is everywhere in gaming, nightlife and dark-mode apps. The only thing to watch is lightness. Dark purples are already close to black, so a deep plum on a black background reads as one dark mass. Lift the purple (lilac, lavender, bright violet) or add white so the eye can separate them.",
      },
      {
        title: "Is purple and black a good combination?",
        body: "It is, and it can take on several moods. Deep plum with black and silver feels gothic and dramatic. Lavender with black and white feels clean and fashion-like. Electric violet and neon pink on near-black feel like a game or a club night. Add orange and it becomes a Halloween palette. In sport, the Baltimore Ravens have worn purple and black since the team was introduced in 1996.",
      },
      {
        title: "What do purple and black make?",
        body: "Adding black to any hue makes a shade, so purple plus black gives darker purples: plum, eggplant, aubergine, and eventually something close to black. That's the term behind questions like \"a hue with black added is known as a\": a shade. Adding white instead makes a tint (lilac, lavender) and adding gray makes a tone. In design, mixing just a little black into a bright violet is an easy way to get a deep, grown-up purple for headings or a dark theme.",
      },
      {
        title: "What colors go with purple and black?",
        body: "White and light gray are the safest partners and keep the pair readable. Silver or chrome feels cool and techy; gold feels luxurious. A pale lavender or lilac adds a second purple without losing contrast. For dark-mode interfaces, one bright accent such as hot pink, teal or lime gives buttons something to stand out with. Avoid browns and muddy greens, which make the palette look dull next to black.",
      },
      {
        title: "Purple and black on a website and in dark mode",
        body: "On a black or near-black background, use light purples for text: lilac #C4B5FD on #0B0A10 measures 10.6:1, and mediumpurple #9370DB on black 5.5:1. Saturated violets like #7C3AED are for buttons, with white labels (5.6:1); as text on near-black they only reach 3.4:1. On a light background, flip it: deep purple #5B2C83 carries white text at 9.8:1 and works well for headers and buttons, with black for body text.",
      },
      {
        title: "Purple and black in rooms and outfits",
        body: "A black dress or suit with a purple accent (a scarf, a tie, a lipstick) is a classic evening look; a purple coat over all-black clothes is a stronger version. In rooms, black reads best in small doses with purple: a black frame, lamp or piece of furniture against an aubergine or lavender wall, plus brass or silver and something light so the room doesn't get gloomy.",
      },
    ],
    faq: [
      { question: "Do purple and black go together?", answer: "Yes. Black makes purple look richer. Choose a purple that's clearly lighter than black, such as lavender or bright violet, or add white between them." },
      { question: "Is purple and black a good combination?", answer: "Yes, for dark-mode apps, gaming, nightlife, gothic or luxury looks. Deep plum on black can look muddy, so lift the purple or add white or silver." },
      { question: "Does purple go well with black clothes?", answer: "Yes. A purple accent on black clothes, such as a scarf, tie or bag, is a classic evening look. A lighter purple stands out more than a dark one." },
      { question: "What does purple and black make?", answer: "Mixing black into purple makes a shade: darker purples such as plum, eggplant and aubergine. A hue with black added is called a shade." },
      { question: "What colors go with purple and black?", answer: "White, light gray, silver, gold, lavender or lilac, and for dark mode a single bright accent such as hot pink, teal or lime." },
      { question: "Is purple text readable on black?", answer: "Only if the purple is light. Lilac #C4B5FD reaches 10.6:1 on near-black, but CSS purple #800080 on black is just 2.2:1." },
    ],
    paletteColors: ["#000000", "#4B0082", "#800080", "#9400D3", "#9370DB", "#DDA0DD"],
    palettes: [
      { name: "Midnight violet", useCase: "Dark-mode apps, dashboards, developer tools", colors: ["#0B0A10", "#1A1625", "#7C3AED", "#C4B5FD", "#F5F3FF"], note: "Lilac #C4B5FD text on the near-black measures 10.6:1. The violet #7C3AED needs white labels (5.6:1); on the near-black it's only 3.4:1, so use it for buttons, not text." },
      { name: "Gothic", useCase: "Dramatic: fashion, music, Halloween, book covers", colors: ["#000000", "#2E1A47", "#5B2C83", "#A78BFA", "#E8E4EF"], note: "White on #5B2C83 measures 9.8:1 and light violet #A78BFA on black 7.7:1. The deep plum #2E1A47 is a surface color, too close to black (1.3:1) for text." },
      { name: "Neon night", useCase: "Gaming, nightlife, streaming", colors: ["#0A0A0F", "#1F1B2E", "#9D4EDD", "#E0AAFF", "#F72585"], note: "Pale violet #E0AAFF on the black measures 10.6:1 and the pink accent 5.2:1. White on the violet #9D4EDD is 4.5:1, just enough for body text." },
      { name: "Elegant plum", useCase: "Muted and grown-up: beauty, hospitality, portfolios", colors: ["#1A1A1A", "#3F2A4D", "#8E6C9E", "#D8CCE0", "#FAF8FB"], note: "White on #3F2A4D measures 12.7:1. The mauve #8E6C9E reaches only 4.3:1 with white, so keep it for large type and accents." },
    ],
    sources: [
      { title: "Baltimore Ravens: logo and uniforms, Wikipedia", href: "https://en.wikipedia.org/wiki/Baltimore_Ravens" },
      cssNamedColors,
      wcagContrast,
    ],
  },

  "green-and-black": {
    title: "Do Green and Black Go Together? 4 Palettes",
    description:
      "Green and black go together, from emerald-and-gold luxury to green-screen tech. The best third colors, readable text on black, and 4 palettes with hex codes.",
    answer:
      "Yes. Green and black go together, from forest green and black with gold for a luxury look to bright green on black, the style of early computer screens. As with any dark pair, lightness matters: CSS green #008000 measures 4.0:1 on black, just under the 4.5:1 for body text, while a bright green such as #33FF66 reaches 15.6:1. Use deep greens with gold or cream, or light greens on black.",
    keyTakeaways: [
      "Light and bright greens read well on black; dark greens need white or gold beside them.",
      "Green on black was the look of 1980s monochrome \"green screen\" computer monitors.",
      "Red, black and green are the colors of the Pan-African flag, adopted in 1920.",
      "White, cream, gold, gray and a touch of red or orange are the easiest third colors.",
    ],
    sections: [
      {
        title: "Do green and black go together?",
        body: "Yes. Black is a neutral that makes any green look more intense, and the pair can feel natural, technical or luxurious depending on the green. Forest and emerald greens with black feel rich and serious; lime and neon greens on black feel sporty and electric; sage with black feels calm and modern. The pair only struggles when the green is very dark, because deep greens and black are close in lightness and merge at a distance.",
      },
      {
        title: "Is green and black a good combination?",
        body: "It's a strong one for outdoor and sports brands, finance and investing products, gaming, and luxury packaging with a gold accent. It's less suited to soft, friendly brands, where black can feel heavy: there, swap black for charcoal and let a lighter green lead. As a rule, give one color most of the space. Black backgrounds with a green accent, or green surfaces with black type, both read as intentional.",
      },
      {
        title: "Green and black in tech and history",
        body: "In the early to mid 1980s, many computer terminals were \"green screens\": monochrome monitors with a green phosphor glowing on a black background. That look still says \"code\" and \"terminal\" today. Green and black also appear with red in the Pan-African flag, which the Universal Negro Improvement Association adopted on August 13, 1920. If you use red, black and green together, people will often read it as a reference to that flag.",
      },
      {
        title: "What goes with green and black?",
        body: "White and cream keep the pair fresh and readable. Gold or brass turns it luxurious, especially with emerald. Light gray makes it modern and quiet. A small amount of orange or red gives energy, since red is green's complement. Tan, camel and natural wood suit the pair in outdoor and interior settings. Avoid purple and blue as third colors unless you want a very dark, moody palette.",
      },
      {
        title: "Green and black on a website",
        body: "On black, choose light greens for text: mint #A7F3B5 measures 16.1:1 and phosphor green #33FF66 15.6:1, while CSS green #008000 is 4.0:1, under the 4.5:1 for body text. On a light page, deep greens carry white text well: white on #2E6B4A is 6.3:1 and on emerald #1F7A5C 5.2:1. Bright greens such as lime #84CC16 need dark labels; white on lime is only 1.9:1.",
      },
      {
        title: "Green and black in rooms and outfits",
        body: "Dark green walls with black window frames, lamps or furniture look rich and classic, especially with brass and warm wood. In clothes, an olive or forest-green jacket over black is an easy, slightly utilitarian look; emerald with black is an evening one. Keep the brightest green to one piece.",
      },
    ],
    faq: [
      { question: "Does green and black go together?", answer: "Yes. Black makes green look richer. Use light greens on black, or deep greens with white, cream or gold so the two don't merge." },
      { question: "Is green and black a good combination?", answer: "Yes, for outdoor, sports, finance, gaming and luxury designs. Let one color dominate and add a light neutral." },
      { question: "Does green and black match in clothes?", answer: "Yes. Olive or forest green with black is easy to wear; emerald with black is dressier. Avoid two very dark shades with nothing light nearby." },
      { question: "What goes well with green and black?", answer: "White, cream, gold or brass, light gray, tan and natural wood, plus a small red or orange accent for energy." },
      { question: "What is green and black?", answer: "Usually a color scheme: green on black, as on old monochrome computer monitors, or a black-and-green brand palette. With red, green and black are the colors of the Pan-African flag." },
      { question: "Is green text readable on black?", answer: "Light and bright greens are: #33FF66 reaches 15.6:1 on black. CSS green #008000 only reaches 4.0:1." },
    ],
    paletteColors: ["#000000", "#006400", "#228B22", "#2E8B57", "#3CB371", "#90EE90"],
    palettes: [
      { name: "Terminal", useCase: "Developer tools, tech brands, retro computing", colors: ["#000000", "#0B1F0E", "#33FF66", "#A7F3B5", "#E8FFE8"], note: "Green-screen style. Phosphor green on black measures 15.6:1 and mint 16.1:1. White text on the green fails (1.3:1), so use black labels." },
      { name: "Forest night", useCase: "Outdoor brands, travel, eco products", colors: ["#0E1210", "#1F3A2B", "#2E6B4A", "#A3C9A8", "#F3F5F1"], note: "White on #2E6B4A measures 6.3:1 and on #1F3A2B 12.3:1. Sage #A3C9A8 on the near-black reads at 10.3:1." },
      { name: "Emerald and gold", useCase: "Luxury packaging, hotels, invitations", colors: ["#0A0A0A", "#0F4C3A", "#1F7A5C", "#C9A961", "#F5F2EA"], note: "Gold #C9A961 on black measures 8.7:1 and white on emerald #1F7A5C 5.2:1. The darkest green is too close to black (1.9:1) for text on it." },
      { name: "Sporty lime", useCase: "Fitness, sports, energy drinks", colors: ["#111111", "#2B2B2B", "#84CC16", "#D9F99D", "#FFFFFF"], note: "Lime on #111111 measures 9.5:1, but white on lime is only 1.9:1: put dark text on lime buttons." },
    ],
    sources: [
      { title: "Monochrome monitor: green screens, Wikipedia", href: "https://en.wikipedia.org/wiki/Monochrome_monitor" },
      { title: "Pan-African flag, Wikipedia", href: "https://en.wikipedia.org/wiki/Pan-African_flag" },
      cssNamedColors,
      wcagContrast,
    ],
  },

  "green-and-red": {
    title: "Do Green and Red Go Together? 4 Palettes",
    description:
      "Red and green are complementary, so they pop, but they're also the hardest pair for color-blind people. When they work, what goes with them, and 4 palettes.",
    answer:
      "Yes, with care. Red and green are complementary on the painter's color wheel, so each makes the other look brighter, which is why the pair reads instantly as Christmas. Two problems come with that: bright versions vibrate against each other, and about 1 in 12 men have red–green color blindness, for whom a red and a green of similar lightness can look almost the same. Use one deep and one light shade, and never rely on red versus green alone to carry meaning.",
    keyTakeaways: [
      "Red and green are complementary on the painter's wheel: the strongest hue contrast, and the classic Christmas pair.",
      "They are often close in lightness: red #FF0000 and green #008000 are only 1.2:1 apart, so text on either fails.",
      "Red–green color blindness affects up to 1 in 12 men; pair a dark green with a light red so they differ in lightness too.",
      "On a screen, the color halfway between red and green is yellow: red and green light mix to #FFFF00.",
    ],
    sections: [
      {
        title: "Do green and red go together?",
        body: "Yes. As complements they balance each other perfectly in hue: think holly berries, a red apple on a green leaf, watermelon, poinsettias. That strength is also the risk. Two bright, equally saturated versions seem to vibrate along their edge, and a red-and-green design can look like a holiday decoration whether you want that or not. Muted versions (brick red with olive, rose with sage, burgundy with forest green) look grown-up and work all year.",
      },
      {
        title: "Are red and green complementary colors?",
        body: "Yes, on the traditional painter's wheel with red, yellow and blue primaries: green is the mix of yellow and blue, the two primaries that aren't red. On the screen (RGB) wheel the exact opposites differ: red #FF0000 faces cyan, and green faces magenta. Even so, red and green sit 120° apart on a screen and still contrast strongly in hue. What they often don't contrast in is lightness: pure red and CSS green measure only 1.2:1, which is why one can't be used as text on the other.",
      },
      {
        title: "Red, green and color blindness",
        body: "Red–green color blindness is the most common kind, affecting up to 1 in 12 men and about 1 in 200 women. We ran the classic Christmas pair, red #B3001B and green #0B6E4F, through the Machado deuteranopia simulation: they become two muddy olives, #706410 and #605D51, just 1.1:1 apart. A dark green #1B5E20 with a light coral #FF8A80 stays 3.9:1 apart in the same simulation. So give the two colors different lightness, and in charts and status messages add labels or icons rather than relying on red vs green.",
      },
      {
        title: "What color is between red and green?",
        body: "It depends on the wheel. On a screen, halfway between red (0°) and green (120°) is yellow at 60°: shine red and green light together and you get yellow, #FFFF00. On the painter's wheel, the way from red to green passes through orange and yellow on one side, or purple and blue on the other. Mixed as paint, red and green cancel out into a brown or gray, as complementary colors do.",
      },
      {
        title: "What colors go with red and green?",
        body: "Cream, white and warm neutrals give the pair room to breathe. Gold or brass turns it festive and traditional; silver makes it wintry and modern. Natural wood, kraft paper and linen make it rustic. Navy or charcoal can replace black for a softer frame. If you want to avoid the Christmas look, use only one of the two as the main color and the other as a small accent, or move to softer versions like rose and sage.",
      },
      {
        title: "Red and green on a website",
        body: "Both colors carry white text in their deep versions: white on #B3001B measures 7.1:1 and on #0B6E4F 6.2:1. Never put one on the other for text (#B3001B on #0B6E4F is 1.1:1). For success and error states, keep red and green, but add an icon or a word (\"Saved\", \"Error\") so color-blind users get the message too. Check your colors in the color-blind simulator.",
      },
    ],
    faq: [
      { question: "Do green and red go together?", answer: "Yes. They are complementary on the painter's wheel. Use one deep and one light shade, or muted versions like burgundy and sage, so they don't vibrate." },
      { question: "Does green match with red?", answer: "Yes, as complements they balance each other. Bright versions look festive; muted versions such as brick and olive work all year." },
      { question: "Are red and green complementary colors?", answer: "Yes, on the traditional red-yellow-blue wheel. On a screen, red's exact opposite is cyan and green's is magenta, but red and green still contrast strongly in hue." },
      { question: "What color is in between green and red?", answer: "On a screen, yellow: red and green light mix to #FFFF00. Mixed as paint, red and green make a brown or gray." },
      { question: "What color goes with green and red?", answer: "Cream, white, gold, silver, natural wood, navy or charcoal. Use one of the pair as the main color to avoid a Christmas look." },
      { question: "Can color-blind people see red and green together?", answer: "Many can't tell them apart if they're similar in lightness. Up to 1 in 12 men have red–green color blindness, so pair a dark green with a light red and add labels." },
    ],
    paletteColors: ["#8B0000", "#B22222", "#DC143C", "#006400", "#228B22", "#2E8B57"],
    palettes: [
      { name: "Classic Christmas", useCase: "Holiday cards, seasonal campaigns, gift wrap", colors: ["#B3001B", "#0B6E4F", "#F4F1E8", "#D4AF37", "#1E1E1E"], note: "White on the red measures 7.1:1 and on the green 6.2:1. The red and green themselves are only 1.1:1 apart, so keep cream or gold between them." },
      { name: "Muted holiday", useCase: "Year-round: restaurants, interiors, heritage brands", colors: ["#9E2A2B", "#3A5A40", "#A3B18A", "#F2E8CF", "#2B2D2A"], note: "White on brick #9E2A2B measures 7.4:1 and on pine #3A5A40 7.7:1. Charcoal on the cream gives 11.3:1." },
      { name: "Watermelon", useCase: "Summer: food, drinks, kids' products", colors: ["#FF5A5F", "#2D6A4F", "#95D5B2", "#FFF1F2", "#1B4332"], note: "Dark green #1B4332 is the text color: 10.0:1 on the pink. White on the watermelon red is only 3.0:1." },
      { name: "Color-blind friendly", useCase: "Charts, dashboards, status colors", colors: ["#1B5E20", "#FF8A80", "#FFFFFF", "#263238", "#FFEBEE"], note: "A dark green with a light coral, 3.4:1 apart in lightness. In a deuteranopia simulation they stay 3.9:1 apart, where the classic Christmas pair drops to 1.1:1." },
    ],
    sources: [
      { title: "Color blindness: prevalence, Wikipedia", href: "https://en.wikipedia.org/wiki/Color_blindness" },
      { title: "Machado, Oliveira and Fernandes (2009): color vision deficiency simulation", href: "https://www.inf.ufrgs.br/~oliveira/pubs_files/CVD_Simulation/CVD_Simulation.html" },
      cssNamedColors,
      wcagContrast,
    ],
  },

  "black-and-gold": {
    title: "What Colors Go With Black and Gold? 4 Palettes",
    description:
      "The best colors to add to black and gold, from ivory and emerald to burgundy and teal, plus readable gold text, Art Deco and sport examples, and 4 palettes.",
    answer:
      "Black and gold is one of the most reliable luxury pairs, and it's easy to extend. The best colors to add are warm whites (ivory, cream), deep emerald or teal, burgundy, and soft gray. Gold reads very well on black: metallic gold #D4AF37 measures 9.9:1 against pure black, so it can carry text and logos on a dark background. On white it can't, at only 2.1:1.",
    keyTakeaways: [
      "Ivory, cream, emerald, deep teal, burgundy and soft gray are the best third colors for black and gold.",
      "Gold is readable on black (#D4AF37 is 9.9:1) but not on white (2.1:1).",
      "Use gold as the accent: thin lines, a logo, one highlight. Large flat areas of gold look yellow on screens.",
      "The Pittsburgh Steelers have played in black and gold since the club began.",
    ],
    sections: [
      {
        title: "Is black and gold a good combination?",
        body: "Yes. It's one of the quickest ways to make something look premium: black gives depth and weight, gold gives warmth and a sense of value. It suits luxury packaging, hotels, invitations, awards, watches and anything with an evening mood. The pair works best with restraint. A black surface with fine gold lines, a gold logo or a single gold button looks expensive; large flat areas of gold tend to look like yellow on a screen, because a screen can't show metallic shine.",
      },
      {
        title: "What colors go with black and gold?",
        body: "Ivory, cream and warm white are the classic partners and stop the palette from feeling heavy. Emerald and deep green add a jewel-tone richness; deep teal adds a cool contrast and a touch of Art Deco. Burgundy and wine make it warm and opulent, good for winter and weddings. Soft gray and taupe keep it modern and quiet. Blush pink softens it for weddings. Avoid bright primaries such as red, royal blue or lime, which make black and gold look like team colors.",
      },
      {
        title: "Black and gold in design and sport",
        body: "Black and gold is a staple of Art Deco-inspired design, with its geometric patterns, lacquer and gilt. It's also a sporting classic: the Pittsburgh Steelers have used black and gold since the club began, the one exception being the 1943 season, when they merged with the Philadelphia Eagles. If your palette is meant for something other than sport, adding ivory or emerald keeps it from looking like a jersey.",
      },
      {
        title: "Black and gold on a website",
        body: "On a black or near-black background, gold works for headings, icons and even short text: #D4AF37 measures 9.9:1 on pure black and 8.9:1 on #111111, and a pale gold like #E6D3A3 13.3:1. On a light background gold can't be text at all (#D4AF37 on white is 2.1:1); use black or a dark brown for text and gold only for lines and details. Gold buttons need black labels, since white on gold fails.",
      },
      {
        title: "Black and gold for weddings, rooms and outfits",
        body: "For weddings and events, black and gold with ivory is the classic formal palette; add blush for something softer or emerald for winter. In rooms, black cabinets or walls with brass hardware and warm wood look rich; keep gold to fittings and frames. In clothes, a black outfit with gold jewelry is timeless, and a little gold embroidery or a gold bag goes a long way.",
      },
    ],
    faq: [
      { question: "Is black and gold a good combination?", answer: "Yes. It's a classic luxury pair. Use black as the base and gold as the accent, and add ivory or cream so it doesn't feel heavy." },
      { question: "What colour goes well with black and gold?", answer: "Ivory, cream, warm white, emerald, deep teal, burgundy, soft gray or blush pink. Avoid bright primaries, which make it look like team colors." },
      { question: "What colors go with black and gold for a wedding?", answer: "Ivory or cream for elegance, blush pink for softness, emerald or burgundy for a winter wedding." },
      { question: "What does black and gold represent?", answer: "Luxury, wealth, prestige and formality. Gold signals value, and black adds depth and seriousness." },
      { question: "Is gold text readable on black?", answer: "Yes. Metallic gold #D4AF37 measures 9.9:1 on pure black. On white it's only 2.1:1, so don't use gold text on light backgrounds." },
      { question: "What are good hex codes for black and gold?", answer: "Black #000000 or a softer #111111, with metallic gold #D4AF37, a richer #C9A227 or a pale gold #E6D3A3. CSS gold #FFD700 is brighter and more yellow." },
    ],
    paletteColors: ["#000000", "#B8860B", "#DAA520", "#FFD700", "#EEE8AA", "#FFFFF0"],
    palettes: [
      { name: "Classic luxury", useCase: "Premium packaging, hotels, jewelry", colors: ["#0A0A0A", "#1C1A17", "#C9A227", "#E6D3A3", "#FAF7F0"], note: "Gold #C9A227 on the black measures 8.1:1 and pale gold #E6D3A3 13.3:1. White text on the gold fails (2.4:1)." },
      { name: "Art Deco", useCase: "Events, bars, invitations with a 1920s feel", colors: ["#111111", "#D4AF37", "#F5E6C8", "#1F4E5F", "#FFFFFF"], note: "Gold on #111111 measures 8.9:1. Deep teal #1F4E5F adds a cool note and carries white text at 9.0:1." },
      { name: "Game day", useCase: "Sport, fitness, bold promotions", colors: ["#121212", "#F5B700", "#FFFFFF", "#9EA3A8", "#2A2A2A"], note: "Bright gold on #121212 measures 10.3:1; white on it is only 1.8:1, so use black labels on gold." },
      { name: "Black, gold and emerald", useCase: "Winter events, luxury retail, restaurants", colors: ["#0B0B0B", "#0F5132", "#C5A253", "#EADFC8", "#F8F6F0"], note: "Emerald #0F5132 carries white at 9.3:1, and gold #C5A253 on black reaches 8.1:1." },
    ],
    sources: [
      { title: "Pittsburgh Steelers: logo and uniforms, Wikipedia", href: "https://en.wikipedia.org/wiki/Pittsburgh_Steelers" },
      cssNamedColors,
      wcagContrast,
    ],
  },

  "purple-and-orange": {
    title: "Are Purple and Orange Complementary? 4 Palettes",
    description:
      "No, purple and orange aren't complementary; they're two corners of the secondary triad. Why they still go together, what they mean, and 4 palettes.",
    answer:
      "No, purple and orange aren't complementary. On the painter's color wheel both are secondary colors, a third of the way round from each other, and with green they form a triad. Purple's complement is yellow and orange's is blue. They still go together well: the pair is lively and mixes warm with cool, and it's the core of Halloween palettes. Keep one color dominant and pick shades that differ in lightness, such as deep purple with bright orange.",
    keyTakeaways: [
      "Purple and orange are not complementary or split-complementary; with green they form the secondary triad.",
      "On a screen, CSS purple #800080 (300°) and orange #FFA500 (39°) are about 100° apart.",
      "Deep purple with bright orange gives strong lightness contrast: #FFA500 on #800080 measures 4.7:1.",
      "Orange, purple and black are Halloween colors; the Phoenix Suns have used purple and orange since 1968.",
    ],
    sections: [
      {
        title: "Are purple and orange complementary colors?",
        body: "No. Complementary colors sit directly opposite each other on the wheel. On the painter's wheel, with red, yellow and blue as primaries, purple's complement is yellow and orange's is blue. Purple and orange are both secondary colors, mixed from two primaries each, and they sit a third of the way round from each other; together with green they make a triad. They aren't split-complementary either: purple's split complements are yellow-orange and yellow-green. On a screen, CSS purple #800080 has a hue of 300° and orange #FFA500 a hue of 39°, about 100° apart.",
      },
      {
        title: "Do purple and orange go together?",
        body: "Yes. A triad pair has plenty of hue contrast without the head-on clash of true complements, and purple and orange add a second kind of contrast: one is cool and usually dark, the other warm and usually light. That's why deep purple with bright orange looks energetic and clear. The pair gets loud when both are bright and used in equal amounts, so let one lead, and soften the other or use it as an accent.",
      },
      {
        title: "What do orange and purple mean together?",
        body: "Orange is usually read as warm, energetic and friendly; purple as creative, imaginative and a little luxurious. Together they feel playful and bold. They are also two of the three Halloween colors, with black, and a sporting pair: the Phoenix Suns chose purple and orange as their main colors when the team was founded in 1968.",
      },
      {
        title: "What colors go with purple and orange?",
        body: "Black makes the pair dramatic and Halloween-like. Cream, warm white and light gray calm it down. Gold or yellow pushes it warm and festive. Green completes the triad for a bright, playful palette, best in small amounts. For a softer look, move to pastels: lavender with peach or apricot.",
      },
      {
        title: "Purple and orange on a website",
        body: "Use the darker color for surfaces and text and the brighter one for accents. Orange on purple works: #FFA500 on #800080 measures 4.7:1, and #F77F00 on a near-black purple #1A1423 6.8:1. White on deep purple #4B2C6B is 11.2:1. Orange buttons need dark labels, though: white on #F77F00 is only 2.6:1. Mixed as paint, purple and orange make a reddish brown.",
      },
      {
        title: "Purple and orange in rooms and outfits",
        body: "In a room, a deep aubergine wall with burnt orange or copper accents looks warm and rich; lavender with apricot looks soft and fresh. In clothes, a purple sweater with a rust or orange scarf is an easy autumn combination, and a lilac top with a peach skirt is a spring one. Avoid two neon shades together.",
      },
    ],
    faq: [
      { question: "Are purple and orange complementary colors?", answer: "No. Purple's complement is yellow and orange's is blue. Purple and orange are both secondary colors and form a triad with green." },
      { question: "Are purple and orange split-complementary?", answer: "No. Purple's split complements are yellow-orange and yellow-green. Purple and orange sit a third of the way round the wheel from each other." },
      { question: "Do purple and orange go together?", answer: "Yes. They mix warm and cool and usually differ in lightness, so deep purple with bright orange looks bold and clear. Let one color lead." },
      { question: "What does orange and purple mean?", answer: "Orange suggests warmth and energy, purple creativity and luxury, so together they feel playful and bold. With black they are the Halloween colors." },
      { question: "What colors go with purple and orange?", answer: "Black, cream, warm white, light gray, gold or yellow, and a little green to complete the triad." },
      { question: "What color do purple and orange make when mixed?", answer: "Mixed as paint, purple and orange make a reddish brown, since together they contain all three primaries." },
    ],
    paletteColors: ["#4B0082", "#800080", "#9370DB", "#FF8C00", "#FFA500", "#FFDAB9"],
    palettes: [
      { name: "Halloween", useCase: "Seasonal campaigns, parties, spooky events", colors: ["#1A1423", "#4B2C6B", "#F77F00", "#FCBF49", "#F8F4EC"], note: "Orange #F77F00 on the near-black measures 6.8:1 and amber #FCBF49 10.8:1. White on the purple #4B2C6B is 11.2:1." },
      { name: "Sunset sky", useCase: "Travel, music, posters", colors: ["#2D1E4A", "#7B4BA0", "#F28F3B", "#FFD6A5", "#FFF7EC"], note: "White on #7B4BA0 measures 6.2:1. Use the deep #2D1E4A for text on the orange (6.2:1) and on the peach (11.0:1)." },
      { name: "Court", useCase: "Sport, fitness, bold brands", colors: ["#2B1A5A", "#E56020", "#FFFFFF", "#8A8A8A", "#111111"], note: "White on the purple measures 15.0:1. White on orange #E56020 is 3.4:1, so use it for large numbers, or put black text on it (5.4:1)." },
      { name: "Lavender and peach", useCase: "Soft: beauty, stationery, kids' rooms", colors: ["#FBF7F4", "#CDB4DB", "#8E7CC3", "#F4A261", "#3D2C4E"], note: "Text in #3D2C4E measures 11.8:1 on the off-white and 6.1:1 on the peach. White on #8E7CC3 is only 3.6:1." },
    ],
    sources: [
      { title: "Phoenix Suns: original uniforms, Wikipedia", href: "https://en.wikipedia.org/wiki/Phoenix_Suns" },
      cssNamedColors,
      wcagContrast,
    ],
  },

  "red-and-black": {
    title: "What Colors Go With Red and Black? 4 Palettes",
    description:
      "What matches with red and black: white, gray, gold and more. Readable red on black, where the pair comes from in sport and flags, and 4 palettes with hex codes.",
    answer:
      "Red and black already go together; the question is what to add. White is the classic third color, and light gray, silver, gold and cream all work. Red and black is a bold, high-energy pair, worn by teams such as AC Milan, and red, black and green are the colors of the Pan-African flag. Watch the contrast: a deep red such as #C8102E measures only 3.5:1 on black, so set text in white rather than red.",
    keyTakeaways: [
      "White, light gray, silver, gold and cream are the best colors to add to red and black.",
      "Red on black is often too dark for text: #C8102E is 3.5:1, pure red #FF0000 5.2:1.",
      "White on a strong red reads well (#C8102E carries white at 5.8:1).",
      "AC Milan's red and black stripes earned it the nickname Rossoneri, \"the red and blacks\".",
    ],
    sections: [
      {
        title: "Is red and black a good combination?",
        body: "Yes, if you want drama and energy. Red is the most attention-grabbing hue and black makes it look even more intense, so the pair feels powerful, bold and a little aggressive. That suits sport, gaming, music, sales and bold fashion. It suits calm or friendly brands less well. The most common mistake is too much of both: let black or white carry most of the space and use red for the parts you want people to notice.",
      },
      {
        title: "What color matches with red and black?",
        body: "White is the classic third color: red, black and white is crisp and graphic, and it keeps text readable. Light gray and silver make it modern and technical. Gold makes it luxurious, especially with deep wine reds. Cream and oatmeal soften it into something warmer and more editorial. Denim blue works in clothes. Green also goes with red and black, though together the three read as the Pan-African flag.",
      },
      {
        title: "Red and black in sport and flags",
        body: "AC Milan, founded in 1899, plays in red and black stripes and is known as the Rossoneri, \"the red and blacks\". Many other teams, from football to basketball, use the pair for the same reason: it looks strong and stands out. Red, black and green are the colors of the Pan-African flag, which the Universal Negro Improvement Association adopted in 1920; that combination carries a specific meaning for many people.",
      },
      {
        title: "Red and black on a website",
        body: "Use red for shapes, buttons and a few highlights, and white or light gray for text on black. Red text on black is often too dark: #C8102E measures 3.5:1 and even pure red #FF0000 only 5.2:1. White on a strong red is better: 5.8:1 on #C8102E and 6.5:1 on #B71C1C. A bright coral red like #E63946 carries white at only 4.1:1, so use near-black labels (4.5:1) or a darker red.",
      },
      {
        title: "Red and black in rooms and outfits",
        body: "In clothes, a black outfit with one red piece (shoes, a bag, a lipstick, a coat) is a classic; head-to-toe red with black is bolder. In rooms, red and black together can feel heavy, so add plenty of white, gray or warm wood, and keep red to a sofa, a rug or art. Deep wine reds with black and brass make a moody, elegant dining room.",
      },
    ],
    faq: [
      { question: "What matches with red and black?", answer: "White, light gray, silver, gold, cream and denim blue. White is the classic choice and keeps text readable." },
      { question: "Is red and black a good combination?", answer: "Yes, for bold, energetic designs: sport, gaming, music, sales and fashion. Let one color dominate and add white or gray." },
      { question: "What colors go well with red and black for a room?", answer: "Plenty of white or light gray, warm wood and brass or gold. Keep red to a few pieces so the room doesn't feel heavy." },
      { question: "Is red text readable on black?", answer: "Often not. Deep red #C8102E on black is 3.5:1. Use white text on black, and white text on red buttons instead." },
      { question: "What does red and black mean?", answer: "Power, energy, passion and drama. With green, red and black are the colors of the Pan-African flag." },
    ],
    paletteColors: ["#000000", "#696969", "#8B0000", "#B22222", "#DC143C", "#FF0000"],
    palettes: [
      { name: "Classic bold", useCase: "Sport, gaming, sales banners", colors: ["#0D0D0D", "#1F1F1F", "#C8102E", "#F2F2F2", "#FFFFFF"], note: "White on the red measures 5.8:1, but the red on black is only 3.3:1: use red for buttons and shapes, white for text." },
      { name: "Editorial", useCase: "Magazines, portfolios, bold personal brands", colors: ["#111111", "#E63946", "#F1FAEE", "#A8A8A8", "#FFFFFF"], note: "Near-black on the off-white measures 17.6:1. White on #E63946 is 4.1:1, a little under AA; #111111 on it reaches 4.5:1." },
      { name: "Wine noir", useCase: "Restaurants, wine bars, luxury fashion", colors: ["#0B0B0B", "#3D0C11", "#8B1E2D", "#D9C5B2", "#F7F3EE"], note: "White on wine #8B1E2D measures 9.0:1, and the oatmeal #D9C5B2 on black 11.7:1." },
      { name: "Red, black and gold", useCase: "Awards, premium events, bold packaging", colors: ["#111111", "#B71C1C", "#D4AF37", "#F5F5F5", "#4A4A4A"], note: "Gold on black measures 8.9:1 and white on the red 6.5:1." },
    ],
    sources: [
      { title: "AC Milan: colours and badge, Wikipedia", href: "https://en.wikipedia.org/wiki/AC_Milan" },
      { title: "Pan-African flag, Wikipedia", href: "https://en.wikipedia.org/wiki/Pan-African_flag" },
      cssNamedColors,
      wcagContrast,
    ],
  },

  "black-and-orange": {
    title: "What Colors Go With Black and Orange? 4 Palettes",
    description:
      "What goes with black and orange: white, gray, cream and brown. Why the pair stands out, Halloween and monarch-butterfly examples, and 4 palettes with hex codes.",
    answer:
      "Black and orange are a high-contrast pair: bright orange #FFA500 measures 10.6:1 against black, so it stands out from far away. White and gray are the safest third colors; cream, brown and gold soften the pair. It's the classic Halloween combination, the pattern of the monarch butterfly and the colors of teams such as the San Francisco Giants. Use orange as the accent unless you want a Halloween look.",
    keyTakeaways: [
      "Orange is very readable on black: #FFA500 measures 10.6:1, #FF6B00 6.6:1 on #111111.",
      "White on orange is not: #FF6B00 carries white at only 2.8:1, so orange buttons need black labels.",
      "White, gray, cream, brown and gold go best with black and orange.",
      "The monarch butterfly's black, orange and white wings are warning colors.",
    ],
    sections: [
      {
        title: "Do black and orange go together?",
        body: "Yes, strongly. Orange is light and warm, black is dark and neutral, so the pair has huge lightness contrast and orange seems to glow. That's why it reads from far away, in sport, safety gear and seasonal campaigns. The pair's one drawback is that it's strongly tied to Halloween. To use it outside October, keep orange to accents, add white or gray, or choose a burnt orange or rust instead of pumpkin.",
      },
      {
        title: "What colors go with black and orange?",
        body: "White is the cleanest third color and the easiest for text. Light and mid grays make the pair industrial and modern. Cream and warm brown soften it and suit coffee, food and outdoor brands. Gold or mustard keeps it warm. A small amount of deep blue or teal adds a cool contrast, since blue is orange's complement. Purple with black and orange is the full Halloween palette.",
      },
      {
        title: "Black and orange in nature, Halloween and sport",
        body: "Nature uses the pair as a signal: the monarch butterfly's black, orange and white wings are warning colors, and tigers wear orange and black stripes. Orange and black are the colors of Halloween, from pumpkins to cats. In baseball, the San Francisco Giants have long worn orange and black uniforms, and many other teams use the pair because it's easy to spot.",
      },
      {
        title: "Black and orange on a website",
        body: "Orange works as text and icons on black: #FFA500 measures 10.6:1 and dark orange #FF8C00 9.0:1 on pure black, and bright orange #FF6B00 6.6:1 on #111111. White on orange is the problem: 2.8:1 on #FF6B00 and 2.6:1 on pumpkin #FF7518. Give orange buttons black or near-black labels. Burnt orange #CC5500 sits in between, at 4.3:1 with both white and black, so keep it for large type.",
      },
      {
        title: "Black and orange in rooms and outfits",
        body: "In clothes, black with a burnt orange or rust piece (a sweater, a scarf, a bag) looks autumnal rather than Halloween; bright orange with black is sporty. In rooms, black metal and leather with cognac, terracotta or rust textiles look warm and slightly industrial. Keep pure bright orange to small objects.",
      },
    ],
    faq: [
      { question: "What colors go with black and orange?", answer: "White, light gray, cream, warm brown and gold. A little deep blue or teal adds a cool contrast; purple makes it a full Halloween palette." },
      { question: "Does orange and black match?", answer: "Yes. They contrast strongly in lightness, so orange glows on black. Keep orange as the accent so it doesn't look like Halloween." },
      { question: "What is black and orange?", answer: "Usually the Halloween color scheme, or the pattern of animals like the monarch butterfly and the tiger. It's also a common team color pair." },
      { question: "What does black and orange mean?", answer: "Energy, warmth, attention and a bit of danger; in nature the pair is a warning signal. In October it simply means Halloween." },
      { question: "Is white text readable on orange?", answer: "Usually not. White on bright orange #FF6B00 is 2.8:1. Use black text on orange, or a darker burnt orange for large white type." },
    ],
    paletteColors: ["#000000", "#696969", "#FF4500", "#FF8C00", "#FFA500", "#FFDAB9"],
    palettes: [
      { name: "Halloween", useCase: "Seasonal campaigns, parties, events", colors: ["#0A0A0A", "#2B2B2B", "#FF7518", "#FFB347", "#F5F5F5"], note: "Pumpkin #FF7518 on black measures 7.3:1 and light orange #FFB347 11.1:1. White on the pumpkin is only 2.6:1." },
      { name: "Industrial", useCase: "Tools, construction, logistics, sport", colors: ["#111111", "#3A3A3A", "#FF6B00", "#D9D9D9", "#FFFFFF"], note: "Bright orange #FF6B00 on #111111 measures 6.6:1. Put black labels on orange buttons, not white (2.8:1)." },
      { name: "Monarch", useCase: "Nature, conservation, outdoor brands", colors: ["#1A1A1A", "#E86A17", "#F6A04D", "#FFFFFF", "#3B2F2F"], note: "Black, orange and white like the butterfly's wings. Orange #E86A17 on #1A1A1A measures 5.3:1." },
      { name: "Burnt orange luxe", useCase: "Coffee, leather goods, autumn interiors", colors: ["#121212", "#CC5500", "#E6B89C", "#F4EDE4", "#5C4033"], note: "White and black both reach 4.3:1 on burnt orange, just under AA, so use it for large type. Brown #5C4033 carries white at 9.3:1." },
    ],
    sources: [
      { title: "Monarch butterfly: appearance and warning coloration, Wikipedia", href: "https://en.wikipedia.org/wiki/Monarch_butterfly" },
      { title: "San Francisco Giants: uniforms, Wikipedia", href: "https://en.wikipedia.org/wiki/San_Francisco_Giants" },
      cssNamedColors,
      wcagContrast,
    ],
  },

  "blue-and-purple": {
    title: "Do Blue and Purple Go Together? 4 Palettes",
    description:
      "Blue and purple go together as calm neighbors on the color wheel. What color they make, the best third colors, readable shades, and 4 palettes with hex codes.",
    answer:
      "Yes. Blue and purple sit next to each other on the color wheel, so they always look related and calm: an analogous pair. The risk is that two dark versions merge, since CSS blue #0000FF and purple #800080 have almost the same luminance (1.0:1). Pick shades that differ in lightness, such as navy with lavender or periwinkle with deep violet, and add white or light gray.",
    keyTakeaways: [
      "Blue and purple are analogous: neighbors on the wheel, 60° apart on a screen (240° and 300°).",
      "The color between them is blue-violet or violet, around hue 270°: blueviolet #8A2BE2, rebeccapurple #663399.",
      "Similar-lightness blues and purples blur: #4169E1 against #800080 is 1.9:1, so vary the lightness.",
      "White, silver, pale pink, mint and a touch of gold are good third colors.",
    ],
    sections: [
      {
        title: "Do blue and purple go together?",
        body: "Yes. Purple is made from blue and red, so blue and purple share an ingredient and always look like family. Think twilight skies, hydrangeas, lavender fields under a blue sky, galaxy images. The pair is calm, cool and a little dreamy. Its weakness is low contrast: a royal blue next to a mid purple can look like a near-miss. Make one clearly lighter (navy and lavender, periwinkle and plum) and the pairing looks deliberate.",
      },
      {
        title: "Are blue and purple complementary?",
        body: "No, they are analogous: neighbors on the color wheel, not opposites. On the painter's wheel blue's complement is orange and purple's is yellow. On a screen, blue #0000FF sits at 240° and CSS purple #800080 at 300°, 60° apart. Analogous pairs feel harmonious and quiet rather than vibrant, which is why blue and purple suit wellness, tech and night-time themes.",
      },
      {
        title: "What color is purple and blue?",
        body: "Between blue and purple sits blue-violet, also called violet or indigo depending on the shade. On a screen, the halfway point is around hue 270°: CSS blueviolet #8A2BE2 is at 271° and rebeccapurple #663399 at 270°. Mixed as paint, blue and purple make a deeper blue-violet. Periwinkle is a pale version of the same in-between color.",
      },
      {
        title: "What colors go with blue and purple?",
        body: "White and light gray keep the pair fresh. Silver suits tech and winter themes. Pale pink or blush warms the palette and turns it into a sunset. Mint or teal adds a fresh, cool accent. A small amount of gold or warm yellow, the complement of purple, makes the blues and purples look richer. Avoid browns, which look dull next to cool colors.",
      },
      {
        title: "Blue and purple on a website",
        body: "Blues and purples are good at carrying white text in their deeper shades: white on indigo #4F46E5 measures 6.2:1, on #5B4BC4 6.4:1, and on blueviolet #8A2BE2 5.9:1. Lighter tints such as #A78BFA (2.7:1 with white) need dark text. Keep one hue for buttons and links and the other for backgrounds or illustrations, and don't set one on the other for text: royal blue #4169E1 on purple #800080 is only 1.9:1.",
      },
      {
        title: "Blue and purple in rooms and outfits",
        body: "In a bedroom, soft blue walls with lavender bedding, or a deep navy wall with plum velvet, both feel restful. In clothes, a navy suit with a lilac shirt, or a purple dress with a blue denim jacket, is easy. Keep the shades apart in lightness and add a neutral shoe or bag.",
      },
    ],
    faq: [
      { question: "Can blue and purple go together?", answer: "Yes. They are neighbors on the color wheel, so they always look related. Choose shades with different lightness, such as navy with lavender." },
      { question: "Do blue and purple match?", answer: "Yes, as an analogous pair. They look calm and harmonious; add white or a warm accent if the result feels too cool." },
      { question: "What color is purple and blue?", answer: "Blue-violet, around hue 270° on a screen: CSS blueviolet #8A2BE2 or rebeccapurple #663399. Mixed as paint they make a deeper blue-violet." },
      { question: "What colour goes well with blue and purple?", answer: "White, light gray, silver, pale pink, mint or teal, and a small touch of gold or warm yellow." },
      { question: "Are blue and purple complementary colors?", answer: "No. They are analogous: about 60° apart on the screen color wheel. Blue's complement is orange and purple's is yellow on the painter's wheel." },
    ],
    paletteColors: ["#000080", "#4169E1", "#6A5ACD", "#8A2BE2", "#800080", "#E6E6FA"],
    palettes: [
      { name: "Twilight", useCase: "Night-time, music, wellness and sleep apps", colors: ["#0F1033", "#2E2A6E", "#5B4BC4", "#9D8DF1", "#EDEBFF"], note: "White on #5B4BC4 measures 6.4:1, and lavender #9D8DF1 on the navy 6.5:1." },
      { name: "Periwinkle", useCase: "Tech and SaaS, education, calm brands", colors: ["#F7F8FC", "#C7D2FE", "#A78BFA", "#4F46E5", "#1E1B4B"], note: "Indigo #4F46E5 carries white at 6.2:1, and #1E1B4B text on the pale blue measures 10.7:1. White on the violet #A78BFA is only 2.7:1." },
      { name: "Galaxy", useCase: "Gaming, space themes, dark mode", colors: ["#0B0D21", "#1B2A6B", "#4C3AA8", "#8E7DF0", "#E4E0FF"], note: "White on #4C3AA8 measures 8.4:1, and #8E7DF0 on the near-black 5.7:1." },
      { name: "Hydrangea", useCase: "Weddings, florists, spring campaigns", colors: ["#FBFAFF", "#B8C6F2", "#8B9DE0", "#9B7BC8", "#3B3561"], note: "Soft blues and mauves. Use #3B3561 for text: 10.8:1 on the white and 6.6:1 on the pale blue." },
    ],
    sources: [cssNamedColors, wcagContrast],
  },

  "green-and-orange": {
    title: "Do Green and Orange Go Together? 4 Palettes",
    description:
      "Green and orange go together, though they're neither analogous nor complementary. What they make, the best third colors, the Irish flag, and 4 palettes.",
    answer:
      "Yes, green and orange go together, and they make a lively, natural pair: citrus fruit, autumn leaves, pumpkins on the vine. They aren't analogous or complementary. On the painter's wheel both are secondary colors, a third of the way apart, and with purple they form a triad; green's complement is red and orange's is blue. Choose one muted and one bright, such as olive with bright orange or deep green with peach, and add cream or white.",
    keyTakeaways: [
      "Green and orange are neither analogous nor complementary; with purple they form the secondary triad.",
      "On a screen, green #008000 (120°) and orange #FFA500 (39°) are about 80° apart.",
      "They clash only when both are neon and equally bright; one muted, one bright looks natural.",
      "Green, white and orange are the colors of the Irish flag.",
    ],
    sections: [
      {
        title: "Do green and orange go together?",
        body: "Yes. Nature pairs them all the time: oranges on the tree, carrots with their tops, pumpkins on green vines, autumn leaves among evergreens. The pair feels fresh, warm and a little playful. The way to make it look good is to vary intensity: a muted olive or sage with a bright orange, or a strong green with a soft peach or apricot. Two neon versions at the same lightness are the one combination that looks harsh.",
      },
      {
        title: "Are green and orange complementary or analogous?",
        body: "Neither. Analogous colors are neighbors on the wheel and complementary colors are opposites; green and orange are a third of the way round from each other. On the painter's wheel, with red, yellow and blue primaries, green and orange are both secondary colors (green is blue plus yellow, orange is red plus yellow), and with purple they form a triad. Green's complement is red and orange's is blue. On a screen, CSS green #008000 sits at 120° and orange #FFA500 at 39°, about 80° apart.",
      },
      {
        title: "Do green and orange clash?",
        body: "Not as a rule. They share yellow as an ingredient, which helps them sit together, and they contrast in temperature: green is cool, orange is warm. They do clash when both are very saturated and similar in lightness, like a neon green next to a neon orange, because the eye can't tell which one should lead. Lower the saturation of one or make one much darker and the clash disappears. Mixed as paint, green and orange make a brown or olive-brown.",
      },
      {
        title: "Green, white and orange: the Irish flag",
        body: "The best-known green-and-orange design is the Irish tricolour: green, white and orange in vertical bands. The green stands for the Roman Catholic majority, the orange for the Protestant supporters of William of Orange, and the white between them for a lasting peace between the two. If you use green, white and orange together, many people will read it as Irish.",
      },
      {
        title: "What colors go with green and orange?",
        body: "Cream, warm white and natural wood are the easiest partners. Brown and tan make the pair earthy and autumnal. Navy or deep teal adds a cool anchor and suits sport and outdoor brands. A soft yellow sits between the two and blends them. Avoid adding red or purple unless you want a very loud, carnival palette.",
      },
      {
        title: "Green and orange on a website",
        body: "Use the green or a dark neutral for text and structure, and orange for accents. The two at full strength are a poor text pair: green #008000 on orange #FFA500 is 2.6:1. White on orange fails too (2.4:1 on #F28C28), so put dark text on orange or use it for shapes only. Deep greens carry white well (#1F4D2B text on cream is 9.2:1), and a deep blue-green such as #264653 reaches 9.9:1 on cream and 4.4:1 on orange.",
      },
    ],
    faq: [
      { question: "Do green and orange go together?", answer: "Yes. They look natural and lively together. Make one muted and one bright, such as olive with bright orange, and add cream or white." },
      { question: "Are green and orange complementary colors?", answer: "No. Green's complement is red and orange's is blue. Green and orange are both secondary colors and form a triad with purple." },
      { question: "Are green and orange analogous?", answer: "No. Analogous colors are neighbors on the wheel. Green and orange are a third of the way apart, with yellow between them." },
      { question: "Do green and orange clash?", answer: "Only when both are neon and equally bright. One muted and one bright shade look natural together." },
      { question: "What color goes with green and orange?", answer: "Cream, warm white, natural wood, brown, tan, navy or deep teal, and a soft yellow to blend them." },
      { question: "What do green and orange make?", answer: "Mixed as paint, green and orange make a brown or olive-brown." },
    ],
    paletteColors: ["#006400", "#228B22", "#6B8E23", "#D2691E", "#FF8C00", "#FFA500"],
    palettes: [
      { name: "Citrus grove", useCase: "Food and drink, farmers markets, summer", colors: ["#1F4D2B", "#4C9A2A", "#F28C28", "#FFD08A", "#FFF8EC"], note: "Dark green #1F4D2B on the cream measures 9.2:1. Use the orange for shapes and accents: neither white (2.4:1) nor the dark green (3.9:1) is enough for small text on it." },
      { name: "Earthy autumn", useCase: "Outdoor brands, interiors, fall campaigns", colors: ["#3A4A2F", "#6B7B3A", "#C8692C", "#E9C79A", "#F7F1E6"], note: "Olive #3A4A2F on the cream measures 8.4:1. White on olive #6B7B3A is 4.6:1, on the rust #C8692C only 3.8:1." },
      { name: "Fresh and zesty", useCase: "Health food, kids' brands, apps", colors: ["#FFFDF7", "#90BE6D", "#43AA8B", "#F8961E", "#264653"], note: "Deep blue-green #264653 is the text color: 9.9:1 on the cream and 4.4:1 on the orange." },
      { name: "Green, white and orange", useCase: "Irish-themed events, St. Patrick's Day", colors: ["#1A8F5A", "#FFFFFF", "#F48A3A", "#F5F5F0", "#1E2B24"], note: "Inspired by the Irish tricolour. White on the green is 4.1:1, fine for large type; #1E2B24 on the orange reaches 5.9:1." },
    ],
    sources: [
      { title: "Flag of Ireland: symbolism, Wikipedia", href: "https://en.wikipedia.org/wiki/Flag_of_Ireland" },
      cssNamedColors,
      wcagContrast,
    ],
  },
};
