'use client'

import Navbar from '../../../../components/Navbar'
import Footer from '../../../../components/Footer'
import BackLink from '../../../../components/BackLink'
import { Link } from '../../../../i18n/navigation'
import styles from '../journal.module.css'
import { useLang } from '../../../../contexts/LangContext'
import { getPost, getMeta, toPostLang } from '../posts'
import { TURNS as ORDER_WE_FORGOT_TURNS } from './orderWeForgotTranscript'
import { TURNS as SENSEI_TALKS_TURNS } from './senseiTalksTranscript'

const UI = {
  cs: { back: 'Zpět na článek' },
  en: { back: 'Back to article' },
  hi: { back: 'लेख पर वापस' },
  fr: { back: "Retour à l'article" },
  es: { back: 'Volver al artículo' },
  de: { back: 'Zurück zum Artikel' },
} as const

/** Zdrojový jazyk surového přepisu se liší vydání od vydání (Gurudévovy
 * hovory bývají hindsky, Senseiovy anglicky) — proto badge i data podle slugu. */
const TRANSCRIPTS: Record<string, { turns: { speaker: string; paragraphs: string[] }[]; badge: string }> = {
  'order-we-forgot': { turns: ORDER_WE_FORGOT_TURNS, badge: 'Raw transcript · Hindi' },
  'cesta-proti-proudu': { turns: SENSEI_TALKS_TURNS, badge: 'Raw transcript · English' },
}

export default function TranscriptPage({ slug }: { slug: string }) {
  const { lang: siteLang } = useLang()
  const lang = toPostLang(siteLang)
  const post = getPost(slug)
  const transcript = TRANSCRIPTS[slug]
  if (!post || !transcript) return null

  const meta = getMeta(post, lang)
  const ui = UI[lang] ?? UI.en

  return (
    <>
      <Navbar translucent />
      <main className={styles.page}>
        <div className={styles.transcriptHero}>
          <BackLink />
          <div className={styles.transcriptHeroInner}>
            <span className={styles.transcriptBadge}>{transcript.badge}</span>
            <h1 className={styles.postTitle}>{meta.title}</h1>
            <p className={styles.transcriptNote}>
              Unedited transcription from the original online meeting.
            </p>
          </div>
        </div>

        <article className={styles.article}>
          {transcript.turns.map((turn, i) => (
            <div key={i} className={styles.transcriptTurn}>
              <span className={styles.transcriptSpeaker}>{turn.speaker}:</span>
              {turn.paragraphs.map((p, j) => (
                <p key={j} className={styles.transcriptText}>{p}</p>
              ))}
            </div>
          ))}
        </article>

        <div className={styles.articleFooter}>
          <div className={styles.articleFooterRule} />
          <Link href={`/journal/${slug}`} className={styles.archiveLink}>{ui.back}</Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
