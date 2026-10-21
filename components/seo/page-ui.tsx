import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Small building blocks shared by the SEO pages in the new design (white page, hairlines,
 * dark pills, orange eyebrows). They have no state, so they work in server and client components.
 */

export const eyebrow = "text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c2410c]";

export type Crumb = { title: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[12px] text-[#1c1712]/40">
      {items.map((item, i) => (
        <span key={`${item.href}-${i}`} className="flex items-center gap-2">
          {i < items.length - 1 ? (
            <Link href={item.href} className="transition hover:text-[#1c1712]/70">{item.title}</Link>
          ) : (
            <span className="text-[#1c1712]/60">{item.title}</span>
          )}
          {i < items.length - 1 && <span className="text-[#1c1712]/20">/</span>}
        </span>
      ))}
    </nav>
  );
}

export function SmallTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-5 flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/40">
      {children}
      <span className="h-px flex-1 bg-black/[0.06]" />
    </h2>
  );
}

export function Dots({ colors }: { colors: string[] }) {
  return (
    <span className="flex -space-x-1.5" aria-hidden="true">
      {colors.slice(0, 5).map((hex, i) => (
        <span key={`${hex}-${i}`} className="h-5 w-5 rounded-full ring-2 ring-white" style={{ backgroundColor: hex }} />
      ))}
    </span>
  );
}

/** `wide` lets the answers run to a wider line length (for pages whose FAQ spans the full content width). */
export function Faq({ items, openFirst = true, wide = false }: { items: { question: string; answer: string }[]; openFirst?: boolean; wide?: boolean }) {
  return (
    <div className="divide-y divide-black/[0.08] border-y border-black/[0.08]">
      {items.map((f, i) => (
        <details key={f.question} open={openFirst && i === 0} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[16px] font-semibold leading-6 outline-none transition hover:text-[#c2410c] focus-visible:text-[#c2410c] [&::-webkit-details-marker]:hidden">
            {f.question}
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[#1c1712]/55 ring-1 ring-black/[0.14] transition duration-200 group-open:rotate-45 group-open:bg-[#1c1712] group-open:text-white group-open:ring-[#1c1712]">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
                <path d="M6 1v10M1 6h10" />
              </svg>
            </span>
          </summary>
          <p className={`-mt-1 pb-6 pr-12 text-[15px] leading-7 text-[#1c1712]/65 ${wide ? "max-w-5xl" : "max-w-3xl"}`}>{f.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function RelatedLinks({ links }: { links: { title: string; href: string }[] }) {
  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="group flex items-center justify-between gap-3 rounded-xl px-4 py-3.5 text-[14px] font-semibold leading-5 text-[#1c1712]/85 ring-1 ring-black/[0.08] transition hover:bg-[#fafafa] hover:text-[#c2410c] hover:ring-black/25"
        >
          {link.title}
          <span className="shrink-0 text-[#1c1712]/40 transition group-hover:translate-x-0.5 group-hover:text-[#c2410c]" aria-hidden="true">→</span>
        </Link>
      ))}
    </div>
  );
}
