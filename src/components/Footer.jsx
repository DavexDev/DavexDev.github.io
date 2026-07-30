import { useEffect, useRef, useState } from 'react'
import React from 'react'
import { gsap } from 'gsap'
import {
  FaGithub,
  FaLinkedin,
  FaArrowUp,
  FaStar,
} from 'react-icons/fa'

/* ------------------------------------------------------------------
   SELF-CONTAINED STYLES
   Maps portfolio CSS variables: --text, --bg, --primary, --primary-2,
   --muted, --border, --surface
------------------------------------------------------------------ */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');

.cinematic-footer-wrapper {
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;

  --pill-bg-1:           color-mix(in srgb, var(--text) 3%,  transparent);
  --pill-bg-2:           color-mix(in srgb, var(--text) 1%,  transparent);
  --pill-shadow:         color-mix(in srgb, var(--bg)   50%, transparent);
  --pill-highlight:      color-mix(in srgb, var(--text) 10%, transparent);
  --pill-inset-shadow:   color-mix(in srgb, var(--bg)   80%, transparent);
  --pill-border:         color-mix(in srgb, var(--text) 8%,  transparent);
  --pill-bg-1-hover:     color-mix(in srgb, var(--text) 8%,  transparent);
  --pill-bg-2-hover:     color-mix(in srgb, var(--text) 2%,  transparent);
  --pill-border-hover:   color-mix(in srgb, var(--text) 20%, transparent);
  --pill-shadow-hover:   color-mix(in srgb, var(--bg)   70%, transparent);
  --pill-highlight-hover:color-mix(in srgb, var(--text) 20%, transparent);
}

@keyframes footer-breathe {
  0%   { transform: translate(-50%, -50%) scale(1);   opacity: 0.6; }
  100% { transform: translate(-50%, -50%) scale(1.1); opacity: 1;   }
}
@keyframes footer-scroll-marquee {
  from { transform: translateX(0);    }
  to   { transform: translateX(-50%); }
}
@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1);   filter: drop-shadow(0 0 5px  rgba(255,77,109,.5)); }
  15%, 45% { transform: scale(1.2); filter: drop-shadow(0 0 10px rgba(255,77,109,.8)); }
  30%      { transform: scale(1); }
}

.animate-footer-breathe        { animation: footer-breathe        8s ease-in-out     infinite alternate; }
.animate-footer-scroll-marquee { animation: footer-scroll-marquee 40s linear         infinite;           }
.animate-footer-heartbeat      { animation: footer-heartbeat      2s  cubic-bezier(.25,1,.5,1) infinite; }

.footer-bg-grid {
  background-size: 60px 60px;
  background-image:
    linear-gradient(to right, color-mix(in srgb, var(--text) 3%, transparent) 1px, transparent 1px),
    linear-gradient(to bottom, color-mix(in srgb, var(--text) 3%, transparent) 1px, transparent 1px);
  mask-image:         linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    color-mix(in srgb, var(--primary)   15%, transparent) 0%,
    color-mix(in srgb, var(--primary-2) 15%, transparent) 40%,
    transparent 70%
  );
}

.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow:
    0 10px 30px -10px var(--pill-shadow),
    inset 0  1px 1px  var(--pill-highlight),
    inset 0 -1px 2px  var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow:
    0 20px 40px -10px var(--pill-shadow-hover),
    inset 0 1px 1px   var(--pill-highlight-hover);
  color: var(--text);
}

.footer-giant-bg-text {
  font-size: 26vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.05em;
  color: transparent;
  -webkit-text-stroke: 1px color-mix(in srgb, var(--text) 5%, transparent);
  background: linear-gradient(180deg, color-mix(in srgb, var(--text) 10%, transparent) 0%, transparent 60%);
  -webkit-background-clip: text;
  background-clip: text;
}

.footer-text-glow {
  background: linear-gradient(180deg, var(--text) 0%, color-mix(in srgb, var(--text) 40%, transparent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 20px color-mix(in srgb, var(--text) 15%, transparent));
}

.cf-heading {
  font-size: clamp(2.5rem, 8vw, 6rem);
  font-weight: 900;
  letter-spacing: -0.05em;
  margin-bottom: 3rem;
  text-align: center;
}

.cf-bottom-bar {
  position: relative;
  z-index: 20;
  width: 100%;
  padding: 0 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
}
@media (min-width: 768px) {
  .cf-bottom-bar { flex-direction: row; padding: 0 3rem 2rem; }
  .cf-copyright  { order: 1; }
  .cf-badge      { order: 2; }
  .cf-back-top   { order: 3; }
}

.cf-back-top .cf-arrow        { transition: transform 0.3s ease; }
.cf-back-top:hover .cf-arrow  { transform: translateY(-5px); }

/* ── Entrance animations ── */
.cf-enter {
  opacity: 0;
  transform: translateY(48px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.cf-enter.cf-visible {
  opacity: 1;
  transform: translateY(0);
}
.cf-enter-delay-1 { transition-delay: 0.15s; }
.cf-enter-delay-2 { transition-delay: 0.30s; }
.cf-enter-delay-3 { transition-delay: 0.45s; }
`

/* ------------------------------------------------------------------
   MAGNETIC BUTTON
------------------------------------------------------------------ */
const MagneticButton = React.forwardRef(
  ({ className, style, children, as: Component = 'button', ...props }, forwardedRef) => {
    const localRef = useRef(null)

    useEffect(() => {
      if (typeof window === 'undefined') return
      const el = localRef.current
      if (!el) return

      const ctx = gsap.context(() => {
        const onMove = (e) => {
          const r = el.getBoundingClientRect()
          const x = e.clientX - r.left - r.width  / 2
          const y = e.clientY - r.top  - r.height / 2
          gsap.to(el, { x: x * 0.4, y: y * 0.4, rotationX: -y * 0.15, rotationY: x * 0.15, scale: 1.05, ease: 'power2.out', duration: 0.4 })
        }
        const onLeave = () => {
          gsap.to(el, { x: 0, y: 0, rotationX: 0, rotationY: 0, scale: 1, ease: 'elastic.out(1, 0.3)', duration: 1.2 })
        }
        el.addEventListener('mousemove', onMove)
        el.addEventListener('mouseleave', onLeave)
        return () => { el.removeEventListener('mousemove', onMove); el.removeEventListener('mouseleave', onLeave) }
      }, el)

      return () => ctx.revert()
    }, [])

    return (
      <Component
        ref={(node) => {
          localRef.current = node
          if (typeof forwardedRef === 'function') forwardedRef(node)
          else if (forwardedRef) forwardedRef.current = node
        }}
        className={className}
        style={{ cursor: 'pointer', textDecoration: 'none', ...style }}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
MagneticButton.displayName = 'MagneticButton'

/* ------------------------------------------------------------------
   MARQUEE ITEM
------------------------------------------------------------------ */
const SEP = () => (
  <FaStar
    size={8}
    aria-hidden="true"
    style={{ flexShrink: 0, color: 'color-mix(in srgb, var(--primary) 55%, transparent)' }}
  />
)

const MarqueeItem = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', padding: '0 1.25rem' }}>
    <span>Full Stack Developer</span> <SEP />
    <span>Backend APIs</span>         <SEP />
    <span>Mobile Apps</span>          <SEP />
    <span>PIUMS Ecosystem</span>      <SEP />
    <span>Open to Remote</span>       <SEP />
  </div>
)

/* ------------------------------------------------------------------
   FOOTER
------------------------------------------------------------------ */
export default function Footer() {
  const footerRef  = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = footerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const year = new Date().getFullYear()

  const NAV_PILLS = [
    { label: 'Proyectos',   href: '#proyectos'   },
    { label: 'Habilidades', href: '#habilidades' },
    { label: 'Contacto',    href: '#contacto'    },
  ]

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      <footer
        ref={footerRef}
        className="cinematic-footer-wrapper"
        style={{
          position: 'relative',
          minHeight: '90vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflow: 'hidden',
          background: 'var(--bg)',
          color: 'var(--text)',
        }}
      >
        {/* Aurora glow */}
        <div
          className="footer-aurora animate-footer-breathe"
          aria-hidden="true"
          style={{ position: 'absolute', left: '50%', top: '50%', height: '60vh', width: '80vw', transform: 'translate(-50%,-50%)', borderRadius: '50%', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }}
        />

        {/* Grid */}
        <div
          className="footer-bg-grid"
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}
        />

        {/* Giant bg text */}
        <div
          className="footer-giant-bg-text"
          aria-hidden="true"
          style={{ position: 'absolute', bottom: '-5vh', left: '50%', transform: 'translateX(-50%)', whiteSpace: 'nowrap', zIndex: 0, pointerEvents: 'none', userSelect: 'none' }}
        >
          DAVEX
        </div>

        {/* Diagonal marquee stripe */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', top: '3rem', left: 0, width: '100%',
            overflow: 'hidden',
            borderTop:    '1px solid color-mix(in srgb, var(--border) 50%, transparent)',
            borderBottom: '1px solid color-mix(in srgb, var(--border) 50%, transparent)',
            background: 'color-mix(in srgb, var(--bg) 60%, transparent)',
            backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
            padding: '0.9rem 0', zIndex: 10,
            transform: 'rotate(-2deg) scale(1.1)',
            boxShadow: '0 20px 40px -12px rgba(0,0,0,0.3)',
          }}
        >
          <div
            className="animate-footer-scroll-marquee"
            style={{ display: 'flex', width: 'max-content', color: 'var(--muted)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase' }}
          >
            <MarqueeItem /><MarqueeItem />
          </div>
        </div>

        {/* ── Main center content ── */}
        <div
          style={{
            position: 'relative', zIndex: 10,
            display: 'flex', flex: 1, flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '0 1.5rem',
            width: '100%', maxWidth: '64rem',
            margin: '8rem auto 0',
          }}
        >
          <h2 className={`cf-heading footer-text-glow cf-enter cf-enter-delay-1${visible ? ' cf-visible' : ''}`}>
            Construyamos algo
          </h2>

          <div
            className={`cf-enter cf-enter-delay-2${visible ? ' cf-visible' : ''}`}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', width: '100%' }}
          >
            {/* Primary social links */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', width: '100%' }}>
              <MagneticButton
                as="a"
                href="https://github.com/davexdev"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-glass-pill"
                style={{ padding: '1.1rem 2.5rem', borderRadius: '9999px', color: 'var(--text)', fontWeight: 700, fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.65rem' }}
              >
                <FaGithub size={20} aria-hidden="true" style={{ color: 'var(--muted)', flexShrink: 0 }} />
                GitHub
              </MagneticButton>

              <MagneticButton
                as="a"
                href="https://www.linkedin.com/in/deyvi-joel-xol-chiquin-644025370"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-glass-pill"
                style={{ padding: '1.1rem 2.5rem', borderRadius: '9999px', color: 'var(--text)', fontWeight: 700, fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.65rem' }}
              >
                <FaLinkedin size={20} aria-hidden="true" style={{ color: 'var(--muted)', flexShrink: 0 }} />
                LinkedIn
              </MagneticButton>
            </div>

            {/* Secondary nav pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.65rem', width: '100%', marginTop: '0.4rem' }}>
              {NAV_PILLS.map(({ label, href }) => (
                <MagneticButton
                  key={label}
                  as="a"
                  href={href}
                  className="footer-glass-pill"
                  style={{ padding: '0.65rem 1.4rem', borderRadius: '9999px', color: 'var(--muted)', fontWeight: 500, fontSize: '0.78rem' }}
                >
                  {label}
                </MagneticButton>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className={`cf-bottom-bar cf-enter cf-enter-delay-3${visible ? ' cf-visible' : ''}`}>
          <div
            className="cf-copyright"
            style={{ color: 'var(--muted)', fontSize: '0.68rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}
          >
            © {year} Deyvi Joel Xol. Todos los derechos reservados.
          </div>

          <MagneticButton
            as="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="footer-glass-pill cf-back-top"
            aria-label="Volver al inicio"
            style={{ width: '3rem', height: '3rem', borderRadius: '9999px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', border: 'none', background: 'none' }}
          >
            <FaArrowUp className="cf-arrow" size={16} aria-hidden="true" />
          </MagneticButton>
        </div>
      </footer>
    </>
  )
}

