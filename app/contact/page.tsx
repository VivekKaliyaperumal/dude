import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/chrome/PageHero";

export const metadata = buildMetadata({
  title: "Get a Free Quote — Contact",
  description:
    "Share your requirement and we will come back with a clear, itemised quotation. No prices are published online — every quotation is prepared for the specific project.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <PageHero
      eyebrow="Get in Touch"
      title="Tell Us What Your Project Needs."
      lede="Share your requirement and we will come back with a clear, itemised quotation. No prices are published online — every quotation is prepared for the specific project."
    />
  );
}
