import type { Project } from "@/types";

/**
 * "Selected Work" entries.
 *
 * IMPORTANT: these three entries originate from the Stitch design export as
 * illustrative concepts, not confirmed FlowMind AI client projects. They are
 * intentionally marked `status: "demo"` so the UI (built in a later phase)
 * can label them as demonstration concepts rather than implying they are
 * completed, verified client work. Do not add a `href` or change the status
 * to "verified" without explicit client confirmation of a real project and
 * a real URL.
 */
export const projects: Project[] = [
  {
    slug: "dental-practice-booking-agent",
    category: "AI Agent",
    title: "Dental Practice Booking Agent",
    problem: "High volume of missed calls during peak hours leading to lost bookings.",
    solution:
      "Custom voice agent handling inbound calls, qualifying new patients, and syncing with practice management software.",
    features: ["24/7 Call Handling", "Direct Calendar Integration", "FAQ Resolution"],
    status: "demo",
  },
  {
    slug: "ecommerce-fulfillment-sync",
    category: "Automation",
    title: "E-commerce Fulfillment Sync",
    problem:
      "Manual data entry between Shopify, inventory systems, and shipping providers causing delays.",
    solution:
      "Multi-step Make.com automation routing orders, updating inventory in real-time, and generating labels.",
    features: ["Real-time Inventory Sync", "Automated Labeling", "Error Handling & Alerts"],
    status: "demo",
  },
  {
    slug: "real-estate-lead-qualifier",
    category: "AI Chatbot",
    title: "Real Estate Lead Qualifier",
    problem:
      "Agents spending too much time answering basic property questions from unqualified leads.",
    solution:
      "Intelligent website chatbot trained on property listings to answer queries and capture qualified lead info.",
    features: ["Listing Data Integration", "Lead Scoring", "CRM Handoff"],
    status: "demo",
  },
];
