'use client'

import { useState } from 'react'
import Navbar from '../../components/Navbar'
import { VIDEOS } from '../../components/MediaSection'
import styles from './media.module.css'

export default function MediaPage() {
  return (
    <>
      <Navbar />
      <main className={styles.page}>
        {/* Hero header */}
        <header className={styles.pageHero}>
          <div className={styles.heroInner}>
            <div className={styles.sectionLabel}>Média</div>
            <h1 className={styles.heroTitle}>
              Záznamy z<br />
              <span className={styles.acc}>cesty &amp; praxe</span>
            </h1>
            <p className={styles.heroDesc}>
              Autentické záznamy z ášrámu Karauli Shankar Mahadev Dham, obřadů a poutí.
              Videa natočena naší komunitou — sdílíme je jako svědectví živé tradice.
            </p>
            <div className={styles.heroBadge}>
              <span>Kanál</span>
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
              <VideoItem key={v.id} video={v} index={i} />
            ))}

            {/* Placeholder — more coming */}
            <div className={styles.comingSoon}>
              <div className={styles.csInner}>
                <span className={styles.csIcon}>＋</span>
                <p className={styles.csText}>Další videa připravujeme</p>
                <a
                  href="https://www.youtube.com/@HariharOm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.csLink}
                >
                  Sledovat na YouTube
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
function VideoItem({ video, index }: { video: typeof VIDEOS[0]; index: number }) {
  const [playing, setPlaying] = useState(false)

  return (
    <article className={styles.videoItem}>
      {/* Player */}
      <div className={styles.player}>
        {!playing ? (
          <div className={styles.thumb} onClick={() => setPlaying(true)}>
            <img
              src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
              alt={video.titleCS}
              className={styles.thumbImg}
            />
            <div className={styles.thumbOverlay} />
            <button className={styles.playBtn} aria-label="Přehrát video">
              <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            <span className={styles.videoTag}>{video.tag}</span>
            <span className={styles.videoNum}>
              {String(index + 1).padStart(2, '0')}
            </span>
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

      {/* Meta */}
      <div className={styles.meta}>
        <span className={styles.metaDate}>{video.date}</span>
        <h2 className={styles.metaTitle}>{video.titleCS}</h2>
        <p className={styles.metaDesc}>{video.descCS}</p>
        <a
          href={`https://www.youtube.com/watch?v=${video.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.metaLink}
        >
          Sledovat na YouTube
        </a>
      </div>
    </article>
  )
}
