'use client'

import { useRef, useState } from 'react'
import styles from './MediaSection.module.css'
import { useScrollRevealAll } from '../hooks/useScrollReveal'
import { useLang } from '../contexts/LangContext'

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
    tag:     'ÁŠRAM',
    tagEN:   'ASHRAM',
  },
  {
    id: 'mUWQsvyrd54',
    titleCS: 'Ášrám — záběry z každodenního života',
    titleEN: 'Ashram — glimpses of daily life',
    descCS:  'Každodenní rytmus ášrámu: ranní puja, meditace a satsang.',
    descEN:  'Daily ashram rhythm: morning puja, meditation and satsang.',
    date:    '2025',
    dateEN:  '2025',
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
    tag:     'MÍSTO',
    tagEN:   'PLACE',
  },
  {
    id: 'ubhUjMcCi14',
    titleCS: 'Okolí ášrámu Karauli Shankar Mahadev Dham',
    titleEN: 'Around Karauli Shankar Mahadev Dham Ashram',
    descCS:  'Další záběry z okolí posvátného místa — příroda, chrámový komplex a ticho krajiny.',
    descEN:  'More footage from around the sacred site — nature, temple complex and the silence of the land.',
    date:    '2024',
    dateEN:  '2024',
    tag:     'MÍSTO',
    tagEN:   'PLACE',
  },
]

// ─── Homepage preview: featured + 2 cards ────────────────────────────────────
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