import { Link } from 'react-router-dom'
import './Philosophy.css'
import { Reveal } from '../common/Reveal'
import { ArrowIcon } from '../common/ArrowIcon'

export function Philosophy() {
  return <section className="section-wrap philosophy">
    <Reveal><div className="section-kicker">01 / Our approach</div></Reveal>
    <div className="philosophy-grid">
      <Reveal><div className="philosophy-title"><h2>Learning with<br /><em>real purpose.</em></h2><img src="/logo.jpeg" alt="Advance Study Sector" /></div></Reveal>
      <Reveal delay={150}><div><p className="lead">A better learning experience starts with seeing the person behind the goal.</p><p>We pair experienced mentors with a curriculum that feels relevant, focused and human. Whether you are starting fresh or reaching higher, your journey gets the attention it deserves.</p><p className="philosophy-motto">Made to move you forward.</p><Link className="circle-link" to="/about">Read about us <ArrowIcon /></Link></div></Reveal>
    </div>
  </section>
}
