import Image from "next/image";
import type { SiteImage } from "@/content/images";
import { routes } from "@/content/nav";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ImageWithCredit } from "@/components/ui/ImageWithCredit";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { Reveal } from "@/components/ui/Reveal";

type Props = { image?: SiteImage };

/** "Planning to Build?" - photo variant (Home) or parallax logo watermark (inner pages). */
export function CtaBand({ image }: Props) {
  return (
    <section data-theme="dark" className="relative overflow-hidden bg-ink py-band text-white">
      {image ? (
        <>
          <ImageWithCredit image={image} sizes="100vw" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(27_28_26/.78)_0%,rgb(27_28_26/.86)_60%,rgb(27_28_26/.94)_100%)]"
          />
        </>
      ) : (
        <ParallaxLayer
          mode="centred"
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 w-[min(1100px,120vw)] opacity-[.14]"
        >
          <Image unoptimized src="/logo-mark.png" alt="" width={1100} height={1100} className="block w-full" />
        </ParallaxLayer>
      )}
      <Container className="relative text-center">
        {image ? (
          <Reveal>
            <Image unoptimized src="/logo-mark.png" alt="" width={64} height={64} className="mx-auto mb-[26px] block h-16 w-16 object-contain" />
          </Reveal>
        ) : null}
        <Reveal as="h2" className="text-cta font-bold">
          Planning to Build?
        </Reveal>
        <Reveal as="p" delay={100} className="mx-auto mt-[22px] max-w-[52ch] text-lead text-on-dark">
          Tell us what you&rsquo;re building. We&rsquo;ll help you understand the materials, requirements and next steps.
        </Reveal>
        <Reveal delay={200} className="mt-[34px] flex flex-wrap justify-center gap-3">
          <Button href={routes.quote} variant="green" size="lg">
            Get a Free Quote
          </Button>
          <Button href={site.phone.tel} variant="outline-dark" size="lg">
            Call {site.phone.display}
          </Button>
          <Button href={site.phone.whatsapp} variant="outline-green" size="lg">
            Chat on WhatsApp
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
