import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import "./globals.css";

import { siteConfig } from "@/lib/content/site";

// Approved Stitch typography direction: Geist for headings/labels/nav/
// buttons, Inter for body copy. Both fonts are self-hosted via next/font
// (no external Google Fonts <link> tags, no layout shift).
const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  // A real OG/social share image and favicon are deferred until the
  // official logo's compact/derivative treatment is decided (Phase 4/5).
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} ${inter.variable} h-full antialiased`}>
      <body className="font-body flex min-h-full flex-col">{children}</body>
    </html>
  );
}
