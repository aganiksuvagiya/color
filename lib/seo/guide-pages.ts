// Text content for the keyword guide pages, kept here (not in the page files) so the pages, the
// structured data and /llms-full.txt all read the same answers.

export const colorMixing = {
  path: "/color-mixing-chart",
  title: "Color Mixing Chart: What Colors Make Any Color",
  answer: "With paint, red + yellow makes orange, yellow + blue makes green and blue + red makes purple. Brown comes from mixing a primary color with its opposite on the color wheel, for example orange + blue. A color mixing chart shows which colors combine to make a new one, and HueFlow's mixer lets you try any ratio in paint (RYB), light (RGB) or ink (CMYK).",
  steps: [
  "Choose a mixing model: Paint (RYB) for paint and art, Light (RGB) for screens, or Ink (CMYK) for print.",
  "Set how many parts of each color to use with the sliders. Parts are relative, so 2 red + 2 yellow is the same orange as 1 red + 1 yellow.",
  "Read the result: the swatch, its closest color name and the HEX, RGB and HSL codes.",
  "Copy the code, or tap any recipe in the chart to load it, then adjust the ratio until the color is right.",
],
  tips: [
  { title: "Start with the lighter color", body: "Add small amounts of the darker or stronger color to the lighter one. It takes far less dark paint to change a light color than the other way around." },
  { title: "Add black slowly", body: "Black overpowers other pigments quickly. To darken a color, try mixing in a little of its complementary color first, then use black only to finish." },
  { title: "Mix opposites for neutrals", body: "Colors opposite each other on the color wheel (red and green, blue and orange, yellow and purple) cancel out into browns and grays, which makes natural-looking shadows." },
  { title: "Keep it to two or three colors", body: "Every extra pigment dulls the mix. A color mixed from many paints tends to turn muddy." },
  { title: "Write the ratio down", body: "Note the parts you used so you can repeat the color, and mix more than you need, because matching a mix a second time is hard." },
  { title: "Test before you commit", body: "Paint a small swatch and let it dry. Paint usually dries a little darker, and the on-screen swatches here are estimates, not pigment-accurate matches." },
],
  faq: [
  {
    question: "What colors make brown?",
    answer:
      "Brown is made by mixing all three primary colors, or by mixing a primary with its opposite on the color wheel: orange + blue, red + green or yellow + purple. For a basic brown, try 2 parts orange (red + yellow) to 1 part blue, then add more orange for a warmer brown or more blue for a cooler one.",
  },
  {
    question: "What two colors make purple?",
    answer:
      "Red and blue make purple when mixing paint. Use more red for a plum or magenta-leaning purple, more blue for violet or indigo, and add white to lighten it into lavender.",
  },
  {
    question: "What colors make pink?",
    answer:
      "Pink is red mixed with white. Use 1 part red to 2 parts white for a soft pink, less white for a hot pink, and a touch of blue for a cooler rose.",
  },
  {
    question: "What colors make gray?",
    answer:
      "Gray is black mixed with white, for example 1 part black to 4 parts white for a light gray. You can also mix two opposite colors with white, such as orange and blue, for a warmer or cooler gray.",
  },
  {
    question: "What are the primary colors?",
    answer:
      "In paint and traditional art the primary colors are red, yellow and blue (RYB). Printers use cyan, magenta and yellow (CMY, plus black for CMYK), and screens use red, green and blue light (RGB). Each model has its own primaries because each mixes color differently.",
  },
  {
    question: "Why does mixing paint give different results than mixing light?",
    answer:
      "Paint and ink are subtractive: pigments absorb light, so mixing more makes a color darker. Screens are additive: they add light, so mixing red and green light makes yellow and mixing all three makes white. That is why the Paint, Light and Ink modes of the mixer give different answers.",
  },
  {
    question: "How do I make a color lighter or darker?",
    answer:
      "Add white to make a tint (lighter), black to make a shade (darker), or gray to make a tone (less intense). Add the new color a little at a time, since small amounts change the mix a lot.",
  },
  {
    question: "Are the colors in the chart exact?",
    answer:
      "They are on-screen estimates based on the artist's red-yellow-blue (RYB) model, not measurements of real paint. Pigments, brands and mediums vary, so mix a small test batch and adjust by eye.",
  },
],
};

export const colorWheel = {
  path: "/color-wheel",
  title: "Color Wheel Chart: Primary, Secondary & Tertiary Colors",
  answer: "The color wheel arranges 12 colors by hue: 3 primary colors (red, yellow, blue), 3 secondary colors (orange, green, violet) and 6 tertiary colors. Colors opposite each other are complementary, neighbors are analogous, and evenly spaced colors form triadic and tetradic schemes.",
  steps: [
  "Pick a wheel: the artist wheel (red, yellow, blue) for paint and traditional design, or the screen wheel (red, green, blue) for digital work.",
  "Click a color on the wheel to select it. Its name, type, temperature and HEX, RGB and HSL codes appear beside it.",
  "Choose a scheme (complementary, split-complementary, analogous, triadic or tetradic) to see which wheel colors work with your base color.",
  "Copy the codes, or open the scheme in the palette generator to refine it and export.",
],
  faq: [
  {
    question: "What is a color wheel?",
    answer:
      "A color wheel is a circular diagram that arranges colors by hue so you can see how they relate. Designers and artists use it to find color combinations, such as complementary and analogous colors, that look balanced together.",
  },
  {
    question: "What are the primary, secondary and tertiary colors?",
    answer:
      "On the traditional artist wheel the primary colors are red, yellow and blue. The secondary colors are orange, green and violet, each made by mixing two primaries. The six tertiary colors are red-orange, yellow-orange, yellow-green, blue-green, blue-violet and red-violet, each made by mixing a primary with its neighboring secondary.",
  },
  {
    question: "What are complementary colors?",
    answer:
      "Complementary colors sit directly opposite each other on the color wheel, such as red and green, blue and orange, or yellow and violet. Together they create the strongest contrast, so they work best with one color dominant and the other used as an accent.",
  },
  {
    question: "What are analogous colors?",
    answer:
      "Analogous colors are neighbors on the color wheel, for example yellow, yellow-orange and orange. They share a hue family, so they look calm and cohesive, and they appear often in nature.",
  },
  {
    question: "What are warm and cool colors?",
    answer:
      "Warm colors are the reds, oranges and yellows (from red-violet to yellow on the wheel) and feel energetic. Cool colors are the greens, blues and violets (from yellow-green to violet) and feel calm. Many colors lean either way depending on their bias.",
  },
  {
    question: "How many colors are on the color wheel?",
    answer:
      "The standard color wheel shows 12 colors: 3 primary, 3 secondary and 6 tertiary. In reality hue is continuous, so a wheel can show many more steps, but 12 is enough to find the main color relationships.",
  },
  {
    question: "What is the difference between the RYB and RGB color wheels?",
    answer:
      "The RYB wheel is the artist's wheel, built on red, yellow and blue pigments. The RGB wheel is for screens, built on red, green and blue light. They place hues differently, which is why the complement of red is green on the artist wheel but cyan on the RGB wheel.",
  },
  {
    question: "How do I choose colors with a color wheel?",
    answer:
      "Pick one base color, then choose a scheme: complementary for contrast, analogous for harmony, triadic for balanced variety, or tetradic for a richer palette. Use one color as the main color, and the others for accents. Then check text contrast before using the colors in a design.",
  },
  {
    question: "Is the HueFlow color wheel free?",
    answer: "Yes. The color wheel, the calculator and every other HueFlow tool are free to use, with no signup.",
  },
],
};

export const pastelColors = {
  path: "/pastel-colors",
  title: "Pastel Colors: Names, Hex Codes & Pastel Color Palettes",
  answer: "Pastel colors are soft, light colors made by mixing a hue with white. A common pastel pink is #FFD1DC, baby blue is #89CFF0 and lavender is #E6E6FA. HueFlow lists 47 pastel colors with HEX, RGB and HSL codes, plus pastel palettes and a tool that turns any color into a pastel.",
  faq: [
  {
    question: "What are pastel colors?",
    answer:
      "Pastel colors are soft, light colors made by mixing a hue with a lot of white. In HSL they usually have high lightness (mostly between about 65% and 95%) and moderate saturation, which gives them a gentle, airy look.",
  },
  {
    question: "What is the hex code for pastel pink?",
    answer:
      "A common pastel pink is #FFD1DC. Other popular pastel pinks are baby pink (#F4C2C2), cotton candy (#FFBCD9) and light pink (#FFB6C1). Pastel colors have no single official hex code, so shades vary slightly between sources.",
  },
  {
    question: "What are the main pastel colors?",
    answer:
      "The most common pastel colors are pastel pink, peach, pastel yellow, mint green, baby blue, lavender and lilac. Pastel orange, pastel purple, periwinkle and light neutrals such as cream and ivory round out most pastel palettes.",
  },
  {
    question: "How do I make a color pastel?",
    answer:
      "Mix the color with white. With paint, add white a little at a time until the color is soft and light. On screen, mix the color toward white (in CSS, color-mix(in srgb, #3B82F6 35%, white)) or raise the lightness in HSL to around 80 to 90%.",
  },
  {
    question: "Which colors go well with pastels?",
    answer:
      "Other pastels with a similar lightness mix well, for example pink with mint and cream or blue with lavender and ivory. Soft neutrals such as ivory, beige and light gray give the palette breathing room, and one darker color, such as charcoal or navy, helps with text and contrast.",
  },
  {
    question: "Are pastel colors good for websites and apps?",
    answer:
      "Yes, as backgrounds, cards and accents. Use dark text on pastel backgrounds, because white text on a pastel usually fails the WCAG 4.5:1 contrast minimum. Keep one stronger color for buttons and links so they stand out.",
  },
  {
    question: "What is the difference between pastel, muted and neon colors?",
    answer:
      "Pastel colors are light and soft, muted colors are low in saturation and can be any lightness, and neon colors are extremely saturated and bright. Pastels are made lighter, muted colors are made grayer, and neons are made more intense.",
  },
  {
    question: "Are the pastel hex codes exact?",
    answer:
      "Color names are conventions, so the same name can map to slightly different hex codes on different sites. The values here are common, widely used ones, and you can copy any of them in HEX, RGB or HSL.",
  },
],
};
