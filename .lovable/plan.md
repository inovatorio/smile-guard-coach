# Refinamentos da landing page da Dra. Jaqueline

Mantendo 100% da identidade visual atual (Fraunces + Inter, paleta ivory/champagne/graphite, layout editorial). Todas as mudanças concentradas em `src/routes/index.tsx` e pequenos ajustes em `src/styles.css`.

## 1. Consistência "+21 anos"

Auditoria já feita: hero (linha 248), bio (490), stats (316) e CTA final (503) já dizem "+21 anos". Nenhuma menção a "+12 anos" foi encontrada. Vou fazer um `grep` final antes de fechar e, se surgir alguma variação ("12 anos", "doze anos", "desde 20XX"), padronizar para "+21 anos" / "formada em 2004". Sem alterações estruturais.

## 2. Nova seção de prova social (Google)

Nova `<section id="avaliacoes">` inserida entre a seção da Dra. Jaqueline (termina ~linha 520) e a FAQ. Layout editorial em coluna única centralizada, com bastante respiro (`py-20 md:py-28`, fundo `bg-bone` com borders sutis para separar do bloco anterior).

Composição:

- Label mono champagne: "Reputação" (mesmo padrão de "Identifique-se", "Consequências").
- Linha horizontal de 5 estrelas douradas preenchidas (`lucide-react` `Star` com `fill="currentColor"` e `text-champagne`, tamanho ~28px, gap generoso).
- Bloco grande com "5,0" em Fraunces (`text-7xl md:text-8xl`, graphite) ao lado ou acima de "+670 avaliações no Google" (`text-2xl md:text-3xl` Fraunces italic champagne).
- Texto de apoio pequeno em Inter graphite/70: "Somando as unidades de Vila Formosa e São Miguel Paulista."
- Selo discreto do Google: pequeno ícone "G" colorido oficial (inline SVG com as 4 cores Google) + texto mono "Google Reviews" logo abaixo do bloco numérico. Alinhado à esquerda do bloco, discreto.
- CTA secundário `GhostCta` opcional: "Agendar avaliação pelo WhatsApp" para não deixar a seção sem porta de saída.

Sem depoimentos individuais - apenas os números agregados solicitados.

## 3. Hero: unificar CTA principal

Bloco atual (linhas 243-246) tem dois botões primários equivalentes. Novo tratamento:

- Manter apenas `PrimaryCta` com label "Agendar avaliação pelo WhatsApp" (usar `ctaPrimaryHref`).
- Remover o `GhostCta` "Tenho dor na mandíbula" desse lugar; transformar em um `<a>` de texto secundário logo abaixo do botão: fonte Inter, `text-sm text-graphite/70 underline underline-offset-4 decoration-champagne/40 hover:text-graphite`, apontando para o mesmo WhatsApp com a mensagem antiga ("Tenho dor na mandíbula, quero avaliar").
- Micro-texto de redução de risco imediatamente abaixo do botão (antes do link secundário): mono `text-[11px] uppercase tracking-[0.18em] text-graphite/60`, conteúdo "Avaliação sem compromisso · resposta no mesmo dia".
- Constante `CTA_PRIMARY` atualizada para "Agendar avaliação pelo WhatsApp" (garantir que outras aparições do rótulo continuem coerentes; se algum uso pedir texto diferente, passar label explícito naquele CTA).

## 4. Sticky mobile CTA

Já existe (linha 713-718) apontando para `ctaFinalHref`. Ajustes:

- Trocar label para "Agendar pelo WhatsApp".
- Substituir cores para reforçar identidade dourada: `bg-graphite text-champagne border border-champagne/40` com `hover:bg-champagne hover:text-graphite`. Manter shadow elevado e visibilidade só em `md:hidden`.
- Ícone `MessageCircle` (lucide) 14px antes do texto.
- Garantir `pb-24 md:pb-0` no `<main>` para o botão não cobrir conteúdo final no mobile.

## 5. Ajustes de estética e legibilidade

### Contraste
Passe global nas classes de texto de apoio (`text-graphite/55`, `/60`, `/65`) e labels champagne sobre fundo claro:

- Textos de apoio cinza: subir de `/55` e `/60` para `/75`; `/65` vira `/78`. Mantém a leveza mas alcança contraste ≥ 4.5:1 sobre ivory/bone.
- Labels mono champagne sobre fundo claro: escurecer o token champagne apenas quando usado como label pequeno criando classe utilitária `.label-mono` em `src/styles.css` (`color: color-mix(in oklch, var(--champagne) 78%, var(--graphite))`). Aplicar em todos os `<p className="font-mono ... text-champagne">` de labels de seção. Não muda a cor champagne dos elementos decorativos ou destaques em H1.

### Ícones nos cards de Sintomas e Consequências
Adicionar um ícone `lucide-react` line-only (`strokeWidth={1.25}`, `size={22}`, `text-champagne`) no topo de cada card, acima do título, com `mb-4`. Mapear ícones semânticos por item:

- Sintomas: `Sunrise` (dor ao acordar), `Brain` (dor de cabeça), `Activity` (tensão facial), `Zap` (sensibilidade), `Waves` (estalos), `Moon` (ranger noturno) - ajustar conforme lista real no arquivo.
- Consequências: `TriangleAlert`, `Layers`, `HeartPulse`, `Shield`, etc., um por card.

Ícones ficam decorativos (`aria-hidden`), não substituem título. Traço fino preserva o tom editorial.

### Hero mobile
No grid do hero (linha 232), reordenar visualmente no mobile:

- Adicionar `order-2 md:order-1` na coluna de texto principal mantendo `md:col-span-7`.
- Coluna da imagem recebe `order-1 md:order-2`.
- Separar o bloco de credenciais (`<ul>` linha 247-253) em um sub-fragmento com `order-3` que aparece depois da imagem no mobile.

Estrutura mobile final: headline + parágrafo curto + CTA + micro-texto → foto → credenciais. Desktop permanece idêntico (texto à esquerda, foto à direita).

## Detalhes técnicos

- Novos imports em `src/routes/index.tsx`: `Star`, `MessageCircle` e ícones de cards do `lucide-react`.
- Arrays `symptoms` e `consequences` ganham campo opcional `icon` (LucideIcon). Render usa `<Item.icon />` quando presente.
- Constante `CTA_PRIMARY` renomeada só se necessário; caso contrário, sobrescrever label no local do hero.
- `src/styles.css`: adicionar utilitária `.label-mono` (color-mix champagne/graphite) e nada mais - sem tocar em tokens base.
- Sem mudanças em `PlaquinhaJourney`, LazyVideoPlayer, footer, FAQ ou dados de contato.
- Nenhum link/número de WhatsApp alterado; reaproveitar helpers `ctaPrimaryHref`, `ctaSecondaryHref`, `ctaFinalHref` já existentes.

## Fora do escopo

- Nenhuma alteração de tipografia, paleta base, layout de footer, FAQ, seção Estrutura, vídeo, Plaquinha.
- Nenhum depoimento textual inventado; apenas números agregados (5,0 e +670).
