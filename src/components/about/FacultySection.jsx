import { Reveal } from '../common/Reveal'
import { faculty } from '../../data/faculty'

export function FacultySection() {
  return <section className="faculty-section section-wrap">
    <Reveal><div className="section-kicker">Meet the team</div></Reveal>
    <Reveal delay={80}><h2 className="section-heading">Mentors who<br /><em>genuinely care.</em></h2></Reveal>
    <Reveal delay={150}><p className="section-sub">Our faculty brings years of real-world experience and a passion for teaching that goes beyond the syllabus.</p></Reveal>
    <div className="faculty-grid">{faculty.map((f, i) => <Reveal key={f.name} delay={i * 120}><div className="faculty-card"><img src={f.img} alt={f.name} /><div className="faculty-info"><h3>{f.name}</h3><small className="faculty-role">{f.role}</small><span className="faculty-subject">{f.subject}</span></div></div></Reveal>)}</div>
  </section>
}
