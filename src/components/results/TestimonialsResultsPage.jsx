import { OverlayHero } from '../common/OverlayHero'
import { TestimonialsSection } from '../home/TestimonialsSection'
import { ResultsSection } from './ResultsSection'
import { AwardsSection } from './AwardsSection'
import { InstagramVideosSection } from './InstagramVideosSection'
import './TestimonialsResultsPage.css'

export function TestimonialsResultsPage() {
  return <>
    <section className="page-section testimonials-results-page section-wrap">
      <OverlayHero
        label="Proof, not promises"
        title={<>Testimonials<br /><em>& results.</em></>}
        intro="Real voices from our learners, alongside the results that come from steady, personal mentoring."
        video="https://player.cloudinary.com/embed/?cloud_name=wdpnzbti&public_id=Adobe_Express_-_C4196s"
        imageAlt="Student learning results at Advance Study Sector"
      />
    </section>
    <ResultsSection />
    <AwardsSection />
    <TestimonialsSection />
    <InstagramVideosSection />
  </>
}
