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

        <div className={`${styles.aboutImgCluster} r`}>
          <div className={styles.aboutImgMain}>
            <img src={IMG.aboutMain} alt="Meditation" />
          </div>
          <div className={styles.aboutImgAux}>
            <img src={IMG.aboutAux} alt="Gathering" />
          </div>
          <div className={styles.aboutGlassTag}>{t('about_tag')}</div>
        </div>

        <div className="r" style={{ transitionDelay: '0.18s' }}>
          <div className={styles.sectionLabel}>{t('about_label')}</div>
          <h2 className={styles.sectionTitle} dangerouslySetInnerHTML={tHTML('about_title')} />
          <p className={styles.aboutText}>{t('about_p1')}</p>
          <p className={styles.aboutText}>{t('about_p2')}</p>
          <div className={styles.aboutValues}>
            {(['about_v1','about_v2','about_v3','about_v4'] as const).map((key) => (
              <div key={key} className={styles.valueRow}>
                <div className={styles.valueDot} />
                <span>{t(key)}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
