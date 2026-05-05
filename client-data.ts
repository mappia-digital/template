/**
 * client-data.ts — ÚNICA fonte de verdade do cliente.
 *
 * Toda informação visual, textual ou de configuração de um projeto Mappia
 * é lida deste arquivo. Nenhum texto, cor, número de WhatsApp ou ID de GTM
 * pode aparecer hardcoded em qualquer outro lugar do código.
 *
 * Para criar um novo projeto:
 *   1. Clonar o template via `gh repo create mappia-digital/cliente-{slug} --template mappia-digital/template`
 *   2. Preencher CADA campo deste arquivo com os dados do briefing
 *   3. Push → Vercel cria o preview automaticamente
 */

export type ClientData = {
  /** Identidade institucional do negócio */
  business: {
    name: string
    /** Slogan curto opcional, exibido em alguns headers */
    tagline?: string
    cnpj: string
    segment: string
    /** Descrição em até 2 linhas — usada no Schema.org e no rodapé */
    description: string
    /** Razão social completa (opcional, usado em Política de Privacidade e Footer) */
    legalName?: string
  }

  /** Pontos de contato e localização */
  contact: {
    /** Número COM DDI, sem espaços/caracteres. Ex: "5511999998888" */
    whatsapp: string
    email: string
    /** Endereço completo: "Rua, número - Bairro - Cidade/UF - CEP" */
    address: string
    /** Coordenadas opcionais para Schema LocalBusiness */
    geo?: { latitude: number; longitude: number }
    /** Texto livre para exibição. Ex: "Seg–Sex 9h–18h • Sáb 9h–13h" */
    hours: string
    /** Horários estruturados para Schema (opcional, mas recomendado) */
    openingHours?: Array<{
      days: Array<"Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa" | "Su">
      opens: string  // "09:00"
      closes: string // "18:00"
    }>
  }

  /** Tokens visuais — aplicados no globals.css em build time */
  branding: {
    /** Cor primária da marca (hex). Usada em CTAs principais e títulos. */
    primaryColor: string
    /** Versão escura para hover/active states (opcional, calculado se ausente). */
    primaryColorDark?: string
    /** Versão clara para fundos suaves (opcional, calculado se ausente). */
    primaryColorMuted?: string

    /** Cor secundária — apoio visual, badges, fundos alternados */
    secondaryColor: string
    secondaryColorDark?: string
    secondaryColorMuted?: string

    /** Cor de ação — geralmente verde para WhatsApp */
    accentColor: string
    accentColorDark?: string

    /** Famílias de fonte — devem corresponder ao nome do Google Font ou local */
    fontHeading: string
    fontBody: string

    /** Estilo do logotipo no Navbar */
    logo: {
      /** Caminho público para imagem do logo. Ex: "/images/logo.svg" */
      src: string
      /** Largura em pixels para next/image */
      width: number
      /** Altura em pixels para next/image */
      height: number
      /** Texto alt acessível */
      alt: string
    }
  }

  /** SEO global — usado em layout.tsx e geração de schema */
  seo: {
    /** URL canônica de produção (sem barra final). Ex: "https://www.cliente.com.br" */
    siteUrl: string
    /** Title padrão da Home — usado nas demais páginas com sufixo */
    title: string
    /** Meta description — máx 160 caracteres */
    description: string
    /** Imagem para Open Graph (1200x630). Caminho público. */
    ogImage: string
    /** Locale BCP 47. Padrão pt-BR */
    locale?: string
    /** Twitter handle opcional. Ex: "@cliente" */
    twitterHandle?: string
  }

  /** Hero da Home */
  hero: {
    /** Título principal — pode usar **negrito** com asteriscos para destaque */
    title: string
    subtitle: string
    /** Imagem de fundo (1920x1080+ recomendado). Caminho público. */
    backgroundImage: string
    /** Texto do CTA principal */
    ctaText: string
    /** Mensagem pré-formatada do WhatsApp ao clicar no CTA */
    ctaMessage: string
    /** Texto do CTA secundário (opcional). Ex: "Ver serviços" */
    secondaryCtaText?: string
    /** Âncora ou rota do CTA secundário. Ex: "#servicos" */
    secondaryCtaHref?: string
    /** Trust indicators inline abaixo dos CTAs */
    trustBadges?: string[]
  }

  /** Sobre — bloco curto da Home + página completa */
  about: {
    /** Resumo de 2-3 parágrafos exibido na Home */
    shortText: string
    /** Imagem da equipe ou estabelecimento */
    image?: string
    /** Conteúdo expandido da página /sobre */
    history: string
    mission: string
    values: Array<{ title: string; description: string }>
    team?: Array<{ name: string; role: string; photo: string }>
  }

  /**
   * Números de credibilidade — exibidos na Seção 3.5 da Home.
   * IMPORTANTE: deixar [] se não houver dados reais. Nunca inventar.
   */
  stats: Array<{
    /** Valor exibido — pode incluir sufixos. Ex: "500+", "4.9★", "8 anos" */
    value: string
    /** Rótulo curto. Ex: "Clientes atendidos" */
    label: string
  }>

  /** Diferenciais — exibidos na Seção 4 da Home (3-4 itens recomendado) */
  differentials: Array<{
    /** Nome do ícone do lucide-react. Ex: "ShieldCheck", "Clock", "Award" */
    icon: string
    title: string
    description: string
  }>

  /** Serviços oferecidos (máximo 6 cards na Home, expansível em /servicos) */
  services: Array<{
    id: string
    /** Nome do ícone do lucide-react */
    icon: string
    title: string
    /** Descrição curta para card da Home (1-2 linhas) */
    description: string
    /** Descrição extensa para página /servicos (opcional) */
    fullDescription?: string
    /** Lista de benefícios opcional para página /servicos */
    benefits?: string[]
    /** Mensagem do WhatsApp ao clicar no CTA do serviço */
    ctaMessage: string
    /** Imagem do serviço (opcional, usada em /servicos) */
    image?: string
  }>

  /** Como funciona — exibido em /servicos (3-4 passos) */
  process: Array<{
    /** Número ou ícone do passo */
    step: number
    title: string
    description: string
  }>

  /** Logos/marcas atendidas — barra exibida antes dos depoimentos */
  brands?: Array<{
    name: string
    logo: string
    href?: string
  }>

  /** Depoimentos manuais (a Mappia pode integrar Google Reviews via API depois) */
  testimonials: Array<{
    name: string
    role?: string
    text: string
    rating: 1 | 2 | 3 | 4 | 5
    /** Foto opcional. Se ausente, exibe inicial em círculo colorido. */
    photo?: string
  }>

  /** Banner de CTA intermediário (Seção 6 da Home) */
  ctaBanner: {
    title: string
    subtitle?: string
    buttonText: string
    buttonMessage: string
  }

  /** Perguntas frequentes (4 mostradas na Home, todas em /faq) */
  faq: Array<{
    question: string
    answer: string
  }>

  /** Redes sociais e mapa */
  social: {
    instagram?: string
    facebook?: string
    linkedin?: string
    youtube?: string
    tiktok?: string
    /** URL completa do iframe do Google Maps (src do embed) */
    googleMapsEmbed: string
    /** Link direto para a ficha do Google Meu Negócio (cid ou place_id) */
    googleMapsPlace?: string
  }

  /** Configuração de rastreamento — apenas GTM. Nada mais é permitido. */
  gtm: {
    /** Container ID do Google Tag Manager. Formato: "GTM-XXXXXXX" */
    containerId: string
  }

  /** Conteúdo da página de Política de Privacidade (LGPD) */
  privacy: {
    /** Data da última atualização. Formato: "DD/MM/AAAA" */
    lastUpdated: string
    /** Contato do Encarregado de Dados (DPO) — pode ser o mesmo email */
    dpoEmail: string
  }
}

/* ──────────────────────────────────────────────────────────────────────────
   DADOS DO CLIENTE — preencher tudo abaixo a partir do briefing
   ────────────────────────────────────────────────────────────────────────── */

export const clientData: ClientData = {
  business: {
    name: "Mappia Demo",
    tagline: "Soluções que conectam o seu negócio ao próximo cliente",
    cnpj: "00.000.000/0001-00",
    segment: "Agência Digital",
    description:
      "Sites profissionais de alta conversão para PMEs. Entrega em 10 dias, performance 90+ no PageSpeed e foco total em gerar leads via WhatsApp.",
    legalName: "Mappia Digital Ltda.",
  },

  contact: {
    whatsapp: "5511999998888",
    email: "contato@mappia.digital",
    address: "Av. Paulista, 1000 - Bela Vista - São Paulo/SP - 01310-100",
    geo: { latitude: -23.5613, longitude: -46.6558 },
    hours: "Seg–Sex 9h–18h",
    openingHours: [
      { days: ["Mo", "Tu", "We", "Th", "Fr"], opens: "09:00", closes: "18:00" },
    ],
  },

  branding: {
    primaryColor: "#0F172A",
    primaryColorDark: "#020617",
    primaryColorMuted: "#E2E8F0",

    secondaryColor: "#3B82F6",
    secondaryColorDark: "#2563EB",
    secondaryColorMuted: "#DBEAFE",

    accentColor: "#22C55E",
    accentColorDark: "#16A34A",

    fontHeading: "Plus Jakarta Sans",
    fontBody: "Inter",

    logo: {
      src: "/images/logo.svg",
      width: 140,
      height: 32,
      alt: "Mappia Demo",
    },
  },

  seo: {
    siteUrl: "https://www.mappia.digital",
    title: "Mappia Demo — Sites Profissionais que Convertem",
    description:
      "Sites profissionais de alta conversão para PMEs. Entrega em 10 dias com performance 90+ no PageSpeed.",
    ogImage: "/images/og-image.jpg",
    locale: "pt-BR",
    twitterHandle: "@mappiadigital",
  },

  hero: {
    title: "Sites que **transformam visitantes em clientes**",
    subtitle:
      "Páginas de alta conversão entregues em 10 dias, com performance 90+ no PageSpeed e integração direta com WhatsApp.",
    backgroundImage: "/images/hero-bg.jpg",
    ctaText: "Falar com um especialista",
    ctaMessage: "Olá! Vim pelo site e quero saber mais sobre os serviços.",
    secondaryCtaText: "Ver serviços",
    secondaryCtaHref: "#servicos",
    trustBadges: ["Entrega em 10 dias", "PageSpeed 90+", "Suporte dedicado"],
  },

  about: {
    shortText:
      "Somos uma agência focada em entregar sites de alta performance para pequenas e médias empresas. Combinamos design moderno, otimização técnica e estratégia de conversão num pacote padronizado e acessível.\n\nEm cada projeto, aplicamos as mesmas regras inegociáveis de qualidade: SEO estruturado, performance acima de 90 no PageSpeed e integração direta com o canal de venda do cliente.",
    image: "/images/about-team.jpg",
    history:
      "A Mappia nasceu da necessidade de oferecer sites profissionais com prazo curto e qualidade técnica para PMEs. Em poucos meses já consolidamos uma esteira de entrega que combina IA para geração de copy, design system padronizado e checks automatizados de qualidade.",
    mission:
      "Conectar negócios locais aos seus próximos clientes através de sites rápidos, bonitos e tecnicamente impecáveis.",
    values: [
      { title: "Performance", description: "Cada milissegundo de carregamento importa. PageSpeed 90+ é nosso piso." },
      { title: "Padronização", description: "O que escala é o método. Estrutura fixa, conteúdo sob medida." },
      { title: "Transparência", description: "Prazos claros, escopos fechados, comunicação direta." },
    ],
    team: [
      { name: "Lucas Benfica", role: "Fundador", photo: "/images/team-1.jpg" },
    ],
  },

  stats: [
    { value: "+50", label: "Sites entregues" },
    { value: "10 dias", label: "Prazo médio" },
    { value: "90+", label: "PageSpeed garantido" },
    { value: "4.9★", label: "Avaliação Google" },
  ],

  differentials: [
    {
      icon: "Zap",
      title: "Entrega em 10 dias",
      description: "Esteira padronizada com prazos cumpridos.",
    },
    {
      icon: "Gauge",
      title: "Performance garantida",
      description: "PageSpeed 90+ no mobile como gate de deploy.",
    },
    {
      icon: "ShieldCheck",
      title: "LGPD desde a base",
      description: "Banner de cookies e Política de Privacidade inclusos.",
    },
    {
      icon: "Headphones",
      title: "Suporte dedicado",
      description: "Plano de manutenção mensal opcional.",
    },
  ],

  services: [
    {
      id: "site-institucional",
      icon: "Globe",
      title: "Site Institucional",
      description: "Site de 5 páginas com estrutura de conversão otimizada.",
      fullDescription:
        "Pacote Mappia Place: 5 páginas (Home, Sobre, Serviços, Contato, FAQ) + Landing Page de captação. Inclui 5 rodadas de ajustes, hospedagem inicial e Política de Privacidade LGPD.",
      benefits: [
        "Design moderno responsivo",
        "PageSpeed 90+ no mobile",
        "Integração com WhatsApp e Google Maps",
        "Schema.org LocalBusiness configurado",
      ],
      ctaMessage: "Olá! Quero saber mais sobre o pacote Site Institucional.",
      image: "/images/service-1.jpg",
    },
    {
      id: "landing-page",
      icon: "Rocket",
      title: "Landing Page",
      description: "Página única de alta conversão para campanhas pagas.",
      ctaMessage: "Olá! Quero saber mais sobre Landing Page para campanhas.",
      image: "/images/service-2.jpg",
    },
    {
      id: "google-meu-negocio",
      icon: "MapPin",
      title: "Google Meu Negócio",
      description: "Configuração e otimização da ficha local no Google.",
      ctaMessage: "Olá! Quero otimizar meu Google Meu Negócio.",
      image: "/images/service-3.jpg",
    },
    {
      id: "manutencao",
      icon: "Wrench",
      title: "Manutenção Mensal",
      description: "Atualizações, backups e suporte técnico recorrente.",
      ctaMessage: "Olá! Quero saber sobre o plano de Manutenção.",
      image: "/images/service-4.jpg",
    },
    {
      id: "automacao-whatsapp",
      icon: "MessageSquare",
      title: "Automação WhatsApp",
      description: "Integração via API com chatbots e roteamento de leads.",
      ctaMessage: "Olá! Quero automatizar o atendimento via WhatsApp.",
      image: "/images/service-5.jpg",
    },
    {
      id: "consultoria",
      icon: "Lightbulb",
      title: "Consultoria Digital",
      description: "Diagnóstico estratégico para presença online.",
      ctaMessage: "Olá! Quero agendar uma consultoria digital.",
      image: "/images/service-6.jpg",
    },
  ],

  process: [
    { step: 1, title: "Briefing", description: "Preenchimento do briefing padrão em 30 minutos." },
    { step: 2, title: "Geração de copy", description: "IA gera a primeira versão dos textos. Cliente apenas valida." },
    { step: 3, title: "Desenvolvimento", description: "Site é montado em homologação com QA automatizado." },
    { step: 4, title: "Go-Live", description: "DNS apontado, SSL ativo e Google Meu Negócio otimizado." },
  ],

  brands: [],

  testimonials: [
    {
      name: "Maria Silva",
      role: "Clínica Estética Bella",
      text: "Em 10 dias tinha um site profissional rodando, com leads chegando direto no WhatsApp. Equipe direta e sem enrolação.",
      rating: 5,
    },
    {
      name: "João Pereira",
      role: "Auto Center JP",
      text: "Antes recebia 2 contatos por semana. Agora chega de 5 a 8 por dia. O investimento se pagou no primeiro mês.",
      rating: 5,
    },
    {
      name: "Ana Costa",
      role: "Pet Shop AmigoFiel",
      text: "Site bonito, rápido e que aparece bem no Google. Recomendo para qualquer empresa local.",
      rating: 5,
    },
  ],

  ctaBanner: {
    title: "Pronto para ter um site que vende?",
    subtitle: "Fale agora com um especialista e receba uma proposta em 24 horas.",
    buttonText: "Quero meu site",
    buttonMessage: "Olá! Quero receber uma proposta de site para minha empresa.",
  },

  faq: [
    {
      question: "Em quanto tempo o site fica pronto?",
      answer:
        "10 dias corridos no total: 7 dias para desenvolvimento e 3 dias para revisão interna e validação com o cliente.",
    },
    {
      question: "Vocês criam os textos do site?",
      answer:
        "Sim. Usamos IA para gerar a primeira versão das copys com base no seu briefing. Você apenas valida e ajusta.",
    },
    {
      question: "O domínio e a hospedagem estão inclusos?",
      answer:
        "Sim, o registro de domínio e a hospedagem do primeiro ano já estão embutidos no pacote.",
    },
    {
      question: "Como funciona a manutenção mensal?",
      answer:
        "O plano Mappia Care cobre atualizações de conteúdo, backups, monitoramento de uptime e suporte técnico via WhatsApp.",
    },
    {
      question: "Posso parcelar o pagamento?",
      answer:
        "Sim. Aceitamos via Mercado Pago em até 12x. A entrada de 50% é obrigatória para iniciar o projeto.",
    },
    {
      question: "Vocês fazem a configuração do Google Meu Negócio?",
      answer:
        "Sim. A configuração e otimização inicial do Google Meu Negócio estão inclusas no Go-Live de todos os pacotes.",
    },
  ],

  social: {
    instagram: "https://instagram.com/mappiadigital",
    facebook: "https://facebook.com/mappiadigital",
    linkedin: "https://linkedin.com/company/mappiadigital",
    googleMapsEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.123!2d-46.6558!3d-23.5613!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0!2sAv.+Paulista!5e0!3m2!1spt-BR!2sbr!4v1700000000000",
    googleMapsPlace: "https://maps.google.com/?cid=0",
  },

  gtm: {
    containerId: "GTM-XXXXXXX",
  },

  privacy: {
    lastUpdated: "01/01/2026",
    dpoEmail: "privacidade@mappia.digital",
  },
} as const
