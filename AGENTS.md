<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project conventions (zero-balance-next)

Distilled from prior working sessions on this repo. These are decisions already made — don't re-litigate them from scratch.

## Architecture / i18n

- `middleware.ts` is renamed `src/proxy.ts` here, exporting `proxy` (not `middleware`).
- Turbopack is Next's default bundler, but this repo forces webpack: `next dev --webpack` / `next build --webpack` in `package.json`. Reason: a real Turbopack bug (GHSA-6gpp-xcg3-4w24) breaks `localePrefix: 'as-needed'` redirects (404 instead of 307). Don't remove `--webpack` without re-checking that bug is fixed upstream.
- `next-intl` (v4.13.6) is used **only for routing/navigation** (`routing.ts`, `navigation.ts`, `request.ts`, `proxy.ts`) — it is NOT the translation system. Actual copy lives in `translations.ts` and per-component `CONTENT = { en, cs, hi, fr, es, de }` objects, selected via a ternary chain ending `: CONTENT.en` (untranslated languages silently fall back to English).
- `app/[locale]/layout.tsx` must call `setRequestLocale(locale)` — omitting it makes next-intl silently degrade SSG to dynamic rendering. After any i18n-adjacent change, run `npm run build` and confirm the route table still shows `●` (static), not `ƒ` (dynamic).
- `PostLang` ('cs'|'en'|'hi', Journal-only) is intentionally narrower than `Lang` (full site, includes fr/es/de). Convert via `toPostLang()` in `posts.ts` (maps fr/es/de → en) — don't widen `PostLang` itself.
- Next.js 16 breaking changes that bit this project: `priority` on `next/image` is deprecated and no longer sets `fetchPriority`/`loading="eager"` automatically — set both explicitly on above-the-fold images (e.g. first hero carousel slide). `images.qualities` defaults to `[75]` only — any other `quality={...}` is silently clamped to 75 unless added to `next.config.ts`.
- YouTube thumbnails and SVG logos are intentionally plain `<img>`, not `next/image` (Next refuses to optimize SVGs without `dangerouslyAllowSVG`, not worth enabling for one logo).
- Fonts (Cinzel, Cormorant Garamond, DM Sans) are self-hosted under `public/fonts/*.woff2` via `@font-face` in `globals.css` — a Google Fonts `@import` was silently dropped by Turbopack in production, so don't reintroduce an external font `@import`.

## Settled visual decisions — don't re-litigate

- Heading font-weight (Cormorant Garamond) is **300 (light)**. Already tried 400/500 and reverted. If you change a visual value after going back and forth, document the final choice as a comment in `globals.css` so it isn't re-debated later.
- `subpage.module.css .heroTitle` (About/Lineage/Serve/Preserve/Community hero) is a deliberate exception at `font-weight: 400`.
- `overflow-x: hidden` belongs on `html`, never on `body` (breaks iOS Safari). A temporary `overflow: hidden` on `body` for a lightbox etc. is fine.
- Journal cover-photo "burned-in caption banner" mode (`coverBanner: true`) was removed entirely in favor of one shared hero gradient style. New Journal cover photos should be top-aligned (`coverPos: 'center 0%'` or `'left top'`).

## Git / deploy workflow

- Default branch for all work is `dev`. Only push to `main` when explicitly asked ("push na main"), and only via `git checkout main && git reset --hard origin/main && git cherry-pick <hash>` — never merge (the branches carry independently cherry-picked history).
- Before pushing to `main`, check that `/registrace-gurudev` isn't being carried along unintentionally: `grep -rn "registrace-gurudev|airtable|Airtable" src`. That page must stay dev-only until the user explicitly says otherwise (it's gated on an unannounced visit date).
- Long commit messages containing backticks must not go through `-m "..."` (shell command substitution risk) — write the message to a temp file and use `git commit -F <file>`.
- Before restarting the local dev server on port 3000: `lsof -ti:3000 | xargs -r kill -9` (a stale process otherwise makes curl checks misleading).
- Pre-commit verification sequence: `npx tsc --noEmit -p .` → `npm run build` (confirm SSG `●`, not `ƒ`) → `npx eslint <files>` → `curl` against a locally running `npm run start` → commit → push to `origin dev`.
- macOS is case-insensitive; Vercel/Linux is not — watch exact casing on image/font paths, or the Vercel build breaks even though it works locally.
- Vercel deploys on this project are occasionally flaky and may need a manual re-trigger.

## Content / editorial conventions

- A copy change in one language (cs/en/hi) must be mirrored into all three — leaving them out of sync is treated as a mistake, not a partial task.
- Journal posts use a custom minimal markdown dialect (`markdown.ts`), not standard markdown: `### Heading` (not `##`), `***` as a divider, `> text` as a note, `!> text` as a callout, `![alt](/img "left|right|full|plain")` for images, and a bare `[Text](url)` line on its own = a video embed.
- Gurudev/Sensei talk transcripts: omit chants, addresses, and pure ritual mechanics (chanting itself), but keep meditation *instructions* (e.g. on AUM) when part of the talk. Format: editorial note up top, thematic subheadings, speaker names bold, uncertain passages in italic `[square brackets]` (don't smooth them over), Sanskrit/Hindi terms parenthesized with a translation.
- Official titles, kept consistent across all languages: "Sensei Rajeev Sinha, PhD" (Président/Presidente/Ehrenvorsitzender d'honneur), "PhDr. Jiří Kočandrle" (Vice-président/Vicepresidente/Stellvertretender Vorsitzender).
- `registrace-gurudev` is a deliberate exception to the otherwise-English page slugs (`about`, `donate`, `serve`, `community`) — don't rename it to match.
- Brand tone for the planned Gurudev visit (May 2027): never state unconfirmed specifics (cities, day counts, "limited capacity", "early-bird"); always frame it as a "cultural-educational program", never "retreat" or "guru visit"; "Pattábhišék" translates as "installation", never "coronation".
- ElevenLabs attribution (Media page credit): spell exactly "ElevenLabs" (never "Eleven Labs" or all-caps), don't distort/recolor the logo, keep clear space and a minimum ~18–24px height.

## Known gotchas / deliberate gaps

- `MediaContent.tsx` has a pre-existing SSR gap (Suspense + `useSearchParams` with no fallback) — content doesn't render in raw HTML for any language, only after client hydration. Affects only no-JS clients/crawlers; left out of scope on purpose.
- `MediaSection.tsx`'s `VIDEOS`/`CATEGORIES` datasets are deliberately left untranslated for fr/es/de (fall back to English) — too large for the current translation batches.
- The site originally shipped with no `next/image` at all (plain `<img>`, no srcset/WebP/lazy-loading), which produced a 15.6s mobile LCP and was the reason Google rejected the Ad Grants application. Being migrated incrementally to `next/image` + self-hosted fonts + `inlineCss`.
- `robots.ts`/`sitemap.ts`/`llms.txt` were missing entirely, causing `/robots.txt` and `/llms.txt` to 500 (not 404) by falling into the `[locale]` route with `locale="robots.txt"`. Fixed via `dynamicParams = false` in `[locale]` layout plus real `robots.ts`/`sitemap.ts`/`llms.txt` files (sitemap = 102 URLs = 17 paths × 6 languages).
- Canonical/hreflang links must point at `www.zero-balance.org` (the apex domain redirects to `www`) — a canonical pointing at the apex is treated by Google as invalid.
- Repo size is a standing concern (approaching 1GB) due to images — always compress/optimize photos before committing them.
- Official org details (registered name, address, IČO, bank account) are the source of truth in the footer component — don't hardcode a second copy elsewhere; update the footer and let it flow through.
- Brevo newsletter integration uses `NEXT_PUBLIC_BREVO_API_KEY` / `NEXT_PUBLIC_BREVO_LIST_ID`, plus a per-language `GURUDEV_LIST_IDS[lang]` map (Brevo's free plan only supports separate lists, not segments), with a fallback to `.en`.
