import { Hero } from './Hero'
import { FounderIntro } from './FounderIntro'
import { Marquee } from './Marquee'
import { StatsStrip } from './StatsStrip'
import { ValuesSection } from '../common/ValuesSection'
import { VideoSection } from './VideoSection'
import { CommunitySection } from './CommunitySection'
import { CtaBanner } from './CtaBanner'

export function HomePage() {
  return <>
    <Hero />
    <Marquee />
    <StatsStrip />
    <FounderIntro />
    <ValuesSection kicker="02 / What we stand for" heading={<>Four values that<br /><em>shape everything.</em></>} />
    <VideoSection />
    <CommunitySection />
    <CtaBanner />
  </>
}
