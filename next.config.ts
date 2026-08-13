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
};

export default withNextIntl(nextConfig);
