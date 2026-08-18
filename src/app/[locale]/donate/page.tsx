import type { Metadata } from 'next'
import DonateContent from './DonateContent'
import { hreflangAlternates } from '../../../i18n/seo'
import type { AppLocale } from '../../../i18n/routing'

const META: Record<AppLocale, { title: string; description: string }> = {
  en: {
    title: 'Donate · Zero Balance Society',
    description: 'Support Zero Balance Society, z.s. with a bank transfer — every gift helps preserve and share Indian spiritual, cultural and meditative traditions.',
  },
  cs: {
    title: 'Darujte · Zero Balance Society',
    description: 'Podpořte Zero Balance Society, z.s. bankovním převodem — každý dar pomáhá uchovávat a předávat indické duchovní, kulturní a meditační tradice.',
  },
  hi: {
    title: 'दान करें · Zero Balance Society',
    description: 'बैंक ट्रांसफर के माध्यम से Zero Balance Society, z.s. को सहयोग दें — हर दान भारतीय आध्यात्मिक, सांस्कृतिक और ध्यान परंपराओं के संरक्षण में मदद करता है।',
  },
  fr: {
    title: 'Faire un don · Zero Balance Society',
    description: 'Soutenez Zero Balance Society, z.s. par virement bancaire — chaque don aide à préserver et transmettre les traditions spirituelles, culturelles et méditatives indiennes.',
  },
  es: {
    title: 'Donar · Zero Balance Society',
    description: 'Apoya a Zero Balance Society, z.s. mediante transferencia bancaria — cada donativo ayuda a preservar y transmitir las tradiciones espirituales, culturales y meditativas de la India.',
  },
  de: {
    title: 'Spenden · Zero Balance Society',
    description: 'Unterstütze Zero Balance Society, z.s. per Banküberweisung — jede Spende hilft, indische spirituelle, kulturelle und meditative Traditionen zu bewahren und weiterzugeben.',
  },
}

export async function generateMetadata({ params }: PageProps<'/[locale]/donate'>): Promise<Metadata> {
  const { locale } = await params
  return { ...META[locale as AppLocale], alternates: hreflangAlternates('/donate', locale as AppLocale) }
}

export default function DonatePage() {
  return <DonateContent />
}
