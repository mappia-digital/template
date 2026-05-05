import { Container } from "@/components/atoms/Container"
import { WhatsAppButton } from "@/components/atoms/WhatsAppButton"
import { Reveal } from "@/components/atoms/Reveal"
import { clientData } from "../../../client-data"

type CTABannerProps = {
  /** Sobrescreve o conteúdo padrão do client-data.ts (uso em páginas internas) */
  title?: string
  subtitle?: string
  buttonText?: string
  buttonMessage?: string
  /** Origem do clique para tracking */
  source?: string
}

export function CTABanner({
  title,
  subtitle,
  buttonText,
  buttonMessage,
  source = "cta-banner",
}: CTABannerProps = {}) {
  const data = clientData.ctaBanner

  return (
    <section className="section">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 md:px-12 md:py-20 lg:p-20">
            <div className="absolute inset-0 bg-grid-pattern bg-[size:48px_48px] opacity-[0.06]" aria-hidden />
            <div className="absolute -bottom-32 -right-32 size-96 rounded-full bg-secondary/30 blur-3xl" aria-hidden />
            <div className="absolute -top-32 -left-32 size-96 rounded-full bg-accent/20 blur-3xl" aria-hidden />

            <div className="relative mx-auto max-w-3xl text-center">
              <h2 className="text-display-md mb-4 text-primary-foreground md:text-display-lg">
                {title ?? data.title}
              </h2>

              {(subtitle ?? data.subtitle) && (
                <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-primary-foreground/80 md:text-lg">
                  {subtitle ?? data.subtitle}
                </p>
              )}

              <WhatsAppButton
                size="lg"
                message={buttonMessage ?? data.buttonMessage}
                source={source}
              >
                {buttonText ?? data.buttonText}
              </WhatsAppButton>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
