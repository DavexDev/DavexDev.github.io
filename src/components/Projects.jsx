import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaExternalLinkAlt, FaGithub, FaPlayCircle, FaCode } from 'react-icons/fa'
import { projects } from '../data/projects'

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

  return (
    <section id="proyectos" className="section">
      <div className="container">
        <h2 className="section-title">Proyectos</h2>

        {/* Filter tabs */}
        <div className="filter-tabs" role="tablist" aria-label="Filtrar proyectos por categoría">
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

        {/* Grid */}
        <motion.div layout className="projects-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.22 }}
                className="card project-card"
              >
                <img
                  src={project.cover}
                  alt={project.coverAlt}
                  className="project-cover"
                  loading="lazy"
                />
                <div className="project-body">
                  <h3>{project.title}</h3>
                  <p className="muted" style={{ fontSize: '0.89rem', lineHeight: 1.6 }}>
                    {project.description}
                  </p>
                  <div className="tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <div className="project-actions">
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
    </section>
  )
}
