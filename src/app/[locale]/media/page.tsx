import { Suspense } from 'react'
import type { Metadata } from 'next'
import MediaContent from './MediaContent'
import { hreflangAlternates } from '../../../i18n/seo'
import type { AppLocale } from '../../../i18n/routing'

const META: Record<AppLocale, { title: string; description: string }> = {
  en: {
    title: 'Media · Zero Balance Society',
    description: 'Guided meditations with Gurudev, footage from the ashram, havans and rituals, journeys through Bharat, and video lessons in yogic wisdom.',
  },
  cs: {
    title: 'Média · Zero Balance Society',
    description: 'Řízené meditace s Gurudevem, záběry z ášramu, havany a rituály, cesty Bháratem a videolekce jógové moudrosti.',
  },
  hi: {
    title: 'मीडिया · Zero Balance Society',
    description: 'गुरुदेव के साथ निर्देशित ध्यान, आश्रम के दृश्य, हवन और अनुष्ठान, भारत की यात्राएँ तथा योग-ज्ञान के वीडियो पाठ।',
  },
}

export async function generateMetadata({ params }: PageProps<'/[locale]/media'>): Promise<Metadata> {
  const { locale } = await params
  return { ...META[locale as AppLocale], alternates: hreflangAlternates('/media', locale as AppLocale) }
}

export default function MediaPage() {
  return (
    <Suspense>
      <MediaContent />
    </Suspense>
  )
}
