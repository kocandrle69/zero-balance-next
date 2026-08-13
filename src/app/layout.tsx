import './globals.css'
import { LangProvider } from '../contexts/LangContext'
import type { Viewport } from 'next'
import Script from 'next/script'

export const metadata = {
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LangProvider>
          {children}
        </LangProvider>
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
