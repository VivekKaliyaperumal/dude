export type WhyItem = { n: string; title: string; body: string };

/** "Why dude & Co." grid (Home, About). */
export const why: readonly WhyItem[] = [
  { n: "01", title: "Quality-Focused Materials", body: "We check specification and suitability before recommending a material." },
  { n: "02", title: "Wide Material Categories", body: "Structural and finishing categories through one coordinated team." },
  { n: "03", title: "Multiple Brand Options", body: "Brand options matched to your specification and budget." },
  { n: "04", title: "Karnataka-Wide Supply", body: "Supply coordinated for projects across Karnataka." },
  { n: "05", title: "Practical Construction Understanding", body: "We know how the material behaves once it reaches the site." },
  { n: "06", title: "Complete Construction Support", body: "Full civil construction execution when your project needs it." },
];

/** Trust strip under the Home hero: label + SVG path (24x24 stroke icon). */
export const trust: readonly { label: string; d: string }[] = [
  { label: "Quality Materials", d: "M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6Z" },
  { label: "Reliable Supply", d: "M3 17V7h11v10M14 10h4l3 3v4M6 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4m11 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4" },
  { label: "Karnataka-Wide Service", d: "M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" },
  { label: "Transparent Quotations", d: "M7 3h10v18H7ZM10 8h4M10 12h4M10 16h2" },
  { label: "Construction Expertise", d: "M3 21h18M6 21V9l6-4 6 4v12M10 21v-6h4v6" },
];

/** "Right Material. Right Application. Right Result." list. */
export const quality: readonly string[] = [
  "Material Selection",
  "Specification Awareness",
  "Requirement Planning",
  "Supply Coordination",
  "Construction Support",
];
