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
 *   ![popisek](/images/x.jpg "right")  fotografie; side = full | left | right
 *   [Text odkazu](https://…)           odkaz na záznam (samostatný řádek)
 *   > text                             drobná výkladová poznámka v textu
 *   !> text                            zvýrazněné sdělení (rámeček se zlatou linkou)
 *   ---                                vše za oddělovačem je závěrečná poznámka
 *   *kurzíva*  **tučně**               uvnitř odstavce
 *   [text](https://…)                  odkaz uvnitř odstavce/poznámky/calloutu
 *   [**tučný text**](https://…)        totéž, tučně (jen tato jedna kombinace)
 *
 * Odstavce se oddělují prázdným řádkem.
 */

export type Side = 'full' | 'left' | 'right'

export type Block =
  | { k: 'h2' | 'h3' | 'p' | 'note' | 'callout'; t: string }
  | { k: 'video'; href: string; t: string }
  | { k: 'fig'; src: string; side: Side; alt: string }

const FIG = /^!\[([^\]]*)\]\(([^)\s]+)(?:\s+"(full|left|right)")?\)$/
const LINK = /^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/

export function parseMarkdown(md: string): Block[] {
  const blocks: Block[] = []
  // vše za `---` je závěrečná poznámka (o rozsahu překladu apod.)
  let afterRule = false

  for (const chunk of md.split(/\n{2,}/)) {
    const t = chunk.trim().replace(/\s*\n\s*/g, ' ')
    if (!t) continue

    if (t === '---') { afterRule = true; continue }

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
