import JournalIndex from './JournalIndex'
import { POSTS } from './posts'

/** Nejnovější vydání — stejné řazení, jaké používá přehled v JournalIndex. */
const latest = [...POSTS].sort((a, b) => b.date.localeCompare(a.date))[0]

/** Perexy jsou v posts.ts psané přes víc řádků; pro meta tagy sjednotíme mezery. */
const oneLine = (s: string) => s.replace(/\s+/g, ' ').trim()

export const metadata = {
  title: 'Journal · Zero Balance Society',
  description: 'The journal of Zero Balance Society, z.s. — discourses, reports and news from the association and the lineage.',
  // Náhled při sdílení odkazu. Je statický v HTML, takže se přepínač jazyků
  // na webu do něj nepromítne — držíme ho česky, podle většiny čtenářů.
  openGraph: {
    title: 'Časopis · Zero Balance Society',
    description: oneLine(latest.meta.cs.perex),
    images: [latest.cover],
    locale: 'cs_CZ',
    type: 'website',
  },
}

export default function JournalPage() {
  return <JournalIndex />
}
