import type { MetadataRoute } from 'next'
import { routing } from '../i18n/routing'
import { POSTS } from './[locale]/journal/posts'

// www, ne apex — apex na www přesměrovává (307); viz i18n/seo.ts.
const SITE = 'https://www.zero-balance.org'

// Statické cesty, které existují ve všech jazycích. `coming-soon` je
// záměrně vynechaná — je to placeholder stránka, ne obsah k indexování.
const STATIC_PATHS = ['', '/about', '/lineage', '/serve', '/preserve', '/community', '/media', '/journal']

/**
 * app/sitemap.ts — na kořeni `app/`, mimo `[locale]`, ze stejného důvodu
 * jako robots.ts: sitemapa je jedna pro celý web, ne per-jazyk.
 *
 * Pro každou cestu (statickou i journal článek) vygeneruje jeden <url>
 * záznam na jazyk + `alternates.languages` se všemi ostatními jazykovými
 * variantami, stejný princip jako `hreflangAlternates()` v i18n/seo.ts,
 * jen ve formátu, který sitemap.xml očekává.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...STATIC_PATHS, ...POSTS.map(p => `/journal/${p.slug}`)]

  const entries: MetadataRoute.Sitemap = []

  for (const path of paths) {
    const languages: Record<string, string> = {}
    for (const l of routing.locales) {
      languages[l] = `${SITE}/${l}${path}`
    }
    languages['x-default'] = `${SITE}/${routing.defaultLocale}${path}`

    const post = POSTS.find(p => `/journal/${p.slug}` === path)

    for (const l of routing.locales) {
      entries.push({
        url: `${SITE}/${l}${path}`,
        lastModified: post?.date ?? undefined,
        changeFrequency: path === '' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : path === '/journal' ? 0.7 : 0.6,
        alternates: { languages },
      })
    }
  }

  return entries
}
