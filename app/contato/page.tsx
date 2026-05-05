import type { Metadata } from "next"
import { PageHeader } from "@/components/organisms/PageHeader"
import { ContactSection } from "@/components/organisms/ContactSection"
import { buildBreadcrumbSchema } from "@/lib/schema"
import { buildPageMetadata } from "@/lib/seo"
import { clientData } from "../../client-data"

export const metadata: Metadata = buildPageMetadata({
  title: "Contato",
  description: `Entre em contato com a ${clientData.business.name}. WhatsApp, e-mail e localização.`,
  path: "/contato",
})

export default function ContatoPage() {
  const breadcrumbSchema = buildBreadcrumbSchema(clientData.seo.siteUrl, [
    { name: "Contato", path: "/contato" },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageHeader
        eyebrow="Estamos prontos"
        title="Vamos **conversar**?"
        description="Escolha o canal que preferir. Respondemos rápido, todos os dias úteis."
        breadcrumbs={[{ label: "Contato" }]}
      />

      <ContactSection />
    </>
  )
}
