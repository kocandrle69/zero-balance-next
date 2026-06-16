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
  hi: {
    label:     'हमारे बारे में',
    titleLine1:'एक संस्था।',
    titleLine2:'एक आंदोलन। जीने का एक तरीका।',
    lead: 'Zero Balance Society एक अलाभकारी सांस्कृतिक और आध्यात्मिक संस्था है, जो भारत की आध्यात्मिक विरासत की कालजयी बुद्धि को संरक्षित करने, प्रसारित करने और साझा करने के लिए समर्पित है।',
    s1head: 'हम कौन हैं',
    s1p1: 'यह संस्था पूर्ण गुरु श्री कराउली शंकर महादेव जी की पवित्र परंपरा और शिक्षाओं में गहराई से जड़ी हुई है, जो श्री पंचायती अखाड़ा नया उदासीन निर्वाण के महामंडलेश्वर का प्रतिष्ठित पद धारण करते हैं।',
    s1p2: 'Zero Balance Society की नींव 2008 में रखी गई थी, जब चेक गणराज्य के ईमानदार आध्यात्मिक साधकों के एक समूह ने सेंसेई राजीव सिन्हा के मार्गदर्शन में हिमालयी क्रिया योग की अपनी यात्रा शुरू की। सेंसेई राजीव ने उनकी लगन और आध्यात्मिक आकांक्षा को पहचानते हुए, बाद में पूर्ण गुरु श्री कराउली शंकर महादेव जी द्वारा उनकी दीक्षा का मार्ग प्रशस्त किया, जिससे वे प्रत्यक्ष रूप से एक प्रामाणिक और जीवित आध्यात्मिक परंपरा से जुड़ गए।',
    s1p3: 'अपनी स्थापना से, Zero Balance Society पूर्वी आध्यात्मिक बुद्धि और दुनिया भर के ईमानदार साधकों के बीच एक सेतु के रूप में कार्य करती रही है। तंत्र क्रिया योग, ध्यान, आत्म-अनुशासन, आध्यात्मिक अभ्यास और सांस्कृतिक आदान-प्रदान की शिक्षाओं के माध्यम से, यह संस्था आंतरिक परिवर्तन, आत्म-साक्षात्कार और एक संतुलित जीवन शैली की प्रेरणा देती है।',
    s1p4: 'हमारा मिशन एक ऐसा मंच बनाना है जहाँ प्राचीन आध्यात्मिक ज्ञान का उसके प्रामाणिक रूप में अध्ययन, अभ्यास और अनुभव किया जा सके, जो संस्कृतियों और समुदायों में सामंजस्य, व्यक्तिगत विकास और सार्वभौमिक कल्याण को बढ़ावा देता है।',
    quote: 'प्रामाणिक भारतीय परंपराओं में जड़ें। चिंतन, शिक्षा और समुदाय के प्रति समर्पित।',
    s2head: 'हमारा मिशन',
    s2v1: 'प्राचीन आध्यात्मिक ज्ञान का उसके प्रामाणिक रूप में अध्ययन, अभ्यास और अनुभव',
    s2v2: 'सामंजस्य, व्यक्तिगत विकास और सार्वभौमिक कल्याण को बढ़ावा देना',
    s2v3: 'आंतरिक परिवर्तन और आत्म-साक्षात्कार की प्रेरणा देना',
    s2v4: 'संस्कृतियों और समुदायों के बीच विश्व स्तर पर सेतु बनाना',
    s3head: 'तीन स्तंभ',
    sub1: 'चिंतन',
    p1: 'पारंपरिक ध्यान और चिंतन अनुशासनों के माध्यम से आंतरिक मौन, जागरूकता और स्थिरता के प्रत्यक्ष अनुभव को विकसित करना।',
    sub2: 'संवाद',
    p2: 'परंपराओं, संस्कृतियों और साधकों के बीच ईमानदार, खुले आदान-प्रदान के लिए स्थान बनाना — जहाँ बुद्धि स्वतंत्र रूप से साझा की जाती है और जिज्ञासा का स्वागत किया जाता है।',
    sub3: 'समुदाय',
    p3: 'साझा मूल्यों और विकास की ईमानदार आकांक्षा से एकजुट अभ्यासकर्ताओं, छात्रों और मित्रों का एक जीवंत, सहयोगी नेटवर्क बनाना।',
    s4head: 'संपर्क',
    s4p1: 'हम सभी ईमानदार साधकों का स्वागत करते हैं। प्रश्नों, सदस्यता या हमारी गतिविधियों और आगामी कार्यक्रमों के बारे में अधिक जानकारी के लिए, कृपया हमें लिखें।',
    footer: 'Zero Balance Society, z.s. · चेक गणराज्य में स्थित',
  },
} as const

export default function AboutContent() {
  const { lang } = useLang()
  const c = lang === 'hi' ? CONTENT.hi : lang === 'cs' ? CONTENT.cs : CONTENT.en

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
