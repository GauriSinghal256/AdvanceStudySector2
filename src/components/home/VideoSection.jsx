import { Reveal } from '../common/Reveal'

export function VideoSection() {
  return <section className="video-section">
    <div className="section-wrap">
      <Reveal><div className="video-heading"><div><p className="eyebrow"><span /> 03 / Inside Advance</p><h2>See learning<br /><em>come alive.</em></h2></div><p>A glimpse into the energy, care and curiosity that make our institute feel different.</p></div></Reveal>
      <Reveal delay={150}><div className="video-frame"><video controls autoPlay muted loop playsInline poster="/logo.jpg"><source src="/institute-video.mp4" type="video/mp4" />Your browser does not support video playback.</video><div className="video-placeholder"><span className="play-icon">▶</span><strong>Your institute story, here.</strong><small>Replace institute-video.mp4 with your own video</small></div></div></Reveal>
    </div>
  </section>
}
