import { Hero } from './Hero'
import { Marquee } from './Marquee'
import { StatsStrip } from './StatsStrip'
import { Philosophy } from './Philosophy'
import { ValuesSection } from '../common/ValuesSection'
import { VideoSection } from './VideoSection'
import { CommunitySection } from './CommunitySection'
import { TestimonialsSection } from './TestimonialsSection'
import { CtaBanner } from './CtaBanner'

export function HomePage() {
  return <>
    <Hero />
    <Marquee />
    <StatsStrip />
    <Philosophy />
    <ValuesSection kicker="02 / What we stand for" heading={<>Four values that<br /><em>shape everything.</em></>} />
    <VideoSection />
    <CommunitySection />
    <TestimonialsSection />
    <CtaBanner />
  </>
}
