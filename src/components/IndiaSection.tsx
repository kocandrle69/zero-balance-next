'use client'

import { useRef } from 'react'
import styles from './IndiaSection.module.css'
import { useLang } from '../contexts/LangContext'
import { useScrollRevealAll } from '../hooks/useScrollReveal'
import IMG from '../lib/images'

export default function IndiaSection() {
  const { t, tHTML } = useLang()
  const ref = useRef<HTMLElement>(null)
  useScrollRevealAll(ref)

  return (
    <section className={styles.india} id="india" ref={ref}>
      {/* Background via inline style — no hardcoded URL in CSS */}
      <div
        className={styles.indiaBg}
        style={{ backgroundImage: `url('${IMG.indiaBg}')` }}
      />

      <div className={styles.indiaContent}>
        <div className="r">
          <div className={styles.sectionLabel}>{t('india_label')}</div>
          <h2 className={styles.sectionTitle} dangerouslySetInnerHTML={tHTML('india_title')} />
          <div className={styles.indiaStats}>
            <div className={styles.indiaStat}><span className={styles.num}>{t('india_v1')}</span><span className={styles.lbl}>{t('india_s1')}</span></div>
            <div className={styles.indiaStat}><span className={styles.num}>{t('india_v2')}</span><span className={styles.lbl}>{t('india_s2')}</span></div>
            <div className={styles.indiaStat}><span className={styles.num}>{t('india_v3')}</span><span className={styles.lbl}>{t('india_s3')}</span></div>
            <div className={styles.indiaStat}><span className={styles.num}>{t('india_v4')}</span><span className={styles.lbl}>{t('india_s4')}</span></div>
          </div>
        </div>

        <div className={`${styles.indiaRight} r`} style={{ transitionDelay: '0.2s' }}>
          <p>{t('india_p1')}</p>
          <p>{t('india_p2')}</p>
          <div className={styles.indiaGallery}>
            <div className={styles.indiaGalleryImg}><img src={IMG.indiaGal1} alt="Gathering" /></div>
            <div className={styles.indiaGalleryImg}><img src={IMG.indiaGal2} alt="India" /></div>
          </div>
        </div>
      </div>
    </section>
  )
}
