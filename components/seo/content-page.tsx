import Link from "next/link";

import { getClosestNamedColors } from "@/lib/color-names";
import type { ResolvedContentEntry } from "@/lib/seo/content";
import { CopyHexButton } from "@/components/seo/copy-hex-button";
import { PaletteColorStrip } from "@/components/seo/palette-color-strip";
import { Breadcrumbs, Faq, SmallTitle, eyebrow } from "@/components/seo/page-ui";
import { Header } from "@/components/header";

function isLight(hex: string) {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  return (r*299+g*587+b*114)/1000 > 160;
}

function getSimilarColors(hex: string) {
  return getClosestNamedColors(hex, 5).map((color) => ({ hex: color.hex, slug: color.slug, name: color.name }));
}

type Breadcrumb = { name: string; href: string };

const relatedGroups = [
  { label: "Shades",                     match: "/shades-of-" },
  { label: "Palette library",            match: "/color-palettes/" },
  { label: "Related colors",             match: "/colors/" },
  { label: "Related color meanings",     match: "/color-meanings/" },
  { label: "Related color psychology",   match: "/color-psychology/" },
  { label: "Related palettes",           match: "/palettes/" },
  { label: "Related gradients",          match: "/gradients/" },
  { label: "Accessibility guides",       match: "/accessibility/" },
  { label: "Branding guides",            match: "/brand-colors/" },
  { label: "Tailwind guides",            match: "/tailwind/" },
  { label: "CSS guides",                 match: "/css-colors/" },
  { label: "Developer guides",           match: "/developer/" },
  { label: "Color tools",                match: "/tools/" },
  { label: "Related articles",           match: "/" },
] as const;

const h2 = "text-[1.5rem] font-semibold leading-tight tracking-[-0.025em]";
const body = "text-[16px] leading-8 text-[#1c1712]/70";
const block = "border-t border-black/[0.07] py-10 first:border-t-0 first:pt-0";

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((t) => (
        <li key={t} className="flex items-start gap-3 text-[15px] leading-7 text-[#1c1712]/70">
          <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#c2410c]" />
          {t}
        </li>
      ))}
    </ul>
  );
}

export function ContentPageView({
  entry,
  breadcrumbs,
  answerLabel = "Direct answer",
}: {
  entry: ResolvedContentEntry;
  breadcrumbs: Breadcrumb[];
  answerLabel?: string;
}) {
  const hexFact      = entry.quickFacts.find((f) => f.label === "Hex");
  const originalHex  = hexFact?.value ?? null;
  const light        = originalHex ? isLight(originalHex) : false;
  const similarColors = originalHex
    ? [
        { hex: originalHex, slug: originalHex.slice(1).toLowerCase(), name: entry.quickFacts.find(f => f.label === "Closest named color")?.value ?? originalHex },
        ...getSimilarColors(originalHex),
      ]
    : [];

  const groupedLinks = relatedGroups
    .map((group) => ({
      label: group.label,
      links: group.match === "/"
        ? entry.relatedLinks.filter((link) =>
            ["/guides/", "/explainers/", "/comparisons/", "/faqs/", "/resources/", "/blog"].some((p) => link.href.startsWith(p))
          )
        : entry.relatedLinks.filter((link) => link.href.startsWith(group.match)),
    }))
    .filter((g) => g.links.length > 0);

  return (
    <main className="min-h-screen bg-white text-[#1c1712]">
      <Header />

      {/* ── Header ── */}
      <section className="w-full px-6 pb-12 pt-28 sm:px-8 lg:px-12">
        <Breadcrumbs items={breadcrumbs.map((b) => ({ title: b.name, href: b.href }))} />

        {originalHex && (
          <div
            className="mt-8 flex min-h-[11rem] flex-col justify-end rounded-2xl p-5 ring-1 ring-black/[0.07] sm:min-h-[14rem] sm:p-6"
            style={{ backgroundColor: originalHex }}
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xl font-semibold uppercase tracking-[0.08em]" style={{ color: light ? "rgba(28,23,18,0.7)" : "rgba(255,255,255,0.85)" }}>
                {originalHex.toUpperCase()}
              </span>
              <CopyHexButton hex={originalHex} tone={light ? "dark" : "light"} />
            </div>
          </div>
        )}

        <h1 className="mt-8 max-w-5xl text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">{entry.title}</h1>
        <p className="mt-5 max-w-4xl text-[16px] leading-7 text-[#1c1712]/55">{entry.description}</p>

        {entry.paletteColors && entry.paletteColors.length > 0 && (
          <div className="mt-10">
            <SmallTitle>{originalHex ? "Palette colors" : "Color shades"}</SmallTitle>
            <PaletteColorStrip colors={entry.paletteColors} linkToColors={!originalHex} />
          </div>
        )}

        {similarColors.length > 0 && (
          <div className="mt-10">
            <SmallTitle>Similar colors</SmallTitle>
            <div className="flex h-24 w-full overflow-hidden rounded-2xl ring-1 ring-black/[0.07]">
              {similarColors.map((c) => (
                <Link
                  key={c.hex}
                  href={`/colors/${c.slug}`}
                  className="group/swatch relative min-w-0 flex-1 transition-[flex] duration-300 hover:z-10 hover:flex-[2.4]"
                  style={{ backgroundColor: c.hex }}
                  title={`${c.name} ${c.hex.toUpperCase()}`}
                >
                  <span className="absolute inset-x-0 bottom-2.5 flex justify-center px-1">
                    <span className="max-w-full truncate whitespace-nowrap rounded-full bg-black/55 px-2.5 py-1 font-mono text-[10px] text-white opacity-0 transition-opacity duration-200 group-hover/swatch:opacity-100">
                      {c.hex.toUpperCase()} · {c.name}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-12 max-w-4xl">
          <p className={eyebrow}>{answerLabel}</p>
          <p className="hub-answer mt-3 text-[1.2rem] font-medium leading-9 tracking-[-0.01em]">{entry.answer}</p>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="border-t border-black/[0.06]">
        <div className="grid w-full gap-12 px-6 py-14 sm:px-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16 lg:px-12">
          {/* Article */}
          <article className="min-w-0 max-w-4xl">
            {entry.palettes && entry.palettes.length > 0 && (
              <div className={block}>
                <h2 className={h2}>Ready-to-Use Color Palettes</h2>
                <p className="mt-2 text-[15px] leading-7 text-[#1c1712]/55">Click any swatch to copy its hex code.</p>
                <div className="mt-8 space-y-6">
                  {entry.palettes.map((palette) => (
                    <div key={palette.name} className="rounded-2xl p-5 ring-1 ring-black/[0.07] sm:p-6">
                      <h3 className="text-[1.05rem] font-semibold">{palette.name}</h3>
                      <p className="mb-4 text-[14px] text-[#1c1712]/55">{palette.useCase}</p>
                      <PaletteColorStrip colors={palette.colors} />
                      <p className="mt-3 font-mono text-[12px] uppercase tracking-wide text-[#1c1712]/50">{palette.colors.join(" · ")}</p>
                      <p className="mt-2 text-[15px] leading-7 text-[#1c1712]/65">{palette.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className={block}>
              <h2 className={h2}>Key Takeaways</h2>
              <div className="mt-5">
                <Bullets items={entry.keyTakeaways} />
              </div>
              {entry.quickFacts.length > 0 && (
                <dl className="mt-7 grid gap-x-8 gap-y-1 rounded-2xl p-5 ring-1 ring-black/[0.07] sm:grid-cols-2">
                  {entry.quickFacts.map((fact) => (
                    <div key={fact.label} className="flex items-baseline gap-2 border-b border-black/[0.05] py-2 text-[14px] last:border-0 sm:[&:nth-last-child(2):nth-child(odd)]:border-0">
                      <dt className="shrink-0 font-semibold">{fact.label}:</dt>
                      <dd className="min-w-0 break-words text-[#1c1712]/65">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>

            <div className={block}>
              <h2 className={h2}>{entry.expertSummary.title}</h2>
              <p className={`${body} mt-4`}>{entry.expertSummary.body}</p>
            </div>

            <div className={block}>
              <h2 className={h2}>Core Definitions</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {entry.definitions.map((item) => (
                  <div key={item.term} className="rounded-xl p-5 ring-1 ring-black/[0.07]">
                    <h3 className="text-[15px] font-semibold">{item.term}</h3>
                    <p className="mt-1.5 text-[14px] leading-6 text-[#1c1712]/65">{item.definition}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={block}>
              <h2 className={h2}>Pros &amp; Cons</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div className="rounded-xl p-5 ring-1 ring-black/[0.07]">
                  <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-emerald-700">Pros</p>
                  <ul className="space-y-3">
                    {entry.prosCons.pros.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[14px] leading-6 text-[#1c1712]/70">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[11px] font-bold text-emerald-700" aria-hidden="true">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-[13px] leading-6 text-[#1c1712]/45">
                    <strong className="font-semibold text-[#1c1712]/60">Note:</strong> Consider your use case before applying.
                  </p>
                </div>
                <div className="rounded-xl p-5 ring-1 ring-black/[0.07]">
                  <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-red-700">Cons</p>
                  <ul className="space-y-3">
                    {entry.prosCons.cons.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[14px] leading-6 text-[#1c1712]/70">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100 text-[11px] font-bold text-red-600" aria-hidden="true">✕</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {entry.aiSections.length > 0 && (
              <div className={block}>
                <div className="space-y-7">
                  {entry.aiSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="text-[1.1rem] font-semibold tracking-[-0.01em]">{section.title}</h3>
                      <p className={`${body} mt-2`}>{section.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {entry.sections.map((section, si) => (
              <div key={section.title} className={block}>
                <h2 className={h2}>
                  <span className="mr-3 text-[#c2410c]">{String(si + 1).padStart(2, "0")}</span>
                  {section.title}
                </h2>
                <p className={`${body} mt-4`}>{section.body}</p>
              </div>
            ))}

            {entry.comparisonRows && (
              <div className={block}>
                <h2 className={h2}>Comparison</h2>
                <div className="mt-6 overflow-x-auto rounded-2xl ring-1 ring-black/[0.07]">
                  <table className="w-full min-w-[640px] text-left">
                    <thead>
                      <tr className="border-b border-black/[0.07] bg-[#fafafa]">
                        {["Option","Best for","Strengths","Watchouts"].map(h => (
                          <th key={h} className="px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1c1712]/45">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/[0.06]">
                      {entry.comparisonRows.map((row) => (
                        <tr key={row.label}>
                          <td className="px-4 py-3 text-[14px] font-semibold">{row.label}</td>
                          <td className="px-4 py-3 text-[14px] text-[#1c1712]/65">{row.bestFor}</td>
                          <td className="px-4 py-3 text-[14px] text-[#1c1712]/65">{row.strengths}</td>
                          <td className="px-4 py-3 text-[14px] text-[#1c1712]/65">{row.watchouts}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {entry.examples && (
              <div className={block}>
                <h2 className={h2}>Examples</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {entry.examples.map((example) => (
                    <div key={example.title} className="rounded-xl p-5 ring-1 ring-black/[0.07]">
                      <h3 className="text-[15px] font-semibold">{example.title}</h3>
                      <p className="mt-1.5 text-[14px] leading-6 text-[#1c1712]/65">{example.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {entry.citationBlocks.length > 0 && (
              <div className={block}>
                <h2 className={h2}>Key Quotes</h2>
                <div className="mt-6 space-y-5">
                  {entry.citationBlocks.map((quote) => (
                    <blockquote key={quote} className="border-l-2 border-[#c2410c] pl-5 text-[15px] italic leading-7 text-[#1c1712]/65">
                      {quote}
                    </blockquote>
                  ))}
                </div>
              </div>
            )}

            <div className={block}>
              <p className={eyebrow}>FAQ</p>
              <h2 className={`${h2} mt-2`}>Frequently Asked Questions</h2>
              <div className="mt-6">
                <Faq items={entry.faq} />
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="min-w-0 space-y-8 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto lg:pr-1">
            {entry.entityRelations.length > 0 && (
              <div>
                <SmallTitle>Related concepts</SmallTitle>
                <div className="space-y-3">
                  {entry.entityRelations.map((rel) => (
                    <p key={`${rel.entity}-${rel.connectedTo}`} className="text-[14px] leading-6 text-[#1c1712]/65">
                      <strong className="font-semibold text-[#1c1712]">{rel.entity}</strong>{" "}
                      {rel.relationship}{" "}
                      <strong className="font-semibold text-[#1c1712]">{rel.connectedTo}</strong>
                    </p>
                  ))}
                </div>
              </div>
            )}

            {originalHex && (
              <div>
                <SmallTitle>Use {originalHex.toUpperCase()}</SmallTitle>
                <ul className="space-y-1">
                  {[
                    { title: "Convert HEX to RGB", href: "/hex-to-rgb" },
                    { title: "Convert HEX to HSL", href: "/hex-to-hsl" },
                    { title: "Convert HEX to CMYK", href: "/hex-to-cmyk" },
                    { title: "Convert HEX to OKLCH", href: "/hex-to-oklch" },
                    { title: "Check text contrast", href: "/tools/contrast" },
                    { title: "Find a color name", href: "/color-name-finder" },
                  ].map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="group flex items-start justify-between gap-3 rounded-lg px-3 py-2 text-[14px] leading-5 text-[#1c1712]/70 transition hover:bg-[#1c1712]/[0.04] hover:text-[#1c1712]">
                        {link.title}
                        <span className="shrink-0 text-[#1c1712]/30 transition group-hover:translate-x-0.5 group-hover:text-[#c2410c]" aria-hidden="true">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {groupedLinks.map((group) => (
              <div key={group.label}>
                <SmallTitle>{group.label}</SmallTitle>
                <ul className="space-y-1">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="group flex items-start justify-between gap-3 rounded-lg px-3 py-2 text-[14px] leading-5 text-[#1c1712]/70 transition hover:bg-[#1c1712]/[0.04] hover:text-[#c2410c]">
                        {link.title}
                        <span className="shrink-0 text-[#1c1712]/30 transition group-hover:translate-x-0.5 group-hover:text-[#c2410c]" aria-hidden="true">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </aside>
        </div>
      </section>
    </main>
  );
}
