import { flags } from "@/content/flags";
import type { LegalDocument } from "@/content/legal";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Legal clause list. While flags.legalBodies is off (no approved wording yet), each clause
 * shows its heading with an honest "Content to confirm." note and no invented text.
 */
export function LegalClauses({ doc }: { doc: LegalDocument }) {
  const showBodies = flags.legalBodies;
  return (
    <section className="bg-paper py-section">
      <Container className="max-w-[900px]">
        <Reveal as="p" className="text-base leading-[1.7] text-mid">
          {showBodies
            ? `This page sets out how ${doc.title.toLowerCase()} applies when you use this website or send us an enquiry.`
            : "The approved wording for this page is being finalised. The headings below show what it will cover. Until then, please call or WhatsApp us with any question about how we handle your information or enquiries."}
        </Reveal>
        <ol className="mt-[clamp(28px,4vw,48px)] flex flex-col gap-4">
          {doc.clauses.map((c, i) => (
            <Reveal as="li" key={c.n} delay={(i % 3) * 80} className="border border-line bg-white p-[clamp(22px,3vw,36px)]">
              <span className="font-mono text-[11px] tracking-[.14em] text-bronze">{c.n}</span>
              <h2 className="mt-2.5 text-[20px] font-bold tracking-[-.02em] text-ink">{c.heading}</h2>
              {showBodies && c.body ? (
                <p className="mt-3 text-[15px] leading-[1.7] text-mid whitespace-pre-line">{c.body}</p>
              ) : (
                <p className="mt-3 font-mono text-[11px] tracking-[.12em] text-muted uppercase">Content to confirm.</p>
              )}
            </Reveal>
          ))}
        </ol>
        <Reveal as="p" className="mt-8 font-mono text-[11px] tracking-[.16em] text-muted uppercase">
          Last updated &mdash; {showBodies && doc.lastUpdated ? doc.lastUpdated : "to confirm"}
        </Reveal>
      </Container>
    </section>
  );
}
