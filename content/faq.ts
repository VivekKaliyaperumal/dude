export type FaqItem = { q: string; a: string };

export const faqCopy = {
  eyebrow: "FAQ",
  title: "Common Questions.",
  lede: "Short answers to the questions we hear most. For anything project-specific, send an enquiry.",
} as const;

/** Materials page. */
export const materialsFaq: readonly FaqItem[] = [
  {
    q: "Do you publish prices?",
    a: "No. Material prices move with brand, grade, quantity and delivery location, so every quotation is prepared for the specific project. Send an enquiry and we will itemise it.",
  },
  {
    q: "Is there a minimum order?",
    a: "We supply single-site quantities for homeowners as well as bulk supply for contractors. Small orders may carry a delivery charge, which is shown on the quotation.",
  },
  {
    q: "Which cement grade should I buy?",
    a: "Follow the grade in your structural drawings. If nothing is specified, OPC 43 or PPC covers most residential work; OPC 53 is not automatically better for plaster or masonry.",
  },
  {
    q: "Can you supply a specific brand?",
    a: "Usually yes. Tell us the brand and grade you need and we will confirm availability for your location before quoting.",
  },
  {
    q: "How quickly can you deliver?",
    a: "Stock items around Bengaluru typically go out within a few working days of order confirmation. Larger or scheduled supplies are planned against your construction stages.",
  },
  {
    q: "Do you supply outside Bengaluru?",
    a: "Yes. We serve projects across Karnataka. Delivery lead time and charges depend on distance and vehicle access at site.",
  },
];

/** Construction page. */
export const constructionFaq: readonly FaqItem[] = [
  {
    q: "Do you take up construction without supplying materials?",
    a: "Our construction service is offered together with material supply, so one team is responsible for both quality and schedule.",
  },
  {
    q: "Who provides the design?",
    a: "You can bring your own architect and structural engineer, or we can coordinate with professionals we work with. We build to approved drawings.",
  },
  {
    q: "How is payment structured?",
    a: "Stage-wise, against completed work, with the schedule agreed before starting. The quotation sets out each stage.",
  },
  {
    q: "Do you handle approvals?",
    a: "We build to sanctioned plans and can guide you on the documents needed. Approvals themselves are obtained by the owner or their architect.",
  },
  {
    q: "What areas do you build in?",
    a: "Bengaluru and surrounding districts for execution, with material supply across Karnataka.",
  },
  {
    q: "Can I visit a site in progress?",
    a: "Yes. Ask when you enquire and we will arrange a visit to a suitable ongoing project.",
  },
];
