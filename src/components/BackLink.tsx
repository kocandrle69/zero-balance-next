'use client'

import Link from 'next/link'
import { useLang } from '../contexts/LangContext'
import styles from './BackLink.module.css'

export default function BackLink() {
  const { lang } = useLang()

  return (
    <Link href="/" className={styles.back}>
      <span className={styles.arrow}>←</span>
      {lang === 'cs' ? 'Zpět' : 'Back'}
    </Link>
  )
}
