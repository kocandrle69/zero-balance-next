'use client'

import Link from 'next/link'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import BackLink from '../../../components/BackLink'
import styles from '../journal.module.css'
import { useLang } from '../../../contexts/LangContext'
import { getPost, bodyLang, formatDate, type PostLang } from '../posts'
import ArticleBody from '../ArticleBody'
import FoundingArticle from '../posts/FoundingArticle'
import type { Block } from '../markdown'

/**
 * Starší články psané přímo v TSX. Nové stačí přidat jako .md do `content/`
 * — sem se pak nic dopisovat nemusí.
 */
const BODIES: Record<string, (p: { lang: PostLang }) => React.ReactNode> = {
  'society-founded': FoundingArticle,
}

const UI = {
  cs: { archive: 'Všechna vydání', fallback: 'Český překlad tohoto článku se připravuje. Zatím jej nabízíme v angličtině.' },
  en: { archive: 'All issues',     fallback: 'An English translation of this article is being prepared. For now it is offered in Czech.' },
  hi: { archive: 'सभी अंक',        fallback: 'इस लेख का हिंदी अनुवाद तैयार किया जा रहा है। फ़िलहाल यह अंग्रेज़ी में उपलब्ध है।' },
} as const

export default function JournalPost({ slug, body }: { slug: string; body: Record<PostLang, Block[]> | null }) {
  const { lang } = useLang()
  const post = getPost(slug)
  const Body = BODIES[slug]
  if (!post || (!body && !Body)) return null

  const ui = UI[lang]
  const meta = post.meta[lang]
  const bl = bodyLang(post, lang)

  return (
    <>
      <Navbar translucent />
      <main className={styles.page}>

        {/* ── Obálka článku ─────────────────────────────────── */}
        <div className={styles.hero}>
          <div
            className={styles.heroBg}
            style={{ backgroundImage: `url(${post.cover})`, backgroundPosition: post.coverPos ?? 'center 50%' }}
          />
          <div className={styles.heroOverlay} />
          <BackLink />
          <div className={styles.mastheadInner}>
            <div className={styles.mastheadMeta}>
              <span className={styles.issueLabel}>{meta.rubric}</span>
              <span className={styles.issueDivider}>·</span>
              <time className={styles.issueLabel} dateTime={post.date}>{formatDate(post.date, lang)}</time>
            </div>
            <h1 className={styles.postTitle}>
              {meta.title}
              {meta.titleEm && <><br /><em>{meta.titleEm}</em></>}
            </h1>
            <div className={styles.mastheadRule} />
          </div>
        </div>

        {/* ── Text ──────────────────────────────────────────── */}
        <article className={styles.article}>
          {bl !== lang && <p className={styles.langNotice}>{ui.fallback}</p>}
          {body ? <ArticleBody blocks={body[bl]} /> : <Body lang={bl} />}
        </article>

        <div className={styles.articleFooter}>
          <div className={styles.articleFooterRule} />
          <Link href="/journal" className={styles.archiveLink}>{ui.archive}</Link>
        </div>

      </main>
      <Footer />
    </>
  )
}
