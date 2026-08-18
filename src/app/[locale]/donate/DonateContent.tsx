'use client'

import { useState } from 'react'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import BackLink from '../../../components/BackLink'
import { useLang } from '../../../contexts/LangContext'
import styles from '../../../components/subpage.module.css'

const DONATE_MAILTO =
  'mailto:jan@zero-balance.org?cc=jiri@zero-balance.org&subject=Zero%20Balance%20Society%20%E2%80%93%20potvrzen%C3%AD%20daru'

// Účet zveřejněný spolkem — FIO banka. Ke změně jen na výslovnou žádost.
const ACCOUNT = {
  number: '2103573695 / 2010',
  iban: 'CZ44 2010 0000 0021 0357 3695',
  swift: 'FIOBCZPPXXX',
}

const CONTENT = {
  en: {
    label: 'Support',
    titleLine1: 'Support',
    titleLine2: 'Our Mission',
    lead: 'Zero Balance Society, z.s. is a registered Czech non-profit association. Every gift — of any size — goes directly toward preserving and sharing the meditative, cultural and spiritual traditions we serve.',
    bankHead: 'Bank Transfer',
    bankIntro: 'You can send a donation directly to our association account:',
    labelAccount: 'Account number',
    labelIban: 'IBAN',
    labelSwift: 'BIC / SWIFT',
    copy: 'Copy',
    copied: 'Copied',
    noteHead: 'Need a confirmation?',
    noteP: 'If you would like written confirmation of your donation — for example for your own records — just write to us. We are happy to send one.',
    contactCta: 'Write to Us',
    footer: 'Zero Balance Society, z.s. · Thank you for your support',
  },
  cs: {
    label: 'Podpořte nás',
    titleLine1: 'Podpořte',
    titleLine2: 'naše poslání',
    lead: 'Zero Balance Society, z.s. je registrovaný český spolek. Každý dar — jakékoli výše — jde přímo na uchovávání a předávání meditačních, kulturních a duchovních tradic, kterým sloužíme.',
    bankHead: 'Bankovní převod',
    bankIntro: 'Dar můžete zaslat přímo na účet spolku:',
    labelAccount: 'Číslo účtu',
    labelIban: 'IBAN',
    labelSwift: 'BIC / SWIFT',
    copy: 'Kopírovat',
    copied: 'Zkopírováno',
    noteHead: 'Potřebujete potvrzení?',
    noteP: 'Pokud byste chtěli písemné potvrzení o daru — například pro vlastní účely — napište nám. Rádi ho zašleme.',
    contactCta: 'Napište nám',
    footer: 'Zero Balance Society, z.s. · Děkujeme za vaši podporu',
  },
  hi: {
    label: 'हमें सहयोग दें',
    titleLine1: 'हमारे मिशन को',
    titleLine2: 'सहयोग दें',
    lead: 'Zero Balance Society, z.s. एक पंजीकृत चेक अलाभकारी संस्था है। कोई भी दान — चाहे किसी भी राशि का — सीधे उन ध्यान, सांस्कृतिक और आध्यात्मिक परंपराओं के संरक्षण और प्रसार में लगता है, जिनकी हम सेवा करते हैं।',
    bankHead: 'बैंक ट्रांसफर',
    bankIntro: 'आप संस्था के खाते में सीधे दान भेज सकते हैं:',
    labelAccount: 'खाता संख्या',
    labelIban: 'IBAN',
    labelSwift: 'BIC / SWIFT',
    copy: 'कॉपी करें',
    copied: 'कॉपी हो गया',
    noteHead: 'पुष्टि चाहिए?',
    noteP: 'यदि आप अपने दान की लिखित पुष्टि चाहते हैं — उदाहरण के लिए अपने रिकॉर्ड के लिए — तो बस हमें लिखें। हमें भेजने में खुशी होगी।',
    contactCta: 'हमें लिखें',
    footer: 'Zero Balance Society, z.s. · आपके सहयोग के लिए धन्यवाद',
  },
  fr: {
    label: 'Soutenez-nous',
    titleLine1: 'Soutenez',
    titleLine2: 'notre mission',
    lead: 'Zero Balance Society, z.s. est une association tchèque à but non lucratif enregistrée. Chaque don — quel que soit son montant — contribue directement à préserver et transmettre les traditions méditatives, culturelles et spirituelles que nous servons.',
    bankHead: 'Virement bancaire',
    bankIntro: 'Vous pouvez envoyer un don directement sur le compte de l’association :',
    labelAccount: 'Numéro de compte',
    labelIban: 'IBAN',
    labelSwift: 'BIC / SWIFT',
    copy: 'Copier',
    copied: 'Copié',
    noteHead: 'Besoin d’une confirmation ?',
    noteP: 'Si vous souhaitez une confirmation écrite de votre don — par exemple pour vos propres besoins — écrivez-nous. Nous serons heureux de vous l’envoyer.',
    contactCta: 'Écrivez-nous',
    footer: 'Zero Balance Society, z.s. · Merci pour votre soutien',
  },
  es: {
    label: 'Apóyanos',
    titleLine1: 'Apoya',
    titleLine2: 'nuestra misión',
    lead: 'Zero Balance Society, z.s. es una asociación checa sin ánimo de lucro registrada. Cada donativo — de cualquier importe — contribuye directamente a preservar y transmitir las tradiciones meditativas, culturales y espirituales a las que servimos.',
    bankHead: 'Transferencia bancaria',
    bankIntro: 'Puedes enviar un donativo directamente a la cuenta de la asociación:',
    labelAccount: 'Número de cuenta',
    labelIban: 'IBAN',
    labelSwift: 'BIC / SWIFT',
    copy: 'Copiar',
    copied: 'Copiado',
    noteHead: '¿Necesitas un comprobante?',
    noteP: 'Si deseas un comprobante escrito de tu donativo — por ejemplo, para tus propios registros — escríbenos. Con gusto te lo enviamos.',
    contactCta: 'Escríbenos',
    footer: 'Zero Balance Society, z.s. · Gracias por tu apoyo',
  },
  de: {
    label: 'Unterstütze uns',
    titleLine1: 'Unterstütze',
    titleLine2: 'unsere Mission',
    lead: 'Zero Balance Society, z.s. ist ein eingetragener tschechischer gemeinnütziger Verein. Jede Spende — gleich welcher Höhe — fließt direkt in die Bewahrung und Weitergabe der meditativen, kulturellen und spirituellen Traditionen, denen wir dienen.',
    bankHead: 'Banküberweisung',
    bankIntro: 'Sie können eine Spende direkt auf das Vereinskonto senden:',
    labelAccount: 'Kontonummer',
    labelIban: 'IBAN',
    labelSwift: 'BIC / SWIFT',
    copy: 'Kopieren',
    copied: 'Kopiert',
    noteHead: 'Benötigen Sie eine Bestätigung?',
    noteP: 'Falls Sie eine schriftliche Bestätigung Ihrer Spende wünschen — z. B. für Ihre eigenen Unterlagen — schreiben Sie uns einfach. Wir senden sie Ihnen gerne zu.',
    contactCta: 'Schreiben Sie uns',
    footer: 'Zero Balance Society, z.s. · Danke für deine Unterstützung',
  },
} as const

/** Řádek s hodnotou účtu + tlačítko "Kopírovat" (clipboard API, s krátkým vizuálním potvrzením). */
function CopyRow({ label, value, copyLabel, copiedLabel }: { label: string; value: string; copyLabel: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API nedostupné (starý prohlížeč, http, ...) — hodnota je
      // stejně vypsaná v textu, jde ji označit a zkopírovat ručně.
    }
  }

  return (
    <div className={styles.donateRow}>
      <span className={styles.donateRowLabel}>{label}</span>
      <div className={styles.donateRowValue}>
        <span>{value}</span>
        <button type="button" className={`${styles.donateCopyBtn} ${copied ? styles.donateCopyBtnCopied : ''}`} onClick={onCopy}>
          {copied ? copiedLabel : copyLabel}
        </button>
      </div>
    </div>
  )
}

export default function DonateContent() {
  const { lang } = useLang()
  const c = lang === 'hi' ? CONTENT.hi : lang === 'cs' ? CONTENT.cs
    : lang === 'fr' ? CONTENT.fr : lang === 'es' ? CONTENT.es : lang === 'de' ? CONTENT.de
    : CONTENT.en

  return (
    <>
      <Navbar translucent />
      <main className={styles.page}>

        <div className={styles.hero}>
          <div className={styles.heroBg} style={{ backgroundImage: 'url(/images/purpose-serve.jpg)', transform: 'none' }} />
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
            <h2 className={styles.sectionHead}>{c.bankHead}</h2>
            <p>{c.bankIntro}</p>

            <div className={styles.donateCard}>
              <CopyRow label={c.labelAccount} value={ACCOUNT.number} copyLabel={c.copy} copiedLabel={c.copied} />
              <CopyRow label={c.labelIban} value={ACCOUNT.iban} copyLabel={c.copy} copiedLabel={c.copied} />
              <CopyRow label={c.labelSwift} value={ACCOUNT.swift} copyLabel={c.copy} copiedLabel={c.copied} />
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionHead}>{c.noteHead}</h2>
            <p>{c.noteP}</p>
            <a href={DONATE_MAILTO} className={styles.subpageCtaLink}>{c.contactCta}</a>
          </section>

        </article>

      </main>
      <Footer />
    </>
  )
}
