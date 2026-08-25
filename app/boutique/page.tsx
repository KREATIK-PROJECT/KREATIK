'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { getBoutiqueStickers, getActiveArtists, getArtist } from '@/lib/kreatik-data'
import { SiteHeader, Footer, StickerVisual } from '@/components/kreatik/site-shell'

export default function BoutiquePage() {
  const items = getBoutiqueStickers()
  const artists = getActiveArtists()
  const categories = useMemo(() => Array.from(new Set(items.map((i) => i.tag))), [items])

  const [category, setCategory] = useState<string>('Toutes')
  const [artistFilter, setArtistFilter] = useState<string>('Tous')
  const [sort, setSort] = useState<'default' | 'asc' | 'desc'>('default')

  const filtered = useMemo(() => {
    let list = items
    if (category !== 'Toutes') list = list.filter((i) => i.tag === category)
    if (artistFilter !== 'Tous') list = list.filter((i) => i.artistSlug === artistFilter)
    if (sort !== 'default') {
      list = [...list].sort((a, b) => {
        const pa = parseFloat(a.price.replace(',', '.'))
        const pb = parseFloat(b.price.replace(',', '.'))
        return sort === 'asc' ? pa - pb : pb - pa
      })
    }
    return list
  }, [items, category, artistFilter, sort])

  return (
    <>
      <SiteHeader />
      <main className="bg-[#F3ECE0] px-5 py-16 text-[#12141C] md:px-10 md:py-20">
        <div className="mx-auto max-w-[1440px]">
          <p className="font-montserrat text-[10px] font-bold tracking-[0.2em] text-black/40">CATALOGUE PERMANENT</p>
          <h1 className="mt-4 font-author text-5xl italic leading-none tracking-[-0.03em] md:text-7xl">Boutique.</h1>
          <p className="mt-5 max-w-lg font-montserrat text-sm leading-6 text-black/60">Les pièces disponibles en continu, sans limite de temps ni de stock — le fond de catalogue Kreatik.</p>

          {items.length > 0 && (
            <div className="mt-10 flex flex-wrap items-center gap-4 border-y border-black/10 py-4 font-montserrat text-[11px] font-bold tracking-[0.06em]">
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="border border-black/15 bg-transparent px-3 py-2">
                <option>Toutes</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <select value={artistFilter} onChange={(e) => setArtistFilter(e.target.value)} className="border border-black/15 bg-transparent px-3 py-2">
                <option value="Tous">Tous les artistes</option>
                {artists.map((a) => <option key={a.slug} value={a.slug}>{a.name}</option>)}
              </select>
              <select value={sort} onChange={(e) => setSort(e.target.value as 'default' | 'asc' | 'desc')} className="border border-black/15 bg-transparent px-3 py-2">
                <option value="default">Tri par défaut</option>
                <option value="asc">Prix croissant</option>
                <option value="desc">Prix décroissant</option>
              </select>
            </div>
          )}

          {items.length === 0 ? (
            <div className="mt-16 border border-black/10 bg-white/40 px-8 py-16 text-center">
              <p className="font-author text-2xl italic text-black/70">Le catalogue permanent arrive bientôt.</p>
              <p className="mx-auto mt-3 max-w-md font-montserrat text-sm leading-6 text-black/55">Pour l&apos;instant, toutes nos créations font partie du Drop 001 — une édition limitée. Reviens ici une fois le drop terminé, ou explore-le dès maintenant.</p>
              <Link href="/drops" className="mt-7 inline-flex items-center gap-2 bg-[#12141C] px-5 py-3.5 font-montserrat text-[11px] font-bold tracking-[0.14em] text-[#F3ECE0]">VOIR LE DROP EN COURS <ArrowUpRight size={14} /></Link>
            </div>
          ) : (
            <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
              {filtered.map((item) => {
                const artist = getArtist(item.artistSlug)
                return <StickerVisual key={item.slug} slug={item.slug} name={item.name} image={item.image} price={item.price} sticker={item} artistName={artist?.name} />
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
