
# Hero v3 — figura recortada + forma verde-petróleo + motion vivo

Escopo: apenas o bloco Hero em `src/routes/index.tsx` e keyframes/utilities em `src/styles.css`. Nenhum outro conteúdo, texto, link ou seção muda.

## 1) Novo asset

- Subir `dra_jaqueline_capa_2.png` (PNG transparente já enviado) como Lovable Asset:
  `lovable-assets create --file /mnt/user-uploads/dra_jaqueline_capa_2.png --filename dra-jaqueline-hero-cutout.png > src/assets/dra-jaqueline-hero-cutout.png.asset.json`
- Importar no Hero via `@/assets/...asset.json`, `loading="eager"`, `fetchpriority="high"`.
- Manter a imagem antiga do Hero (`Dra_Jaqueline_capa.JPG`) sem tocar (poderá ser reutilizada em outras seções); só trocar a referência dentro do Hero.

## 2) Estrutura visual (desktop)

Coluna esquerda: eyebrow, título, parágrafo, CTA, credenciais (conteúdo intacto).
Coluna direita: stage do herói com camadas empilhadas em `position: relative` dentro de um wrapper `.hero-stage`:

```text
z-0  textura/gradiente da section (.hero-bg — já existe, mantida)
z-10 .hero-shape  → forma verde-petróleo (deep teal) grande, cantos assimétricos
z-15 .hero-shape-glow → glow dourado pulsante atrás da figura
z-20 .hero-accent-line → filete dourado horizontal + 3 pontos, atravessando a forma
z-20 .hero-watermark → monograma JM (asset existente) opacity 0.08, canto inferior
z-30 .hero-figure → PNG recortado da doutora, extrapola topo da forma e base do hero
```

Detalhes:
- Remover moldura dourada deslocada, monograma "M" gigante, blob orgânico dourado, filete que atravessava a foto e o wrapper `.hero-photo-in` da versão anterior.
- Forma verde: `background: linear-gradient(150deg, oklch(0.32 0.045 195) 0%, oklch(0.24 0.05 200) 55%, oklch(0.20 0.04 205) 100%)`, `border-radius: 220px 40px 180px 60px / 200px 60px 160px 80px`, `aspect-[4/5]`, `w-[92%]` alinhada à direita, `translate-y-6`.
- Figura: `object-contain object-bottom`, `h-[115%]` (para "furar" o topo da forma), posição absoluta `bottom-0 right-[4%]`, `max-w-none w-[110%]`, sem clip.
- Filete dourado: `absolute top-[38%] -left-16 w-56 h-px` gradient champagne com bolinha 6px na ponta.
- Watermark JM: `absolute bottom-6 right-8 w-24 opacity-[0.08]`.

## 3) Estrutura visual (mobile)

- Section vira `flex-col`: bloco de texto em cima, stage do herói abaixo com `aspect-[4/5]`.
- Forma verde ocupa ~90% da largura, centralizada; figura `h-[112%]` extrapola topo.
- Filete dourado escondido em `< md`; watermark escondido em `< sm`.
- Parallax de mouse desativado (`hover: none`).

## 4) Motion de entrada (~2.2s total)

Novos keyframes em `src/styles.css`:

- `hero-shape-in`: `opacity 0; scale(0.85)` → `opacity 1; scale(1)`, 0.9s `cubic-bezier(0.34, 1.35, 0.64, 1)` both, delay 200ms.
- `hero-figure-in`: `opacity 0; translateY(60px)` → `opacity 1; translateY(0)`, 1.0s `cubic-bezier(0.16, 1, 0.3, 1)` both, delay 400ms.
- `hero-mask-rise` (já existe): reaproveitado para as 3 linhas do título com delays 600ms / 800ms / 1000ms.
- `hero-fade-up-lg` (já existe): eyebrow (500ms — sobe antes do título), parágrafo (1150ms), CTA (1300ms), credenciais (1450ms).
- Filete + watermark: `hero-fade-up-lg` delay 1500ms.

Delay global inicial ~200ms cobre a curva desejada.

## 5) Motion contínuo

- `hero-figure-float`: `translateY(0)` ↔ `translateY(-10px)`, 5.5s ease-in-out infinite alternate, aplicado no wrapper da figura (nunca em partes internas). Inicia após a entrada (delay 1.6s) para não conflitar com `hero-figure-in`.
- `hero-shape-glow-pulse`: opacidade 0.35 ↔ 0.55 + `scale(1)` ↔ `scale(1.04)`, 4s ease-in-out infinite alternate, num elemento `radial-gradient` dourado atrás da figura.
- Parallax de mouse (desktop, `hover: hover` + sem `prefers-reduced-motion`):
  - `useEffect` no Hero, refs em `.hero-figure` e `.hero-shape`.
  - `mousemove` no `.hero-stage` (ou section), calcula deltas normalizados (−1..1).
  - Figura: `translate3d(dx * 15px, dy * 15px, 0)` (com `transition: transform 500ms ease-out`).
  - Forma: `translate3d(dx * -8px, dy * -8px, 0)` (sentido oposto para paralaxe crível).
  - Float da figura combina via `translate` no wrapper externo e `translate3d` de parallax num wrapper interno para não se cancelarem.
- Removido o parallax do blob antigo (não existe mais).

## 6) Salvaguardas

- Adicionar bloco `@media (prefers-reduced-motion: reduce)` cobrindo as novas classes:
  ```css
  .hero-shape-in, .hero-figure-in, .hero-figure-float, .hero-shape-glow-pulse {
    animation: none !important;
    transform: none !important;
    opacity: 1 !important;
  }
  ```
- `useEffect` do parallax só ativa se `matchMedia('(hover: hover)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches`.
- Section mantém `overflow-x-clip`; stage do herói com `overflow: visible` para permitir a figura "furar" o topo.
- Animar apenas `transform`, `opacity`, `clip-path`. Figura `eager` + `fetchpriority=high` (LCP).

## 7) Limpeza

Remover das linhas do Hero atual:
- `.hero-blob`, `.hero-blob-in`, wrapper de foto com clip-path/portal, monograma "M" gigante, moldura dourada deslocada (`.hero-anim-frame`), filete antigo que cortava a foto.
- Limpar `useEffect` de parallax do blob (substituído pelo novo parallax figura+forma).
- Keyframes obsoletos em `styles.css` (`hero-photo-clip`, `hero-blob-in`, `hero-ken-burns-loop`, `.hero-blob`, `.hero-photo-in`, `.hero-ken-burns`, `.hero-anim-frame`, `hero-frame-slide`) podem ser removidos por não terem mais uso — mantendo `hero-mask-rise`, `hero-fade-up-lg`, `hero-bg`.

## Arquivos tocados

- `src/assets/dra-jaqueline-hero-cutout.png.asset.json` (novo, via CLI de assets)
- `src/routes/index.tsx` — reescrita do bloco Hero (~239-319) + refs/useEffect de parallax
- `src/styles.css` — novos keyframes (`hero-shape-in`, `hero-figure-in`, `hero-figure-float`, `hero-shape-glow-pulse`) e utilities; remoção do CSS do hero antigo não reutilizado; bloco `prefers-reduced-motion` atualizado

## Fora de escopo

Header, Sintomas, Consequências, Avaliação, Autoridade, Estrutura, FAQ, Rodapé, FAB WhatsApp, PlaquinhaJourney, tokens de tema, textos, links, outras imagens da página.
