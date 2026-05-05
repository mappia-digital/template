import type { MetadataRoute } from "next"
import { clientData } from "../client-data"

const ROUTES = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/servicos", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/sobre", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/contato", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/privacidade", priority: 0.3, changeFrequency: "yearly" as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return ROUTES.map((route) => ({
    url: `${clientData.seo.siteUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
