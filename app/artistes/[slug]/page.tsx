import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ExternalLink, Music2, ArrowLeft } from 'lucide-react'
import { getActiveArtists, getArtist, getStickersByArtist } from '@/lib/kreatik-data'
import { SiteHeader, Footer } from '@/components/kreatik/site-shell'

export function generateStaticParams() {
  return getActiveArtists().map((a) => ({ slug: a.slug }))
}

export default async function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const artist = getArtist(slug)
  if (!artist) return notFound()
  const items = getStickersByArtist(artist.slug)

  return (
    <>
      <SiteHeader />
      <main className="bg-[#F3ECE0] px-5 py-16 text-[#12141C] md:px-10 md:py-24">
        <div className="mx-auto max-w-[1100px]">
          <Link href="/#artists" className="inline-flex items-center gap-2 font-montserrat text-[11px] font-bold tracking-[0.14em] text-black/50 transition-colors hover:text-[#C8336A]"><ArrowLeft size={14} /> RETOUR AUX ARTISTES</Link>

          <div className="mt-8 grid gap-10 md:grid-cols-[280px_1fr] md:items-center">
            <div className="mx-auto flex aspect-square w-[220px] items-center justify-center rounded-full font-author text-5xl italic text-[#F3ECE0] md:mx-0 md:w-full" style={{ background: `linear-gradient(140deg, ${artist.color}, #12141C)` }}>
              {artist.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
            </div>
            <div>
              <p className="font-montserrat text-xs text-black/50">{artist.username}</p>
              <h1 className="mt-2 font-author text-5xl italic leading-none tracking-[-0.04em] md:text-7xl">{artist.name}</h1>
              <p className="mt-2 font-montserrat text-[11px] font-bold tracking-[0.16em] text-[#C8336A]">{artist.role.toUpperCase()}</p>
              <p className="mt-6 max-w-xl font-montserrat text-sm leading-7 text-black/65">{artist.bio}</p>
              <div className="mt-7 flex flex-wrap items-center gap-4">
                {artist.instagram && <a href={artist.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-black/15 px-4 py-3 font-montserrat text-[11px] font-bold tracking-[0.1em] transition-colors hover:border-[#C8336A] hover:text-[#C8336A]"><ExternalLink size={15} /> INSTAGRAM</a>}
                {artist.tiktok && <a href={artist.tiktok} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-black/15 px-4 py-3 font-montserrat text-[11px] font-bold tracking-[0.1em] transition-colors hover:border-[#C8336A] hover:text-[#C8336A]"><Music2 size={15} /> TIKTOK</a>}
              </div>
              <div className="mt-8 inline-flex items-center gap-3 border border-[#00767D]/35 bg-[#00767D]/10 px-4 py-3 font-montserrat text-xs text-[#00767D]">50% de la marge nette lui revient directement sur chaque vente.</div>
            </div>
          </div>

          <div className="mt-20">
            <p className="font-montserrat text-[10px] font-bold tracking-[0.2em] text-black/40">SA BOUTIQUE</p>
            <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-4">
              {items.map((item) => (
                <Link key={item.slug} href={`/stickers/${item.slug}`} className="group block">
                  <div className="relative aspect-square overflow-hidden bg-[#171717]">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-4 transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <p className="mt-3 font-montserrat text-xs font-bold">{item.name}</p>
                  <p className="font-montserrat text-[11px] text-black/50">{item.price}</p>
                </Link>
              ))}
              {items.length === 0 && <p className="col-span-full font-montserrat text-sm text-black/50">Pas encore de sticker en ligne pour cet artiste.</p>}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
