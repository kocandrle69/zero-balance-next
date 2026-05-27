'use client'

import styles from './QuoteSection.module.css'
import { useLang } from '../contexts/LangContext'

export default function QuoteSection() {
  const { tHTML } = useLang()
  return (
    <div className={styles.quote}>
      <blockquote dangerouslySetInnerHTML={tHTML('quote')} />
      <p className={styles.quoteAttr}>— Zero Balance Society</p>
    </div>
  )
}
