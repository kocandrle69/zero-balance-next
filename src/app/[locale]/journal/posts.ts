/**
 * JOURNAL REGISTRY — src/app/journal/posts.ts
 *
 * Jediné místo, kde se eviduje, co v časopise vyšlo. Obsahuje pouze prostá
 * data (žádné JSX), aby šel soubor importovat i ze server komponent
 * (generateStaticParams, generateMetadata) i z klientských.
 *
 * Text článku samotného žije v `posts/<Slug>Article.tsx` a je napojen
 * v `[slug]/JournalPost.tsx`.
 *
 * Nové vydání = nová položka na začátku POSTS + nová komponenta těla.
 */

export type PostLang = 'cs' | 'en' | 'hi' | 'fr' | 'es' | 'de'

/**
 * PostLang teď pokrývá stejnou množinu jako Lang (viz src/lib/translations.ts)
 * — žurnál dostává fr/es/de překlady postupně, článek po článku. Dokud
 * konkrétní vydání fr/es/de tělo/meta nemá, `bodyLang()`/`getMeta()` prostě
 * spadnou na angličtinu, přesně jako dřív dělaly pro chybějící hi.
 */
export function toPostLang(lang: string): PostLang {
  const valid: readonly PostLang[] = ['cs', 'en', 'hi', 'fr', 'es', 'de']
  return (valid as readonly string[]).includes(lang) ? (lang as PostLang) : 'en'
}

export interface PostMeta {
  /** URL segment — /journal/<slug> */
  slug: string
  /** ISO datum vydání; řadí archiv (nejnovější první) */
  date: string
  /** Obálka v přehledu i v hlavičce článku */
  cover: string
  /** object-position obálky, pokud výchozí střed nesedí */
  coverPos?: string
  /**
   * Obálka nese vlastní text nebo je to detailní portrét bez "prázdného" místa
   * (video náhled apod.) — přebitý vlastním titulkem by kolidoval se vším, co
   * je už na fotce. V tomto režimu je obálka jen krátký pruh bez titulku
   * a kicker/titulek/datum se vysází pod ní na běžném pozadí stránky.
   */
  coverBanner?: boolean
  /**
   * Tělo je obrazové (galerie), ne text — sloupec pro čtecí text (740px) by
   * fotky zbytečně svazoval. Rozšíří `.article` na `.articleWide`.
   */
  wide?: boolean
  /** Jazyky, ve kterých existuje TĚLO článku. Ostatní se odbaví fallbackem. */
  langs: PostLang[]
  /**
   * Rubrika, titulek, kurzívní dovětek titulku a perex — pro každý jazyk.
   * Partial: staré články mají zatím jen cs/en/hi, meta pro fr/es/de se
   * dopisuje postupně. Chybějící jazyk vyřeší getMeta() fallbackem na en.
   */
  meta: Partial<Record<PostLang, {
    rubric: string
    title: string
    /** Druhý řádek titulku, sázený kurzívou zlatě. Volitelné. */
    titleEm?: string
    perex: string
  }>>
}

export const POSTS: PostMeta[] = [
  {
    slug: 'karma-tri-druhy',
    date: '2026-08-07',
    cover: '/images/Karma.jpg',
    coverBanner: true,
    langs: ['cs', 'en', 'hi', 'fr', 'es', 'de'],
    meta: {
      cs: {
        rubric: 'Promluvy - Sensei',
        title: 'Senseiovy promluvy',
        titleEm: 'Karma a tři druhy karma Bhóg',
        perex: `Sensei Rajeev o sanchit karmě, prarabdh karmě a kriyaman karmě — o
          připoutanosti, napomínání jako povinnosti a o tom, co znamená zero balance.`,
      },
      en: {
        rubric: 'Discourses - Sensei',
        title: "Sensei's Talks",
        titleEm: 'Karma and the Three Kinds of Karma Bhog',
        perex: `Sensei Rajeev on sanchit karma, prarabdh karma and kriyaman karma — on
          attachment, admonishment as duty, and what zero balance really means.`,
      },
      hi: {
        rubric: 'प्रवचन - सेंसेई',
        title: 'सेंसेई के प्रवचन',
        titleEm: 'कर्म और कर्म भोग के तीन प्रकार',
        perex: `सेंसेई राजीव संचित कर्म, प्रारब्ध कर्म और क्रियमाण कर्म पर — आसक्ति,
          कर्तव्य के रूप में चेतावनी और ज़ीरो बैलेंस के अर्थ पर।`,
      },
      fr: {
        rubric: 'Discours - Sensei',
        title: 'Les discours de Sensei',
        titleEm: 'Le karma et les trois sortes de karma bhog',
        perex: `Sensei Rajeev sur sanchit karma, prarabdh karma et kriyaman karma — sur
          l’attachement, le reproche comme devoir, et ce que signifie réellement zero balance.`,
      },
      es: {
        rubric: 'Discursos - Sensei',
        title: 'Discursos de Sensei',
        titleEm: 'El karma y los tres tipos de karma bhog',
        perex: `Sensei Rajeev sobre sanchit karma, prarabdh karma y kriyaman karma — sobre
          el apego, la amonestación como deber y lo que realmente significa zero balance.`,
      },
      de: {
        rubric: 'Diskurse - Sensei',
        title: 'Senseis Vorträge',
        titleEm: 'Karma und die drei Arten von Karma Bhog',
        perex: `Sensei Rajeev über sanchit karma, prarabdh karma und kriyaman karma — über
          Anhaftung, Ermahnung als Pflicht und darüber, was zero balance wirklich bedeutet.`,
      },
    },
  },
  {
    slug: 'sadhana-with-music',
    date: '2026-08-06',
    cover: '/images/Meditace.jpg',
    langs: ['cs', 'en', 'hi', 'fr', 'es', 'de'],
    meta: {
      cs: {
        rubric: 'Promluvy - Gurudév',
        title: 'Gurudévovy promluvy',
        titleEm: 'Proč se nemůžeme poučit z vlastních chyb',
        perex: `Přepis neformálního ranního sezení Gurudéva se žáky, zachycený co
          nejsyrověji — bez úprav a vyhlazování. Řeč se stáčí od rozdílu mezi informací
          a zkušeností přes význam živého Gurua a povahu klamu a duality až k praktickému
          pokynu k meditaci se sádhanou s hudbou.`,
      },
      en: {
        rubric: 'Discourses - Gurudev',
        title: "Gurudev's Talks",
        titleEm: 'Why We Cannot Learn from Our Own Mistakes',
        perex: `A transcript of an informal morning session between Gurudev and his
          disciples, kept as raw as possible — unedited and unsmoothed. The talk moves
          from the difference between information and experience, through the
          significance of a living Guru and the nature of illusion and duality, to the
          practical instruction for a sadhana with music.`,
      },
      hi: {
        rubric: 'प्रवचन - गुरुदेव',
        title: 'गुरुदेव के प्रवचन',
        titleEm: 'हम अपनी गलतियों से क्यों नहीं सीख सकते',
        perex: `गुरुदेव और शिष्यों के बीच एक अनौपचारिक प्रातःकालीन सत्र का प्रतिलेख,
          यथासंभव कच्चे रूप में — बिना संपादन और सफ़ाई के। बातचीत सूचना और अनुभव के भेद से
          होते हुए जीवित गुरु के महत्व तथा भ्रम और द्वैत की प्रकृति से गुज़रती है और अंत
          में संगीत के साथ साधना के व्यावहारिक निर्देश तक पहुँचती है।`,
      },
      fr: {
        rubric: 'Discours - Gurudev',
        title: 'Les discours de Gurudev',
        titleEm: 'Pourquoi nous ne pouvons pas apprendre de nos propres erreurs',
        perex: `Transcription d’une séance matinale informelle entre Gurudev et ses
          disciples, conservée dans une forme aussi brute que possible — sans édition ni
          lissage. L’enseignement passe de la différence entre information et expérience
          à l’importance d’un Guru vivant et à la nature de l’illusion et de la dualité,
          avant d’aboutir aux instructions pratiques pour une sadhana avec musique.`,
      },
      es: {
        rubric: 'Discursos - Gurudev',
        title: 'Discursos de Gurudev',
        titleEm: 'Por qué no podemos aprender de nuestros propios errores',
        perex: `Transcripción de una sesión matutina informal entre Gurudev y sus
          discípulos, conservada de la forma más fiel y cruda posible — sin editar ni
          suavizar. La charla pasa de la diferencia entre información y experiencia a la
          importancia de un Guru vivo y a la naturaleza de la ilusión y la dualidad, para
          llegar finalmente a las instrucciones prácticas para una sadhana con música.`,
      },
      de: {
        rubric: 'Diskurse - Gurudev',
        title: 'Gurudevs Vorträge',
        titleEm: 'Warum wir aus unseren eigenen Fehlern nicht lernen können',
        perex: `Transkription einer informellen Morgensitzung zwischen Gurudev und
          seinen Schülern, so unverfälscht wie möglich — unbearbeitet und ungeglättet.
          Der Vortrag führt vom Unterschied zwischen Information und Erfahrung über die
          Bedeutung eines lebendigen Guru und das Wesen von Illusion und Dualität bis hin
          zu praktischen Anweisungen für eine sadhana mit Musik.`,
      },
    },
  },
  {
    slug: 'maya-brahman-asramy',
    date: '2026-08-05',
    cover: '/images/Citta-Vritti.jpg',
    langs: ['cs', 'en', 'fr', 'es', 'de'],
    meta: {
      cs: {
        rubric: 'Promluvy - Gurudév',
        title: 'Gurudévovy promluvy',
        titleEm: 'Čtyři ášramy a Mája',
        perex: `Neformální rozhovor Gurudéva se žáky, zachycený co nejsyrověji — bez úprav
          a vyhlazování. Řeč se stáčí od máji a Brahmanu přes čtyři ášramy životní cesty
          až k rozboru pěti částí vědomí: mysli, vritti, čitty, buddhi a átman.`,
      },
      en: {
        rubric: 'Discourses - Gurudev',
        title: "Gurudev's Talks",
        titleEm: 'The Four Ashramas and Maya',
        perex: `An informal conversation between Gurudev and his disciples, kept as raw
          as possible — unedited and unsmoothed. The talk moves from maya and Brahman
          through the four ashramas of life's journey to an account of the five parts
          of consciousness: mind, vritti, chitta, buddhi and atman.`,
      },
      hi: {
        rubric: 'प्रवचन - गुरुदेव',
        title: 'गुरुदेव के प्रवचन',
        titleEm: 'चार आश्रम और माया',
        perex: `गुरुदेव और शिष्यों के बीच एक अनौपचारिक बातचीत, यथासंभव कच्चे रूप में — बिना
          संपादन और सफ़ाई के। बातचीत माया और ब्रह्म से होते हुए जीवन-यात्रा के चार आश्रमों
          से गुज़रती है और अंत में चेतना के पाँच अंगों — मन, वृत्ति, चित्त, बुद्धि और आत्मा
          — के विश्लेषण तक पहुँचती है।`,
      },
      fr: {
        rubric: 'Discours - Gurudev',
        title: 'Les discours de Gurudev',
        titleEm: 'Les quatre ashramas et Maya',
        perex: `Conversation informelle entre Gurudev et ses disciples, conservée dans une
          forme aussi brute que possible — sans édition ni lissage. L'échange passe de
          maya et Brahman aux quatre ashramas du parcours de la vie, puis à une
          explication des cinq aspects de la conscience : le mental, vritti, chitta,
          buddhi et atman.`,
      },
      es: {
        rubric: 'Discursos - Gurudev',
        title: 'Discursos de Gurudev',
        titleEm: 'Los cuatro ashramas y Maya',
        perex: `Una conversación informal entre Gurudev y sus discípulos, conservada de la
          forma más cruda posible — sin editar ni suavizar. La charla pasa de maya y
          Brahman a los cuatro ashramas del recorrido de la vida y después a una
          explicación de las cinco partes de la conciencia: mente, vritti, chitta,
          buddhi y atman.`,
      },
      de: {
        rubric: 'Diskurse - Gurudev',
        title: 'Gurudevs Vorträge',
        titleEm: 'Die vier Ashramas und Maya',
        perex: `Ein informelles Gespräch zwischen Gurudev und seinen Schülern, so
          unverfälscht wie möglich bewahrt — unbearbeitet und ungeglättet. Das Gespräch
          führt von maya und Brahman über die vier ashramas des Lebensweges bis hin zu
          einer Darstellung der fünf Bereiche des Bewusstseins: Geist, vritti, chitta,
          buddhi und atman.`,
      },
    },
  },
  {
    slug: 'ashram-return-2026',
    date: '2026-08-04',
    cover: '/images/Journal-Ashram-Return.jpg',
    coverBanner: true,
    langs: ['cs', 'en', 'hi', 'fr', 'es', 'de'],
    meta: {
      cs: {
        rubric: 'Z cesty',
        title: 'Návrat do ášramu',
        titleEm: 'Z Česka zpět do Karauli',
        perex: `Dne 26. července 2026 jsme se z České republiky znovu vydali do ášramu
          Karauli Sarkar. Video zachycuje naši cestu od příletu do Nového Dillí až po
          srdečné přivítání květinami po vystoupení z minibusu. Do ášramu se vracíme
          již poněkolikáté, tentokrát zde opět strávíme několik týdnů věnovaných
          duchovní praxi.`,
      },
      en: {
        rubric: 'On the Road',
        title: 'Return to the Ashram',
        titleEm: 'From Czechia back to Karauli',
        perex: `On 26 July 2026 we set out from the Czech Republic once again for the
          Karauli Sarkar ashram. The video captures our journey from landing in New Delhi
          to the warm welcome with flowers as we stepped off the minibus. We return to
          the ashram now for the umpteenth time, and this time too we will spend several
          weeks here devoted to spiritual practice.`,
      },
      hi: {
        rubric: 'यात्रा से',
        title: 'आश्रम की वापसी',
        titleEm: 'चेक गणराज्य से वापस काराउली',
        perex: `26 जुलाई 2026 को हम चेक गणराज्य से एक बार फिर काराउली सरकार आश्रम के लिए रवाना
          हुए। यह वीडियो नई दिल्ली में उतरने से लेकर मिनीबस से उतरते ही फूलों से हुए हार्दिक
          स्वागत तक की हमारी यात्रा को दर्शाता है। हम आश्रम में अब कई बार लौट चुके हैं, और
          इस बार भी यहाँ कुछ सप्ताह आध्यात्मिक साधना में बिताएँगे।`,
      },
      fr: {
        rubric: 'Sur la route',
        title: 'Retour à l’ashram',
        titleEm: 'De la Tchéquie à Karauli',
        perex: `Le 26 juillet 2026, nous sommes une nouvelle fois partis de République
          tchèque pour rejoindre l’ashram de Karauli Sarkar. La vidéo retrace notre
          voyage, de notre atterrissage à New Delhi jusqu’à l’accueil chaleureux avec
          des fleurs lorsque nous sommes descendus du minibus. Nous revenons à l’ashram
          pour la énième fois et, cette fois encore, nous y passerons plusieurs semaines
          consacrées à la pratique spirituelle.`,
      },
      es: {
        rubric: 'En el camino',
        title: 'Regreso al ashram',
        titleEm: 'De Chequia de vuelta a Karauli',
        perex: `El 26 de julio de 2026 partimos una vez más desde la República Checa
          hacia el ashram de Karauli Sarkar. El vídeo recoge nuestro viaje desde el
          aterrizaje en Nueva Delhi hasta la cálida bienvenida con flores al bajar del
          minibús. Regresamos al ashram una vez más y, también esta vez, pasaremos
          aquí varias semanas dedicadas a la práctica espiritual.`,
      },
      de: {
        rubric: 'Unterwegs',
        title: 'Rückkehr in den Ashram',
        titleEm: 'Von Tschechien zurück nach Karauli',
        perex: `Am 26. Juli 2026 machten wir uns erneut von der Tschechischen Republik
          auf den Weg zum Karauli Sarkar ashram. Das Video zeigt unsere Reise von der
          Landung in Neu-Delhi bis zum herzlichen Empfang mit Blumen, als wir aus dem
          Minibus stiegen. Wir kehren nun schon zum wiederholten Mal in den ashram
          zurück und werden auch diesmal mehrere Wochen hier der spirituellen Praxis
          widmen.`,
      },
    },
  },
  {
    slug: 'bharat-2026',
    date: '2026-08-03',
    cover: '/images/india-2026/andrea/thumb/028.webp',
    coverPos: 'center 20%',
    coverBanner: true,
    wide: true,
    langs: ['cs', 'en', 'hi'],
    meta: {
      cs: {
        rubric: 'Reportáž',
        title: 'Lidé Bháratu',
        titleEm: 'Fotografický deník z Indie',
        perex: `Tváře, gesta a okamžiky, které Andrea zachytila během letošní cesty do
          Bháratu — lidé z ášramu, z okolních vesnic i z cesty samé, viděni jejím
          laskavým a otevřeným pohledem.`,
      },
      en: {
        rubric: 'Photo essay',
        title: 'People of Bhārat',
        titleEm: 'A photo diary from India',
        perex: `Faces, gestures and moments Andrea captured on this year's journey to
          Bhārat — people from the ashram, from the surrounding villages, and from the
          road itself, seen through her kind and open eye.`,
      },
      hi: {
        rubric: 'फ़ोटो निबंध',
        title: 'भारत के लोग',
        titleEm: 'भारत से फ़ोटो डायरी',
        perex: `आंद्रेया ने इस वर्ष भारत की यात्रा के दौरान जो चेहरे, भाव और क्षण क़ैद किए — आश्रम के,
          आसपास के गाँवों के और स्वयं इस यात्रा के लोग, उनकी सहज और खुली दृष्टि से देखे गए।`,
      },
      fr: {
        rubric: 'Reportage photo',
        title: 'Les gens du Bhārat',
        titleEm: 'Un carnet photo depuis l’Inde',
        perex: `Visages, gestes et instants qu’Andrea a capturés lors de son voyage au
          Bhārat cette année — des habitants de l’ashram, des villages environnants et
          de la route elle-même, vus à travers son regard bienveillant et ouvert.`,
      },
      es: {
        rubric: 'Ensayo fotográfico',
        title: 'La gente del Bhārat',
        titleEm: 'Un diario fotográfico desde la India',
        perex: `Rostros, gestos y momentos que Andrea capturó durante su viaje a Bhārat
          este año — personas del ashram, de los pueblos cercanos y del propio camino,
          vistas a través de su mirada amable y abierta.`,
      },
      de: {
        rubric: 'Fotoessay',
        title: 'Menschen aus Bhārat',
        titleEm: 'Ein Foto-Tagebuch aus Indien',
        perex: `Gesichter, Gesten und Momente, die Andrea auf ihrer diesjährigen Reise
          nach Bhārat eingefangen hat — Menschen aus dem Ashram, aus den umliegenden
          Dörfern und von der Reise selbst, gesehen durch ihren freundlichen und
          offenen Blick.`,
      },
    },
  },
  {
    slug: 'youtube-channel',
    date: '2026-08-02',
    cover: '/images/YouTube-Channel.jpg',
    coverPos: 'left center',
    coverBanner: true,
    langs: ['cs', 'en', 'hi', 'fr', 'es', 'de'],
    meta: {
      cs: {
        rubric: 'Ze spolku',
        title: 'Nově na YouTube',
        titleEm: 'Naše videa na jednom místě',
        perex: `Spustili jsme nový YouTube kanál věnovaný meditaci, józe, duchovní praxi
          a živým tradicím Indie — Bháratu. Na jednom místě nyní najdete řízené meditace
          s Gurudevem, záběry z ášramu, havany a další rituály, putování Bháratem
          i praktické videolekce tradiční jógové moudrosti.`,
      },
      en: {
        rubric: 'From the Association',
        title: 'Now on YouTube',
        titleEm: 'All our videos in one place',
        perex: `We have launched a new YouTube channel devoted to meditation, yoga,
          spiritual practice and the living traditions of India — Bharat. In one place you
          will now find guided meditations with Gurudev, footage from the ashram, havans
          and other rituals, journeys through Bharat, and practical video lessons in
          traditional yogic wisdom.`,
      },
      hi: {
        rubric: 'संस्था से',
        title: 'अब YouTube पर',
        titleEm: 'हमारे सभी वीडियो एक जगह',
        perex: `हमने ध्यान, योग, आध्यात्मिक साधना और भारत की जीवंत परंपराओं को समर्पित एक नया
          YouTube चैनल शुरू किया है। अब एक ही स्थान पर आपको गुरुदेव के साथ निर्देशित ध्यान,
          आश्रम के दृश्य, हवन और अन्य अनुष्ठान, भारत की यात्राएँ तथा पारंपरिक योग-ज्ञान के
          व्यावहारिक वीडियो पाठ मिलेंगे।`,
      },
      fr: {
        rubric: 'De l’association',
        title: 'Désormais sur YouTube',
        titleEm: 'Toutes nos vidéos au même endroit',
        perex: `Nous avons lancé une nouvelle chaîne YouTube consacrée à la méditation,
          au yoga, à la pratique spirituelle et aux traditions vivantes de l’Inde —
          Bharat. Vous y trouverez désormais au même endroit des méditations guidées
          avec Gurudev, des images de l’ashram, des havans et autres rituels, des voyages
          à travers Bharat ainsi que des leçons vidéo pratiques sur la sagesse yogique
          traditionnelle.`,
      },
      es: {
        rubric: 'Desde la asociación',
        title: 'Ahora en YouTube',
        titleEm: 'Todos nuestros vídeos en un solo lugar',
        perex: `Hemos lanzado un nuevo canal de YouTube dedicado a la meditación, el yoga,
          la práctica espiritual y las tradiciones vivas de la India — Bharat. Ahora
          encontrarás en un solo lugar meditaciones guiadas con Gurudev, imágenes del
          ashram, havans y otros rituales, viajes por Bharat y lecciones prácticas en
          vídeo sobre la sabiduría yóguica tradicional.`,
      },
      de: {
        rubric: 'Von der Vereinigung',
        title: 'Jetzt auf YouTube',
        titleEm: 'Alle unsere Videos an einem Ort',
        perex: `Wir haben einen neuen YouTube-Kanal gestartet, der der Meditation, dem
          Yoga, der spirituellen Praxis und den lebendigen Traditionen Indiens — Bharat —
          gewidmet ist. An einem Ort finden Sie nun geführte Meditationen mit Gurudev,
          Aufnahmen aus dem Ashram, Havans und andere Rituale, Reisen durch Bharat sowie
          praktische Videolektionen über die traditionelle yogische Weisheit.`,
      },
    },
  },
  {
    slug: 'beyond-the-body',
    date: '2026-08-01',
    cover: '/images/Journal-Sensei-Vedomi.jpg',
    coverPos: 'center 45%',
    coverBanner: true,
    langs: ['cs', 'en', 'hi', 'fr', 'es', 'de'],
    meta: {
      cs: {
        rubric: 'Promluvy - Sensei',
        title: 'Senseiovy promluvy',
        titleEm: 'Kdo jsme a kam jdeme?',
        perex: `Je naše tělo skutečným domovem, nebo pouze dočasným prostředkem na cestě
          vědomí? Sensei Rajeev se v této duchovní promluvě dotýká jedné z nejhlubších
          otázek lidského života: kdo jsme za hranicemi těla a co se s námi děje
          v okamžiku smrti.`,
      },
      en: {
        rubric: 'Discourses - Sensei',
        title: "Sensei's Talks",
        titleEm: 'Who are we, and where are we going?',
        perex: `Is our body a real home, or only a temporary vehicle on the journey of
          consciousness? In this spiritual discourse Sensei Rajeev touches on one of the
          deepest questions of human life: who we are beyond the body, and what becomes
          of us at the moment of death.`,
      },
      hi: {
        rubric: 'प्रवचन - सेंसेई',
        title: 'सेंसेई के प्रवचन',
        titleEm: 'हम कौन हैं और कहाँ जा रहे हैं?',
        perex: `क्या हमारा शरीर वास्तविक घर है, या चेतना की यात्रा में केवल एक अस्थायी साधन?
          इस आध्यात्मिक प्रवचन में सेंसेई राजीव मानव जीवन के गहनतम प्रश्नों में से एक को छूते
          हैं: शरीर की सीमा से परे हम कौन हैं, और मृत्यु के क्षण में हमारे साथ क्या होता है।`,
      },
      fr: {
        rubric: 'Discours - Sensei',
        title: 'Les enseignements de Sensei',
        titleEm: 'Qui sommes-nous et où allons-nous ?',
        perex: `Notre corps est-il véritablement notre demeure, ou seulement un véhicule
          temporaire sur le chemin de la conscience ? Dans ce discours spirituel, Sensei
          Rajeev aborde l’une des questions les plus profondes de la vie humaine : qui
          sommes-nous au-delà du corps, et que devient-on au moment de la mort ?`,
      },
      es: {
        rubric: 'Discursos - Sensei',
        title: 'Las enseñanzas de Sensei',
        titleEm: '¿Quiénes somos y hacia dónde vamos?',
        perex: `¿Es nuestro cuerpo realmente nuestro hogar, o solo un vehículo temporal
          en el viaje de la conciencia? En este discurso espiritual, Sensei Rajeev aborda
          una de las preguntas más profundas de la vida humana: quiénes somos más allá
          del cuerpo y qué sucede con nosotros en el momento de la muerte.`,
      },
      de: {
        rubric: 'Diskurse - Sensei',
        title: 'Senseis Vorträge',
        titleEm: 'Wer sind wir und wohin gehen wir?',
        perex: `Ist unser Körper wirklich unser Zuhause oder nur ein vorübergehendes
          Fahrzeug auf der Reise des Bewusstseins? In diesem spirituellen Diskurs berührt
          Sensei Rajeev eine der tiefsten Fragen des menschlichen Lebens: Wer sind wir
          jenseits des Körpers, und was geschieht mit uns im Augenblick des Todes?`,
      },
    },
  },
  {
    slug: 'guru-purnima-2026',
    date: '2026-07-29',
    cover: '/images/Journal-Photo1.jpg',
    coverPos: 'center 40%',
    langs: ['cs', 'en', 'hi', 'fr', 'es', 'de'],
    meta: {
      cs: {
        rubric: 'Promluvy - Gurudév',
        title: 'Guru Púrnimá 2026',
        titleEm: 'Rozpravy a setkání se žáky',
        perex: `Na svátek Guru Púrnimá promluvil Gurudév o samskárách a jednání — o tom,
          že příští generace nepřejímá naše slova, ale to, jak sami žijeme. Přinášíme
          překlad hlavní rozpravy, obou podobenství i slov tajemníka akháry a mukhja mahanta.`,
      },
      en: {
        rubric: 'Discourses - Gurudev',
        title: 'Guru Purnima 2026',
        titleEm: 'Talks and gatherings with the disciples',
        perex: `On the festival of Guru Purnima, Gurudev spoke of samskaras and conduct —
          that the next generation does not inherit our words, but the way we ourselves live.
          Here is a translation of the main discourse, both parables, and the words of the
          secretary of the akhara and of the mukhya mahant.`,
      },
      hi: {
        rubric: 'प्रवचन - गुरुदेव',
        title: 'गुरु पूर्णिमा 2026',
        titleEm: 'शिष्यों के साथ प्रवचन और सत्संग',
        perex: `गुरु पूर्णिमा के पावन अवसर पर गुरुदेव ने संस्कारों और आचरण पर प्रवचन दिया —
          कि अगली पीढ़ी हमारे शब्द नहीं, बल्कि हमारा जीवन ग्रहण करती है। यहाँ मुख्य प्रवचन,
          दोनों दृष्टांत तथा अखाड़े के सचिव और मुख्य महंत के वचन प्रस्तुत हैं।`,
      },
      fr: {
        rubric: 'Discours - Gurudev',
        title: 'Guru Purnima 2026',
        titleEm: 'Discours et rassemblements avec les disciples',
        perex: `À l'occasion de la fête de Guru Purnima, Gurudev a parlé des samskaras et
          de la conduite — la génération suivante n'hérite pas de nos paroles, mais de la
          manière dont nous vivons nous-mêmes. Voici la traduction du discours principal,
          des deux paraboles, ainsi que des paroles du secrétaire de l'Akhara et du
          mukhya mahant.`,
      },
      es: {
        rubric: 'Discursos - Gurudev',
        title: 'Guru Purnima 2026',
        titleEm: 'Discursos y encuentros con los discípulos',
        perex: `En la festividad de Guru Purnima, Gurudev habló de los samskaras y de la
          conducta: la siguiente generación no hereda nuestras palabras, sino la manera
          en que nosotros mismos vivimos. Aquí presentamos la traducción del discurso
          principal, de las dos parábolas y de las palabras del secretario del Akhara y
          del mukhya mahant.`,
      },
      de: {
        rubric: 'Diskurse - Gurudev',
        title: 'Guru Purnima 2026',
        titleEm: 'Ansprachen und Zusammenkünfte mit den Schülern',
        perex: `Am Fest Guru Purnima sprach Gurudev über Samskaras und Verhalten — die
          nächste Generation erbt nicht unsere Worte, sondern die Art, wie wir selbst
          leben. Hier ist die Übersetzung des Hauptdiskurses, der beiden Gleichnisse
          sowie der Worte des Sekretärs des Akhara und des mukhya mahant.`,
      },
    },
  },
  {
    slug: 'society-founded',
    date: '2026-06-19',
    cover: '/images/Casopis.jpg',
    coverPos: '78% center',
    langs: ['cs', 'en', 'hi', 'fr', 'es', 'de'],
    meta: {
      cs: {
        rubric: 'Ze spolku',
        title: 'Zero Balance Society',
        titleEm: 'Proč jsme vznikli',
        perex: `Dne 19. června 2026 byl v Krakovanech podepsán zakladatelský dokument
          a Zero Balance Society, z.s. vstoupilo v život. O účelu spolku, jeho zakladatelích
          a duchovním zaměření.`,
      },
      en: {
        rubric: 'From the Association',
        title: 'Zero Balance Society',
        titleEm: 'Why we were founded',
        perex: `On 19 June 2026 the founding document was signed in Krakovany and
          Zero Balance Society, z.s. came into existence. On the purpose of the association,
          its founders and its spiritual orientation.`,
      },
      hi: {
        rubric: 'संस्था से',
        title: 'Zero Balance Society',
        titleEm: 'हम क्यों बने',
        perex: `19 जून 2026 को क्राकोवानी में संस्थापक दस्तावेज़ पर हस्ताक्षर हुए और
          Zero Balance Society, z.s. अस्तित्व में आई। संस्था के उद्देश्य, उसके संस्थापकों
          और आध्यात्मिक अभिमुखता के बारे में।`,
      },
      fr: {
        rubric: 'De l’Association',
        title: 'Zero Balance Society',
        titleEm: 'Pourquoi nous avons été fondés',
        perex: `Le 19 juin 2026, l’acte fondateur a été signé à Krakovany et
          Zero Balance Society, z.s. a vu le jour. À propos de la vocation de
          l’association, de ses fondateurs et de son orientation spirituelle.`,
      },
      es: {
        rubric: 'De la Asociación',
        title: 'Zero Balance Society',
        titleEm: 'Por qué fuimos fundados',
        perex: `El 19 de junio de 2026 se firmó el acta fundacional en Krakovany
          y nació Zero Balance Society, z.s. Sobre el propósito de la asociación,
          sus fundadores y su orientación espiritual.`,
      },
      de: {
        rubric: 'Aus dem Verein',
        title: 'Zero Balance Society',
        titleEm: 'Warum wir gegründet wurden',
        perex: `Am 19. Juni 2026 wurde in Krakovany die Gründungsurkunde
          unterzeichnet und Zero Balance Society, z.s. ins Leben gerufen. Über
          den Zweck des Vereins, seine Gründer und seine spirituelle Ausrichtung.`,
      },
    },
  },
]

export const getPost = (slug: string) => POSTS.find(p => p.slug === slug)

/** Jazyk, ve kterém se tělo článku skutečně vykreslí (s fallbackem na en → cs). */
export function bodyLang(post: PostMeta, lang: PostLang): PostLang {
  if (post.langs.includes(lang)) return lang
  if (post.langs.includes('en')) return 'en'
  return post.langs[0]
}

/** Meta (rubrika/titulek/perex) pro daný jazyk, s fallbackem na en → cs. */
export function getMeta(post: PostMeta, lang: PostLang) {
  return post.meta[lang] ?? post.meta.en ?? post.meta.cs!
}

/** Datum vypsané v jazyce čtenáře. */
export function formatDate(iso: string, lang: PostLang): string {
  const locale =
    lang === 'cs' ? 'cs-CZ' :
    lang === 'hi' ? 'hi-IN' :
    lang === 'fr' ? 'fr-FR' :
    lang === 'es' ? 'es-ES' :
    lang === 'de' ? 'de-DE' : 'en-GB'
  return new Date(iso).toLocaleDateString(locale, {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}
