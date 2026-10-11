export const colors = {
  cream: "#F6F1E8",
  paper: "#EDE6D9",
  foam: "#FFFBF5",
  espresso: "#2C2118",
  ink: "#1A1410",
  copper: "#B85C38",
  sage: "#5C6B52",
  rust: "#8C3A28",
  line: "rgba(44, 33, 24, 0.12)",
} as const;

export const radii = {
  shell: 32,
  inner: 26,
  pill: 999,
} as const;

export const motion = {
  ease: "cubic-bezier(0.32, 0.72, 0, 1)",
  duration: "700ms",
} as const;

export const type = {
  display: '"Fraunces", "Iowan Old Style", Georgia, serif',
  sans: '"Outfit", "Avenir Next", "Segoe UI", sans-serif',
} as const;

export const copy = {
  brand: "Tableside",
  product: "Tip Calculator",
  eyebrow: "Hospitality math",
  tagline: "Split the check. Keep the evening.",
} as const;
