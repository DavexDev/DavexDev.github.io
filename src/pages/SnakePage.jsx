import { Link } from 'react-router-dom'
import { FaArrowLeft } from 'react-icons/fa'
import SnakeGame from '../components/SnakeGame'

export default function SnakePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#0f0f0f', color: '#e6f0ff', fontFamily: 'Poppins, sans-serif' }}>
      <nav style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(15,15,15,0.92)',
        borderBottom: '1px solid rgba(0,217,255,0.1)',
        padding: '0.65rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            color: '#a7b4d6',
            textDecoration: 'none',
            fontSize: '0.78rem',
            fontWeight: 600,
            padding: '0.35rem 0.8rem',
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.04)',
          }}
        >
          <FaArrowLeft size={11} aria-hidden="true" />
          Portafolio
        </Link>
        <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.9rem' }}>·</span>
        <span style={{ color: '#00d9ff', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
          Snake
        </span>
      </nav>

      <SnakeGame />
    </div>
  )
}
