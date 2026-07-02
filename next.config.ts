import { spawnSync } from "node:child_process";
import crypto from "node:crypto";
import withSerwistInit from "@serwist/next";
import type { NextConfig } from "next";

function buildRevision(): string {
  try {
    const rev = spawnSync("git", ["rev-parse", "HEAD"], {
      encoding: "utf-8",
    }).stdout?.trim();
    if (rev) return rev;
  } catch {
    /* not a git repo or git unavailable */
  }
  return crypto.randomUUID();
}

const revision = buildRevision();

const withSerwist = withSerwistInit({
  swSrc: "src/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
  cacheOnNavigation: true,
  reloadOnOnline: false,
  additionalPrecacheEntries: [
    { url: "/welcome", revision },
    { url: "/dashboard", revision },
    { url: "/player", revision },
    { url: "/~offline", revision },
  ],
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default withSerwist(nextConfig);
