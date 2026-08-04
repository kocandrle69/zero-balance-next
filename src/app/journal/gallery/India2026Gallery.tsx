'use client'

import { useEffect, useState } from 'react'
import styles from './gallery.module.css'
import { INDIA_2026 } from './india2026'
import { PHOTOGRAPHERS } from './photographers'
import type { PostLang } from '../posts'

const UI = {
  cs: { close: 'Zavřít', prev: 'Předchozí', next: 'Další', lens: 'Objektivem' },
  en: { close: 'Close',  prev: 'Previous',  next: 'Next',  lens: 'Through the lens of' },
  hi: { close: 'बंद करें', prev: 'पिछला', next: 'अगला', lens: 'की नज़र से' },
} as const

/** Zploštěné pole napříč sekcemi — lightbox listuje bez ohledu na fotografa. */
const ALL_PHOTOS = INDIA_2026.flatMap(s => s.photos)
/** thumb → globální index; cesty k náhledům jsou v datech jedinečné. */
const PHOTO_INDEX = new Map(ALL_PHOTOS.map((p, i) => [p.thumb, i]))

export default function India2026Gallery({ lang }: { lang: PostLang }) {
  const t = UI[lang]
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
      {INDIA_2026.map((section, si) => (
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
