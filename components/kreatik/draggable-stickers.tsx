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
  x: string
  y: string
  width: string
}

const STORAGE_PREFIX = 'kreatik-sticker-pos:'

function SingleDraggableSticker({ def, anchorRef }: { def: DraggableStickerDef; anchorRef: RefObject<HTMLDivElement | null> }) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null)
  const [dragging, setDragging] = useState(false)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })
  const elRef = useRef<HTMLDivElement>(null)
  const dragData = useRef<{ offsetX: number; offsetY: number; lastX: number; lastY: number } | null>(null)

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
    if (!elRef.current || !pos) return
    const scrollY = window.scrollY || document.documentElement.scrollTop
    const scrollX = window.scrollX || document.documentElement.scrollLeft
    const pointerDocX = e.clientX + scrollX
    const pointerDocY = e.clientY + scrollY
    dragData.current = { offsetX: pointerDocX - pos.x, offsetY: pointerDocY - pos.y, lastX: pos.x, lastY: pos.y }
    elRef.current.setPointerCapture(e.pointerId)
    elRef.current.style.transition = 'none'
    setDragging(true)
  }

  const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragData.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width
      const py = (e.clientY - rect.top) / rect.height
      setTilt({ rx: (0.5 - py) * 14, ry: (px - 0.5) * 14 })
      setGlare({ x: px * 100, y: py * 100, opacity: 0.5 })
      return
    }
    const scrollY = window.scrollY || document.documentElement.scrollTop
    const scrollX = window.scrollX || document.documentElement.scrollLeft
    const newX = e.clientX + scrollX - dragData.current.offsetX
    const newY = e.clientY + scrollY - dragData.current.offsetY
    dragData.current.lastX = newX
    dragData.current.lastY = newY
    if (elRef.current) {
      elRef.current.style.left = `${newX}px`
      elRef.current.style.top = `${newY}px`
    }
  }

  const handlePointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragData.current) return
    elRef.current?.releasePointerCapture(e.pointerId)
    if (elRef.current) elRef.current.style.transition = ''
    const { lastX, lastY } = dragData.current
    setDragging(false)
    setPos({ x: lastX, y: lastY })
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_PREFIX + def.label, JSON.stringify({ x: lastX, y: lastY }))
    }
    dragData.current = null
  }

  const handlePointerLeave = () => {
    if (dragData.current) return
    setTilt({ rx: 0, ry: 0 })
    setGlare((g) => ({ ...g, opacity: 0 }))
  }

  if (!pos) return null

  return (
    <div
      ref={elRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerLeave}
      className={`pointer-events-auto absolute select-none ${def.width}`}
      style={{
        left: pos.x,
        top: pos.y,
        transform: `translate(-50%, -50%) rotate(${def.rotate})`,
        touchAction: 'none',
        cursor: dragging ? 'grabbing' : 'grab',
        zIndex: dragging ? 9999 : 20,
        perspective: 800,
      }}
    >
      <div
        className="relative aspect-square"
        style={{
          transform: dragging ? 'scale(1.08)' : `scale(1) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transition: dragging ? 'none' : 'transform .35s cubic-bezier(.22,.9,.32,1)',
          filter: dragging ? 'drop-shadow(14px 22px 26px rgba(0,0,0,.55))' : 'drop-shadow(6px 10px 10px rgba(0,0,0,.4))',
        }}
      >
        <Image src={def.src} alt={def.label} width={def.w} height={def.h} className="h-auto w-full object-contain" draggable={false} />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,.85) 0%, rgba(255,255,255,.1) 30%, transparent 55%)`,
            opacity: dragging ? 0.6 : glare.opacity,
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
