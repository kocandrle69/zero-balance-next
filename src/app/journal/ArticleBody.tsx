'use client'

import { Fragment, type ReactNode } from 'react'
import styles from './journal.module.css'
import type { Block } from './markdown'

/** `*kurzíva*` a `**tučně**` uvnitř odstavce. */
function inline(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g)
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) return <strong key={i}>{p.slice(2, -2)}</strong>
    if (p.startsWith('*') && p.endsWith('*')) return <em key={i}>{p.slice(1, -1)}</em>
    return <Fragment key={i}>{p}</Fragment>
  })
}

const FIG_CLASS = { left: styles.figLeft, right: styles.figRight, full: styles.figFull }

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
                <img src={b.src} alt={b.alt} />
              </figure>
            )
          default:
            return <p key={i} className={styles.prose}>{inline(b.t)}</p>
        }
      })}
    </div>
  )
}
