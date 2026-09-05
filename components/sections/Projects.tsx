import { Container } from "@/components/layout/Container";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/lib/content/projects";

/**
 * "Selected Work" — real, client-provided projects.
 *
 * Server Component. Content comes entirely from `projects`
 * (`lib/content/projects.ts`). As of the September 2026 portfolio
 * update these are real projects supplied directly by the client (with
 * GitHub repository links), not illustrative concepts — so the section
 * copy states that plainly without overclaiming unverified results,
 * clients, or metrics.
 *
 * Layout: five cards don't divide evenly into a 3-column grid, so this
 * uses `flex-wrap` + `justify-center` instead of CSS grid — full rows of
 * three lay out left-to-right as normal, and the trailing row of two
 * centers itself automatically instead of leaving a lopsided gap.
 *
 * No top padding: Live Demo above already ends with generous bottom
 * padding, so stacking a full section-gap here would recreate the
 * "excessive blank gap" problem addressed in earlier phases.
 */
export function Projects() {
  return (
    <section id="projects" className="relative pb-16 md:pb-20 lg:pb-24">
      <Container className="flex flex-col gap-16">
        <FadeIn>
          <SectionHeading
            eyebrow="Selected Work"
            title="AI Solutions in Action"
            description="Explore a selection of AI agents, automation systems, and intelligent applications built across development, business operations, e-commerce, and financial technology."
          />
        </FadeIn>

        <div className="gap-gutter flex flex-wrap justify-center">
          {projects.map((project) => (
            <FadeIn
              key={project.slug}
              className="w-full shrink-0 grow-0 md:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
            >
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
