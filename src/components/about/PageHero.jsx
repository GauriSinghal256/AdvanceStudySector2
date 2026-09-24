import { OverlayHero } from '../common/OverlayHero'
import './PageHero.css'

export function PageHero({ label, title, intro, image, video, poster }) {
  return <div className="about-hero">
    <OverlayHero
      label={label}
      title={title}
      intro={intro}
      image={image}
      video={video}
      poster={poster}
      imageAlt="Students learning together"
    />
  </div>
}

