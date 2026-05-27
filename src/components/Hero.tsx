'use client'

import { useEffect, useRef } from 'react'
import styles from './Hero.module.css'
import { useLang } from '../contexts/LangContext'
import IMG from '../lib/images'

export default function Hero() {
  const { t, tHTML } = useLang()
  const bgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (bgRef.current && window.scrollY < window.innerHeight) {
        bgRef.current.style.transform = `scale(1.03) translateY(${window.scrollY * 0.12}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.heroBgFull}>
        <img ref={bgRef} src={IMG.heroBg} alt="Gathering" />
      </div>

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
        <span>{t('scroll')}</span>
        <div className={styles.scrollBar} />
      </div>
    </section>
  )
}
