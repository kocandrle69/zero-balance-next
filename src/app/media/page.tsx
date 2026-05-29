'use client'

import { useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useLang } from '../../contexts/LangContext'
import styles from './media.module.css'

// ─── All videos organised by section ─────────────────────────────────────────
const SECTIONS = [
  {
    keyCS: 'Moudrost Indie',
    keyEN: 'Wisdom of India',
    subtitleCS: 'Lekce se Sensei Rajeev Sinha',
    subtitleEN: 'Lessons with Sensei Rajeev Sinha',
    tag: 'MOUDROST',
    tagEN: 'WISDOM',
    videos: [
      {
        id: 'rOTNqc8BbHw',
        titleCS: 'Úvod do moudrosti Indie',
        titleEN: 'Introduction to the Wisdom of India',
        descCS: 'První lekce série. Sensei Rajeev Sinha uvádí do hloubky indické filozofie a spirituální praxe.',
        descEN: 'First lesson. Sensei Rajeev Sinha introduces the depth of Indian philosophy and spiritual practice.',
        date: '2024',
      },
      {
        id: 'OzXzXRVnFvc',
        titleCS: 'Finding a Complete Master',
        titleEN: 'Finding a Complete Master',
        descCS: 'Co to znamená najít skutečného mistra na duchovní cestě.',
        descEN: 'What it means to find a true master on the spiritual path.',
        date: '2024',
      },
      {
        id: 'OxrFgXqKYFg',
        titleCS: 'Kontrola nad prvky přírody',
        titleEN: 'Control over the Elements of Nature',
        descCS: 'Jak jogíni a tantrikové pracují s přírodními silami.',
        descEN: 'How yogis and tantrikas work with the forces of nature.',
        date: '2024',
      },
      {
        id: 'L17tfQvwT_I',
        titleCS: 'From Metaphysical to Physical Existence',
        titleEN: 'From Metaphysical to Physical Existence',
        descCS: 'Čtvrtá lekce: cesta od metafyzické k fyzické existenci v pohledu indické filozofie.',
        descEN: 'Fourth lesson: the journey from metaphysical to physical existence in Indian philosophy.',
        date: '2024',
      },
      {
        id: '3zmenJyvr7o',
        titleCS: 'Religion is Coded Human Expression',
        titleEN: 'Religion is Coded Human Expression',
        descCS: 'Náboženství jako zakódovaný lidský výraz vědomí.',
        descEN: 'Religion as coded human expression of consciousness.',
        date: '2024',
      },
      {
        id: '_Yt0UzvmfG8',
        titleCS: 'Science is the Law of Nature',
        titleEN: 'Science is the Law of Nature',
        descCS: 'Věda jako zákon přírody v pohledu indické filozofie.',
        descEN: 'Science as the law of nature from an Indian philosophical perspective.',
        date: '2024',
      },
      {
        id: 'b4RmE7bxkJ4',
        titleCS: 'Jak nejlépe pokročit v sadhně?',
        titleEN: 'What are the best ways to progress in sadhna?',
        descCS: 'Praktické rady pro pokrok na cestě sadhany.',
        descEN: 'Practical guidance for progressing on the path of sadhana.',
        date: '2024',
      },
      {
        id: 'x4bmLRMA1oI',
        titleCS: 'Unlocking the Power of YogaTantra',
        titleEN: 'Unlocking the Power of YogaTantra',
        descCS: 'Síla Jógatantry a jak ji aktivovat v praxi.',
        descEN: 'The power of YogaTantra and how to activate it in practice.',
        date: '2024',
      },
    ],
  },
  {
    keyCS: 'Sadhana',
    keyEN: 'Sadhana',
    subtitleCS: 'Pod vedením Gurudeva',
    subtitleEN: 'Under the guidance of Gurudev',
    tag: 'SADHANA',
    tagEN: 'SADHANA',
    videos: [
      {
        id: 'hlnSuJFnywA',
        titleCS: 'Sadhana pod vedením Gurudeva — s českým dabingem',
        titleEN: 'Sadhana under Gurudev\u2019s Guidance \u2014 Czech dubbing',
        descCS: 'Vedená sadhana s přímým přenosem učení Gurudeva — s českým dabingem pro naši komunitu.',
        descEN: 'Guided sadhana with direct transmission from Gurudev \u2014 with Czech dubbing for our community.',
        date: '2025',
      },
      {
        id: 'RWklWj6_mcY',
        titleCS: 'DhyanSadhana — týdenní praxe na kanálu @PoornaGuru',
        titleEN: 'DhyanSadhana \u2014 weekly practice on @PoornaGuru channel',
        descCS: 'Týdenní meditační sadhana v hindštině na kanálu Poorna Guru.',
        descEN: 'Weekly meditation sadhana in Hindi on the Poorna Guru channel.',
        date: '2025',
      },
    ],
  },
  {
    keyCS: 'Ášrám & jeho okolí',
    keyEN: 'Ashram & Surroundings',
    subtitleCS: 'Karauli Shankar Mahadev Dham',
    subtitleEN: 'Karauli Shankar Mahadev Dham',
    tag: 'ÁŠRÁM',
    tagEN: 'ASHRAM',
    videos: [
      {
        id: 'ipJoR8PvPDo',
        titleCS: 'Týden v ášrámu Karauli Shankar Mahadev Dham',
        titleEN: 'A Week at Karauli Shankar Mahadev Dham Ashram',
        descCS: 'Pohled do každodenního rytmu ášrámu — ranní sadhana, puja, satsang a tiché chvíle.',
        descEN: 'A glimpse into the daily rhythm of the ashram — morning sadhana, puja, satsang and quiet moments.',
        date: '2025',
      },
      {
        id: 'nqVjdWMgWbY',
        titleCS: 'Ášrám Karauli Shankar Mahadev Dham — záznamy',
        titleEN: 'Karauli Shankar Mahadev Dham Ashram \u2014 recordings',
        descCS: 'Záznamy ze života v ášrámu — rituály, praxe a duchovní atmosféra místa.',
        descEN: 'Recordings from ashram life \u2014 rituals, practice and the spiritual atmosphere of the place.',
        date: '2025',
      },
      {
        id: 'mUWQsvyrd54',
        titleCS: 'Ášrám — záběry z každodenního života',
        titleEN: 'Ashram \u2014 glimpses of daily life',
        descCS: 'Každodenní rytmus ášrámu: ranní puja, meditace a satsang.',
        descEN: 'Daily ashram rhythm: morning puja, meditation and satsang.',
        date: '2025',
      },
      {
        id: 'ybIq2ZYYxGk',
        titleCS: 'Leden 2026 — Karauli Shankar Mahadev Dham',
        titleEN: 'January 2026 \u2014 Karauli Shankar Mahadev Dham',
        descCS: 'Záznamy z pobytu v ášrámu v lednu 2026. Atmosféra, praxe a každodenní život v Karauli.',
        descEN: 'Recordings from the ashram stay in January 2026. Atmosphere, practice and daily life in Karauli.',
        date: 'Leden 2026',
      },
      {
        id: 'Lgz_pjQ8mok',
        titleCS: 'Udělení Deeksha v ášrámu Karauli Shankar',
        titleEN: 'Deeksha Ceremony at Karauli Shankar Ashram',
        descCS: 'Převedení do vyšší úrovně Tantra Yog — vzácný obřad v přítomnosti Gurudeva.',
        descEN: 'Initiation into a higher level of Tantra Yog \u2014 a rare ceremony in the presence of Gurudev.',
        date: '2025',
      },
      {
        id: 'DnFdardLSV8',
        titleCS: 'Okolí ášrámu Karauli Shankar Mahadev Dham',
        titleEN: 'Around Karauli Shankar Mahadev Dham Ashram',
        descCS: 'Procházka okolím ášrámu — krajina, chrámy a každodenní život v Karauli.',
        descEN: 'A walk around the ashram \u2014 landscape, temples and everyday life in Karauli.',
        date: '2025',
      },
      {
        id: 'ubhUjMcCi14',
        titleCS: 'Okolí ášrámu — další záběry',
        titleEN: 'Around the Ashram \u2014 more footage',
        descCS: 'Další záběry z okolí posvátného místa — příroda, chrámový komplex a ticho krajiny.',
        descEN: 'More footage from around the sacred site \u2014 nature, temple complex and the silence of the land.',
        date: '2024',
      },
    ],
  },
]

// ─── Single video card ────────────────────────────────────────────────────────
function VideoCard({ id, title, desc, date, tag }: {
  id: string; title: string; desc: string; date: string; tag: string
}) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className={styles.card}>
      <div className={styles.cardPlayer}>
        {!playing ? (
          <div className={styles.cardThumb} onClick={() => setPlaying(true)}>
            <img
              src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
              alt={title}
              className={styles.thumbImg}
            />
            <div className={styles.thumbOverlay} />
            <button className={styles.playBtn} aria-label="Play">
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            <span className={styles.cardTag}>{tag}</span>
          </div>
        ) : (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.iframe}
          />
        )}
      </div>
      <div className={styles.cardMeta}>
        <span className={styles.cardDate}>{date}</span>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDesc}>{desc}</p>
        <a
          href={`https://www.youtube.com/watch?v=${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.watchLink}
        >
          Sledovat na YouTube
        </a>
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function MediaPage() {
  const { lang } = useLang()
  const cs = lang === 'cs'

  return (
    <>
      <Navbar />
      <main className={styles.page}>

        {/* ── Header ── */}
        <div className={styles.header}>
          <div className={styles.headerLabel}>{cs ? 'Média' : 'Media'}</div>
          <h1 className={styles.headerTitle}>
            {cs ? 'Záznamy z' : 'Records from'}<br />
            <span className={styles.acc}>{cs ? 'cesty & praxe' : 'journey & practice'}</span>
          </h1>
          <p className={styles.headerDesc}>
            {cs
              ? 'Autentické záznamy z ášrámu Karauli Shankar Mahadev Dham, obřadů a poutí. Videa natočena naší komunitou — sdílíme je jako svědectví živé tradice.'
              : 'Authentic recordings from Karauli Shankar Mahadev Dham ashram, ceremonies and pilgrimages. Videos made by our community — shared as a testimony of living tradition.'}
          </p>
          <a
            href="https://www.youtube.com/@HariharOm"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.channelBtn}
          >
            {cs ? 'Kanál @HariharOm' : 'Channel @HariharOm'}
          </a>
        </div>

        {/* ── Sections ── */}
        {SECTIONS.map((section, si) => (
          <div key={si} className={styles.section}>

            {/* Section divider + heading */}
            <div className={styles.sectionDivider}>
              <div className={styles.dividerLine} />
              <div className={styles.dividerContent}>
                <span className={styles.dividerTag}>
                  {cs ? section.tag : section.tagEN}
                </span>
                <h2 className={styles.sectionTitle}>
                  {cs ? section.keyCS : section.keyEN}
                </h2>
                <p className={styles.sectionSubtitle}>
                  {cs ? section.subtitleCS : section.subtitleEN}
                </p>
              </div>
              <div className={styles.dividerLine} />
            </div>

            {/* Video grid */}
            <div className={styles.grid}>
              {section.videos.map((v) => (
                <VideoCard
                  key={v.id}
                  id={v.id}
                  title={cs ? v.titleCS : v.titleEN}
                  desc={cs ? v.descCS : v.descEN}
                  date={v.date}
                  tag={cs ? section.tag : section.tagEN}
                />
              ))}
            </div>

          </div>
        ))}

        {/* ── Bottom CTA ── */}
        <div className={styles.cta}>
          <a
            href="https://www.youtube.com/@HariharOm"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaBtn}
          >
            {cs ? 'Všechna videa na YouTube' : 'All videos on YouTube'}
          </a>
        </div>

      </main>
      <Footer />
    </>
  )
}