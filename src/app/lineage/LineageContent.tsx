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
  hi: {
    label:     'प्रामाणिक परंपरा',
    titleLine1:'श्री राधारमण',
    titleLine2:'जी मिश्र',
    lead: 'आध्यात्मिक बुद्धि की एक जीवित परंपरा। श्री राधारमण जी मिश्र की आध्यात्मिक विरासत पवित्र ज्ञान, भक्ति और प्रत्यक्ष आध्यात्मिक अनुभव की एक अखंड परंपरा का प्रतिनिधित्व करती है।',
    s1head: 'परंपरा',
    s1p1: 'तंत्र क्रिया योग की कालजयी परंपराओं में जड़ी, इस परंपरा ने गुरु-शिष्य परंपरा — शिक्षक और शिष्य के बीच पवित्र संबंध — के माध्यम से गहन शिक्षाओं को संरक्षित और प्रसारित किया है।',
    s1p2: 'एक ऐतिहासिक परंपरा से अधिक — यह एक जीवित आध्यात्मिक पथ है जो ईमानदार साधकों को आत्म-साक्षात्कार, आंतरिक परिवर्तन और दिव्य जागरूकता की ओर मार्गदर्शन करता रहता है।',
    s2head: 'श्री राधारमण जी मिश्र की विरासत (1883–1994)',
    s2p1: 'माँ कामाख्या के प्रत्यक्ष शिष्य, श्री राधारमण जी मिश्र अपनी गहरी आध्यात्मिक उपलब्धि, अटल भक्ति और प्रामाणिक योगिक, तांत्रिक व आध्यात्मिक शिक्षाओं को संरक्षित करने की प्रतिबद्धता के लिए पूजनीय थे।',
    s2p2: '1883 में जन्मे, बाबाजी 1994 में 111 वर्ष की आयु में जीवित महासमाधि में प्रवेश कर गए और अपने भौतिक शरीर को अस्तित्व में विलीन कर लिया।',
    s2p3: 'उनकी शिक्षाओं में इस बात पर जोर दिया गया कि सच्ची आध्यात्मिकता केवल विश्वास की बात नहीं है, बल्कि यह ईमानदार अभ्यास, आचरण की शुद्धता, ध्यान और पूर्ण गुरु की कृपा के माध्यम से प्राप्त एक प्रत्यक्ष अनुभव है। उन्होंने अपना पद अपने शिष्य श्री कराउली शंकर महादेव को सौंपा।',
    quote: 'सच्ची आध्यात्मिकता केवल विश्वास की बात नहीं है, बल्कि यह ईमानदार अभ्यास, आचरण की शुद्धता, ध्यान और पूर्ण गुरु की कृपा के माध्यम से प्राप्त एक प्रत्यक्ष अनुभव है।',
    s3head: 'पवित्र गुरु-शिष्य परंपरा',
    s3p1: 'श्री राधारमण जी मिश्र की परंपरा उस प्राचीन सिद्धांत का पालन करती है कि आध्यात्मिक बुद्धि एक प्रबुद्ध गुरु से एक समर्पित शिष्य को प्रत्यक्ष मार्गदर्शन के माध्यम से सबसे अच्छी तरह से प्रसारित होती है। यह जीवित परंपरा सुनिश्चित करती है कि शिक्षाएँ पीढ़ियों में अपनी प्रामाणिकता, शुद्धता और परिवर्तनकारी शक्ति को बनाए रखती हैं।',
    s3p2: 'गुरु न केवल एक शिक्षक के रूप में कार्य करते हैं, बल्कि एक मार्गदर्शक के रूप में भी, जो साधक को उच्च चेतना और आध्यात्मिक जागरण की ओर आंतरिक यात्रा में सहायता करते हैं।',
    s4head: 'परंपरा के मूल सिद्धांत',
    sub1: 'प्रामाणिक आध्यात्मिक अभ्यास',
    p1: 'परंपरा ध्यान, मंत्र, चिंतन और अनुशासित जीवन के माध्यम से अनुभवात्मक आध्यात्मिकता पर जोर देती है।',
    sub2: 'आत्म-साक्षात्कार',
    p2: 'अंतिम लक्ष्य अहंकार, मन और सांसारिक पहचान की सीमाओं से परे अपनी सच्ची प्रकृति का प्रत्यक्ष बोध है।',
    sub3: 'भक्ति और समर्पण',
    p3: 'पथ भक्ति, विनम्रता और दिव्य के प्रति समर्पण को आध्यात्मिक विकास के अनिवार्य तत्वों के रूप में एकीकृत करता है।',
    sub4: 'पवित्र ज्ञान का संरक्षण',
    p4: 'परंपरा पारंपरिक बुद्धि को उसके प्रामाणिक रूप में संरक्षित और प्रसारित करने के लिए प्रतिबद्ध है, साथ ही इसे समकालीन साधकों के लिए सुलभ बनाती है।',
    s5head: 'परंपरा को जारी रखना',
    s5p1: 'आज, इस पूजनीय परंपरा की शिक्षाएँ और आध्यात्मिक अभ्यास दुनिया भर के साधकों को प्रेरित करते रहते हैं। ध्यान कार्यक्रमों, आध्यात्मिक रिट्रीट, अध्ययन मंडलों और व्यक्तिगत मार्गदर्शन के माध्यम से, साधकों को बुद्धि की एक जीवित धारा से जुड़ने का अवसर दिया जाता है जिसे पीढ़ियों से सावधानी से संरक्षित किया गया है।',
    s5p2: 'परंपरा प्राचीन आध्यात्मिक ज्ञान और आधुनिक जीवन के बीच एक सेतु के रूप में खड़ी है, जो व्यक्तियों को आंतरिक शांति, स्पष्टता, उद्देश्य और आध्यात्मिक तृप्ति की खोज में मदद करती है।',
    footer: 'Zero Balance Society · प्रामाणिक परंपरा',
  },
} as const

export default function LineageContent() {
  const { lang } = useLang()
  const c = lang === 'hi' ? CONTENT.hi : lang === 'cs' ? CONTENT.cs : CONTENT.en

  return (
    <>
      <Navbar translucent />
      <main className={styles.page}>

        <div className={styles.hero}>
          <div className={styles.heroBg} style={{ backgroundImage: 'url(/images/lineage2.jpg)', transform: 'none' }} />
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
