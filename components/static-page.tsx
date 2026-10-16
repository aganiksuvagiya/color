import Link from "next/link";
import type { ReactNode } from "react";

import { Header } from "./header";

export function StaticPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <main className="min-h-screen bg-white text-[#1c1712]">
      <Header />

      <section className="w-full px-6 pb-10 pt-28 sm:px-8 lg:px-12">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] text-[#1c1712]/40">
          <Link href="/" className="transition hover:text-[#1c1712]/70">Home</Link>
          <span className="text-[#1c1712]/20">/</span>
          <span className="text-[#1c1712]/60">{title}</span>
        </nav>
        <h1 className="mt-8 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">{title}</h1>
        {updated ? <p className="mt-4 text-[14px] text-[#1c1712]/50">Last updated: {updated}</p> : null}
      </section>

      <section className="border-t border-black/[0.06]">
        <article
          className="w-full max-w-3xl space-y-5 px-6 py-14 text-[16px] leading-8 text-[#1c1712]/70 sm:px-8 lg:px-12
            [&_a]:font-medium [&_a]:text-[#c2410c] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:no-underline
            [&_h2]:mt-12 [&_h2]:border-t [&_h2]:border-black/[0.07] [&_h2]:pt-10 [&_h2]:text-[1.5rem] [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:tracking-[-0.025em] [&_h2]:text-[#1c1712] [&_h2:first-child]:mt-0 [&_h2:first-child]:border-0 [&_h2:first-child]:pt-0
            [&_h3]:mt-8 [&_h3]:text-[1.1rem] [&_h3]:font-semibold [&_h3]:text-[#1c1712]
            [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_li]:marker:text-[#c2410c] [&_ul]:space-y-3
            [&_strong]:font-semibold [&_strong]:text-[#1c1712]"
        >
          {children}
        </article>
      </section>
    </main>
  );
}
