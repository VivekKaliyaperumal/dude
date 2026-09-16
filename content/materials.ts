import type { MaterialImageKey } from "./images";

export type Material = {
  n: string;
  name: string;
  variants: readonly string[];
  desc: string;
  imageKey?: MaterialImageKey;
};

/** Structural materials (prototype MATERIALS array, Home/Materials photo set). */
export const structuralMaterials: readonly Material[] = [
  { n: "01", name: "Cement", variants: ["OPC 43", "OPC 53", "PPC", "PSC"], desc: "Grade options for structural, plastering and general construction use.", imageKey: "cement" },
  { n: "02", name: "TMT Steel", variants: ["Fe 500", "Fe 500D", "Fe 550", "other grades"], desc: "Reinforcement steel supplied to the grade and diameter your design calls for.", imageKey: "tmtSteel" },
  { n: "03", name: "M-Sand", variants: ["Concrete", "Plastering", "Washed"], desc: "Manufactured sand variants for concreting, masonry and plaster work.", imageKey: "mSand" },
  { n: "04", name: "River Sand", variants: ["Based on availability"], desc: "Supplied subject to availability and project requirements.", imageKey: "riverSand" },
  { n: "05", name: "Aggregates / Jelly", variants: ["12mm", "20mm", "40mm", "other sizes"], desc: "Graded granite aggregates for concrete, footing and road work.", imageKey: "aggregates" },
  { n: "06", name: "Red Bricks", variants: ["Wire-cut", "Table-mould"], desc: "Brick varieties suited to load-bearing and partition masonry.", imageKey: "redBricks" },
  { n: "07", name: "Concrete Blocks", variants: ["Solid", "Hollow"], desc: "Standard block sizes for walls, compound work and infill masonry." },
  { n: "08", name: "AAC Blocks", variants: ["Lightweight", "multiple thicknesses"], desc: "Lightweight blocks that reduce dead load and speed up masonry." },
  { n: "09", name: "Ready Mix Concrete", variants: ["Project-specific grades"], desc: "RMC arranged to your grade and pour schedule, site conditions permitting.", imageKey: "rmc" },
];

/** Finishing and building materials (prototype FINISHING array, Materials page version). No photos yet. */
export const finishingMaterials: readonly Material[] = [
  { n: "10", name: "Tiles & Flooring", variants: ["Vitrified", "Ceramic", "Granite", "Marble"], desc: "Flooring options for residential and commercial interiors." },
  { n: "11", name: "Plumbing Materials", variants: ["Pipes", "Fittings", "Valves", "Accessories"], desc: "Pipes, fittings and accessories for the full run." },
  { n: "12", name: "Electrical Materials", variants: ["Wires", "Cables", "Switches", "Conduits"], desc: "Wiring and accessories matched to your load plan." },
  { n: "13", name: "Sanitary Ware & CP Fittings", variants: ["Basins", "WC", "Faucets", "Showers"], desc: "Sanitary ware and chrome-plated fittings for bathrooms." },
  { n: "14", name: "Doors & Windows", variants: ["Main", "Internal", "UPVC", "Aluminium"], desc: "Door and window options for every opening in the plan." },
  { n: "15", name: "Waterproofing Materials", variants: ["Chemicals", "Coatings", "Membranes"], desc: "Protection for roofs, wet areas and basements." },
  { n: "16", name: "Paints & Finishing", variants: ["Interior", "Exterior", "Primer", "Putty"], desc: "Paint systems from putty to final coat." },
  { n: "17", name: "Glass & Architectural", variants: ["Glazing", "Facade glass", "Partitions"], desc: "Glazing and architectural glass for facades and interiors." },
  { n: "18", name: "Wall Cladding", variants: ["Exterior", "Feature wall", "Stone", "HPL"], desc: "Exterior and feature wall cladding options." },
  { n: "19", name: "Adhesives & Chemicals", variants: ["Tile adhesive", "Grout", "Admixtures", "Sealants"], desc: "Construction chemicals and adhesives for finishing work." },
  { n: "20", name: "Other Materials", variants: ["Project-specific"], desc: "Tell us what your project needs and we will source it." },
];

/** Home shows the first six structural categories. */
export const homeMaterials = structuralMaterials.slice(0, 6);

export const estimatorCategories = [
  "Steel", "Cement", "Sand", "Aggregate", "Blocks", "Bricks", "RMC", "Tiles", "Plumbing", "Electrical",
  "Sanitary Ware", "Doors & Windows", "Paints", "Other",
] as const;
export type EstimatorCategory = (typeof estimatorCategories)[number];
export const estimatorDefaultCategories: readonly EstimatorCategory[] = ["Steel", "Cement", "Sand"];

export const materialsCopy = {
  homeFootnote:
    "20 material categories across structural and finishing work, including tiles, plumbing, electrical, sanitary ware, paints and more.",
  listFootnote: "These are material categories, not fixed stock. Availability and brands depend on project requirements.",
} as const;
