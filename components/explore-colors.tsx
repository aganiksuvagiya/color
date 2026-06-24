"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

type ColorItem = { name: string; hex: string; category: string };

const COLORS: ColorItem[] = [
  // Red
  { name: "Coral", hex: "#FF7F50", category: "Red" },
  { name: "Salmon", hex: "#FA8072", category: "Red" },
  { name: "Crimson", hex: "#DC143C", category: "Red" },
  { name: "Tomato", hex: "#FF6347", category: "Red" },
  { name: "Fire Brick", hex: "#B22222", category: "Red" },
  { name: "Indian Red", hex: "#CD5C5C", category: "Red" },
  { name: "Dark Red", hex: "#8B0000", category: "Red" },
  { name: "Red", hex: "#FF0000", category: "Red" },
  { name: "Scarlet", hex: "#FF2400", category: "Red" },
  // Orange
  { name: "Orange", hex: "#FFA500", category: "Orange" },
  { name: "Dark Orange", hex: "#FF8C00", category: "Orange" },
  { name: "Orange Red", hex: "#FF4500", category: "Orange" },
  { name: "Peach", hex: "#FFCBA4", category: "Orange" },
  { name: "Tangerine", hex: "#FF9966", category: "Orange" },
  { name: "Apricot", hex: "#FBCEB1", category: "Orange" },
  { name: "Burnt Orange", hex: "#CC5500", category: "Orange" },
  // Brown
  { name: "Chocolate", hex: "#D2691E", category: "Brown" },
  { name: "Sienna", hex: "#A0522D", category: "Brown" },
  { name: "Saddle Brown", hex: "#8B4513", category: "Brown" },
  { name: "Peru", hex: "#CD853F", category: "Brown" },
  { name: "Sandy Brown", hex: "#F4A460", category: "Brown" },
  { name: "Maroon", hex: "#800000", category: "Brown" },
  { name: "Tan", hex: "#D2B48C", category: "Brown" },
  { name: "Rosy Brown", hex: "#BC8F8F", category: "Brown" },
  { name: "Burlywood", hex: "#DEB887", category: "Brown" },
  // Yellow
  { name: "Gold", hex: "#FFD700", category: "Yellow" },
  { name: "Khaki", hex: "#F0E68C", category: "Yellow" },
  { name: "Yellow", hex: "#FFFF00", category: "Yellow" },
  { name: "Lemon Chiffon", hex: "#FFFACD", category: "Yellow" },
  { name: "Light Goldenrod", hex: "#FAFAD2", category: "Yellow" },
  { name: "Moccasin", hex: "#FFE4B5", category: "Yellow" },
  { name: "Papaya Whip", hex: "#FFEFD5", category: "Yellow" },
  { name: "Dark Goldenrod", hex: "#B8860B", category: "Yellow" },
  { name: "Amber", hex: "#FFBF00", category: "Yellow" },
  // Green
  { name: "Lime Green", hex: "#32CD32", category: "Green" },
  { name: "Sea Green", hex: "#2E8B57", category: "Green" },
  { name: "Forest Green", hex: "#228B22", category: "Green" },
  { name: "Green", hex: "#008000", category: "Green" },
  { name: "Dark Green", hex: "#006400", category: "Green" },
  { name: "Olive", hex: "#808000", category: "Green" },
  { name: "Spring Green", hex: "#00FF7F", category: "Green" },
  { name: "Medium Sea Green", hex: "#3CB371", category: "Green" },
  { name: "Emerald", hex: "#50C878", category: "Green" },
  { name: "Mint", hex: "#98FF98", category: "Green" },
  // Cyan
  { name: "Teal", hex: "#008080", category: "Cyan" },
  { name: "Cyan", hex: "#00FFFF", category: "Cyan" },
  { name: "Aquamarine", hex: "#7FFFD4", category: "Cyan" },
  { name: "Turquoise", hex: "#40E0D0", category: "Cyan" },
  { name: "Dark Cyan", hex: "#008B8B", category: "Cyan" },
  { name: "Medium Turquoise", hex: "#48D1CC", category: "Cyan" },
  { name: "Pale Turquoise", hex: "#AFEEEE", category: "Cyan" },
  // Blue
  { name: "Sky Blue", hex: "#87CEEB", category: "Blue" },
  { name: "Royal Blue", hex: "#4169E1", category: "Blue" },
  { name: "Navy", hex: "#000080", category: "Blue" },
  { name: "Steel Blue", hex: "#4682B4", category: "Blue" },
  { name: "Dodger Blue", hex: "#1E90FF", category: "Blue" },
  { name: "Cornflower Blue", hex: "#6495ED", category: "Blue" },
  { name: "Deep Sky Blue", hex: "#00BFFF", category: "Blue" },
  { name: "Midnight Blue", hex: "#191970", category: "Blue" },
  { name: "Powder Blue", hex: "#B0E0E6", category: "Blue" },
  { name: "Cobalt", hex: "#0047AB", category: "Blue" },
  // Purple
  { name: "Indigo", hex: "#4B0082", category: "Purple" },
  { name: "Orchid", hex: "#DA70D6", category: "Purple" },
  { name: "Lavender", hex: "#E6E6FA", category: "Purple" },
  { name: "Purple", hex: "#800080", category: "Purple" },
  { name: "Medium Purple", hex: "#9370DB", category: "Purple" },
  { name: "Blue Violet", hex: "#8A2BE2", category: "Purple" },
  { name: "Dark Violet", hex: "#9400D3", category: "Purple" },
  { name: "Plum", hex: "#DDA0DD", category: "Purple" },
  { name: "Thistle", hex: "#D8BFD8", category: "Purple" },
  { name: "Mauve", hex: "#E0B0FF", category: "Purple" },
  // Pink
  { name: "Hot Pink", hex: "#FF69B4", category: "Pink" },
  { name: "Deep Pink", hex: "#FF1493", category: "Pink" },
  { name: "Pink", hex: "#FFC0CB", category: "Pink" },
  { name: "Light Pink", hex: "#FFB6C1", category: "Pink" },
  { name: "Pale Violet Red", hex: "#DB7093", category: "Pink" },
  { name: "Medium Violet Red", hex: "#C71585", category: "Pink" },
  { name: "Fuchsia", hex: "#FF00FF", category: "Pink" },
  { name: "Rose", hex: "#FF007F", category: "Pink" },
  // White
  { name: "White", hex: "#FFFFFF", category: "White" },
  { name: "Snow", hex: "#FFFAFA", category: "White" },
  { name: "Ivory", hex: "#FFFFF0", category: "White" },
  { name: "Seashell", hex: "#FFF5EE", category: "White" },
  { name: "Linen", hex: "#FAF0E6", category: "White" },
  { name: "Floral White", hex: "#FFFAF0", category: "White" },
  { name: "Alice Blue", hex: "#F0F8FF", category: "White" },
  // Gray
  { name: "Silver", hex: "#C0C0C0", category: "Gray" },
  { name: "Slate Gray", hex: "#708090", category: "Gray" },
  { name: "Gray", hex: "#808080", category: "Gray" },
  { name: "Dark Gray", hex: "#A9A9A9", category: "Gray" },
  { name: "Dim Gray", hex: "#696969", category: "Gray" },
  { name: "Light Gray", hex: "#D3D3D3", category: "Gray" },
  { name: "Gainsboro", hex: "#DCDCDC", category: "Gray" },
  { name: "Ash", hex: "#B2BEB5", category: "Gray" },
  // Black
  { name: "Black", hex: "#000000", category: "Black" },
  { name: "Jet", hex: "#343434", category: "Black" },
  { name: "Onyx", hex: "#353839", category: "Black" },
  { name: "Charcoal", hex: "#36454F", category: "Black" },
  { name: "Ebony", hex: "#555D50", category: "Black" },
];

const CATEGORIES = [
  "All",
  "Red",
  "Orange",
  "Brown",
  "Yellow",
  "Green",
  "Cyan",
  "Blue",
  "Purple",
  "Pink",
  "White",
  "Gray",
  "Black",
];

export function ExploreColors() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const filtered = COLORS.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.hex.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || c.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopy = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 1500);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = hex;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#160b05] text-white">
      {/* Header */}
      <div className="fixed left-0 right-0 top-0 z-50 px-6 pt-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto flex max-w-[1560px] items-center justify-between rounded-full border border-white/18 bg-white/8 px-5 py-3 backdrop-blur-xl"
        >
          <Link href="/" className="flex items-center">
            <img src="/hueflow.svg" alt="HueFlow" width={100} height={20} />
          </Link>
          <nav className="hidden items-center gap-5 text-sm text-white/70 md:flex">
            <Link href="/generator">Generator</Link>
            <Link href="/explore">Explore</Link>
            <Link href="/trends">Trends</Link>
            <Link href="/tools/picker">Picker</Link>
            <Link href="/tools/gradient">Gradient</Link>
            <Link href="/tools/contrast">Contrast</Link>
            <Link href="/tools/tailwind">Tailwind</Link>
            <Link href="/blog">Blog</Link>
          </nav>
          <Link
            href="/generator"
            className="rounded-full bg-white px-5 py-3 text-base font-semibold text-[#22130d]"
          >
            Try Demo
          </Link>
        </motion.header>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-[1560px] px-6 pt-28 pb-20 lg:px-8">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Explore Colors
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/50">
            Browse a curated library of colors organized by category. Click any
            color to copy its hex value.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative w-full max-w-md">
            <svg
              className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search colors by name or hex..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-12 pr-5 text-base text-white placeholder-white/30 outline-none transition-colors focus:border-white/25 focus:bg-white/8"
            />
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-white text-[#160b05]"
                  : "border border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Color count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="mb-6 text-center text-sm text-white/40"
        >
          {filtered.length} color{filtered.length !== 1 ? "s" : ""} found
        </motion.p>

        {/* Color Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
        >
          {filtered.map((color, i) => (
            <motion.button
              key={color.hex + color.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: Math.min(i * 0.02, 0.6) }}
              onClick={() => handleCopy(color.hex)}
              className="group relative cursor-pointer rounded-2xl border border-white/10 bg-gradient-to-b from-white/8 to-white/3 p-3 text-left backdrop-blur-xl transition-all hover:border-white/20 hover:from-white/12 hover:to-white/6"
            >
              <div
                className="mb-3 aspect-[4/3] w-full rounded-xl"
                style={{ backgroundColor: color.hex }}
              />
              <p className="truncate text-sm font-medium text-white">
                {color.name}
              </p>
              <p className="mt-0.5 text-xs font-mono text-white/40 uppercase">
                {color.hex}
              </p>

              {/* Copied feedback */}
              {copiedHex === color.hex && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/70 backdrop-blur-sm"
                >
                  <span className="text-sm font-semibold text-white">
                    Copied!
                  </span>
                </motion.div>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg text-white/40">
              No colors match your search.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-4 text-sm text-white/60 underline underline-offset-4 hover:text-white"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
