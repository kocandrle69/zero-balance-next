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

export type PostLang = 'cs' | 'en' | 'hi'

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
  /** Rubrika, titulek, kurzívní dovětek titulku a perex — pro každý jazyk */
  meta: Record<PostLang, {
    rubric: string
    title: string
    /** Druhý řádek titulku, sázený kurzívou zlatě. Volitelné. */
    titleEm?: string
    perex: string
  }>
}

export const POSTS: PostMeta[] = [
  {
    slug: 'maya-brahman-asramy',
    date: '2026-08-05',
    cover: '/images/Citta-Vritti.png',
    langs: ['cs', 'en'],
    meta: {
      cs: {
        rubric: 'Promluvy',
        title: 'Gurudévovy promluvy',
        titleEm: 'Čtyři ášramy a Mája',
        perex: `Neformální rozhovor Gurudéva se žáky, zachycený co nejsyrověji — bez úprav
          a vyhlazování. Řeč se stáčí od máji a Brahmanu přes čtyři ášramy životní cesty
          až k rozboru pěti částí vědomí: mysli, vritti, čitty, buddhi a átman.`,
      },
      en: {
        rubric: 'Discourses',
        title: "Gurudev's Talks",
        titleEm: 'The Four Ashramas and Maya',
        perex: `An informal conversation between Gurudev and his disciples, kept as raw
          as possible — unedited and unsmoothed. The talk moves from maya and Brahman
          through the four ashramas of life's journey to an account of the five parts
          of consciousness: mind, vritti, chitta, buddhi and atman.`,
      },
      hi: {
        rubric: 'प्रवचन',
        title: 'गुरुदेव के प्रवचन',
        titleEm: 'चार आश्रम और माया',
        perex: `गुरुदेव और शिष्यों के बीच एक अनौपचारिक बातचीत, यथासंभव कच्चे रूप में — बिना
          संपादन और सफ़ाई के। बातचीत माया और ब्रह्म से होते हुए जीवन-यात्रा के चार आश्रमों
          से गुज़रती है और अंत में चेतना के पाँच अंगों — मन, वृत्ति, चित्त, बुद्धि और आत्मा
          — के विश्लेषण तक पहुँचती है।`,
      },
    },
  },
  {
    slug: 'ashram-return-2026',
    date: '2026-08-04',
    cover: '/images/Journal-Ashram-Return.jpg',
    coverBanner: true,
    langs: ['cs', 'en', 'hi'],
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
    },
  },
  {
    slug: 'youtube-channel',
    date: '2026-08-02',
    cover: '/images/YouTube-Channel.jpg',
    coverPos: 'left center',
    coverBanner: true,
    langs: ['cs', 'en', 'hi'],
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
    },
  },
  {
    slug: 'beyond-the-body',
    date: '2026-08-01',
    cover: '/images/Journal-Sensei-Vedomi.jpg',
    coverPos: 'center 45%',
    coverBanner: true,
    langs: ['cs', 'en', 'hi'],
    meta: {
      cs: {
        rubric: 'Promluvy',
        title: 'Kdo skutečně jsme a kam jdeme?',
        titleEm: 'Se Senseiem Rajeevem',
        perex: `Je naše tělo skutečným domovem, nebo pouze dočasným prostředkem na cestě
          vědomí? Sensei Rajeev se v této duchovní promluvě dotýká jedné z nejhlubších
          otázek lidského života: kdo jsme za hranicemi těla a co se s námi děje
          v okamžiku smrti.`,
      },
      en: {
        rubric: 'Discourses',
        title: 'Who are we really, and where are we going?',
        titleEm: 'With Sensei Rajeev',
        perex: `Is our body a real home, or only a temporary vehicle on the journey of
          consciousness? In this spiritual discourse Sensei Rajeev touches on one of the
          deepest questions of human life: who we are beyond the body, and what becomes
          of us at the moment of death.`,
      },
      hi: {
        rubric: 'प्रवचन',
        title: 'हम वास्तव में कौन हैं और कहाँ जा रहे हैं?',
        titleEm: 'सेंसेई राजीव के साथ',
        perex: `क्या हमारा शरीर वास्तविक घर है, या चेतना की यात्रा में केवल एक अस्थायी साधन?
          इस आध्यात्मिक प्रवचन में सेंसेई राजीव मानव जीवन के गहनतम प्रश्नों में से एक को छूते
          हैं: शरीर की सीमा से परे हम कौन हैं, और मृत्यु के क्षण में हमारे साथ क्या होता है।`,
      },
    },
  },
  {
    slug: 'guru-purnima-2026',
    date: '2026-07-29',
    cover: '/images/Journal-Photo1.jpg',
    coverPos: 'center 40%',
    langs: ['cs', 'en', 'hi'],
    meta: {
      cs: {
        rubric: 'Promluvy',
        title: 'Guru Púrnimá 2026',
        titleEm: 'Rozpravy a setkání se žáky',
        perex: `Na svátek Guru Púrnimá promluvil Gurudév o samskárách a jednání — o tom,
          že příští generace nepřejímá naše slova, ale to, jak sami žijeme. Přinášíme
          překlad hlavní rozpravy, obou podobenství i slov tajemníka akháry a mukhja mahanta.`,
      },
      en: {
        rubric: 'Discourses',
        title: 'Guru Purnima 2026',
        titleEm: 'Talks and gatherings with the disciples',
        perex: `On the festival of Guru Purnima, Gurudev spoke of samskaras and conduct —
          that the next generation does not inherit our words, but the way we ourselves live.
          Here is a translation of the main discourse, both parables, and the words of the
          secretary of the akhara and of the mukhya mahant.`,
      },
      hi: {
        rubric: 'प्रवचन',
        title: 'गुरु पूर्णिमा 2026',
        titleEm: 'शिष्यों के साथ प्रवचन और सत्संग',
        perex: `गुरु पूर्णिमा के पावन अवसर पर गुरुदेव ने संस्कारों और आचरण पर प्रवचन दिया —
          कि अगली पीढ़ी हमारे शब्द नहीं, बल्कि हमारा जीवन ग्रहण करती है। यहाँ मुख्य प्रवचन,
          दोनों दृष्टांत तथा अखाड़े के सचिव और मुख्य महंत के वचन प्रस्तुत हैं।`,
      },
    },
  },
  {
    slug: 'society-founded',
    date: '2026-06-19',
    cover: '/images/Casopis.jpg',
    coverPos: '78% center',
    langs: ['cs', 'en', 'hi'],
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

/** Datum vypsané v jazyce čtenáře. */
export function formatDate(iso: string, lang: PostLang): string {
  const locale = lang === 'cs' ? 'cs-CZ' : lang === 'hi' ? 'hi-IN' : 'en-GB'
  return new Date(iso).toLocaleDateString(locale, {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}
