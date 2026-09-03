import type { Metadata } from "next";

import { siteConfig } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name}.`,
};

/**
 * Placeholder Privacy Policy page.
 *
 * IMPORTANT: This is a structural placeholder only. No client-approved
 * legal copy has been supplied yet. Do not treat the text below as final,
 * legally reviewed content — replace it with approved copy before launch.
 */
export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-24">
      <h1 className="text-3xl font-semibold">Privacy Policy</h1>
      <p className="mt-4 text-sm text-gray-500">
        TODO: This page is a placeholder. Final, client-approved Privacy Policy content has not been
        provided yet and must be added before production launch.
      </p>
    </main>
  );
}
