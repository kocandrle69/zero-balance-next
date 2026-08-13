'use client'

import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import BackLink from '../../../components/BackLink'
import { useLang } from '../../../contexts/LangContext'
import styles from '../../../components/subpage.module.css'
import IMG from '../../../lib/images'

const CONTENT = {
  en: {
    label:     'Our Purpose',
    titleLine1:'Preserving',
    titleLine2:'Living Wisdom',
    lead: 'Keeping Ancient Knowledge Alive for Future Generations. In a rapidly changing world, timeless wisdom traditions offer guidance, balance, and deeper meaning.',
    s1head: 'Our Mission',
    s1p1: 'At Zero Balance Society, we are dedicated to preserving, promoting, and transmitting the living spiritual, cultural, and meditative heritage that has enriched humanity for centuries.',
    s1p2: 'Our mission is not merely to protect historical knowledge, but to ensure that these sacred traditions remain vibrant, relevant, and accessible to contemporary seekers. Through education, practice, research, and community engagement, we work to bridge ancient wisdom with modern life.',
    quote: 'We envision a world where spiritual wisdom is not confined to books or institutions but lived through daily practice, ethical conduct, self-awareness, and conscious living.',
    s2head: 'What We Preserve',
    sub1: 'Spiritual Traditions',
    p1: 'We support the preservation and transmission of authentic spiritual lineages, teachings, and practices that cultivate self-realization, compassion, and higher consciousness.',
    sub2: 'Meditative Sciences',
    p2: 'Meditation is one of humanity\'s greatest tools for inner growth. We promote traditional systems of meditation, breathwork, mindfulness, and contemplative disciplines that foster mental clarity, emotional balance, and spiritual awakening.',
    sub3: 'Cultural Heritage',
    p3: 'Sacred arts, rituals, festivals, philosophies, and traditional knowledge systems form an integral part of humanity\'s cultural heritage. We encourage their study, practice, and appreciation across generations and cultures.',
    sub4: 'Guru-Shishya Parampara',
    p4: 'The ancient tradition of wisdom being transmitted directly from teacher to student remains central to preserving authentic knowledge. We support this living tradition through education, mentorship, and experiential learning.',
    s3head: 'Our Initiatives',
    initiatives: [
      'Educational workshops and seminars',
      'Meditation and spiritual retreats',
      'Cultural and heritage preservation programs',
      'Research and documentation of traditional wisdom',
      'Translation and publication of sacred teachings',
      'Community outreach and awareness programs',
      'International cultural exchange and collaboration',
    ],
    s4head: 'Why It Matters',
    s4p1: 'Modern society has achieved remarkable technological progress, yet many people continue to seek inner peace, purpose, and connection. Ancient wisdom traditions offer practical tools for navigating life\'s challenges while fostering personal growth and collective well-being.',
    s4p2: 'By preserving these traditions today, we ensure that future generations inherit not only knowledge but also the wisdom to live meaningful, balanced, and conscious lives.',
    footer: 'Zero Balance Society · Preserving Living Wisdom',
  },
  cs: {
    label:     'Naše poslání',
    titleLine1:'Uchováváme',
    titleLine2:'Živou Moudrost',
    lead: 'Udržujeme pradávné poznání živým pro budoucí generace. Ve světě rychlých změn nabízejí nadčasové moudrosti vedení, rovnováhu a hlubší smysl.',
    s1head: 'Naše poslání',
    s1p1: 'Zero Balance Society se věnuje uchovávání, podpoře a předávání živého duchovního, kulturního a meditačního dědictví, které obohacuje lidstvo po celá staletí.',
    s1p2: 'Naším posláním není pouze chránit historické poznání, ale zajistit, aby tyto posvátné tradice zůstaly živé, relevantní a přístupné současným hledačům. Prostřednictvím vzdělávání, praxe, výzkumu a zapojení komunity překlenujeme pradávnou moudrost s moderním životem.',
    quote: 'Představujeme si svět, ve kterém duchovní moudrost není uzavřena v knihách nebo institucích, ale žije v každodenní praxi, etickém jednání, sebevědomí a vědomém životě.',
    s2head: 'Co uchováváme',
    sub1: 'Duchovní tradice',
    p1: 'Podporujeme zachování a předávání autentických duchovních linií, učení a praxí, které pěstují sebepoznání, soucit a vyšší vědomí.',
    sub2: 'Meditační vědy',
    p2: 'Meditace je jedním z největších nástrojů lidstva pro vnitřní rozvoj. Propagujeme tradiční systémy meditace, dechové práce, všímavosti a kontemplativních disciplín, které rozvíjejí mentální jasnost, emoční rovnováhu a duchovní probuzení.',
    sub3: 'Kulturní dědictví',
    p3: 'Posvátná umění, rituály, svátky, filosofie a tradiční systémy poznání tvoří nedílnou součást kulturního dědictví lidstva. Podporujeme jejich studium, praxi a ocenění napříč generacemi a kulturami.',
    sub4: 'Guru-Šišja Parampara',
    p4: 'Pradávná tradice přímého předávání moudrosti od učitele k žákovi zůstává ústřední pro zachování autentického poznání. Tuto živou tradici podporujeme prostřednictvím vzdělávání, mentorství a zkušenostního učení.',
    s3head: 'Naše iniciativy',
    initiatives: [
      'Vzdělávací workshopy a semináře',
      'Meditační a duchovní retreaty',
      'Programy kulturní a historické ochrany',
      'Výzkum a dokumentace tradiční moudrosti',
      'Překlad a vydávání posvátných učení',
      'Komunitní osvěta a informační programy',
      'Mezinárodní kulturní výměna a spolupráce',
    ],
    s4head: 'Proč na tom záleží',
    s4p1: 'Moderní společnost dosáhla pozoruhodného technologického pokroku, přesto mnoho lidí nadále hledá vnitřní mír, smysl a propojení. Pradávné moudrosti nabízejí praktické nástroje pro zvládání životních výzev a rozvoj osobního a kolektivního blaha.',
    s4p2: 'Tím, že tyto tradice dnes uchováváme, zajišťujeme, aby budoucí generace zdědily nejen poznání, ale také moudrost pro smysluplný, vyvážený a vědomý život.',
    footer: 'Zero Balance Society · Živá moudrost',
  },
  hi: {
    label:     'हमारा उद्देश्य',
    titleLine1:'जीवित ज्ञान का',
    titleLine2:'संरक्षण',
    lead: 'भावी पीढ़ियों के लिए प्राचीन ज्ञान को जीवित रखना। तेजी से बदलती दुनिया में, कालजयी ज्ञान परंपराएँ मार्गदर्शन, संतुलन और गहरा अर्थ प्रदान करती हैं।',
    s1head: 'हमारा मिशन',
    s1p1: 'Zero Balance Society आध्यात्मिक, सांस्कृतिक और ध्यान विरासत को संरक्षित करने, बढ़ावा देने और प्रसारित करने के लिए समर्पित है जो सदियों से मानवता को समृद्ध करती आई है।',
    s1p2: 'हमारा मिशन केवल ऐतिहासिक ज्ञान की रक्षा करना नहीं है, बल्कि यह सुनिश्चित करना है कि ये पवित्र परंपराएँ समकालीन साधकों के लिए जीवंत, प्रासंगिक और सुलभ बनी रहें। शिक्षा, अभ्यास, अनुसंधान और सामुदायिक भागीदारी के माध्यम से, हम प्राचीन बुद्धि को आधुनिक जीवन से जोड़ने का काम करते हैं।',
    quote: 'हम एक ऐसी दुनिया की कल्पना करते हैं जहाँ आध्यात्मिक बुद्धि किताबों या संस्थाओं तक सीमित नहीं है, बल्कि दैनिक अभ्यास, नैतिक आचरण, आत्म-जागरूकता और सचेत जीवन के माध्यम से जी जाती है।',
    s2head: 'हम क्या संरक्षित करते हैं',
    sub1: 'आध्यात्मिक परंपराएँ',
    p1: 'हम प्रामाणिक आध्यात्मिक परंपराओं, शिक्षाओं और अभ्यासों के संरक्षण और प्रसार का समर्थन करते हैं जो आत्म-साक्षात्कार, करुणा और उच्च चेतना विकसित करती हैं।',
    sub2: 'ध्यान विज्ञान',
    p2: 'ध्यान मानवता के आंतरिक विकास के सबसे महान साधनों में से एक है। हम ध्यान की पारंपरिक प्रणालियों, प्राणायाम, माइंडफुलनेस और चिंतन अनुशासनों को बढ़ावा देते हैं जो मानसिक स्पष्टता, भावनात्मक संतुलन और आध्यात्मिक जागरण को विकसित करते हैं।',
    sub3: 'सांस्कृतिक विरासत',
    p3: 'पवित्र कलाएँ, अनुष्ठान, त्योहार, दर्शन और पारंपरिक ज्ञान प्रणालियाँ मानवता की सांस्कृतिक विरासत का एक अभिन्न हिस्सा हैं। हम पीढ़ियों और संस्कृतियों में उनके अध्ययन, अभ्यास और प्रशंसा को प्रोत्साहित करते हैं।',
    sub4: 'गुरु-शिष्य परंपरा',
    p4: 'शिक्षक से सीधे छात्र को बुद्धि प्रसारित करने की प्राचीन परंपरा प्रामाणिक ज्ञान के संरक्षण के केंद्र में बनी हुई है। हम शिक्षा, मेंटरशिप और अनुभवात्मक शिक्षण के माध्यम से इस जीवित परंपरा का समर्थन करते हैं।',
    s3head: 'हमारी पहल',
    initiatives: [
      'शैक्षिक कार्यशालाएँ और संगोष्ठियाँ',
      'ध्यान और आध्यात्मिक रिट्रीट',
      'सांस्कृतिक और विरासत संरक्षण कार्यक्रम',
      'पारंपरिक बुद्धि का शोध और दस्तावेज़ीकरण',
      'पवित्र शिक्षाओं का अनुवाद और प्रकाशन',
      'सामुदायिक आउटरीच और जागरूकता कार्यक्रम',
      'अंतर्राष्ट्रीय सांस्कृतिक आदान-प्रदान और सहयोग',
    ],
    s4head: 'यह क्यों मायने रखता है',
    s4p1: 'आधुनिक समाज ने उल्लेखनीय तकनीकी प्रगति हासिल की है, फिर भी कई लोग आंतरिक शांति, उद्देश्य और जुड़ाव की खोज जारी रखते हैं। प्राचीन ज्ञान परंपराएँ व्यक्तिगत विकास और सामूहिक कल्याण को बढ़ावा देते हुए जीवन की चुनौतियों से निपटने के व्यावहारिक साधन प्रदान करती हैं।',
    s4p2: 'इन परंपराओं को आज संरक्षित करके, हम सुनिश्चित करते हैं कि भावी पीढ़ियाँ न केवल ज्ञान, बल्कि सार्थक, संतुलित और सचेत जीवन जीने की बुद्धि भी विरासत में पाएँ।',
    footer: 'Zero Balance Society · जीवित ज्ञान का संरक्षण',
  },
  fr: {
    label:     'Notre raison d’être',
    titleLine1:'Préserver',
    titleLine2:'la sagesse vivante',
    lead: 'Faire vivre les connaissances anciennes pour les générations futures. Dans un monde en rapide évolution, les traditions de sagesse intemporelles offrent orientation, équilibre et profondeur de sens.',
    s1head: 'Notre mission',
    s1p1: 'Chez Zero Balance Society, nous nous consacrons à préserver, promouvoir et transmettre le patrimoine spirituel, culturel et méditatif vivant qui enrichit l’humanité depuis des siècles.',
    s1p2: 'Notre mission ne consiste pas simplement à protéger un savoir historique, mais à faire en sorte que ces traditions sacrées restent vivantes, pertinentes et accessibles aux chercheurs contemporains. Par l’éducation, la pratique, la recherche et l’engagement communautaire, nous cherchons à faire dialoguer la sagesse ancienne avec la vie moderne.',
    quote: 'Nous aspirons à un monde où la sagesse spirituelle ne reste pas confinée aux livres ou aux institutions, mais se vit dans la pratique quotidienne, une conduite éthique, la connaissance de soi et une vie consciente.',
    s2head: 'Ce que nous préservons',
    sub1: 'Traditions spirituelles',
    p1: 'Nous soutenons la préservation et la transmission de lignées, d’enseignements et de pratiques spirituelles authentiques qui favorisent la réalisation de soi, la compassion et une conscience plus élevée.',
    sub2: 'Sciences méditatives',
    p2: 'La méditation est l’un des plus grands outils dont dispose l’humanité pour grandir intérieurement. Nous faisons connaître les systèmes traditionnels de méditation, le travail du souffle, la pleine conscience et les disciplines contemplatives qui favorisent la clarté mentale, l’équilibre émotionnel et l’éveil spirituel.',
    sub3: 'Patrimoine culturel',
    p3: 'Les arts sacrés, les rituels, les fêtes, les philosophies et les systèmes traditionnels de connaissance constituent une part essentielle du patrimoine culturel de l’humanité. Nous encourageons leur étude, leur pratique et leur transmission entre générations et entre cultures.',
    sub4: 'Guru-Shishya Parampara',
    p4: 'L’ancienne tradition de transmission directe de la sagesse du maître à l’élève reste essentielle à la préservation d’un savoir authentique. Nous soutenons cette tradition vivante par l’éducation, le mentorat et l’apprentissage par l’expérience.',
    s3head: 'Nos initiatives',
    initiatives: [
      'Ateliers et séminaires éducatifs',
      'Retraites de méditation et retraites spirituelles',
      'Programmes de préservation du patrimoine culturel',
      'Recherche et documentation des sagesses traditionnelles',
      'Traduction et publication d’enseignements sacrés',
      'Actions de proximité et programmes de sensibilisation',
      'Échanges et collaborations culturels internationaux',
    ],
    s4head: 'Pourquoi cela compte',
    s4p1: 'La société moderne a connu des progrès technologiques remarquables, mais nombreux sont ceux qui continuent à chercher paix intérieure, sens et lien avec les autres. Les traditions de sagesse anciennes offrent des outils concrets pour traverser les défis de la vie tout en favorisant l’épanouissement personnel et le bien-être collectif.',
    s4p2: 'En préservant ces traditions aujourd’hui, nous veillons à ce que les générations futures reçoivent non seulement des connaissances, mais aussi la sagesse nécessaire pour mener une vie riche de sens, équilibrée et consciente.',
    footer: 'Zero Balance Society · Préserver la sagesse vivante',
  },
  es: {
    label:     'Nuestro propósito',
    titleLine1:'Preservar',
    titleLine2:'la sabiduría viva',
    lead: 'Mantener vivo el conocimiento ancestral para las generaciones futuras. En un mundo que cambia rápidamente, las tradiciones atemporales de sabiduría ofrecen orientación, equilibrio y un sentido más profundo.',
    s1head: 'Nuestra misión',
    s1p1: 'En Zero Balance Society, nos dedicamos a preservar, promover y transmitir el patrimonio espiritual, cultural y meditativo vivo que ha enriquecido a la humanidad durante siglos.',
    s1p2: 'Nuestra misión no consiste simplemente en proteger un conocimiento histórico, sino en asegurar que estas tradiciones sagradas sigan vivas, sean relevantes y estén al alcance de quienes buscan hoy. A través de la educación, la práctica, la investigación y la participación comunitaria, tendemos un puente entre la sabiduría ancestral y la vida moderna.',
    quote: 'Imaginamos un mundo en el que la sabiduría espiritual no esté confinada a los libros o las instituciones, sino que se viva a través de la práctica diaria, una conducta ética, el conocimiento de uno mismo y una vida consciente.',
    s2head: 'Lo que preservamos',
    sub1: 'Tradiciones espirituales',
    p1: 'Apoyamos la preservación y transmisión de linajes, enseñanzas y prácticas espirituales auténticas que cultivan la autorrealización, la compasión y una conciencia superior.',
    sub2: 'Ciencias de la meditación',
    p2: 'La meditación es una de las grandes herramientas de la humanidad para el crecimiento interior. Promovemos sistemas tradicionales de meditación, trabajo con la respiración, atención plena y disciplinas contemplativas que favorecen la claridad mental, el equilibrio emocional y el despertar espiritual.',
    sub3: 'Patrimonio cultural',
    p3: 'Las artes sagradas, los rituales, las festividades, las filosofías y los sistemas tradicionales de conocimiento forman parte esencial del patrimonio cultural de la humanidad. Fomentamos su estudio, práctica y valoración entre generaciones y culturas.',
    sub4: 'Guru-Shishya Parampara',
    p4: 'La antigua tradición de transmitir el conocimiento directamente del maestro al discípulo sigue siendo fundamental para preservar un saber auténtico. Apoyamos esta tradición viva mediante la educación, la mentoría y el aprendizaje basado en la experiencia.',
    s3head: 'Nuestras iniciativas',
    initiatives: [
      'Talleres y seminarios educativos',
      'Retiros de meditación y retiros espirituales',
      'Programas de preservación del patrimonio cultural',
      'Investigación y documentación de la sabiduría tradicional',
      'Traducción y publicación de enseñanzas sagradas',
      'Programas de acercamiento y sensibilización comunitaria',
      'Intercambio y colaboración cultural internacional',
    ],
    s4head: 'Por qué importa',
    s4p1: 'La sociedad moderna ha alcanzado un progreso tecnológico extraordinario, pero muchas personas siguen buscando paz interior, propósito y conexión. Las antiguas tradiciones de sabiduría ofrecen herramientas prácticas para afrontar los desafíos de la vida, al tiempo que favorecen el crecimiento personal y el bienestar colectivo.',
    s4p2: 'Al preservar estas tradiciones hoy, nos aseguramos de que las generaciones futuras hereden no solo conocimientos, sino también la sabiduría necesaria para vivir vidas significativas, equilibradas y conscientes.',
    footer: 'Zero Balance Society · Preservar la sabiduría viva',
  },
  de: {
    label:     'Unser Anliegen',
    titleLine1:'Bewahren',
    titleLine2:'lebendiger Weisheit',
    lead: 'Altes Wissen für kommende Generationen lebendig halten. In einer Welt, die sich schnell verändert, geben zeitlose Weisheitstraditionen Orientierung, Gleichgewicht und eine tiefere Bedeutung.',
    s1head: 'Unsere Mission',
    s1p1: 'Bei Zero Balance Society setzen wir uns dafür ein, das lebendige spirituelle, kulturelle und meditative Erbe zu bewahren, zu fördern und weiterzugeben, das die Menschheit seit Jahrhunderten bereichert.',
    s1p2: 'Unsere Mission besteht nicht nur darin, historisches Wissen zu schützen, sondern dafür zu sorgen, dass diese heiligen Traditionen lebendig, relevant und für Menschen auf ihrem heutigen Weg zugänglich bleiben. Durch Bildung, Praxis, Forschung und gemeinschaftliches Engagement verbinden wir altes Wissen mit dem modernen Leben.',
    quote: 'Wir wünschen uns eine Welt, in der spirituelle Weisheit nicht auf Bücher oder Institutionen beschränkt bleibt, sondern durch tägliche Praxis, ethisches Handeln, Selbsterkenntnis und ein bewusstes Leben erfahren wird.',
    s2head: 'Was wir bewahren',
    sub1: 'Spirituelle Traditionen',
    p1: 'Wir unterstützen die Bewahrung und Weitergabe authentischer spiritueller Linien, Lehren und Praktiken, die Selbsterkenntnis, Mitgefühl und höheres Bewusstsein fördern.',
    sub2: 'Meditative Wissenschaften',
    p2: 'Meditation gehört zu den größten Möglichkeiten des Menschen für inneres Wachstum. Wir fördern traditionelle Systeme der Meditation, Atemarbeit, Achtsamkeit und kontemplative Übungen, die geistige Klarheit, emotionales Gleichgewicht und spirituelles Erwachen unterstützen.',
    sub3: 'Kulturelles Erbe',
    p3: 'Heilige Künste, Rituale, Feste, Philosophien und traditionelle Wissenssysteme sind ein wesentlicher Teil des kulturellen Erbes der Menschheit. Wir fördern ihre Erforschung, Praxis und Wertschätzung über Generationen und Kulturen hinweg.',
    sub4: 'Guru-Shishya Parampara',
    p4: 'Die alte Tradition, Weisheit direkt vom Lehrer an den Schüler weiterzugeben, bleibt zentral für die Bewahrung authentischen Wissens. Wir unterstützen diese lebendige Tradition durch Bildung, Mentoring und Lernen aus eigener Erfahrung.',
    s3head: 'Unsere Initiativen',
    initiatives: [
      'Bildungsworkshops und Seminare',
      'Meditations- und spirituelle Retreats',
      'Programme zur Bewahrung des kulturellen Erbes',
      'Forschung und Dokumentation traditioneller Weisheit',
      'Übersetzung und Veröffentlichung heiliger Lehren',
      'Programme für Gemeinschaft und Bewusstseinsbildung',
      'Internationaler kultureller Austausch und Zusammenarbeit',
    ],
    s4head: 'Warum es wichtig ist',
    s4p1: 'Die moderne Gesellschaft hat bemerkenswerte technologische Fortschritte gemacht, und doch suchen viele Menschen weiterhin nach innerem Frieden, Sinn und Verbundenheit. Alte Weisheitstraditionen bieten praktische Wege, mit den Herausforderungen des Lebens umzugehen und zugleich persönliches Wachstum und gemeinschaftliches Wohlergehen zu fördern.',
    s4p2: 'Indem wir diese Traditionen heute bewahren, stellen wir sicher, dass kommende Generationen nicht nur Wissen erben, sondern auch die Weisheit, ein sinnvolles, ausgeglichenes und bewusstes Leben zu führen.',
    footer: 'Zero Balance Society · Lebendige Weisheit bewahren',
  },
} as const

export default function PreserveContent() {
  const { lang } = useLang()
  const c = lang === 'hi' ? CONTENT.hi : lang === 'cs' ? CONTENT.cs
    : lang === 'fr' ? CONTENT.fr : lang === 'es' ? CONTENT.es : lang === 'de' ? CONTENT.de
    : CONTENT.en

  return (
    <>
      <Navbar translucent />
      <main className={styles.page}>

        <div className={styles.hero}>
          <div className={styles.heroBg} style={{ backgroundImage: 'url(/images/preserve2.jpg)', transform: 'none' }} />
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

          <blockquote className={styles.pullquote}>{c.quote}</blockquote>

          <section className={styles.section}>
            <h2 className={styles.sectionHead}>{c.s2head}</h2>
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
            <h2 className={styles.sectionHead}>{c.s3head}</h2>
            <ul className={styles.initList}>
              {c.initiatives.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
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
