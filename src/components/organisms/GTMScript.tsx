import Script from "next/script"

type GTMScriptProps = {
  containerId: string
}

/**
 * Único vetor de rastreamento permitido. Carrega o Google Tag Manager
 * com strategy="afterInteractive" para não bloquear o LCP.
 *
 * IMPORTANTE: a configuração de espera por consentimento (LGPD) deve ser
 * feita DENTRO do GTM (Consent Mode), não no código.
 */
export function GTMScript({ containerId }: GTMScriptProps) {
  if (!containerId || containerId === "GTM-XXXXXXX") {
    return null
  }

  return (
    <>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${containerId}');
          `,
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${containerId}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>
    </>
  )
}
