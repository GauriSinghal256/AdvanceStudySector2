import { OverlayHero } from '../common/OverlayHero'
import { TestimonialsSection } from '../home/TestimonialsSection'
import { ResultsSection } from './ResultsSection'
import { AwardsSection } from './AwardsSection'
import { InstagramVideosSection } from './InstagramVideosSection'
import './TestimonialsResultsPage.css'

export function TestimonialsResultsPage() {
  return <>
    <section className="page-section testimonials-results-page section-wrap">
      <OverlayHero label="08 / Proof, not promises" title={<>Testimonials<br /><em>& results.</em></>} intro="Real voices from our learners, alongside the results that come from steady, personal mentoring." image="/images.jpg" imageAlt="Student learning online" />
    </section>
    <AwardsSection />
    <InstagramVideosSection />
    <TestimonialsSection />
    <ResultsSection />
  </>
}
