import { useState } from 'react'
import { Reveal } from '../common/Reveal'
import { ArrowIcon } from '../common/ArrowIcon'
import { courses } from '../../data/courses'
import { contactInfo } from '../../data/contactInfo'
import { OverlayHero } from '../common/OverlayHero'

export function ContactPage() {
  const [formSent, setFormSent] = useState(false)

  return <section className="page-section contact-page section-wrap">
    <OverlayHero label="08 / Let's talk" title={<>Your next chapter<br /><em>starts here.</em></>} intro="Have a question about a course or your best path forward? Our team would love to hear from you." image="https://images.pexels.com/photos/5427674/pexels-photo-5427674.jpeg?auto=compress&cs=tinysrgb&h=900&w=1400" imageAlt="Advisor ready to help" />
    <div className="contact-grid">
      <Reveal><div className="contact-details">
        <div className="detail"><span className="detail-icon">↗</span><div><small>Call us</small><a href={contactInfo.phoneHref}>{contactInfo.phone}</a></div></div>
        <div className="detail"><span className="detail-icon">✉</span><div><small>Email us</small><a href={contactInfo.emailHref}>{contactInfo.email}</a></div></div>
        <div className="detail"><span className="detail-icon">⌖</span><div><small>Visit us</small><p>{contactInfo.addressLines.map((line, i) => <span key={line}>{line}{i < contactInfo.addressLines.length - 1 && <br />}</span>)}</p><a className="map-link" href={contactInfo.mapLink} target="_blank" rel="noreferrer">Get directions ↗</a></div></div>
        <div className="detail"><span className="detail-icon">◷</span><div><small>Office hours</small><p>{contactInfo.hours.weekdays}<br />{contactInfo.hours.sunday}</p></div></div>
        <div className="detail"><span className="detail-icon">☺</span><div><small>Follow us</small><p><a href={contactInfo.social.instagram} target="_blank" rel="noreferrer">Instagram</a> · <a href={contactInfo.social.facebook} target="_blank" rel="noreferrer">Facebook</a></p></div></div>
        <div className="map-card"><iframe title="Advance Study Sector location map" src={`https://www.google.com/maps?q=${contactInfo.mapQuery}&output=embed`} loading="lazy" /></div>
      </div></Reveal>
      <Reveal delay={150}>
        <form className="contact-form" onSubmit={(event) => { event.preventDefault(); setFormSent(true) }}>
          {formSent ? <div className="form-success"><span>✓</span><h2>Thank you for reaching out.</h2><p>We'll be in touch with you shortly.</p><button type="button" className="text-button" onClick={() => setFormSent(false)}>Send another message</button></div> : <>
            <h2>Tell us a little<br /><em>about yourself.</em></h2>
            <label>Name<input required placeholder="Your full name" /></label>
            <label>Phone number<input required type="tel" placeholder="Your phone number" /></label>
            <label>Email<input required type="email" placeholder="you@example.com" /></label>
            <label>Interested in<select required defaultValue=""><option value="" disabled>Select a course</option>{courses.map((course) => <option key={course.title}>{course.title}</option>)}</select></label>
            <label>Message <span className="optional">(optional)</span><textarea rows="3" placeholder="How can we help?"></textarea></label>
            <button className="button button-primary" type="submit">Send enquiry <ArrowIcon /></button>
          </>}
        </form>
      </Reveal>
    </div>
  </section>
}
