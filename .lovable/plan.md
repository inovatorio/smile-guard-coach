## Plano

1. **Substituir a imagem do Hero**
   - Fazer upload da nova foto (`capa_4_dra_jaqueline.png`) como Lovable Asset.
   - Verificar se há fundo branco residual; se sim, aplicar `imagegen--edit_image` com `transparent_background: true` para garantir PNG realmente transparente.
   - Atualizar `src/assets/dra-jaqueline-hero-cutout.png.asset.json` apontando para a nova imagem.

2. **Ajustar enquadramento no Hero**
   - Em `src/routes/index.tsx`, revisar a escala/posicionamento da figura no `HeroStage` para **não cortar a cabeça** (reduzir a altura de 122% e reposicionar `object-position` para o topo).
   - Reequilibrar o overlap com o texto para manter a composição integrada.

3. **Degradê de transparência na base**
   - Aplicar um `mask-image` linear-gradient na `<img>` da figura (fade-to-transparent nos ~15% inferiores) para dissolver o corte das pernas de forma orgânica.
   - Adicionar utilitário CSS `.hero-figure-fade` em `src/styles.css`.

4. **Verificação visual**
   - Rodar Playwright para conferir: sem fundo branco, cabeça inteira visível, base com fade suave.
