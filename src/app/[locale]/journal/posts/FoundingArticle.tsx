'use client'

import Image from 'next/image'
import styles from '../journal.module.css'
import type { PostLang } from '../posts'

/** Článek existuje v cs/en/hi/fr/es/de. */
function toArticleLang(lang: PostLang): 'cs' | 'en' | 'hi' | 'fr' | 'es' | 'de' {
  const valid: readonly PostLang[] = ['cs', 'en', 'hi', 'fr', 'es', 'de']
  return (valid as readonly string[]).includes(lang) ? (lang as 'cs' | 'en' | 'hi' | 'fr' | 'es' | 'de') : 'en'
}

const CONTENT = {
  cs: {
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
      19. června 2026 v Krakovanech. Orgány spolku tvoří členská schůze
      a předseda. Statutárním zástupcem spolku je předseda, který je
      oprávněn jednat jménem spolku samostatně.`,

    members: [
      { role: 'Čestný předseda spolku', name: 'Sensei Rajeev Sinha, PhD', bio: 'Čestný předseda Zero Balance Society, jogínský mistr a učitel Tantra Kriya Yogy s žáky po celém světě. Členy spolku již více než dvacet let osobně vede v praxi původní indické duchovní tradice.', photo: '/images/Sensei4.jpg', imgPos: 'center 15%', email: 'senseirajeev@icloud.com' },
      { role: 'Předseda spolku', name: 'Jan Kočandrle', bio: 'Zakladatel a předseda Zero Balance Society. Podílí se na rozvoji činnosti spolku, jeho kulturní misi a na vytváření prostoru pro setkávání, studium a sdílení indických duchovních tradic.', photo: '/images/Jan_ashram.jpg', imgPos: 'center 20%', email: 'jan@zero-balance.org' },
      { role: 'Místopředseda spolku', name: 'PhDr. Jiří Kočandrle', bio: 'Místopředseda Zero Balance Society. Věnuje se komunikaci, vztahům s veřejností a rozvoji kulturní mise spolku. Podílí se na předávání jogínské praxe a podpoře studia indických duchovních tradic.', photo: '/images/Jirka_ashram.jpg', imgPos: 'center 20%', email: 'jiri@zero-balance.org' },
      { role: 'Místopředseda spolku', name: 'Ing. František Filouš', bio: 'Místopředseda spolku. Věnuje se legislativním a technickým záležitostem a podílí se na praktickém fungování Zero Balance Society.', photo: '/images/Franta_ashram.jpg', imgPos: 'center 20%' },
      { role: 'Spoluzakládající členka', name: 'Pavlína Muchová', bio: 'Spoluzakládající členka Zero Balance Society. Do činnosti spolku přináší cit pro krásu, tvořivost a výtvarné vnímání; věnuje se malbě a podporuje kulturní a umělecký rozměr našich aktivit.', photo: '/images/Pavlina_ashram.jpg', imgPos: 'center 20%' },
      { role: 'Spoluzakládající člen', name: 'Pavel Znamenáček', bio: 'Spoluzakládající člen Zero Balance Society. Vynikající karatista a trenér, který se více než 30 let věnuje práci s mládeží a vede úspěšný oddíl karate. Právě díky jeho oddílu se zakladatelé spolku před více než 20 lety poprvé setkali se Senseiem Rajeevem Sinhou. Ve spolku se podílí především na organizačních a technických záležitostech.', photo: '/images/Pavel_ashram.jpg', imgPos: 'center 20%' },
    ],

    s4Head: 'Sídlo a registrace',
    s4p1: <>Zero Balance Society z.s. je registrován v České republice jako
      zapsaný spolek podle zákona č. 89/2012 Sb., občanského zákoníku.<br />
      Sídlo spolku: <strong>Krakovany 352, 281 27 Krakovany, Česká republika.</strong><br />
      IČO: <strong>29775060</strong> · Spisová značka: <strong>L 82293</strong> vedená
      u Městského soudu v Praze.</>,
    s4p2: 'Spolek byl založen na dobu neurčitou a může působit v České republice i v zahraničí.',
  },

  en: {
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
      on 19 June 2026 in Krakovany. The governing bodies of the association are the
      general assembly and the chairman. The statutory representative of the association
      is the chairman, who is authorised to act on behalf of the association independently.`,

    members: [
      { role: 'Honorary Chairman', name: 'Sensei Rajeev Sinha, PhD', bio: 'Honorary Chairman of Zero Balance Society, a yogic master and teacher of Tantra Kriya Yoga with students around the world. He has personally guided members of the association in the practice of the original Indian spiritual tradition for over twenty years.', photo: '/images/Sensei4.jpg', imgPos: 'center 15%', email: 'senseirajeev@icloud.com' },
      { role: 'Chairman', name: 'Jan Kočandrle', bio: 'Founder and Chairman of Zero Balance Society. He contributes to the development of the association\'s activities, its cultural mission and the creation of spaces for gathering, study and sharing of Indian spiritual traditions.', photo: '/images/Jan_ashram.jpg', imgPos: 'center 20%', email: 'jan@zero-balance.org' },
      { role: 'Vice-Chairman', name: 'PhDr. Jiří Kočandrle', bio: 'Vice-Chairman of Zero Balance Society. He focuses on communication, public relations and the development of the association\'s cultural mission, and contributes to the transmission of yogic practice and the study of Indian spiritual traditions.', photo: '/images/Jirka_ashram.jpg', imgPos: 'center 20%', email: 'jiri@zero-balance.org' },
      { role: 'Vice-Chairman', name: 'Ing. František Filouš', bio: 'Vice-Chairman of the association. He handles legislative and technical matters and contributes to the practical functioning of Zero Balance Society.', photo: '/images/Franta_ashram.jpg', imgPos: 'center 20%' },
      { role: 'Co-founding Member', name: 'Pavlína Muchová', bio: 'Co-founding member of Zero Balance Society. She brings a sense of beauty, creativity and artistic sensibility to the association\'s work; she is a painter and supports the cultural and artistic dimension of our activities.', photo: '/images/Pavlina_ashram.jpg', imgPos: 'center 20%' },
      { role: 'Co-founding Member', name: 'Pavel Znamenáček', bio: 'Co-founding member of Zero Balance Society. An accomplished karateka and coach, dedicated to working with young people for over 30 years, leading a successful karate club. It was through his club that the founders of the association first met Sensei Rajeev Sinha more than twenty years ago. Within the association he focuses primarily on organisational and technical matters.', photo: '/images/Pavel_ashram.jpg', imgPos: 'center 20%' },
    ],

    s4Head: 'Registered Office',
    s4p1: <>Zero Balance Society z.s. is registered in the Czech Republic as a
      registered non-profit association under Act No. 89/2012 Coll., the Civil Code.<br />
      Registered office: <strong>Krakovany 352, 281 27 Krakovany, Czech Republic.</strong><br />
      Reg. No. (IČO): <strong>29775060</strong> · File No.: <strong>L 82293</strong>,
      Municipal Court in Prague.</>,
    s4p2: 'The association is established for an indefinite period and may operate in the Czech Republic and abroad.',
  },

  hi: {
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
      { role: 'मानद अध्यक्ष', name: 'Sensei Rajeev Sinha, PhD', bio: 'Zero Balance Society के मानद अध्यक्ष, एक योगाचार्य और तंत्र क्रिया योग के शिक्षक, जिनके शिष्य पूरी दुनिया में हैं। वे संस्था के सदस्यों को बीस से अधिक वर्षों से मूल भारतीय आध्यात्मिक परंपरा की साधना में व्यक्तिगत रूप से मार्गदर्शन करते आए हैं।', photo: '/images/Sensei4.jpg', imgPos: 'center 15%', email: 'senseirajeev@icloud.com' },
      { role: 'अध्यक्ष', name: 'Jan Kočandrle', bio: 'Zero Balance Society के संस्थापक और अध्यक्ष। वे संस्था की गतिविधियों, उसकी सांस्कृतिक मिशन और भारतीय आध्यात्मिक परंपराओं के मिलन, अध्ययन व साझाकरण के लिए स्थान निर्माण में योगदान करते हैं।', photo: '/images/Jan_ashram.jpg', imgPos: 'center 20%', email: 'jan@zero-balance.org' },
      { role: 'उपाध्यक्ष', name: 'PhDr. Jiří Kočandrle', bio: 'Zero Balance Society के उपाध्यक्ष। वे संचार, जनसंपर्क और संस्था की सांस्कृतिक मिशन के विकास पर ध्यान देते हैं, और योगाभ्यास के प्रसार तथा भारतीय आध्यात्मिक परंपराओं के अध्ययन में सहयोग करते हैं।', photo: '/images/Jirka_ashram.jpg', imgPos: 'center 20%', email: 'jiri@zero-balance.org' },
      { role: 'उपाध्यक्ष', name: 'Ing. František Filouš', bio: 'संस्था के उपाध्यक्ष। वे विधायी और तकनीकी मामलों को संभालते हैं और Zero Balance Society के व्यावहारिक संचालन में योगदान करते हैं।', photo: '/images/Franta_ashram.jpg', imgPos: 'center 20%' },
      { role: 'सह-संस्थापक सदस्या', name: 'Pavlína Muchová', bio: 'Zero Balance Society की सह-संस्थापक सदस्या। वे संस्था के कार्य में सौंदर्यबोध, रचनात्मकता और कलात्मक दृष्टि लाती हैं; वे एक चित्रकार हैं और हमारी गतिविधियों के सांस्कृतिक एवं कलात्मक आयाम का समर्थन करती हैं।', photo: '/images/Pavlina_ashram.jpg', imgPos: 'center 20%' },
      { role: 'सह-संस्थापक सदस्य', name: 'Pavel Znamenáček', bio: 'Zero Balance Society के सह-संस्थापक सदस्य। एक कुशल कराटे खिलाड़ी और प्रशिक्षक, जो 30 से अधिक वर्षों से युवाओं के साथ कार्य करते हुए एक सफल कराटे क्लब का नेतृत्व करते हैं। उन्हीं के क्लब के माध्यम से संस्था के संस्थापकों की बीस से अधिक वर्ष पहले सेंसेई राजीव सिन्हा से पहली मुलाकात हुई। संस्था में वे मुख्यतः संगठनात्मक और तकनीकी मामलों में योगदान करते हैं।', photo: '/images/Pavel_ashram.jpg', imgPos: 'center 20%' },
    ],

    s4Head: 'पंजीकृत कार्यालय',
    s4p1: <>Zero Balance Society z.s. चेक गणराज्य में अधिनियम संख्या 89/2012 Sb., नागरिक संहिता के
      तहत एक पंजीकृत अलाभकारी संस्था के रूप में पंजीकृत है।<br />
      पंजीकृत कार्यालय: <strong>Krakovany 352, 281 27 Krakovany, Czech Republic।</strong><br />
      पंजीकरण संख्या (IČO): <strong>29775060</strong> · फ़ाइल संख्या: <strong>L 82293</strong>,
      प्राग नगर न्यायालय।</>,
    s4p2: 'संस्था अनिश्चित काल के लिए स्थापित है और चेक गणराज्य तथा विदेशों में काम कर सकती है।',
  },

  fr: {
    lead: `Le 19 juin 2026, l’acte fondateur a été signé à Krakovany et
      Zero Balance Society, z.s. a vu le jour en tant qu’association à but
      non lucratif enregistrée selon le droit civil tchèque. Ce moment n’a
      pas été une décision spontanée — il a été l’aboutissement de plusieurs
      années de pratique spirituelle, d’échanges culturels et d’un chemin
      partagé avec des traditions qui nous ont façonnés.`,

    s1Head: 'Vocation et orientation spirituelle',
    s1p1: <>L’association a été fondée pour soutenir, développer, préserver et
      transmettre des traditions spirituelles, culturelles, méditatives et
      éducatives enracinées dans les traditions indiennes védiques, yogiques
      et tantriques. Au cœur de notre démarche se trouve la lignée spirituelle
      de <strong>Shri Karauli Shankar Mahadev Ji</strong>, connue sous le nom
      de Karauli Sarkar ou Gurudev — ainsi que les traditions, pratiques et le
      patrimoine culturel de l’Inde qui sont liés à son enseignement.</>,
    s1p2: `Zero Balance Society n’est pas une organisation religieuse. Nous
      sommes une association culturelle et éducative qui crée un espace pour
      la pratique spirituelle, la rencontre interculturelle et le
      développement personnel — ouverte à tous, quels que soient leurs
      origines, leurs convictions ou leur expérience.`,

    pullquote: <>&laquo;L’association crée un espace pour la pratique
      spirituelle, le développement personnel, l’éducation, les échanges
      culturels et interculturels et la coopération internationale.&raquo;</>,
    pullquoteCite: '— Statuts de l’association, article II',

    s2Head: 'Ce que fait l’Association',
    s2p1: 'Les principales activités de l’association sont à but non lucratif et non commercial. L’association notamment :',
    activities: [
      'Organise des rencontres, conférences, séminaires, séances de méditation et événements culturels',
      'Organise des voyages de groupe en Inde et des immersions culturelles dans des traditions vivantes',
      'Soutient les visites d’enseignants spirituels et d’invités culturels en République tchèque',
      'Traduit, prépare et diffuse des documents liés à la vocation de l’association',
      'Coopère avec des communautés, organisations et particuliers en République tchèque et à l’étranger',
      'Soutient la découverte de la culture, de la philosophie, des langues, de la musique et du patrimoine spirituel de l’Inde',
    ],

    s3Head: 'Fondateurs et structure',
    s3p1: `L’association a été fondée par trois fondateurs lors de l’assemblée
      constitutive du 19 juin 2026 à Krakovany. Les organes de l’association
      sont l’assemblée générale et le président. Le représentant légal de
      l’association est le président, qui est habilité à agir au nom de
      l’association de manière indépendante.`,

    members: [
      { role: 'Président d’honneur', name: 'Sensei Rajeev Sinha, PhD', bio: 'Président d’honneur de Zero Balance Society, maître yogique et enseignant de Tantra Kriya Yoga, avec des élèves dans le monde entier. Depuis plus de vingt ans, il guide personnellement des membres de l’association dans la pratique de la tradition spirituelle indienne originelle.', photo: '/images/Sensei4.jpg', imgPos: 'center 15%', email: 'senseirajeev@icloud.com' },
      { role: 'Président', name: 'Jan Kočandrle', bio: 'Fondateur et président de Zero Balance Society. Il contribue au développement des activités de l’association, à sa mission culturelle et à la création d’espaces de rencontre, d’étude et de partage des traditions spirituelles indiennes.', photo: '/images/Jan_ashram.jpg', imgPos: 'center 20%', email: 'jan@zero-balance.org' },
      { role: 'Vice-président', name: 'PhDr. Jiří Kočandrle', bio: 'Vice-président de Zero Balance Society. Il se consacre à la communication, aux relations publiques et au développement de la mission culturelle de l’association, et contribue à la transmission de la pratique yogique et à l’étude des traditions spirituelles indiennes.', photo: '/images/Jirka_ashram.jpg', imgPos: 'center 20%', email: 'jiri@zero-balance.org' },
      { role: 'Vice-président', name: 'Ing. František Filouš', bio: 'Vice-président de l’association. Il s’occupe des questions législatives et techniques et contribue au fonctionnement pratique de Zero Balance Society.', photo: '/images/Franta_ashram.jpg', imgPos: 'center 20%' },
      { role: 'Membre cofondateur', name: 'Pavlína Muchová', bio: 'Membre cofondatrice de Zero Balance Society. Elle apporte au travail de l’association un sens de la beauté, de la créativité et de la sensibilité artistique ; elle est peintre et soutient la dimension culturelle et artistique de nos activités.', photo: '/images/Pavlina_ashram.jpg', imgPos: 'center 20%' },
      { role: 'Membre cofondateur', name: 'Pavel Znamenáček', bio: 'Membre cofondateur de Zero Balance Society. Karatéka et entraîneur accompli, il se consacre depuis plus de 30 ans au travail avec les jeunes et dirige un club de karaté prospère. C’est par l’intermédiaire de son club que les fondateurs de l’association ont rencontré Sensei Rajeev Sinha pour la première fois, il y a plus de vingt ans. Au sein de l’association, il se concentre principalement sur les questions organisationnelles et techniques.', photo: '/images/Pavel_ashram.jpg', imgPos: 'center 20%' },
    ],

    s4Head: 'Siège social',
    s4p1: <>Zero Balance Society z.s. est enregistrée en République tchèque en
      tant qu’association à but non lucratif enregistrée conformément à la loi
      n° 89/2012 Coll., Code civil.<br />
      Siège social : <strong>Krakovany 352, 281 27 Krakovany, Czech Republic.</strong><br />
      N° d’identification (IČO) : <strong>29775060</strong> · N° de dossier :{' '}
      <strong>L 82293</strong>, Tribunal municipal de Prague.</>,
    s4p2: 'L’association est constituée pour une durée indéterminée et peut exercer ses activités en République tchèque et à l’étranger.',
  },

  es: {
    lead: `El 19 de junio de 2026 se firmó el acta fundacional en Krakovany y
      Zero Balance Society, z.s. nació como una asociación sin ánimo de lucro
      registrada conforme al derecho civil checo. Este momento no fue una
      decisión espontánea — fue la culminación de años de práctica
      espiritual, intercambio cultural y un camino compartido con
      tradiciones que nos han formado.`,

    s1Head: 'Propósito y orientación espiritual',
    s1p1: <>La asociación fue fundada para apoyar, desarrollar, preservar y
      difundir tradiciones espirituales, culturales, meditativas y educativas
      arraigadas en las tradiciones indias védicas, yóguicas y tántricas. En
      el centro de nuestro enfoque se encuentra el linaje espiritual
      de <strong>Shri Karauli Shankar Mahadev Ji</strong>, conocido como
      Karauli Sarkar o Gurudev — así como las tradiciones, prácticas y el
      patrimonio cultural de la India relacionados con su enseñanza.</>,
    s1p2: `Zero Balance Society no es una organización religiosa. Somos una
      asociación cultural y educativa que crea un espacio para la práctica
      espiritual, el encuentro intercultural y el desarrollo personal —
      abierta a todos, independientemente de su origen, creencias o
      experiencia.`,

    pullquote: <>&laquo;La asociación crea un espacio para la práctica
      espiritual, el desarrollo personal, la educación, el intercambio
      cultural e intercultural y la cooperación internacional.&raquo;</>,
    pullquoteCite: '— Estatutos de la Asociación, Artículo II',

    s2Head: 'Qué hace la Asociación',
    s2p1: 'Las principales actividades de la asociación son sin ánimo de lucro y no comerciales. En particular, la asociación:',
    activities: [
      'Organiza encuentros, conferencias, seminarios, sesiones de meditación y eventos culturales',
      'Organiza viajes grupales a la India e inmersiones culturales en tradiciones vivas',
      'Apoya las visitas de maestros espirituales e invitados culturales en la República Checa',
      'Traduce, prepara y difunde materiales relacionados con el propósito de la asociación',
      'Coopera con comunidades, organizaciones y particulares en la República Checa y en el extranjero',
      'Apoya el conocimiento de la cultura, la filosofía, las lenguas, la música y el patrimonio espiritual de la India',
    ],

    s3Head: 'Fundadores y estructura',
    s3p1: `La asociación fue fundada por tres fundadores en la asamblea
      constituyente celebrada el 19 de junio de 2026 en Krakovany. Los
      órganos de gobierno de la asociación son la asamblea general y el
      presidente. El representante legal de la asociación es el presidente,
      que está autorizado para actuar en nombre de la asociación de forma
      independiente.`,

    members: [
      { role: 'Presidente de Honor', name: 'Sensei Rajeev Sinha, PhD', bio: 'Presidente de Honor de Zero Balance Society, maestro yóguico y profesor de Tantra Kriya Yoga con alumnos en todo el mundo. Desde hace más de veinte años, guía personalmente a miembros de la asociación en la práctica de la tradición espiritual india original.', photo: '/images/Sensei4.jpg', imgPos: 'center 15%', email: 'senseirajeev@icloud.com' },
      { role: 'Presidente', name: 'Jan Kočandrle', bio: 'Fundador y presidente de Zero Balance Society. Contribuye al desarrollo de las actividades de la asociación, a su misión cultural y a la creación de espacios para el encuentro, el estudio y el intercambio de las tradiciones espirituales indias.', photo: '/images/Jan_ashram.jpg', imgPos: 'center 20%', email: 'jan@zero-balance.org' },
      { role: 'Vicepresidente', name: 'PhDr. Jiří Kočandrle', bio: 'Vicepresidente de Zero Balance Society. Se centra en la comunicación, las relaciones públicas y el desarrollo de la misión cultural de la asociación, y contribuye a la transmisión de la práctica yóguica y al estudio de las tradiciones espirituales indias.', photo: '/images/Jirka_ashram.jpg', imgPos: 'center 20%', email: 'jiri@zero-balance.org' },
      { role: 'Vicepresidente', name: 'Ing. František Filouš', bio: 'Vicepresidente de la asociación. Se ocupa de asuntos legislativos y técnicos y contribuye al funcionamiento práctico de Zero Balance Society.', photo: '/images/Franta_ashram.jpg', imgPos: 'center 20%' },
      { role: 'Miembro cofundador', name: 'Pavlína Muchová', bio: 'Miembro cofundadora de Zero Balance Society. Aporta al trabajo de la asociación un sentido de la belleza, la creatividad y la sensibilidad artística; es pintora y apoya la dimensión cultural y artística de nuestras actividades.', photo: '/images/Pavlina_ashram.jpg', imgPos: 'center 20%' },
      { role: 'Miembro cofundador', name: 'Pavel Znamenáček', bio: 'Miembro cofundador de Zero Balance Society. Karateka y entrenador de reconocido nivel, lleva más de 30 años dedicado al trabajo con jóvenes y dirige un exitoso club de karate. Fue a través de su club como los fundadores de la asociación conocieron por primera vez a Sensei Rajeev Sinha hace más de veinte años. Dentro de la asociación se centra principalmente en cuestiones organizativas y técnicas.', photo: '/images/Pavel_ashram.jpg', imgPos: 'center 20%' },
    ],

    s4Head: 'Domicilio social',
    s4p1: <>Zero Balance Society z.s. está registrada en la República Checa
      como asociación sin ánimo de lucro registrada de conformidad con la Ley
      n.º 89/2012 Coll., Código Civil.<br />
      Domicilio social: <strong>Krakovany 352, 281 27 Krakovany, Czech Republic.</strong><br />
      N.º de identificación (IČO): <strong>29775060</strong> · N.º de expediente:{' '}
      <strong>L 82293</strong>, Tribunal Municipal de Praga.</>,
    s4p2: 'La asociación se constituye por tiempo indefinido y puede desarrollar sus actividades en la República Checa y en el extranjero.',
  },

  de: {
    lead: `Am 19. Juni 2026 wurde in Krakovany die Gründungsurkunde
      unterzeichnet und Zero Balance Society, z.s. entstand als eingetragener
      gemeinnütziger Verein nach tschechischem Zivilrecht. Dieser Moment war
      keine spontane Entscheidung — er war der Höhepunkt jahrelanger
      spiritueller Praxis, kulturellen Austauschs und eines gemeinsamen Weges
      mit Traditionen, die uns geprägt haben.`,

    s1Head: 'Zweck und spirituelle Ausrichtung',
    s1p1: <>Der Verein wurde gegründet, um spirituelle, kulturelle, meditative
      und pädagogische Traditionen zu unterstützen, weiterzuentwickeln, zu
      bewahren und zu vermitteln, die in den indischen vedischen, yogischen
      und tantrischen Traditionen verwurzelt sind. Im Mittelpunkt unserer
      Arbeit steht die spirituelle Linie
      von <strong>Shri Karauli Shankar Mahadev Ji</strong>, bekannt als
      Karauli Sarkar oder Gurudev — sowie die mit seiner Lehre verbundenen
      Traditionen, Praktiken und das kulturelle Erbe Indiens.</>,
    s1p2: `Zero Balance Society ist keine religiöse Organisation. Wir sind ein
      kultureller und pädagogischer Verein, der Raum für spirituelle Praxis,
      interkulturelle Begegnung und persönliche Entwicklung schafft — offen
      für alle, unabhängig von Herkunft, Glauben oder Erfahrung.`,

    pullquote: <>&bdquo;Der Verein schafft Raum für spirituelle Praxis,
      persönliche Entwicklung, Bildung, kulturellen und interkulturellen
      Austausch sowie internationale Zusammenarbeit.&ldquo;</>,
    pullquoteCite: '— Satzung des Vereins, Artikel II',

    s2Head: 'Was der Verein tut',
    s2p1: 'Die Haupttätigkeiten des Vereins sind gemeinnützig und nicht kommerziell. Der Verein insbesondere:',
    activities: [
      'Organisiert Begegnungen, Vorträge, Seminare, Meditationen und kulturelle Veranstaltungen',
      'Organisiert Gruppenreisen nach Indien und kulturelle Immersionen in lebendige Traditionen',
      'Unterstützt Besuche spiritueller Lehrer und kultureller Gäste in der Tschechischen Republik',
      'Übersetzt, erstellt und verbreitet Materialien im Zusammenhang mit dem Zweck des Vereins',
      'Arbeitet mit Gemeinschaften, Organisationen und Einzelpersonen in der Tschechischen Republik und im Ausland zusammen',
      'Unterstützt die Auseinandersetzung mit der indischen Kultur, Philosophie, Sprachen, Musik und dem spirituellen Erbe',
    ],

    s3Head: 'Gründer und Struktur',
    s3p1: `Der Verein wurde von drei Gründern bei der Gründungsversammlung am
      19. Juni 2026 in Krakovany gegründet. Die Organe des Vereins sind die
      Mitgliederversammlung und der Vorsitzende. Gesetzlicher Vertreter des
      Vereins ist der Vorsitzende, der berechtigt ist, den Verein
      selbstständig zu vertreten.`,

    members: [
      { role: 'Ehrenvorsitzender', name: 'Sensei Rajeev Sinha, PhD', bio: 'Ehrenvorsitzender von Zero Balance Society, yogischer Meister und Lehrer des Tantra Kriya Yoga mit Schülern auf der ganzen Welt. Seit mehr als zwanzig Jahren begleitet er persönlich Mitglieder des Vereins in der Praxis der ursprünglichen indischen spirituellen Tradition.', photo: '/images/Sensei4.jpg', imgPos: 'center 15%', email: 'senseirajeev@icloud.com' },
      { role: 'Vorsitzender', name: 'Jan Kočandrle', bio: 'Gründer und Vorsitzender von Zero Balance Society. Er trägt zur Entwicklung der Aktivitäten des Vereins, zu seiner kulturellen Aufgabe und zur Schaffung von Räumen für Begegnung, Studium und den Austausch indischer spiritueller Traditionen bei.', photo: '/images/Jan_ashram.jpg', imgPos: 'center 20%', email: 'jan@zero-balance.org' },
      { role: 'Stellvertretender Vorsitzender', name: 'PhDr. Jiří Kočandrle', bio: 'Stellvertretender Vorsitzender von Zero Balance Society. Er konzentriert sich auf Kommunikation, Öffentlichkeitsarbeit und die Entwicklung der kulturellen Aufgabe des Vereins und trägt zur Vermittlung yogischer Praxis und zum Studium indischer spiritueller Traditionen bei.', photo: '/images/Jirka_ashram.jpg', imgPos: 'center 20%', email: 'jiri@zero-balance.org' },
      { role: 'Stellvertretender Vorsitzender', name: 'Ing. František Filouš', bio: 'Stellvertretender Vorsitzender des Vereins. Er kümmert sich um rechtliche und technische Angelegenheiten und trägt zum praktischen Funktionieren von Zero Balance Society bei.', photo: '/images/Franta_ashram.jpg', imgPos: 'center 20%' },
      { role: 'Mitbegründendes Mitglied', name: 'Pavlína Muchová', bio: 'Mitbegründendes Mitglied von Zero Balance Society. Sie bringt ein Gespür für Schönheit, Kreativität und künstlerische Sensibilität in die Arbeit des Vereins ein; sie ist Malerin und unterstützt die kulturelle und künstlerische Dimension unserer Aktivitäten.', photo: '/images/Pavlina_ashram.jpg', imgPos: 'center 20%' },
      { role: 'Mitbegründendes Mitglied', name: 'Pavel Znamenáček', bio: 'Mitbegründendes Mitglied von Zero Balance Society. Als erfolgreicher Karateka und Trainer widmet er sich seit mehr als 30 Jahren der Arbeit mit jungen Menschen und leitet einen erfolgreichen Karateverein. Über seinen Verein lernten die Gründer des Vereins vor mehr als zwanzig Jahren erstmals Sensei Rajeev Sinha kennen. Innerhalb des Vereins konzentriert er sich vor allem auf organisatorische und technische Angelegenheiten.', photo: '/images/Pavel_ashram.jpg', imgPos: 'center 20%' },
    ],

    s4Head: 'Sitz des Vereins',
    s4p1: <>Zero Balance Society z.s. ist in der Tschechischen Republik als
      eingetragener gemeinnütziger Verein gemäß Gesetz Nr. 89/2012 Slg.,
      Bürgerliches Gesetzbuch, eingetragen.<br />
      Sitz des Vereins: <strong>Krakovany 352, 281 27 Krakovany, Czech Republic.</strong><br />
      Identifikationsnummer (IČO): <strong>29775060</strong> · Aktenzeichen:{' '}
      <strong>L 82293</strong>, Stadtgericht in Prag.</>,
    s4p2: 'Der Verein ist auf unbestimmte Zeit gegründet und kann seine Tätigkeit in der Tschechischen Republik und im Ausland ausüben.',
  },
} as const

export default function FoundingArticle({ lang }: { lang: PostLang }) {
  const c = CONTENT[toArticleLang(lang)]

  return (
    <>
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
          {c.members.map((m, i) => (
            <div key={i} className={`${styles.memberRow} ${i % 2 === 1 ? styles.memberRowReverse : ''}`}>
              <div className={styles.memberRowImg}>
                <Image src={m.photo} alt={m.name} fill sizes="180px" style={{ objectPosition: m.imgPos }} />
              </div>
              <div className={styles.memberRowText}>
                <span className={styles.memberRole}>{m.role}</span>
                <h4 className={styles.memberName}>{m.name}</h4>
                <p className={styles.memberBio}>{m.bio}</p>
                {'email' in m && m.email && (
                  <a href={`mailto:${m.email}`} className={styles.memberEmail}>{m.email}</a>
                )}
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
    </>
  )
}
