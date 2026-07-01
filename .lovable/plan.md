## Reestruturação da seção Avaliação

**Objetivo:** eliminar o espaço vazio ao lado do vídeo e encurtar a seção, integrando as 4 fases (Escuta / Exame clínico / Identificação / Plano de cuidado) diretamente ao lado do vídeo. Remover a duplicação de rótulo/título nos cards.

### Mudanças em `src/routes/index.tsx` (seção Avaliação, ~linhas 369-423)

1. **Remover o bloco intermediário "Diagnóstico / Cada caso tem sinais únicos..."** (linhas 388-409) - é ele que cria o vazio ao lado do vídeo.
2. **Remover o cabeçalho grande em grid separado** (linhas 372-386) e transformá-lo em um cabeçalho compacto centralizado acima do novo bloco.
3. **Criar um único bloco `md:grid-cols-12`** com:
   - **Coluna esquerda (col-span-5):** o `LazyVideoPlayer` (mesma proporção vertical).
   - **Coluna direita (col-span-7):** cabeçalho curto + as 4 fases em `grid-cols-2` compacto (Escuta, Exame clínico, Identificação, Plano de cuidado).
4. **Corrigir duplicação nos cards de fase:** hoje `phase` e `title` têm o mesmo texto ("Escuta" / "Escuta"). Manter apenas o `title` (Fraunces) e remover a exibição do `phase` acima. A estrutura de dados `steps` não muda - apenas o JSX deixa de renderizar `{step.phase}`.
5. **Preservar:** copy do H2 ("O tratamento começa entendendo o seu caso."), texto de apoio, paleta grafite/champagne, animações da plaquinha e todo o resto da página.

### Resultado visual esperado

```text
┌─────────────────── AVALIAÇÃO ───────────────────┐
│  [pequeno cabeçalho centralizado]               │
│                                                  │
│  ┌─────────┐   O tratamento começa entendendo   │
│  │         │   o seu caso.                       │
│  │  VÍDEO  │   [parágrafo de apoio]              │
│  │ (9:16)  │   ─────────────────────             │
│  │         │   ┌ Escuta      ┌ Exame clínico    │
│  │  ▶      │   └ desc curta  └ desc curta       │
│  │         │   ┌ Identificação ┌ Plano cuidado  │
│  └─────────┘   └ desc curta    └ desc curta     │
└──────────────────────────────────────────────────┘
```

Redução estimada de altura da seção: ~35-40% no desktop, eliminando os dois grandes vazios marcados em vermelho.
