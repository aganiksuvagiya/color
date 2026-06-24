import { ExploreColors } from "@/components/explore-colors";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Colors | HueFlow",
  description: "Browse a curated library of colors by category. Find the perfect shade for your project.",
};

export default function Page() {
  return <ExploreColors />;
}
