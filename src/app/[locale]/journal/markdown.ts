/**
 * MARKDOWN → BLOKY — src/app/journal/markdown.ts
 *
 * Text článků žije v `content/<slug>.<lang>.md`. Tenhle parser z něj udělá
 * prostá data (žádné JSX), aby šla poslat ze server komponenty do klientské.
 *
 * Podporovaná značkovací sada — schválně malá, na dlouhý text víc netřeba:
 *
 *   ## Nadpis                          kapitola
 *   ### Nadpis                         podkapitola
 *   ![popisek](/images/x.jpg "right")  fotografie; side = full | left | right | plain
 *                                      (plain = bez oříznutí — diagram/screenshot
 *                                      s popisky až u okrajů, ne fotka s "obětovatelným"
 *                                      okrajem; celá šířka, výška podle poměru stran)
 *   [Text odkazu](https://…)           odkaz na záznam (samostatný řádek)
 *   > text                             drobná výkladová poznámka v textu
 *   !> text                            zvýrazněné sdělení (rámeček se zlatou linkou)
 *   ---                                vše za oddělovačem je závěrečná poznámka
 *   ***                                tenká zlatá dělicí linka mezi oddíly
 *                                      (na rozdíl od --- nic nespouští, jen odděluje)
 *   | A | B |                          tabulka (GFM styl) — hlavička, oddělovací
 *   | --- | --- |                      řádek `---`, pak datové řádky; žádné prázdné
 *   | x | y |                          řádky uvnitř bloku
 *   *kurzíva*  **tučně**               uvnitř odstavce/buňky tabulky
 *   [text](https://…)                  odkaz uvnitř odstavce/poznámky/calloutu/buňky
 *   [**tučný text**](https://…)        totéž, tučně (jen tato jedna kombinace)
 *
 * Odstavce se oddělují prázdným řádkem.
 */

export type Side = 'full' | 'left' | 'right' | 'plain'

export type Block =
  | { k: 'h2' | 'h3' | 'p' | 'note' | 'callout'; t: string }
  | { k: 'video'; href: string; t: string }
  | { k: 'fig'; src: string; side: Side; alt: string }
  | { k: 'divider' }
  | { k: 'table'; headers: string[]; rows: string[][] }

const FIG = /^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"(full|left|right|plain)")?\)$/
const LINK = /^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/
const TABLE_SEP_CELL = /^:?-{3,}:?$/

function splitTableRow(line: string): string[] {
  let s = line.trim()
  if (s.startsWith('|')) s = s.slice(1)
  if (s.endsWith('|')) s = s.slice(0, -1)
  return s.split('|').map(c => c.trim())
}

export function parseMarkdown(md: string): Block[] {
  const blocks: Block[] = []
  // vše za `---` je závěrečná poznámka (o rozsahu překladu apod.)
  let afterRule = false

  for (const chunk of md.split(/\n{2,}/)) {
    const rawTrim = chunk.trim()
    if (!rawTrim) continue

    // Tabulka: hlavička + oddělovací řádek `---` + datové řádky, vše na
    // jednotlivých (neprázdných) řádcích uvnitř jednoho bloku.
    const rawLines = rawTrim.split('\n').map(l => l.trim()).filter(Boolean)
    if (rawLines.length >= 2 && rawLines[0].startsWith('|')) {
      const sepCells = splitTableRow(rawLines[1])
      if (sepCells.length > 0 && sepCells.every(c => TABLE_SEP_CELL.test(c))) {
        const headers = splitTableRow(rawLines[0])
        const rows = rawLines.slice(2).map(splitTableRow)
        blocks.push({ k: 'table', headers, rows })
        continue
      }
    }

    const t = rawTrim.replace(/\s*\n\s*/g, ' ')
    if (!t) continue

    if (t === '---') { afterRule = true; continue }
    if (t === '***') { blocks.push({ k: 'divider' }); continue }

    const fig = FIG.exec(t)
    if (fig) {
      blocks.push({ k: 'fig', alt: fig[1], src: fig[2], side: (fig[3] as Side) ?? 'full' })
      continue
    }

    const link = LINK.exec(t)
    if (link) { blocks.push({ k: 'video', t: link[1], href: link[2] }); continue }

    if (t.startsWith('### ')) { blocks.push({ k: 'h3', t: t.slice(4) }); continue }
    if (t.startsWith('## '))  { blocks.push({ k: 'h2', t: t.slice(3) }); continue }
    // pozor na pořadí: `!> ` musí projít dřív než `> `
    if (t.startsWith('!> '))  { blocks.push({ k: 'callout', t: t.slice(3) }); continue }
    if (t.startsWith('> '))   { blocks.push({ k: 'note', t: t.slice(2) }); continue }

    blocks.push({ k: afterRule ? 'note' : 'p', t })
  }

  return blocks
}
