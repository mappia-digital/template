import Link from "next/link"
import Image from "next/image"
import { Mail, MapPin, Phone, Instagram, Facebook, Linkedin, Youtube } from "lucide-react"
import { Container } from "@/components/atoms/Container"
import { formatPhoneDisplay } from "@/lib/whatsapp"
import { clientData } from "../../../client-data"

const SOCIAL_ICONS = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  youtube: Youtube,
} as const

const FOOTER_LINKS = [
  { href: "/", label: "Início" },
  { href: "/servicos", label: "Serviços" },
  { href: "/sobre", label: "Sobre" },
  { href: "/faq", label: "FAQ" },
  { href: "/contato", label: "Contato" },
  { href: "/privacidade", label: "Privacidade" },
] as const

export function Footer() {
  const currentYear = new Date().getFullYear()
  const phone = formatPhoneDisplay(clientData.contact.whatsapp)

  const socialEntries = (Object.keys(SOCIAL_ICONS) as Array<keyof typeof SOCIAL_ICONS>)
    .map((key) => ({ key, url: clientData.social[key] }))
    .filter((entry): entry is { key: keyof typeof SOCIAL_ICONS; url: string } => Boolean(entry.url))

  return (
    <footer className="border-t border-border bg-muted">
      <Container className="py-16 md:py-20">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2" aria-label={clientData.business.name}>
              <Image
                src={clientData.branding.logo.src}
                alt={clientData.branding.logo.alt}
                width={clientData.branding.logo.width}
                height={clientData.branding.logo.height}
                className="h-9 w-auto"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {clientData.business.description}
            </p>

            {socialEntries.length > 0 && (
              <div className="mt-6 flex gap-2">
                {socialEntries.map(({ key, url }) => {
                  const IconComponent = SOCIAL_ICONS[key]
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={key.charAt(0).toUpperCase() + key.slice(1)}
                      className="flex size-10 items-center justify-center rounded-xl border border-border bg-background text-foreground transition-all hover:-translate-y-0.5 hover:border-secondary hover:text-secondary"
                    >
                      <IconComponent className="size-4" aria-hidden />
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          <div className="md:col-span-3">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">Navegação</h3>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-secondary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">Contato</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-secondary" aria-hidden />
                <span>{phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-secondary" aria-hidden />
                <a href={`mailto:${clientData.contact.email}`} className="hover:text-secondary">
                  {clientData.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-secondary" aria-hidden />
                <span>{clientData.contact.address}</span>
              </li>
              <li className="pl-7 text-xs">{clientData.contact.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div>
            © {currentYear} {clientData.business.legalName ?? clientData.business.name}.
            {clientData.business.cnpj && ` CNPJ ${clientData.business.cnpj}.`} Todos os direitos
            reservados.
          </div>
          <div>
            Site desenvolvido pela{" "}
            <a
              href="https://www.mappia.digital"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-secondary"
            >
              Mappia Digital
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
