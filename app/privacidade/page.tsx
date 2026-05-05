import type { Metadata } from "next"
import { Container } from "@/components/atoms/Container"
import { PageHeader } from "@/components/organisms/PageHeader"
import { buildBreadcrumbSchema } from "@/lib/schema"
import { buildPageMetadata } from "@/lib/seo"
import { clientData } from "../../client-data"

export const metadata: Metadata = buildPageMetadata({
  title: "Política de Privacidade",
  description: `Política de Privacidade da ${clientData.business.name}. Como tratamos seus dados pessoais conforme a LGPD.`,
  path: "/privacidade",
})

export default function PrivacidadePage() {
  const breadcrumbSchema = buildBreadcrumbSchema(clientData.seo.siteUrl, [
    { name: "Privacidade", path: "/privacidade" },
  ])

  const businessName = clientData.business.legalName ?? clientData.business.name

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageHeader
        eyebrow="LGPD"
        title="Política de **Privacidade**"
        description={`Última atualização: ${clientData.privacy.lastUpdated}`}
        breadcrumbs={[{ label: "Privacidade" }]}
      />

      <section className="section">
        <Container size="md">
          <article className="prose-mappia space-y-8 text-foreground">
            <PrivacySection title="1. Quem somos">
              <p>
                A <strong>{businessName}</strong> ({clientData.business.cnpj && `CNPJ ${clientData.business.cnpj}`})
                opera o site <strong>{clientData.seo.siteUrl}</strong>. Esta política descreve como tratamos
                seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei
                13.709/2018 — LGPD).
              </p>
            </PrivacySection>

            <PrivacySection title="2. Quais dados coletamos">
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong>Dados de contato:</strong> nome, e-mail, telefone — quando você nos envia uma
                  mensagem via formulário ou WhatsApp.
                </li>
                <li>
                  <strong>Dados de navegação:</strong> páginas visitadas, tempo de permanência, origem do
                  acesso, tipo de dispositivo — coletados automaticamente via cookies analíticos (Google
                  Analytics, gerenciado pelo Google Tag Manager).
                </li>
                <li>
                  <strong>Dados de marketing:</strong> identificadores anônimos para mensuração de campanhas
                  publicitárias, somente após sua aceitação no banner de cookies.
                </li>
              </ul>
            </PrivacySection>

            <PrivacySection title="3. Como usamos seus dados">
              <p>Utilizamos seus dados pessoais exclusivamente para:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Responder suas dúvidas, solicitações e prestar atendimento.</li>
                <li>Enviar orçamentos e propostas comerciais quando solicitado.</li>
                <li>Melhorar a experiência de navegação no site.</li>
                <li>Mensurar a performance de campanhas e do próprio site.</li>
                <li>Cumprir obrigações legais e regulatórias.</li>
              </ul>
            </PrivacySection>

            <PrivacySection title="4. Cookies">
              <p>
                Utilizamos cookies essenciais (necessários para o funcionamento do site), analíticos (para
                medir o uso) e de marketing (para personalizar campanhas). Você pode aceitar ou recusar
                cookies não essenciais a qualquer momento através do banner de privacidade.
              </p>
            </PrivacySection>

            <PrivacySection title="5. Compartilhamento de dados">
              <p>
                Não comercializamos dados pessoais. Compartilhamos informações apenas com:
              </p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Provedores de infraestrutura e analytics (Google, Vercel) para operação do site.</li>
                <li>Autoridades competentes, quando exigido por lei.</li>
              </ul>
            </PrivacySection>

            <PrivacySection title="6. Seus direitos">
              <p>Conforme a LGPD, você tem direito a:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>Confirmar a existência de tratamento de dados.</li>
                <li>Acessar seus dados.</li>
                <li>Corrigir dados incompletos, inexatos ou desatualizados.</li>
                <li>Solicitar anonimização, bloqueio ou eliminação.</li>
                <li>Solicitar portabilidade.</li>
                <li>Revogar o consentimento.</li>
              </ul>
              <p>
                Para exercer qualquer um desses direitos, entre em contato com nosso Encarregado de Proteção
                de Dados pelo e-mail{" "}
                <a
                  href={`mailto:${clientData.privacy.dpoEmail}`}
                  className="font-medium text-secondary underline-offset-4 hover:underline"
                >
                  {clientData.privacy.dpoEmail}
                </a>
                .
              </p>
            </PrivacySection>

            <PrivacySection title="7. Segurança">
              <p>
                Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não
                autorizado, perda ou alteração. Mantemos os dados pelo tempo necessário ao cumprimento das
                finalidades para as quais foram coletados.
              </p>
            </PrivacySection>

            <PrivacySection title="8. Atualizações desta política">
              <p>
                Esta política pode ser atualizada periodicamente. A data da última revisão está indicada no
                topo desta página. Recomendamos consulta regular.
              </p>
            </PrivacySection>

            <PrivacySection title="9. Contato">
              <p>
                Dúvidas sobre privacidade ou exercício de direitos:{" "}
                <a
                  href={`mailto:${clientData.privacy.dpoEmail}`}
                  className="font-medium text-secondary underline-offset-4 hover:underline"
                >
                  {clientData.privacy.dpoEmail}
                </a>
              </p>
            </PrivacySection>
          </article>
        </Container>
      </section>
    </>
  )
}

function PrivacySection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 text-xl font-bold text-foreground md:text-2xl">{title}</h2>
      <div className="space-y-3 text-base leading-relaxed text-muted-foreground">{children}</div>
    </section>
  )
}
