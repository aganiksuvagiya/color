import Link from "next/link";

import { findClosestColorName } from "@/lib/color-names";
import type { ResolvedContentEntry } from "@/lib/seo/content";
import { CopyHexButton } from "@/components/seo/copy-hex-button";
import { PaletteColorStrip } from "@/components/seo/palette-color-strip";
import { Header } from "@/components/header";

function hexToHslValues(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToHex(h: number, s: number, l: number) {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return Math.round(255 * (l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)))
      .toString(16).padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)); }

function isLight(hex: string) {
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  return (r*299+g*587+b*114)/1000 > 160;
}

function getSimilarColors(hex: string) {
  const { h, s, l } = hexToHslValues(hex);
  return [
    { dh: -25, ds:  5, dl:  12 },
    { dh: -12, ds: 12, dl:  -8 },
    { dh:  12, ds: -8, dl:   8 },
    { dh:  25, ds:  8, dl: -12 },
    { dh:   0, ds:-18, dl:  18 },
  ].map(({ dh, ds, dl }) => {
    const newHex = hslToHex((h + dh + 360) % 360, clamp(s + ds, 5, 95), clamp(l + dl, 8, 92));
    return { hex: newHex, slug: newHex.slice(1).toLowerCase(), name: findClosestColorName(newHex) };
  });
}

type Breadcrumb = { name: string; href: string };

const relatedGroups = [
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
    <main className="min-h-screen bg-[#f0ede8] text-[#1c1712]">
      <Header />

      {/* ── Hero ── */}
      <section className="border-b border-black/[0.06] bg-white">
        <div className="mx-auto max-w-6xl px-6 py-10 pt-28 lg:px-8">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[12px] text-[#1c1712]/40">
            {breadcrumbs.map((item, i) => (
              <span key={item.href} className="flex items-center gap-2">
                <Link href={item.href} className="transition hover:text-[#1c1712]/70">{item.name}</Link>
                {i < breadcrumbs.length - 1 && <span className="text-[#1c1712]/20">/</span>}
              </span>
            ))}
          </nav>

          {/* Color swatch */}
          {originalHex && (
            <div className="mt-6">
              <div className="h-36 w-full overflow-hidden rounded-2xl border border-black/[0.08] shadow-sm sm:h-44"
                style={{ backgroundColor: originalHex }}/>
              <div className="mt-3 flex items-center gap-3">
                <span className="font-mono text-[14px] font-semibold uppercase text-[#1c1712]/55">
                  {originalHex.toUpperCase()}
                </span>
                <CopyHexButton hex={originalHex}/>
              </div>
            </div>
          )}

          <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] text-[#1c1712] sm:text-5xl">{entry.title}</h1>
          <p className="mt-4 max-w-4xl text-[16px] leading-8 text-[#1c1712]/50">{entry.description}</p>

          {/* Palette strip */}
          {entry.paletteColors && entry.paletteColors.length > 0 && (
            <div className="mt-8">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#1c1712]/30">
                {originalHex ? "Palette colors" : "Color shades"}
              </p>
              <PaletteColorStrip colors={entry.paletteColors} linkToColors={!originalHex}/>
            </div>
          )}

          {/* Similar colors */}
          {similarColors.length > 0 && (
            <div className="mt-8">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#1c1712]/30">Similar colors</p>
              <div className="flex w-full overflow-hidden rounded-2xl border border-black/[0.08] shadow-sm">
                {similarColors.map((c, i) => {
                  const light = isLight(c.hex);
                  return (
                    <Link key={c.hex} href={`/colors/${c.slug}`}
                      className="group relative min-w-0 flex-1"
                      style={{ backgroundColor: c.hex }}>
                      <div className="flex h-20 flex-col items-center justify-center gap-0.5 px-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <p className={`w-full truncate text-center font-mono text-[11px] font-semibold uppercase ${light ? "text-black/60" : "text-white/80"}`}>
                          {c.hex.toUpperCase()}
                        </p>
                        <p className={`w-full truncate text-center text-[10px] ${light ? "text-black/45" : "text-white/55"}`}>
                          {c.name}
                        </p>
                      </div>
                      {i < similarColors.length - 1 && (
                        <span className="absolute right-0 top-1/4 h-1/2 w-px bg-black/10"/>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Answer box */}
          <div className="mt-8 rounded-2xl border border-[#e8531f]/20 bg-[#e8531f]/[0.05] p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#e8531f]">{answerLabel}</p>
            <p className="mt-3 text-[15px] leading-8 text-[#1c1712]/75">{entry.answer}</p>
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="mx-auto max-w-5xl px-6 py-10 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">

          {/* ── Main article ── */}
          <article className="min-w-0 flex-1 space-y-5">

            {/* Key takeaways */}
            <div className="rounded-2xl bg-white p-7">
              <h2 className="mb-4 text-[18px] font-bold text-[#1c1712]">Key Takeaways</h2>
              <ul className="space-y-3">
                {entry.keyTakeaways.map((t) => (
                  <li key={t} className="flex items-start gap-3 text-[15px] leading-[1.7] text-[#1c1712]/65">
                    <span className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#1c1712]/30"/>
                    {t}
                  </li>
                ))}
              </ul>
              {entry.quickFacts.length > 0 && (
                <div className="mt-5 space-y-2 border-t border-black/[0.07] pt-5">
                  {entry.quickFacts.map((fact) => (
                    <p key={fact.label} className="text-[14px] leading-[1.65] text-[#1c1712]/65">
                      <strong className="font-semibold text-[#1c1712]">{fact.label}:</strong>{" "}{fact.value}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom-line summary */}
            <div className="rounded-2xl bg-white p-7">
              <h2 className="mb-3 text-[18px] font-bold text-[#1c1712]">{entry.expertSummary.title}</h2>
              <p className="text-[15px] leading-[1.8] text-[#1c1712]/65">{entry.expertSummary.body}</p>
            </div>

            {/* Definitions */}
            <div className="rounded-2xl bg-white p-7">
              <h2 className="mb-5 text-[18px] font-bold text-[#1c1712]">Core Definitions</h2>
              <div className="space-y-5">
                {entry.definitions.map((item) => (
                  <div key={item.term}>
                    <h3 className="mb-1.5 text-[15px] font-semibold text-[#1c1712]">{item.term}</h3>
                    <p className="text-[14px] leading-[1.75] text-[#1c1712]/60">{item.definition}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Pros / Cons */}
            <div className="rounded-2xl bg-white p-7">
              <h2 className="mb-5 text-[18px] font-bold text-[#1c1712]">Pros &amp; Cons</h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <p className="mb-3 text-[13px] font-semibold text-[#1c1712]">Pros</p>
                  <ul className="space-y-2.5">
                    {entry.prosCons.pros.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[14px] leading-[1.7] text-[#1c1712]/60">
                        <span className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#1c1712]/30"/>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-[13px] leading-[1.6] text-[#1c1712]/40">
                    <strong className="font-semibold text-[#1c1712]/60">Note:</strong> Consider your use case before applying.
                  </p>
                </div>
                <div>
                  <p className="mb-3 text-[13px] font-semibold text-[#1c1712]">Cons</p>
                  <ul className="space-y-2.5">
                    {entry.prosCons.cons.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-[14px] leading-[1.7] text-[#1c1712]/60">
                        <span className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#1c1712]/30"/>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* AI sections */}
            {entry.aiSections.length > 0 && (
              <div className="rounded-2xl bg-white p-7">
                <div className="space-y-6">
                  {entry.aiSections.map((section) => (
                    <div key={section.title}>
                      <h3 className="mb-2 text-[16px] font-semibold text-[#1c1712]">{section.title}</h3>
                      <p className="text-[14px] leading-[1.8] text-[#1c1712]/60">{section.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Content sections */}
            {entry.sections.map((section, si) => (
              <div key={section.title} className="rounded-2xl bg-white p-7">
                <h2 className="mb-4 text-[18px] font-bold text-[#1c1712]">
                  {si + 1}. {section.title}
                </h2>
                <p className="text-[15px] leading-[1.8] text-[#1c1712]/65">{section.body}</p>
              </div>
            ))}

            {/* Comparison table */}
            {entry.comparisonRows && (
              <div className="rounded-2xl bg-white p-7">
                <h2 className="mb-5 text-[18px] font-bold text-[#1c1712]">Comparison</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left">
                    <thead>
                      <tr className="border-b border-black/[0.08]">
                        {["Option","Best for","Strengths","Watchouts"].map(h => (
                          <th key={h} className="pb-3 pr-6 text-[11px] font-semibold text-[#1c1712]/40">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/[0.06]">
                      {entry.comparisonRows.map((row) => (
                        <tr key={row.label}>
                          <td className="py-3 pr-6 text-[13px] font-semibold text-[#1c1712]">{row.label}</td>
                          <td className="py-3 pr-6 text-[13px] text-[#1c1712]/55">{row.bestFor}</td>
                          <td className="py-3 pr-6 text-[13px] text-[#1c1712]/55">{row.strengths}</td>
                          <td className="py-3 text-[13px] text-[#1c1712]/55">{row.watchouts}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Examples */}
            {entry.examples && (
              <div className="rounded-2xl bg-white p-7">
                <h2 className="mb-5 text-[18px] font-bold text-[#1c1712]">Examples</h2>
                <div className="space-y-5">
                  {entry.examples.map((example) => (
                    <div key={example.title}>
                      <h3 className="mb-1.5 text-[15px] font-semibold text-[#1c1712]">{example.title}</h3>
                      <p className="text-[14px] leading-[1.75] text-[#1c1712]/60">{example.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Citations */}
            {entry.citationBlocks.length > 0 && (
              <div className="rounded-2xl bg-white p-7">
                <h2 className="mb-5 text-[18px] font-bold text-[#1c1712]">Key Quotes</h2>
                <div className="space-y-4">
                  {entry.citationBlocks.map((block) => (
                    <blockquote key={block}
                      className="border-l-[3px] border-[#1c1712]/20 pl-5 text-[14px] italic leading-[1.8] text-[#1c1712]/55">
                      {block}
                    </blockquote>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ */}
            <div className="rounded-2xl bg-white p-7">
              <h2 className="mb-6 text-[18px] font-bold text-[#1c1712]">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {entry.faq.map((item) => (
                  <div key={item.question}>
                    <h3 className="mb-2 text-[15px] font-semibold text-[#1c1712]">{item.question}</h3>
                    <p className="text-[14px] leading-[1.8] text-[#1c1712]/60">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          {/* ── Sidebar ── */}
          <aside className="w-full shrink-0 space-y-5 lg:sticky lg:top-6 lg:w-[240px] lg:self-start">

            {entry.entityRelations.length > 0 && (
              <div className="rounded-2xl bg-white p-5">
                <p className="mb-4 text-[12px] font-semibold text-[#1c1712]">Related Concepts</p>
                <div className="space-y-3">
                  {entry.entityRelations.map((rel) => (
                    <p key={`${rel.entity}-${rel.connectedTo}`} className="text-[13px] leading-[1.6] text-[#1c1712]/60">
                      <strong className="font-semibold text-[#1c1712]">{rel.entity}</strong>{" "}
                      {rel.relationship}{" "}
                      <strong className="font-semibold text-[#1c1712]">{rel.connectedTo}</strong>
                    </p>
                  ))}
                </div>
              </div>
            )}

            {groupedLinks.map((group) => (
              <div key={group.label} className="rounded-2xl bg-white p-5">
                <p className="mb-3 text-[12px] font-semibold text-[#1c1712]">{group.label}</p>
                <ul className="space-y-1">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}
                        className="flex items-start gap-2.5 py-1 text-[13px] text-[#1c1712]/55 transition hover:text-[#1c1712]">
                        <span className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-[#1c1712]/25"/>
                        {link.title}
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
