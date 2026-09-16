import Image from "next/image";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { QuoteForm } from "@/components/forms/QuoteForm";

type Props = { tall?: boolean };

/** "Looking for Construction Materials?" — copy column + quote form (Home and Contact, #quote). */
export function QuoteSection({ tall }: Props) {
  return (
    <section id="quote" className="relative overflow-hidden bg-paper py-section text-ink">
      <div aria-hidden className="pointer-events-none absolute -bottom-[18%] -left-[6%] w-[min(560px,70vw)] opacity-[.07]">
        <Image unoptimized src="/logo-mark.png" alt="" width={560} height={560} className="block w-full" />
      </div>
      <Container className="relative grid items-start gap-[clamp(30px,5vw,100px)] split:grid-cols-[minmax(0,42fr)_minmax(0,58fr)]">
        <Reveal>
          <Eyebrow>Free quote</Eyebrow>
          <h2 className="mt-[18px] max-w-[14ch] text-[clamp(34px,4.6vw,60px)] leading-[1.04] font-bold tracking-[-.033em]">
            Looking for Construction Materials?
          </h2>
          <p className="mt-[22px] max-w-[50ch] text-[17px] leading-[1.6] text-mid">
            Tell us what you need. Our team will understand your project and provide a suitable quotation.
          </p>
          <div className="mt-[34px] flex flex-col gap-[22px] border-t border-line pt-[34px]">
            <a href={site.phone.tel} className="inline-flex items-center gap-3.5 text-[19px] font-bold tracking-[-.02em] text-ink">
              <Icon name="phone-handset" size={20} className="flex-none text-green" />
              {site.phone.display}
            </a>
            <a
              href={site.phone.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3.5 text-base text-ink"
            >
              <Icon name="whatsapp-outline" size={20} className="flex-none text-green" />
              Chat on WhatsApp
            </a>
          </div>
          <p className="mt-7 max-w-[60ch] text-sm leading-[1.7] text-muted">
            Prefer to speak directly? Call {site.phone.display}. We&rsquo;ll check quantity, brand preference,
            specification, site location and timeline before quoting.
          </p>
        </Reveal>

        <Reveal delay={140} className="border border-line bg-white p-[clamp(24px,3.2vw,46px)]">
          <QuoteForm tall={tall} />
        </Reveal>
      </Container>
    </section>
  );
}
