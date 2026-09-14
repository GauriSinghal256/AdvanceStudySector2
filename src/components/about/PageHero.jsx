import { OverlayHero } from '../common/OverlayHero'
import './PageHero.css'

export function PageHero({ label, title, intro, image }) {
  return <section className="page-section about-page section-wrap">
    <OverlayHero label={label} title={title} intro={intro} image={image} imageAlt="Students learning together" />
  </section>
}
