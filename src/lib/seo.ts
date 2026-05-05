import type { Metadata } from "next"
import { clientData } from "../../client-data"

/**
 * Constrói metadata para uma página específica reutilizando os dados globais
 * de SEO do client-data.ts.
 */
export function buildPageMetadata(input: {
  title?: string
  description?: string
  path?: string
  ogImage?: string
}): Metadata {
  const title = input.title
    ? `${input.title} — ${clientData.business.name}`
    : clientData.seo.title

  const description = input.description ?? clientData.seo.description
  const url = `${clientData.seo.siteUrl}${input.path ?? "/"}`
  const ogImage = `${clientData.seo.siteUrl}${input.ogImage ?? clientData.seo.ogImage}`

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: clientData.business.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: clientData.business.name,
        },
      ],
      locale: clientData.seo.locale ?? "pt_BR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      ...(clientData.seo.twitterHandle && { creator: clientData.seo.twitterHandle }),
    },
  }
}
