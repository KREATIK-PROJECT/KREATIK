'use client'

import { useEffect, useRef, useState } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -100, y: -100 })
  const ring = useRef({ x: -100, y: -100 })
  const rafRef = useRef<number | null>(null)
  const [hoverBig, setHoverBig] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isCoarse || reduced) return

    setReady(true)
    document.documentElement.classList.add('kt-cursor-none')

    const handleMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`
      const target = e.target as HTMLElement | null
      setHoverBig(!!target?.closest('a, button, [data-cursor-hover]'))
    }
    window.addEventListener('mousemove', handleMove)

    const tick = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.16
      ring.current.y += (pos.current.y - ring.current.y) * 0.16
      if (ringRef.current) ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      document.documentElement.classList.remove('kt-cursor-none')
    }
  }, [])

  if (!ready) return null

  return (
    <div className="kt-custom-cursor-active">
      <div ref={dotRef} className="pointer-events-none fixed left-0 top-0 z-[9999] h-[5px] w-[5px] rounded-full bg-[#F77F4A]" style={{ willChange: 'transform' }} />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full border transition-[width,height,border-color] duration-200 ease-out"
        style={{
          width: hoverBig ? 42 : 24,
          height: hoverBig ? 42 : 24,
          borderColor: hoverBig ? '#F77F4A' : 'rgba(243,236,224,.4)',
          willChange: 'transform',
        }}
      />
    </div>
  )
}
