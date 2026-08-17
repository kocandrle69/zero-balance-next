'use client'

import { Fragment, type ReactNode } from 'react'
import Image from 'next/image'
import styles from './journal.module.css'
import type { Block } from './markdown'

const INLINE_LINK = /^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/

/** `*kurzíva*`, `**tučně**` a `[text](url)` uvnitř odstavce. */
function inline(text: string): ReactNode {
  const parts = text.split(/(\[[^\]]+\]\(https?:\/\/[^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g)
  return parts.map((p, i) => {
    const link = INLINE_LINK.exec(p)
    if (link) {
      const bold = /^\*\*([^*]+)\*\*$/.exec(link[1])
      return (
        <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>
          {bold ? <strong>{bold[1]}</strong> : link[1]}
        </a>
      )
    }
    if (p.startsWith('**') && p.endsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>
    if (p.startsWith('*') && p.endsWith('*')) return <em key={i}>{p.slice(1, -1)}</em>
    return <Fragment key={i}>{p}</Fragment>
  })
}

const FIG_CLASS = { left: styles.figLeft, right: styles.figRight, full: styles.figFull, plain: styles.figPlain }

export default function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className={styles.articleBody}>
      {blocks.map((b, i) => {
        switch (b.k) {
          case 'h2':
            return <h3 key={i} className={styles.chapterHead}>{b.t}</h3>
          case 'h3':
            return <h4 key={i} className={styles.sectionHead}>{b.t}</h4>
          case 'note':
            return <p key={i} className={styles.transNote}>{inline(b.t)}</p>
          case 'callout':
            return <aside key={i} className={styles.callout}>{inline(b.t)}</aside>
          case 'divider':
            return <div key={i} className={styles.sectionDivider} />
          case 'video':
            return (
              <a key={i} className={styles.videoLink} href={b.href} target="_blank" rel="noopener noreferrer">
                <span className={styles.videoIcon} aria-hidden="true">▶</span>
                {b.t}
              </a>
            )
          case 'fig':
            return (
              <figure key={i} className={FIG_CLASS[b.side]}>
                {b.side === 'plain' ? (
                  <img src={b.src} alt={b.alt} loading="lazy" />
                ) : (
                  <Image
                    src={b.src}
                    alt={b.alt}
                    fill
                    sizes={b.side === 'full' ? '(min-width: 700px) 700px, 100vw' : '260px'}
                  />
                )}
              </figure>
            )
          default:
            return <p key={i} className={styles.prose}>{inline(b.t)}</p>
        }
      })}
    </div>
  )
}
