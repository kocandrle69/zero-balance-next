'use client'

import { Link } from '../../../../i18n/navigation'
import Navbar from '../../../../components/Navbar'
import Footer from '../../../../components/Footer'
import BackLink from '../../../../components/BackLink'
import styles from '../journal.module.css'
import { useLang } from '../../../../contexts/LangContext'
import { getPost, bodyLang, formatDate, toPostLang, getMeta, type PostLang } from '../posts'
import ArticleBody from '../ArticleBody'
import FoundingArticle from '../posts/FoundingArticle'
import India2026Gallery from '../gallery/India2026Gallery'
import RawTranscriptToggle from '../posts/RawTranscriptToggle'

/**
 * Vydání, kam se za `ArticleBody` (nebo místo/po `Body`) dopisuje jeden
 * malý extra blok navíc — na rozdíl od `BODIES` toto tělo nenahrazuje.
 */
const EXTRAS: Record<string, (p: { lang: PostLang }) => React.ReactNode> = {
  'order-we-forgot': RawTranscriptToggle,
}
import type { Block } from '../markdown'

/**
 * Vydání, jejichž tělo NENÍ text z content/*.md — starší články psané přímo
 * v TSX a galerie. Nový textový článek stačí přidat jako .md do `content/`,
 * sem se pak nic dopisovat nemusí.
 */
const BODIES: Record<string, (p: { lang: PostLang }) => React.ReactNode> = {
  'society-founded': FoundingArticle,
  'bharat-2026': India2026Gallery,
}

const UI = {
  cs: { archive: 'Všechna vydání', fallback: 'Český překlad tohoto článku se připravuje. Zatím jej nabízíme v angličtině.' },
  en: { archive: 'All issues',     fallback: 'An English translation of this article is being prepared. For now it is offered in Czech.' },
  hi: { archive: 'सभी अंक',        fallback: 'इस लेख का हिंदी अनुवाद तैयार किया जा रहा है। फ़िलहाल यह अंग्रेज़ी में उपलब्ध है।' },
  fr: { archive: 'Tous les numéros', fallback: 'La traduction française de cet article est en préparation. En attendant, il est proposé en anglais.' },
  es: { archive: 'Todos los números', fallback: 'La traducción al español de este artículo está en preparación. Por ahora se ofrece en inglés.' },
  de: { archive: 'Alle Ausgaben', fallback: 'Eine deutsche Übersetzung dieses Artikels wird vorbereitet. Bis dahin ist er auf Englisch verfügbar.' },
} as const

export default function JournalPost({ slug, body }: { slug: string; body: Record<PostLang, Block[]> | null }) {
  const { lang: siteLang } = useLang()
  const lang = toPostLang(siteLang)
  const post = getPost(slug)
  const Body = BODIES[slug]
  const Extra = EXTRAS[slug]
  if (!post || (!body && !Body)) return null

  const ui = UI[lang]
  const meta = getMeta(post, lang)
  const bl = bodyLang(post, lang)

  const kicker = (
    <div className={styles.mastheadMeta}>
      <span className={styles.issueLabel}>{meta.rubric}</span>
      <span className={styles.issueDivider}>·</span>
      <time className={styles.issueLabel} dateTime={post.date}>{formatDate(post.date, lang)}</time>
    </div>
  )
  const title = (
    <h1 className={styles.postTitle}>
      {meta.title}
      {meta.titleEm && <><br /><em>{meta.titleEm}</em></>}
    </h1>
  )
  const coverImg = (
    <div
      className={styles.heroBg}
      style={{ backgroundImage: `url(${post.cover})`, backgroundPosition: post.coverPos ?? 'center 50%' }}
    />
  )

  return (
    <>
      <Navbar translucent />
      <main className={styles.page}>

        {/* ── Obálka článku ─────────────────────────────────── */}
        <div className={styles.hero}>
          {coverImg}
          <div className={styles.heroOverlay} />
          <BackLink />
          <div className={styles.mastheadInner}>
            {kicker}
            {title}
            <div className={styles.mastheadRule} />
          </div>
        </div>

        {/* ── Text ──────────────────────────────────────────── */}
        <article className={post.wide ? `${styles.article} ${styles.articleWide}` : styles.article}>
          {bl !== lang && <p className={styles.langNotice}>{ui.fallback}</p>}
          {body ? <ArticleBody blocks={body[bl]} /> : <Body lang={bl} />}
          {Extra && <Extra lang={bl} />}
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
