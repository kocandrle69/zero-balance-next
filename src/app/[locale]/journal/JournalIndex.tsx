'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Link } from '../../../i18n/navigation'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import BackLink from '../../../components/BackLink'
import styles from './journal.module.css'
import { useLang } from '../../../contexts/LangContext'
import { POSTS, formatDate, toPostLang, getMeta } from './posts'

type SortMode = 'new' | 'old' | 'az'

const PAGE_SIZE = 5

const UI = {
  cs: {
    title: 'Časopis', sub: 'Prostor pro slovo, reflexi a sdílení naší cesty.', more: 'Číst dále',
    sortNew: 'Nejnovější', sortOld: 'Nejstarší', sortAz: 'Podle abecedy', loadMore: 'Zobrazit další',
  },
  en: {
    title: 'Journal', sub: 'A space for words, reflection and sharing our journey.', more: 'Read more',
    sortNew: 'Newest', sortOld: 'Oldest', sortAz: 'A–Z', loadMore: 'Show more',
  },
  hi: {
    title: 'पत्रिका', sub: 'शब्द, चिंतन और हमारी यात्रा साझा करने का एक स्थान।', more: 'आगे पढ़ें',
    sortNew: 'नवीनतम', sortOld: 'सबसे पुराना', sortAz: 'वर्णानुक्रम से', loadMore: 'और दिखाएँ',
  },
  fr: {
    title: 'Journal', sub: 'Un espace pour la parole, la réflexion et le partage de notre chemin.', more: 'Lire la suite',
    sortNew: 'Plus récents', sortOld: 'Plus anciens', sortAz: 'Alphabétique', loadMore: 'Afficher plus',
  },
  es: {
    title: 'Revista', sub: 'Un espacio para la palabra, la reflexión y compartir nuestro camino.', more: 'Leer más',
    sortNew: 'Más recientes', sortOld: 'Más antiguos', sortAz: 'Alfabético', loadMore: 'Mostrar más',
  },
  de: {
    title: 'Journal', sub: 'Ein Raum für Worte, Reflexion und das Teilen unseres Weges.', more: 'Weiterlesen',
    sortNew: 'Neueste', sortOld: 'Älteste', sortAz: 'Alphabetisch', loadMore: 'Mehr anzeigen',
  },
} as const

export default function JournalIndex() {
  const { lang: siteLang } = useLang()
  const lang = toPostLang(siteLang)
  const ui = UI[lang]

  const [sort, setSort] = useState<SortMode>('new')
  const [visible, setVisible] = useState(PAGE_SIZE)

  function handleSort(next: SortMode) {
    setSort(next)
    setVisible(PAGE_SIZE)
  }

  const withMeta = POSTS.map(post => ({ post, meta: getMeta(post, lang) }))
  const sorted = [...withMeta].sort((a, b) => {
    if (sort === 'az') return a.meta.title.localeCompare(b.meta.title, lang)
    return sort === 'new' ? b.post.date.localeCompare(a.post.date) : a.post.date.localeCompare(b.post.date)
  })
  const shown = sorted.slice(0, visible)
  const hasMore = visible < sorted.length

  return (
    <>
      <Navbar translucent />
      <main className={styles.page}>

        {/* ── Hlavička časopisu ─────────────────────────────── */}
        <div className={styles.hero}>
          <div className={styles.heroBg} style={{ backgroundImage: 'url(/images/Casopis3.jpg)' }} />
          <div className={styles.heroOverlay} />
          <BackLink />
          <div className={styles.mastheadInner}>
            <div className={styles.mastheadMeta}>
              <span className={styles.issueLabel}>Zero Balance Society, z.s.</span>
            </div>
            <h1 className={styles.mastheadTitle}>{ui.title}</h1>
            <p className={styles.mastheadSub}>{ui.sub}</p>
            <div className={styles.mastheadRule} />
          </div>
        </div>

        {/* ── Archiv vydání ─────────────────────────────────── */}
        <div className={styles.archive}>
          <div className={styles.sortBar} role="group">
            {(['new', 'old', 'az'] as const).map(mode => (
              <button
                key={mode}
                type="button"
                className={sort === mode ? `${styles.sortBtn} ${styles.sortBtnActive}` : styles.sortBtn}
                onClick={() => handleSort(mode)}
              >
                {mode === 'new' ? ui.sortNew : mode === 'old' ? ui.sortOld : ui.sortAz}
              </button>
            ))}
          </div>

          {shown.map(({ post, meta }) => (
            <Link key={post.slug} href={`/journal/${post.slug}`} className={styles.card}>
              <div className={styles.cardImg}>
                <Image
                  src={post.cover}
                  alt={meta.title}
                  fill
                  sizes="260px"
                  style={post.coverPos ? { objectPosition: post.coverPos } : undefined}
                />
              </div>
              <div className={styles.cardText}>
                <div className={styles.cardMeta}>
                  <span className={styles.kicker}>{meta.rubric}</span>
                  <time className={styles.articleDate} dateTime={post.date}>
                    {formatDate(post.date, lang)}
                  </time>
                </div>
                <h2 className={styles.cardTitle}>
                  {meta.title}
                  {meta.titleEm && <><br /><em>{meta.titleEm}</em></>}
                </h2>
                <p className={styles.cardPerex}>{meta.perex}</p>
                <span className={styles.cardMore}>
                  {ui.more} <span className={styles.cardArrow}>→</span>
                </span>
              </div>
            </Link>
          ))}

          {hasMore && (
            <div className={styles.loadMoreWrap}>
              <button type="button" className={styles.loadMoreBtn} onClick={() => setVisible(v => v + PAGE_SIZE)}>
                {ui.loadMore}
              </button>
            </div>
          )}
        </div>

      </main>
      <Footer />
    </>
  )
}
