import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // ── Instant Image Delivery ──────────────────────────────────
  // Browser loads images directly from Unsplash/Supabase CDN without Node server processing lag
  images: {
    unoptimized: true,
  },

  // ── Security Headers ───────────────────────────────────────
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: "/(sitemap.xml|feed.xml|robots.txt)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, s-maxage=3600" },
        ],
      },
    ];
  },

  // ── Redirects ──────────────────────────────────────────────
  async redirects() {
    return [
      { source: "/admin", destination: "/admin/dashboard", permanent: false },
    ];
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
