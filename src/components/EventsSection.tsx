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
    dateHI: 'प्रत्येक शनिवार · दोपहर',
    titleEN: 'Sankalp',
    titleCS: 'Sankalp',
    titleHI: 'संकल्प',
    descEN:  'Live satsang and spiritual practice with Gurudev, broadcast every Saturday afternoon.',
    descCS:  'Živý satsang a duchovní praxe s Gurudevem, každou sobotu odpoledne.',
    descHI:  'गुरुदेव के साथ लाइव सत्संग और आध्यात्मिक अभ्यास, प्रत्येक शनिवार दोपहर प्रसारित।',
    linkEN:  'Watch on YouTube',
    linkCS:  'Sledovat na YouTube',
    linkHI:  'YouTube पर देखें',
    url:     'https://www.youtube.com/@karaulisarkarofficial',
    tag:     'WEEKLY',
    tagHI:   'साप्ताहिक',
    icon:    '◉',
    type:    'link' as const,
  },
  {
    dateEN: 'Every Sunday · Morning',
    dateCS: 'Každou neděli · ráno',
    dateHI: 'प्रत्येक रविवार · प्रातः',
    titleEN: 'Dhyan Sadhana',
    titleCS: 'Dhyan Sadhana',
    titleHI: 'ध्यान साधना',
    descEN:  'Morning meditation with music — a guided practice to start your week in stillness and awareness.',
    descCS:  'Ranní meditace s hudbou — vedená praxe pro začátek týdne v tichu a vědomí.',
    descHI:  'संगीत के साथ प्रातःकालीन ध्यान — सप्ताह की शुरुआत शांति और जागरूकता में करने के लिए एक निर्देशित अभ्यास।',
    linkEN:  'Watch on YouTube',
    linkCS:  'Sledovat na YouTube',
    linkHI:  'YouTube पर देखें',
    url:     'https://www.youtube.com/@PoornaGuru',
    tag:     'WEEKLY',
    tagHI:   'साप्ताहिक',
    icon:    '◎',
    type:    'link' as const,
  },
  {
    dateEN: 'Jul 25 – Aug 10, 2026 · India',
    dateCS: '25. 7. – 10. 8. 2026 · Indie',
    dateHI: '25 जुलाई – 10 अगस्त 2026 · भारत',
    titleEN: 'Ashram Visit',
    titleCS: 'Návštěva Ašrámu',
    titleHI: 'आश्रम भ्रमण',
    descEN:  'A transformative stay at the ashram in India. Immerse yourself in practice, teachings and the living tradition.',
    descCS:  'Transformativní pobyt v ašrámu v Indii. Ponoření do praxe, učení a živé tradice.',
    descHI:  'भारत में आश्रम में एक परिवर्तनकारी प्रवास। अभ्यास, शिक्षाओं और जीवित परंपरा में खुद को डुबोएं।',
    linkEN:  'Write to Us',
    linkCS:  'Napište nám',
    linkHI:  'हमें लिखें',
    url:     'mailto:jan@zero-balance.org,jiri@zero-balance.org?subject=Z%C3%A1jem%20o%20n%C3%A1v%C5%A1t%C4%9Bvu%20%C3%A1%C5%A1r%C3%A1mu%202026',
    tag:     'JOURNEY',
    tagHI:   'यात्रा',
    icon:    '✦',
    type:    'link' as const,
  },
]

function GurudevCard({ cs, hi }: { cs: boolean; hi: boolean }) {
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
          attributes: { LANGUAGE: hi ? 'hi' : cs ? 'cs' : 'en' } }),
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
        {hi ? 'चेक गणराज्य · 2027' : cs ? 'Česká republika · 2027' : 'Czech Republic · 2027'}
      </span>
      <div className={styles.eventTitle}>
        {hi ? 'गुरुदेव का चेक गणराज्य दौरा' : cs ? 'Příjezd Gurudeva do ČR' : 'Gurudev Visits Czech Republic'}
      </div>
      <p className={styles.eventDesc}>
        {hi
          ? 'हम चेक गणराज्य में गुरुदेव की एक असाधारण यात्रा की तैयारी कर रहे हैं। जैसे ही अधिक विवरण उपलब्ध होंगे, हम आपको तुरंत सूचित करेंगे।'
          : cs
          ? 'Připravujeme výjimečnou návštěvu Gurudeva v České republice. Jakmile budou k dispozici přesnější informace, dáme vám okamžitě vědět.'
          : 'We are preparing an extraordinary visit of Gurudev to the Czech Republic. As soon as more details are available, we will let you know immediately.'}
      </p>

      {status === 'ok' ? (
        <p className={styles.gurudevSuccess}>
          {hi ? '✦ पंजीकृत — हम आपको सूचित करेंगे' : cs ? '✦ Zaregistrováno — budeme vás informovat' : '✦ Registered — we will keep you informed'}
        </p>
      ) : (
        <div className={styles.gurudevForm}>
          <input
            type="email"
            placeholder={hi ? 'आपका ई-मेल' : cs ? 'Váš e-mail' : 'Your email'}
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
            {status === 'loading' ? '…' : hi ? 'सूचित करें' : cs ? 'Mám zájem' : 'Notify me'}
          </button>
          {status === 'err' && (
            <p className={styles.gurudevError}>
              {hi ? 'कृपया एक वैध ई-मेल दर्ज करें।' : cs ? 'Zadejte platný e-mail.' : 'Please enter a valid email.'}
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
  const hi = lang === 'hi'

  return (
    <section className={styles.events} id="events" ref={ref}>
      <div className={`${styles.evHeader} r`}>
        <div className={styles.sectionLabel}>{hi ? 'आगामी' : cs ? 'Nadcházející' : 'Upcoming'}</div>
        <h2 className={styles.sectionTitle}>
          {hi ? 'कार्यक्रम &' : cs ? 'Události &' : 'Events &'}<br />
          <span className="acc">{hi ? 'समागम' : cs ? 'setkání' : 'Gatherings'}</span>
        </h2>
      </div>

      <div className={styles.eventsGrid}>
        <GurudevCard cs={cs} hi={hi} />
        {EVENTS.map((ev, i) => (
          <div
            key={i}
            className={`${styles.eventCard} r`}
            style={{ transitionDelay: `${(i + 1) * 0.08}s` }}
          >
            <div className={styles.eventTop}>
              <span className={styles.eventTag}>{hi ? ev.tagHI : ev.tag}</span>
              <span className={styles.eventIcon}>{ev.icon}</span>
            </div>
            <span className={styles.eventDate}>{hi ? ev.dateHI : cs ? ev.dateCS : ev.dateEN}</span>
            <div className={styles.eventTitle}>{hi ? ev.titleHI : cs ? ev.titleCS : ev.titleEN}</div>
            <p className={styles.eventDesc}>{hi ? ev.descHI : cs ? ev.descCS : ev.descEN}</p>
            <a
              href={ev.url}
              className={styles.eventLink}
              target={ev.url.startsWith('http') ? '_blank' : undefined}
              rel={ev.url.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {hi ? ev.linkHI : cs ? ev.linkCS : ev.linkEN}
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}