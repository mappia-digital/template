import { Container } from "@/components/atoms/Container"
import { StatCounter } from "@/components/molecules/StatCounter"
import { clientData } from "../../../client-data"

/**
 * Seção 3.5 — Contador de Credibilidade.
 * REGRA: só renderiza se houver pelo menos 1 stat preenchido no client-data.
 * Nunca exibir zeros falsos.
 */
export function StatsSection() {
  if (!clientData.stats || clientData.stats.length === 0) return null

  return (
    <section className="relative overflow-hidden bg-primary py-16 md:py-20">
      <div className="absolute inset-0 bg-grid-pattern bg-[size:48px_48px] opacity-[0.04]" aria-hidden />
      <div className="absolute -top-40 left-1/2 size-96 -translate-x-1/2 rounded-full bg-secondary/20 blur-3xl" aria-hidden />

      <Container className="relative">
        <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4 md:gap-x-8">
          {clientData.stats.map((stat, i) => (
            <StatCounter key={i} value={stat.value} label={stat.label} variant="dark" />
          ))}
        </div>
      </Container>
    </section>
  )
}
