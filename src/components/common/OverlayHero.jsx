import './OverlayHero.css'
import { Reveal } from './Reveal'

export function getCloudinaryVideoUrl(url) {
  if (!url) return ''
  if (url.includes('player.cloudinary.com/embed')) {
    try {
      const parsed = new URL(url)
      const cloudName = parsed.searchParams.get('cloud_name')
      const publicId = parsed.searchParams.get('public_id')
      if (cloudName && publicId) {
        return `https://res.cloudinary.com/${cloudName}/video/upload/f_auto,q_auto/${publicId}.mp4`
      }
    } catch {
      // fallback to original url if parsing fails
    }
  }
  return url
}

export function OverlayHero({
  label,
  title,
  intro,
  image,
  imageAlt = '',
  video,
  poster,
  children,
  className = ''
}) {
  const videoSrc = getCloudinaryVideoUrl(video)
  const posterSrc = poster || image

  return <section className={`overlay-hero ${className}`}>
    {videoSrc ? (
      <div className="overlay-hero-video-layer">
        <video
          className="overlay-hero-video-frame"
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label={imageAlt || 'Hero background video'}
          tabIndex={-1}
        />
        <div className="overlay-hero-video-grain" />
      </div>
    ) : (
      image && <img className="overlay-hero-image" src={image} alt={imageAlt} />
    )}
    <div className="overlay-hero-shade" />
    <div className="overlay-hero-content section-wrap">
      {label && <Reveal><p className="eyebrow eyebrow-light"><span /> {label}</p></Reveal>}
      <Reveal delay={100}><h1>{title}</h1></Reveal>
      {intro && <Reveal delay={180}><p className="overlay-hero-intro">{intro}</p></Reveal>}
      {children && <Reveal delay={260}><div className="overlay-hero-actions">{children}</div></Reveal>}
    </div>
  </section>
}