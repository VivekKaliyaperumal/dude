import { flags } from "@/content/flags";
import { termsAndConditions } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";
import { CtaBand } from "@/components/chrome/CtaBand";
import { PageHero } from "@/components/chrome/PageHero";
import { LegalClauses } from "@/components/sections/LegalClauses";

export const metadata = buildMetadata({
  title: termsAndConditions.title,
  description: termsAndConditions.lede,
  path: "/terms",
  noindex: !flags.legalBodies,
});

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title={termsAndConditions.title} lede={termsAndConditions.lede} />
      <LegalClauses doc={termsAndConditions} />
      <CtaBand />
    </>
  );
}
