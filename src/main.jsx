import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import CyberRiskPage from './pages/CyberRiskPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/*" element={<App />} />
        <Route path="/cyberrisk" element={<CyberRiskPage />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
)
