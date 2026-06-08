'use client'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import BackLink from '../../components/BackLink'
import { useLang } from '../../contexts/LangContext'
import styles from '../../components/subpage.module.css'
import IMG from '../../lib/images'

const CONTENT = {
  en: {
    label:     'Authentic Lineage',
    titleLine1:'Shri Radharaman',
    titleLine2:'Ji Mishra',
    lead: 'A Living Tradition of Spiritual Wisdom. The spiritual heritage of Shri Radharaman Ji Mishra represents an unbroken lineage of sacred knowledge, devotion, and direct spiritual experience.',
    s1head: 'The Lineage',
    s1p1: 'Rooted in the timeless traditions of Tantra Kriya Yoga, this lineage has preserved and transmitted profound teachings through the Guru-Shishya Parampara — the sacred relationship between teacher and disciple.',
    s1p2: 'More than a historical tradition, this is a living spiritual path that continues to guide sincere seekers toward self-realization, inner transformation, and divine awareness.',
    s2head: 'The Legacy of Shri Radharaman Ji Mishra (1883–1994)',
    s2p1: 'A direct Disciple of The Mother Kamakhya, Shri Radharaman Ji Mishra was revered for his deep spiritual realization, unwavering devotion, and commitment to preserving authentic yogic, tantra and spiritual teachings.',
    s2p2: 'Born in 1883, Babaji entered into Mahasamadhi alive at the age of 111 in the year 1994 and dematerialised his physical body in the Existence.',
    s2p3: 'His teachings emphasized that true spirituality is not merely a matter of belief, but a direct experience attained through sincere practice, purity of conduct, meditation, and the grace of the Complete Guru. He passed his position to his disciple Sri Karauli Shankar Mahadev.',
    quote: 'True spirituality is not merely a matter of belief, but a direct experience attained through sincere practice, purity of conduct, meditation, and the grace of the Complete Guru.',
    s3head: 'The Sacred Guru-Shishya Tradition',
    s3p1: 'The lineage of Shri Radharaman Ji Mishra follows the ancient principle that spiritual wisdom is best transmitted through direct guidance from a realized master to a committed disciple. This living tradition ensures that teachings retain their authenticity, purity, and transformative power across generations.',
    s3p2: 'The Guru serves not only as a teacher but as a guide who helps the seeker navigate the inner journey toward higher consciousness and spiritual awakening.',
    s4head: 'Core Principles of the Lineage',
    sub1: 'Authentic Spiritual Practice',
    p1: 'The lineage emphasizes experiential spirituality through meditation, mantra, contemplation, and disciplined living.',
    sub2: 'Self-Realization',
    p2: 'The ultimate goal is the direct realization of one\'s true nature beyond the limitations of ego, mind, and worldly identification.',
    sub3: 'Devotion and Surrender',
    p3: 'The path integrates devotion, humility, and surrender to the Divine as essential elements of spiritual growth.',
    sub4: 'Preservation of Sacred Knowledge',
    p4: 'The lineage remains committed to protecting and transmitting traditional wisdom in its authentic form while making it accessible to contemporary seekers.',
    s5head: 'Continuing the Tradition',
    s5p1: 'Today, the teachings and spiritual practices of this revered lineage continue to inspire aspirants across the world. Through meditation programs, spiritual retreats, study circles, and personal guidance, seekers are offered an opportunity to connect with a living stream of wisdom that has been carefully preserved through generations.',
    s5p2: 'The lineage stands as a bridge between ancient spiritual knowledge and modern life, helping individuals discover inner peace, clarity, purpose, and spiritual fulfillment.',
    footer: 'Zero Balance Society · Authentic Lineage',
  },
  cs: {
    label:     'Autentická linie',
    titleLine1:'Shri Radharaman',
    titleLine2:'Ji Mishra',
    lead: 'Živá tradice duchovní moudrosti. Duchovní dědictví Shri Radharaman Ji Mishra představuje nepřerušenou linii posvátného poznání, oddanosti a přímé duchovní zkušenosti.',
    s1head: 'Linie',
    s1p1: 'Zakořeněna v nadčasových tradicích Tantra Krija Jógy, tato linie uchovala a předávala hluboká učení prostřednictvím Guru-Šišja Parampary — posvátného vztahu mezi učitelem a žákem.',
    s1p2: 'Více než historická tradice — jde o živou duchovní cestu, která nadále vede upřímné hledače k sebepoznání, vnitřní transformaci a božskému uvědomění.',
    s2head: 'Odkaz Shri Radharaman Ji Mishra (1883–1994)',
    s2p1: 'Jako přímý žák Matky Kamakhya byl Shri Radharaman Ji Mishra ctěn pro své hluboké duchovní poznání, neochvějnou oddanost a odhodlání zachovávat autentická jógická, tantrická a duchovní učení.',
    s2p2: 'Narozený v roce 1883 vstoupil Babaji ve věku 111 let do Mahasamádhi v roce 1994 a rozložil své fyzické tělo v Existenci.',
    s2p3: 'Jeho učení zdůrazňovala, že pravá duchovnost není pouhou věcí víry, ale přímou zkušeností dosaženou upřímnou praxí, čistotou jednání, meditací a milostí Dokonalého Gurua. Svou pozici předal svému žákovi Shri Karauli Shankar Mahadevovi.',
    quote: 'Pravá duchovnost není pouhou věcí víry, ale přímou zkušeností dosaženou upřímnou praxí, čistotou jednání, meditací a milostí Dokonalého Gurua.',
    s3head: 'Posvátná tradice Guru-Šišja',
    s3p1: 'Linie Shri Radharaman Ji Mishra se řídí pradávnou zásadou, že duchovní moudrost je nejlépe předávána přímým vedením od realizovaného mistra oddanému žákovi. Tato živá tradice zajišťuje, že učení si zachovávají svou autentičnost, čistotu a transformační sílu napříč generacemi.',
    s3p2: 'Guru slouží nejen jako učitel, ale jako průvodce, který pomáhá hledači na vnitřní cestě k vyššímu vědomí a duchovnímu probuzení.',
    s4head: 'Základní principy linie',
    sub1: 'Autentická duchovní praxe',
    p1: 'Linie klade důraz na zkušenostní duchovnost prostřednictvím meditace, mantry, kontemplace a disciplinovaného života.',
    sub2: 'Sebepoznání',
    p2: 'Nejvyšším cílem je přímé poznání vlastní pravé přirozenosti přesahující omezení ega, mysli a světské identifikace.',
    sub3: 'Oddanost a odevzdání',
    p3: 'Cesta integruje oddanost, pokoru a odevzdání se Božskému jako nezbytné prvky duchovního rozvoje.',
    sub4: 'Zachování posvátného poznání',
    p4: 'Linie zůstává odhodlána chránit a předávat tradiční moudrost v její autentické podobě a zároveň ji zpřístupňovat současným hledačům.',
    s5head: 'Pokračování tradice',
    s5p1: 'Dnes učení a duchovní praxe této ctěné linie nadále inspirují aspiranty po celém světě. Prostřednictvím meditačních programů, duchovních retreatů, studijních kroužků a osobního vedení mají hledači příležitost spojit se s živým proudem moudrosti, který byl pečlivě uchováván po generace.',
    s5p2: 'Linie stojí jako most mezi pradávným duchovním poznáním a moderním životem a pomáhá jednotlivcům nalézat vnitřní mír, jasnost, smysl a duchovní naplnění.',
    footer: 'Zero Balance Society · Autentická linie',
  },
} as const

export default function LineageContent() {
  const { lang } = useLang()
  const c = lang === 'cs' ? CONTENT.cs : CONTENT.en

  return (
    <>
      <Navbar translucent />
      <main className={styles.page}>

        <div className={styles.hero}>
          <div className={styles.heroBg} style={{ backgroundImage: `url(${IMG.purposeLineage})` }} />
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
            <p>{c.s2p2}</p>
            <p>{c.s2p3}</p>
          </section>

          <blockquote className={styles.pullquote}>{c.quote}</blockquote>

          <section className={styles.section}>
            <h2 className={styles.sectionHead}>{c.s3head}</h2>
            <p>{c.s3p1}</p>
            <p>{c.s3p2}</p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionHead}>{c.s4head}</h2>
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
