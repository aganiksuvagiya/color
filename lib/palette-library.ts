import { hexToHsl } from "./color-utils";

// The browsable palette library behind /color-palettes and /color-palettes/<tag>.
// Style and season tags are hand-assigned; color tags (blue, pink, ...) are computed
// from the palette's actual colors, so they never drift from what the swatches show.

export type TagKind = "color" | "style" | "season";

export type LibraryTag = {
  slug: string;
  name: string;
  kind: TagKind;
  /** Swatch for chips and hub cards. */
  hex: string;
  intro: string;
  tips: string;
  faq: { question: string; answer: string }[];
};

type StyleTag = "pastel" | "neon" | "earthy" | "vintage" | "dark" | "minimal" | "bright" | "luxury";
type SeasonTag = "spring" | "summer" | "autumn" | "winter" | "christmas";
type RawPalette = [name: string, colors: string[], tags: (StyleTag | SeasonTag)[]];

export type LibraryPalette = { id: string; name: string; colors: string[]; tags: string[] };

const RAW: RawPalette[] = [
  // ── Pastel ──
  ["Cotton Candy Sky", ["#FFD1DC", "#FFE5EC", "#E0F4FF", "#C7E9FB", "#B5D8F7"], ["pastel", "spring"]],
  ["Lavender Macaron", ["#E6E6FA", "#D8BFD8", "#F3E5F5", "#FCE4EC", "#FFF0F5"], ["pastel", "spring"]],
  ["Mint Sorbet", ["#D0F0C0", "#B8F2E6", "#E8F8F5", "#FFF5E1", "#FFE8D6"], ["pastel", "summer"]],
  ["Peach Blossom", ["#FFDAB9", "#FFE5D9", "#FFCAD4", "#F4ACB7", "#FAE1DD"], ["pastel", "spring"]],
  ["Baby Shower", ["#BDE0FE", "#A2D2FF", "#CDB4DB", "#FFC8DD", "#FFAFCC"], ["pastel", "spring"]],
  ["Lemon Meringue", ["#FFF9C4", "#FFF3B0", "#FFE8A3", "#E2F0CB", "#C7E8CA"], ["pastel", "summer"]],
  ["Seafoam Dream", ["#B5EAD7", "#C7F9CC", "#E2F0CB", "#FFDAC1", "#FFB7B2"], ["pastel", "summer"]],
  ["Lilac Mist", ["#E0BBE4", "#957DAD", "#D291BC", "#FEC8D8", "#FFDFD3"], ["pastel"]],
  ["Powder Room", ["#F7D9D9", "#F2B5D4", "#EFF7F6", "#B8E0D2", "#95B8D1"], ["pastel", "spring"]],
  ["Rainbow Sherbet", ["#FFADAD", "#FFD6A5", "#FDFFB6", "#CAFFBF", "#9BF6FF"], ["pastel", "summer"]],
  ["Soft Periwinkle", ["#E2E2FF", "#C9C9FF", "#B4B4F5", "#D7E3FC", "#EDF2FB"], ["pastel", "winter"]],
  ["Blush & Sage", ["#F8E1E7", "#F2C6D0", "#DCE5D3", "#B7C9A8", "#FAF7F2"], ["pastel", "spring"]],
  ["Butter Cream", ["#FFF8E7", "#FFEFC2", "#FBE3A8", "#F5D0A9", "#EFC3A4"], ["pastel", "spring"]],
  ["Ice Pop", ["#C1F0F6", "#A0E7E5", "#B4F8C8", "#FBE7C6", "#FFAEBC"], ["pastel", "summer"]],
  ["Dreamy Unicorn", ["#FFD6FF", "#E7C6FF", "#C8B6FF", "#B8C0FF", "#BBD0FF"], ["pastel"]],
  ["Apricot Morning", ["#FFE5B4", "#FFD3B6", "#FFAAA5", "#FF8B94", "#DCEDC1"], ["pastel", "spring"]],
  ["Spring Garden", ["#E9F5DB", "#CFE1B9", "#B5C99A", "#F6E7CB", "#F4C7C3"], ["pastel", "spring"]],
  ["Pastel Rose Gold", ["#F9E0D9", "#F2C2B5", "#E8A598", "#F6E6E4", "#D8C3A5"], ["pastel"]],
  ["Morning Fog", ["#E3F2FD", "#E8EAF6", "#F3E5F5", "#FCE4EC", "#FFF3E0"], ["pastel", "winter"]],
  ["Pistachio Gelato", ["#E3F4D7", "#C9E4B4", "#F7F3E3", "#F9D9CA", "#EFB0A1"], ["pastel", "summer"]],
  ["Candy Shop", ["#FFC4D6", "#FFDDE7", "#C4F1F9", "#FDF6B4", "#D9F7BE"], ["pastel", "summer"]],
  ["Soft Lagoon", ["#D4F1F4", "#BCECE0", "#A8E6CF", "#DCEDC1", "#FFD3B6"], ["pastel", "summer"]],
  ["Pale Plum", ["#F2E6F5", "#DFC5E6", "#C9A7D6", "#F5D5E0", "#FBEFF4"], ["pastel"]],
  ["Easter Basket", ["#FFF1A8", "#C8F0D0", "#C5DEFF", "#E6CCFF", "#FFC9DE"], ["pastel", "spring"]],

  // ── Neon / vivid ──
  ["Cyber Glow", ["#0D0221", "#FF2A6D", "#05D9E8", "#D1F7FF", "#7700A6"], ["neon", "dark"]],
  ["Miami Nights", ["#FF006E", "#FB5607", "#FFBE0B", "#8338EC", "#3A86FF"], ["neon", "bright", "summer"]],
  ["Laser Tag", ["#39FF14", "#FF073A", "#00F0FF", "#FFF01F", "#111111"], ["neon", "dark"]],
  ["Synthwave", ["#2B0F54", "#AB1FB4", "#FF0080", "#FF8B00", "#FFE600"], ["neon", "dark"]],
  ["Electric Lime", ["#CCFF00", "#00FF9F", "#00B8FF", "#001EFF", "#0B0B0B"], ["neon"]],
  ["Hot Pink Rave", ["#FF00A0", "#FF5CCE", "#9D00FF", "#00E5FF", "#1A1A2E"], ["neon", "dark"]],
  ["Arcade", ["#FFE600", "#FF3864", "#2DE2E6", "#261447", "#0D0221"], ["neon", "dark"]],
  ["Highlighter Pack", ["#FEFF00", "#FF6EC7", "#00FFEF", "#7CFC00", "#FF9933"], ["neon", "bright", "summer"]],
  ["Ultraviolet", ["#7B2CBF", "#9D4EDD", "#C77DFF", "#E0AAFF", "#10002B"], ["neon", "dark"]],
  ["Toxic Green", ["#0B0F0C", "#1B3A1F", "#39FF14", "#B6FF00", "#E9FFDB"], ["neon", "dark"]],
  ["Vaporwave", ["#FF71CE", "#01CDFE", "#05FFA1", "#B967FF", "#FFFB96"], ["neon", "bright"]],
  ["Electric Ocean", ["#00F5FF", "#00C2FF", "#0077FF", "#3A00FF", "#0A0A23"], ["neon", "dark"]],
  ["Citrus Pop", ["#FFF200", "#FFB000", "#FF6A00", "#FF2E63", "#252A34"], ["neon", "bright", "summer"]],
  ["Night Market", ["#14001F", "#FF2E97", "#FF9E00", "#00F5D4", "#9B5DE5"], ["neon", "dark"]],

  // ── Bright ──
  ["Primary Play", ["#E63946", "#FFB703", "#219EBC", "#023047", "#FB8500"], ["bright"]],
  ["Fiesta", ["#F94144", "#F3722C", "#F8961E", "#F9C74F", "#90BE6D"], ["bright", "summer"]],
  ["Pop Art", ["#FF595E", "#FFCA3A", "#8AC926", "#1982C4", "#6A4C93"], ["bright"]],
  ["Tropical Punch", ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#FFFFFF"], ["bright", "summer"]],
  ["Kids Club", ["#EF476F", "#FFD166", "#06D6A0", "#118AB2", "#073B4C"], ["bright"]],
  ["Festival", ["#9B5DE5", "#F15BB5", "#FEE440", "#00BBF9", "#00F5D4"], ["bright", "summer"]],
  ["Sunny Picnic", ["#FFBE0B", "#FB5607", "#FF006E", "#3A86FF", "#FFF8E7"], ["bright", "summer"]],
  ["Crayon Box", ["#D62828", "#F77F00", "#FCBF49", "#2A9D8F", "#264653"], ["bright"]],
  ["Juicy Fruit", ["#FF4E50", "#FC913A", "#F9D423", "#EDE574", "#E1F5C4"], ["bright", "summer"]],
  ["Bold Brand", ["#FF4F00", "#1C1712", "#FAF7F2", "#2D6CDF", "#FFD23F"], ["bright"]],
  ["Cheerful Classroom", ["#FF7F50", "#FFD700", "#40E0D0", "#6495ED", "#FFFFFF"], ["bright", "spring"]],
  ["Carnival", ["#E71D36", "#FF9F1C", "#2EC4B6", "#CBF3F0", "#011627"], ["bright"]],

  // ── Earthy ──
  ["Desert Clay", ["#E07A5F", "#F2CC8F", "#81B29A", "#3D405B", "#F4F1DE"], ["earthy", "autumn"]],
  ["Terracotta Home", ["#B85C38", "#E0C097", "#5C3D2E", "#2D2424", "#F5EBE0"], ["earthy", "autumn"]],
  ["Olive Grove", ["#606C38", "#283618", "#FEFAE0", "#DDA15E", "#BC6C25"], ["earthy", "autumn"]],
  ["Sandstone", ["#E6CCB2", "#DDB892", "#B08968", "#7F5539", "#9C6644"], ["earthy"]],
  ["Moss & Stone", ["#3A5A40", "#588157", "#A3B18A", "#DAD7CD", "#344E41"], ["earthy"]],
  ["Spice Market", ["#9C2C13", "#C8553D", "#F28F3B", "#FFD5C2", "#588B8B"], ["earthy", "autumn"]],
  ["Canyon", ["#D4A373", "#CCD5AE", "#E9EDC9", "#FEFAE0", "#FAEDCD"], ["earthy", "pastel"]],
  ["Woodland Cabin", ["#582F0E", "#7F4F24", "#936639", "#A68A64", "#656D4A"], ["earthy", "autumn"]],
  ["Clay Pottery", ["#CB997E", "#DDBEA9", "#FFE8D6", "#B7B7A4", "#A5A58D"], ["earthy"]],
  ["Sage & Linen", ["#CAD2C5", "#84A98C", "#52796F", "#354F52", "#2F3E46"], ["earthy", "minimal"]],
  ["Savanna", ["#BC6C25", "#DDA15E", "#FEFAE0", "#606C38", "#283618"], ["earthy", "summer"]],
  ["Coffee Beans", ["#EDE0D4", "#E6CCB2", "#DDB892", "#9C6644", "#7F5539"], ["earthy", "autumn"]],
  ["Rust & Fern", ["#A44A3F", "#F19C79", "#CBDFBD", "#F6F4D2", "#D4E09B"], ["earthy", "autumn"]],
  ["Mountain Trail", ["#5F6F52", "#A9B388", "#FEFAE0", "#B99470", "#783D19"], ["earthy"]],
  ["Adobe", ["#C1666B", "#D4B483", "#E4DFDA", "#48A9A6", "#4281A4"], ["earthy", "summer"]],
  ["Harvest Field", ["#6F1D1B", "#BB9457", "#432818", "#99582A", "#FFE6A7"], ["earthy", "autumn"]],
  ["Natural Fiber", ["#F5EBE0", "#E3D5CA", "#D5BDAF", "#D6CCC2", "#EDEDE9"], ["earthy", "minimal"]],
  ["Forest Floor", ["#2D3A1F", "#4F6D30", "#8A9A5B", "#C2A878", "#6B4F3A"], ["earthy", "autumn"]],

  // ── Vintage / retro ──
  ["Retro Diner", ["#D62828", "#F77F00", "#FCBF49", "#EAE2B7", "#003049"], ["vintage"]],
  ["70s Lounge", ["#E76F51", "#F4A261", "#E9C46A", "#2A9D8F", "#264653"], ["vintage", "autumn"]],
  ["Faded Postcard", ["#D8A48F", "#BB8588", "#A3A380", "#D6CE93", "#EFEBCE"], ["vintage"]],
  ["Old Film", ["#2B2D42", "#8D99AE", "#EDF2F4", "#EF233C", "#D90429"], ["vintage"]],
  ["Antique Shop", ["#6B4226", "#C9A66B", "#E8D9B5", "#8C3B2E", "#3D3B30"], ["vintage", "autumn"]],
  ["Polaroid", ["#F4E9D8", "#E6B89C", "#ED9B40", "#5E6472", "#24272B"], ["vintage"]],
  ["Mid-Century", ["#E9B44C", "#9B2915", "#50A2A7", "#E4D6A7", "#1C110A"], ["vintage"]],
  ["Vintage Rose", ["#E8C4C4", "#CE8D8D", "#A15C5C", "#F2E8DC", "#6B4C4C"], ["vintage"]],
  ["Typewriter", ["#F2E9DC", "#D9C5B2", "#7A6A53", "#3E3B39", "#9B8C7B"], ["vintage", "minimal"]],
  ["Retro Arcade Carpet", ["#3C1642", "#086375", "#1DD3B0", "#AFFC41", "#B2FF9E"], ["vintage"]],
  ["Sepia Letters", ["#704214", "#A67B5B", "#D2B48C", "#F5E6CA", "#3B2A1A"], ["vintage", "earthy"]],
  ["Psychedelic", ["#FF6F59", "#EFC88B", "#43AA8B", "#254441", "#DB504A"], ["vintage"]],
  ["Old Hollywood", ["#1B1B1B", "#B08D57", "#E6D5B8", "#7A1F1F", "#F4EFE6"], ["vintage", "luxury"]],
  ["Disco Ball", ["#3D0B37", "#9C0D38", "#E8A87C", "#F4D35E", "#C0C0C0"], ["vintage"]],
  ["Retro Mint Kitchen", ["#A8DADC", "#F1FAEE", "#E63946", "#457B9D", "#1D3557"], ["vintage"]],
  ["Faded Denim", ["#5C7AA3", "#8EA4C8", "#D6DFEA", "#F2EDE4", "#2F3E58"], ["vintage"]],

  // ── Dark ──
  ["Midnight Code", ["#0D1117", "#161B22", "#21262D", "#58A6FF", "#C9D1D9"], ["dark", "minimal"]],
  ["Deep Space", ["#03045E", "#023E8A", "#0077B6", "#0096C7", "#000814"], ["dark", "winter"]],
  ["Gothic Velvet", ["#1A0A12", "#3D0C25", "#6A0F3A", "#A4133C", "#E9D5DA"], ["dark", "luxury"]],
  ["Charcoal & Ember", ["#1B1B1B", "#2E2E2E", "#3F3F3F", "#FF5F1F", "#F2F2F2"], ["dark"]],
  ["Dark Forest", ["#081C15", "#1B4332", "#2D6A4F", "#40916C", "#D8F3DC"], ["dark", "winter"]],
  ["Obsidian Gold", ["#0B0B0B", "#1C1C1C", "#2B2B2B", "#C9A227", "#F5F1E6"], ["dark", "luxury"]],
  ["Night Sky", ["#0B132B", "#1C2541", "#3A506B", "#5BC0BE", "#FFFFFF"], ["dark", "winter"]],
  ["Moody Plum", ["#22092C", "#3D0E3A", "#5E1B4F", "#BE3144", "#F05941"], ["dark", "autumn"]],
  ["Slate Dashboard", ["#0F172A", "#1E293B", "#334155", "#38BDF8", "#E2E8F0"], ["dark", "minimal"]],
  ["Espresso Bar", ["#1C120C", "#3B2416", "#5C3A21", "#C08552", "#F3E9DC"], ["dark", "earthy"]],
  ["Blackout Red", ["#000000", "#1A0000", "#5C0000", "#C1121F", "#F1F1F1"], ["dark"]],
  ["Graphite Teal", ["#121212", "#1F2A2E", "#2C3E44", "#2EC4B6", "#E0E0E0"], ["dark", "minimal"]],
  ["Aurora Night", ["#0A0F1F", "#1B2A49", "#2EC4B6", "#9B5DE5", "#F15BB5"], ["dark", "winter"]],
  ["Ink & Paper", ["#111111", "#2B2B2B", "#555555", "#EDEDED", "#FFFFFF"], ["dark", "minimal"]],
  ["Volcanic", ["#140F0D", "#2F1B12", "#5A2A16", "#D9480F", "#FFB347"], ["dark", "autumn"]],
  ["Royal Night", ["#10002B", "#240046", "#3C096C", "#5A189A", "#E0AAFF"], ["dark", "luxury"]],

  // ── Minimal ──
  ["Paper White", ["#FFFFFF", "#F7F7F7", "#E5E5E5", "#A3A3A3", "#171717"], ["minimal"]],
  ["Warm Neutral", ["#FAF7F2", "#EFE9E1", "#D9CFC1", "#A69B8D", "#3B3631"], ["minimal"]],
  ["Nordic Calm", ["#F4F4F2", "#E8E8E8", "#BBBFCA", "#495464", "#2B303A"], ["minimal", "winter"]],
  ["Stone Gallery", ["#E7E5E4", "#D6D3D1", "#A8A29E", "#57534E", "#1C1917"], ["minimal"]],
  ["Soft Concrete", ["#F0F0F0", "#D9D9D9", "#BFBFBF", "#7F7F7F", "#404040"], ["minimal"]],
  ["Oat Milk", ["#FBF8F3", "#F1EADF", "#E2D6C4", "#BBA990", "#5E5346"], ["minimal", "earthy"]],
  ["Clean SaaS", ["#FFFFFF", "#F1F5F9", "#CBD5E1", "#2563EB", "#0F172A"], ["minimal"]],
  ["Scandi Blue", ["#F7F9FB", "#DDE6ED", "#9DB2BF", "#526D82", "#27374D"], ["minimal", "winter"]],
  ["Greige", ["#F5F2EE", "#E4DED7", "#C6BEB5", "#8F857B", "#4A433D"], ["minimal"]],
  ["Monochrome Green", ["#F1F7F1", "#D3E4D3", "#9DBF9E", "#4F7A50", "#1F3320"], ["minimal"]],
  ["Blush Minimal", ["#FFFBFA", "#F9E8E6", "#EFC9C4", "#B98B85", "#3E2C2A"], ["minimal"]],
  ["Muted Lavender", ["#F7F5FB", "#E5E0F0", "#C3B9DB", "#7D6E9E", "#2E2640"], ["minimal"]],

  // ── Luxury ──
  ["Black Tie", ["#0A0A0A", "#1F1F1F", "#D4AF37", "#F7E7CE", "#FFFFFF"], ["luxury", "dark"]],
  ["Emerald Estate", ["#022C22", "#064E3B", "#047857", "#D4AF37", "#F5F0E1"], ["luxury"]],
  ["Champagne Toast", ["#F7E7CE", "#E6CFA9", "#C9A66B", "#8C6A43", "#2B2118"], ["luxury"]],
  ["Royal Sapphire", ["#0B1F4B", "#163172", "#1E56A0", "#D6E4F0", "#C9A227"], ["luxury", "winter"]],
  ["Velvet Wine", ["#3B0A1A", "#6B1229", "#9B1B30", "#E8C4A0", "#F6EEE3"], ["luxury", "autumn"]],
  ["Marble & Gold", ["#FFFFFF", "#EDEDED", "#C9C9C9", "#B8975A", "#2C2C2C"], ["luxury", "minimal"]],
  ["Rose Gold Suite", ["#F6E3DC", "#E8B4A0", "#B76E79", "#6D3B47", "#2A1A1F"], ["luxury"]],
  ["Midnight Jewel", ["#0D0628", "#2C0E37", "#690375", "#CB429F", "#F7B2DA"], ["luxury", "dark"]],
  ["Ivory Tower", ["#FFFFF0", "#F2EBDF", "#D8C8B2", "#9E8A6E", "#3C3226"], ["luxury", "minimal"]],
  ["Peacock", ["#00303F", "#005F73", "#0A9396", "#94D2BD", "#E9C46A"], ["luxury"]],

  // ── Blue-led ──
  ["Ocean Breeze", ["#CAF0F8", "#90E0EF", "#00B4D8", "#0077B6", "#03045E"], ["summer"]],
  ["Denim Day", ["#E3EDF7", "#9BB7D4", "#5B84B1", "#2F5D8C", "#1B2F4B"], []],
  ["Corporate Trust", ["#F5F9FF", "#C6DBF7", "#4A90E2", "#1F4E8C", "#0B1F3A"], ["minimal"]],
  ["Blue Hour", ["#1D3557", "#457B9D", "#A8DADC", "#F1FAEE", "#E63946"], ["winter"]],
  ["Cobalt Pop", ["#0047AB", "#1E90FF", "#87CEFA", "#FFFFFF", "#FFB703"], ["bright"]],
  ["Glacier", ["#E8F6FF", "#C3E4F7", "#8CC7E8", "#4F9BC7", "#235A7F"], ["winter", "pastel"]],
  ["Navy Nautical", ["#001F3F", "#0A3D62", "#F5F5F5", "#E63946", "#F1C40F"], ["summer"]],
  ["Periwinkle Studio", ["#EEF0FF", "#C9CCF5", "#8E94F2", "#5C63D8", "#2B2F77"], []],
  ["Sky Blue Kids", ["#E0F7FF", "#87CEEB", "#4FC3F7", "#FFD54F", "#FF8A65"], ["bright", "summer"]],
  ["Steel & Sky", ["#DDE6ED", "#9DB2BF", "#4682B4", "#27374D", "#F8F9FA"], ["minimal"]],

  // ── Pink-led ──
  ["Bubblegum Pop", ["#FFC1CC", "#FF8FAB", "#FB6F92", "#FF4D6D", "#FFF0F3"], ["bright"]],
  ["Rosé All Day", ["#FCE4EC", "#F8BBD0", "#F48FB1", "#C2185B", "#4A0E2B"], ["summer"]],
  ["Flamingo Beach", ["#FFB5C2", "#FC8EAC", "#FFE5B4", "#7FD8BE", "#2EC4B6"], ["summer"]],
  ["Hot Pink Studio", ["#FF69B4", "#FF1493", "#C71585", "#FFF0F5", "#1B1B1B"], ["bright"]],
  ["Dusty Rose", ["#E8C1C5", "#D69AA1", "#B5838D", "#6D6875", "#FFF4F2"], ["vintage"]],
  ["Strawberry Milk", ["#FFE3EC", "#FFC2D4", "#FF9EBB", "#FF7AA2", "#FFFFFF"], ["pastel", "spring"]],
  ["Fuchsia Night", ["#FF00FF", "#C9184A", "#590D22", "#FF4D6D", "#1A0A10"], ["neon", "dark"]],
  ["Peony", ["#F7CAD0", "#F9BEC7", "#FBB1BD", "#FF99AC", "#FF85A1"], ["pastel", "spring"]],

  // ── Purple-led ──
  ["Lavender Field", ["#E6E6FA", "#C3B1E1", "#9F86C0", "#5E548E", "#231942"], ["spring"]],
  ["Amethyst Cave", ["#E0AAFF", "#C77DFF", "#9D4EDD", "#7B2CBF", "#3C096C"], []],
  ["Grape Soda", ["#6F2DA8", "#9B5DE5", "#F15BB5", "#FEE440", "#00BBF9"], ["bright"]],
  ["Purple Rain", ["#2E1A47", "#5B3A8C", "#8E6CC4", "#C5B3E6", "#F2ECFA"], []],
  ["Violet Dusk", ["#3A0CA3", "#7209B7", "#B5179E", "#F72585", "#4CC9F0"], ["neon"]],
  ["Lilac Wedding", ["#F3E8FF", "#DCC6F5", "#C8A2C8", "#A47DAB", "#FFFFFF"], ["pastel", "spring"]],
  ["Plum Orchard", ["#4A1942", "#893168", "#C1666B", "#E8D7F1", "#F7F7FF"], ["autumn"]],
  ["Royal Purple Crest", ["#4B0082", "#663399", "#9370DB", "#D4AF37", "#FAF7F2"], ["luxury"]],

  // ── Green-led ──
  ["Fresh Mint", ["#E9FFF4", "#B7F0D2", "#6EE7B7", "#10B981", "#065F46"], ["spring"]],
  ["Botanical", ["#1B4332", "#2D6A4F", "#52B788", "#B7E4C7", "#F1FAEE"], ["spring"]],
  ["Matcha Latte", ["#EAF2D7", "#C5D86D", "#8DB255", "#5B8C2A", "#2F3E1E"], ["earthy"]],
  ["Emerald City", ["#004B23", "#006400", "#38B000", "#9EF01A", "#CCFF33"], ["bright"]],
  ["Eucalyptus", ["#E3EDE8", "#B3CDC0", "#7FA99B", "#4F7969", "#2D4A3E"], ["minimal"]],
  ["Lime Soda", ["#F7FFE0", "#D9F99D", "#A3E635", "#65A30D", "#1A2E05"], ["summer"]],
  ["Jungle Canopy", ["#0B3D20", "#14532D", "#16A34A", "#86EFAC", "#FDE68A"], ["summer"]],
  ["Sage Wedding", ["#F4F1EA", "#DCE3D5", "#B2C2A5", "#7E9471", "#4B5E40"], ["pastel", "spring"]],

  // ── Red-led ──
  ["Cherry Red", ["#FFE5E5", "#FF8A8A", "#E5383B", "#A4161A", "#660708"], []],
  ["Red Carpet", ["#C1121F", "#780000", "#FDF0D5", "#003049", "#669BBC"], ["luxury"]],
  ["Chili Pepper", ["#D00000", "#DC2F02", "#E85D04", "#F48C06", "#FFBA08"], ["bright", "autumn"]],
  ["Poppy Field", ["#E63946", "#F1FAEE", "#A8DADC", "#457B9D", "#1D3557"], ["summer"]],
  ["Crimson Ledger", ["#DC143C", "#8B0000", "#F5F5F5", "#2B2D42", "#8D99AE"], []],
  ["Brick House", ["#9B2226", "#AE2012", "#BB3E03", "#CA6702", "#EE9B00"], ["earthy", "autumn"]],
  ["Strawberry Fields", ["#FF4D6D", "#FF758F", "#C9184A", "#A4C639", "#FFF0F3"], ["summer"]],
  ["Lipstick", ["#B5172F", "#E01E37", "#FF6B6B", "#FCE4E4", "#2B1B1F"], []],

  // ── Yellow-led ──
  ["Sunflower", ["#FFE066", "#FFD60A", "#FFC300", "#7A5C00", "#2E4A1F"], ["summer"]],
  ["Lemonade Stand", ["#FFFBE6", "#FFF3A3", "#FFE45C", "#FF9F1C", "#2EC4B6"], ["summer", "bright"]],
  ["Honey Jar", ["#FFF4D6", "#FFD97D", "#F4B400", "#B07D00", "#4A3300"], ["earthy", "autumn"]],
  ["Mustard Studio", ["#F3E5AB", "#FFDB58", "#DAA520", "#556B2F", "#2B2B2B"], ["vintage"]],
  ["Golden Hour", ["#FFF3E0", "#FFD166", "#F6AE2D", "#F26419", "#33658A"], ["summer"]],
  ["Canary Bright", ["#FFFF00", "#FFEF00", "#1B1B1B", "#FFFFFF", "#3A86FF"], ["bright", "neon"]],
  ["Banana Bread", ["#FFF1C1", "#FFE08A", "#E9B949", "#A47148", "#5C3D2E"], ["earthy"]],
  ["Daffodil Spring", ["#FFFDE7", "#FFF59D", "#FFEB3B", "#AED581", "#558B2F"], ["spring"]],

  // ── Orange-led ──
  ["Sunset Boulevard", ["#FFBE0B", "#FB5607", "#FF006E", "#8338EC", "#3A0CA3"], ["bright", "summer"]],
  ["Pumpkin Spice", ["#FFE8D6", "#F4A261", "#E76F51", "#9C3D1F", "#3E1F14"], ["autumn", "earthy"]],
  ["Tangerine Dream", ["#FFF1E6", "#FFB37C", "#FF8C42", "#FF5E1A", "#2B1B13"], ["summer"]],
  ["Apricot Launch", ["#FFF8F0", "#FFD8BE", "#FFA770", "#E8531F", "#1C1712"], []],
  ["Burnt Orange Cafe", ["#F6E7D7", "#E9A46A", "#CC5500", "#7A2E0E", "#2D1E17"], ["autumn"]],
  ["Coral Reef", ["#FF7F50", "#FFB4A2", "#FFF0E5", "#2EC4B6", "#05668D"], ["summer"]],
  ["Marigold Festival", ["#FFC107", "#FF9800", "#FF5722", "#8BC34A", "#5D4037"], ["bright", "autumn"]],
  ["Peach Fuzz", ["#FFE5D9", "#FFCDB2", "#FFB4A2", "#E5989B", "#B5838D"], ["pastel"]],

  // ── Brown-led ──
  ["Coffee House", ["#F5DEB3", "#C4A484", "#6F4E37", "#4B3621", "#F0EAD6"], ["earthy", "autumn"]],
  ["Leather & Brass", ["#EDC9AF", "#B87333", "#80461B", "#59260B", "#1B1811"], ["luxury", "earthy"]],
  ["Chocolate Box", ["#3E2723", "#5D4037", "#8D6E63", "#D7CCC8", "#FFAB91"], ["autumn"]],
  ["Caramel Latte", ["#FFF3E0", "#E6B980", "#C68E17", "#8B5A2B", "#3B2416"], ["autumn"]],
  ["Walnut Desk", ["#EFE6DD", "#B79F86", "#7A5C45", "#4E3B2C", "#2A211A"], ["minimal", "earthy"]],
  ["Cocoa & Cream", ["#FFF8F0", "#E8D5C4", "#A47551", "#6B4226", "#2F1B12"], []],

  // ── Gray-led ──
  ["Urban Concrete", ["#F2F2F2", "#BFBFBF", "#8C8C8C", "#595959", "#262626"], ["minimal"]],
  ["Cool Gray UI", ["#F8FAFC", "#E2E8F0", "#94A3B8", "#475569", "#1E293B"], ["minimal"]],
  ["Silver Screen", ["#E5E4E2", "#C0C0C0", "#A9A9A9", "#696969", "#2F2F2F"], ["vintage"]],
  ["Rainy Day", ["#D9DDE1", "#A9B4BE", "#7A8894", "#4E5B66", "#2C353D"], ["winter"]],
  ["Gray & Coral", ["#F4F4F4", "#B0B0B0", "#5E5E5E", "#2B2B2B", "#FF6F61"], []],
  ["Charcoal Suit", ["#36454F", "#2A3439", "#708090", "#D3D3D3", "#B22222"], []],

  // ── Teal-led ──
  ["Tidal Pool", ["#E0FBFC", "#98C1D9", "#3D5A80", "#293241", "#EE6C4D"], ["summer"]],
  ["Teal & Coral", ["#006D77", "#83C5BE", "#EDF6F9", "#FFDDD2", "#E29578"], ["summer"]],
  ["Lagoon", ["#93E9BE", "#40E0D0", "#00CED1", "#007474", "#FF7F50"], ["summer", "bright"]],
  ["Deep Teal Studio", ["#F5FFFA", "#66CDAA", "#00827F", "#014D4E", "#1B1B1B"], ["minimal"]],
  ["Clinic Calm", ["#E0FFFF", "#AFEEEE", "#20B2AA", "#008080", "#004953"], ["minimal"]],
  ["Turquoise Bay", ["#05668D", "#028090", "#00A896", "#02C39A", "#F0F3BD"], ["summer"]],

  // ── Black-led ──
  ["All Black Everything", ["#000000", "#0A0A0A", "#1B1B1B", "#2E2E2E", "#F5F5F5"], ["dark", "minimal"]],
  ["Noir Neon", ["#050505", "#111111", "#FF2E63", "#08D9D6", "#EAEAEA"], ["dark", "neon"]],
  ["Black & Gold Label", ["#0A0A0A", "#141414", "#B8975A", "#E8D5A9", "#FFFFFF"], ["dark", "luxury"]],
  ["Studio Black", ["#080808", "#101010", "#262626", "#E5E5E5", "#E8531F"], ["dark"]],
  ["Midnight Rose", ["#0B0608", "#1A0E12", "#8E3B5B", "#E7A3B8", "#FBE9EF"], ["dark", "luxury"]],
  ["Black Coffee & Cream", ["#0E0907", "#1C120C", "#6F4E37", "#E6D3B3", "#FFF8EE"], ["dark", "earthy"]],
  ["Monolith", ["#020202", "#0F0F0F", "#1F1F1F", "#7A7A7A", "#FFFFFF"], ["dark", "minimal"]],

  // ── More yellow ──
  ["Bumblebee", ["#FFD60A", "#FFC300", "#1B1B1B", "#003566", "#FFFFFF"], ["bright"]],
  ["Lemon Zest", ["#FFF9DB", "#FFEC99", "#FFD43B", "#FAB005", "#2B8A3E"], ["summer", "bright"]],
  ["Saffron Spice", ["#FFF4CC", "#F4C430", "#E3A008", "#8A4B08", "#2D1E12"], ["earthy", "autumn"]],

  // ── Seasonal ──
  ["Cherry Blossom", ["#FFF0F3", "#FFCCD5", "#FFB3C1", "#8FA27A", "#4F5D3A"], ["spring", "pastel"]],
  ["April Showers", ["#E3F2FD", "#BBDEFB", "#90CAF9", "#A5D6A7", "#FFF59D"], ["spring", "pastel"]],
  ["Beach Day", ["#FFF6E0", "#F9D5A7", "#4FC3F7", "#0288D1", "#FF7043"], ["summer", "bright"]],
  ["Watermelon Slice", ["#FF4D6D", "#FF8FA3", "#FFF0F3", "#52B788", "#1B4332"], ["summer", "bright"]],
  ["Autumn Leaves", ["#7F2704", "#B85C1A", "#E09F3E", "#9E2A2B", "#540B0E"], ["autumn", "earthy"]],
  ["Maple Syrup", ["#3F1D0B", "#8A3A0F", "#C76B29", "#E8B04B", "#F7E3C3"], ["autumn"]],
  ["Cozy Sweater", ["#8C4A3B", "#C47A5A", "#E4B48C", "#F3E3CF", "#5A6B5D"], ["autumn", "vintage"]],
  ["Halloween", ["#0B0B0B", "#FF6D00", "#FF9E00", "#7B2CBF", "#3C096C"], ["autumn", "dark"]],
  ["Frosty Morning", ["#F8FBFF", "#DCEBF7", "#B6D0E2", "#7FA3C0", "#45627D"], ["winter", "pastel"]],
  ["Winter Pine", ["#0F2E1F", "#1F4D35", "#5E8B6F", "#E5EFE9", "#B22234"], ["winter"]],
  ["Holiday Classic", ["#B3001B", "#255C35", "#F5F5F5", "#D4AF37", "#1B1B1B"], ["winter", "christmas", "luxury"]],
  ["Snowfall", ["#FFFFFF", "#F0F4F8", "#D9E2EC", "#9FB3C8", "#334E68"], ["winter", "minimal"]],
  // Christmas: hand-made for /color-palettes/christmas; refresh the set each autumn.
  ["Candy Cane", ["#C8102E", "#FFFFFF", "#F4D7D7", "#2F5D3A", "#8B0000"], ["christmas", "winter", "bright"]],
  ["Evergreen & Gold", ["#0B3D2E", "#14532D", "#C9A227", "#F5EFE0", "#7A1F2B"], ["christmas", "winter", "luxury"]],
  ["Nordic Christmas", ["#FFFFFF", "#E8E4DC", "#B23A3A", "#2E4A3F", "#1F2A30"], ["christmas", "winter", "minimal"]],
  ["Rustic Farmhouse Christmas", ["#8B2E2E", "#4A5D3A", "#D8C3A5", "#F2EDE4", "#5C4033"], ["christmas", "winter", "earthy"]],
  ["Blue Christmas", ["#0B1F3A", "#1E3A8A", "#C0C7D1", "#E8EEF6", "#F5F7FA"], ["christmas", "winter"]],
  ["Pink Christmas", ["#E75480", "#F7B2C4", "#FCE4EC", "#2F5D50", "#D4AF37"], ["christmas", "winter"]],
  ["Gingerbread House", ["#8B5A2B", "#C68642", "#F3E5D0", "#B22222", "#FFFFFF"], ["christmas", "winter", "earthy"]],
  ["Vintage Christmas", ["#A4161A", "#3A5A40", "#E9D8A6", "#CA6702", "#F4F1DE"], ["christmas", "winter", "vintage"]],
  ["Black & Gold Holiday", ["#0D0D0D", "#1F1F1F", "#B8860B", "#D4AF37", "#F5F0E6"], ["christmas", "winter", "luxury", "dark"]],
  ["Winter Wonderland", ["#FFFFFF", "#DCEBF7", "#A9C6E8", "#C0C0C0", "#2C3E50"], ["christmas", "winter", "minimal"]],
  ["Poinsettia", ["#9B111E", "#D7263D", "#1B4332", "#F6E7CB", "#E0A800"], ["christmas", "winter"]],
  ["Mistletoe", ["#E8F0E3", "#9DBF8E", "#4F772D", "#31572C", "#C1121F"], ["christmas", "winter", "earthy"]],
  ["Hot Cocoa", ["#3E2723", "#6D4C41", "#D7B899", "#FFF8F0", "#C62828"], ["christmas", "winter", "earthy"]],
  ["Velvet Burgundy", ["#4A0E1C", "#7A1F2B", "#B76E79", "#E8D5C4", "#C9A227"], ["christmas", "winter", "luxury"]],
  ["Frosted Pine", ["#1F4D35", "#4E7D63", "#A8C5B5", "#EEF4F1", "#C0C0C0"], ["christmas", "winter"]],
  ["Silent Night", ["#0B132B", "#1C2541", "#3A506B", "#E0E1DD", "#F4D35E"], ["christmas", "winter", "dark"]],
  ["Sugar Plum", ["#5B2A86", "#9A48D0", "#F1C6E7", "#FFF0F5", "#D4AF37"], ["christmas", "winter"]],
  ["Cozy Plaid", ["#9E1B32", "#1D3B2A", "#2B2D42", "#E9C46A", "#F1FAEE"], ["christmas", "winter"]],
  ["Modern Minimal Christmas", ["#F7F7F5", "#DADAD5", "#8A9A86", "#2F3E36", "#B33A3A"], ["christmas", "winter", "minimal"]],
  ["Christmas Morning", ["#FFF8E7", "#F2C14E", "#D1495B", "#2E6E5E", "#0E2A2F"], ["christmas", "winter", "bright"]],
];

function slugify(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/** Which of the 12 color families a single hex belongs to. */
export function colorFamily(hex: string): string {
  const { h, s, l } = hexToHsl(hex);
  if (l >= 94 || (l >= 88 && s < 60)) return "white";
  if (l <= 12) return "black";
  if (s <= 12 || (s <= 20 && l >= 25 && l <= 80)) return "gray";
  // Tans, sands, camels and coffees: warm hues that are muted or dark.
  if (h >= 15 && h <= 50 && ((s < 60 && l < 82) || l < 35)) return "brown";
  if (h < 12 || h >= 345) return l >= 75 ? "pink" : "red";
  if (h < 45) return "orange";
  if (h < 68) return "yellow";
  if (h < 160) return "green";
  if (h < 195) return "teal";
  if (h < 255) return "blue";
  if (h < 290) return "purple";
  return "pink";
}

const palettes: LibraryPalette[] = RAW.map(([name, colors, tags]) => {
  const counts = new Map<string, number>();
  for (const c of colors) counts.set(colorFamily(c), (counts.get(colorFamily(c)) ?? 0) + 1);
  const colorTags = [...counts].filter(([, n]) => n >= 2).map(([f]) => f);
  return { id: slugify(name), name, colors: colors.map((c) => c.toUpperCase()), tags: [...tags, ...colorTags] };
});

const tags: LibraryTag[] = [
  // ── Styles ──
  {
    slug: "pastel", name: "Pastel", kind: "style", hex: "#FFD1DC",
    intro: "Pastel color palettes use soft, light colors with lots of white mixed in - think baby pink, mint, lavender, butter yellow and powder blue. They feel calm, friendly and youthful.",
    tips: "Pastels have low contrast against white, so never use them for text. Pair a pastel background palette with one deep accent (navy, plum or charcoal) for headings and buttons.",
    faq: [
      { question: "What are pastel colors?", answer: "Pastel colors are pale, low-saturation versions of hues - pink, blue, mint, lavender, peach and yellow mixed with plenty of white. Common examples are #FFD1DC (pastel pink), #B5EAD7 (mint) and #E0BBE4 (lilac)." },
      { question: "How do I make a pastel color palette?", answer: "Pick 3-5 hues you like, then raise their lightness to roughly 85-95% and lower saturation. Keep one darker color in the palette so you still have something readable for text." },
    ],
  },
  {
    slug: "neon", name: "Neon", kind: "style", hex: "#FF00A0",
    intro: "Neon color palettes combine electric pinks, cyans, limes and purples - often on a near-black background - for a glowing, nightlife or cyberpunk look.",
    tips: "Neon works best on dark backgrounds and in small doses: one or two glowing accents over a deep navy or black base. Large neon areas tire the eye and can fail accessibility.",
    faq: [
      { question: "What colors are neon?", answer: "Typical neon colors are hot pink (#FF00A0), electric cyan (#00F0FF), neon green (#39FF14), laser yellow (#FFF01F) and ultraviolet purple (#9D00FF)." },
      { question: "What background goes with neon colors?", answer: "Very dark backgrounds - near-black, deep navy or dark purple - make neon colors glow. On white, neon colors look washed out and are hard to read." },
    ],
  },
  {
    slug: "earthy", name: "Earthy", kind: "style", hex: "#B85C38",
    intro: "Earthy color palettes borrow from soil, clay, wood, moss and stone - terracotta, olive, sand, rust and sage. They feel grounded, natural and warm.",
    tips: "Earthy palettes suit food, wellness, interiors and outdoor brands. Use a light sand or linen as the base, a mid tone like terracotta or olive for accents, and a dark brown or forest green for text.",
    faq: [
      { question: "What are earth tone colors?", answer: "Earth tones are muted, natural colors such as terracotta (#B85C38), olive (#606C38), sand (#DDB892), sage (#A3B18A) and rust (#A44A3F)." },
      { question: "Do earthy colors work for websites?", answer: "Yes - earthy palettes create a calm, trustworthy feel. Keep enough contrast by pairing light sand backgrounds with dark brown or deep green text." },
    ],
  },
  {
    slug: "vintage", name: "Vintage", kind: "style", hex: "#E9B44C",
    intro: "Vintage and retro color palettes recreate the faded, warm tones of old photos, 70s interiors, diners and mid-century design - mustard, burnt orange, teal, cream and dusty rose.",
    tips: "Slightly desaturated colors are the key to a vintage look. Add a cream or off-white instead of pure white, and use one strong retro accent like mustard or teal.",
    faq: [
      { question: "What colors look vintage?", answer: "Mustard (#E9B44C), burnt orange (#E76F51), retro teal (#2A9D8F), cream (#EAE2B7), dusty rose (#BB8588) and faded denim (#5C7AA3) all read as vintage." },
      { question: "What is a 70s color palette?", answer: "A classic 70s palette mixes burnt orange, mustard yellow, avocado or teal green and chocolate brown - for example #E76F51, #E9C46A, #2A9D8F and #264653." },
    ],
  },
  {
    slug: "dark", name: "Dark", kind: "style", hex: "#0D1117",
    intro: "Dark color palettes are built around near-black, navy, charcoal and deep jewel tones, with one or two bright accents. They are the base of dark mode, gaming and premium brands.",
    tips: "Avoid pure #000000 as a page background - a slightly lifted near-black (#0D1117, #121212) keeps shadows visible. Give text at least 4.5:1 contrast against the darkest surface.",
    faq: [
      { question: "What colors are good for a dark theme?", answer: "Start with a near-black or deep navy base (#0D1117, #0F172A), add two slightly lighter surface colors, then one bright accent like #58A6FF or #38BDF8 for links and buttons." },
      { question: "Is pure black good for dark mode?", answer: "Usually not. Pure black makes elevation and shadows invisible and can cause eye strain; near-blacks like #121212 are the common choice." },
    ],
  },
  {
    slug: "minimal", name: "Minimal", kind: "style", hex: "#E5E5E5",
    intro: "Minimal color palettes keep to whites, warm or cool neutrals and one quiet accent. They let content and photography lead and feel modern and calm.",
    tips: "A minimal palette needs a clear text color and enough difference between surface shades. Use 2-3 neutrals for background, borders and secondary text, plus a single accent for actions.",
    faq: [
      { question: "What is a minimalist color palette?", answer: "A minimalist palette uses mostly neutrals - white, off-white, light gray, a mid gray and a near-black - with at most one accent color." },
      { question: "Warm or cool neutrals?", answer: "Warm neutrals (beige, greige, oat) feel cozy and editorial; cool neutrals (slate, cool gray) feel clean and techy. Pick one family and stay consistent." },
    ],
  },
  {
    slug: "bright", name: "Bright", kind: "style", hex: "#FFBE0B",
    intro: "Bright color palettes use bold, saturated reds, yellows, blues and greens. They feel energetic, playful and attention-grabbing - great for kids, food, events and creator brands.",
    tips: "With bright palettes, let one color dominate and use the others as accents. Check contrast carefully: bright yellows and greens need dark text on top.",
    faq: [
      { question: "What is a bright color palette?", answer: "A bright palette uses highly saturated colors, such as #FF006E, #FFBE0B, #3A86FF and #06D6A0, often balanced with white or a dark navy." },
      { question: "How do I keep a bright palette from looking messy?", answer: "Give each color a job (background, primary action, highlight) and keep one neutral for text. Repeating the same few colors consistently looks intentional." },
    ],
  },
  {
    slug: "luxury", name: "Luxury", kind: "style", hex: "#D4AF37",
    intro: "Luxury color palettes pair deep blacks, jewel tones (emerald, sapphire, wine) and creamy neutrals with metallic gold or champagne accents. They feel premium and timeless.",
    tips: "Restraint is what makes a palette feel expensive. Use gold or champagne sparingly for details, keep generous dark or cream space, and avoid too many saturated colors.",
    faq: [
      { question: "What colors look luxurious?", answer: "Black (#0A0A0A), gold (#D4AF37), champagne (#F7E7CE), emerald (#064E3B), sapphire (#163172) and deep wine (#6B1229) are classic luxury colors." },
      { question: "What is the hex code for gold?", answer: "Metallic gold is commonly #D4AF37; softer golds such as #C9A227 or #B8975A also work well in luxury palettes." },
    ],
  },
  // ── Seasons ──
  {
    slug: "spring", name: "Spring", kind: "season", hex: "#FFCCD5",
    intro: "Spring color palettes capture blossoms, new leaves and soft sunshine - cherry-blossom pink, fresh mint, lilac, butter yellow and sky blue.",
    tips: "Spring palettes lean light and fresh. Combine a soft floral pastel with a fresh green, and keep a deeper green or plum for text.",
    faq: [
      { question: "What colors represent spring?", answer: "Blossom pink (#FFCCD5), fresh mint (#B7F0D2), lilac (#C8A2C8), butter yellow (#FFF59D) and sky blue (#BBDEFB) are typical spring colors." },
      { question: "Are spring colors the same as pastels?", answer: "Often, but not always. Spring palettes can also include fresh, brighter greens and yellows - like new leaves and daffodils." },
    ],
  },
  {
    slug: "summer", name: "Summer", kind: "season", hex: "#00B4D8",
    intro: "Summer color palettes are sunny and saturated - ocean blues, turquoise, coral, watermelon pink, lemon and lime.",
    tips: "Summer palettes work well with lots of white space. Pair a cool ocean blue or turquoise with one hot accent (coral, watermelon, mango) for contrast.",
    faq: [
      { question: "What colors represent summer?", answer: "Ocean blue (#00B4D8), turquoise (#40E0D0), coral (#FF7F50), watermelon (#FF4D6D), lemon (#FFE45C) and lime (#A3E635)." },
      { question: "What is a beach color palette?", answer: "A beach palette mixes sand (#F9D5A7), ocean blues (#4FC3F7, #0288D1), a warm coral or orange (#FF7043) and white." },
    ],
  },
  {
    slug: "autumn", name: "Autumn", kind: "season", hex: "#B85C1A",
    intro: "Autumn (fall) color palettes use warm, rich tones - burnt orange, rust, mustard, maple red, olive and chocolate brown.",
    tips: "Autumn palettes are naturally high in warm mid tones. Balance them with a cream background and a deep brown or burgundy for text.",
    faq: [
      { question: "What are fall colors?", answer: "Burnt orange (#CC5500), rust (#B85C1A), mustard (#E09F3E), maple red (#9E2A2B), olive (#606C38) and chocolate brown (#3E2723)." },
      { question: "What is an autumn color palette for a wedding?", answer: "Popular fall wedding palettes combine burgundy or wine, burnt orange, dusty sage and cream - for example #6B1229, #CC5500, #A3B18A and #F6EEE3." },
    ],
  },
  {
    slug: "winter", name: "Winter", kind: "season", hex: "#B6D0E2",
    intro: "Winter color palettes range from icy blues, frost and silver to deep pine, navy and holiday red.",
    tips: "Winter palettes are mostly cool. Add one warm accent (holiday red, gold, candlelight) to keep them from feeling cold and flat.",
    faq: [
      { question: "What colors represent winter?", answer: "Ice blue (#DCEBF7), frost (#F0F4F8), silver (#C0C0C0), pine green (#1F4D35), navy (#0B132B) and holiday red (#B22234)." },
      { question: "What is a Christmas color palette?", answer: "A classic Christmas palette uses red (#B3001B), green (#255C35), gold (#D4AF37) and white (#F5F5F5)." },
    ],
  },
  {
    slug: "christmas", name: "Christmas", kind: "season", hex: "#B3001B",
    intro: "Christmas color palettes start from the classic red, green, gold and white, then branch out into Nordic whites, rustic plaid, blue and silver, pink, and black and gold.",
    tips: "Red and green are hard to tell apart for people with red-green color blindness, so never let them carry meaning on their own, and never set red text on green. Let white or cream fill most of the space, use a deep green or burgundy for text, and keep gold for small accents.",
    faq: [
      { question: "What are the traditional Christmas colors?", answer: "Red, green, gold and white. Typical hex codes are Christmas red #B3001B, evergreen #255C35, gold #D4AF37 and snow white #F5F5F5." },
      { question: "What are the hex codes for Christmas colors?", answer: "A classic set is #B3001B (red), #255C35 (evergreen), #D4AF37 (gold), #F5F5F5 (white) and #1B1B1B (near black). For a softer, modern look try #B33A3A, #2F3E36, #8A9A86 and #F7F7F5." },
      { question: "What do the Christmas colors mean?", answer: "Green stands for evergreen trees and life through the winter, red for holly berries and warmth, gold for light and the star, and white for snow and peace." },
      { question: "What colors go with red and green for Christmas?", answer: "Gold, cream, white and silver soften red and green; burgundy and deep pine make them richer; a warm wood brown makes them feel rustic." },
    ],
  },
  // ── Colors ──
  ...(
    [
      ["blue", "Blue", "#1E90FF", "trust, calm and clarity", "tech, finance, healthcare and corporate brands"],
      ["pink", "Pink", "#FF69B4", "warmth, playfulness and care", "beauty, fashion, kids and lifestyle brands"],
      ["purple", "Purple", "#9370DB", "creativity, luxury and imagination", "AI products, beauty, creator tools and premium brands"],
      ["green", "Green", "#2E8B57", "growth, health and freshness", "wellness, food, finance and sustainability brands"],
      ["red", "Red", "#DC143C", "energy, passion and urgency", "food, retail, sports and entertainment brands"],
      ["yellow", "Yellow", "#FFD700", "optimism, happiness and attention", "kids, food, education and summer campaigns"],
      ["orange", "Orange", "#FF8C00", "enthusiasm, friendliness and action", "food, onboarding, creator and youth brands"],
      ["brown", "Brown", "#8B4513", "warmth, comfort and reliability", "coffee, food, outdoor and craft brands"],
      ["gray", "Gray", "#808080", "balance, neutrality and professionalism", "product UI, architecture, tech and editorial design"],
      ["black", "Black", "#1B1B1B", "elegance, power and sophistication", "luxury, fashion, photography and dark-mode products"],
      ["white", "White", "#F5F5F5", "simplicity, cleanliness and space", "minimal brands, healthcare, weddings and product UI"],
      ["teal", "Teal", "#008080", "balance, clarity and calm confidence", "healthcare, SaaS, wellness and travel brands"],
    ] as const
  ).map(([slug, name, hex, feel, uses]): LibraryTag => ({
    slug,
    name,
    kind: "color",
    hex,
    intro: `${name} color palettes built around shades of ${slug === "gray" ? "gray (grey)" : slug} - from light tints to deep tones. ${name} suggests ${feel}, which is why it shows up so often in ${uses}.`,
    tips: `To build a ${slug} palette, pick one main ${slug} for your brand, add a lighter tint for backgrounds and a darker shade for text or headers, then one contrasting accent. Every palette below can be opened in the generator to adjust.`,
    faq: [
      { question: `What colors go well with ${slug}?`, answer: `Look at the palettes below: each one pairs ${slug} with neutrals and one or two accents that are proven to work. In general, ${slug} pairs well with its complementary color for contrast and with neutrals (white, cream, charcoal) for balance.` },
      { question: `How many colors should a ${slug} palette have?`, answer: `Most usable palettes have 4-5 colors: a light background, one or two ${slug} tones, a dark text color and one accent.` },
    ],
  })),
];

export function getLibraryPalettes(): LibraryPalette[] {
  return palettes;
}

export function getLibraryTags(): LibraryTag[] {
  return tags;
}

export function getLibraryTag(slug: string): LibraryTag | undefined {
  return tags.find((t) => t.slug === slug);
}

export function getPalettesForTag(slug: string): LibraryPalette[] {
  const matches = palettes.filter((p) => p.tags.includes(slug));
  if (getLibraryTag(slug)?.kind !== "color") return matches;
  // Color pages lead with the palettes where that color dominates most.
  const score = (p: LibraryPalette) => p.colors.filter((c) => colorFamily(c) === slug).length;
  return matches.map((p, i) => ({ p, i, s: score(p) })).sort((a, b) => b.s - a.s || a.i - b.i).map((x) => x.p);
}

/** Tags that co-occur most with this one, for "related" chips. */
export function getRelatedTags(slug: string, limit = 8): LibraryTag[] {
  const counts = new Map<string, number>();
  for (const p of getPalettesForTag(slug)) for (const t of p.tags) if (t !== slug) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts]
    .sort((a, b) => b[1] - a[1])
    .map(([t]) => getLibraryTag(t))
    .filter((t): t is LibraryTag => Boolean(t))
    .slice(0, limit);
}

export function generatorHref(p: { name: string; colors: string[] }) {
  return `/generator?label=${encodeURIComponent(p.name)}&c=${p.colors.map((c) => c.replace("#", "").toUpperCase()).join("-")}`;
}

export function colorPalettesPath(slug?: string) {
  return slug ? `/color-palettes/${slug}` : "/color-palettes";
}
