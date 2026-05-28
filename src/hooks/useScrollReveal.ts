'use client'

import { useEffect, useRef } from 'react'

export function useScrollReveal() {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current

    // Immediately reveal if already visible (e.g. first section)
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight) {
      el.classList.add('on')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('on')
            observer.unobserve(e.target)   // disconnect after reveal
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return ref
}

// Observes ALL .r elements inside a container
export function useScrollRevealAll(containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!containerRef.current) return
    const els = Array.from(containerRef.current.querySelectorAll<HTMLElement>('.r'))
    if (els.length === 0) return

    const vh = window.innerHeight

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('on')
            observer.unobserve(e.target)   // disconnect after reveal (perf + iOS fix)
          }
        })
      },
      // Reduced negative margin so elements near bottom of viewport still trigger on small screens
      { threshold: 0.05, rootMargin: `0px 0px ${Math.min(-20, -(vh * 0.03))}px 0px` }
    )

    els.forEach((el) => {
      // Immediately reveal elements that are already in view on page load
      const rect = el.getBoundingClientRect()
      if (rect.top < vh) {
        el.classList.add('on')
      } else {
        observer.observe(el)
      }
    })

    return () => observer.disconnect()
  }, [])
}
