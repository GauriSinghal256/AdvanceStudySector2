import './ValuesSection.css'
import { Reveal } from './Reveal'
import { values } from '../../data/values'

export function ValuesSection({ kicker, heading }) {
  return <section className="values-section">
    <div className="section-wrap">
      <Reveal><div className="section-kicker">{kicker}</div></Reveal>
      <Reveal delay={80}><h2 className="section-heading">{heading}</h2></Reveal>
      <div className="values-grid">{values.map((v, i) => <Reveal key={v.title} delay={i * 100}><div className="value-card"><span className="value-icon">{v.icon}</span><h3>{v.title}</h3><p>{v.text}</p></div></Reveal>)}</div>
    </div>
  </section>
}
