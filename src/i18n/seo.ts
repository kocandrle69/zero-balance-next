import { routing, type AppLocale } from './routing'
import { getPathname } from './navigation'

// www, ne apex — apex na www přesměrovává (307), takže canonical/hreflang
// na apex je z pohledu Googlu neplatný odkaz (vede přes redirect, ne na
// skutečně servírovanou stránku). Potvrzeno PageSpeed auditem 17. 8. 2026.
const SITE = 'https://www.zero-balance.org'

/**
 * hreflang alternates pro danou stránku napříč všemi podporovanými jazyky
 * + `x-default` (ukazuje na výchozí jazyk). `pathname` je locale-neutrální
 * cesta, např. '/about' nebo '/journal/karma-tri-druhy'.
 *
 * Bez tohohle Google neví, že např. /about a /cs/about jsou tatáž stránka
 * v jiném jazyce, a hrozí, že je bude považovat za duplicitní obsah.
 */
export function hreflangAlternates(pathname: string, locale: AppLocale) {
  const languages: Record<string, string> = {}
  for (const l of routing.locales) {
    languages[l] = SITE + getPathname({ locale: l, href: pathname })
  }
  languages['x-default'] = SITE + getPathname({ locale: routing.defaultLocale, href: pathname })

  return {
    canonical: SITE + getPathname({ locale, href: pathname }),
    languages,
  }
}
