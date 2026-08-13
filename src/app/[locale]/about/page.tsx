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
  fr: {
    title: 'À propos · Zero Balance Society',
    description: 'Zero Balance Society — une association culturelle et spirituelle à but non lucratif ancrée dans les traditions de sagesse indiennes. Basée en République tchèque.',
  },
  es: {
    title: 'Sobre nosotros · Zero Balance Society',
    description: 'Zero Balance Society — una asociación cultural y espiritual sin ánimo de lucro arraigada en las tradiciones de sabiduría de la India. Con sede en la República Checa.',
  },
  de: {
    title: 'Über uns · Zero Balance Society',
    description: 'Zero Balance Society — eine gemeinnützige Kultur- und spirituelle Gesellschaft, verwurzelt in indischen Weisheitstraditionen. Mit Sitz in der Tschechischen Republik.',
  },
}

export async function generateMetadata({ params }: PageProps<'/[locale]/about'>): Promise<Metadata> {
  const { locale } = await params
  return { ...META[locale as AppLocale], alternates: hreflangAlternates('/about', locale as AppLocale) }
}

export default function AboutPage() {
  return <AboutContent />
}
