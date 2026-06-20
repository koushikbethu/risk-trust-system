import { useState, useEffect } from 'react'
import './Dashboard.css'

function Dashboard({ username }) {
  const [riskData, setRiskData] = useState({
    score: 10,
    level: 'Low',
    action: 'Allow',
    color: '#4ade80',
    reason: 'Normal login'
  })
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [factors, setFactors] = useState({
    newDevice: false,
    unusualTime: false,
    behavioralAnomaly: false,
    trustedUser: true
  })

  useEffect(() => {
    addLog({
      username,
      score: 10,
      level: 'Low',
      action: 'Allow',
      reason: 'Normal login',
      timestamp: new Date().toISOString()
    })
  }, [])

  const calculateRisk = (currentFactors) => {
    let score = 10
    
    if (currentFactors.newDevice) score += 30
    if (currentFactors.unusualTime) score += 20
    if (currentFactors.behavioralAnomaly) score += 25
    if (currentFactors.trustedUser) score -= 20
    
    score = Math.max(0, Math.min(100, score))
    
    let level, action, color
    if (score < 30) {
      level = 'Low'
      action = 'Allow'
      color = '#4ade80'
    } else if (score < 60) {
      level = 'Medium'
      action = 'OTP'
      color = '#fbbf24'
    } else if (score < 80) {
      level = 'High'
      action = 'MFA'
      color = '#fb923c'
    } else {
      level = 'Critical'
      action = 'Block'
      color = '#ef4444'
    }
    
    return { score, level, action, color }
  }

  const addLog = (logEntry) => {
    setLogs(prevLogs => [logEntry, ...prevLogs].slice(0, 50))
  }

  const handleSimulate = (type) => {
    setLoading(true)
    
    setTimeout(() => {
      let newFactors = { ...factors }
      let reason = ''
      
      if (type === 'newDevice') {
        newFactors.newDevice = true
        reason = 'New Device Detected'
      } else if (type === 'abnormal') {
        newFactors.behavioralAnomaly = true
        newFactors.unusualTime = true
        reason = 'Abnormal Behavior Detected'
      } else if (type === 'safe') {
        newFactors.newDevice = false
        newFactors.behavioralAnomaly = false
        newFactors.unusualTime = false
        newFactors.trustedUser = true
        reason = 'Safe Behavior Confirmed'
      }
      
      setFactors(newFactors)
      const result = calculateRisk(newFactors)
      
      setRiskData({
        ...result,
        reason
      })
      
      addLog({
        username,
        score: result.score,
        level: result.level,
        action: result.action,
        reason,
        timestamp: new Date().toISOString()
      })
      
      setLoading(false)
    }, 300)
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Risk Dashboard</h1>
        <div className="user-info">
          <span>User: {username}</span>
          <button onClick={() => window.location.reload()}>Logout</button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="risk-section">
          <div className="risk-score-card">
            <h2>Risk Score</h2>
            <div className="risk-score" style={{ color: riskData.color }}>
              {riskData.score}
            </div>
            <div className="risk-bar">
              <div 
                className="risk-bar-fill" 
                style={{ 
                  width: `${riskData.score}%`,
                  backgroundColor: riskData.color 
                }}
              ></div>
            </div>
          </div>

          <div className="risk-details">
            <div className="detail-item">
              <span className="label">Risk Level:</span>
              <span className="value badge" style={{ backgroundColor: riskData.color }}>
                {riskData.level}
              </span>
            </div>
            <div className="detail-item">
              <span className="label">Action Taken:</span>
              <span className="value">{riskData.action}</span>
            </div>
            <div className="detail-item">
              <span className="label">Reason:</span>
              <span className="value">{riskData.reason}</span>
            </div>
          </div>
        </div>

        <div className="actions-section">
          <h3>Simulate Scenarios</h3>
          <div className="action-buttons">
            <button 
              onClick={() => handleSimulate('newDevice')}
              disabled={loading}
              className="btn-danger"
            >
              🔴 Simulate New Device
            </button>
            <button 
              onClick={() => handleSimulate('abnormal')}
              disabled={loading}
              className="btn-warning"
            >
              ⚠️ Simulate Abnormal Behavior
            </button>
            <button 
              onClick={() => handleSimulate('safe')}
              disabled={loading}
              className="btn-success"
            >
              ✅ Simulate Safe Behavior
            </button>
          </div>
        </div>

        <div className="logs-section">
          <h3>Activity Logs</h3>
          <div className="logs-container">
            {logs.length === 0 ? (
              <p className="no-logs">No activity logs yet</p>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="log-item">
                  <div className="log-header">
                    <span className="log-user">{log.username}</span>
                    <span className="log-time">
                      {new Date(log.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <div className="log-details">
                    <span>Score: {log.score}</span>
                    <span>Level: {log.level}</span>
                    <span>Action: {log.action}</span>
                  </div>
                  <div className="log-reason">{log.reason}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
