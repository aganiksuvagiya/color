"use client";

import Link from "next/link";

import { Header } from "@/components/header";
import { SwatchStrip, useCopy } from "@/components/seo/swatch-strip";

type Palette = { id: string; name: string; colors: string[]; href: string };
type TagChip = { slug: string; name: string; hex: string; href: string; count: number };
type Crumb = { title: string; href: string };

function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[12px] text-[#1c1712]/40">
      {items.map((item, i) => (
        <span key={item.href} className="flex items-center gap-2">
          {i < items.length - 1 ? (
            <Link href={item.href} className="transition hover:text-[#1c1712]/70">{item.title}</Link>
          ) : (
            <span>{item.title}</span>
          )}
          {i < items.length - 1 && <span className="text-[#1c1712]/20">/</span>}
        </span>
      ))}
    </nav>
  );
}

function TagChips({ tags, label }: { tags: TagChip[]; label?: string }) {
  if (tags.length === 0) return null;
  return (
    <div>
      {label && <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#1c1712]/30">{label}</p>}
      <div className="flex flex-wrap gap-2">
        {tags.map((t) => (
          <Link
            key={t.slug}
            href={t.href}
            className="flex items-center gap-2 rounded-full border border-black/[0.1] bg-white py-1.5 pl-1.5 pr-3.5 text-[13px] text-[#1c1712]/70 transition hover:border-[#e8531f]/40 hover:text-[#e8531f]"
          >
            <span className="h-5 w-5 rounded-full border border-black/10" style={{ backgroundColor: t.hex }} />
            {t.name}
            <span className="text-[11px] text-[#1c1712]/35">{t.count}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function PaletteCard({ palette, copied, copy }: { palette: Palette; copied: string | null; copy: (v: string) => void }) {
  const all = palette.colors.join(", ");
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_1px_2px_rgba(28,23,18,0.04)]">
      <SwatchStrip colors={palette.colors} height="h-36" copied={copied} onCopy={copy} className="" />
      <div className="px-4 pb-4 pt-3">
        <h3 className="truncate text-[15px] font-semibold text-[#1c1712]">{palette.name}</h3>
        <p className="mt-0.5 truncate font-mono text-[11px] uppercase text-[#1c1712]/45">{palette.colors.map((c) => c.slice(1)).join(" · ")}</p>
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={() => copy(all)}
            className="rounded-full border border-black/[0.12] px-3 py-1.5 text-[12px] font-semibold text-[#1c1712]/70 transition hover:border-[#1c1712]/40 hover:text-[#1c1712]"
          >
            {copied === all ? "✓ Copied" : "Copy all"}
          </button>
          <Link href={palette.href} className="rounded-full bg-[#1c1712] px-3 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#e8531f]">
            Open in generator →
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
    <main className="min-h-screen bg-[#f0ede8] text-[#1c1712]">
      <Header />
      <section className="border-b border-black/[0.06] bg-white">
        <div className="mx-auto max-w-6xl px-6 py-10 pt-28 lg:px-8">
          <Breadcrumbs items={breadcrumbs} />
          <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.22em] text-[#e8531f]">{kindLabel}</p>
          <h1 className="mt-2 text-4xl font-black tracking-[-0.04em] sm:text-5xl">{name} Color Palettes</h1>
          <p className="mt-3 text-[16px] text-[#1c1712]/50">
            {palettes.length} {name.toLowerCase()} palettes with hex codes - hover to preview, click to copy, or open any palette in the generator.
          </p>
          <div className="mt-8 rounded-2xl border border-[#e8531f]/20 bg-[#e8531f]/[0.05] p-6">
            <p className="text-[15px] leading-8 text-[#1c1712]/75">{intro}</p>
          </div>
          <div className="mt-8">
            <TagChips tags={related} label="Related palettes" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {palettes.map((p) => (
            <PaletteCard key={p.id} palette={p} copied={copied} copy={copy} />
          ))}
        </div>

        <div className="mt-10 space-y-6">
          <section className="rounded-2xl bg-white p-6 sm:p-7">
            <h2 className="text-[18px] font-bold">How to use {name.toLowerCase()} color palettes</h2>
            <p className="mt-3 text-[15px] leading-[1.8] text-[#1c1712]/65">{tips}</p>
          </section>

          <section className="rounded-2xl bg-white p-6 sm:p-7">
            <h2 className="mb-4 text-[18px] font-bold">{name} color palettes: FAQ</h2>
            <div className="divide-y divide-black/[0.07]">
              {faq.map((f) => (
                <details key={f.question} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[15px] font-semibold">
                    {f.question}
                    <span className="text-[#1c1712]/30 transition group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-2.5 text-[14px] leading-[1.75] text-[#1c1712]/60">{f.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 sm:p-7">
            <h2 className="mb-4 text-[18px] font-bold">Browse all color palettes</h2>
            <TagChips tags={allTags} />
          </section>
        </div>
      </div>
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
  return (
    <main className="min-h-screen bg-[#f0ede8] text-[#1c1712]">
      <Header />
      <section className="border-b border-black/[0.06] bg-white">
        <div className="mx-auto max-w-6xl px-6 py-10 pt-28 lg:px-8">
          <Breadcrumbs items={[{ title: "Home", href: "/" }, { title: "Color Palettes", href: "/color-palettes" }]} />
          <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] sm:text-5xl">Color Palettes &amp; Color Schemes</h1>
          <p className="mt-4 max-w-3xl text-[16px] leading-8 text-[#1c1712]/50">
            {total} hand-picked color palettes with hex codes, organized by style, season and color. Hover to preview, click any color to copy it, or open a palette in the generator to make it your own.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-12 px-6 py-10 lg:px-8">
        {groups.map((g) => (
          <section key={g.label}>
            <h2 className="mb-4 text-[20px] font-black tracking-[-0.02em]">{g.label}</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {g.tags.map((t) => (
                <div key={t.slug} className="overflow-hidden rounded-2xl bg-white">
                  <SwatchStrip colors={t.strip} height="h-20" copied={copied} onCopy={copy} className="" />
                  <Link href={t.href} className="flex items-center justify-between px-4 py-3 transition hover:bg-black/[0.02]">
                    <div className="min-w-0">
                      <h3 className="truncate text-[14px] font-bold">{t.name} palettes</h3>
                      <p className="text-[12px] text-[#1c1712]/45">{t.count} palettes</p>
                    </div>
                    <span className="text-[#1c1712]/30">→</span>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        ))}

        <section>
          <h2 className="mb-4 text-[20px] font-black tracking-[-0.02em]">Featured palettes</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <PaletteCard key={p.id} palette={p} copied={copied} copy={copy} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
