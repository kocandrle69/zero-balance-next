import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

/**
 * src/proxy.ts
 *
 * V této verzi Next.js (16) byl soubor `middleware.ts` přejmenován na
 * `proxy.ts` (viz node_modules/next/dist/docs/.../file-conventions/proxy.md)
 * — funkce, kterou next-intl generuje, má ale identickou signaturu
 * (NextRequest -> NextResponse), takže se dá exportovat beze změny.
 *
 * Zajišťuje: detekci jazyka (cookie > Accept-Language > výchozí 'en'),
 * redirect na prefixovanou URL pro ne-výchozí jazyky a hlavičku
 * Link s alternate jazykovými verzemi pro vyhledávače.
 */
export default createMiddleware(routing)

export const config = {
  // Vynechá statické assety, obrázky, favicon a interní Next.js cesty.
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
