import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { apiSignin } from '../api'

export default function SignIn() {
  const { signin } = useAuth()
  const { addToast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/analytics'

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async e => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await apiSignin(form)
      if (res.success) {
        signin(res.user)
        addToast(`Welcome back, ${res.user.name.split(' ')[0]}!`, 'success')
        navigate(from, { replace: true })
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
            <h1>Welcome back</h1>
            <p>Sign in to access your ML dashboard</p>
          </div>

          {error && <div className="error-msg">{error}</div>}

          <form onSubmit={submit}>
            <div className="form-group">
              <label>Email</label>
              <input name="email" type="email" value={form.email} onChange={handle}
                placeholder="your@email.com" required autoFocus />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input name="password" type="password" value={form.password} onChange={handle}
                placeholder="••••••••" required />
            </div>
            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
