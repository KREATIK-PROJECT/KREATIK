'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Heart, Menu, Search, ShoppingBag, Sparkles, X } from 'lucide-react'
import Lenis from 'lenis'
import { useEffect, useState } from 'react'
import { getActiveArtists, getActiveStickers, getBoutiqueStickers, getDropStickers, type StickerItem } from '@/lib/kreatik-data'

function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
    let frame = 0
    const raf = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(raf) }
    frame = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(frame); lenis.destroy() }
  }, [])
  return null
}

const stickers = [
  { label: 'Kine La Rak', src: '/kreatik/stickers/kine-la-rak.png', w: 560, h: 700, rotate: '-8deg', x: '10%', y: '16%', width: 'w-24 md:w-32' },
  { label: 'Kafrine do Fé', src: '/kreatik/stickers/kafrine-do-fe.png', w: 720, h: 900, rotate: '5deg', x: '34%', y: '8%', width: 'w-20 md:w-28' },
  { label: 'Cok Lacour', src: '/kreatik/stickers/cok-lacour.png', w: 560, h: 700, rotate: '9deg', x: '43%', y: '17%', width: 'w-20 md:w-28' },
  { label: '974 Tag', src: '/kreatik/stickers/974-tag-beige.png', w: 560, h: 700, rotate: '-6deg', x: '15%', y: '83%', width: 'w-24 md:w-32' },
  { label: '974 Holo', src: '/kreatik/stickers/974-tag-pale.png', w: 900, h: 900, rotate: '-5deg', x: '23%', y: '70%', width: 'w-16 md:w-20' },
  { label: 'Chien Denis Crew', src: '/kreatik/stickers/chien-denis-crew.png', w: 560, h: 700, rotate: '7deg', x: '5%', y: '60%', width: 'w-24 md:w-32' },
  { label: '974 Flamme', src: '/kreatik/stickers/974-tag-gradient.png', w: 720, h: 900, rotate: '-4deg', x: '39%', y: '80%', width: 'w-16 md:w-20' },
]
const heroLogo = { src: '/kreatik/logo-kreatik.png', x: '28%', y: '93%', width: 'w-24 md:w-32' }
const heroPackaging = { src: '/kreatik/packaging/boite.jpg', x: '31%', y: '46%', width: 'w-52 md:w-64' }

const heroLines = [
  { text: 'DÉCOUVRE.', className: 'text-[#F3ECE0]' },
  { text: 'CRÉE.', className: 'italic text-[#F77F4A]' },
  { text: 'COLLECTIONNE.', className: 'text-[#F3ECE0]' },
]

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href
  const contextLabel = pathname === '/boutique' ? 'BOUTIQUE — Collection permanente' : pathname === '/drops' ? 'DROPS — Éditions limitées' : null

  return (
    <header className="relative z-50 border-b border-white/10 bg-[#12141C]/95 px-5 py-5 backdrop-blur-md md:px-10">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between">
        <div className="flex items-baseline gap-4">
          <Link href="/" className="font-author text-3xl italic tracking-[-0.08em] text-[#F3ECE0]" aria-label="Kreatik accueil">
            KREATIK<span className="text-[#F77F4A]">.</span>
          </Link>
          {contextLabel && <span className="hidden font-montserrat text-[9px] font-bold tracking-[0.16em] text-white/40 md:inline">{contextLabel}</span>}
        </div>
        <nav className="hidden items-center gap-8 font-montserrat text-[10px] font-bold tracking-[0.16em] text-white/70 md:flex" aria-label="Navigation principale">
          <Link className={`transition-colors hover:text-[#F77F4A] ${isActive('/boutique') ? 'text-[#F77F4A]' : ''}`} href="/boutique">BOUTIQUE</Link>
          <a className="transition-colors hover:text-[#F77F4A]" href="/#artists">ARTISTES</a>
          <a className="transition-colors hover:text-[#F77F4A]" href="/#collections">COLLECTIONS</a>
          <Link className={`transition-colors hover:text-[#F77F4A] ${isActive('/atelier') ? 'text-[#F77F4A]' : ''}`} href="/atelier">ATELIER</Link>
          <Link className={`transition-colors hover:text-[#F77F4A] ${isActive('/drops') ? 'text-[#F77F4A]' : ''}`} href="/drops">DROPS</Link>
          <a className="transition-colors hover:text-[#F77F4A]" href="/#fondateur">FONDATEUR</a>
        </nav>
        <div className="flex items-center gap-2 text-white/80">
          <button className="hidden p-2 transition-colors hover:text-[#F77F4A] md:block" aria-label="Rechercher"><Search size={18} strokeWidth={1.5} /></button>
          <button className="hidden p-2 transition-colors hover:text-[#F77F4A] md:block" aria-label="Favoris"><Heart size={18} strokeWidth={1.5} /></button>
          <button className="relative p-2 transition-colors hover:text-[#F77F4A]" aria-label="Panier"><ShoppingBag size={18} strokeWidth={1.5} /><span className="absolute right-0 top-0 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#F77F4A] font-montserrat text-[8px] font-bold text-[#12141C]">0</span></button>
          <button className="p-2 md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </div>
      {menuOpen && <nav className="mt-5 flex flex-col gap-5 border-t border-white/10 pt-5 font-montserrat text-xs font-bold tracking-[0.18em] text-white/80 md:hidden">
        <Link href="/boutique" onClick={() => setMenuOpen(false)}>BOUTIQUE</Link>
        <a href="/#artists" onClick={() => setMenuOpen(false)}>ARTISTES</a>
        <a href="/#collections" onClick={() => setMenuOpen(false)}>COLLECTIONS</a>
        <Link href="/atelier" onClick={() => setMenuOpen(false)}>ATELIER</Link>
        <Link href="/drops" onClick={() => setMenuOpen(false)}>DROPS</Link>
        <a href="/#fondateur" onClick={() => setMenuOpen(false)}>FONDATEUR</a>
      </nav>}
    </header>
  )
}


export function HeroDrop() {
  return (
    <section id="top" className="relative min-h-[720px] overflow-hidden bg-[#12141C] px-5 py-20 md:min-h-[780px] md:px-10 md:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2" style={{ background: 'radial-gradient(60% 60% at 70% 40%, rgba(247,127,74,.10) 0%, transparent 70%)' }} />
      <div className="relative z-10 mx-auto grid max-w-[1440px] items-center gap-10 lg:grid-cols-[1fr_1.05fr]">
        <div className="max-w-xl">
          <div className="mb-6 flex items-center gap-3 font-montserrat text-[10px] font-bold tracking-[0.22em] text-[#F77F4A]"><span className="h-px w-10 bg-[#F77F4A]" /> DROP 001 / LA RÉUNION</div>
          <h1 className="w-full max-w-full font-author leading-[1.02] tracking-[-0.03em]" style={{ fontSize: 'clamp(2.5rem, 6.5vw, 5.5rem)' }}>
            {heroLines.map((line) => (
              <span key={line.text} className={`block break-words ${line.className}`}>{line.text}</span>
            ))}
          </h1>
          <p className="mt-9 max-w-sm font-montserrat text-sm leading-6 text-white/60">Le sticker comme objet artistique. Des éditions limitées, imaginées par des artistes, fabriquées en France.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#shop" className="flex items-center gap-3 bg-[#F77F4A] px-5 py-4 font-montserrat text-[10px] font-bold tracking-[0.16em] text-[#12141C]">EXPLORER LES STICKERS <ArrowUpRight size={16} /></a>
            <a href="#sticker-lab" className="flex items-center gap-3 border border-white/30 px-5 py-4 font-montserrat text-[10px] font-bold tracking-[0.16em] text-[#F3ECE0]">CRÉE TON STICKER</a>
          </div>
        </div>
        <div className="relative mx-auto aspect-[8/5] w-full max-w-[820px] lg:mr-[-8%] lg:max-w-none">
          <div className="absolute z-10 overflow-hidden rounded-md shadow-[0_30px_60px_-20px_rgba(0,0,0,.7)]" style={{ left: heroPackaging.x, top: heroPackaging.y, transform: 'translate(-50%, -50%)' }}>
            <Image src={heroPackaging.src} alt="Boîte Kreatik" width={1400} height={1080} className={`${heroPackaging.width} h-auto`} priority />
          </div>
          {stickers.map((sticker) => (
            <div key={sticker.label} className="absolute drop-shadow-[6px_10px_10px_rgba(0,0,0,.4)]" style={{ left: sticker.x, top: sticker.y, transform: `translate(-50%, -50%) rotate(${sticker.rotate})` }}>
              <Image src={sticker.src} alt={sticker.label} width={sticker.w} height={sticker.h} className={`${sticker.width} h-auto`} />
            </div>
          ))}
          <div className="absolute drop-shadow-[0_10px_20px_rgba(0,0,0,.5)]" style={{ left: heroLogo.x, top: heroLogo.y, transform: 'translate(-50%, -50%)' }}>
            <Image src={heroLogo.src} alt="KREATIK" width={900} height={900} className={`${heroLogo.width} h-auto`} />
          </div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 font-montserrat text-[9px] font-bold tracking-[0.18em] text-white/40">FABRIQUÉ EN FRANCE / 974</div>
        </div>
      </div>
      <div className="absolute bottom-7 left-5 font-montserrat text-[9px] tracking-[0.18em] text-white/30 md:left-10">DÉFILE POUR EXPLORER ↓</div>
    </section>
  )
}

export function DropTicker() {
  return <div className="flex overflow-hidden bg-[#F77F4A] py-3 font-montserrat text-[10px] font-bold tracking-[0.18em] text-[#12141C]"><div className="flex min-w-max animate-pulse-soft gap-10">{Array.from({ length: 6 }).map((_, i) => <span key={i}>DROP 001 — 7 JOURS SEULEMENT <span className="mx-5">✳</span> 50% POUR L'ARTISTE</span>)}</div></div>
}

export function IntroStatement() {
  return <section className="bg-[#F3ECE0] px-5 py-24 text-[#12141C] md:px-10 md:py-36"><div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-[.7fr_1.3fr] md:items-end"><p className="font-montserrat text-[10px] font-bold tracking-[0.2em] text-[#C8336A]">01 / LE MANIFESTE</p><div><h2 className="font-author text-5xl leading-[.92] tracking-[-0.06em] md:text-8xl">LE DESIGN<br /><span className="italic text-[#C8336A]">QUI COLLE.</span></h2><p className="mt-8 max-w-xl font-montserrat text-sm leading-7 text-black/60">KREATIK est une galerie en mouvement. Une plateforme où l&apos;art sort des murs, se colle, se collectionne et voyage. Chaque drop célèbre un regard, une histoire, un territoire.</p></div></div></section>
}

export const sampleStickers = getActiveStickers()

import { StickerCard3D } from './sticker-3d'

export function DropBadge({ sticker, className = '' }: { sticker: Pick<StickerItem, 'isDrop' | 'dropLabel'>; className?: string }) {
  if (!sticker.isDrop) return null
  return <span className={`inline-flex items-center gap-1.5 bg-[#F77F4A] px-2.5 py-1 font-montserrat text-[9px] font-bold tracking-[0.1em] text-[#12141C] ${className}`}>ÉDITION LIMITÉE{sticker.dropLabel ? ` · ${sticker.dropLabel.split('/')[0].trim().toUpperCase()}` : ''}</span>
}

export function StickerVisual({ slug, name, image, price, sticker, artistName }: { slug: string; name: string; image: string; price: string; sticker: StickerItem; artistName?: string }) {
  return <Link href={`/stickers/${slug}`} className="group block min-w-[190px] flex-1"><div className="relative flex aspect-square items-center justify-center"><StickerCard3D src={image} alt={name} className="absolute inset-4" sizes="220px" /><button className="absolute right-1 top-1 z-10 flex h-9 w-9 items-center justify-center transition-colors hover:text-[#F77F4A]" aria-label={`Ajouter ${name} aux favoris`} onClick={(e) => e.preventDefault()}><Heart size={16} /></button>{sticker.isDrop && <DropBadge sticker={sticker} className="absolute bottom-1 left-1 z-10" />}</div><div className="flex justify-between gap-2 pt-3 font-montserrat text-[10px]"><div><p className="font-bold tracking-[0.08em]">{name}</p>{artistName && <p className="mt-0.5 text-black/45">par {artistName}</p>}</div><span className="font-bold">{price}</span></div></Link>
}

export function TrendingSection() {
  const [filter, setFilter] = useState('CETTE SEMAINE')
  const items = getActiveStickers()
  return <section id="shop" className="bg-[#F3ECE0] px-5 py-24 text-[#12141C] md:px-10 md:py-32"><div className="mx-auto max-w-[1440px]"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="font-montserrat text-[10px] font-bold tracking-[0.2em] text-[#C8336A]">02 / LES COUPS DE CŒUR</p><h2 className="mt-4 font-author text-6xl leading-none tracking-[-0.06em] md:text-8xl">TENDANCES<br /><span className="italic text-[#F77F4A]">DU MOMENT.</span></h2></div><div className="flex gap-4 overflow-x-auto border-b border-black/15 pb-3 font-montserrat text-[9px] font-bold tracking-[0.12em]">{['AUJOURD\'HUI', 'CETTE SEMAINE', 'CE MOIS', 'ARTISTES ÉMERGENTS'].map((item) => <button className={`whitespace-nowrap transition-colors ${filter === item ? 'text-[#C8336A]' : 'text-black/40 hover:text-black'}`} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div></div><div className="mt-12 flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 lg:grid-cols-6">{items.map((item) => <StickerVisual key={item.slug} slug={item.slug} name={item.name} image={item.image} price={item.price} sticker={item} />)}</div><div className="mt-12 flex flex-wrap gap-8 border-t border-black/10 pt-6 font-montserrat text-[11px] font-bold tracking-[0.12em]"><Link href="/boutique" className="flex items-center gap-2 text-black/70 transition-colors hover:text-[#C8336A]">VOIR TOUTE LA BOUTIQUE <ArrowUpRight size={14} /></Link><Link href="/drops" className="flex items-center gap-2 text-[#C8336A] transition-colors hover:text-[#F77F4A]">VOIR LE DROP EN COURS <ArrowUpRight size={14} /></Link></div></div></section>
}

export function ArtistSection() {
  const list = getActiveArtists()
  return <section id="artists" className="bg-[#00767D] px-5 py-24 text-[#F3ECE0] md:px-10 md:py-32"><div className="mx-auto max-w-[1440px]"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="font-montserrat text-[10px] font-bold tracking-[0.2em] text-[#F6E29B]">03 / L'ÉQUIPE</p><h2 className="mt-4 font-author text-6xl leading-none tracking-[-0.06em] md:text-8xl">RENCONTRE<br /><span className="italic text-[#F6E29B]">LES ARTISTES.</span></h2></div><p className="max-w-xs font-montserrat text-sm leading-6 text-white/70">Des voix singulières, des univers qui débordent. Découvrez celles et ceux qui font KREATIK.</p></div><div className="mt-14 grid gap-px bg-white/20 sm:grid-cols-2">{list.map((artist, i) => <Link href={`/artistes/${artist.slug}`} key={artist.slug} className="group bg-[#00767D] p-5 transition-colors hover:bg-[#12141C]"><div className="flex aspect-[2/1] items-end justify-between p-4 text-[#12141C]" style={{ backgroundColor: artist.color }}><span className="font-author text-4xl italic">0{i + 1}</span><ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></div><div className="flex items-center justify-between pt-4"><div><p className="font-montserrat text-xs font-bold">{artist.name}</p><p className="mt-1 font-montserrat text-[9px] tracking-[0.12em] text-white/50">{artist.username}</p></div><Sparkles size={16} className="text-[#F6E29B]" /></div></Link>)}</div><div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/20 pt-5 sm:flex-row sm:items-center"><p className="font-montserrat text-xs text-white/70">50% de la marge nette revient directement à l&apos;artiste.</p><Link href="/devenir-artiste" className="font-montserrat text-[10px] font-bold tracking-[0.16em] text-[#F6E29B] transition-colors hover:text-white">DEVENIR ARTISTE PARTENAIRE →</Link></div></div></section>
}

export function CollectionSection() {
  return <section id="collections" className="bg-[#12141C] px-5 py-24 md:px-10 md:py-32"><div className="mx-auto max-w-[1440px]"><div className="grid gap-10 md:grid-cols-[.8fr_1.2fr] md:items-center"><div><p className="font-montserrat text-[10px] font-bold tracking-[0.2em] text-[#F77F4A]">04 / COLLECTION À LA UNE</p><h2 className="mt-4 font-author text-7xl leading-[.8] tracking-[-0.08em] text-[#F3ECE0] md:text-9xl">974<br /><span className="italic text-[#F77F4A]">FUTUR.</span></h2><p className="mt-8 max-w-sm font-montserrat text-sm leading-6 text-white/60">Un hommage à l&apos;île intense. 5 artistes, 1 territoire, une édition qui ne reviendra pas.</p><Link href="/drops" className="mt-8 inline-flex items-center gap-3 border-b border-[#F77F4A] pb-3 font-montserrat text-[10px] font-bold tracking-[0.16em] text-[#F3ECE0]">VOIR LA COLLECTION <ArrowUpRight size={15} /></Link></div><div className="relative overflow-hidden bg-[#171717] p-4 md:p-8"><Image src="/kreatik/reunion-collage.png" alt="Collection 974 Futur, hommage artistique à La Réunion" width={900} height={700} className="aspect-[1.2] object-cover transition-transform duration-700 hover:scale-105" /></div></div></div></section>
}

export function DropBanner() {
  return <section id="drops" className="bg-[#C8336A] px-5 py-16 text-[#F3ECE0] md:px-10 md:py-24"><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 md:flex-row md:items-center"><div><p className="font-montserrat text-[10px] font-bold tracking-[0.2em] text-white/70">EN DIRECT / ÉDITION LIMITÉE</p><h2 className="mt-3 font-author text-6xl leading-none tracking-[-0.06em] md:text-8xl">DROP 001 —<br /><span className="italic text-[#F6E29B]">974 FUTUR</span></h2></div><div className="border-l border-white/30 pl-6 md:min-w-[280px]"><p className="font-montserrat text-[10px] font-bold tracking-[0.18em] text-white/70">SE TERMINE DANS</p><p className="mt-2 font-author text-5xl">06:18:42</p><p className="mt-3 font-montserrat text-[10px] text-white/70">Disponible seulement 7 jours</p><Link href="/drops" className="mt-6 inline-flex items-center gap-3 bg-[#F6E29B] px-5 py-4 font-montserrat text-[10px] font-bold tracking-[0.16em] text-[#12141C]">ACHETER LE DROP <ArrowUpRight size={15} /></Link></div></div></section>
}

export function StickerLabPreview() {
  return <section id="sticker-lab" className="bg-[#F3ECE0] px-5 py-24 text-[#12141C] md:px-10 md:py-32"><div className="mx-auto max-w-[1440px] border-2 border-[#12141C] p-6 md:p-12"><div className="grid gap-12 md:grid-cols-[.8fr_1.2fr] md:items-center"><div><p className="font-montserrat text-[10px] font-bold tracking-[0.2em] text-[#C8336A]">05 / À TON TOUR</p><h2 className="mt-4 font-author text-6xl leading-[.85] tracking-[-0.06em] md:text-8xl">ATELIER<br /><span className="italic text-[#F77F4A]">STICKER.</span></h2><p className="mt-7 max-w-sm font-montserrat text-sm leading-6 text-black/60">Ton image. Ton idée. Ton sticker. Crée une pièce unique avec notre studio de personnalisation.</p><Link href="/atelier" className="mt-8 flex w-fit items-center gap-3 bg-[#12141C] px-5 py-4 font-montserrat text-[10px] font-bold tracking-[0.16em] text-[#F3ECE0] transition-transform hover:-translate-y-1">COMMENCER <Sparkles size={15} className="text-[#F77F4A]" /></Link></div><div className="relative flex min-h-[300px] items-center justify-center overflow-hidden bg-[#F9CAB2] p-8"><div className="absolute -right-8 -top-8 font-author text-[11rem] leading-none text-[#F77F4A]/30">✳</div><div className="relative rotate-[-8deg] rounded-[45%_55%_50%_50%] border-[7px] border-[#12141C] bg-[#F6E29B] px-8 py-14 font-author text-5xl leading-[.8] text-[#12141C] shadow-[14px_16px_0_#00767D] md:text-7xl">TON<br />IDÉE<br /><span className="text-[#C8336A]">ICI.</span></div></div></div></div></section>
}

export function FounderSection() {
  return <section id="fondateur" className="bg-[#F3ECE0] px-5 py-24 text-[#12141C] md:px-10 md:py-32"><div className="mx-auto grid max-w-[1440px] gap-12 md:grid-cols-[.85fr_1.15fr] md:items-center"><div className="relative aspect-[4/5] overflow-hidden bg-[#171717] md:aspect-[3/4]"><div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#F77F4A] via-[#C8336A] to-[#12141C]"><span className="font-author text-2xl italic text-[#F3ECE0]/70">#974</span></div></div><div><p className="font-montserrat text-[10px] font-bold tracking-[0.2em] text-[#C8336A]">06 / LE FONDATEUR</p><h2 className="mt-4 font-author text-6xl leading-[.85] tracking-[-0.06em] md:text-8xl">MATHYS<br /><span className="italic text-[#F77F4A]">DENAUX.</span></h2><p className="mt-8 max-w-xl font-montserrat text-sm leading-7 text-black/65">Designer graphique et artiste originaire de La Réunion, passionné par le design et l&apos;art en général depuis toujours. À travers ses expériences en création visuelle, print-on-demand et branding, il a développé une vision claire : créer une marque qui dépasse le simple sticker pour en faire un véritable objet créatif, durable et premium.</p><p className="mt-5 max-w-xl font-montserrat text-sm leading-7 text-black/65">Avec Kreatik, l&apos;ambition est de construire une marque française spécialisée exclusivement dans les stickers haut de gamme, pensée pour les passionnés de culture visuelle, d&apos;illustration et de design.</p><p className="mt-6 font-author text-lg italic text-[#C8336A]">— Mathys, créateur et président de Kreatik</p></div></div></section>
}

export function ConvictionsSection() {
  const items = [
    { n: '01', title: 'Éco-responsable', text: 'Vinyle recyclable, encres végétales, packaging kraft certifié FSC.' },
    { n: '02', title: 'Objet artistique', text: 'Chaque pièce est designée, signée et numérotée — pensée pour durer.' },
    { n: '03', title: 'Expérience bout en bout', text: 'Du design soigné jusqu\u2019à l\u2019unboxing, chaque détail est pensé.' },
    { n: '04', title: 'Made in France', text: 'Production avec des fournisseurs et artistes français.' },
  ]
  return <section id="convictions" className="bg-[#12141C] px-5 py-24 text-[#F3ECE0] md:px-10 md:py-32"><div className="mx-auto max-w-[1440px]"><p className="font-montserrat text-[10px] font-bold tracking-[0.2em] text-[#F77F4A]">07 / NOS CONVICTIONS</p><h2 className="mt-4 max-w-2xl font-author text-5xl leading-[.95] tracking-[-0.05em] md:text-7xl">Pas un autocollant<br /><span className="italic text-[#F77F4A]">de papeterie.</span></h2><div className="mt-16 grid gap-px bg-white/10 md:grid-cols-4">{items.map((item) => <div key={item.n} className="bg-[#12141C] p-7"><p className="font-author text-sm italic text-[#F77F4A]">{item.n}</p><h3 className="mt-4 font-montserrat text-sm font-bold tracking-[0.02em]">{item.title}</h3><p className="mt-3 font-montserrat text-[13px] leading-6 text-white/55">{item.text}</p></div>)}</div></div></section>
}

export function PackagingSection() {
  const priceBreakdown = [
    { label: 'Artiste', value: '3,06 €', color: '#F77F4A' },
    { label: 'Kreatik', value: '3,05 €', color: '#C8336A' },
    { label: 'Impression', value: '2,33 €', color: '#00767D' },
    { label: 'Taxe', value: '2,16 €', color: '#F9CAB2' },
    { label: 'Livraison', value: '1,89 €', color: '#F6E29B' },
    { label: 'Packaging', value: '0,50 €', color: '#4A5568' },
  ]
  return <section id="unboxing" className="bg-[#F3ECE0] px-5 py-24 text-[#12141C] md:px-10 md:py-32"><div className="mx-auto max-w-[1440px]"><p className="font-montserrat text-[10px] font-bold tracking-[0.2em] text-[#C8336A]">08 / L&apos;EXPÉRIENCE</p><h2 className="mt-4 max-w-2xl font-author text-5xl leading-[.95] tracking-[-0.05em] md:text-7xl">Jusque dans<br /><span className="italic text-[#F77F4A]">l&apos;emballage.</span></h2><p className="mt-6 max-w-lg font-montserrat text-sm leading-6 text-black/60">Enveloppe noire mate, papier de soie aux couleurs de la marque, carte artiste numérotée : chaque envoi est pensé comme une petite expérience, pas juste un colis.</p><div className="mt-14 grid gap-6 md:grid-cols-2"><div className="overflow-hidden bg-white shadow-[0_30px_60px_-30px_rgba(18,20,28,.35)]"><Image src="/kreatik/packaging/boite.jpg" alt="Boîte Kreatik, packaging noir mat avec logo dégradé" width={1400} height={1080} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" /></div><div className="overflow-hidden bg-white shadow-[0_30px_60px_-30px_rgba(18,20,28,.35)]"><Image src="/kreatik/packaging/enveloppe.jpg" alt="Enveloppe Kreatik recto-verso" width={1400} height={1249} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" /></div></div><div className="mt-16"><p className="font-montserrat text-[10px] font-bold tracking-[0.18em] text-black/40">CE QUE COUVRENT VOS 12,99 €</p><div className="mt-4 flex h-3.5 w-full overflow-hidden rounded-full">{priceBreakdown.map((p) => <div key={p.label} style={{ backgroundColor: p.color, width: `${(parseFloat(p.value.replace(',', '.')) / 12.99) * 100}%` }} />)}</div><div className="mt-5 flex flex-wrap gap-x-8 gap-y-3 font-montserrat text-[13px] text-black/65">{priceBreakdown.map((p) => <span key={p.label} className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: p.color }} />{p.label} — {p.value}</span>)}</div></div></div></section>
}

export function Footer() {
  return <footer className="bg-[#12141C] px-5 py-12 text-[#F3ECE0] md:px-10"><div className="mx-auto max-w-[1440px]"><div className="flex flex-col justify-between gap-10 border-b border-white/15 pb-12 md:flex-row"><div><p className="font-author text-5xl italic tracking-[-0.08em]">KREATIK<span className="text-[#F77F4A]">.</span></p><p className="mt-4 max-w-xs font-montserrat text-xs leading-5 text-white/50">Le sticker comme objet artistique.<br />Fait avec cœur, depuis La Réunion.</p><div className="mt-6 flex items-center gap-4 text-white/60"><a href="https://instagram.com/kreatik.officiel" className="transition-colors hover:text-[#F77F4A]" aria-label="Instagram">Instagram</a><a href="https://tiktok.com/@kreatik.officiel" className="transition-colors hover:text-[#F77F4A]" aria-label="TikTok">TikTok</a><a href="https://youtube.com/@kreatikofficiel" className="transition-colors hover:text-[#F77F4A]" aria-label="YouTube">YouTube</a></div></div><div className="grid grid-cols-2 gap-x-16 gap-y-4 font-montserrat text-[10px] font-bold tracking-[0.14em] text-white/60"><Link href="/boutique">BOUTIQUE</Link><a href="/#artists">ARTISTES</a><a href="/#collections">COLLECTIONS</a><Link href="/atelier">ATELIER</Link><Link href="/drops">DROPS</Link><a href="/#fondateur">À PROPOS</a></div><div className="font-montserrat text-xs text-white/60"><p className="text-[10px] font-bold tracking-[0.18em] text-white/40">CONTACT</p><a href="mailto:contact.kreatik@protonmail.com" className="mt-3 block transition-colors hover:text-[#F77F4A]">contact.kreatik@protonmail.com</a><p className="mt-5 text-[10px] font-bold tracking-[0.18em] text-white/40">DEVIS PRO / SUR-MESURE</p><a href="mailto:contact.kreatik@protonmail.com?subject=Devis%20sur-mesure" className="mt-3 inline-flex items-center gap-2 border border-white/25 px-4 py-3 text-[10px] font-bold tracking-[0.14em] transition-colors hover:border-[#F77F4A] hover:text-[#F77F4A]">DEMANDER UN DEVIS <ArrowUpRight size={13} /></a></div></div><div className="flex flex-col justify-between gap-3 pt-6 font-montserrat text-[9px] tracking-[0.12em] text-white/35 md:flex-row"><span>© 2024 KREATIK STUDIO / FABRIQUÉ EN FRANCE</span><span>EMBALLAGE FSC / VINYLE RECYCLABLE / ENCRES VÉGÉTALES</span></div></div></footer>
}

export function KreatikHome() {
  return <><SmoothScroll /><SiteHeader /><main><HeroDrop /><DropTicker /><IntroStatement /><TrendingSection /><ArtistSection /><CollectionSection /><DropBanner /><StickerLabPreview /><FounderSection /><ConvictionsSection /><PackagingSection /></main><Footer /></>
}
