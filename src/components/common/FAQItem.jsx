import './FAQItem.css'
export function FAQItem({ item, isOpen, onToggle }) {
  return <div className={`faq-item ${isOpen ? 'faq-open' : ''}`}>
    <button className="faq-question" onClick={onToggle}><span>{item.q}</span><span className="faq-icon">{isOpen ? '−' : '+'}</span></button>
    <div className="faq-answer"><p>{item.a}</p></div>
  </div>
}
