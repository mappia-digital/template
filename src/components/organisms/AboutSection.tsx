import Image from "next/image"
import { Container } from "@/components/atoms/Container"
import { SectionTitle } from "@/components/atoms/SectionTitle"
import { CTAButton } from "@/components/atoms/CTAButton"
import { Reveal } from "@/components/atoms/Reveal"
import { ArrowRight } from "lucide-react"
import { clientData } from "../../../client-data"

export function AboutSection() {
  const paragraphs = clientData.about.shortText.split("\n\n")

  return (
    <section id="sobre" className="section">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {clientData.about.image && (
            <Reveal className="relative order-2 lg:order-1">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl lg:aspect-square">
                <Image
                  src={clientData.about.image}
                  alt={`Equipe ${clientData.business.name}`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 -z-10 size-32 rounded-3xl bg-secondary md:-bottom-10 md:-right-10 md:size-48" aria-hidden />
              <div className="absolute -top-6 -left-6 -z-10 size-24 rounded-2xl bg-accent md:-top-10 md:-left-10 md:size-32" aria-hidden />
            </Reveal>
          )}

          <Reveal className="order-1 lg:order-2" delay={100}>
            <SectionTitle
              eyebrow="Sobre nós"
              title={`Conheça a **${clientData.business.name}**`}
              align="left"
              size="lg"
            />

            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="mt-8">
              <CTAButton
                href="/sobre"
                variant="outline"
                size="md"
                trailingIcon={<ArrowRight className="size-4" aria-hidden />}
              >
                Nossa história completa
              </CTAButton>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
