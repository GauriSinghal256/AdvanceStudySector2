import { PageHero } from './PageHero'
import { ValuesSection } from '../common/ValuesSection'
import { FounderSection } from './FounderSection'
import { TimelineSection } from './TimelineSection'
import { Reveal } from '../common/Reveal'
import './AboutPage.css'

export function AboutPage() {
  return <div className="about-page-shell">
    <PageHero
      label="06 / Our story"
      title={<>Learning that<br /><em>leaves a mark.</em></>}
      intro="Advance Study Sector is a place for focused learning, honest mentorship and the kind of progress you can carry into the world."
      image="https://images.pexels.com/photos/8197553/pexels-photo-8197553.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400"
    />
    <section className="about-quote section-wrap">
      <Reveal><div className="about-quote-mark">“</div></Reveal>
      <Reveal delay={100}><blockquote>Education becomes meaningful when knowledge, confidence and practical skills grow together.</blockquote></Reveal>
      <Reveal delay={180}><cite>Dr. Monika Rohilla · Founder, Advance Study Sector</cite></Reveal>
    </section>
    <FounderSection />
    <TimelineSection />
    <ValuesSection kicker="What we stand for" heading={<>The values that<br /><em>guide us daily.</em></>} />
  </div>
}
