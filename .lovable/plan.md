## Objetivo
Manter a foto imponente ocupando a metade direita do Hero desktop, garantindo que (a) a cabeça não seja cortada no topo e (b) haja respiro entre a borda direita da imagem e a borda da seção.

## Diagnóstico
Hoje a imagem está com `absolute -right-[6%] w-[64%] h-full max-h-[640px] object-contain object-bottom`. Dois problemas:
- `-right-[6%]` faz ela sangrar pra fora à direita → sem respiro.
- `object-contain` + `h-full` encolhe a foto pra caber na altura da seção, então em vez de imponente ela fica estreita.
- Como a altura do Hero é curta (`lg:min-h-[640px]`), ao tentar mostrar a foto grande ela é forçada a cortar a cabeça.

## Correção (`src/routes/index.tsx` + `src/styles.css`)

1. **Ancorar a imagem à direita com respiro**: trocar `-right-[6%]` por `right-[3%]` (ou `right-6`). Fim do sangramento — a foto encosta na margem interna do container com folga.
2. **Deixar a foto grande e natural**: remover `object-contain` e `h-full`. Usar `w-[52%] max-w-[620px] h-auto` e alinhar ao rodapé (`items-end`). A imagem assume proporção real e "planta" no chão do Hero.
3. **Dar altura suficiente pra caber a foto inteira**: subir `lg:min-h-[640px]` para `lg:min-h-[760px]`. Isso resolve o corte da cabeça sem precisar diminuir a foto.
4. **Ajustar coluna de texto** de `lg:max-w-[62%]` para `lg:max-w-[54%]` — evita sobreposição desagradável com a foto agora que ela está mais recuada da borda, mantendo a leitura em camadas (texto na frente, foto atrás/ao lado).
5. **Reposicionar o glow radial** (`.hero-text-glow::before`) pra cobrir só a zona do texto, sem invadir a foto.
6. **Manter animações, mobile e credenciais** como estão.

## Validação
Playwright headless em `localhost:8080`: screenshot desktop @1280×1800 confirmando foto grande, cabeça inteira visível, respiro à direita; screenshot mobile @390 pra garantir que nada quebrou lá.