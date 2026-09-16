/**
 * "Know What You Are Ordering." and "Storing Materials Properly." (Materials page).
 * Technical statements (IS codes, grades, durations) are the prototype's approved copy,
 * kept verbatim. An engineer should confirm them before launch.
 */
export type GuideCell = { label: string; title: string; body: string };
export type StorageTip = { n: string; title: string; body: string };

export const materialGuideCopy = {
  eyebrow: "Material guide",
  title: "Know What You Are Ordering.",
  lede: "A plain-language guide to the grades and standards you will see on quotations and delivery challans. Always follow your structural engineer’s specification.",
} as const;

export const materialGuide: readonly GuideCell[] = [
  {
    label: "CEMENT",
    title: "Cement grades",
    body: "OPC 33, 43 and 53 are all covered by IS 269:2015; the number is the minimum 28-day strength in MPa. OPC 43 suits most residential RCC and plaster; OPC 53 is for high-strength or early-strength work. PPC (IS 1489) gains strength slower but is more durable and is common for homes. PSC (IS 455) resists sulphates and suits wet or coastal exposure.",
  },
  {
    label: "STEEL",
    title: "TMT steel grades",
    body: "Reinforcement bars follow IS 1786. Fe 500 is the everyday grade for homes; Fe 500D and 550D carry a “D” for higher ductility, preferred where seismic detailing matters. Common diameters run 8 mm to 32 mm. Check for the ISI mark, the grade rolled into the bar and the manufacturer’s test certificate.",
  },
  {
    label: "SAND",
    title: "M-sand vs river sand",
    body: "Manufactured sand is crushed and graded granite, so its quality is consistent batch to batch. Concrete M-sand is coarser; plastering M-sand is finer and washed. River sand is regulated in Karnataka and supplied only when available. Both should meet the grading zones in IS 383.",
  },
  {
    label: "AGGREGATE",
    title: "Aggregate sizes",
    body: "Coarse aggregate is specified by nominal size under IS 383. 12 mm is used for slabs, lintels and thin sections; 20 mm for footings, columns and beams; 40 mm for PCC beds and mass concrete. Angular, well-graded stone gives a denser, stronger mix.",
  },
  {
    label: "MASONRY",
    title: "Bricks, blocks and AAC",
    body: "Burnt clay bricks follow IS 1077. Solid and hollow concrete blocks follow IS 2185 Part 1 and are quicker to lay for compound walls and infill. AAC blocks (IS 2185 Part 3) are light, cut easily and insulate well, which reduces dead load on the structure; they need a thin-bed adhesive or the right mortar.",
  },
  {
    label: "RMC",
    title: "Ready mix concrete",
    body: "RMC is batched at a plant to IS 4926 and delivered by transit mixer. Homes typically use M20 to M30, where the number is the characteristic strength in MPa. Plan the pour around travel time, check slump on arrival and keep cube samples for testing.",
  },
];

export const storageCopy = {
  eyebrow: "On site",
  title: "Storing Materials Properly.",
  lede: "Good material can be spoilt by poor storage. A few habits protect what you have paid for.",
} as const;

export const storageTips: readonly StorageTip[] = [
  {
    n: "01",
    title: "Cement",
    body: "Keep bags dry on a raised platform, away from walls, and use them within about three months of manufacture. Lumps that do not crumble mean the bag has set.",
  },
  {
    n: "02",
    title: "TMT steel",
    body: "Stack bars off the ground on timber or blocks and cover them. Light surface rust is normal; flaking or pitted rust is not.",
  },
  {
    n: "03",
    title: "Sand and aggregate",
    body: "Store in separate bays on a hard surface so they do not mix with soil or each other. Cover sand during rain to control moisture.",
  },
  {
    n: "04",
    title: "Bricks and blocks",
    body: "Stack on level ground, no more than a metre high. Keep AAC blocks dry before use; wet clay bricks a day before laying.",
  },
  {
    n: "05",
    title: "Ready mix concrete",
    body: "Have formwork, reinforcement and labour ready before the mixer arrives. Concrete should be placed within the time the plant specifies on the challan.",
  },
];
