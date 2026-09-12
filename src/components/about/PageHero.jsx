import { Reveal } from '../common/Reveal'

export function PageHero({ label, title, intro, image }) {
  return <section className="page-section about-page section-wrap">
    <Reveal><div className="page-heading"><div><p className="eyebrow"><span /> {label}</p><h1>{title}</h1></div><p>{intro}</p></div></Reveal>
    <Reveal delay={150}><div className="about-feature"><img src={image} alt="Students learning together" /><div className="about-message"><img src="/image.png" alt="Advance Study Sector branding" /><p>"The future belongs to those who believe in the beauty of their dreams."</p><span>— Dr. Monika Rohilla, Founder</span></div></div></Reveal>
    <Reveal delay={250}><div className="about-columns"><div><span className="section-kicker">The difference</span><h2>Small rooms.<br /><em>Big ambitions.</em></h2></div><div><p className="lead">We believe a learner should never feel like a number.</p><p>Our teaching is personal, practical and built around the confidence to ask better questions. From first conversation to final milestone, we are here to make your goals feel possible — and your progress feel yours.</p></div></div></Reveal>
  </section>
}
