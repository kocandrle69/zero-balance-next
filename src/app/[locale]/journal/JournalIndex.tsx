'use client'

import { Link } from '../../../i18n/navigation'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import BackLink from '../../../components/BackLink'
import styles from './journal.module.css'
import { useLang } from '../../../contexts/LangContext'
import { POSTS, formatDate } from './posts'

const UI = {
  cs: { title: 'Časopis', sub: 'Prostor pro slovo, reflexi a sdílení naší cesty.', more: 'Číst dále' },
  en: { title: 'Journal', sub: 'A space for words, reflection and sharing our journey.', more: 'Read more' },
  hi: { title: 'पत्रिका', sub: 'शब्द, चिंतन और हमारी यात्रा साझा करने का एक स्थान।', more: 'आगे पढ़ें' },
} as const

export default function JournalIndex() {
  const { lang } = useLang()
  const ui = UI[lang]

  const posts = [...POSTS].sort((a, b) => b.date.localeCompare(a.date))

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
          {posts.map(post => {
            const meta = post.meta[lang]
            return (
              <Link key={post.slug} href={`/journal/${post.slug}`} className={styles.card}>
                <div className={styles.cardImg}>
                  <img
                    src={post.cover}
                    alt={meta.title}
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
            )
          })}
        </div>

      </main>
      <Footer />
    </>
  )
}
