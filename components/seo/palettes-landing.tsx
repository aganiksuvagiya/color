"use client";

import Link from "next/link";
import { useState } from "react";

import { Header } from "@/components/header";
import { SectionTitle } from "@/components/seo/shades-page";
import { SwatchStrip, useCopy } from "@/components/seo/swatch-strip";

export type CuratedPalette = { title: string; href: string; industry: string; colors: string[]; generatorHref: string };
export type LibraryCard = { id: string; name: string; colors: string[]; generatorHref: string };
export type TagTile = { slug: string; name: string; href: string; count: number; strip: string[] };
type Faq = { question: string; answer: string };

const TIPS = [
  { title: "Start with intent", body: "Pick your primary color for the feeling you want - trust, energy, calm or prestige." },
  { title: "Limit to 5 colors", body: "One or two primaries, one or two neutrals and one accent. Fewer colors feel more cohesive." },
  { title: "Test contrast early", body: "Beautiful colors that fail WCAG checks hurt real users. Check text and buttons before you commit." },
  { title: "Name by role", body: "Call colors primary, surface or error instead of blue-500, so changing a brand color later is painless." },
];

/** /palettes: curated brand palettes + the palette library, in the coolors-style site design. */
export function PalettesLanding({
  description,
  curated,
  library,
  libraryTotal,
  tagGroups,
  styleChips,
  faq,
}: {
  description: string;
  curated: CuratedPalette[];
  library: LibraryCard[];
  libraryTotal: number;
  tagGroups: { label: string; tags: TagTile[] }[];
  styleChips: { name: string; href: string; hex: string }[];
  faq: Faq[];
}) {
  const { copied, copy } = useCopy();
  const industries = ["All", ...Array.from(new Set(curated.map((p) => p.industry)))];
  const [industry, setIndustry] = useState("All");
  const shown = industry === "All" ? curated : curated.filter((p) => p.industry === industry);

  return (
    <main className="min-h-screen bg-white text-[#1c1712]">
      <Header />

      {/* ── Header ── */}
      <section className="w-full px-6 pb-10 pt-28 sm:px-8 lg:px-12">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] text-[#1c1712]/40">
          <Link href="/" className="transition hover:text-[#1c1712]/70">Home</Link>
          <span className="text-[#1c1712]/20">/</span>
          <span className="text-[#1c1712]/60">Palettes</span>
        </nav>
        <h1 className="mt-8 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">Color Palettes</h1>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <span className="flex -space-x-1.5" aria-hidden="true">
            {(curated[0]?.colors ?? []).map((hex) => (
              <span key={hex} className="h-5 w-5 rounded-full ring-2 ring-white" style={{ backgroundColor: hex }} />
            ))}
          </span>
          <p className="hub-description text-[16px] text-[#1c1712]/55">
            <span className="font-semibold text-[#1c1712]/80">{curated.length} curated brand palettes · {libraryTotal} palettes in the library.</span> {description}
          </p>
        </div>
        <nav aria-label="Browse palettes by style" className="mt-8 flex flex-wrap gap-2">
          {styleChips.map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="flex items-center gap-2 rounded-lg bg-[#1c1712]/[0.04] px-3 py-1.5 text-[13px] font-medium text-[#1c1712]/65 transition hover:bg-[#1c1712]/[0.08] hover:text-[#1c1712]"
            >
              <span className="h-2.5 w-2.5 rounded-full ring-1 ring-inset ring-black/10" style={{ backgroundColor: c.hex }} />
              {c.name}
            </Link>
          ))}
        </nav>
      </section>

      {/* ── Curated brand palettes ── */}
      <section className="border-t border-black/[0.06]">
        <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <SectionTitle eyebrow="Curated" title="Brand palettes by industry" body="Complete color systems with roles, examples and guidance - open one for the full breakdown." />
            <div role="tablist" aria-label="Filter by industry" className="flex flex-wrap gap-2">
              {industries.map((ind) => {
                const on = industry === ind;
                return (
                  <button
                    key={ind}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setIndustry(ind)}
                    className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition ${
                      on ? "bg-[#1c1712] text-white" : "bg-white text-[#1c1712]/60 ring-1 ring-black/[0.1] hover:text-[#1c1712] hover:ring-black/20"
                    }`}
                  >
                    {ind}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {shown.map((p) => (
              <article key={p.href} className="group overflow-hidden rounded-2xl ring-1 ring-black/[0.07] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_-18px_rgba(28,23,18,0.35)]">
                <SwatchStrip colors={p.colors} height="h-40" copied={copied} onCopy={copy} className="" />
                <div className="p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c2410c]">{p.industry}</p>
                  <h3 className="mt-1.5 text-[17px] font-semibold tracking-[-0.02em]">
                    <Link href={p.href} className="transition hover:text-[#c2410c]">{p.title.replace(/ Palette$/, "")}</Link>
                  </h3>
                  <p className="mt-1 truncate font-mono text-[11px] uppercase text-[#1c1712]/45">{p.colors.map((c) => c.slice(1)).join(" · ")}</p>
                  <div className="mt-4 flex items-center gap-2">
                    <Link href={p.href} className="rounded-full bg-[#1c1712] px-3.5 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#c2410c]">
                      View palette →
                    </Link>
                    <Link href={p.generatorHref} className="rounded-full px-3.5 py-1.5 text-[12px] font-semibold text-[#1c1712]/65 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25">
                      Open in generator
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular in the library ── */}
      <section className="border-t border-black/[0.06]">
        <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <SectionTitle eyebrow="Library" title="Popular palettes" body="Hand-picked from the palette library. Click a color to copy it, or copy the whole palette." />
            <Link href="/color-palettes" className="rounded-full bg-[#1c1712] px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-[#c2410c]">
              Browse all {libraryTotal} palettes →
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {library.map((p) => {
              const all = p.colors.join(", ");
              return (
                <div key={p.id} className="overflow-hidden rounded-2xl ring-1 ring-black/[0.07]">
                  <SwatchStrip colors={p.colors} height="h-32" copied={copied} onCopy={copy} className="" />
                  <div className="flex items-center justify-between gap-3 px-4 py-3.5">
                    <div className="min-w-0">
                      <h3 className="truncate text-[15px] font-semibold">{p.name}</h3>
                      <p className="truncate font-mono text-[11px] uppercase text-[#1c1712]/45">{p.colors.map((c) => c.slice(1)).join(" · ")}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <button onClick={() => copy(all)} className="rounded-full px-3 py-1.5 text-[12px] font-semibold text-[#1c1712]/65 ring-1 ring-black/[0.12] transition hover:text-[#1c1712]">
                        {copied === all ? "✓ Copied" : "Copy all"}
                      </button>
                      <Link href={p.generatorHref} className="rounded-full bg-[#1c1712] px-3 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#c2410c]" aria-label={`Open ${p.name} in the generator`}>
                        Open →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Browse by style / color / season ── */}
      <section className="border-t border-black/[0.06]">
        <div className="w-full space-y-12 px-6 py-14 sm:px-8 lg:px-12">
          {tagGroups.map((g) => (
            <div key={g.label}>
              <h2 className="mb-5 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/40">
                Palettes by {g.label.toLowerCase()}
                <span className="h-px flex-1 bg-black/[0.06]" />
              </h2>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
                {g.tags.map((t) => (
                  <Link key={t.slug} href={t.href} className="group overflow-hidden rounded-xl ring-1 ring-black/[0.07] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-16px_rgba(28,23,18,0.35)]">
                    <span className="flex h-14 w-full">
                      {t.strip.map((hex, i) => (
                        <span key={`${hex}-${i}`} className="flex-1" style={{ backgroundColor: hex }} />
                      ))}
                    </span>
                    <span className="flex items-center justify-between px-3.5 py-2.5">
                      <span className="text-[14px] font-semibold transition group-hover:text-[#c2410c]">{t.name}</span>
                      <span className="text-[12px] text-[#1c1712]/40">{t.count}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tips + FAQ ── */}
      <section className="border-t border-black/[0.06]">
        <div className="grid w-full gap-12 px-6 py-16 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
          <div>
            <SectionTitle eyebrow="Tips" title="Building a palette that works" />
            <div className="hub-answer mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              {TIPS.map((t, i) => (
                <div key={t.title} className="rounded-xl p-5 ring-1 ring-black/[0.07]">
                  <span className="text-[12px] font-semibold text-[#c2410c]">0{i + 1}</span>
                  <h3 className="mt-1 text-[15px] font-semibold">{t.title}</h3>
                  <p className="mt-1.5 text-[14px] leading-6 text-[#1c1712]/60">{t.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <SectionTitle eyebrow="FAQ" title="Questions about color palettes" />
            <div className="mt-5 divide-y divide-black/[0.07] border-y border-black/[0.07]">
              {faq.map((f) => (
                <details key={f.question} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold">
                    {f.question}
                    <span className="text-lg leading-none text-[#1c1712]/30 transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-2.5 text-[14px] leading-7 text-[#1c1712]/60">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
