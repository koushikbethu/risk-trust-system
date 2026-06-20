import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import './App.css'

function App() {
  const [sessionId, setSessionId] = useState(null)
  const [username, setUsername] = useState('')

  return (
    <Router basename="/risk-trust-system">
      <Routes>
        <Route 
          path="/" 
          element={
            sessionId ? 
            <Navigate to="/dashboard" /> : 
            <Login setSessionId={setSessionId} setUsername={setUsername} />
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            sessionId ? 
            <Dashboard sessionId={sessionId} username={username} /> : 
            <Navigate to="/" />
          } 
        />
      </Routes>
    </Router>
  )
}

export default App
