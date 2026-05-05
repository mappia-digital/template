import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { Container } from "@/components/atoms/Container"
import { parseHighlights } from "@/lib/utils"

type PageHeaderProps = {
  /** Texto pequeno acima do título (eyebrow) */
  eyebrow?: string
  /** Título principal — suporta **destaque** com asteriscos */
  title: string
  description?: string
  /** Trail de breadcrumb. Padrão: Home > {última página atual} */
  breadcrumbs?: Array<{ label: string; href?: string }>
}

/**
 * Header padrão das páginas internas (Serviços, Sobre, Contato, FAQ, Privacidade).
 * Inclui breadcrumb visual — o Schema.org BreadcrumbList é gerado nas páginas.
 */
export function PageHeader({ eyebrow, title, description, breadcrumbs }: PageHeaderProps) {
  const titleParts = parseHighlights(title)

  return (
    <section className="relative overflow-hidden bg-muted pb-12 pt-32 md:pb-16 md:pt-40">
      <div className="absolute inset-0 bg-grid-pattern bg-[size:48px_48px] opacity-40" aria-hidden />
      <div className="absolute -top-40 left-1/2 size-[500px] -translate-x-1/2 rounded-full bg-secondary/10 blur-3xl" aria-hidden />

      <Container className="relative">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="flex items-center gap-1 hover:text-secondary">
                  <Home className="size-3.5" aria-hidden />
                  <span className="sr-only">Início</span>
                </Link>
              </li>
              {breadcrumbs.map((crumb, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <ChevronRight className="size-3.5 shrink-0" aria-hidden />
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-secondary">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="font-medium text-foreground">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="max-w-3xl">
          {eyebrow && (
            <span className="mb-4 inline-flex items-center rounded-full border border-secondary/20 bg-secondary-muted px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-secondary">
              {eyebrow}
            </span>
          )}

          <h1 className="text-display-lg text-foreground">
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

          {description && (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-xl">
              {description}
            </p>
          )}
        </div>
      </Container>
    </section>
  )
}
