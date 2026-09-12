import { Reveal } from '../common/Reveal'
import { founder } from '../../data/founder'

export function FounderSection() {
  return <section className="founder-section section-wrap">
    <Reveal><div className="section-kicker">Meet the founder</div></Reveal>
    <Reveal delay={80}><h2 className="section-heading">The mind behind<br /><em>Advance Study Sector.</em></h2></Reveal>
    <div className="founder-grid">
      <Reveal delay={150}><div className="founder-portrait"><img src={founder.img} alt={founder.name} /></div></Reveal>
      <Reveal delay={220}><div className="founder-info">
        <h3>{founder.name}</h3>
        <span className="founder-role">{founder.role}</span>
        <small className="founder-credentials">{founder.credentials}</small>
        <p className="founder-bio">{founder.bio}</p>
        <ul className="founder-highlights">{founder.highlights.map((h) => <li key={h}><span>✓</span>{h}</li>)}</ul>
      </div></Reveal>
    </div>
  </section>
}
