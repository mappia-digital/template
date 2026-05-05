import { Container } from "@/components/atoms/Container"
import { SectionTitle } from "@/components/atoms/SectionTitle"
import { TestimonialCard } from "@/components/molecules/TestimonialCard"
import { Reveal } from "@/components/atoms/Reveal"
import { clientData } from "../../../client-data"

export function TestimonialsSection() {
  if (!clientData.testimonials || clientData.testimonials.length === 0) return null

  return (
    <section className="section bg-muted">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="O que dizem"
            title="Histórias de quem **já confiou**"
            description="Casos reais de clientes que viram resultado com a Mappia."
            size="lg"
          />
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {clientData.testimonials.map((testimonial, i) => (
            <Reveal key={i} delay={(((i % 3) + 1) * 100) as 100 | 200 | 300}>
              <TestimonialCard testimonial={testimonial} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
