import { useEffect, useState } from 'react'
import { Reveal } from '../common/Reveal'
import { testimonials } from '../../data/testimonials'
import { contactInfo } from '../../data/contactInfo'
import './TestimonialsSection.css'

function initials(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase()
}

export function TestimonialsSection() {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const count = testimonials.length

  useEffect(() => {
    if (isPaused || count < 2) return
    const timer = window.setInterval(() => {
      setIndex((curr) => (curr + 1) % count)
    }, 4500)
    return () => window.clearInterval(timer)
  }, [isPaused, count])

  const handlePrev = () => setIndex((curr) => (curr - 1 + count) % count)
  const handleNext = () => setIndex((curr) => (curr + 1) % count)

  // Duplicate items for uninterrupted continuous display
  const displayItems = [...testimonials, ...testimonials]

  return (
    <section className="testimonials-section">
      <div className="section-wrap">
        <div className="testimonials-header-bar">
          <div className="testimonials-header-copy">
            <Reveal><div className="section-kicker">05 / Voices of Advance</div></Reveal>
            <Reveal delay={80}>
              <h2 className="section-heading">
                What our learners<br /><em>say about us.</em>
              </h2>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <div className="testimonial-nav-arrows">
              <button
                type="button"
                className="testimonial-arrow-btn"
                onClick={handlePrev}
                aria-label="Previous testimonial"
              >
                ←
              </button>
              <button
                type="button"
                className="testimonial-arrow-btn"
                onClick={handleNext}
                aria-label="Next testimonial"
              >
                →
              </button>
            </div>
          </Reveal>
        </div>

        <Reveal className="testimonial-carousel-reveal">
          <div
            className="testimonials-viewport"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            <div className="testimonials-grid" style={{ '--current-index': index }}>
              {displayItems.map((testimonial, i) => (
                <div className="testimonial-card" key={`${testimonial.name}-${i}`}>
                  <div className="quote-mark" aria-hidden="true">&quot;</div>

                  <div className="testimonial-card-top">
                    <span className="testimonial-label">Verified Student Review</span>
                    <div className="testimonial-stars" aria-label="5 out of 5 stars">
                      ★★★★★
                    </div>
                  </div>

                  <p className="testimonial-quote-text">{testimonial.quote}</p>

                  <div className="testimonial-author">
                    <span className="testimonial-avatar">
                      {initials(testimonial.name)}
                    </span>
                    <div className="testimonial-author-meta">
                      <strong>{testimonial.name}</strong>
                      <a
                        className="google-review-link"
                        href={contactInfo.mapLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {testimonial.role} ↗
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="testimonial-dots" aria-label="Testimonial pagination">
            {testimonials.map((item, dotIdx) => (
              <button
                type="button"
                key={`${item.name}-${dotIdx}`}
                className={index === dotIdx ? 'selected' : ''}
                onClick={() => setIndex(dotIdx)}
                aria-label={`Go to testimonial ${dotIdx + 1}`}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
