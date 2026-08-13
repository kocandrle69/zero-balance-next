import { getRequestConfig } from 'next-intl/server'
import { routing, type AppLocale } from './routing'

/**
 * Požaduje next-intl pro server-side vykreslování (viz next.config.ts plugin).
 * Nepoužíváme jejich systém překladových katalogů (messages) — obsah pořád
 * jede přes vlastní `T` slovník a `useLang()` — tohle jen zpřístupní aktuální
 * `locale` klientským `useRouter`/`usePathname` hookům z i18n/navigation.ts,
 * které bez něj (NextIntlClientProvider) hlásí "No intl context found".
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = routing.locales.includes(requested as AppLocale)
    ? (requested as AppLocale)
    : routing.defaultLocale

  return { locale }
})
