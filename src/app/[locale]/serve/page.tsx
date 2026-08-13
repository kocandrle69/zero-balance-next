import type { Metadata } from 'next'
import ServeContent from './ServeContent'
import { hreflangAlternates } from '../../../i18n/seo'
import type { AppLocale } from '../../../i18n/routing'

const META: Record<AppLocale, { title: string; description: string }> = {
  en: {
    title: 'Serving for No Profit · Zero Balance Society',
    description: 'Zero Balance Society is a non-profit association. Service is at the heart of everything we do — dedicated to humanity, not commercial gain.',
  },
  cs: {
    title: 'Sloužíme, ne podnikáme · Zero Balance Society',
    description: 'Zero Balance Society je nezisková organizace. Služba je jádrem všeho, co děláme — oddaní lidem, ne komerčnímu zisku.',
  },
  hi: {
    title: 'लाभ के बिना सेवा · Zero Balance Society',
    description: 'Zero Balance Society एक अलाभकारी संस्था है। सेवा हमारे हर कार्य के केंद्र में है — मानवता को समर्पित, व्यावसायिक लाभ को नहीं।',
  },
  fr: {
    title: 'Au service, sans but lucratif · Zero Balance Society',
    description: 'Zero Balance Society est une association à but non lucratif. Le service est au cœur de tout ce que nous faisons — dédié à l’humain, non au profit.',
  },
  es: {
    title: 'Al servicio, sin ánimo de lucro · Zero Balance Society',
    description: 'Zero Balance Society es una asociación sin ánimo de lucro. El servicio está en el centro de todo lo que hacemos — dedicado a las personas, no al beneficio comercial.',
  },
  de: {
    title: 'Im Dienst, ohne Gewinnabsicht · Zero Balance Society',
    description: 'Zero Balance Society ist ein gemeinnütziger Verein. Dienst steht im Mittelpunkt all unseres Tuns — den Menschen gewidmet, nicht dem kommerziellen Gewinn.',
  },
}

export async function generateMetadata({ params }: PageProps<'/[locale]/serve'>): Promise<Metadata> {
  const { locale } = await params
  return { ...META[locale as AppLocale], alternates: hreflangAlternates('/serve', locale as AppLocale) }
}

export default function ServePage() {
  return <ServeContent />
}
