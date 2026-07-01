## Reorganizar cabeçalho da seção Avaliação

**Objetivo:** mover o rótulo "Avaliação" + H2 "O tratamento começa entendendo o seu caso." do topo centralizado para o lado do vídeo, seguindo o padrão editorial das demais seções.

### Mudança em `src/routes/index.tsx` (seção Avaliação)

Novo layout `md:grid-cols-12`:

- **Coluna esquerda (col-span-5):** `LazyVideoPlayer` (inalterado).
- **Coluna direita (col-span-7):** empilhado verticalmente
  1. Rótulo "Avaliação" (mono, champagne)
  2. H2 "O tratamento começa entendendo o seu caso." (Fraunces, escala mantida)
  3. Parágrafo de apoio ("Nem todo bruxismo é igual...")
  4. Grid 2x2 das 4 fases (Escuta, Exame clínico, Identificação, Plano de cuidado)

Remover o bloco centralizado atual acima do grid. Alinhamento do grid muda de `items-center` para `items-start` para que o cabeçalho comece no topo do vídeo. Toda a demais estrutura (paleta, tipografia, animações) permanece.
