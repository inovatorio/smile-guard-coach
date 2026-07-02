## Plano — Hero com Interlaçamento (Opção A) + Animação de Entrada

### 1. Reestruturar o layout (remover a sensação de duas colunas)
Em `src/routes/index.tsx`, na `<section>` do Hero:
- Trocar o grid rígido `lg:grid-cols-[1.05fr_0.95fr]` por um **container relativo com posicionamento absoluto** para a imagem no desktop.
- A imagem da Dra. fica ancorada à direita (`right-0 bottom-0`) e cresce até `~55%` da largura, invadindo ~15% da coluna do texto.
- O texto ocupa toda a largura do container (`max-w-3xl` para o parágrafo), permitindo que o título "respire" e passe visualmente *atrás* da imagem, quebrando a divisão de blocos.
- Aumentar levemente o `min-h` do Hero no desktop (`lg:min-h-[600px]`) para acomodar o overlap sem cortar conteúdo.
- No mobile, manter a pilha vertical atual (imagem acima, texto abaixo) — o problema de "duas colunas" só existe no desktop.

### 2. Garantir legibilidade no overlap
- Adicionar um **degradê radial suave** (`radial-gradient`) atrás do texto, do lado esquerdo, no tom `ivory/bone`, para reforçar contraste onde a imagem se aproxima.
- Manter o `z-index` do texto acima da imagem apenas na parte onde há sobreposição do título (a imagem passa por trás da última linha do H1, criando profundidade sem prejudicar leitura).

### 3. Animação de entrada — coreografia em 3 tempos
Sugestão de motion **perceptível mas elegante**, alinhada ao tom editorial:

**Tempo 1 (0–400ms) — Fundo respira**
- O gradiente `hero-bg` faz um leve *fade-in + scale* (de 1.04 para 1) para dar sensação de "câmera se aproximando".

**Tempo 2 (200–1000ms) — Título revelado por máscara (mask-reveal linha a linha)**
- As três linhas do H1 sobem uma a uma de dentro de uma máscara (já temos `.hero-line-mask` / `.hero-line-inner` — vamos reforçar o timing).
- A palavra `apertando` em itálico champagne recebe um **sublinhado dourado que desenha sozinho** (SVG path com `stroke-dashoffset` animado) — 800ms depois do texto aparecer.

**Tempo 3 (600–1400ms) — Imagem entra com parallax sutil**
- A foto da Dra. entra deslizando de baixo (`translateY(40px) → 0`) + fade, com `ease-out-expo` em 900ms.
- Após montada, ganha uma **flutuação contínua muito sutil** (`translateY: 0 ↔ -6px` em 6s, infinita) — dá vida sem distrair.
- Opcional: leve **parallax de mouse** (já temos infraestrutura) — a foto move 6–8px seguindo o cursor.

**Tempo 4 (1200–1600ms) — CTAs e credenciais**
- Botão primário entra com `fade-up` + o pulso dourado (`animate-cta-glow`) que já existe começa após 200ms de montado.
- Lista de credenciais (`+21 anos · ...`) aparece por último, item a item, com stagger de 80ms.

Tudo respeitando `prefers-reduced-motion` — animações desligam completamente, mantendo estado final.

### 4. Detalhes técnicos
- Ajustar `src/styles.css`: adicionar `@keyframes hero-bg-in`, `@keyframes hero-underline-draw`, `@keyframes hero-float-subtle` e classes utilitárias correspondentes.
- Refinar delays das classes `.hero-anim-*` existentes para casar com a nova coreografia.
- Adicionar SVG inline decorativo do sublinhado dourado sob "apertando" com `pathLength` animado.

### Resultado esperado
- **Antes:** Dois blocos lado a lado com borda mental clara entre texto e foto.
- **Depois:** Uma composição integrada em que a imagem e o texto se entrelaçam, com uma entrada coreografada que guia o olhar da tipografia para a foto, terminando no CTA.

Posso implementar?
