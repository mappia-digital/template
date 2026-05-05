"use client"

import { useEffect, useState } from "react"
import { MessageCircle } from "lucide-react"
import { buildWhatsAppUrl } from "@/lib/whatsapp"
import { clientData } from "../../../client-data"

/**
 * Botão flutuante de WhatsApp — sempre visível em todas as páginas.
 * Aparece com fade-in após 1s para não competir com o hero.
 */
export function WhatsAppFloat() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 800)
    return () => clearTimeout(t)
  }, [])

  const href = buildWhatsAppUrl(
    clientData.contact.whatsapp,
    clientData.hero.ctaMessage,
    { source: "float" },
  )

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      data-source="float"
      className={`group fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-accent px-4 py-3 text-accent-foreground shadow-elevated transition-all duration-500 hover:scale-105 hover:shadow-glow active:scale-95 md:bottom-8 md:right-8 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <span className="absolute inset-0 -z-10 animate-pulse-soft rounded-full" />
      <MessageCircle className="size-6 shrink-0" aria-hidden />
      <span className="hidden text-sm font-semibold md:block md:max-w-0 md:overflow-hidden md:whitespace-nowrap md:transition-all md:duration-300 md:group-hover:max-w-[200px] md:group-hover:pr-1">
        Fale conosco
      </span>
    </a>
  )
}
