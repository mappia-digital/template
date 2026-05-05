import type { Metadata } from "next"
import { Container } from "@/components/atoms/Container"
import { PageHeader } from "@/components/organisms/PageHeader"
import { ServiceCard } from "@/components/molecules/ServiceCard"
import { StepCard } from "@/components/molecules/StepCard"
import { SectionTitle } from "@/components/atoms/SectionTitle"
import { CTABanner } from "@/components/organisms/CTABanner"
import { Reveal } from "@/components/atoms/Reveal"
import { buildBreadcrumbSchema } from "@/lib/schema"
import { buildPageMetadata } from "@/lib/seo"
import { clientData } from "../../client-data"

export const metadata: Metadata = buildPageMetadata({
  title: "Serviços",
  description: `Conheça em detalhes todos os serviços oferecidos pela ${clientData.business.name}.`,
  path: "/servicos",
})

export default function ServicosPage() {
  const breadcrumbSchema = buildBreadcrumbSchema(clientData.seo.siteUrl, [
    { name: "Serviços", path: "/servicos" },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageHeader
        eyebrow="O que fazemos"
        title="Soluções **completas** para o seu negócio"
        description="Cada serviço é entregue com prazo definido, qualidade auditada e foco direto no resultado."
        breadcrumbs={[{ label: "Serviços" }]}
      />

      {/* Lista expandida */}
      <section className="section">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {clientData.services.map((service, i) => (
              <Reveal key={service.id} delay={(((i % 2) + 1) * 100) as 100 | 200} as="article">
                <div id={service.id} className="scroll-mt-24">
                  <ServiceCard service={service} variant="detailed" />
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Como funciona */}
      {clientData.process && clientData.process.length > 0 && (
        <section className="section bg-muted">
          <Container>
            <Reveal>
              <SectionTitle
                eyebrow="Como funciona"
                title="Do briefing ao **go-live**"
                description="Nosso processo é simples, padronizado e com prazos claros."
                size="lg"
              />
            </Reveal>

            <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              {clientData.process.map((step, i) => (
                <Reveal key={i} delay={(((i % 4) + 1) * 100) as 100 | 200 | 300 | 400}>
                  <StepCard
                    step={step.step}
                    title={step.title}
                    description={step.description}
                    isLast={i === clientData.process.length - 1}
                  />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTABanner source="servicos-cta" />
    </>
  )
}
