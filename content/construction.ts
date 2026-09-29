export type NumberedItem = { n: string; title: string; body: string };

/** Scope-of-work chips (Home, Construction). */
export const scope: readonly string[] = [
  "Residential Construction", "Villa Construction", "Commercial Construction", "Foundation Work", "RCC Work",
  "Structural Work", "Brickwork", "Blockwork", "Plastering", "Flooring", "Waterproofing", "Electrical", "Plumbing",
  "Painting", "Finishing", "Renovation", "Complete Project Execution",
];

/** "Complete Construction Process" 01-09 (Home, Construction). */
export const constructionProcess: readonly string[] = [
  "Consultation", "Site Visit", "Requirement Analysis", "Planning & Estimation", "Material Planning",
  "Construction Execution", "Quality Checks", "Finishing", "Handover",
];

export const constructionCopy = {
  statement: "From the first foundation work to the final finishing, our team can also support complete construction execution.",
  scopeLede: "Civil execution is our secondary service, offered alongside material supply so one team is accountable for both.",
  stagesLede:
    "Every site is different, but most independent homes move through the same sequence. Durations are indicative and depend on design, approvals and weather.",
  needLede: "The more of this you have ready, the faster we can give you a clear scope and quotation.",
  teamLede: "Planning, interiors and elevations are handled by our own design team, working alongside the site crew.",
} as const;

export type TeamMember = {
  initials: string;
  name: string;
  role: string;
  facts: readonly { k: string; v: string }[];
  tags: readonly string[];
  bio: string;
};

/**
 * "Our design team". Details supplied by the owner on 29-Sep-2026. Only COA-registered members carry
 * the "Ar." prefix, the "Architect" title and a COA line. No photos, by the owner's request.
 */
export const designTeam: readonly TeamMember[] = [
  {
    initials: "VY",
    name: "Ar. Vinuta Yogesh",
    role: "Senior Architect",
    facts: [
      { k: "Qualification", v: "B.Arch" },
      { k: "Experience", v: "15+ years" },
      { k: "COA Reg.", v: "CA/98/23049" },
    ],
    tags: ["Healthcare", "Residential"],
    bio: "Currently handling a hospital project in Kalaburagi and a number of residential projects in Bengaluru, with an apartment design and a township development in the pipeline.",
  },
  {
    initials: "HU",
    name: "Harshitha U",
    role: "Senior Interior Designer",
    facts: [
      { k: "Qualification", v: "Civil Engineering" },
      { k: "Experience", v: "9+ years" },
    ],
    tags: ["2D interior design", "3D interior design", "3D exterior elevations", "Residential", "Commercial"],
    bio: "I’m an Interior Designer with 9+ years of experience, creating elegant, functional, and personalized spaces. I turn your vision into beautiful interiors with thoughtful design and attention to detail.",
  },
];

/** "What Our Construction Team Handles." */
export const scopeOfServices: readonly NumberedItem[] = [
  { n: "01", title: "RCC structure", body: "Footings, plinth, columns, beams and slabs built to the structural drawings, with reinforcement checked before every pour." },
  { n: "02", title: "Masonry and plastering", body: "Brick, block or AAC walls with proper bonding, lintels and chajjas, followed by internal and external plaster to line and level." },
  { n: "03", title: "Waterproofing", body: "Treatment for sumps, toilets, terraces and basements at the right stage, using the system specified for the location." },
  { n: "04", title: "Flooring and tiling", body: "Screeds, tiles, granite and skirting laid to level with consistent joints and slopes towards drains." },
  { n: "05", title: "Painting and finishing", body: "Putty, primer and paint systems for interiors and exteriors, along with grills, doors and windows fixing." },
  { n: "06", title: "Electrical and plumbing coordination", body: "Conduit and pipe routing planned with the structure so walls are not broken later, with licensed trades for connections." },
];

/** "Typical Stages for a G+1 Home." Durations are the prototype's indicative figures, kept with their caveat. */
export const stagesG1: readonly NumberedItem[] = [
  { n: "01", title: "Site preparation and excavation", body: "Marking, levelling, excavation for footings and the compound. Around 2 to 3 weeks." },
  { n: "02", title: "Footings and plinth", body: "PCC bed, footings, plinth beams and backfilling. Around 3 to 4 weeks." },
  { n: "03", title: "Columns, beams and slabs", body: "One floor at a time, with curing between stages. Around 4 to 6 weeks per floor." },
  { n: "04", title: "Masonry", body: "External and internal walls, lintels and sunshades. Around 3 to 4 weeks per floor." },
  { n: "05", title: "Electrical and plumbing first fix", body: "Conduits, pipes and sump connections run before plaster. Around 2 to 3 weeks." },
  { n: "06", title: "Plastering and waterproofing", body: "Internal and external plaster, wet-area and terrace treatment. Around 3 to 4 weeks." },
  { n: "07", title: "Flooring, doors and windows", body: "Screeds, tiles, frames and shutters. Around 3 to 4 weeks." },
  { n: "08", title: "Painting and handover", body: "Putty, paint, fittings, final cleaning and snag list. Around 3 to 4 weeks." },
];

/** "What We Need From You." */
export const needFromYou: readonly NumberedItem[] = [
  { n: "01", title: "Sanctioned plan", body: "The approved architectural drawings from the local authority, or the draft if approval is in progress." },
  { n: "02", title: "Structural drawings", body: "Footing, column, beam and slab details from your structural engineer. If you do not have one yet, we can suggest how to proceed." },
  { n: "03", title: "Site details", body: "Location, plot dimensions, road width and access for material vehicles, and water and power availability." },
  { n: "04", title: "Soil report", body: "If a soil test has been done, share it. It affects footing design and the quantities that follow." },
  { n: "05", title: "Timeline and budget bracket", body: "When you want to start and finish, and the range you are working within, so the scope can be matched to it." },
  { n: "06", title: "Finishing preferences", body: "Broad choices for flooring, doors, windows and paint help us plan quantities for the later stages." },
];
