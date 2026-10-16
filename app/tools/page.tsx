import type { Metadata } from "next";
import { Header } from "@/components/header";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Color Tools: Palette, Contrast, Gradient & More",
  alternates: { canonical: "/tools" },
  description: "Free online color tools for designers and developers: palette generator, color picker, contrast checker, gradient generator, color converter, image color extractor and more.",
};

const tools = [
  {
    href: "/random-color-generator",
    title: "Random Color Generator",
    description: "Press space for a random color or palette with HEX, RGB and HSL codes.",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="3" /><circle cx="8.5" cy="8.5" r="1.2" fill="currentColor" /><circle cx="15.5" cy="15.5" r="1.2" fill="currentColor" /><circle cx="15.5" cy="8.5" r="1.2" fill="currentColor" /><circle cx="8.5" cy="15.5" r="1.2" fill="currentColor" />
      </svg>
    ),
    tag: "New",
  },
  {
    href: "/color-name-finder",
    title: "Color Name Finder",
    description: "Enter a hex, RGB or HSL code and find the closest named color.",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
      </svg>
    ),
    tag: "New",
  },
  {
    href: "/color-converter",
    title: "Color Converter",
    description: "Convert HEX, RGB, HSL, CMYK and OKLCH, with a page for every pair.",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path d="M7 7h11l-3-3M17 17H6l3 3" />
      </svg>
    ),
  },
  {
    href: "/tools/playground",
    title: "Color Playground",
    description: "Adjust hue, saturation, lightness and contrast - see a live UI preview update in real time.",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
    tag: "New",
  },
  {
    href: "/generator",
    title: "Palette Generator",
    description: "Generate beautiful color palettes. Randomize, lock colors, export.",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2l2.2 6.6L21 11l-6.8 2.4L12 20l-2.2-6.6L3 11l6.8-2.4z" />
      </svg>
    ),
    tag: "Popular",
  },
  {
    href: "/tools/color-mixer",
    title: "Color Mixer",
    description: "Blend two colors together and see the mixed result with hex code.",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <circle cx="9" cy="9" r="6" /><circle cx="15" cy="15" r="6" />
      </svg>
    ),
  },
  {
    href: "/tools/contrast",
    title: "Contrast Checker",
    description: "Check WCAG contrast ratio between foreground and background colors.",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="10" /><path d="M12 2v20M2 12h20" />
      </svg>
    ),
    tag: "Accessibility",
  },
  {
    href: "/tools/gradient",
    title: "Gradient Generator",
    description: "Create CSS gradients with custom colors, angles and stops.",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="3" /><path d="M3 12h18" />
      </svg>
    ),
  },
  {
    href: "/tools/image-colors",
    title: "Image Color Extractor",
    description: "Upload any image and extract its dominant color palette.",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
      </svg>
    ),
  },
  {
    href: "/tools/picker",
    title: "Color Picker",
    description: "Pick any color and get its hex, RGB, and HSL values instantly.",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
  {
    href: "/tools/color-harmony",
    title: "Color Harmony",
    description: "Generate complementary, analogous, triadic, and split-complementary palettes.",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
  {
    href: "/tools/colorblind-simulator",
    title: "Color Blind Simulator",
    description: "See how your palette looks to people with different types of color blindness.",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
    tag: "Accessibility",
  },
  {
    href: "/tools/brand-analyzer",
    title: "Brand Color Analyzer",
    description: "Analyze any brand's color palette and get insights on its psychology.",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      </svg>
    ),
  },
  {
    href: "/tools/design-tokens",
    title: "Design Token Generator",
    description: "Convert your palette into design tokens for CSS, Figma, and code.",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    tag: "Dev",
  },
  {
    href: "/tools/tailwind",
    title: "Tailwind Colors",
    description: "Browse and copy all Tailwind CSS color values with one click.",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z" />
      </svg>
    ),
    tag: "Dev",
  },
  {
    href: "/tools/tailwind-scale",
    title: "Tailwind Scale Generator",
    description: "Generate a full Tailwind color scale from any base color.",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
    tag: "Dev",
  },
  {
    href: "/tools/gradient",
    title: "Gradient Generator",
    description: "Create beautiful CSS linear and radial gradients.",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="3" />
      </svg>
    ),
  },
  {
    href: "/tools/image-recolor",
    title: "SVG Image Recolor",
    description: "Recolor SVG files with your custom color palette.",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" /><circle cx="8.5" cy="7.5" r=".5" />
        <circle cx="6.5" cy="12.5" r=".5" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 011.648-1.688h1.96c3.002 0 5.438-2.422 5.438-5.406C21.965 6.767 17.483 2 12 2z" />
      </svg>
    ),
  },
  {
    href: "/tools/contrast-fixer",
    title: "Contrast Fixer",
    description: "Automatically fix colors that fail WCAG contrast requirements.",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    tag: "Accessibility",
  },
  {
    href: "/tools/palette-visualizer",
    title: "Palette Visualizer",
    description: "Preview how your palette looks in real UI components.",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    href: "/tools/collage",
    title: "Collage Creator",
    description: "Create color collages and mood boards from your palettes.",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    href: "/tools/animation",
    title: "Color Animation Generator",
    description: "Create CSS animations that transition between your palette colors.",
    icon: (
      <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
    tag: "Dev",
  },
];

// Remove duplicates
const uniqueTools = tools.filter((t, i, arr) => arr.findIndex(x => x.href === t.href) === i);

const TAG_STYLES: Record<string, string> = {
  New: "bg-[#c2410c] text-white",
  Popular: "bg-[#1c1712] text-white",
};

export default function ToolsPage() {
  return (
    <main className="min-h-screen bg-white text-[#1c1712]">
      <Header />

      {/* Header */}
      <section className="w-full px-6 pb-10 pt-28 sm:px-8 lg:px-12">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] text-[#1c1712]/40">
          <Link href="/" className="transition hover:text-[#1c1712]/70">Home</Link>
          <span className="text-[#1c1712]/20">/</span>
          <span className="text-[#1c1712]/60">Tools</span>
        </nav>
        <h1 className="mt-8 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">Every color tool, in one place.</h1>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="flex -space-x-1.5" aria-hidden="true">
            {["#6366f1", "#10b981", "#f59e0b", "#ec4899", "#0ea5e9"].map((c) => (
              <span key={c} className="h-5 w-5 rounded-full ring-2 ring-white" style={{ backgroundColor: c }} />
            ))}
          </span>
          <p className="hub-description text-[16px] text-[#1c1712]/55">
            <span className="font-semibold text-[#1c1712]/80">{uniqueTools.length} free tools.</span> For designers and developers to create, check, and export colors.
          </p>
        </div>
      </section>

      {/* Tools */}
      <section className="border-t border-black/[0.06]">
        <div className="w-full px-6 py-12 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {uniqueTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group relative flex flex-col rounded-2xl p-6 ring-1 ring-black/[0.07] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-18px_rgba(28,23,18,0.35)] hover:ring-black/20"
              >
                {tool.tag && (
                  <span className={`absolute right-4 top-4 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${TAG_STYLES[tool.tag] ?? "bg-[#1c1712]/[0.06] text-[#1c1712]/65"}`}>
                    {tool.tag}
                  </span>
                )}
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl text-[#1c1712]/65 ring-1 ring-black/[0.1] transition-colors group-hover:text-[#c2410c]">
                  {tool.icon}
                </div>
                <h2 className="text-[1.05rem] font-semibold tracking-[-0.015em]">{tool.title}</h2>
                <p className="mt-1.5 flex-1 text-[14px] leading-6 text-[#1c1712]/60">{tool.description}</p>
                <p className="mt-5 text-[13px] font-semibold text-[#c2410c]">
                  Open tool <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
