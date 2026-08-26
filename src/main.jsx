import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthModalProvider } from './context/AuthModalContext.jsx'


createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <BrowserRouter>
      <AuthModalProvider>
        <App />
      </AuthModalProvider>
    </BrowserRouter>
  </StrictMode>,
)
