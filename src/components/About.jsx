import TermWindow from './TermWindow'

export default function About() {
  return (
    <section id="sobre-mi" className="section">
      <div className="container">
        <h2 className="section-title">Sobre mí</h2>
        <TermWindow path="sobre-mi.md" className="about-card">
          <p>
            Desarrollador <strong>Full Stack</strong> y estudiante de{' '}
            <strong>Ingeniería en Sistemas</strong>, con proyectos en producción para clientes reales. En el día a día trabajo con <strong>Laravel</strong>{' '}
            (y Filament para paneles administrativos), <strong>React / Next.js</strong> y apps
            nativas en <strong>Kotlin</strong> y <strong>SwiftUI</strong>, con bases de datos{' '}
            <strong>MySQL</strong>, <strong>PostgreSQL</strong> y <strong>Supabase</strong>.
          </p>
          <p>
            En la universidad llevo eso al hardware y los datos: <strong>Arduino</strong> y C++ para
            un brazo robótico, <strong>Python</strong> con TensorFlow para clasificar residuos con
            visión por computadora, <strong>SQL Server</strong> y <strong>R</strong>. Me caracterizo
            por <strong>aprender rápido</strong>, documentar procesos y compartir lo que sé, y sigo
            profundizando en <strong>ciberseguridad</strong>.
          </p>
        </TermWindow>
      </div>
    </section>
  )
}
