import Image from "next/image";
import Link from "next/link";
import { EffectiveCpmAd } from "./ad-slot";

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
    heading: "Explore",
    links: [
      { href: "/palettes", label: "Color Palettes" },
      { href: "/color-combinations", label: "Color Combinations" },
      { href: "/tools/tailwind-scale", label: "Color Shades" },
      { href: "/explore", label: "Color Inspiration" },
      { href: "/gradients", label: "Gradients" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { href: "/color-meanings", label: "Color Guide" },
      { href: "/blog", label: "Blog" },
      { href: "/faqs", label: "FAQ" },
      { href: "/color-psychology", label: "Color Psychology" },
      { href: "/accessibility", label: "Accessibility" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-black/8 bg-[#faf7f2] text-[#1c1712]">
      <div className="mx-auto max-w-[1400px] px-6 py-16 sm:px-8">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <Link href="/" className="inline-flex items-center">
              <Image src="/hueflow.svg" alt="HueFlow" width={104} height={22} className="[filter:brightness(0)_saturate(100%)]" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[#1c1712]/55">
              Find colors that feel right.
            </p>
            <div className="mt-6 rounded-2xl border border-black/8 bg-white p-3">
              <div className="max-h-[160px] overflow-hidden rounded-xl [&_img]:h-auto [&_img]:max-h-[110px] [&_img]:w-full [&_img]:object-cover">
                <EffectiveCpmAd />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {FOOTER_LINKS.map((group) => (
              <div key={group.heading}>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#1c1712]/35">
                  {group.heading}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-[#1c1712]/60 transition-colors hover:text-[#e8531f]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-black/8 pt-6 text-sm text-[#1c1712]/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} HueFlow. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="transition-colors hover:text-[#1c1712]">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-[#1c1712]">
              Terms
            </Link>
            <Link href="/contact" className="transition-colors hover:text-[#1c1712]">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
