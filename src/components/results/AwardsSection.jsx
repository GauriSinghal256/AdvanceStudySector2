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
]

export function AwardsSection() {
  return <section className="awards-section">
    <div className="section-wrap">
      <div className="awards-heading">
        <Reveal><div className="section-kicker">Achievements & awards</div></Reveal>
        <Reveal delay={80}><h2 className="section-heading">Milestones worth<br /><em>remembering.</em></h2></Reveal>
        <Reveal delay={140}><p>Every award reflects a culture of showing up, doing the work and helping students move forward with confidence.</p></Reveal>
      </div>

      <div className="awards-gallery">
        {awards.map((award, index) => <Reveal key={award.image} delay={index * 180} className="award-reveal">
          <article className={`award-card award-card-${index + 1}`} style={{ '--award-delay': `${index * 1.2}s` }}>
            <div className="award-image-wrap">
              <img src={award.image} alt={award.alt} />
              <span className="award-number">0{index + 1}</span>
            </div>
          </article>
        </Reveal>)}
      </div>
    </div>
  </section>
}