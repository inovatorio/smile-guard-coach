# Ajustes finais na LP - Dra. Jaqueline

Identidade visual mantida. Todas mudanças em `src/routes/index.tsx` e pequenos ajustes em `src/styles.css`. Sem tocar em links de WhatsApp, tokens de tema, PlaquinhaJourney, LazyVideoPlayer ou dados de contato.

## 1. Remover micro-texto do hero

Excluir o parágrafo `"Avaliação sem compromisso · resposta no mesmo dia"` abaixo do CTA principal do hero. Manter apenas: botão primário + link secundário sublinhado. Sem substituição.

## 2. Ícones inline nos cards (Sintomas e Consequências)

Nos cards de `symptoms` e `consequences`, mover o `<Item.icon />` para dentro do bloco do título:

- Wrapper `flex items-center gap-3` contendo ícone + `<h3>` na mesma linha.
- Ícone menor e mais firme: `size={18}`, `strokeWidth={1.4}`, `text-champagne shrink-0`.
- Remover o `mb-4` que separava o ícone do título; título perde qualquer padding-top extra.
- Reduzir padding vertical interno do card em um passo (`py-8` → `py-6`, `p-8` → `p-6`) para encurtar altura total. Ajuste também no gap do grid (`gap-6` mantém, mas remover margens verticais soltas).
- Sintomas: objetivo é caber na viewport desktop; se ainda ficar longo, reduzir também `mt-*` do cabeçalho da seção.

Consequências recebe o mesmo tratamento inline para manter consistência visual.

## 3. Seção do vídeo - alinhamento central

No grid da seção Avaliação (`video | texto+etapas`), trocar o alinhamento do container para centralizar o bloco direito verticalmente em relação à altura do vídeo:

- Grid pai: `items-center` (hoje `items-start`).
- Coluna direita: remover qualquer `self-start`; garantir `flex flex-col justify-center h-full`.
- Cabeçalho da seção (label + título + parágrafo) e o grid 2x2 de fases seguem empilhados; o conjunto inteiro centraliza.

## 4. Reduzir seção "Reputação" (Google)

Reescrever o layout para uma faixa horizontal enxuta, centralizada:

- `<section>`: baixar padding para `py-12 md:py-16`, remover destaques grandes.
- Uma única linha (desktop) com: label mono "Reputação" acima, e abaixo uma faixa flex centralizada `flex flex-wrap items-center justify-center gap-x-6 gap-y-3`:
  - 5 estrelas `Star size={16}` champagne preenchidas.
  - `"5,0"` em Fraunces `text-2xl md:text-3xl` graphite (não mais 7xl/8xl).
  - Separador vertical fino `h-5 w-px bg-graphite/20`.
  - `"+670 avaliações no Google"` em Inter `text-sm md:text-base` graphite/78.
  - Selo Google: ícone G inline SVG `w-4 h-4` + texto mono `text-[11px]` "Google Reviews".
- Texto de apoio "Somando as unidades..." em `text-xs md:text-sm text-graphite/70`, centralizado, abaixo da faixa.
- Remover o CTA GhostCta desta seção (fica só a prova social; CTAs continuam nas seções adjacentes).

Resultado: bloco compacto, sóbrio, ocupando ~1/3 da altura anterior.

## 5. Trocar sticky bar por FAB circular do WhatsApp

- Remover o `<div>` sticky da barra preta inferior (mobile-only).
- Remover o `pb-24 md:pb-0` do `<main>` se existir por causa dela.
- Criar botão `<a>` fixo:
  - Posição: `fixed bottom-5 right-5 md:bottom-8 md:right-8 z-50`.
  - Formato: `w-14 h-14 md:w-16 md:h-16 rounded-full grid place-items-center`.
  - Paleta: `bg-graphite text-champagne border border-champagne/50 hover:bg-champagne hover:text-graphite` (dourado no hover, grafite em repouso - dentro da identidade, longe do verde WhatsApp).
  - Sombra: `shadow-[0_12px_32px_-8px_oklch(0.265_0.005_75/0.35)]`.
  - Ícone: `MessageCircle` do lucide (já importado) `size={26}` `strokeWidth={1.6}`. Alternativa: SVG inline do glifo WhatsApp em `currentColor` para leitura mais imediata - vou usar SVG inline do WhatsApp em `currentColor` mantendo a paleta.
  - `aria-label="Agendar pelo WhatsApp"`, `href={ctaFinalHref}`, `target="_blank" rel="noopener"`.
  - Visível em desktop e mobile (sem `md:hidden`).
- Animação sutil reaproveitando `.animate-cta-glow` já existente, opcional; se ficar pesado visualmente, aplicar apenas um `ring-1 ring-champagne/30`.

## 6. Hero desktop lado a lado

Reverter a ordem mobile-first sem quebrar desktop:

- Coluna de texto: `order-1 md:order-1` (texto sempre à esquerda no desktop).
- Coluna da imagem: `order-2 md:order-2` (foto à direita no desktop, abaixo no mobile).
- Bloco de credenciais volta para dentro da coluna de texto (removendo o `order-3` separado), garantindo empilhamento mobile: headline → parágrafo → CTA → link secundário → credenciais → foto (a foto continua vindo depois no mobile por ser a segunda coluna).
- Grid mantém `md:grid-cols-12` com `md:col-span-7` / `md:col-span-5` e `items-center`.

## Fora de escopo

Não alterar: PlaquinhaJourney, LazyVideoPlayer interno, footer, FAQ, seção Estrutura, tokens de tema, dados de contato, links de WhatsApp, tipografia base.
