import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  SiLaravel,
  SiReact,
  SiNextdotjs,
  SiKotlin,
  SiSwift,
  SiSupabase,
  SiTypescript,
  SiArduino,
  SiPostgresql,
  SiTailwindcss,
  SiDocker,
  SiGit,
  SiWhatsapp,
  SiAndroid,
  SiApple,
} from 'react-icons/si'
import { FaGlobe, FaServer, FaMicrochip, FaChartLine, FaWaveSquare, FaLock, FaCheck, FaCheckDouble } from 'react-icons/fa'
import './how-i-work.css'

// ------------------------------ primitivas ------------------------------ //

function Card({ className = '', children, delay = 0 }) {
  return (
    <motion.article
      className={`hiw-card ${className}`.trim()}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.article>
  )
}

function CardText({ title, caption }) {
  return (
    <div className="hiw-text">
      <h3 className="hiw-title">{title}</h3>
      {caption && <p className="hiw-caption">{caption}</p>}
    </div>
  )
}

// ------------------------------ 1. editor de código ------------------------------ //

const K = ({ children }) => <span className="tk-k">{children}</span>
const F = ({ children }) => <span className="tk-f">{children}</span>
const S = ({ children }) => <span className="tk-s">{children}</span>
const C = ({ children }) => <span className="tk-c">{children}</span>

const CODE = [
  <C>{'// routes/web.php'}</C>,
  <>
    <K>Route</K>::<F>middleware</F>([<S>'auth'</S>, <S>'role:admin'</S>])
  </>,
  <>
    {'    ->'}
    <F>prefix</F>(<S>'panel'</S>)-&gt;<F>group</F>(<K>function</K> () {'{'}
  </>,
  <>
    {'        '}
    <K>Route</K>::<F>resource</F>(<S>'productos'</S>, <K>ProductoController</K>::<K>class</K>);
  </>,
  <>
    {'        '}
    <K>Route</K>::<F>get</F>(<S>'pedidos'</S>, [<K>PedidoController</K>::<K>class</K>, <S>'index'</S>]);
  </>,
  <>{'    });'}</>,
]

function CodeEditor() {
  return (
    <div className="hiw-editor" aria-hidden="true">
      <div className="hiw-editor-bar">
        <span className="term-dots">
          <span></span>
          <span></span>
          <span></span>
        </span>
        <span className="hiw-editor-file">web.php</span>
        <span className="hiw-editor-lang">
          <SiLaravel size={11} /> Laravel
        </span>
      </div>
      <pre className="hiw-editor-code">
        {CODE.map((line, i) => (
          <div key={i} className="hiw-line">
            <span className="hiw-ln">{i + 1}</span>
            <span>{line}</span>
          </div>
        ))}
      </pre>
    </div>
  )
}

// ------------------------------ 2. un backend, todas las pantallas ------------------------------ //

const CLIENTS = [
  { label: 'Web', icon: FaGlobe, x: 60, y: 40 },
  { label: 'Android', icon: SiAndroid, x: 160, y: 22 },
  { label: 'iOS', icon: SiApple, x: 260, y: 40 },
]

function ApiDiagram() {
  return (
    <div className="hiw-diagram" aria-hidden="true">
      <svg viewBox="0 0 320 190" className="hiw-diagram-svg">
        {CLIENTS.map((c, i) => (
          <path
            key={c.label}
            d={`M${c.x} ${c.y + 22} C ${c.x} ${110}, 160 ${100}, 160 ${140}`}
            className="hiw-wire"
            style={{ animationDelay: `${i * -0.6}s` }}
          />
        ))}
      </svg>
      {CLIENTS.map((c) => (
        <div
          key={c.label}
          className="hiw-node"
          style={{ left: `${(c.x / 320) * 100}%`, top: `${(c.y / 190) * 100}%` }}
        >
          <c.icon size={16} />
          <span>{c.label}</span>
        </div>
      ))}
      <div className="hiw-node hiw-node--api" style={{ left: '50%', top: `${(140 / 190) * 100}%` }}>
        <FaServer size={15} />
        <span>API</span>
      </div>
    </div>
  )
}

// ------------------------------ 3. pedidos por WhatsApp ------------------------------ //

function WhatsAppMock() {
  return (
    <div className="hiw-chat" aria-hidden="true">
      <div className="hiw-chat-bar">
        <SiWhatsapp size={15} />
        <span>Pedido nuevo</span>
      </div>
      <div className="hiw-chat-body">
        <motion.div
          className="hiw-bubble"
          initial={{ opacity: 0, y: 10, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <strong>¡Hola! Quiero pedir:</strong>
          <span>2 × Latte</span>
          <span>1 × Croissant</span>
          <span className="hiw-bubble-total">Recoger en tienda</span>
          <time>
            10:24 <FaCheckDouble size={10} />
          </time>
        </motion.div>
      </div>
    </div>
  )
}

// ------------------------------ 4. roles ------------------------------ //

const ROLES = ['Soporte', 'Auditor', 'Jefe de calidad', 'Gerente', 'Director general']

function RolesList() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(1)

  useEffect(() => {
    if (reduce) return
    const t = setInterval(() => setActive((a) => (a + 1) % ROLES.length), 1600)
    return () => clearInterval(t)
  }, [reduce])

  return (
    <ul className="hiw-roles" aria-hidden="true">
      {ROLES.map((r, i) => (
        <li key={r} className={`hiw-role${i === active ? ' is-active' : ''}`}>
          <span>{r}</span>
          {i === active ? <FaCheck size={11} /> : <FaLock size={10} />}
        </li>
      ))}
    </ul>
  )
}

// ------------------------------ 5. banda de stack ------------------------------ //

const STACK_A = [
  { name: 'Laravel', icon: SiLaravel, color: '#FF2D20' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#6E9FEA' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'Supabase', icon: SiSupabase, color: '#3ECF8E' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
]
const STACK_B = [
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'Next.js', icon: SiNextdotjs, color: 'var(--text)' },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#38BDF8' },
  { name: 'Kotlin', icon: SiKotlin, color: '#7F52FF' },
  { name: 'SwiftUI', icon: SiSwift, color: '#F05138' },
  { name: 'Arduino', icon: SiArduino, color: '#00979D' },
]

function BeltRow({ items, reverse }) {
  const loop = [...items, ...items]
  return (
    <div className={`hiw-belt-row${reverse ? ' is-reverse' : ''}`}>
      <div className="hiw-belt-track">
        {loop.map((t, i) => (
          <span key={`${t.name}-${i}`} className="hiw-chip" title={t.name}>
            <t.icon size={22} style={{ color: t.color }} />
          </span>
        ))}
      </div>
    </div>
  )
}

function StackBelt() {
  return (
    <div className="hiw-belt" aria-hidden="true">
      <BeltRow items={STACK_A} />
      <BeltRow items={STACK_B} reverse />
    </div>
  )
}

// ------------------------------ 6. del hardware al dashboard ------------------------------ //

function HardwareFlow() {
  const steps = [
    { icon: SiArduino, label: 'Arduino' },
    { icon: FaMicrochip, label: 'Sensores' },
    { icon: FaWaveSquare, label: 'Datos' },
    { icon: FaChartLine, label: 'Dashboard' },
  ]
  return (
    <div className="hiw-flow" aria-hidden="true">
      {steps.map((s, i) => (
        <div key={s.label} className="hiw-flow-step">
          <span className="hiw-flow-icon">
            <s.icon size={18} />
          </span>
          <span className="hiw-flow-label">{s.label}</span>
          {i < steps.length - 1 && <span className="hiw-flow-link" />}
        </div>
      ))}
    </div>
  )
}

// ------------------------------ sección ------------------------------ //

export default function HowIWork() {
  return (
    <section id="como-trabajo" className="section">
      <div className="container">
        <h2 className="section-title">Cómo trabajo</h2>

        <div className="hiw-grid">
          <Card className="hiw-card--code">
            <CardText title="Código propio, sin plantillas" caption="Rutas, roles y paneles a la medida de cada cliente." />
            <CodeEditor />
          </Card>

          <Card className="hiw-card--api" delay={0.08}>
            <CardText
              title="Un backend, todas las pantallas"
              caption="Web y apps nativas sobre la misma API, como las 4 apps de PIUMS."
            />
            <ApiDiagram />
          </Card>

          <Card className="hiw-card--chat" delay={0.16}>
            <CardText title="Pedidos directo a WhatsApp" caption="Catálogo y carrito que arman el mensaje, como en Kaffe'm y AviTec." />
            <WhatsAppMock />
          </Card>

          <Card className="hiw-card--roles" delay={0.04}>
            <CardText title="Cada rol ve solo lo suyo" caption="Permisos por rol en paneles y apps, como en QualitySolutions." />
            <RolesList />
          </Card>

          <Card className="hiw-card--belt" delay={0.12}>
            <CardText title="Mi stack del día a día" caption="Laravel en el backend, React en la web, Kotlin y SwiftUI en móvil." />
            <StackBelt />
          </Card>

          <Card className="hiw-card--hw" delay={0.2}>
            <CardText title="Del hardware al dashboard" caption="En la universidad: Arduino, sensores y visualización de datos." />
            <HardwareFlow />
          </Card>
        </div>
      </div>
    </section>
  )
}
