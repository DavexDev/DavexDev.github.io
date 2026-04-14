import { useEffect, useRef, useState } from 'react'
import {
  FaCode,
  FaGitAlt,
  FaDatabase,
  FaLinux,
  FaShieldAlt,
  FaTools,
} from 'react-icons/fa'
import { skills } from '../data/skills'

const ICON_MAP = { FaCode, FaGitAlt, FaDatabase, FaLinux, FaShieldAlt, FaTools }

function SkillBar({ label, percent, icon, color }) {
  const ref   = useRef(null)
  const [w, setW] = useState(0)
  const Icon = ICON_MAP[icon]

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setW(percent)
          observer.unobserve(el)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [percent])

  return (
    <div className="skill-item" ref={ref}>
      <div className="skill-label">
        <span className="skill-icon" style={{ color }} aria-hidden="true">
          {Icon && <Icon size={17} />}
        </span>
        <span>{label}</span>
        <span className="skill-percent">{percent}%</span>
      </div>
      <div
        className="skill-track"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label}
      >
        <span
          className="skill-fill"
          style={{
            width: `${w}%`,
            background: `linear-gradient(90deg, ${color}, #00ffa3)`,
            boxShadow: `0 0 10px ${color}66`,
          }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="habilidades" className="section">
      <div className="container">
        <h2 className="section-title">Habilidades Técnicas</h2>
        <div className="skills-grid">
          {skills.map((s) => (
            <SkillBar key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  )
}
