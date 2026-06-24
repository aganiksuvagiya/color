import { GeneratorPage } from "@/components/generator/generator-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Generator | HueFlow",
  description: "Generate production-ready color palettes with AI. Describe a mood, brand, or industry and get a complete color system.",
};

export default function Page() {
  return <GeneratorPage />;
}
