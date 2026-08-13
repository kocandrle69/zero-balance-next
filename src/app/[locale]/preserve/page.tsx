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
  fr: {
    title: 'Préserver une sagesse vivante · Zero Balance Society',
    description: 'Zero Balance Society se consacre à préserver, faire connaître et transmettre un héritage spirituel, culturel et méditatif vivant.',
  },
  es: {
    title: 'Preservar una sabiduría viva · Zero Balance Society',
    description: 'Zero Balance Society se dedica a preservar, difundir y transmitir el patrimonio espiritual, cultural y meditativo vivo.',
  },
  de: {
    title: 'Lebendige Weisheit bewahren · Zero Balance Society',
    description: 'Zero Balance Society widmet sich der Bewahrung, Förderung und Weitergabe des lebendigen spirituellen, kulturellen und meditativen Erbes.',
  },
}

export async function generateMetadata({ params }: PageProps<'/[locale]/preserve'>): Promise<Metadata> {
  const { locale } = await params
  return { ...META[locale as AppLocale], alternates: hreflangAlternates('/preserve', locale as AppLocale) }
}

export default function PreservePage() {
  return <PreserveContent />
}
