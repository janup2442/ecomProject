// main.jsx or index.jsx
import { AuthProvider } from './authContext';
import App from './App';
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>
)
