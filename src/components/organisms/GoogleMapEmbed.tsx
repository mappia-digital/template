import { clientData } from "../../../client-data"

type GoogleMapEmbedProps = {
  className?: string
  /** Altura mínima do iframe — mobile-first */
  minHeight?: string
}

/**
 * Iframe do Google Maps responsivo. URL do embed vem do client-data.social.googleMapsEmbed.
 * Lazy load nativo para não bloquear o LCP.
 */
export function GoogleMapEmbed({ className, minHeight = "320px" }: GoogleMapEmbedProps) {
  const url = clientData.social.googleMapsEmbed

  if (!url) return null

  return (
    <div className={`overflow-hidden rounded-3xl border border-border bg-muted ${className ?? ""}`}>
      <iframe
        src={url}
        title={`Localização — ${clientData.business.name}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="h-full w-full"
        style={{ minHeight, border: 0 }}
      />
    </div>
  )
}
