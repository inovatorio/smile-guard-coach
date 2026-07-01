## Objetivo

Remover a imagem atual das colheres douradas (que destoa da direção clínica premium) e transformar a seção **Estrutura** em um bloco visual pleno: uma foto ampla ocupando a seção inteira, com os 4 cards de diferenciais renderizados logo abaixo em bloco separado.

## Mudanças em `src/routes/index.tsx`

### 1. Nova estrutura da seção
Reescrever o bloco `{/* CLINIC */}` (linhas ~533-565) em duas partes empilhadas:

**Parte A - Foto full-bleed**
- Container `w-screen` com altura `min-h-[70vh] md:min-h-[85vh]`
- Imagem `object-cover` cobrindo 100% do container
- Overlay em gradient sutil (grafite/transparente) na base para legibilidade
- Sobreposto na porção inferior-esquerda: eyebrow "Estrutura" + H2 "Uma clínica preparada para cuidar do seu sorriso com precisão e acolhimento." em tipografia display grande, cor marfim
- Padding interno responsivo (`px-6 md:px-12 pb-16 md:pb-24`)

**Parte B - Cards de diferenciais**
- Bloco separado com fundo marfim padrão, `py-20 md:py-28`
- Mantém o grid `sm:grid-cols-2 lg:grid-cols-4` com os 4 cards já existentes (`clinic.map`)
- Eyebrow curto acima: "O que você encontra"

### 2. Nova imagem
Gerar via `imagegen` uma foto editorial ampla (1920x1200) de consultório odontológico premium:
- Ambiente com luz natural, tons marfim/champagne/madeira clara
- Cadeira odontológica moderna em segundo plano, desfocada
- Detalhes de arquitetura minimalista, sem pessoas
- Estética editorial (Kinfolk / Cereal magazine) - nada de estoque genérico
- Salvar em `src/assets/clinica-estrutura.jpg` e substituir o import `clinicaImg`

### 3. Limpeza
- Remover o `import` e o arquivo antigo `clinica-detalhe.jpg` (colheres douradas) se não for referenciado em outro lugar

## Fora de escopo
- Nenhuma outra seção é alterada
- Direção visual, cores e tipografia permanecem inalteradas
