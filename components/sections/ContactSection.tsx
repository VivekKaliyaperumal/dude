import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactDetails } from "./ContactSummary";

/** Contact page #contact: details on the left, enquiry form on the right. */
export function ContactSection() {
  return (
    <section id="contact" className="bg-white py-section">
      <Container
        className="grid items-start gap-[clamp(30px,5vw,70px)]"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 330px), 1fr))" }}
      >
        <ContactDetails />
        <Reveal delay={120} className="border border-line bg-paper p-[clamp(24px,3.2vw,46px)]">
          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}
