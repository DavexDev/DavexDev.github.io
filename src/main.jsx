import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

const CyberRiskPage = lazy(() => import('./pages/CyberRiskPage.jsx'))
const HanoiPage = lazy(() => import('./pages/HanoiPage.jsx'))
const SnakePage = lazy(() => import('./pages/SnakePage.jsx'))
const Game2048Page = lazy(() => import('./pages/Game2048Page.jsx'))
const MinesweeperPage = lazy(() => import('./pages/MinesweeperPage.jsx'))
const SimonPage = lazy(() => import('./pages/SimonPage.jsx'))
const SudokuPage = lazy(() => import('./pages/SudokuPage.jsx'))
const SlidingPuzzlePage = lazy(() => import('./pages/SlidingPuzzlePage.jsx'))
const WordlePage = lazy(() => import('./pages/WordlePage.jsx'))

function PageFallback() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0f0f0f',
        color: '#a7b4d6',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '0.85rem',
      }}
    >
      Cargando…
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/*" element={<App />} />
          <Route path="/cyberrisk" element={<CyberRiskPage />} />
          <Route path="/hanoi" element={<HanoiPage />} />
          <Route path="/snake" element={<SnakePage />} />
          <Route path="/2048" element={<Game2048Page />} />
          <Route path="/buscaminas" element={<MinesweeperPage />} />
          <Route path="/simon" element={<SimonPage />} />
          <Route path="/sudoku" element={<SudokuPage />} />
          <Route path="/puzzle15" element={<SlidingPuzzlePage />} />
          <Route path="/palabra" element={<WordlePage />} />
        </Routes>
      </Suspense>
    </HashRouter>
  </StrictMode>,
)
