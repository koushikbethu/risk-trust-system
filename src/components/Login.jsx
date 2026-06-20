import { useState } from 'react'
import './Login.css'

function Login({ setSessionId, setUsername }) {
  const [usernameInput, setUsernameInput] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (!usernameInput.trim()) return
    
    setSessionId(Date.now().toString())
    setUsername(usernameInput)
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Risk-Based Identity Trust System</h1>
        <p className="subtitle">Intelligent Access Control Demo</p>
        
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter username"
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>

        <div className="quick-test">
          <h3>🎯 Quick Test Guide</h3>
          <ul>
            <li><strong>Login:</strong> Enter username "testuser"</li>
            <li><strong>Initial Score:</strong> 10 (Green - Low - Allow)</li>
            <li><strong>New Device:</strong> Score → 40 (Yellow - Medium - OTP)</li>
            <li><strong>Abnormal Behavior:</strong> Score → 65 (Orange - High - MFA)</li>
            <li><strong>Safe Behavior:</strong> Score → 10 (Green - Low - Allow)</li>
            <li><strong>Logs:</strong> All actions recorded with timestamps</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Login
