import { useContext, useState, useEffect } from 'react'
import { ThemeContext } from '../App'

const GH_USER = 'DavexDev'

const LANG_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Swift:      '#F05138',
  Kotlin:     '#A97BFF',
  PHP:        '#8892BF',
  Python:     '#3572A5',
  Dart:       '#00B4AB',
  CSS:        '#563d7c',
  HTML:       '#e34c26',
  Shell:      '#89e051',
  Ruby:       '#701516',
  Go:         '#00ADD8',
  Rust:       '#dea584',
  Java:       '#b07219',
}

function getLangColor(lang) {
  return LANG_COLORS[lang] || 'var(--primary)'
}

function buildStreakUrl(isDark) {
  const border = isDark ? '1e2a4a' : 'dde3f0'
  const bg     = isDark ? '11182d' : 'ffffff'
  return (
    `https://streak-stats.demolab.com/?user=${GH_USER}` +
    `&theme=${isDark ? 'tokyonight' : 'default'}` +
    `&hide_border=false&border=${border}&background=${bg}`
  )
}

/* ── Native stat card ── */
function StatCard({ label, value, sub }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', flex: 1 }}>
      <span style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>
        {value ?? '—'}
      </span>
      <span style={{ fontSize: '0.8rem', color: 'var(--text)', fontWeight: 600 }}>{label}</span>
      {sub && <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{sub}</span>}
    </div>
  )
}

/* ── Native card shell ── */
function GHCard({ children, style }) {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius)',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.25rem',
      ...style,
    }}>
      {children}
    </div>
  )
}

export default function GitHubStats() {
  const { theme } = useContext(ThemeContext)
  const isDark = theme !== 'light'

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const [user, repos] = await Promise.all([
          fetch(`https://api.github.com/users/${GH_USER}`).then(r => r.json()),
          fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=100&type=owner`).then(r => r.json()),
        ])
        if (cancelled) return

        const repoList = Array.isArray(repos) ? repos : []
        const totalStars = repoList.reduce((s, r) => s + (r.stargazers_count || 0), 0)

        const langCount = {}
        repoList.forEach(r => { if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1 })
        const total = Object.values(langCount).reduce((s, v) => s + v, 0)
        const languages = Object.entries(langCount)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 7)
          .map(([name, count]) => ({ name, pct: Math.round((count / total) * 100) }))

        setData({
          repos:    user.public_repos || 0,
          followers: user.followers   || 0,
          stars:    totalStars,
          languages,
        })
      } catch (_) {
        /* silently degrade — streak card still visible */
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  return (
    <section id="github" className="section">
      <div className="container">
        <h2 className="section-title">GitHub Activity</h2>

        <div className="gh-stats-row">
          {/* ── Stats card ── */}
          <GHCard>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {GH_USER} — Overview
            </span>
            {loading ? (
              <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Cargando...</span>
            ) : data ? (
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <StatCard label="Repositorios" value={data.repos} />
                <StatCard label="Estrellas"    value={data.stars} />
                <StatCard label="Seguidores"   value={data.followers} />
              </div>
            ) : (
              <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>No se pudo cargar</span>
            )}
          </GHCard>

          {/* ── Languages card ── */}
          <GHCard>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Top Lenguajes
            </span>
            {loading ? (
              <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>Cargando...</span>
            ) : data?.languages?.length ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {data.languages.map(({ name, pct }) => (
                  <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem' }}>
                      <span style={{ color: 'var(--text)', fontWeight: 600 }}>{name}</span>
                      <span style={{ color: 'var(--muted)' }}>{pct}%</span>
                    </div>
                    <div style={{ height: '5px', borderRadius: '99px', background: 'var(--surface-2)', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, borderRadius: '99px', background: getLangColor(name), transition: 'width 0.8s ease' }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>No se pudo cargar</span>
            )}
          </GHCard>
        </div>

        {/* ── Streak ── */}
        <div className="gh-streak-row">
          <img
            src={buildStreakUrl(isDark)}
            alt={`GitHub streak de ${GH_USER}`}
            className="gh-stats-img gh-stats-img--wide"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
