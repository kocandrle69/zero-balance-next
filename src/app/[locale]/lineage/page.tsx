import type { Metadata } from 'next'
import LineageContent from './LineageContent'
import { hreflangAlternates } from '../../../i18n/seo'
import type { AppLocale } from '../../../i18n/routing'

const META: Record<AppLocale, { title: string; description: string }> = {
  en: {
    title: 'Authentic Lineage · Zero Balance Society',
    description: 'The spiritual heritage of Shri Radharaman Ji Mishra — an unbroken lineage of Tantra Kriya Yoga, sacred knowledge, and living tradition.',
  },
  cs: {
    title: 'Autentická linie · Zero Balance Society',
    description: 'Duchovní odkaz Shri Radharaman Ji Mishra — nepřerušená linie Tantra Kriya Yogy, posvátného poznání a živé tradice.',
  },
  hi: {
    title: 'प्रामाणिक परंपरा · Zero Balance Society',
    description: 'श्री राधारमण जी मिश्र की आध्यात्मिक विरासत — तंत्र क्रिया योग, पवित्र ज्ञान और जीवंत परंपरा की एक अखंड शृंखला।',
  },
}

export async function generateMetadata({ params }: PageProps<'/[locale]/lineage'>): Promise<Metadata> {
  const { locale } = await params
  return { ...META[locale as AppLocale], alternates: hreflangAlternates('/lineage', locale as AppLocale) }
}

export default function LineagePage() {
  return <LineageContent />
}
