import { Link } from 'react-router-dom'
import FAQs from '../components/FAQs'

const features = [
  { icon: '🧠', title: 'Smart Predictions', desc: 'Leverage trained ML models to get accurate predictions on your datasets in seconds.' },
  { icon: '📊', title: 'Visual Analytics', desc: 'Interactive charts and graphs that make complex data easy to understand at a glance.' },
  { icon: '⚡', title: 'Fast Processing', desc: 'Optimized pipelines ensure your data is processed quickly without sacrificing accuracy.' },
  { icon: '🔒', title: 'Secure & Private', desc: 'Your data never leaves your session. Privacy-first design from the ground up.' },
  { icon: '📁', title: 'Easy Data Upload', desc: 'Drag and drop CSV or JSON files and get results instantly with zero configuration.' },
  { icon: '📤', title: 'Export Results', desc: 'Download predictions, charts, and reports in multiple formats for further use.' },
]

export default function Home() {
  return (
    <div className="page">
      <div className="container">
        {/* Hero */}
        <section className="hero">
          <h1>Machine Learning <span>Made Simple</span></h1>
          <p>Upload your data, run powerful ML models, and get actionable insights — no coding required.</p>
          <Link to="/analytics" className="btn btn-primary">View Analytics</Link>
          <Link to="/about" className="btn btn-outline">Learn More</Link>
        </section>

        {/* Features */}
        <section>
          <h2 className="section-title">What We Offer</h2>
          <p className="section-sub">Everything you need to explore and understand your data.</p>
          <div className="cards-grid">
            {features.map((f, i) => (
              <div className="card" key={i}>
                <div className="card-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section style={{ marginTop: '60px' }}>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-sub">Quick answers to common questions.</p>
          <FAQs />
        </section>
      </div>
    </div>
  )
}
