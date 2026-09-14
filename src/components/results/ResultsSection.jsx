import { Reveal } from '../common/Reveal'
import { Counter } from '../common/Counter'
import { resultStats, toppers } from '../../data/results'
import './ResultsSection.css'

export function ResultsSection() {
  return <section className="results-section">
    <div className="section-wrap">
      <Reveal><div className="section-kicker">Our results</div></Reveal>
      <Reveal delay={80}><h2 className="section-heading">Numbers that reflect<br /><em>real progress.</em></h2></Reveal>
      <div className="results-stats">{resultStats.map((s, i) => <Reveal key={s.label} delay={i * 130}><div className="result-stat"><Counter target={parseInt(s.value, 10)} suffix={s.suffix} /><small>{s.label}</small></div></Reveal>)}</div>

      <Reveal delay={120}><h3 className="results-subheading">Recent achievers<br /><em>we are proud of.</em></h3></Reveal>
      <div className="topper-grid">{toppers.map((t, i) => <Reveal key={t.name} delay={i * 110}><div className="topper-card">
        <span className="topper-score">{t.score}</span>
        <h4>{t.name}</h4>
        <p>{t.achievement}</p>
        <small>{t.course}</small>
      </div></Reveal>)}</div>
    </div>
  </section>
}
