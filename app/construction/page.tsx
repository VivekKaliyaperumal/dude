import { constructionCopy, needFromYou, scopeOfServices, stagesG1 } from "@/content/construction";
import { constructionFaq } from "@/content/faq";
import { routes } from "@/content/nav";
import { breadcrumbJsonLd, buildMetadata, serviceJsonLd } from "@/lib/seo";
import { CtaBand } from "@/components/chrome/CtaBand";
import { PageHero } from "@/components/chrome/PageHero";
import { CivilConstructionSection } from "@/components/sections/CivilConstructionSection";
import { DesignTeam } from "@/components/sections/DesignTeam";
import { FaqSection } from "@/components/sections/FaqSection";
import { NumberedCards } from "@/components/sections/NumberedCards";
import { NumberedList } from "@/components/sections/NumberedList";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/ui/JsonLd";

const lede =
  "Our secondary service: civil construction execution, from the first foundation work to final finishing, with materials arranged alongside.";

export const metadata = buildMetadata({
  title: "Civil Construction Contractor in Bengaluru",
  description:
    "Civil construction from foundation to finishing in Bengaluru, with materials arranged by the same team. Built to approved drawings, with stage-wise payment.",
  path: "/construction",
});

export default function ConstructionPage() {
  return (
    <>
      <PageHero eyebrow="Civil construction" title="Complete Construction Support." lede={lede} />
      {/* No photo banner here: the PageHero above already introduces the page. */}
      <CivilConstructionSection banner={false} />
      <NumberedCards
        tone="dark"
        eyebrow="Scope of services"
        title="What Our Construction Team Handles."
        lede={constructionCopy.scopeLede}
        items={scopeOfServices}
        minCol={320}
      />
      <DesignTeam />
      <NumberedList eyebrow="Sequence" title="Typical Stages for a G+1 Home." lede={constructionCopy.stagesLede} rows={stagesG1} />
      <NumberedCards eyebrow="To get started" title="What We Need From You." lede={constructionCopy.needLede} items={needFromYou} minCol={320}>
        <Reveal className="mt-8">
          <Button href={routes.contactForm} variant="ink" arrow>
            Discuss a construction project
          </Button>
        </Reveal>
      </NumberedCards>
      <FaqSection items={constructionFaq} />
      <CtaBand />
      <JsonLd data={breadcrumbJsonLd([{ name: "Construction", path: routes.construction }])} />
      <JsonLd
        data={serviceJsonLd({
          name: "Civil construction",
          serviceType: "Civil construction",
          description: lede,
          path: routes.construction,
          options: scopeOfServices.map((s) => s.title),
        })}
      />
    </>
  );
}
