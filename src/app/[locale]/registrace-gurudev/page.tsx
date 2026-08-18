import type { Metadata } from 'next'
import GurudevRegContent from './GurudevRegContent'
import { hreflangAlternates } from '../../../i18n/seo'
import type { AppLocale } from '../../../i18n/routing'

// Zatím jen cs/en mají vlastní meta text — zbylé jazyky (hi/fr/es/de) padají
// na `en`, dokud nedodáme překlad. Stejný fallback mechanismus jako
// GurudevRegContent.tsx a jinde v repu (journal, about pro chybějící hi).
const META: Partial<Record<AppLocale, { title: string; description: string }>> = {
  cs: {
    title: 'Registrace na návštěvu Gurudeva 2027 · Zero Balance Society',
    description: 'Zaregistrujte se na výjimečnou návštěvu Gurudeva Shri Karauli Shankar Mahadev Ji v České republice v květnu 2027.',
  },
  en: {
    title: "Register for Gurudev's Visit 2027 · Zero Balance Society",
    description: 'Register for the extraordinary visit of Gurudev Shri Karauli Shankar Mahadev Ji to the Czech Republic in May 2027.',
  },
}

export async function generateMetadata({ params }: PageProps<'/[locale]/registrace-gurudev'>): Promise<Metadata> {
  const { locale } = await params
  const l = locale as AppLocale
  return { ...(META[l] ?? META.en!), alternates: hreflangAlternates('/registrace-gurudev', l) }
}

export default function GurudevRegPage() {
  return <GurudevRegContent />
}
