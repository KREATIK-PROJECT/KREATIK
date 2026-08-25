import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Heart } from 'lucide-react'
import { getActiveStickers, getSticker, getArtist, getStickersByArtist } from '@/lib/kreatik-data'
import { SiteHeader, Footer, DropBadge } from '@/components/kreatik/site-shell'
import { StickerCard3D } from '@/components/kreatik/sticker-3d'

export function generateStaticParams() {
  return getActiveStickers().map((s) => ({ slug: s.slug }))
}

export default async function StickerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const sticker = getSticker(slug)
  if (!sticker) return notFound()
  const artist = getArtist(sticker.artistSlug)
  const more = getStickersByArtist(sticker.artistSlug).filter((s) => s.slug !== sticker.slug)
  const backHref = sticker.isDrop ? '/drops' : '/boutique'

  return (
    <>
      <SiteHeader />
      <main className="bg-[#F3ECE0] px-5 py-16 text-[#12141C] md:px-10 md:py-24">
        <div className="mx-auto max-w-[1100px]">
          <Link href={backHref} className="inline-flex items-center gap-2 font-montserrat text-[11px] font-bold tracking-[0.14em] text-black/50 transition-colors hover:text-[#C8336A]"><ArrowLeft size={14} /> {sticker.isDrop ? 'RETOUR AU DROP' : 'RETOUR À LA BOUTIQUE'}</Link>

          <div className="mt-8 grid gap-14 md:grid-cols-2 md:items-start">
            <div className="relative flex aspect-square items-center justify-center">
              <StickerCard3D src={sticker.image} alt={sticker.name} className="absolute inset-10" sizes="500px" priority maxTilt={14} shadowStrength={1.3} />
              <DropBadge sticker={sticker} className="absolute left-0 top-0 z-10" />
            </div>

            <div>
              <h1 className="font-author text-5xl italic leading-none tracking-[-0.03em] md:text-6xl">{sticker.name}</h1>
              {artist && <Link href={`/artistes/${artist.slug}`} className="mt-3 inline-block font-montserrat text-sm text-black/55 transition-colors hover:text-[#C8336A]">par <span className="font-bold">{artist.name}</span></Link>}
              <p className="mt-6 font-author text-4xl italic">{sticker.price}</p>
              <div className="mt-4 inline-flex items-center gap-2 border border-[#00767D]/35 bg-[#00767D]/10 px-4 py-2.5 font-montserrat text-[11px] text-[#00767D]">50% du prix reversés directement à l&apos;artiste</div>

              <div className="mt-8 grid grid-cols-2 gap-5 border-y border-black/10 py-6 font-montserrat text-sm">
                <div><p className="text-[10px] font-bold tracking-[0.1em] text-black/40">FINITION</p><p className="mt-1 font-bold">{sticker.finish}</p></div>
                <div><p className="text-[10px] font-bold tracking-[0.1em] text-black/40">DIMENSIONS</p><p className="mt-1 font-bold">9 × 9 cm</p></div>
              </div>

              <div className="mt-7 flex gap-3">
                <button className="flex flex-1 items-center justify-center gap-3 bg-[#12141C] px-5 py-4 font-montserrat text-[10px] font-bold tracking-[0.16em] text-[#F3ECE0] transition-transform hover:-translate-y-1">AJOUTER AU PANIER</button>
                <button className="flex h-[52px] w-[52px] items-center justify-center border border-black/15 transition-colors hover:border-[#C8336A] hover:text-[#C8336A]" aria-label="Ajouter aux favoris"><Heart size={18} /></button>
              </div>
              <p className="mt-4 font-montserrat text-[11px] text-black/45">Livraison sous 72h · Production française</p>

              {more.length > 0 && (
                <div className="mt-14">
                  <p className="font-montserrat text-[10px] font-bold tracking-[0.18em] text-black/40">PLUS DE CET ARTISTE</p>
                  <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                    {more.map((m) => (
                      <Link key={m.slug} href={`/stickers/${m.slug}`} className="relative flex aspect-square w-24 flex-shrink-0 items-center justify-center">
                        <StickerCard3D src={m.image} alt={m.name} className="absolute inset-2" sizes="100px" maxTilt={8} shadowStrength={0.6} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
