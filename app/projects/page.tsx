import { flags } from "@/content/flags";
import { byProjectType, byProjectTypeCopy, checklistCopy, projectChecklist } from "@/content/projects";
import { buildMetadata } from "@/lib/seo";
import { CtaBand } from "@/components/chrome/CtaBand";
import { PageHero } from "@/components/chrome/PageHero";
import { NumberedCards } from "@/components/sections/NumberedCards";
import { NumberedList } from "@/components/sections/NumberedList";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { TwoWaysWeWork } from "@/components/sections/TwoWaysWeWork";

const lede =
  "Residential, commercial, construction and renovation work across Karnataka. Project photography and details are being finalised.";

export const metadata = buildMetadata({
  title: "Projects We Have Supplied",
  description: lede,
  path: "/projects",
  // Thin until real projects are published (flags.projects); kept out of the index and the sitemap.
  noindex: !flags.projects,
});

export default function ProjectsPage() {
  return (
    <>
      <PageHero eyebrow="Selected work" title="Projects We Have Supplied." lede={lede} />
      <ProjectsSection variant="page" />
      <TwoWaysWeWork />
      <NumberedCards
        bg="paper"
        eyebrow="By project type"
        title="What a Project Typically Includes."
        lede={byProjectTypeCopy.lede}
        items={byProjectType.map((c) => ({ n: c.label, title: c.title, body: c.body }))}
        labelNumbers
        minCol={300}
      />
      <NumberedList bg="white" eyebrow="Before you order" title="A Short Project Checklist." lede={checklistCopy.lede} rows={projectChecklist} />
      <CtaBand />
    </>
  );
}
