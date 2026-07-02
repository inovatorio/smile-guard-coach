
# Corrigir figura do Hero — remover fundo de verdade

O PNG que subi como `dra-jaqueline-hero-cutout.png` ainda carrega fundo branco/quadriculado ao redor da doutora, então no Hero ela aparece dentro de um "cartão" branco sobre a forma verde, em vez de recortada. Preciso gerar um PNG realmente transparente e trocar o asset.

## Passos

1. Rodar `imagegen--edit_image` sobre `user-uploads://dra_jaqueline_capa_2.png` com `transparent_background: true` e prompt curto ("isolate the woman, remove background completely"), salvando em `/tmp/dra-jaqueline-cutout-clean.png`. Isso força fundo branco sólido e depois remove para PNG transparente.
2. Substituir o asset CDN existente:
   - `lovable-assets delete --file src/assets/dra-jaqueline-hero-cutout.png.asset.json`
   - `lovable-assets create --file /tmp/dra-jaqueline-cutout-clean.png --filename dra-jaqueline-hero-cutout.png > src/assets/dra-jaqueline-hero-cutout.png.asset.json`
3. Nenhuma alteração em `src/routes/index.tsx` ou `src/styles.css` — o import já aponta para o mesmo `.asset.json`, então a nova URL entra automaticamente.
4. Verificar visualmente no preview após o swap (Playwright screenshot do Hero) para confirmar que a figura aparece sem o retângulo branco sobre a forma verde.

## Fora de escopo

Layout, motion, textos, links, outras seções.
