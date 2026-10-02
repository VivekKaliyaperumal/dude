import Link from "next/link";
import { images } from "@/content/images";
import type { Material } from "@/content/materials";
import { materialHref, routes } from "@/content/nav";
import { Chip } from "@/components/ui/Chip";
import { ImageWithCredit } from "@/components/ui/ImageWithCredit";
import { Reveal } from "@/components/ui/Reveal";

type Props = { material: Material; delay?: number };

export function MaterialCard({ material: m, delay = 0 }: Props) {
  const image = m.imageKey ? images.materials[m.imageKey] : null;
  return (
    <Reveal
      as="article"
      delay={delay}
      className="group flex flex-col border border-line bg-white transition-[transform,box-shadow,border-color] duration-500 ease-out-expo hover:-translate-y-1.5 hover:border-line-3 hover:shadow-card-hover motion-reduce:transition-none"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-well">
        <div className="absolute inset-0 transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.04] motion-reduce:transition-none">
          <ImageWithCredit image={image} sizes="(min-width: 1000px) 33vw, (min-width: 700px) 50vw, 100vw" />
        </div>
        <span className="pointer-events-none absolute top-0 left-0 bg-ink px-2.5 py-1.5 font-mono text-[10.5px] tracking-[.14em] text-white">
          {m.n}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 pb-[22px]">
        <h3 className="text-[19px] font-bold tracking-[-.02em] text-ink">
          {m.slug ? (
            <Link href={materialHref(m.slug)} className="underline decoration-line-2 underline-offset-4 transition-colors hover:text-green-deep hover:decoration-green">
              {m.name}
            </Link>
          ) : (
            m.name
          )}
        </h3>
        <p className="mt-2.5 text-[13.5px] leading-[1.55] text-muted">{m.desc}</p>
        <ul className="mt-3.5 flex flex-wrap gap-1.5" aria-label={`${m.name} options`}>
          {m.variants.map((v) => (
            <li key={v}>
              <Chip variant="mono">{v}</Chip>
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-[18px]">
          <span aria-hidden className="relative mb-3.5 block h-px bg-line">
            <span className="absolute inset-0 origin-left scale-x-0 bg-green transition-transform duration-[600ms] ease-out-expo group-hover:scale-x-100 motion-reduce:transition-none" />
          </span>
          <Link
            href={routes.quote}
            className="flex items-center justify-between text-[13px] font-semibold text-ink transition-colors group-hover:text-green-deep"
          >
            <span>Request Current Price</span>
            <span aria-hidden className="font-mono transition-transform duration-[400ms] ease-out-expo group-hover:translate-x-[5px] motion-reduce:transition-none">
              &rarr;
            </span>
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
