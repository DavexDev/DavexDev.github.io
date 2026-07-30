import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaExternalLinkAlt, FaGithub, FaPlayCircle, FaCode, FaUsers } from 'react-icons/fa'
import { FaArrowUpRightFromSquare } from 'react-icons/fa6'
import { projects } from '../data/projects'
import { StickyScrollProjects } from './StickyScrollProjects'

const LINK_ICON_MAP = {
  FaExternalLinkAlt,
  FaGithub,
  FaPlayCircle,
  FaCode,
}

const CATEGORIES = [
  { id: 'all',   label: 'Todos'   },
  { id: 'web',   label: 'Web'     },
  { id: 'juego', label: 'Juegos'  },
  { id: 'datos', label: 'Datos'   },
]

export default function Projects() {
  const [active, setActive] = useState('all')

  const filtered =
    active === 'all'
      ? projects
      : projects.filter((p) => p.category === active)

  const orderedProjects = [...filtered].sort(
    (left, right) => Number(Boolean(right.featured)) - Number(Boolean(left.featured))
  )

  return (
    <section id="proyectos" className="section">
      <div className="container">
        <h2 className="section-title">Proyectos</h2>
        <p className="projects-intro muted">
          Una mezcla de productos propios y webs en produccion para clientes reales, con enfoque en identidad,
          conversion y presencia comercial.
        </p>

        {/* Filter tabs */}
        <div className="filter-tabs" role="tablist" aria-label="Filtrar proyectos por categoria">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={active === cat.id}
              className={`filter-tab${active === cat.id ? ' active' : ''}`}
              onClick={() => setActive(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {active === 'all' ? (
        <StickyScrollProjects projects={orderedProjects} />
      ) : (
        <div className="container">
          <motion.div layout className="projects-grid">
            <AnimatePresence mode="popLayout">
              {orderedProjects.map((project) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.22 }}
                  className={`card project-card${project.featured ? ' featured' : ''}`}
                >
                  {project.cover ? (
                    <img
                      src={project.cover}
                      alt={project.coverAlt}
                      className="project-cover"
                      loading="lazy"
                      style={project.coverPosition ? { objectPosition: project.coverPosition } : undefined}
                    />
                  ) : (
                    <div className={`project-cover project-cover--brand ${project.coverClass || ''}`}>
                      <div className="project-cover-overlay" />
                      {project.coverIcon && <img src={project.coverIcon} alt="" className="project-cover-icon" aria-hidden="true" />}
                      <div className="project-cover-content">
                        {project.coverEyebrow && <span className="project-cover-eyebrow">{project.coverEyebrow}</span>}
                        <strong>{project.title}</strong>
                        {project.coverCaption && <span>{project.coverCaption}</span>}
                      </div>
                      <span className="project-cover-link">
                        <FaArrowUpRightFromSquare aria-hidden="true" />
                      </span>
                    </div>
                  )}
                  <div className="project-body">
                    <div className="project-heading-row">
                      <h3>{project.title}</h3>
                      {project.badge && <span className="project-badge">{project.badge}</span>}
                    </div>
                    {project.collaborators && (
                      <div className="project-collab">
                        <FaUsers size={12} aria-hidden="true" />
                        <span>Colaboración con <strong>{project.collaborators}</strong></span>
                      </div>
                    )}
                    <p className="muted" style={{ fontSize: '0.89rem', lineHeight: 1.6 }}>
                      {project.description}
                    </p>
                    {project.outcome && <p className="project-outcome">{project.outcome}</p>}
                    <div className="tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                    <div className="project-actions">
                      {project.demoPath && (
                        <Link
                          to={project.demoPath}
                          className="btn primary"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}
                        >
                          <FaPlayCircle aria-hidden="true" size={14} />
                          Probar demo
                        </Link>
                      )}
                      {project.links.map((link) => {
                        const LinkIcon = LINK_ICON_MAP[link.icon]
                        return (
                          <a
                            key={link.href}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`btn${link.primary ? ' primary' : ''}`}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}
                          >
                            {LinkIcon && <LinkIcon aria-hidden="true" size={14} />}
                            {link.label}
                          </a>
                        )
                      })}
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </section>
  )
}
