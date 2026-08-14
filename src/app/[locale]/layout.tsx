import './globals.css'
import { LangProvider } from '../../contexts/LangContext'
import { routing, type AppLocale } from '../../i18n/routing'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import type { Viewport, Metadata } from 'next'
import Script from 'next/script'
import CookieConsent from '../../components/CookieConsent'

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export const metadata: Metadata = {
  // Bez metadataBase se relativní cesty v openGraph.images překládají proti
  // localhost:3000 a náhledy na WhatsAppu/Facebooku zůstanou bez obrázku.
  metadataBase: new URL('https://zero-balance.org'),
  title: 'Zero Balance Society',
  description: 'A non-profit association inspired by Indian spiritual traditions. A space for meditation, culture and community.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default async function RootLayout({ children, params }: LayoutProps<'/[locale]'>) {
  const { locale } = await params
  // Neplatný segment v URL (cokoliv mimo en/cs/hi) → 404 místo tichého pádu na výchozí jazyk.
  if (!routing.locales.includes(locale as AppLocale)) notFound()
  // Bez tohohle next-intl interně čte locale dynamicky přes request-scoped
  // API a celá routa i s generateStaticParams skončí jako ƒ (dynamic)
  // místo prerendered static HTML.
  setRequestLocale(locale)

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={{}}>
          <LangProvider initialLang={locale as AppLocale}>
            {children}
            <CookieConsent />
          </LangProvider>
        </NextIntlClientProvider>
        {/* Google tag (gtag.js) — loads on every route, once per session */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2MM4YED57Y"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}

            // Consent Mode v2 — výchozí stav je "vše zamítnuto", dokud se
            // uživatel nerozhodne (nebo dokud si nenačteme jeho dřívější
            // volbu z localStorage, klíč zbs_consent = 'granted' | 'denied').
            // Musí být pushnuto PŘED 'config', jinak GA stihne odeslat
            // hit ještě v nezúženém režimu.
            var zbsConsent = 'denied';
            try { if (localStorage.getItem('zbs_consent') === 'granted') zbsConsent = 'granted'; } catch (e) {}
            gtag('consent', 'default', {
              ad_storage: zbsConsent,
              ad_user_data: zbsConsent,
              ad_personalization: zbsConsent,
              analytics_storage: zbsConsent,
              wait_for_update: 500
            });

            gtag('js', new Date());
            gtag('config', 'G-2MM4YED57Y');
          `}
        </Script>
      </body>
    </html>
  )
}
