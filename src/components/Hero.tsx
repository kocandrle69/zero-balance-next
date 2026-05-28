'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './Hero.module.css'
import { useLang } from '../contexts/LangContext'

const SLIDES = [
  '/images/WEB1.png',
  '/images/anand-darbar-e-2.jpg',
]

export default function Hero() {
  const { t, tHTML } = useLang()
  const [current, setCurrent] = useState(0)
  const [fading, setFading]   = useState(false)
  const bgRef = useRef<HTMLDivElement>(null)

  // Crossfade every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true)
      setTimeout(() => {
        setCurrent(c => (c + 1) % SLIDES.length)
        setFading(false)
      }, 1000) // fade duration
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  // Parallax
  useEffect(() => {
    const el = bgRef.current
    const onScroll = () => {
      if (el && window.scrollY < window.innerHeight) {
        el.style.transform = `scale(1.03) translateY(${window.scrollY * 0.12}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className={styles.hero} id="hero">

      {/* Crossfade background */}
      <div className={styles.heroBgFull}>
        <div ref={bgRef} className={styles.heroBgInner}>
          {SLIDES.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              aria-hidden="true"
              className={`${styles.heroBgImg} ${
                i === current
                  ? fading ? styles.imgFadingOut : styles.imgVisible
                  : i === (current + 1) % SLIDES.length && fading
                    ? styles.imgFadingIn
                    : styles.imgHidden
              }`}
            />
          ))}
        </div>
      </div>

      {/* Dots indicator */}
      <div className={styles.slideDots}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Orbs */}
      <div className={styles.orb} style={{ width:200, height:200, top:'10%', right:'22%', animationDuration:'8s', opacity:0.55 }} />
      <div className={styles.orb} style={{ width:110, height:110, top:'52%', right:'10%', animationDuration:'10s', animationDelay:'-4s', opacity:0.4 }} />
      <div className={styles.orb} style={{ width:70,  height:70,  top:'26%', right:'8%',  animationDuration:'6.5s', animationDelay:'-2s', opacity:0.38 }} />

      <div className={styles.heroBottom}>
        <div className={styles.heroGlassCard}>
          <div className={styles.heroLabel}>{t('hero_label')}</div>
          <h1 className={styles.heroTitle} dangerouslySetInnerHTML={tHTML('hero_title')} />
          <div className={styles.heroLine} />
          <div className={styles.heroBtns}>
            <a href="#about" className={styles.btnGold}>{t('hero_btn1')}</a>
            <a href="#india" className={styles.btnText}>
              <div className={styles.playRing}>
                <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
                  <path d="M1 1L9 6L1 11V1Z" fill="currentColor"/>
                </svg>
              </div>
              <span>{t('hero_btn2')}</span>
            </a>
          </div>
        </div>

        <div className={styles.heroDescSide}>
          <p>{t('hero_desc')}</p>
        </div>
      </div>

      <div className={styles.heroScroll}>
       
        <div className={styles.scrollBar} />
      </div>

    </section>
  )
}
