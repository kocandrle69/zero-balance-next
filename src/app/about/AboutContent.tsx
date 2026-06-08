'use client'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import BackLink from '../../components/BackLink'
import { useLang } from '../../contexts/LangContext'
import styles from '../../components/subpage.module.css'
import IMG from '../../lib/images'

const CONTENT = {
  en: {
    label:     'About Us',
    titleLine1:'A Society.',
    titleLine2:'A Movement. A Way of Being.',
    lead: 'Zero Balance Society is a non-profit cultural and spiritual association dedicated to preserving, promoting, and sharing the timeless wisdom of India\'s spiritual heritage.',
    s1head: 'Who We Are',
    s1p1: 'The organisation is deeply rooted in the sacred lineage and teachings of Poorna Guru Shri Karauli Shankar Mahadeva Ji, who holds the distinguished rank of Mahāmaṇḍalēśvar of Shri Panchayati Akhada Naya Udasin Nirvan.',
    s1p2: 'The foundation of Zero Balance Society traces its origins to 2008, when a group of sincere spiritual seekers from the Czech Republic began their journey into Himalayan Kriya Yoga under the guidance of Sensei Rajeev Sinha. Recognizing their dedication and spiritual aspiration, Sensei Rajeev later facilitated their initiation by the Complete Master, Poorna Guru Shri Karauli Shankar Mahadeva Ji, thereby connecting them directly to an authentic and living spiritual tradition.',
    s1p3: 'Since its inception, Zero Balance Society has served as a bridge between Eastern spiritual wisdom and sincere seekers from around the world. Through the teachings of Tantra Kriya Yoga, meditation, self-discipline, spiritual practice, and cultural exchange, the Society seeks to inspire inner transformation, self-realization, and a balanced way of life.',
    s1p4: 'Our mission is to create a platform where ancient spiritual knowledge can be studied, practiced, and experienced in its authentic form, fostering harmony, personal growth, and universal well-being across cultures and communities.',
    quote: 'Rooted in authentic Indian traditions. Dedicated to Contemplation, Learning and Community.',
    s2head: 'Our Mission',
    s2v1: 'Studying, practising, and experiencing ancient spiritual knowledge in its authentic form',
    s2v2: 'Fostering harmony, personal growth, and universal well-being',
    s2v3: 'Inspiring inner transformation and self-realization',
    s2v4: 'Building bridges across cultures and communities worldwide',
    s3head: 'Three Pillars',
    sub1: 'Contemplation',
    p1: 'Cultivating inner silence, awareness, and the direct experience of stillness through traditional meditative and contemplative disciplines.',
    sub2: 'Dialogue',
    p2: 'Creating space for honest, open exchange between traditions, cultures, and seekers — where wisdom is shared freely and curiosity is welcomed.',
    sub3: 'Community',
    p3: 'Building a living, supportive network of practitioners, students, and friends united by shared values and the sincere aspiration to grow.',
    s4head: 'Contact',
    s4p1: 'We welcome all sincere seekers. For questions, membership, or to learn more about our activities and upcoming events, please write to us.',
    footer: 'Zero Balance Society, z.s. · Based in Czech Republic',
  },
  cs: {
    label:     'O nás',
    titleLine1:'Společnost.',
    titleLine2:'Hnutí. Způsob bytí.',
    lead: 'Zero Balance Society je nezisková kulturní a duchovní asociace zasvěcená uchovávání, podpoře a sdílení nadčasové moudrosti indického duchovního dědictví.',
    s1head: 'Kdo jsme',
    s1p1: 'Organizace je hluboce zakořeněna v posvátné linii a učení Poorna Guru Shri Karauli Shankar Mahadeva Ji, který zastává vynikající hodnost Mahāmaṇḍalēśvar Shri Panchayati Akhada Naya Udasin Nirvan.',
    s1p2: 'Základy Zero Balance Society sahají do roku 2008, kdy skupina upřímných duchovních hledačů z České republiky zahájila svou cestu himalájskou krija jógou pod vedením Senseie Rajeeva Sinhy. Ten, rozpoznávaje jejich oddanost a duchovní aspiraci, zprostředkoval jejich zasvěcení Dokonalým Mistrem, Poorna Guru Shri Karauli Shankar Mahadeva Ji, a tím je přímo propojil s autentickou a živou duchovní tradicí.',
    s1p3: 'Od svého vzniku slouží Zero Balance Society jako most mezi východní duchovní moudrostí a upřímnými hledači z celého světa. Prostřednictvím učení Tantra Krija Jógy, meditace, sebedisciplíny, duchovní praxe a kulturní výměny spolek usiluje o inspiraci vnitřní transformace, sebepoznání a vyváženého způsobu života.',
    s1p4: 'Naším posláním je vytvořit platformu, kde může být pradávná duchovní moudrost studována, praktikována a prožívána v její autentické podobě — s cílem rozvíjet harmonii, osobní růst a všeobecný blahobyt napříč kulturami a komunitami.',
    quote: 'Zakořeneni v autentických indických tradicích. Oddáni kontemplaci, učení a komunitě.',
    s2head: 'Naše poslání',
    s2v1: 'Studium, praxe a autentická zkušenost s pradávnou duchovní moudrostí',
    s2v2: 'Rozvoj harmonie, osobního růstu a všeobecného blahobytu',
    s2v3: 'Inspirace vnitřní transformace a sebepoznání',
    s2v4: 'Budování mostů napříč kulturami a komunitami celého světa',
    s3head: 'Tři pilíře',
    sub1: 'Kontemplace',
    p1: 'Kultivace vnitřního ticha, vědomí a přímé zkušenosti klidu prostřednictvím tradičních meditačních a kontemplativních disciplín.',
    sub2: 'Dialog',
    p2: 'Vytváření prostoru pro upřímnou, otevřenou výměnu mezi tradicemi, kulturami a hledači — kde je moudrost sdílena volně a zvědavost je vítána.',
    sub3: 'Komunita',
    p3: 'Budování živé, podpůrné sítě praktikantů, studentů a přátel spojených sdílenými hodnotami a upřímnou aspirací růstu.',
    s4head: 'Kontakt',
    s4p1: 'Vítáme všechny upřímné hledače. Pro dotazy, členství nebo více informací o naších aktivitách a nadcházejících akcích nám prosím napište.',
    footer: 'Zero Balance Society, z.s. · Sídlíme v České republice',
  },
} as const

export default function AboutContent() {
  const { lang } = useLang()
  const c = lang === 'cs' ? CONTENT.cs : CONTENT.en

  return (
    <>
      <Navbar translucent />
      <main className={styles.page}>

        <div className={styles.hero}>
          <div className={styles.heroBg} style={{ backgroundImage: `url(${IMG.purposeAbout})`, backgroundPosition: 'center 7%' }} />
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
            <p>{c.s1p3}</p>
            <p>{c.s1p4}</p>
          </section>

          <blockquote className={styles.pullquote}>{c.quote}</blockquote>

          <section className={styles.section}>
            <h2 className={styles.sectionHead}>{c.s2head}</h2>
            <ul className={styles.initList}>
              {[c.s2v1, c.s2v2, c.s2v3, c.s2v4].map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionHead}>{c.s3head}</h2>
            <h3 className={styles.subHead}>{c.sub1}</h3>
            <p>{c.p1}</p>
            <h3 className={styles.subHead}>{c.sub2}</h3>
            <p>{c.p2}</p>
            <h3 className={styles.subHead}>{c.sub3}</h3>
            <p>{c.p3}</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionHead}>{c.s4head}</h2>
            <p>{c.s4p1}</p>
            <p>
              <a href="mailto:info@zero-balance.org" style={{ color: 'var(--gold)', fontWeight: 400 }}>
                info@zero-balance.org
              </a>
            </p>
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
