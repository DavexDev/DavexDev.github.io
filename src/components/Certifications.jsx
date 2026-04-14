import { useInView } from '../hooks/useInView'
import { FaStar, FaRobot, FaShieldAlt, FaChartLine, FaGraduationCap } from 'react-icons/fa'
import { certifications } from '../data/certifications'

const CERT_ICON_MAP = {
  FaRobot,
  FaShieldAlt,
  FaChartLine,
  FaGraduationCap,
}

function CertBadge({ cert }) {
  const [ref, inView] = useInView()

  const Icon = CERT_ICON_MAP[cert.icon]

  return (
    <div ref={ref} className={`card cert-card${inView ? ' in-view' : ''}`}>
      <div
        className="cert-icon"
        style={{ color: cert.badgeColor, fontSize: '2.6rem', lineHeight: 1 }}
        aria-hidden="true"
      >
        {Icon ? <Icon size={38} /> : cert.icon}
      </div>
      <div>
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
      </div>
    </div>
  )
}

export default function Certifications() {
  return (
    <section id="certificaciones" className="section">
      <div className="container">
        <h2 className="section-title">Certificaciones</h2>
        <div className="certs-grid">
          {certifications.map((cert) => (
            <CertBadge key={cert.id} cert={cert} />
          ))}
        </div>
        <p className="muted certs-note">
          <FaStar aria-hidden="true" style={{ marginRight: '0.45rem' }} /> Más certificaciones en camino — esta sección se actualiza continuamente.
        </p>
      </div>
    </section>
  )
}
