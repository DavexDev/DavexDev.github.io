import { useEffect, useState } from 'react'
import { useInView } from '../hooks/useInView'
import { FaStar, FaRobot, FaShieldAlt, FaChartLine, FaGraduationCap, FaDatabase } from 'react-icons/fa'
import { certifications } from '../data/certifications'

const CERT_ICON_MAP = {
  FaRobot,
  FaShieldAlt,
  FaChartLine,
  FaGraduationCap,
  FaDatabase,
}

function CertBadge({ cert, onPreview }) {
  const [ref, inView] = useInView()

  const Icon = CERT_ICON_MAP[cert.icon]

  return (
    <div ref={ref} className={`card cert-card${inView ? ' in-view' : ''}`}>
      {cert.image && (
        <img
          src={cert.image}
          alt={`Certificado ${cert.name}`}
          className="cert-image cert-image--clickable"
          onClick={onPreview}
        />
      )}
      <div>
        <div
          className="cert-icon"
          style={{ color: cert.badgeColor, fontSize: '2.6rem', lineHeight: 1 }}
          aria-hidden="true"
        >
          {Icon ? <Icon size={38} /> : cert.icon}
        </div>
        <h3 className="cert-name">{cert.name}</h3>
        <p className="muted cert-issuer">{cert.issuer}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.4rem' }}>
          <span className="cert-year">{cert.year}</span>
          {cert.detail && (
            <span className="muted" style={{ fontSize: '0.78rem' }}>{cert.detail}</span>
          )}
        </div>
        {cert.url && (
          <a
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            style={{ marginTop: '0.85rem', display: 'inline-flex' }}
          >
            Ver certificado
          </a>
        )}
        {cert.image && (
          <button
            type="button"
            className="btn"
            onClick={onPreview}
            style={{ marginTop: '0.85rem', display: 'inline-flex' }}
          >
            Ver imagen
          </button>
        )}
      </div>
    </div>
  )
}

export default function Certifications() {
  const [preview, setPreview] = useState(null)

  useEffect(() => {
    if (!preview) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setPreview(null)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [preview])

  const openPreview = (cert) => setPreview(cert)
  const closePreview = () => setPreview(null)
  const onOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      closePreview()
    }
  }

  return (
    <section id="certificaciones" className="section">
      <div className="container">
        <h2 className="section-title">Certificaciones</h2>
        <div className="certs-grid">
          {certifications.map((cert) => (
            <CertBadge key={cert.id} cert={cert} onPreview={() => openPreview(cert)} />
          ))}
        </div>
        <p className="muted certs-note">
          <FaStar aria-hidden="true" style={{ marginRight: '0.45rem' }} /> Más certificaciones en camino — esta sección se actualiza continuamente.
        </p>
      </div>

      {preview && (
        <div className="modal-overlay" onClick={onOverlayClick}>
          <div className="modal-body">
            <div className="modal-header">
              <h3 className="modal-title">{preview.name}</h3>
              <button
                type="button"
                className="modal-close"
                onClick={closePreview}
                aria-label="Cerrar vista de certificado"
              >
                ✕
              </button>
            </div>
            <img
              src={preview.image}
              alt={`Previsualización ${preview.name}`}
              className="modal-image"
            />
            {preview.issuer && (
              <p className="muted" style={{ marginTop: '0.75rem' }}>{preview.issuer}</p>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
