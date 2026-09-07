import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthModalProvider } from './context/AuthModalContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'


createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <BrowserRouter>
      <AuthModalProvider>
        <AuthProvider>
        <App/>
        </AuthProvider>
      </AuthModalProvider>
    </BrowserRouter>
  </StrictMode>,
)
