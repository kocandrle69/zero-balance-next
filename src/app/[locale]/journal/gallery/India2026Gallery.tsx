'use client'

import { useEffect, useState } from 'react'
import styles from './gallery.module.css'
import { INDIA_2026 } from './india2026'
import { PHOTOGRAPHERS } from './photographers'
import type { PostLang } from '../posts'

/** Galerie zatím existuje jen v cs/en/hi — fr/es/de spadnou na angličtinu. */
function toGalleryLang(lang: PostLang): 'cs' | 'en' | 'hi' {
  return lang === 'cs' || lang === 'hi' ? lang : 'en'
}

const UI = {
  cs: {
    close: 'Zavřít', prev: 'Předchozí', next: 'Další', lens: 'Objektivem',
    growing: `Tato galerie je živá sbírka, která bude postupně růst. Vedle Andreiných
      fotografií, které zde vidíte, budou postupně přibývat i snímky dalších přispěvatelů
      a členů naší komunity — každý s vlastním pohledem a zkušeností.`,
  },
  en: {
    close: 'Close',  prev: 'Previous',  next: 'Next',  lens: 'Through the lens of',
    growing: `This gallery is a living collection that will keep growing. Alongside
      Andrea's work shown here, photographs from other contributors and members of our
      community will be added over time, each capturing their own unique perspective
      and experience.`,
  },
  hi: {
    close: 'बंद करें', prev: 'पिछला', next: 'अगला', lens: 'की नज़र से',
    growing: `यह गैलरी एक जीवंत संग्रह है जो समय के साथ बढ़ता रहेगा। यहाँ दिखाई गई आंद्रेया की
      तस्वीरों के साथ-साथ, समय के साथ हमारे समुदाय के अन्य योगदानकर्ताओं और सदस्यों की तस्वीरें
      भी जुड़ती जाएँगी — हर एक अपने अनूठे दृष्टिकोण और अनुभव के साथ।`,
  },
} as const

/**
 * Sekce, které jsou zatím zveřejněné — allow-list, ne mazání z dat. Jan má
 * fotky i řádek v INDIA_2026, ale bez hotového bia zatím do článku nejde;
 * až bude připravený, stačí ho sem přidat, nic jiného se měnit nemusí.
 */
const PUBLISHED = ['Andrea']
const SECTIONS = INDIA_2026.filter(s => PUBLISHED.includes(s.photographer))

/** Zploštěné pole napříč zveřejněnými sekcemi — lightbox listuje bez ohledu na fotografa. */
const ALL_PHOTOS = SECTIONS.flatMap(s => s.photos)
/** thumb → globální index; cesty k náhledům jsou v datech jedinečné. */
const PHOTO_INDEX = new Map(ALL_PHOTOS.map((p, i) => [p.thumb, i]))

export default function India2026Gallery({ lang }: { lang: PostLang }) {
  const t = UI[toGalleryLang(lang)]
  const [open, setOpen] = useState<number | null>(null)

  useEffect(() => {
    if (open === null) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
      else if (e.key === 'ArrowRight') setOpen(i => (i === null ? i : (i + 1) % ALL_PHOTOS.length))
      else if (e.key === 'ArrowLeft') setOpen(i => (i === null ? i : (i + ALL_PHOTOS.length - 1) % ALL_PHOTOS.length))
    }
    window.addEventListener('keydown', onKey)

    // dočasné zamčení scrollu jen po dobu otevřeného lightboxu — na rozdíl
    // od trvalého overflow-x na body (ten je na webu záměrně zakázaný kvůli
    // iOS Safari) tady jde o overflow-y a jen na chvíli.
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  return (
    <div className={styles.wrap}>
      {SECTIONS.map((section, si) => (
        <div key={section.photographer}>
          {si > 0 && <div className={styles.divider} />}
          <section className={styles.section}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionKicker}>{t.lens}</span>
              <h3 className={styles.sectionName}>{section.photographer}</h3>
              {(() => {
                // Portrét se ukáže, jakmile ho pro fotografa máme —
                // odstavec bia je nezávisle volitelný (dokud nedorazí,
                // je pod jménem jen fotka, žádná prázdná mezera po textu).
                // Bez fota zůstává jen jméno výše, jako dosud.
                const info = PHOTOGRAPHERS[section.photographer]
                if (!info?.photo) return null
                const bio = info.bio?.[lang]
                return (
                  <div className={styles.bioBlock}>
                    {bio && <p>{bio}</p>}
                    <img
                      className={styles.bioPhoto}
                      src={info.photo}
                      alt=""
                      width={64}
                      height={64}
                      loading="lazy"
                      style={info.photoPos ? { objectPosition: info.photoPos } : undefined}
                    />
                  </div>
                )
              })()}
            </div>
            <div className={styles.grid}>
              {section.photos.map(photo => {
                const i = PHOTO_INDEX.get(photo.thumb)!
                return (
                  <figure key={photo.thumb}>
                    <img
                      className={styles.thumb}
                      src={photo.thumb}
                      width={photo.w}
                      height={photo.h}
                      loading="lazy"
                      decoding="async"
                      alt=""
                      onClick={() => setOpen(i)}
                    />
                  </figure>
                )
              })}
            </div>
          </section>
        </div>
      ))}

      <p className={styles.growingNote}>{t.growing}</p>

      {open !== null && (
        <div className={styles.overlay} onClick={() => setOpen(null)}>
          <img
            className={styles.full}
            src={ALL_PHOTOS[open].full}
            loading="eager"
            alt=""
            onClick={e => e.stopPropagation()}
          />
          <button
            className={styles.close}
            aria-label={t.close}
            onClick={() => setOpen(null)}
          >
            ✕
          </button>
          <button
            className={`${styles.navBtn} ${styles.prevBtn}`}
            aria-label={t.prev}
            onClick={e => { e.stopPropagation(); setOpen(i => (i === null ? i : (i + ALL_PHOTOS.length - 1) % ALL_PHOTOS.length)) }}
          >
            ‹
          </button>
          <button
            className={`${styles.navBtn} ${styles.nextBtn}`}
            aria-label={t.next}
            onClick={e => { e.stopPropagation(); setOpen(i => (i === null ? i : (i + 1) % ALL_PHOTOS.length)) }}
          >
            ›
          </button>
        </div>
      )}
    </div>
  )
}
