/**
 * Privacy Policy and Terms & Conditions.
 * The prototype ships clause headings only; approved wording has not been supplied.
 * Bodies stay undefined (rendered as "Content to confirm.") and the pages are noindex
 * until flags.legalBodies is switched on with real text and a real lastUpdated date.
 */
export type LegalClause = { n: string; heading: string; body?: string };
export type LegalDocument = {
  title: string;
  lede: string;
  clauses: readonly LegalClause[];
  /** dd-MMM-yyyy once approved wording is in place. */
  lastUpdated?: string;
};

export const privacyPolicy: LegalDocument = {
  title: "Privacy Policy",
  lede: "How dude & Co. handles the information you share through enquiry forms, calls and WhatsApp.",
  clauses: [
    { n: "01", heading: "Information We Collect" },
    { n: "02", heading: "How We Use Your Information" },
    { n: "03", heading: "Sharing and Disclosure" },
    { n: "04", heading: "Data Retention" },
    { n: "05", heading: "Your Rights" },
    { n: "06", heading: "Contact for Privacy Queries" },
  ],
};

export const termsAndConditions: LegalDocument = {
  title: "Terms & Conditions",
  lede: "The terms that apply to this website, enquiries submitted through it, and quotations issued by dude & Co.",
  clauses: [
    { n: "01", heading: "Use of This Website" },
    { n: "02", heading: "Enquiries and Quotations" },
    { n: "03", heading: "Material Availability" },
    { n: "04", heading: "Pricing and Validity" },
    { n: "05", heading: "Limitation of Liability" },
    { n: "06", heading: "Governing Law" },
  ],
};
