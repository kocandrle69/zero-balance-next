import './globals.css'
import { LangProvider } from '../../contexts/LangContext'
import { routing, type AppLocale } from '../../i18n/routing'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import type { Viewport, Metadata } from 'next'
import Script from 'next/script'

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
            gtag('js', new Date());
            gtag('config', 'G-2MM4YED57Y');
          `}
        </Script>
      </body>
    </html>
  )
}
