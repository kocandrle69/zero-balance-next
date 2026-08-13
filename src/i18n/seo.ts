import { routing, type AppLocale } from './routing'
import { getPathname } from './navigation'

const SITE = 'https://zero-balance.org'

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
