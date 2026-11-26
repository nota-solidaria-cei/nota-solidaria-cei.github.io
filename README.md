# Nota Solidária — CEI Madre Teresa de Calcutá

Landing page estática (React + TypeScript + Vite + Tailwind CSS) da campanha **Sua nota transforma vidas.**
Sem backend, sem banco de dados, sem login, sem rastreamento e sem custos recorrentes.

## Rodar no computador

```bash
npm install
npm run dev        # http://localhost:5173
npm run dev -- --host   # para abrir pelo celular na mesma rede Wi-Fi
npm run build      # valida o TypeScript e gera a pasta dist/
```

## Onde editar

| O que mudar | Arquivo |
| --- | --- |
| Telefones, endereço, CNPJ, Pix, WhatsApp, e-mail | `src/config/institution.ts` |
| Textos da campanha, FAQ, história, mensagem de compartilhamento, **materiais em PDF** | `src/config/campaign.ts` |
| Fotos e legendas | `src/config/photos.ts` + `src/assets/images/` |
| Cores e degradês | `src/styles/globals.css` (variáveis no topo) |

Use sempre a expressão **"mais de 160 crianças"** (`institution.childrenLabel`).

## Fotografias reais

Cada foto é descrita em **`originals/photos.json`** (arquivo de origem, recorte em pixels que remove só a
interface do Instagram, texto alternativo, legenda e `"publish": true/false`). Depois:

```bash
npm run images   # gera os WebP em src/assets/images/ e photos.meta.json (sem filtros, cores ou retoques)
```

Os arquivos de `originals/` nunca são alterados. Sem fotos, a página usa **ilustrações próprias** (não são fotos).

**Situação atual:** estão publicados o hero (crianças à mesa com bolo, foto enviada pela instituição), a colagem
do "Sobre" (fachada do CEI + parede musical + carrossel; a ordem no manifesto é a ordem dos círculos,
do maior para os menores) e 8 fotos na galeria. **Fotos com rostos identificáveis estão preparadas, mas fora do
site** (`"publish": false` no manifesto). Quando a instituição autorizar, troque para `true` e rode
`npm run images`. A foto do hero mostra rostos de crianças: confirme a autorização das famílias.

**Atenção:** em repositório público, tudo o que for commitado é público — inclusive `src/assets/images/`.
Os originais ficam fora do Git (`.gitignore`); só o manifesto é versionado. Muitas fotos vêm de capturas de tela
de baixa resolução: peça ao CEI os arquivos originais para uma qualidade melhor (o script nunca amplia imagens).

## Publicar de graça no GitHub Pages

**Endereço atual: https://nota-solidaria-cei.github.io/** — site de organização do GitHub. Ele só existe porque a
organização se chama `nota-solidaria-cei` e o repositório se chama exatamente `nota-solidaria-cei.github.io`
(`https://github.com/nota-solidaria-cei/nota-solidaria-cei.github.io`). **Não renomeie nenhum dos dois**: o endereço
(e o QR Code impresso) deixaria de funcionar. Quem for dono da organização pode adicionar outras pessoas em
Settings → People. Para mexer no site, basta dar `git push` na branch `main`: o deploy é automático.

Para publicar um projeto parecido do zero:

1. Crie um repositório no GitHub e envie o código (branch `main`).
2. Em **Settings → Pages → Build and deployment → Source**, escolha **GitHub Actions**.
3. O workflow `.github/workflows/deploy.yml` roda a cada push, faz o build e publica.
   A URL fica em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/` (aparece na aba Actions).
4. **A URL não pode mudar depois do QR Code impresso.** Escolha agora o nome definitivo do repositório
   e o dono (usuário ou organização). Renomear o repositório muda a URL.
   Para um endereço próprio (ex.: `notasolidaria.org.br`), configure em Settings → Pages → Custom domain.

O build usa caminhos relativos, então funciona tanto em `usuario.github.io/repo/` quanto em domínio próprio.
A URL pública é injetada automaticamente nas meta tags de compartilhamento (Open Graph).

## QR Code (só depois de publicar)

```bash
npm run qr -- https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/
npm run qr -- https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/#parceiro parceiro   # QR para comerciantes
```

Gera `qr/…svg` (vetorial, para A3/A4) e `qr/…png`. É um QR **estático**, offline, que nunca expira nem
depende de serviço de terceiros. O script recusa URLs locais ou sem https.
**Teste com pelo menos dois celulares antes de imprimir.**

### Links diretos úteis (cada um pode virar um QR diferente)

- `…/#tutorial` abre direto o passo a passo da doação automática
- `…/#parceiro` abre direto a área de comerciantes
- `…/#notas` notas sem CPF · `…/#pix` doação via Pix

## Capturas do portal no passo a passo

As telas reais do portal da Nota Fiscal Paulista ficam em `originals/portal/` (`01-menu.png`, `02-adesao.png`,
`03-pesquisa.png`, e, quando houver, `04-confirmacao.png` e `05-aviso.png`).

```bash
npm run portal   # gera src/assets/tutorial/*.webp (sem perdas) e shots.json
```

Os retângulos amarelos de destaque e os textos alternativos estão em `src/config/tutorialShots.ts`
(coordenadas em pixels da imagem processada). Uma captura que não existir não aparece no tutorial. O "olhinho"
(**Ver tela maior**) abre a captura ampliada.

**Nunca use capturas com CPF, nome, e-mail, telefone ou saldo visíveis.** Recorte na origem antes de salvar.

## Banner e imagem de divulgação

O painel "Tenho um comércio" oferece o **banner** para baixar e a **imagem de divulgação** para as redes.

**Banner:** é a arte pronta da instituição, `public/materials/banner-nota-solidaria.png` (1055 × 1491 px, proporção A4/A3,
com o QR Code de `https://nota-solidaria-cei.github.io/` dentro; a leitura foi conferida). Para trocar, substitua esse
arquivo mantendo o nome e envie com `git push`. O original fica em `originals/` (fora do Git). Para imprimir em A3 vale pedir
a arte em alta resolução (a recomendação é 3508 × 4961 px para A3 e 2480 × 3508 px para A4). **Se o endereço do site mudar,
o QR Code precisa ser refeito.**

**Imagem de divulgação (redes) e prévia de link:** são geradas, sem fotos e sem serviços externos, com:

```bash
npm run materials                        # sem QR Code (traz o passo a passo e o CNPJ)
npm run materials -- https://nota-solidaria-cei.github.io/   # com QR Code da página publicada
```

O comando gera `public/materials/divulgacao-nota-solidaria.png` e `public/og-image.png` (a imagem que aparece na prévia
do link no WhatsApp e no Facebook). Ele **não** mexe no banner. Precisa do Google Chrome ou Edge instalado (ou
`CHROME_PATH`). Os textos vêm de `src/config/institution.ts`; a legenda sugerida para as redes está em
`campaign.socialCaption` (`src/config/campaign.ts`).

**Compartilhar nas redes:** WhatsApp e Facebook abrem a tela de compartilhamento deles com a mensagem e o link da
página (a prévia usa a imagem Open Graph). O Instagram não aceita publicar direto por um site: no celular o botão
abre a lista de apps com a imagem pronta; no computador baixa a imagem, copia a legenda e abre o Instagram.

Os botões **CEI vai até você** (cards do banner e da urna) abrem o WhatsApp do CEI com a mensagem
`campaign.volunteerSpaceWhatsappMessage`.

## Outros materiais em PDF para download

Coloque o PDF em `public/materials/` e adicione em `materials` (`src/config/campaign.ts`).
Enquanto a lista estiver vazia, nada aparece na página — nunca há botão quebrado.

## Decisões de conteúdo (verificadas no portal oficial)

- **Caminho na NFP (conferido em capturas da tela real do portal):** *Entidades › Doações de Cupons com
  CPF (automática)* → botão **Pesquisar** → *Por CNPJ* → informar o CNPJ → **Pesquisar** → selecionar a
  entidade → **Avançar** → **Confirmar Doação Automática**. O guia escrito da Fazenda usa um rótulo
  levemente diferente ("Doação de Cupons Com CPF (Automática)"); vale o que aparece na tela.
- **Da própria tela de adesão:** o período aparece como *Indeterminado*, a doação vale a partir do
  primeiro dia do mês seguinte, e interromper ou trocar de entidade é feito pelo site ou app oficial.
  Isso está no tutorial e no FAQ.
- **Prazo de notas sem CPF:** o folder fala em 40 dias, mas o guia oficial diz que a doação de documento
  sem CPF pode ser feita **até o dia 20 do mês seguinte** ao da emissão. A página usa a regra oficial e
  pede para entregar "o quanto antes". **Confirme com a direção do CEI** qual prazo vale na prática.
- **Prêmios:** o guia oficial informa bilhetes a cada R$ 100,00 em cupons doados; está no FAQ com essa fonte.
- **Não há** valores arrecadados, metas, depoimentos ou estatísticas inventadas, nem selos de certificação.
- Regras detalhadas de sorteio **não** foram descritas (só o que o guia oficial informa).
- **Capturas de tela do portal:** ainda não estão no tutorial. As que foram enviadas continham CPF, nome e
  saldo de uma conta real, então só podem entrar **recortadas** (sem esses dados). Nunca commite capturas
  completas do portal.

## Acessibilidade e contraste

Medido com pixels reais em 320, 375, 430, 768, 1024 e 1440 px: todo texto da página atinge WCAG AA
(4,5:1; 3:1 para texto grande). Para isso, três degradês foram ajustados em relação à especificação:
o hero (ciano à direita e azul profundo atrás do texto), "Doe suas notas" e "Tenho um comércio"
(véu escuro só na metade do texto, mantendo o canto superior vibrante). Há `focus-visible`, link
"Pular para o conteúdo", diálogos nativos (`<dialog>`) com foco preso e ESC, e respeito a
`prefers-reduced-motion`.

## Privacidade

A página não coleta CPF, senhas, dados bancários ou dados pessoais, não usa cookies nem analytics,
e a fonte (Outfit) é servida pelo próprio site. Todo o cadastro acontece no portal oficial da NFP.
