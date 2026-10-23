import { getContrastRatio } from "./accessibility";
import { hexToHsl } from "./color-utils";

// "Shades of <color>" pages (/shades-of-blue, ...). Shade names use the common
// web/design names for each hex (CSS named colors, Crayola, standard pigment and
// paint names), so the page matches what people search for ("shades of blue names").

export type ShadePalette = { name: string; useCase: string; colors: string[] };
export type ShadeFaq = { question: string; answer: string };

export type ShadeFamily = {
  slug: string;
  name: string;
  /** Representative swatch for hubs and the hero. */
  hex: string;
  /** Alternate spellings people search for ("grey"). */
  aliases?: string[];
  intro: string;
  usage: string;
  shades: [name: string, hex: string][];
  palettes: ShadePalette[];
  faq: ShadeFaq[];
};

export type Shade = {
  name: string;
  hex: string;
  rgb: string;
  hsl: string;
  lightness: number;
  group: "light" | "medium" | "dark";
};

const families: ShadeFamily[] = [
  {
    slug: "blue",
    name: "Blue",
    hex: "#1E90FF",
    intro:
      "Shades of blue run from airy Alice Blue and Baby Blue through classic Royal Blue and Cobalt to deep Navy and Midnight Blue. Every shade below has its name, HEX, RGB and HSL code - click any swatch to copy it.",
    usage:
      "Blue is the most-used brand color in tech, finance and healthcare because it reads as trustworthy and calm. Use light blues for backgrounds and hover states, mid blues (Dodger Blue, Royal Blue) for buttons and links, and navy or midnight blue for text and dark headers - navy passes WCAG contrast on white far more easily than mid blues.",
    shades: [
      ["Alice Blue", "#F0F8FF"], ["Periwinkle", "#CCCCFF"], ["Columbia Blue", "#B9D9EB"], ["Powder Blue", "#B0E0E6"],
      ["Light Blue", "#ADD8E6"], ["Light Steel Blue", "#B0C4DE"], ["Baby Blue", "#89CFF0"], ["Sky Blue", "#87CEEB"],
      ["Light Sky Blue", "#87CEFA"], ["Electric Blue", "#7DF9FF"], ["Carolina Blue", "#4B9CD3"], ["Cornflower Blue", "#6495ED"],
      ["Air Force Blue", "#5D8AA8"], ["Deep Sky Blue", "#00BFFF"], ["Dodger Blue", "#1E90FF"], ["Azure", "#007FFF"],
      ["Steel Blue", "#4682B4"], ["Royal Blue", "#4169E1"], ["Cerulean", "#007BA7"], ["Denim", "#1560BD"],
      ["Teal Blue", "#367588"], ["Ocean Blue", "#006994"], ["Persian Blue", "#1C39BB"], ["Sapphire", "#0F52BA"],
      ["Cobalt Blue", "#0047AB"], ["Blue", "#0000FF"], ["Medium Blue", "#0000CD"], ["Egyptian Blue", "#1034A6"],
      ["Indigo Dye", "#00416A"], ["Ultramarine", "#120A8F"], ["Yale Blue", "#00356B"], ["Dark Blue", "#00008B"],
      ["Prussian Blue", "#003153"], ["Navy Blue", "#000080"], ["Oxford Blue", "#002147"], ["Midnight Blue", "#191970"],
      ["Space Cadet", "#1D2951"],
    ],
    palettes: [
      { name: "Trustworthy SaaS", useCase: "Product UI, dashboards, fintech", colors: ["#F0F8FF", "#87CEFA", "#1E90FF", "#0047AB", "#191970"] },
      { name: "Coastal Calm", useCase: "Travel, wellness, lifestyle", colors: ["#B0E0E6", "#89CFF0", "#4682B4", "#006994", "#002147"] },
      { name: "Navy & Sky", useCase: "Corporate sites, finance, law", colors: ["#B9D9EB", "#6495ED", "#4169E1", "#000080", "#1D2951"] },
      { name: "Electric Night", useCase: "Gaming, tech launches, events", colors: ["#7DF9FF", "#00BFFF", "#007FFF", "#120A8F", "#191970"] },
    ],
    faq: [
      { question: "What are the main shades of blue?", answer: "The most common shades of blue are Baby Blue (#89CFF0), Sky Blue (#87CEEB), Cornflower Blue (#6495ED), Royal Blue (#4169E1), Cobalt Blue (#0047AB), Sapphire (#0F52BA), Navy Blue (#000080) and Midnight Blue (#191970)." },
      { question: "What is the darkest shade of blue?", answer: "Navy Blue (#000080), Oxford Blue (#002147) and Midnight Blue (#191970) are among the darkest named blues. They are dark enough to use for body text on white backgrounds." },
      { question: "What is the lightest shade of blue?", answer: "Alice Blue (#F0F8FF) is the lightest common named blue - it is almost white with a cool blue tint, which makes it a popular page background." },
      { question: "What is the difference between navy blue and royal blue?", answer: "Navy Blue (#000080) is a very dark, low-lightness blue, while Royal Blue (#4169E1) is a brighter, more saturated mid blue. Navy works for text and dark backgrounds; Royal Blue works for buttons and accents." },
    ],
  },
  {
    slug: "pink",
    name: "Pink",
    hex: "#FF69B4",
    intro:
      "Shades of pink range from barely-there Lavender Blush and Pale Pink through Bubblegum, Flamingo and Hot Pink to bold Fuchsia, Raspberry and Ruby. Every shade below lists its name, HEX, RGB and HSL code - click a swatch to copy it.",
    usage:
      "Pink signals warmth, playfulness and care, which is why beauty, fashion and lifestyle brands lean on it. Pale pinks make soft backgrounds, mid pinks (Flamingo, Hot Pink) work as accents, and deep pinks like Raspberry or Medium Violet Red carry enough contrast for buttons and headlines.",
    shades: [
      ["Lavender Blush", "#FFF0F5"], ["Misty Rose", "#FFE4E1"], ["Pale Pink", "#FADADD"], ["Rose Quartz", "#F7CAC9"],
      ["Pink", "#FFC0CB"], ["Bubblegum", "#FFC1CC"], ["Light Pink", "#FFB6C1"], ["Cotton Candy", "#FFBCD9"],
      ["Baby Pink", "#F4C2C2"], ["Carnation Pink", "#FFA6C9"], ["Mauvelous", "#EF98AA"], ["Pastel Pink", "#DEA5A4"],
      ["Puce", "#CC8899"], ["Old Rose", "#C08081"], ["Flamingo Pink", "#FC8EAC"], ["Salmon Pink", "#FF91A4"],
      ["Taffy", "#FA86C4"], ["Coral Pink", "#F88379"], ["Persian Pink", "#F77FBE"], ["Watermelon", "#FC6C85"],
      ["Hot Pink", "#FF69B4"], ["Thulian Pink", "#DE6FA1"], ["Pale Violet Red", "#DB7093"], ["Brilliant Rose", "#FF55A3"],
      ["French Rose", "#F64A8A"], ["Blush", "#DE5D83"], ["Mulberry", "#C54B8C"], ["Deep Pink", "#FF1493"],
      ["Shocking Pink", "#FC0FC0"], ["Barbie Pink", "#E0218A"], ["Fuchsia", "#FF00FF"], ["Rose", "#FF007F"],
      ["Cerise", "#DE3163"], ["Ruby", "#E0115F"], ["Raspberry", "#E30B5C"], ["Medium Violet Red", "#C71585"],
      ["Amaranth", "#E52B50"],
    ],
    palettes: [
      { name: "Soft Blush", useCase: "Beauty, skincare, weddings", colors: ["#FFF0F5", "#FADADD", "#F7CAC9", "#DE5D83", "#5C1F33"] },
      { name: "Candy Pop", useCase: "Kids, desserts, creator brands", colors: ["#FFBCD9", "#FFA6C9", "#FF69B4", "#FF1493", "#7DF9FF"] },
      { name: "Dusty Rose Editorial", useCase: "Fashion, interiors, blogs", colors: ["#F4C2C2", "#DEA5A4", "#C08081", "#CC8899", "#3B2F2F"] },
      { name: "Hot Pink Night", useCase: "Events, music, nightlife", colors: ["#FFC0CB", "#FF55A3", "#E0218A", "#C71585", "#1B1B1B"] },
    ],
    faq: [
      { question: "What are the most popular shades of pink?", answer: "Popular shades of pink include Baby Pink (#F4C2C2), Light Pink (#FFB6C1), Bubblegum (#FFC1CC), Flamingo Pink (#FC8EAC), Hot Pink (#FF69B4), Deep Pink (#FF1493), Fuchsia (#FF00FF) and Raspberry (#E30B5C)." },
      { question: "What is the difference between hot pink and fuchsia?", answer: "Hot Pink (#FF69B4) is a bright, slightly soft pink, while Fuchsia (#FF00FF) is pure magenta with no white mixed in, so it looks more purple and far more intense." },
      { question: "What is a dusty pink color code?", answer: "Dusty pinks are muted, grey-leaning pinks such as Pastel Pink (#DEA5A4), Old Rose (#C08081) and Puce (#CC8899). They feel calmer and more grown-up than bright pinks." },
      { question: "Is pink text readable on white?", answer: "Light and mid pinks are not - they fail WCAG contrast. For pink text on white, use a deep pink such as Medium Violet Red (#C71585) or Raspberry (#E30B5C), or keep pink for backgrounds and accents." },
    ],
  },
  {
    slug: "purple",
    name: "Purple",
    hex: "#9370DB",
    intro:
      "Shades of purple stretch from pale Lavender, Thistle and Lilac through Amethyst and Rebecca Purple to rich Indigo, Byzantium and Tyrian Purple. Each shade below has its name, HEX, RGB and HSL code - click any swatch to copy it.",
    usage:
      "Purple reads as creative, premium and a little mysterious, so it is common for AI products, beauty, luxury and creator tools. Use lavender and lilac for soft backgrounds, amethyst and medium purple for accents, and indigo or Russian Violet for dark surfaces and text.",
    shades: [
      ["Lavender", "#E6E6FA"], ["Thistle", "#D8BFD8"], ["Lilac", "#C8A2C8"], ["Wisteria", "#C9A0DC"],
      ["Mauve", "#E0B0FF"], ["Plum", "#DDA0DD"], ["Light Orchid", "#E6A8D7"], ["Violet", "#EE82EE"],
      ["Heliotrope", "#DF73FF"], ["Orchid", "#DA70D6"], ["Lavender Purple", "#967BB6"], ["Medium Purple", "#9370DB"],
      ["Amethyst", "#9966CC"], ["Medium Orchid", "#BA55D3"], ["Purpureus", "#9A4EAE"], ["Royal Purple", "#7851A9"],
      ["Slate Blue", "#6A5ACD"], ["Blue Violet", "#8A2BE2"], ["Dark Orchid", "#9932CC"], ["Dark Violet", "#9400D3"],
      ["Electric Purple", "#BF00FF"], ["Purple Heart", "#69359C"], ["Rebecca Purple", "#663399"], ["Grape", "#6F2DA8"],
      ["Ultra Violet", "#5F4B8B"], ["Purple", "#800080"], ["Dark Magenta", "#8B008B"], ["Byzantium", "#702963"],
      ["Palatinate Purple", "#682860"], ["Imperial Purple", "#602F6B"], ["Eggplant", "#614051"], ["Tyrian Purple", "#66023C"],
      ["Dark Slate Blue", "#483D8B"], ["Indigo", "#4B0082"], ["Russian Violet", "#32174D"], ["Dark Purple", "#301934"],
    ],
    palettes: [
      { name: "Lavender Fields", useCase: "Wellness, candles, spa", colors: ["#E6E6FA", "#D8BFD8", "#C8A2C8", "#967BB6", "#32174D"] },
      { name: "AI Gradient Stack", useCase: "AI products, SaaS, tech", colors: ["#E0B0FF", "#9370DB", "#8A2BE2", "#4B0082", "#1B1B1B"] },
      { name: "Royal Velvet", useCase: "Luxury, jewelry, events", colors: ["#DDA0DD", "#7851A9", "#702963", "#66023C", "#F5F5DC"] },
      { name: "Twilight Orchid", useCase: "Beauty, music, creators", colors: ["#E6A8D7", "#DA70D6", "#9932CC", "#5F4B8B", "#301934"] },
    ],
    faq: [
      { question: "What are the main shades of purple?", answer: "Common shades of purple include Lavender (#E6E6FA), Lilac (#C8A2C8), Amethyst (#9966CC), Medium Purple (#9370DB), Rebecca Purple (#663399), Purple (#800080), Indigo (#4B0082) and Byzantium (#702963)." },
      { question: "What is the difference between violet and purple?", answer: "Violet sits closer to blue on the spectrum and is usually lighter and brighter (CSS Violet is #EE82EE), while purple sits between red and blue and is deeper (CSS Purple is #800080)." },
      { question: "What is the darkest shade of purple?", answer: "Very dark purples include Russian Violet (#32174D), Dark Purple (#301934) and Indigo (#4B0082). They work as dark-mode surfaces and as text colors on light backgrounds." },
      { question: "What is lavender's hex code?", answer: "The standard web Lavender is #E6E6FA - a very pale, cool purple that works well as a background tint." },
    ],
  },
  {
    slug: "green",
    name: "Green",
    hex: "#2E8B57",
    intro:
      "Shades of green cover everything from Honeydew and Mint Cream to Sage, Emerald and Kelly Green, down to Forest, Hunter and British Racing Green. Every shade below has its name, HEX, RGB and HSL code - click a swatch to copy it.",
    usage:
      "Green means growth, health and 'go', so it fits finance, wellness, food and sustainability brands - and it is the default success color in product UI. Pair a mid green (Emerald, Sea Green) for actions with a dark green (Forest, Hunter) for text, and keep neon greens like Lime for small highlights only.",
    shades: [
      ["Honeydew", "#F0FFF0"], ["Mint Cream", "#F5FFFA"], ["Tea Green", "#D0F0C0"], ["Celadon", "#ACE1AF"],
      ["Pale Green", "#98FB98"], ["Mint Green", "#98FF98"], ["Light Green", "#90EE90"], ["Sage", "#BCB88A"],
      ["Pistachio", "#93C572"], ["Moss Green", "#8A9A5B"], ["Yellow Green", "#9ACD32"], ["Lime", "#00FF00"],
      ["Chartreuse", "#7FFF00"], ["Lawn Green", "#7CFC00"], ["Spring Green", "#00FF7F"], ["Malachite", "#0BDA51"],
      ["Lime Green", "#32CD32"], ["Emerald", "#50C878"], ["Mint", "#3EB489"], ["Kelly Green", "#4CBB17"],
      ["Medium Sea Green", "#3CB371"], ["Jungle Green", "#29AB87"], ["Jade", "#00A86B"], ["Shamrock Green", "#009E60"],
      ["Avocado", "#568203"], ["Olive Drab", "#6B8E23"], ["Sea Green", "#2E8B57"], ["Fern Green", "#4F7942"],
      ["Forest Green", "#228B22"], ["Myrtle Green", "#317873"], ["Green", "#008000"], ["Olive", "#808000"],
      ["Pine Green", "#01796F"], ["Dark Olive Green", "#556B2F"], ["Hunter Green", "#355E3B"], ["Bottle Green", "#006A4E"],
      ["Dark Green", "#006400"], ["British Racing Green", "#004225"],
    ],
    palettes: [
      { name: "Sage Kitchen", useCase: "Food, home, interiors", colors: ["#F0FFF0", "#D0F0C0", "#BCB88A", "#8A9A5B", "#355E3B"] },
      { name: "Fresh Fintech", useCase: "Banking, payments, growth", colors: ["#F5FFFA", "#98FB98", "#3CB371", "#2E8B57", "#004225"] },
      { name: "Forest Walk", useCase: "Outdoor, eco, travel", colors: ["#ACE1AF", "#4F7942", "#228B22", "#355E3B", "#3B2F2F"] },
      { name: "Emerald Luxe", useCase: "Jewelry, hotels, premium", colors: ["#F0EAD6", "#50C878", "#00A86B", "#006A4E", "#D4AF37"] },
    ],
    faq: [
      { question: "What are the main shades of green?", answer: "Popular shades of green include Mint Green (#98FF98), Sage (#BCB88A), Lime Green (#32CD32), Emerald (#50C878), Kelly Green (#4CBB17), Sea Green (#2E8B57), Forest Green (#228B22) and Hunter Green (#355E3B)." },
      { question: "What is the hex code for sage green?", answer: "Sage is commonly #BCB88A - a soft, grey-yellow green. Lighter sage tints such as Tea Green (#D0F0C0) and Celadon (#ACE1AF) are also often called sage." },
      { question: "What is the difference between emerald and forest green?", answer: "Emerald (#50C878) is a bright, slightly blue-leaning jewel green, while Forest Green (#228B22) is darker and more natural, like leaves in shade." },
      { question: "What is the darkest shade of green?", answer: "British Racing Green (#004225), Dark Green (#006400) and Hunter Green (#355E3B) are among the darkest named greens." },
    ],
  },
  {
    slug: "red",
    name: "Red",
    hex: "#DC143C",
    intro:
      "Shades of red go from soft Light Coral and Salmon through Scarlet, Cherry and Crimson to deep Burgundy, Maroon and Oxblood. Every shade below has its name, HEX, RGB and HSL code - click any swatch to copy it.",
    usage:
      "Red grabs attention faster than any other color, so it drives sales, food and sports brands - and it is the standard color for errors and destructive actions in UI. Use bright reds sparingly for calls to action, and lean on deep reds like Burgundy or Wine when you want warmth without alarm.",
    shades: [
      ["Light Coral", "#F08080"], ["Salmon", "#FA8072"], ["Indian Red", "#CD5C5C"], ["Tomato", "#FF6347"],
      ["Coral Red", "#FF4040"], ["Red", "#FF0000"], ["Scarlet", "#FF2400"], ["Ferrari Red", "#FF2800"],
      ["Candy Apple Red", "#FF0800"], ["Chili Red", "#E23D28"], ["Imperial Red", "#ED2939"], ["Lust", "#E62020"],
      ["Alizarin Crimson", "#E32636"], ["Cadmium Red", "#E30022"], ["Crimson", "#DC143C"], ["Rusty Red", "#DA2C43"],
      ["Jasper", "#D73B3E"], ["Cherry", "#D2042D"], ["Fire Engine Red", "#CE2029"], ["Persian Red", "#CC3333"],
      ["Brick Red", "#CB4154"], ["Cardinal", "#C41E3A"], ["Rose Red", "#C21E56"], ["Venetian Red", "#C80815"],
      ["Firebrick", "#B22222"], ["Redwood", "#A45A52"], ["Turkey Red", "#A91101"], ["Carmine", "#960018"],
      ["Sangria", "#92000A"], ["Dark Red", "#8B0000"], ["Burgundy", "#800020"], ["Maroon", "#800000"],
      ["Claret", "#7F1734"], ["Barn Red", "#7C0A02"], ["Garnet", "#733635"], ["Wine", "#722F37"],
      ["Blood Red", "#660000"], ["Oxblood", "#4A0000"],
    ],
    palettes: [
      { name: "Sale Signal", useCase: "E-commerce, promos, food", colors: ["#FFF5EE", "#FF6347", "#FF0000", "#B22222", "#1B1B1B"] },
      { name: "Wine Bar", useCase: "Restaurants, wineries, luxury", colors: ["#F0EAD6", "#C08081", "#800020", "#722F37", "#2B1D1D"] },
      { name: "Crimson Classic", useCase: "Sports, universities, media", colors: ["#F5F5F5", "#DC143C", "#C41E3A", "#800000", "#36454F"] },
      { name: "Coral Sunset", useCase: "Travel, lifestyle, social", colors: ["#FFE4E1", "#F08080", "#FA8072", "#E23D28", "#4A0000"] },
    ],
    faq: [
      { question: "What are the main shades of red?", answer: "Common shades of red include Scarlet (#FF2400), Cherry (#D2042D), Crimson (#DC143C), Cardinal (#C41E3A), Firebrick (#B22222), Burgundy (#800020), Maroon (#800000) and Wine (#722F37)." },
      { question: "What is the difference between burgundy and maroon?", answer: "Burgundy (#800020) leans slightly purple, like red wine, while Maroon (#800000) is a brown-leaning dark red. Both are deep and formal." },
      { question: "What is crimson's hex code?", answer: "Crimson is #DC143C - a strong red with a slight blue tint, which makes it feel richer than pure red (#FF0000)." },
      { question: "Is red good for buttons?", answer: "Red buttons convert well for sales and urgent actions, but in product UI red usually means 'delete' or 'error', so use it for those on purpose and pick another color for neutral primary actions." },
    ],
  },
  {
    slug: "yellow",
    name: "Yellow",
    hex: "#FFD700",
    intro:
      "Shades of yellow run from soft Ivory, Cream and Lemon Chiffon through Lemon, Canary and Golden Yellow to warm Mustard, Amber and Goldenrod. Each shade below lists its name, HEX, RGB and HSL code - click a swatch to copy it.",
    usage:
      "Yellow is the most visible color, so it works for highlights, warnings and optimistic, youthful brands. It almost never works as text on white - use pale yellows as backgrounds, bright yellows as highlights behind dark text, and golden or mustard tones when you want warmth that still feels grown-up.",
    shades: [
      ["Ivory", "#FFFFF0"], ["Light Yellow", "#FFFFE0"], ["Cream", "#FFFDD0"], ["Lemon Chiffon", "#FFFACD"],
      ["Cornsilk", "#FFF8DC"], ["Light Goldenrod Yellow", "#FAFAD2"], ["Pastel Yellow", "#FDFD96"], ["Pale Goldenrod", "#EEE8AA"],
      ["Vanilla", "#F3E5AB"], ["Khaki", "#F0E68C"], ["Laser Lemon", "#FFFF66"], ["Flax", "#EEDC82"],
      ["Corn", "#FBEC5D"], ["Naples Yellow", "#FADA5E"], ["Yellow", "#FFFF00"], ["Lemon", "#FFF700"],
      ["Daffodil", "#FFFF31"], ["Canary Yellow", "#FFEF00"], ["Dandelion", "#F0E130"], ["Banana Yellow", "#FFE135"],
      ["Arylide Yellow", "#E9D66B"], ["Golden Yellow", "#FFDF00"], ["School Bus Yellow", "#FFD800"], ["Gold", "#FFD700"],
      ["Mustard", "#FFDB58"], ["Sunglow", "#FFCC33"], ["Mikado Yellow", "#FFC40C"], ["Jonquil", "#F4CA16"],
      ["Saffron", "#F4C430"], ["Selective Yellow", "#FFBA00"], ["Amber", "#FFBF00"], ["Citrine", "#E4D00A"],
      ["Old Gold", "#CFB53B"], ["Goldenrod", "#DAA520"], ["Yellow Ochre", "#CB9D06"], ["Dark Goldenrod", "#B8860B"],
    ],
    palettes: [
      { name: "Sunny Morning", useCase: "Kids, education, breakfast", colors: ["#FFFDD0", "#FDFD96", "#FFD700", "#FFBF00", "#36454F"] },
      { name: "Mustard Studio", useCase: "Design studios, retro, cafes", colors: ["#F3E5AB", "#FFDB58", "#DAA520", "#556B2F", "#2B2B2B"] },
      { name: "Gold Standard", useCase: "Awards, finance, luxury", colors: ["#FFFFF0", "#FFDF00", "#CFB53B", "#B8860B", "#1B1B1B"] },
      { name: "Lemon Fresh", useCase: "Drinks, summer, wellness", colors: ["#FFFACD", "#FFF700", "#9ACD32", "#3CB371", "#004225"] },
    ],
    faq: [
      { question: "What are the main shades of yellow?", answer: "Popular shades of yellow include Cream (#FFFDD0), Pastel Yellow (#FDFD96), Lemon (#FFF700), Canary Yellow (#FFEF00), Golden Yellow (#FFDF00), Gold (#FFD700), Mustard (#FFDB58) and Goldenrod (#DAA520)." },
      { question: "What is the hex code for mustard yellow?", answer: "Mustard is commonly #FFDB58. Darker, browner mustards such as Goldenrod (#DAA520) and Yellow Ochre (#CB9D06) are also popular in design." },
      { question: "Can I use yellow text on a white background?", answer: "Almost never - yellow has very low contrast against white and fails WCAG. Use yellow as a background or highlight with dark text on top instead." },
      { question: "What is the difference between gold and yellow?", answer: "Pure Yellow (#FFFF00) is a bright, cool yellow. Gold (#FFD700) adds a touch of orange, which makes it warmer and richer." },
    ],
  },
  {
    slug: "orange",
    name: "Orange",
    hex: "#FF8C00",
    intro:
      "Shades of orange go from Peach, Apricot and Melon through Tangerine, Pumpkin and Safety Orange to deep Burnt Orange, Rust and Copper. Every shade below has its name, HEX, RGB and HSL code - click any swatch to copy it.",
    usage:
      "Orange feels energetic and friendly without the alarm of red, so it suits calls to action, food, onboarding and creator brands. Peach tones make warm backgrounds, true oranges make strong buttons (with dark text for contrast), and burnt orange or rust add an earthy, autumn feel.",
    shades: [
      ["Papaya Whip", "#FFEFD5"], ["Peach", "#FFE5B4"], ["Peach Puff", "#FFDAB9"], ["Apricot", "#FBCEB1"],
      ["Melon", "#FDBCB4"], ["Macaroni and Cheese", "#FFBD88"], ["Light Salmon", "#FFA07A"], ["Sandy Brown", "#F4A460"],
      ["Atomic Tangerine", "#FF9966"], ["Orange Peel", "#FF9F00"], ["Orange", "#FFA500"], ["Marigold", "#EAA221"],
      ["Dark Orange", "#FF8C00"], ["Carrot Orange", "#ED9121"], ["Cadmium Orange", "#ED872D"], ["Mango Tango", "#FF8243"],
      ["Tangerine", "#F28500"], ["Coral", "#FF7F50"], ["Princeton Orange", "#F58025"], ["Safety Orange", "#FF7900"],
      ["Pumpkin", "#FF7518"], ["Burnt Sienna", "#E97451"], ["Terra Cotta", "#E2725B"], ["Blaze Orange", "#FF6700"],
      ["Neon Orange", "#FF5F1F"], ["Persimmon", "#EC5800"], ["Orange Red", "#FF4500"], ["Vermilion", "#E34234"],
      ["Bronze", "#CD7F32"], ["Ochre", "#CC7722"], ["Tawny", "#CD5700"], ["Burnt Orange", "#CC5500"],
      ["Sinopia", "#CB410B"], ["Alloy Orange", "#C46210"], ["Copper", "#B87333"], ["Rust", "#B7410E"],
    ],
    palettes: [
      { name: "Peach Cream", useCase: "Bakeries, skincare, weddings", colors: ["#FFEFD5", "#FFE5B4", "#FBCEB1", "#E2725B", "#4B3621"] },
      { name: "Action Orange", useCase: "SaaS CTAs, onboarding, apps", colors: ["#FFF8F0", "#FFA500", "#FF7900", "#CC5500", "#1C1712"] },
      { name: "Autumn Rust", useCase: "Outdoor, coffee, craft", colors: ["#F4A460", "#CC7722", "#B7410E", "#556B2F", "#3B2F2F"] },
      { name: "Tropical Sunset", useCase: "Travel, drinks, summer", colors: ["#FFDAB9", "#FF9966", "#FF7F50", "#FF4500", "#2A3439"] },
    ],
    faq: [
      { question: "What are the main shades of orange?", answer: "Common shades of orange include Peach (#FFE5B4), Apricot (#FBCEB1), Tangerine (#F28500), Orange (#FFA500), Pumpkin (#FF7518), Coral (#FF7F50), Burnt Orange (#CC5500) and Rust (#B7410E)." },
      { question: "What is the hex code for burnt orange?", answer: "Burnt Orange is #CC5500 - a deep, brown-leaning orange that feels earthy and warm." },
      { question: "What is the difference between peach and apricot?", answer: "Peach (#FFE5B4) is paler and more yellow, while Apricot (#FBCEB1) has a little more pink in it. Both are soft, warm background colors." },
      { question: "Is orange good for call-to-action buttons?", answer: "Yes - orange stands out on most backgrounds without signalling danger. Use dark text on bright oranges, or a deeper orange like Burnt Orange (#CC5500) if you need white text." },
    ],
  },
  {
    slug: "brown",
    name: "Brown",
    hex: "#8B4513",
    intro:
      "Shades of brown range from Beige, Wheat and Tan through Camel, Caramel and Chocolate to deep Coffee, Espresso-dark Café Noir and Dark Brown. Each shade below has its name, HEX, RGB and HSL code - click a swatch to copy it.",
    usage:
      "Brown feels natural, warm and dependable, which suits coffee, food, outdoor, craft and furniture brands. Light browns (Beige, Tan) make cozy neutrals, mid browns (Camel, Caramel) carry accents, and dark browns are a softer alternative to black for text and headers.",
    shades: [
      ["Beige", "#F5F5DC"], ["Bisque", "#FFE4C4"], ["Wheat", "#F5DEB3"], ["Desert Sand", "#EDC9AF"],
      ["Burlywood", "#DEB887"], ["Tan", "#D2B48C"], ["Light French Beige", "#C8AD7F"], ["Fawn", "#E5AA70"],
      ["Camel", "#C4A484"], ["Lion", "#C19A6B"], ["Rosy Brown", "#BC8F8F"], ["Caramel", "#C68E17"],
      ["Peru", "#CD853F"], ["Chocolate", "#D2691E"], ["Café au Lait", "#A67B5B"], ["Mocha", "#967969"],
      ["Brown Sugar", "#AF6E4D"], ["Mahogany", "#C04000"], ["Sienna", "#A0522D"], ["Brown", "#A52A2A"],
      ["Chestnut", "#954535"], ["Saddle Brown", "#8B4513"], ["Raw Umber", "#826644"], ["Coyote Brown", "#81613C"],
      ["Russet", "#80461B"], ["Coffee", "#6F4E37"], ["Kobicha", "#6B4423"], ["Liver", "#674C47"],
      ["Dark Brown", "#654321"], ["Umber", "#635147"], ["Walnut Brown", "#5C5248"], ["Seal Brown", "#59260B"],
      ["Chocolate Cosmos", "#58111A"], ["Café Noir", "#4B3621"], ["Taupe", "#483C32"], ["Bistre", "#3D2B1F"],
    ],
    palettes: [
      { name: "Coffee House", useCase: "Cafes, roasters, bakeries", colors: ["#F5DEB3", "#C4A484", "#6F4E37", "#4B3621", "#F0EAD6"] },
      { name: "Earthy Neutral", useCase: "Interiors, furniture, fashion", colors: ["#F5F5DC", "#D2B48C", "#A67B5B", "#635147", "#3D2B1F"] },
      { name: "Caramel Glow", useCase: "Desserts, skincare, warm brands", colors: ["#FFE4C4", "#E5AA70", "#C68E17", "#8B4513", "#2B1D14"] },
      { name: "Leather & Brass", useCase: "Menswear, watches, craft", colors: ["#EDC9AF", "#B87333", "#80461B", "#59260B", "#1B1811"] },
    ],
    faq: [
      { question: "What are the main shades of brown?", answer: "Popular shades of brown include Beige (#F5F5DC), Tan (#D2B48C), Camel (#C4A484), Caramel (#C68E17), Chocolate (#D2691E), Coffee (#6F4E37), Saddle Brown (#8B4513) and Dark Brown (#654321)." },
      { question: "What is the hex code for chocolate brown?", answer: "The CSS named color Chocolate is #D2691E, which is fairly orange. For a darker 'chocolate brown' many designers use Coffee (#6F4E37) or Dark Brown (#654321)." },
      { question: "Is tan a shade of brown?", answer: "Yes - Tan (#D2B48C) is a light, sandy brown. It sits between Beige and Camel and works well as a warm neutral." },
      { question: "Can I use dark brown instead of black?", answer: "Yes - dark browns like Café Noir (#4B3621) or Bistre (#3D2B1F) give text and headers a warmer, softer feel than pure black while keeping strong contrast on light backgrounds." },
    ],
  },
  {
    slug: "gray",
    name: "Gray",
    hex: "#808080",
    aliases: ["grey"],
    intro:
      "Shades of gray (or grey) run from Gainsboro, Platinum and Silver through Ash, Slate and Battleship Gray to dark Charcoal, Gunmetal and Jet. Every shade below has its name, HEX, RGB and HSL code - click any swatch to copy it.",
    usage:
      "Grays are the backbone of every interface: borders, secondary text, disabled states and dark-mode surfaces. Warm grays (Taupe Gray, Timberwolf) feel softer next to warm brand colors, cool grays (Slate, Cadet Gray) pair with blues, and charcoal or gunmetal make softer dark backgrounds than pure black.",
    shades: [
      ["Timberwolf", "#DBD7D2"], ["Gainsboro", "#DCDCDC"], ["Platinum", "#E5E4E2"], ["Light Gray", "#D3D3D3"],
      ["French Gray", "#BDBDC6"], ["Silver", "#C0C0C0"], ["Pale Silver", "#C9C0BB"], ["Ash Gray", "#B2BEB5"],
      ["Quick Silver", "#A6A6A6"], ["Silver Chalice", "#ACACAC"], ["Dark Gray", "#A9A9A9"], ["Cadet Gray", "#91A3B0"],
      ["Spanish Gray", "#989898"], ["Cool Gray", "#8C92AC"], ["Philippine Gray", "#8C8C8C"], ["Taupe Gray", "#8B8589"],
      ["Battleship Gray", "#848482"], ["Gray", "#808080"], ["Warm Gray", "#808069"], ["Light Slate Gray", "#778899"],
      ["Sonic Silver", "#757575"], ["Nickel", "#727472"], ["Slate Gray", "#708090"], ["Dim Gray", "#696969"],
      ["Granite Gray", "#676767"], ["Davy's Gray", "#555555"], ["Payne's Gray", "#536878"], ["Outer Space", "#414A4C"],
      ["Arsenic", "#3B444B"], ["Charcoal", "#36454F"], ["Onyx", "#353839"], ["Jet", "#343434"],
      ["Dark Slate Gray", "#2F4F4F"], ["Gunmetal", "#2A3439"],
    ],
    palettes: [
      { name: "Neutral UI", useCase: "Dashboards, SaaS, admin panels", colors: ["#F5F5F5", "#DCDCDC", "#A9A9A9", "#696969", "#2A3439"] },
      { name: "Concrete Studio", useCase: "Architecture, portfolios, tech", colors: ["#E5E4E2", "#BDBDC6", "#8C92AC", "#536878", "#1B1B1B"] },
      { name: "Warm Stone", useCase: "Interiors, fashion, editorial", colors: ["#DBD7D2", "#C9C0BB", "#8B8589", "#555555", "#C4A484"] },
      { name: "Charcoal & Signal", useCase: "Dark mode, dev tools, music", colors: ["#36454F", "#2A3439", "#1B1B1B", "#A6A6A6", "#FF7900"] },
    ],
    faq: [
      { question: "Is it gray or grey?", answer: "Both are correct. 'Gray' is the common US spelling and the one CSS uses (gray, darkgray); 'grey' is more common in British English. CSS accepts both spellings for its named grays." },
      { question: "What are the main shades of gray?", answer: "Common shades of gray include Gainsboro (#DCDCDC), Silver (#C0C0C0), Dark Gray (#A9A9A9), Gray (#808080), Slate Gray (#708090), Dim Gray (#696969), Charcoal (#36454F) and Gunmetal (#2A3439)." },
      { question: "Why is CSS 'darkgray' lighter than 'gray'?", answer: "It is a historical quirk: CSS Gray (#808080) comes from the HTML color set, while DarkGray (#A9A9A9) comes from the X11 color set, so 'dark gray' ends up lighter than plain gray." },
      { question: "What is charcoal gray's hex code?", answer: "Charcoal is #36454F - a very dark blue-leaning gray that makes a softer alternative to black for text and dark backgrounds." },
    ],
  },
  {
    slug: "black",
    name: "Black",
    hex: "#1B1B1B",
    intro:
      "Shades of black include pure Black, near-blacks like Rich Black, Eerie Black and Smoky Black, and tinted blacks such as Black Olive, Black Bean and Dark Gunmetal. Every shade below has its name, HEX, RGB and HSL code - click a swatch to copy it.",
    usage:
      "Pure black (#000000) can feel harsh on screens, so most modern interfaces use a near-black for text and dark mode. Pick a tinted black that matches your brand - a warm black next to orange or brown, a cool, blue-leaning black next to blues - for a more refined look.",
    shades: [
      ["Black", "#000000"], ["Vampire Black", "#080808"], ["Rich Black", "#010B13"], ["Night", "#0C090A"],
      ["Xiketic", "#0C0C1E"], ["Obsidian", "#0B1215"], ["Smoky Black", "#100C08"], ["Chinese Black", "#141414"],
      ["Licorice", "#1A1110"], ["Dark Jungle Green", "#1A2421"], ["Eerie Black", "#1B1B1B"], ["Black Chocolate", "#1B1811"],
      ["Dark Gunmetal", "#1F262A"], ["Charleston Green", "#232B2B"], ["Raisin Black", "#242124"], ["Black Leather Jacket", "#253529"],
      ["Cool Black", "#002E63"], ["Warm Black", "#004242"], ["Dark Charcoal", "#333333"], ["Black Olive", "#3B3C36"],
      ["Black Coffee", "#3B2F2F"], ["Oil", "#3B3131"], ["Black Bean", "#3D0C02"], ["Ebony", "#555D50"],
    ],
    palettes: [
      { name: "Monochrome Pro", useCase: "Portfolios, fashion, photography", colors: ["#FFFFFF", "#D3D3D3", "#555555", "#1B1B1B", "#000000"] },
      { name: "Dark Mode Base", useCase: "Apps, dev tools, dashboards", colors: ["#0B1215", "#1F262A", "#2A3439", "#A9A9A9", "#00BFFF"] },
      { name: "Black & Gold", useCase: "Luxury, events, premium", colors: ["#100C08", "#242124", "#3B2F2F", "#CFB53B", "#FFFDD0"] },
      { name: "Noir Accent", useCase: "Streetwear, music, media", colors: ["#141414", "#333333", "#F5F5F5", "#FF1493", "#7DF9FF"] },
    ],
    faq: [
      { question: "What are the shades of black called?", answer: "Named near-blacks include Rich Black (#010B13), Eerie Black (#1B1B1B), Smoky Black (#100C08), Raisin Black (#242124), Licorice (#1A1110), Charleston Green (#232B2B) and Dark Charcoal (#333333)." },
      { question: "Should I use pure black for text?", answer: "Pure black on pure white is very high contrast and can feel harsh. Many designers use a near-black like Eerie Black (#1B1B1B) or a tinted black for body text - it still passes WCAG easily." },
      { question: "What is rich black?", answer: "In print, rich black mixes black ink with other inks for a deeper result. On screens, 'Rich Black' usually refers to a very dark blue-black such as #010B13." },
      { question: "What is the best black for dark mode?", answer: "Most dark modes avoid #000000 and use a slightly lifted near-black like Dark Gunmetal (#1F262A) or #121212, so shadows and elevation stay visible." },
    ],
  },
  {
    slug: "white",
    name: "White",
    hex: "#F5F5F5",
    intro:
      "Shades of white range from pure White and Snow to warm off-whites like Ivory, Cream, Eggshell and Alabaster, and cool tints like Ghost White and Mint Cream. Each shade below has its name, HEX, RGB and HSL code - click a swatch to copy it.",
    usage:
      "Off-whites set the mood of a whole site because they cover the most pixels. Warm whites (Ivory, Linen, Alabaster) feel calm and premium, cool whites (Ghost White, Alice Blue) feel clean and techy, and pure white is the sharpest for product UI. Choose one and use it consistently for backgrounds.",
    shades: [
      ["White", "#FFFFFF"], ["Baby Powder", "#FEFEFA"], ["Snow", "#FFFAFA"], ["Off White", "#FAF9F6"],
      ["Ghost White", "#F8F8FF"], ["Magnolia", "#F8F4FF"], ["Mint Cream", "#F5FFFA"], ["White Smoke", "#F5F5F5"],
      ["Azure Mist", "#F0FFFF"], ["Honeydew", "#F0FFF0"], ["Ivory", "#FFFFF0"], ["Floral White", "#FFFAF0"],
      ["Lavender Blush", "#FFF0F5"], ["Seashell", "#FFF5EE"], ["Cream", "#FFFDD0"], ["Old Lace", "#FDF5E6"],
      ["Isabelline", "#F4F0EC"], ["Linen", "#FAF0E6"], ["Eggshell", "#F0EAD6"], ["Antique White", "#FAEBD7"],
      ["Alabaster", "#EDEAE0"], ["Champagne", "#F7E7CE"], ["Pearl", "#EAE0C8"], ["Bone", "#E3DAC9"],
      ["Navajo White", "#FFDEAD"],
    ],
    palettes: [
      { name: "Warm Minimal", useCase: "Editorial, interiors, portfolios", colors: ["#FAF9F6", "#F0EAD6", "#E3DAC9", "#A67B5B", "#3D2B1F"] },
      { name: "Clean Product", useCase: "SaaS, apps, documentation", colors: ["#FFFFFF", "#F8F8FF", "#DCDCDC", "#4169E1", "#1B1B1B"] },
      { name: "Bridal Pearl", useCase: "Weddings, jewelry, beauty", colors: ["#FFFAFA", "#FFF0F5", "#EAE0C8", "#C08081", "#4B3621"] },
      { name: "Fresh Linen", useCase: "Home, textiles, wellness", colors: ["#FAF0E6", "#F5FFFA", "#ACE1AF", "#8A9A5B", "#355E3B"] },
    ],
    faq: [
      { question: "What are the different shades of white?", answer: "Common shades of white include Snow (#FFFAFA), Ghost White (#F8F8FF), White Smoke (#F5F5F5), Ivory (#FFFFF0), Linen (#FAF0E6), Eggshell (#F0EAD6), Alabaster (#EDEAE0) and Cream (#FFFDD0)." },
      { question: "What is the hex code for off-white?", answer: "There is no single official off-white, but #FAF9F6 is widely used. Ivory (#FFFFF0), Linen (#FAF0E6) and Eggshell (#F0EAD6) are popular named off-whites." },
      { question: "What is the difference between ivory and cream?", answer: "Ivory (#FFFFF0) is almost white with a faint yellow tint, while Cream (#FFFDD0) is noticeably more yellow and warmer." },
      { question: "Should my website background be pure white?", answer: "Pure white is crisp and neutral, but a soft off-white like #FAF9F6 reduces glare and feels warmer. Whichever you choose, check that your text still passes contrast on it." },
    ],
  },
  {
    slug: "teal",
    name: "Teal",
    hex: "#008080",
    intro:
      "Shades of teal go from pale Light Cyan, Aquamarine and Seafoam through Turquoise, Tiffany Blue and Persian Green to deep Teal, Skobeloff and Midnight Green. Every shade below has its name, HEX, RGB and HSL code - click any swatch to copy it.",
    usage:
      "Teal sits between blue and green, so it borrows trust from blue and freshness from green - popular for healthcare, SaaS and wellness brands. Use pale aquas for backgrounds, turquoise and Tiffany Blue for accents, and deep teals like Midnight Green for text and headers.",
    shades: [
      ["Light Cyan", "#E0FFFF"], ["Pale Turquoise", "#AFEEEE"], ["Seafoam Green", "#93E9BE"], ["Aquamarine", "#7FFFD4"],
      ["Aqua", "#00FFFF"], ["Medium Aquamarine", "#66CDAA"], ["Turquoise", "#40E0D0"], ["Medium Turquoise", "#48D1CC"],
      ["Verdigris", "#43B3AE"], ["Robin Egg Blue", "#00CCCC"], ["Dark Turquoise", "#00CED1"], ["Tiffany Blue", "#0ABAB5"],
      ["Caribbean Green", "#00CC99"], ["Keppel", "#3AB09E"], ["Light Sea Green", "#20B2AA"], ["Cadet Blue", "#5F9EA0"],
      ["Persian Green", "#00A693"], ["Viridian", "#40826D"], ["Teal Green", "#00827F"], ["Teal", "#008080"],
      ["Dark Cyan", "#008B8B"], ["Tropical Rain Forest", "#00755E"], ["Ming", "#36747D"], ["Myrtle Green", "#317873"],
      ["Teal Blue", "#367588"], ["Skobeloff", "#007474"], ["Dark Teal", "#014D4E"], ["Midnight Green", "#004953"],
      ["Deep Jungle Green", "#004B49"],
    ],
    palettes: [
      { name: "Clinic Calm", useCase: "Healthcare, dental, therapy", colors: ["#E0FFFF", "#AFEEEE", "#20B2AA", "#008080", "#004953"] },
      { name: "Tiffany Box", useCase: "Jewelry, gifts, weddings", colors: ["#FFFFFF", "#0ABAB5", "#81D8D0", "#36454F", "#F0EAD6"] },
      { name: "Lagoon", useCase: "Travel, beach, drinks", colors: ["#93E9BE", "#40E0D0", "#00CED1", "#007474", "#FF7F50"] },
      { name: "Deep Teal Studio", useCase: "SaaS, agencies, finance", colors: ["#F5FFFA", "#66CDAA", "#00827F", "#014D4E", "#1B1B1B"] },
    ],
    faq: [
      { question: "What are the main shades of teal?", answer: "Common shades of teal include Aquamarine (#7FFFD4), Turquoise (#40E0D0), Tiffany Blue (#0ABAB5), Light Sea Green (#20B2AA), Persian Green (#00A693), Teal (#008080), Dark Teal (#014D4E) and Midnight Green (#004953)." },
      { question: "Is teal blue or green?", answer: "Teal is a mix of both - it sits between blue and green. Bluer teals like Teal Blue (#367588) lean cool, while greener ones like Persian Green (#00A693) lean fresh." },
      { question: "What is the difference between teal and turquoise?", answer: "Turquoise (#40E0D0) is lighter and brighter, like tropical water. Teal (#008080) is darker and more muted." },
      { question: "What is Tiffany Blue's hex code?", answer: "Tiffany Blue is commonly written as #0ABAB5 (the brand's own swatch is often quoted as #81D8D0). Both are bright, minty teals." },
    ],
  },
];

function toRgb(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export function resolveShade(name: string, hex: string): Shade {
  const { r, g, b } = toRgb(hex);
  const { h, s, l } = hexToHsl(hex);
  return {
    name,
    hex: hex.toUpperCase(),
    rgb: `rgb(${r}, ${g}, ${b})`,
    hsl: `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`,
    lightness: l,
    group: l >= 70 ? "light" : l >= 35 ? "medium" : "dark",
  };
}

export function getShadeFamilies(): ShadeFamily[] {
  return families;
}

export function getShadeFamily(slug: string): ShadeFamily | undefined {
  return families.find((f) => f.slug === slug);
}

/** Shades sorted light to dark, with codes resolved. */
export function getResolvedShades(family: ShadeFamily): Shade[] {
  return family.shades.map(([name, hex]) => resolveShade(name, hex)).sort((a, b) => b.lightness - a.lightness);
}

export function shadesPath(slug: string) {
  return `/shades-of-${slug}`;
}

/**
 * Readable accent for a family's name in headings: the family's signature color if it
 * reads on white, otherwise its most vivid readable shade. Headings are large text, so
 * WCAG AA needs 3:1. White and gray have no vivid shade and fall back to ink.
 */
export function getFamilyAccent(family: ShadeFamily): string {
  const readable = (hex: string) => getContrastRatio(hex, "#FFFFFF") >= 3;
  if (readable(family.hex)) return family.hex;
  return (
    getResolvedShades(family)
      .map((sh) => ({ hex: sh.hex, sat: hexToHsl(sh.hex).s, l: sh.lightness }))
      .filter((c) => c.sat >= 35 && readable(c.hex))
      .sort((a, b) => b.sat - a.sat || b.l - a.l)[0]?.hex ?? "#1C1712"
  );
}
