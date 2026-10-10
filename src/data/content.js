// Dados do artista. Itens marcados como PROVISÓRIO ainda precisam do conteúdo oficial.

const SPOTIFY_ARTIST = 'https://open.spotify.com/artist/6KEx0hqAbDk8ZOM1WbOwz9'
const track = (id) => `https://open.spotify.com/track/${id}`

export const nav = [
  { id: 'inicio', label: 'Início' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'discografia', label: 'Discografia' },
  { id: 'agenda', label: 'Agenda' },
  { id: 'galeria', label: 'Galeria' },
  { id: 'merch', label: 'Merch' },
  { id: 'contato', label: 'Contato' },
]

export const hero = {
  back: 'BRUXARIA',
  tagline: 'Produtor • DJ • Zona Norte SP',
}

export const about = {
  title: 'SOBRE',
  quote:
    'Criado nas ruas da zona norte de São Paulo, Redy é um dos maiores produtores em ascensão da cena brasileira de Funk/Submundo — sempre com muita riqueza em suas obras.',
  stats: [
    { value: 500, suffix: 'M+', label: 'Views e streams somados' },
    { value: 200, suffix: 'K+', label: 'Seguidores no TikTok' },
    { value: 186, suffix: 'K', label: 'Ouvintes mensais no Spotify' },
  ],
}

export const transition = ['TO COM', 'SAUDADE VIDA']

export const releases = [
  {
    title: 'Bruxaria do Naldo',
    year: 2025,
    cover: 'cover-bruxaria-do-naldo',
    accent: 'linear-gradient(90deg, #f2f2f2, #9a9a9a)',
    description: 'O primeiro hit nacional do Redy, em alta em todas as plataformas desde o lançamento.',
    credits: ['DJ Keevin', 'DJ Redy', 'DJ LK da VB', 'DJ M13 da ZO', 'MC Nat'],
    plays: '2,18M',
    duration: '1:40',
    url: track('1i1fNkfLIVtQF7GtAcL6q1'),
  },
  {
    title: 'Virei o Teu Cunhado',
    year: 2025,
    cover: 'cover-virei-o-teu-cunhado',
    accent: 'linear-gradient(90deg, #5a5a5a, #1a1a1a)',
    description: 'Faixa solo que estourou no TikTok e virou trilha de milhares de vídeos.',
    credits: ['DJ Redy'],
    plays: '1,17M',
    duration: '1:48',
    url: track('6RBaDrl8a8JqoJG9bP8mad'),
  },
  {
    title: 'O Barulho da Quarta Dimensão',
    year: 2025,
    cover: 'cover-o-barulho-da-quarta-dimensao',
    accent: 'linear-gradient(90deg, #4b1d8f, #9b5cff)',
    description: 'Submundo experimental: graves distorcidos e camadas que fogem do óbvio.',
    credits: ['DJ Léo da 17', 'DJ Blakes', 'DJ Redy', 'DJ LK da VB'],
    plays: '1,66M',
    duration: '2:11',
    url: track('4QHriQDMEjprUid0JAlQhL'),
  },
  {
    title: 'Mega Bruxaria Viciante',
    year: 2025,
    cover: 'cover-mega-bruxaria-viciante',
    accent: 'linear-gradient(90deg, #8a0f12, #e0322f)',
    description: 'Montagem hipnótica feita para não sair da cabeça — nem da pista.',
    credits: ['DJ Léo da 17', 'MC RN Original', 'DJ Redy', 'DJ Menor do Florida', 'MC PR'],
    plays: '1,51M',
    duration: '2:04',
    url: track('79VKs0jvlUFicCgk45IImI'),
  },
  {
    title: 'Mina Louca',
    year: 2026,
    cover: 'cover-mina-louca',
    accent: 'linear-gradient(90deg, #6b0dff, #c04dff)',
    description: 'Escolha do artista: “Me agradeçam depois”. O single mais recente do Redy.',
    credits: ['DJ Redy'],
    url: track('7y5WmDWDOvYIlHERkfY9Rj'),
  },
]

export const moreReleases = [
  { title: 'Cavalgada do Rock', year: 2025, cover: 'cover-cavalgada-do-rock', url: track('1FwoTV5sztN2TXYbP9omVs') },
  { title: 'Joga o Bumbum', year: 2026, cover: 'cover-joga-o-bumbum', url: track('6FPtVETDjua0R4FH1UOqC5') },
  { title: 'Saudade da Submundo', year: 2026, cover: 'cover-saudade-da-submundo', url: track('7HkceCb33sruwmp7Oj0K3T') },
  { title: 'Cadê Minha Ex', year: 2026, cover: 'cover-cade-minha-ex', url: track('5koUTM5EFXigXIo1Hv1DuX') },
]

export const spotifyUrl = SPOTIFY_ARTIST

export const marquee = ['DJ REDY', 'TO COM SAUDADE VIDA', 'BRUXARIA', 'ZONA NORTE SP', 'SUBMUNDO']

// PROVISÓRIO — datas e locais fictícios (cidades com mais ouvintes no Spotify).
export const shows = [
  { date: '2026-11-14', city: 'São Paulo, SP', venue: 'Baile do Submundo', status: 'tickets', image: 'photo-5' },
  { date: '2026-11-21', city: 'Itabuna, BA', venue: 'Arena Itabuna', status: 'soldout', image: 'photo-3' },
  { date: '2026-11-29', city: 'Campinas, SP', venue: 'Festival Grave', status: 'tickets', image: 'photo-9' },
  { date: '2026-12-06', city: 'Curitiba, PR', venue: 'Paredão Sul', status: 'soon', image: 'photo-7' },
  { date: '2026-12-13', city: 'Brasília, DF', venue: 'Baile da Capital', status: 'soon', image: 'photo-2' },
]

export const gallery = [
  { image: 'photo-4', caption: 'Ensaio Submundo' },
  { image: 'photo-1', caption: 'Bastidores' },
  { image: 'photo-8', caption: 'Charlie Brown' },
  { image: 'photo-11', caption: 'Corta-vento' },
  { image: 'photo-5', caption: 'Sinal' },
  { image: 'photo-10', caption: 'Silêncio' },
  { image: 'photo-9', caption: 'Capuz' },
]

// PROVISÓRIO — produtos e preços ilustrativos.
export const merch = [
  { name: 'Jaqueta Quebra-Cabeça', price: 'R$ 349,90', image: 'cutout-10', status: 'Em breve' },
  { name: 'Corta-Vento Redy', price: 'R$ 289,90', image: 'cutout-5', status: 'Em breve' },
  { name: 'Camisa Pista 10', price: 'R$ 149,90', image: 'cutout-4', status: 'Em breve' },
]

export const contact = {
  label: 'CONTATO / BOOKING',
  // PROVISÓRIO — e-mails ilustrativos.
  emails: ['contato@djredy.com.br', 'booking@djredy.com.br'],
  coordinatesLabel: 'REDY HQ — ZONA NORTE SP:',
  coordinates: ['23° 29′ 54.0″ S', '46° 37′ 26.0″ W'],
  marquee: 'TO COM SAUDADE VIDA — BRUXARIA — 2026 — ',
  socials: [
    // PROVISÓRIO — Instagram e YouTube sem perfil definido.
    { name: 'Instagram', href: 'https://instagram.com/', icon: 'instagram' },
    { name: 'YouTube', href: 'https://youtube.com/', icon: 'youtube' },
    { name: 'Spotify', href: SPOTIFY_ARTIST, icon: 'spotify' },
  ],
}
