import { Reveal } from '../common/Reveal'
import { timeline } from '../../data/timeline'
import './TimelineSection.css'

export function TimelineSection() {
  return <section className="timeline-section section-wrap">
    <Reveal><div className="section-kicker">Our journey</div></Reveal>
    <Reveal delay={80}><h2 className="section-heading">Fifteen years of<br /><em>meaningful progress.</em></h2></Reveal>
    <div className="timeline">{timeline.map((item, i) => <Reveal key={item.year} delay={i * 120}><div className="timeline-item"><div className="timeline-year">{item.year}</div><div className="timeline-content"><h3>{item.title}</h3><p>{item.text}</p></div></div></Reveal>)}</div>
  </section>
}
