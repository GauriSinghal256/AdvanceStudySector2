import { useEffect, useState } from 'react'
import { Reveal } from '../common/Reveal'
import { founder } from '../../data/founder'
import './FounderSection.css'

export function FounderSection() {
  const [imageIndex, setImageIndex] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setImageIndex((current) => (current + 1) % founder.images.length), 3200)
    return () => window.clearInterval(timer)
  }, [])

  const currentImage = founder.images[imageIndex]

  return <section className="founder-section section-wrap">
    <div className="founder-heading">
      <Reveal><div className="section-kicker">Meet the founder</div></Reveal>
      <Reveal delay={80}><h2 className="section-heading">The mind behind<br /><em>Advance Study Sector.</em></h2></Reveal>
    </div>
    <div className="founder-grid">
      <Reveal delay={150}><div className="founder-gallery">
        <div className="founder-gallery-card">
          <img key={currentImage} src={currentImage} alt={`${founder.name} at Advance Study Sector`} className="image-enter" />
        </div>
        <div className="founder-gallery-dots">{founder.images.map((image, index) => <button key={image} className={imageIndex === index ? 'selected' : ''} onClick={() => setImageIndex(index)} aria-label={`Show founder photo ${index + 1}`} />)}</div>
      </div></Reveal>
      <Reveal delay={220}><div className="founder-info">
        <h3>{founder.name}</h3>
        <span className="founder-role">{founder.role}</span>
        <small className="founder-credentials">{founder.credentials}</small>
        <div className="founder-profile">
          {founder.profile.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </div></Reveal>
    </div>
    <div className="founder-lower">
      <Reveal delay={280}><div className="founder-vision">
        <span className="founder-vision-label">Professional vision</span>
        <p>{founder.vision}</p>
      </div></Reveal>
      <Reveal delay={340}><div className="founder-areas">
        <span className="founder-vision-label">Key professional areas</span>
        <div className="founder-area-chips">{founder.professionalAreas.map((area) => <span className="founder-area-chip" key={area}>{area}</span>)}</div>
      </div></Reveal>
    </div>
  </section>
}
