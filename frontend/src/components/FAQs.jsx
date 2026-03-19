import { useState } from 'react'

const faqs = [
  {
    q: 'What does this ML Project do?',
    a: 'This project uses machine learning algorithms to analyze data, identify patterns, and provide predictive insights through an interactive dashboard.',
  },
  {
    q: 'Do I need any ML knowledge to use this?',
    a: 'No. The interface is designed for all users. You just upload your data or use the demo dataset and the system handles the rest.',
  },
  {
    q: 'What data formats are supported?',
    a: 'Currently CSV and JSON formats are supported. More formats like Excel and Parquet are coming soon.',
  },
  {
    q: 'How accurate are the predictions?',
    a: 'Accuracy depends on the quality and quantity of your data. The analytics page shows model performance metrics for full transparency.',
  },
  {
    q: 'Is my data stored or shared?',
    a: 'No. All processing happens locally or in your session. We do not store or share your data with third parties.',
  },
  {
    q: 'Can I export the results?',
    a: 'Yes, results and charts can be exported as CSV or PNG from the Analytics page.',
  },
]

export default function FAQs() {
  const [open, setOpen] = useState(null)

  return (
    <div className="faq-list">
      {faqs.map((faq, i) => (
        <div className="faq-item" key={i}>
          <button className="faq-question" onClick={() => setOpen(open === i ? null : i)}>
            {faq.q}
            <span className={`faq-icon ${open === i ? 'open' : ''}`}>+</span>
          </button>
          {open === i && <div className="faq-answer">{faq.a}</div>}
        </div>
      ))}
    </div>
  )
}
