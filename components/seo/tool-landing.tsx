import Link from "next/link";

import { Header } from "@/components/header";
import { Breadcrumbs, Dots, Faq, eyebrow } from "@/components/seo/page-ui";

type Feature = { title: string; body: string };
type Cta = { label: string; href: string };

/**
 * The four SEO landing pages (/color-picker, /color-wheel, /color-palette-generator,
 * /color-palette-from-image) share this layout: header with two buttons, an optional strip of
 * sample palettes, a feature grid, a visible FAQ and a closing call to action.
 */
export function ToolLanding({
  crumb,
  badge,
  title,
  subtitle,
  primary,
  secondary,
  dots,
  samples,
  featuresTitle,
  features,
  faq,
  closing,
}: {
  crumb: string;
  badge: string;
  title: string;
  subtitle: string;
  primary: Cta;
  secondary: Cta;
  dots: string[];
  samples?: { label: string; colors: string[] }[];
  featuresTitle: string;
  features: Feature[];
  faq: { question: string; answer: string }[];
  closing: { title: string; body: string; cta: Cta };
}) {
  return (
    <main className="min-h-screen bg-white text-[#1c1712]">
      <Header />

      {/* ── Header ── */}
      <section className="w-full px-6 pb-12 pt-28 sm:px-8 lg:px-12">
        <Breadcrumbs items={[{ title: "Home", href: "/" }, { title: crumb, href: "#" }]} />
        <h1 className="mt-8 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">{title}</h1>
        <div className="mt-5 flex max-w-4xl flex-wrap items-start gap-3">
          <span className="mt-1.5"><Dots colors={dots} /></span>
          <p className="hub-description min-w-0 flex-1 basis-80 text-[16px] leading-7 text-[#1c1712]/55">
            <span className="font-semibold text-[#1c1712]/80">{badge}.</span> {subtitle}
          </p>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link href={primary.href} className="rounded-full bg-[#1c1712] px-6 py-3 text-[15px] font-semibold text-white transition hover:bg-[#c2410c]">
            {primary.label}
          </Link>
          <Link href={secondary.href} className="rounded-full px-6 py-3 text-[15px] font-semibold text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25">
            {secondary.label}
          </Link>
        </div>

        {samples && samples.length > 0 && (
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {samples.map((p) => (
              <div key={p.label} className="overflow-hidden rounded-2xl ring-1 ring-black/[0.07]">
                <div className="flex h-24" aria-hidden="true">
                  {p.colors.map((c) => (
                    <div key={c} className="flex-1" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <p className="px-4 py-3 text-[14px] font-semibold">{p.label}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ── Features ── */}
      <section className="border-t border-black/[0.06]">
        <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
          <p className={eyebrow}>What it does</p>
          <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">{featuresTitle}</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {features.map((f, i) => (
              <div key={f.title} className="rounded-xl p-5 ring-1 ring-black/[0.07]">
                <span className="text-[12px] font-semibold text-[#c2410c]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-1.5 text-[15px] font-semibold">{f.title}</h3>
                <p className="mt-2 text-[14px] leading-6 text-[#1c1712]/65">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="border-t border-black/[0.06]">
        <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
          <p className={eyebrow}>FAQ</p>
          <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">Frequently asked questions</h2>
          <div className="mt-6 max-w-4xl">
            <Faq items={faq} />
          </div>
        </div>
      </section>

      {/* ── Closing call to action ── */}
      <section className="border-t border-black/[0.06] bg-[#f5f5f5]">
        <div className="flex w-full flex-wrap items-center justify-between gap-6 px-6 py-14 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <h2 className="text-[1.75rem] font-semibold tracking-[-0.03em]">{closing.title}</h2>
            <p className="mt-2 text-[15px] leading-7 text-[#1c1712]/60">{closing.body}</p>
          </div>
          <Link href={closing.cta.href} className="rounded-full bg-[#1c1712] px-7 py-3 text-[15px] font-semibold text-white transition hover:bg-[#c2410c]">
            {closing.cta.label}
          </Link>
        </div>
      </section>
    </main>
  );
}
