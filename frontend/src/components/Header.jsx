import { NavLink, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { dark, toggle } = useTheme()
  const { user, signout } = useAuth()
  const navigate = useNavigate()

  const handleSignout = () => {
    signout()
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header-inner">
        <NavLink to="/" className="logo">🤖 ML Project</NavLink>
        <nav className="nav">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>About</NavLink>
          {user ? (
            <>
              <NavLink to="/analytics" className={({ isActive }) => isActive ? 'active' : ''}>Analytics</NavLink>
              <NavLink to="/history" className={({ isActive }) => isActive ? 'active' : ''}>History</NavLink>
              <NavLink to="/feedback" className={({ isActive }) => isActive ? 'active' : ''}>Feedback</NavLink>
              <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''}>Contact</NavLink>
              <span className="user-badge">👤 {user.name.split(' ')[0]}</span>
              <button className="btn btn-outline btn-sm" onClick={handleSignout}>Sign Out</button>
            </>
          ) : (
            <>
              <NavLink to="/signin" className={({ isActive }) => isActive ? 'active' : ''}>Sign In</NavLink>
              <NavLink to="/signup" className="btn btn-primary btn-sm">Sign Up</NavLink>
            </>
          )}
          <button className="theme-btn" onClick={toggle} title="Toggle theme">
            {dark ? '☀️' : '🌙'}
          </button>
        </nav>
      </div>
    </header>
  )
}
