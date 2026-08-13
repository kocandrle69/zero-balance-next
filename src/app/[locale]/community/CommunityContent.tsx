'use client'

import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import BackLink from '../../../components/BackLink'
import { useLang } from '../../../contexts/LangContext'
import styles from '../../../components/subpage.module.css'
import IMG from '../../../lib/images'

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
  hi: {
    label:     'निर्माण',
    titleLine1:'अभ्यास, शिक्षा',
    titleLine2:'और समुदाय के लिए स्थान',
    lead: 'विकास, जुड़ाव और परिवर्तन के लिए एक आश्रय। सच्ची बुद्धि तब फलती-फूलती है जब व्यक्तियों को एक सहायक वातावरण में एक साथ सीखने, अभ्यास करने और बढ़ने का अवसर मिलता है।',
    s1head: 'हमारी प्रतिबद्धता',
    s1p1: 'Zero Balance Society ऐसे स्थान बनाने के लिए समर्पित है जहाँ आध्यात्मिक अन्वेषण, व्यक्तिगत विकास और सार्थक मानवीय जुड़ाव पनप सके।',
    s1p2: 'हम मानते हैं कि प्रामाणिक परिवर्तन न केवल ज्ञान के माध्यम से बल्कि निरंतर अभ्यास और साझा अनुभव के माध्यम से होता है। साधकों, अभ्यासकर्ताओं, शिक्षकों और स्वयंसेवकों को एक साथ लाकर, हम सीखने, सेवा और आंतरिक विकास में निहित एक जीवंत समुदाय को बढ़ावा देते हैं।',
    s2head: 'अभ्यास के लिए स्थान',
    s2p1: 'आध्यात्मिक और ध्यान परंपराएँ नियमित अभ्यास के माध्यम से जीवित होती हैं। हम व्यक्तियों को प्रामाणिक अनुशासनों में संलग्न होने के अवसर प्रदान करते हैं जो आत्म-जागरूकता, आंतरिक शांति और उच्च चेतना विकसित करते हैं।',
    initiatives1: [
      'ध्यान और माइंडफुलनेस सत्र',
      'योग और प्राणायाम अभ्यास',
      'क्रिया और चिंतन अनुशासन',
      'आध्यात्मिक रिट्रीट और गहन अनुभव',
      'पवित्र अनुष्ठान और भक्ति सभाएँ',
      'व्यक्तिगत विकास और आत्म-उन्नति कार्यक्रम',
    ],
    s3head: 'शिक्षा के लिए स्थान',
    s3p1: 'शिक्षा विकास की नींव है। संरचित शिक्षाओं, कार्यशालाओं, चर्चाओं और अनुभवात्मक कार्यक्रमों के माध्यम से, हम व्यक्तियों को आध्यात्मिक, सांस्कृतिक और दार्शनिक परंपराओं को सार्थक और व्यावहारिक तरीके से खोजने के अवसर बनाते हैं।',
    initiatives2: [
      'प्राचीन ज्ञान परंपराएँ',
      'ध्यान और चेतना अध्ययन',
      'पवित्र ग्रंथ और आध्यात्मिक दर्शन',
      'सांस्कृतिक विरासत और पारंपरिक ज्ञान',
      'नैतिक जीवन और आत्म-नियंत्रण',
      'व्यक्तिगत और नेतृत्व विकास',
    ],
    s4head: 'समुदाय के लिए स्थान',
    s4p1: 'मनुष्य जुड़ाव में फलते-फूलते हैं। एक सहायक समुदाय आत्म-अन्वेषण की यात्रा पर प्रोत्साहन, प्रेरणा और अपनेपन की भावना प्रदान करता है।',
    initiatives3: [
      'सम्मान और समावेशिता',
      'करुणा और सेवा',
      'परस्पर शिक्षा और समर्थन',
      'सांस्कृतिक प्रशंसा',
      'आध्यात्मिक विकास और जिम्मेदारी',
    ],
    quote: 'उद्देश्य के साथ अभ्यास करें। जिज्ञासा के साथ सीखें। समुदाय में बढ़ें।',
    s5head: 'सचेत जीवन की संस्कृति का निर्माण',
    s5p1: 'अभ्यास, शिक्षा और समुदाय के लिए स्थान बनाना अंततः एक ऐसी संस्कृति को बढ़ावा देने के बारे में है जहाँ बुद्धि केवल अध्ययन की बजाय जी जाती है। यह एक ऐसी जगह है जहाँ व्यक्ति अपनी क्षमता का पता लगा सकते हैं, सार्थक संबंध विकसित कर सकते हैं और समाज में सकारात्मक योगदान दे सकते हैं।',
    s5p2: 'चाहे आप अपनी यात्रा शुरू कर रहे हों या एक स्थापित अभ्यास को गहरा करने की कोशिश कर रहे हों, हमारा समुदाय उन सभी का स्वागत करता है जो ईमानदारी, उद्देश्य और समर्पण के साथ बढ़ने की आकांक्षा रखते हैं।',
    footer: 'Zero Balance Society · अभ्यास · शिक्षा · समुदाय',
  },
  fr: {
    label:     'Créer',
    titleLine1:'Un espace pour pratiquer,',
    titleLine2:'apprendre & se retrouver',
    lead: 'Un espace pour grandir, se relier et se transformer. La véritable sagesse s’épanouit lorsque chacun peut apprendre, pratiquer et grandir avec les autres dans un environnement bienveillant.',
    s1head: 'Notre engagement',
    s1p1: 'Chez Zero Balance Society, nous créons des espaces où l’exploration spirituelle, le développement personnel et les relations humaines profondes peuvent s’épanouir.',
    s1p2: 'Nous croyons que la transformation véritable ne vient pas seulement de la connaissance, mais d’une pratique régulière et de l’expérience partagée. En réunissant chercheurs, pratiquants, enseignants et bénévoles, nous faisons grandir une communauté vivante, fondée sur l’apprentissage, le service et la croissance intérieure.',
    s2head: 'Un espace pour pratiquer',
    s2p1: 'Les traditions spirituelles et méditatives prennent vie par la pratique régulière. Nous offrons à chacun la possibilité de s’engager dans des disciplines authentiques qui cultivent la connaissance de soi, la paix intérieure et une conscience plus élevée.',
    initiatives1: [
      'Séances de méditation et de pleine conscience',
      'Pratiques de yoga et de travail du souffle',
      'Kriya et disciplines contemplatives',
      'Retraites spirituelles et expériences immersives',
      'Rituels sacrés et rencontres de dévotion',
      'Programmes de développement personnel',
    ],
    s3head: 'Un espace pour apprendre',
    s3p1: 'L’apprentissage est au fondement de toute croissance. À travers des enseignements structurés, des ateliers, des discussions et des programmes expérientiels, nous créons des occasions d’explorer les traditions spirituelles, culturelles et philosophiques de manière concrète et porteuse de sens.',
    initiatives2: [
      'Traditions anciennes de sagesse',
      'Étude de la méditation et de la conscience',
      'Textes sacrés et philosophie spirituelle',
      'Patrimoine culturel et savoirs traditionnels',
      'Vie éthique et maîtrise de soi',
      'Développement personnel et leadership',
    ],
    s4head: 'Un espace pour la communauté',
    s4p1: 'L’être humain s’épanouit dans la relation. Une communauté bienveillante apporte encouragement, inspiration et sentiment d’appartenance sur le chemin de la découverte de soi.',
    initiatives3: [
      'Respect et ouverture à tous',
      'Compassion et service',
      'Apprentissage et soutien mutuels',
      'Appréciation des cultures',
      'Croissance spirituelle et responsabilité',
    ],
    quote: 'Pratiquer avec intention. Apprendre avec curiosité. Grandir ensemble.',
    s5head: 'Cultiver une culture de vie consciente',
    s5p1: 'Créer un espace pour pratiquer, apprendre et se retrouver, c’est avant tout cultiver une culture où la sagesse se vit plutôt qu’elle ne se contente d’être étudiée. C’est un lieu où chacun peut explorer son potentiel, créer des relations profondes et contribuer positivement à la société.',
    s5p2: 'Que vous commenciez votre chemin ou que vous souhaitiez approfondir une pratique déjà établie, notre communauté accueille toutes celles et ceux qui souhaitent avancer avec sincérité, sens et engagement.',
    footer: 'Zero Balance Society · Pratique · Apprentissage · Communauté',
  },
  es: {
    label:     'Crear',
    titleLine1:'Un espacio para practicar,',
    titleLine2:'aprender y compartir',
    lead: 'Un espacio para crecer, conectar y transformarse. La verdadera sabiduría florece cuando las personas pueden aprender, practicar y crecer juntas en un entorno de apoyo.',
    s1head: 'Nuestro compromiso',
    s1p1: 'En Zero Balance Society, creamos espacios donde la exploración espiritual, el desarrollo personal y las relaciones humanas significativas puedan crecer.',
    s1p2: 'Creemos que la verdadera transformación no surge solo del conocimiento, sino de la práctica constante y la experiencia compartida. Al reunir a personas que buscan, practicantes, maestros y voluntarios, construimos una comunidad viva basada en el aprendizaje, el servicio y el crecimiento interior.',
    s2head: 'Un espacio para practicar',
    s2p1: 'Las tradiciones espirituales y meditativas cobran vida a través de la práctica regular. Ofrecemos oportunidades para acercarse a disciplinas auténticas que cultivan el autoconocimiento, la paz interior y una conciencia superior.',
    initiatives1: [
      'Sesiones de meditación y atención plena',
      'Prácticas de yoga y trabajo con la respiración',
      'Kriya y disciplinas contemplativas',
      'Retiros espirituales y experiencias inmersivas',
      'Rituales sagrados y encuentros devocionales',
      'Programas de crecimiento y desarrollo personal',
    ],
    s3head: 'Un espacio para aprender',
    s3p1: 'El aprendizaje es la base del crecimiento. A través de enseñanzas estructuradas, talleres, conversaciones y programas experienciales, creamos oportunidades para explorar las tradiciones espirituales, culturales y filosóficas de una manera práctica y significativa.',
    initiatives2: [
      'Antiguas tradiciones de sabiduría',
      'Estudio de la meditación y la conciencia',
      'Textos sagrados y filosofía espiritual',
      'Patrimonio cultural y conocimiento tradicional',
      'Vida ética y dominio de uno mismo',
      'Desarrollo personal y liderazgo',
    ],
    s4head: 'Un espacio para la comunidad',
    s4p1: 'Las personas florecemos en conexión con los demás. Una comunidad que acompaña ofrece apoyo, inspiración y un sentido de pertenencia en el camino del autoconocimiento.',
    initiatives3: [
      'Respeto e inclusión',
      'Compasión y servicio',
      'Aprendizaje y apoyo mutuos',
      'Valoración de las culturas',
      'Crecimiento espiritual y responsabilidad',
    ],
    quote: 'Practica con propósito. Aprende con curiosidad. Crece en comunidad.',
    s5head: 'Construir una cultura de vida consciente',
    s5p1: 'Crear un espacio para practicar, aprender y compartir significa, en última instancia, cultivar una cultura en la que la sabiduría se vive en lugar de limitarse a ser estudiada. Es un lugar donde las personas pueden explorar su potencial, crear relaciones significativas y contribuir positivamente a la sociedad.',
    s5p2: 'Tanto si estás comenzando tu camino como si buscas profundizar en una práctica que ya forma parte de tu vida, nuestra comunidad acoge a todas las personas que desean crecer con sinceridad, propósito y dedicación.',
    footer: 'Zero Balance Society · Práctica · Aprendizaje · Comunidad',
  },
  de: {
    label:     'Schaffen',
    titleLine1:'Raum für Praxis,',
    titleLine2:'Lernen & Gemeinschaft',
    lead: 'Ein Raum für Wachstum, Verbindung und Veränderung. Wahre Weisheit entfaltet sich dort, wo Menschen gemeinsam lernen, praktizieren und wachsen können — in einer unterstützenden Umgebung.',
    s1head: 'Unser Engagement',
    s1p1: 'Bei Zero Balance Society schaffen wir Räume, in denen spirituelle Erkundung, persönliche Entwicklung und echte menschliche Verbindung wachsen können.',
    s1p2: 'Wir glauben, dass echte Veränderung nicht allein durch Wissen entsteht, sondern durch regelmäßige Praxis und gemeinsame Erfahrung. Indem wir Suchende, Praktizierende, Lehrer und Freiwillige zusammenbringen, schaffen wir eine lebendige Gemeinschaft, die auf Lernen, Dienst und innerem Wachstum beruht.',
    s2head: 'Raum für Praxis',
    s2p1: 'Spirituelle und meditative Traditionen werden durch regelmäßige Praxis lebendig. Wir bieten Möglichkeiten, sich auf authentische Wege einzulassen, die Selbsterkenntnis, inneren Frieden und höheres Bewusstsein fördern.',
    initiatives1: [
      'Meditations- und Achtsamkeitssitzungen',
      'Yoga- und Atemübungen',
      'Kriya und kontemplative Praxis',
      'Spirituelle Retreats und intensive Erfahrungen',
      'Heilige Rituale und Zusammenkünfte der Hingabe',
      'Programme für persönliches Wachstum und Entwicklung',
    ],
    s3head: 'Raum zum Lernen',
    s3p1: 'Lernen ist die Grundlage von Wachstum. Durch strukturierte Lehren, Workshops, Gespräche und erfahrungsorientierte Programme schaffen wir Möglichkeiten, spirituelle, kulturelle und philosophische Traditionen auf sinnvolle und praktische Weise zu erkunden.',
    initiatives2: [
      'Alte Weisheitstraditionen',
      'Meditation und Bewusstseinsforschung',
      'Heilige Schriften und spirituelle Philosophie',
      'Kulturelles Erbe und traditionelles Wissen',
      'Ethische Lebensführung und Selbstführung',
      'Persönliche Entwicklung und Führung',
    ],
    s4head: 'Raum für Gemeinschaft',
    s4p1: 'Menschen wachsen in Verbindung. Eine unterstützende Gemeinschaft gibt Ermutigung, Inspiration und ein Gefühl der Zugehörigkeit auf dem Weg der Selbsterkenntnis.',
    initiatives3: [
      'Respekt und Offenheit',
      'Mitgefühl und Dienst',
      'Gemeinsames Lernen und gegenseitige Unterstützung',
      'Wertschätzung kultureller Vielfalt',
      'Spirituelles Wachstum und Verantwortung',
    ],
    quote: 'Mit Sinn praktizieren. Mit Neugier lernen. In Gemeinschaft wachsen.',
    s5head: 'Eine Kultur des bewussten Lebens schaffen',
    s5p1: 'Raum für Praxis, Lernen und Gemeinschaft zu schaffen bedeutet letztlich, eine Kultur zu entwickeln, in der Weisheit gelebt wird, statt nur darüber zu lernen. Es ist ein Ort, an dem Menschen ihr Potenzial erkunden, bedeutungsvolle Beziehungen entwickeln und einen positiven Beitrag zur Gesellschaft leisten können.',
    s5p2: 'Ganz gleich, ob du deinen Weg gerade erst beginnst oder eine bestehende Praxis vertiefen möchtest – unsere Gemeinschaft heißt alle willkommen, die mit Aufrichtigkeit, Sinn und Hingabe wachsen möchten.',
    footer: 'Zero Balance Society · Praxis · Lernen · Gemeinschaft',
  },
} as const

export default function CommunityContent() {
  const { lang } = useLang()
  const c = lang === 'hi' ? CONTENT.hi : lang === 'cs' ? CONTENT.cs
    : lang === 'fr' ? CONTENT.fr : lang === 'es' ? CONTENT.es : lang === 'de' ? CONTENT.de
    : CONTENT.en

  return (
    <>
      <Navbar translucent />
      <main className={styles.page}>

        <div className={styles.hero}>
          <div className={styles.heroBg} style={{ backgroundImage: 'url(/images/create2.jpg)', transform: 'none' }} />
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
