import { Bot, Workflow, MessageCircle, Globe } from "lucide-react";

import type { Service } from "@/types";

/**
 * The four core FlowMind AI service offerings shown in the "What We Build"
 * section. Copy is sourced from the approved Stitch export / client
 * blueprint — do not invent additional use cases here.
 */
export const services: Service[] = [
  {
    slug: "ai-agents",
    title: "AI Agents",
    description:
      "Conversational agents designed to handle customer interactions, qualification, appointments and follow-ups.",
    icon: Bot,
    useCases: ["Inbound Support", "Outbound Sales", "Appointment Setting"],
  },
  {
    slug: "ai-automations",
    title: "AI Automations",
    description: "Custom workflows that connect your apps and eliminate manual tasks.",
    icon: Workflow,
    useCases: ["Zapier/Make Config", "Data Entry Automation", "CRM Synchronization"],
  },
  {
    slug: "ai-chatbots",
    title: "AI Chatbots",
    description: "Intelligent text-based assistants trained on your specific business data.",
    icon: MessageCircle,
    useCases: ["Website Lead Gen", "Customer FAQ", "E-commerce Support"],
  },
  {
    slug: "ai-websites",
    title: "AI Websites",
    description:
      "Conversion-focused websites with intelligent features, clear messaging and streamlined user experiences.",
    icon: Globe,
    useCases: ["Rapid Deployment", "SEO Optimized", "Conversion Focused"],
  },
];
