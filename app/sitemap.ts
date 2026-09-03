import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/content/site";

/**
 * App Router sitemap. Reads from the centralized site URL so it
 * automatically works on the free Vercel domain and requires no change
 * when a custom domain is connected later.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/privacy", "/terms"];

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
  }));
}
