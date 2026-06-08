'use client'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { useLang } from '../../contexts/LangContext'
import styles from '../../components/subpage.module.css'
import IMG from '../../lib/images'

const CONTENT = {
  en: {
    label:     'Our Purpose',
    titleLine1:'Preserving',
    titleLine2:'Living Wisdom',
    lead: 'Keeping Ancient Knowledge Alive for Future Generations. In a rapidly changing world, timeless wisdom traditions offer guidance, balance, and deeper meaning.',
    s1head: 'Our Mission',
    s1p1: 'At Zero Balance Society, we are dedicated to preserving, promoting, and transmitting the living spiritual, cultural, and meditative heritage that has enriched humanity for centuries.',
    s1p2: 'Our mission is not merely to protect historical knowledge, but to ensure that these sacred traditions remain vibrant, relevant, and accessible to contemporary seekers. Through education, practice, research, and community engagement, we work to bridge ancient wisdom with modern life.',
    quote: 'We envision a world where spiritual wisdom is not confined to books or institutions but lived through daily practice, ethical conduct, self-awareness, and conscious living.',
    s2head: 'What We Preserve',
    sub1: 'Spiritual Traditions',
    p1: 'We support the preservation and transmission of authentic spiritual lineages, teachings, and practices that cultivate self-realization, compassion, and higher consciousness.',
    sub2: 'Meditative Sciences',
    p2: 'Meditation is one of humanity\'s greatest tools for inner growth. We promote traditional systems of meditation, breathwork, mindfulness, and contemplative disciplines that foster mental clarity, emotional balance, and spiritual awakening.',
    sub3: 'Cultural Heritage',
    p3: 'Sacred arts, rituals, festivals, philosophies, and traditional knowledge systems form an integral part of humanity\'s cultural heritage. We encourage their study, practice, and appreciation across generations and cultures.',
    sub4: 'Guru-Shishya Parampara',
    p4: 'The ancient tradition of wisdom being transmitted directly from teacher to student remains central to preserving authentic knowledge. We support this living tradition through education, mentorship, and experiential learning.',
    s3head: 'Our Initiatives',
    initiatives: [
      'Educational workshops and seminars',
      'Meditation and spiritual retreats',
      'Cultural and heritage preservation programs',
      'Research and documentation of traditional wisdom',
      'Translation and publication of sacred teachings',
      'Community outreach and awareness programs',
      'International cultural exchange and collaboration',
    ],
    s4head: 'Why It Matters',
    s4p1: 'Modern society has achieved remarkable technological progress, yet many people continue to seek inner peace, purpose, and connection. Ancient wisdom traditions offer practical tools for navigating life\'s challenges while fostering personal growth and collective well-being.',
    s4p2: 'By preserving these traditions today, we ensure that future generations inherit not only knowledge but also the wisdom to live meaningful, balanced, and conscious lives.',
    footer: 'Zero Balance Society · Preserving Living Wisdom',
  },
  cs: {
    label:     'Naše poslání',
    titleLine1:'Uchováváme',
    titleLine2:'Živou Moudrost',
    lead: 'Udržujeme pradávné poznání živým pro budoucí generace. Ve světě rychlých změn nabízejí nadčasové moudrosti vedení, rovnováhu a hlubší smysl.',
    s1head: 'Naše poslání',
    s1p1: 'Zero Balance Society se věnuje uchovávání, podpoře a předávání živého duchovního, kulturního a meditačního dědictví, které obohacuje lidstvo po celá staletí.',
    s1p2: 'Naším posláním není pouze chránit historické poznání, ale zajistit, aby tyto posvátné tradice zůstaly živé, relevantní a přístupné současným hledačům. Prostřednictvím vzdělávání, praxe, výzkumu a zapojení komunity překlenujeme pradávnou moudrost s moderním životem.',
    quote: 'Představujeme si svět, ve kterém duchovní moudrost není uzavřena v knihách nebo institucích, ale žije v každodenní praxi, etickém jednání, sebevědomí a vědomém životě.',
    s2head: 'Co uchováváme',
    sub1: 'Duchovní tradice',
    p1: 'Podporujeme zachování a předávání autentických duchovních linií, učení a praxí, které pěstují sebepoznání, soucit a vyšší vědomí.',
    sub2: 'Meditační vědy',
    p2: 'Meditace je jedním z největších nástrojů lidstva pro vnitřní rozvoj. Propagujeme tradiční systémy meditace, dechové práce, všímavosti a kontemplativních disciplín, které rozvíjejí mentální jasnost, emoční rovnováhu a duchovní probuzení.',
    sub3: 'Kulturní dědictví',
    p3: 'Posvátná umění, rituály, svátky, filosofie a tradiční systémy poznání tvoří nedílnou součást kulturního dědictví lidstva. Podporujeme jejich studium, praxi a ocenění napříč generacemi a kulturami.',
    sub4: 'Guru-Šišja Parampara',
    p4: 'Pradávná tradice přímého předávání moudrosti od učitele k žákovi zůstává ústřední pro zachování autentického poznání. Tuto živou tradici podporujeme prostřednictvím vzdělávání, mentorství a zkušenostního učení.',
    s3head: 'Naše iniciativy',
    initiatives: [
      'Vzdělávací workshopy a semináře',
      'Meditační a duchovní retreaty',
      'Programy kulturní a historické ochrany',
      'Výzkum a dokumentace tradiční moudrosti',
      'Překlad a vydávání posvátných učení',
      'Komunitní osvěta a informační programy',
      'Mezinárodní kulturní výměna a spolupráce',
    ],
    s4head: 'Proč na tom záleží',
    s4p1: 'Moderní společnost dosáhla pozoruhodného technologického pokroku, přesto mnoho lidí nadále hledá vnitřní mír, smysl a propojení. Pradávné moudrosti nabízejí praktické nástroje pro zvládání životních výzev a rozvoj osobního a kolektivního blaha.',
    s4p2: 'Tím, že tyto tradice dnes uchováváme, zajišťujeme, aby budoucí generace zdědily nejen poznání, ale také moudrost pro smysluplný, vyvážený a vědomý život.',
    footer: 'Zero Balance Society · Živá moudrost',
  },
} as const

export default function PreserveContent() {
  const { lang } = useLang()
  const c = lang === 'cs' ? CONTENT.cs : CONTENT.en

  return (
    <>
      <Navbar />
      <main className={styles.page}>

        <div className={styles.hero}>
          <div className={styles.heroBg} style={{ backgroundImage: `url(${IMG.purposePreserve})` }} />
          <div className={styles.heroOverlay} />
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
            <h2 className={styles.sectionHead}>{c.s1head}</h2>
            <p>{c.s1p1}</p>
            <p>{c.s1p2}</p>
          </section>

          <blockquote className={styles.pullquote}>{c.quote}</blockquote>

          <section className={styles.section}>
            <h2 className={styles.sectionHead}>{c.s2head}</h2>
            <h3 className={styles.subHead}>{c.sub1}</h3>
            <p>{c.p1}</p>
            <h3 className={styles.subHead}>{c.sub2}</h3>
            <p>{c.p2}</p>
            <h3 className={styles.subHead}>{c.sub3}</h3>
            <p>{c.p3}</p>
            <h3 className={styles.subHead}>{c.sub4}</h3>
            <p>{c.p4}</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionHead}>{c.s3head}</h2>
            <ul className={styles.initList}>
              {c.initiatives.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionHead}>{c.s4head}</h2>
            <p>{c.s4p1}</p>
            <p>{c.s4p2}</p>
          </section>

        </article>

        <div className={styles.articleFooter}>
          <div className={styles.articleFooterRule} />
          <span className={styles.articleFooterLabel}>{c.footer}</span>
        </div>

      </main>
      <Footer />
    </>
  )
}
