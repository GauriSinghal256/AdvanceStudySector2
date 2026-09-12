import { Reveal } from './Reveal'

export function OverlayHero({ label, title, intro, image, imageAlt, children, className = '' }) {
  return <section className={`overlay-hero ${className}`}>
    <img className="overlay-hero-image" src={image} alt={imageAlt} />
    <div className="overlay-hero-shade" />
    <div className="overlay-hero-content section-wrap">
      <Reveal><p className="eyebrow eyebrow-light"><span /> {label}</p></Reveal>
      <Reveal delay={100}><h1>{title}</h1></Reveal>
      <Reveal delay={180}><p className="overlay-hero-intro">{intro}</p></Reveal>
      {children && <Reveal delay={260}><div className="overlay-hero-actions">{children}</div></Reveal>}
    </div>
  </section>
}