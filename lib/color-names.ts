const NAMED_COLORS: [string, string][] = [
  ["#000000", "Black"], ["#FFFFFF", "White"], ["#FF0000", "Red"], ["#00FF00", "Lime"],
  ["#0000FF", "Blue"], ["#FFFF00", "Yellow"], ["#00FFFF", "Cyan"], ["#FF00FF", "Magenta"],
  ["#C0C0C0", "Silver"], ["#808080", "Gray"], ["#800000", "Maroon"], ["#808000", "Olive"],
  ["#008000", "Green"], ["#800080", "Purple"], ["#008080", "Teal"], ["#000080", "Navy"],
  ["#FF6347", "Tomato"], ["#FF4500", "Orange Red"], ["#FF8C00", "Dark Orange"],
  ["#FFA500", "Orange"], ["#FFD700", "Gold"], ["#FFFFE0", "Light Yellow"],
  ["#F0E68C", "Khaki"], ["#BDB76B", "Dark Khaki"], ["#E6E6FA", "Lavender"],
  ["#DDA0DD", "Plum"], ["#EE82EE", "Violet"], ["#DA70D6", "Orchid"],
  ["#FF69B4", "Hot Pink"], ["#FFB6C1", "Light Pink"], ["#FFC0CB", "Pink"],
  ["#DC143C", "Crimson"], ["#B22222", "Firebrick"], ["#CD5C5C", "Indian Red"],
  ["#F08080", "Light Coral"], ["#FA8072", "Salmon"], ["#E9967A", "Dark Salmon"],
  ["#FF7F50", "Coral"], ["#D2691E", "Chocolate"], ["#8B4513", "Saddle Brown"],
  ["#A0522D", "Sienna"], ["#DEB887", "Burly Wood"], ["#F5DEB3", "Wheat"],
  ["#FFDEAD", "Navajo White"], ["#FFE4C4", "Bisque"], ["#FFDAB9", "Peach Puff"],
  ["#F4A460", "Sandy Brown"], ["#DAA520", "Goldenrod"], ["#B8860B", "Dark Goldenrod"],
  ["#BC8F8F", "Rosy Brown"], ["#D2B48C", "Tan"], ["#C4A484", "Camel"],
  ["#ADFF2F", "Green Yellow"], ["#7FFF00", "Chartreuse"], ["#32CD32", "Lime Green"],
  ["#90EE90", "Light Green"], ["#00FA9A", "Medium Spring Green"],
  ["#3CB371", "Medium Sea Green"], ["#2E8B57", "Sea Green"],
  ["#228B22", "Forest Green"], ["#006400", "Dark Green"], ["#6B8E23", "Olive Drab"],
  ["#556B2F", "Dark Olive Green"], ["#66CDAA", "Medium Aquamarine"],
  ["#8FBC8F", "Dark Sea Green"], ["#20B2AA", "Light Sea Green"],
  ["#48D1CC", "Medium Turquoise"], ["#40E0D0", "Turquoise"],
  ["#00CED1", "Dark Turquoise"], ["#5F9EA0", "Cadet Blue"],
  ["#4682B4", "Steel Blue"], ["#B0C4DE", "Light Steel Blue"],
  ["#87CEEB", "Sky Blue"], ["#87CEFA", "Light Sky Blue"],
  ["#00BFFF", "Deep Sky Blue"], ["#1E90FF", "Dodger Blue"],
  ["#6495ED", "Cornflower Blue"], ["#4169E1", "Royal Blue"],
  ["#0000CD", "Medium Blue"], ["#00008B", "Dark Blue"],
  ["#191970", "Midnight Blue"], ["#6A5ACD", "Slate Blue"],
  ["#7B68EE", "Medium Slate Blue"], ["#9370DB", "Medium Purple"],
  ["#8A2BE2", "Blue Violet"], ["#4B0082", "Indigo"],
  ["#9400D3", "Dark Violet"], ["#8B008B", "Dark Magenta"],
  ["#FF1493", "Deep Pink"], ["#C71585", "Medium Violet Red"],
  ["#DB7093", "Pale Violet Red"], ["#F5F5DC", "Beige"],
  ["#FFFFF0", "Ivory"], ["#FFFAFA", "Snow"], ["#F0FFF0", "Honeydew"],
  ["#F5FFFA", "Mint Cream"], ["#F0FFFF", "Azure"], ["#F0F8FF", "Alice Blue"],
  ["#FFF8DC", "Cornsilk"], ["#FFFACD", "Lemon Chiffon"],
  ["#FAFAD2", "Light Goldenrod Yellow"], ["#FFF5EE", "Seashell"],
  ["#FDF5E6", "Old Lace"], ["#FAF0E6", "Linen"],
  ["#FAEBD7", "Antique White"], ["#FFE4E1", "Misty Rose"],
  ["#696969", "Dim Gray"], ["#A9A9A9", "Dark Gray"], ["#D3D3D3", "Light Gray"],
  ["#DCDCDC", "Gainsboro"], ["#F5F5F5", "White Smoke"],
  ["#2F4F4F", "Dark Slate Gray"], ["#708090", "Slate Gray"],
  ["#A52A2A", "Brown"], ["#8B0000", "Dark Red"], ["#ADD8E6", "Light Blue"],
  ["#9ACD32", "Yellow Green"], ["#7CFC00", "Lawn Green"], ["#7FFFD4", "Aquamarine"],
  ["#B0E0E6", "Powder Blue"], ["#D8BFD8", "Thistle"], ["#00FF7F", "Spring Green"],
  ["#008B8B", "Dark Cyan"], ["#9932CC", "Dark Orchid"], ["#483D8B", "Dark Slate Blue"],
  ["#FFFAF0", "Floral White"], ["#F8F8FF", "Ghost White"], ["#FFF0F5", "Lavender Blush"],
  ["#E0FFFF", "Light Cyan"], ["#FFA07A", "Light Salmon"], ["#778899", "Light Slate Gray"],
  ["#BA55D3", "Medium Orchid"], ["#FFE4B5", "Moccasin"], ["#EEE8AA", "Pale Goldenrod"],
  ["#98FB98", "Pale Green"], ["#AFEEEE", "Pale Turquoise"], ["#FFEFD5", "Papaya Whip"],
  ["#CD853F", "Peru"], ["#663399", "Rebecca Purple"], ["#FFEBCD", "Blanched Almond"],
];

function slugifyColorName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export type NamedColor = {
  hex: string;
  name: string;
  slug: string;
};

export const namedColors: NamedColor[] = NAMED_COLORS.map(([hex, name]) => ({
  hex,
  name,
  slug: slugifyColorName(name),
}));

export function normalizeHexColor(value: string): string | null {
  const cleaned = value.trim().replace(/^%23/i, "").replace(/^#/, "").toUpperCase();

  if (!/^[0-9A-F]{6}$/.test(cleaned)) {
    return null;
  }

  return `#${cleaned}`;
}

export function findNamedColorBySlug(slug: string): NamedColor | undefined {
  return namedColors.find((color) => color.slug === slug);
}

export function findNamedColorByHex(hex: string): NamedColor | undefined {
  const normalized = normalizeHexColor(hex);
  if (!normalized) {
    return undefined;
  }

  return namedColors.find((color) => color.hex === normalized);
}

export function getPopularNamedColorSlugs(limit = 48): string[] {
  return namedColors.slice(0, limit).map((color) => color.slug);
}

export function getPopularHexSamples(limit = 24): string[] {
  return namedColors.slice(0, limit).map((color) => color.hex.slice(1).toLowerCase());
}

function hexDistance(hex1: string, hex2: string): number {
  const r1 = parseInt(hex1.slice(1, 3), 16);
  const g1 = parseInt(hex1.slice(3, 5), 16);
  const b1 = parseInt(hex1.slice(5, 7), 16);
  const r2 = parseInt(hex2.slice(1, 3), 16);
  const g2 = parseInt(hex2.slice(3, 5), 16);
  const b2 = parseInt(hex2.slice(5, 7), 16);
  return (r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2;
}

export function findClosestColorName(hex: string): string {
  let closest = "Unknown";
  let minDist = Infinity;

  for (const [namedHex, name] of NAMED_COLORS) {
    const d = hexDistance(hex.toUpperCase(), namedHex);
    if (d < minDist) {
      minDist = d;
      closest = name;
    }
  }

  return closest;
}
