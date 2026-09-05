import {
  Bot,
  CheckCircle2,
  ExternalLink,
  Network,
  ShoppingCart,
  Sparkles,
  Terminal,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

/** Category → icon, reusing the same icon language as the Services grid. */
const categoryIcons: Record<string, LucideIcon> = {
  "AI Agent": Bot,
  "Multi-Agent System": Network,
  "AI Coding Assistant": Terminal,
  "Generative AI SaaS": Sparkles,
  "E-commerce Automation": ShoppingCart,
};

/** Card content is intentionally concise — full detail lives in `lib/content/projects.ts` for a future project-detail page. */
const MAX_CARD_FEATURES = 5;
const MAX_CARD_TECHNOLOGIES = 5;

interface ProjectCardProps {
  project: Project;
}

/**
 * A single "Selected Work" card.
 *
 * These are real, client-provided projects (September 2026 portfolio
 * update) — not demos — so no "Concept Demo"/"Coming Soon" status badge
 * is shown. The badge is simply the project's category. The GitHub CTA
 * is a real link only when `project.repositoryAvailable` is true; when a
 * repository URL couldn't be confirmed (see the Amazon→Shopify entry),
 * it renders as a real disabled `<button>` instead of guessing a URL.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const CategoryIcon = categoryIcons[project.category] ?? Bot;
  const canLinkToGithub = project.repositoryAvailable && Boolean(project.githubUrl);

  return (
    <GlassCard className="group flex flex-col gap-4 p-8">
      <span className="text-primary flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
        <CategoryIcon aria-hidden="true" className="h-4 w-4" />
        {project.category}
      </span>

      <h3 className="font-heading text-headline-md text-foreground">{project.title}</h3>

      <div className="flex flex-1 flex-col gap-4">
        <p className="font-body text-text-secondary text-sm">{project.description}</p>

        <ul className="flex flex-wrap gap-2">
          {project.technologies.slice(0, MAX_CARD_TECHNOLOGIES).map((tech) => (
            <li
              key={tech}
              className="border-border text-text-secondary rounded-full border px-2.5 py-1 text-xs font-medium"
            >
              {tech}
            </li>
          ))}
        </ul>

        <ul className="flex flex-col gap-2 pt-1">
          {project.features.slice(0, MAX_CARD_FEATURES).map((feature) => (
            <li key={feature} className="text-text-secondary flex items-center gap-2 text-xs">
              <CheckCircle2 aria-hidden="true" className="text-primary h-3.5 w-3.5 shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {canLinkToGithub ? (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="border-border-strong text-foreground font-heading text-label-md mt-auto flex w-full items-center justify-center gap-2 rounded-md border py-3 transition-colors hover:bg-white/5"
        >
          View on GitHub
          <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ) : (
        <button
          type="button"
          disabled
          className={cn(
            "border-border bg-surface-elevated text-text-secondary font-heading text-label-md mt-auto flex w-full items-center justify-center rounded-md border py-3",
            "disabled:cursor-not-allowed disabled:opacity-100",
          )}
        >
          Repository Link Pending
        </button>
      )}
    </GlassCard>
  );
}
