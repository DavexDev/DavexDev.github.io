import { createContext, useState, useEffect } from 'react'
import Navbar         from './components/Navbar'
import Hero           from './components/Hero'
import About          from './components/About'
import Resume         from './components/Resume'
import Projects       from './components/Projects'
import Skills         from './components/Skills'
import Education      from './components/Education'
import Certifications from './components/Certifications'
import Contact        from './components/Contact'
import Footer         from './components/Footer'
import BackToTop      from './components/BackToTop'

export const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => {} })

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')

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
        <Skills />
        <Education />
        <Certifications />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </ThemeContext.Provider>
  )
}
