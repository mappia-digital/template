import Image from "next/image"
import { ArrowRight, Check } from "lucide-react"
import { Container } from "@/components/atoms/Container"
import { WhatsAppButton } from "@/components/atoms/WhatsAppButton"
import { CTAButton } from "@/components/atoms/CTAButton"
import { parseHighlights } from "@/lib/utils"
import { clientData } from "../../../client-data"

export function Hero() {
  const titleParts = parseHighlights(clientData.hero.title)

  return (
    <section className="relative isolate overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src={clientData.hero.backgroundImage}
          alt=""
          fill
          priority
          quality={85}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/85 to-background/70" />
        <div className="absolute inset-0 bg-grid-pattern bg-[size:48px_48px] opacity-40" />
      </div>

      {/* Soft gradient blobs */}
      <div className="absolute -top-24 -right-24 -z-10 size-96 rounded-full bg-secondary/10 blur-3xl" aria-hidden />
      <div className="absolute -bottom-24 -left-24 -z-10 size-96 rounded-full bg-accent/10 blur-3xl" aria-hidden />

      <Container>
        <div className="mx-auto max-w-4xl text-center">
          {clientData.business.tagline && (
            <span className="mb-6 inline-flex items-center rounded-full border border-secondary/20 bg-secondary-muted px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-secondary md:text-sm">
              {clientData.business.tagline}
            </span>
          )}

          <h1 className="text-display-xl mb-6 text-foreground">
            {titleParts.map((part, i) =>
              part.highlight ? (
                <span key={i} className="text-gradient">
                  {part.text}
                </span>
              ) : (
                <span key={i}>{part.text}</span>
              ),
            )}
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-xl">
            {clientData.hero.subtitle}
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <WhatsAppButton size="lg" message={clientData.hero.ctaMessage} source="hero">
              {clientData.hero.ctaText}
            </WhatsAppButton>

            {clientData.hero.secondaryCtaText && clientData.hero.secondaryCtaHref && (
              <CTAButton
                href={clientData.hero.secondaryCtaHref}
                variant="outline"
                size="lg"
                trailingIcon={<ArrowRight className="size-4" aria-hidden />}
              >
                {clientData.hero.secondaryCtaText}
              </CTAButton>
            )}
          </div>

          {clientData.hero.trustBadges && clientData.hero.trustBadges.length > 0 && (
            <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              {clientData.hero.trustBadges.map((badge, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="size-4 text-accent" strokeWidth={3} aria-hidden />
                  {badge}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </section>
  )
}
