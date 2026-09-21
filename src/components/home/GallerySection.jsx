import { Reveal } from '../common/Reveal'
import { featureImages } from '../../data/featureImages'
import './GallerySection.css'

export function GallerySection() {
  return <section className="gallery-section">
    <div className="section-wrap">
      <Reveal><div className="gallery-heading">
        <div>
          <p className="eyebrow"><span /> 03 / Inside Advance</p>
          <h2>See learning<br /><em>come alive.</em></h2>
        </div>
        <p>A glimpse into the energy, care and curiosity that make our institute feel different.</p>
      </div></Reveal>
      <div className="gallery-grid">
        {featureImages.map((image, index) => <Reveal key={image.src} delay={index * 120}>
          <div className={`gallery-card gallery-card-${index % 3}`}>
            <img src={image.src} alt={image.alt} className="image-enter" />
            <div className="gallery-card-caption"><span>0{index + 1}</span><strong>{image.label}</strong></div>
          </div>
        </Reveal>)}
      </div>
    </div>
  </section>
}
