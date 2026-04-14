import { useInView } from '../hooks/useInView'
import { FaGraduationCap, FaSchool } from 'react-icons/fa'
import { education } from '../data/education'

const EDUCATION_ICON_MAP = {
  FaGraduationCap,
  FaSchool,
}

function TimelineItem({ item, isLeft }) {
  const [ref, inView] = useInView()
  const Icon = EDUCATION_ICON_MAP[item.icon]

  return (
    <div
      ref={ref}
      className={`timeline-item ${isLeft ? 'left' : 'right'}${inView ? ' in-view' : ''}`}
    >
      {/* Spacer for opposite side (hidden on mobile) */}
      <div className="timeline-spacer" aria-hidden="true" />

      {/* Center icon */}
      <div className="timeline-icon" aria-hidden="true">
        {Icon ? <Icon size={24} /> : item.icon}
      </div>

      {/* Card */}
      <div className="card timeline-card">
        <span className="timeline-period">{item.period}</span>
        <h3>{item.degree}</h3>
        <p className="timeline-institution">{item.institution}</p>
        <p className="muted" style={{ fontSize: '0.88rem', marginTop: '0.35rem' }}>
          {item.description}
        </p>
      </div>
    </div>
  )
}

export default function Education() {
  return (
    <section id="educacion" className="section">
      <div className="container">
        <h2 className="section-title">Educación</h2>
        <div className="timeline">
          {education.map((item, i) => (
            <TimelineItem key={item.id} item={item} isLeft={i % 2 === 0} />
          ))}
        </div>
      </div>
    </section>
  )
}
