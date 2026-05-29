'use client'

import { useRef } from 'react'
import styles from './ActivitiesSection.module.css'
import { useLang } from '../contexts/LangContext'
import { useScrollRevealAll } from '../hooks/useScrollReveal'
import IMG from '../lib/images'

const CARDS = [
  { imgKey: 'act1' as const, tagKey: 'act1_tag', titleKey: 'act1_title', descKey: 'act1_desc', large: true,  delay: '0s'    },
  { imgKey: 'act2' as const, tagKey: 'act2_tag', titleKey: 'act2_title', descKey: 'act2_desc', large: false, delay: '0.08s' },
  { imgKey: 'act3' as const, tagKey: 'act3_tag', titleKey: 'act3_title', descKey: 'act3_desc', large: false, delay: '0.16s' },
  { imgKey: 'act4' as const, tagKey: 'act4_tag', titleKey: 'act4_title', descKey: 'act4_desc', large: false, delay: '0.08s' },
  { imgKey: 'act5' as const, tagKey: 'act5_tag', titleKey: 'act5_title', descKey: 'act5_desc', large: false, delay: '0.16s' },
] as const

const CARD_LINKS: Record<string, string> = {
  act1: 'https://www.youtube.com/watch?v=hlnSuJFnywA',
  act3: 'https://www.youtube.com/watch?v=ubhUjMcCi14',
}

export default function ActivitiesSection() {
  const { t, tHTML } = useLang()
  const ref = useRef<HTMLElement>(null)
  useScrollRevealAll(ref)

  return (
    <section className={styles.activities} id="activities" ref={ref}>
      <div className={styles.activitiesHeader}>
        <div className="r">
          <div className={styles.sectionLabel}>{t('act_label')}</div>
          <h2 className={styles.sectionTitle} dangerouslySetInnerHTML={tHTML('act_title')} />
        </div>
        <p className="r" style={{ transitionDelay: '0.1s' }}>{t('act_desc')}</p>
      </div>

      <div className={styles.actGrid}>
        {CARDS.map((card) => {
          const link = CARD_LINKS[card.imgKey]
          const inner = (
            <>
              <img src={IMG[card.imgKey]} alt={t(card.titleKey)} />
              <div className={styles.actCardOverlay} />
              <div className={styles.actCardContent}>
                <span className={styles.actTag}>{t(card.tagKey)}</span>
                <div className={styles.actTitle} dangerouslySetInnerHTML={tHTML(card.titleKey)} />
                <p className={styles.actDesc}>{t(card.descKey)}</p>
              </div>
            </>
          )
          return link ? (
            <a
              key={card.imgKey}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.actCard} ${card.large ? styles.large : ''} r`}
              style={{ transitionDelay: card.delay, textDecoration: 'none', display: 'block' }}
            >
              {inner}
            </a>
          ) : (
            <div
              key={card.imgKey}
              className={`${styles.actCard} ${card.large ? styles.large : ''} r`}
              style={{ transitionDelay: card.delay }}
            >
              {inner}
            </div>
          )
        })}
      </div>
    </section>
  )
}
