import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // ── Unsplash (placeholder / editorial images) ──────────────────────────
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      // ── Your own CDN / storage — add when ready ────────────────────────────
      // {
      //   protocol: "https",
      //   hostname: "cdn.idwe.tech",
      //   pathname: "/**",
      // },
      // ── Supabase storage — uncomment if you use Supabase ──────────────────
      // {
      //   protocol: "https",
      //   hostname: "*.supabase.co",
      //   pathname: "/storage/v1/object/public/**",
      // },
    ],
  },
};

export default withNextIntl(nextConfig);