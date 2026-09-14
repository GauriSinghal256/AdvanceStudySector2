import { Reveal } from '../common/Reveal'
import './StatsStrip.css'
import { Counter } from '../common/Counter'

export function StatsStrip() {
  return <section className="stats-strip">
    <div className="stats-inner section-wrap">
      <Reveal><div className="stat-item"><Counter target={15} suffix="+" /><small>Years of<br />excellence</small></div></Reveal>
      <Reveal delay={100}><div className="stat-item"><Counter target={25} suffix="+" /><small>Expert<br />mentors</small></div></Reveal>
      <Reveal delay={200}><div className="stat-item"><Counter target={92} suffix="%" /><small>Student<br />success rate</small></div></Reveal>
      <Reveal delay={300}><div className="stats-note">Education is not preparation for life;<br /><em>education is life itself.</em></div></Reveal>
    </div>
  </section>
}
