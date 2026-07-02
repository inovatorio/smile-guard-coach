## Preparar SEO / GEO / AEO / AIO para publicação

O site já tem uma boa base (title/description por rota, JSON-LD `Dentist`, canonical relativo). Faltam: metadata do `__root.tsx` ainda com placeholders "Lovable App", ausência de `robots.txt` e `sitemap.xml`, JSON-LD incompleto para busca local (GEO) e para respostas de IA (AEO/AIO), e algumas tags úteis para LLMs.

### 1. `src/routes/__root.tsx` — defaults sitewide corretos
- Trocar título/description default (`"Lovable App"` / texto Smile Guardian genérico) por defaults reais da clínica.
- Adicionar `<meta name="robots" content="index,follow">`, `<meta name="author" content="Dra. Jaqueline Martins">`, `lang="pt-BR"` no `<html>`.
- Trocar JSON-LD implícito por um WebSite sitewide (nome, url, inLanguage `pt-BR`).
- Manter `og:image` no root (já está) — leaf herda.

### 2. `src/routes/index.tsx` — reforço SEO/GEO/AEO
- Expandir o JSON-LD atual de `Dentist` para `@type: ["Dentist","LocalBusiness","MedicalBusiness"]` com:
  - `url`, `image`, `telephone` (do WhatsApp), `priceRange`, `inLanguage: "pt-BR"`,
  - Dois `LocalBusiness` filhos (Vila Formosa e São Miguel Paulista) com `geo` (lat/lng aproximados dos bairros), `openingHoursSpecification`, `areaServed`,
  - `sameAs` (Instagram, WhatsApp),
  - `knowsAbout`: bruxismo, DTM, placa oclusal, apertamento dental.
- Adicionar JSON-LD **`FAQPage`** gerado a partir do array `faq` já existente (AEO — habilita rich results e é a estrutura mais consumida por Google SGE / ChatGPT / Perplexity).
- Adicionar JSON-LD **`BreadcrumbList`** simples (Home).
- Adicionar meta `geo.region=BR-SP`, `geo.placename=São Paulo`, `geo.position` para as duas unidades (via meta ICBM — GEO clássico).
- Absolutizar `og:url` e `canonical` para `https://smile-guard-coach.lovable.app/` (crawlers e link previews resolvem melhor URLs absolutas).

### 3. `public/robots.txt` (novo)
```
User-agent: *
Allow: /

# LLM crawlers explicitamente permitidos (AIO)
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: ClaudeBot
Allow: /

Sitemap: https://smile-guard-coach.lovable.app/sitemap.xml
```

### 4. `src/routes/sitemap[.]xml.ts` (novo)
Server route TanStack devolvendo o XML com a rota `/` (única rota pública). Fica pronto para receber novas rotas depois.

### 5. `public/llms.txt` (novo — AIO)
Arquivo curto em Markdown descrevendo a clínica, especialidades, endereços, contato e principais perguntas/respostas. É a convenção emergente que ChatGPT/Perplexity/Claude usam para entender rapidamente um site.

### Fora do escopo
- Não alteramos layout, textos visíveis, imagens nem lógica de negócio.
- Não conectamos Google Search Console / Analytics (posso adicionar depois se quiser).
- Não geramos nova `og:image` — a atual já está definida.

### Resultado esperado
Site pronto para indexação, com rich results de FAQ e ficha local, sinalização geográfica das duas unidades, e discoverability por agentes de IA (GPTBot, PerplexityBot etc.).
