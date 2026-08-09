import Link from "next/link";

import { findClosestColorName } from "@/lib/color-names";
import type { ResolvedContentEntry } from "@/lib/seo/content";
import { CopyHexButton } from "@/components/seo/copy-hex-button";
import { PaletteColorStrip } from "@/components/seo/palette-color-strip";

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

type Breadcrumb = {
  name: string;
  href: string;
};

const relatedGroups = [
  { label: "Related colors", match: "/colors/" },
  { label: "Related color meanings", match: "/color-meanings/" },
  { label: "Related color psychology", match: "/color-psychology/" },
  { label: "Related palettes", match: "/palettes/" },
  { label: "Related gradients", match: "/gradients/" },
  { label: "Related accessibility guides", match: "/accessibility/" },
  { label: "Related branding guides", match: "/brand-colors/" },
  { label: "Tailwind guides", match: "/tailwind/" },
  { label: "CSS guides", match: "/css-colors/" },
  { label: "Developer guides", match: "/developer/" },
  { label: "Color tools", match: "/tools/" },
  { label: "Related articles", match: "/" },
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
  const hexFact = entry.quickFacts.find((f) => f.label === "Hex");
  const originalHex = hexFact?.value ?? null;
  const similarColors = originalHex
    ? [
        { hex: originalHex, slug: originalHex.slice(1).toLowerCase(), name: entry.quickFacts.find(f => f.label === "Closest named color")?.value ?? originalHex },
        ...getSimilarColors(originalHex),
      ]
    : [];

  const groupedLinks = relatedGroups
    .map((group) => ({
      label: group.label,
      links:
        group.match === "/"
          ? entry.relatedLinks.filter((link) =>
              ["/guides/", "/explainers/", "/comparisons/", "/faqs/", "/resources/", "/blog"].some((prefix) =>
                link.href.startsWith(prefix),
              ),
            )
          : entry.relatedLinks.filter((link) => link.href.startsWith(group.match)),
    }))
    .filter((group) => group.links.length > 0);

  return (
    <main className="relative min-h-screen bg-[#160b05] text-white">
      {/* Background gradients matching homepage */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(0,0,0,0.95),transparent_18%),radial-gradient(circle_at_88%_0%,rgba(255,106,44,0.18),transparent_30%),linear-gradient(135deg,#1a0e06_0%,#160b05_50%,#1a0e06_100%)]" />
      <div className="noise absolute inset-0 opacity-20" />

      {/* Hero section */}
      <section className="relative border-b border-white/8">
        <div className="mx-auto max-w-6xl px-6 py-10 pt-28 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-white/40">
            {breadcrumbs.map((item, index) => (
              <span key={item.href} className="flex items-center gap-2">
                <Link href={item.href} className="hover:text-white/70 transition-colors">
                  {item.name}
                </Link>
                {index < breadcrumbs.length - 1 ? <span className="text-white/20">/</span> : null}
              </span>
            ))}
          </nav>
          {originalHex && (
            <div className="mt-6">
              <div
                className="h-36 w-full rounded-2xl sm:h-44"
                style={{ backgroundColor: originalHex }}
              />
              <div className="mt-3 flex items-center gap-3">
                <span className="font-mono text-base font-semibold uppercase text-white/70">
                  {originalHex.toUpperCase()}
                </span>
                <CopyHexButton hex={originalHex} />
              </div>
            </div>
          )}

          <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">{entry.title}</h1>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-white/55">{entry.description}</p>

          {entry.paletteColors && entry.paletteColors.length > 0 && (
            <div className="mt-8">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/35">{originalHex ? "Palette colors" : "Color shades"}</p>
              <PaletteColorStrip colors={entry.paletteColors} linkToColors={!originalHex} />
            </div>
          )}

          {similarColors.length > 0 && (
            <div className="mt-8">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/35">Similar colors</p>
              <div className="flex w-full overflow-hidden rounded-2xl ring-1 ring-inset ring-white/10">
                {similarColors.map((c, i) => {
                  const light = (() => {
                    const r = parseInt(c.hex.slice(1,3),16), g = parseInt(c.hex.slice(3,5),16), b = parseInt(c.hex.slice(5,7),16);
                    return (r*299+g*587+b*114)/1000 > 160;
                  })();
                  return (
                    <Link
                      key={c.hex}
                      href={`/colors/${c.slug}`}
                      className="group relative flex-1 min-w-0"
                      style={{ backgroundColor: c.hex }}
                    >
                      <div className="flex h-20 flex-col items-center justify-center gap-0.5 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className={`font-mono text-[11px] font-semibold uppercase truncate w-full text-center ${light ? "text-black/60" : "text-white/80"}`}>
                          {c.hex.toUpperCase()}
                        </p>
                        <p className={`text-[10px] truncate w-full text-center ${light ? "text-black/45" : "text-white/55"}`}>
                          {c.name}
                        </p>
                      </div>
                      {i < similarColors.length - 1 && (
                        <span className="absolute right-0 top-1/4 h-1/2 w-px bg-black/10" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mt-8 rounded-2xl border border-[#F15B2A]/25 bg-[#F15B2A]/8 p-6 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#F97A45]">{answerLabel}</p>
            <p className="mt-3 text-lg leading-8 text-white/90">{entry.answer}</p>
          </div>
        </div>
      </section>

      <section className="relative mx-auto grid grid-cols-1 max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[1fr_300px] lg:px-8">
        <article className="space-y-6">
          {/* Key takeaways + Quick facts */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/4 p-5 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">Key takeaways</p>
              <ul className="mt-3 space-y-3 text-sm leading-7 text-white/70">
                {entry.keyTakeaways.map((takeaway) => (
                  <li key={takeaway} className="flex gap-2">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[#F15B2A]" />
                    {takeaway}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/4 p-5 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">Quick facts</p>
              <div className="mt-3 space-y-3">
                {entry.quickFacts.map((fact) => (
                  <div key={fact.label} className="rounded-xl border border-white/8 bg-white/4 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/35">{fact.label}</p>
                    <p className="mt-1.5 text-sm leading-6 text-white/80">{fact.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Expert summary */}
          <section className="rounded-2xl border border-[#F15B2A]/20 bg-gradient-to-br from-[#F15B2A]/10 to-[#F15B2A]/4 p-7 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white">{entry.expertSummary.title}</h2>
            <p className="mt-4 text-base leading-8 text-white/70">{entry.expertSummary.body}</p>
          </section>

          {/* Definitions + Pros/Cons */}
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.02fr_0.98fr]">
            <section className="rounded-2xl border border-white/10 bg-white/4 p-7 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">Definitions</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">Core ideas in plain English</h2>
              <div className="mt-6 space-y-4">
                {entry.definitions.map((item) => (
                  <div key={item.term} className="rounded-xl border border-white/8 bg-white/4 p-5">
                    <h3 className="text-lg font-semibold text-white">{item.term}</h3>
                    <p className="mt-2 text-sm leading-7 text-white/60">{item.definition}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-white/10 bg-white/4 p-7 backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">Tradeoffs</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">Pros and cons</h2>
              <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/8 p-5">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/20 text-sm font-bold text-emerald-400">+</span>
                    <h3 className="font-semibold text-emerald-300">Pros</h3>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm leading-7 text-white/70">
                    {entry.prosCons.pros.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-emerald-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/8 p-5">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-amber-500/20 text-sm font-bold text-amber-400">−</span>
                    <h3 className="font-semibold text-amber-300">Cons</h3>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm leading-7 text-white/70">
                    {entry.prosCons.cons.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-amber-400" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* AI sections */}
          <section className="rounded-2xl border border-white/10 bg-white/4 p-7 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white">AI-friendly sections</h2>
            <div className="mt-6 grid gap-4">
              {entry.aiSections.map((section) => (
                <div key={section.title} className="rounded-xl border border-white/8 bg-white/4 p-5">
                  <h3 className="font-semibold text-white">{section.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/60">{section.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Content sections */}
          <div className="space-y-5">
            {entry.sections.map((section) => (
              <section key={section.title} className="rounded-2xl border border-white/10 bg-white/4 p-7 backdrop-blur-sm">
                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white">{section.title}</h2>
                <p className="mt-4 text-base leading-8 text-white/65">{section.body}</p>
              </section>
            ))}
          </div>

          {/* Comparison table */}
          {entry.comparisonRows ? (
            <section className="overflow-hidden rounded-2xl border border-white/10 backdrop-blur-sm">
              <div className="border-b border-white/8 bg-white/4 px-7 py-5">
                <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white">Comparison table</h2>
              </div>
              <div className="overflow-x-auto bg-white/3">
                <table className="min-w-full text-left text-sm">
                  <thead className="border-b border-white/8 text-white/40">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Option</th>
                      <th className="px-6 py-4 font-semibold">Best for</th>
                      <th className="px-6 py-4 font-semibold">Strengths</th>
                      <th className="px-6 py-4 font-semibold">Watchouts</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entry.comparisonRows.map((row) => (
                      <tr key={row.label} className="border-t border-white/6">
                        <td className="px-6 py-4 font-medium text-white">{row.label}</td>
                        <td className="px-6 py-4 text-white/60">{row.bestFor}</td>
                        <td className="px-6 py-4 text-white/60">{row.strengths}</td>
                        <td className="px-6 py-4 text-white/60">{row.watchouts}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : null}

          {/* Examples */}
          {entry.examples ? (
            <section className="rounded-2xl border border-white/10 bg-white/4 p-7 backdrop-blur-sm">
              <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white">Examples</h2>
              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
                {entry.examples.map((example) => (
                  <div key={example.title} className="rounded-xl border border-white/8 bg-white/4 p-5">
                    <h3 className="font-semibold text-white">{example.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-white/60">{example.body}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {/* Citation blocks */}
          <section className="rounded-2xl border border-white/10 bg-white/4 p-7 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white">Citation-worthy blocks</h2>
            <div className="mt-6 space-y-4">
              {entry.citationBlocks.map((block) => (
                <blockquote key={block} className="rounded-xl border-l-2 border-[#F15B2A] bg-white/4 px-5 py-4 text-sm leading-7 text-white/70">
                  {block}
                </blockquote>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="rounded-2xl border border-white/10 bg-white/4 p-7 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white">FAQ</h2>
            <div className="mt-6 space-y-4">
              {entry.faq.map((item) => (
                <div key={item.question} className="rounded-xl border border-white/8 bg-white/4 p-5">
                  <h3 className="font-semibold text-white">{item.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/60">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </article>

        {/* Sidebar */}
        <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-2xl border border-white/10 bg-white/4 p-6 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">AI retrieval format</p>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-white/60">
              <li className="flex gap-2"><span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[#F15B2A]" />40-60 word answer block above the fold</li>
              <li className="flex gap-2"><span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[#F15B2A]" />Clear entity title and direct question match</li>
              <li className="flex gap-2"><span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[#F15B2A]" />Definitions, FAQ, pros and cons, and comparison sections for citations</li>
              <li className="flex gap-2"><span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-[#F15B2A]" />Related pages with explicit semantic anchors</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/4 p-6 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">Entity relationships</p>
            <div className="mt-4 space-y-3">
              {entry.entityRelations.map((relation) => (
                <div key={`${relation.entity}-${relation.connectedTo}`} className="rounded-xl border border-white/8 bg-white/4 px-4 py-3 text-sm text-white/70">
                  <span className="font-semibold text-white">{relation.entity}</span>{" "}
                  <span className="text-white/40">{relation.relationship}</span>{" "}
                  <span className="font-semibold text-white">{relation.connectedTo}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/4 p-6 backdrop-blur-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">Internal links</p>
            <div className="mt-4 space-y-5">
              {groupedLinks.map((group) => (
                <div key={group.label}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30">{group.label}</p>
                  <div className="mt-3 space-y-2">
                    {group.links.map((link) => (
                      <Link key={link.href} href={link.href} className="block rounded-xl border border-white/8 bg-white/3 px-4 py-3 text-sm text-white/65 transition-colors hover:border-white/15 hover:bg-white/6 hover:text-white">
                        {link.title}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
