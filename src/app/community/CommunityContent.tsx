'use client'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import BackLink from '../../components/BackLink'
import { useLang } from '../../contexts/LangContext'
import styles from '../../components/subpage.module.css'
import IMG from '../../lib/images'

const CONTENT = {
  en: {
    label:     'Create',
    titleLine1:'Space for Practice,',
    titleLine2:'Learning & Community',
    lead: 'A Sanctuary for Growth, Connection and Transformation. True wisdom flourishes when individuals have the opportunity to learn, practice, and grow together in a supportive environment.',
    s1head: 'Our Commitment',
    s1p1: 'At Zero Balance Society, we are dedicated to creating spaces where spiritual exploration, personal development, and meaningful human connection can thrive.',
    s1p2: 'We believe that authentic transformation occurs not only through knowledge but through consistent practice and shared experience. By bringing together seekers, practitioners, teachers, and volunteers, we foster a vibrant community rooted in learning, service, and inner growth.',
    s2head: 'A Space for Practice',
    s2p1: 'Spiritual and meditative traditions come alive through regular practice. We provide opportunities for individuals to engage in authentic disciplines that cultivate self-awareness, inner peace, and higher consciousness.',
    initiatives1: [
      'Meditation and mindfulness sessions',
      'Yoga and breathwork practices',
      'Kriya and contemplative disciplines',
      'Spiritual retreats and immersive experiences',
      'Sacred rituals and devotional gatherings',
      'Personal growth and self-development programs',
    ],
    s3head: 'A Space for Learning',
    s3p1: 'Learning is the foundation of growth. Through structured teachings, workshops, discussions, and experiential programs, we create opportunities for individuals to explore spiritual, cultural, and philosophical traditions in a meaningful and practical way.',
    initiatives2: [
      'Ancient wisdom traditions',
      'Meditation and consciousness studies',
      'Sacred texts and spiritual philosophy',
      'Cultural heritage and traditional knowledge',
      'Ethical living and self-mastery',
      'Personal and leadership development',
    ],
    s4head: 'A Space for Community',
    s4p1: 'Human beings flourish in connection. A supportive community provides encouragement, inspiration, and a sense of belonging on the journey of self-discovery.',
    initiatives3: [
      'Respect and inclusivity',
      'Compassion and service',
      'Mutual learning and support',
      'Cultural appreciation',
      'Spiritual growth and responsibility',
    ],
    quote: 'Practice with Purpose. Learn with Curiosity. Grow in Community.',
    s5head: 'Building a Culture of Conscious Living',
    s5p1: 'Creating space for practice, learning, and community is ultimately about cultivating a culture where wisdom is lived rather than merely studied. It is a place where individuals can explore their potential, develop meaningful relationships, and contribute positively to society.',
    s5p2: 'Whether you are beginning your journey or seeking to deepen an established practice, our community welcomes all who aspire to grow with sincerity, purpose, and dedication.',
    footer: 'Zero Balance Society · Practice · Learning · Community',
  },
  cs: {
    label:     'Vytváříme',
    titleLine1:'Prostor pro praxi,',
    titleLine2:'učení a komunitu',
    lead: 'Útočiště pro růst, spojení a transformaci. Pravá moudrost kvete, když mají lidé příležitost společně se učit, praktikovat a růst v podpůrném prostředí.',
    s1head: 'Náš závazek',
    s1p1: 'Zero Balance Society se věnuje vytváření prostorů, kde může prospívat duchovní zkoumání, osobní rozvoj a smysluplné lidské propojení.',
    s1p2: 'Věříme, že autentická transformace nastává nejen prostřednictvím poznání, ale prostřednictvím důsledné praxe a sdílené zkušenosti. Tím, že sdružujeme hledače, praktikanty, učitele a dobrovolníky, pěstujeme živou komunitu zakořeněnou v učení, službě a vnitřním rozvoji.',
    s2head: 'Prostor pro praxi',
    s2p1: 'Duchovní a meditační tradice ožívají pravidelnou praxí. Poskytujeme příležitosti pro jednotlivce zapojit se do autentických disciplín, které rozvíjejí sebevědomí, vnitřní mír a vyšší vědomí.',
    initiatives1: [
      'Meditační a všímavostní sezení',
      'Jóga a práce s dechem',
      'Krija a kontemplativní disciplíny',
      'Duchovní retreaty a pohlcující zkušenosti',
      'Posvátné rituály a oddanostní setkání',
      'Programy osobního rozvoje',
    ],
    s3head: 'Prostor pro učení',
    s3p1: 'Učení je základem růstu. Prostřednictvím strukturovaných výuky, workshopů, diskusí a zkušenostních programů vytváříme příležitosti pro jednotlivce zkoumat duchovní, kulturní a filosofické tradice smysluplným a praktickým způsobem.',
    initiatives2: [
      'Pradávné moudrosti',
      'Meditace a studia vědomí',
      'Posvátné texty a duchovní filosofie',
      'Kulturní dědictví a tradiční poznání',
      'Etický život a sebepanství',
      'Osobní rozvoj a vedení',
    ],
    s4head: 'Prostor pro komunitu',
    s4p1: 'Lidé kvetou v propojení. Podpůrná komunita poskytuje povzbuzení, inspiraci a pocit sounáležitosti na cestě sebeobjevování.',
    initiatives3: [
      'Úcta a inkluzivita',
      'Soucit a služba',
      'Vzájemné učení a podpora',
      'Kulturní ocenění',
      'Duchovní růst a odpovědnost',
    ],
    quote: 'Praktikujte s účelem. Učte se se zvědavostí. Rosťte v komunitě.',
    s5head: 'Budování kultury vědomého života',
    s5p1: 'Vytváření prostoru pro praxi, učení a komunitu je v konečném důsledku o pěstování kultury, kde je moudrost prožívána spíše než pouze studována. Je to místo, kde jednotlivci mohou zkoumat svůj potenciál, rozvíjet smysluplné vztahy a pozitivně přispívat společnosti.',
    s5p2: 'Ať jste na začátku své cesty nebo hledáte prohloubení zavedené praxe, naše komunita vítá všechny, kdo touží růst s upřímností, účelem a odhodláním.',
    footer: 'Zero Balance Society · Praxe · Učení · Komunita',
  },
} as const

export default function CommunityContent() {
  const { lang } = useLang()
  const c = lang === 'cs' ? CONTENT.cs : CONTENT.en

  return (
    <>
      <Navbar />
      <main className={styles.page}>

        <div className={styles.hero}>
          <div className={styles.heroBg} style={{ backgroundImage: `url(${IMG.purposeCreate})` }} />
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
            <h2 className={styles.sectionHead}>{c.s1head}</h2>
            <p>{c.s1p1}</p>
            <p>{c.s1p2}</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionHead}>{c.s2head}</h2>
            <p>{c.s2p1}</p>
            <ul className={styles.initList}>
              {c.initiatives1.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionHead}>{c.s3head}</h2>
            <p>{c.s3p1}</p>
            <ul className={styles.initList}>
              {c.initiatives2.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionHead}>{c.s4head}</h2>
            <p>{c.s4p1}</p>
            <ul className={styles.initList}>
              {c.initiatives3.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <blockquote className={styles.pullquote}>{c.quote}</blockquote>

          <section className={styles.section}>
            <h2 className={styles.sectionHead}>{c.s5head}</h2>
            <p>{c.s5p1}</p>
            <p>{c.s5p2}</p>
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
