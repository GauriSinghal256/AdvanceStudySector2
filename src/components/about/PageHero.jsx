import { OverlayHero } from '../common/OverlayHero'
import './PageHero.css'

export function PageHero({ label, title, intro, image, video, poster }) {
  return <div className="about-hero">
    <OverlayHero
      label={label}
      title={title}
      intro={intro}
      image={video ? undefined : image}
      video={video}
      imageAlt="Students learning together"
    />
  </div>
}

