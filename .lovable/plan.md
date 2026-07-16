## Plano

1. Ajustar o bloco de imagem da seção **Tratamentos** apenas no desktop.
2. Remover o corte que deixa o texto embutido da imagem aparecendo parcialmente à esquerda.
3. Centralizar visualmente a composição da imagem dentro da faixa.
4. Manter a legenda sobreposta apenas no mobile, como já está hoje.
5. Preservar a altura compacta da seção para não aumentar novamente o bloco.

## Alteração técnica prevista

- Em `src/routes/index.tsx`, no `<img>` usado para desktop (`tratamentosDesktopImg`):
  - trocar o enquadramento de `object-center` para um posicionamento mais controlado, como `object-[center_42%]` ou similar;
  - se necessário, usar `object-contain` com fundo neutro apenas se o texto da própria imagem continuar sendo cortado de forma ruim;
  - manter `hidden lg:block` e manter o `<figcaption>` como `lg:hidden` para evitar texto sobreposto no desktop.

## Resultado esperado

No desktop, a imagem ficará centralizada e sem a aparência de dois textos/legenda cortada, mantendo a seção menor e sem impactar o layout mobile.