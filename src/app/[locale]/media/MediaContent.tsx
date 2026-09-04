'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useLang } from '../../../contexts/LangContext'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import { VIDEOS, CATEGORIES, watchUrl, type VideoCategory } from '../../../components/MediaSection'
import styles from './media.module.css'

export default function MediaContent() {
  const { lang } = useLang()
  const cs = lang === 'cs'
  const hi = lang === 'hi'
  const fr = lang === 'fr'
  const es = lang === 'es'
  const de = lang === 'de'
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
          <div className={styles.sectionLabel}>{hi ? 'मीडिया' : cs ? 'Média' : fr ? 'Médias' : es ? 'Medios' : de ? 'Medien' : 'Media'}</div>
          <h1 className={styles.pageTitle}>
            {hi ? 'वीडियो &' : cs ? 'Videa &' : fr ? 'Vidéos &' : es ? 'Vídeos y' : de ? 'Videos &' : 'Videos &'}<br />
            <em className={styles.acc}>{hi ? 'रिकॉर्डिंग' : cs ? 'záznamy' : fr ? 'enregistrements' : es ? 'grabaciones' : de ? 'Aufnahmen' : 'recordings'}</em>
          </h1>
          <p className={styles.pageSub}>
            {hi
              ? 'आश्रम, समारोहों और तीर्थयात्राओं की रिकॉर्डिंग — हमारे अभ्यास के प्रामाणिक क्षण।'
              : cs
              ? 'Záznamy z ášrámu, obřadů a poutí — autentické okamžiky z naší praxe.'
              : fr
              ? 'Enregistrements depuis l’ashram, des cérémonies et des pèlerinages — des moments authentiques de notre pratique.'
              : es
              ? 'Grabaciones desde el ashram, ceremonias y peregrinaciones — momentos auténticos de nuestra práctica.'
              : de
              ? 'Aufnahmen aus dem Ashram, von Zeremonien und Pilgerreisen — authentische Momente aus unserer Praxis.'
              : 'Recordings from the ashram, ceremonies and pilgrimages — authentic moments from our practice.'}
          </p>
        </div>

        {/* Filter bar */}
        <div className={styles.filterBar}>
          <button
            className={`${styles.filterBtn} ${active === 'all' ? styles.filterActive : ''}`}
            onClick={() => setActive('all')}
          >
            {hi ? 'सभी' : cs ? 'Vše' : fr ? 'Tous' : es ? 'Todo' : de ? 'Alle' : 'All'}
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`${styles.filterBtn} ${Array.isArray(active) && active.length === 1 && active[0] === cat.id ? styles.filterActive : ''}`}
              onClick={() => setActive([cat.id])}
            >
              {hi ? cat.labelHI : cs ? cat.labelCS : fr ? cat.labelFR : es ? cat.labelES : de ? cat.labelDE : cat.labelEN}
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
                  <VideoCard key={v.id} video={v} cs={cs} hi={hi} fr={fr} es={es} de={de} />
                ))}
              </div>
              <hr className={styles.divider} />
            </div>
          )
        })}

        {/* Partner credit — jazykové verze/dabing videí reálně vznikají přes
            ElevenLabs (ElevenLabs Impact Program), tenhle blok je podmínka
            partnerství. Drží se stejného ternárního i18n vzoru jako zbytek
            stránky — žádné nové klíče v i18n slovnících. */}
        <div className={styles.partnerCredit}>
          <p className={styles.partnerCreditText}>
            {hi
              ? <>हमारे वीडियो के भाषा संस्करण और डबिंग <a href="https://elevenlabs.io" target="_blank" rel="noopener noreferrer" className={styles.partnerCreditLink}>ElevenLabs</a> के सहयोग से तैयार किए जाते हैं।</>
              : cs
              ? <>Jazykové verze a dabing našich videí vznikají ve spolupráci se společností <a href="https://elevenlabs.io" target="_blank" rel="noopener noreferrer" className={styles.partnerCreditLink}>ElevenLabs</a>.</>
              : fr
              ? <>Les versions linguistiques et le doublage de nos vidéos sont réalisés en collaboration avec <a href="https://elevenlabs.io" target="_blank" rel="noopener noreferrer" className={styles.partnerCreditLink}>ElevenLabs</a>.</>
              : es
              ? <>Las versiones en varios idiomas y el doblaje de nuestros vídeos se realizan en colaboración con <a href="https://elevenlabs.io" target="_blank" rel="noopener noreferrer" className={styles.partnerCreditLink}>ElevenLabs</a>.</>
              : de
              ? <>Die Sprachfassungen und die Synchronisation unserer Videos entstehen in Zusammenarbeit mit <a href="https://elevenlabs.io" target="_blank" rel="noopener noreferrer" className={styles.partnerCreditLink}>ElevenLabs</a>.</>
              : <>Language versions and dubbing of our videos are produced in collaboration with <a href="https://elevenlabs.io" target="_blank" rel="noopener noreferrer" className={styles.partnerCreditLink}>ElevenLabs</a>.</>}
          </p>
          <a
            href="https://elevenlabs.io"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="ElevenLabs"
            className={styles.partnerCreditLogo}
          >
            <img src="/images/elevenlabs-logo-black.svg" alt="ElevenLabs" width={154} height={20} />
          </a>
        </div>

      </main>
      <Footer />
    </>
  )
}

function VideoCard({ video, cs, hi, fr, es, de }: { video: typeof VIDEOS[0]; cs: boolean; hi: boolean; fr: boolean; es: boolean; de: boolean }) {
  const [playing, setPlaying] = useState(false)
  const videoUrl = watchUrl(video)
  const title = hi ? video.titleHI : cs ? video.titleCS : fr ? video.titleFR : es ? video.titleES : de ? video.titleDE : video.titleEN
  const desc  = hi ? video.descHI : cs ? video.descCS : fr ? video.descFR : es ? video.descES : de ? video.descDE : video.descEN
  const tag   = hi ? video.tagHI : cs ? video.tag : fr ? video.tagFR : es ? video.tagES : de ? video.tagDE : video.tagEN
  const date  = hi || cs ? video.date : video.dateEN

  return (
    <a
      href={videoUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.videoCard}
      style={{ textDecoration: 'none', display: 'block' }}
    >
      <div className={styles.cardPlayer}>
        {!playing ? (
          <div className={styles.cardThumb} onClick={(e) => { e.preventDefault(); setPlaying(true) }}>
            <img
              src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
              alt={title}
              className={styles.thumbImg}
              loading="lazy"
              decoding="async"
            />
            <div className={styles.thumbOverlay} />
            <button className={styles.cardPlayBtn} aria-label={hi ? 'चलाएं' : cs ? 'Přehrát' : fr ? 'Lire' : es ? 'Reproducir' : de ? 'Abspielen' : 'Play'}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            <span className={styles.cardTag}>{tag}</span>
          </div>
        ) : (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.iframe}
          />
        )}
      </div>
      <div className={styles.cardMeta}>
        <span className={styles.cardDate}>{date}</span>
        <div className={styles.cardTitle}>{title}</div>
        <p className={styles.cardDesc}>{desc}</p>
        <span className={styles.watchLink}>
          {hi ? 'YouTube पर देखें' : cs ? 'Sledovat na YouTube' : fr ? 'Regarder sur YouTube' : es ? 'Ver en YouTube' : de ? 'Auf YouTube ansehen' : 'Watch on YouTube'}
        </span>
      </div>
    </a>
  )
}