'use client'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import BackLink from '../../components/BackLink'
import { useLang } from '../../contexts/LangContext'
import styles from '../../components/subpage.module.css'

const CONTENT = {
  en: {
    label: 'About Us',
    titleLine1: 'A Society.',
    titleLine2: 'A Living Tradition.',
    introHead: 'Zero Balance Society',
    introP1: 'Zero Balance Society (z.s.) is a registered Czech non-profit association dedicated to preserving and sharing the spiritual, cultural and meditative traditions of India — rooted in the Vedic, yogic and tantric lineage of Shri Karauli Shankar Mahadeva Ji.',
    introP2: 'Our work rests on three pillars: Contemplation, Dialogue and Community. We organise meditation gatherings, group journeys to India, study evenings and cultural events — open to all sincere seekers.',
    janHead: 'Jan Kočandrle — Chairman',
    janP1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    janP2: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    janP3: '',
    gurudevHead: 'Gurudev — Shri Karauli Shankar Mahadeva Ji',
    gurudevP1: 'Gurudev Shri Karauli Shankar Mahadeva Ji is the spiritual heart of our lineage. As Mahāmaṇḍalēśvar of Shri Panchayati Akhada Naya Udasin Nirvan, he holds the highest spiritual rank within this tradition.',
    gurudevP2: 'His teaching is rooted in Tantra Kriya Yoga — a direct, experiential path of inner transformation, devotion and self-realisation. Gurudev\'s presence and grace are the source from which all ZBS activities draw their inspiration.',
    gurudevP3: 'We are preparing an extraordinary visit of Gurudev to the Czech Republic in 2027.',
    senseiHead: 'Rajeev Sinha — Guide & Teacher',
    senseiP1: 'Rajeev Sinha (Sensei) is our primary guide and teacher in the Czech Republic. His journey into Indian spiritual traditions began decades ago, leading him to become a bridge between ancient Eastern wisdom and contemporary Western seekers.',
    senseiP2: 'Through his Wisdom of India video lesson series, Sensei Rajeev makes the depth of Indian philosophy and spiritual practice accessible, practical and alive for our community.',
    senseiP3: 'He facilitated the connection of the ZBS founding members with Gurudev\'s lineage — a bond that remains at the core of everything we do.',
    philLink: 'Explore our Philosophy →',
  },
  cs: {
    label: 'O nás',
    titleLine1: 'Spolek.',
    titleLine2: 'Živá tradice.',
    introHead: 'Zero Balance Society',
    introP1: 'Zero Balance Society (z.s.) je registrovaný český neziskový spolek věnovaný zachování a šíření duchovních, kulturních a meditativních tradic Indie — zakořeněných ve védské, jógické a tantrické linii Shri Karauli Shankar Mahadeva Ji.',
    introP2: 'Naše práce stojí na třech pilířích: Kontemplace, Dialog a Komunita. Pořádáme meditační setkání, skupinové cesty do Indie, studijní večery a kulturní akce — otevřené všem upřímným hledačům.',
    janHead: 'Jan Kočandrle — Předseda spolku',
    janP1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    janP2: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    janP3: '',
    gurudevHead: 'Gurudev — Shri Karauli Shankar Mahadeva Ji',
    gurudevP1: 'Gurudev Shri Karauli Shankar Mahadeva Ji je duchovním srdcem naší linie. Jako Mahāmaṇḍalēśvar Shri Panchayati Akhada Naya Udasin Nirvan zastává nejvyšší duchovní hodnost v této tradici.',
    gurudevP2: 'Jeho učení je zakořeněno v Tantra Krija Józe — přímé, zkušenostní cestě vnitřní transformace, oddanosti a sebepoznání. Gurudevova přítomnost a milost jsou zdrojem, z nějž čerpají veškeré aktivity ZBS.',
    gurudevP3: 'Připravujeme výjimečnou návštěvu Gurudeva v České republice v roce 2027.',
    senseiHead: 'Rajeev Sinha — Průvodce a učitel',
    senseiP1: 'Rajeev Sinha (Sensei) je naším hlavním průvodcem a učitelem v České republice. Jeho cesta k indickým duchovním tradicím začala před desítkami let a přivedla ho k tomu, aby se stal mostem mezi starověkou východní moudrostí a současnými západními hledači.',
    senseiP2: 'Prostřednictvím své série video lekcí Moudrost Indie zpřístupňuje Sensei Rajeev hloubku indické filozofie a duchovní praxe — prakticky a živě pro naši komunitu.',
    senseiP3: 'Zprostředkoval propojení zakladatelů ZBS s Gurudevovou linií — pouto, které zůstává jádrem všeho, co děláme.',
    philLink: 'Prozkoumejte naši filozofii →',
  },
  hi: {
    label: 'हमारे बारे में',
    titleLine1: 'एक संस्था।',
    titleLine2: 'एक जीवित परंपरा।',
    introHead: 'Zero Balance Society',
    introP1: 'Zero Balance Society (z.s.) एक पंजीकृत चेक गैर-लाभकारी संस्था है जो भारत की आध्यात्मिक, सांस्कृतिक और ध्यान परंपराओं को संरक्षित और साझा करने के लिए समर्पित है।',
    introP2: 'हमारा कार्य तीन स्तंभों पर टिका है: चिंतन, संवाद और समुदाय।',
    janHead: 'Jan Kočandrle — अध्यक्ष',
    janP1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
    janP2: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    janP3: '',
    gurudevHead: 'गुरुदेव — श्री काराउली शंकर महादेव जी',
    gurudevP1: 'गुरुदेव श्री काराउली शंकर महादेव जी हमारी परंपरा के आध्यात्मिक हृदय हैं।',
    gurudevP2: 'उनकी शिक्षाएं तंत्र क्रिया योग में निहित हैं — आत्म-साक्षात्कार का एक प्रत्यक्ष मार्ग।',
    gurudevP3: 'हम 2027 में गुरुदेव की चेक गणराज्य यात्रा की तैयारी कर रहे हैं।',
    senseiHead: 'राजीव सिन्हा — मार्गदर्शक और शिक्षक',
    senseiP1: 'राजीव सिन्हा (सेंसेई) चेक गणराज्य में हमारे प्राथमिक मार्गदर्शक और शिक्षक हैं।',
    senseiP2: 'भारत की बुद्धि वीडियो श्रृंखला के माध्यम से वे भारतीय दर्शन को सुलभ और व्यावहारिक बनाते हैं।',
    senseiP3: 'उन्होंने ZBS के संस्थापकों का गुरुदेव की परंपरा से संबंध स्थापित कराया।',
    philLink: 'हमारी दर्शन का अन्वेषण करें →',
  },
} as const

export default function AboutContent() {
  const { lang } = useLang()
  const C = lang === 'hi' ? CONTENT.hi : lang === 'cs' ? CONTENT.cs : CONTENT.en

  return (
    <>
      <Navbar />
      <main className={styles.page}>
        <article className={styles.article} style={{ paddingTop: '120px', position: 'relative' }}>
          <BackLink />

          <div style={{ marginTop: '32px', marginBottom: '56px' }}>
            <p className={styles.sectionHead} style={{ marginBottom: '18px' }}>{C.label}</p>
            <h1 className={styles.heroTitle} style={{ color: 'var(--ink2)', fontSize: 'clamp(36px, 5vw, 64px)' }}>
              {C.titleLine1}<br /><em>{C.titleLine2}</em>
            </h1>
          </div>

          <section className={styles.section}>
            <h2 className={styles.sectionHead}>{C.introHead}</h2>
            <p>{C.introP1}</p>
            <p>{C.introP2}</p>
          </section>

          <section className={styles.section}>
            <div className={styles.personRow}>
              <div className={styles.personImg}>
                <img src="/images/Jan.png" alt="Jan Kočandrle" style={{ objectPosition: '50% 25%' }} />
              </div>
              <div className={styles.personText}>
                <h2 className={styles.sectionHead}>{C.janHead}</h2>
                <p>{C.janP1}</p>
                <p>{C.janP2}</p>
                {C.janP3 && <p>{C.janP3}</p>}
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={`${styles.personRow} ${styles.personRowReverse}`}>
              <div className={styles.personImg}>
                <img src="/images/Gurudev.png" alt="Gurudev Shri Karauli Shankar Mahadeva Ji" style={{ objectPosition: 'center 15%' }} />
              </div>
              <div className={styles.personText}>
                <h2 className={styles.sectionHead}>{C.gurudevHead}</h2>
                <p>{C.gurudevP1}</p>
                <p>{C.gurudevP2}</p>
                <p>{C.gurudevP3}</p>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.personRow}>
              <div className={styles.personImg}>
                <img src="/images/Sensei 3.png" alt="Rajeev Sinha — Sensei" style={{ objectPosition: '60% 10%', transform: 'scale(1.4)' }} />
              </div>
              <div className={styles.personText}>
                <h2 className={styles.sectionHead}>{C.senseiHead}</h2>
                <p>{C.senseiP1}</p>
                <p>{C.senseiP2}</p>
                <p>{C.senseiP3}</p>
              </div>
            </div>
          </section>

          <section className={`${styles.section}`} style={{ textAlign: 'center', paddingTop: '16px' }}>
            <a href="/lineage" className={styles.subpageCtaLink}>{C.philLink}</a>
          </section>

        </article>
      </main>
      <Footer />
    </>
  )
}
