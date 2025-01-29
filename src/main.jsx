import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { ToastContainer } from 'react-toastify'
import { QuizResultProvider } from './context/QuizResultContext.jsx'
import { QuizProvider } from './context/QuizProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <QuizResultProvider>
          <QuizProvider>
            <ToastContainer />
            <App />
          </QuizProvider>
        </QuizResultProvider>
      </AuthProvider>

    </BrowserRouter>
  </StrictMode>,
)
