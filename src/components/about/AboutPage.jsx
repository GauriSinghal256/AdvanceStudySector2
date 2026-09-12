import { PageHero } from './PageHero'
import { TimelineSection } from './TimelineSection'
import { ValuesSection } from '../common/ValuesSection'
import { FacultySection } from './FacultySection'

export function AboutPage() {
  return <>
    <PageHero
      label="06 / Our story"
      title={<>Learning that<br /><em>leaves a mark.</em></>}
      intro="Advance Study Sector is a place for focused learning, honest mentorship and the kind of progress you can carry into the world."
      image="https://images.pexels.com/photos/8197553/pexels-photo-8197553.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400"
    />
    <TimelineSection />
    <ValuesSection kicker="What we stand for" heading={<>The values that<br /><em>guide us daily.</em></>} />
    <FacultySection />
  </>
}
