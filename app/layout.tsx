import type { Metadata, Viewport } from "next"
import { Inter, Plus_Jakarta_Sans } from "next/font/google"

import { Navbar } from "@/components/organisms/Navbar"
import { Footer } from "@/components/organisms/Footer"
import { GTMScript } from "@/components/organisms/GTMScript"
import { CookieBanner } from "@/components/organisms/CookieBanner"
import { WhatsAppFloat } from "@/components/atoms/WhatsAppFloat"
import { buildLocalBusinessSchema } from "@/lib/schema"
import { buildPageMetadata } from "@/lib/seo"
import { clientData } from "../client-data"

import "./globals.css"

const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

const fontHeading = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["500", "600", "700", "800"],
})

export const metadata: Metadata = {
  ...buildPageMetadata({}),
  metadataBase: new URL(clientData.seo.siteUrl),
  applicationName: clientData.business.name,
  authors: [{ name: clientData.business.name }],
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: clientData.branding.primaryColor,
}

/**
 * CSS custom properties injetadas a partir do client-data.branding.
 * Isso permite que cada projeto de cliente substitua apenas o client-data.ts
 * sem mexer em CSS.
 */
function buildBrandingStyle(): React.CSSProperties {
  return {
    "--color-primary": clientData.branding.primaryColor,
    "--color-primary-fg": "#FFFFFF",
    "--color-primary-muted": clientData.branding.primaryColorMuted ?? "#E2E8F0",
    "--color-secondary": clientData.branding.secondaryColor,
    "--color-secondary-fg": "#FFFFFF",
    "--color-secondary-muted": clientData.branding.secondaryColorMuted ?? "#DBEAFE",
    "--color-accent": clientData.branding.accentColor,
    "--color-accent-fg": "#FFFFFF",
  } as React.CSSProperties
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const brandingStyle = buildBrandingStyle()
  const localBusinessSchema = buildLocalBusinessSchema(clientData)

  return (
    <html
      lang={clientData.seo.locale ?? "pt-BR"}
      className={`${fontBody.variable} ${fontHeading.variable}`}
      style={brandingStyle}
    >
      <head>
        <link rel="canonical" href={clientData.seo.siteUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className="bg-background text-foreground antialiased">
        <GTMScript containerId={clientData.gtm.containerId} />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Pular para o conteúdo
        </a>

        <Navbar />

        <main id="main">{children}</main>

        <Footer />

        <WhatsAppFloat />
        <CookieBanner />
      </body>
    </html>
  )
}
