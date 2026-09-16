import { buildMetadata } from "@/lib/seo";
import { CtaBand } from "@/components/chrome/CtaBand";
import { PageHero } from "@/components/chrome/PageHero";

export const metadata = buildMetadata({
  title: "Projects We Have Supplied",
  description:
    "Residential, commercial, construction and renovation work across Karnataka. Project photography and details are being finalised.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Selected Work"
        title="Projects We Have Supplied."
        lede="Residential, commercial, construction and renovation work across Karnataka. Project photography and details are being finalised."
      />
      <CtaBand />
    </>
  );
}
