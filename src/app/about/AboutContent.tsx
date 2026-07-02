'use client'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import BackLink from '../../components/BackLink'
import { useLang } from '../../contexts/LangContext'
import styles from '../../components/subpage.module.css'
import IMG from '../../lib/images'

const CONTENT = {
  en: {
    label: 'About Us',
    titleLine1: 'A Society.',
    titleLine2: 'A Living Tradition.',
    introHead: 'Zero Balance Society',
    introP1: 'Zero Balance Society (z.s.) is a registered Czech non-profit association dedicated to preserving and sharing the spiritual, cultural and meditative traditions of India — rooted in the Vedic, yogic and tantric lineage of Shri Karauli Shankar Mahadev Ji.',
    introP2: 'Our work rests on three pillars: Contemplation, Dialogue and Community. We organise meditation gatherings, group journeys to India, study evenings and cultural events — open to all sincere seekers.',
    janHead: 'Jan Kočandrle — Chairman',
    janP1: 'Jan Kočandrle is the Chairman of Zero Balance Society and one of its founding members. The association was established at the wish and with the blessing of Gurudev Shri Karauli Shankar Mahadev Ji – Sensei Rajeev Sinha stood at its founding, and his role was pivotal.',
    janP2: 'Within Zero Balance Society, Jan Kočandrle helps to carry forward the association\'s mission: preserving, promoting and transmitting the living spiritual, cultural and meditative heritage of India, rooted in Gurudev\'s lineage.',
    janP3: 'Under his chairmanship, the Society develops meditation gatherings, study evenings, cultural activities and group journeys to India, creating a space where ancient spiritual traditions can remain alive, meaningful and accessible to contemporary seekers in the Czech Republic and beyond.',
    gurudevHead: 'Gurudev — Shri Karauli Shankar Mahadev Ji',
    gurudevP1: 'Gurudev Shri Karauli Shankar Mahadev Ji is the spiritual heart of our lineage. As Mahāmaṇḍalēśvar of Shri Panchayati Akhada Naya Udasin Nirvan, he holds the highest spiritual rank within this tradition.',
    gurudevP2: 'His teaching is rooted in Tantra Kriya Yoga — a direct, experiential path of inner transformation, devotion and self-realisation. Gurudev\'s presence and grace are the source from which all Zero Balance Society activities draw their inspiration.',
    gurudevP3: 'We are preparing an extraordinary visit of Gurudev to the Czech Republic in 2027.',
    senseiHead: 'Sensei Rajeev Sinha — Honorary Chairman',
    senseiP1: 'Sensei Rajeev Sinha has accepted the Honorary Chairmanship of Zero Balance Society. His presence is a foundational pillar of our association — rooted in more than twenty years of personal guidance, deep spiritual practice and living immersion in the original Indian yogic tradition.',
    senseiP2: 'Sensei Rajeev Sinha is a yogi and teacher of original Indian yoga, in particular Tantra Kriya Yoga. For the founders and members of Zero Balance Society, he has been a long-standing teacher and guide — transmitting not only knowledge, but above all the lived experience of practice, discipline and inner transformation. He is among the first disciples of Gurudev Shri Karauli Shankar Mahadev Ji, and it is through him that a living connection with Gurudev, the ashram and the spiritual lineage from which Zero Balance Society draws its work has opened for us. This lineage flows from the teachings of Shri Radharaman Ji Mishra and, at its deeper roots, reaches back to the legacy of Mahavatar Babaji.',
    senseiP3: 'For European students, Sensei Rajeev Sinha serves as a bridge between the authentic Indian spiritual tradition and the contemporary Western world. Through his guidance, our work is not merely a cultural or educational project — it is rooted in a living tradition transmitted personally, through practice and direct experience. Through his Wisdom of India video lesson series, he makes the depth of Indian philosophy, yoga and spiritual practice accessible, practical and naturally applicable to the contemporary European seeker. His role in Zero Balance Society is therefore not merely honorary, but profoundly defining: he helps maintain the direction, depth and fidelity to the tradition on which the association stands.',
    philLink: 'Explore our Philosophy →',
    pdfLink: 'Download PDF — About Zero Balance Society',
  },
  cs: {
    label: 'O nás',
    titleLine1: 'Spolek.',
    titleLine2: 'Živá tradice.',
    introHead: 'Zero Balance Society',
    introP1: 'Zero Balance Society (z.s.) je registrovaný český neziskový spolek věnovaný zachování a šíření duchovních, kulturních a meditativních tradic Indie — zakořeněných ve védské, jógické a tantrické linii Shri Karauli Shankar Mahadev Ji.',
    introP2: 'Naše práce stojí na třech pilířích: Kontemplace, Dialog a Komunita. Pořádáme meditační setkání, skupinové cesty do Indie, studijní večery a kulturní akce — otevřené všem upřímným hledačům.',
    janHead: 'Jan Kočandrle — Předseda spolku',
    janP1: 'Jan Kočandrle je předsedou Zero Balance Society a jedním z jeho zakladatelů. Spolek vznikl z přání a s požehnáním Gurudeva Shri Karauli Shankar Mahadev Ji – u jeho zrodu stál Sensei Rajeev Sinha, jehož role byla klíčová.',
    janP2: 'Jan Kočandrle v rámci Zero Balance Society pomáhá naplňovat poslání spolku: zachovávat, podporovat a předávat živé duchovní, kulturní a meditativní dědictví Indie, zakořeněné v Gurudevově linii.',
    janP3: 'Pod jeho vedením spolek rozvíjí meditační setkání, studijní večery, kulturní aktivity a skupinové cesty do Indie — vytváří prostor, kde mohou starobylé duchovní tradice zůstat živé, smysluplné a přístupné současným hledačům v České republice i za jejími hranicemi.',
    gurudevHead: 'Gurudev — Shri Karauli Shankar Mahadev Ji',
    gurudevP1: 'Gurudev Shri Karauli Shankar Mahadev Ji je duchovním srdcem naší linie. Jako Mahāmaṇḍalēśvar Shri Panchayati Akhada Naya Udasin Nirvan zastává nejvyšší duchovní hodnost v této tradici.',
    gurudevP2: 'Jeho učení je zakořeněno v Tantra Krija Józe — přímé, zkušenostní cestě vnitřní transformace, oddanosti a sebepoznání. Gurudevova přítomnost a milost jsou zdrojem, z nějž čerpají veškeré aktivity Zero Balance Society.',
    gurudevP3: 'Připravujeme výjimečnou návštěvu Gurudeva v České republice v roce 2027.',
    senseiHead: 'Sensei Rajeev Sinha — čestný předseda',
    senseiP1: 'Sensei Rajeev Sinha přijal čestné předsednictví Zero Balance Society. Jeho přítomnost je pro náš spolek zásadní oporou – vychází z více než dvaceti let osobního vedení, hluboké duchovní praxe a živého zakotvení v původní indické jógové tradici.',
    senseiP2: 'Sensei Rajeev Sinha je jogín a učitel původní indické jógy, zejména Tantra Kriya Yogy. Pro zakladatele a členy Zero Balance Society je dlouhodobým učitelem a průvodcem, který předává nejen poznání, ale především zkušenost praxe, disciplíny a vnitřní proměny. Patří k prvním žákům Gurudeva Shri Karauli Shankar Mahadev Ji a právě skrze něj se pro nás otevírá živé spojení s Gurudevem, ášramem i duchovní linií, z níž činnost Zero Balance Society vyrůstá. Tato linie se odvíjí od učení Shri Radharaman Ji Mishra a svými hlubšími kořeny sahá k odkazu Mahavatara Babajiho.',
    senseiP3: 'Pro evropské žáky představuje Sensei Rajeev Sinha most mezi autentickou indickou duchovní tradicí a současným západním prostředím. Díky jeho vedení není naše práce pouze kulturním nebo vzdělávacím projektem, ale navazuje na živou tradici, která se předává osobně, skrze praxi a přímou zkušenost. Prostřednictvím série videolekcí Moudrost Indie zpřístupňuje hloubku indické filozofie, jógy a duchovní praxe způsobem, který je srozumitelný, praktický a přirozeně použitelný i pro současného evropského člověka. Jeho role v Zero Balance Society proto není pouze čestná, ale bytostně určující: pomáhá udržovat směr, hloubku a věrnost tradici, na níž spolek stojí.',
    philLink: 'Prozkoumejte naši filozofii →',
    pdfLink: 'Stáhnout PDF — O Zero Balance Society',
  },
  hi: {
    label: 'हमारे बारे में',
    titleLine1: 'एक संस्था।',
    titleLine2: 'एक जीवित परंपरा।',
    introHead: 'Zero Balance Society',
    introP1: 'Zero Balance Society (z.s.) एक पंजीकृत चेक गैर-लाभकारी संस्था है जो भारत की आध्यात्मिक, सांस्कृतिक और ध्यान परंपराओं को संरक्षित और साझा करने के लिए समर्पित है।',
    introP2: 'हमारा कार्य तीन स्तंभों पर टिका है: चिंतन, संवाद और समुदाय।',
    janHead: 'Jan Kočandrle — अध्यक्ष',
    janP1: 'Jan Kočandrle Zero Balance Society के अध्यक्ष और संस्थापक सदस्यों में से एक हैं। यह संस्था गुरुदेव श्री काराउली शंकर महादेव जी की इच्छा और आशीर्वाद से स्थापित हुई – इसकी स्थापना में सेंसेई राजीव सिन्हा की भूमिका महत्वपूर्ण रही।',
    janP2: 'Zero Balance Society में, Jan Kočandrle संस्था के मिशन को आगे बढ़ाने में सहायता करते हैं: गुरुदेव की परंपरा में निहित भारत की जीवित आध्यात्मिक, सांस्कृतिक और ध्यान विरासत को संरक्षित, प्रसारित और प्रसारित करना।',
    janP3: 'उनके अध्यक्षता में, संस्था ध्यान सभाओं, अध्ययन संध्याओं, सांस्कृतिक गतिविधियों और भारत की समूह यात्राओं का विकास करती है — एक ऐसा स्थान बनाती है जहाँ प्राचीन आध्यात्मिक परंपराएँ चेक गणराज्य और उसके बाहर के समकालीन साधकों के लिए जीवित, सार्थक और सुलभ रह सकें।',
    gurudevHead: 'गुरुदेव — श्री काराउली शंकर महादेव जी',
    gurudevP1: 'गुरुदेव श्री काराउली शंकर महादेव जी हमारी परंपरा के आध्यात्मिक हृदय हैं।',
    gurudevP2: 'उनकी शिक्षाएं तंत्र क्रिया योग में निहित हैं — आत्म-साक्षात्कार का एक प्रत्यक्ष मार्ग।',
    gurudevP3: 'हम 2027 में गुरुदेव की चेक गणराज्य यात्रा की तैयारी कर रहे हैं।',
    senseiHead: 'सेंसेई राजीव सिन्हा — मानद अध्यक्ष',
    senseiP1: 'सेंसेई राजीव सिन्हा ने Zero Balance Society का मानद अध्यक्ष पद स्वीकार किया है। हमारी संस्था के लिए उनकी उपस्थिति एक मूलभूत आधार है — जो बीस से अधिक वर्षों के व्यक्तिगत मार्गदर्शन, गहन आध्यात्मिक साधना और मूल भारतीय योग परंपरा में जीवंत निहितता से उपजी है।',
    senseiP2: 'सेंसेई राजीव सिन्हा मूल भारतीय योग, विशेष रूप से तंत्र क्रिया योग के एक योगी और शिक्षक हैं। Zero Balance Society के संस्थापकों और सदस्यों के लिए वे एक दीर्घकालिक शिक्षक और मार्गदर्शक रहे हैं — जो केवल ज्ञान नहीं, बल्कि सबसे बढ़कर साधना, अनुशासन और आंतरिक रूपांतरण का जीवंत अनुभव प्रदान करते हैं। वे गुरुदेव श्री काराउली शंकर महादेव जी के प्रथम शिष्यों में से हैं, और उन्हीं के माध्यम से हमारे लिए गुरुदेव, आश्रम और उस आध्यात्मिक परंपरा से जीवंत संबंध खुला है जिससे Zero Balance Society की गतिविधियाँ उत्पन्न होती हैं। यह परंपरा श्री राधारमण जी मिश्र की शिक्षाओं से प्रवाहित होती है और अपनी गहरी जड़ों में महावतार बाबाजी की विरासत तक पहुँचती है।',
    senseiP3: 'यूरोपीय साधकों के लिए सेंसेई राजीव सिन्हा प्रामाणिक भारतीय आध्यात्मिक परंपरा और समकालीन पश्चिमी जगत के बीच एक सेतु हैं। उनके मार्गदर्शन से हमारा कार्य केवल सांस्कृतिक या शैक्षिक परियोजना नहीं रहता — यह एक जीवंत परंपरा से जुड़ा है जो व्यक्तिगत रूप से, साधना और प्रत्यक्ष अनुभव के माध्यम से प्रवाहित होती है। अपनी वीडियो श्रृंखला भारत की प्रज्ञा के माध्यम से वे भारतीय दर्शन, योग और आध्यात्मिक साधना की गहराई को ऐसे रूप में प्रस्तुत करते हैं जो सुगम, व्यावहारिक और समकालीन यूरोपीय साधक के लिए स्वाभाविक रूप से उपयोगी है। Zero Balance Society में उनकी भूमिका इसलिए केवल सम्मानजनक नहीं, बल्कि मूलभूत रूप से निर्धारक है: वे उस परंपरा की दिशा, गहराई और निष्ठा बनाए रखने में सहायता करते हैं जिस पर संस्था टिकी है।',
    philLink: 'हमारी दर्शन का अन्वेषण करें →',
    pdfLink: 'PDF डाउनलोड करें — Zero Balance Society के बारे में',
  },
} as const

export default function AboutContent() {
  const { lang } = useLang()
  const C = lang === 'hi' ? CONTENT.hi : lang === 'cs' ? CONTENT.cs : CONTENT.en

  return (
    <>
      <Navbar translucent />
      <main className={styles.page}>

        <div className={styles.hero}>
          <div className={styles.heroBg} style={{ backgroundImage: 'url(/images/aboutus4.jpg)', transform: 'none' }} />
          <div className={styles.heroOverlay} />
          <BackLink />
          <div className={styles.heroContent}>
            <p className={styles.heroLabel}>{C.label}</p>
            <h1 className={styles.heroTitle}>
              {C.titleLine1}<br /><em>{C.titleLine2}</em>
            </h1>
          </div>
        </div>

        <article className={styles.article}>

          <section className={styles.section}>
            <h2 className={styles.sectionHead}>{C.introHead}</h2>
            <p>{C.introP1}</p>
            <p>{C.introP2}</p>
          </section>

          <section className={`${styles.section} ${styles.personFloat}`}>
            <div className={styles.personImg}>
              <img src="/images/Sensei_3.jpg" alt="Sensei Rajeev Sinha" style={{ objectPosition: 'center 15%' }} />
            </div>
            <h2 className={styles.sectionHead}>{C.senseiHead}</h2>
            <p>{C.senseiP1}</p>
            <p>{C.senseiP2}</p>
            <p>{C.senseiP3}</p>
          </section>

          <section className={`${styles.section} ${styles.personFloat}`}>
            <div className={styles.personImg}>
              <img src="/images/Jan.jpg" alt="Jan Kočandrle" style={{ objectPosition: '40% 25%' }} />
            </div>
            <h2 className={styles.sectionHead}>{C.janHead}</h2>
            <p>{C.janP1}</p>
            <p>{C.janP2}</p>
            {C.janP3 && <p>{C.janP3}</p>}
          </section>

          <section className={`${styles.section} ${styles.personFloat}`}>
            <div className={styles.personImg}>
              <img src="/images/Gurudev.jpg" alt="Gurudev Shri Karauli Shankar Mahadev Ji" style={{ objectPosition: '10% 15%' }} />
            </div>
            <h2 className={styles.sectionHead}>{C.gurudevHead}</h2>
            <p>{C.gurudevP1}</p>
            <p>{C.gurudevP2}</p>
            <p>{C.gurudevP3}</p>
          </section>

          <section className={styles.section} style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
            <a href="/lineage" className={styles.subpageCtaLink}>{C.philLink}</a>
            <a href={lang === 'hi' ? '/Zero Balance Society (hi).pdf' : lang === 'cs' ? '/Zero Balance Society (cs).pdf' : '/Zero Balance Society (eng).pdf'} target="_blank" rel="noopener noreferrer" className={styles.subpageCtaLink} style={{ opacity: 0.7 }}>{C.pdfLink}</a>
          </section>

        </article>
      </main>
      <Footer />
    </>
  )
}
