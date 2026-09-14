import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Reveal } from '../common/Reveal'
import './Hero.css'
import { ArrowIcon } from '../common/ArrowIcon'
import { featureImages } from '../../data/featureImages'

export function Hero() {
  const [imageIndex, setImageIndex] = useState(0)
  const heroRef = useRef(null)

  useEffect(() => {
    const timer = window.setInterval(() => setImageIndex((current) => (current + 1) % featureImages.length), 3200)
    return () => window.clearInterval(timer)
  }, [])

  const currentImage = featureImages[imageIndex]

  return <section className="hero-cinematic" ref={heroRef}>
    <div className="hero-bg-layer">
      {featureImages.map((img, i) => <div key={img.src} className={`hero-bg-slide ${imageIndex === i ? 'active' : ''}`} style={{ backgroundImage: `url(${img.src})` }} />)}
      <div className="hero-bg-overlay" />
      <div className="hero-bg-grain" />
    </div>
    <div className="hero-content section-wrap">
      <div className="hero-text-block">
        <Reveal><p className="eyebrow eyebrow-light"><span /> An institute for forward thinkers</p></Reveal>
        <Reveal delay={120}><h1 className="hero-title">Where ambition<br /><em>finds direction.</em></h1></Reveal>
        <Reveal delay={240}><p className="hero-text">At Advance Study Sector, we turn curiosity into confidence with thoughtful teaching, real guidance and a community that believes in your next chapter.</p></Reveal>
        <Reveal delay={360}><div className="hero-actions"><Link className="button button-primary" to="/courses">Explore courses <ArrowIcon /></Link><Link className="button button-ghost" to="/about">Discover our story <ArrowIcon /></Link></div></Reveal>
        <Reveal delay={500}><div className="hero-proof"><div className="proof-avatars"><span>AS</span><span>MS</span><span>RK</span></div><p><strong>Trusted by 500+ learners</strong><br />building brighter futures</p></div></Reveal>
      </div>
      <div className="hero-visual-block">
        <div className="hero-card-stack">
          <div className="hero-card-main">
            <img key={currentImage.src} src={currentImage.src} alt={currentImage.alt} className="image-enter" />
            <div className="hero-card-caption"><span>0{imageIndex + 1}</span><div><strong>{currentImage.label}</strong><small>Every day is a step forward</small></div></div>
          </div>
          <div className="hero-card-dots">{featureImages.map((image, index) => <button key={image.src} className={imageIndex === index ? 'selected' : ''} onClick={() => setImageIndex(index)} aria-label={`Show feature ${index + 1}`} />)}</div>
        </div>
      </div>
    </div>
    <div className="hero-scroll-hint"><span /><small>Scroll to explore</small></div>
  </section>
}
