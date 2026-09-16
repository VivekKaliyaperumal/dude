import { routes } from "@/content/nav";
import { buildMetadata } from "@/lib/seo";
import { CtaBand } from "@/components/chrome/CtaBand";
import { PageHero } from "@/components/chrome/PageHero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata = buildMetadata({
  title: "Page not found",
  description: "The page you were looking for does not exist or has moved.",
  path: "/404",
  noindex: true,
});

export default function NotFound() {
  return (
    <>
      <PageHero eyebrow="404" title="Page Not Found." lede="The page you were looking for does not exist or has moved." />
      <section className="bg-paper py-section-sm">
        <Container className="flex flex-wrap gap-3">
          <Button href={routes.home} variant="ink">
            Back to Home
          </Button>
          <Button href={routes.materials} variant="outline">
            Explore Materials
          </Button>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
