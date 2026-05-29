'use client'

import { useState } from 'react'
import Link from 'next/link'
import styles from './Footer.module.css'
import { useLang } from '../contexts/LangContext'

// ─── Brevo newsletter config ───────────────────────────────────────────────
// TODO: replace with real values from Brevo dashboard
const BREVO_API_KEY  = process.env.NEXT_PUBLIC_BREVO_API_KEY  ?? ''
const BREVO_LIST_ID  = Number(process.env.NEXT_PUBLIC_BREVO_LIST_ID ?? 0)
// ──────────────────────────────────────────────────────────────────────────

const CONTACT_MAILTO =
  'mailto:filous@senior.cz?cc=kocandrle@email.cz,jirikocandrle@gmail.com&subject=Zero%20Balance%20Society'

const MEMBERSHIP_MAILTO =
  'mailto:filous@senior.cz?cc=kocandrle@email.cz,jirikocandrle@gmail.com&subject=Z%C3%A1jem%20o%20%C4%8Dlenstv%C3%AD%20%E2%80%93%20Zero%20Balance%20Society'

export default function Footer() {
  const { t } = useLang()

  // newsletter state
  const [email,   setEmail]   = useState('')
  const [status,  setStatus]  = useState<'idle' | 'loading' | 'ok' | 'err'>('idle')
  const [errMsg,  setErrMsg]  = useState('')

  async function handleSubscribe() {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErrMsg(t('foot_email_invalid') ?? 'Please enter a valid e-mail.')
      setStatus('err')
      return
    }
    setStatus('loading')
    setErrMsg('')

    // If no API key yet → just show success (dev / staging)
    if (!BREVO_API_KEY || !BREVO_LIST_ID) {
      setTimeout(() => { setStatus('ok'); setEmail('') }, 600)
      return
    }

    try {
      const res = await fetch('https://api.brevo.com/v3/contacts', {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key':      BREVO_API_KEY,
        },
        body: JSON.stringify({
          email,
          listIds:    [BREVO_LIST_ID],
          updateEnabled: true,
        }),
      })

      if (res.ok || res.status === 204) {
        setStatus('ok')
        setEmail('')
      } else {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.message ?? `Error ${res.status}`)
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.'
      setErrMsg(msg)
      setStatus('err')
    }
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>

        {/* Brand */}
        <div className={styles.footerBrand}>
          <Link href="/" className={styles.footerLogo}>
            <svg viewBox="0 0 60 60" fill="none" width="44" height="44">
              <circle cx="30" cy="30" r="26" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5"/>
              <circle cx="30" cy="30" r="5"  fill="rgba(255,255,255,0.9)"/>
            </svg>
            <div className={styles.logoText}>
              <span className={styles.logoName}>Zero Balance</span>
              <span className={styles.logoSub}>Society</span>
            </div>
          </Link>
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
            <li><a href="/journal">{t('foot_journal')}</a></li>
          </ul>
        </div>

        {/* Connect */}
        <div className={styles.footerCol}>
          <h5>{t('foot_conn')}</h5>
          <ul>
            <li><a href={CONTACT_MAILTO}>{t('foot_contact')}</a></li>
            <li><a href={MEMBERSHIP_MAILTO}>{t('foot_join')}</a></li>
            {/* Donate page does not exist yet — placeholder */}
            <li><a href="#" aria-disabled="true" style={{ opacity: 0.45, pointerEvents: 'none' }}>{t('foot_donate')}</a></li>
            <li><a href="https://www.youtube.com/@HariharOm" target="_blank" rel="noopener noreferrer">{t('foot_media')}</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className={styles.footerNewsletter}>
          <h5>{t('foot_stay')}</h5>
          <p>{t('foot_nl')}</p>

          {status === 'ok' ? (
            <p className={styles.subSuccess}>{t('foot_sub_ok') ?? '✓ You\'re subscribed!'}</p>
          ) : (
            <>
              <div className={styles.subForm}>
                <input
                  type="email"
                  placeholder={t('foot_email')}
                  value={email}
                  onChange={e => { setEmail(e.target.value); setStatus('idle'); setErrMsg('') }}
                  onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                  disabled={status === 'loading'}
                />
                <button
                  type="button"
                  onClick={handleSubscribe}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? '…' : t('foot_sub')}
                </button>
              </div>
              {status === 'err' && <p className={styles.subError}>{errMsg}</p>}
            </>
          )}
        </div>

      </div>

      <div className={styles.footerBottom}>
        <p>{t('foot_copy')}</p>
        <div className={styles.socials}>
          {/* Sociální sítě — zatím pouze YouTube a Email */}
          <a href="https://www.youtube.com/@HariharOm" target="_blank" rel="noopener noreferrer" title="YouTube">▶</a>
          <a href={CONTACT_MAILTO} title="Email">✉</a>
        </div>
      </div>
    </footer>
  )
}