'use client'

import { useState, useRef } from 'react'
import { Upload, Sparkles } from 'lucide-react'
import { SiteHeader, Footer } from '@/components/kreatik/site-shell'

const FINISHES = ['Mat', 'Brillant', 'Holographique', 'Transparent']
const CONTOURS = ['Blanc', 'Noir', 'Aucun']
const SIZES = [{ label: '5 cm', mult: 0.8 }, { label: '9 cm', mult: 1 }, { label: '15 cm', mult: 1.6 }]
const BASE_PRICE = 9.99

export default function AtelierPage() {
  const [image, setImage] = useState<string | null>(null)
  const [finish, setFinish] = useState(FINISHES[0])
  const [contour, setContour] = useState(CONTOURS[0])
  const [sizeIndex, setSizeIndex] = useState(1)
  const [qty, setQty] = useState(1)
  const inputRef = useRef<HTMLInputElement>(null)

  const price = (BASE_PRICE * SIZES[sizeIndex].mult * qty).toFixed(2).replace('.', ',')

  const handleFile = (file: File | undefined) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setImage(reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <>
      <SiteHeader />
      <main className="bg-[#12141C] px-5 py-16 text-[#F3ECE0] md:px-10 md:py-24">
        <div className="mx-auto max-w-[1200px]">
          <p className="font-montserrat text-[10px] font-bold tracking-[0.2em] text-[#F77F4A]">ATELIER</p>
          <h1 className="mt-4 font-author text-5xl italic leading-none tracking-[-0.04em] md:text-7xl">Crée ton <span className="text-[#F77F4A]">sticker.</span></h1>
          <p className="mt-5 max-w-lg font-montserrat text-sm leading-6 text-white/60">Importe une image, choisis la finition et la taille, et prévisualise ton sticker avant de l&apos;ajouter au panier.</p>

          <div className="mt-14 grid gap-12 md:grid-cols-2">
            {/* Zone de prévisualisation */}
            <div>
              <div
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); handleFile(e.dataTransfer.files?.[0]) }}
                className="relative flex aspect-square cursor-pointer items-center justify-center overflow-hidden border-2 border-dashed border-white/20 bg-[#171717] transition-colors hover:border-[#F77F4A]/50"
              >
                {image ? (
                  <div
                    className="flex h-3/4 w-3/4 items-center justify-center bg-white/5 p-6 shadow-[0_20px_50px_-20px_rgba(0,0,0,.6)]"
                    style={{
                      border: contour === 'Aucun' ? 'none' : `6px solid ${contour === 'Blanc' ? '#F3ECE0' : '#12141C'}`,
                      filter: finish === 'Holographique' ? 'saturate(1.4) hue-rotate(8deg)' : finish === 'Mat' ? 'saturate(.9)' : undefined,
                      opacity: finish === 'Transparent' ? 0.75 : 1,
                    }}
                  >
                    <img src={image} alt="Aperçu de ton sticker" className="max-h-full max-w-full object-contain" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 text-white/40">
                    <Upload size={28} />
                    <p className="font-montserrat text-xs">Clique ou dépose ton image ici</p>
                  </div>
                )}
                <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />
              </div>
              <p className="mt-3 font-montserrat text-[11px] text-white/35">Formats acceptés : JPG, PNG. La suppression automatique du fond et la génération par IA arrivent bientôt — pour l&apos;instant, l&apos;aperçu est indicatif.</p>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-8">
              <div>
                <p className="font-montserrat text-[10px] font-bold tracking-[0.16em] text-white/50">FINITION</p>
                <div className="mt-3 flex flex-wrap gap-2">{FINISHES.map((f) => <button key={f} onClick={() => setFinish(f)} className={`border px-4 py-2.5 font-montserrat text-xs font-bold transition-colors ${finish === f ? 'border-[#F77F4A] bg-[#F77F4A] text-[#12141C]' : 'border-white/20 text-white/70 hover:border-white/40'}`}>{f}</button>)}</div>
              </div>
              <div>
                <p className="font-montserrat text-[10px] font-bold tracking-[0.16em] text-white/50">CONTOUR</p>
                <div className="mt-3 flex flex-wrap gap-2">{CONTOURS.map((c) => <button key={c} onClick={() => setContour(c)} className={`border px-4 py-2.5 font-montserrat text-xs font-bold transition-colors ${contour === c ? 'border-[#F77F4A] bg-[#F77F4A] text-[#12141C]' : 'border-white/20 text-white/70 hover:border-white/40'}`}>{c}</button>)}</div>
              </div>
              <div>
                <p className="font-montserrat text-[10px] font-bold tracking-[0.16em] text-white/50">TAILLE</p>
                <div className="mt-3 flex flex-wrap gap-2">{SIZES.map((s, i) => <button key={s.label} onClick={() => setSizeIndex(i)} className={`border px-4 py-2.5 font-montserrat text-xs font-bold transition-colors ${sizeIndex === i ? 'border-[#F77F4A] bg-[#F77F4A] text-[#12141C]' : 'border-white/20 text-white/70 hover:border-white/40'}`}>{s.label}</button>)}</div>
              </div>
              <div>
                <p className="font-montserrat text-[10px] font-bold tracking-[0.16em] text-white/50">QUANTITÉ</p>
                <div className="mt-3 flex items-center gap-4">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-9 w-9 border border-white/20 font-bold text-white/70 hover:border-white/40">−</button>
                  <span className="font-author text-xl">{qty}</span>
                  <button onClick={() => setQty((q) => Math.min(50, q + 1))} className="h-9 w-9 border border-white/20 font-bold text-white/70 hover:border-white/40">+</button>
                </div>
              </div>

              <div className="mt-4 border-t border-white/10 pt-6">
                <div className="flex items-end justify-between">
                  <p className="font-montserrat text-[10px] font-bold tracking-[0.16em] text-white/50">PRIX ESTIMÉ</p>
                  <p className="font-author text-4xl italic">{price} €</p>
                </div>
                <button disabled={!image} className="mt-5 flex w-full items-center justify-center gap-3 bg-[#F77F4A] px-5 py-4 font-montserrat text-[10px] font-bold tracking-[0.16em] text-[#12141C] transition-transform enabled:hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-40">
                  AJOUTER AU PANIER <Sparkles size={15} />
                </button>
                {!image && <p className="mt-3 font-montserrat text-[11px] text-white/35">Importe une image pour continuer.</p>}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
