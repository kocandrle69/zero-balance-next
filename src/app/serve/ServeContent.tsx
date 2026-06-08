'use client'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import BackLink from '../../components/BackLink'
import { useLang } from '../../contexts/LangContext'
import styles from '../../components/subpage.module.css'
import IMG from '../../lib/images'

const CONTENT = {
  en: {
    label:     'Serve',
    titleLine1:'Dedicated to Service,',
    titleLine2:'Not Commercial Gain',
    lead: 'At Zero Balance Society, service is at the heart of everything we do. As a non-profit cultural and spiritual association, our purpose is not to generate profit but to create opportunities for learning, personal growth, cultural preservation, and community well-being.',
    s1head: 'Our Commitment',
    s1p1: 'We believe that wisdom, education, and spiritual development should be shared in a spirit of generosity and responsibility. Every initiative we undertake is guided by the principle of serving humanity and preserving valuable traditions for future generations.',
    s1p2: 'All resources, programs, and activities are designed to advance our charitable, educational, cultural, and spiritual objectives. Any funds received through donations, memberships, events, or contributions are reinvested into the organisation\'s mission and activities.',
    s2head: 'This Commitment Allows Us To',
    initiatives: [
      'Promote spiritual, cultural, and meditative traditions',
      'Organise educational workshops and community programs',
      'Support cultural preservation projects',
      'Facilitate retreats, seminars, and learning opportunities',
      'Develop resources that benefit seekers and communities',
      'Foster international collaboration and cultural exchange',
    ],
    quote: 'Serving with Purpose. Giving with Compassion. Creating Impact Beyond Profit.',
    s3head: 'Guided by the Spirit of Seva',
    s3p1: 'The Indian tradition of Seva — selfless service — teaches that meaningful contribution is made without expectation of personal reward. Inspired by this principle, our volunteers, teachers, practitioners, and supporters work together to create positive impact and support the growth of individuals and communities.',
    s3p2: 'Service becomes a path of personal transformation, encouraging compassion, responsibility, humility, and collective well-being.',
    s4head: 'Transparency and Accountability',
    s4p1: 'As a non-profit organisation, we are committed to maintaining transparency, ethical governance, and responsible stewardship of resources. Every contribution helps strengthen programs that preserve living wisdom, support educational initiatives, and build a thriving community dedicated to higher values.',
    s4p2: 'Our success is not measured by financial profit but by the positive difference we make in people\'s lives. We seek to empower individuals through knowledge, practice, cultural understanding, and spiritual growth while fostering a sense of unity and shared purpose.',
    footer: 'Zero Balance Society · Serving for No Profit',
  },
  cs: {
    label:     'Sloužíme',
    titleLine1:'Oddáni službě,',
    titleLine2:'ne komerčnímu zisku',
    lead: 'Zero Balance Society staví službu do středu všeho, co děláme. Jako nezisková kulturní a duchovní asociace je naším účelem ne generovat zisk, ale vytvářet příležitosti pro učení, osobní rozvoj, kulturní zachování a blaho komunity.',
    s1head: 'Náš závazek',
    s1p1: 'Věříme, že moudrost, vzdělání a duchovní rozvoj by měly být sdíleny v duchu velkorysosti a odpovědnosti. Každá iniciativa, které se ujímáme, je vedena principem sloužení lidstvu a zachování cenných tradic pro budoucí generace.',
    s1p2: 'Veškeré zdroje, programy a aktivity jsou navrženy tak, aby rozvíjely naše charitativní, vzdělávací, kulturní a duchovní cíle. Veškeré prostředky přijaté prostřednictvím darů, členství, akcí nebo příspěvků jsou znovu investovány do poslání a aktivit organizace.',
    s2head: 'Tento závazek nám umožňuje',
    initiatives: [
      'Propagovat duchovní, kulturní a meditační tradice',
      'Organizovat vzdělávací workshopy a komunitní programy',
      'Podporovat projekty kulturního zachování',
      'Zprostředkovávat retreaty, semináře a vzdělávací příležitosti',
      'Rozvíjet zdroje prospěšné hledačům a komunitám',
      'Podporovat mezinárodní spolupráci a kulturní výměnu',
    ],
    quote: 'Sloužíme s účelem. Dáváme se soucitem. Vytváříme dopad přesahující zisk.',
    s3head: 'Vedeni duchem Sevy',
    s3p1: 'Indická tradice Sevy — nezištné služby — učí, že smysluplný příspěvek je dáván bez očekávání osobní odměny. Inspirováni tímto principem naši dobrovolníci, učitelé, praktikanti a příznivci spolupracují na vytváření pozitivního dopadu a podpoře růstu jednotlivců a komunit.',
    s3p2: 'Služba se stává cestou osobní transformace, povzbuzující soucit, odpovědnost, pokoru a kolektivní blahobyt.',
    s4head: 'Transparentnost a odpovědnost',
    s4p1: 'Jako nezisková organizace jsme odhodláni udržovat transparentnost, etické řízení a odpovědné spravování zdrojů. Každý příspěvek pomáhá posilovat programy, které zachovávají živou moudrost, podporují vzdělávací iniciativy a budují prosperující komunitu oddanou vyšším hodnotám.',
    s4p2: 'Náš úspěch není měřen finančním ziskem, ale pozitivním rozdílem, který děláme v životech lidí. Snažíme se posilovat jednotlivce prostřednictvím poznání, praxe, kulturního porozumění a duchovního rozvoje, a přitom pěstovat pocit jednoty a sdíleného účelu.',
    footer: 'Zero Balance Society · Nezisková služba',
  },
} as const

export default function ServeContent() {
  const { lang } = useLang()
  const c = lang === 'cs' ? CONTENT.cs : CONTENT.en

  return (
    <>
      <Navbar />
      <main className={styles.page}>

        <div className={styles.hero}>
          <div className={styles.heroBg} style={{ backgroundImage: `url(${IMG.purposeServe})` }} />
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
            <ul className={styles.initList}>
              {c.initiatives.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </section>

          <blockquote className={styles.pullquote}>{c.quote}</blockquote>

          <section className={styles.section}>
            <h2 className={styles.sectionHead}>{c.s3head}</h2>
            <p>{c.s3p1}</p>
            <p>{c.s3p2}</p>
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
