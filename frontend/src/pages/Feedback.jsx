import { useState } from 'react'
import { submitFeedback } from '../api'
import { useToast } from '../context/ToastContext'

export default function Feedback() {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)
  const [form, setForm] = useState({ name: '', email: '', category: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const { addToast } = useToast()

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async e => {
    e.preventDefault()
    try {
      await submitFeedback({ ...form, rating })
      addToast('Feedback submitted. Thank you!', 'success')
    } catch {
      addToast('Failed to submit feedback. Try again.', 'error')
    }
    setSubmitted(true)
    setForm({ name: '', email: '', category: '', message: '' })
    setRating(0)
  }

  return (
    <div className="page">
      <div className="container">
        <h1 className="section-title">Share Your Feedback</h1>
        <p className="section-sub">Help us improve by sharing your experience.</p>

        <div className="form-card">
          {submitted && (
            <div className="success-msg">Thanks for your feedback! We really appreciate it. 🙌</div>
          )}
          <form onSubmit={submit}>
            <div className="form-group">
              <label>Your Name</label>
              <input name="name" value={form.name} onChange={handle} placeholder="Enter your name" required />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input name="email" type="email" value={form.email} onChange={handle} placeholder="your@email.com" required />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select name="category" value={form.category} onChange={handle} required>
                <option value="">Select a category</option>
                <option>General</option>
                <option>Bug Report</option>
                <option>Feature Request</option>
                <option>Performance</option>
                <option>UI/UX</option>
              </select>
            </div>
            <div className="form-group">
              <label>Overall Rating</label>
              <div className="star-row">
                {[1, 2, 3, 4, 5].map(s => (
                  <span
                    key={s}
                    className={`star ${s <= (hover || rating) ? 'active' : ''}`}
                    onClick={() => setRating(s)}
                    onMouseEnter={() => setHover(s)}
                    onMouseLeave={() => setHover(0)}
                  >★</span>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Your Message</label>
              <textarea name="message" value={form.message} onChange={handle} placeholder="Tell us what you think..." required />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Submit Feedback</button>
          </form>
        </div>
      </div>
    </div>
  )
}
