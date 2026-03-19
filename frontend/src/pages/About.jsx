import FAQs from '../components/FAQs'

const steps = [
  'Navigate to the Home page and click "View Analytics" to explore the dashboard.',
  'Go to Analytics to see model performance stats, prediction charts, and model comparisons.',
  'To submit your own data, use the upload section on the Analytics page (CSV or JSON).',
  'Review the prediction results and accuracy metrics displayed in the dashboard.',
  'Export your results using the download buttons available on the Analytics page.',
  'Use the Feedback page to rate your experience and suggest improvements.',
  'Reach out via the Contact page if you need help or want to report an issue.',
]

const team = [
  { emoji: '👨‍💻', name: 'Alex Chen', role: 'ML Engineer' },
  { emoji: '👩‍🎨', name: 'Sara Kim', role: 'UI/UX Designer' },
  { emoji: '👨‍🔬', name: 'Raj Patel', role: 'Data Scientist' },
  { emoji: '👩‍💻', name: 'Mia Torres', role: 'Frontend Dev' },
]

export default function About() {
  return (
    <div className="page">
      <div className="container">
        <h1 className="section-title">About This Project</h1>
        <p className="section-sub">A machine learning platform built to make data science accessible to everyone.</p>

        <div className="about-grid">
          {/* Left: About text */}
          <div className="about-text">
            <p>
              ML Project is an open-source platform that brings the power of machine learning to users without requiring any coding knowledge. Built on top of proven algorithms, it provides a clean interface for data exploration and prediction.
            </p>
            <p>
              Whether you're a student exploring ML for the first time, a researcher needing quick prototyping, or a business analyst looking for data-driven insights — this tool is built for you.
            </p>
            <p>
              The project started as a Jupyter Notebook experiment and evolved into a full-stack application with a focus on usability, transparency, and performance.
            </p>
          </div>

          {/* Right: How to use */}
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>How to Use This Website</h2>
            <ol className="steps-list">
              {steps.map((step, i) => (
                <li key={i}><span>{step}</span></li>
              ))}
            </ol>
          </div>
        </div>

        {/* Team */}
        <section style={{ marginTop: '56px' }}>
          <h2 className="section-title">Meet the Team</h2>
          <p className="section-sub">The people behind the project.</p>
          <div className="team-grid">
            {team.map((m, i) => (
              <div className="team-card" key={i}>
                <div className="team-avatar">{m.emoji}</div>
                <h4>{m.name}</h4>
                <p>{m.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section style={{ marginTop: '60px' }}>
          <h2 className="section-title">FAQs</h2>
          <p className="section-sub">Common questions answered.</p>
          <FAQs />
        </section>
      </div>
    </div>
  )
}
