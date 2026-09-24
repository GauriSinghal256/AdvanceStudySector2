import { Reveal } from '../common/Reveal'
import { testimonials } from '../../data/testimonials'
import { contactInfo } from '../../data/contactInfo'
import './TestimonialsSection.css'

function initials(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase()
}

export function TestimonialsSection() {

  const renderCard = (testimonial, i, groupIdx) => (
    <div
      className="testimonial-card"
      key={`${testimonial.name}-${groupIdx}-${i}`}
      tabIndex={0}
      role="article"
      aria-label={`Testimonial from ${testimonial.name}`}
    >
      <div className="quote-mark" aria-hidden="true">&quot;</div>

      <div className="testimonial-card-top">
        <div className="testimonial-badge-wrap">
          <span className="testimonial-verified-dot" />
          <span className="testimonial-label">Verified Student Review</span>
        </div>
        <div className="testimonial-stars" aria-label="5 out of 5 stars">
          ★★★★★
        </div>
      </div>

      <p className="testimonial-quote-text">&ldquo;{testimonial.quote}&rdquo;</p>

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
            <span>Google Review</span>
            <span className="review-arrow">↗</span>
          </a>
        </div>
      </div>
    </div>
  )

  return (
    <section className="testimonials-section">
      <div className="testimonials-bg-ambient" aria-hidden="true">
        <div className="ambient-orb ambient-orb-1" />
        <div className="ambient-orb ambient-orb-2" />
      </div>

      <div className="section-wrap">
        <div className="testimonials-header-bar">
          <div className="testimonials-header-copy">
            <Reveal><div className="section-kicker">05 / Voices of Advance</div></Reveal>
            <Reveal delay={80}>
              <h2 className="section-heading">
                What our learners<br /><em>say about us.</em>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <div className="testimonials-rating-pill">
                <span className="rating-star">⭐</span>
                <strong>4.9 / 5.0</strong>
                <span className="rating-divider">·</span>
                <span>Verified Google Reviews</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* Infinite Marquee Reel */}
      <div className="testimonials-viewport">
        <div className="testimonials-track scroll-left">
          <div className="marquee-group">
            {testimonials.map((t, i) => renderCard(t, i, 1))}
          </div>
          <div className="marquee-group" aria-hidden="true">
            {testimonials.map((t, i) => renderCard(t, i, 2))}
          </div>
          <div className="marquee-group" aria-hidden="true">
            {testimonials.map((t, i) => renderCard(t, i, 3))}
          </div>
        </div>
      </div>

      <div className="section-wrap testimonials-footer-wrap">
        <Reveal delay={160}>
          <div className="testimonials-footer-cta">
            <span className="cta-icon">💬</span>
            <p>
              Have you studied with Advance Study Sector?{' '}
              <a
                href={contactInfo.mapLink}
                target="_blank"
                rel="noreferrer"
                className="google-cta-link"
              >
                Share your experience on Google Maps ↗
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
