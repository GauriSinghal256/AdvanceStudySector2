import { Reveal } from '../common/Reveal'
import { timeline } from '../../data/timeline'
import './TimelineSection.css'

export function TimelineSection() {
  return <section className="timeline-section section-wrap">
    <Reveal><div className="section-kicker">Our journey</div></Reveal>
    <Reveal delay={70}><h2 className="section-heading">Fifteen years of<br /><em>meaningful progress.</em></h2></Reveal>
    <div className="timeline">
      {timeline.map((item, index) => (
        <Reveal key={item.year} delay={index * 90}>
          <article className="timeline-item">
            <div className="timeline-year">{item.year}</div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        </Reveal>
      ))}
    </div>
  </section>
}
