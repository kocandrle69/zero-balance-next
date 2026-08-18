import type { NextConfig } from "next";
import path from "path";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // `dev`/`build` scripts force --webpack (viz package.json): Next 16.2.6's
  // Turbopack proxy má potvrzený "Middleware/Proxy bypass ... single locale"
  // bug (npm audit) — s next-intl proxy.ts pod Turbopackem se nepřesměruje
  // neprefixovaná cesta (/, /about) na /en/..., jen 404. Pod webpackem
  // funguje spolehlivě. Tahle sekce zůstává pro případ, že by se Turbopack
  // v budoucí verzi znovu zapnul.
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    // Next 16 default zúžil povolené `quality` hodnoty na next/image jen na
    // [75] — jakákoli jiná (viz Hero.tsx quality={80}, IndiaSection.tsx
    // quality={70}, DonateContent.tsx quality={82}) se beze slova/chyby
    // přepočítá na nejbližší povolenou, tzn. v praxi vždy na 75. Bez týhle
    // sekce jsou tedy ty ostatní hodnoty mrtvý/matoucí kód, co nic nedělá.
    qualities: [70, 75, 80, 82],
  },
  experimental: {
    // Render-blocking <link rel="stylesheet"> requests (3 chunks, ~20KB
    // gzip) byly na Lighthouse/Ad Grants mobile auditu hlavní brzdou FCP —
    // browser musí HTML doparsovat, teprve pak CSS objevit a stáhnout.
    // inlineCss vloží styly přímo do <head> jako <style>, takže dorazí
    // spolu s HTML v jedné odpovědi. Cena: první návštěva nekešuje CSS
    // zvlášť (re-download při každé nové HTML stránce) — u webu, kde
    // organic/Ads návštěvník nejčastěji přistane jednou na landing page,
    // je to čistý zisk. Prod-only (funguje jen v `next build`, ne v dev).
    inlineCss: true,
  },
};

export default withNextIntl(nextConfig);
