# Plano: Compactação Editorial Premium

## Diagnóstico dos anexos

1. **Cards Sintomas / Consequências / Tratamentos / Estrutura**: padding interno ~48-56px, títulos serifados em text-3xl/4xl, descrições em text-lg com line-height 1.75 - cada card ocupa ~200px de altura desnecessariamente.
2. **Bloco de estatísticas (+21 / +24.256 / 02)**: números em text-8xl/9xl com padding vertical ~120px, empurram outras seções para fora da fold.
3. **Gaps entre cards**: gap-8/gap-12 no grid está gerando muito ar entre elementos.

## Ajustes (Compacto Editorial)

**Cards de conteúdo** (`Sintomas`, `Consequências`, `Tratamentos`, `Estrutura`):
- Padding: `p-10/p-12` → `p-6 md:p-7`
- Título do card: `text-3xl/4xl` → `text-xl md:text-2xl`
- Descrição: `text-lg leading-relaxed` → `text-sm md:text-base leading-snug`
- Gap do grid: `gap-8/12` → `gap-4 md:gap-5`
- Altura mínima removida onde exista

**Bloco de estatísticas** (faixa horizontal enxuta):
- Container: reduzir `py-24/py-32` → `py-12 md:py-14`
- Números: `text-8xl/9xl` → `text-5xl md:text-6xl`
- Labels (EXPERIÊNCIA/PACIENTES/ESTRUTURA): manter `text-xs tracking-widest`
- Descrições abaixo: `text-base` → `text-sm`, max-width menor
- Layout: garantir 3 colunas em uma linha só (desktop), sem quebra
- Manter animação de contagem do `AnimatedNumber`

**Espaçamentos globais de seção**:
- Manter títulos H2 principais (`Identifique-se`, `Consequências`) no tamanho atual - o usuário aprovou.
- Reduzir `py-20/24` das seções internas de cards para `py-14 md:py-16`.
- Reduzir margin entre header da seção e grid de cards de `mt-16` para `mt-8/10`.

## Arquivos afetados

- `src/routes/index.tsx` - ajustar classes Tailwind nos 4 blocos de cards + bloco de estatísticas.
- Nenhum novo componente, nenhuma mudança de estrutura, nenhuma mudança de copy.

## Resultado esperado

No desktop 1440px, o lead verá:
- Bloco de estatísticas inteiro em uma tela.
- Grid de 4 cards (Sintomas/Consequências) visível em uma tela sem scroll.
- Redução aproximada de 30-35% na altura total da LP.
- Direção visual, cores, fontes e narrativa da plaquinha permanecem intactas.
