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

const titleDefault = `${siteConfig.name} | AI Agents, Automations, Chatbots & Websites`;
const socialImage = {
  url: "/assets/brand/flowmind-ai-og.png",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} — AI Solutions That Automate, Convert & Scale Your Business.`,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: titleDefault,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "FlowMind AI",
    "AI agents",
    "AI automation",
    "AI chatbots",
    "AI websites",
    "business process automation",
    "AI solutions agency",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: titleDefault,
    description: siteConfig.description,
    url: "/",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: titleDefault,
    description: siteConfig.description,
    images: [socialImage.url],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geist.variable} ${inter.variable} h-full antialiased`}>
      <body className="font-body flex min-h-full flex-col">{children}</body>
    </html>
  );
}
