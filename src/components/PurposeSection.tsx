'use client'

import { useRef } from 'react'
import styles from './PurposeSection.module.css'
import { useLang } from '../contexts/LangContext'
import { useScrollRevealAll } from '../hooks/useScrollReveal'

export default function PurposeSection() {
  const { t, tHTML } = useLang()
  const ref = useRef<HTMLElement>(null)
  useScrollRevealAll(ref)

  return (
    <section className={styles.purpose} id="philosophy" ref={ref}>
      <p className={`${styles.purposeLabel} r`}>{t('purpose_label')}</p>

      <h2
        className="r"
        style={{ transitionDelay: '0.08s' }}
        dangerouslySetInnerHTML={tHTML('purpose_title')}
      />

      <p
        className={`${styles.purposeDesc} r`}
        style={{ transitionDelay: '0.16s' }}
      >
        {t('purpose_desc')}
      </p>

      <div className={`${styles.pillars} r`} style={{ transitionDelay: '0.24s' }}>

        <div className={styles.pillar}>
          <div className={styles.pillarIconWrap}>
            <svg viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="22" stroke="rgba(184,146,42,0.3)"  strokeWidth="1"/>
              <circle cx="24" cy="24" r="14" stroke="rgba(184,146,42,0.4)"  strokeWidth=".75"/>
              <circle cx="24" cy="24" r="6"  stroke="rgba(184,146,42,0.55)" strokeWidth=".75"/>
              <circle cx="24" cy="24" r="2.5" fill="rgba(184,146,42,0.8)"/>
            </svg>
          </div>
          <span className={styles.pillarName}>{t('p1_name')}</span>
          <p className={styles.pillarText}>{t('p1_text')}</p>
        </div>

        <div className={styles.pillar}>
          <div className={styles.pillarIconWrap}>
            <svg viewBox="0 0 48 48" fill="none">
              <path d="M4 24 Q12 10 24 24 Q36 38 44 24" stroke="rgba(184,146,42,0.55)" strokeWidth="1" fill="none"/>
              <path d="M4 24 Q12 17 24 24 Q36 31 44 24" stroke="rgba(184,146,42,0.3)"  strokeWidth=".75" fill="none"/>
            </svg>
          </div>
          <span className={styles.pillarName}>{t('p2_name')}</span>
          <p className={styles.pillarText}>{t('p2_text')}</p>
        </div>

        <div className={styles.pillar}>
          <div className={styles.pillarIconWrap}>
            <svg viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="24" r="20" stroke="rgba(184,146,42,0.25)" strokeWidth=".75"/>
              <line x1="24" y1="4"  x2="24" y2="44" stroke="rgba(184,146,42,0.2)" strokeWidth=".75"/>
              <line x1="4"  y1="24" x2="44" y2="24" stroke="rgba(184,146,42,0.2)" strokeWidth=".75"/>
              <circle cx="24" cy="24" r="3"  fill="rgba(184,146,42,0.85)"/>
              <circle cx="24" cy="4"  r="2"  fill="rgba(184,146,42,0.45)"/>
              <circle cx="24" cy="44" r="2"  fill="rgba(184,146,42,0.45)"/>
              <circle cx="4"  cy="24" r="2"  fill="rgba(184,146,42,0.45)"/>
              <circle cx="44" cy="24" r="2"  fill="rgba(184,146,42,0.45)"/>
            </svg>
          </div>
          <span className={styles.pillarName}>{t('p3_name')}</span>
          <p className={styles.pillarText}>{t('p3_text')}</p>
        </div>

        <div className={styles.pillar}>
          <div className={styles.pillarIconWrap}>
            <svg viewBox="0 0 48 48" fill="none">
              <circle cx="24" cy="12" r="5" stroke="rgba(184,146,42,0.5)" strokeWidth=".75"/>
              <circle cx="10" cy="34" r="5" stroke="rgba(184,146,42,0.5)" strokeWidth=".75"/>
              <circle cx="38" cy="34" r="5" stroke="rgba(184,146,42,0.5)" strokeWidth=".75"/>
              <line x1="24" y1="17" x2="13" y2="29" stroke="rgba(184,146,42,0.25)" strokeWidth=".75"/>
              <line x1="24" y1="17" x2="35" y2="29" stroke="rgba(184,146,42,0.25)" strokeWidth=".75"/>
              <line x1="15" y1="34" x2="33" y2="34" stroke="rgba(184,146,42,0.25)" strokeWidth=".75"/>
            </svg>
          </div>
          <span className={styles.pillarName}>{t('p4_name')}</span>
          <p className={styles.pillarText}>{t('p4_text')}</p>
        </div>

        <div className={styles.pillar}>
          <div className={styles.pillarIconWrap}>
            <svg viewBox="0 0 48 48" fill="none">
              <path d="M24 4C30 14 30 34 24 44C18 34 18 14 24 4Z" stroke="rgba(184,146,42,0.4)"  strokeWidth=".75" fill="none"/>
              <path d="M4 24C14 30 34 30 44 24C34 18 14 18 4 24Z"  stroke="rgba(184,146,42,0.28)" strokeWidth=".75" fill="none"/>
              <circle cx="24" cy="24" r="3.5" stroke="rgba(184,146,42,0.65)" strokeWidth=".75" fill="none"/>
            </svg>
          </div>
          <span className={styles.pillarName}>{t('p5_name')}</span>
          <p className={styles.pillarText}>{t('p5_text')}</p>
        </div>

      </div>
    </section>
  )
}
