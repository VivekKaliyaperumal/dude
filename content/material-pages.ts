import type { FaqItem } from "./faq";

/**
 * Copy for the per-material landing pages at /materials/<slug> (SEO pass, 02-Oct-2026).
 * Explanatory buying guidance only: no prices, brands, lead times or stock claims. Technical
 * statements repeat the approved material guide (content/materials-guide.ts); owner and engineer
 * review is still pending before launch.
 *
 * `seoTitle` stays within 47 characters so the full <title> ("… | dude & Co.") fits in 60.
 */
export type MaterialPage = {
  slug: string;
  h1: string;
  seoTitle: string;
  seoDescription: string;
  lede: string;
  /** `label` of the matching cell in materialGuide. */
  guideLabel: string;
  /** `title` of the matching row in storageTips. */
  storageTitle: string;
  uses: readonly { title: string; body: string }[];
  faq: readonly FaqItem[];
  related: readonly string[];
};

export const materialPages: readonly MaterialPage[] = [
  {
    slug: "cement",
    h1: "Cement Supplier in Bengaluru.",
    seoTitle: "Cement Supplier in Bengaluru — OPC 43, 53, PPC",
    seoDescription:
      "OPC 43, OPC 53, PPC and PSC cement supplied to sites in Bengaluru and across Karnataka, matched to your structural drawings. Request an itemised quote.",
    lede: "OPC 43, OPC 53, PPC and PSC cement for footings, slabs, masonry and plaster, matched to the grade in your drawings.",
    guideLabel: "CEMENT",
    storageTitle: "Cement",
    uses: [
      {
        title: "Footings, columns and slabs",
        body: "Structural concrete follows the grade your engineer specifies. OPC 43 or PPC covers most residential RCC; OPC 53 is for high-strength or early-strength work.",
      },
      {
        title: "Masonry and plaster",
        body: "Brickwork, blockwork and plaster do not need the highest grade. PPC or OPC 43 is the usual choice; OPC 53 is not automatically better here.",
      },
      {
        title: "Wet or coastal exposure",
        body: "PSC resists sulphates, so it suits foundations in wet ground and work exposed to coastal conditions.",
      },
    ],
    faq: [
      {
        q: "Which cement grade should I buy?",
        a: "Follow the grade in your structural drawings. If nothing is specified, OPC 43 or PPC covers most residential work; OPC 53 is not automatically better for plaster or masonry.",
      },
    ],
    related: ["m-sand", "aggregates", "tmt-steel"],
  },
  {
    slug: "tmt-steel",
    h1: "TMT Steel Supplier in Bengaluru.",
    seoTitle: "TMT Steel Bars Supplier in Bengaluru — Fe 500D",
    seoDescription:
      "Fe 500, Fe 500D and Fe 550 TMT bars supplied to the grade and diameter your structural design calls for, across Bengaluru and Karnataka. Request a quote.",
    lede: "Reinforcement bars in Fe 500, Fe 500D, Fe 550 and other grades, supplied to the grade and diameter on your structural drawings.",
    guideLabel: "STEEL",
    storageTitle: "TMT steel",
    uses: [
      {
        title: "Choosing the grade",
        body: "Bar grade comes from the structural design. Fe 500 is the everyday grade for homes; Fe 500D is preferred where seismic detailing matters.",
      },
      {
        title: "Quantities by diameter",
        body: "Share your bar bending schedule (BBS) if you have one, so the quotation lists each diameter in the quantity that will actually be cut and tied.",
      },
      {
        title: "Checking what arrives",
        body: "Look for the ISI mark and the grade rolled into the bar, and ask for the manufacturer’s test certificate with the delivery.",
      },
    ],
    faq: [
      {
        q: "Should I choose Fe 500 or Fe 500D?",
        a: "Follow your structural engineer’s specification. Fe 500D has higher ductility and is preferred where seismic detailing matters; Fe 500 is the everyday grade for most homes.",
      },
    ],
    related: ["cement", "aggregates", "ready-mix-concrete"],
  },
  {
    slug: "m-sand",
    h1: "M-Sand Supplier in Bengaluru.",
    seoTitle: "M-Sand Supplier in Bengaluru, Karnataka",
    seoDescription:
      "Concrete, plastering and washed M-sand supplied to sites in Bengaluru and across Karnataka for concreting, masonry and plaster work. Request an itemised quote.",
    lede: "Concrete, plastering and washed M-sand. Choose the variant for the job rather than one sand for everything.",
    guideLabel: "SAND",
    storageTitle: "Sand and aggregate",
    uses: [
      {
        title: "Concrete",
        body: "Concrete M-sand is the coarser variant, mixed with cement and aggregate for footings, columns, beams and slabs.",
      },
      {
        title: "Plaster",
        body: "Plastering M-sand is finer and washed, for internal and external plaster work.",
      },
      {
        title: "Masonry mortar",
        body: "Brick and block joints use M-sand in the mortar. Tell us the work and we will suggest the variant to quote.",
      },
    ],
    faq: [
      {
        q: "What is the difference between concrete and plastering M-sand?",
        a: "Concrete M-sand is coarser; plastering M-sand is finer and washed. Both are crushed and graded granite and should meet the grading zones in IS 383.",
      },
    ],
    related: ["cement", "aggregates", "red-bricks"],
  },
  {
    slug: "aggregates",
    h1: "Aggregates (Jelly) Supplier in Bengaluru.",
    seoTitle: "Jelly & Aggregates Supplier in Bengaluru",
    seoDescription:
      "12 mm, 20 mm and 40 mm granite aggregates (jelly) for slabs, footings, PCC and road work, supplied across Bengaluru and Karnataka. Request an itemised quote.",
    lede: "Graded granite aggregates, known locally as jelly, in 12 mm, 20 mm, 40 mm and other sizes for concrete, footing and road work.",
    guideLabel: "AGGREGATE",
    storageTitle: "Sand and aggregate",
    uses: [
      { title: "12 mm", body: "For slabs, lintels and thin sections." },
      { title: "20 mm", body: "For footings, columns and beams." },
      { title: "40 mm", body: "For PCC beds and mass concrete." },
    ],
    faq: [
      {
        q: "Which jelly size do I need?",
        a: "Use the size in your drawings or BOQ. As a guide, 12 mm suits slabs, lintels and thin sections, 20 mm footings, columns and beams, and 40 mm PCC beds and mass concrete.",
      },
    ],
    related: ["cement", "m-sand", "ready-mix-concrete"],
  },
  {
    slug: "red-bricks",
    h1: "Red Bricks Supplier in Bengaluru.",
    seoTitle: "Red Bricks Supplier in Bengaluru — Wire-cut",
    seoDescription:
      "Wire-cut and table-mould red bricks for load-bearing and partition masonry, supplied to sites in Bengaluru and across Karnataka. Request an itemised quote.",
    lede: "Wire-cut and table-mould burnt clay bricks for load-bearing and partition masonry.",
    guideLabel: "MASONRY",
    storageTitle: "Bricks and blocks",
    uses: [
      {
        title: "Wire-cut bricks",
        body: "Machine-cut to a more uniform size and edge, which helps where brickwork is left exposed or joints need to be neat.",
      },
      {
        title: "Table-mould bricks",
        body: "Moulded bricks commonly used for walls that will be plastered.",
      },
      {
        title: "Before laying",
        body: "Wet clay bricks a day before laying so they do not draw water out of the mortar.",
      },
    ],
    faq: [],
    related: ["concrete-blocks", "aac-blocks", "m-sand"],
  },
  {
    slug: "concrete-blocks",
    h1: "Concrete Blocks Supplier in Bengaluru.",
    seoTitle: "Solid & Hollow Concrete Blocks in Bengaluru",
    seoDescription:
      "Solid and hollow concrete blocks for walls, compound walls and infill masonry, supplied to sites in Bengaluru and across Karnataka. Request an itemised quote.",
    lede: "Solid and hollow concrete blocks in standard sizes for walls, compound work and infill masonry.",
    guideLabel: "MASONRY",
    storageTitle: "Bricks and blocks",
    uses: [
      { title: "Solid blocks", body: "For walls that carry load or need to take heavy fixings." },
      { title: "Hollow blocks", body: "Lighter per block and quick to lay for compound walls and infill." },
      {
        title: "Sizes",
        body: "Tell us the wall thickness on your drawings; block size and count are quoted to match.",
      },
    ],
    faq: [],
    related: ["aac-blocks", "red-bricks", "cement"],
  },
  {
    slug: "aac-blocks",
    h1: "AAC Blocks Supplier in Bengaluru.",
    seoTitle: "AAC Blocks Supplier in Bengaluru",
    seoDescription:
      "Lightweight AAC blocks in multiple thicknesses, supplied to sites in Bengaluru and across Karnataka to reduce dead load and speed up masonry. Request a quote.",
    lede: "Lightweight autoclaved aerated concrete blocks in multiple thicknesses. They reduce dead load on the structure and speed up masonry.",
    guideLabel: "MASONRY",
    storageTitle: "Bricks and blocks",
    uses: [
      { title: "Lower dead load", body: "AAC is light, which reduces the load walls put on beams and columns." },
      { title: "Insulation", body: "AAC blocks insulate well, which matters most for walls that take direct sun." },
      {
        title: "Laying",
        body: "Use a thin-bed block adhesive or the right mortar, and keep blocks dry until they are used.",
      },
    ],
    faq: [
      {
        q: "Do AAC blocks need a special mortar?",
        a: "They are laid with a thin-bed block adhesive or the right mortar rather than ordinary thick joints. Follow the block manufacturer’s recommendation.",
      },
    ],
    related: ["concrete-blocks", "red-bricks", "cement"],
  },
  {
    slug: "ready-mix-concrete",
    h1: "Ready Mix Concrete (RMC) in Bengaluru.",
    seoTitle: "Ready Mix Concrete (RMC) Supplier in Bengaluru",
    seoDescription:
      "Ready mix concrete arranged to your grade and pour schedule for sites in Bengaluru and across Karnataka, site conditions permitting. Request an itemised quote.",
    lede: "RMC arranged to your grade and pour schedule, site conditions permitting. Batched at a plant and delivered by transit mixer.",
    guideLabel: "RMC",
    storageTitle: "Ready mix concrete",
    uses: [
      { title: "Grade", body: "Homes typically use M20 to M30. Follow the grade in your structural drawings." },
      {
        title: "Volume",
        body: "Share the approximate volume in cubic metres, or the slab and beam sizes, so the number of mixers can be planned.",
      },
      {
        title: "Site access",
        body: "Tell us whether a transit mixer can reach the pour point and how far the concrete has to travel on site.",
      },
    ],
    faq: [
      {
        q: "What do you need to schedule an RMC pour?",
        a: "The grade, approximate volume, site address, the date you want to pour and whether a transit mixer can reach the pour point. Formwork, reinforcement and labour should be ready before the mixer arrives.",
      },
    ],
    related: ["tmt-steel", "cement", "aggregates"],
  },
];

export const materialPageBySlug = (slug: string) => materialPages.find((p) => p.slug === slug);
