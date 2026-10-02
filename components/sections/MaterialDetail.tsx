import { images } from "@/content/images";
import type { Material } from "@/content/materials";
import type { GuideCell, StorageTip } from "@/content/materials-guide";
import { routes } from "@/content/nav";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ImageWithCredit } from "@/components/ui/ImageWithCredit";
import { Reveal } from "@/components/ui/Reveal";

type Props = { material: Material; guide?: GuideCell; storage?: StorageTip };

/** Material landing page: photo, options we supply, the grade guide and the storage habit, then the quote actions. */
export function MaterialDetail({ material: m, guide, storage }: Props) {
  const image = m.imageKey ? images.materials[m.imageKey] : null;
  return (
    <section className="bg-paper py-section">
      <Container className="grid gap-[clamp(24px,4vw,56px)] nav:grid-cols-[1fr_1.1fr] nav:items-start">
        <Reveal className="relative aspect-[4/3] overflow-hidden border border-line bg-well">
          <ImageWithCredit image={image} sizes="(min-width: 1000px) 45vw, 100vw" priority />
        </Reveal>
        <Reveal delay={90}>
          <Eyebrow rule tone="bronze">
            What we supply
          </Eyebrow>
          <h2 className="mt-4 text-h2-sm font-bold text-ink">{m.name} Options.</h2>
          <p className="mt-4 max-w-[58ch] text-[15px] leading-[1.65] text-mid">{m.desc}</p>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${m.name} options`}>
            {m.variants.map((v) => (
              <li key={v}>
                <Chip variant="light">{v}</Chip>
              </li>
            ))}
          </ul>
          {guide ? (
            <div className="mt-block border border-line bg-white p-panel">
              <h3 className="label-mono text-bronze">{guide.title}</h3>
              <p className="mt-3 text-[14.5px] leading-[1.65] text-mid">{guide.body}</p>
              {storage ? (
                <>
                  <h3 className="label-mono mt-5 text-bronze">Storing on site</h3>
                  <p className="mt-3 text-[14.5px] leading-[1.65] text-mid">{storage.body}</p>
                </>
              ) : null}
            </div>
          ) : null}
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={routes.quote} arrow>
              Request Current Price
            </Button>
            <Button href={site.phone.whatsapp} variant="outline">
              Chat on WhatsApp
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
