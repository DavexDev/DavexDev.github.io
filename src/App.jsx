import { createContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar              from './components/Navbar'
import Hero                from './components/Hero'
import About               from './components/About'
import Resume              from './components/Resume'
import Projects            from './components/Projects'
import CurrentlyBuilding   from './components/CurrentlyBuilding'
import Skills              from './components/Skills'
import GitHubStats         from './components/GitHubStats'
import Education           from './components/Education'
import Certifications      from './components/Certifications'
import Contact             from './components/Contact'
import Footer              from './components/Footer'

export const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => {} })

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')
  const location = useLocation()

  useEffect(() => {
    const id = location.pathname.replace(/^\//, '')
    if (!id) return
    const el = document.getElementById(id)
    if (el) {
      requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    }
  }, [location.pathname])

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'light') {
      root.setAttribute('data-theme', 'light')
    } else {
      root.removeAttribute('data-theme')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Resume />
        <Projects />
        <CurrentlyBuilding />
        <Skills />
        <GitHubStats />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </ThemeContext.Provider>
  )
}
