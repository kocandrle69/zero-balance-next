'use client'

import { useEffect, useState } from 'react'
import { useLang } from '../contexts/LangContext'
import styles from './CookieConsent.module.css'

const STORAGE_KEY = 'zbs_consent'

/**
 * Volá gtag('consent', 'update', ...) — nastavuje se PO počátečním
 * gtag('consent', 'default', ...), který jede inline v app/[locale]/layout.tsx
 * ještě před gtag('config', ...). Google Consent Mode v2 (4 signály).
 */
function updateConsent(granted: boolean) {
  const v = granted ? 'granted' : 'denied'
  window.gtag?.('consent', 'update', {
    ad_storage: v,
    ad_user_data: v,
    ad_personalization: v,
    analytics_storage: v,
  })
}

export default function CookieConsent() {
  const { t } = useLang()
  // Dokud nevíme (client-only, po mountu) jestli se má lišta ukázat, nic
  // nerenderujeme — jinak by se první server-rendered průchod (bez
  // přístupu k localStorage) neshodoval s klientským a Reactu by to
  // hodilo hydration mismatch.
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      setVisible(localStorage.getItem(STORAGE_KEY) === null)
    } catch {
      // localStorage nedostupný (privátní režim některých prohlížečů apod.)
      // — v tom případě lištu radši ukážeme, než abychom sledovali bez souhlasu.
      setVisible(true)
    }
  }, [])

  // Naslouchá na vlastní event z Footer.tsx („Nastavení cookies“), aby šlo
  // volbu kdykoli znovu otevřít bez reloadu stránky.
  useEffect(() => {
    const reopen = () => setVisible(true)
    window.addEventListener('zbs:cookie-settings', reopen)
    return () => window.removeEventListener('zbs:cookie-settings', reopen)
  }, [])

  function decide(granted: boolean) {
    try {
      localStorage.setItem(STORAGE_KEY, granted ? 'granted' : 'denied')
    } catch {
      // beze změny — když se nedá zapsat, příště se lišta prostě ukáže znovu
    }
    updateConsent(granted)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className={styles.bar} role="dialog" aria-modal="false" aria-label={t('cookie_title')}>
      <div className={styles.inner}>
        <div className={styles.text}>
          <p className={styles.title}>{t('cookie_title')}</p>
          <p className={styles.desc}>{t('cookie_desc')}</p>
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.reject} onClick={() => decide(false)}>
            {t('cookie_reject')}
          </button>
          <button type="button" className={styles.accept} onClick={() => decide(true)}>
            {t('cookie_accept')}
          </button>
        </div>
      </div>
    </div>
  )
}
