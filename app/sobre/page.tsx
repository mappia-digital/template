import type { Metadata } from "next"
import Image from "next/image"
import { Container } from "@/components/atoms/Container"
import { PageHeader } from "@/components/organisms/PageHeader"
import { SectionTitle } from "@/components/atoms/SectionTitle"
import { ValueItem } from "@/components/molecules/ValueItem"
import { CTABanner } from "@/components/organisms/CTABanner"
import { Reveal } from "@/components/atoms/Reveal"
import { buildBreadcrumbSchema } from "@/lib/schema"
import { buildPageMetadata } from "@/lib/seo"
import { clientData } from "../../client-data"

export const metadata: Metadata = buildPageMetadata({
  title: "Sobre nós",
  description: `Conheça a história, missão e valores da ${clientData.business.name}.`,
  path: "/sobre",
})

export default function SobrePage() {
  const breadcrumbSchema = buildBreadcrumbSchema(clientData.seo.siteUrl, [
    { name: "Sobre", path: "/sobre" },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageHeader
        eyebrow="Quem somos"
        title={`A história da **${clientData.business.name}**`}
        description={clientData.business.description}
        breadcrumbs={[{ label: "Sobre" }]}
      />

      {/* História */}
      <section className="section">
        <Container size="md">
          <Reveal>
            <SectionTitle eyebrow="Nossa história" title="**Como** chegamos até aqui" align="left" size="md" />
            <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
              {clientData.about.history}
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Missão e Valores */}
      <section className="section bg-muted">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <SectionTitle eyebrow="Missão" title="Nosso **propósito**" align="left" size="md" />
              <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
                {clientData.about.mission}
              </p>
            </Reveal>

            <Reveal className="lg:col-span-7" delay={100}>
              <h3 className="mb-6 text-sm font-bold uppercase tracking-wider text-secondary">
                Valores
              </h3>
              <div className="space-y-6">
                {clientData.about.values.map((value, i) => (
                  <ValueItem key={i} title={value.title} description={value.description} />
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Equipe */}
      {clientData.about.team && clientData.about.team.length > 0 && (
        <section className="section">
          <Container>
            <Reveal>
              <SectionTitle
                eyebrow="Quem faz acontecer"
                title="Conheça nossa **equipe**"
                description="Pessoas dedicadas a entregar resultado real para cada projeto."
                size="lg"
              />
            </Reveal>

            <div className="mt-14 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {clientData.about.team.map((member, i) => (
                <Reveal key={i} delay={(((i % 4) + 1) * 100) as 100 | 200 | 300 | 400}>
                  <article className="text-center">
                    <div className="relative mx-auto aspect-square size-32 overflow-hidden rounded-full md:size-40">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 8rem, 10rem"
                        className="object-cover"
                      />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-foreground">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTABanner source="sobre-cta" />
    </>
  )
}
