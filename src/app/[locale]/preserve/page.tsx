import type { Metadata } from 'next'
import PreserveContent from './PreserveContent'
import { hreflangAlternates } from '../../../i18n/seo'
import type { AppLocale } from '../../../i18n/routing'

const META: Record<AppLocale, { title: string; description: string }> = {
  en: {
    title: 'Preserving Living Wisdom · Zero Balance Society',
    description: 'Zero Balance Society is dedicated to preserving, promoting, and transmitting the living spiritual, cultural, and meditative heritage.',
  },
  cs: {
    title: 'Uchováváme živou moudrost · Zero Balance Society',
    description: 'Zero Balance Society se věnuje uchovávání, šíření a předávání živého duchovního, kulturního a meditačního dědictví.',
  },
  hi: {
    title: 'जीवित ज्ञान का संरक्षण · Zero Balance Society',
    description: 'Zero Balance Society जीवंत आध्यात्मिक, सांस्कृतिक और ध्यान विरासत के संरक्षण, प्रचार और संचरण के लिए समर्पित है।',
  },
}

export async function generateMetadata({ params }: PageProps<'/[locale]/preserve'>): Promise<Metadata> {
  const { locale } = await params
  return { ...META[locale as AppLocale], alternates: hreflangAlternates('/preserve', locale as AppLocale) }
}

export default function PreservePage() {
  return <PreserveContent />
}
