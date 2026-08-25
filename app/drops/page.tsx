import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getDropStickers, getArtist } from '@/lib/kreatik-data'
import { SiteHeader, Footer, StickerVisual } from '@/components/kreatik/site-shell'

export default function DropsPage() {
  const items = getDropStickers()
  const dropLabel = items[0]?.dropLabel ?? 'Drop en cours'

  return (
    <>
      <SiteHeader />
      <main className="bg-[#12141C] px-5 py-16 text-[#F3ECE0] md:px-10 md:py-20">
        <div className="mx-auto max-w-[1440px]">
          <Link href="/" className="inline-flex items-center gap-2 font-montserrat text-[11px] font-bold tracking-[0.14em] text-white/50 transition-colors hover:text-[#F77F4A]"><ArrowLeft size={14} /> ACCUEIL</Link>

          <div className="mt-8 flex items-center gap-3 font-montserrat text-[10px] font-bold tracking-[0.22em] text-[#F77F4A]"><span className="h-px w-10 bg-[#F77F4A]" /> ÉDITION LIMITÉE</div>
          <h1 className="mt-4 font-author text-6xl italic leading-none tracking-[-0.04em] md:text-8xl">{dropLabel.split('/')[0].trim()}<span className="text-[#F77F4A]">.</span></h1>
          {dropLabel.includes('/') && <p className="mt-3 font-montserrat text-sm text-white/50">{dropLabel.split('/')[1].trim()}</p>}
          <p className="mt-6 max-w-lg font-montserrat text-sm leading-6 text-white/60">Des pièces produites en quantité limitée, disponibles pour un temps donné. Une fois le drop terminé, ces designs disparaissent — ou rejoignent parfois le catalogue permanent.</p>

          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
            {items.map((item) => {
              const artist = getArtist(item.artistSlug)
              return <StickerVisual key={item.slug} slug={item.slug} name={item.name} image={item.image} price={item.price} sticker={item} artistName={artist?.name} />
            })}
            {items.length === 0 && <p className="col-span-full font-montserrat text-sm text-white/50">Aucun drop en cours pour le moment — reviens bientôt.</p>}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
