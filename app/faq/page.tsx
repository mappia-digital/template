import type { Metadata } from "next"
import { PageHeader } from "@/components/organisms/PageHeader"
import { FAQSection } from "@/components/organisms/FAQSection"
import { CTABanner } from "@/components/organisms/CTABanner"
import { buildBreadcrumbSchema, buildFAQSchema } from "@/lib/schema"
import { buildPageMetadata } from "@/lib/seo"
import { clientData } from "../../client-data"

export const metadata: Metadata = buildPageMetadata({
  title: "Perguntas Frequentes",
  description: `Tire suas dúvidas sobre os serviços da ${clientData.business.name}.`,
  path: "/faq",
})

export default function FAQPage() {
  const breadcrumbSchema = buildBreadcrumbSchema(clientData.seo.siteUrl, [
    { name: "FAQ", path: "/faq" },
  ])
  const faqSchema = buildFAQSchema(clientData.faq)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHeader
        eyebrow="Perguntas frequentes"
        title="Tire suas **dúvidas**"
        description="As respostas para as perguntas que mais recebemos. Se sua dúvida não estiver aqui, fale com a gente no WhatsApp."
        breadcrumbs={[{ label: "FAQ" }]}
      />

      <FAQSection showAll hideCTA />

      <CTABanner source="faq-cta" />
    </>
  )
}
