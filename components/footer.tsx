import Image from "next/image";
import Link from "next/link";

const FOOTER_LINKS = [
  {
    heading: "Explore",
    links: [
      { href: "/generator", label: "Generator" },
      { href: "/explore", label: "Explore Colors" },
      { href: "/palettes", label: "Palettes" },
      { href: "/gradients", label: "Gradients" },
      { href: "/trends", label: "Trends" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    heading: "Tools",
    links: [
      { href: "/tools/picker", label: "Color Picker" },
      { href: "/tools/gradient", label: "Gradient Generator" },
      { href: "/tools/contrast", label: "Contrast Checker" },
      { href: "/tools/tailwind", label: "Tailwind Colors" },
      { href: "/tools/image-colors", label: "Image Colors" },
      { href: "/tools/color-mixer", label: "Color Mixer" },
    ],
  },
  {
    heading: "Learn",
    links: [
      { href: "/color-meanings", label: "Color Meanings" },
      { href: "/color-psychology", label: "Color Psychology" },
      { href: "/brand-colors", label: "Brand Colors" },
      { href: "/accessibility", label: "Accessibility" },
      { href: "/guides", label: "Guides" },
      { href: "/faqs", label: "FAQs" },
    ],
  },
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#160b05] text-white">
      <div className="mx-auto max-w-[1560px] px-6 py-14 sm:px-8">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <Link href="/" className="inline-flex items-center">
              <Image src="/hueflow.svg" alt="HueFlow" width={100} height={20} />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/50">
              Colors, palettes, gradients, and accessible brand color systems
              for product, marketing, and web design.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            {FOOTER_LINKS.map((group) => (
              <div key={group.heading}>
                <p className="text-xs font-semibold uppercase tracking-wider text-white/40">
                  {group.heading}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/60 transition-colors hover:text-white"
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
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} HueFlow. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="transition-colors hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-white">
              Terms
            </Link>
            <Link href="/contact" className="transition-colors hover:text-white">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
