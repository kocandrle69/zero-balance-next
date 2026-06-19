'use client'

import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isTouch, setIsTouch] = useState(true)

  useEffect(() => {
    setIsTouch(!window.matchMedia('(hover: hover)').matches)
  }, [])

  useEffect(() => {
    if (isTouch) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let hovering = false

    const onMove = (e: MouseEvent) => {
      const x = e.clientX + 'px'
      const y = e.clientY + 'px'
      dot.style.left = x
      dot.style.top = y
      ring.style.left = x
      ring.style.top = y

      const isOverLink = !!(e.target as HTMLElement)?.closest?.('a, button, [data-cursor]')
      if (isOverLink !== hovering) {
        hovering = isOverLink
        if (hovering) {
          ring.style.transform = 'translate(-50%, -50%) scale(2.2)'
          ring.style.borderColor = 'rgba(184,146,42,0.7)'
          dot.style.opacity = '0'
        } else {
          ring.style.transform = 'translate(-50%, -50%) scale(1)'
          ring.style.borderColor = 'rgba(28,24,16,0.3)'
          dot.style.opacity = '1'
        }
      }
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [isTouch])

  if (isTouch) return null

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'var(--ink2)',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transition: 'opacity 0.2s',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1px solid rgba(28,24,16,0.3)',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%) scale(1)',
          transition: 'transform 0.3s cubic-bezier(0.23,1,0.32,1), border-color 0.3s',
        }}
      />
    </>
  )
}
