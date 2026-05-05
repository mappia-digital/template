import { ArrowLeft } from "lucide-react"
import { Container } from "@/components/atoms/Container"
import { CTAButton } from "@/components/atoms/CTAButton"
import { WhatsAppButton } from "@/components/atoms/WhatsAppButton"
import { clientData } from "../client-data"

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[80vh] items-center overflow-hidden pt-24">
      <div className="absolute inset-0 -z-10 bg-grid-pattern bg-[size:48px_48px] opacity-40" aria-hidden />
      <div className="absolute -top-40 left-1/2 -z-10 size-[500px] -translate-x-1/2 rounded-full bg-secondary/10 blur-3xl" aria-hidden />

      <Container size="md">
        <div className="text-center">
          <p className="mb-4 inline-flex items-center rounded-full border border-secondary/20 bg-secondary-muted px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-secondary">
            Erro 404
          </p>

          <h1 className="text-display-xl mb-6 text-foreground">
            <span className="text-gradient">Página não encontrada</span>
          </h1>

          <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            O link que você acessou pode ter sido movido ou não existe mais. Mas estamos aqui — fale
            com a gente pelo WhatsApp ou volte para a página inicial.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CTAButton
              href="/"
              variant="outline"
              size="lg"
              leadingIcon={<ArrowLeft className="size-4" aria-hidden />}
            >
              Voltar para o início
            </CTAButton>

            <WhatsAppButton
              size="lg"
              source="404"
              message={`Olá! Cheguei numa página que não existe mais no site da ${clientData.business.name}. Pode me ajudar?`}
            >
              Falar no WhatsApp
            </WhatsAppButton>
          </div>
        </div>
      </Container>
    </section>
  )
}
