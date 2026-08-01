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
