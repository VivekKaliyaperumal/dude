import { flags } from "@/content/flags";
import { buildMetadata } from "@/lib/seo";
import { CtaBand } from "@/components/chrome/CtaBand";
import { PageHero } from "@/components/chrome/PageHero";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How dude & Co. handles the information you share through enquiry forms, calls and WhatsApp.",
  path: "/privacy",
  noindex: !flags.legalBodies,
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        lede="How dude & Co. handles the information you share through enquiry forms, calls and WhatsApp."
      />
      <CtaBand />
    </>
  );
}
