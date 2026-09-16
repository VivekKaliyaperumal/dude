import { buildMetadata } from "@/lib/seo";
import { CtaBand } from "@/components/chrome/CtaBand";
import { PageHero } from "@/components/chrome/PageHero";

export const metadata = buildMetadata({
  title: "About — More Than a Material Supplier",
  description:
    "We understand construction from the material stage to the actual site — which is why our quotations, guidance and supply decisions are made with the build in mind.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About dude & Co."
        title="More Than a Material Supplier."
        lede="We understand construction from the material stage to the actual site — which is why our quotations, guidance and supply decisions are made with the build in mind."
      />
      <CtaBand />
    </>
  );
}
