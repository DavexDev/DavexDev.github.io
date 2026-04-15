import { useState, useEffect } from 'react'
import { FaBriefcase, FaRocket, FaEnvelope, FaFileAlt, FaGithub } from 'react-icons/fa'

const ROLES = [
  'Desarrollador Web Jr.',
  'Técnico de Soporte',
  'Est. Ingeniería en Sistemas',
  'Entusiasta de Ciberseguridad',
]

export default function Hero() {
  const [roleIdx,   setRoleIdx]   = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing,    setTyping]    = useState(true)

  useEffect(() => {
    const current = ROLES[roleIdx]
    if (typing) {
      if (displayed.length < current.length) {
        const t = setTimeout(
          () => setDisplayed(current.slice(0, displayed.length + 1)),
          58
        )
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setTyping(false), 1900)
        return () => clearTimeout(t)
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 32)
        return () => clearTimeout(t)
      } else {
        setRoleIdx((i) => (i + 1) % ROLES.length)
        setTyping(true)
      }
    }
  }, [displayed, typing, roleIdx])

  return (
    <section id="inicio" className="hero">
      <div className="container hero-inner">
        {/* Text */}
        <div className="hero-text">
          <span className="chip">
            <FaBriefcase aria-hidden="true" style={{ marginRight: '0.55rem' }} />
            Disponible para proyectos
          </span>

          <h1>
            Hola, soy <span className="grad">Deyvi Joel Xol</span>
          </h1>

          <p className="hero-role" aria-label={`Rol actual: ${ROLES[roleIdx]}`}>
            <span className="typewriter">{displayed}</span>
            <span className="cursor" aria-hidden="true">|</span>
          </p>

          <p className="hero-sub">
            Estudiante de Ingeniería en Sistemas. Me enfoco en desarrollo web
            (HTML, CSS, JS), bases de datos y buenas prácticas de soporte
            técnico. Me gusta construir soluciones claras, accesibles y con estilo.
          </p>

          <div className="hero-cta">
            <a className="btn primary" href="#proyectos" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <FaRocket aria-hidden="true" /> Ver proyectos
            </a>
            <a className="btn" href="#contacto" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
              <FaEnvelope aria-hidden="true" /> Contacto
            </a>
            <a
              className="btn"
              href="cv.pdf"
              download="Deyvi_Xol_CV.pdf"
              aria-label="Descargar CV"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <FaFileAlt aria-hidden="true" /> Descargar CV
            </a>
            <a
              className="btn"
              href="https://github.com/davexdev"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <FaGithub aria-hidden="true" /> GitHub
            </a>
          </div>
        </div>

        {/* Avatar */}
        <div className="hero-avatar">
          <div className="avatar-ring">
            <img
              src="avatar.jpg"
              alt="Foto de perfil de Deyvi Joel Xol"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
