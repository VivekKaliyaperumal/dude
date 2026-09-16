import { contactRows } from "@/content/contact";
import { flags } from "@/content/flags";
import { routes } from "@/content/nav";
import { site } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";

/** Contact key/values + Call / WhatsApp / Email buttons (Home and Contact). */
export function ContactDetails({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <Reveal>
      <Eyebrow>Contact</Eyebrow>
      <H className="mt-4 text-[clamp(30px,4.2vw,52px)] leading-[1.04] font-bold tracking-[-.033em] text-ink">
        Let&rsquo;s Build the Right Way.
      </H>
      <p className="mt-[30px] text-[19px] font-bold tracking-[-.02em] text-ink">{site.brand.copy}</p>
      <dl className="mt-[22px] border-t border-line">
        {contactRows.map((row) => (
          <div key={row.k} className="grid grid-cols-[110px_1fr] items-start gap-3.5 border-b border-line py-4">
            <dt className="pt-[3px] font-mono text-[10.5px] tracking-[.14em] text-muted">{row.k}</dt>
            <dd className="text-[15px] leading-[1.5] whitespace-pre-line text-ink">
              {row.href ? (
                <a href={row.href} className="hover:text-green-deep" {...(row.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                  {row.v}
                </a>
              ) : (
                row.v
              )}
            </dd>
          </div>
        ))}
      </dl>
      <div className="mt-6 flex flex-wrap gap-2.5">
        <Button href={site.phone.tel} variant="outline" size="xs">
          Call now
        </Button>
        <Button href={site.phone.whatsapp} variant="green" size="xs" className="hover:bg-ink">
          WhatsApp
        </Button>
        {flags.emailPublic ? (
          <Button href={`mailto:${site.email}`} variant="outline" size="xs">
            Email
          </Button>
        ) : null}
      </div>
    </Reveal>
  );
}

/** Home #contact: details on the left, pointer to the Contact page form on the right. */
export function ContactSummary() {
  return (
    <section id="contact" className="bg-white py-section">
      <Container
        className="grid gap-[clamp(30px,5vw,70px)]"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 330px), 1fr))" }}
      >
        <ContactDetails />
        <Reveal delay={120} className="flex flex-col justify-center gap-4 border border-line bg-paper p-[clamp(26px,3.4vw,44px)]">
          <span className="font-mono text-[10.5px] tracking-[.16em] text-muted">SEND AN ENQUIRY</span>
          <h3 className="text-[clamp(22px,2.4vw,30px)] font-bold tracking-[-.025em] text-ink">
            Tell us about your project and we will come back with the right materials and a quotation.
          </h3>
          <p className="text-[14.5px] leading-[1.6] text-muted">The enquiry form on our Contact page takes under two minutes.</p>
          <Button href={routes.contact} variant="ink" arrow className="mt-1.5 self-start px-[26px] py-4 text-sm">
            Open Enquiry Form
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
