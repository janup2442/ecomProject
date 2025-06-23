import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import axios from 'axios'
import Home from './pages/homeLayout.jsx'
import Dashboard from './pages/dashboard.jsx'
import Product from './pages/product.jsx'
import User from './pages/user.jsx'
import Order from './pages/order.jsx'
import AdminLogin from './pages/adminLogin.jsx' 

// ProtectedRoute component to guard admin pages
function ProtectedRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('adminToken')
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function App() {
  const [authChecked, setAuthChecked] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Example: Check token validity with backend (optional, but more secure)
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken')
      if (!token) {
        setIsAuthenticated(false)
        setAuthChecked(true)
        return
      }
      try {
        // Replace with your actual backend endpoint
        const res = await axios.get('/api/admin/verify', {
          headers: { Authorization: `Bearer ${token}` },
        })
        setIsAuthenticated(res.data.valid)
      } catch (err) {
        setIsAuthenticated(false)
        setError(err.response?.data?.message || err.message)
      } finally {
        setAuthChecked(true)
      }
    }
    checkAuth()
  }, [])

  if (!authChecked) {
    return <div>Loading...</div>
  }

  return (
    <Router>
      {error && (
        <div style={{ color: 'red', margin: '1rem' }}>
          {error}
        </div>
      )}
      <Routes>
        <Route path="/login" element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="product" element={<Product />} />
          <Route path="order" element={<Order />} />
          <Route path="user" element={<User />} />
        </Route>
        {/* Catch-all route for 404 */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} replace />} />
      </Routes>
    </Router>
  )
}

export default App