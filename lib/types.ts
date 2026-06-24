export type SemanticRole = "primary" | "neutral" | "success" | "warning" | "accent";

export type PaletteColor = {
  name: string;
  hex: string;
  role: SemanticRole;
  text: "light" | "dark";
};

export type Palette = {
  label: string;
  colors: PaletteColor[];
};
