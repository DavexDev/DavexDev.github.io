import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FaUsers } from 'react-icons/fa'
import ReactLenis from 'lenis/react'
import { FaExternalLinkAlt, FaGithub, FaPlayCircle, FaCode } from 'react-icons/fa'

const LINK_ICON_MAP = {
  FaExternalLinkAlt,
  FaGithub,
  FaPlayCircle,
  FaCode,
}

function StickyCard({ input, project, progress, stackOrder }) {
  // Curva única de 4 puntos: invisible -> entra -> activa (opaca) -> sale.
  // Al no haber más de una tarjeta a la vez fuera de opacidad 0/1, nunca
  // se superponen dos tarjetas completas en semitransparencia.
  const opacity = useTransform(progress, input, [0, 1, 1, 0])
  const scale = useTransform(progress, input, [0.96, 1, 1, 0.96])
  const y = useTransform(progress, input, [24, 0, 0, -24])
  const pointerEvents = useTransform(opacity, (v) => (v < 0.05 ? 'none' : 'auto'))
  const descRef = useRef(null)
  const [expanded, setExpanded] = useState(false)
  const [isClamped, setIsClamped] = useState(false)

  useEffect(() => {
    const el = descRef.current
    if (el) {
      setIsClamped(el.scrollHeight > el.clientHeight + 1)
    }
  }, [project.description])

  const links = project.links ?? []

  return (
    <div className="ssp-sticky" style={{ zIndex: stackOrder }}>
      <motion.div
        style={{
          scale,
          opacity,
          y,
          pointerEvents,
          top: '-5vh',
        }}
        className="ssp-card"
      >
        {/* Cover */}
        <div className="ssp-cover">
          {project.cover ? (
            <img
              src={project.cover}
              alt={project.coverAlt}
              className="ssp-cover-img"
              style={project.coverPosition ? { objectPosition: project.coverPosition } : undefined}
              loading="lazy"
            />
          ) : (
            <div className={`ssp-cover-brand ${project.coverClass || ''}`}>
              {project.coverEyebrow && <span className="ssp-eyebrow">{project.coverEyebrow}</span>}
              <strong>{project.title}</strong>
            </div>
          )}
          {project.badge && <span className="ssp-badge">{project.badge}</span>}
        </div>

        {/* Info */}
        <div className="ssp-info">
          <div className="ssp-info-top">
            <h3 className="ssp-title">{project.title}</h3>
            <div className="tags" style={{ marginTop: '0.35rem' }}>
              {project.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
          <p ref={descRef} className={`ssp-desc muted${expanded ? ' expanded' : ''}`}>
            {project.description}
          </p>
          {(isClamped || expanded) && (
            <button
              type="button"
              className="ssp-desc-toggle"
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? 'Ver menos' : 'Ver más'}
            </button>
          )}
          {project.collaborators && (
            <div className="project-collab" style={{ marginTop: '0.5rem' }}>
              <FaUsers size={12} aria-hidden="true" />
              <span>Colaboración con <strong>{project.collaborators}</strong></span>
            </div>
          )}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
            {project.demoPath && (
              <Link
                to={project.demoPath}
                className="btn primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <FaPlayCircle aria-hidden="true" size={13} />
                Probar demo
              </Link>
            )}
            {links.map((link) => {
              const LinkIcon = LINK_ICON_MAP[link.icon]
              return (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn${link.primary ? ' primary' : ''}`}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  {LinkIcon && <LinkIcon aria-hidden="true" size={13} />}
                  {link.label}
                </a>
              )
            })}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// Construye los 4 puntos de entrada [entra, activa-desde, activa-hasta, sale]
// para el progreso de scroll (0-1), garantizando que queden en orden
// estrictamente creciente (framer-motion lo requiere).
function buildInputRange(points) {
  const out = [...points]
  for (let k = 1; k < out.length; k++) {
    if (out[k] <= out[k - 1]) out[k] = out[k - 1] + 0.0001
  }
  return out
}

export function StickyScrollProjects({ projects }) {
  const container = useRef(null)
  // Arranca a contar progreso un poco antes de que el contenedor toque el
  // borde superior del viewport (85% en vez de 0%), para no dejar un tramo
  // de scroll "muerto" antes de que la primera tarjeta empiece a aparecer.
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start 85%', 'end end'],
  })
  const slot = 1 / projects.length

  return (
    <ReactLenis root options={{ lerp: 0.08 }}>
      <main ref={container} className="ssp-wrap">
        {projects.map((project, i) => {
          const activeFrom = i * slot
          const activeUntil = (i + 1) * slot
          const enter = Math.max(0, activeFrom - slot)
          const exit = Math.min(1, activeUntil + slot)
          const input = buildInputRange([enter, activeFrom, activeUntil, exit])
          return (
            <StickyCard
              key={project.id}
              input={input}
              project={project}
              progress={scrollYProgress}
              stackOrder={i + 1}
            />
          )
        })}
      </main>
    </ReactLenis>
  )
}
