import { useRef } from 'react'
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

function StickyCard({ i, project, progress, range, targetScale, stackOrder }) {
  const scale = useTransform(progress, range, [1, targetScale])

  const links = project.links ?? []

  return (
    <div className="ssp-sticky" style={{ zIndex: stackOrder }}>
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 18 + 160}px)`,
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
              {project.coverIcon && <img src={project.coverIcon} alt="" className="ssp-cover-icon" aria-hidden="true" />}
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
          <p className="ssp-desc muted">{project.description}</p>
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

export function StickyScrollProjects({ projects }) {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  })

  return (
    <ReactLenis root options={{ lerp: 0.08 }}>
      <main ref={container} className="ssp-wrap">
        {projects.map((project, i) => {
          const targetScale = Math.max(0.6, 1 - (projects.length - i - 1) * 0.07)
          return (
            <StickyCard
              key={project.id}
              i={i}
              project={project}
              progress={scrollYProgress}
              range={[i * (1 / projects.length), 1]}
              targetScale={targetScale}
              stackOrder={i + 1}
            />
          )
        })}
      </main>
    </ReactLenis>
  )
}
