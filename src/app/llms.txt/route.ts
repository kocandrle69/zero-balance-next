import { NextResponse } from 'next/server'

// app/llms.txt/route.ts — Next nemá pro llms.txt vlastní file-convention
// (na rozdíl od robots.txt/sitemap.xml), takže se to řeší jako obyčejný
// Route Handler vracející text/plain. Formát podle https://llmstxt.org/ —
// stručný markdown souhrn webu pro AI agenty/LLM prohledávače, ne pro lidi.
// Do teď žádný neexistoval, takže dotaz padal do [locale] route a spadl
// na 500 (viz dynamicParams=false v [locale]/layout.tsx).
const CONTENT = `# Zero Balance Society

> Zero Balance Society, z.s. is a registered Czech non-profit cultural and
> spiritual association preserving and sharing the meditative, cultural and
> spiritual traditions of India, rooted in the lineage of Gurudev Shri
> Karauli Shankar Mahadev Ji. Based in the Czech Republic, open to the world.

## Pages

- [Homepage](https://www.zero-balance.org/en): Meditation, culture and community — overview of the association's activities and mission.
- [About](https://www.zero-balance.org/en/about): The association, its founders and team.
- [Lineage](https://www.zero-balance.org/en/lineage): The spiritual lineage and philosophy behind the association.
- [Serve](https://www.zero-balance.org/en/serve): How to get involved and support the association.
- [Preserve](https://www.zero-balance.org/en/preserve): Preservation of Indian spiritual and cultural traditions.
- [Community](https://www.zero-balance.org/en/community): Community activities and gatherings.
- [Media](https://www.zero-balance.org/en/media): Video recordings from the ashram, ceremonies and pilgrimages.
- [Journal](https://www.zero-balance.org/en/journal): Discourses, reports and news from the association and the lineage.

## Languages

Available in English, Czech (cs), Hindi (hi), French (fr), Spanish (es) and
German (de) — replace \`/en/\` with \`/cs/\`, \`/hi/\`, \`/fr/\`, \`/es/\` or \`/de/\`
in any URL above.

## Contact

jan@zero-balance.org
`

export function GET() {
  return new NextResponse(CONTENT, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
