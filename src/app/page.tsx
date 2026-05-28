import Navbar            from '../components/Navbar'
import Hero              from '../components/Hero'
import PurposeSection    from '../components/PurposeSection'
import AboutSection      from '../components/AboutSection'
import ActivitiesSection from '../components/ActivitiesSection'
import IndiaSection      from '../components/IndiaSection'
import QuoteSection      from '../components/QuoteSection'
import EventsSection     from '../components/EventsSection'
import MediaSection from '../components/MediaSection'
import JoinSection       from '../components/JoinSection'
import Footer            from '../components/Footer'

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <PurposeSection />
      <AboutSection />
      <ActivitiesSection />
      <IndiaSection />
      <QuoteSection />
      <EventsSection />
      <MediaSection />
      <JoinSection />
      <Footer />
    </main>
  )
}
