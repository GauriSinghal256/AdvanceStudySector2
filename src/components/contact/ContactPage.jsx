import { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import { Reveal } from '../common/Reveal'
import { ArrowIcon } from '../common/ArrowIcon'
import { courses } from '../../data/courses'
import { contactInfo } from '../../data/contactInfo'
import { OverlayHero } from '../common/OverlayHero'
import { InstagramIcon, FacebookIcon } from '../common/UtilityIcons'
import './ContactPage.css'

export function ContactPage() {
  const formRef = useRef(null)
  const [formSent, setFormSent] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const [sendError, setSendError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setIsSending(true)
    setSendError('')

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY },
      )
      setFormSent(true)
    } catch {
      setSendError('We could not send your message. Please try again or contact us directly.')
    } finally {
      setIsSending(false)
    }
  }

  return <section className="page-section contact-page section-wrap">
    <OverlayHero
      label="08 / Let's talk"
      title={<>Your next chapter<br /><em>starts here.</em></>}
      intro="Have a question about a course or your best path forward? Our team would love to hear from you."
      video="https://player.cloudinary.com/embed/?cloud_name=ekmijnj9&public_id=Adobe_Express_-_C4114"
      poster="/contactus/images.jpg"
      image="/contactus/images.jpg"
      imageAlt="Advisor ready to help"
    />
    <div className="contact-grid">
      <Reveal><div className="contact-details">
        <div className="detail"><span className="detail-icon">↗</span><div><small>Call us</small><a href={contactInfo.phoneHref}>{contactInfo.phone}</a></div></div>
        <div className="detail"><span className="detail-icon">✉</span><div><small>Email us</small><a href={contactInfo.emailHref}>{contactInfo.email}</a></div></div>
        <div className="detail"><span className="detail-icon">⌖</span><div><small>Visit us</small><p>{contactInfo.addressLines.map((line, i) => <span key={line}>{line}{i < contactInfo.addressLines.length - 1 && <br />}</span>)}</p><a className="map-link" href={contactInfo.mapLink} target="_blank" rel="noreferrer">Get directions ↗</a></div></div>
        <div className="detail"><span className="detail-icon">◷</span><div><small>Office hours</small><p>{contactInfo.hours.weekdays}<br />{contactInfo.hours.sunday}</p></div></div>
        <div className="detail"><span className="detail-icon">☺</span><div><small>Follow us</small><div className="contact-social-links"><a className="contact-social-link" href={contactInfo.social.instagram} target="_blank" rel="noreferrer" aria-label="Follow us on Instagram"><InstagramIcon /></a><a className="contact-social-link" href={contactInfo.social.facebook} target="_blank" rel="noreferrer" aria-label="Follow us on Facebook"><FacebookIcon /></a></div></div></div>
        <div className="map-card"><iframe title="Advance Study Sector location map" src={`https://www.google.com/maps?q=${contactInfo.mapQuery}&output=embed`} loading="lazy" /></div>
      </div></Reveal>
      <Reveal delay={150}>
        <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
          {formSent ? <div className="form-success"><span>✓</span><h2>Thank you for reaching out.</h2><p>We will be in touch with you shortly.</p><button type="button" className="text-button" onClick={() => setFormSent(false)}>Send another message</button></div> : <>
            <h2>Tell us a little<br /><em>about yourself.</em></h2>
            <label>Name<input required name="name" placeholder="Your full name" /></label>
            <label>Phone number<input required name="phone" type="tel" placeholder="Your phone number" /></label>
            <label>Email<input required name="email" type="email" placeholder="you@example.com" /></label>
            <label>Interested in<select required name="course" defaultValue=""><option value="" disabled>Select a course</option>{courses.map((course) => <option key={course.title}>{course.title}</option>)}</select></label>
            <label>Message <span className="optional">(optional)</span><textarea name="message" rows="3" placeholder="How can we help?"></textarea></label>
            {sendError && <p className="form-error" role="alert">{sendError}</p>}
            <button className="button button-primary" type="submit" disabled={isSending}>{isSending ? 'Sending...' : 'Send enquiry'} {!isSending && <ArrowIcon />}</button>
          </>}
        </form>
      </Reveal>
    </div>
  </section>
}
