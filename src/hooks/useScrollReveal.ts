'use client'

import { useEffect, useRef } from 'react'

export function useScrollReveal() {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('on')
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.unobserve(el)
  }, [])

  return ref
}

// Observes ALL .r elements inside a container — same as original HTML
export function useScrollRevealAll(containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!containerRef.current) return
    const els = containerRef.current.querySelectorAll('.r')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('on')
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
    els.forEach((el) => observer.observe(el))
    return () => els.forEach((el) => observer.unobserve(el))
  }, [])
}
