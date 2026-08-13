import type { Metadata } from 'next'
import AboutContent from './AboutContent'
import { hreflangAlternates } from '../../../i18n/seo'
import type { AppLocale } from '../../../i18n/routing'

const META: Record<AppLocale, { title: string; description: string }> = {
  en: {
    title: 'About Us · Zero Balance Society',
    description: 'Zero Balance Society — a non-profit cultural and spiritual association rooted in Indian wisdom traditions. Based in Czech Republic.',
  },
  cs: {
    title: 'O nás · Zero Balance Society',
    description: 'Zero Balance Society — nezisková kulturní a duchovní organizace zakořeněná v indických moudrostních tradicích. Sídlíme v České republice.',
  },
  hi: {
    title: 'हमारे बारे में · Zero Balance Society',
    description: 'Zero Balance Society — भारतीय ज्ञान परंपराओं में निहित एक अलाभकारी सांस्कृतिक एवं आध्यात्मिक संस्था। चेक गणराज्य में स्थित।',
  },
}

export async function generateMetadata({ params }: PageProps<'/[locale]/about'>): Promise<Metadata> {
  const { locale } = await params
  return { ...META[locale as AppLocale], alternates: hreflangAlternates('/about', locale as AppLocale) }
}

export default function AboutPage() {
  return <AboutContent />
}
