import { useContext } from 'react'
import { ThemeContext } from '../App'

const GH_USER = 'DavexDev'

const DARK = {
  bg: '11182d',
  title: '00e5ff',
  icon: '7c4dff',
  text: 'a7b4d6',
  border: '1e2a4a',
}

const LIGHT = {
  bg: 'ffffff',
  title: '0ea5e9',
  icon: '7c3aed',
  text: '475569',
  border: 'dde3f0',
}

function buildStatsUrl(c) {
  return (
    `https://github-readme-stats.vercel.app/api?username=${GH_USER}` +
    `&show_icons=true&count_private=true&hide_border=false` +
    `&bg_color=${c.bg}&title_color=${c.title}&icon_color=${c.icon}` +
    `&text_color=${c.text}&border_color=${c.border}`
  )
}

function buildLangsUrl(c) {
  return (
    `https://github-readme-stats.vercel.app/api/top-langs/?username=${GH_USER}` +
    `&layout=compact&langs_count=8&hide_border=false` +
    `&bg_color=${c.bg}&title_color=${c.title}&icon_color=${c.icon}` +
    `&text_color=${c.text}&border_color=${c.border}`
  )
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

export default function GitHubStats() {
  const { theme } = useContext(ThemeContext)
  const isDark = theme !== 'light'
  const c = isDark ? DARK : LIGHT

  return (
    <section id="github" className="section">
      <div className="container">
        <h2 className="section-title">GitHub Activity</h2>
        <div className="gh-stats-row">
          <img
            src={buildStatsUrl(c)}
            alt={`Estadísticas GitHub de ${GH_USER}`}
            className="gh-stats-img"
            loading="lazy"
          />
          <img
            src={buildLangsUrl(c)}
            alt={`Top lenguajes de ${GH_USER}`}
            className="gh-stats-img"
            loading="lazy"
          />
        </div>
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
