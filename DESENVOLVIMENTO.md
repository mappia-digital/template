# Mappia Digital — Guia de Desenvolvimento

> Documento oficial de arquitetura, regras e fluxo de trabalho para o time de desenvolvimento.
> Toda decisão aqui registrada foi validada e é inegociável na execução dos projetos.

---

## Sumário

1. [Visão Geral do Produto](#1-visão-geral-do-produto)
2. [Arquitetura de Repositórios](#2-arquitetura-de-repositórios)
3. [Stack Tecnológica](#3-stack-tecnológica)
4. [Estrutura Padrão dos Sites](#4-estrutura-padrão-dos-sites)
5. [Regras Inegociáveis de Desenvolvimento](#5-regras-inegociáveis-de-desenvolvimento)
6. [client-data.ts — Contrato de Dados do Cliente](#6-client-datats--contrato-de-dados-do-cliente)
7. [Design System e Tokens Visuais](#7-design-system-e-tokens-visuais)
8. [Hierarquia de Componentes (@mappia/ui)](#8-hierarquia-de-componentes-mappiaui)
9. [Fluxo de Trabalho por Projeto](#9-fluxo-de-trabalho-por-projeto)
10. [Checklist de QA — Gates de Deploy](#10-checklist-de-qa--gates-de-deploy)
11. [Convenções Git](#11-convenções-git)

---

## 1. Visão Geral do Produto

A Mappia entrega sites de conversão padronizados para PMEs locais. O que muda entre clientes é **conteúdo, cores e imagens** — a estrutura de funil é fixa.

| Pacote | Escopo | Prazo |
|---|---|---|
| **Mappia Pin** | 3 páginas, 2 rodadas de ajuste | 10 dias corridos |
| **Mappia Place** | 5 páginas + Landing Page, 5 rodadas de ajuste | 10 dias corridos |
| **Mappia Pro** | Sistemas customizados | Sob orçamento |

**Meta operacional:** 4 a 6 projetos simultâneos por desenvolvedor.

---

## 2. Arquitetura de Repositórios

### Decisão: Template Repository + Pacote Privado

Não utilizamos um monorepo de clientes. Cada cliente tem seu próprio repositório isolado, importando componentes compartilhados via pacote privado.

**Por quê?** Isolamento é crítico: um bug no pipeline de um cliente não pode afetar outros. Um freelancer contratado para um projeto não pode acessar dados de toda a base de clientes.

### Estrutura da Organização GitHub `mappia-digital`

```
mappia-digital/
│
├── ui              → pacote @mappia/ui   (componentes compartilhados)
├── utils           → pacote @mappia/utils (funções auxiliares)
├── template        → repo template base (clonado para cada novo cliente)
│
├── cliente-{slug}  → repo do cliente A
├── cliente-{slug}  → repo do cliente B
└── ...
```

### Criando um novo projeto (Passo 5 da esteira)

```bash
gh repo create mappia-digital/cliente-{slug} --template mappia-digital/template --private
```

Após isso:
1. Preencher `client-data.ts` com os dados do briefing
2. Ajustar tokens de cor e fonte no `tailwind.config.ts`
3. Push para `dev` → Vercel cria preview deployment automático
4. Merge para `main` (após QA aprovado) → Vercel deploy de produção

### Propagação de Atualizações de Componentes

Quando o `@mappia/ui` recebe uma correção ou melhoria, uma **GitHub Action** abre Pull Requests de atualização de dependência automaticamente em todos os repositórios de cliente. O dev revisa e faz merge. Nenhuma atualização é forçada sem revisão.

---

## 3. Stack Tecnológica

### Cenário A — Sites e Landing Pages (nosso core)

| Camada | Tecnologia | Motivo |
|---|---|---|
| Framework | **Next.js** (SSG) | SEO nativo, PageSpeed, deploy estático |
| Estilização | **Tailwind CSS** | Velocidade de codificação, tokens via CSS vars |
| Linguagem | **TypeScript** | Build falha em erros de tipo — zero surpresas em produção |
| Imagens | **next/image** | Compressão e lazy loading automáticos |
| Fontes | **next/font** | Elimina chamadas externas ao Google Fonts (performance) |
| Hospedagem | **Vercel** (padrão) ou Hostinger (export estático) | |
| CI/CD | **GitHub Actions** | Lighthouse gate + propagação de pacotes |

### Cenário B — Sistemas Customizados

| Camada | Tecnologia |
|---|---|
| Front-end | React + TypeScript |
| Back-end | Node.js (geral) ou Go (alta concorrência) |
| Banco de dados | PostgreSQL + Prisma ORM |
| Infraestrutura | Turborepo + Docker + VPS (Hostinger ou AWS) |

### Cenário C — Baixa Complexidade / Autogestão

WordPress + Elementor Pro + Hostinger (LiteSpeed Cache).

---

## 4. Estrutura Padrão dos Sites

### Páginas obrigatórias

| Página | Função |
|---|---|
| **Home** | Motor de conversão. Todas as seções de funil. |
| **Serviços** | Detalhamento com CTA parametrizado por serviço. |
| **Sobre** | Humanização da marca, equipe, missão. |
| **Contato** | Formulário + WhatsApp + Maps + horário. |
| **FAQ** | Quebra de objeções com links âncora para serviços. |
| **Privacidade** | Obrigatória (LGPD). Gerada do `client-data.ts`. |
| **404** | Customizada. Sempre com CTA de WhatsApp. |

*(Landing Page de captação é entregue separada quando inclusa no pacote.)*

### Seções da Home — Ordem fixa

| # | Seção | Função no Funil |
|---|---|---|
| 1 | **Hero** | Proposta de valor + CTA principal para WhatsApp |
| 2 | **Sobre em Resumo** | Humanização, conexão emocional |
| 3 | **Serviços** | Apresentação visual dos serviços (máx. 6 cards) |
| 3.5 | **Contador de Credibilidade** *(opcional)* | Números reais: anos de mercado, clientes, nota Google. Só renderiza se `clientData.stats[]` preenchido. |
| 4 | **Diferenciais** | 3-4 pontos de autoridade (ícone + texto curto) |
| 5 | **Prova Social** | Barra de logos/marcas → depoimentos reais ou embed Google Reviews |
| 6 | **CTA Intermediário** | Bloco contrastante. Captura o lead no meio da rolagem. |
| 7 | **FAQ Resumido** | 3-4 perguntas para quebrar objeções de fechamento |
| 8 | **Localização e Contato** | Formulário + WhatsApp + iframe Google Maps + horário |
| 9 | **Footer** | Logo, navegação, redes sociais, CNPJ, link de Privacidade |

### Páginas Internas — padrão adicional

- **Breadcrumb Schema.org** obrigatório no header de cada página interna (Serviços, Sobre, FAQ, Contato)
- **CTA Final** ao fim de toda página interna (direcionamento para WhatsApp ou Contato)

---

## 5. Regras Inegociáveis de Desenvolvimento

Estas regras se aplicam a **todos os projetos do Cenário A**. PRs que violem qualquer uma dessas regras são recusados no code review.

---

### Regra 1 — Separação Estrita de UI e Dados

> O `client-data.ts` é a **única** fonte de verdade do cliente.

Nenhum texto, cor, número de WhatsApp, link de rede social ou ID de GTM pode aparecer hardcoded dentro de um componente ou página. Tudo é lido do `client-data.ts`.

A troca de cliente deve ser possível **apenas** alterando esse arquivo.

---

### Regra 2 — Componentização Extrema

Toda a camada visual é composta por componentes do `@mappia/ui`. Nenhum HTML estrutural de seção (Navbar, Hero, Footer, etc.) é escrito diretamente nas páginas — apenas instâncias de componentes recebendo props do `client-data.ts`.

Componentes específicos de um cliente (se necessários) ficam em `src/components/` do repo do cliente e nunca duplicam lógica do `@mappia/ui`.

---

### Regra 3 — Design System com Tokens Tailwind

Nenhuma cor hexadecimal hardcoded em classes Tailwind. Sempre usar os tokens semânticos: `text-primary`, `bg-secondary`, `border-accent`.

Os tokens são CSS custom properties injetadas no `globals.css` a partir do `clientData.branding` em build time.

```css
/* globals.css — gerado automaticamente */
:root {
  --color-primary:   #1a56db; /* clientData.branding.primaryColor */
  --color-secondary: #0e9f6e;
  --color-accent:    #ff5a1f;
}
```

```ts
// tailwind.config.ts
colors: {
  primary:   'var(--color-primary)',
  secondary: 'var(--color-secondary)',
  accent:    'var(--color-accent)',
}
```

---

### Regra 4 — SSG e Performance como Gate de Deploy

- Modo SSG obrigatório. Nenhum `getServerSideProps` em projetos do Cenário A.
- Lighthouse CI roda automaticamente no GitHub Actions a cada Push.
- O merge para `main` é **bloqueado** se PageSpeed Mobile < 90.
- Imagens sempre via `next/image`. Fontes sempre via `next/font`.

---

### Regra 5 — WhatsApp Centralizado

Toda URL de WhatsApp é gerada pela função de `@mappia/utils`:

```ts
import { buildWhatsAppUrl } from '@mappia/utils'

// Uso correto:
const url = buildWhatsAppUrl(clientData.contact.whatsapp, service.ctaMessage)

// Proibido:
const url = `https://wa.me/5511999999999?text=Olá`
```

Isso garante troca de número em um único lugar e habilita UTMs por ponto de contato.

---

### Regra 6 — GTM como Único Vetor de Rastreamento

O único script de terceiros permitido no `<head>` é o `<GTMScript />`. **Nunca** instalar Google Analytics, Meta Pixel ou Microsoft Clarity diretamente no código.

O time de marketing opera via GTM com autonomia total, sem precisar de deploy.

```tsx
// layout.tsx
<GTMScript containerId={clientData.gtm.containerId} />
```

PRs com `<script>` de Analytics, Pixel ou similar são recusados.

---

### Regra 7 — SEO Estruturado Obrigatório

Toda build deve incluir:

| Item | Onde |
|---|---|
| Schema.org `LocalBusiness` (JSON-LD) | Todas as páginas |
| Schema.org `FAQPage` | Página FAQ + seção FAQ da Home |
| Schema.org `BreadcrumbList` | Páginas internas |
| Open Graph + Twitter Card | Todas as páginas |
| `sitemap.xml` | Gerado automaticamente |
| `robots.txt` | Gerado automaticamente |
| `canonical` URL | Todas as páginas |
| `hreflang pt-BR` | Todas as páginas |

Os schemas `LocalBusiness` e `FAQPage` são gerados pelo `@mappia/utils` a partir do `client-data.ts` — nenhuma digitação manual.

---

### Regra 8 — Conformidade LGPD Mínima

Toda entrega inclui:
- **Banner de cookies** (`<CookieBanner />` de `@mappia/ui`) — scripts de rastreamento não carregam antes da aceitação (configuração no GTM, não no código)
- **Página de Privacidade** gerada a partir do template com dados do `client-data.ts`
- Link de Privacidade fixo no Footer

---

### Regra 9 — Git e Nomenclatura Padrão

- **Branches:** `main` (produção) e `dev` (desenvolvimento ativo)
- **Commits:** em português, estilo convencional

```
feat: adiciona seção de serviços
fix: corrige link de whatsapp no hero
chore: atualiza @mappia/ui para v1.2.0
style: ajusta espaçamento do footer no mobile
```

- **Tag obrigatória** no go-live: `v1.0.0-go-live`

---

## 6. `client-data.ts` — Contrato de Dados do Cliente

Este é o único arquivo que muda entre projetos de clientes. Ele é preenchido com os dados do briefing no Passo 5 da esteira.

```ts
// client-data.ts
export const clientData = {
  business: {
    name:        'Nome da Empresa',
    cnpj:        '00.000.000/0001-00',
    segment:     'Clínica de Estética',
    description: 'Descrição curta do negócio para SEO e Schema',
  },

  contact: {
    whatsapp: '5511999999999',  // sem espaços, com DDI
    email:    'contato@empresa.com.br',
    address:  'Rua Exemplo, 123 - Bairro - Cidade/UF',
    hours:    'Seg a Sex: 9h–18h | Sáb: 9h–13h',
  },

  branding: {
    primaryColor:   '#1a56db',
    secondaryColor: '#0e9f6e',
    accentColor:    '#ff5a1f',
    fontHeading:    'Poppins',
    fontBody:       'Inter',
  },

  seo: {
    siteUrl:     'https://www.empresa.com.br',
    title:       'Nome da Empresa | Clínica de Estética em Cidade',
    description: 'Descrição de até 160 caracteres para o Google.',
    ogImage:     '/images/og-image.jpg',  // 1200x630px
  },

  stats: [
    // Deixar vazio ([]) se não houver dados reais confirmados pelo cliente
    { label: 'Anos de mercado', value: '8+' },
    { label: 'Clientes atendidos', value: '500+' },
    { label: 'Nota no Google', value: '4.9★' },
  ],

  services: [
    {
      id:          'limpeza-de-pele',
      title:       'Limpeza de Pele',
      description: 'Descrição curta do serviço.',
      ctaMessage:  'Olá! Gostaria de agendar uma Limpeza de Pele.',
    },
    // máximo 6 serviços
  ],

  testimonials: [
    {
      name:   'Maria S.',
      text:   'Depoimento real do cliente.',
      rating: 5,
    },
  ],

  faq: [
    {
      question: 'Pergunta frequente?',
      answer:   'Resposta clara e direta.',
    },
  ],

  social: {
    instagram:  'https://instagram.com/usuario',
    facebook:   'https://facebook.com/pagina',
    googleMaps: 'https://maps.google.com/?cid=...',
  },

  gtm: {
    containerId: 'GTM-XXXXXXX',
  },
} as const
```

---

## 7. Design System e Tokens Visuais

### Tokens obrigatórios

| Token CSS | Tailwind class | Uso |
|---|---|---|
| `--color-primary` | `primary` | Cor principal da marca. CTAs, destaques. |
| `--color-secondary` | `secondary` | Cor de apoio. Fundos alternados, badges. |
| `--color-accent` | `accent` | Cor de ação. Botões de WhatsApp, hovers. |
| `--font-heading` | Configurado via `next/font` | Títulos (h1–h3) |
| `--font-body` | Configurado via `next/font` | Parágrafos, labels |

### Regra de cor em classes

```tsx
// ✅ Correto
<button className="bg-accent text-white hover:bg-accent/90">
  Falar no WhatsApp
</button>

// ❌ Proibido
<button className="bg-[#25D366] text-white">
  Falar no WhatsApp
</button>
```

---

## 8. Hierarquia de Componentes (`@mappia/ui`)

### Átomos (elementos base, sem estado próprio)

| Componente | Descrição |
|---|---|
| `CTAButton` | Botão de ação genérico. Recebe `href`, `variant`, `size`. |
| `WhatsAppButton` | Botão pré-formatado com ícone do WhatsApp. Usa `buildWhatsAppUrl`. |
| `SectionTitle` | Bloco de título + subtítulo de seção. |
| `ServiceIcon` | Renderiza ícone de serviço (Heroicons ou Lucide). |

### Moléculas (combinações de átomos)

| Componente | Descrição |
|---|---|
| `ServiceCard` | Ícone + título + descrição + CTA. Recebe objeto `service` do `client-data`. |
| `TestimonialCard` | Avatar (inicial) + nome + texto + estrelas. |
| `FAQItem` | Pergunta expansível com animação. |
| `DifferentialItem` | Ícone + título + texto curto. |
| `StatCounter` | Número animado + label. Usado na Seção 3.5. |

### Organismos (seções completas de página)

| Componente | Descrição |
|---|---|
| `Navbar` | Logo + menu de navegação + CTA de WhatsApp. Sticky no mobile. |
| `Hero` | Seção 1 completa. Recebe `business`, `contact`, `seo`. |
| `CTABanner` | Seção 6 — bloco de cor sólida com CTA de WhatsApp. |
| `GoogleMapEmbed` | Iframe do Google Maps responsivo. |
| `Footer` | Links + redes sociais + CNPJ + link de Privacidade. |
| `GTMScript` | Injeta scripts do Google Tag Manager no `<head>` e `<body>`. |
| `CookieBanner` | Banner LGPD. Bloqueia GTM até aceitação. |

---

## 9. Fluxo de Trabalho por Projeto

### Criação do repositório (5 min)

```bash
# 1. Criar repo do cliente a partir do template
gh repo create mappia-digital/cliente-{slug} \
  --template mappia-digital/template \
  --private \
  --clone

cd cliente-{slug}

# 2. Criar branch de desenvolvimento
git checkout -b dev
```

### Configuração inicial do projeto (30 min)

```bash
# 3. Instalar dependências (já configuradas no template)
npm install

# 4. Preencher client-data.ts com os dados do briefing
# Abrir client-data.ts e preencher todos os campos

# 5. Rodar em desenvolvimento
npm run dev
```

### Ciclo de desenvolvimento

```
dev branch → desenvolvimento e commits
     ↓
push para dev → Vercel Preview URL gerada automaticamente
     ↓
PR: dev → main (CI roda Lighthouse + checks)
     ↓       ↓
  <90 mobile  ≥90 mobile
  bloqueado   merge liberado
                ↓
           Vercel Production deploy
```

### Go-Live

```bash
# Após aprovação final do cliente
git tag v1.0.0-go-live
git push origin v1.0.0-go-live
```

---

## 10. Checklist de QA — Gates de Deploy

O site **não vai para o cliente** sem todos os itens abaixo marcados. Os itens com 🤖 são verificados automaticamente pelo CI.

### Performance
- [ ] 🤖 PageSpeed Mobile ≥ 90 (Lighthouse CI bloqueia merge se reprovado)
- [ ] Nenhuma imagem sem `next/image`
- [ ] Nenhuma fonte carregada via `<link>` externo (usar `next/font`)

### Conteúdo
- [ ] 🤖 Nenhum texto "Lorem Ipsum" (Grep no CI)
- [ ] Todos os dados do `client-data.ts` preenchidos e revisados
- [ ] `stats[]` vazio se não houver números reais confirmados pelo cliente

### Funcionalidade
- [ ] Todos os links de WhatsApp direcionam para o número correto com mensagem parametrizada
- [ ] Formulário de contato enviando corretamente
- [ ] Nenhum link quebrado (verificar todas as páginas)
- [ ] Google Maps carregando no iframe

### Rastreamento
- [ ] GTM disparando `pageview` (verificar no DevTools → Network → `gtm.js`)
- [ ] Nenhum script de Analytics/Pixel direto no código

### SEO e LGPD
- [ ] Schema.org `LocalBusiness` presente (validar em [search.google.com/test/rich-results](https://search.google.com/test/rich-results))
- [ ] Schema.org `FAQPage` presente na página FAQ
- [ ] Open Graph correto (validar em [opengraph.xyz](https://www.opengraph.xyz))
- [ ] `sitemap.xml` acessível em `/sitemap.xml`
- [ ] `robots.txt` acessível em `/robots.txt`
- [ ] Banner de cookies presente e funcional
- [ ] Página de Privacidade publicada e com link no Footer
- [ ] Página 404 customizada com CTA de WhatsApp

### Git
- [ ] Branch `dev` com todos os commits do projeto
- [ ] PR de `dev` para `main` aprovado após CI verde
- [ ] Tag `v1.0.0-go-live` criada após go-live

---

## 11. Convenções Git

### Branches

| Branch | Uso |
|---|---|
| `main` | Produção. Só recebe merge via PR com CI verde. |
| `dev` | Branch de desenvolvimento ativo do projeto. |

### Formato de commits

```
<tipo>: <descrição em português, imperativo, minúsculas>
```

| Tipo | Uso |
|---|---|
| `feat` | Nova funcionalidade ou seção |
| `fix` | Correção de bug |
| `chore` | Atualização de dependência, configuração |
| `style` | Ajuste visual sem mudança de lógica |
| `content` | Atualização de texto, imagem ou dado do cliente |

**Exemplos:**

```
feat: adiciona seção de contador de credibilidade
fix: corrige número de whatsapp no botão flutuante
content: atualiza depoimentos e foto da equipe
chore: atualiza @mappia/ui para v1.3.0
style: ajusta espaçamento do hero no mobile
```

---

*Última atualização: 2026-05-05 — Versão 1.0*
