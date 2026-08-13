import { ExploreColors } from "@/components/explore-colors";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Palettes",
  description: "Endless color palettes generated fresh. Browse by mood and open any palette instantly in the generator.",
};

export default function Page() {
  return <ExploreColors />;
}
