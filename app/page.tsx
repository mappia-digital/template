import { Hero } from "@/components/organisms/Hero"
import { AboutSection } from "@/components/organisms/AboutSection"
import { ServicesSection } from "@/components/organisms/ServicesSection"
import { StatsSection } from "@/components/organisms/StatsSection"
import { DifferentialsSection } from "@/components/organisms/DifferentialsSection"
import { BrandsBar } from "@/components/organisms/BrandsBar"
import { TestimonialsSection } from "@/components/organisms/TestimonialsSection"
import { CTABanner } from "@/components/organisms/CTABanner"
import { FAQSection } from "@/components/organisms/FAQSection"
import { ContactSection } from "@/components/organisms/ContactSection"
import { buildFAQSchema } from "@/lib/schema"
import { clientData } from "../client-data"

export default function HomePage() {
  const faqSchema = buildFAQSchema(clientData.faq)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Hero />
      <AboutSection />
      <ServicesSection />
      <StatsSection />
      <DifferentialsSection />
      <BrandsBar />
      <TestimonialsSection />
      <CTABanner />
      <FAQSection />
      <ContactSection />
    </>
  )
}
