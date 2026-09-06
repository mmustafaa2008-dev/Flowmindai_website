import { Briefcase, Plug, Clock, TrendingUp } from "lucide-react";

import type { Benefit } from "@/types";

/**
 * "Why FlowMind AI" value propositions. Copy sourced from the approved
 * Stitch export / client blueprint.
 */
export const benefits: Benefit[] = [
  {
    title: "Business-Focused Solutions",
    description:
      "We don't just build cool tech; we build tools that solve your specific operational bottlenecks and support scalable operations.",
    icon: Briefcase,
  },
  {
    title: "Custom Integrations",
    description:
      "Our solutions seamlessly connect with your existing CRM, calendar, and software stack so you don't have to change how you work.",
    icon: Plug,
  },
  {
    title: "Save Time",
    description:
      "Automate repetitive tasks, data entry, and initial customer inquiries to free up your team for high-value work.",
    icon: Clock,
  },
  {
    title: "Built to Scale",
    description:
      "As your business grows, our systems handle increased volume, supporting your expanding operations reliably.",
    icon: TrendingUp,
  },
];
