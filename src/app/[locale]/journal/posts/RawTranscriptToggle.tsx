import { Link } from '../../../../i18n/navigation'
import styles from '../journal.module.css'
import type { PostLang } from '../posts'

const UI = {
  cs: 'Zobrazit původní přepis',
  en: 'Show original transcript',
  hi: 'मूल प्रतिलेख देखें',
  fr: 'Afficher la transcription originale',
  es: 'Mostrar transcripción original',
  de: 'Original-Transkript anzeigen',
} as const

/** Odkaz na samostatnou stránku s celým surovým přepisem — viz `[slug]/transcript/page.tsx`. */
export default function RawTranscriptToggle({ lang }: { lang: PostLang }) {
  return (
    <div className={styles.transcriptWrap}>
      <Link href="/journal/order-we-forgot/transcript" className={styles.transcriptToggle}>
        {UI[lang] ?? UI.en}
        <span className={styles.transcriptArrow}>→</span>
      </Link>
    </div>
  )
}
