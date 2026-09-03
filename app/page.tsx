import Image from "next/image";

import { siteConfig } from "@/lib/content/site";

/**
 * Temporary placeholder homepage.
 *
 * This intentionally does NOT implement the approved Stitch design yet.
 * Real homepage sections (Hero, Services, Why FlowMind, How It Works, Live
 * Demo, Projects, Pricing, About, Contact) are built in later phases against
 * the design system established in Phase 4. This shell only confirms the
 * app boots, routing works, and the official logo asset loads correctly.
 */
export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <Image
        src="/assets/brand/flowmind-ai-logo.png"
        alt={`${siteConfig.name} logo`}
        width={160}
        height={160}
        priority
        className="h-auto w-40"
      />
      <h1 className="text-2xl font-semibold">{siteConfig.name}</h1>
      <p className="max-w-md text-sm text-gray-500">
        Production foundation in progress. Homepage sections will be built against the approved
        design in a later phase.
      </p>
    </main>
  );
}
