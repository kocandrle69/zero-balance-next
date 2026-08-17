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

// Cokoliv mimo generateStaticParams (např. /robots.txt, /llms.txt — nemáme
// pro ně vlastní route, takže je Next zkouší matchovat jako [locale]) má bez
// tohohle za následek 500: generateMetadata na jednotlivých stránkách čte
// T[locale]/META[locale] bez ochrany, a ten `notFound()` o pár řádků níž
// v tomhle souboru se stihne spustit až PO generateMetadata, takže nestačí.
// dynamicParams=false vrátí čisté 404 dřív, než se cokoliv z toho spustí.
export const dynamicParams = false

export const metadata: Metadata = {
  // Bez metadataBase se relativní cesty v openGraph.images překládají proti
  // localhost:3000 a náhledy na WhatsAppu/Facebooku zůstanou bez obrázku.
  metadataBase: new URL('https://www.zero-balance.org'),
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
      {/* Hero titulek ("Meditaci. Kulturu. Komunitu.") je vždy první text,
          co uživatel vidí — Cormorant Garamond 600 (normální slova) + 400
          italic (zvýrazněné slovo v <em>), latinský unicode-range. Bez
          preloadu prohlížeč font objeví až při parsování inlinovaného CSS,
          takže krátce bliká systémovým fontem (FOUT); s preloadem stihne
          soubor začít stahovat prakticky hned s HTML. Jen tyhle dvě
          konkrétní řezy — zbytek vah/jazyků (Hindi apod.) nechává normální
          lazy discovery, ať se nepředstahuje zbytečně.
          next/font/google se tu záměrně nepoužívá — fonty jsou self-hostnuté
          v public/fonts/ kvůli historickému bugu (viz komentář v
          globals.css: produkční Turbopack build externí @import tiše
          ztrácel + problém s českou diakritikou v Safari). */}
      <link rel="preload" as="font" type="font/woff2" href="/fonts/ac5feb9532.woff2" crossOrigin="anonymous" />
      <link rel="preload" as="font" type="font/woff2" href="/fonts/880eabe202.woff2" crossOrigin="anonymous" />
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
