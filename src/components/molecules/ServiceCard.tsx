import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Icon } from "@/components/atoms/Icon"
import { buildWhatsAppUrl } from "@/lib/whatsapp"
import { clientData } from "../../../client-data"
import { cn } from "@/lib/utils"

type ServiceCardProps = {
  service: typeof clientData.services[number]
  /** Variante visual */
  variant?: "default" | "detailed"
  className?: string
}

export function ServiceCard({ service, variant = "default", className }: ServiceCardProps) {
  const whatsappUrl = buildWhatsAppUrl(
    clientData.contact.whatsapp,
    service.ctaMessage,
    { source: `service-${service.id}` },
  )

  if (variant === "detailed") {
    return (
      <article
        className={cn(
          "card-base card-hover group flex flex-col p-8 md:p-10",
          className,
        )}
      >
        <div className="mb-6 inline-flex size-14 items-center justify-center rounded-2xl bg-secondary-muted text-secondary transition-transform duration-300 group-hover:scale-110">
          <Icon name={service.icon} className="size-7" />
        </div>

        <h3 className="mb-3 text-2xl font-bold text-foreground">{service.title}</h3>

        <p className="mb-4 text-base leading-relaxed text-muted-foreground">
          {service.fullDescription ?? service.description}
        </p>

        {service.benefits && service.benefits.length > 0 && (
          <ul className="mb-6 space-y-2">
            {service.benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-accent" />
                {benefit}
              </li>
            ))}
          </ul>
        )}

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-source={`service-${service.id}`}
          className="mt-auto inline-flex items-center gap-2 self-start font-semibold text-primary transition-colors hover:text-secondary"
        >
          Quero esse serviço
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </a>
      </article>
    )
  }

  return (
    <Link
      href={`/servicos#${service.id}`}
      className={cn(
        "card-base card-hover group relative flex flex-col p-6 md:p-8",
        className,
      )}
    >
      <div className="mb-5 inline-flex size-12 items-center justify-center rounded-xl bg-secondary-muted text-secondary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
        <Icon name={service.icon} className="size-6" />
      </div>

      <h3 className="mb-2 text-lg font-bold text-foreground md:text-xl">{service.title}</h3>

      <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">
        {service.description}
      </p>

      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary transition-all">
        Saiba mais
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
      </span>
    </Link>
  )
}
