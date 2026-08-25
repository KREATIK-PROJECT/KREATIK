'use client'

import Image from 'next/image'
import { ArrowUpRight, Heart, Menu, Search, ShoppingBag, Sparkles, X } from 'lucide-react'
import Lenis from 'lenis'
import { useEffect, useState } from 'react'

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
  { label: '974', color: 'bg-[#F6E29B] text-[#12141C]', rotate: '-rotate-12', position: 'left-[6%] top-[18%]' },
  { label: 'KREOL', color: 'bg-[#00767D] text-[#F3ECE0]', rotate: 'rotate-6', position: 'right-[5%] top-[15%]' },
  { label: 'FUTUR', color: 'bg-[#F77F4A] text-[#12141C]', rotate: 'rotate-12', position: 'left-[10%] bottom-[19%]' },
  { label: 'LOVE', color: 'bg-[#C8336A] text-[#F3ECE0]', rotate: '-rotate-6', position: 'right-[10%] bottom-[17%]' },
]

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="relative z-50 border-b border-white/10 bg-[#12141C]/95 px-5 py-5 backdrop-blur-md md:px-10">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between">
        <a href="#top" className="font-author text-3xl italic tracking-[-0.08em] text-[#F3ECE0]" aria-label="Kreatik accueil">
          KREATIK<span className="text-[#F77F4A]">.</span>
        </a>
        <nav className="hidden items-center gap-8 font-montserrat text-[10px] font-bold tracking-[0.16em] text-white/70 md:flex" aria-label="Navigation principale">
          {['SHOP', 'ARTISTS', 'COLLECTIONS', 'STICKER LAB', 'DROPS'].map((item) => <a className="transition-colors hover:text-[#F77F4A]" href={`#${item.toLowerCase().replace(' ', '-')}`} key={item}>{item}</a>)}
        </nav>
        <div className="flex items-center gap-2 text-white/80">
          <button className="hidden p-2 transition-colors hover:text-[#F77F4A] md:block" aria-label="Rechercher"><Search size={18} strokeWidth={1.5} /></button>
          <button className="hidden p-2 transition-colors hover:text-[#F77F4A] md:block" aria-label="Favoris"><Heart size={18} strokeWidth={1.5} /></button>
          <button className="relative p-2 transition-colors hover:text-[#F77F4A]" aria-label="Panier"><ShoppingBag size={18} strokeWidth={1.5} /><span className="absolute right-0 top-0 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#F77F4A] font-montserrat text-[8px] font-bold text-[#12141C]">0</span></button>
          <button className="p-2 md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </div>
      {menuOpen && <nav className="mt-5 flex flex-col gap-5 border-t border-white/10 pt-5 font-montserrat text-xs font-bold tracking-[0.18em] text-white/80 md:hidden">{['SHOP', 'ARTISTS', 'COLLECTIONS', 'STICKER LAB', 'DROPS'].map((item) => <a href={`#${item.toLowerCase().replace(' ', '-')}`} onClick={() => setMenuOpen(false)} key={item}>{item}</a>)}</nav>}
    </header>
  )
}

export function HeroDrop() {
  return (
    <section id="top" className="relative min-h-[720px] overflow-hidden bg-[#12141C] px-5 py-20 md:min-h-[780px] md:px-10 md:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
      <div className="relative z-10 mx-auto grid max-w-[1440px] items-center gap-10 lg:grid-cols-[1fr_1.05fr]">
        <div className="max-w-xl animate-appear-up">
          <div className="mb-6 flex items-center gap-3 font-montserrat text-[10px] font-bold tracking-[0.22em] text-[#F77F4A]"><span className="h-px w-10 bg-[#F77F4A]" /> DROP 001 / LA RÉUNION</div>
          <h1 className="font-author text-[clamp(4.8rem,12vw,10rem)] leading-[.78] tracking-[-0.08em] text-[#F3ECE0]">DISCOVER.<br /><span className="italic text-[#F77F4A]">CREATE.</span><br />COLLECT<span className="text-[#C8336A]">.</span></h1>
          <p className="mt-9 max-w-sm font-montserrat text-sm leading-6 text-white/60">Le sticker comme objet artistique. Des éditions limitées, imaginées par des artistes, fabriquées en France.</p>
          <div className="mt-9 flex flex-wrap gap-3"><a href="#shop" className="group flex items-center gap-3 bg-[#F77F4A] px-5 py-4 font-montserrat text-[10px] font-bold tracking-[0.16em] text-[#12141C] transition-transform hover:-translate-y-1">EXPLORE STICKERS <ArrowUpRight size={16} /></a><a href="#sticker-lab" className="flex items-center gap-3 border border-white/30 px-5 py-4 font-montserrat text-[10px] font-bold tracking-[0.16em] text-[#F3ECE0] transition-colors hover:border-[#F77F4A] hover:text-[#F77F4A]">CREATE YOUR STICKER</a></div>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-[660px] animate-scale-in">
          <div className="absolute inset-[12%] overflow-hidden rounded-[48%_52%_45%_55%] bg-[#171717]"><Image src="/kreatik/reunion-collage.png" alt="Collection 974, stickers inspirés de La Réunion" fill priority className="object-cover" sizes="(max-width: 1024px) 90vw, 55vw" /></div>
          {stickers.map((sticker, i) => <div key={sticker.label} className={`absolute ${sticker.position} ${sticker.rotate} ${sticker.color} animate-float-${i % 2 ? 'slow' : ''} z-10 flex aspect-square w-20 items-center justify-center rounded-[38%_62%_58%_42%] border-4 border-[#12141C] font-author text-xl font-bold shadow-[8px_12px_0_rgba(0,0,0,.35)] md:w-28 md:text-3xl`}>{sticker.label}</div>)}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-montserrat text-[9px] font-bold tracking-[0.18em] text-white/50">MADE IN FRANCE / 974</div>
        </div>
      </div>
      <div className="absolute bottom-7 left-5 font-montserrat text-[9px] tracking-[0.18em] text-white/30 md:left-10">SCROLL TO EXPLORE ↓</div>
    </section>
  )
}

export function DropTicker() {
  return <div className="flex overflow-hidden bg-[#F77F4A] py-3 font-montserrat text-[10px] font-bold tracking-[0.18em] text-[#12141C]"><div className="flex min-w-max animate-pulse-soft gap-10">{Array.from({ length: 6 }).map((_, i) => <span key={i}>DROP 001 — 7 DAYS ONLY <span className="mx-5">✳</span> 50% ARTIST SHARE</span>)}</div></div>
}

export function IntroStatement() {
  return <section className="bg-[#F3ECE0] px-5 py-24 text-[#12141C] md:px-10 md:py-36"><div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-[.7fr_1.3fr] md:items-end"><p className="font-montserrat text-[10px] font-bold tracking-[0.2em] text-[#C8336A]">01 / THE MANIFESTO</p><div><h2 className="font-author text-5xl leading-[.92] tracking-[-0.06em] md:text-8xl">DESIGN THAT<br /><span className="italic text-[#C8336A]">STICKS.</span></h2><p className="mt-8 max-w-xl font-montserrat text-sm leading-7 text-black/60">KREATIK est une galerie en mouvement. Une plateforme où l&apos;art sort des murs, se colle, se collectionne et voyage. Chaque drop célèbre un regard, une histoire, un territoire.</p></div></div></section>
}

export const sampleStickers = [
  ['Volcan', '#F77F4A', 'Mathys D.'], ['Maloya', '#00767D', 'Futur Crew'], ['Kréol Kid', '#F6E29B', 'Lina R.'], ['Lagon', '#C8336A', 'Noé M.'], ['Piton', '#F9CAB2', 'Maya L.'], ['Sega Club', '#00767D', 'Jo S.']
]

export function StickerVisual({ name, color, artist, index }: { name: string; color: string; artist: string; index: number }) {
  return <article className="group min-w-[190px] flex-1"><div className="relative aspect-square overflow-hidden bg-[#171717]" style={{ backgroundColor: index % 2 === 0 ? '#171717' : '#202020' }}><div className="absolute inset-[15%] flex items-center justify-center rounded-[42%_58%_54%_46%] border-[5px] border-[#12141C] p-5 text-center font-author text-3xl leading-none shadow-[10px_12px_0_rgba(0,0,0,.3)] transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105" style={{ backgroundColor: color, color: color === '#F6E29B' || color === '#F9CAB2' || color === '#F77F4A' ? '#12141C' : '#F3ECE0' }}>{name.toUpperCase()}</div><button className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center bg-[#12141C]/70 text-white transition-colors hover:text-[#F77F4A]" aria-label={`Ajouter ${name} aux favoris`}><Heart size={15} /></button><span className="absolute bottom-3 left-3 font-montserrat text-[9px] tracking-[0.16em] text-white/50">ED. 001 / 050</span></div><div className="flex justify-between gap-2 pt-3 font-montserrat text-[10px]"><div><p className="font-bold tracking-[0.08em]">{name}</p><p className="mt-1 text-black/50">by @{artist}</p></div><span className="font-bold">2,50 €</span></div></article>
}

export function TrendingSection() {
  const [filter, setFilter] = useState('THIS WEEK')
  return <section id="shop" className="bg-[#F3ECE0] px-5 py-24 text-[#12141C] md:px-10 md:py-32"><div className="mx-auto max-w-[1440px]"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="font-montserrat text-[10px] font-bold tracking-[0.2em] text-[#C8336A]">02 / COMMUNITY FAVOURITES</p><h2 className="mt-4 font-author text-6xl leading-none tracking-[-0.06em] md:text-8xl">TRENDING<br /><span className="italic text-[#F77F4A]">NOW.</span></h2></div><div className="flex gap-4 overflow-x-auto border-b border-black/15 pb-3 font-montserrat text-[9px] font-bold tracking-[0.12em]">{['TODAY', 'THIS WEEK', 'THIS MONTH', 'RISING ARTISTS'].map((item) => <button className={`whitespace-nowrap transition-colors ${filter === item ? 'text-[#C8336A]' : 'text-black/40 hover:text-black'}`} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div></div><div className="mt-12 flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-3 lg:grid-cols-6">{sampleStickers.map(([name, color, artist], index) => <StickerVisual key={name} name={name} color={color} artist={artist} index={index} />)}</div></div></section>
}

export function ArtistSection() {
  return <section id="artists" className="bg-[#00767D] px-5 py-24 text-[#F3ECE0] md:px-10 md:py-32"><div className="mx-auto max-w-[1440px]"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="font-montserrat text-[10px] font-bold tracking-[0.2em] text-[#F6E29B]">03 / THE CREW</p><h2 className="mt-4 font-author text-6xl leading-none tracking-[-0.06em] md:text-8xl">MEET THE<br /><span className="italic text-[#F6E29B]">ARTISTS.</span></h2></div><p className="max-w-xs font-montserrat text-sm leading-6 text-white/70">Des voix singulières, des univers qui débordent. Découvrez celles et ceux qui font KREATIK.</p></div><div className="mt-14 grid gap-px bg-white/20 md:grid-cols-4">{['Mathys Denaux', 'Futur Crew', 'Lina R.', 'Noé M.'].map((name, i) => <a href="#artists" key={name} className="group bg-[#00767D] p-5 transition-colors hover:bg-[#12141C]"><div className="flex aspect-[.9] items-end justify-between bg-[#F9CAB2] p-4 text-[#12141C]" style={{ backgroundColor: ['#F9CAB2', '#F77F4A', '#F6E29B', '#C8336A'][i] }}><span className="font-author text-4xl italic">0{i + 1}</span><ArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></div><div className="flex items-center justify-between pt-4"><div><p className="font-montserrat text-xs font-bold">{name}</p><p className="mt-1 font-montserrat text-[9px] tracking-[0.12em] text-white/50">@{name.toLowerCase().replace(' ', '')} / 12 DESIGNS</p></div><Sparkles size={16} className="text-[#F6E29B]" /></div></a>)}</div><div className="mt-10 flex items-center justify-between border-t border-white/20 pt-5"><p className="font-montserrat text-xs text-white/70">50% de la marge nette revient directement à l&apos;artiste.</p><a href="#artists" className="font-montserrat text-[10px] font-bold tracking-[0.16em] text-[#F6E29B]">DISCOVER ALL ARTISTS →</a></div></div></section>
}

export function CollectionSection() {
  return <section id="collections" className="bg-[#12141C] px-5 py-24 md:px-10 md:py-32"><div className="mx-auto max-w-[1440px]"><div className="grid gap-10 md:grid-cols-[.8fr_1.2fr] md:items-center"><div><p className="font-montserrat text-[10px] font-bold tracking-[0.2em] text-[#F77F4A]">04 / FEATURED COLLECTION</p><h2 className="mt-4 font-author text-7xl leading-[.8] tracking-[-0.08em] text-[#F3ECE0] md:text-9xl">974<br /><span className="italic text-[#F77F4A]">FUTUR.</span></h2><p className="mt-8 max-w-sm font-montserrat text-sm leading-6 text-white/60">Un hommage à l&apos;île intense. 5 artistes, 1 territoire, une édition qui ne reviendra pas.</p><a href="#drops" className="mt-8 inline-flex items-center gap-3 border-b border-[#F77F4A] pb-3 font-montserrat text-[10px] font-bold tracking-[0.16em] text-[#F3ECE0]">VIEW COLLECTION <ArrowUpRight size={15} /></a></div><div className="relative overflow-hidden bg-[#171717] p-4 md:p-8"><Image src="/kreatik/reunion-collage.png" alt="Collection 974 Futur, hommage artistique à La Réunion" width={900} height={700} className="aspect-[1.2] object-cover transition-transform duration-700 hover:scale-105" /></div></div></div></section>
}

export function DropBanner() {
  return <section id="drops" className="bg-[#C8336A] px-5 py-16 text-[#F3ECE0] md:px-10 md:py-24"><div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-8 md:flex-row md:items-center"><div><p className="font-montserrat text-[10px] font-bold tracking-[0.2em] text-white/70">LIVE NOW / LIMITED EDITION</p><h2 className="mt-3 font-author text-6xl leading-none tracking-[-0.06em] md:text-8xl">DROP 001 —<br /><span className="italic text-[#F6E29B]">974 FUTUR</span></h2></div><div className="border-l border-white/30 pl-6 md:min-w-[280px]"><p className="font-montserrat text-[10px] font-bold tracking-[0.18em] text-white/70">CLOSING IN</p><p className="mt-2 font-author text-5xl">06:18:42</p><p className="mt-3 font-montserrat text-[10px] text-white/70">Only available for 7 days</p><a href="#shop" className="mt-6 inline-flex items-center gap-3 bg-[#F6E29B] px-5 py-4 font-montserrat text-[10px] font-bold tracking-[0.16em] text-[#12141C]">SHOP THE DROP <ArrowUpRight size={15} /></a></div></div></section>
}

export function StickerLabPreview() {
  return <section id="sticker-lab" className="bg-[#F3ECE0] px-5 py-24 text-[#12141C] md:px-10 md:py-32"><div className="mx-auto max-w-[1440px] border-2 border-[#12141C] p-6 md:p-12"><div className="grid gap-12 md:grid-cols-[.8fr_1.2fr] md:items-center"><div><p className="font-montserrat text-[10px] font-bold tracking-[0.2em] text-[#C8336A]">05 / YOUR TURN</p><h2 className="mt-4 font-author text-6xl leading-[.85] tracking-[-0.06em] md:text-8xl">STICKER<br /><span className="italic text-[#F77F4A]">LAB.</span></h2><p className="mt-7 max-w-sm font-montserrat text-sm leading-6 text-black/60">Ton image. Ton idée. Ton sticker. Crée une pièce unique avec notre studio de personnalisation.</p><button className="mt-8 flex items-center gap-3 bg-[#12141C] px-5 py-4 font-montserrat text-[10px] font-bold tracking-[0.16em] text-[#F3ECE0] transition-transform hover:-translate-y-1">START CREATING <Sparkles size={15} className="text-[#F77F4A]" /></button></div><div className="relative flex min-h-[300px] items-center justify-center overflow-hidden bg-[#F9CAB2] p-8"><div className="absolute -right-8 -top-8 font-author text-[11rem] leading-none text-[#F77F4A]/30">✳</div><div className="relative rotate-[-8deg] rounded-[45%_55%_50%_50%] border-[7px] border-[#12141C] bg-[#F6E29B] px-8 py-14 font-author text-5xl leading-[.8] text-[#12141C] shadow-[14px_16px_0_#00767D] md:text-7xl">YOUR<br />IDEA<br /><span className="text-[#C8336A]">HERE.</span></div></div></div></div></section>
}

export function Footer() {
  return <footer className="bg-[#12141C] px-5 py-12 text-[#F3ECE0] md:px-10"><div className="mx-auto max-w-[1440px]"><div className="flex flex-col justify-between gap-10 border-b border-white/15 pb-12 md:flex-row"><div><p className="font-author text-5xl italic tracking-[-0.08em]">KREATIK<span className="text-[#F77F4A]">.</span></p><p className="mt-4 max-w-xs font-montserrat text-xs leading-5 text-white/50">Le sticker comme objet artistique.<br />Made with aloha from La Réunion.</p></div><div className="grid grid-cols-2 gap-x-16 gap-y-4 font-montserrat text-[10px] font-bold tracking-[0.14em] text-white/60"><a href="#shop">SHOP</a><a href="#artists">ARTISTS</a><a href="#collections">COLLECTIONS</a><a href="#sticker-lab">STICKER LAB</a><a href="#drops">DROPS</a><a href="#top">ABOUT</a></div></div><div className="flex flex-col justify-between gap-3 pt-6 font-montserrat text-[9px] tracking-[0.12em] text-white/35 md:flex-row"><span>© 2024 KREATIK STUDIO / MADE IN FRANCE</span><span>FSC PACKAGING / RECYCLABLE VINYL / VEGETABLE INKS</span></div></div></footer>
}

export function KreatikHome() {
  return <><SmoothScroll /><SiteHeader /><main><HeroDrop /><DropTicker /><IntroStatement /><TrendingSection /><ArtistSection /><CollectionSection /><DropBanner /><StickerLabPreview /></main><Footer /></>
}
