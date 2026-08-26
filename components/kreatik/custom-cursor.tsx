'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const dotPos = useRef({ x: 0, y: 0 })
  const glowPos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const raf = useRef<number | null>(null)
  const [hoverBig, setHoverBig] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isCoarse || reduced) return

    setReady(true)
    document.documentElement.classList.add('kt-cursor-none')

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX
      target.current.y = e.clientY
      const el = e.target as HTMLElement | null
      setHoverBig(!!el?.closest('a, button, [data-cursor-hover]'))
    }
    window.addEventListener('mousemove', onMove)

    let lastTime = performance.now()
    const loop = (now: number) => {
      // Delta-time normalisé sur 60fps : le mouvement reste identique
      // quel que soit le taux de rafraîchissement réel de l'écran.
      const dt = Math.min((now - lastTime) / (1000 / 60), 3)
      lastTime = now

      const dotEase = 1 - Math.pow(1 - 0.25, dt)
      const glowEase = 1 - Math.pow(1 - 0.09, dt)

      dotPos.current.x += (target.current.x - dotPos.current.x) * dotEase
      dotPos.current.y += (target.current.y - dotPos.current.y) * dotEase
      glowPos.current.x += (target.current.x - glowPos.current.x) * glowEase
      glowPos.current.y += (target.current.y - glowPos.current.y) * glowEase

      if (dotRef.current) dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`
      if (glowRef.current) glowRef.current.style.transform = `translate3d(${glowPos.current.x}px, ${glowPos.current.y}px, 0) translate(-50%, -50%)`

      raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf.current) cancelAnimationFrame(raf.current)
      document.documentElement.classList.remove('kt-cursor-none')
    }
  }, [])

  if (!ready) return null

  return (
    <>
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full transition-[width,height] duration-200 ease-out"
        style={{
          width: hoverBig ? 180 : 130,
          height: hoverBig ? 180 : 130,
          background: 'radial-gradient(circle, rgba(247,127,74,.4) 0%, rgba(247,127,74,.12) 45%, transparent 75%)',
          filter: 'blur(16px)',
          willChange: 'transform',
        }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-[#F3ECE0] transition-[width,height] duration-200 ease-out"
        style={{ width: hoverBig ? 14 : 8, height: hoverBig ? 14 : 8, willChange: 'transform' }}
      />
    </>
  )
}
