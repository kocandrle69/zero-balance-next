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
    dateFR: 'Chaque samedi · Après-midi',
    dateES: 'Cada sábado · Tarde',
    dateDE: 'Jeden Samstag · Nachmittag',
    titleEN: 'Sankalp',
    titleCS: 'Sankalp',
    titleHI: 'संकल्प',
    titleFR: 'Sankalp',
    titleES: 'Sankalp',
    titleDE: 'Sankalp',
    descEN:  'Live satsang and spiritual practice with Gurudev, broadcast every Saturday afternoon.',
    descCS:  'Živý satsang a duchovní praxe s Gurudevem, každou sobotu odpoledne.',
    descHI:  'गुरुदेव के साथ लाइव सत्संग और आध्यात्मिक अभ्यास, प्रत्येक शनिवार दोपहर प्रसारित।',
    descFR:  'Satsang en direct et pratique spirituelle avec Gurudev, diffusés chaque samedi après-midi.',
    descES:  'Satsang en directo y práctica espiritual con Gurudev, todos los sábados por la tarde.',
    descDE:  'Live-Satsang und spirituelle Praxis mit Gurudev, jeden Samstagnachmittag.',
    linkEN:  'Watch on YouTube',
    linkCS:  'Sledovat na YouTube',
    linkHI:  'YouTube पर देखें',
    linkFR:  'Voir sur YouTube',
    linkES:  'Ver en YouTube',
    linkDE:  'Auf YouTube ansehen',
    url:     'https://www.youtube.com/@karaulisarkarofficial',
    tag:     'WEEKLY',
    tagHI:   'साप्ताहिक',
    tagFR:   'HEBDOMADAIRE',
    tagES:   'SEMANAL',
    tagDE:   'WÖCHENTLICH',
    icon:    '◉',
    type:    'link' as const,
  },
  {
    dateEN: 'Every Sunday · Morning',
    dateCS: 'Každou neděli · ráno',
    dateHI: 'प्रत्येक रविवार · प्रातः',
    dateFR: 'Chaque dimanche · Matin',
    dateES: 'Cada domingo · Mañana',
    dateDE: 'Jeden Sonntag · Morgen',
    titleEN: 'Dhyan Sadhana',
    titleCS: 'Dhyan Sadhana',
    titleHI: 'ध्यान साधना',
    titleFR: 'Dhyan Sadhana',
    titleES: 'Dhyan Sadhana',
    titleDE: 'Dhyan Sadhana',
    descEN:  'Morning meditation with music — a guided practice to start your week in stillness and awareness.',
    descCS:  'Ranní meditace s hudbou — vedená praxe pro začátek týdne v tichu a vědomí.',
    descHI:  'संगीत के साथ प्रातःकालीन ध्यान — सप्ताह की शुरुआत शांति और जागरूकता में करने के लिए एक निर्देशित अभ्यास।',
    descFR:  'Méditation matinale avec musique — une pratique guidée pour commencer la semaine dans le calme et la présence.',
    descES:  'Meditación matutina con música — una práctica guiada para comenzar la semana con quietud y atención.',
    descDE:  'Meditation am Morgen mit Musik — eine geführte Praxis, um die Woche in Stille und Achtsamkeit zu beginnen.',
    linkEN:  'Watch on YouTube',
    linkCS:  'Sledovat na YouTube',
    linkHI:  'YouTube पर देखें',
    linkFR:  'Voir sur YouTube',
    linkES:  'Ver en YouTube',
    linkDE:  'Auf YouTube ansehen',
    url:     'https://www.youtube.com/@PoornaGuru',
    tag:     'WEEKLY',
    tagHI:   'साप्ताहिक',
    tagFR:   'HEBDOMADAIRE',
    tagES:   'SEMANAL',
    tagDE:   'WÖCHENTLICH',
    icon:    '◎',
    type:    'link' as const,
  },
  {
    dateEN: 'Jul 25 – Aug 10, 2026 · India',
    dateCS: '25. 7. – 10. 8. 2026 · Indie',
    dateHI: '25 जुलाई – 10 अगस्त 2026 · भारत',
    dateFR: '25 juil. – 10 août 2026 · Inde',
    dateES: '25 jul. – 10 ago. 2026 · India',
    dateDE: '25. Juli – 10. Aug. 2026 · Indien',
    titleEN: 'Ashram Visit',
    titleCS: 'Návštěva Ašrámu',
    titleHI: 'आश्रम भ्रमण',
    titleFR: 'Visite de l’ashram',
    titleES: 'Visita al ashram',
    titleDE: 'Besuch im Ashram',
    descEN:  'A transformative stay at the ashram in India. Immerse yourself in practice, teachings and the living tradition.',
    descCS:  'Transformativní pobyt v ašrámu v Indii. Ponoření do praxe, učení a živé tradice.',
    descHI:  'भारत में आश्रम में एक परिवर्तनकारी प्रवास। अभ्यास, शिक्षाओं और जीवित परंपरा में खुद को डुबोएं।',
    descFR:  'Un séjour transformateur dans l’ashram en Inde. Plongez dans la pratique, les enseignements et la tradition vivante.',
    descES:  'Una estancia transformadora en el ashram de India. Sumérgete en la práctica, las enseñanzas y la tradición viva.',
    descDE:  'Ein Aufenthalt im Ashram in Indien, der vieles in Bewegung bringen kann. Tauche ein in Praxis, Lehre und lebendige Tradition.',
    linkEN:  'Write to Us',
    linkCS:  'Napište nám',
    linkHI:  'हमें लिखें',
    linkFR:  'Nous écrire',
    linkES:  'Escríbenos',
    linkDE:  'Schreib uns',
    url:     'mailto:jan@zero-balance.org,jiri@zero-balance.org?subject=Z%C3%A1jem%20o%20n%C3%A1v%C5%A1t%C4%9Bvu%20%C3%A1%C5%A1r%C3%A1mu%202026',
    tag:     'JOURNEY',
    tagHI:   'यात्रा',
    tagFR:   'VOYAGE',
    tagES:   'VIAJE',
    tagDE:   'REISE',
    icon:    '✦',
    type:    'link' as const,
  },
]

type LangFlags = { cs: boolean; hi: boolean; fr: boolean; es: boolean; de: boolean }

function GurudevCard({ cs, hi, fr, es, de }: LangFlags) {
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
          attributes: { LANGUAGE: hi ? 'hi' : cs ? 'cs' : fr ? 'fr' : es ? 'es' : de ? 'de' : 'en' } }),
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
        {hi ? 'चेक गणराज्य · 2027' : cs ? 'Česká republika · 2027' : fr ? 'République tchèque · 2027' : es ? 'República Checa · 2027' : de ? 'Tschechische Republik · 2027' : 'Czech Republic · 2027'}
      </span>
      <div className={styles.eventTitle}>
        {hi ? 'गुरुदेव का चेक गणराज्य दौरा' : cs ? 'Příjezd Gurudeva do ČR' : fr ? 'La venue de Gurudev en République tchèque' : es ? 'Visita de Gurudev a la República Checa' : de ? 'Gurudevs Besuch in der Tschechischen Republik' : 'Gurudev Visits Czech Republic'}
      </div>
      <p className={styles.eventDesc}>
        {hi
          ? 'हम चेक गणराज्य में गुरुदेव की एक असाधारण यात्रा की तैयारी कर रहे हैं। जैसे ही अधिक विवरण उपलब्ध होंगे, हम आपको तुरंत सूचित करेंगे।'
          : cs
          ? 'Připravujeme výjimečnou návštěvu Gurudeva v České republice. Jakmile budou k dispozici přesnější informace, dáme vám okamžitě vědět.'
          : fr
          ? 'Nous préparons la venue exceptionnelle de Gurudev en République tchèque. Dès que nous aurons plus de détails, nous vous en informerons aussitôt.'
          : es
          ? 'Estamos preparando una visita extraordinaria de Gurudev a la República Checa. En cuanto tengamos más detalles, te avisaremos de inmediato.'
          : de
          ? 'Wir bereiten einen außergewöhnlichen Besuch von Gurudev in der Tschechischen Republik vor. Sobald es mehr Informationen gibt, lassen wir es dich sofort wissen.'
          : 'We are preparing an extraordinary visit of Gurudev to the Czech Republic. As soon as more details are available, we will let you know immediately.'}
      </p>

      {status === 'ok' ? (
        <p className={styles.gurudevSuccess}>
          {hi ? '✦ पंजीकृत — हम आपको सूचित करेंगे' : cs ? '✦ Zaregistrováno — budeme vás informovat' : fr ? '✦ Inscription confirmée — nous vous tiendrons informé(e)' : es ? '✦ Registrado — te mantendremos informado/a' : de ? '✦ Angemeldet — wir halten dich auf dem Laufenden' : '✦ Registered — we will keep you informed'}
        </p>
      ) : (
        <div className={styles.gurudevForm}>
          <input
            type="email"
            placeholder={hi ? 'आपका ई-मेल' : cs ? 'Váš e-mail' : fr ? 'Votre e-mail' : es ? 'Tu email' : de ? 'Deine E-Mail' : 'Your email'}
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
            {status === 'loading' ? '…' : hi ? 'सूचित करें' : cs ? 'Mám zájem' : fr ? 'Cela m’intéresse' : es ? 'Me interesa' : de ? 'Interessiert mich' : 'Notify me'}
          </button>
          {status === 'err' && (
            <p className={styles.gurudevError}>
              {hi ? 'कृपया एक वैध ई-मेल दर्ज करें।' : cs ? 'Zadejte platný e-mail.' : fr ? 'Veuillez saisir une adresse e-mail valide.' : es ? 'Introduce una dirección de correo electrónico válida.' : de ? 'Bitte gib eine gültige E-Mail-Adresse ein.' : 'Please enter a valid email.'}
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
  const fr = lang === 'fr'
  const es = lang === 'es'
  const de = lang === 'de'

  return (
    <section className={styles.events} id="events" ref={ref}>
      <div className={`${styles.evHeader} r`}>
        <div className={styles.sectionLabel}>{hi ? 'आगामी' : cs ? 'Nadcházející' : fr ? 'À venir' : es ? 'Próximamente' : de ? 'Demnächst' : 'Upcoming'}</div>
        <h2 className={styles.sectionTitle}>
          {hi ? 'कार्यक्रम &' : cs ? 'Události &' : fr ? 'Événements &' : es ? 'Eventos &' : de ? 'Veranstaltungen &' : 'Events &'}<br />
          <span className="acc">{hi ? 'समागम' : cs ? 'setkání' : fr ? 'Rencontres' : es ? 'Encuentros' : de ? 'Begegnungen' : 'Gatherings'}</span>
        </h2>
      </div>

      <div className={styles.eventsGrid}>
        <GurudevCard cs={cs} hi={hi} fr={fr} es={es} de={de} />
        {EVENTS.map((ev, i) => (
          <div
            key={i}
            className={`${styles.eventCard} r`}
            style={{ transitionDelay: `${(i + 1) * 0.08}s` }}
          >
            <div className={styles.eventTop}>
              <span className={styles.eventTag}>{hi ? ev.tagHI : fr ? ev.tagFR : es ? ev.tagES : de ? ev.tagDE : ev.tag}</span>
              <span className={styles.eventIcon}>{ev.icon}</span>
            </div>
            <span className={styles.eventDate}>{hi ? ev.dateHI : cs ? ev.dateCS : fr ? ev.dateFR : es ? ev.dateES : de ? ev.dateDE : ev.dateEN}</span>
            <div className={styles.eventTitle}>{hi ? ev.titleHI : cs ? ev.titleCS : fr ? ev.titleFR : es ? ev.titleES : de ? ev.titleDE : ev.titleEN}</div>
            <p className={styles.eventDesc}>{hi ? ev.descHI : cs ? ev.descCS : fr ? ev.descFR : es ? ev.descES : de ? ev.descDE : ev.descEN}</p>
            <a
              href={ev.url}
              className={styles.eventLink}
              target={ev.url.startsWith('http') ? '_blank' : undefined}
              rel={ev.url.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {hi ? ev.linkHI : cs ? ev.linkCS : fr ? ev.linkFR : es ? ev.linkES : de ? ev.linkDE : ev.linkEN}
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}
