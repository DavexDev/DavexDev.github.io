import { useRef, useState, useEffect } from 'react'
import {
  FaServer,
  FaUsers,
  FaMobileAlt,
  FaCalendarAlt,
  FaCreditCard,
  FaBox,
  FaNetworkWired,
  FaCircle,
} from 'react-icons/fa'

const PILLARS = [
  {
    icon: FaServer,
    title: 'Backend APIs',
    desc: 'Node.js + TypeScript + Prisma + PostgreSQL + Redis. Módulos: auth, catálogo, booking, pagos, reseñas, notificaciones, chat.',
    color: '#00e5ff',
  },
  {
    icon: FaUsers,
    title: 'Web Apps',
    desc: 'Doble front en Next.js 14 — portal cliente y dashboard artista, con onboarding por rol, búsqueda avanzada y checkout.',
    color: '#7c4dff',
  },
  {
    icon: FaMobileAlt,
    title: 'Mobile Apps',
    desc: 'iOS nativo (SwiftUI + SwiftData) y Android (Kotlin + Jetpack Compose). MVVM, Firebase Auth/FCM, Socket.IO.',
    color: '#00ffa3',
  },
  {
    icon: FaCalendarAlt,
    title: 'Booking System',
    desc: 'Flujo completo: descubrimiento, cotización, reserva, pago, ejecución y reseña. Time slots con disponibilidad en tiempo real.',
    color: '#ff9f43',
  },
  {
    icon: FaCreditCard,
    title: 'Payments',
    desc: 'Pasarelas de pago integradas con estándar GTQ. Checkout seguro y gestión completa de estados de transacción.',
    color: '#e84393',
  },
  {
    icon: FaBox,
    title: 'SDK Architecture',
    desc: 'PiumsSDK desacoplado que consume las APIs del gateway. Reutilizable entre web y mobile con tipado TypeScript completo.',
    color: '#00e5ff',
  },
]

const TECH_STACK = [
  'Node.js + TS', 'Express', 'Prisma', 'PostgreSQL',
  'Redis', 'Next.js 14', 'SwiftUI', 'Kotlin', 'Docker', 'Kubernetes',
]

export default function CurrentlyBuilding() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="construyendo" className="section" ref={ref}>
      <div className="container">
        <h2 className="section-title">Currently Building</h2>

        <div className={`cb-intro${visible ? ' is-visible' : ''}`}>
          <div className="cb-badge">
            <FaCircle className="cb-pulse-dot" aria-hidden="true" size={8} />
            <span>En construcción activa</span>
          </div>
          <h3 className="cb-project-name">PIUMS Ecosystem</h3>
          <p className="cb-project-desc">
            Marketplace de Economía Naranja para conectar clientes con artistas.
            Arquitectura monorepo con gateway, SDK propio y microservicios desacoplados.
            Cubre el ciclo completo: descubrimiento, cotización, booking, pago y reseña.
          </p>
          <div className="cb-tech-row">
            {TECH_STACK.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
        </div>

        <div className="cb-pillars-grid">
          {PILLARS.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.title}
                className={`cb-pillar${visible ? ' is-visible' : ''}`}
                style={{ '--pillar-color': pillar.color, '--pillar-delay': `${i * 0.09}s` }}
              >
                <span className="cb-pillar-icon" aria-hidden="true">
                  <Icon size={20} />
                </span>
                <h4 className="cb-pillar-title">{pillar.title}</h4>
                <p className="cb-pillar-desc">{pillar.desc}</p>
              </div>
            )
          })}
        </div>

        <div className={`cb-cta${visible ? ' is-visible' : ''}`}>
          <a
            href="https://github.com/app-piums/piums-platform"
            target="_blank"
            rel="noopener noreferrer"
            className="btn primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem' }}
          >
            <FaNetworkWired aria-hidden="true" size={14} />
            Ver avance en GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
