'use client'

import { useRef, useState } from 'react'
import styles from './EventsSection.module.css'
import { useLang } from '../contexts/LangContext'
import { useScrollRevealAll } from '../hooks/useScrollReveal'
import { Link } from '../i18n/navigation'

const BREVO_API_KEY = process.env.NEXT_PUBLIC_BREVO_API_KEY ?? ''

// Jeden list přes všechny jazyky nešel použít jako spouštěč automatizace —
// Brevo (na tomhle plánu) umí automatizaci navázat jen na "kontakt přidán
// do listu", ne na segment. Řešení: jeden list na jazyk, každý se svou
// vlastní automatizací. Chybějící jazyk → spadne do EN listu.
const GURUDEV_LIST_IDS: Partial<Record<'cs' | 'en' | 'hi' | 'fr' | 'es' | 'de', number>> = {
  cs: 11,
  en: 12,
  hi: 13,
  es: 14,
  fr: 15,
  de: 16,
}

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
  const [expanded, setExpanded] = useState(false)

  const lang = hi ? 'hi' : cs ? 'cs' : fr ? 'fr' : es ? 'es' : de ? 'de' : 'en'
  const listId = GURUDEV_LIST_IDS[lang] ?? GURUDEV_LIST_IDS.en!

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
        body: JSON.stringify({ email, listIds: [listId], updateEnabled: true,
          attributes: { LANGUAGE: lang } }),
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
      {/* Krátký teaser — vždy vidět, drží kartu v rozumné výšce vedle
          Sankalp/Dhyan Sadhana. Detail (kdo přijíždí + co se chystá) jde
          za "Zjistit více", ne natvrdo do karty. */}
      <p className={styles.eventDesc}>
        {hi
          ? 'जो लोग अपनी रुचि दर्ज करेंगे, उन्हें कार्यक्रम, तिथियाँ और विवरण पुष्टि होते ही सबसे पहले प्राप्त होंगे।'
          : cs
          ? 'Registrovaní zájemci se jako první dozvědí program, termíny a podrobnosti, jakmile budou potvrzeny.'
          : fr
          ? 'Les personnes ayant manifesté leur intérêt seront les premières informées du programme, des dates et des détails dès leur confirmation.'
          : es
          ? 'Quienes registren su interés serán los primeros en recibir el programa, las fechas y los detalles en cuanto estén confirmados.'
          : de
          ? 'Wer sein Interesse anmeldet, erhält das Programm, die Termine und die Details als Erster, sobald diese bestätigt sind.'
          : 'Those who register their interest will be the first to receive the programme, dates and details as soon as they are confirmed.'}
      </p>

      <button
        type="button"
        onClick={() => setExpanded(v => !v)}
        className={styles.gurudevMoreToggle}
        aria-expanded={expanded}
      >
        {expanded
          ? (hi ? 'कम दिखाएं' : cs ? 'Skrýt' : fr ? 'Réduire' : es ? 'Mostrar menos' : de ? 'Weniger anzeigen' : 'Show less')
          : (hi ? 'अधिक जानें' : cs ? 'Zjistit více' : fr ? 'En savoir plus' : es ? 'Leer más' : de ? 'Mehr erfahren' : 'Read more')}
        <span className={expanded ? styles.gurudevMoreArrowOpen : styles.gurudevMoreArrow}>↓</span>
      </button>

      <div className={`${styles.gurudevMore} ${expanded ? styles.gurudevMoreOpen : ''}`}>
        <div className={styles.gurudevMoreInner}>
          {/* Odstavec 1 — kdo přijíždí + titul (Pattábhišék v Haridváru,
              duben 2026). Terminologie záměrně "uveden do úřadu"/
              "installed", nikdy "korunovace"/"coronation" — viz brief. */}
          <p className={styles.eventDesc}>
            {hi
              ? 'अप्रैल 2026 में, हरिद्वार में पट्टाभिषेक समारोह के दौरान, श्री श्री 1008 करौली शंकर महादेव महाराज को श्री पंचायती अखाड़ा नया उदासीन निर्वाण — भारत के सबसे सम्मानित मठवासी अखाड़ों में से एक — के महामंडलेश्वर पद पर प्रतिष्ठित किया गया। महामंडलेश्वर की उपाधि अखाड़े के भीतर सर्वोच्च आध्यात्मिक पद है और उनके द्वारा प्रवाहित परंपरा की प्रामाणिकता की गारंटी है।'
              : cs
              ? 'V dubnu 2026 byl Sri Sri 1008 Karauli Shankar Mahadev Maharaj při obřadu Pattábhišék v Haridváru uveden do úřadu Mahámandaléšvary řádu Shri Panchayati Akhada Naya Udasin Nirvan — jednoho z nejváženějších mnišských řádů (ákhád) v Indii. Titul Mahámandaléšvary je nejvyšší duchovní hodnost v rámci ákhády a zárukou autenticity předávané tradice.'
              : fr
              ? 'En avril 2026, lors de la cérémonie du Pattabhishek à Haridwar, Sri Sri 1008 Karauli Shankar Mahadev Maharaj a été intronisé Mahamandaleshwar du Shri Panchayati Akhada Naya Udasin Nirvan — l’un des ordres monastiques (akhadas) les plus respectés d’Inde. Le titre de Mahamandaleshwar est le rang spirituel le plus élevé au sein d’un akhada et garantit l’authenticité de la tradition qu’il transmet.'
              : es
              ? 'En abril de 2026, durante la ceremonia del Pattabhishek en Haridwar, Sri Sri 1008 Karauli Shankar Mahadev Maharaj fue instalado como Mahamandaleshwar del Shri Panchayati Akhada Naya Udasin Nirvan — una de las órdenes monásticas (akhadas) más respetadas de la India. El título de Mahamandaleshwar es el rango espiritual más alto dentro de un akhada y garantiza la autenticidad de la tradición que transmite.'
              : de
              ? 'Im April 2026 wurde Sri Sri 1008 Karauli Shankar Mahadev Maharaj bei der Pattabhishek-Zeremonie in Haridwar als Mahamandaleshwar des Shri Panchayati Akhada Naya Udasin Nirvan eingesetzt — einem der angesehensten monastischen Orden (Akhadas) Indiens. Der Titel des Mahamandaleshwar ist der höchste spirituelle Rang innerhalb eines Akhada und eine Garantie für die Authentizität der von ihm getragenen Tradition.'
              : 'In April 2026, at the Pattabhishek ceremony in Haridwar, Sri Sri 1008 Karauli Shankar Mahadev Maharaj was installed as Mahamandaleshwar of the Shri Panchayati Akhada Naya Udasin Nirvan — one of the most respected monastic orders (akhadas) in India. The title of Mahamandaleshwar is the highest spiritual rank within an akhada and a guarantee of the authenticity of the tradition he carries.'}
          </p>

          {/* Odstavec 2 — co se chystá, bez konkrétních slibů (žádná města,
              počet dní, termíny v květnu, kapacita…) */}
          <p className={styles.eventDesc}>
            {hi
              ? 'मई 2027 में, Zero Balance Society भारतीय चिंतनशील परंपरा पर एक सांस्कृतिक एवं शैक्षिक कार्यक्रम की तैयारी कर रही है — जिसमें व्यापक जनसमुदाय के लिए खुला एक सार्वजनिक भाग, एक गहन अभ्यास-आधारित भाग, तथा उपशीर्षक सहित खुला ऑनलाइन प्रसारण शामिल होगा। विस्तृत कार्यक्रम, स्थान और तिथियाँ बाद में घोषित की जाएँगी।'
              : cs
              ? 'V květnu 2027 připravuje Zero Balance Society kulturně-vzdělávací program o indické kontemplativní tradici — s veřejnou částí přístupnou širší veřejnosti, hlubší praktickou částí a otevřeným online přenosem s titulky. Podrobný program, místa a termíny upřesníme.'
              : fr
              ? 'En mai 2027, Zero Balance Society prépare un programme culturel et éducatif sur la tradition contemplative indienne — comprenant une partie publique ouverte à un large public, une partie plus approfondie axée sur la pratique, ainsi qu’une diffusion en ligne ouverte avec sous-titres. Le programme détaillé, les lieux et les dates seront annoncés.'
              : es
              ? 'En mayo de 2027, Zero Balance Society está preparando un programa cultural y educativo sobre la tradición contemplativa de la India — con una parte pública abierta a un público más amplio, una parte más profunda basada en la práctica, y una transmisión en línea abierta con subtítulos. El programa detallado, los lugares y las fechas se anunciarán próximamente.'
              : de
              ? 'Im Mai 2027 bereitet die Zero Balance Society ein kulturelles und pädagogisches Programm über die indische kontemplative Tradition vor — mit einem öffentlichen Teil für ein breiteres Publikum, einem vertieften, praxisorientierten Teil und einer offenen Online-Übertragung mit Untertiteln. Das detaillierte Programm, die Orte und Termine werden noch bekannt gegeben.'
              : 'In May 2027, Zero Balance Society is preparing a cultural and educational programme on the Indian contemplative tradition — with a public part open to a wider audience, a deeper practice-based part, and an open online broadcast with subtitles. The detailed programme, locations and dates will be announced.'}
          </p>
        </div>
      </div>

      {/* Primární CTA — plná registrace přes Airtable formulář na samostatné
          stránce. Rychlý e-mailový capture (Brevo) níž zůstává jako lehčí
          druhá možnost pro ty, co se ještě jen chtějí nechat informovat. */}
      <Link href="/registrace-gurudev" className={styles.gurudevBtn} style={{ display: 'block', textAlign: 'center', textDecoration: 'none', marginBottom: 10 }}>
        {hi ? 'पंजीकरण करें' : cs ? 'Registrovat se' : fr ? 'S’inscrire' : es ? 'Registrarse' : de ? 'Registrieren' : 'Register'}
      </Link>

      {status === 'ok' ? (
        <p className={styles.gurudevSuccess}>
          {hi ? '✦ पंजीकृत — हम आपको सूचित करेंगे' : cs ? '✦ Zaregistrováno — budeme vás informovat' : fr ? '✦ Inscription confirmée — nous vous tiendrons informé(e)' : es ? '✦ Registrado — te mantendremos informado/a' : de ? '✦ Angemeldet — wir halten dich auf dem Laufenden' : '✦ Registered — we will keep you informed'}
        </p>
      ) : (
        <div className={styles.gurudevForm}>
          <p style={{ fontSize: 11, color: 'var(--muted)', margin: '0 0 2px', textAlign: 'center' }}>
            {hi ? 'या बस अपना ई-मेल छोड़ें:' : cs ? 'nebo nám nechte jen e-mail:' : fr ? 'ou laissez-nous simplement votre e-mail :' : es ? 'o déjanos solo tu email:' : de ? 'oder hinterlasse einfach deine E-Mail:' : 'or just leave your email:'}
          </p>
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
