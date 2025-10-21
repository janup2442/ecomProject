import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {AuthProvider} from './AuthContext.jsx'
import {CartProvider} from './CartContext.jsx'
import {ToastProvider} from './component/Toast.jsx'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <CartProvider>
      <ToastProvider>
        <App/>
      </ToastProvider>
    </CartProvider>
  </AuthProvider>
)
