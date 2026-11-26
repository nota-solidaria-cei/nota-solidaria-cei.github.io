import { institution } from './institution';

/** Textos e configurações da campanha. */
export const campaign = {
  name: 'Nota solidária.',
  pageTitle: 'Nota Solidária | CEI Madre Teresa de Calcutá',
  slogan: 'Sua nota transforma vidas.',
  tagline: 'Pequenos gestos, grandes futuros.',

  /** Mensagem usada no compartilhamento (a URL pública é anexada automaticamente). */
  shareMessage: `Você sabia que suas compras podem ajudar ${institution.childrenLabel} sem gastar nada a mais? Conheça a campanha Nota Solidária do ${institution.name} e descubra como ativar a doação automática da Nota Fiscal Paulista.`,

  merchantWhatsappMessage: `Olá! Conheci a campanha Nota Solidária do ${institution.name} e gostaria de saber como meu estabelecimento pode participar.`,
  /** Botão "CEI vai até você" (cards do banner e da urna). */
  volunteerSpaceWhatsappMessage: 'Sou um parceiro e quero voluntariar meu espaço.',

  /**
   * Artes prontas da instituição, em public/materials/ (para trocar, substitua o arquivo mantendo o nome):
   *  - banner para imprimir: PNG com QR Code (o PDF é feito a partir dele por `npm run materials`);
   *  - imagem quadrada para compartilhar nas redes sociais.
   */
  banner: { file: 'banner-nota-solidaria.png', pdf: 'banner-nota-solidaria.pdf' },
  promoImage: {
    file: 'divulgacao-nota-solidaria.png',
    alt: `Imagem de divulgação da campanha Nota Solidária, com a foto de uma criança tocando instrumentos musicais e os textos "Sua nota transforma vidas", "Ajude ${institution.childrenLabel} com as compras que você já faz" e "Ative a doação automática da Nota Fiscal Paulista".`,
  },
  /** Legenda sugerida ao divulgar nas redes (a URL pública é anexada automaticamente). */
  socialCaption: `Sua nota transforma vidas! Ajude ${institution.childrenLabel} sem gastar nada a mais: ative a doação automática da Nota Fiscal Paulista para o ${institution.name} (CNPJ ${institution.cnpj}). ${institution.instagram.handle} #NotaSolidária`,
  notesWhatsappMessage: `Olá! Vi a campanha Nota Solidária do ${institution.name} e tenho uma dúvida sobre a doação de notas fiscais.`,

  /**
   * Crédito no rodapé ("Desenvolvido por ..."), com link para o GitHub da desenvolvedora.
   * Cole o link do perfil em `githubUrl` (ex.: https://github.com/usuario). `label` é opcional: se ficar vazio,
   * aparece o usuário que está no link. Enquanto `githubUrl` estiver vazio, o crédito NÃO aparece.
   */
  developer: { label: '', githubUrl: 'https://github.com/gabriellalobo' },

  /**
   * Formulário (Google Forms) para quem quer uma página como esta, sem custo, feita pela desenvolvedora.
   * Cole aqui o link do formulário (ex.: https://forms.gle/xxxx). Enquanto `url` estiver vazio, o convite
   * NÃO aparece no rodapé: nenhum link quebrado.
   */
  developerForm: {
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSfhO9c193I13dkycnRnLYZeYeh4stEfWyNEMMiI7AScxwTAMw/viewform',
  },

  /**
   * Materiais para download (cartazes, panfletos...).
   * Enquanto a lista estiver vazia, NADA é exibido — nenhum botão quebrado.
   * Para publicar um material: coloque o PDF em public/materials/ e adicione aqui:
   *   { title: 'Cartaz A4', description: 'Para o caixa', file: 'cartaz-a4.pdf' }
   */
  materials: [] as { title: string; description?: string; file: string }[],
};

export const faqItems = [
  {
    q: 'Preciso pagar alguma coisa?',
    a: 'Não existe cobrança adicional na compra. Você doa os créditos elegíveis da Nota Fiscal Paulista à instituição.',
  },
  {
    q: 'Preciso cadastrar a doação toda vez?',
    a: 'Não. Enquanto a doação automática estiver ativa, basta informar seu próprio CPF nas compras elegíveis.',
  },
  {
    // Texto da tela "Adesão à doação automática de documento fiscal com CPF" do portal oficial.
    q: 'Quando a doação começa a valer?',
    a: 'Segundo o próprio portal da Nota Fiscal Paulista, a doação automática passa a valer a partir do primeiro dia do mês seguinte ao cadastro.',
  },
  {
    q: 'Como interrompo a doação ou troco de entidade?',
    a: 'Pelo site ou pelo aplicativo oficial da Nota Fiscal Paulista. O portal informa que essa opção deve ser feita lá, e não nesta página.',
  },
  {
    q: 'Qual CPF devo colocar na nota?',
    a: 'Seu próprio CPF.',
  },
  {
    q: 'Devo colocar o CNPJ da creche na nota?',
    a: 'Não. O CNPJ é utilizado para localizar a instituição durante o cadastro.',
  },
  {
    q: 'Posso doar uma nota sem CPF?',
    a: 'Sim. A instituição também realiza arrecadação de notas sem CPF.',
  },
  {
    q: 'Como posso ajudar tendo um comércio?',
    a: 'Você pode divulgar a campanha, expor um banner próximo aos caixas ou combinar a arrecadação de notas com a equipe do CEI.',
  },
  {
    q: 'A campanha é segura?',
    a: 'A página não coleta CPF, senhas ou dados bancários. O cadastro da doação acontece diretamente no portal oficial da Nota Fiscal Paulista.',
  },
  {
    // Verificado no guia oficial da Nota Fiscal Paulista (Doação Automática - Como doar).
    q: 'Quem doa também concorre a prêmios?',
    a: 'Segundo o guia oficial da Nota Fiscal Paulista, a cada R$ 100,00 em cupons fiscais doados são gerados bilhetes para a entidade e para o doador concorrerem aos prêmios mensais. As regras completas ficam no portal oficial.',
  },
];

export const historyTimeline = [
  {
    when: 'O começo',
    text: 'A instituição nasceu para apoiar mães que buscavam trabalho e não tinham onde deixar seus filhos. A iniciativa contou com o apoio da Paróquia Nossa Senhora do Belo Ramo e de paroquianos liderados pelo Padre Aurélio Riva.',
  },
  { when: '1988', text: 'Começou atendendo 40 crianças.' },
  {
    when: '1991',
    text: 'Inaugurou sua sede própria e firmou convênio com a Prefeitura de São Paulo.',
  },
  { when: '1993', text: 'Foi criada a Associação Madre Teresa de Calcutá.' },
  { when: 'Hoje', text: `Atende ${institution.childrenLabel}.` },
];
