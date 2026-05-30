'use client'

import { useRef, useState } from 'react'
import styles from './EventsSection.module.css'
import { useLang } from '../contexts/LangContext'
import { useScrollRevealAll } from '../hooks/useScrollReveal'

const BREVO_API_KEY = process.env.NEXT_PUBLIC_BREVO_API_KEY ?? ''
const GURUDEV_LIST_ID = 8 // "Zájem o návštěvu Gurudeva 2027"

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
    type:    'link' as const,
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
    type:    'link' as const,
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
    type:    'link' as const,
  },
]

function GurudevCard({ cs }: { cs: boolean }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle')

  async function handleSubmit() {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setStatus('err')
      return
    }
    setStatus('loading')

    if (!BREVO_API_KEY) {
      setTimeout(() => { setStatus('ok'); setEmail('') }, 600)
      return
    }

    try {
      const res = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'api-key': BREVO_API_KEY },
        body: JSON.stringify({ email, listIds: [GURUDEV_LIST_ID], updateEnabled: true, 
  attributes: { LANGUAGE: cs ? 'cs' : 'en' }  }),
      })
      if (res.ok || res.status === 204) {
        setStatus('ok')
        setEmail('')
      } else {
        setStatus('err')
      }
    } catch {
      setStatus('err')
    }
  }

  return (
    <div className={`${styles.eventCard} ${styles.eventCardGurudev} r`} style={{ transitionDelay: '0.32s' }}>
      <div className={styles.eventTop}>
        <span className={styles.eventTag}>2027</span>
        <span className={styles.eventIcon}>☸</span>
      </div>
      <span className={styles.eventDate}>
        {cs ? 'Česká republika · 2027' : 'Czech Republic · 2027'}
      </span>
      <div className={styles.eventTitle}>
        {cs ? 'Příjezd Gurudeva do ČR' : 'Gurudev Visits Czech Republic'}
      </div>
      <p className={styles.eventDesc}>
        {cs
          ? 'Připravujeme výjimečnou návštěvu Gurudeva v České republice. Jakmile budou k dispozici přesnější informace, dáme vám okamžitě vědět.'
          : 'We are preparing an extraordinary visit of Gurudev to the Czech Republic. As soon as more details are available, we will let you know immediately.'}
      </p>

      {status === 'ok' ? (
        <p className={styles.gurudevSuccess}>
          {cs ? '✦ Zaregistrováno — budeme vás informovat' : '✦ Registered — we will keep you informed'}
        </p>
      ) : (
        <div className={styles.gurudevForm}>
          <input
            type="email"
            placeholder={cs ? 'Váš e-mail' : 'Your email'}
            value={email}
            onChange={e => { setEmail(e.target.value); setStatus('idle') }}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            disabled={status === 'loading'}
            className={styles.gurudevInput}
          />
          <button
            type="button"
            onClick={handleSubmit}
            disabled={status === 'loading'}
            className={styles.gurudevBtn}
          >
            {status === 'loading' ? '…' : cs ? 'Mám zájem' : 'Notify me'}
          </button>
          {status === 'err' && (
            <p className={styles.gurudevError}>
              {cs ? 'Zadejte platný e-mail.' : 'Please enter a valid email.'}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

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
        <GurudevCard cs={cs} />
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