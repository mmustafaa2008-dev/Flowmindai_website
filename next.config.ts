import type { NextConfig } from "next";

/**
 * Baseline, low-risk security headers applied to every response.
 *
 * Deliberately does NOT include a Content-Security-Policy: this site has
 * no third-party scripts, iframes, or analytics, but a CSP strict enough
 * to be meaningful (nonce-based script-src) requires middleware wiring
 * that is out of scope for this pass and risks breaking Next.js's own
 * inline bootstrap scripts if done carelessly. These four headers are
 * safe, additive, and cannot break rendering, fonts, forms, images, or
 * the contact API — they only restrict framing/sniffing/permissions that
 * this site never uses anyway.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
