## Objetivo
Resolver em definitivo os 3 pontos reportados no Hero de `src/routes/index.tsx` + `src/styles.css`, sem mudar a direção visual.

## 1. Animação de entrada — fazer disparar de fato
Diagnóstico: as classes existem, mas hoje o disparo depende só de `animation ... both` no mount. Se o CSS carrega antes do JSX pintar, algumas keyframes já rodaram invisíveis; e qualquer `prefers-reduced-motion` desabilita tudo silenciosamente.

Correções:
- Adicionar um trigger explícito via `useEffect` que aplica a classe `.hero-play` no `<section>` no próximo frame (`requestAnimationFrame`). Todas as animações passam a herdar de `.hero-play .hero-fade-up-lg`, `.hero-play .hero-line-inner`, `.hero-play .hero-figure-in-anim`, `.hero-play .hero-underline path`, `.hero-play.hero-bg-anim`.
- Estado inicial explícito (opacity:0, translateY, clip-path) para que o "antes" seja visível e o "depois" perceptível.
- Aumentar amplitude: título com mask-reveal 120% + translateY 40px, figura entrando de +80px com fade, sublinhado dourado desenhando em 900ms, CTAs e credenciais com stagger de 120ms.
- `prefers-reduced-motion`: manter suporte, mas garantir fade curto (200ms) em vez de anular tudo — assim o usuário sempre percebe movimento.

## 2. Quebrar a sensação de "duas colunas"
Hoje: texto ocupa metade esquerda, foto ocupa `w-[54%]` fixa à direita. Isso lê como grid.

Mudanças no desktop (`lg:`):
- Foto sobe a `w-[62%]` e é ancorada com `right:-4%` (sangra pra fora do container).
- Texto ganha `lg:max-w-[62%]` e o H1 avança até `lg:pr-0`, com a última linha ("sem perceber.") passando por trás da silhueta da foto (z-index do texto acima do gradiente, abaixo da figura; a foto tem recorte transparente então há entrelaçamento real).
- Bloco de credenciais sai da coluna do texto e vira uma faixa horizontal full-width logo abaixo do H1/subtítulo, com divisor dourado fino — elimina o eixo vertical duplo.
- Glow radial (`.hero-text-glow::before`) reposicionado atrás do H1 para garantir legibilidade na zona de sobreposição.

Resultado: uma única composição em camadas (background → texto → figura sangrando), não duas colunas.

## 3. Reverter tipografia de "apertando"
Remover:
- Fonte itálica Fraunces (`.hero-em` em Fraunces italic).
- SVG `hero-underline` ondulado.

Aplicar o estilo anterior aprovado:
- `apertando` em Inter, mesmo peso do resto do H1, cor `--color-petrol` (verde-petróleo) e um sublinhado sólido reto dourado (`border-bottom: 3px solid var(--color-gold)`) que continua com a animação de "desenhar" via `clip-path` (0 → 100% da esquerda pra direita, 900ms).

## Arquivos
- `src/routes/index.tsx` — trigger `.hero-play`, reestrutura de colunas do Hero desktop, remoção do `<em>` cursivo e do SVG.
- `src/styles.css` — estados iniciais, seletores `.hero-play *`, novo sublinhado reto, ajustes de largura/offset da figura, glow reposicionado, bloco `prefers-reduced-motion` com fade curto.

## Validação
Após implementar: Playwright headless em `localhost:8080`, screenshots em 3 momentos (0ms, 400ms, 1400ms) para confirmar que o movimento é visível; screenshot desktop @1280 e mobile @390 para confirmar que não parece mais 2 colunas.
