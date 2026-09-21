import { useEffect, useState } from 'react'
import { Reveal } from '../common/Reveal'
import { testimonials } from '../../data/testimonials'
import { contactInfo } from '../../data/contactInfo'
import './TestimonialsSection.css'

function initials(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase()
}

export function TestimonialsSection() {
  const [pairIndex, setPairIndex] = useState(0)

  useEffect(() => {
    if (testimonials.length < 2) return
    const timer = window.setInterval(() => {
      setPairIndex((current) => (current + 1) % testimonials.length)
    }, 4200)
    return () => window.clearInterval(timer)
  }, [])

  const visiblePair = testimonials.length < 2
    ? [testimonials[0]]
    : [testimonials[pairIndex], testimonials[(pairIndex + 1) % testimonials.length]]

  return <section className="testimonials-section">
    <div className="section-wrap">
      <Reveal><div className="section-kicker">05 / Voices of Advance</div></Reveal>
      <Reveal delay={80}><h2 className="section-heading">What our learners<br /><em>say about us.</em></h2></Reveal>
      <Reveal className="testimonial-carousel-reveal">
        <div className="testimonials-grid">
          {visiblePair.map((testimonial, position) => <div
            className="testimonial-card"
            key={`${testimonial.name}-${pairIndex}-${position}`}
            style={{ animationDelay: `${position * 140}ms, ${position * 140 + 700}ms` }}
          >
            <div className="quote-mark">&quot;</div>
            <span className="testimonial-label">Learner review</span>
            <p>{testimonial.quote}</p>
            <div className="testimonial-author"><span className="testimonial-avatar">{initials(testimonial.name)}</span><div><strong>{testimonial.name}</strong><a className="google-review-link" href={contactInfo.mapLink} target="_blank" rel="noreferrer">{testimonial.role}</a></div></div>
          </div>)}
        </div>
        <div className="testimonial-dots" aria-label="Testimonial navigation">
          {testimonials.map((item, index) => <button type="button" key={`${item.name}-${index}`} className={pairIndex === index ? 'selected' : ''} onClick={() => setPairIndex(index)} aria-label={`Show testimonial ${index + 1}`} />)}
        </div>
      </Reveal>
    </div>
  </section>
}
