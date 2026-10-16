"use client";

import Link from "next/link";

import { Header } from "@/components/header";
import { Breadcrumbs, Dots, Faq, SmallTitle, eyebrow, type Crumb } from "@/components/seo/page-ui";
import { SwatchStrip, useCopy } from "@/components/seo/swatch-strip";

type Palette = { id: string; name: string; colors: string[]; href: string };
type TagChip = { slug: string; name: string; hex: string; href: string; count: number };

function TagChips({ tags }: { tags: TagChip[] }) {
  if (tags.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <Link
          key={t.slug}
          href={t.href}
          className="flex items-center gap-2 rounded-lg bg-[#1c1712]/[0.04] px-3 py-1.5 text-[13px] font-medium text-[#1c1712]/65 transition hover:bg-[#1c1712]/[0.08] hover:text-[#1c1712]"
        >
          <span className="h-2.5 w-2.5 rounded-full ring-1 ring-inset ring-black/10" style={{ backgroundColor: t.hex }} />
          {t.name}
          <span className="text-[12px] text-[#1c1712]/40">{t.count}</span>
        </Link>
      ))}
    </div>
  );
}

function PaletteCard({ palette, copied, copy }: { palette: Palette; copied: string | null; copy: (v: string) => void }) {
  const all = palette.colors.join(", ");
  return (
    <div className="overflow-hidden rounded-2xl ring-1 ring-black/[0.07]">
      <SwatchStrip colors={palette.colors} height="h-32" copied={copied} onCopy={copy} className="" />
      <div className="flex items-center justify-between gap-3 px-4 py-3.5">
        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-semibold">{palette.name}</h3>
          <p className="truncate font-mono text-[11px] uppercase text-[#1c1712]/45">{palette.colors.map((c) => c.slice(1)).join(" · ")}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button onClick={() => copy(all)} className="rounded-full px-3 py-1.5 text-[12px] font-semibold text-[#1c1712]/65 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25">
            {copied === all ? "✓ Copied" : "Copy all"}
          </button>
          <Link href={palette.href} className="rounded-full bg-[#1c1712] px-3 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#c2410c]" aria-label={`Open ${palette.name} in the generator`}>
            Open →
          </Link>
        </div>
      </div>
    </div>
  );
}

export function PaletteTagView({
  name,
  kindLabel,
  intro,
  tips,
  faq,
  palettes,
  related,
  allTags,
  breadcrumbs,
}: {
  name: string;
  kindLabel: string;
  intro: string;
  tips: string;
  faq: { question: string; answer: string }[];
  palettes: Palette[];
  related: TagChip[];
  allTags: TagChip[];
  breadcrumbs: Crumb[];
}) {
  const { copied, copy } = useCopy();
  return (
    <main className="min-h-screen bg-white text-[#1c1712]">
      <Header />

      {/* ── Header ── */}
      <section className="w-full px-6 pb-10 pt-28 sm:px-8 lg:px-12">
        <Breadcrumbs items={breadcrumbs} />
        <p className={`${eyebrow} mt-8`}>{kindLabel}</p>
        <h1 className="mt-3 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">{name} Color Palettes</h1>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Dots colors={palettes[0]?.colors ?? []} />
          <p className="hub-description text-[16px] text-[#1c1712]/55">
            <span className="font-semibold text-[#1c1712]/80">{palettes.length} {name.toLowerCase()} palettes with hex codes.</span> Hover to preview, click a color to copy it, or open any palette in the generator.
          </p>
        </div>
        <p className="hub-answer mt-6 max-w-4xl text-[1.1rem] font-medium leading-8 tracking-[-0.01em] text-[#1c1712]/80">{intro}</p>
        {related.length > 0 && (
          <div className="mt-8">
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/40">Related palettes</p>
            <TagChips tags={related} />
          </div>
        )}
      </section>

      {/* ── Palettes ── */}
      <section className="border-t border-black/[0.06]">
        <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {palettes.map((p) => (
              <PaletteCard key={p.id} palette={p} copied={copied} copy={copy} />
            ))}
          </div>
        </div>
      </section>

      {/* ── How to use + FAQ ── */}
      <section className="border-t border-black/[0.06]">
        <div className="grid w-full gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[1fr_1.2fr] lg:gap-20 lg:px-12">
          <div>
            <p className={eyebrow}>Tips</p>
            <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">How to use {name.toLowerCase()} color palettes</h2>
            <p className="mt-5 text-[15px] leading-8 text-[#1c1712]/65">{tips}</p>
          </div>
          <div>
            <p className={eyebrow}>FAQ</p>
            <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">{name} color palettes: FAQ</h2>
            <div className="mt-6">
              <Faq items={faq} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Browse all ── */}
      <section className="border-t border-black/[0.06]">
        <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
          <SmallTitle>Browse all color palettes</SmallTitle>
          <TagChips tags={allTags} />
        </div>
      </section>
    </main>
  );
}

export function PaletteLibraryHubView({
  groups,
  featured,
  total,
}: {
  groups: { label: string; tags: (TagChip & { strip: string[] })[] }[];
  featured: Palette[];
  total: number;
}) {
  const { copied, copy } = useCopy();
  const idOf = (label: string) => label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <main className="min-h-screen bg-white text-[#1c1712]">
      <Header />

      {/* ── Header ── */}
      <section className="w-full px-6 pb-10 pt-28 sm:px-8 lg:px-12">
        <Breadcrumbs items={[{ title: "Home", href: "/" }, { title: "Color Palettes", href: "/color-palettes" }]} />
        <h1 className="mt-8 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">Color Palettes &amp; Color Schemes</h1>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Dots colors={featured[0]?.colors ?? []} />
          <p className="hub-description max-w-4xl text-[16px] leading-7 text-[#1c1712]/55">
            <span className="font-semibold text-[#1c1712]/80">{total} hand-picked palettes with hex codes.</span> Organized by style, season and color. Hover to preview, click any color to copy it, or open a palette in the generator to make it your own.
          </p>
        </div>
        <nav aria-label="Jump to a section" className="mt-8 flex flex-wrap gap-2">
          {groups.map((g) => (
            <a
              key={g.label}
              href={`#${idOf(g.label)}`}
              className="rounded-lg bg-[#1c1712]/[0.04] px-3 py-1.5 text-[13px] font-medium text-[#1c1712]/65 transition hover:bg-[#1c1712]/[0.08] hover:text-[#1c1712]"
            >
              {g.label}
            </a>
          ))}
          <a href="#featured" className="rounded-lg bg-[#1c1712]/[0.04] px-3 py-1.5 text-[13px] font-medium text-[#1c1712]/65 transition hover:bg-[#1c1712]/[0.08] hover:text-[#1c1712]">
            Featured
          </a>
        </nav>
      </section>

      {/* ── Groups ── */}
      <section className="border-t border-black/[0.06]">
        <div className="w-full space-y-14 px-6 py-14 sm:px-8 lg:px-12">
          {groups.map((g) => (
            <div key={g.label} id={idOf(g.label)} className="scroll-mt-28">
              <SmallTitle>{g.label}</SmallTitle>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
                {g.tags.map((t) => (
                  <Link key={t.slug} href={t.href} className="group overflow-hidden rounded-xl ring-1 ring-black/[0.07] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-16px_rgba(28,23,18,0.35)]">
                    <span className="flex h-16 w-full">
                      {t.strip.map((hex, i) => (
                        <span key={`${hex}-${i}`} className="flex-1" style={{ backgroundColor: hex }} />
                      ))}
                    </span>
                    <span className="flex items-center justify-between gap-2 px-3.5 py-2.5">
                      <span className="min-w-0">
                        <span className="block truncate text-[14px] font-semibold transition group-hover:text-[#c2410c]">{t.name} palettes</span>
                        <span className="block text-[12px] text-[#1c1712]/45">{t.count} palettes</span>
                      </span>
                      <span className="text-[#1c1712]/30 transition group-hover:text-[#c2410c]" aria-hidden="true">→</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Featured ── */}
      <section id="featured" className="scroll-mt-28 border-t border-black/[0.06]">
        <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
          <p className={eyebrow}>Library</p>
          <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">Featured palettes</h2>
          <p className="mt-2 max-w-2xl text-[15px] leading-7 text-[#1c1712]/55">A spread of styles from the library. Click a color to copy it, or copy the whole palette.</p>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <PaletteCard key={p.id} palette={p} copied={copied} copy={copy} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
