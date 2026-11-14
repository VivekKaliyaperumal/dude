import Image from "next/image";
import { contactRows } from "@/content/contact";
import { site } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { QuoteForm } from "@/components/forms/QuoteForm";

/** `details`: show the full contact rows (address, phone, WhatsApp, service area) — Contact page. */
type Props = { tall?: boolean; details?: boolean };

/** "Looking for Construction Materials?" — copy column + quote form (Home and Contact, #quote). */
export function QuoteSection({ tall, details }: Props) {
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
          {details ? (
            <dl className="mt-[34px] border-t border-line">
              {contactRows.map((row) => (
                <div key={row.k} className="grid grid-cols-[110px_1fr] items-start gap-3.5 border-b border-line py-4">
                  <dt className="pt-[3px] font-mono text-[10.5px] tracking-[.14em] text-muted">{row.k}</dt>
                  <dd className="text-[15px] leading-[1.5] whitespace-pre-line text-ink">
                    {row.href ? (
                      <a
                        href={row.href}
                        className="hover:text-green-deep"
                        {...(row.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {row.v}
                      </a>
                    ) : (
                      row.v
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          ) : (
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
          )}
          <p className="mt-7 max-w-[60ch] text-sm leading-[1.7] text-muted">
            Prefer to speak directly? Call {site.phone.display}. We&rsquo;ll check quantity, brand preference,
            specification, site location and timeline before quoting.
          </p>
        </Reveal>

        <Reveal delay={140} className="border border-line bg-white p-panel">
          <QuoteForm tall={tall} />
        </Reveal>
      </Container>
    </section>
  );
}
