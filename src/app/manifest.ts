import type { MetadataRoute } from "next";

/**
 * Web app manifest — icon + name when users “Add to Home Screen” / install (Chrome, Edge, etc.).
 * Apple also reads linked icons from layout metadata (`apple`, `appleWebApp`).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PixtoLearn Routines",
    short_name: "PixtoLearn",
    description:
      "Structured visual sequencing for calm, predictable daily routines.",
    start_url: "/welcome",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f4f6f4",
    theme_color: "#f4f6f4",
    icons: [
      {
        src: "/brand/pixtolearn-app-icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/brand/pixtolearn-app-icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/brand/pixtolearn-app-icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
