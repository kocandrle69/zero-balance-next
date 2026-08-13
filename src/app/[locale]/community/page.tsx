import type { Metadata } from 'next'
import CommunityContent from './CommunityContent'
import { hreflangAlternates } from '../../../i18n/seo'
import type { AppLocale } from '../../../i18n/routing'

const META: Record<AppLocale, { title: string; description: string }> = {
  en: {
    title: 'Space for Practice, Learning & Community · Zero Balance Society',
    description: 'Zero Balance Society creates spaces where spiritual exploration, personal development, and meaningful human connection can thrive.',
  },
  cs: {
    title: 'Prostor pro praxi, učení a komunitu · Zero Balance Society',
    description: 'Zero Balance Society vytváří prostor, kde může vzkvétat duchovní hledání, osobní rozvoj a opravdové lidské spojení.',
  },
  hi: {
    title: 'अभ्यास, शिक्षा और समुदाय के लिए स्थान · Zero Balance Society',
    description: 'Zero Balance Society ऐसे स्थान बनाती है जहाँ आध्यात्मिक खोज, व्यक्तिगत विकास और सार्थक मानवीय जुड़ाव पनप सकें।',
  },
}

export async function generateMetadata({ params }: PageProps<'/[locale]/community'>): Promise<Metadata> {
  const { locale } = await params
  return { ...META[locale as AppLocale], alternates: hreflangAlternates('/community', locale as AppLocale) }
}

export default function CommunityPage() {
  return <CommunityContent />
}
