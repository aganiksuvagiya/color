import { BrandColorAnalyzer } from "@/components/brand-color-analyzer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand Color Analyzer | HueFlow",
  description: "Extract brand colors from any website instantly. Analyze any URL to discover its color palette.",
};

export default function Page() {
  return <BrandColorAnalyzer />;
}
