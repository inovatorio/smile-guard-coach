## Diagnóstico

Rodei Playwright contra `localhost:8080` e medi o `<img class="plaquinha">` em cada altura de scroll. A placa **está** sendo renderizada e animada corretamente — opacity sobe de 0 → 1 e a posição migra da direita para a esquerda como planejado:

| scrollY | opacity | left (px) | top (px) |
| ------- | ------- | --------- | -------- |
| 0       | 0       | 1228      | 161      |
| 400     | 0       | 1228      | 161      |
| 1200    | 0.46    | 1149      | 265      |
| 2400    | 1.00    | 810       | 373      |
| 3600    | 0.99    | 593       | 393      |
| 4800    | 1.00    | 384       | 404      |
| 6000    | 0       | 1157      | 512      |

A coreografia funciona, a trava do hero funciona, ela some na Autoridade. **O problema é puramente perceptivo:**

1. **Tamanho minúsculo.** `width: clamp(120px, 16vw, 260px)` × `scale 0.42` na entrada = **~86px de placa visível** num viewport de 1269px. No pico (scale 0.78) ainda dá só ~160px. A imagem-fonte tem detalhe fino (translúcida, acrílico), então em 86px ela desaparece visualmente.
2. **Entrada longa e fraca.** Opacity sobe lentamente (0 → 0.45 → 0.80 → 1.00) ao longo de progress 0–0.24, que no wrapper de ~5400px equivale a ~1300px de scroll só pra ficar opaca. Em scroll rápido (o replay mostra o usuário rolando a página inteira em ~5s) a placa nunca atingiu opacity alta numa região onde ele estava olhando.
3. **Sem micro-movimento entre waypoints.** Em pausas de scroll a placa fica 100% imóvel — sem a oscilação anterior, fica fácil de ignorar / confundir com decoração estática.
4. **Cor translúcida sobre fundo claro.** Sem contraste suficiente na escala atual.

## Plano de correção

Mantém toda a arquitetura aprovada (componente único, waypoints, trava do hero, gate em scrollY > 22vh, fallback mobile). Ajusta apenas presença visual.

### 1. Base maior

`src/components/PlaquinhaJourney.tsx` — trocar:

```ts
width: "clamp(120px, 16vw, 260px)"
```

por:

```ts
width: "clamp(200px, 22vw, 380px)"
```

Em 1269px → ~280px de base. Com scale mínima 0.65 ainda dá ~180px visíveis.

### 2. Escalas mais generosas

Subir o piso de `scale` nos waypoints visíveis (mantendo o mesmo arco direita → centro → esquerda):

| progress | x   | y  | rotate | scale (novo) | opacity (novo) |
| -------- | --- | -- | ------ | ------------ | -------------- |
| 0.00     | 96  | 22 | -10    | 0.55         | 0              |
| 0.06     | 90  | 30 |  -8    | 0.65         | 0.70           |
| 0.14     | 82  | 44 |   0    | 0.78         | 1.00           |
| 0.24     | 64  | 46 |   8    | 0.85         | 1.00           |
| 0.38     | 20  | 52 | -12    | 0.88         | 1.00           |
| 0.55     | 48  | 46 |   4    | 1.00         | 1.00           |
| 0.72     | 24  | 50 |  -4    | 1.05         | 1.00           |
| 0.86     | 68  | 56 |  10    | 0.72         | 0.55           |
| 1.00     | 92  | 64 |  18    | 0.42         | 0              |

Mudanças-chave: opacity chega em 1.0 já em progress 0.14 (não 0.24), e scale fica entre 0.78 e 1.05 durante toda a região visível. Posições laterais (x) ficam um pouco mais para dentro da tela para garantir que a placa fique inteira no viewport, não cortada pela borda.

### 3. Micro-flutuação contínua (versão suave)

Adicionar oscilação senoidal pequena sobreposta ao transform, para a placa "respirar" entre waypoints:

```ts
const t = performance.now() / 1000;
const floatY = Math.sin(t * 0.8) * 0.4;   // ±0.4vh
const floatX = Math.cos(t * 0.6) * 0.25;  // ±0.25vw
const floatRot = Math.sin(t * 0.45) * 0.6; // ±0.6°
```

E rodar `requestAnimationFrame` continuamente (em vez de só em scroll), com guarda: se `!hasScrolled || !inJourney`, mantém opacity 0 e não recalcula float. Custo: 60fps de transform style apenas enquanto a placa está visível.

### 4. Trava do hero — manter

```ts
const heroSafeScroll = window.scrollY > window.innerHeight * 0.22;
const hasScrolled = window.scrollY > 16 && heroSafeScroll;
```

Já está implementada e funcionando.

### 5. Contraste — drop-shadow mais marcado fora da Avaliação

```ts
img.style.filter = inEvaluation
  ? "drop-shadow(0 28px 40px oklch(0.265 0.005 75 / 0.40)) drop-shadow(0 0 36px oklch(0.74 0.075 75 / 0.60))"
  : "drop-shadow(0 30px 44px oklch(0.265 0.005 75 / 0.32)) drop-shadow(0 6px 12px oklch(0.74 0.075 75 / 0.22))";
```

Sombra mais densa ajuda a placa translúcida a se destacar sobre o fundo bege/marfim.

### 6. Validação obrigatória após build

Rodar Playwright com viewport 1269×634 (igual ao do usuário) e capturar screenshots em scrollY = 0, 600, 1500, 2400, 3300, 4200, 5100. Confirmar visualmente que:

- scrollY=0: placa invisível (gate ativo, ainda no hero).
- scrollY=600: placa entrando pela direita, claramente visível, não sobre a foto da Dra.
- scrollY=1500–4200: placa percorre direita → centro → esquerda com tamanho ≥180px.
- scrollY=5100+: placa invisível (Autoridade).

Se algum screenshot mostrar placa <150px ou opacity <0.7 na zona "ativa", iterar nos valores antes de fechar.

## Arquivos afetados

- **Editar:** `src/components/PlaquinhaJourney.tsx` (apenas: largura base, valores de `WAYPOINTS`, micro-flutuação, sombra, loop rAF contínuo).

Nenhuma mudança em `src/routes/index.tsx`, copy, paleta, tipografia, seções, SEO ou estrutura.

## Não-objetivos

Não mudar a arquitetura, não trocar waypoints por outra abordagem, não instalar libs, não tocar mobile (continua escondida), não tocar `prefers-reduced-motion` (continua escondida).
