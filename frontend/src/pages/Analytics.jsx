import { useEffect, useState, useRef } from 'react'
import { fetchStats, fetchModels, predict, predictUpload, saveHistory } from '../api'
import { useToast } from '../context/ToastContext'
import { useAuth } from '../context/AuthContext'

export default function Analytics() {
  const [stats, setStats] = useState(null)
  const [models, setModels] = useState([])
  const [prediction, setPrediction] = useState(null)
  const [predicting, setPredicting] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [preview, setPreview] = useState(null)
  const fileRef = useRef()
  const { addToast } = useToast()
  const { user } = useAuth()

  useEffect(() => {
    fetchStats().then(setStats).catch(() => {})
    fetchModels().then(setModels).catch(() => {})
  }, [])

  const runDemo = async () => {
    setPredicting(true)
    setPreview(null)
    try {
      const result = await predict()
      setPrediction(result)
      addToast(`Predicted: ${result.predicted_label} (${result.confidence}%)`, 'success')
      if (user) saveHistory({ email: user.email, label: result.predicted_label, confidence: result.confidence, thumbnail: '' }).catch(() => {})
    } catch {
      setPrediction({ error: 'Backend not reachable. Make sure Flask is running on port 5000.' })
      addToast('Backend not reachable.', 'error')
    }
    setPredicting(false)
  }

  const handleFile = async (file) => {
    if (!file || !file.type.startsWith('image/')) {
      setPrediction({ error: 'Please upload a valid image file (PNG, JPG, etc.).' })
      addToast('Please upload a valid image file.', 'error')
      return
    }
    let thumbDataUrl = ''
    const reader = new FileReader()
    reader.onload = e => { setPreview(e.target.result); thumbDataUrl = e.target.result }
    reader.readAsDataURL(file)

    setPredicting(true)
    setPrediction(null)
    try {
      const result = await predictUpload(file)
      if (result.success) {
        setPrediction(result)
        addToast(`Predicted: ${result.predicted_label} (${result.confidence}%)`, 'success')
        if (user) saveHistory({ email: user.email, label: result.predicted_label, confidence: result.confidence, thumbnail: thumbDataUrl }).catch(() => {})
      } else {
        setPrediction({ error: result.message })
        addToast(result.message, 'error')
      }
    } catch {
      setPrediction({ error: 'Backend not reachable. Make sure Flask is running on port 5000.' })
      addToast('Backend not reachable.', 'error')
    }
    setPredicting(false)
  }

  const onFileInput = e => handleFile(e.target.files[0])
  const onDrop = e => {
    e.preventDefault()
    setDragOver(false)
    handleFile(e.dataTransfer.files[0])
  }

  const statCards = stats ? [
    { num: stats.best_accuracy, label: 'Best Model Accuracy' },
    { num: stats.total_predictions, label: 'Total Predictions' },
    { num: `${stats.avg_response_ms}ms`, label: 'Avg. Response Time' },
    { num: stats.models_available, label: 'Models Available' },
  ] : Array(4).fill({ num: '—', label: '...' })

  const barHeights = stats?.daily_predictions ?? [60, 90, 75, 110, 95, 130, 85, 100, 70, 120]
  const maxBar = Math.max(...barHeights)

  return (
    <div className="page">
      <div className="container">
        <h1 className="section-title">Analytics Dashboard</h1>
        <p className="section-sub">Real-time model performance and prediction statistics.</p>

        {/* Stats */}
        <div className="stats-grid">
          {statCards.map((s, i) => (
            <div className="stat-card" key={i}>
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Bar Chart */}
        <div className="chart-placeholder">
          <strong>Predictions Over Last 10 Days</strong>
          <div className="chart-bar-row">
            {barHeights.map((h, i) => (
              <div key={i} className="chart-bar"
                style={{ height: `${(h / maxBar) * 130}px` }}
                title={`Day ${i + 1}: ${h} predictions`} />
            ))}
          </div>
          <p style={{ marginTop: '12px', fontSize: '0.85rem' }}>Last 10 days</p>
        </div>

        {/* ── Upload & Predict ── */}
        <div className="chart-placeholder" style={{ textAlign: 'left' }}>
          <strong style={{ display: 'block', marginBottom: '6px', fontSize: '1.05rem' }}>
            🖼️ Upload Image for Prediction
          </strong>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
            Upload any clothing image (PNG, JPG). The model will classify it into one of 10 Fashion MNIST categories.
          </p>

          {/* Drop zone */}
          <div
            className={`drop-zone ${dragOver ? 'drag-over' : ''}`}
            onClick={() => fileRef.current.click()}
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
          >
            {preview ? (
              <img src={preview} alt="preview" className="upload-preview" />
            ) : (
              <>
                <span style={{ fontSize: '2.5rem' }}>📂</span>
                <p style={{ margin: '8px 0 4px', fontWeight: 500 }}>Drag & drop an image here</p>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>or click to browse</p>
              </>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={onFileInput} />

          <div style={{ display: 'flex', gap: '12px', marginTop: '14px', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => fileRef.current.click()} disabled={predicting}>
              {predicting ? 'Predicting...' : '📤 Upload & Predict'}
            </button>
            <button className="btn btn-outline" onClick={runDemo} disabled={predicting}>
              🎲 Run Demo
            </button>
            {(preview || prediction) && (
              <button className="btn btn-outline" onClick={() => { setPreview(null); setPrediction(null); fileRef.current.value = '' }}>
                ✕ Clear
              </button>
            )}
          </div>

          {/* Result */}
          {predicting && (
            <div style={{ marginTop: '20px', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              ⏳ Analyzing image...
            </div>
          )}
          {prediction && !predicting && (
            <div style={{ marginTop: '20px' }}>
              {prediction.error ? (
                <div className="error-msg">{prediction.error}</div>
              ) : (
                <>
                  <div className="prediction-result">
                    <span className="pred-label">{prediction.predicted_label}</span>
                    <span className="pred-conf">{prediction.confidence}% confidence</span>
                    <span className="pred-time">{prediction.response_ms}ms</span>
                  </div>
                  {/* Confidence bars */}
                  <div style={{ marginTop: '16px' }}>
                    {prediction.all_scores && Object.entries(prediction.all_scores)
                      .sort((a, b) => b[1] - a[1])
                      .map(([label, score]) => (
                        <div key={label} style={{ marginBottom: '6px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '2px' }}>
                            <span style={{ fontWeight: label === prediction.predicted_label ? 700 : 400, color: label === prediction.predicted_label ? 'var(--accent)' : 'var(--text)' }}>{label}</span>
                            <span style={{ color: 'var(--text-muted)' }}>{score}%</span>
                          </div>
                          <div style={{ height: '6px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                            <div style={{
                              height: '100%', borderRadius: '4px',
                              width: `${score}%`,
                              background: label === prediction.predicted_label ? 'var(--accent)' : 'var(--accent-light)',
                              transition: 'width 0.5s ease',
                            }} />
                          </div>
                        </div>
                      ))}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Model Table */}
        <div className="chart-placeholder" style={{ textAlign: 'left' }}>
          <strong style={{ display: 'block', marginBottom: '16px' }}>Model Performance</strong>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.93rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Model', 'Accuracy', 'Precision', 'Recall', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 0', textAlign: 'left', color: 'var(--text-muted)', fontWeight: 500 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(models.length ? models : [
                { name: 'Random Forest', accuracy: '—', precision: '—', recall: '—', status: 'Active' },
                { name: 'Logistic Regression', accuracy: '—', precision: '—', recall: '—', status: 'Active' },
                { name: 'SVM', accuracy: '—', precision: '—', recall: '—', status: 'Idle' },
                { name: 'KNN', accuracy: '—', precision: '—', recall: '—', status: 'Active' },
              ]).map((m, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--accent-light)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '12px 0' }}>{m.name}</td>
                  <td style={{ padding: '12px 0', color: 'var(--accent)', fontWeight: 600 }}>{m.accuracy}</td>
                  <td style={{ padding: '12px 0' }}>{m.precision}</td>
                  <td style={{ padding: '12px 0' }}>{m.recall}</td>
                  <td style={{ padding: '12px 0' }}>
                    <span style={{
                      padding: '3px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600,
                      background: m.status === 'Active' ? '#d1fae5' : m.status === 'Training' ? '#fef3c7' : 'var(--accent-light)',
                      color: m.status === 'Active' ? '#065f46' : m.status === 'Training' ? '#92400e' : 'var(--accent)',
                    }}>{m.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
