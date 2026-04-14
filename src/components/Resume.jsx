export default function Resume() {
  return (
    <section id="cv" className="section">
      <div className="container">
        <h2 className="section-title">Resumen Profesional</h2>

        <div className="card" style={{ padding: '1.6rem' }}>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              <div>
                <p style={{ color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.06em' }}>
                  DEYVI XOL
                </p>
                <p style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0.35rem 0' }}>FULL STACK DEVELOPER | ESTUDIANTE DE INGENIERÍA EN SISTEMAS</p>
                <p className="muted">
                  Desarrollador Full Stack con experiencia en desarrollo, mantenimiento y soporte de aplicaciones web,
                  utilizando tecnologías modernas y buenas prácticas como Clean Code.
                </p>
              </div>
              <div style={{ display: 'grid', gap: '0.45rem' }}>
                <p className="muted">Guatemala | Open to Remote Work | Disponibilidad inmediata</p>
                <p className="muted">Tel: +502 5897-8555 | Email: xdave418@gmail.com</p>
                <p className="muted">GitHub: github.com/davexdev</p>
              </div>
            </div>

            <div style={{ display: 'grid', gap: '1.2rem' }}>
              <div>
                <h3 style={{ marginBottom: '0.8rem' }}>Experiencia Laboral</h3>
                <div style={{ display: 'grid', gap: '0.9rem' }}>
                  <div>
                    <strong>Desarrollador de Software – Independiente</strong>
                    <p className="muted" style={{ margin: '0.35rem 0 0.35rem' }}>2024 – Actualidad</p>
                    <ul style={{ marginLeft: '1rem', color: 'var(--text)' }}>
                      <li>Desarrollo y mantenimiento de aplicaciones web.</li>
                      <li>Soporte técnico y mejora continua de sistemas.</li>
                      <li>Implementación y consumo de APIs REST.</li>
                      <li>Trabajo bajo metodología Scrum.</li>
                      <li>Gestión de tareas de forma autónoma.</li>
                      <li>Colaboración en entornos de desarrollo remoto.</li>
                    </ul>
                  </div>

                  <div>
                    <strong>Desarrollador Web / Backend</strong>
                    <p className="muted" style={{ margin: '0.35rem 0 0.35rem' }}>Chiquimula SCADA | Enero 2026 – Actualidad</p>
                    <ul style={{ marginLeft: '1rem', color: 'var(--text)' }}>
                      <li>Desarrollo y mantenimiento de funcionalidades en aplicaciones web.</li>
                      <li>Soporte en backend utilizando Node.js.</li>
                      <li>Corrección de errores y optimización de código existente.</li>
                      <li>Participación en implementaciones de nuevas funcionalidades.</li>
                      <li>Apoyo en integración de servicios y pruebas del sistema.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 style={{ marginBottom: '0.8rem' }}>Tecnologías y Buenas Prácticas</h3>
                <ul style={{ marginLeft: '1rem', color: 'var(--text)', display: 'grid', gap: '0.5rem' }}>
                  <li>Desarrollo Web: JavaScript, Node.js, React.</li>
                  <li>Backend: APIs REST, Express.js.</li>
                  <li>Bases de Datos: MySQL, SQL Server.</li>
                  <li>Metodologías: Scrum, Clean Code.</li>
                  <li>DevOps: CI/CD, GitHub Actions, despliegue en Vercel.</li>
                  <li>Arquitectura de microservicios, integración web y móvil.</li>
                  <li>Tecnologías emergentes: C#, .NET Core, Angular.</li>
                </ul>
              </div>

              <div>
                <h3 style={{ marginBottom: '0.8rem' }}>Educación</h3>
                <p><strong>Universidad Mariano Gálvez de Guatemala</strong></p>
                <p className="muted">2024 – Actualidad | Ingeniería en Sistemas de Información y Ciencias de la Computación</p>
                <p><strong>Instituto Técnico Industrial Henry Ford</strong></p>
                <p className="muted">2021 – 2022 | Bachiller en Computación con Orientación Comercial</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
