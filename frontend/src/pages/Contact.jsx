import { useState } from 'react'
import { submitContact } from '../api'
import { useToast } from '../context/ToastContext'

const info = [
  { icon: '📧', label: 'Email', value: 'contact@mlproject.dev' },
  { icon: '💬', label: 'Discord', value: 'discord.gg/mlproject' },
  { icon: '🐙', label: 'GitHub', value: 'github.com/mlproject' },
  { icon: '🐦', label: 'Twitter', value: '@mlproject_dev' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const { addToast } = useToast()

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async e => {
    e.preventDefault()
    try {
      await submitContact(form)
      addToast('Message sent! We\'ll get back to you soon.', 'success')
    } catch {
      addToast('Failed to send message. Try again.', 'error')
    }
    setSubmitted(true)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="page">
      <div className="container">
        <h1 className="section-title">Get In Touch</h1>
        <p className="section-sub">Have a question or want to collaborate? We'd love to hear from you.</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
          {/* Contact Form */}
          <div className="form-card" style={{ margin: 0 }}>
            {submitted && <div className="success-msg">Message sent! We'll get back to you soon. 📬</div>}
            <form onSubmit={submit}>
              <div className="form-group">
                <label>Name</label>
                <input name="name" value={form.name} onChange={handle} placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input name="email" type="email" value={form.email} onChange={handle} placeholder="your@email.com" required />
              </div>
              <div className="form-group">
                <label>Subject</label>
                <input name="subject" value={form.subject} onChange={handle} placeholder="What's this about?" required />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea name="message" value={form.message} onChange={handle} placeholder="Your message..." required />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h3 style={{ marginBottom: '20px', fontSize: '1.1rem', fontWeight: 600 }}>Other Ways to Reach Us</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {info.map((item, i) => (
                <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '18px 20px' }}>
                  <span style={{ fontSize: '1.4rem' }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '2px' }}>{item.label}</div>
                    <div style={{ fontWeight: 500, fontSize: '0.95rem' }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
