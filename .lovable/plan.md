## Objetivo

Corrigir a apresentação da imagem na seção "Tratamentos" (desktop) que ficou cortada e com muito espaço vazio depois que a figura passou a ocupar a linha inteira.

## Diagnóstico

A imagem atual é vertical (1280×1600). Ao ocupar `lg:col-span-12` em uma faixa alta, o `object-cover` corta severamente as laterais e mostra apenas uma tira à esquerda, deixando o restante como um degradê cinza vazio.

## Alterações (apenas desktop, mobile intacto)

Arquivo: `src/routes/index.tsx` — bloco `<figure>` da seção `#tratamento` (linha ~574).

1. Reduzir a altura da faixa no desktop de `lg:min-h-[420px]` para algo mais discreto (`lg:min-h-[240px]` ou `lg:h-[260px]`), mantendo o `min-h-[220px]` do mobile.
2. Adicionar `object-center` (ou `object-[center_40%]`) ao `<img>` do desktop para centralizar o recorte na parte principal da composição, em vez de cortar pela esquerda.
3. Ajustar o gradiente/legenda para continuar legível na faixa mais baixa (posicionamento do `figcaption` inalterado, apenas verificar que o texto "Cada conduta é desenhada..." caiba bem no formato horizontal).

Nada muda em:
- Layout mobile (a imagem vertical continua com `min-h-[220px]` e `object-cover` como antes).
- Ordem/quantidade dos cards de tratamento.
- Estilos globais.

## Resultado esperado

No desktop, a faixa da imagem fica com altura proporcional (~260px), a foto aparece centralizada e sem espaço vazio cinza à direita, e a legenda permanece sobre o gradiente inferior.