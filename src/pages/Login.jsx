import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [age, setAge] = useState('')
  const [message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)
  const [isRegisterMode, setIsRegisterMode] = useState(false)
  const navigate = useNavigate()

  async function login() {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })

    if (response.ok) {
      const data = await response.json()
      localStorage.setItem('token', data.token)
      localStorage.setItem('role', data.role)
      if (data.role === 'ADMIN') {
        navigate('/admin/members')
      } else {
        navigate('/dashboard')
      }
    } else {
      setIsError(true)
      setMessage('Invalid username or password!')
    }
  }

  async function register() {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, firstname, lastname, age: parseInt(age) })
    })

    if (response.ok) {
      setIsError(false)
      setMessage('Registered successfully! Please login.')
      setIsRegisterMode(false)
    } else {
      setIsError(true)
      setMessage('Username already exists!')
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🏋️ GymBooking</h1>

        {isRegisterMode && (
          <>
            <input
              style={styles.input}
              type="text"
              placeholder="First Name"
              value={firstname}
              onChange={e => setFirstname(e.target.value)}
            />
            <input
              style={styles.input}
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={e => setLastname(e.target.value)}
            />
            <input
              style={styles.input}
              type="number"
              placeholder="Age"
              value={age}
              onChange={e => setAge(e.target.value)}
            />
          </>
        )}

        <input
          style={styles.input}
          type="text"
          placeholder="Email"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {isRegisterMode ? (
          <>
            <button style={styles.button} onClick={register}>Register</button>
            <button style={styles.secondaryButton} onClick={() => setIsRegisterMode(false)}>Back to Login</button>
          </>
        ) : (
          <>
            <button style={styles.button} onClick={login}>Login</button>
            <button style={styles.secondaryButton} onClick={() => setIsRegisterMode(true)}>Create Account</button>
          </>
        )}

        {message && (
          <p style={{ color: isError ? 'red' : 'green', textAlign: 'center' }}>
            {message}
          </p>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5'
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    width: '350px'
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px'
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box'
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#333',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '10px'
  },
  secondaryButton: {
    width: '100%',
    padding: '10px',
    backgroundColor: 'white',
    color: '#333',
    border: '1px solid #333',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '10px'
  }
}

export default Login