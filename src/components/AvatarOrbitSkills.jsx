const ORBIT_SKILLS = [
  { short: 'HTML5', full: 'HTML5 - estructura de interfaces web', category: 'frontend' },
  { short: 'CSS3', full: 'CSS3 - estilos y diseno responsive', category: 'frontend' },
  { short: 'JavaScript', full: 'JavaScript - logica frontend y funcionalidades dinamicas', category: 'frontend' },
  { short: 'Node.js', full: 'Node.js - desarrollo backend', category: 'backend' },
  { short: 'Express', full: 'Express.js - creacion de APIs y servidor web', category: 'backend' },
  { short: 'MySQL', full: 'MySQL - gestion de bases de datos relacionales', category: 'data' },
  { short: 'C++', full: 'C++ - desarrollo de sistemas CRUD y programacion academica', category: 'backend' },
  { short: 'Git/GitHub', full: 'Git & GitHub - control de versiones y despliegue de proyectos', category: 'devops' },
  { short: 'Figma', full: 'Figma - diseno UI/UX y prototipado web', category: 'frontend' },
  { short: 'Power BI', full: 'Power BI - analisis y visualizacion de datos', category: 'data' },
  { short: 'Kali Linux', full: 'Kali Linux - ciberseguridad y hacking etico', category: 'security' },
  { short: 'MATLAB', full: 'MATLAB - calculo numerico y simulaciones', category: 'data' },
  { short: 'CI/CD', full: 'CI/CD - automatizacion de despliegues y flujos de desarrollo', category: 'devops' },
  { short: 'Claude Code', full: 'Claude Code - asistencia de desarrollo con IA', category: 'devops' },
  { short: 'SCADA', full: 'SCADA - conceptos de supervision y control industrial', category: 'backend' },
  { short: 'Full Stack', full: 'Desarrollo Full Stack - integracion frontend, backend y base de datos', category: 'backend' },
  { short: 'Dashboards', full: 'Diseno de Dashboards - interfaces administrativas y paneles de control', category: 'data' },
  { short: 'APIs REST', full: 'APIs REST - comunicacion entre frontend y backend', category: 'backend' },
  { short: 'CRUD Systems', full: 'CRUD Systems - sistemas de gestion completos', category: 'backend' },
  { short: 'Responsive', full: 'Responsive Web Design - adaptacion multiplataforma', category: 'frontend' },
]

const RINGS = [
  { radius: 132, duration: 42, reverse: false, items: ORBIT_SKILLS.slice(0, 7) },
  { radius: 180, duration: 58, reverse: true, items: ORBIT_SKILLS.slice(7, 14) },
  { radius: 228, duration: 74, reverse: false, items: ORBIT_SKILLS.slice(14, 20) },
]

function OrbitLayer({ ring, layerIndex }) {
  const step = 360 / ring.items.length

  return (
    <div
      className={`avatar-orbit-layer avatar-orbit-layer--${ring.reverse ? 'reverse' : 'forward'} avatar-orbit-layer--ring-${layerIndex + 1}`}
      style={{
        '--orbit-radius': `${ring.radius}px`,
        '--orbit-duration': `${ring.duration}s`,
        '--orbit-opacity': `${1 - layerIndex * 0.15}`,
      }}
      aria-hidden="true"
    >
      {ring.items.map((skill, index) => (
        <span
          key={skill.short}
          className={`avatar-orbit-skill avatar-orbit-skill--${skill.category}`}
          style={{ '--orbit-angle': `${index * step}deg` }}
          title={skill.full}
        >
          {skill.short}
        </span>
      ))}
    </div>
  )
}

export default function AvatarOrbitSkills() {
  return (
    <div className="avatar-orbit" aria-label="Tecnologias destacadas alrededor del avatar">
      <div className="avatar-orbit-path avatar-orbit-path--1" aria-hidden="true" />
      <div className="avatar-orbit-path avatar-orbit-path--2" aria-hidden="true" />
      <div className="avatar-orbit-path avatar-orbit-path--3" aria-hidden="true" />

      {RINGS.map((ring, idx) => (
        <OrbitLayer key={idx} ring={ring} layerIndex={idx} />
      ))}

      <div className="avatar-ring">
        <img
          src="avatar.jpg"
          alt="Foto de perfil de Deyvi Joel Xol"
          loading="eager"
        />
      </div>
    </div>
  )
}
