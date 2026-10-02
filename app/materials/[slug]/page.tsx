import { notFound } from "next/navigation";
import { haveHandy } from "@/content/contact";
import { materialsFaq } from "@/content/faq";
import { materialPageBySlug, materialPages } from "@/content/material-pages";
import { structuralMaterials } from "@/content/materials";
import { materialGuide, storageTips } from "@/content/materials-guide";
import { materialHref, routes } from "@/content/nav";
import { breadcrumbJsonLd, buildMetadata, serviceJsonLd } from "@/lib/seo";
import { CtaBand } from "@/components/chrome/CtaBand";
import { PageHero } from "@/components/chrome/PageHero";
import { FaqSection } from "@/components/sections/FaqSection";
import { MaterialCard } from "@/components/sections/MaterialCard";
import { MaterialDetail } from "@/components/sections/MaterialDetail";
import { materialsGridStyle } from "@/components/sections/MaterialsSection";
import { NumberedCards } from "@/components/sections/NumberedCards";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/ui/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

/** Only the slugs in content/material-pages.ts exist; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return materialPages.map((p) => ({ slug: p.slug }));
}

/** The material-specific question first, then the shared supply answers (the cement-grade one lives on the cement page). */
const sharedFaq = materialsFaq.filter((f) => !f.q.startsWith("Which cement grade"));

function load(slug: string) {
  const page = materialPageBySlug(slug);
  const material = structuralMaterials.find((m) => m.slug === slug);
  return page && material ? { page, material } : null;
}

export async function generateMetadata({ params }: PageProps<"/materials/[slug]">) {
  const found = load((await params).slug);
  if (!found) return {};
  return buildMetadata({ title: found.page.seoTitle, description: found.page.seoDescription, path: materialHref(found.page.slug) });
}

export default async function MaterialPage({ params }: PageProps<"/materials/[slug]">) {
  const found = load((await params).slug);
  if (!found) notFound();
  const { page, material } = found;
  const path = materialHref(page.slug);
  const related = page.related.flatMap((s) => structuralMaterials.filter((m) => m.slug === s));

  return (
    <>
      <PageHero eyebrow="Construction materials" title={page.h1} lede={page.lede} />
      <MaterialDetail
        material={material}
        guide={materialGuide.find((g) => g.label === page.guideLabel)}
        storage={storageTips.find((t) => t.title === page.storageTitle)}
      />
      <NumberedCards
        eyebrow="Choosing well"
        title={`Ordering ${material.name} for Your Site.`}
        lede="A plain-language guide. Always follow your structural engineer’s specification."
        items={page.uses.map((u, i) => ({ n: String(i + 1).padStart(2, "0"), title: u.title, body: u.body }))}
        minCol={300}
      />
      <NumberedCards
        bg="paper"
        eyebrow="Before you enquire"
        title="Have These Handy."
        lede="You do not need all of them. The more you share, the more precise the first quotation will be."
        items={haveHandy}
        minCol={320}
      >
        <Reveal className="mt-8">
          <Button href={routes.quote} variant="ink" arrow>
            Request a quote for {material.name}
          </Button>
        </Reveal>
      </NumberedCards>
      <section className="border-t border-line bg-white py-section" aria-labelledby="related-heading">
        <Container>
          <SectionHeading
            id="related-heading"
            layout="split"
            eyebrow="Often ordered together"
            title="Related Materials."
            lede="Most sites order these in the same stage. One quotation can cover all of them."
          />
          <div className="mt-block grid gap-[clamp(16px,1.6vw,24px)]" style={materialsGridStyle}>
            {related.map((m, i) => (
              <MaterialCard key={m.n} material={m} delay={i * 90} />
            ))}
          </div>
          <Reveal className="mt-8 flex flex-wrap gap-3">
            <Button href={routes.materials} variant="outline" arrow>
              View all materials
            </Button>
            <Button href={routes.construction} variant="outline" arrow>
              Civil construction
            </Button>
          </Reveal>
        </Container>
      </section>
      <FaqSection items={[...page.faq, ...sharedFaq]} />
      <CtaBand />
      <JsonLd data={breadcrumbJsonLd([{ name: "Materials", path: routes.materials }, { name: material.name, path }])} />
      <JsonLd
        data={serviceJsonLd({
          name: `${material.name} supply`,
          serviceType: `${material.name} supplier`,
          description: page.seoDescription,
          path,
          // Chips such as "other grades" or "multiple thicknesses" describe the range, not a product.
          options: material.variants.filter((v) => /^[A-Z0-9]/.test(v) && v !== "Lightweight"),
        })}
      />
    </>
  );
}
