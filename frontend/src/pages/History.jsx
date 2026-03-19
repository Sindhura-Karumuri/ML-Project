import { useEffect, useState } from 'react'
import { fetchHistory } from '../api'
import { useAuth } from '../context/AuthContext'

export default function History() {
  const { user } = useAuth()
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    fetchHistory(user.email)
      .then(data => setRecords([...data].reverse()))
      .catch(() => setRecords([]))
      .finally(() => setLoading(false))
  }, [user])

  return (
    <div className="page">
      <div className="container">
        <h1 className="section-title">Prediction History</h1>
        <p className="section-sub">All predictions made with your account.</p>

        <div className="chart-placeholder" style={{ textAlign: 'left', padding: '24px' }}>
          {loading ? (
            <p style={{ color: 'var(--text-muted)' }}>Loading...</p>
          ) : records.length === 0 ? (
            <div className="history-empty">
              <span>🔍</span>
              <p>No predictions yet. Head to <a href="/analytics" style={{ color: 'var(--accent)' }}>Analytics</a> to make your first one.</p>
            </div>
          ) : (
            <table className="history-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Label</th>
                  <th>Confidence</th>
                  <th>Date &amp; Time</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r, i) => (
                  <tr key={r.id}>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{records.length - i}</td>
                    <td>
                      {r.thumbnail
                        ? <img src={r.thumbnail} alt={r.label} className="history-thumb" />
                        : <span style={{ fontSize: '1.4rem' }}>🎲</span>}
                    </td>
                    <td style={{ fontWeight: 600, color: 'var(--accent)' }}>{r.label}</td>
                    <td>{r.confidence}%</td>
                    <td style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{r.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
