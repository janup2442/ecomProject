import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import {useAuth} from '../authContext'


export default function AdminLogin() {
  const {setIsAuthenticated,isAuthenticated} = useAuth();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailValid, setEmailValid] = useState(null)
  const [passwordValid, setPasswordValid] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate() ;
  // Email validation regex
  const validateEmail = (value) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(value)
  }

  useEffect(()=>{
    if(isAuthenticated){
      navigate('/')
    }
  })
  // Password validation (at least 6 chars)
  const validatePassword = (value) => value.length >= 6

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)
    setEmailValid(validateEmail(value))
  }

  const handlePasswordChange = (e) => {
    const value = e.target.value
    setPassword(value)
    setPasswordValid(validatePassword(value))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const result = await axios.post(`${import.meta.env.VITE_API_HOST}/api/admin/login`, { email: email, password },{
        withCredentials:true
      })
      if(result.status>=200 && result.status<400){
        setIsAuthenticated(true)
        navigate('/')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow p-4" style={{ maxWidth: 400, width: '100%' }}>
        <h3 className="text-center mb-4">Admin Login</h3>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="adminEmail" className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${emailValid === false ? 'is-invalid' : emailValid ? 'is-valid' : ''}`}
              id="adminEmail"
              value={email}
              onChange={handleEmailChange}
              required
              autoFocus
            />
            {email.length > 0 && (
              <div className={`form-text ${emailValid ? 'text-success' : 'text-danger'}`}>
                {emailValid ? 'Valid email address' : 'Please enter a valid email address'}
              </div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="adminPassword" className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${passwordValid === false ? 'is-invalid' : passwordValid ? 'is-valid' : ''}`}
              id="adminPassword"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {password.length > 0 && (
              <div className={`form-text ${passwordValid ? 'text-success' : 'text-danger'}`}>
                {passwordValid ? 'Password looks good' : 'Password must be at least 6 characters'}
              </div>
            )}
          </div>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={!emailValid || !passwordValid || loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}