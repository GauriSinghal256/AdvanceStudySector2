import { OverlayHero } from '../common/OverlayHero'
import './PageHero.css'

export function PageHero({ label, title, intro, image }) {
  return <div className="about-hero">
    <OverlayHero label={label} title={title} intro={intro} image={image} imageAlt="Students learning together" />
  </div>
}
