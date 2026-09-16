import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { CtaBand } from "@/components/chrome/CtaBand";
import { PageHero } from "@/components/chrome/PageHero";

export const metadata = buildMetadata({
  title: site.titleDefault,
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <PageHero
        eyebrow={site.brand.tagline}
        title={
          <>
            Everything You Need to Build <span className="text-green">Better.</span>
          </>
        }
        lede="Quality construction materials, reliable supply, and complete construction support — from one trusted partner."
      />
      <CtaBand />
    </>
  );
}
