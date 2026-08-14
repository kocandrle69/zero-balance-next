export {}

// window.gtag/dataLayer jsou nastaveny inline skriptem v app/[locale]/layout.tsx
// (GA4 gtag.js) — potřebujeme je odsud, z CookieConsent.tsx, volat pro
// Consent Mode v2 update po rozhodnutí uživatele.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}
