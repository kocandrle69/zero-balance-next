import { defineRouting } from 'next-intl/routing'

/**
 * ROUTING CONFIG — src/i18n/routing.ts
 *
 * Jediné místo, kde se definují podporované jazyky a jak se projeví v URL.
 *
 * `localePrefix: 'always'` — každý jazyk včetně výchozí angličtiny má
 * v URL prefix (/en/about, /cs/about, /hi/about). Původně jsem plánoval
 * 'as-needed' (výchozí jazyk bez prefixu, aby se neměnily dnešní adresy),
 * ale v této verzi Next.js (16) je s Turbopackem a jediným neprefixovaným
 * locale prokazatelně rozbitý proxy rewrite — bare `/about` spadne do
 * 404 (viz `npm audit`: "Middleware / Proxy bypass ... Turbopack and
 * single locale"). Ověřeno v devu: /en, /cs, /hi prefixy fungují spolehlivě,
 * bez prefixu ne. `always` tomu bugu předchází úplně.
 *
 * Důsledek: dnešní bezprefixové adresy (/about) je třeba přesměrovat na
 * /en/about — proxy to dělá automaticky, ale je to jeden redirect navíc
 * pro staré odkazy/záložky.
 *
 * fr/es/de: UI texty (nav, hero, patičky…) jsou hotové v translations.ts.
 * Prozaický obsah podstránek (About, Lineage, Serve…) a journal zatím
 * překlad nemají — na těch místech se automaticky použije anglický text
 * (stejný fallback mechanismus jako u chybějících hi překladů v journalu).
 */
export const routing = defineRouting({
  locales: ['en', 'cs', 'hi', 'fr', 'es', 'de'],
  defaultLocale: 'en',
  localePrefix: 'always',
})

export type AppLocale = (typeof routing.locales)[number]
