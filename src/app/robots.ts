import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

// Public pages can be crawled; the signed-in app, billing and APIs cannot.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/study", "/profiles", "/billing", "/api", "/leave"],
    },
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
