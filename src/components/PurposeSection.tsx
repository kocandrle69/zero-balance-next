'use client'

import { useRef } from 'react'
import { Link } from '../i18n/navigation'
import styles from './PurposeSection.module.css'
import { useLang } from '../contexts/LangContext'
import { useScrollRevealAll } from '../hooks/useScrollReveal'
import IMG from '../lib/images'

const PILLARS = [
  {
    keywordKey: 'pill1_keyword' as const,
    titleKey:   'pill1_title'  as const,
    subKey:     'pill1_sub'    as const,
    href:       '/preserve',
    img:        IMG.purposePreserve,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="20" r="17" stroke="rgba(184,146,42,0.9)"  strokeWidth="0.75"/>
        <circle cx="20" cy="20" r="10" stroke="rgba(184,146,42,0.65)" strokeWidth="0.75"/>
        <circle cx="20" cy="20" r="2.5" fill="rgba(184,146,42,1)"/>
      </svg>
    ),
  },
  {
    keywordKey: 'pill2_keyword' as const,
    titleKey:   'pill2_title'  as const,
    subKey:     'pill2_sub'    as const,
    href:       '/lineage',
    img:        IMG.purposeLineage,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <path d="M20 3C24 11 24 29 20 37C16 29 16 11 20 3Z"   stroke="rgba(184,146,42,0.9)"  strokeWidth="0.75" fill="none"/>
        <path d="M3 20C11 24 29 24 37 20C29 16 11 16 3 20Z"   stroke="rgba(184,146,42,0.55)" strokeWidth="0.75" fill="none"/>
        <circle cx="20" cy="20" r="2.5" stroke="rgba(184,146,42,1)" strokeWidth="0.75" fill="none"/>
      </svg>
    ),
  },
  {
    keywordKey: 'pill3_keyword' as const,
    titleKey:   'pill3_title'  as const,
    subKey:     'pill3_sub'    as const,
    href:       '/community',
    img:        IMG.purposeCreate,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="10" r="4.5" stroke="rgba(184,146,42,0.9)"  strokeWidth="0.75"/>
        <circle cx="8"  cy="30" r="4.5" stroke="rgba(184,146,42,0.9)"  strokeWidth="0.75"/>
        <circle cx="32" cy="30" r="4.5" stroke="rgba(184,146,42,0.9)"  strokeWidth="0.75"/>
        <line x1="20" y1="14.5" x2="10" y2="25.5" stroke="rgba(184,146,42,0.4)" strokeWidth="0.75"/>
        <line x1="20" y1="14.5" x2="30" y2="25.5" stroke="rgba(184,146,42,0.4)" strokeWidth="0.75"/>
        <line x1="12.5" y1="30" x2="27.5" y2="30" stroke="rgba(184,146,42,0.4)" strokeWidth="0.75"/>
      </svg>
    ),
  },
  {
    keywordKey: 'pill4_keyword' as const,
    titleKey:   'pill4_title'  as const,
    subKey:     'pill4_sub'    as const,
    href:       '/serve',
    img:        IMG.purposeServe,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="20" r="15" stroke="rgba(184,146,42,0.9)" strokeWidth="0.75"/>
        <path d="M12 20C12 15.58 15.58 12 20 12C24.42 12 28 15.58 28 20"
              stroke="rgba(184,146,42,0.9)" strokeWidth="0.75" fill="none"/>
        <circle cx="20" cy="27" r="2" fill="rgba(184,146,42,0.9)"/>
      </svg>
    ),
  },
  {
    keywordKey: 'pill5_keyword' as const,
    titleKey:   'pill5_title'  as const,
    subKey:     'pill5_sub'    as const,
    href:       '/about',
    img:        IMG.purposeAbout,
    icon: (
      <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="20" r="17" stroke="rgba(184,146,42,0.9)" strokeWidth="0.75"/>
        <circle cx="20" cy="20" r="5"  fill="rgba(184,146,42,0.9)"/>
      </svg>
    ),
  },
]

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
        {PILLARS.map((p) => {
          const titleLines = t(p.titleKey).split('\n')
          return (
            <Link key={p.href} href={p.href} className={styles.card}>

              {/* Fotka pozadí */}
              <div
                className={styles.cardImg}
                style={{ backgroundImage: `url(${p.img})` }}
              />

              {/* Tmavý overlay */}
              <div className={styles.cardOverlay} />

              {/* Nahoře: keyword + šipka */}
              <div className={styles.cardTop}>
                <span className={styles.keyword}>{t(p.keywordKey)}</span>
                <span className={styles.arrow} aria-hidden="true">
                  <svg viewBox="0 0 10 10" fill="none">
                    <path d="M2 8L8 2M8 2H4M8 2V6"
                          stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </span>
              </div>

              {/* SVG symbol uprostřed */}
              <div className={styles.cardSymbol}>
                {p.icon}
              </div>

              {/* Dole: název + popis */}
              <div className={styles.cardBottom}>
                <h3 className={styles.cardTitle}>
                  {titleLines.map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < titleLines.length - 1 && <br />}
                    </span>
                  ))}
                </h3>
                <p className={styles.cardSub}>{t(p.subKey)}</p>
              </div>

              {/* Zlatá linka zdola — animace při hoveru */}
              <div className={styles.cardLine} />

            </Link>
          )
        })}
      </div>

    </section>
  )
}
