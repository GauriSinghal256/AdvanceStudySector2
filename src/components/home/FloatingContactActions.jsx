import './FloatingContactActions.css'

const phoneNumber = '+918168477983'

function WhatsAppIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.08 0C5.52 0 .18 5.34.18 11.9c0 2.1.55 4.15 1.6 5.95L.08 24l6.3-1.65a11.87 11.87 0 0 0 5.69 1.45h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.23-6.17-3.46-8.42ZM12.08 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.23-.37a9.88 9.88 0 1 1 8.37 4.63Zm5.42-7.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.5 1.69.64.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
  </svg>
}

function PhoneIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2c.28-.28.67-.37 1.02-.25 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.06 21 3 13.94 3 5c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2Z" />
  </svg>
}

export function FloatingContactActions() {
  return <div className="floating-contact-actions" aria-label="Contact us">
    <a
      className="floating-contact-action floating-contact-action-whatsapp"
      href={`https://wa.me/${phoneNumber}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Message us on WhatsApp"
    >
      <WhatsAppIcon />
    </a>
    <a
      className="floating-contact-action floating-contact-action-call"
      href={`tel:${phoneNumber}`}
      aria-label="Call us"
    >
      <PhoneIcon />
    </a>
  </div>
}