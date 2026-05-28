'use client'

import { useState } from 'react'
import Navbar from '../../components/Navbar'
import { VIDEOS } from '../../components/MediaSection'
import { useLang } from '../../contexts/LangContext'
import styles from './media.module.css'

export default function MediaPage() {
  const { lang } = useLang()
  const cs = lang === 'cs'

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        {/* Hero header */}
        <header className={styles.pageHero}>
          <div className={styles.heroInner}>
            <div className={styles.sectionLabel}>{cs ? 'Média' : 'Media'}</div>
            <h1 className={styles.heroTitle}>
              {cs ? 'Záznamy z' : 'Recordings from'}<br />
              <span className={styles.acc}>{cs ? 'cesty & praxe' : 'journey & practice'}</span>
            </h1>
            <p className={styles.heroDesc}>
              {cs
                ? 'Autentické záznamy z ášrámu Karauli Shankar Mahadev Dham, obřadů a poutí. Videa natočena naší komunitou — sdílíme je jako svědectví živé tradice.'
                : 'Authentic recordings from Karauli Shankar Mahadev Dham ashram, ceremonies and pilgrimages. Filmed by our community — shared as a testimony of a living tradition.'}
            </p>
            <div className={styles.heroBadge}>
              <span>{cs ? 'Kanál' : 'Channel'}</span>
              <a
                href="https://www.youtube.com/@HariharOm"
                target="_blank"
                rel="noopener noreferrer"
              >
                @HariharOm
              </a>
            </div>
          </div>
        </header>

        {/* Video grid — all videos chronologically */}
        <section className={styles.grid}>
          <div className={styles.gridInner}>
            {VIDEOS.map((v, i) => (
              <VideoItem key={v.id} video={v} index={i} cs={cs} />
            ))}

            {/* Placeholder — more coming */}
            <div className={styles.comingSoon}>
              <div className={styles.csInner}>
                <span className={styles.csIcon}>＋</span>
                <p className={styles.csText}>
                  {cs ? 'Další videa připravujeme' : 'More videos coming soon'}
                </p>
                <a
                  href="https://www.youtube.com/@HariharOm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.csLink}
                >
                  {cs ? 'Sledovat na YouTube' : 'Watch on YouTube'}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

// ─── Single video item ─────────────────────────────────────────────────────
function VideoItem({ video, index, cs }: { video: typeof VIDEOS[0]; index: number; cs: boolean }) {
  const [playing, setPlaying] = useState(false)

  return (
    <article className={styles.videoItem}>
      {/* Player */}
      <div className={styles.player}>
        {!playing ? (
          <div className={styles.thumb} onClick={() => setPlaying(true)}>
            <img
              src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
              alt={cs ? video.titleCS : video.titleEN}
              className={styles.thumbImg}
            />
            <div className={styles.thumbOverlay} />
            <button className={styles.playBtn} aria-label={cs ? 'Přehrát video' : 'Play video'}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            <span className={styles.videoTag}>{cs ? video.tag : video.tagEN}</span>
            <span className={styles.videoNum}>
              {String(index + 1).padStart(2, '0')}
            </span>
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

      {/* Meta */}
      <div className={styles.meta}>
        <span className={styles.metaDate}>{cs ? video.date : video.dateEN}</span>
        <h2 className={styles.metaTitle}>{cs ? video.titleCS : video.titleEN}</h2>
        <p className={styles.metaDesc}>{cs ? video.descCS : video.descEN}</p>
        <a
          href={`https://www.youtube.com/watch?v=${video.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.metaLink}
        >
          {cs ? 'Sledovat na YouTube' : 'Watch on YouTube'}
        </a>
      </div>
    </article>
  )
}
