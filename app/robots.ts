import type { MetadataRoute } from "next"
import { clientData } from "../client-data"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${clientData.seo.siteUrl}/sitemap.xml`,
    host: clientData.seo.siteUrl,
  }
}
