import { Bot, CheckCircle2, Globe, MessageCircle, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { GlassCard } from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";
import type { Project, ProjectStatus } from "@/types";

/** Category → icon, reusing the same icon language as the Services grid. */
const categoryIcons: Record<string, LucideIcon> = {
  "AI Agent": Bot,
  Automation: Workflow,
  "AI Chatbot": MessageCircle,
  "AI Website": Globe,
};

/**
 * Honest, polished status labels — never "Client Project" unless a
 * project's status is actually "verified". This is the single place that
 * maps `ProjectStatus` to display copy, so promoting a project later only
 * requires changing its `status` in `lib/content/projects.ts`.
 */
const statusLabels: Record<ProjectStatus, string> = {
  demo: "Concept Demo",
  comingSoon: "Coming Soon",
  verified: "Client Project",
};

interface ProjectCardProps {
  project: Project;
}

/**
 * A single "Selected Work" card.
 *
 * Reproduces the approved Stitch card (category tag, title, problem,
 * solution, feature list) plus an explicit status badge so the
 * demo/example nature is always clear without making the card look
 * unfinished. Stitch's card CTA ("View Project" / "View Demo") has no
 * valid destination yet — no verified public project URLs exist — so it
 * is rendered as a real disabled `<button>` reading "Coming Soon" rather
 * than a dead `href="#"` link. Once `project.status` becomes "verified"
 * and `project.href` is set, this component only needs that one
 * conditional to switch to a real link — no rewrite required.
 */
export function ProjectCard({ project }: ProjectCardProps) {
  const CategoryIcon = categoryIcons[project.category] ?? Bot;
  const isVerified = project.status === "verified" && project.href;

  return (
    <GlassCard className="group flex flex-col gap-4 p-8">
      <div className="flex items-center justify-between gap-3">
        <span className="text-primary flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
          <CategoryIcon aria-hidden="true" className="h-4 w-4" />
          {project.category}
        </span>
        <span className="border-border text-text-secondary rounded-full border px-3 py-1 text-xs font-medium">
          {statusLabels[project.status]}
        </span>
      </div>

      <h3 className="font-heading text-headline-md text-foreground">{project.title}</h3>

      <div className="flex flex-1 flex-col gap-3">
        <p className="font-body text-text-secondary text-sm">
          <span className="text-foreground font-semibold">Problem: </span>
          {project.problem}
        </p>
        <p className="font-body text-text-secondary text-sm">
          <span className="text-foreground font-semibold">Solution: </span>
          {project.solution}
        </p>

        <ul className="flex flex-col gap-2 pt-1">
          {project.features.map((feature) => (
            <li key={feature} className="text-text-secondary flex items-center gap-2 text-xs">
              <CheckCircle2 aria-hidden="true" className="text-primary h-3.5 w-3.5 shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {isVerified ? (
        <a
          href={project.href}
          className="border-border-strong text-foreground font-heading text-label-md mt-auto flex w-full items-center justify-center rounded-md border py-3 transition-colors hover:bg-white/5"
        >
          View Project
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
          Coming Soon
        </button>
      )}
    </GlassCard>
  );
}
