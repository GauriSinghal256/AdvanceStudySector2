import { Link } from 'react-router-dom'
import { Reveal } from '../common/Reveal'
import { ArrowIcon } from '../common/ArrowIcon'

export function CtaBanner() {
  return <section className="cta-banner">
    <div className="section-wrap">
      <Reveal><div className="cta-content"><h2>Ready to find<br /><em>your direction?</em></h2><p>Join a community that believes in your next chapter.</p><Link className="button button-primary" to="/contact">Start learning <ArrowIcon /></Link></div></Reveal>
    </div>
  </section>
}
