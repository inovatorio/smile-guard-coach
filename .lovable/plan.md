# Hero premium — profundidade, camadas e motion perceptível

Escopo: apenas o bloco Hero em `src/routes/index.tsx` (linhas ~239-319) e novas classes/keyframes em `src/styles.css`. Nenhum texto, link, imagem ou outra seção mudam. Layout mantém texto à esquerda / foto à direita.

## 1) Profundidade — descolar a foto do fundo

Na coluna da foto (desktop e mobile), reestruturar o wrapper em camadas:

- **Blob dourado ao fundo** (`aria-hidden`, `-z-20`): `div` `absolute` de ~120% da largura e ~110% da altura da foto, deslocado ~-60px topo/-40px direita, com `background: radial-gradient(60% 60% at 30% 30%, oklch(0.82 0.10 78 / 0.9), oklch(0.68 0.12 65 / 0.75) 60%, transparent 85%)`, `border-radius: 60% 40% 55% 45% / 50% 55% 45% 50%` (blob orgânico), `filter: blur(2px)`. Classe `.hero-blob` para animar.
- **Textura de fundo da seção**: adicionar na `<section>` um pseudo-elemento (via classe `.hero-bg`) com `background: radial-gradient(1200px 600px at 20% 30%, oklch(0.82 0.05 75 / 0.18), transparent 60%)` + grão SVG inline `data:` muito sutil (`opacity: 0.04`).
- **Sombra forte** na foto: `shadow-[0_40px_80px_-30px_oklch(0.265_0.005_75/0.45),0_10px_30px_-15px_oklch(0.68_0.10_65/0.35)]`.
- **Vinheta na foto**: overlay `absolute inset-0 rounded-inherit pointer-events-none` com `background: radial-gradient(120% 80% at 50% 40%, transparent 55%, oklch(0.30 0.02 60 / 0.28) 100%)` e `mix-blend-mode: multiply`.
- **Forma assimétrica "portal"** na foto: `border-radius: 12px 48px 12px 12px` (canto sup. direito bem mais arredondado). Overlay e vinheta herdam o mesmo raio.
- Manter `aspect-[4/5] object-cover`, `loading="eager"`.

## 2) Composição — quebrar os dois retângulos

- **Filete dourado atravessando**: `div` `absolute` na coluna da foto, `top: ~38%`, `left: -80px`, `width: 180px`, `height: 1px`, `background: linear-gradient(90deg, transparent, oklch(0.74 0.075 75) 40%, oklch(0.82 0.10 78))`, `z-20` (acima da foto), com um ponto/circle dourado 6px na extremidade direita. Cruza a borda esquerda da foto em ~40px.
- **Monograma "M"** grande (`font-display italic`, `text-[10rem]`, `text-champagne/25`) posicionado `absolute -left-16 top-8 z-20`, sobrepondo levemente a foto. Só desktop (`hidden md:block`).
- Manter a moldura dourada deslocada existente, mas movê-la para `translate-x-8 translate-y-8` para reforçar profundidade.

## 3) Motion de entrada — perceptível

Novos keyframes em `src/styles.css`:

- `@keyframes hero-mask-rise`: `transform: translateY(100%)` → `translateY(0)`, 0.7s `cubic-bezier(0.16, 1, 0.3, 1)` both.
- `@keyframes hero-fade-up-lg`: `opacity 0; translateY(28px)` → `opacity 1; translateY(0)`, 0.7s ease-out expo both.
- `@keyframes hero-photo-clip`: `clip-path: inset(100% 0 0 0)` → `inset(0 0 0 0)` + `opacity 0 → 1`, 0.9s expo both.
- `@keyframes hero-blob-in`: `translate(60px, -20px) scale(0.85); opacity 0` → `translate(0,0) scale(1); opacity 1`, 1.1s `cubic-bezier(0.34, 1.56, 0.64, 1)` (overshoot) both.
- `@keyframes hero-ken-burns-loop`: `scale(1)` ↔ `scale(1.06)`, 8s ease-in-out infinite alternate.

Estrutura do título com máscara linha-por-linha: quebrar o h1 em três wrappers `<span class="hero-line-mask"><span class="hero-line-inner">…</span></span>` com `overflow: hidden; display: block` no outer e `hero-mask-rise` com delays 0ms/150ms/300ms no inner. Divisão sugerida:
- Linha 1: "Você pode estar *apertando*"
- Linha 2: "os dentes"
- Linha 3: "sem perceber."

O `<em>` "apertando" permanece dentro da linha 1 (mantém o realce champagne, sem animação separada).

Demais elementos (delays a partir de 500ms):
- eyebrow: `hero-fade-up-lg` delay 500ms
- parágrafo: 620ms
- CTA bloco: 740ms
- credenciais: 860ms

Foto e blob:
- `<img>` foto: `.hero-photo-in` (clip-path 0.9s, delay 300ms) + após terminar, `.hero-ken-burns` roda em loop.
- Blob: `.hero-blob-in` delay 200ms.
- Filete dourado + monograma M: `hero-fade-up-lg` delay 900ms.
- Moldura deslocada: mantém `hero-frame-slide` existente.

## 4) Motion contínuo

- **Ken Burns infinito** aplicado à `<img>` da foto (loop 8s alternate). Coexistir com a animação de entrada: usar wrapper `.hero-photo-wrap` para o clip-path e a `<img>` interna para o ken burns loop.
- **Parallax do blob**:
  - Desktop: registrar `mousemove` no wrapper do hero (via `useEffect` em `HomePage` — hook novo isolado, sem quebrar SSR: `typeof window` guard e `matchMedia('(hover: hover)')`). Aplicar `transform: translate3d(x, y, 0)` no blob (`ref`), amplitude ±12px em X, ±8px em Y, com `transition: transform 400ms ease-out`.
  - Scroll: adicionar leve deslocamento vertical do blob baseado em `window.scrollY` (dentro do hero range), amplitude até 15px. Mesmo listener passivo.
  - Desabilitar se `prefers-reduced-motion: reduce` ou `(hover: none)` (mobile).

## Salvaguardas

CSS:
```css
@media (prefers-reduced-motion: reduce) {
  .hero-line-inner, .hero-fade-up-lg, .hero-photo-in,
  .hero-blob-in, .hero-ken-burns {
    animation: none !important;
    transform: none !important;
    opacity: 1 !important;
    clip-path: none !important;
  }
}
```

JS parallax só ativa quando `!matchMedia('(prefers-reduced-motion: reduce)').matches && matchMedia('(hover: hover)').matches`.

Section com `overflow-x-clip` (já existe) — manter. Todas as animações usam apenas `transform`, `opacity`, `clip-path`. Foto continua `eager` (LCP preservado).

## Aplicação mobile

- Blob dourado renderiza menor e menos deslocado (variantes de classe: `md:` maior).
- Monograma M e filete atravessando ficam `hidden md:block`.
- Parallax mouse desativado (`hover: none`).
- Máscara do título, fade-up e ken burns permanecem (motion perceptível também no mobile).

## Arquivos tocados

- `src/routes/index.tsx` — reestruturação do Hero (linhas ~239-319) + `useEffect` de parallax + `useRef` no blob.
- `src/styles.css` — novos keyframes/utilities (`hero-mask-rise`, `hero-fade-up-lg`, `hero-photo-in`, `hero-blob-in`, `hero-ken-burns`, `hero-line-mask`, `hero-blob`, `hero-bg`) e bloco `prefers-reduced-motion` atualizado.

## Fora de escopo

Header, Sintomas, Consequências, Avaliação, Autoridade, Estrutura, FAQ, Rodapé, FAB WhatsApp, PlaquinhaJourney, tokens de tema, textos, imagens, links.
