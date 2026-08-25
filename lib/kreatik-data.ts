// ────────────────────────────────────────────────────────────────
// SOURCE UNIQUE DE DONNÉES — ARTISTES & STICKERS
// ────────────────────────────────────────────────────────────────
// Pour AJOUTER un artiste : ajoute un objet dans le tableau `artists` ci-dessous.
// Pour AJOUTER un sticker : ajoute un objet dans le tableau `stickers`,
//   avec `artistSlug` qui correspond au `slug` de l'artiste concerné.
// Pour RETIRER un artiste ou un sticker : supprime simplement son objet
//   (ou passe `active: false` si tu veux juste le masquer sans le supprimer).
//
// BOUTIQUE vs DROP :
// - `isDrop: true`  → le sticker fait partie d'un drop temporaire (édition
//   limitée, lié à un thème/une île/un artiste). Il apparaît sur /drops
//   avec le badge "ÉDITION LIMITÉE" et le nom du drop.
// - `isDrop: false` (ou absent) → le sticker fait partie du catalogue
//   permanent. Il apparaît sur /boutique, sans badge d'urgence.
// Un même sticker peut redescendre en boutique une fois son drop terminé :
// il suffit de repasser `isDrop` à false.
//
// Le site (pages listing + fiches individuelles) se met à jour tout seul
// à partir de ces deux tableaux — aucun autre fichier à toucher.
// ────────────────────────────────────────────────────────────────

export type Artist = {
  slug: string
  name: string
  username: string
  role: string
  bio: string
  instagram?: string
  tiktok?: string
  color: string
  active?: boolean
}

export type StickerItem = {
  slug: string
  name: string
  artistSlug: string
  image: string
  price: string
  finish: string
  tag: string
  active?: boolean
  isDrop?: boolean
  dropLabel?: string
  dropEndsAt?: string
}

export const artists: Artist[] = [
  {
    slug: 'kreatik-studio',
    name: 'Kreatik Studio',
    username: '@kreatik.officiel',
    role: 'Studio maison',
    bio: "Les créations maison de Kreatik, portées par Mathys Denaux — designer graphique et artiste originaire de La Réunion. Direction artistique du studio, entre identité 974 et univers streetwear.",
    instagram: 'https://instagram.com/kreatik.officiel',
    tiktok: 'https://tiktok.com/@kreatik.officiel',
    color: '#F77F4A',
  },
  {
    slug: 'futur-crew',
    name: 'Futur Crew',
    username: '@futurcrew974',
    role: 'Street art',
    bio: "Collectif street art réunionnais, référence de la scène locale. Collabore avec Kreatik sur la collection 974 avec un univers graphique brut et coloré.",
    instagram: 'https://instagram.com',
    tiktok: 'https://tiktok.com',
    color: '#00767D',
  },
]

const DROP_001 = 'Drop 001 / La Réunion'

export const stickers: StickerItem[] = [
  {
    slug: 'kine-la-rak',
    name: 'Kine La Rak',
    artistSlug: 'kreatik-studio',
    image: '/kreatik/stickers/kine-la-rak.png',
    price: '12,99 €',
    finish: 'Glossy',
    tag: 'Collection 974',
    isDrop: true,
    dropLabel: DROP_001,
  },
  {
    slug: 'cok-lacour',
    name: 'Cok Lacour',
    artistSlug: 'futur-crew',
    image: '/kreatik/stickers/cok-lacour.png',
    price: '12,99 €',
    finish: 'Matte',
    tag: 'Édition limitée',
    isDrop: true,
    dropLabel: DROP_001,
  },
  {
    slug: 'chien-denis-crew',
    name: 'Chien Denis Crew',
    artistSlug: 'futur-crew',
    image: '/kreatik/stickers/chien-denis-crew.png',
    price: '12,99 €',
    finish: 'Holographic',
    tag: 'Marketplace',
    isDrop: true,
    dropLabel: DROP_001,
  },
  {
    slug: '974-tag',
    name: '974 Tag',
    artistSlug: 'kreatik-studio',
    image: '/kreatik/stickers/974-tag-beige.png',
    price: '9,99 €',
    finish: 'Matte',
    tag: 'Collection 974',
    isDrop: true,
    dropLabel: DROP_001,
  },
  {
    slug: '974-tag-gradient',
    name: '974 Flamme',
    artistSlug: 'kreatik-studio',
    image: '/kreatik/stickers/974-tag-gradient.png',
    price: '9,99 €',
    finish: 'Glossy',
    tag: 'Collection 974',
    isDrop: true,
    dropLabel: DROP_001,
  },
  {
    slug: '974-tag-holo',
    name: '974 Holo',
    artistSlug: 'kreatik-studio',
    image: '/kreatik/stickers/974-tag-pale.png',
    price: '11,99 €',
    finish: 'Holographic',
    tag: 'Holographique',
    isDrop: true,
    dropLabel: DROP_001,
  },
  {
    slug: 'kafrine-do-fe',
    name: 'Kafrine do Fé',
    artistSlug: 'kreatik-studio',
    image: '/kreatik/stickers/kafrine-do-fe.png',
    price: '14,99 €',
    finish: 'Glossy',
    tag: 'Édition limitée',
    isDrop: true,
    dropLabel: DROP_001,
  },
]

export function getActiveArtists() {
  return artists.filter((a) => a.active !== false)
}

export function getActiveStickers() {
  return stickers.filter((s) => s.active !== false)
}

export function getBoutiqueStickers() {
  return getActiveStickers().filter((s) => !s.isDrop)
}

export function getDropStickers() {
  return getActiveStickers().filter((s) => s.isDrop)
}

export function getArtist(slug: string) {
  return artists.find((a) => a.slug === slug)
}

export function getSticker(slug: string) {
  return stickers.find((s) => s.slug === slug)
}

export function getStickersByArtist(artistSlug: string) {
  return getActiveStickers().filter((s) => s.artistSlug === artistSlug)
}
