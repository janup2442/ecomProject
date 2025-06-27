import axios from 'axios';
import React, { useState ,useEffect} from 'react';
import { useNavigate } from 'react-router';

const LoginPage = ({setIsAuthenticated,isloggedIn}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [clientError, setClientError] = useState(null);
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();
  useEffect(()=>{
    if(isloggedIn){
      navigate('/')
    }
  },[])

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

    if (!validateEmail(email)) {
      setClientError('Please enter a valid email address.');
      return;
    }
    //!validatePassword(password)
    if (false) {
      setClientError(
        'Password must be at least 8 characters long, include uppercase, lowercase, number, and a special character.'
      );
      return;
    }
    try {
      const result = await axios.post(`${import.meta.env.VITE_API_APP_HOST}/user/login`,{
        emailOrPhone:email,
        password:password
      })

      if(result?.status<400 && result?.status>=200){
        localStorage.setItem('authToken',result.data.token);
        localStorage.setItem('id',result.data.userId)
        setIsAuthenticated(true);
        navigate('/');
      }
    } catch (error) {
      setServerError("Something went wrong")
      console.log(error);
      
      setIsAuthenticated(false)
    }
  }



  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
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
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
