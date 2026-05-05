import Image from "next/image"
import { Container } from "@/components/atoms/Container"
import { clientData } from "../../../client-data"

/**
 * Barra de logos de marcas atendidas. Renderiza apenas se houver brands
 * configurados no client-data.
 */
export function BrandsBar() {
  if (!clientData.brands || clientData.brands.length === 0) return null

  return (
    <section className="border-y border-border bg-background py-10 md:py-14">
      <Container>
        <p className="mb-8 text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Marcas que confiam no nosso trabalho
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 opacity-60 grayscale transition-opacity hover:opacity-100 md:gap-x-16">
          {clientData.brands.map((brand, i) => {
            const content = (
              <Image
                src={brand.logo}
                alt={brand.name}
                width={120}
                height={40}
                className="h-8 w-auto object-contain md:h-10"
              />
            )

            return brand.href ? (
              <a key={i} href={brand.href} target="_blank" rel="noopener noreferrer">
                {content}
              </a>
            ) : (
              <div key={i}>{content}</div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
