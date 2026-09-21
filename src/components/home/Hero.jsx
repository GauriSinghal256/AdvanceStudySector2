import { Link } from 'react-router-dom'
import { Reveal } from '../common/Reveal'
import './Hero.css'
import { ArrowIcon } from '../common/ArrowIcon'

export function Hero() {
  return <section className="hero-cinematic">
    <div className="hero-video-layer">
      <iframe
        className="hero-video-frame"
        src="https://player.cloudinary.com/embed/?cloud_name=ekmijnj9&public_id=lv_0_20260920215051_1_-compressed&autoplay=true&muted=true&loop=true&controls=false"
        title="Advance Study Sector"
        allow="autoplay; fullscreen"
        allowFullScreen
        tabIndex={-1}
      />
      <div className="hero-video-overlay" />
      <div className="hero-bg-grain" />
    </div>
    <div className="hero-content section-wrap">
      <div className="hero-text-block">
        <Reveal><p className="eyebrow eyebrow-light"><span /> An institute for forward thinkers</p></Reveal>
        <Reveal delay={120}><h1 className="hero-title">Where ambition<br /><em>finds direction.</em></h1></Reveal>
        <Reveal delay={240}><p className="hero-text">At Advance Study Sector, we turn curiosity into confidence with thoughtful teaching, real guidance and a community that believes in your next chapter.</p></Reveal>
        <Reveal delay={360}><div className="hero-actions"><Link className="button button-primary" to="/courses">Explore courses <ArrowIcon /></Link><Link className="button button-ghost" to="/about">Discover our story <ArrowIcon /></Link></div></Reveal>
        <Reveal delay={480}><div className="hero-proof"><div className="proof-avatars"><span>AS</span><span>MS</span><span>RK</span></div><p><strong>Trusted by 500+ learners</strong><br />building brighter futures</p></div></Reveal>
      </div>
    </div>
    <div className="hero-scroll-hint"><span /><small>Scroll to explore</small></div>
  </section>
}
