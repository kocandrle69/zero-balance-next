'use client'

import { useRef } from 'react'
import styles from './AboutSection.module.css'
import { useLang } from '../contexts/LangContext'
import { useScrollRevealAll } from '../hooks/useScrollReveal'
import IMG from '../lib/images'

export default function AboutSection() {
  const { t, tHTML } = useLang()
  const ref = useRef<HTMLElement>(null)
  useScrollRevealAll(ref)

  return (
    <section className={styles.about} id="about" ref={ref}>
      <div className={styles.aboutGrid}>

        <div className={`${styles.aboutImgStrip} r`}>
          <img src={IMG.aboutMain} alt="Meditation" />
        </div>

        <div className="r" style={{ transitionDelay: '0.18s' }}>
          <div className={styles.sectionLabel}>{t('about_label')}</div>
          <h2 className={styles.sectionTitle} dangerouslySetInnerHTML={tHTML('about_title')} />
          <p className={styles.aboutText}>{t('about_p1')}</p>
          <p className={styles.aboutText}>{t('about_p2')}</p>
          <p className={styles.aboutText}>{t('about_p3')}</p>
          <p className={styles.aboutText}>{t('about_p4')}</p>
          <a
            href="mailto:info@zero-balance.org"
            className={styles.aboutContact}
          >
            info@zero-balance.org
          </a>
        </div>

      </div>
    </section>
  )
}
