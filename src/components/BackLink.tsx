'use client'

import { useRouter } from 'next/navigation'
import { useLang } from '../contexts/LangContext'
import styles from './BackLink.module.css'

export default function BackLink() {
  const { lang } = useLang()
  const router = useRouter()

  function handleBack() {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/')
    }
  }

  return (
    <button onClick={handleBack} className={styles.back}>
      <span className={styles.arrow}>←</span>
      {lang === 'hi' ? 'वापस' : lang === 'cs' ? 'Zpět' : 'Back'}
    </button>
  )
}
