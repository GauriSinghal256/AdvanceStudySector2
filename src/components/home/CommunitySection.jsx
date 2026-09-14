import { Reveal } from '../common/Reveal'
import './CommunitySection.css'
import { communityImages } from '../../data/communityImages'

export function CommunitySection() {
  return <section className="community-section">
    <div className="section-wrap">
      <Reveal><div className="section-kicker">04 / The experience</div></Reveal>
      <Reveal delay={100}><div className="community-heading"><h2>More than a<br /><em>classroom.</em></h2><p>Confidence grows in the moments between lessons too — in conversations, practice and the people you meet along the way.</p></div></Reveal>
      <div className="community-grid">{communityImages.map((item, i) => <Reveal key={item.title} delay={i * 120}><article className="community-card"><img src={item.src} alt={item.alt} /><div className="community-overlay"><strong>{item.title}</strong><span>↗</span></div></article></Reveal>)}</div>
    </div>
  </section>
}
