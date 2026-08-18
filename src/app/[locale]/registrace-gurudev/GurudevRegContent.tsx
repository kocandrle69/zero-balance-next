'use client'

import Image from 'next/image'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import BackLink from '../../../components/BackLink'
import { useLang } from '../../../contexts/LangContext'
import styles from '../../../components/subpage.module.css'
import IMG from '../../../lib/images'
import type { Lang } from '../../../lib/translations'

/**
 * Dva různé Airtable formuláře nad JEDNOU tabulkou (app6yeEWBf9CgXLyb) —
 * embed je veřejný ("Anyone with the link"/"Anyone on the web"), žádný API
 * klíč není potřeba. Další jazyk = jeden další řádek sem, nic víc.
 */
const FORM_EMBEDS: Partial<Record<Lang, string>> = {
  cs: 'https://airtable.com/embed/app6yeEWBf9CgXLyb/pag4o0TT5OeJvsPPz/form',
  en: 'https://airtable.com/embed/app6yeEWBf9CgXLyb/pagJVzcggZrjXgM4j/form',
  // hi, es, fr, de: doplnit, až budou hotové formuláře v Airtable.
}

/**
 * Hlavička stránky (mimo iframe). Stejný lokální CONTENT-objekt pattern
 * jako u ostatních podstránek (About/Community/Serve/Donate) — ne globální
 * translations.ts, protože tam musí KAŽDÝ jazyk implementovat úplně stejnou
 * sadu klíčů (typ TranslationKey je sdílený přes všech 6 lokalizací), takže
 * "zatím jen cs/en, zbytek později" by tam bez placeholderů pro hi/fr/es/de
 * nešlo zkompilovat. Tady fallback řeší prostě výběr níž (CONTENT.en jako
 * default) — přidání dalšího jazyka je jeden nový klíč do objektu.
 */
const CONTENT = {
  cs: {
    label: 'Registrace',
    titleLine1: 'Registrace na návštěvu',
    titleLine2: 'Gurudeva',
    lead: 'Připravujeme výjimečnou návštěvu Gurudeva Shri Karauli Shankar Mahadev Ji v České republice — květen 2027. Vyplňte prosím formulář níže; ozveme se vám s dalšími informacemi, jakmile budou k dispozici.',
  },
  en: {
    label: 'Registration',
    titleLine1: "Register for Gurudev's",
    titleLine2: 'Visit',
    lead: "We are preparing an extraordinary visit of Gurudev Shri Karauli Shankar Mahadev Ji to the Czech Republic — May 2027. Please fill in the form below and we'll get back to you with details as soon as they're available.",
  },
} as const

export default function GurudevRegContent() {
  const { lang } = useLang()
  const c = lang === 'cs' ? CONTENT.cs : CONTENT.en
  const embedSrc = FORM_EMBEDS[lang] ?? FORM_EMBEDS.en!

  return (
    <>
      <Navbar translucent />
      <main className={styles.page}>

        <div className={styles.hero}>
          <Image
            src={IMG.heroBg}
            alt=""
            fill
            priority
            sizes="100vw"
            quality={80}
            className={styles.heroBg}
            style={{ objectFit: 'cover', objectPosition: 'center 30%', transform: 'none' }}
          />
          <div className={styles.heroOverlay} />
          <BackLink />
          <div className={styles.heroContent}>
            <p className={styles.heroLabel}>{c.label}</p>
            <h1 className={styles.heroTitle}>
              {c.titleLine1}<br /><em>{c.titleLine2}</em>
            </h1>
          </div>
        </div>

        <article className={styles.article}>

          <p className={styles.lead}>{c.lead}</p>

          <section className={styles.section}>
            <div className={styles.formEmbedWrap}>
              <iframe
                className={styles.formEmbedIframe}
                src={embedSrc}
                title={c.titleLine1 + ' ' + c.titleLine2}
              />
            </div>
          </section>

        </article>

      </main>
      <Footer />
    </>
  )
}
