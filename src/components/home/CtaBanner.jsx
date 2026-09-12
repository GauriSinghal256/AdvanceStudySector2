import { Reveal } from '../common/Reveal'
import { ArrowIcon } from '../common/ArrowIcon'

export function CtaBanner({ onNavigate }) {
  return <section className="cta-banner">
    <div className="section-wrap">
      <Reveal><div className="cta-content"><h2>Ready to find<br /><em>your direction?</em></h2><p>Join a community that believes in your next chapter.</p><button className="button button-primary" onClick={() => onNavigate('contact')}>Start learning <ArrowIcon /></button></div></Reveal>
    </div>
  </section>
}
