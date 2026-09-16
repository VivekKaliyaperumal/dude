import { flags } from "@/content/flags";
import { images } from "@/content/images";
import { site } from "@/content/site";
import { buildMetadata } from "@/lib/seo";
import { CtaBand } from "@/components/chrome/CtaBand";
import { AboutSummary } from "@/components/sections/AboutSummary";
import { BrandOptions } from "@/components/sections/BrandOptions";
import { CivilConstructionSection } from "@/components/sections/CivilConstructionSection";
import { ContactSummary } from "@/components/sections/ContactSummary";
import { EstimatorSection } from "@/components/sections/EstimatorSection";
import { HomeHero } from "@/components/sections/HomeHero";
import { MaterialsSection } from "@/components/sections/MaterialsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { QualityApproach } from "@/components/sections/QualityApproach";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { SupplyProcessSection } from "@/components/sections/SupplyProcessSection";
import { Testimonials } from "@/components/sections/Testimonials";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { WhySection } from "@/components/sections/WhySection";

export const metadata = buildMetadata({
  title: site.titleDefault,
  description: site.description,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <TrustStrip />
      <MaterialsSection />
      {flags.brandOptions ? <BrandOptions /> : null}
      <QuoteSection />
      {flags.estimator ? <EstimatorSection /> : null}
      <WhySection id="about" />
      <SupplyProcessSection />
      <CivilConstructionSection />
      <ProjectsSection variant="home" />
      <QualityApproach />
      <AboutSummary />
      {flags.testimonials ? <Testimonials /> : null}
      <CtaBand image={images.ctaBand} />
      <ContactSummary />
    </>
  );
}
