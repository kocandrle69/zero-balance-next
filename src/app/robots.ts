import type { MetadataRoute } from 'next'

/**
 * app/robots.ts — MUSÍ být na téhle úrovni (kořen `app/`), ne pod
 * `[locale]/`: robots.txt je jeden soubor pro celý web, ne per-jazyk.
 *
 * Do teď žádný neexistoval, takže požadavek na /robots.txt propadl až
 * do dynamické [locale] route (locale="robots.txt") a spadl na 500 —
 * viz `dynamicParams = false` v `[locale]/layout.tsx`, který teď aspoň
 * vrací čisté 404 pro cokoliv bez vlastní route. Tenhle soubor dělá to,
 * co PageSpeed/Ad Grants audit i Google ve skutečnosti čekají: platný
 * robots.txt s odkazem na sitemapu.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://www.zero-balance.org/sitemap.xml',
  }
}
