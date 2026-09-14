import { Reveal } from '../common/Reveal'
import { testimonials } from '../../data/testimonials'
import './TestimonialsSection.css'

function initials(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase()
}

export function TestimonialsSection() {
  return <section className="testimonials-section">
    <div className="section-wrap">
      <Reveal><div className="section-kicker">05 / Voices of Advance</div></Reveal>
      <Reveal delay={80}><h2 className="section-heading">What our learners<br /><em>say about us.</em></h2></Reveal>
      <div className="testimonials-grid">{testimonials.map((t, i) => <Reveal key={t.name} delay={i * 100}><div className="testimonial-card"><div className="quote-mark">"</div><p>{t.quote}</p><div className="testimonial-author"><span className="testimonial-avatar">{initials(t.name)}</span><div><strong>{t.name}</strong><small>{t.role}</small></div></div></div></Reveal>)}</div>
    </div>
  </section>
}
