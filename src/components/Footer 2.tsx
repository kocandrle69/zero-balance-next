'use client'

import styles from './Footer.module.css'
import { useLang } from '../contexts/LangContext'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>

        {/* Brand */}
        <div className={styles.footerBrand}>
          <a href="#" className={styles.footerLogo}>
            <svg viewBox="0 0 60 60" fill="none" width="44" height="44">
              <circle cx="30" cy="30" r="27" stroke="rgba(184,146,42,0.5)"  strokeWidth="1"/>
              <circle cx="30" cy="30" r="18" stroke="rgba(184,146,42,0.3)"  strokeWidth=".75"/>
              <line x1="30" y1="3"  x2="30" y2="57" stroke="rgba(184,146,42,0.22)" strokeWidth=".75"/>
              <line x1="3"  y1="30" x2="57" y2="30" stroke="rgba(184,146,42,0.22)" strokeWidth=".75"/>
              <circle cx="30" cy="30" r="4"   fill="rgba(184,146,42,0.9)"/>
              <circle cx="30" cy="30" r="1.8" fill="#B8922A"/>
            </svg>
            <div className={styles.logoText}>
              <span className={styles.logoName}>Zero Balance</span>
              <span className={styles.logoSub}>Society</span>
            </div>
          </a>
          <p>{t('foot_desc')}</p>
        </div>

        {/* Navigate */}
        <div className={styles.footerCol}>
          <h5>{t('foot_nav')}</h5>
          <ul>
            <li><a href="#about">{t('foot_about')}</a></li>
            <li><a href="#philosophy">{t('foot_phil')}</a></li>
            <li><a href="#activities">{t('foot_act')}</a></li>
            <li><a href="#india">{t('foot_india')}</a></li>
            <li><a href="#events">{t('foot_events')}</a></li>
            <li><a href="#">{t('foot_journal')}</a></li>
          </ul>
        </div>

        {/* Connect */}
        <div className={styles.footerCol}>
          <h5>{t('foot_conn')}</h5>
          <ul>
            <li><a href="#">{t('foot_contact')}</a></li>
            <li><a href="#join">{t('foot_join')}</a></li>
            <li><a href="#">{t('foot_donate')}</a></li>
            <li><a href="#">{t('foot_media')}</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className={styles.footerNewsletter}>
          <h5>{t('foot_stay')}</h5>
          <p>{t('foot_nl')}</p>
          <div className={styles.subForm}>
            <input type="email" placeholder={t('foot_email')} />
            <button type="button">{t('foot_sub')}</button>
          </div>
        </div>

      </div>

      <div className={styles.footerBottom}>
        <p>{t('foot_copy')}</p>
        <div className={styles.socials}>
          <a href="#" title="Instagram">◉</a>
          <a href="#" title="YouTube">▶</a>
          <a href="#" title="Facebook">f</a>
          <a href="#" title="Email">✉</a>
        </div>
      </div>
    </footer>
  )
}
