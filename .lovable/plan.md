## Remover animação da plaquinha no scroll

A animação da plaquinha percorrendo a página está concentrada no componente `PlaquinhaJourney` e no seu uso dentro de `src/routes/index.tsx`. A remoção será feita apenas desligando o componente da página, sem apagar o arquivo (preservando o ativo caso queira reutilizá-lo no futuro).

### Mudanças

1. **src/routes/index.tsx**
   - Remover o import do `PlaquinhaJourney`.
   - Remover a declaração `const journeyRef = useRef<HTMLDivElement>(null);`.
   - Remover a renderização `<PlaquinhaJourney wrapperRef={journeyRef} />`.
   - Converter o `<div ref={journeyRef} className="relative">` em fragmento `<>...</>` para não deixar um wrapper sem função.

2. **src/components/PlaquinhaJourney.tsx**
   - Não será alterado; o arquivo fica inativo na árvore de componentes.

### Resultado esperado

A plaquinha não aparece mais flutuando/sobrepondo as seções durante o scroll. As demais animações da página (hero, números, FAQ, vídeo etc.) continuam intactas.
