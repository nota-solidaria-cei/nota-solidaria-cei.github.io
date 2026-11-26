/**
 * Dados institucionais confirmados do CEI Madre Teresa de Calcutá.
 * Fonte única da verdade: altere aqui e a página inteira é atualizada.
 */
export const institution = {
  name: 'CEI Madre Teresa de Calcutá',
  legalName: 'Associação Madre Teresa de Calcutá',
  /** Nome fantasia exibido na Nota Fiscal Paulista */
  nfpName: 'Creche Madre Teresa de Calcutá',

  cnpj: '96.523.063/0001-00',
  cnpjDigits: '96523063000100',

  address: {
    street: 'Rua Coronel Donato, 209',
    district: 'Vila Matilde',
    city: 'São Paulo',
    state: 'SP',
    zip: '03512-030',
  },
  addressLine: 'Rua Coronel Donato, 209 – Vila Matilde – São Paulo/SP',

  phones: {
    primary: { display: '(11) 2653-1433', href: 'tel:+551126531433' },
    secondary: { display: '(11) 2653-9107', href: 'tel:+551126539107' },
  },
  whatsapp: {
    display: '(11) 94341-4558',
    number: '5511943414558',
    url: 'https://wa.me/5511943414558',
  },
  email: 'cei.diretoria@madreteresadecalcuta.org.br',
  // O CEI não tem site institucional: não crie links para um. O canal público é o Instagram.
  instagram: { url: 'https://www.instagram.com/meteresadecalcuta/', handle: '@meteresadecalcuta' },

  pix: {
    /** Como aparece para o doador */
    key: '96.523.063/0001-00',
    /** O que vai para a área de transferência (chave CNPJ sem máscara) */
    keyToCopy: '96523063000100',
    beneficiary: 'Associação Madre Teresa de Calcutá',
  },

  nfp: {
    portalUrl: 'https://www.nfp.fazenda.sp.gov.br/',
    /** Guia oficial da doação automática (Secretaria da Fazenda e Planejamento) */
    guideUrl: 'https://portal.fazenda.sp.gov.br/servicos/nfp/Paginas/Guia-doacao_automatica.aspx',
    category: 'Entidades de Educação',
    municipality: 'São Paulo',
  },

  foundedYear: 1988,
  /** Use sempre esta expressão. Nunca um número fixo. */
  childrenLabel: 'mais de 160 crianças',
  ageRange: '0 a 5 anos',
} as const;

/** Link do WhatsApp do CEI, opcionalmente com mensagem já preenchida. */
export function whatsappLink(message?: string): string {
  if (!message) return institution.whatsapp.url;
  return `${institution.whatsapp.url}?text=${encodeURIComponent(message)}`;
}
