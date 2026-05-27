'use client'

import { useRef } from 'react'
import styles from './EventsSection.module.css'
import { useLang } from '../contexts/LangContext'
import { useScrollRevealAll } from '../hooks/useScrollReveal'

export default function EventsSection() {
  const { t, tHTML } = useLang()
  const ref = useRef<HTMLElement>(null)
  useScrollRevealAll(ref)

  return (
    <section className={styles.events} id="events" ref={ref}>
      <div className={`${styles.evHeader} r`}>
        <div className={styles.sectionLabel}>{t('ev_label')}</div>
        <h2
          className={styles.sectionTitle}
          dangerouslySetInnerHTML={tHTML('ev_title')}
        />
      </div>

      <div className={styles.eventsGrid}>
        {([
          { date:'ev1_date', title:'ev1_title', desc:'ev1_desc', more:'ev_more1' },
          { date:'ev2_date', title:'ev2_title', desc:'ev2_desc', more:'ev_more2' },
          { date:'ev3_date', title:'ev3_title', desc:'ev3_desc', more:'ev_more3' },
        ] as const).map((ev, i) => (
          <div
            key={i}
            className={`${styles.eventCard} r`}
            style={{ transitionDelay: `${(i + 1) * 0.06}s` }}
          >
            <span className={styles.eventDate}>{t(ev.date)}</span>
            <div className={styles.eventTitle}>{t(ev.title)}</div>
            <p className={styles.eventDesc}>{t(ev.desc)}</p>
            <a href="#" className={styles.eventLink}>{t(ev.more)}</a>
          </div>
        ))}
      </div>
    </section>
  )
}
