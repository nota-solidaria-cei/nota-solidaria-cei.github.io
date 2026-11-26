# Fotografias originais

Coloque aqui, **sem editar**, as fotos e artes originais enviadas pela instituição (o Instagram do CEI é
`@meteresadecalcuta`). Só use fotos que sejam do próprio CEI e que ele tenha autorizado. Esta pasta é o arquivo de preservação:

- Nunca recorte, filtre ou retoque os arquivos desta pasta.
- Nenhum script do projeto altera ou apaga o que está aqui.
- O Git ignora tudo aqui, **exceto este README e `photos.json`**. As fotos podem mostrar crianças e
  dependem de autorização da instituição para publicação.
- **Nunca coloque aqui capturas do portal da Nota Fiscal Paulista com CPF, nome ou saldo visíveis** se o
  repositório for público ou se a pasta for compartilhada.
- A subpasta `portal/` guarda as capturas das telas do portal usadas no passo a passo (já sem dados pessoais).
  `npm run portal` converte para `src/assets/tutorial/`. Veja o README principal.

## Como as fotos chegam ao site

1. Copie os originais para esta pasta.
2. Descreva cada foto em `photos.json`:
   ```json
   {
     "source": "02-perfil-grade.jpg",
     "group": "gallery",
     "name": "piquenique-literario",
     "crop": { "left": 3, "top": 253, "width": 265, "height": 300 },
     "alt": "Piquenique literário: toalha xadrez vermelha, livros e copos no chão",
     "caption": "Piquenique literário",
     "publish": true
   }
   ```
   - `group`: `hero` (círculo do topo, só uma), `about` (colagem do "Sobre": a 1ª foto vai no círculo grande, a 2ª e a 3ª
     nos pequenos; use recortes quadrados e centralizados) ou `gallery`.
   - `crop`: retângulo em pixels que remove **só** a interface do Instagram (cabeçalho, contador 1/9,
     ícone de carrossel). O script confere se o recorte cabe na imagem.
   - `alt`: descreva apenas o que a foto realmente mostra.
   - `"publish": false` deixa a foto preparada, mas fora do site (use para fotos com rostos
     identificáveis até haver autorização). A ordem do arquivo é a ordem na página.
3. Na raiz do projeto, rode `npm run images` e depois `npm run dev` para conferir.

Prefira fotos de costas, mãos, detalhes de atividades e ambientes. Evite rostos identificáveis em
cartazes e só publique o que a instituição autorizou. Imagens pequenas não são ampliadas: para mais
qualidade, use os arquivos originais em alta resolução.
