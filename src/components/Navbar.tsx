'use client'

import { useEffect, useState, useRef } from 'react'
import styles from './Navbar.module.css'
import { useLang } from '../contexts/LangContext'
import type { Lang } from '../lib/translations'
import Link from 'next/link'

const LANGUAGES = [
  { code: 'en' as Lang, flag: '🇬🇧', name: 'English',   soon: false },
  { code: 'cs' as Lang, flag: '🇨🇿', name: 'Čeština',   soon: false },
  { code: 'hi' as Lang, flag: '🇮🇳', name: 'हिन्दी',     soon: false },
  { code: 'es' as Lang, flag: '🇪🇸', name: 'Español',   soon: true  },
  { code: 'fr' as Lang, flag: '🇫🇷', name: 'Français',  soon: true  },
  { code: 'de' as Lang, flag: '🇩🇪', name: 'Deutsch',   soon: true  },
]

export default function Navbar({ translucent = false }: { translucent?: boolean }) {
  const { lang, t, setLang } = useLang()
  const [scrolled,   setScrolled]   = useState(false)
  const [langOpen,   setLangOpen]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)
  const dropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close lang dropdown on outside click / Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setLangOpen(false); setMenuOpen(false) }
    }
    const onDoc = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setLangOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('click', onDoc)
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('click', onDoc) }
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const navLinks = [
    { href: '/about',        key: 'nav_about'      },
    { href: '/#philosophy', key: 'nav_philosophy'  },
    { href: '/#activities', key: 'nav_activities'  },
    { href: '/#india',      key: 'nav_india'       },
    { href: '/#events',     key: 'nav_events'      },
    { href: '/media',      key: 'nav_media'       },
    { href: '/journal',    key: 'nav_journal'     },
  ] as const

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : (translucent ? styles.translucent : '')}`} id="nav">

        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <div className={styles.logoMark}>
            <svg viewBox="0 0 60 60" fill="none" width="40" height="40">
              <circle cx="30" cy="30" r="26" stroke="#1C1C1A" strokeWidth="1.5"/>
              <circle cx="30" cy="30" r="5"  fill="#1C1C1A"/>
            </svg>
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoName}>Zero Balance</span>
            <span className={styles.logoSub}>Society</span>
          </div>
        </Link> 

        {/* Desktop nav links */}
        <ul className={styles.navLinks}>
          {navLinks.map(l => (
            <li key={l.key}><a href={l.href}>{t(l.key)}</a></li>
          ))}
        </ul>

        {/* Desktop lang dropdown */}
        <div ref={dropRef} className={`${styles.langDropdown} ${langOpen ? styles.open : ''}`}>
          <button className={styles.langTrigger} onClick={() => setLangOpen(!langOpen)}>
            <svg className={styles.langGlobe} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20"/>
            </svg>
            <span className={styles.langCurrent}>{lang.toUpperCase()}</span>
            <svg className={styles.langArrow} viewBox="0 0 10 6" fill="currentColor">
              <path d="M0 0l5 6 5-6z"/>
            </svg>
          </button>
          <div className={styles.langMenu}>
            {LANGUAGES.map(l => (
              <div
                key={l.code}
                className={`${styles.langItem} ${l.code === lang ? styles.active : ''} ${l.soon ? styles.disabled : ''}`}
                onClick={() => !l.soon && setLang(l.code)}
              >
                <span className={styles.langFlag}>{l.flag}</span>
                <div className={styles.langInfo}>
                  <span className={styles.langCode}>{l.code.toUpperCase()}</span>
                  <span className={styles.langName}>{l.name}</span>
                </div>
                {l.soon  && <span className={styles.langSoon}>{lang === 'hi' ? 'जल्द' : 'Soon'}</span>}
                {!l.soon && l.code === lang && <span className={styles.langDot} />}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          <span /><span /><span />
        </button>

      </nav>

      {/* Mobile overlay menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.mobileMenuInner}>
          <ul className={styles.mobileLinks}>
            {navLinks.map(l => (
              <li key={l.key}>
                <a href={l.href} onClick={() => setMenuOpen(false)}>{t(l.key)}</a>
              </li>
            ))}
          </ul>
          {/* Lang switcher in mobile */}
          <div className={styles.mobileLang}>
            {LANGUAGES.filter(l => !l.soon).map(l => (
              <button
                key={l.code}
                className={`${styles.mobileLangBtn} ${l.code === lang ? styles.mobileLangActive : ''}`}
                onClick={() => { setLang(l.code); setMenuOpen(false) }}
              >
                <span>{l.flag}</span> {l.code.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}