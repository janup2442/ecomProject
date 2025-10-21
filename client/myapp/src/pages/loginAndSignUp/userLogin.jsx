import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import {useAuth} from '../../AuthContext'
const LoginPage = () => {
  const {isAuthenticated,setIsAuthenticated, isLoading}  = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [clientError, setClientError] = useState(null);
  const [serverError, setServerError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("i am running at login page");
    
    if (isAuthenticated === true) {
      navigate('/',{replace:true})
    }
  }, [isAuthenticated, navigate])

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    // Minimum 8 characters, at least one uppercase, one lowercase, one number and one special character
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setClientError('');
    setServerError('');
    setIsSubmitting(true);

    if (!validateEmail(email)) {
      setClientError('Please enter a valid email address.');
      setIsSubmitting(false);
      return;
    }
    //!validatePassword(password)
    if (false) {
      setClientError(
        'Password must be at least 8 characters long, include uppercase, lowercase, number, and a special character.'
      );
      setIsSubmitting(false);
      return;
    }
    try {
      const result = await axios.post(`${import.meta.env.VITE_API_APP_HOST}/user/login`, {
        emailOrPhone: email,
        password: password
      }, {
        withCredentials: true
      })

      if (result?.status < 400 && result?.status >= 200) {
        console.log('you just logged in');
        
        setIsAuthenticated(true);
        navigate('/');
      }
    } catch (error) {
      setServerError(error.response?.data?.message || "Something went wrong")
      setIsAuthenticated(false)
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }



  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 py-4">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          {clientError && <div className="alert alert-warning">{clientError}</div>}
          {serverError && <div className="alert alert-danger">{serverError}</div>}

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email or Phone"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name='emailOrPhone'
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name='password'
              required
              disabled={isSubmitting}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-100" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Signing in...
              </>
            ) : (
              'Login'
            )}
          </button>
          
          <div className="text-center mt-3">
            <p className="mb-0">Don't have an account? <Link to="/register" className="text-decoration-none">Sign up</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
