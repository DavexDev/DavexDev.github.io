import { useState, useEffect, useContext } from 'react'
import { FaMoon, FaSun } from 'react-icons/fa'
import { ThemeContext } from '../App'

const NAV_LINKS = [
  { href: '#sobre-mi',       label: 'Sobre mí' },
  { href: '#proyectos',      label: 'Proyectos' },
  { href: '#habilidades',    label: 'Habilidades' },
  { href: '#educacion',      label: 'Educación' },
  { href: '#certificaciones',label: 'Certs' },
  { href: '#contacto',       label: 'Contacto' },
]

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled]  = useState(false)
  const [progress, setProgress]  = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop  = window.scrollY
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0)
      setScrolled(scrollTop > 50)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setMenuOpen(false)

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} aria-label="Navegación principal">
      {/* Scroll progress bar */}
      <div
        className="scroll-progress"
        style={{ width: `${progress}%` }}
        aria-hidden="true"
      />

      <div className="navbar-inner">
        <a href="#inicio" className="brand" aria-label="Inicio" onClick={close}>
          <span className="brand-logo">DX</span>
          <span>Deyvi Xol</span>
        </a>

        <button
          className="hamb"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          onClick={() => setMenuOpen((o) => !o)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <div className={`nav-menu${menuOpen ? ' open' : ''}`} id="nav-menu">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={close}>
              {link.label}
            </a>
          ))}
          <button
            className="btn theme-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
            title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
          >
            {theme === 'dark' ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
          </button>
        </div>
      </div>
    </nav>
  )
}
