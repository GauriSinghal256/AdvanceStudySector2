import { Reveal } from '../common/Reveal'
import { ArrowIcon } from '../common/ArrowIcon'

export function Philosophy({ onNavigate }) {
  return <section className="section-wrap philosophy">
    <Reveal><div className="section-kicker">01 / Our approach</div></Reveal>
    <div className="philosophy-grid">
      <Reveal><h2>Made to move<br /><em>you forward.</em></h2></Reveal>
      <Reveal delay={150}><div><p className="lead">A better learning experience starts with seeing the person behind the goal.</p><p>We pair experienced mentors with a curriculum that feels relevant, focused and human. Whether you are starting fresh or reaching higher, your journey gets the attention it deserves.</p><button className="circle-link" onClick={() => onNavigate('about')}>Read about us <ArrowIcon /></button></div></Reveal>
    </div>
  </section>
}
