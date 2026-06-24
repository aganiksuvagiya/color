import { BlogPage } from "@/components/blog-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Theory Resources | HueFlow Blog",
  description: "Learn about color theory, accessibility, design systems, and how to build better palettes for your products.",
};

export default function Page() {
  return <BlogPage />;
}
