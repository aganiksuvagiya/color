import Image from "next/image";
import Link from "next/link";

// Six balanced columns (5-6 links each). Privacy and Terms live only in the bottom bar.
const FOOTER_LINKS = [
  {
    heading: "Product",
    links: [
      { href: "/generator", label: "Palette Generator" },
      { href: "/tools/picker", label: "Color Picker" },
      { href: "/color-converter", label: "Color Converter" },
      { href: "/tools/contrast", label: "Contrast Checker" },
      { href: "/trends", label: "Color Trends" },
    ],
  },
  {
    heading: "Palettes",
    links: [
      { href: "/palettes", label: "Color Palettes" },
      { href: "/color-palettes", label: "Palette Library" },
      { href: "/color-combinations", label: "Color Combinations" },
      { href: "/gradients", label: "Gradients" },
      { href: "/brand-colors", label: "Brand Colors" },
    ],
  },
  {
    heading: "Colors",
    links: [
      { href: "/shades", label: "Color Shades" },
      { href: "/color-codes", label: "Color Codes" },
      { href: "/color-meanings", label: "Color Meanings" },
      { href: "/tailwind", label: "Tailwind Colors" },
      { href: "/css-colors", label: "CSS Colors" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/faqs", label: "FAQ" },
      { href: "/color-psychology", label: "Color Psychology" },
      { href: "/accessibility", label: "Accessibility" },
      { href: "/web-design", label: "Web Design Colors" },
      { href: "/marketing-colors", label: "Marketing Colors" },
    ],
  },
  {
    heading: "Guides",
    links: [
      { href: "/guides", label: "Guides" },
      { href: "/best-colors-for", label: "Best Colors For" },
      { href: "/comparisons", label: "Comparisons" },
      { href: "/explainers", label: "Explainers" },
      { href: "/resources", label: "Resource Library" },
      { href: "/developer", label: "Developer Docs" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
] as const;

// Crawlable links to the dedicated converter pages and the keyword landing pages.
const CONVERTER_LINKS = [
  { href: "/hex-to-rgb", label: "HEX to RGB" },
  { href: "/rgb-to-hex", label: "RGB to HEX" },
  { href: "/hex-to-hsl", label: "HEX to HSL" },
  { href: "/hsl-to-hex", label: "HSL to HEX" },
  { href: "/rgb-to-hsl", label: "RGB to HSL" },
  { href: "/hex-to-cmyk", label: "HEX to CMYK" },
  { href: "/rgb-to-cmyk", label: "RGB to CMYK" },
  { href: "/hex-to-oklch", label: "HEX to OKLCH" },
  { href: "/random-color-generator", label: "Random Color Generator" },
  { href: "/color-name-finder", label: "Color Name Finder" },
  { href: "/color-wheel", label: "Color Wheel" },
  { href: "/color-palette-from-image", label: "Color Palette from Image" },
];

const BRAND_STRIP = ["#E8531F", "#F4A261", "#2A9D8F", "#1D4E89", "#1C1712"];

export function Footer() {
  return (
    <footer className="border-t border-black/8 bg-white text-[#1c1712]">
      <div className="mx-auto max-w-[1400px] px-6 py-16 sm:px-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-[minmax(0,1.5fr)_repeat(6,minmax(0,1fr))]">
          <div className="col-span-2 sm:col-span-3 lg:col-span-1 lg:pr-6">
            <Link href="/" className="inline-flex items-center">
              <Image src="/hueflow.svg" alt="HueFlow" width={104} height={22} className="[filter:brightness(0)_saturate(100%)]" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-[#1c1712]/60">
              A free color workspace: generate palettes, explore shades, check contrast and copy any color code.
            </p>
            <div className="mt-5 flex h-2 w-40 overflow-hidden rounded-full" aria-hidden="true">
              {BRAND_STRIP.map((hex) => (
                <span key={hex} className="flex-1" style={{ backgroundColor: hex }} />
              ))}
            </div>
            <Link
              href="/generator"
              className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-[#e8531f] px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-[#d04717]"
            >
              Generate a palette →
            </Link>
          </div>
          {FOOTER_LINKS.map((group) => (
            <div key={group.heading}>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#1c1712]/55">{group.heading}</p>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-[#1c1712]/65 transition-colors hover:text-[#e8531f]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <nav aria-label="Popular color tools" className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-black/8 pt-6 text-[13px]">
          <span className="font-semibold uppercase tracking-wider text-[#1c1712]/55">Popular tools</span>
          {CONVERTER_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-[#1c1712]/60 transition-colors hover:text-[#e8531f]">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-6 flex flex-col gap-3 border-t border-black/8 pt-6 text-sm text-[#1c1712]/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} HueFlow. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="transition-colors hover:text-[#1c1712]">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-[#1c1712]">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
