import { Container } from "@/components/atoms/Container"
import { SectionTitle } from "@/components/atoms/SectionTitle"
import { FAQItem } from "@/components/molecules/FAQItem"
import { CTAButton } from "@/components/atoms/CTAButton"
import { Reveal } from "@/components/atoms/Reveal"
import { ArrowRight } from "lucide-react"
import { clientData } from "../../../client-data"

type FAQSectionProps = {
  /** Mostrar todas as perguntas. Padrão: 4 (versão resumida da Home). */
  showAll?: boolean
  /** Esconder o botão "ver todas as perguntas" */
  hideCTA?: boolean
}

export function FAQSection({ showAll = false, hideCTA = false }: FAQSectionProps = {}) {
  if (!clientData.faq || clientData.faq.length === 0) return null

  const items = showAll ? clientData.faq : clientData.faq.slice(0, 4)

  return (
    <section id="faq" className="section">
      <Container size="md">
        <Reveal>
          <SectionTitle
            eyebrow="Perguntas frequentes"
            title="Tire suas **dúvidas**"
            description="Respostas diretas para as perguntas que mais recebemos."
            size="lg"
          />
        </Reveal>

        <Reveal delay={100} className="mt-14">
          <div className="card-base px-6 md:px-10">
            {items.map((item, i) => (
              <FAQItem key={i} question={item.question} answer={item.answer} />
            ))}
          </div>
        </Reveal>

        {!hideCTA && !showAll && clientData.faq.length > 4 && (
          <div className="mt-10 flex justify-center">
            <CTAButton
              href="/faq"
              variant="outline"
              size="md"
              trailingIcon={<ArrowRight className="size-4" aria-hidden />}
            >
              Ver todas as perguntas
            </CTAButton>
          </div>
        )}
      </Container>
    </section>
  )
}
