import { Container } from "@/components/atoms/Container"
import { SectionTitle } from "@/components/atoms/SectionTitle"
import { ServiceCard } from "@/components/molecules/ServiceCard"
import { Reveal } from "@/components/atoms/Reveal"
import { clientData } from "../../../client-data"

export function ServicesSection() {
  // Limita a 6 cards na home (regra do dev.txt)
  const services = clientData.services.slice(0, 6)

  return (
    <section id="servicos" className="section bg-muted">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Nossos serviços"
            title="O que entregamos para o seu **negócio**"
            description="Soluções padronizadas e prontas para escalar sua presença digital com prazo curto e qualidade técnica."
            size="lg"
          />
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={(((i % 3) + 1) * 100) as 100 | 200 | 300}>
              <ServiceCard service={service} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
