// ────────────────────────────────────────────────────────────────
// SOURCE UNIQUE DE DONNÉES — ARTISTES & STICKERS
// ────────────────────────────────────────────────────────────────
// Pour AJOUTER un artiste : ajoute un objet dans le tableau `artists` ci-dessous.
// Pour AJOUTER un sticker : ajoute un objet dans le tableau `stickers`,
//   avec `artistSlug` qui correspond au `slug` de l'artiste concerné.
// Pour RETIRER un artiste ou un sticker : supprime simplement son objet
//   (ou passe `active: false` si tu veux juste le masquer sans le supprimer).
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

export const stickers: StickerItem[] = [
  {
    slug: 'kine-la-rak',
    name: 'Kine La Rak',
    artistSlug: 'kreatik-studio',
    image: '/kreatik/stickers/kine-la-rak.png',
    price: '12,99 €',
    finish: 'Glossy',
    tag: 'Collection 974',
  },
  {
    slug: 'cok-lacour',
    name: 'Cok Lacour',
    artistSlug: 'futur-crew',
    image: '/kreatik/stickers/cok-lacour.png',
    price: '12,99 €',
    finish: 'Matte',
    tag: 'Édition limitée',
  },
  {
    slug: 'chien-denis-crew',
    name: 'Chien Denis Crew',
    artistSlug: 'futur-crew',
    image: '/kreatik/stickers/chien-denis-crew.png',
    price: '12,99 €',
    finish: 'Holographic',
    tag: 'Marketplace',
  },
  {
    slug: '974-tag',
    name: '974 Tag',
    artistSlug: 'kreatik-studio',
    image: '/kreatik/stickers/974-tag-beige.png',
    price: '9,99 €',
    finish: 'Matte',
    tag: 'Collection 974',
  },
]

export function getActiveArtists() {
  return artists.filter((a) => a.active !== false)
}

export function getActiveStickers() {
  return stickers.filter((s) => s.active !== false)
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
