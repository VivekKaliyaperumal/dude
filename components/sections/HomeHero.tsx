import Image from "next/image";
import { preload } from "react-dom";
import { images, type SiteImage } from "@/content/images";
import { routes } from "@/content/nav";
import { site } from "@/content/site";
import { HeroSlideshow, type HeroSlide } from "@/components/sections/HeroSlideshow";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import imageLoader from "@/lib/images/loader";
import { photoEntry } from "@/lib/images/photos";

const up = (delay: string) => ({ animationDelay: delay });

// Full-width photo at every viewport, served at the largest rendition the source has (the
// Project Elephant photos top out at ~1270 px, X's original size). Own photos take their width
// ladder from the manifest; the fallback ladder is only for a remote (Unsplash) source.
const HERO_SIZES = "100vw";
const HERO_QUALITY = 70;
const FALLBACK_WIDTHS = [640, 960, 1280, 1920];

function toSlide(image: SiteImage): HeroSlide {
  const widths = photoEntry(image.src)?.widths ?? FALLBACK_WIDTHS;
  const url = (width: number) => imageLoader({ src: image.src, width, quality: HERO_QUALITY });
  return {
    src: url(widths[widths.length - 1]),
    srcSet: widths.map((w) => `${url(w)} ${w}w`).join(", "),
    alt: image.alt,
    credit: image.credit,
    caption: image.caption,
  };
}

export function HomeHero() {
  const slides = images.heroSlides.map(toSlide);
  // Only the first slide is preloaded: it is the LCP image. The rest load after it (HeroSlideshow).
  preload(slides[0].src, { as: "image", fetchPriority: "high", imageSizes: HERO_SIZES, imageSrcSet: slides[0].srcSet });
  return (
    <section
      id="home"
      data-theme="dark"
      className="relative flex min-h-[min(92vh,860px)] items-center overflow-hidden bg-ink pt-[clamp(96px,12vw,132px)] text-white"
    >
      {/* No animated wrapper here: a transform animation would open a stacking context and trap the
          credit / pause control beneath the (transparent) copy container, making them unclickable. */}
      <HeroSlideshow slides={slides} sizes={HERO_SIZES} />
      {/* Scrim: on phones the copy spans the whole width, so a near-uniform tint keeps white text readable over
          bright skies; from 700px the copy sits left, so the tint eases off towards the right and lets the photo show. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(27_28_26/.82)_0%,rgb(27_28_26/.9)_100%)] tight:bg-[linear-gradient(90deg,rgb(27_28_26/.92)_0%,rgb(27_28_26/.78)_45%,rgb(27_28_26/.45)_100%)]"
      />
      <div aria-hidden className="grid-overlay-light pointer-events-none absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute top-1/2 right-[3%] w-[min(600px,37vw)] -translate-y-1/2 opacity-[.22]">
        <Image unoptimized src="/logo-mark.png" alt="" width={600} height={600} className="mx-auto block w-[74%]" />
      </div>

      <Container className="relative">
        {/* Extra bottom room on phones so the photo credit / slideshow control never sits under the GST line. */}
        <div className="max-w-[820px] pt-[clamp(28px,5vw,70px)] pb-[clamp(52px,5vw,70px)]">
          <div className="animate-up-in flex items-center gap-3" style={{ ...up("0.15s"), animationDuration: "0.8s" }}>
            <span aria-hidden className="h-px w-[38px] bg-gold" />
            <span className="eyebrow text-gold">{site.brand.tagline}</span>
          </div>

          <h1 className="mt-[22px] text-display font-bold">
            <span className="block overflow-hidden">
              <span className="animate-mask-in block" style={up("0.3s")}>
                Everything You Need
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="animate-mask-in block" style={up("0.42s")}>
                to Build <span className="text-green">Better.</span>
              </span>
            </span>
          </h1>

          <p className="animate-up-in mt-[22px] max-w-[46ch] text-[clamp(15px,1.4vw,18px)] leading-[1.55] text-on-dark" style={up("0.6s")}>
            Quality construction materials, reliable supply, and complete construction support — from one trusted partner.
          </p>
          <p className="animate-up-in mt-3.5 max-w-[52ch] text-[14.5px] leading-[1.6] text-on-dark-2" style={up("0.7s")}>
            From foundation materials to finishing essentials, {site.brand.copy} helps you source what your project needs
            across Karnataka, with complete construction execution when required.
          </p>

          <div className="animate-up-in mt-8 flex flex-wrap gap-3" style={up("0.82s")}>
            <Button href={routes.quote} variant="green" arrow>
              Get a Free Quote
            </Button>
            <Button href={routes.materials} variant="outline-dark">
              Explore Materials
            </Button>
          </div>
          <p className="animate-up-in mt-4 text-[12.5px] text-on-dark-2" style={up("0.92s")}>
            Talk to our team. We&rsquo;ll understand your requirement and prepare the right quotation.
          </p>

          <div className="animate-up-in mt-[26px] flex items-center gap-2.5 border-t border-dark-line pt-[22px]" style={up("1s")}>
            <Icon name="shield" size={15} className="text-gold" />
            <span className="font-mono text-[11px] tracking-[.14em] text-gold">GST REGISTERED • {site.gstin}</span>
          </div>
        </div>
      </Container>
    </section>
  );
}
