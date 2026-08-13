'use client'

import styles from './QuoteSection.module.css'
import { useLang } from '../contexts/LangContext'

export default function QuoteSection() {
  const { lang } = useLang()
  const cs = lang === 'cs'
  const hi = lang === 'hi'
  const fr = lang === 'fr'
  const es = lang === 'es'
  const de = lang === 'de'

  return (
    <div className={styles.quoteBanner}>
      <div className={styles.quoteBannerBg} />
      <div className={styles.quoteBannerOverlay} />
      <div className={styles.quoteBannerContent}>
        <blockquote>
          {hi
            ? <span dangerouslySetInnerHTML={{ __html: 'जब मन पूर्णतः शांत हो जाता है,<br/>तब <strong>आत्मा</strong> स्वयं प्रकाशित होती है।"' }} />
            : cs
            ? <span dangerouslySetInnerHTML={{ __html: '„V tichu mysli<br/>zazáří <strong>Já</strong> vlastním světlem."' }} />
            : fr
            ? <span dangerouslySetInnerHTML={{ __html: '«&nbsp;Quand le mental s’apaise,<br/>le <strong>Soi</strong> resplendit de lui-même.&nbsp;»' }} />
            : es
            ? <span dangerouslySetInnerHTML={{ __html: '«Cuando la mente se aquieta,<br/>el <strong>Ser</strong> resplandece por sí mismo.»' }} />
            : de
            ? <span dangerouslySetInnerHTML={{ __html: '„Wenn der Geist zur Ruhe kommt,<br/>erstrahlt das <strong>Selbst</strong> aus sich selbst heraus."' }} />
            : <span dangerouslySetInnerHTML={{ __html: '"When the mind becomes still,<br/>the <strong>Self</strong> shines of its own accord."' }} />
          }
        </blockquote>
        <p className={styles.quoteAttr}>— {hi ? 'माण्डूक्य उपनिषद' : 'Mandukya Upanishad'}</p>
      </div>
    </div>
  )
}
