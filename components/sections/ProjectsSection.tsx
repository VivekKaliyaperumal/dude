import { flags } from "@/content/flags";
import { routes } from "@/content/nav";
import { projects } from "@/content/projects";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PlaceholderNotice } from "@/components/ui/PlaceholderNotice";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectsGrid } from "./ProjectsGrid";

type Props = { variant: "home" | "page" };

/**
 * "Selected Work". On Home the section is omitted entirely while flags.projects is off.
 * On the Projects page an honest notice takes the grid's place.
 */
export function ProjectsSection({ variant }: Props) {
  if (!flags.projects && variant === "home") return null;

  const heading = (
    <div>
      <Eyebrow>Selected work</Eyebrow>
      <h2 className="mt-3.5 text-h2-sm font-bold text-ink">Projects Built With Purpose.</h2>
    </div>
  );

  return (
    <section id="projects" className="bg-paper py-section">
      <Container>
        {flags.projects ? (
          <ProjectsGrid projects={projects} heading={heading} />
        ) : (
          <>
            <Reveal>{heading}</Reveal>
            <PlaceholderNotice
              eyebrow="Project details being finalised"
              cta={{ label: "Ask us for references", href: routes.contactForm }}
              className="mt-[26px]"
            >
              Project photography and details are being finalised. Ask us for references when you enquire and we will
              share relevant work.
            </PlaceholderNotice>
          </>
        )}
      </Container>
    </section>
  );
}
