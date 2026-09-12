import { Reveal } from '../common/Reveal'
import { OverlayHero } from '../common/OverlayHero'

export function PageHero({ label, title, intro, image }) {
  return <section className="page-section about-page section-wrap">
    <OverlayHero label={label} title={title} intro={intro} image={image} imageAlt="Students learning together" />
    <Reveal delay={250}><div className="about-columns"><div><span className="section-kicker">The difference</span><h2>Small rooms.<br /><em>Big ambitions.</em></h2></div><div><p className="lead">We believe a learner should never feel like a number.</p><p>Our teaching is personal, practical and built around the confidence to ask better questions. From first conversation to final milestone, we are here to make your goals feel possible — and your progress feel yours.</p></div></div></Reveal>
  </section>
}
