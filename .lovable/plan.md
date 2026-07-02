# Refação do Hero da LP - Dra. Jaqueline

Escopo: apenas a seção HERO em `src/routes/index.tsx` (linhas ~239-311) + poucos keyframes novos em `src/styles.css`. Nenhum texto, link de WhatsApp, imagem ou outra seção será alterado.

## A) Inversão do layout no desktop

- Reordenar as duas colunas do grid `md:grid-cols-12`:
  - Coluna de TEXTO → `md:order-1` (esquerda), mantendo `md:col-span-7`.
  - Coluna da FOTO → `md:order-2` (direita), mantendo `md:col-span-5`.
- Manter `items-center` para alinhamento vertical central.
- Mobile continua empilhado: texto primeiro, foto logo abaixo (o bloco `md:hidden` da foto no meio da coluna de texto permanece).

## B) Tratamento da imagem (profundidade / moldura em camadas)

Substituir o wrapper atual `<div className="relative"><div className="absolute -inset-3 border border-champagne/30 -z-10" />...</div>` por uma composição em camadas:

- Container `relative` com padding para acomodar a moldura deslocada sem overflow.
- Marca d'água discreta ao fundo: `<img src={logoAsset.url}>` posicionado `absolute` no canto, `opacity-[0.06]`, `w-40`, `-z-20`, `hidden md:block`, `aria-hidden`. Simplifica/some no mobile.
- Moldura dourada deslocada atrás: `<div>` `absolute` com `border border-champagne` (1px desktop, apagada no mobile), offset `translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6`, mesmo tamanho da foto, `-z-10`. No mobile reduzir/omitir o offset para evitar overflow horizontal (usar apenas contorno colado `-inset-2` como está hoje, ou esconder totalmente).
- Foto: `rounded-[10px]`, `shadow-[0_30px_60px_-30px_oklch(0.265_0.005_75/0.35)]`, mantém `aspect-[4/5] object-cover`, `relative z-10`.
- Legenda "O BRUXISMO DEIXA PISTAS" permanece no mesmo estilo, ancorada ao canto inferior esquerdo da foto (z-20 para ficar acima).
- Aplicar o mesmo tratamento nas duas instâncias da foto (bloco `md:hidden` mobile e bloco desktop) mas simplificando a moldura no mobile (sem offset).
- Garantir `overflow-hidden` (ou `overflow-x-clip`) no `<section>` do Hero para blindar contra scroll horizontal caso a moldura vaze.

## C) Animação de entrada (uma vez, no load)

Novos keyframes em `src/styles.css`:

- `hero-rise`: opacity 0 → 1, translateY 20px → 0, 0.7s cubic-bezier(0.22, 1, 0.36, 1), `both`.
- `hero-ken-burns`: opacity 0 → 1 + scale 1.08 → 1.0, 1.2s ease-out, `both`.
- `hero-frame-slide`: opacity 0 → 1, translate de (0,0) → offset final (translate-x-6, translate-y-6), 0.9s ease-out, delay ~0.4s.

Utilities:

- `.hero-anim-1` … `.hero-anim-6` aplicam `hero-rise` com `animation-delay` incrementais: 0ms, 130ms, 260ms, 390ms, 520ms (credenciais), 650ms.
- `.hero-anim-photo` usa `hero-ken-burns` (delay 200ms) — aplicado à `<img>` (com `transform-origin: center`).
- `.hero-anim-frame` usa `hero-frame-slide` — aplicado à moldura dourada.
- Palavra "apertando" recebe uma classe `.hero-anim-accent` (delay ~350ms, mesmo `hero-rise` porém com leve `scale(0.98 → 1)`) para o realce sutil.

Substituir o `animate-reveal` genérico do hero por essas classes escalonadas nas ordens: eyebrow → h1 (com accent no `<em>`) → parágrafo → CTA/link → credenciais.

Salvaguardas em CSS:

```css
@media (prefers-reduced-motion: reduce) {
  .hero-anim-1, .hero-anim-2, .hero-anim-3, .hero-anim-4,
  .hero-anim-5, .hero-anim-6, .hero-anim-accent,
  .hero-anim-photo, .hero-anim-frame {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
```

Todas as animações usam apenas `opacity` e `transform` (sem reflow). A `<img>` mantém `loading` padrão (eager, primeira dobra) para não penalizar LCP; o Ken Burns só afeta transform, sem atrasar o load.

## Fora de escopo

Nenhuma alteração em Header, Sintomas, Consequências, Avaliação, Autoridade, Estrutura, FAQ, Rodapé, FAB WhatsApp, PlaquinhaJourney, tokens de tema, textos, imagens ou links.
