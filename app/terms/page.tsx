import { flags } from "@/content/flags";
import { buildMetadata } from "@/lib/seo";
import { CtaBand } from "@/components/chrome/CtaBand";
import { PageHero } from "@/components/chrome/PageHero";

export const metadata = buildMetadata({
  title: "Terms & Conditions",
  description: "The terms that apply to this website, enquiries submitted through it, and quotations issued by dude & Co.",
  path: "/terms",
  noindex: !flags.legalBodies,
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions"
        lede="The terms that apply to this website, enquiries submitted through it, and quotations issued by dude & Co."
      />
      <CtaBand />
    </>
  );
}
