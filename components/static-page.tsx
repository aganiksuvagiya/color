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
    <main className="relative min-h-screen bg-[#f0ede8] text-[#1c1712]">
      <Header />
      <article className="mx-auto max-w-3xl px-6 pb-24 pt-36 sm:pt-40">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-[#1c1712]/30">{title}</p>
        <h1 className="text-3xl font-black tracking-[-0.02em] text-[#1c1712] sm:text-4xl">{title}</h1>
        {updated ? (
          <p className="mt-3 text-[13px] text-[#1c1712]/35">Last updated: {updated}</p>
        ) : null}
        <div className="mt-10 space-y-5 text-[15px] leading-relaxed text-[#1c1712]/60
          [&_a]:text-[#e8531f] [&_a]:underline [&_a]:underline-offset-2
          [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-[#1c1712]
          [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-[#1c1712]
          [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-[#1c1712] [&_strong]:font-semibold">
          {children}
        </div>
      </article>
    </main>
  );
}
