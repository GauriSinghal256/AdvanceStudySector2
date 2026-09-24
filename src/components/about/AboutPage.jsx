import { Link } from 'react-router-dom'
import { PageHero } from './PageHero'
import { ValuesSection } from '../common/ValuesSection'
import { FounderSection } from './FounderSection'
import { TimelineSection } from './TimelineSection'
import { Reveal } from '../common/Reveal'
import { ArrowIcon } from '../common/ArrowIcon'
import './AboutPage.css'

export function AboutPage() {
  return <div className="about-page-shell">
    <PageHero
      label="Our story"
      title={<>Learning that<br /><em>leaves a mark.</em></>}
      intro="Advance Study Sector is a place for focused learning, honest mentorship and the kind of progress you can carry into the world."
      video="https://player.cloudinary.com/embed/?cloud_name=ekmijnj9&public_id=Adobe_Express_-_C4170"
    />

    <section className="about-quote section-wrap">
      <Reveal><div className="about-quote-mark" aria-hidden="true">“</div></Reveal>
      <Reveal delay={80}>
        <blockquote>Education becomes meaningful when knowledge, confidence and practical skills grow together.</blockquote>
      </Reveal>
      <Reveal delay={140}>
        <cite>Dr. Monika Rohilla · Founder, Advance Study Sector</cite>
      </Reveal>
    </section>

    <FounderSection />
    <TimelineSection />
    <ValuesSection kicker="What we stand for" heading={<>The values that<br /><em>guide us daily.</em></>} />

    <section className="about-cta">
      <div className="about-cta-inner section-wrap">
        <Reveal>
          <div className="about-cta-copy">
            <div className="section-kicker">Next step</div>
            <h2>Ready to learn with us?</h2>
            <p>Speak with our team and find the course that matches your goal.</p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <Link className="button button-primary" to="/contact">Book a demo <ArrowIcon /></Link>
        </Reveal>
      </div>
    </section>
  </div>
}
