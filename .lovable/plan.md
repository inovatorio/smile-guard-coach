## Objetivo

Substituir as imagens estáticas espalhadas da plaquinha por **uma única plaquinha** que percorre a página em scroll, conectando Hero → Sintomas → Consequências → Avaliação → Tratamentos, depois desaparece na Autoridade e ressurge em repouso no CTA final.

## Arquitetura

### 1. Novo componente `src/components/PlaquinhaScrollGuide.tsx`

Renderiza **uma única `<img>`** da plaquinha dentro de um wrapper `position: absolute` que vive em um container `position: relative` (a "área de jornada"). A imagem usa `position: sticky; top: 40vh` para acompanhar o scroll, com `transform` calculado em JS via `requestAnimationFrame`.

```text
<JourneyWrapper position:relative>
  ├─ <PlaquinhaScrollGuide />   ← sticky layer, pointer-events:none, z-10
  │     └─ <img plaquinha />    ← transform recalculado por rAF
  └─ <Hero />
  └─ <Symptoms />
  └─ <Consequences />
  └─ <Evaluation /> (bloco escuro)
  └─ <Treatments />
</JourneyWrapper>

<Authority />     ← fora da jornada (plaquinha não aparece)
<FinalCTA />      ← plaquinha em repouso, estática, ao lado do CTA
```

### 2. Lógica de progresso

Hook `usePlaquinhaProgress(wrapperRef)`:
- Lê `wrapperRef.getBoundingClientRect()` em cada frame de scroll.
- Calcula `progress = clamp((viewportCenter - wrapperTop) / wrapperHeight, 0, 1)`.
- Throttle via `requestAnimationFrame` + flag, listener `scroll` passivo + `resize`.
- Sem libs novas.

### 3. Keyframes da plaquinha (mapeados ao progress)

| Trecho        | progress   | translateX | translateY  | rotate | scale | opacity |
| ------------- | ---------- | ---------- | ----------- | ------ | ----- | ------- |
| Hero          | 0.00–0.15  | +18vw      | flutua leve | -4°    | 1.00  | 1       |
| Sintomas      | 0.15–0.40  | +22vw      | desce       | +3°    | 0.92  | 1       |
| Consequências | 0.40–0.60  | 0 (centro) | desce       | -2°    | 1.05  | 1       |
| Avaliação     | 0.60–0.82  | -18vw      | desce       | +6°    | 0.95  | 1 + glow |
| Tratamentos   | 0.82–1.00  | +20vw      | desce       | -3°    | 0.80  | 0.55    |

Interpolação linear entre keyframes. Aplicado como `transform` + `opacity` inline no `<img>`.

### 4. SVG decorativo na Avaliação

Dentro do bloco escuro, sobrepor um SVG inline (linhas finas champagne, eixos, label `S-04 · DIAGNÓSTICO`) que aparece com `opacity` baseada em progress 0.60–0.82. Vive no `PlaquinhaScrollGuide` para acompanhar a plaquinha.

### 5. Linhas conectoras na Consequências

SVG inline fino (stroke champagne 1px, `stroke-dasharray` animado por `opacity`) ligando a posição central da plaquinha aos 5 cards. Renderizado dentro da seção Consequências, não no guide.

### 6. CTA final — plaquinha em repouso

Componente separado, imagem estática (`plaquinhaRepouso`) ao lado do CTA, sem animação. Reforça simbolismo de proteção.

## Mobile (`< 768px`)

- `PlaquinhaScrollGuide` muda para `position: sticky; top: 80px`, canto superior direito.
- Largura reduzida (~64px), `pointer-events:none`.
- Apenas `opacity` e leve `translateY` baseados em progress — sem `translateX` que cubra texto.
- Esconder na seção Tratamentos e abaixo (`opacity:0` quando progress > 0.82).
- `prefers-reduced-motion`: plaquinha 100% estática, posicionada no topo direito do Hero.

## Limpeza

- Remover imports e usos de `plaquinhaHero`, `plaquinhaTecnica` em seções (Hero, Sintomas, Consequências, Avaliação, Tratamentos).
- Manter apenas `plaquinhaHero` (usada pelo guide) e `plaquinhaRepouso` (CTA final).
- Remover `.plaquinha-float` / `.plaquinha-drift` antigos do `styles.css` (substituídos pelo guide JS).
- Manter classe base `.plaquinha` (drop-shadow) — reaproveitada pelo guide e pela repouso.

## Acessibilidade

- `<img>` no guide: `alt=""` + `aria-hidden="true"` (decorativo).
- Plaquinha repouso no CTA final: `alt=""` + `aria-hidden="true"` (símbolo, não informativa).
- Linhas SVG decorativas: `aria-hidden="true"`.
- Respeitar `prefers-reduced-motion`: desliga rAF, plaquinha fica estática.

## Arquivos afetados

- **Criar:** `src/components/PlaquinhaScrollGuide.tsx`
- **Editar:** `src/routes/index.tsx` (envolver seções no JourneyWrapper, remover imagens inline da plaquinha, adicionar SVG conector em Consequências e plaquinha repouso no CTA final).
- **Editar:** `src/styles.css` (remover keyframes obsoletos; manter `.plaquinha` base).

## Não-objetivos

- Não mudar paleta, tipografia, copy clínica ou estrutura de seções.
- Não instalar libs (sem framer-motion).
- Não alterar SEO/JSON-LD.
- Não tornar a plaquinha protagonista — ela conduz a leitura, a Dra. Jaqueline continua sendo o foco.
