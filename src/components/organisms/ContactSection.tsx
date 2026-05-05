import { Mail, MapPin, Phone, Clock } from "lucide-react"
import { Container } from "@/components/atoms/Container"
import { SectionTitle } from "@/components/atoms/SectionTitle"
import { WhatsAppButton } from "@/components/atoms/WhatsAppButton"
import { GoogleMapEmbed } from "./GoogleMapEmbed"
import { Reveal } from "@/components/atoms/Reveal"
import { formatPhoneDisplay } from "@/lib/whatsapp"
import { clientData } from "../../../client-data"

export function ContactSection() {
  const phone = formatPhoneDisplay(clientData.contact.whatsapp)

  return (
    <section id="contato" className="section bg-muted">
      <Container>
        <Reveal>
          <SectionTitle
            eyebrow="Fale conosco"
            title="Vamos **conversar**"
            description="Estamos prontos para responder. Escolha o canal que preferir."
            size="lg"
          />
        </Reveal>

        <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <div className="space-y-5">
              <ContactInfoItem
                icon={<Phone className="size-5" aria-hidden />}
                label="WhatsApp"
                value={phone}
              />
              <ContactInfoItem
                icon={<Mail className="size-5" aria-hidden />}
                label="E-mail"
                value={clientData.contact.email}
                href={`mailto:${clientData.contact.email}`}
              />
              <ContactInfoItem
                icon={<MapPin className="size-5" aria-hidden />}
                label="Endereço"
                value={clientData.contact.address}
                href={clientData.social.googleMapsPlace}
              />
              <ContactInfoItem
                icon={<Clock className="size-5" aria-hidden />}
                label="Horário de atendimento"
                value={clientData.contact.hours}
              />

              <div className="pt-4">
                <WhatsAppButton size="lg" source="contact-section" fullWidth>
                  Iniciar conversa no WhatsApp
                </WhatsAppButton>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <GoogleMapEmbed minHeight="400px" />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

function ContactInfoItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
}) {
  const content = (
    <>
      <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-secondary-muted text-secondary">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
        <div className="mt-0.5 text-base font-medium text-foreground">{value}</div>
      </div>
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        className="flex items-start gap-4 rounded-2xl bg-background p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-elevated"
      >
        {content}
      </a>
    )
  }

  return (
    <div className="flex items-start gap-4 rounded-2xl bg-background p-5 shadow-soft">{content}</div>
  )
}
