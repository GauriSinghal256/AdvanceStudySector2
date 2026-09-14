import { Reveal } from '../common/Reveal'
import './FounderIntro.css'
import { founder } from '../../data/founder'

export function FounderIntro() {
  return <section className="founder-intro section-wrap">
    <Reveal><div className="founder-intro-portrait"><img src={founder.img} alt={founder.name} /></div></Reveal>
    <Reveal delay={120}><div className="founder-intro-info">
      <span className="section-kicker">Meet your mentor</span>
      <h2 className="section-heading">Guided personally by<br /><em>{founder.name}.</em></h2>
      <span className="founder-role">{founder.role}</span>
      <small className="founder-credentials">{founder.credentials}</small>
      <p className="founder-bio">{founder.bio}</p>
      <ul className="founder-highlights">{founder.highlights.map((h) => <li key={h}><span>✓</span>{h}</li>)}</ul>
    </div></Reveal>
  </section>
}
