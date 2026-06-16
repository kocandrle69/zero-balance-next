'use client'

import styles from './QuoteSection.module.css'
import { useLang } from '../contexts/LangContext'

export default function QuoteSection() {
  const { lang } = useLang()
  const cs = lang === 'cs'
  const hi = lang === 'hi'

  return (
    <div className={styles.quoteBanner}>
      <div className={styles.quoteBannerBg} />
      <div className={styles.quoteBannerOverlay} />
      <div className={styles.quoteBannerContent}>
        <blockquote>
          {hi
            ? <span dangerouslySetInnerHTML={{ __html: '\"जब मन शांत हो जाता है,<br/>तो <strong>आत्मा</strong> स्वयं अपने प्रकाश से चमकती है।\"' }} />
            : cs
            ? <span dangerouslySetInnerHTML={{ __html: '„V tichu mysli<br/>zazáří <strong>Já</strong> vlastním světlem."' }} />
            : <span dangerouslySetInnerHTML={{ __html: '"When the mind becomes still,<br/>the <strong>Self</strong> shines of its own accord."' }} />
          }
        </blockquote>
        <p className={styles.quoteAttr}>— Mandukya Upanishad</p>
      </div>
    </div>
  )
}
