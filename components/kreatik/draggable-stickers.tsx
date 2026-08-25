'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent, RefObject } from 'react'

export type DraggableStickerDef = {
  label: string
  src: string
  w: number
  h: number
  rotate: string
  x: string // % within the anchor container, used for the initial position only
  y: string
  width: string // tailwind width classes, e.g. 'w-32 md:w-44'
}

const STORAGE_PREFIX = 'kreatik-sticker-pos:'

function SingleDraggableSticker({ def, anchorRef }: { def: DraggableStickerDef; anchorRef: RefObject<HTMLDivElement | null> }) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  const [dragging, setDragging] = useState(false)
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })
  const dragOffset = useRef({ dx: 0, dy: 0 })
  const elRef = useRef<HTMLDivElement>(null)

  // Compute initial position (once) from saved localStorage, or from the % position within the anchor
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_PREFIX + def.label) : null
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (typeof parsed.x === 'number' && typeof parsed.y === 'number') {
          setPos(parsed)
          return
        }
      } catch {}
    }
    const anchor = anchorRef.current
    if (!anchor) return
    const rect = anchor.getBoundingClientRect()
    const scrollY = window.scrollY || document.documentElement.scrollTop
    const scrollX = window.scrollX || document.documentElement.scrollLeft
    const px = rect.left + scrollX + (parseFloat(def.x) / 100) * rect.width
    const py = rect.top + scrollY + (parseFloat(def.y) / 100) * rect.height
    setPos({ x: px, y: py })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!elRef.current) return
    const rect = elRef.current.getBoundingClientRect()
    dragOffset.current = { dx: e.clientX - rect.left, dy: e.clientY - rect.top }
    elRef.current.setPointerCapture(e.pointerId)
    setDragging(true)
  }

  const handlePointerMoveDrag = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging) {
      // hover glare tracking when not dragging
      const rect = e.currentTarget.getBoundingClientRect()
      const px = ((e.clientX - rect.left) / rect.width) * 100
      const py = ((e.clientY - rect.top) / rect.height) * 100
      setGlare({ x: px, y: py, opacity: 0.5 })
      return
    }
    const scrollY = window.scrollY || document.documentElement.scrollTop
    const scrollX = window.scrollX || document.documentElement.scrollLeft
    const newX = e.clientX + scrollX - dragOffset.current.dx
    const newY = e.clientY + scrollY - dragOffset.current.dy
    setPos({ x: newX, y: newY })
  }

  const handlePointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragging) return
    elRef.current?.releasePointerCapture(e.pointerId)
    setDragging(false)
    if (pos && typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_PREFIX + def.label, JSON.stringify(pos))
    }
  }

  if (!pos) return null

  return (
    <div
      ref={elRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMoveDrag}
      onPointerUp={handlePointerUp}
      onPointerLeave={() => !dragging && setGlare((g) => ({ ...g, opacity: 0 }))}
      className={`pointer-events-auto absolute select-none ${def.width}`}
      style={{
        left: pos.x,
        top: pos.y,
        transform: `translate(-50%, -50%) rotate(${def.rotate}) scale(${dragging ? 1.08 : 1})`,
        transition: dragging ? 'none' : 'transform .25s cubic-bezier(.34,1.56,.64,1)',
        touchAction: 'none',
        cursor: dragging ? 'grabbing' : 'grab',
        zIndex: dragging ? 9999 : 20,
      }}
    >
      <div
        className="relative aspect-square"
        style={{
          filter: dragging
            ? 'drop-shadow(14px 22px 26px rgba(0,0,0,.55))'
            : 'drop-shadow(6px 10px 10px rgba(0,0,0,.4))',
          transition: 'filter .25s ease-out',
        }}
      >
        <Image src={def.src} alt={def.label} width={def.w} height={def.h} className="h-auto w-full object-contain" draggable={false} />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,.8) 0%, rgba(255,255,255,.1) 30%, transparent 55%)`,
            opacity: glare.opacity,
            mixBlendMode: 'overlay',
            transition: 'opacity .2s ease-out',
            WebkitMaskImage: `url(${def.src})`,
            maskImage: `url(${def.src})`,
            WebkitMaskSize: 'contain',
            maskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            maskPosition: 'center',
          }}
        />
      </div>
    </div>
  )
}

export function DraggableStickerLayer({ stickers, anchorRef }: { stickers: DraggableStickerDef[]; anchorRef: RefObject<HTMLDivElement | null> }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {stickers.map((s) => (
        <SingleDraggableSticker key={s.label} def={s} anchorRef={anchorRef} />
      ))}
    </div>
  )
}
