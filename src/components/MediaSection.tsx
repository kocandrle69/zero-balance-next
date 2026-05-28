'use client'

import { useRef, useState } from 'react'
import styles from './MediaSection.module.css'
import { useScrollRevealAll } from '../hooks/useScrollReveal'

// ─── Video data — nejnovější první ───────────────────────────────────────────
export const VIDEOS = [
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

  const featured = VIDEOS[0]
  const preview  = VIDEOS.slice(1, 3)

  return (
    <section className={styles.media} id="media" ref={ref}>
      {/* Header */}
      <div className={`${styles.mediaHeader} r`}>
        <div className={styles.sectionLabel}>Média</div>
        <h2 className={styles.sectionTitle}>
          Z naší<br />
          <span className={styles.acc}>cesty do Indie</span>
        </h2>
        <p className={styles.headerDesc}>
          Záznamy z ášrámu, obřadů a poutí — autentické okamžiky ze srdce naší praxe.
        </p>
      </div>

      {/* Featured video */}
      <div className={`${styles.featuredWrap} r`} style={{ transitionDelay: '0.1s' }}>
        <div className={styles.featuredPlayer}>
          {!playing ? (
            <div className={styles.thumbnail} onClick={() => setPlaying(true)}>
              <img
                src={`https://img.youtube.com/vi/${featured.id}/maxresdefault.jpg`}
                alt={featured.titleCS}
                className={styles.thumbImg}
              />
              <div className={styles.thumbOverlay} />
              <button className={styles.playBtn} aria-label="Přehrát video">
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
              <div className={styles.featuredTag}>{featured.tag}</div>
            </div>
          ) : (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${featured.id}?autoplay=1&rel=0`}
              title={featured.titleCS}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.iframe}
            />
          )}
        </div>

        <div className={styles.featuredMeta}>
          <span className={styles.featuredDate}>{featured.date}</span>
          <h3 className={styles.featuredTitle}>{featured.titleCS}</h3>
          <p className={styles.featuredDesc}>{featured.descCS}</p>
          <a
            href={`https://www.youtube.com/watch?v=${featured.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.watchLink}
          >
            Sledovat na YouTube
          </a>
        </div>
      </div>

      {/* Preview cards */}
      <div className={styles.previewGrid}>
        {preview.map((v, i) => (
          <VideoCard key={v.id} video={v} delay={`${(i + 1) * 0.1}s`} />
        ))}
      </div>

      {/* CTA to /media */}
      <div className={`${styles.mediaCta} r`} style={{ transitionDelay: '0.3s' }}>
        <a href="/media" className={styles.ctaBtn}>
          Všechna videa
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
function VideoCard({ video, delay }: { video: typeof VIDEOS[0]; delay: string }) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className={`${styles.videoCard} r`} style={{ transitionDelay: delay }}>
      <div className={styles.cardPlayer}>
        {!playing ? (
          <div className={styles.cardThumb} onClick={() => setPlaying(true)}>
            <img
              src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
              alt={video.titleCS}
              className={styles.thumbImg}
            />
            <div className={styles.thumbOverlay} />
            <button className={styles.cardPlayBtn} aria-label="Přehrát">
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            <span className={styles.cardTag}>{video.tag}</span>
          </div>
        ) : (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.titleCS}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.iframe}
          />
        )}
      </div>
      <div className={styles.cardMeta}>
        <span className={styles.cardDate}>{video.date}</span>
        <div className={styles.cardTitle}>{video.titleCS}</div>
      </div>
    </div>
  )
}
