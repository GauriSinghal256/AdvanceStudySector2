import { Reveal } from '../common/Reveal'
import { instagramVideos } from '../../data/results'
import './InstagramVideosSection.css'

export function InstagramVideosSection() {
  return <section className="instagram-videos-section">
    <div className="section-wrap">
      <Reveal><div className="section-kicker">From Instagram</div></Reveal>
      <Reveal delay={80}><h2 className="section-heading">See it in action<br /><em>straight from Instagram.</em></h2></Reveal>
      <div className="instagram-video-grid">{instagramVideos.map((video, i) => <Reveal key={video.id} delay={i * 110}><article className="instagram-video-card">
        <div className="instagram-video-frame">
          <iframe
            src={`https://www.instagram.com/reel/${video.id}/embed?hidecaption=true`}
            title={video.title}
            loading="lazy"
            scrolling="no"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            sandbox="allow-scripts allow-same-origin allow-presentation"
            allowFullScreen
          />
        </div>
      </article></Reveal>)}</div>
    </div>
  </section>
}
