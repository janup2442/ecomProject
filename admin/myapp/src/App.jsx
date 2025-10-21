/*
  Ques : What is the most complicated code you have written without AI or anyone else assistance ?
  date : 13/10/2025
*/

import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Home from './pages/homeLayout.jsx'
import Dashboard from './pages/dashboard.jsx'
import Product from './pages/product.jsx'
import User from './pages/user.jsx'
import Order from './pages/order.jsx'
import AdminLogin from './pages/adminLogin.jsx'
import {useAuth} from './authContext.jsx'

function App() {
  
  const {isAuthenticated} = useAuth()
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AdminLogin/>} />
        <Route path="/" element={isAuthenticated?<Home/>:<Navigate to={'/login'} replace/>}>
          <Route index element={<Dashboard />} />
          <Route path="product" element={<Product />} />
          <Route path="order" element={<Order />} />
          <Route path="user" element={<User />} />
        </Route>
        {/* Catch-all route for 404 */}
        <Route path="*" element={<Navigate to={'/'} replace />} />
      </Routes>
    </Router>
  )
}

export default App