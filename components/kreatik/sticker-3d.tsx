'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import type { MouseEvent } from 'react'

export function StickerCard3D({
  src,
  alt,
  maxTilt = 16,
  maxShift = 10,
  shadowStrength = 1,
  className = '',
  imgClassName = '',
  sizes = '240px',
  priority = false,
}: {
  src: string
  alt: string
  maxTilt?: number
  maxShift?: number
  shadowStrength?: number
  className?: string
  imgClassName?: string
  sizes?: string
  priority?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, sx: 0, sy: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })
  const [hovering, setHovering] = useState(false)

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    setTilt({ rx: (0.5 - py) * maxTilt, ry: (px - 0.5) * maxTilt, sx: (px - 0.5) * maxShift, sy: (py - 0.5) * maxShift })
    setGlare({ x: px * 100, y: py * 100, opacity: 0.5 })
  }

  const reset = () => {
    setTilt({ rx: 0, ry: 0, sx: 0, sy: 0 })
    setGlare((g) => ({ ...g, opacity: 0 }))
    setHovering(false)
  }

  const shadowX = -tilt.ry * 1.2 * shadowStrength
  const shadowY = 10 + tilt.rx * 1.2 * shadowStrength

  // NOTE: `className` (passé par l'appelant) porte déjà la classe de position
  // (absolute/inset-*). On ne force plus "relative" dessus pour éviter un
  // conflit de classes Tailwind sur `position` qui empêchait la zone de
  // survol d'avoir la bonne taille — c'était le bug de l'effet invisible.
  return (
    <div className={className} style={{ perspective: 900 }}>
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={reset}
        className="relative h-full w-full motion-reduce:!transform-none"
        style={{
          transformStyle: 'preserve-3d',
          transform: `translate(${tilt.sx}px, ${tilt.sy}px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${hovering ? 1.08 : 1})`,
          transition: hovering ? 'transform 0.08s linear' : 'transform 0.5s cubic-bezier(.22,.9,.32,1)',
          filter: `drop-shadow(${shadowX}px ${shadowY}px ${18 * shadowStrength}px rgba(0,0,0,.45))`,
          willChange: 'transform',
        }}
      >
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className={`object-contain ${imgClassName}`} />
        {/* Reflet glossy masqué sur la silhouette réelle du PNG (alpha du détourage) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,.85) 0%, rgba(255,255,255,.12) 30%, transparent 55%)`,
            opacity: glare.opacity,
            mixBlendMode: 'overlay',
            transition: 'opacity .2s ease-out',
            WebkitMaskImage: `url(${src})`,
            maskImage: `url(${src})`,
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
