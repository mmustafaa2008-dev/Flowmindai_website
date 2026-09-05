import type { Project } from "@/types";

/**
 * "Selected Work" entries.
 *
 * Client-provided portfolio update (September 2026). These five entries
 * come directly from the client as their real project portfolio — they
 * are NOT illustrative concepts/demos. Keep every field honest: no
 * fabricated metrics, clients, testimonials, screenshots, or URLs.
 *
 * `githubUrl` must only be set once the repository has actually been
 * confirmed reachable (see the note on "amazon-shopify-product-automation"
 * below for the one exception still pending client confirmation).
 */
export const projects: Project[] = [
  {
    slug: "ai-stock-trading-agent",
    title: "AI Stock Trading Agent",
    category: "AI Agent",
    description:
      "AI Stock Trading Agent is an autonomous LLM-powered trading system that combines AI-driven decision-making with code-enforced risk controls, portfolio monitoring, and automated paper-trading capabilities.",
    problem:
      "Traditional automated trading systems execute trades based on predefined strategies, while AI-based systems can introduce additional flexibility but may require strict controls. This project addresses that challenge by placing a programmatic risk-management layer around AI-generated trading decisions.",
    features: [
      "Autonomous AI-powered trading decisions",
      "OpenAI GPT integration",
      "Alpaca paper-trading integration",
      "Automated buy and sell decisions",
      "Position and portfolio monitoring",
      "Maximum single-order and portfolio concentration limits",
      "Daily loss circuit breaker and trade-count restrictions",
      "Ticker allowlist/denylist and penny-stock protection",
      "Short-selling control and emergency kill switch",
      "Persistent trading memory",
      "Market-hours awareness",
      "Local monitoring dashboard",
      "Automated guardrail testing",
    ],
    technologies: ["TypeScript", "OpenAI GPT", "Alpaca API", "Node.js", "Jest"],
    githubUrl: "https://github.com/MuhammadMehroz786/Stocks-Trading-Agent",
    repositoryAvailable: true,
  },
  {
    slug: "openclaw-multi-agent-dashboard",
    title: "OpenClaw Multi-Agent Dashboard",
    category: "Multi-Agent System",
    description:
      "OpenClaw Multi-Agent Dashboard is a centralized management interface designed to organize and monitor multiple AI agents through a structured web-based environment.",
    problem:
      "Managing multiple AI agents can become difficult when configurations and agent information are distributed across different environments. This project provides a centralized interface for organizing and monitoring agent-based systems.",
    features: [
      "Centralized AI agent dashboard",
      "Agent configuration management",
      "Web-based management interface",
      "Server-side application",
      "Structured agent data management",
      "Dashboard-based monitoring",
      "VPS deployment support",
      "JSON-based configuration",
    ],
    technologies: ["HTML", "JavaScript", "Node.js", "JSON", "npm"],
    githubUrl: "https://github.com/MuhammadMehroz786/Openclaw-MultiAgent-Dashboard",
    repositoryAvailable: true,
  },
  {
    slug: "pocketcoder",
    title: "PocketCoder",
    category: "AI Coding Assistant",
    description:
      "PocketCoder is an AI-powered remote development assistant that enables developers to create, modify, and preview software projects through natural-language commands from Telegram.",
    problem:
      "Software development typically requires developers to remain in front of their development environment to make changes, review results, and iterate on projects. PocketCoder creates a remote development workflow that allows developers to interact with their coding environment through a mobile messaging interface.",
    features: [
      "AI-powered coding assistance",
      "Telegram-based interaction",
      "Natural-language development commands",
      "Automated project creation",
      "Existing project modification",
      "Iterative development",
      "AI-generated UI development",
      "Project screenshots and previews",
      "Remote development workflow",
      "Project status monitoring",
      "Project reset and management commands",
    ],
    technologies: ["Python", "Telegram Bot API", "Claude", "Claude CLI", "macOS"],
    githubUrl: "https://github.com/MuhammadMehroz786/Pocket-Coder",
    repositoryAvailable: true,
  },
  {
    slug: "propelai-proposal-generator",
    title: "PropelAI — AI Proposal Generator",
    category: "Generative AI SaaS",
    description:
      "PropelAI is an AI-powered proposal generation platform that enables businesses to create, customize, brand, and export professional client proposals efficiently.",
    problem:
      "Creating professional business proposals manually requires significant time for writing, formatting, customization, and document preparation. PropelAI streamlines this process by combining AI-generated content with structured proposal templates and editing tools.",
    features: [
      "AI-generated proposal content",
      "OpenAI integration",
      "Professional proposal templates",
      "Rich-text proposal editor",
      "Custom branding",
      "Proposal customization",
      "PDF and DOCX export",
      "Secure user authentication",
      "Analytics dashboard",
      "Responsive user interface",
    ],
    technologies: ["Next.js 15", "React 19", "TypeScript", "PostgreSQL", "Prisma", "OpenAI GPT-4"],
    githubUrl: "https://github.com/MuhammadMehroz786/Proposal-Generator",
    repositoryAvailable: true,
  },
  {
    slug: "amazon-shopify-product-automation",
    title: "Amazon → Shopify Product Automation",
    category: "E-commerce Automation",
    description:
      "Amazon to Shopify Product Automation is an AI-powered e-commerce automation system designed to discover trending products, generate optimized product content and imagery, and streamline Shopify product listing creation.",
    problem:
      "E-commerce businesses can spend significant time researching trending products, preparing product descriptions, generating marketing content, creating product imagery, and manually publishing listings. This system automates several of these repetitive processes.",
    features: [
      "Automated Amazon product discovery",
      "Movers & Shakers product research",
      "Selection of top-performing products",
      "AI-generated product descriptions and content",
      "AI-generated product images",
      "Automated Shopify product listing",
      "Scheduled workflow execution",
      "Database-backed processing",
      "VPS deployment support",
      "Automated testing",
    ],
    technologies: ["Python", "Shopify API", "Flask", "APScheduler", "Nginx", "systemd"],
    // Client-confirmed repository URL (the originally supplied URL used a
    // Unicode em dash, which GitHub sanitized to three hyphens when the
    // repo was created; the client has now directly confirmed this exact
    // URL as correct).
    githubUrl: "https://github.com/MuhammadMehroz786/Amazon-Viral-Products---Shopify",
    repositoryAvailable: true,
  },
];
