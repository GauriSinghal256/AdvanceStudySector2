import { Reveal } from '../common/Reveal'
import './VideoSection.css'

export function VideoSection() {
  return <section className="video-section">
    <div className="section-wrap">
      <Reveal><div className="video-heading"><div><p className="eyebrow"><span /> 03 / Inside Advance</p><h2>See learning<br /><em>come alive.</em></h2></div><p>A glimpse into the energy, care and curiosity that make our institute feel different.</p></div></Reveal>
      <Reveal delay={150}><div className="video-frame"><iframe src="https://player.cloudinary.com/embed/?cloud_name=ekmijnj9&public_id=lv_0_20260920215051_1_-compressed&autoplay=true&muted=true&controls=true" title="Advance Study Sector video" allow="autoplay; fullscreen" allowFullScreen /></div></Reveal>
    </div>
  </section>
}
