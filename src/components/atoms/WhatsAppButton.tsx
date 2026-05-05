import { MessageCircle } from "lucide-react"
import { CTAButton } from "./CTAButton"
import { buildWhatsAppUrl } from "@/lib/whatsapp"
import { clientData } from "../../../client-data"

type WhatsAppButtonProps = {
  /** Mensagem pré-formatada da conversa */
  message?: string
  /** Origem do clique para tracking via UTM */
  source?: string
  /** Texto do botão */
  children?: React.ReactNode
  /** Variante visual — padrão é "accent" (cor de ação, geralmente verde) */
  variant?: "primary" | "secondary" | "accent" | "outline"
  size?: "sm" | "md" | "lg"
  /** Esconde o ícone do WhatsApp */
  hideIcon?: boolean
  fullWidth?: boolean
  className?: string
}

export function WhatsAppButton({
  message,
  source,
  children = "Falar no WhatsApp",
  variant = "accent",
  size = "md",
  hideIcon,
  fullWidth,
  className,
}: WhatsAppButtonProps) {
  const finalMessage = message ?? clientData.hero.ctaMessage
  const href = buildWhatsAppUrl(clientData.contact.whatsapp, finalMessage, { source })

  return (
    <CTAButton
      href={href}
      external
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      className={className}
      leadingIcon={!hideIcon && <MessageCircle className="size-5" aria-hidden />}
      data-source={source}
    >
      {children}
    </CTAButton>
  )
}
