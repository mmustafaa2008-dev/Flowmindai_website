import type { ProcessStep } from "@/types";

/**
 * "How It Works" process timeline. Copy sourced from the approved Stitch
 * export / client blueprint.
 */
export const processSteps: ProcessStep[] = [
  {
    order: "01",
    title: "Discover",
    description: "We analyze your workflows to identify AI opportunities.",
  },
  {
    order: "02",
    title: "Design",
    description: "We architect the custom automation or agent flow.",
  },
  {
    order: "03",
    title: "Build",
    description: "Our developers integrate and train your AI solution.",
  },
  {
    order: "04",
    title: "Launch",
    description: "Rigorous testing before deploying to production.",
  },
  {
    order: "05",
    title: "Optimize",
    description: "Continuous monitoring and refinement of the system.",
  },
];
