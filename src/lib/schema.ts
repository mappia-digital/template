/**
 * Geração de JSON-LD (Schema.org) para SEO estruturado.
 * Os schemas são lidos pelo Google e habilitam rich results
 * (estrelas, FAQ expansível, breadcrumbs).
 */

import type { ClientData } from "../../client-data"

const DAY_MAP: Record<string, string> = {
  Mo: "Monday",
  Tu: "Tuesday",
  We: "Wednesday",
  Th: "Thursday",
  Fr: "Friday",
  Sa: "Saturday",
  Su: "Sunday",
}

/**
 * Schema LocalBusiness — para todas as páginas.
 * Habilita aparição no Google Maps e em buscas locais.
 */
export function buildLocalBusinessSchema(data: ClientData) {
  const openingHoursSpec = data.contact.openingHours?.map((slot) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: slot.days.map((d) => DAY_MAP[d]),
    opens: slot.opens,
    closes: slot.closes,
  }))

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${data.seo.siteUrl}#business`,
    name: data.business.name,
    legalName: data.business.legalName,
    description: data.business.description,
    image: `${data.seo.siteUrl}${data.seo.ogImage}`,
    url: data.seo.siteUrl,
    telephone: `+${data.contact.whatsapp}`,
    email: data.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: data.contact.address,
      addressCountry: "BR",
    },
    ...(data.contact.geo && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: data.contact.geo.latitude,
        longitude: data.contact.geo.longitude,
      },
    }),
    ...(openingHoursSpec && { openingHoursSpecification: openingHoursSpec }),
    sameAs: [
      data.social.instagram,
      data.social.facebook,
      data.social.linkedin,
      data.social.youtube,
    ].filter(Boolean) as string[],
    ...(data.testimonials.length > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: averageRating(data.testimonials),
        reviewCount: data.testimonials.length,
      },
    }),
  }
}

/**
 * Schema FAQPage — habilita perguntas frequentes expansíveis no Google.
 */
export function buildFAQSchema(faq: ClientData["faq"]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

/**
 * Schema BreadcrumbList — para páginas internas (Serviços, Sobre, FAQ, Contato).
 */
export function buildBreadcrumbSchema(
  siteUrl: string,
  trail: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  }
}

/**
 * Schema Organization — alternativa ao LocalBusiness para empresas sem endereço físico.
 */
export function buildOrganizationSchema(data: ClientData) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: data.business.name,
    legalName: data.business.legalName,
    url: data.seo.siteUrl,
    logo: `${data.seo.siteUrl}${data.branding.logo.src}`,
    description: data.business.description,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+${data.contact.whatsapp}`,
      email: data.contact.email,
      contactType: "customer service",
      availableLanguage: ["Portuguese"],
    },
  }
}

function averageRating(testimonials: ClientData["testimonials"]): string {
  if (testimonials.length === 0) return "0"
  const sum = testimonials.reduce((acc, t) => acc + t.rating, 0)
  return (sum / testimonials.length).toFixed(1)
}
