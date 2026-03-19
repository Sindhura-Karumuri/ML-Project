import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/analytics">Analytics</Link>
        <Link to="/about">About</Link>
        <Link to="/feedback">Feedback</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <p>© {new Date().getFullYear()} ML Project. Built with React.</p>
    </footer>
  )
}
