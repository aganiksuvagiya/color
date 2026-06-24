import { TrendsPage } from "@/components/trends-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trending Palettes | HueFlow",
  description: "Explore curated trending color palettes for SaaS, E-commerce, Mobile, and Branding projects.",
};

export default function Page() {
  return <TrendsPage />;
}
