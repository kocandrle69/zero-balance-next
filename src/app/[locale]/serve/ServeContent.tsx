'use client'

import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import BackLink from '../../../components/BackLink'
import { useLang } from '../../../contexts/LangContext'
import styles from '../../../components/subpage.module.css'
import IMG from '../../../lib/images'

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
  hi: {
    label:     'सेवा',
    titleLine1:'सेवा को समर्पित,',
    titleLine2:'वाणिज्यिक लाभ को नहीं',
    lead: 'Zero Balance Society में, सेवा हर काम के केंद्र में है। एक अलाभकारी सांस्कृतिक और आध्यात्मिक संस्था के रूप में, हमारा उद्देश्य लाभ उत्पन्न करना नहीं है, बल्कि सीखने, व्यक्तिगत विकास, सांस्कृतिक संरक्षण और समुदायिक कल्याण के लिए अवसर बनाना है।',
    s1head: 'हमारी प्रतिबद्धता',
    s1p1: 'हम मानते हैं कि बुद्धि, शिक्षा और आध्यात्मिक विकास उदारता और जिम्मेदारी की भावना से साझा किए जाने चाहिए। हम जो भी पहल करते हैं, वह मानवता की सेवा करने और भावी पीढ़ियों के लिए मूल्यवान परंपराओं को संरक्षित करने के सिद्धांत द्वारा निर्देशित होती है।',
    s1p2: 'सभी संसाधन, कार्यक्रम और गतिविधियाँ हमारे धर्मार्थ, शैक्षिक, सांस्कृतिक और आध्यात्मिक उद्देश्यों को आगे बढ़ाने के लिए डिज़ाइन की गई हैं। दान, सदस्यता, कार्यक्रमों या योगदान के माध्यम से प्राप्त कोई भी धनराशि संस्था के मिशन और गतिविधियों में पुनः निवेश की जाती है।',
    s2head: 'यह प्रतिबद्धता हमें सक्षम बनाती है',
    initiatives: [
      'आध्यात्मिक, सांस्कृतिक और ध्यान परंपराओं को बढ़ावा देना',
      'शैक्षिक कार्यशालाएँ और सामुदायिक कार्यक्रम आयोजित करना',
      'सांस्कृतिक संरक्षण परियोजनाओं का समर्थन करना',
      'रिट्रीट, संगोष्ठियाँ और सीखने के अवसर उपलब्ध कराना',
      'साधकों और समुदायों को लाभान्वित करने वाले संसाधन विकसित करना',
      'अंतर्राष्ट्रीय सहयोग और सांस्कृतिक आदान-प्रदान को बढ़ावा देना',
    ],
    quote: 'उद्देश्य के साथ सेवा। करुणा के साथ देना। लाभ से परे प्रभाव बनाना।',
    s3head: 'सेवा की भावना से निर्देशित',
    s3p1: 'सेवा की भारतीय परंपरा — निस्वार्थ सेवा — सिखाती है कि सार्थक योगदान व्यक्तिगत पुरस्कार की अपेक्षा के बिना किया जाता है। इस सिद्धांत से प्रेरित होकर, हमारे स्वयंसेवक, शिक्षक, अभ्यासकर्ता और समर्थक मिलकर सकारात्मक प्रभाव बनाने और व्यक्तियों और समुदायों के विकास का समर्थन करने के लिए काम करते हैं।',
    s3p2: 'सेवा व्यक्तिगत परिवर्तन का एक पथ बन जाती है, जो करुणा, जिम्मेदारी, विनम्रता और सामूहिक कल्याण को प्रोत्साहित करती है।',
    s4head: 'पारदर्शिता और जवाबदेही',
    s4p1: 'एक अलाभकारी संस्था के रूप में, हम पारदर्शिता, नैतिक शासन और संसाधनों के जिम्मेदार प्रबंधन के लिए प्रतिबद्ध हैं। प्रत्येक योगदान उन कार्यक्रमों को मजबूत करने में मदद करता है जो जीवित बुद्धि को संरक्षित करते हैं, शैक्षिक पहलों का समर्थन करते हैं और उच्च मूल्यों के प्रति समर्पित एक समृद्ध समुदाय का निर्माण करते हैं।',
    s4p2: 'हमारी सफलता वित्तीय लाभ से नहीं बल्कि लोगों के जीवन में हम जो सकारात्मक अंतर लाते हैं उससे मापी जाती है। हम ज्ञान, अभ्यास, सांस्कृतिक समझ और आध्यात्मिक विकास के माध्यम से व्यक्तियों को सशक्त बनाने का प्रयास करते हैं, साथ ही एकता और साझे उद्देश्य की भावना को बढ़ावा देते हैं।',
    footer: 'Zero Balance Society · अलाभकारी सेवा',
  },
  fr: {
    label:     'Servir',
    titleLine1:'Au service de l’humain,',
    titleLine2:'pas du profit',
    lead: 'Chez Zero Balance Society, le service est au cœur de tout ce que nous faisons. En tant qu’association culturelle et spirituelle à but non lucratif, notre objectif n’est pas de générer des profits, mais de créer des possibilités d’apprentissage, d’épanouissement personnel, de préservation culturelle et de bien-être collectif.',
    s1head: 'Notre engagement',
    s1p1: 'Nous croyons que la sagesse, l’éducation et le développement spirituel doivent être partagés dans un esprit de générosité et de responsabilité. Chaque initiative que nous entreprenons est guidée par le principe de servir l’humanité et de préserver des traditions précieuses pour les générations futures.',
    s1p2: 'Toutes nos ressources, tous nos programmes et toutes nos activités sont conçus pour faire avancer nos objectifs caritatifs, éducatifs, culturels et spirituels. Les fonds reçus par les dons, les adhésions, les événements ou les contributions sont réinvestis dans la mission et les activités de l’association.',
    s2head: 'Cet engagement nous permet de',
    initiatives: [
      'Faire vivre les traditions spirituelles, culturelles et méditatives',
      'Organiser des ateliers éducatifs et des programmes communautaires',
      'Soutenir des projets de préservation culturelle',
      'Faciliter des retraites, séminaires et occasions d’apprentissage',
      'Développer des ressources utiles aux chercheurs et aux communautés',
      'Favoriser la collaboration internationale et les échanges culturels',
    ],
    quote: 'Servir avec intention. Donner avec compassion. Créer un impact au-delà du profit.',
    s3head: 'Guidés par l’esprit de Seva',
    s3p1: 'La tradition indienne de Seva — le service désintéressé — enseigne qu’une contribution véritable prend tout son sens lorsqu’elle est offerte sans attente de récompense personnelle. Inspirés par ce principe, nos bénévoles, enseignants, pratiquants et soutiens travaillent ensemble pour créer un impact positif et soutenir l’épanouissement des individus et des communautés.',
    s3p2: 'Le service devient ainsi une voie de transformation personnelle, qui nourrit la compassion, la responsabilité, l’humilité et le bien-être collectif.',
    s4head: 'Transparence et responsabilité',
    s4p1: 'En tant qu’organisation à but non lucratif, nous nous engageons à agir avec transparence, selon une gouvernance éthique et une gestion responsable de nos ressources. Chaque contribution renforce des programmes qui préservent la sagesse vivante, soutiennent les initiatives éducatives et font grandir une communauté attachée à des valeurs profondes.',
    s4p2: 'Notre réussite ne se mesure pas au profit financier, mais à la différence positive que nous pouvons faire dans la vie des personnes. Nous cherchons à donner à chacun les moyens de grandir par la connaissance, la pratique, la compréhension culturelle et le développement spirituel, tout en cultivant un sentiment d’unité et de responsabilité partagée.',
    footer: 'Zero Balance Society · Au service, sans but lucratif',
  },
  es: {
    label:     'Servir',
    titleLine1:'Dedicados al servicio,',
    titleLine2:'no al beneficio económico',
    lead: 'En Zero Balance Society, el servicio está en el corazón de todo lo que hacemos. Como asociación cultural y espiritual sin ánimo de lucro, nuestro propósito no es generar beneficios, sino crear oportunidades de aprendizaje, crecimiento personal, preservación cultural y bienestar de la comunidad.',
    s1head: 'Nuestro compromiso',
    s1p1: 'Creemos que la sabiduría, la educación y el desarrollo espiritual deben compartirse con generosidad y responsabilidad. Cada iniciativa que emprendemos se guía por el principio de servir a la humanidad y preservar tradiciones valiosas para las generaciones futuras.',
    s1p2: 'Todos nuestros recursos, programas y actividades están orientados a nuestros objetivos benéficos, educativos, culturales y espirituales. Los fondos recibidos mediante donaciones, membresías, eventos o aportaciones se reinvierten en la misión y las actividades de la asociación.',
    s2head: 'Este compromiso nos permite',
    initiatives: [
      'Promover las tradiciones espirituales, culturales y meditativas',
      'Organizar talleres educativos y programas comunitarios',
      'Apoyar proyectos de preservación cultural',
      'Facilitar retiros, seminarios y oportunidades de aprendizaje',
      'Desarrollar recursos que beneficien a quienes buscan y a las comunidades',
      'Fomentar la colaboración internacional y el intercambio cultural',
    ],
    quote: 'Servir con propósito. Dar con compasión. Crear un impacto que va más allá del beneficio.',
    s3head: 'Guiados por el espíritu de Seva',
    s3p1: 'La tradición india de Seva — el servicio desinteresado — enseña que una contribución verdaderamente significativa nace sin esperar una recompensa personal. Inspirados por este principio, nuestros voluntarios, maestros, practicantes y colaboradores trabajan juntos para generar un impacto positivo y apoyar el crecimiento de las personas y las comunidades.',
    s3p2: 'El servicio se convierte así en un camino de transformación personal que cultiva la compasión, la responsabilidad, la humildad y el bienestar colectivo.',
    s4head: 'Transparencia y responsabilidad',
    s4p1: 'Como organización sin ánimo de lucro, nos comprometemos con la transparencia, una gestión ética y un uso responsable de nuestros recursos. Cada aportación ayuda a fortalecer programas que preservan la sabiduría viva, apoyan iniciativas educativas y construyen una comunidad comprometida con valores elevados.',
    s4p2: 'Nuestro éxito no se mide por el beneficio económico, sino por la diferencia positiva que aportamos a la vida de las personas. Buscamos fortalecer a cada individuo mediante el conocimiento, la práctica, la comprensión cultural y el crecimiento espiritual, al tiempo que cultivamos un sentido de unidad y propósito compartido.',
    footer: 'Zero Balance Society · Servir sin ánimo de lucro',
  },
  de: {
    label:     'Dienen',
    titleLine1:'Dem Dienst verpflichtet,',
    titleLine2:'nicht dem Gewinn',
    lead: 'Bei Zero Balance Society steht der Dienst am Menschen im Mittelpunkt unseres Handelns. Als gemeinnützige kulturelle und spirituelle Organisation geht es uns nicht darum, Gewinn zu erzielen, sondern Möglichkeiten für Lernen, persönliche Entwicklung, kulturelle Bewahrung und gemeinschaftliches Wohlergehen zu schaffen.',
    s1head: 'Unser Engagement',
    s1p1: 'Wir sind überzeugt, dass Wissen, Bildung und spirituelle Entwicklung in einem Geist der Großzügigkeit und Verantwortung geteilt werden sollten. Jede Initiative, die wir ergreifen, folgt dem Grundsatz, der Menschheit zu dienen und wertvolle Traditionen für kommende Generationen zu bewahren.',
    s1p2: 'Alle unsere Ressourcen, Programme und Aktivitäten dienen unseren gemeinnützigen, Bildungs-, kulturellen und spirituellen Zielen. Mittel aus Spenden, Mitgliedsbeiträgen, Veranstaltungen oder sonstigen Zuwendungen fließen zurück in die Mission und Aktivitäten des Vereins.',
    s2head: 'Dieses Engagement ermöglicht uns',
    initiatives: [
      'Spirituelle, kulturelle und meditative Traditionen zu fördern',
      'Bildungsangebote und Programme für die Gemeinschaft zu organisieren',
      'Projekte zur Bewahrung kulturellen Erbes zu unterstützen',
      'Retreats, Seminare und Lernmöglichkeiten zu ermöglichen',
      'Ressourcen zu entwickeln, die Suchenden und Gemeinschaften zugutekommen',
      'Internationale Zusammenarbeit und kulturellen Austausch zu fördern',
    ],
    quote: 'Mit Sinn dienen. Mit Mitgefühl geben. Wirkung schaffen, die über Gewinn hinausgeht.',
    s3head: 'Vom Geist der Seva getragen',
    s3p1: 'Die indische Tradition der Seva — des selbstlosen Dienens — lehrt, dass ein sinnvoller Beitrag ohne Erwartung persönlicher Belohnung geleistet wird. Inspiriert von diesem Prinzip arbeiten unsere Freiwilligen, Lehrer, Praktizierenden und Unterstützer gemeinsam daran, positive Wirkung zu entfalten und die Entwicklung von Menschen und Gemeinschaften zu fördern.',
    s3p2: 'Dienst wird so zu einem Weg persönlicher Transformation und fördert Mitgefühl, Verantwortung, Demut und gemeinschaftliches Wohlergehen.',
    s4head: 'Transparenz und Verantwortung',
    s4p1: 'Als gemeinnützige Organisation verpflichten wir uns zu Transparenz, ethischer Führung und einem verantwortungsvollen Umgang mit unseren Ressourcen. Jeder Beitrag stärkt Programme, die lebendige Weisheit bewahren, Bildungsinitiativen unterstützen und eine Gemeinschaft aufbauen, die sich höheren Werten verpflichtet fühlt.',
    s4p2: 'Unser Erfolg misst sich nicht am finanziellen Gewinn, sondern an der positiven Veränderung, die wir im Leben von Menschen bewirken. Wir möchten Menschen durch Wissen, Praxis, kulturelles Verständnis und spirituelles Wachstum stärken und zugleich ein Gefühl von Einheit und gemeinsamem Sinn fördern.',
    footer: 'Zero Balance Society · Dienen ohne Gewinnstreben',
  },
} as const

export default function ServeContent() {
  const { lang } = useLang()
  const c = lang === 'hi' ? CONTENT.hi : lang === 'cs' ? CONTENT.cs
    : lang === 'fr' ? CONTENT.fr : lang === 'es' ? CONTENT.es : lang === 'de' ? CONTENT.de
    : CONTENT.en

  return (
    <>
      <Navbar translucent />
      <main className={styles.page}>

        <div className={styles.hero}>
          <div className={styles.heroBg} style={{ backgroundImage: 'url(/images/serve.jpg)' }} />
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
