import { site } from "./site";

export type KeyValue = { k: string; v: string };
export type NumberedItem = { n: string; title: string; body: string };

/** Key facts grid. Home shows six rows (with CONTACT); About shows the first five. */
export const homeKeyValues: readonly KeyValue[] = [
  { k: "BASED IN", v: site.basedIn },
  { k: "SERVICE AREA", v: site.serviceArea },
  { k: "PRIMARY", v: "Construction material supply" },
  { k: "ALSO", v: "Complete construction services" },
  { k: "BUSINESS", v: "GST registered" },
  { k: "CONTACT", v: site.phone.display },
];
export const aboutKeyValues = homeKeyValues.slice(0, 5);

export const aboutCopy = {
  heroEyebrow: "About dude & Co.",
  heroTitle: "More Than a Material Supplier.",
  heroLede:
    "We understand construction from the material stage to the actual site — which is why our quotations, guidance and supply decisions are made with the build in mind.",
  summaryLede:
    "dude & Co. brings together construction material supply and practical construction expertise to make building projects easier to plan, source and execute.",
  gstTitle: "GST Registered Business",
  gstStatement: "dude & Co. operates as a GST registered business. GST details are shared on quotations and invoices.",
} as const;

/** "Homeowners, Contractors and Design Teams." */
export const whoWeWorkWith: readonly NumberedItem[] = [
  {
    n: "01",
    title: "Homeowners",
    body: "Building your own house, often for the first time. We explain grades in plain language, quote clearly and deliver to your contractor’s schedule.",
  },
  {
    n: "02",
    title: "Contractors",
    body: "Reliable supply is your margin. We hold to agreed timelines, match brands and grades to the BOQ and keep paperwork clean.",
  },
  {
    n: "03",
    title: "Builders and developers",
    body: "Volume supply across multiple sites, with scheduled deliveries and consolidated billing.",
  },
  {
    n: "04",
    title: "Architects and engineers",
    body: "When you specify a material, we source that material. We flag substitutions before delivery, never after.",
  },
];
export const whoWeWorkWithCopy = {
  lede: "Different clients need different things from a supplier. We adjust how we work, not what we deliver.",
} as const;

/** "Karnataka-Wide Supply." */
export const districts: readonly string[] = [
  "Bengaluru Urban",
  "Bengaluru Rural",
  "Mysuru",
  "Tumakuru",
  "Ramanagara",
  "Mandya",
  "Kolar",
  "Chikkaballapur",
  "Hassan",
  "Other districts on request",
];
export const whereWeWorkCopy = {
  lede: "Regular deliveries in and around Bengaluru, Mysuru and Tumakuru, and project-based supply to other districts across the state.",
  footnote: "Delivery lead time and charges depend on distance and vehicle access. Confirmed on the quotation for your site.",
} as const;

/** "From Enquiry to Itemised Quotation." */
export const howWeQuote: readonly NumberedItem[] = [
  {
    n: "01",
    title: "Tell us the requirement",
    body: "Material, approximate quantity, delivery location and stage of construction, by form, call or WhatsApp.",
  },
  {
    n: "02",
    title: "We review the specification",
    body: "Grades and brands are checked against your drawings or BOQ. We ask if something is unclear rather than assume.",
  },
  {
    n: "03",
    title: "You receive an itemised quotation",
    body: "Each line shows material, grade, brand, quantity, unit and delivery terms, with validity stated.",
  },
  {
    n: "04",
    title: "Deliveries are scheduled",
    body: "Once confirmed, supplies are planned against your construction stages and confirmed a day ahead.",
  },
];
export const howWeQuoteCopy = {
  lede: "No price lists, no guesswork. Every quotation is built for the project in front of us.",
} as const;
