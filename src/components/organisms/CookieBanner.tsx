"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"

const STORAGE_KEY = "mappia.consent.v1"

type Consent = "accepted" | "rejected" | null

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
  }
}

/**
 * Banner LGPD. Só aparece se o usuário ainda não tomou decisão.
 * A escolha é gravada em localStorage e empurrada para o GTM via dataLayer
 * (o container do GTM deve estar configurado com Consent Mode v2).
 */
export function CookieBanner() {
  const [consent, setConsent] = useState<Consent>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Consent | null
      setConsent(stored)
    } catch {
      // localStorage indisponível — exibe banner mesmo assim
    }
  }, [])

  const updateConsent = (decision: "accepted" | "rejected") => {
    setConsent(decision)
    try {
      localStorage.setItem(STORAGE_KEY, decision)
    } catch {
      // sem persistência
    }

    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer ?? []
      window.dataLayer.push({
        event: "consent_update",
        consent_status: decision,
        analytics_storage: decision === "accepted" ? "granted" : "denied",
        ad_storage: decision === "accepted" ? "granted" : "denied",
      })
    }
  }

  if (!mounted || consent !== null) return null

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className="fixed inset-x-3 bottom-3 z-40 mx-auto max-w-3xl rounded-3xl border border-border bg-background p-5 shadow-elevated md:inset-x-auto md:left-6 md:bottom-6 md:p-6"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1 pr-4">
          <h2 id="cookie-banner-title" className="mb-1 text-base font-bold text-foreground">
            Sua privacidade
          </h2>
          <p id="cookie-banner-desc" className="text-sm leading-relaxed text-muted-foreground">
            Usamos cookies para melhorar sua experiência e entender como o site é utilizado. Você
            pode aceitar todos ou ler nossa{" "}
            <Link href="/privacidade" className="font-medium text-secondary underline-offset-4 hover:underline">
              Política de Privacidade
            </Link>
            .
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => updateConsent("rejected")}
            className="h-10 rounded-xl border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            Recusar
          </button>
          <button
            type="button"
            onClick={() => updateConsent("accepted")}
            className="h-10 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-soft transition-all hover:opacity-90 active:scale-[0.98]"
          >
            Aceitar
          </button>
          <button
            type="button"
            onClick={() => updateConsent("rejected")}
            aria-label="Fechar"
            className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  )
}
