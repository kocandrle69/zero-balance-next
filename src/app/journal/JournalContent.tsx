'use client'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import styles from './journal.module.css'
import { useLang } from '../../contexts/LangContext'

const CONTENT = {
  cs: {
    issueLabel:   'Vydání I · Jaro 2026',
    mastheadSub:  'Prostor pro slovo, reflexi a sdílení naší cesty.',
    kicker:       'Vznik spolku',
    articleTitle: <>Zero Ballance Society vzniklo.<br /><em>Zde je proč.</em></>,
    lead: `Dne 27. května 2026 byl v Zákupech podepsán zakladatelský dokument
      a Zero Ballance Society, z.s. vstoupilo v život jako zapsaný spolek
      podle českého občanského zákoníku. Tato chvíle nebyla spontánním
      rozhodnutím — byla vyvrcholením let duchovní praxe, kulturní výměny
      a sdílené cesty s tradicemi, které nás formovaly.`,

    s1Head: 'Účel a duchovní zaměření',
    s1p1: <>Spolek byl založen za účelem podpory, rozvoje, uchovávání a šíření
      duchovních, kulturních, meditačních a vzdělávacích tradic vycházejících
      z indické védské, jógové a tantrické tradice. Středem našeho zaměření
      je duchovní linie <strong>Shri Karauli Shankar Mahadeva Ji</strong>,
      známého jako Karauli Sarkar nebo Gurudev — a s ní spojené tradice,
      praxe a kulturní dědictví Indie.</>,
    s1p2: `Zero Ballance Society není náboženskou organizací. Jsme kulturním
      a vzdělávacím spolkem, který vytváří prostor pro duchovní praxi,
      mezikulturní setkávání a osobní rozvoj — otevřený všem bez rozdílu
      původu, přesvědčení nebo zkušenosti.`,

    pullquote: <>&bdquo;Spolek vytváří prostor pro duchovní praxi, osobní rozvoj,
      vzdělávání, kulturní a mezikulturní výměnu a mezinárodní spolupráci.&ldquo;</>,
    pullquoteCite: '— Stanovy spolku, Článek II',

    s2Head: 'Co spolek dělá',
    s2p1: 'Hlavní činnost spolku je nezisková a nepodnikatelská. V rámci své činnosti spolek zejména:',
    activities: [
      'Pořádá setkání, přednášky, semináře, meditační a kulturní akce',
      'Organizuje skupinové cesty do Indie a kulturní ponoření do živých tradicí',
      'Podporuje návštěvy duchovních učitelů a kulturních hostů v České republice',
      'Překládá, připravuje a šíří materiály související s účelem spolku',
      'Spolupracuje s komunitami, organizacemi a jednotlivci v ČR i v zahraničí',
      'Podporuje poznávání indické kultury, filosofie, jazyků, hudby a duchovního dědictví',
    ],

    s3Head: 'Zakladatelé a struktura spolku',
    s3p1: `Spolek byl založen třemi zakladateli na ustavující schůzi dne
      27. května 2026 v Zákupech. Orgány spolku tvoří členská schůze,
      předseda. Statutárním zástupcem spolku je předseda.
      jednat jménem spolku samostatně.`,

    members: [
      { initial: 'J', role: 'Předseda spolku',        name: 'Jan Kočandrle',         bio: 'Zakladatel a předseda spolku. Přispívá k rozvoji jeho aktivit a kulturní mise.' },
      { initial: 'J', role: 'Člen',                   name: 'PhDr. Jiří Kočandrle',  bio: 'Zakladatel a člen Zero Ballance Society.' },
      { initial: 'F', role: 'Člen',                   name: 'František Filouš',       bio: 'Zakladatel spolku a člen Zero Ballance Society.' },
      { initial: 'P', role: 'Připravuje se · Člen',   name: 'Pavel Znamenáček',       bio: '' },
      { initial: 'P', role: 'Připravuje se · Členka', name: 'Pavlína Muchová',        bio: '' },
    ],

    s4Head: 'Sídlo a registrace',
    s4p1: <>Spolek je registrován v České republice jako zapsaný spolek (z.s.)
      podle zákona č. 89/2012 Sb., občanského zákoníku.
      Sídlo spolku: <strong>Krakovany 352, 281 27 Krakovany, Česká republika.</strong></>,
    s4p2: 'Spolek byl založen na dobu neurčitou a může působit v České republice i v zahraničí.',

    footerLabel: 'Zero Ballance Society, z.s. · Vydání I · 2026',
  },

  en: {
    issueLabel:   'Issue I · Spring 2026',
    mastheadSub:  'A space for words, reflection and sharing our journey.',
    kicker:       'Founding of the Association',
    articleTitle: <>Zero Ballance Society was founded.<br /><em>Here is why.</em></>,
    lead: `On 27 May 2026, the founding document was signed in Zákupy and
      Zero Ballance Society, z.s. came into existence as a registered
      non-profit association under Czech civil law. This moment was not
      a spontaneous decision — it was the culmination of years of spiritual
      practice, cultural exchange and a shared path with traditions that
      have shaped us.`,

    s1Head: 'Purpose and Spiritual Orientation',
    s1p1: <>The association was founded to support, develop, preserve and disseminate
      spiritual, cultural, meditation and educational traditions rooted in the Indian
      Vedic, yogic and tantric traditions. At the centre of our focus is the spiritual
      lineage of <strong>Shri Karauli Shankar Mahadev Ji</strong>, known as
      Karauli Sarkar or Gurudev — and the traditions, practices and cultural heritage
      of India connected with his teaching.</>,
    s1p2: `Zero Ballance Society is not a religious organisation. We are a cultural
      and educational association that creates space for spiritual practice,
      intercultural encounter and personal development — open to all regardless
      of background, belief or experience.`,

    pullquote: <>&ldquo;The association creates space for spiritual practice, personal
      development, education, cultural and intercultural exchange and international
      cooperation.&rdquo;</>,
    pullquoteCite: '— Articles of Association, Article II',

    s2Head: 'What the Association Does',
    s2p1: 'The main activities of the association are non-profit and non-commercial. The association in particular:',
    activities: [
      'Organises gatherings, lectures, seminars, meditation and cultural events',
      'Organises group journeys to India and cultural immersions into living traditions',
      'Supports visits of spiritual teachers and cultural guests in the Czech Republic',
      'Translates, prepares and disseminates materials related to the purpose of the association',
      'Cooperates with communities, organisations and individuals in the Czech Republic and abroad',
      'Supports exploration of Indian culture, philosophy, languages, music and spiritual heritage',
    ],

    s3Head: 'Founders and Structure',
    s3p1: `The association was founded by three founders at the constitutive meeting
      on 27 May 2026 in Zákupy. The governing bodies consist of the general assembly,
      the chairman. The statutory representative of the association is the chairman.
      to act on behalf of the association independently.`,

    members: [
      { initial: 'J', role: 'Chairman',               name: 'Jan Kočandrle',         bio: 'Founder and chairman of the association. Contributing to the development of its activities and cultural mission.' },
      { initial: 'J', role: 'Member',                  name: 'PhDr. Jiří Kočandrle',  bio: 'Founder and member of Zero Ballance Society.' },
      { initial: 'F', role: 'Member',                  name: 'František Filouš',       bio: 'Founder and member of Zero Ballance Society.' },
      { initial: 'P', role: 'Joining Soon · Member',   name: 'Pavel Znamenáček',       bio: '' },
      { initial: 'P', role: 'Joining Soon · Member',   name: 'Pavlína Muchová',        bio: '' },
    ],

    s4Head: 'Registered Office',
    s4p1: <>The association is registered in the Czech Republic as a registered
      non-profit association (z.s.) under Act No. 89/2012 Coll., the Civil Code.
      Registered office: <strong>Krakovany 352, 281 27 Krakovany, Czech Republic.</strong></>,
    s4p2: 'The association is established for an indefinite period and may operate in the Czech Republic and abroad.',

    footerLabel: 'Zero Ballance Society, z.s. · Issue I · 2026',
  },
} as const

export default function JournalContent() {
  const { lang } = useLang()
  const c = lang === 'cs' ? CONTENT.cs : CONTENT.en

  return (
    <>
      <Navbar />
      <main className={styles.page}>

        {/* ── Masthead ──────────────────────────────────────────── */}
        <header className={styles.masthead}>
          <div className={styles.mastheadInner}>
            <div className={styles.mastheadMeta}>
              <span className={styles.issueLabel}>{c.issueLabel}</span>
              <span className={styles.issueDivider}>·</span>
              <span className={styles.issueLabel}>Zero Ballance Society, z.s.</span>
            </div>
            <h1 className={styles.mastheadTitle}>
              {lang === 'cs' ? 'Časopis' : 'Journal'}
            </h1>
            <p className={styles.mastheadSub}>{c.mastheadSub}</p>
            <div className={styles.mastheadRule} />
          </div>
        </header>

        {/* ── Article ───────────────────────────────────────────── */}
        <article className={styles.article}>

          <div className={styles.articleKicker}>
            <span className={styles.kicker}>{c.kicker}</span>
            <time className={styles.articleDate} dateTime="2026-05-27">
              {lang === 'cs' ? '27. května 2026' : '27 May 2026'}
            </time>
          </div>

          <h2 className={styles.articleTitle}>{c.articleTitle}</h2>

          <div className={styles.articleLead}>
            <p>{c.lead}</p>
          </div>

          <div className={styles.articleBody}>

            <section className={styles.section}>
              <h3 className={styles.sectionHead}>{c.s1Head}</h3>
              <p>{c.s1p1}</p>
              <p>{c.s1p2}</p>
            </section>

            <blockquote className={styles.pullquote}>
              {c.pullquote}
              <cite>{c.pullquoteCite}</cite>
            </blockquote>

            <section className={styles.section}>
              <h3 className={styles.sectionHead}>{c.s2Head}</h3>
              <p>{c.s2p1}</p>
              <ul className={styles.actList}>
                {c.activities.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </section>

            <section className={styles.section}>
              <h3 className={styles.sectionHead}>{c.s3Head}</h3>
              <p>{c.s3p1}</p>
            </section>

            <div className={styles.teamGrid}>
              {c.members.map((m, i) => (
                <div key={i} className={styles.memberCard}>
                  <div className={styles.memberPhoto}>
                    <div className={styles.memberPhotoPlaceholder}>{m.initial}</div>
                  </div>
                  <div className={styles.memberInfo}>
                    <span className={styles.memberRole}>{m.role}</span>
                    <h4 className={styles.memberName}>{m.name}</h4>
                    {m.bio && <p className={styles.memberBio}>{m.bio}</p>}
                  </div>
                </div>
              ))}
            </div>

            <section className={styles.section}>
              <h3 className={styles.sectionHead}>{c.s4Head}</h3>
              <p>{c.s4p1}</p>
              <p>{c.s4p2}</p>
            </section>

          </div>
        </article>

        <div className={styles.articleFooter}>
          <div className={styles.articleFooterRule} />
          <span className={styles.articleFooterLabel}>{c.footerLabel}</span>
        </div>

      </main>
      <Footer />
    </>
  )
}
