import { CollageCreator } from "@/components/collage-creator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collage Creator | HueFlow",
  description: "Combine multiple images into a single collage and export it as a PNG.",
};

export default function Page() {
  return <CollageCreator />;
}
