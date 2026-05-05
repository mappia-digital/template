# Mappia Template

Template base oficial da **Mappia Digital** para projetos do Cenário A (sites de 5 páginas + landing).

> Este é um **GitHub Template Repository**. Não desenvolva diretamente aqui — clone para um repositório de cliente.

---

## Stack

- **Next.js 15** (App Router) com Static Site Generation
- **TypeScript 5** estrito (`strict: true`, build falha em erros)
- **Tailwind CSS 3.4** com tokens semânticos via CSS custom properties
- **lucide-react** para ícones (tree-shaking automático)
- **next/font** (Inter + Plus Jakarta Sans) — sem chamadas externas ao Google Fonts

---

## Como criar um novo projeto de cliente

```bash
# 1. Cria repo a partir deste template
gh repo create mappia-digital/cliente-{slug} \
  --template mappia-digital/template \
  --private --clone

cd cliente-{slug}

# 2. Instala dependências
npm install

# 3. Preenche o client-data.ts com os dados do briefing
# (toda informação do site vive nesse único arquivo)

# 4. Substitui os placeholders SVG em public/images/ pelas imagens reais

# 5. Roda em desenvolvimento
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000).

---

## Estrutura do projeto

```
template/
├── client-data.ts          ← ÚNICA fonte de verdade do cliente
├── tailwind.config.ts      ← tokens mapeados para CSS vars
├── app/
│   ├── layout.tsx          ← root layout (GTM, Cookie Banner, fontes)
│   ├── page.tsx            ← Home (9 seções)
│   ├── globals.css
│   ├── icon.tsx            ← favicon dinâmico (gera do client-data)
│   ├── sitemap.ts          ← /sitemap.xml automático
│   ├── robots.ts           ← /robots.txt automático
│   ├── not-found.tsx       ← 404 customizada com CTA WhatsApp
│   ├── servicos/page.tsx
│   ├── sobre/page.tsx
│   ├── contato/page.tsx
│   ├── faq/page.tsx
│   └── privacidade/page.tsx
├── src/
│   ├── components/
│   │   ├── atoms/          ← CTAButton, WhatsAppButton, Container, etc
│   │   ├── molecules/      ← ServiceCard, FAQItem, StatCounter, etc
│   │   └── organisms/      ← Navbar, Footer, Hero, todas as seções
│   ├── lib/
│   │   ├── whatsapp.ts     ← buildWhatsAppUrl (única fonte de URLs)
│   │   ├── schema.ts       ← LocalBusiness, FAQ, Breadcrumb JSON-LD
│   │   ├── seo.ts          ← metadata helpers
│   │   └── utils.ts        ← cn(), parseHighlights()
│   └── hooks/useScrollReveal.ts
├── public/images/          ← logo, hero-bg, og-image (SVG placeholders)
├── scripts/check-lorem.mjs ← bloqueia conteúdo placeholder
├── lighthouserc.json       ← config Lighthouse CI (≥ 90 mobile)
└── .github/workflows/
    ├── lighthouse.yml      ← gate de PageSpeed
    └── check-content.yml   ← grep de Lorem Ipsum + type-check
```

---

## Scripts

| Comando | Função |
|---|---|
| `npm run dev` | Dev server em `localhost:3000` |
| `npm run build` | Build SSG de produção |
| `npm run start` | Serve a build |
| `npm run lint` | ESLint (next/typescript) |
| `npm run type-check` | `tsc --noEmit` — falha em qualquer erro de tipo |
| `npm run check:lorem` | Grep de "Lorem Ipsum" e TODOs no conteúdo |

---

## Regras inegociáveis

1. **Só `client-data.ts` muda entre clientes.** Nenhum texto ou cor hardcoded em componentes.
2. **WhatsApp via `buildWhatsAppUrl()`.** Nunca construir `wa.me` manualmente.
3. **GTM é o único vetor de rastreamento.** Nada de GA, Pixel ou Clarity direto no código.
4. **PageSpeed Mobile ≥ 90.** O CI do GitHub bloqueia merge se reprovado.
5. **`next/image` + `next/font` sempre.** Nada de `<img>` ou `<link>` para Google Fonts.

Documento completo: [`DESENVOLVIMENTO.md`](./DESENVOLVIMENTO.md).

---

## Deploy

### Vercel (padrão)
1. Conectar o repositório do cliente ao Vercel
2. Variáveis de ambiente: nenhuma (tudo vive no `client-data.ts`)
3. Domínio customizado pelo painel Vercel

### Hostinger (export estático)
1. Descomentar em [`next.config.ts`](./next.config.ts):
   ```ts
   output: "export",
   trailingSlash: true,
   images: { unoptimized: true },
   ```
2. `npm run build` → upload da pasta `out/` via FTP

---

## Go-Live

```bash
git tag v1.0.0-go-live
git push origin v1.0.0-go-live
```

---

© Mappia Digital — desenvolvido para escalar.
