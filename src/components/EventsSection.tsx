'use client'

import { useRef } from 'react'
import styles from './EventsSection.module.css'
import { useLang } from '../contexts/LangContext'
import { useScrollRevealAll } from '../hooks/useScrollReveal'

const EVENTS = [
  {
    dateEN: 'Every Saturday · Afternoon',
    dateCS: 'Každou sobotu · odpoledne',
    titleEN: 'Sankalp',
    titleCS: 'Sankalp',
    descEN:  'Live satsang and spiritual practice with Gurudev, broadcast every Saturday afternoon.',
    descCS:  'Živý satsang a duchovní praxe s Gurudevem, každou sobotu odpoledne.',
    linkEN:  'Watch on YouTube',
    linkCS:  'Sledovat na YouTube',
    url:     'https://www.youtube.com/@karaulisarkarofficial',
    tag:     'WEEKLY',
    icon:    '◉',
  },
  {
    dateEN: 'Every Sunday · Morning',
    dateCS: 'Každou neděli · ráno',
    titleEN: 'Dhyan Sadhana',
    titleCS: 'Dhyan Sadhana',
    descEN:  'Morning meditation with music — a guided practice to start your week in stillness and awareness.',
    descCS:  'Ranní meditace s hudbou — vedená praxe pro začátek týdne v tichu a vědomí.',
    linkEN:  'Watch on YouTube',
    linkCS:  'Sledovat na YouTube',
    url:     'https://www.youtube.com/@PoornaGuru',
    tag:     'WEEKLY',
    icon:    '◎',
  },
  {
    dateEN: 'Jul 25 – Aug 10, 2026 · India',
    dateCS: '25. 7. – 10. 8. 2026 · Indie',
    titleEN: 'Ashram Visit',
    titleCS: 'Návštěva Ašrámu',
    descEN:  'A transformative stay at the ashram in India. Immerse yourself in practice, teachings and the living tradition.',
    descCS:  'Transformativní pobyt v ašrámu v Indii. Ponoření do praxe, učení a živé tradice.',
    linkEN:  'Learn More',
    linkCS:  'Zjistit více',
    url:     '#india',
    tag:     'JOURNEY',
    icon:    '✦',
  },
]

export default function EventsSection() {
  const { lang } = useLang()
  const ref = useRef<HTMLElement>(null)
  useScrollRevealAll(ref)
  const cs = lang === 'cs'

  return (
    <section className={styles.events} id="events" ref={ref}>
      <div className={`${styles.evHeader} r`}>
        <div className={styles.sectionLabel}>{cs ? 'Nadcházející' : 'Upcoming'}</div>
        <h2 className={styles.sectionTitle}>
          {cs ? 'Události &' : 'Events &'}<br />
          <span className="acc">{cs ? 'setkání' : 'Gatherings'}</span>
        </h2>
      </div>

      <div className={styles.eventsGrid}>
        {EVENTS.map((ev, i) => (
          <div
            key={i}
            className={`${styles.eventCard} r`}
            style={{ transitionDelay: `${(i + 1) * 0.08}s` }}
          >
            <div className={styles.eventTop}>
              <span className={styles.eventTag}>{ev.tag}</span>
              <span className={styles.eventIcon}>{ev.icon}</span>
            </div>
            <span className={styles.eventDate}>{cs ? ev.dateCS : ev.dateEN}</span>
            <div className={styles.eventTitle}>{cs ? ev.titleCS : ev.titleEN}</div>
            <p className={styles.eventDesc}>{cs ? ev.descCS : ev.descEN}</p>
            <a
              href={ev.url}
              className={styles.eventLink}
              target={ev.url.startsWith('http') ? '_blank' : undefined}
              rel={ev.url.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {cs ? ev.linkCS : ev.linkEN}
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
