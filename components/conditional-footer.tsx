"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./footer";
import { PromoBanner } from "./promo-banner";

export function ConditionalFooter() {
  const pathname = usePathname();
  if (pathname === "/generator") return null;
  return (
    <>
      <Footer />
      <PromoBanner />
    </>
  );
}
