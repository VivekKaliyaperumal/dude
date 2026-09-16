import type { ProjectImageKey } from "./images";

/**
 * PLACEHOLDER projects from the prototype. They are fictional and only render when
 * flags.projects is on. Replace all six with real projects (and own photos) before enabling.
 */
export type ProjectType = "Residential" | "Commercial" | "Construction" | "Renovation";
export type Project = { slug: ProjectImageKey; name: string; type: ProjectType; location: string; desc: string };

export const projects: readonly Project[] = [
  { slug: "courtyard-residence", name: "Courtyard Residence", type: "Residential", location: "Bengaluru, Karnataka", desc: "Material supply for a G+1 residence, from foundation to finishing stage." },
  { slug: "hillside-villa", name: "Hillside Villa", type: "Residential", location: "Nandi Hills, Karnataka", desc: "Structural and finishing materials coordinated across a villa build." },
  { slug: "grid-office-block", name: "Grid Office Block", type: "Commercial", location: "Bengaluru, Karnataka", desc: "Cement, steel and RMC supply for a commercial office structure." },
  { slug: "terrace-apartments", name: "Terrace Apartments", type: "Construction", location: "Mysuru, Karnataka", desc: "Complete civil construction execution for a small apartment block." },
  { slug: "legacy-home-retrofit", name: "Legacy Home Retrofit", type: "Renovation", location: "Bengaluru, Karnataka", desc: "Renovation materials with waterproofing and finishing support." },
  { slug: "warehouse-shell", name: "Warehouse Shell", type: "Commercial", location: "Tumakuru, Karnataka", desc: "Aggregates, blocks and structural steel for a warehouse shell." },
];

export const projectFilters = ["All", "Residential", "Commercial", "Construction", "Renovation"] as const;
export type ProjectFilter = (typeof projectFilters)[number];

/** "Supply Only, or Supply and Build." */
export type WayPanel = { label: string; title: string; body: string; points: readonly string[] };
export const twoWaysCopy = {
  lede: "Most clients start with materials. Some ask us to take the whole build. Both routes use the same team and the same quality checks.",
} as const;
export const twoWays: readonly WayPanel[] = [
  {
    label: "PRIMARY",
    title: "Material Supply",
    body: "You or your contractor run the site. We quote, source and deliver the materials stage by stage, matched to your drawings and schedule.",
    points: [
      "Itemised quotation by grade and brand",
      "Deliveries scheduled to construction stages",
      "Quantity checks and challans at site",
      "Guidance on grade and application",
    ],
  },
  {
    label: "SECONDARY",
    title: "Supply and Construction",
    body: "We take responsibility for execution as well as materials. One point of contact, one schedule, one quality standard from foundation to finishing.",
    points: [
      "Stage-wise scope and payment schedule",
      "Site supervision and labour management",
      "Materials matched to the structural design",
      "Handover with snag list closed",
    ],
  },
];

/** "What a Project Typically Includes." */
export type ProjectTypeCard = { label: string; title: string; body: string };
export const byProjectTypeCopy = {
  lede: "The material list changes with the kind of building. These are the categories we most often supply for each.",
} as const;
export const byProjectType: readonly ProjectTypeCard[] = [
  {
    label: "HOMES · VILLAS",
    title: "Residential",
    body: "Cement, TMT steel, M-sand, aggregates and blocks for the structure, then tiles, plumbing, electrical, sanitary ware, doors, windows and paints for finishing.",
  },
  {
    label: "OFFICES · WAREHOUSES",
    title: "Commercial",
    body: "Higher concrete grades and RMC for larger spans, structural steel, hollow blocks, waterproofing systems and durable flooring for heavier use.",
  },
  {
    label: "RETROFIT · REPAIR",
    title: "Renovation",
    body: "Smaller, precise quantities: waterproofing, plaster and putty, tiles and adhesives, plumbing and electrical replacements, paints and hardware.",
  },
];

/** "A Short Project Checklist." */
export const checklistCopy = {
  lede: "Six things that make a material order go smoothly, whatever the size of the project.",
} as const;
export const projectChecklist: readonly { n: string; title: string; body: string }[] = [
  { n: "01", title: "Confirm quantities against drawings", body: "Work from the structural and architectural drawings, not from memory. Small overages are normal; large ones are waste." },
  { n: "02", title: "Check site access", body: "Road width, turning space and overhead lines decide whether a large truck or a smaller vehicle should deliver." },
  { n: "03", title: "Prepare storage", body: "A dry, raised area for cement and a clear bay for sand and aggregate before the first delivery arrives." },
  { n: "04", title: "Match grades to the stage", body: "Footings, columns and slabs may need different aggregate sizes and concrete grades. Order what the stage needs." },
  { n: "05", title: "Agree the delivery window", body: "Materials arriving before the site is ready sit in the open. Schedule deliveries to the work." },
  { n: "06", title: "Keep challans and test certificates", body: "File every delivery challan and steel or cement certificate. They matter for quality checks and for the record." },
];
