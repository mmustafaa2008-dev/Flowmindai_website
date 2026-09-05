import { Container } from "@/components/layout/Container";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/lib/content/projects";

/**
 * "Selected Work" — illustrative AI solution concepts.
 *
 * Server Component. Content comes entirely from `projects`
 * (`lib/content/projects.ts`), which intentionally marks every current
 * entry `status: "demo"` — none of these are confirmed FlowMind AI
 * client projects. The section description below states that plainly,
 * and every card carries its own status badge (see `ProjectCard`), so
 * the demonstration nature is clear without making the grid look
 * unfinished.
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
            description="Illustrative examples of the AI solutions FlowMind AI builds — not verified client case studies."
          />
        </FadeIn>

        <div className="gap-gutter grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <FadeIn key={project.slug}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
