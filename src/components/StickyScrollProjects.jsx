import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
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

  const primaryLink = project.links?.find((l) => l.primary) ?? project.links?.[0]
  const LinkIcon = primaryLink ? LINK_ICON_MAP[primaryLink.icon] : null

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
          {primaryLink && (
            <a
              href={primaryLink.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.75rem' }}
            >
              {LinkIcon && <LinkIcon aria-hidden="true" size={13} />}
              {primaryLink.label}
            </a>
          )}
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
