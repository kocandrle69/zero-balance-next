'use client'

import { useRef } from 'react'
import Image from 'next/image'
import styles from './IndiaSection.module.css'
import { useLang } from '../contexts/LangContext'
import { useScrollRevealAll } from '../hooks/useScrollReveal'
import IMG from '../lib/images'
import { Link } from '../i18n/navigation'

export default function IndiaSection() {
  const { t, tHTML } = useLang()
  const ref = useRef<HTMLElement>(null)
  useScrollRevealAll(ref)

  return (
    <section className={styles.india} id="india" ref={ref}>
      <div className={styles.indiaBg}>
        <Image src={IMG.indiaBg} alt="" fill sizes="100vw" quality={70} />
      </div>

      <div className={styles.indiaContent}>
        <div className="r">
          <div className={styles.sectionLabel}>{t('india_label')}</div>
          <h2 className={styles.sectionTitle} dangerouslySetInnerHTML={tHTML('india_title')} />
          <div className={styles.indiaStats}>
            <Link href="/media?category=ashram,place" className={styles.indiaStatLink}>
              <div className={styles.indiaStat}>
                <span className={styles.num}>{t('india_v1')}</span>
                <span className={styles.lbl}>{t('india_s1')}</span>
              </div>
            </Link>
            <Link href="/media?category=wisdom" className={styles.indiaStatLink}>
              <div className={styles.indiaStat}>
                <span className={styles.num}>{t('india_v2')}</span>
                <span className={styles.lbl}>{t('india_s2')}</span>
              </div>
            </Link>
            <Link href="/media?category=journeys,place" className={styles.indiaStatLink}>
              <div className={styles.indiaStat}>
                <span className={styles.num}>{t('india_v3')}</span>
                <span className={styles.lbl}>{t('india_s3')}</span>
              </div>
            </Link>
            <Link href="/media?category=sadhana" className={styles.indiaStatLink}>
              <div className={styles.indiaStat}>
                <span className={styles.num}>{t('india_v4')}</span>
                <span className={styles.lbl}>{t('india_s4')}</span>
              </div>
            </Link>
          </div>
        </div>

        <div className={`${styles.indiaRight} r`} style={{ transitionDelay: '0.2s' }}>
          <p>{t('india_p1')}</p>
          <p>{t('india_p2')}</p>
          <div className={styles.indiaGallery}>
            <div className={styles.indiaGalleryImg}><Image src={IMG.indiaGal1} alt="Gathering" fill sizes="(min-width: 900px) 25vw, 45vw" /></div>
            <div className={styles.indiaGalleryImg}><Image src={IMG.indiaGal2} alt="India" fill sizes="(min-width: 900px) 25vw, 45vw" /></div>
          </div>
        </div>
      </div>
    </section>
  )
}