import type { MetadataRoute } from "next";

import { getSiteConfig } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  const site = getSiteConfig();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/admin/*"]
      }
    ],
    sitemap: `${site.siteUrl}/sitemap.xml`
  };
}
