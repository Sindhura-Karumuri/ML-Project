import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { apiSignup } from '../api'

export default function SignUp() {
  const { signin } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()

  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async e => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) {
      setError('Passwords do not match.')
      addToast('Passwords do not match.', 'error')
      return
    }
    setLoading(true)
    try {
      const res = await apiSignup({ name: form.name, email: form.email, password: form.password })
      if (res.success) {
        signin(res.user)
        addToast(`Account created! Welcome, ${res.user.name.split(' ')[0]}!`, 'success')
        navigate('/analytics', { replace: true })
      } else {
        setError(res.message)
        addToast(res.message, 'error')
      }
    } catch {
      const msg = 'Cannot reach server. Make sure the backend is running.'
      setError(msg)
      addToast(msg, 'error')
    }
    setLoading(false)
  }

  return (
    <div className="page auth-page">
      <div className="container">
        <div className="auth-card">
          <div className="auth-header">
            <span className="auth-icon">🤖</span>
            <h1>Create account</h1>
            <p>Join ML Project and start exploring</p>
          </div>

          {error && <div className="error-msg">{error}</div>}

          <form onSubmit={submit}>
            <div className="form-group">
              <label>Full Name</label>
              <input name="name" value={form.name} onChange={handle}
                placeholder="Your name" required autoFocus />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input name="email" type="email" value={form.email} onChange={handle}
                placeholder="your@email.com" required />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input name="password" type="password" value={form.password} onChange={handle}
                placeholder="Min. 6 characters" required />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input name="confirm" type="password" value={form.confirm} onChange={handle}
                placeholder="Repeat password" required />
            </div>
            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/signin">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
