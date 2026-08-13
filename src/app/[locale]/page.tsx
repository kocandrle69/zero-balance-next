import type { Metadata } from 'next'
import Navbar            from '../../components/Navbar'
import Hero              from '../../components/Hero'
import PurposeSection    from '../../components/PurposeSection'
import ActivitiesSection from '../../components/ActivitiesSection'
import IndiaSection      from '../../components/IndiaSection'
import QuoteSection      from '../../components/QuoteSection'
import EventsSection     from '../../components/EventsSection'
import MediaSection from '../../components/MediaSection'
import JoinSection       from '../../components/JoinSection'
import Footer            from '../../components/Footer'
import { hreflangAlternates } from '../../i18n/seo'
import type { AppLocale } from '../../i18n/routing'
import { T } from '../../lib/translations'

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
  const { locale } = await params
  const l = locale as AppLocale
  return {
    title: 'Zero Balance Society',
    description: T[l].foot_desc,
    alternates: hreflangAlternates('/', l),
  }
}

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <PurposeSection />
      <ActivitiesSection />
      <IndiaSection />
      <QuoteSection />
      <MediaSection />
      <EventsSection />
      <JoinSection />
      <Footer />
    </main>
  )
}
