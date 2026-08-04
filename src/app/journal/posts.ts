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
        title: 'Bhárat 2026',
        titleEm: 've fotografiích',
        perex: `Každá cesta do Bháratu přináší něco jiného. Nejen nové zážitky, ale i
          setkání s lidmi, jejichž laskavost a přirozenost často zanechají silnější stopu
          než samotná navštívená místa. Tento fotografický deník zachycuje právě tyto
          okamžiky – život kolem ášramu, cestu a atmosféru, kterou lze jen těžko popsat slovy.`,
      },
      en: {
        rubric: 'Photo essay',
        title: 'Bhārat 2026',
        titleEm: 'in photographs',
        perex: `Every journey to Bhārat brings something different. Not only new
          experiences, but encounters with people whose kindness and ease often leave a
          deeper mark than the places themselves. This photographic diary holds those
          moments — life around the ashram, the road, and an atmosphere words can barely capture.`,
      },
      hi: {
        rubric: 'फ़ोटो निबंध',
        title: 'भारत 2026',
        titleEm: 'तस्वीरों में',
        perex: `भारत की हर यात्रा कुछ नया लेकर आती है। केवल नए अनुभव ही नहीं, बल्कि उन लोगों से भेंट,
          जिनकी सरलता और स्नेह अक्सर देखे हुए स्थानों से भी गहरी छाप छोड़ जाते हैं। यह फ़ोटो डायरी उन्हीं
          क्षणों को समेटे है — आश्रम के इर्द-गिर्द का जीवन, यह यात्रा, और वह वातावरण जिसे शब्दों में बाँधना कठिन है।`,
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
        title: 'Zero Balance Society nově na YouTube',
        perex: `Spustili jsme nový YouTube kanál věnovaný meditaci, józe, duchovní praxi
          a živým tradicím Indie — Bháratu. Na jednom místě nyní najdete řízené meditace
          s Gurudevem, záběry z ášramu, havany a další rituály, putování Bháratem
          i praktické videolekce tradiční jógové moudrosti.`,
      },
      en: {
        rubric: 'From the Association',
        title: 'Zero Balance Society is now on YouTube',
        perex: `We have launched a new YouTube channel devoted to meditation, yoga,
          spiritual practice and the living traditions of India — Bharat. In one place you
          will now find guided meditations with Gurudev, footage from the ashram, havans
          and other rituals, journeys through Bharat, and practical video lessons in
          traditional yogic wisdom.`,
      },
      hi: {
        rubric: 'संस्था से',
        title: 'Zero Balance Society अब YouTube पर',
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
        title: 'Kdo skutečně jsme a kam odcházíme po smrti?',
        perex: `Je naše tělo skutečným domovem, nebo pouze dočasným prostředkem na cestě
          vědomí? Sensei Rajeev se v této duchovní promluvě dotýká jedné z nejhlubších
          otázek lidského života: kdo jsme za hranicemi těla a co se s námi děje
          v okamžiku smrti.`,
      },
      en: {
        rubric: 'Discourses',
        title: 'Who are we really, and where do we go after death?',
        perex: `Is our body a real home, or only a temporary vehicle on the journey of
          consciousness? In this spiritual discourse Sensei Rajeev touches on one of the
          deepest questions of human life: who we are beyond the body, and what becomes
          of us at the moment of death.`,
      },
      hi: {
        rubric: 'प्रवचन',
        title: 'हम वास्तव में कौन हैं और मृत्यु के बाद कहाँ जाते हैं?',
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
        titleEm: 'Promluvy Gurudéva',
        perex: `Na svátek Guru Púrnimá promluvil Gurudév o samskárách a jednání — o tom,
          že příští generace nepřejímá naše slova, ale to, jak sami žijeme. Přinášíme
          překlad hlavní rozpravy, obou podobenství i slov tajemníka akháry a mukhja mahanta.`,
      },
      en: {
        rubric: 'Discourses',
        title: 'Guru Purnima 2026',
        titleEm: 'Discourses of Gurudev',
        perex: `On the festival of Guru Purnima, Gurudev spoke of samskaras and conduct —
          that the next generation does not inherit our words, but the way we ourselves live.
          Here is a translation of the main discourse, both parables, and the words of the
          secretary of the akhara and of the mukhya mahant.`,
      },
      hi: {
        rubric: 'प्रवचन',
        title: 'गुरु पूर्णिमा 2026',
        titleEm: 'गुरुदेव के प्रवचन',
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
        title: 'Zero Balance Society vzniklo.',
        titleEm: 'Zde je proč.',
        perex: `Dne 19. června 2026 byl v Krakovanech podepsán zakladatelský dokument
          a Zero Balance Society, z.s. vstoupilo v život. O účelu spolku, jeho zakladatelích
          a duchovním zaměření.`,
      },
      en: {
        rubric: 'From the Association',
        title: 'Zero Balance Society was founded.',
        titleEm: 'Here is why.',
        perex: `On 19 June 2026 the founding document was signed in Krakovany and
          Zero Balance Society, z.s. came into existence. On the purpose of the association,
          its founders and its spiritual orientation.`,
      },
      hi: {
        rubric: 'संस्था से',
        title: 'Zero Balance Society की स्थापना हुई।',
        titleEm: 'यहाँ जानिए क्यों।',
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
