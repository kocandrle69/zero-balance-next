'use client'

import { useEffect, useState } from 'react'
import { Link } from '../i18n/navigation'
import { useLang } from '../contexts/LangContext'
import styles from './AnnouncementBar.module.css'

// Verzovaný klíč — když se text lišty časem změní (konkrétní termín, místo…),
// stačí zvýšit číslo a lišta se znovu ukáže i těm, kdo ji dřív zavřeli.
const DISMISS_KEY = 'zbs_announce_dismissed_v1'

export default function AnnouncementBar() {
  const { t } = useLang()
  const [dismissed, setDismissed] = useState(false)

  // localStorage není při SSR dostupný, takže se stav "zavřeno" nedá vyčíst
  // dřív než po hydrataci na klientovi. Server/první klientský render se
  // musí shodovat (jinak hydration mismatch), takže default je "viditelná"
  // a tenhle efekt ji případně hned po mountu schová — standardní vzor pro
  // localStorage-odvozený UI stav, ne bug.
  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (localStorage.getItem(DISMISS_KEY) === '1') setDismissed(true)
    } catch { /* localStorage nedostupné (soukromé okno apod.) — lišta prostě zůstane vidět */ }
  }, [])

  // Zbytek layoutu (Navbar, BackLink, výška hero bannerů na podstránkách…)
  // čte výšku lišty přes CSS proměnnou --announce-h, ne napevno — takže
  // schování lišty korektně srovná i všechno pod ní, žádná díra po zavření.
  useEffect(() => {
    document.documentElement.style.setProperty('--announce-h', dismissed ? '0px' : '40px')
  }, [dismissed])

  const dismiss = () => {
    setDismissed(true)
    try { localStorage.setItem(DISMISS_KEY, '1') } catch { /* viz výše */ }
  }

  if (dismissed) return null

  return (
    <div className={styles.bar}>
      {/* /registrace-gurudev (Airtable) je zatím jen na dev — dokud nejde
          na main, lišta vede na Brevo capture formulář v Events kartě
          na homepage, stejně jako to dřív dělal hero_desc odkaz. */}
      <Link href="/#events" className={styles.link}>
        {/* Plný text se na mobilu nevejde ani se zkrácením přes ellipsis
            čitelně (zbyl by nesrozumitelný útržek věty) — místo toho tam
            jde krátká samostatná varianta, přepnutá čistě přes CSS
            (žádný JS/media-query stav, aby nehrozil hydration mismatch). */}
        <span className={styles.text}>
          <span className={styles.textFull}>{t('announce_text')}</span>
          <span className={styles.textShort}>{t('announce_text_mobile')}</span>
        </span>
        <span className={styles.cta}>{t('announce_cta')} →</span>
      </Link>
      <button
        type="button"
        onClick={dismiss}
        className={styles.close}
        aria-label="Close"
      >
        ×
      </button>
    </div>
  )
}
