import { Container } from "@/components/atoms/Container"
import { SectionTitle } from "@/components/atoms/SectionTitle"
import { DifferentialItem } from "@/components/molecules/DifferentialItem"
import { Reveal } from "@/components/atoms/Reveal"
import { clientData } from "../../../client-data"

export function DifferentialsSection() {
  if (!clientData.differentials || clientData.differentials.length === 0) return null

  return (
    <section className="section">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Por que escolher"
            title="Diferenciais que **fazem a diferença**"
            description="Escolhas técnicas e de processo que entregam resultado real para o seu negócio."
            size="lg"
          />
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {clientData.differentials.map((item, i) => (
            <Reveal key={i} delay={(((i % 4) + 1) * 100) as 100 | 200 | 300 | 400}>
              <DifferentialItem icon={item.icon} title={item.title} description={item.description} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
