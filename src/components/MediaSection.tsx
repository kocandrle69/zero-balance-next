'use client'

import { useRef, useState } from 'react'
import styles from './MediaSection.module.css'
import { useScrollRevealAll } from '../hooks/useScrollReveal'
import { useLang } from '../contexts/LangContext'

// ─── Kategorie ────────────────────────────────────────────────────────────────
export type VideoCategory =
  | 'sadhana' | 'wisdom' | 'ashram' | 'place'
  | 'deeksha' | 'gurudev' | 'aarti' | 'journeys' | 'meditation' | 'rituals'

export const CATEGORIES: { id: VideoCategory; labelCS: string; labelEN: string }[] = [
  { id: 'sadhana',    labelCS: 'Sadhana',           labelEN: 'Sadhana' },
  { id: 'wisdom',     labelCS: 'Moudrost Indie',     labelEN: 'Wisdom of India' },
  { id: 'ashram',     labelCS: 'Život v ášrámu',     labelEN: 'Ashram life' },
  { id: 'place',      labelCS: 'Okolí ášrámu',       labelEN: 'Around the ashram' },
  { id: 'deeksha',    labelCS: 'Deeksha',            labelEN: 'Deeksha' },
  { id: 'gurudev',    labelCS: 'Gurudev',            labelEN: 'Gurudev' },
  { id: 'aarti',      labelCS: 'Aarti',              labelEN: 'Aarti' },
  { id: 'journeys',   labelCS: 'Cesty do Indie',     labelEN: 'Journeys to India' },
  { id: 'meditation', labelCS: 'Meditace',           labelEN: 'Meditation' },
  { id: 'rituals',    labelCS: 'Rituály & havany',   labelEN: 'Rituals & havans' },
]

// ─── Video data ───────────────────────────────────────────────────────────────
// Pořadí na hlavní stránce: featured = Sadhana, preview[0] = Moudrost Indie, preview[1] = Ášrám
export const VIDEOS = [
  // 1. FEATURED — Sadhana s českým překladem
  {
    id: 'hlnSuJFnywA',
    titleCS: 'Sadhana pod vedením Gurudeva — s českým dabingem',
    titleEN: 'Sadhana under Gurudev\u2019s Guidance \u2014 Czech dubbing',
    descCS:  'Vedená sadhana s přímým přenosem učení Gurudeva — s českým dabingem pro naši komunitu.',
    descEN:  'Guided sadhana with direct transmission from Gurudev — with Czech dubbing for our community.',
    date:    '2025',
    dateEN:  '2025',
    category: 'sadhana' as const,
    categories: ['sadhana', 'meditation'] as VideoCategory[],
    tag:     'SADHANA',
    tagEN:   'SADHANA',
  },
  // 2. PREVIEW — Moudrost Indie: Úvod (lekce 1)
  {
    id: 'rOTNqc8BbHw',
    titleCS: 'Moudrost Indie se Sensei Rajeev Sinha — Úvod',
    titleEN: 'Wisdom of India with Sensei Rajeev Sinha — Introduction',
    descCS:  'První lekce ze série Moudrost Indie. Sensei Rajeev Sinha uvádí do hloubky indické filozofie a spirituální praxe.',
    descEN:  'First lesson from the Wisdom of India series. Sensei Rajeev Sinha introduces the depth of Indian philosophy and spiritual practice.',
    date:    '2024',
    dateEN:  '2024',
    category: 'wisdom' as const,
    tag:     'MOUDROST',
    tagEN:   'WISDOM',
  },
  // 3. PREVIEW — Ášrám
  {
    id: 'ipJoR8PvPDo',
    titleCS: 'Týden v ášrámu Karauli Shankar Mahadev Dham',
    titleEN: 'A Week at Karauli Shankar Mahadev Dham Ashram',
    descCS:  'Pohled do každodenního rytmu ášrámu — ranní sadhana, puja, satsang a tiché chvíle.',
    descEN:  'A glimpse into the daily rhythm of the ashram — morning sadhana, puja, satsang and quiet moments.',
    date:    '2025',
    dateEN:  '2025',
    category: 'ashram' as const,
    tag:     'ÁŠRAM',
    tagEN:   'ASHRAM',
  },
  // ─── Všechna videa (/media) ────────────────────────────────────────────────
  // Sekce: Moudrost Indie
  {
    id: 'OzXzXRVnFvc',
    titleCS: 'Moudrost Indie — Finding a Complete Master',
    titleEN: 'Wisdom of India — Finding a Complete Master',
    descCS:  'Druhá lekce série: co to znamená najít skutečného mistra na duchovní cestě.',
    descEN:  'Second lesson: what it means to find a true master on the spiritual path.',
    date:    '2024',
    dateEN:  '2024',
    category: 'wisdom' as const,
    tag:     'MOUDROST',
    tagEN:   'WISDOM',
  },
  {
    id: 'OxrFgXqKYFg',
    titleCS: 'Moudrost Indie — Kontrola nad prvky přírody',
    titleEN: 'Wisdom of India — Control over the Elements of Nature',
    descCS:  'Třetí lekce: jak jogíni a tantrikové pracují s přírodními silami.',
    descEN:  'Third lesson: how yogis and tantrikas work with the forces of nature.',
    date:    '2024',
    dateEN:  '2024',
    category: 'wisdom' as const,
    tag:     'MOUDROST',
    tagEN:   'WISDOM',
  },
  {
    id: 'L17tfQvwT_I',
    titleCS: 'Moudrost Indie — Lekce 4',
    titleEN: 'Wisdom of India — Lesson 4',
    descCS:  'Čtvrtá část série s Sensei Rajeev Sinha.',
    descEN:  'Fourth part of the series with Sensei Rajeev Sinha.',
    date:    '2024',
    dateEN:  '2024',
    category: 'wisdom' as const,
    tag:     'MOUDROST',
    tagEN:   'WISDOM',
  },
  {
    id: '3zmenJyvr7o',
    titleCS: 'Moudrost Indie — Religion is Coded Human Expression',
    titleEN: 'Wisdom of India — Religion is Coded Human Expression',
    descCS:  'Pátá lekce: náboženství jako zakódovaný lidský výraz vědomí.',
    descEN:  'Fifth lesson: religion as coded human expression of consciousness.',
    date:    '2024',
    dateEN:  '2024',
    category: 'wisdom' as const,
    tag:     'MOUDROST',
    tagEN:   'WISDOM',
  },
  {
    id: '_Yt0UzvmfG8',
    titleCS: 'Moudrost Indie — Science is the Law of Nature',
    titleEN: 'Wisdom of India — Science is the Law of Nature',
    descCS:  'Šestá lekce: věda jako zákon přírody v pohledu indické filozofie.',
    descEN:  'Sixth lesson: science as the law of nature from an Indian philosophical perspective.',
    date:    '2024',
    dateEN:  '2024',
    category: 'wisdom' as const,
    tag:     'MOUDROST',
    tagEN:   'WISDOM',
  },
  {
    id: 'b4RmE7bxkJ4',
    titleCS: 'Moudrost Indie — Jak nejlépe pokročit v sadhně?',
    titleEN: 'Wisdom of India — What are the best ways to progress in sadhna?',
    descCS:  'Sedmá lekce: praktické rady pro pokrok na cestě sadhany.',
    descEN:  'Seventh lesson: practical guidance for progressing on the path of sadhana.',
    date:    '2024',
    dateEN:  '2024',
    category: 'wisdom' as const,
    tag:     'MOUDROST',
    tagEN:   'WISDOM',
  },
  {
    id: 'x4bmLRMA1oI',
    titleCS: 'Moudrost Indie — Unlocking the Power of YogaTantra',
    titleEN: 'Wisdom of India — Unlocking the Power of YogaTantra',
    descCS:  'Osmá lekce: síla Jógatantry a jak ji aktivovat v praxi.',
    descEN:  'Eighth lesson: the power of YogaTantra and how to activate it in practice.',
    date:    '2024',
    dateEN:  '2024',
    category: 'wisdom' as const,
    tag:     'MOUDROST',
    tagEN:   'WISDOM',
  },
  // Sekce: Sadhana
  {
    id: 'RWklWj6_mcY',
    titleCS: 'DhyanSadhana — týdenní praxe na kanálu @PoornaGuru',
    titleEN: 'DhyanSadhana — weekly practice on @PoornaGuru channel',
    descCS:  'Týdenní meditační sadhana v hindštině na kanálu Poorna Guru.',
    descEN:  'Weekly meditation sadhana in Hindi on the Poorna Guru channel.',
    date:    '2025',
    dateEN:  '2025',
    category: 'sadhana' as const,
    categories: ['sadhana', 'meditation'] as VideoCategory[],
    tag:     'SADHANA',
    tagEN:   'SADHANA',
  },
  // Sekce: Ášrám
  {
    id: 'nqVjdWMgWbY',
    titleCS: 'Ášrám Karauli Shankar Mahadev Dham — záznamy',
    titleEN: 'Karauli Shankar Mahadev Dham Ashram — recordings',
    descCS:  'Záznamy ze života v ášrámu — rituály, praxe a duchovní atmosféra místa.',
    descEN:  'Recordings from ashram life — rituals, practice and the spiritual atmosphere of the place.',
    date:    '2025',
    dateEN:  '2025',
    category: 'ashram' as const,
    tag:     'ÁŠRAM',
    tagEN:   'ASHRAM',
  },

  {
    id: 'ybIq2ZYYxGk',
    titleCS: 'Leden 2026 — Karauli Shankar Mahadev Dham',
    titleEN: 'January 2026 — Karauli Shankar Mahadev Dham',
    descCS:  'Záznamy z pobytu v ášrámu v lednu 2026. Atmosféra, praxe a každodenní život v Karauli.',
    descEN:  'Recordings from the ashram stay in January 2026. Atmosphere, practice and daily life in Karauli.',
    date:    'Leden 2026',
    dateEN:  'January 2026',
    category: 'ashram' as const,
    tag:     'ÁŠRAM',
    tagEN:   'ASHRAM',
  },
  {
    id: 'Lgz_pjQ8mok',
    titleCS: 'Udělení Deeksha v ášrámu Karauli Shankar',
    titleEN: 'Deeksha Ceremony at Karauli Shankar Ashram',
    descCS:  'Převedení do vyšší úrovně Tantra Yog — vzácný obřad v přítomnosti Gurudeva.',
    descEN:  'Initiation into a higher level of Tantra Yog — a rare ceremony in the presence of Gurudev.',
    date:    '2025',
    dateEN:  '2025',
    category: 'deeksha' as const,
    tag:     'DEEKSHA',
    tagEN:   'DEEKSHA',
  },
  // Sekce: Okolí ášrámu
  {
    id: 'DnFdardLSV8',
    titleCS: 'Okolí ášrámu Karauli Shankar Mahadev Dham',
    titleEN: 'Around Karauli Shankar Mahadev Dham Ashram',
    descCS:  'Procházka okolím ášrámu — krajina, chrámy a každodenní život v Karauli.',
    descEN:  'A walk around the ashram — landscape, temples and everyday life in Karauli.',
    date:    '2025',
    dateEN:  '2025',
    category: 'place' as const,
    tag:     'MÍSTO',
    tagEN:   'PLACE',
  },

  // ── Meditace žáků ─────────────────────────────────────────────────────────
  {
    id: '9CI51jXo-q4',
    category: 'meditation' as const,
    titleCS: 'AUM Meditace — noční praxe žáků v ášrámu',
    titleEN: 'AUM Meditation — night practice of disciples at the ashram',
    descCS:  'Závěrečná noční meditace žáků v ášrámu Karauli Shankar — dokončení úrovně ve dvě ráno.',
    descEN:  'Final night meditation of disciples at Karauli Shankar ashram — completing a level at 2 AM.',
    date: '2025', dateEN: '2025', tag: 'MEDITACE', tagEN: 'MEDITATION',
  },
  {
    id: '882UtPlnSXE',
    category: 'meditation' as const,
    titleCS: 'Zahraniční žáci Gurudeva — duchovní praxe v ášrámu',
    titleEN: 'Gurudev\'s foreign disciples — spiritual practice at the ashram',
    descCS:  'Zahraniční žáci Karauli Sarkar dokončují svou duchovní praxi před slavností Guru Purnima.',
    descEN:  'Foreign disciples of Karauli Sarkar completing their spiritual practice before Guru Purnima.',
    date: '2025', dateEN: '2025', tag: 'MEDITACE', tagEN: 'MEDITATION',
  },
  // ── Rituály, havany, aarti ─────────────────────────────────────────────────
  {
    id: '0gDA7jlVYdI',
    category: 'rituals' as const,
    titleCS: 'Rudrabhišek — védský rituál v ášrámu Karauli Shankar',
    titleEN: 'Rudrabhishek — Vedic ritual at Karauli Shankar ashram',
    descCS:  'Tradiční védský rituál Rudrabhišek zasvěcený Pánu Šivovi — mantry, očistné obřady a oddanost.',
    descEN:  'Traditional Vedic Rudrabhishek ritual dedicated to Lord Shiva — mantras, purification rites and devotion.',
    date: '2025', dateEN: '2025', tag: 'RITUÁL', tagEN: 'RITUAL',
  },
  {
    id: 'PiR2jW002dU',
    category: 'rituals' as const,
    titleCS: 'Purnima Havan v ášrámu Karauli Sarkar',
    titleEN: 'Purnima Havan at Karauli Sarkar Ashram',
    descCS:  'Posvátný ohňový obřad havan při úplňku — tradiční ceremonie v ášrámu Luv Kush.',
    descEN:  'Sacred fire havan ceremony at the full moon — traditional ritual at Luv Kush ashram.',
    date: '2025', dateEN: '2025', tag: 'HAVAN', tagEN: 'HAVAN',
  },
  {
    id: 'VqBudw3Wbts',
    category: 'rituals' as const,
    titleCS: 'Jednodenní havan v ášrámu Karauli Shankar',
    titleEN: 'One Day Havan at Karauli Shankar Ashram',
    descCS:  'Celodenní havan — posvátný ohňový rituál v srdci ášrámu Karauli Shankar.',
    descEN:  'Full-day havan — sacred fire ritual at the heart of Karauli Shankar ashram.',
    date: '2025', dateEN: '2025', tag: 'HAVAN', tagEN: 'HAVAN',
  },
  // ── Cesty po Indii ─────────────────────────────────────────────────────────
  {
    id: 'gkmYHOGHdBg',
    category: 'journeys' as const,
    titleCS: 'Matka Ganga v dešti',
    titleEN: 'Mother Ganga in the Rain',
    descCS:  'Meditativní záběry posvátné řeky Gangy v dešti — ticho, voda a duchovní přítomnost.',
    descEN:  'Meditative footage of the sacred Ganges river in the rain — silence, water and spiritual presence.',
    date: '2024', dateEN: '2024', tag: 'CESTA', tagEN: 'JOURNEY',
  },
  {
    id: 'EvGYE9Cmmvo',
    category: 'journeys' as const,
    titleCS: 'Úchvatná, ale nevyzpytatelná: Cesta Himalájemi',
    titleEN: 'Breathtaking yet Unpredictable: Journey through the Himalayas',
    descCS:  'Cesta horskými průsmyky Himálaje — krása, nepředvídatelnost a duchovní síla pohoří.',
    descEN:  'A journey through Himalayan mountain passes — beauty, unpredictability and the spiritual power of the mountains.',
    date: '2024', dateEN: '2024', tag: 'CESTA', tagEN: 'JOURNEY',
  },
  // ── Deeksha ────────────────────────────────────────────────────────────────
  {
    id: 'bkt7sJPkbvs',
    category: 'deeksha' as const,
    titleCS: 'Bhajan večer v ášrámu v Haridwaru',
    titleEN: 'Bhajan Evening at the Haridwar Ashram',
    descCS:  'Duchovní zpěv bhajánů na večerním setkání v ášrámu Karauli Shankar v Haridwaru.',
    descEN:  'Spiritual bhajan singing at an evening gathering at Karauli Shankar ashram in Haridwar.',
    date: '2025', dateEN: '2025', tag: 'DEEKSHA', tagEN: 'DEEKSHA',
  },
  // ── Rozmluvy s Gurudevem ───────────────────────────────────────────────────
  {
    id: 'BysyWEE3TeE',
    category: 'gurudev' as const,
    titleCS: 'Gurudev a zahraniční žáci — rozmluva a praxe',
    titleEN: 'Gurudev with foreign disciples — conversation and practice',
    descCS:  'Přímá rozmluva Gurudeva se zahraničními žáky — duchovní otázky, praxe a živé učení.',
    descEN:  'Direct conversation between Gurudev and foreign disciples — spiritual questions, practice and live teachings.',
    date: '2022', dateEN: '2022', tag: 'GURUDEV', tagEN: 'GURUDEV',
  },
  {
    id: '2dADmQbSdYY',
    category: 'gurudev' as const,
    titleCS: 'Duchovní rozmluva se zahraničními žáky — Den 2',
    titleEN: 'Spiritual conversation with foreign disciples — Day 2',
    descCS:  'Druhý den rozhovorů Gurudeva se zahraničními žáky — hluboké učení a duchovní výměna.',
    descEN:  'Second day of Gurudev\'s conversations with foreign disciples — deep teachings and spiritual exchange.',
    date: '2022', dateEN: '2022', tag: 'GURUDEV', tagEN: 'GURUDEV',
  },
  {
    id: 'aHE-DiIeJ1g',
    category: 'gurudev' as const,
    titleCS: 'Duchovní rozmluva se zahraničními žáky — Den 3',
    titleEN: 'Spiritual conversation with foreign disciples — Day 3',
    descCS:  'Třetí den živého učení — Gurudev odpovídá na otázky zahraničních žáků.',
    descEN:  'Third day of live teachings — Gurudev answers questions from foreign disciples.',
    date: '2022', dateEN: '2022', tag: 'GURUDEV', tagEN: 'GURUDEV',
  },
  {
    id: 'Yd1BhR9PnU8',
    category: 'gurudev' as const,
    titleCS: 'Duchovní rozmluva se zahraničními žáky — závěrečné setkání',
    titleEN: 'Spiritual conversation with foreign disciples — final gathering',
    descCS:  'Závěrečné setkání a rozmluva Gurudeva se zahraničními žáky — završení duchovní cesty.',
    descEN:  'Final gathering and conversation with Gurudev — completion of the spiritual journey.',
    date: '2022', dateEN: '2022', tag: 'GURUDEV', tagEN: 'GURUDEV',
  },
  // ── Aarti s Gurudevem ──────────────────────────────────────────────────────
  {
    id: 'gluWxOF7_hE',
    category: 'aarti' as const,
    titleCS: 'Purnima — zvláštní havan a gurudíkša',
    titleEN: 'Purnima — special havan and Gurudeeksha',
    descCS:  'Výjimečný obřad při úplňku Purnima — havan a udělení Gurudíkši v ášrámu Karauli Sarkar.',
    descEN:  'Special full moon Purnima ceremony — havan and Gurudeeksha initiation at Karauli Sarkar ashram.',
    date: '2021', dateEN: '2021', tag: 'AARTI', tagEN: 'AARTI',
  },
  {
    id: 'NIP_DO0cKe8',
    category: 'aarti' as const,
    titleCS: 'Aarti Guru Maty — Karauli Sarkar',
    titleEN: 'Aarti of Guru Mata — Karauli Sarkar',
    descCS:  'Zpívaná aarti Guru Maty v podání Vishala Chaurasii — oddanostní píseň z ášrámu Karauli Sarkar.',
    descEN:  'Sung aarti of Guru Mata by Vishal Chaurasia — devotional song from Karauli Sarkar ashram.',
    date: '2022', dateEN: '2022', tag: 'AARTI', tagEN: 'AARTI',
  },
  {
    id: 'Fi2c7m264Vc',
    category: 'aarti' as const,
    titleCS: 'Krásná aarti Babaji — Karauli Sarkar',
    titleEN: 'Beautiful Aarti of Babaji — Karauli Sarkar',
    descCS:  'Slavnostní aarti Babaji z ášrámu Karauli Sarkar v podání Vishala Chaurasii.',
    descEN:  'Ceremonial aarti of Babaji from Karauli Sarkar ashram, performed by Vishal Chaurasia.',
    date: '2022', dateEN: '2022', tag: 'AARTI', tagEN: 'AARTI',
  },

]
export default function MediaSection() {
  const ref = useRef<HTMLElement>(null)
  useScrollRevealAll(ref)
  const [playing, setPlaying] = useState(false)
  const { lang } = useLang()
  const cs = lang === 'cs'

  const featured = VIDEOS[0]
  const preview  = VIDEOS.slice(1, 3)

  return (
    <section className={styles.media} id="media" ref={ref}>
      {/* Header */}
      <div className={`${styles.mediaHeader} r`}>
        <div className={styles.sectionLabel}>{cs ? 'Média' : 'Media'}</div>
        <h2 className={styles.sectionTitle}>
          {cs ? 'Z naší' : 'From our'}<br />
          <span className={styles.acc}>{cs ? 'cesty do Indie' : 'journey to India'}</span>
        </h2>
        <p className={styles.headerDesc}>
          {cs
            ? 'Záznamy z ášrámu, obřadů a poutí — autentické okamžiky ze srdce naší praxe.'
            : 'Recordings from the ashram, ceremonies and pilgrimages — authentic moments from the heart of our practice.'}
        </p>
      </div>

      {/* Featured video */}
      <div className={`${styles.featuredWrap} r`} style={{ transitionDelay: '0.1s' }}>
        <div className={styles.featuredPlayer}>
          {!playing ? (
            <div className={styles.thumbnail} onClick={() => setPlaying(true)}>
              <img
                src={`https://img.youtube.com/vi/${featured.id}/hqdefault.jpg`}
                alt={cs ? featured.titleCS : featured.titleEN}
                className={styles.thumbImg}
              />
              <div className={styles.thumbOverlay} />
              <button className={styles.playBtn} aria-label={cs ? 'Přehrát video' : 'Play video'}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <div className={styles.featuredTag}>{cs ? featured.tag : featured.tagEN}</div>
            </div>
          ) : (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${featured.id}?autoplay=1&rel=0`}
              title={cs ? featured.titleCS : featured.titleEN}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.iframe}
            />
          )}
        </div>

        <div className={styles.featuredMeta}>
          <span className={styles.featuredDate}>{cs ? featured.date : featured.dateEN}</span>
          <h3 className={styles.featuredTitle}>{cs ? featured.titleCS : featured.titleEN}</h3>
          <p className={styles.featuredDesc}>{cs ? featured.descCS : featured.descEN}</p>
          <a
            href={`https://www.youtube.com/watch?v=${featured.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.watchLink}
          >
            {cs ? 'Sledovat na YouTube' : 'Watch on YouTube'}
          </a>
        </div>
      </div>

      {/* Preview cards */}
      <div className={styles.previewGrid}>
        {preview.map((v, i) => (
          <VideoCard key={v.id} video={v} delay={`${(i + 1) * 0.1}s`} cs={cs} />
        ))}
      </div>

      {/* CTA to /media */}
      <div className={`${styles.mediaCta} r`} style={{ transitionDelay: '0.3s' }}>
        <a href="/media" className={styles.ctaBtn}>
          {cs ? 'Všechna videa' : 'All videos'}
        </a>
        <a
          href="https://www.youtube.com/@HariharOm"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.ctaSecondary}
        >
          YouTube @HariharOm
        </a>
      </div>
    </section>
  )
}

// ─── Reusable card ─────────────────────────────────────────────────────────
function VideoCard({ video, delay, cs }: { video: typeof VIDEOS[0]; delay: string; cs: boolean }) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className={`${styles.videoCard} r`} style={{ transitionDelay: delay }}>
      <div className={styles.cardPlayer}>
        {!playing ? (
          <div className={styles.cardThumb} onClick={() => setPlaying(true)}>
            <img
              src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
              alt={cs ? video.titleCS : video.titleEN}
              className={styles.thumbImg}
            />
            <div className={styles.thumbOverlay} />
            <button className={styles.cardPlayBtn} aria-label={cs ? 'Přehrát' : 'Play'}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            <span className={styles.cardTag}>{cs ? video.tag : video.tagEN}</span>
          </div>
        ) : (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={cs ? video.titleCS : video.titleEN}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.iframe}
          />
        )}
      </div>
      <div className={styles.cardMeta}>
        <span className={styles.cardDate}>{cs ? video.date : video.dateEN}</span>
        <div className={styles.cardTitle}>{cs ? video.titleCS : video.titleEN}</div>
      </div>
    </div>
  )
}