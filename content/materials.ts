import type { MaterialImageKey } from "./images";

export type Material = {
  n: string;
  name: string;
  variants: readonly string[];
  desc: string;
  imageKey?: MaterialImageKey;
  /** Own landing page at /materials/<slug> (content/material-pages.ts). */
  slug?: string;
};

/** Structural materials (prototype MATERIALS array, Home/Materials photo set). */
export const structuralMaterials: readonly Material[] = [
  { n: "01", name: "Cement", variants: ["OPC 43", "OPC 53", "PPC", "PSC"], desc: "Grade options for structural, plastering and general construction use.", imageKey: "cement", slug: "cement" },
  { n: "02", name: "TMT Steel", variants: ["Fe 500", "Fe 500D", "Fe 550", "other grades"], desc: "Reinforcement steel supplied to the grade and diameter your design calls for.", imageKey: "tmtSteel", slug: "tmt-steel" },
  { n: "03", name: "M-Sand", variants: ["Concrete", "Plastering", "Washed"], desc: "Manufactured sand variants for concreting, masonry and plaster work.", imageKey: "mSand", slug: "m-sand" },
  { n: "04", name: "Aggregates / Jelly", variants: ["12mm", "20mm", "40mm", "other sizes"], desc: "Graded granite aggregates for concrete, footing and road work.", imageKey: "aggregates", slug: "aggregates" },
  { n: "05", name: "Red Bricks", variants: ["Wire-cut", "Table-mould"], desc: "Brick varieties suited to load-bearing and partition masonry.", imageKey: "redBricks", slug: "red-bricks" },
  { n: "06", name: "Concrete Blocks", variants: ["Solid", "Hollow"], desc: "Standard block sizes for walls, compound work and infill masonry.", imageKey: "concreteBlocks", slug: "concrete-blocks" },
  { n: "07", name: "AAC Blocks", variants: ["Lightweight", "multiple thicknesses"], desc: "Lightweight blocks that reduce dead load and speed up masonry.", imageKey: "aacBlocks", slug: "aac-blocks" },
  { n: "08", name: "Ready Mix Concrete", variants: ["Project-specific grades"], desc: "RMC arranged to your grade and pour schedule, site conditions permitting.", imageKey: "rmc", slug: "ready-mix-concrete" },
];

/** Finishing and building materials (prototype FINISHING array, Materials page version). */
export const finishingMaterials: readonly Material[] = [
  { n: "09", name: "Tiles & Flooring", variants: ["Vitrified", "Ceramic", "Granite", "Marble"], desc: "Flooring options for residential and commercial interiors.", imageKey: "tiles" },
  { n: "10", name: "Plumbing Materials", variants: ["Pipes", "Fittings", "Valves", "Accessories"], desc: "Pipes, fittings and accessories for the full run.", imageKey: "plumbing" },
  { n: "11", name: "Electrical Materials", variants: ["Wires", "Cables", "Switches", "Conduits"], desc: "Wiring and accessories matched to your load plan.", imageKey: "electrical" },
  { n: "12", name: "Sanitary Ware & CP Fittings", variants: ["Basins", "WC", "Faucets", "Showers"], desc: "Sanitary ware and chrome-plated fittings for bathrooms.", imageKey: "sanitary" },
  { n: "13", name: "Doors & Windows", variants: ["Main", "Internal", "UPVC", "Aluminium"], desc: "Door and window options for every opening in the plan.", imageKey: "doorsWindows" },
  { n: "14", name: "Waterproofing Materials", variants: ["Chemicals", "Coatings", "Membranes"], desc: "Protection for roofs, wet areas and basements.", imageKey: "waterproofing" },
  { n: "15", name: "Paints & Finishing", variants: ["Interior", "Exterior", "Primer", "Putty"], desc: "Paint systems from putty to final coat.", imageKey: "paints" },
  { n: "16", name: "Glass & Architectural", variants: ["Glazing", "Facade glass", "Partitions"], desc: "Glazing and architectural glass for facades and interiors.", imageKey: "glassArch" },
  { n: "17", name: "Wall Cladding", variants: ["Exterior", "Feature wall", "Stone", "HPL"], desc: "Exterior and feature wall cladding options.", imageKey: "wallCladding" },
  { n: "18", name: "Adhesives & Chemicals", variants: ["Tile adhesive", "Grout", "Admixtures", "Sealants"], desc: "Construction chemicals and adhesives for finishing work.", imageKey: "adhesivesChem" },
  { n: "19", name: "Other Materials", variants: ["Project-specific"], desc: "Tell us what your project needs and we will source it.", imageKey: "otherMaterials" },
];

/** Interior materials (owner's dealer rate sheet, 29-Sep-2026). Product names only; sizes, brands and rates are confirmed when quoting. */
export const interiorMaterials: readonly Material[] = [
  { n: "20", name: "Boards & Plywood", variants: ["Commercial Plywood", "BWP Plywood", "MR Plywood", "MDF", "HDHMR", "Particle Board", "OSB"], desc: "Plywood and engineered boards for wardrobes, kitchens and furniture.", imageKey: "plywood" },
  { n: "21", name: "Laminates & Finishes", variants: ["Decorative Laminate", "Acrylic Laminate", "PET High Gloss", "PU Paint Finish", "Veneer", "Natural Veneer", "Edge Band", "PVC Edge Band"], desc: "Surface finishes and edge bands for boards and shutters.", imageKey: "laminates" },
  { n: "22", name: "Kitchen Hardware", variants: ["Soft-close Hinges", "Soft-close Drawer Channels", "Tandem Drawers", "Bottle Pull-out", "Cutlery Basket", "Plain Basket", "Corner Carousel", "Tall Unit Pull-out", "Lift-up Mechanism", "Profile Handle", "G / J Profile"], desc: "Fittings and mechanisms for modular kitchens.", imageKey: "kitchenHardware" },
  { n: "23", name: "Handles & Accessories", variants: ["Cabinet Handles", "Knobs", "Aluminium Profile", "Glass Profile"], desc: "Handles, knobs and profiles for cabinets and shutters.", imageKey: "handles" },
  { n: "24", name: "Interior Glass & Mirrors", variants: ["Clear", "Toughened", "Fluted / Reeded", "Tinted", "Back-painted", "Mirror"], desc: "Glass for shutters, partitions, backsplashes and mirrors.", imageKey: "interiorGlass" },
  { n: "25", name: "PVC, Acrylic & WPC", variants: ["PVC Foam Board", "WPC Board", "Acrylic Sheet"], desc: "Boards for wet areas, cladding and signage-style finishes.", imageKey: "pvcWpc" },
  { n: "26", name: "False Ceiling", variants: ["Gypsum Board", "MR Gypsum Board", "Cement Board", "Mineral Fibre Tile", "Aluminium Panel"], desc: "Boards and panels for false ceilings and partitions.", imageKey: "falseCeiling" },
  { n: "27", name: "Profiles & Metal", variants: ["GI Stud", "GI Track", "GI Channel", "MS Square Pipe", "Aluminium Profile"], desc: "Framing sections for ceilings, partitions and furniture frames.", imageKey: "profilesMetal" },
  { n: "28", name: "Countertops", variants: ["Granite", "Quartz", "Sintered Stone", "Marble"], desc: "Stone and engineered surfaces for kitchen and vanity tops.", imageKey: "countertops" },
  { n: "29", name: "Adhesives & Consumables", variants: ["Wood Adhesive", "Contact Adhesive", "Silicone Sealant", "PU Foam", "Wood Screws", "Drywall Screws", "Wall Plugs"], desc: "Adhesives, sealants and fixings for carpentry and drywall work.", imageKey: "adhesivesConsumables" },
  { n: "30", name: "Flooring & Wall Panels", variants: ["SPC Flooring", "Laminate Flooring", "Engineered Wood", "Wooden Fluted Panel", "PVC Fluted Panel", "WPC Fluted Panel", "Wallpaper"], desc: "Interior flooring and decorative wall panels.", imageKey: "flooringPanels" },
  { n: "31", name: "Lighting & Switches", variants: ["LED Strip", "LED Profile", "Downlight", "COB Light", "Track Light", "Modular Switches", "Modular Sockets"], desc: "Lighting and switchgear for interior fit-outs.", imageKey: "lighting" },
  { n: "32", name: "Furniture Materials", variants: ["Fabric", "Leatherette", "Foam", "Curtain Fabric", "Blinds"], desc: "Upholstery, soft furnishing and window materials.", imageKey: "furnitureMaterials" },
];

const categoryCount = structuralMaterials.length + finishingMaterials.length + interiorMaterials.length;

/** Home shows six headline structural categories (blocks are on the Materials page). */
const homeImageKeys: readonly MaterialImageKey[] = ["cement", "tmtSteel", "mSand", "aggregates", "redBricks", "rmc"];
export const homeMaterials = structuralMaterials.filter((m) => m.imageKey && homeImageKeys.includes(m.imageKey));

export const estimatorCategories = [
  "Steel", "Cement", "Sand", "Aggregate", "Blocks", "Bricks", "RMC", "Tiles", "Plumbing", "Electrical",
  "Sanitary Ware", "Doors & Windows", "Paints", "Interior Materials", "Other",
] as const;
export type EstimatorCategory = (typeof estimatorCategories)[number];
export const estimatorDefaultCategories: readonly EstimatorCategory[] = ["Steel", "Cement", "Sand"];

export const materialsCopy = {
  homeFootnote: `${categoryCount} material categories across structural, finishing and interior work, including tiles, plumbing, electrical, plywood, kitchen hardware and more.`,
  listFootnote: "These are material categories, not fixed stock. Availability and brands depend on project requirements.",
} as const;
