import { useEffect, useState } from 'react'
import { Reveal } from '../common/Reveal'
import { founder } from '../../data/founder'
import './FounderSection.css'

export function FounderSection() {
  const [imageIndex, setImageIndex] = useState(0)
  const [bioOpen, setBioOpen] = useState(false)

  useEffect(() => {
    const timer = window.setInterval(() => setImageIndex((current) => (current + 1) % founder.images.length), 4000)
    return () => window.clearInterval(timer)
  }, [])

  const currentImage = founder.images[imageIndex]
  const preview = founder.profile.slice(0, 2)
  const rest = founder.profile.slice(2)

  return <section className="founder-section section-wrap">
    <div className="founder-heading">
      <Reveal><div className="section-kicker">Meet the founder</div></Reveal>
      <Reveal delay={70}><h2 className="section-heading">The mind behind<br /><em>Advance Study Sector.</em></h2></Reveal>
    </div>

    <div className="founder-grid">
      <Reveal delay={100}>
        <div className="founder-gallery">
          <div className="founder-gallery-card">
            <img key={currentImage} src={currentImage} alt={`${founder.name} at Advance Study Sector`} className="image-enter" />
            <span className="founder-gallery-badge"><strong>20+</strong> Years of experience</span>
          </div>
          <div className="founder-gallery-dots">
            {founder.images.map((image, index) => (
              <button
                key={image}
                type="button"
                className={imageIndex === index ? 'selected' : ''}
                onClick={() => setImageIndex(index)}
                aria-label={`Show founder photo ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={160}>
        <div className="founder-info">
          <h3>{founder.name}</h3>
          <span className="founder-role">{founder.role}</span>
          <small className="founder-credentials">{founder.credentials}</small>
          <div className={`founder-profile ${bioOpen ? 'is-open' : ''}`}>
            {preview.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {rest.map((paragraph) => <p className="founder-profile-more" key={paragraph}>{paragraph}</p>)}
          </div>
          {rest.length > 0 && (
            <button type="button" className="founder-more" onClick={() => setBioOpen((open) => !open)}>
              {bioOpen ? 'Show less' : 'Read full profile'}
            </button>
          )}
        </div>
      </Reveal>
    </div>

    <div className="founder-lower">
      <Reveal delay={120}>
        <div className="founder-vision">
          <span className="founder-vision-label">Professional vision</span>
          <p>{founder.vision}</p>
        </div>
      </Reveal>
      <Reveal delay={180}>
        <div className="founder-areas">
          <span className="founder-vision-label">Key professional areas</span>
          <div className="founder-area-chips">
            {founder.professionalAreas.map((area) => <span className="founder-area-chip" key={area}>{area}</span>)}
          </div>
        </div>
      </Reveal>
    </div>
  </section>
}
