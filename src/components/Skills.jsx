import { useEffect, useRef, useState } from 'react'
import { FaServer, FaCode, FaMobileAlt, FaTools, FaSitemap } from 'react-icons/fa'
import { skillCategories } from '../data/skills'

const ICON_MAP = { FaServer, FaCode, FaMobileAlt, FaTools, FaSitemap }

function CategoryCard({ category }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  const Icon = ICON_MAP[category.icon]

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
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`skill-category-card${visible ? ' is-visible' : ''}`}
      style={{ '--cat-color': category.color }}
    >
      <div className="skill-category-header">
        <span className="skill-category-icon" aria-hidden="true">
          {Icon && <Icon size={18} />}
        </span>
        <h3 className="skill-category-title">{category.label}</h3>
      </div>
      <div className="skill-chips">
        {category.items.map((item, i) => (
          <span
            key={item}
            className="skill-chip"
            style={{ '--chip-delay': `${i * 0.05}s` }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="habilidades" className="section">
      <div className="container">
        <h2 className="section-title">Habilidades Técnicas</h2>
        <div className="skill-categories-grid">
          {skillCategories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </div>
    </section>
  )
}

