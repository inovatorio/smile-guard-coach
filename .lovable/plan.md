## Objetivo
Inserir o vídeo enviado (`video_Dra_Jaqueline.mp4`) no espaço marcado da seção "Avaliação", com botão de play manual (sem autoplay) e otimizado para não pesar no carregamento.

## Passos

1. **Registrar o vídeo como asset via Lovable Assets**
   - Rodar `lovable-assets create --file /mnt/user-uploads/video_Dra_Jaqueline.mp4` gerando `src/assets/video-dra-jaqueline.mp4.asset.json`.
   - Isso mantém o binário fora do repo e serve via CDN (carregamento sob demanda).

2. **Gerar um poster estático leve (thumbnail)**
   - Extrair um frame do vídeo com `ffmpeg` (ex.: segundo 1) → `src/assets/video-dra-jaqueline-poster.jpg` (comprimido, ~1280px).
   - Serve como imagem de capa antes do play - carrega rápido e evita baixar o MP4 no load inicial.

3. **Criar componente `LazyVideoPlayer`** (`src/components/LazyVideoPlayer.tsx`)
   - Estado `isPlaying`. Enquanto `false`: renderiza apenas o `<img>` do poster + botão de play sobreposto (ícone `Play` do lucide, círculo champagne com blur, hover scale).
   - Ao clicar: monta o `<video>` com `preload="none"`, `controls`, `playsInline`, `src` do asset, e dá `.play()`.
   - Isso garante zero download do MP4 até o usuário clicar (performance).
   - Aspect ratio fixo (16:9 ou proporção original) para evitar layout shift.

4. **Integrar na seção Avaliação em `src/routes/index.tsx`**
   - Localizar o bloco vazio abaixo do título "O tratamento começa entendendo o seu caso." (coluna esquerda, acima do bloco "Diagnóstico").
   - Substituir/preencher esse espaço pelo `<LazyVideoPlayer>` com bordas sutis e tratamento visual coerente (moldura fina champagne, radius pequeno) para casar com a estética editorial.

5. **Validação**
   - `bun run build` para garantir integridade.
   - Verificar via preview que: (a) o poster aparece imediatamente, (b) o botão de play está visível e centralizado, (c) o vídeo só carrega ao clicar, (d) responsividade mobile mantida.

## Detalhes técnicos
- `preload="none"` no `<video>` é o que evita o download antecipado.
- Poster JPG de ~80-150KB substitui os megabytes do MP4 no primeiro paint.
- Sem autoplay, sem loop, com controles nativos após o play.
