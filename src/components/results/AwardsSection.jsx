import { useEffect, useState } from 'react'
import { Reveal } from '../common/Reveal'
import './AwardsSection.css'

const awards = [
  {
    image: '/achievement1.jpg',
    eyebrow: 'Achievement 01',
    alt: 'Award being presented at a recognition ceremony',
  },
  {
    image: '/achivement2.jpg',
    eyebrow: 'Achievement 02',
    alt: 'Founder seated at the Advance Study Sector office',
  },
  {
    image: '/achievement3.jpg',
    eyebrow: 'Achievement 03',
    alt: 'Founder holding an award plaque',
  },
  {
    image: '/achievement4.png',
    eyebrow: 'Achievement 04',
    alt: 'Recognition and achievement at Advance Study Sector',
  },
  // To add more achievements later, just add another { image, eyebrow, alt }
  // object here — the carousel, dots and thumbnails update automatically.
]

export function AwardsSection() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (awards.length < 2) return
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % awards.length)
    }, 3200)
    return () => window.clearInterval(timer)
  }, [])

  return <section className="awards-section">
    <div className="section-wrap">
      <div className="awards-heading">
        <Reveal><div className="section-kicker">Achievements & awards</div></Reveal>
        <Reveal delay={80}><h2 className="section-heading">Milestones worth<br /><em>remembering.</em></h2></Reveal>
        <Reveal delay={140}><p>Every award reflects a culture of showing up, doing the work and helping students move forward with confidence.</p></Reveal>
      </div>

      <Reveal delay={180}>
        <div className="awards-carousel">
          <div className="award-stage">
            <div className="award-stage-frame">
              {awards.map((award, i) => <img
                key={award.image}
                src={award.image}
                alt={award.alt}
                className={`award-slide ${i === index ? 'active' : ''}`}
                aria-hidden={i !== index}
              />)}
            </div>
          </div>
        </div>
      </Reveal>

      {awards.length > 1 && <div className="award-thumbs">
        {awards.map((award, i) => <button
          type="button"
          key={award.image}
          className={`award-thumb ${i === index ? 'active' : ''}`}
          onClick={() => setIndex(i)}
          aria-label={`Show ${award.eyebrow}`}
        >
          <img src={award.image} alt="" />
        </button>)}
      </div>}
    </div>
  </section>
}
