/**
 * Utilitário central de geração de URLs do WhatsApp.
 *
 * REGRA INEGOCIÁVEL: nenhuma URL `wa.me` ou `api.whatsapp.com` deve ser
 * construída manualmente em qualquer outro lugar do código. Toda chamada
 * passa por aqui para garantir tracking consistente e troca de número
 * centralizada via client-data.ts.
 */

export type WhatsAppOptions = {
  /** Origem do clique — usado em UTMs e Schema. Ex: "hero", "service-card" */
  source?: string
}

/**
 * Sanitiza um número de telefone — remove tudo que não for dígito.
 * Aceita formatos como "+55 (11) 99999-8888" e retorna "5511999998888".
 */
export function sanitizePhone(phone: string): string {
  return phone.replace(/\D/g, "")
}

/**
 * Formata um número para exibição visual.
 * Ex: "5511999998888" → "+55 (11) 99999-8888"
 */
export function formatPhoneDisplay(phone: string): string {
  const digits = sanitizePhone(phone)
  if (digits.length < 12 || digits.length > 13) return phone

  const ddi = digits.slice(0, 2)
  const ddd = digits.slice(2, 4)
  const isNineDigit = digits.length === 13
  const part1 = isNineDigit ? digits.slice(4, 9) : digits.slice(4, 8)
  const part2 = isNineDigit ? digits.slice(9) : digits.slice(8)

  return `+${ddi} (${ddd}) ${part1}-${part2}`
}

/**
 * Constrói a URL do WhatsApp a partir do número e mensagem.
 *
 * @param phone   Número com DDI (ex: "5511999998888"). Caracteres não-numéricos são removidos.
 * @param message Mensagem pré-formatada exibida ao abrir a conversa.
 * @param options Origem do clique para tracking via UTM (opcional).
 *
 * @example
 *   buildWhatsAppUrl(clientData.contact.whatsapp, "Olá! Quero saber sobre o serviço.")
 *   buildWhatsAppUrl("+55 11 99999-8888", "Quero agendar", { source: "hero" })
 */
export function buildWhatsAppUrl(
  phone: string,
  message: string,
  options: WhatsAppOptions = {},
): string {
  const sanitized = sanitizePhone(phone)
  const url = new URL(`https://wa.me/${sanitized}`)

  const finalMessage = options.source
    ? `${message}\n\n_(origem: ${options.source})_`
    : message

  url.searchParams.set("text", finalMessage)
  return url.toString()
}
