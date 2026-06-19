'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useLang } from '../../contexts/LangContext'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { VIDEOS, CATEGORIES, type VideoCategory } from '../../components/MediaSection'
import styles from './media.module.css'

export default function MediaContent() {
  const { lang } = useLang()
  const cs = lang === 'cs'
  const hi = lang === 'hi'
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  const parsedCats = categoryParam
    ? categoryParam.split(',').filter((c): c is VideoCategory => CATEGORIES.some(cat => cat.id === c))
    : []

  const [active, setActive] = useState<VideoCategory[] | 'all'>(
    parsedCats.length > 0 ? parsedCats : 'all'
  )
  const activeCats = active === 'all' ? null : active

  type VideoWithCategories = typeof VIDEOS[0] & { categories?: VideoCategory[] }

  const filtered = !activeCats
    ? VIDEOS
    : VIDEOS.filter(v => {
        const vc = v as VideoWithCategories
        return activeCats.some(c => vc.categories ? vc.categories.includes(c) : vc.category === c)
      })

  const sections = !activeCats
    ? CATEGORIES
    : CATEGORIES.filter(c => activeCats.includes(c.id))

  return (
    <>
      <Navbar />
      <main className={styles.page}>

        {/* Header */}
        <div className={styles.pageHeader}>
          <div className={styles.sectionLabel}>{hi ? 'मीडिया' : cs ? 'Média' : 'Media'}</div>
          <h1 className={styles.pageTitle}>
            {hi ? 'वीडियो &' : cs ? 'Videa &' : 'Videos &'}<br />
            <em className={styles.acc}>{hi ? 'रिकॉर्डिंग' : cs ? 'záznamy' : 'recordings'}</em>
          </h1>
          <p className={styles.pageSub}>
            {hi
              ? 'आश्रम, समारोहों और तीर्थयात्राओं की रिकॉर्डिंग — हमारे अभ्यास के हृदय के प्रामाणिक क्षण।'
              : cs
              ? 'Záznamy z ášrámu, obřadů a poutí — autentické okamžiky ze srdce naší praxe.'
              : 'Recordings from the ashram, ceremonies and pilgrimages — authentic moments from the heart of our practice.'}
          </p>
        </div>

        {/* Filter bar */}
        <div className={styles.filterBar}>
          <button
            className={`${styles.filterBtn} ${active === 'all' ? styles.filterActive : ''}`}
            onClick={() => setActive('all')}
          >
            {hi ? 'सभी' : cs ? 'Vše' : 'All'}
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`${styles.filterBtn} ${Array.isArray(active) && active.length === 1 && active[0] === cat.id ? styles.filterActive : ''}`}
              onClick={() => setActive([cat.id])}
            >
              {hi ? cat.labelHI : cs ? cat.labelCS : cat.labelEN}
            </button>
          ))}
        </div>

        {/* Sections */}
        {sections.map(cat => {
          const videos = VIDEOS.filter(v => {
            const vc = v as VideoWithCategories
            return vc.categories ? vc.categories.includes(cat.id) : vc.category === cat.id
          })
          if (!videos.length) return null
          return (
            <div key={cat.id} className={styles.categorySection}>
              <div className={styles.catLabel}>{hi ? cat.labelHI : cs ? cat.labelCS : cat.labelEN}</div>
              <div className={styles.videoGrid}>
                {videos.map((v, i) => (
                  <VideoCard key={v.id} video={v} cs={cs} hi={hi} />
                ))}
              </div>
              <hr className={styles.divider} />
            </div>
          )
        })}

      </main>
      <Footer />
    </>
  )
}

function VideoCard({ video, cs, hi }: { video: typeof VIDEOS[0]; cs: boolean; hi: boolean }) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className={styles.videoCard}>
      <div className={styles.cardPlayer}>
        {!playing ? (
          <div className={styles.cardThumb} onClick={() => setPlaying(true)}>
            <img
              src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
              alt={hi ? video.titleHI : cs ? video.titleCS : video.titleEN}
              className={styles.thumbImg}
            />
            <div className={styles.thumbOverlay} />
            <button className={styles.cardPlayBtn} aria-label={hi ? 'चलाएं' : cs ? 'Přehrát' : 'Play'}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            <span className={styles.cardTag}>{hi ? video.tagHI : cs ? video.tag : video.tagEN}</span>
          </div>
        ) : (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={hi ? video.titleHI : cs ? video.titleCS : video.titleEN}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.iframe}
          />
        )}
      </div>
      <div className={styles.cardMeta}>
        <span className={styles.cardDate}>{hi ? video.date : cs ? video.date : video.dateEN}</span>
        <div className={styles.cardTitle}>{hi ? video.titleHI : cs ? video.titleCS : video.titleEN}</div>
        <p className={styles.cardDesc}>{hi ? video.descHI : cs ? video.descCS : video.descEN}</p>
        <a
          href={`https://www.youtube.com/watch?v=${video.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.watchLink}
        >
          {hi ? 'YouTube पर देखें' : cs ? 'Sledovat na YouTube' : 'Watch on YouTube'}
        </a>
      </div>
    </div>
  )
}