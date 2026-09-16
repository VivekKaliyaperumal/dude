import { flags } from "@/content/flags";
import { privacyPolicy } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";
import { CtaBand } from "@/components/chrome/CtaBand";
import { PageHero } from "@/components/chrome/PageHero";
import { LegalClauses } from "@/components/sections/LegalClauses";

export const metadata = buildMetadata({
  title: privacyPolicy.title,
  description: privacyPolicy.lede,
  path: "/privacy",
  noindex: !flags.legalBodies,
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title={privacyPolicy.title} lede={privacyPolicy.lede} />
      <LegalClauses doc={privacyPolicy} />
      <CtaBand />
    </>
  );
}
