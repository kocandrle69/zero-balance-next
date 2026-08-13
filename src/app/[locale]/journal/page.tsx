import type { Metadata } from 'next'
import JournalIndex from './JournalIndex'
import { POSTS } from './posts'
import { hreflangAlternates } from '../../../i18n/seo'
import type { AppLocale } from '../../../i18n/routing'

/** Nejnovější vydání — stejné řazení, jaké používá přehled v JournalIndex. */
const latest = [...POSTS].sort((a, b) => b.date.localeCompare(a.date))[0]

/** Perexy jsou v posts.ts psané přes víc řádků; pro meta tagy sjednotíme mezery. */
const oneLine = (s: string) => s.replace(/\s+/g, ' ').trim()

const META: Record<AppLocale, { title: string; description: string }> = {
  en: {
    title: 'Journal · Zero Balance Society',
    description: 'The journal of Zero Balance Society, z.s. — discourses, reports and news from the association and the lineage.',
  },
  cs: {
    title: 'Časopis · Zero Balance Society',
    description: 'Časopis Zero Balance Society, z.s. — promluvy, reportáže a novinky ze spolku a duchovní linie.',
  },
  hi: {
    title: 'पत्रिका · Zero Balance Society',
    description: 'Zero Balance Society, z.s. की पत्रिका — संस्था और परंपरा से प्रवचन, रिपोर्ताज तथा समाचार।',
  },
  fr: {
    title: 'Journal · Zero Balance Society',
    description: 'Le journal de Zero Balance Society, z.s. — discours, reportages et actualités de l’association et de la lignée.',
  },
  es: {
    title: 'Revista · Zero Balance Society',
    description: 'La revista de Zero Balance Society, z.s. — discursos, reportajes y noticias de la asociación y del linaje.',
  },
  de: {
    title: 'Journal · Zero Balance Society',
    description: 'Das Journal von Zero Balance Society, z.s. — Vorträge, Reportagen und Neuigkeiten aus dem Verein und der Tradition.',
  },
}

export async function generateMetadata({ params }: PageProps<'/[locale]/journal'>): Promise<Metadata> {
  const { locale } = await params
  return {
    ...META[locale as AppLocale],
    alternates: hreflangAlternates('/journal', locale as AppLocale),
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
}

export default function JournalPage() {
  return <JournalIndex />
}
