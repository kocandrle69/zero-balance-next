'use client'

import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import BackLink from '../../components/BackLink'
import styles from './journal.module.css'
import { useLang } from '../../contexts/LangContext'

const CONTENT = {
  cs: {
    issueLabel:   'Vydání I · Jaro 2026',
    mastheadSub:  'Prostor pro slovo, reflexi a sdílení naší cesty.',
    kicker:       'Vznik spolku',
    articleTitle: <>Zero Balance Society vzniklo.<br /><em>Zde je proč.</em></>,
    lead: `Dne 19. června 2026 byl v Krakovanech podepsán zakladatelský dokument
      a Zero Balance Society, z.s. vstoupilo v život jako zapsaný spolek
      podle českého občanského zákoníku. Tato chvíle nebyla spontánním
      rozhodnutím — byla vyvrcholením let duchovní praxe, kulturní výměny
      a sdílené cesty s tradicemi, které nás formovaly.`,

    s1Head: 'Účel a duchovní zaměření',
    s1p1: <>Spolek byl založen za účelem podpory, rozvoje, uchovávání a šíření
      duchovních, kulturních, meditačních a vzdělávacích tradic vycházejících
      z indické védské, jógové a tantrické tradice. Středem našeho zaměření
      je duchovní linie <strong>Shri Karauli Shankar Mahadev Ji</strong>,
      známého jako Karauli Sarkar nebo Gurudev — a s ní spojené tradice,
      praxe a kulturní dědictví Indie.</>,
    s1p2: `Zero Balance Society není náboženskou organizací. Jsme kulturním
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
      19. června 2026 v Krakovanech. Orgány spolku tvoří členská schůze,
      předseda. Statutárním zástupcem spolku je předseda.
      jednat jménem spolku samostatně.`,

    members: [
      { initial: 'S', role: 'Čestný předseda spolku', name: 'Sensei Rajeev Sinha', bio: 'Čestný předseda Zero Balance Society, jogínský mistr a učitel Tantra Kriya Yogy s žáky po celém světě. Členy spolku již více než dvacet let osobně vede v praxi původní indické duchovní tradice.', photo: '/images/Sensei_3.jpg', imgPos: 'center 15%', email: 'senseirajeev@icloud.com' },
      { initial: 'J', role: 'Předseda spolku', name: 'Jan Kočandrle', bio: 'Zakladatel a předseda Zero Balance Society. Podílí se na rozvoji činnosti spolku, jeho kulturní misi a na vytváření prostoru pro setkávání, studium a sdílení indických duchovních tradic.', photo: '/images/Jan.jpg', imgPos: '30% 20%', email: 'jan@zero-balance.org' },
      { initial: 'J', role: 'Místopředseda spolku', name: 'PhDr. Jiří Kočandrle', bio: 'Místopředseda Zero Balance Society. Věnuje se komunikaci, vztahům s veřejností a rozvoji kulturní mise spolku. Podílí se na předávání jogínské praxe a podpoře studia indických duchovních tradic.', photo: '/images/Jiri.jpg', email: 'jiri@zero-balance.org' },
      { initial: 'F', role: 'Místopředseda spolku', name: 'Ing. František Filouš', bio: 'Místopředseda spolku. Věnuje se legislativním a technickým záležitostem a podílí se na praktickém fungování Zero Balance Society.', photo: '/images/Franta.jpg', imgPos: '40% 20%' },
      { initial: 'P', role: 'Spoluzakládající členka', name: 'Pavlína Muchová', bio: 'Spoluzakládající členka Zero Balance Society. Do činnosti spolku přináší cit pro krásu, tvořivost a výtvarné vnímání; věnuje se malbě a podporuje kulturní a umělecký rozměr našich aktivit.', photo: '/images/Pavlina.jpg', imgPos: '60% 15%', imgScale: '1.2' },
      { initial: 'P', role: 'Spoluzakládající člen', name: 'Pavel Znamenáček', bio: 'Spoluzakládající člen Zero Balance Society. Vynikající karatista a trenér, který se více než 30 let věnuje práci s mládeží a vede úspěšný oddíl karate. Právě díky jeho oddílu se zakladatelé spolku před více než 20 lety poprvé setkali se Senseiem Rajeevem Sinhou. Ve spolku se podílí především na organizačních a technických záležitostech.', photo: '/images/Pavel.jpg', imgPos: '70% 20%' },
    ],

    s4Head: 'Sídlo a registrace',
    s4p1: <>Spolek je registrován v České republice jako zapsaný spolek (z.s.)
      podle zákona č. 89/2012 Sb., občanského zákoníku.
      Sídlo spolku: <strong>Krakovany 352, 281 27 Krakovany, Česká republika.</strong></>,
    s4p2: 'Spolek byl založen na dobu neurčitou a může působit v České republice i v zahraničí.',

    footerLabel: 'Zero Balance Society, z.s. · Vydání I · 2026',
  },

  en: {
    issueLabel:   'Issue I · Spring 2026',
    mastheadSub:  'A space for words, reflection and sharing our journey.',
    kicker:       'Founding of the Association',
    articleTitle: <>Zero Balance Society was founded.<br /><em>Here is why.</em></>,
    lead: `On 19 June 2026, the founding document was signed in Krakovany and
      Zero Balance Society, z.s. came into existence as a registered
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
    s1p2: `Zero Balance Society is not a religious organisation. We are a cultural
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
      on 19 June 2026 in Krakovany. The governing bodies consist of the general assembly,
      the chairman. The statutory representative of the association is the chairman.
      to act on behalf of the association independently.`,

    members: [
      { initial: 'S', role: 'Honorary Chairman', name: 'Sensei Rajeev Sinha', bio: 'Honorary Chairman of Zero Balance Society, a yogic master and teacher of Tantra Kriya Yoga with students around the world. He has personally guided members of the association in the practice of the original Indian spiritual tradition for over twenty years.', photo: '/images/Sensei_3.jpg', imgPos: 'center 15%', email: 'senseirajeev@icloud.com' },
      { initial: 'J', role: 'Chairman', name: 'Jan Kočandrle', bio: 'Founder and Chairman of Zero Balance Society. He contributes to the development of the association\'s activities, its cultural mission and the creation of spaces for gathering, study and sharing of Indian spiritual traditions.', photo: '/images/Jan.jpg', imgPos: '30% 20%', email: 'jan@zero-balance.org' },
      { initial: 'J', role: 'Vice-Chairman', name: 'PhDr. Jiří Kočandrle', bio: 'Vice-Chairman of Zero Balance Society. He focuses on communication, public relations and the development of the association\'s cultural mission, and contributes to the transmission of yogic practice and the study of Indian spiritual traditions.', photo: '/images/Jiri.jpg', email: 'jiri@zero-balance.org' },
      { initial: 'F', role: 'Vice-Chairman', name: 'Ing. František Filouš', bio: 'Vice-Chairman of the association. He handles legislative and technical matters and contributes to the practical functioning of Zero Balance Society.', photo: '/images/Franta.jpg', imgPos: '40% 20%' },
      { initial: 'P', role: 'Co-founding Member', name: 'Pavlína Muchová', bio: 'Co-founding member of Zero Balance Society. She brings a sense of beauty, creativity and artistic sensibility to the association\'s work; she is a painter and supports the cultural and artistic dimension of our activities.', photo: '/images/Pavlina.jpg', imgPos: '60% 15%', imgScale: '1.2' },
      { initial: 'P', role: 'Co-founding Member', name: 'Pavel Znamenáček', bio: 'Co-founding member of Zero Balance Society. An accomplished karateka and coach, dedicated to working with young people for over 30 years, leading a successful karate club. It was through his club that the founders of the association first met Sensei Rajeev Sinha more than twenty years ago. Within the association he focuses primarily on organisational and technical matters.', photo: '/images/Pavel.jpg', imgPos: '70% 20%' },
    ],

    s4Head: 'Registered Office',
    s4p1: <>The association is registered in the Czech Republic as a registered
      non-profit association (z.s.) under Act No. 89/2012 Coll., the Civil Code.
      Registered office: <strong>Krakovany 352, 281 27 Krakovany, Czech Republic.</strong></>,
    s4p2: 'The association is established for an indefinite period and may operate in the Czech Republic and abroad.',

    footerLabel: 'Zero Balance Society, z.s. · Issue I · 2026',
  },
  hi: {
    issueLabel:   'अंक I · वसंत 2026',
    mastheadSub:  'शब्द, चिंतन और हमारी यात्रा साझा करने का एक स्थान।',
    kicker:       'संस्था की स्थापना',
    articleTitle: <>Zero Balance Society की स्थापना हुई।<br /><em>यहाँ जानिए क्यों।</em></>,
    lead: `19 जून 2026 को क्राकोवानी में संस्थापक दस्तावेज़ पर हस्ताक्षर किए गए और
      Zero Balance Society, z.s. चेक नागरिक कानून के तहत एक पंजीकृत
      अलाभकारी संस्था के रूप में अस्तित्व में आई। यह क्षण कोई अचानक लिया गया
      निर्णय नहीं था — यह वर्षों की आध्यात्मिक साधना, सांस्कृतिक आदान-प्रदान
      और उन परंपराओं के साथ साझा पथ का परिणाम था जिन्होंने हमें आकार दिया है।`,

    s1Head: 'उद्देश्य और आध्यात्मिक अभिमुखता',
    s1p1: <>यह संस्था भारतीय वैदिक, योगिक और तांत्रिक परंपराओं में निहित आध्यात्मिक,
      सांस्कृतिक, ध्यान और शैक्षिक परंपराओं का समर्थन, विकास, संरक्षण और प्रसार
      करने के लिए स्थापित की गई थी। हमारे ध्यान के केंद्र में <strong>श्री कराउली शंकर महादेव जी</strong> की
      आध्यात्मिक परंपरा है, जिन्हें कराउली सरकार या गुरुदेव के नाम से जाना जाता है —
      और उनकी शिक्षाओं से जुड़ी भारत की परंपराएँ, अभ्यास और सांस्कृतिक विरासत।</>,
    s1p2: `Zero Balance Society कोई धार्मिक संगठन नहीं है। हम एक सांस्कृतिक
      और शैक्षिक संस्था हैं जो आध्यात्मिक अभ्यास, अंतरसांस्कृतिक मुलाकात और
      व्यक्तिगत विकास के लिए स्थान बनाती है — सभी के लिए खुली है चाहे
      उनकी पृष्ठभूमि, विश्वास या अनुभव कुछ भी हो।`,

    pullquote: <>&ldquo;संस्था आध्यात्मिक अभ्यास, व्यक्तिगत विकास, शिक्षा,
      सांस्कृतिक और अंतरसांस्कृतिक आदान-प्रदान तथा अंतर्राष्ट्रीय सहयोग
      के लिए स्थान बनाती है।&rdquo;</>,
    pullquoteCite: '— संस्था के नियम, अनुच्छेद II',

    s2Head: 'संस्था क्या करती है',
    s2p1: 'संस्था की मुख्य गतिविधियाँ अलाभकारी और गैर-वाणिज्यिक हैं। संस्था विशेष रूप से:',
    activities: [
      'सभाएँ, व्याख्यान, संगोष्ठियाँ, ध्यान और सांस्कृतिक कार्यक्रम आयोजित करती है',
      'भारत की समूह यात्राएँ और जीवित परंपराओं में सांस्कृतिक विसर्जन आयोजित करती है',
      'चेक गणराज्य में आध्यात्मिक शिक्षकों और सांस्कृतिक अतिथियों की यात्राओं का समर्थन करती है',
      'संस्था के उद्देश्य से संबंधित सामग्रियों का अनुवाद, तैयारी और प्रसार करती है',
      'चेक गणराज्य और विदेशों में समुदायों, संगठनों और व्यक्तियों के साथ सहयोग करती है',
      'भारतीय संस्कृति, दर्शन, भाषाओं, संगीत और आध्यात्मिक विरासत की खोज का समर्थन करती है',
    ],

    s3Head: 'संस्थापक और संरचना',
    s3p1: `संस्था की स्थापना तीन संस्थापकों द्वारा 19 जून 2026 को क्राकोवानी में
      संविधान सभा में की गई थी। संस्था के शासी निकायों में सदस्य सभा,
      अध्यक्ष शामिल हैं। संस्था के वैधानिक प्रतिनिधि अध्यक्ष हैं जो
      संस्था की ओर से स्वतंत्र रूप से कार्य कर सकते हैं।`,

    members: [
      { initial: 'S', role: 'मानद अध्यक्ष', name: 'Sensei Rajeev Sinha', bio: 'Zero Balance Society के मानद अध्यक्ष, एक योगाचार्य और तंत्र क्रिया योग के शिक्षक, जिनके शिष्य पूरी दुनिया में हैं। वे संस्था के सदस्यों को बीस से अधिक वर्षों से मूल भारतीय आध्यात्मिक परंपरा की साधना में व्यक्तिगत रूप से मार्गदर्शन करते आए हैं।', photo: '/images/Sensei_3.jpg', imgPos: 'center 15%', email: 'senseirajeev@icloud.com' },
      { initial: 'J', role: 'अध्यक्ष', name: 'Jan Kočandrle', bio: 'Zero Balance Society के संस्थापक और अध्यक्ष। वे संस्था की गतिविधियों, उसकी सांस्कृतिक मिशन और भारतीय आध्यात्मिक परंपराओं के मिलन, अध्ययन व साझाकरण के लिए स्थान निर्माण में योगदान करते हैं।', photo: '/images/Jan.jpg', imgPos: '30% 20%', email: 'jan@zero-balance.org' },
      { initial: 'J', role: 'उपाध्यक्ष', name: 'PhDr. Jiří Kočandrle', bio: 'Zero Balance Society के उपाध्यक्ष। वे संचार, जनसंपर्क और संस्था की सांस्कृतिक मिशन के विकास पर ध्यान देते हैं, और योगाभ्यास के प्रसार तथा भारतीय आध्यात्मिक परंपराओं के अध्ययन में सहयोग करते हैं।', photo: '/images/Jiri.jpg', email: 'jiri@zero-balance.org' },
      { initial: 'F', role: 'उपाध्यक्ष', name: 'Ing. František Filouš', bio: 'संस्था के उपाध्यक्ष। वे विधायी और तकनीकी मामलों को संभालते हैं और Zero Balance Society के व्यावहारिक संचालन में योगदान करते हैं।', photo: '/images/Franta.jpg', imgPos: '40% 20%' },
      { initial: 'P', role: 'सह-संस्थापक सदस्या', name: 'Pavlína Muchová', bio: 'Zero Balance Society की सह-संस्थापक सदस्या। वे संस्था के कार्य में सौंदर्यबोध, रचनात्मकता और कलात्मक दृष्टि लाती हैं; वे एक चित्रकार हैं और हमारी गतिविधियों के सांस्कृतिक एवं कलात्मक आयाम का समर्थन करती हैं।', photo: '/images/Pavlina.jpg', imgPos: '60% 15%', imgScale: '1.2' },
      { initial: 'P', role: 'सह-संस्थापक सदस्य', name: 'Pavel Znamenáček', bio: 'Zero Balance Society के सह-संस्थापक सदस्य। एक कुशल कराटे खिलाड़ी और प्रशिक्षक, जो 30 से अधिक वर्षों से युवाओं के साथ कार्य करते हुए एक सफल कराटे क्लब का नेतृत्व करते हैं। उन्हीं के क्लब के माध्यम से संस्था के संस्थापकों की बीस से अधिक वर्ष पहले सेंसेई राजीव सिन्हा से पहली मुलाकात हुई। संस्था में वे मुख्यतः संगठनात्मक और तकनीकी मामलों में योगदान करते हैं।', photo: '/images/Pavel.jpg', imgPos: '70% 20%' },
    ],

    s4Head: 'पंजीकृत कार्यालय',
    s4p1: <>संस्था चेक गणराज्य में अधिनियम संख्या 89/2012 Sb., नागरिक संहिता के
      तहत एक पंजीकृत अलाभकारी संस्था (z.s.) के रूप में पंजीकृत है।
      पंजीकृत कार्यालय: <strong>Krakovany 352, 281 27 Krakovany, Czech Republic।</strong></>,
    s4p2: 'संस्था अनिश्चित काल के लिए स्थापित है और चेक गणराज्य तथा विदेशों में काम कर सकती है।',

    footerLabel: 'Zero Balance Society, z.s. · अंक I · 2026',
  },
} as const

export default function JournalContent() {
  const { lang } = useLang()
  const c = lang === 'hi' ? CONTENT.hi : lang === 'cs' ? CONTENT.cs : CONTENT.en

  return (
    <>
      <Navbar translucent />
      <main className={styles.page}>

        {/* ── Hero + Masthead ────────────────────────────────── */}
        <div className={styles.hero}>
          <div className={styles.heroBg} style={{ backgroundImage: 'url(/images/Casopis3.jpg)', transform: 'none' }} />
          <div className={styles.heroOverlay} />
          <BackLink />
          <div className={styles.mastheadInner}>
            <div className={styles.mastheadMeta}>
              <span className={styles.issueLabel}>{c.issueLabel}</span>
              <span className={styles.issueDivider}>·</span>
              <span className={styles.issueLabel}>Zero Balance Society, z.s.</span>
            </div>
            <h1 className={styles.mastheadTitle}>
              {lang === 'hi' ? 'पत्रिका' : lang === 'cs' ? 'Časopis' : 'Journal'}
            </h1>
            <p className={styles.mastheadSub}>{c.mastheadSub}</p>
            <div className={styles.mastheadRule} />
          </div>
        </div>

        {/* ── Article ───────────────────────────────────────────── */}
        <article className={styles.article}>

          <div className={styles.articleKicker}>
            <span className={styles.kicker}>{c.kicker}</span>
            <time className={styles.articleDate} dateTime="2026-06-19">
              {lang === 'hi' ? '19 जून 2026' : lang === 'cs' ? '19. června 2026' : '19 June 2026'}
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

            <div className={styles.teamList}>
              {c.members.filter(m => m.photo).map((m, i) => (
                <div key={i} className={`${styles.memberRow} ${i % 2 === 1 ? styles.memberRowReverse : ''}`}>
                  <div className={styles.memberRowImg}>
                    <img src={m.photo} alt={m.name} style={{
                      ...('imgPos' in m && m.imgPos ? { objectPosition: m.imgPos as string } : {}),
                      ...('imgScale' in m && m.imgScale ? { transform: `scale(${m.imgScale})` } : {}),
                    }} />
                  </div>
                  <div className={styles.memberRowText}>
                    <span className={styles.memberRole}>{m.role}</span>
                    <h4 className={styles.memberName}>{m.name}</h4>
                    {m.bio && <p className={styles.memberBio}>{m.bio}</p>}
                    {'email' in m && m.email && <a href={`mailto:${m.email}`} className={styles.memberEmail}>{m.email}</a>}
                  </div>
                </div>
              ))}
              {c.members.some(m => !m.photo) && (
                <div className={styles.pendingRow}>
                  {c.members.filter(m => !m.photo).map((m, i) => (
                    <div key={i} className={styles.pendingMember}>
                      <span className={styles.memberRole}>{m.role}</span>
                      <h4 className={styles.memberName}>{m.name}</h4>
                    </div>
                  ))}
                </div>
              )}
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
